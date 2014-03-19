"""
Run this file once to setup your database.
"""

from pymongo import MongoClient
import json
import sys

client = MongoClient()
db = client.app
menu_items = db.menu_items
serveries = db.serveries

def main():
	serv_info = [ 
		{	
			'name':'North Servery', 
			'serv_type': 0,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},    
			"location":{
				"latitude":29.721883,
		    "longitude":-95.396546
	    },
			'colleges_served': ['Martel', 'Jones', 'Brown'],
			'description': 'filler'
		},

		{	
			'name':'Seibel Servery, Abe and Annie', 
			'serv_type': 0,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},    
			"location": {
		      	"latitude":"29.716158",
		      	"longitude":"-95.398241"
		    },
			'colleges_served': ['Will Rice', 'Lovett'],
			'description': 'filler'
		},

		{	
			'name':'South Servery', 
			'serv_type': 1,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			"location":{
		     	"latitude":"29.715484",
		     	"longitude":"-95.401024"
		   	},
			'colleges_served': ['Hanszen', 'Wiess'],
			'description': 'filler'
		},

		{	
			'name':'West Servery', 
			'serv_type': 1,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
		    "location":{
   			  "latitude":"29.721063",
   				"longitude":"-95.398481"
   			},
			'colleges_served': ['Duncan', 'McMurtry'],
			'description': 'filler'
		},

		{	
			'name':'Baker College Kitchen', 
			'serv_type': 2,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			"location":{ # baker college coordinates
    			"latitude":"29.716976",
    		  	"longitude":"-95.399289"
    		},
			'colleges_served': ['Baker'],
			'description': 'filler'
		},

		{	
			'name':'Sid Richardson Kitchen', 
			'serv_type': 2,
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
	    "location":{ # sid rich college coordinates
  		  	"latitude":"29.715162",
  		  	"longitude":"-95.398915"
  		},
			'colleges_served': ['Sid Richardson'],
			'description': 'filler'
		}
	]

	# fills servery times
	fill_servery(serv_info)

	for serv in serv_info:
		serveries.update({'name':serv['name']}, serv, True)
		print "Servery %s added" % serv['name']
	return


	# adds temporary foods
	temp_menu = [{
		"name": "Mac and Cheese",
		"tags": ["gluten","soy","milk"], 
		"type": "main",
		"meal": "lunch",
		"date": "2014-03-10",
		"servery": serveries.find({"name":"North Servery"})
	},{
		"name": "Golden Catfish with Tartar Sauce",
		"tags": ["gluten","soy","milk","eggs","fish"],
		"meal": "main",
		"meal": "lunch",
		"date": "2014-03-10",
		"servery": serveries.find({"name":"South Servery"})
	},{
		"name": "Okra Garlic Tomato Stew",
		"tags": ["gluten","soy"],
		"type": "soup",
		"meal": "lunch",
		"date": "2014-03-10",
		"servery": serveries.find({"name":"West Servery"})
	},{
		"name": "Cheesecake",
		"tags": ["gluten","soy","milk","eggs"],
		"type": "dessert",
		"meal": "dinner",
		"date": "2014-03-10",
		"servery": serveries.find({"name":"Baker College Kitchen"})
	}]

	menu_items.insert(temp_menu)

def fill_servery(serv):
	"""
	fills in servery open times
	serv type 0 is North/Seibel
	serv type 1 is South/West
	serv type 2 is Sid/Baker

	serv is the servery JSON object and index is its position
	"""
	for index in xrange(len(serv)):
		serv_type = serv[index]["serv_type"]
		periods = []

		# M-H
		for i in xrange(1,6):
			periods.extend([{
					"meal": "breakfast",
					"open": {
						"day": i,
						"time": "0730"
					},
					"close": {
						"day": i,
						"time": "1030"
					}
				}, {
					"meal": "lunch",
					"open": {
						"day": i,
						"time": "1130"
					},
					"close": {
						"day": i,
						"time": "1330"
					}
				}, {
					"meal": "dinner",
					"open": {
						"day": i,
						"time": "1730"
					},
					"close": {
						"day": i,
						"time": "1930"
					}
				}
			])

		# remove Friday dinners
		periods.pop(-1)

		# add other times for non Sid/Baker
		if serv_type in [0,1]:
			periods.append({
				"meal": "dinner",
				"open": {
					"day": 0,
					"time": "1700"
				},
				"close": {
					"day": 0,
					"time": "1900"
				}
			})

			# adds sunday dinner and lunch
			periods.insert(0,{
				"meal": "dinner",
				"open": {
					"day": 0,
					"time": "1700"
				},
				"close": {
					"day": 0,
					"time": "1900"
				}
			})

			periods.insert(0,{
				"meal": "lunch",
				"open": {
					"day": 0,
					"time": "1130"
				},
				"close": {
					"day": 0,
					"time": "1400"
				}
			})

			# adds Saturday lunch/dinner to North/Seibel
			if serv_type == 0:
				periods.extend([{
						"meal": "breakfast",
						"open": {
							"day": 6,
							"time": "0900"
						},
						"close": {
							"day": 6,
							"time": "1100"
						}
					}, {
						"meal": "lunch",
						"open": {
							"day": 6,
							"time": "1130"
						},
						"close": {
							"day": 6,
							"time": "1400"
						}
					}
				])

		serv[index]["opening_hours"] = {
			"periods": periods
		}

		del serv[index]["serv_type"]


for arg in sys.argv:
	if arg == '--clean':
		serveries.remove()
	main()
