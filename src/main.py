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

@app.route('/<path:filename>')
def send_file(filename):
  return send_from_directory('/static', filename)

import serveries

if __name__ == "__main__":
  app.debug = True
  app.run()