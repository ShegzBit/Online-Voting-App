#!/usr/bin/python3
""" Definition of Candidate class
"""
from sqlalchemy import Column, String, Integer, ForeignKey

import models
from models.base import BaseModel, Base


class Candidate(BaseModel, Base):
    """ The Candidate class
    """
    # candidates table schema creations
    __tablename__ = 'candidates'

    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    full_name = Column(String(256), nullable=False)
    party = Column(String(128), default="", nullable=False)
    position = Column(String(128), nullable=False)
    manifesto = Column(String(1024), default="", nullable=False)
    votes = Column(Integer, default=0, nullable=False)
    profile_image = Column(String(128), default="api/v1/image/default.png", nullable=False)
    election_id = Column(String(60), ForeignKey('elections.id'),
                         nullable=False)

    def __init__(self, **kwargs):
        """ Initialize the Candidate object
        """
        super().__init__(**kwargs)
        self.full_name = self.first_name + ' ' + self.last_name

    def update(self, **kwargs):
        """ Update the candidate's attributes
        """
        for key, value in kwargs.items():
            if key not in ('id', 'election_id', 'votes', 'created_at'):
                setattr(self, key, value)
            if key in ('first_name', 'last_name'):
                self.full_name = self.first_name + ' ' + self.last_name
        models.storage.save()

    def count_vote(self):
        """ Count a vote for the candidate
        """
        self.votes += 1
        models.storage.save()
        # return the current number of votes gotten
        return self.votes
    
    def to_dict(self):
        """
        Returns the dictionary state of the election
        """
        # call BaseModel unrefined to_dict
        super_dict = super().to_dict()
        # add api address of image to candidate dictionary state
        super_dict.update({'image_address': 'api/v1/images/' + self.id})
        try:
            del super_dict['election']
            return super_dict
        except KeyError:
            return super_dict