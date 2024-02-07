#!/usr/bin/python3
"""
Module containing admin model
"""
from datetime import datetime as dt
from uuid import uuid4
from models.base import BaseModel, short_uuid, Base
from sqlalchemy import Column, String, Date, PickleType, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict
from models.election import Election


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
    elections = Column(MutableDict.as_mutable(PickleType), nullable=False,
                       default=dict())

    def __init__(self, *args, **kwargs):
        """
        Admin Class construtor
        arg:
            firstname: str - firstname of admin
            lastname: str - lastname of admin
            email: str - email of admin
            password: str - password of admin

            ValueError: if any of the above arguments are not passed
        """
        # ensure necessary argurments are passed
        keywords = ['firstname', 'lastname', 'password', 'email']
        if any(x in keywords and x not in kwargs for x in keywords):
            raise ValueError('firstname, lastname, email and password'
                            'are required')
        for key, value in kwargs.items():
            # remove arguments that can't be set by users
            if (key in ('created_at', 'start_date', 'end_date')
                    and type(value) is str):
                    value = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
            if not key in ['__class__', 'password']:
                setattr(self, key, value)
        self.id = uuid4()
        self.__password = kwargs.get('password')
        self.created_at = dt.utcnow()
        self.elections = {}

    def new_election(self, *args, **kwargs):
        """
        Creates a new election under admin
        args:
            title: str - title of election
            start_date: str - start date of election
            end_date: str - end date of election
            voters_id: list - list of voters id

            ValueError: if any of the above arguments are not passed
        """
        new_election = Election(**kwargs)
        new_election.save()
        key = 'Election.' + new_election.id
        self.elections.update({key: new_election})
        return new_election

    def to_dict(self):
        """
        Returns the state of the object in a dictionary format
        """
        super_dict = super().to_dict()
        if '_Admin__password' in super_dict:
            del super_dict['_Admin__password']
        return super_dict

    def get_result(self, election_id):
        """
        Gets the result of the current election
        election_id: id of election to get result from
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        return election.get_results()

    def update_election(self, election_id, *args, **kwargs):
        """
        Takes the id of an election and 
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        election.update_state(kwargs)
        return election
