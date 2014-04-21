from flask import Flask, render_template, session, send_from_directory, jsonify, request, redirect
from xml.etree import ElementTree  
import urllib2

def is_valid(ticket):
    cas_url="https://netid.rice.edu/cas/serviceValidate?ticket="+ticket+"&service=http://example.rice.edu/login.html"
    print cas_url
    response = urllib2.urlopen(cas_url)
    html = response.read()
    tree = ElementTree.fromstring(html)
    for child in tree:
        if 'code' in child.attrib:
            if child.attrib['code']=='INVALID_TICKET':
                return False
    return True
