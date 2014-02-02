from main import app, mongo
from bson.json_util import dumps

@app.route('/api/serveries')
def get_serveries():
  print "This should work"
  # Query mongo db for all serveries
  serveries = mongo.db.serveries.find()
  return dumps(serveries), 200, {"Content-Type" : "application/json"}

print "Api serveries loaded"
