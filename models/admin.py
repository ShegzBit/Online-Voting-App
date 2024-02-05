#!/usr/bin/python3
"""
Module containing admin model
"""
from datetime import datetime as dt
from uuid import uuid4
from models.base import BaseModel, short_uuid
from sqlalchemy import Column, String, Date, PickleType
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict

Base = declarative_base()


class Election:
    id = 'ajbjkadak'
    def __init__(self, *args, **kwargs):
        """
        Election class constructor
        """
        for prop, value in kwargs.items():
            setattr(self, prop, value)
        self.id = short_uuid()
        self.created_at = dt.utcnow()
        self.status = 'pending'
        self.result = {}
        self.candidates = []
        self.voters = []
        self.votes = {}

class Admin(BaseModel, Base):
    """
    Class for modelling admin in OVS
    """
    __tablename__ = 'admins'
    firstname = Column(String(120), nullable=False)
    lastname = Column(String(120), nullable=False)
    username = Column(String(120), nullable=False, unique=True)
    __password = Column(String(120), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    elections = Column(MutableDict.as_mutable(PickleType), nullable=False, default=dict())
    
    def __init__(self, *args, **kwargs):
        """
        Admin Class construtor
        """
        for prop, value in kwargs.items():
            if prop not in ['id', 'created_at', 'elect_cred', 'password']:
                setattr(self, prop, value)
            if prop == 'created_at':
                value = dt.fromisoformat(value)
                setattr(self, prop, value)
        self.id = uuid4()
        self.__password = kwargs.get('password')
        self.created_at = dt.utcnow()
        self.elections = {}

    def new_election(self, *args, **kwargs):
        """
        Creates a new election under admin
        """
        keywords = ['firstname', 'lastname', 'password', 'email']
        if any(x in keywords and x not in kwargs for x in keywords):
            raise TypeError('firstname, lastname, email and password are required')
        new_election = Election(kwargs)
        key = 'Election.' + new_election.id
        self.elections.update({key: new_election})
        return new_election

    def to_dict(self):
        """
        Returns the state of the object in a dictionary format
        """
        dictionary = {}
        dictionary.update(self.__dict__)
        dictionary.update({'__class__':
                          (str(type(self)).split('.')[-1]).split('\'')[0]})
        dictionary['created_at'] = self.created_at.isoformat()
        try:
            del dictionary['_Admin__password']
            del dictionary['_sa_instance_state']
        except Exception:
            return dictionary
        return dictionary

    def get_result(self, election_id):
        """
        Gets the result of the current election
        election_id: id of election to get result from
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        return {'status': election.status, 'result': election.result}

    def update_election(self, election_id, *args, **kwargs):
        """
        Takes the id of an election and 
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        election.update(kwargs)
        return election