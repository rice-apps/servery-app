from app import app
from flask import redirect, jsonify, request, session, send_from_directory

import json
import random
import auth

@app.route('/')
def main():
  print "Testing"
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

@app.errorhandler(404)
def not_found(error=None):
  message = {
    'status': 404,
    'message': 'Not Found',
    'request': {
      'url': request.url
    }
  }
  resp = jsonify(message)
  resp.status_code = 404
  return resp
