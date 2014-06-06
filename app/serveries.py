from flask import request, abort
from app import app
import json
from datetime import datetime
import json
from util import current_rice_time, parse_to_rice_time
import users
from models import *



def find_mealtime(servery,day_of_the_week,meal_type):
    return db.session.query(MealTime).filter(MealTime.servery==servery,MealTime.day_of_the_week == day_of_the_week,MealTime.meal_type == meal_type).scalar()

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

def get_dishdetails_data(dishdetails):
  return {
    "name":dishdetails.dish_description,
    "score":dishdetails.score,
    "id": dishdetails.id
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


@app.route('/api/serveries/<int:servery_id>')
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


@app.route('/api/serveries/<int:servery_id>/menu')
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
        menu[meal_type] = map(lambda x: get_dishdetails_data(x.dishdetails),meal.dishes)
  

  return json.dumps(menu), 200, {"content-type" : "application/json"}



def find_next_meals(now):
  """
  Finds the next type of meal for the given day and then returns a list containing the MealTime for every servery
  """

  day_of_the_week = now.weekday()
  time = now.time()

  # I first find one MealTime that is closest in time
  time_filter = db.and_(MealTime.day_of_the_week == day_of_the_week,MealTime.end_time >= time)
  coming_mealtimes = db.session.query(MealTime).filter(time_filter).order_by(MealTime.start_time) 
  first_mealtime = coming_mealtimes.first()


  # Then I get all mealtimes of that day and type
  equivalent_mealtime_filter = db.and_(
    MealTime.day_of_the_week == first_mealtime.day_of_the_week,
    MealTime.meal_type == first_mealtime.meal_type)

  all_meals_at_time = db.session.query(MealTime).filter(equivalent_mealtime_filter)

  return all_meals_at_time


@app.route('/api/serveries/next_meals')
def get_next_meals():
  """
  Queries the database for the next possible meal.
  """

  now = datetime.datetime(2014,6,8,16)
  day_of_the_week = now.weekday()
  print day_of_the_week
  time  = now.time()
  
  next_mealtimes = find_next_meals(now)

  print list(db.session.query(Meal).all())[0].mealtime

  def process_mealtime(mealtime):
    meal = db.session.query(Meal).filter(Meal.mealtime == mealtime,Meal.date == now.date()).first()
    if meal is not None:
      dishes = meal.dishes
    else:
      dishes = []

    return {
      "servery": get_servery_data(mealtime.servery),
      "dishes": map(lambda x: get_dishdetails_data(x.dishdetails),dishes),
      "meal_type": mealtime.meal_type
    }


  result = map(process_mealtime,next_mealtimes)

  return  json.dumps(result,default=json_date_handler), 200, {"content-type" : "application/json"}




@app.route('/api/dishdetails/<int:dishdetails_id>/vote/<vote_type>')
def vote(dishdetails_id,vote_type):
  if vote_type not in ("up","down","none"):
    abort(404)

  user = users.current_user()

  if user is None:
    abort(403)

  vote = db.session.query(DishDetailsVote).filter(DishDetailsVote.user==user,DishDetailsVote.dishdetails_id==dishdetails_id).scalar()

  if vote is None:
    vote = DishDetailsVote(user=user,dishdetails=db.session.query(DishDetails).get(dishdetails_id),vote_type="none")
    db.session.add(vote)
    db.session.commit()
  else:
    update_score_on_vote_removal(vote)

  vote.vote_type = vote_type
  update_score_on_vote_addition(vote)

  db.session.commit()


  result = {"new_score": vote.dishdetails.score}

  return json.dumps(result),200,{"content-type" : "application/json"}

def update_score_on_vote_removal(old_vote):
  dishdetails = old_vote.dishdetails
  if old_vote.vote_type == "up":
    dishdetails.score -= 1
  elif old_vote.vote_type == "down":
    dishdetails.score += 1

def update_score_on_vote_addition(new_vote):
  dishdetails = new_vote.dishdetails
  print dishdetails
  if new_vote.vote_type == "up":
    dishdetails.score += 1
  elif new_vote.vote_type == "down":
    dishdetails.score -= 1  
