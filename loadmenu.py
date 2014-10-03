"""
Run this file to load the newest menus.
"""

from app import db
from app.models import (Servery, MealTime, Meal, MealDish,
                        Dish, AllergyFlag)
from downloadmenu import process_servery_menu

from datetime import timedelta

import sys


def load_meals(base_address=None):

    for servery in db.session.query(Servery):
        print servery.name
        if base_address is not None:
            menu = process_servery_menu(servery.name,base_address)
        else:
            menu = process_servery_menu(servery.name)

        base_date = menu['base_date']

        for meal_type in ['lunch', 'dinner']:
            for day_of_the_week in menu[meal_type]:
                actual_date = base_date + timedelta(days=day_of_the_week)

                print meal_type, day_of_the_week, servery.name
                mealtime = db.session.query(MealTime).filter(
                    MealTime.meal_type == meal_type,
                    MealTime.servery == servery,
                    MealTime.day_of_the_week == day_of_the_week).scalar()

                if mealtime is not None:

                    meal = Meal(date=actual_date, mealtime=mealtime)
                    db.session.add(meal)
                    for dish_info in menu[meal_type][day_of_the_week]:
                        dish_description = dish_info.dish_description
                        dish_words = dish_description.split(" ")
                        dish_words_filtered = [word for word in dish_words if not ( "PM" in word or "AM" in word or "Brunch" in word or "Available" in word or "-" in word)]
                        dish_info.dish_description = " ".join(dish_words_filtered)
                        if dish_info.dish_description != "":
                            create_dish_from_dish_info(dish_info, servery, meal)    
                        

    db.session.commit()


def create_dish_from_dish_info(dish_info, servery, meal):
    
    
    dish = Dish(
        dish_description=dish_info.dish_description, score=0, servery=servery)


    for flag in dish_info.allergy_flags:
        flagobj = AllergyFlag(dish=dish, allergyflag=flag)
        db.session.add(flagobj)

    mealdish = MealDish(meal=meal, dish=dish)
    db.session.add(mealdish)

import urlparse, urllib

def path2url(path):
    return urlparse.urljoin(
      'file:', urllib.pathname2url(path))

if __name__ == "__main__":
    if len(sys.argv) == 2:
        load_meals(path2url(sys.argv[1]))
    else:
        load_meals()
