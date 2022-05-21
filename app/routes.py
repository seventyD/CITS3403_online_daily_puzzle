from telnetlib import GA
from flask import render_template, flash, redirect, url_for, request
from app import app, db
from app.forms import LoginForm, RegistrationForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Goal_words, User, Game, Save
from werkzeug.urls import url_parse
from datetime import date
import random


#Main Game Page - Only Accessable if logged in
@app.route('/')
@app.route('/index')
@login_required
def index():
    if current_user.is_authenticated:
        #Gets statistical data
        u = current_user
        games = u.games.all()
        played=len(games)
        wins = 0
        losses = 0
        CStreak = 0
        MStreak = 0

        for game in games:
            if game.win == False:
                losses += 1
                if CStreak > MStreak:
                    MStreak = CStreak
                CStreak = 0
            if game.win == True:
                wins +=1
                CStreak +=1
                if CStreak > MStreak:
                    MStreak = CStreak
        


    #REMOVE THIS LOOP AFTER TESTING!! IT GENERATES A NEW DAY AT LOGIN, DELETING IT WILL JUST GENERATE A NEW DAY EVERYDAY
    #for day in Goal_words.query.all():
    #    db.session.delete(day)
    #db.session.commit()
    #DONT DELETE THIS STUFF BELOW vvv


    #Check for date here, if not add new day
    if (not check_day()):
        new_day()

    for day in Goal_words.query.all():
        if str(date.today()) in str(day.date):
            australia=day.australia
            africa=day.africa
            asia=day.asia
            europe=day.europe
            south_america=day.south_america
            north_america=day.north_america
            
    #Adding blank save if there are no saves for today
    save_found = False
    for save in u.saves.all():
        if save.date == date.today():
            save_found = True
            print(save.date)
    if not save_found:
        init_save(u)
    
    #Sending save data to template, even if it is blank
    s_australia=u.saves[0].australia
    s_africa=u.saves[0].africa
    s_asia=u.saves[0].asia
    s_europe=u.saves[0].europe
    s_south_america=u.saves[0].south_america
    s_north_america=u.saves[0].north_america
    
    #Commits session to stay consistent
    db.session.commit()
    return render_template('base.html', played=played, wins=wins, CStreak=CStreak, MStreak=MStreak, australia=australia, africa=africa, asia=asia, europe=europe, south_america=south_america, north_america=north_america, s_australia=s_australia, s_africa=s_africa, s_asia=s_asia, s_europe=s_europe, s_south_america=s_south_america, s_north_america=s_north_america)


#Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)

    return render_template('login_base.html', title='Sign In', form=form)

#Logout button
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

#Account Registration Page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))

    return render_template('register_base.html', title='Register', form=form)


#Retries Game Data
@app.route('/index/<jsdata>')
@login_required
def get_javascript_data(jsdata):

    #Win/Loss Data
    if jsdata == '<LOSS>':
        u = current_user
        game = Game(win=False, author=u)
        db.session.add(game)
        db.session.commit()

    if jsdata == '<WIN>':
        u = current_user
        game = Game(win=True, author=u)
        db.session.add(game)
        db.session.commit()

    #Save game data
    if jsdata[0:4] == 'aus_':
        u = current_user
        u.saves[0].australia = jsdata[4:]
        db.session.commit()

    if jsdata[0:4] == 'afr_':
        u = current_user
        u.saves[0].africa = jsdata[4:]
        db.session.commit()

    if jsdata[0:4] == 'asi_':
        u = current_user
        u.saves[0].asia = jsdata[4:]
        db.session.commit()

    if jsdata[0:4] == 'eur_':
        u = current_user
        u.saves[0].europe = jsdata[4:]
        db.session.commit()

    if jsdata[0:4] == 'sou_':
        u = current_user
        u.saves[0].south_america = jsdata[4:]
        db.session.commit()

    if jsdata[0:4] == 'nor_':
        u = current_user
        u.saves[0].north_america = jsdata[4:]
        db.session.commit()

    return jsdata


#Checks if there are goal words ready for today
def check_day():
    for day in Goal_words.query.all():
        if str(date.today()) in str(day.date):
            return True
    return False

def get_date():
    return date.today()

#Choses a random city from csv for continents daily word
def get_asia():
    city = random.choice(list(open('word_data/ASIA.csv')))
    return city

def get_na():
    city = random.choice(list(open('word_data/NORTH_AMERICA.csv')))
    return city

def get_europe():
    city = random.choice(list(open('word_data/EUROPE.csv')))
    return city

def get_africa():
    city = random.choice(list(open('word_data/AFRICA.csv')))
    return city

def get_sa():
    city = random.choice(list(open('word_data/SOUTH_AMERICA.csv')))
    return city

def get_australia():
    city = random.choice(list(open('word_data/AUSTRALIA.csv')))
    return city

#Commits the new days word to database
def new_day():
    g = Goal_words(date = get_date(), asia = get_asia(), north_america = get_na(), europe = get_europe(), africa = get_africa(), south_america = get_sa(), australia = get_australia())
     
    db.session.add(g)
    db.session.commit()

#Initialises daily save states
def init_save(user):
    s = Save(date=date.today(), author=user)
    db.session.add(s)
    db.session.commit()