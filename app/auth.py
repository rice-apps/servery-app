from . import app

from flask import url_for, redirect, session, request
import urllib2

from contextlib import closing

CAS_SERVER = "https://netid.rice.edu/cas/"


@app.route('/auth/login')
def login():
    """
    Logs the user in by redirecting them to the CAS login page.
    """
    cas_url = "{0}login?service={1}".format(
        CAS_SERVER,
        url_for('check_ticket', _external=True))

    print cas_url
    return redirect(cas_url)


@app.route('/auth/logout', methods=["POST"])
def logout():
    """
    Logs the user out.
    """
    del session['user']
    return "Success"


@app.route('/auth/check_ticket')
def check_ticket():
    """
    Checks the ticket and logs the user in if valid.
    """
    ticket = request.args.get('ticket')
    user = get_user(ticket)
    session['user'] = user
    return redirect(url_for('root'))


def get_user(ticket):
    """
    Given a ticket, this gets the user or None if the ticket is invalid.
    """
    cas_url = "{0}validate?ticket={1}&service={2}".format(
        CAS_SERVER,
        ticket,
        url_for('check_ticket', _external=True))

    print cas_url
    with closing(urllib2.urlopen(cas_url)) as response:
        result = response.read()
        lines = result.split('\n')
        if lines[0] == "no":
            return None
        else:
            return lines[1]
