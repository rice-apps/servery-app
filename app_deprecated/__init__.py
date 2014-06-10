from flask import Flask
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RA'
mongo = PyMongo(app)

import main
import serveries