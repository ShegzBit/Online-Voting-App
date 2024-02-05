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
    party = Column(String(128), nullable=False)
    position = Column(String(128), nullable=False)
    manifesto = Column(String(1024), nullable=False)
    votes = Column(Integer, default=0, nullable=False)
    # profile_picture = 
    election_id = Column(String(60), ForeignKey('elections.id'), nullable=False)
