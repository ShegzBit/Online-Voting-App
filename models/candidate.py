#!/usr/bin/python3
"""
Candidate class module
"""
import uuid

class Candidate:
    """
    Model class for each candidate in an election
    """
    firstname = ""
    lastname = ""
    id = ""
    email = ""
    about = ""
    plans = []
    position = ""
    vote_count = 0
    is_disqualified = False


    def __init__(self, *args, **kwargs):
        """
        Candidate object constructor
        """
        for prop, value in kwargs.items:
            if prop not in [id, vote_count, is_disqualified]:
                setattr(self, prop, value)
        self.id = uuid.uuid4()
        self.vote_count = 0

    def vote(self):
        """
        Implements voting for candidate
        """
        self.vote_count += 1

    def update(self, **kwargs):
        """
        updates the candidate state
        """
        for prop, value in kwargs:
            if prop not in [id, vote_count]:
                setattr(self, prop, value)

    def to_dict(self):
        """
        Returns the state of the candidate in dictionary form
        """
        new_dict = {}
        for x, y in self.__dict__.items():
            if x != 'id':
                new_dict.update({x: y})
            if x in [firstname, lastname]:
                fullname = f'{firstname} {lastname}'
                new_dict.update({'fullname': fullname})
