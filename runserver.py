from app import app

app.debug = True

from app.setup import setup_all

setup_all()
app.run()
