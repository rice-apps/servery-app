from . import app, db
from .models import User

from flask import request, jsonify, session

import json


def current_user():
    if 'user' in session:
        return find_or_create_user(session['user'])
    else:
        if 'anonuser' in session:
            return db.session.query(User).get(session['anonuser'])
        else:
            anonuser = User(username=None, email=None)
            db.session.add(anonuser)
            db.session.commit()

            session['anonuser'] = anonuser.id

            return anonuser


def find_or_create_user(username):
    user = db.session.query(User).filter(User.username == username).scalar()

    if user is None:
        user = User(username=username, email=None)
        db.session.add(user)
        db.session.commit()

    return user




def get_user_data(user):
    return {
        "username": user.username,
        "email": user.email
    }


@app.route('/api/user', methods=['POST', 'GET'])
def get_user():
    if request.method == "GET":
        user = current_user()

        if user is not None:
            return jsonify(get_user_data(user))
        else:
            return jsonify({})
    else:
        user = current_user()
        data = json.loads(request.data)
        user.email = data["email"]
        db.session.commit()
        return jsonify(get_user_data(user))