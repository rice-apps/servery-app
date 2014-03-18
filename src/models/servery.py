"""
Back-end for the vote page.
"""

__authors__ = ['Waseem Ahmad <waseem@rice.edu>',
               'Andrew Capshaw <capshaw@rice.edu>'
			   'David Nichol <david@nichol.com>']

import datetime
import logging
import models
import webapp2
import webapputils

from authentication import auth


class ServeryHandler(webapp2.RequestHandler):
    """
    Handles GET requests for the Vote page.
    """

    def get(self):
        page_data = {'open_elections': [], 'election_results': []}

        # Authenticate user
        voter = auth.get_user(self)

        webapputils.render_page(self, '/servery', page_data)


app = webapp2.WSGIApplication([
        ('/servery', ServeryHandler)
], debug=True)