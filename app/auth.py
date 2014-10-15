from . import app, db
from .models import User
from .dish import transfer_vote_to_current_user

from flask import url_for, redirect, session, request
import urllib2

from contextlib import closing

CAS_SERVER = "https://netid.rice.edu/cas/"


@app.route('/api/auth/login')
def login():
    """
    Logs the user in by redirecting them to the CAS login page.
    """
    if request.referrer is not None:
        session['previousurl'] = request.referrer

    cas_url = "{0}login?service={1}".format(
        CAS_SERVER,
        url_for('check_ticket', _external=True))

    return redirect(cas_url)


@app.route('/api/auth/logout', methods=["POST"])
def logout():
    """
    Logs the user out.
    """
    if 'user' in session:
        del session['user']

    return "Success"


@app.route('/api/auth/check_ticket')
def check_ticket():
    """
    Checks the ticket and logs the user in if valid.
    """

    if 'previousurl' in session:
        target = session['previousurl']
        del session['previousurl']
    else:
        target = url_for('root')

    ticket = request.args.get('ticket')
    user = get_user(ticket)

    if user is None:
        return redirect(target)

    session['user'] = user

    if 'anonuser' in session:
        anonuser = db.session.query(User).get(session['anonuser'])

        if anonuser:
            # There was an old anonymous user, we have to transfer the votes
            for vote in anonuser.votes:
                transfer_vote_to_current_user(vote)

        db.session.delete(anonuser)
        db.session.commit()
        del session['anonuser']

    return redirect(target)


def get_user(ticket):
    """
    Given a ticket, this gets the user or None if the ticket is invalid.
    """
    cas_url = "{0}validate?ticket={1}&service={2}".format(
        CAS_SERVER,
        ticket,
        url_for('check_ticket', _external=True))

    with closing(urllib2.urlopen(cas_url)) as response:
        result = response.read()
        lines = result.split('\n')
        if lines[0] == "no":
            return None
        else:
            return lines[1]
