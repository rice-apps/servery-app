"""
Run this file once to setup your database.
"""
from app import db
from app.models import Servery,MealTime,Meal,Dish,User,DishDetails
from app.api.serveries.downloadmenu import process_servery_menu

import random

from datetime import time,timedelta
import datetime
import calendar


def setup_all():
    setup_db()
    setup_serveries()

    db.session.commit()

    load_fake_users()

    create_fake_dishdetails()
    db.session.commit()
    create_fake_meals_for_current_month()

    db.session.commit()


def setup_db():
    db.drop_all()
    db.create_all()

def load_fake_users():
    u1 = User(username="a",email="yokolee1013@gmail.com",preference_id=1)
    u2 = User(username="b",email="hl33@rice.edu",preference_id=2)
    db.session.add(u1)
    db.session.add(u2)

    db.session.commit()



def create_fake_meals_for_current_month():
    date = datetime.date.today()

    number_of_days_in_month = calendar.monthrange(date.year,date.month)[1]
    for day in range(1,number_of_days_in_month+1):
        that_day = datetime.date(date.year,date.month,day)
        day_of_the_week = that_day.weekday()

        mealtimes = db.session.query(MealTime).filter(MealTime.day_of_the_week==day_of_the_week).all()

        for mealtime in mealtimes:
            create_fake_meal(mealtime,that_day)

    db.session.commit()


def create_fake_dishdetails():
    serveries = db.session.query(Servery).all()

    for servery in serveries:
        create_fake_dishdetails_for_servery(servery)

def create_fake_dishdetails_for_servery(servery):
    dish_options = ["Hamburger","Steak","Eggs","Burrito","Pizza","Pasta","Froy","Apple","Pie","Chicken","Beans","Soup","Sandwich"]
    for option in dish_options:
        dishdetails = DishDetails(dish_description= (option + " "+servery.fullname),servery=servery,score=0)
        db.session.add(dishdetails)


def create_fake_meal(mealtime,date):
    meal = Meal(mealtime = mealtime,date = date)
    db.session.add(meal)

    for i in range(4):
        create_fake_dish(meal)


def create_fake_dish(meal):
    dish_options = db.session.query(DishDetails).filter(DishDetails.servery == meal.mealtime.servery).all()

    dishdetails = random.choice(dish_options)

    dish = Dish(dishdetails = dishdetails,meal = meal)
    db.session.add(dish)

def load_meals():

    for servery in db.session.query(Servery):
        menu = process_servery_menu(servery.name)
        base_date = menu['base_date']

        for meal_type in ['lunch','dinner']:
            for day_of_the_week in menu[meal_type]:
                actual_date = base_date + timedelta(days = day_of_the_week)
                print meal_type,day_of_the_week,servery.name
                mealtime = db.session.query(MealTime).filter(
                        MealTime.meal_type == meal_type,
                        MealTime.servery   == servery,
                        MealTime.day_of_the_week == day_of_the_week).first()

                if mealtime is not None:

                    meal = Meal(date=actual_date,mealtime=mealtime)
                    db.session.add(meal)

                    for dish_description in menu[meal_type][day_of_the_week]:
                        dish = Dish(meal=meal,dish_description=dish_description)
                        db.session.add(dish)
    db.session.commit()

                    


