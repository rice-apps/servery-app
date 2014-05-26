from app import app
from flask import request, jsonify, session


@app.route('/api/user')
def get_user():
    if 'user' in session:
        return jsonify({"name":session['user']})
    else:
        return jsonify({"name":None})
