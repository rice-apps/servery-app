"""
Run this file once to setup your database.
"""

from pymongo import MongoClient
import json
import sys

client = MongoClient()
db = client.main
serveries = db.serveries
	
def main():
	servInfo = [ 
		{	
			'name':'North', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Martel', 'Jones', 'Brown'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					},
					'saturday': {
						'open': '9:00AM',
						'close': '11:00AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					},
					'saturday, sunday': {
						'open': '11:30AM',
						'close': '2:00PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					},
					'friday, sunday': {
						'open': '5:00PM',
						'close': '7:00PM'
					}
				}
			},
			'description': 'filler'
		},

		{	
			'name':'Seibel', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Will Rice', 'Lovett'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					},
					'saturday': {
						'open': '9:00AM',
						'close': '11:00AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					},
					'saturday, sunday': {
						'open': '11:30AM',
						'close': '2:00PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					},
					'friday, sunday': {
						'open': '5:00PM',
						'close': '7:00PM'
					}
				}
			},
			'description': 'filler'
		},

		{	
			'name':'South', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Hanszen', 'Wiess'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					},
					'sunday': {
						'open': '11:30AM',
						'close': '2:00PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					},
					'friday, sunday': {
						'open': '5:00PM',
						'close': '7:00PM'
					}
				}
			},
			'description': 'filler'
		},

		{	
			'name':'West', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Duncan', 'McMurtry'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					},
					'sunday': {
						'open': '11:30AM',
						'close': '2:00PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					},
					'friday, sunday': {
						'open': '5:00PM',
						'close': '7:00PM'
					}
				}
			},
			'description': 'filler'
		},

		{	
			'name':'Baker', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Baker'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					}
				}
			},
			'description': 'filler'
		},

		{	
			'name':'Sid Richardson', 
			'image':{
				'link':'./static/img/placeholder.jpeg'
			},
			'location': {
				'latitude': 0,
				'longitude': 0
			},
			'colleges_served': ['Sid Richardson'],
			'times_open': {
				'breakfast': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '7:30AM',
						'close': '10:30AM'
					}
				},
				'lunch': {
					'monday, tuesday, wednesday, thursday, friday': {
						'open': '11:30AM',
						'close': '1:30PM'
					}
				},
				'dinner': {
					'monday, tuesday, wednesday, thursday': {
						'open': '5:30PM',
						'close': '7:30PM'
					}
				}
			},
			'description': 'filler'
		}
	]
	for serv in servInfo:
		serveries.update({'name':serv['name']}, serv, True)

for arg in sys.argv:
	if arg == '--clean':
		serveries.remove()
	main()