def setup_serveries():
    serv_info = [ 
            {	
                'name':'north', 
                'fullname':'North Servery', 
                'serv_type': 0,
                'image':{
                    'link':'./static/img/placeholder.jpeg'
                    },    
                "location":{
                    "latitude":29.721883,
                    "longitude":-95.396546
                    },
                'colleges_served': ['Martel', 'Jones', 'Brown'],
                'description': 'filler'
                },

            {	
                'name':'seibel', 
                'fullname':'Seibel Servery, Abe and Annie', 
                'serv_type': 0,
                'image':{
                    'link':'./static/img/placeholder.jpeg'
                    },    
                "location": {
                    "latitude":"29.716158",
                    "longitude":"-95.398241"
                    },
                'colleges_served': ['Will Rice', 'Lovett'],
                'description': 'filler'
                },

            {	
                'name':'south',
                'fullname':'South Servery', 
                'serv_type': 1,
                'image':{
                    'link':'./static/img/placeholder.jpeg'
                    },
                "location":{
                    "latitude":"29.715484",
                    "longitude":"-95.401024"
                    },
                'colleges_served': ['Hanszen', 'Wiess'],
                'description': 'filler'
                },

            {	
                'name':'west', 
                'fullname':'West Servery', 
                'serv_type': 1,
                'image':{
                    'link':'./static/img/placeholder.jpeg'
                    },
                "location":{
                    "latitude":"29.721063",
                    "longitude":"-95.398481"
                    },
                'colleges_served': ['Duncan', 'McMurtry'],
                'description': 'filler'
                },

            {	
                    'name':'baker',
                    'fullname':'Baker College Kitchen', 
                    'serv_type': 2,
                    'image':{
                        'link':'./static/img/placeholder.jpeg'
                        },
                    "location":{ # baker college coordinates
                        "latitude":"29.716976",
                        "longitude":"-95.399289"
                        },
                    'colleges_served': ['Baker'],
                    'description': 'filler'
                    },

            {	
                    'name':'sid',
                    'fullname':'Sid Richardson Kitchen', 
                    'serv_type': 2,
                    'image':{
                        'link':'./static/img/placeholder.jpeg'
                        },
                    "location":{ # sid rich college coordinates
                        "latitude":"29.715162",
                        "longitude":"-95.398915"
                        },
                    'colleges_served': ['Sid Richardson'],
                    'description': 'filler'
                    }
            ]

        # fills servery times
    fill_servery(serv_info)


    for serv in serv_info:
        servery_data = Servery(name=serv['name'],fullname=serv['fullname'])

        days =  serv['opening_hours']['periods']

        for day in days:
            for meal_type in days[day].keys():
                mealtime = MealTime(
                        meal_type=meal_type,
                        day_of_the_week=day,
                        start_time = days[day][meal_type]['time_open'],
                        end_time = days[day][meal_type]['time_close'])

                servery_data.mealtimes.append(mealtime)
        db.session.add(servery_data)

    db.session.commit()



def fill_servery(serv):
    """
        fills in servery open times
        serv type 0 is North/Seibel
        serv type 1 is South/West
        serv type 2 is Sid/Baker

        serv is the servery JSON object and index is its position
    """
    for index in xrange(len(serv)):
        serv_type = serv[index]["serv_type"]
        periods = {}

        # M-H
        for i in xrange(0,5):
            periods[str(i)] = {

                    "breakfast": {
                        "time_open": time(7,30),
                        "time_close": time(10,30)
                        },
                    "lunch": {
                        "time_open": time(11,30),
                        "time_close": time(13,30)
                        },
                    "dinner": {
                        "time_open": time(17,30),
                        "time_close": time(19,30)
                        }
                    }

            # remove Friday dinners cause they are different for everyone
            if i == 4:
                del(periods[str(i)]["dinner"])

        # add other times for non Sid/Baker
        if serv_type in [0,1]:
            # add friday dinner
            periods["4"]["dinner"] = {
                    "time_open": time(17,0),
                    "time_close": time(19,0)
                    }

            # adds sunday dinner and lunch
            periods["6"] = {
                    "lunch": {
                        "time_open": time(11,30),
                        "time_close": time(14,0)
                        },
                    "dinner": {
                        "time_open": time(17,0),
                        "time_close": time(19,0)
                        }
                    }

            # adds Saturday lunch/dinner to North/Seibel
            if serv_type == 0:
                periods["5"] = {
                        "breakfast": {
                            "time_open": time(9,0),
                            "time_close": time(11,0)
                            },
                        "lunch": {
                            "time_open": time(11,30),
                            "time_close": time(14,0)
                            }
                        }

        serv[index]["opening_hours"] = {
                        "periods": periods
                        }

        del serv[index]["serv_type"]

if __name__== "__main__":
    setup_all()
