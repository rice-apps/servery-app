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
		{'name':'North', 'image':''},
		{'name':'East', 'image':''}, 
		{'name':'South', 'image':''}, 
		{'name':'West', 'image':''}, 
		{'name':'Sid', 'image':''}, 
		{'name':'Baker', 'image':''} 
	]
	for serv in servInfo:
		serveries.update({'name':serv['name']}, serv, True)

for arg in sys.argv:
	if arg == '--clean':
		serveries.remove()
	main()
