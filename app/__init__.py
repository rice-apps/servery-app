from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RA'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///foo.db"

db = SQLAlchemy(app)

import models
import main
import serveries
import users


