from sqlalchemy import true
from datetime import date
from app.models import Save, Goal_words,Game,User  
from app.forms import RegistrationForm,LoginForm
from werkzeug.security import check_password_hash
from app.routes import check_day,new_day,init_save
from app import app, db

import unittest  
#Some tests may only work if their is nothing already in the database
class Test_TestModels(unittest.TestCase):


        

            
    def test_user(self):
        #Tests adding user to database words
        user = User(username="test", email="test@test.com")
        user.set_password("test")
        db.session.add(user)
        db.session.commit()
        self.assertEqual(User.query.filter_by(username = "test").first().email,"test@test.com")
        self.assertEqual(True,check_password_hash(User.query.filter_by(username = "test").first().password_hash, "test"))
        db.session.delete(user)
        db.session.commit()


    def test_goal_words(self):
        #Tests that a new day will create goal words from the correct lists
        new_day()
        self.assertTrue(Goal_words.query.all()[0].asia in list(open('word_data/ASIA.csv')))
        self.assertTrue(Goal_words.query.all()[0].australia in list(open('word_data/AUSTRALIA.csv')))
        self.assertTrue(Goal_words.query.all()[0].europe in list(open('word_data/EUROPE.csv')))
        self.assertTrue(Goal_words.query.all()[0].north_america in list(open('word_data/NORTH_AMERICA.csv')))
        self.assertTrue(Goal_words.query.all()[0].south_america in list(open('word_data/SOUTH_AMERICA.csv')))
        self.assertTrue(Goal_words.query.all()[0].africa in list(open('word_data/AFRICA.csv')))
        self.assertEqual(Goal_words.query.all()[0].date,str(date.today()))
        self.assertTrue(check_day())
        
        words = Goal_words.query.all()
        for k in words:
            db.session.delete(k)
        db.session.commit()


    def test_game(self):
        #Tests adding game to database words
        game = Game(win = 0)
        db.session.add(game)
        db.session.commit()

        self.assertEqual(Game.query.all()[0].win,0)
        db.session.delete(game)
        db.session.commit()
        


    def test_save(self):
        #Tests the save database correctly links with user
        user = User(username="test", email="test@test.com")
        user.set_password("test")
        db.session.add(user)
        db.session.commit()

        init_save(user)
        self.assertEqual(Save.query.all()[0].user_id,User.query.filter_by(username = "test").first().id)

        words = Save.query.all()
        for k in words:
            db.session.delete(k)

        db.session.commit()
        db.session.delete(user)
        db.session.commit()
    

        
if __name__ == '__main__':
    unittest.main()