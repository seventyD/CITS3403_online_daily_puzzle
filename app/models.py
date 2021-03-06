from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

    
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    games = db.relationship('Game', backref='author', lazy='dynamic')
    saves = db.relationship('Save', backref='author', lazy='dynamic')


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    win = db.Column(db.Boolean(), default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Stat {}>'.format(self.win)

class Goal_words(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(64))
    asia = db.Column(db.String(64))
    north_america = db.Column(db.String(64))
    europe = db.Column(db.String(64))
    africa = db.Column(db.String(64))
    south_america = db.Column(db.String(64))
    australia = db.Column(db.String(64))

    def __repr__(self):
        return '<Stat {}>'.format(self.date)


class Save(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.String(64))
    asia = db.Column(db.String(64), default="")
    north_america = db.Column(db.String(64), default="")
    europe = db.Column(db.String(64), default="")
    africa = db.Column(db.String(64), default="")
    south_america = db.Column(db.String(64), default="")
    australia = db.Column(db.String(64), default="")

    def __repr__(self):
        return '<Stat {}>'.format(self.date)

