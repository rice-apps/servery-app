from flask import request
from app import app
import json
from datetime import datetime
import json
from util import current_rice_time

from models import *

@app.route('/api/serveries')
def get_serveries():
  # Query SQL for all serveries
  # returns servery NAME, IMAGE, and LOCATION
  serveries = [{'name':a.name,'fulllname':a.fullname,'id':a.id} for a in db.session.query(Servery).all()]
  print serveries

  return (json.dumps(serveries), 
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


  return json.dumps({"opening_hours":{"open_now":is_open}}) , 200, {"content-type" : "application/json"}


@app.route('/api/serveries/<servery_id>/menu')
def get_menu(servery_id):
  now = current_rice_time()

  # Query for menu items of servery given date (default today) and meal (default lunch and dinner)
  #date = request.args.get("date")
  #if not date:
  date = now.date()
  meal = request.args.get("meal")
  if not meal:
    meal = 'both'

  print date, meal

  if meal == "both":
    query_meals = ["lunch","dinner"]
  else:
    query_meals = [meal]

  #items = mongo.db.menu_items.find({"date":date, "meal": {"$in": query_meals}, "servery": ObjectId(servery_id)})
  menu = {"lunch": [], "dinner": []}
  
  lunch_query =  db.session.query(Meal).join(Meal.mealtime).filter(Meal.date ==date,MealTime.meal_type=='lunch')
  print lunch_query
  menu['lunch'] = lunch_query.one().dishes
  print menu['lunch']
  for item in items:
    if item["meal"] == "lunch":
      menu["lunch"].append(item) 
    elif item["meal"] == "dinner":
      menu["dinner"].append(item)

  

  return json.dumps(menu), 200, {"content-type" : "application/json"}


# @app.route('/api/serveries/<servery_id>/menu')
# def get_menu_stub(date=strftime("%Y-%m-%d"), meal="both"):
#   # Query for menu items of servery given date (default today) and meal (default lunch and dinner)
#   menu = [{
#     "_id": 123,
#     "name": "Mac and Cheese",
#     "tags": ["gluten","soy","milk"], 
#     "type": "main",
#     "meal": "lunch",
#     "date": "2014-03-10",
#     "servery": 311
#   },{
#     "_id": 124,
#     "name": "Golden Catfish with Tartar Sauce",
#     "tags": ["gluten","soy","milk","eggs","fish"],
#     "meal": "main",
#     "meal": "lunch",
#     "date": "2014-03-10",
#     "servery": 331
#   },{
#     "_id": 125,
#     "name": "Okra Garlic Tomato Stew",
#     "tags": ["gluten","soy"],
#     "type": "soup",
#     "meal": "lunch",
#     "date": "2014-03-10",
#     "servery": 312
#   },{
#     "_id": 126,
#     "name": "Cheesecake",
#     "tags": ["gluten","soy","milk","eggs"],
#     "type": "dessert",
#     "meal": "dinner",
#     "date": "2014-03-10",
#     "servery": 341
#   }]


#   return json.dumps(menu), 200, {"content-type" : "application/json"}



# @app.route('/api/serveries')
# def get_serveries_stub():
#   print "This should work"
#   serveries = [
#     {
#       "name": "North Servery",
#       "image": {
#         "link": "./static/img/placeholder.jpeg"
#       },
#       "location": {
#         "latitude":29.721883,
#         "longitude":-95.396546
#       },
#     }, {
#       "name": "West Colleges Servery",
#       "image": {
#         "link": "./static/img/placeholder.jpeg"
#       },
#       "location": {
#         "latitude":29.721063,
#         "longitude":-95.398481
#       }
#     }
#   ]

#   return json.dumps(serveries), 200, {"content-type" : "application/json"}

# @app.route('/api/serveries/<servery_id>')
# def get_servery_stub(servery_id):
#   if servery_id != "123" and servery_id != "124":
#     return not_found()

#   servery = {
#     "_id": servery_id,
#     "opening_hours": {
#       "open_now": False,
#       "periods": [
#         {
#           "meal": "lunch",
#           "open": {
#             "day": 0,
#             "time": "1130"
#           },
#           "close": {
#             "day": 0,
#             "time": "1400"
#           }
#         }, {
#           "meal": "dinner",
#           "open": {
#             "day": 0,
#             "time": "1700"
#           },
#           "close": {
#             "day": 0,
#             "time": "1900"
#           }
#         }
#       ]
#     }
#   }

#   return json.dumps(servery), 200, {"content-type" : "application/json"}
