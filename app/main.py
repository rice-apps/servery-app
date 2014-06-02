from app import app,db
from app.models import *
from flask import Flask,redirect, jsonify, request, session
from flask.ext.mail import Mail, Message
import auth

mail = Mail(app)
app.config.update(
    DEBUG=True,
    #EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'riceservery@gmail.com',
    MAIL_PASSWORD = 'Riceservery2014'
    )




@app.route('/')
def root():
  meals = db.session.query(Meal).all()
  for meal in meals:
    if db.session.query()
  
  print dishes
  return app.send_static_file('index.html')



@app.route('/mail')
def mail():
    mail = Mail(app)
    msg = Message("Hello",sender = "yokolee1013@gmail.com",recipients=["yokolee1013@gmail.com"])
    mail.send(msg)
    return app.send_static_file('index.html')



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
