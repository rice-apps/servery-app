
from sqlalchemy import Integer,Column,String

from app import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String,nullable=False)
    password = db.Column(db.String,nullable=False)

class Servery(db.Model):
    __tablename__ = 'serveries'

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    fullname = db.Column(db.String,nullable=False)

class MealTime(db.Model):
    __tablename__ = 'mealtimes'
    __table_args__ = (db.UniqueConstraint('day_of_the_week','meal_type','servery_id',name="1MealPerServery"),)

    id = db.Column(db.Integer,primary_key=True)
    meal_type = db.Column(db.Enum('lunch','dinner',name='meal_type'),nullable=False)

    day_of_the_week = db.Column(db.Integer,nullable=False)
    start_time = db.Column(db.Time(),nullable=False)
    end_time = db.Column(db.Time(),nullable=False)

    servery_id = db.Column(db.ForeignKey("serveries.id"),nullable=False)
    servery = db.relationship("Servery",backref="mealtimes")
