from app import app, mongo
from main import not_found
import bson
import json
from datetime import strftime, now
from pytz import timezone

rice_time = timezone("US/Central").localize(now())

# TODO(X): Adjust this per task 
#          https://app.asana.com/0/8548568858590/10871850836266
@app.route('/api/serveries')
def get_serveries():
  # Query mongo db for all serveries
  # returns servery NAME, IMAGE, and LOCATION
  serveries = mongo.db.serveries.find({},{"name": 1, "image": 1, "location": 1,})

  return (bson.json_util.dumps(serveries), 
         200, 
         {"content-type" : "application/json"})


@app.route('/api/serveries/<servery_id>')
def get_servery(servery_id):
  # Query for all data for specific servery
  # gets current time and day of week to see if servery is currently open
  curr_day = int(rice_time.strftime("%w"))
  curr_time = rice_time.strftime("%H%M")

  # retrieves actual servery
  servery = mongo.db.serveries.find({_id: servery_id})
  open_now = False
  for period in servery["opening_hours"]["periods"]:
    if period["open"]["day"] == curr_day and curr_time >= period["open"]["time"] and curr_time <= period["close"]["time"]:
      open_now = True
      break
  # stores if servery is open
  servery["opening_hours"]["open_now"] = open_now

  return json.dumps(servery), 200, {"content-type" : "application/json"}


# @app.route('/api/serveries/<servery_id>/menu')
def get_menu(date=rice_time.strftime("%Y-%m-%d"), meal="both"):
  # Query for menu items of servery given date (default today) and meal (default lunch and dinner)
  if meal == "both":
    query_meals = ["lunch","dinner"]
  else:
    query_meals = [meal]

  menu = mongo.db.menu_items.find({"date":date, "meal": {$in: query_meals}}, "servery": servery_id)

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
