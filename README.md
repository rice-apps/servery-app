Demo App
========
A todo demo application that integrates the following stack:

Web Client: AngularJS
Server: Flask
Database: MongoDB

Local Development Environment
-----------------------------
In order to set up a local development environment, you need to install the following:
* [Python](http://www.python.org/getit/)
* [Flask](http://flask.pocoo.org/docs/installation/)
* [MongoDB](http://docs.mongodb.org/manual/installation/)
* [Flask-PyMongo](http://flask-pymongo.readthedocs.org/en/latest/)

In order to run the application locally. Start the mongo server with the following command at the system shell:

    mongod

Then, start the flask server with the following command under the src folder:

    python main.py

The terminal should display a message like

    Running on http://127.0.0.1:5000/

Simply type that address in your browser to open the app.

Written by
* [Waseem Ahmad](waseemahmad.com)
