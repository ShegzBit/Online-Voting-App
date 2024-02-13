#!/usr/bin/python3
"""
Module containing admin model
"""
from datetime import datetime as dt
from uuid import uuid4

from sqlalchemy import Column, String, Date, PickleType, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict

import models
from models.base import BaseModel, short_uuid, Base, is_jsonnable, is_iterable
from models.election import Election


class Admin(BaseModel, Base):
    """
    Class for modelling admin in OVS
    """
    __tablename__ = 'admins'
    first_name = Column(String(120), nullable=False)
    last_name = Column(String(120), nullable=False)
    username = Column(String(120), nullable=False, unique=True)
    __password = Column(String(120), nullable=False)
    email = Column(String(120), nullable=False, unique=True)
    elections = relationship('Election', backref='admin',
                             cascade='all, delete-orphan')
    phone_number = Column(String(120), nullable=True)

    def __init__(self, *args, **kwargs):
        """
        Admin Class constructor
        arg:
            firstname: str - firstname of admin
            lastname: str - lastname of admin
            email: str - email of admin
            password: str - password of admin

            ValueError: if any of the above arguments are not passed
        """
        # ensure necessary argurments are passed
        keywords = ['first_name', 'last_name', 'password', 'email']
        if any(x in keywords and x not in kwargs for x in keywords):
            raise ValueError('first_name, last_name,'
                             'email and password are required')
        for key, value in kwargs.items():
            # remove arguments that can't be set by users
            if (key in ('created_at', 'start_date', 'end_date') and
                    type(value) is str):
                value = dt.strptime(value, '%Y-%m-%d %H:%M:%S')
            if key not in ['__class__', 'password']:
                setattr(self, key, value)
        self.id = uuid4()
        self.__password = kwargs.get('password')
        self.created_at = dt.utcnow()
        self.username = kwargs.get('username',
                                   kwargs.get('email').split('@')[0])

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
        new_election = Election(admin_id=self.id, **kwargs)
        new_election.save()
        # key = 'Election.' + new_election.id
        # self.elections.update({key: new_election})
        # models.storage.save()
        return new_election

    def to_dict(self):
        """
        Returns the state of the object in a dictionary format
        """
        main_dict = super().to_dict()
        for key in list(main_dict.keys()):
            if 'password' in key:
                del main_dict[key]
        # if '_Admin__password' in main_dict:
        #     del main_dict['_Admin__password']
        # if 'password' in main_dict:
        #     del main_dict['password']
        dict_state = {}
        for prop, value in main_dict.items():
            try:
                dict_state[prop] = value.to_dict()
            except AttributeError:
                if is_jsonnable(value):
                    dict_state[prop] = value
                elif type(value) is set:
                    dict_state[prop] = list(value)
                elif is_iterable(value):
                    if all(hasattr(v, 'to_dict') for v in value):
                        dict_state[prop] = [v.to_dict() for v in value]
        return dict_state

    def get_result(self, election_id):
        """
        Gets the result of the current election
        election_id: id of election to get result from
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        return election.get_results()

    def update_election(self, election_id, **kwargs):
        """
        Takes the id of an election and updates its state
        """
        election = models.storage.get('Election', election_id)
        return election.update_state(**kwargs) 

    def update_state(self, **kwargs):
        """
        Update the state of the admin
        """
        for key, value in kwargs.items():
            if key == 'new_password':
                if self.__password == kwargs.get('old_password', None):
                    self.__password = kwargs.get('new_password')
                else:
                    raise ValueError('Old password is incorrect')
            elif key not in ('id', 'created_at', 'elections', 'username'):
                setattr(self, key, value)
        models.storage.save()
        return self

    def is_valid_password(self, password):
        """
        Checks if the password is valid
        """
        return self.__password == password

    @staticmethod
    def get_by_attr(attr, value):
        """
        Get admin by attribute
        """
        if not attr:
            return None
        admins = models.storage.all(Admin)
        for admin in admins.values():
            if getattr(admin, attr) == value:
                return admin
        return None
            
    @staticmethod
    def authenticate(password, **kwargs):
        """
        Authenticates an admin
        """
        email = username = search_key = None
        if 'email' in kwargs and not kwargs['email'] is None:
            search_key = 'email'
            email = kwargs.get('email', None)
        elif 'username' in kwargs and not kwargs['username'] is None:
            search_key = 'username'
            username = kwargs.get('username', None)
        else:
            return None
        admin = Admin.get_by_attr(search_key, email or username)
        if admin and admin.is_valid_password(password):
            return admin
        return None
