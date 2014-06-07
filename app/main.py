from app import app,db
from app.models import *
from flask import Flask,redirect, jsonify, request, session
from flask.ext.mail import Mail, Message
from functools import reduce
import operator
import auth
import users

mail = Mail(app)
app.config.update(
    DEBUG=True,
    #EMAIL SETTINGS
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME = 'riceservery@gmail.com',
    )




@app.route('/')
def root():
  mail = Mail(app)

  dishes = reduce(operator.add,[d.dishes for d in db.session.query(Meal).all()])
  users = db.session.query(User).all()
  recipients_info = {}

  for user in users:
    if user.preference in dishes and user.email != None:
      recipients_info[user.email] = {}
      recipients_info[user.email]["name"] = user.username
      recipients_info[user.email]["dish"] = user.preference.dish_description
      recipients_info[user.email]["date"] = user.preference.meal.date
      recipients_info[user.email]["meal_type"] = user.preference.meal.mealtime.meal_type
      recipients_info[user.email]["servery"] = user.preference.meal.mealtime.servery.name

  # print 'recipients info', recipients_info
  with mail.connect() as conn:
    for email in recipients_info.keys(): 
      message = "Hi, %s! \n Your favorite dish %s is available during %s at %s servery on %s" % (recipients_info[email]["name"], 
        recipients_info[email]["dish"],
        recipients_info[email]["meal_type"],
        recipients_info[email]["servery"],
        recipients_info[email]["date"])

      message_html = "Hi, %s! <br> <br> Your favorite dish <b>%s</b> is available during <b>%s</b> at <b>%s</b> servery on %s" % (recipients_info[email]["name"], 
        recipients_info[email]["dish"],
        recipients_info[email]["meal_type"],
        recipients_info[email]["servery"],
        recipients_info[email]["date"])


      subject = "Hi %s, your favorite food is available today!" % (recipients_info[email]["name"])
      msg = Message(sender = ("Rice Servery App", "riceservery@gmail.com"),
                    recipients=[email],
                    subject=subject)
      msg.body = message
      msg.html = message_html
      conn.send(msg)                              


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
