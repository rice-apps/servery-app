from app import app
from flask import Flask, render_template, session, send_from_directory, jsonify, request, redirect, url_for, make_response
from xml.etree import ElementTree  
import urllib2

from contextlib import closing

CAS_SERVER = "https://netid.rice.edu/cas/"

@app.route('/auth/login')
def login():
    cas_url=CAS_SERVER + "login?service=" + url_for('check_ticket',_external=True)
    print cas_url
    return redirect(cas_url)

@app.route('/auth/logout')
def logout():
    del session['user']
    return "Success"

@app.route('/auth/check_ticket')
def check_ticket():
    ticket = request.args.get('ticket')
    user =  get_user(ticket)
    session['user'] = user
    return redirect(url_for('root'))


def get_user(ticket):
    cas_url=CAS_SERVER + "validate?ticket="+ticket+"&service="+url_for('check_ticket',_external=True)
    print cas_url
    with closing(urllib2.urlopen(cas_url)) as response:
        result = response.read()
        lines = result.split('\n')
        if lines[0] == "no":
            return None
        else:
            return lines[1]

