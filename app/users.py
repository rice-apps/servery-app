from app import app, db
from flask import request, jsonify, session
from models import User
import json



def current_user():
    if 'user' in session:
        return find_or_create_user(session['user'])
    else:
        return None

def find_or_create_user(username):
    user = db.session.query(User).filter(User.username == username).first()

    if user is None:
        user = User(username = username,email=None)
        db.session.add(user)
        db.session.commit()

    return user

@app.route('/api/user',methods = ['POST','GET'])
def get_user():
    if request.method == "GET":
        user = current_user()

        if user is not None:
            return jsonify({"username":user.username,"email":user.email})
        else:
            return jsonify({})
    else:
        user = current_user()
        data = json.loads(request.data)
        user.email = data["email"]
        db.session.commit()
        return jsonify({"username":user.username,"email":user.email})


