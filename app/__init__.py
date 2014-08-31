from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

import json


class CustomJSONEncoder(json.JSONEncoder):

    def default(self, obj):
        if hasattr(obj, 'isoformat'):
            return obj.isoformat()
        else:
            return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
app.json_encoder = CustomJSONEncoder

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RA'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///foo.db"

app.config.from_object('config')

db = SQLAlchemy(app)

import models  # NOQA
import main  # NOQA
import serveries  # NOQA
import users  # NOQA
