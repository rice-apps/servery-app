from flask import Flask, render_template, send_from_directory, jsonify, request
from flask.ext.pymongo import PyMongo
from bson import BSON, json_util
from bson.json_util import dumps
import json

import random

app = Flask(__name__)
mongo = PyMongo(app)

@app.route('/')
def main():
  # return render_template('static/index.html')
  return send_from_directory('static', 'index.html')

@app.route('/api/<string:userid>')
def get_all_items(userid):
  # Query mongo db for all todo items
  items = mongo.db.todoitems.find( { "userid" : userid } )

  # Dump the result into json, HTTP 200 OK, set content-type header
  if(items.count() == 0):
    jsondict = []
  else:
    jsondict = items[0]["items"]

  return dumps(jsondict, sort_keys=True, indent=4, default=json_util.default), 200, {"Content-Type" : "application/json"}

@app.route('/api/<string:userid>', methods=['PUT'])
def set_all_items(userid):
  # Get the items from the request into a native list
  app.logger.debug(request)
  app.logger.debug(request.data)
  items = json.loads(request.data)

  record =  {
      "userid" : userid,
      "items" : [{'title': item['title'], 'completed': item['completed']} for item in items]
    }

  #mongo.db.todoitems.save(record)
  mongo.db.todoitems.update( { "userid" : userid }, record, True)

  app.logger.debug(items)
  return "OK", 200, {"Content-Type" : "application/json"}

@app.route('/<path:filename>')
def send_file(filename):
  return send_from_directory('/static', filename)

if __name__ == "__main__":
  app.debug = True
  app.run()