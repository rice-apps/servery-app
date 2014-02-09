from main import app, mongo
from bson.json_util import dumps

@app.route('/api/serveries')
def get_serveries():
  # Query mongo db for all serveries
  print "ran"
  serveries = mongo.db.serveries.find()
  return dumps(serveries), 200, {"Content-Type" : "application/json"}
