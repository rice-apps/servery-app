
from sqlalchemy import Integer,Column,String
import datetime

from app import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String,nullable=False,unique=True)
    email = db.Column(db.String,nullable=True)


class Servery(db.Model):
    __tablename__ = 'serveries'

    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String,nullable=False)
    fullname = db.Column(db.String,nullable=False)

class MealTime(db.Model):
    __tablename__ = 'mealtimes'
    __table_args__ = (db.UniqueConstraint('day_of_the_week','meal_type','servery_id',name="1MealPerServery"),)

    id = db.Column(db.Integer,primary_key=True)
    meal_type = db.Column(db.Enum('lunch','dinner','breakfast',name='meal_type'),nullable=False)

    day_of_the_week = db.Column(db.Integer,nullable=False)
    start_time = db.Column(db.Time(),nullable=False)
    end_time = db.Column(db.Time(),nullable=False)

    servery_id = db.Column(db.ForeignKey("serveries.id"),nullable=False)
    servery = db.relationship("Servery",backref="mealtimes")

    def __repr__(self):
        return "[Meal type: {0}, Day of the week: {1}, Start time: {2}, End time: {3}]".format(
            self.meal_type,
            self.day_of_the_week,
            self.start_time,
            self.end_time
            )

class Meal(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer,primary_key=True)

    date = db.Column(db.Date(),nullable=False)

    mealtime_id = db.Column(db.ForeignKey("mealtimes.id"),nullable=False)
    mealtime = db.relationship("MealTime")

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer,primary_key=True)
    review = db.Column(db.String(),nullable=True)

class Dish(db.Model):
    __tablename__ = 'dishes'
    __table_args__ = (db.UniqueConstraint('dishdetails_id','meal_id',name="EachDishInMealUnique"),)


    id = db.Column(db.Integer,primary_key=True)

    dishdetails_id = db.Column(db.ForeignKey("dishdetails.id"),nullable=False)
    dishdetails = db.relationship("DishDetails",backref="dishes")

    meal_id = db.Column(db.ForeignKey("meals.id"),nullable=True)
    meal = db.relationship("Meal",backref="dishes")

class DishDetails(db.Model):
    __tablename__ = 'dishdetails'

    id = db.Column(db.Integer,primary_key=True)
    dish_description = db.Column(db.String(),nullable=False)

    score = db.Column(db.Integer,nullable=False)

    servery_id = db.Column(db.ForeignKey("serveries.id"),nullable=False)
    servery = db.relationship("Servery",backref="dishdetails")

class DishDetailsAndUserRelationship(db.Model):
    __tablename__ = "dishdetailsanduserrelationship"
    __table_args__ = (db.UniqueConstraint('user_id','dishdetails_id',name="1RelationshipPerUser"),)

    id = db.Column(db.Integer,primary_key=True)

    user_id = db.Column(db.ForeignKey("users.id"),nullable=False)
    user = db.relationship("User",backref="relationships")

    dishdetails_id = db.Column(db.ForeignKey("dishdetails.id"),nullable=False)
    dishdetails = db.relationship("DishDetails",backref="relationships")

    vote_type = db.Column(db.Enum('up','down','none',name='vote_type'),nullable=False,default="none")

    wants_alert = db.Column(db.Boolean,nullable=False,default=False)

