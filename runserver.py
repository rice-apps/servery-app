from app import app

app.debug = True
app.config['SQLALCHEMY_ECHO'] = True
app.run()
