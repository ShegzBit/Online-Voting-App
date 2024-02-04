#!/usr/bin/python3
"""
Module containing admin model
"""
from datetime import datetime as dt
from models.election import Election
from uuid import uuid4


from shortuuid import ShortUUID

def short_uuid():
     id = ShortUUID().random(length=12)
     return '-'.join(id[i:i+4] for i in range(0, 12, 4))


class Admin:
    """
    Class for modelling admin in OVS
    """
    id = ""
    firstname = ""
    lastname = ""
    username = ""
    __password = ""
    email = ""
    created_at = ""
    elections = {}
    key = ""
    
    def __init__(self, election, *args, **kwargs):
        """
        Admin Class construtor
        """
        for prop, value in kwargs:
            if prop not in ['id', 'created_at', 'elect_cred']:
                setattr(self, prop, value)
            if prop == 'created_at':
                value = dt.fromisoformat(value)
                setattr(self, prop, value)
        self.id = short_uuid()
        key = election.__class__ + '.' + election.id
        self.elections.update({key: election})
        self.key = uuid4()

    def new_election(self, *args, **kwargs):
        """
        Creates a new election under admin
        """
        new_election = Election(kwargs)
        key = new_election.__class__ + '.' + new_election.id
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

    def get_result(self, election_id):
        """
        Gets the result of the current election
        election_id: id of election to get result from
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        return {'status': election.status, 'result', election.result}

    def update_election(self, election_id, **args, **kwags):
        """
        Takes the id of an election and 
        """
        key = 'Election.' + election_id
        election = self.elections.get(key, None)
        election.update(kwargs)
        return election
