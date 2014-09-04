Servery App
===========
An app that makes it simple to manage and view servery menus at Rice

-Web Client: AngularJS and ReactJS
-Server: Flask
-Database: Any SQL compliant database

If you are interesting in contributing code or ideas, see https://github.com/rice-apps/servery-app/wiki/How-to-Help.

Local Development Environment
-----------------------------

(See https://github.com/rice-apps/servery-app/wiki/Guide-for-setting-up-a-development-environment. for more detailed instructions)

In order to set up a local development environment, you need to install the dependancies noted in requirements.txt.

Setup the database using:

    python setup.py

Start the flask server with the following command under the src folder:

    python runserver.py

The terminal should display a message like

    Running on http://127.0.0.1:5000/

Simply type that address in your browser to open the app.
