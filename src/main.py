from flask import Flask, render_template, session, send_from_directory, jsonify, request, redirect
from flask.ext.pymongo import PyMongo
from bson import BSON, json_util
from bson.json_util import dumps
import json
import random
import auth

app = Flask(__name__)
# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RA'
mongo = PyMongo(app)

@app.route('/')
def main():
  # return render_template('static/index.html')
  return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def send_file(filename):
  return send_from_directory('/static', filename)

@app.route('/auth/login-response')
def get_login():
    ticket = request.args['ticket'] #Hardcoded until ticket/username parameters can be gotten
    username = "dan1"
    if auth.is_valid(ticket):
        session[username] = 'New Session'
        return redirect('serveries')
    else:
        return redirect('error')

if __name__ == "__main__":
  app.debug = True
  app.run()
  
