"""
Run this file once to setup your database.
"""

from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.main    # Our app uses main database

db.serveries.add( {})