from app import app

app.debug = True

from app.setup import setup_serveries

setup_serveries()
app.run()
