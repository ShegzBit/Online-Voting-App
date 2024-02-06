#!/usr/bin/python3
""" Definition of Candidate class
"""
from sqlalchemy import Column, String, Integer, ForeignKey

from models.base import BaseModel, Base


class Candidate(BaseModel, Base):
    """ The Candidate class
    """
    __tablename__ = 'candidates'

    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    party = Column(String(128), default="", nullable=False)
    position = Column(String(128), nullable=False)
    manifesto = Column(String(1024), default="", nullable=False)
    votes = Column(Integer, default=0, nullable=False)
    # profile_picture = Column(String(128), default="api/v1/image/default.png", nullable=False)
    election_id = Column(String(60), ForeignKey('elections.id'),
                         nullable=False)

    @property
    def full_name(self):
        """ Generate a candidate's full name
        """
        return self.first_name + ' ' + self.last_name

    def update(self, **kwargs):
        """ Update the candidate's attributes
        """
        for key, value in kwargs.items():
            if key not in ('id', 'election_id', 'votes', 'created_at'):
                setattr(self, key, value)
        self.save()

    def count_vote(self):
        """ Count a vote for the candidate
        """
        self.votes += 1
        self.save()
