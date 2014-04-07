from pymongo import MongoClient
import json
import sys
from datetime import strftime, now
from pytz import timezone

client = MongoClient()
db = client.main
menu_items = db.menu_items
serveries = db.serveries

rice_time = timezone("US/Central").localize(now())

def insert(name, meal, servery, date=rice_time.strftime("%Y-%m-%d"),type="",tags=[]):
	menu_items.insert({
		{
			"name": name,
			"tags": tags,
			"type": type,
			"meal": meal,
			"date": date,
			"servery": serveries.find({name:servery})
		}
	})