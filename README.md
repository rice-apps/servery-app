Servery App
===========
An app that makes it simple to manage and view servery menus at Rice

Web Client: AngularJS
Server: Flask
Database: Any SQL compliant database

Local Development Environment
-----------------------------
In order to set up a local development environment, you need to install the following:
* [Python](http://www.python.org/getit/)
* [Flask](http://flask.pocoo.org/docs/installation/)
* [Sqlalchemy](http://www.sqlalchemy.org/)
* [Flask-Sqlalchemy](http://pythonhosted.org/Flask-SQLAlchemy/)
* [Pytz](http://pytz.sourceforge.net/)
* [Python-dateutil](https://labix.org/python-dateutil)
* [Flask-mail](http://pythonhosted.org/flask-mail/)
* [Pdfminer](http://www.unixuser.org/~euske/python/pdfminer/index.html)
* [Flask-script](http://flask-script.readthedocs.org/en/latest/)
(Note that pdfminer can be installed with the command `pip install git+https://github.com/euske/pdfminer`)

Start the flask server with the following command under the src folder:

    python main.py

The terminal should display a message like

    Running on http://127.0.0.1:5000/

Simply type that address in your browser to open the app.
