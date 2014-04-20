from flask import request
from app import app
import json
from datetime import datetime
import json
from util import current_rice_time, parse_to_rice_time

from models import *



def find_mealtime(servery,day_of_the_week,meal_type):
    return db.session.query(MealTime).filter(MealTime.servery==servery,MealTime.day_of_the_week == day_of_the_week,MealTime.meal_type == meal_type).first()
def get_servery_data(servery):
    return {
            "name": servery.name,
            "fullname": servery.fullname,
            "id": servery.id,
            "hours": {
                day_of_the_week : {
                    meal_type : {
                        'start_time' : find_mealtime(servery,day_of_the_week,meal_type).start_time,
                        'end_time'   : find_mealtime(servery,day_of_the_week,meal_type).end_time
                        } for meal_type in ['breakfast','lunch','dinner'] if find_mealtime(servery,day_of_the_week,meal_type) != None
                    } for day_of_the_week in range(7)
                }
            }

def json_date_handler(obj):
    if hasattr(obj,'isoformat'):
        return obj.isoformat()
    else:
        raise TypeError,' Object of type %s with value of %s is not JSON serialzable' % (type(obj),repr(obj))


@app.route('/api/serveries')
def get_serveries():
  # Query SQL for all serveries
  # returns servery NAME, IMAGE, and LOCATION
  serveries = db.session.query(Servery).all()

  return (json.dumps([get_servery_data(servery) for servery in serveries],default=json_date_handler), 
         200, 
         {"content-type" : "application/json"})


@app.route('/api/serveries/<servery_id>')
def get_servery(servery_id):
  # Query for all data for specific servery
  # gets current time and day of week to see if servery is currently open
  now = current_rice_time()
  day_of_the_week = now.weekday()
  time  = now.time()

  # retrieves actual servery
  servery = db.session.query(Servery).get(servery_id) 

  open_filter = db.and_(MealTime.day_of_the_week == day_of_the_week,MealTime.start_time <= time,MealTime.end_time >= time)

  currently_open = db.session.query(Servery).filter(Servery.id==servery_id).join(Servery.mealtimes).filter(open_filter)


  is_open = len(currently_open.all()) == 1

  servery_data = get_servery_data(servery)

  servery_data['open_now'] = is_open


  return json.dumps(servery_data,default=json_date_handler) , 200, {"content-type" : "application/json"}


@app.route('/api/serveries/<servery_id>/menu')
def get_menu(servery_id):
  servery = db.session.query(Servery).get(servery_id)

  if request.args.get("date"):
    date = parse_to_rice_time(request.args.get("date")).date()
  else:
    date = current_rice_time.date()

  meal = request.args.get("meal")
  if not meal:
    meal = 'both'

  if meal == "both":
    query_meals = ["lunch","dinner"]
  else:
    query_meals = [meal]

  menu = {"lunch": [], "dinner": []}

  def meal_type_query(meal_type):
      return db.session.query(Meal).join(Meal.mealtime).filter(
              Meal.date ==date,
              MealTime.meal_type==meal_type,
              MealTime.servery == servery)

  for meal_type in query_meals:
    meal = meal_type_query(meal_type).first()
    if meal:
        menu[meal_type] = map(lambda x: {'name':x.dish_description},meal.dishes)
  

  return json.dumps(menu), 200, {"content-type" : "application/json"}
