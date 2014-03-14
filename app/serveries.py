from app import app, mongo
from main import not_found
import bson
import json

# TODO(X): Adjust this per task 
#          https://app.asana.com/0/8548568858590/10871850836266
# @app.route('/api/serveries')
def get_serveries():
  # Query mongo db for all serveries
  serveries = mongo.db.serveries.find()

  return (bson.json_util.dumps(serveries), 
         200, 
         {"content-type" : "application/json"})

@app.route('/api/serveries')
def get_serveries_stub():
  print "This should work"
  serveries = [
    {
      "_id": "123",
      "name": "North Servery",
      "image": {
        "link": "./static/img/placeholder.jpeg"
      },
      "location": {
        "lat": 29.721883,
        "lng": -95.396546
      },
    }, {
      "_id": "124",
      "name": "West Servery",
      "image": {
        "link": "./static/img/placeholder.jpeg"
      },
      "location": {
        "lat": 29.721883,
        "lng": -95.396546
      },
    }
  ]

  return json.dumps(serveries), 200, {"content-type" : "application/json"}

@app.route('/api/serveries/<servery_id>')
def get_servery_stub(servery_id):
  if servery_id != "123" and servery_id != "124":
    return not_found()

  servery = {
    "_id": servery_id,
    "opening_hours": {
      "open_now": False,
      "periods": [
        {
          "meal": "lunch",
          "open": {
            "day": 0,
            "time": "1130"
          },
          "close": {
            "day": 0,
            "time": "1400"
          }
        }, {
          "meal": "dinner",
          "open": {
            "day": 0,
            "time": "1700"
          },
          "close": {
            "day": 0,
            "time": "1900"
          }
        }
      ]
    }
  }

  return json.dumps(servery), 200, {"content-type" : "application/json"}
