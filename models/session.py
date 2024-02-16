#!/usr/bin/pyrhon3
"""
Session handler for signins
"""
from models.admin import Admin

class UserSession:
    """
    Session handler
    """

    def __init__(self, email, password):
        """
        Session constructor
        """
        self.user = Admin.get_by_attr('email')
