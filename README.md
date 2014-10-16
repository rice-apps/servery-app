Servery App
===========
An app that makes it simple to manage and view servery menus at Rice

We are currently live at: http://servery.riceapps.org

- Web Client: ReactJS (There used to be an AngularJS dependancy, but it has since been removed)
- Server: Flask
- Database: Any SQL compliant database

- JS Build Tool: browserify (with reactify, browserify-shim, and uglifify)

If you are interesting in contributing code or ideas, see https://github.com/rice-apps/servery-app/wiki/How-to-Help.

If you want to see what we are currently working on, see our trello page at https://trello.com/b/5cVHeknd/serveryappboard.

Local Development Environment
-----------------------------

(See https://github.com/rice-apps/servery-app/wiki/Guide-for-setting-up-a-development-environment. for more detailed instructions)

In order to set up a local development environment, you need to install the dependancies noted in requirements.txt.

Setup the database using:

    python setup.py

Download the latest menus using:
    
    python loadmenu.py

Start the flask server with the following command under the src folder:

    python runserver.py

The terminal should display a message like

    Running on http://127.0.0.1:5000/

Simply type that address in your browser to open the app.

To build the javascript into bundle.js, go to app/static/js and type:

    browserify main.js -o bundle.js

(You will also need reactify, browserify-shim, and uglifify installed as well).
