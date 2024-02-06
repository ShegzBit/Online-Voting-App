#!/usr/bin/python3
""" This module defines the Election class
"""
from datetime import datetime, timedelta
from threading import Thread
from sqlalchemy import (Column, String, DateTime, PickleType, Integer,
                        ForeignKey)
from sqlalchemy.ext.mutable import MutableList, MutableDict
from sqlalchemy.orm import relationship

from models.base import BaseModel, Base, short_uuid


class Election(BaseModel, Base):
    """ The Election class
    """
    __tablename__ = 'elections'

    title = Column(String(128), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    public_id = Column(String(60), default=short_uuid(), nullable=False)
    status = Column(String(32), default="Upcoming", nullable=False)

    candidates = relationship("Candidate", backref="election",
                              cascade="all, delete")
    voters_id = Column(MutableList.as_mutable(PickleType), default=[])
    voters = Column(MutableList.as_mutable(PickleType), default=[])
    results = Column(MutableDict.as_mutable(PickleType), default={},
                     nullable=False)
    total_votes = Column(Integer, default=0, nullable=False)
    expected_voters = Column(Integer, default=0, nullable=False)

    def __init__(self, *args, **kwargs):
        """ Initialize the Election object
        """
        if not all(key in kwargs for key in ['title', 'start_date', 'end_date']):
            raise ValueError("Invalid arguments")
        super().__init__(*args, **kwargs)
        self.activate_election()


    @property
    def positions(self):
        """ Get the positions for the election
        """
        positions = set(candidate.position for candidate in self.candidates)
        return positions

    @property
    def ballots(self):
        """ Make a ballot
        """
        ballots = []
        for position in self.positions:
            candidates_list = [candidate.full_name
                               for candidate in self.candidates
                               if candidate.position == position]
            ballots.append({"name": position, "candidates": candidates_list})

        return ballots

    def compute_results(self, close=True):
        """ Compute the election results
        """
        results = {}
        for position in self.positions:
            candidates = [candidate for candidate in self.candidates
                          if candidate.position == position]
            results[position] = {candidate.full_name: candidate.votes
                                for candidate in candidates}

        self.results = results
        self.total_votes = sum([candidate.votes for candidate in self.candidates])
        if close is True:
            self.end_election()

    def add_voter(self, **kwargs):
        """ Add a voter to the election

        Args:
            first_name (str): The voter's first name
            last_name (str): The voter's last name
            email (str): The voter's email
            candidate_id (str): The voter's candidate id
            voter_id (str): The voter's id

            ValueError indicates invalid voter's id or candidate's id or invalid arguments

        Returns:
            None
        """
        keywords = ['first_name', 'last_name', 'email', 'candidate_id', 'voter_id']
        if not all(keyword in kwargs for keyword in keywords):
            raise ValueError("Invalid arguments")
        if not kwargs.get('voter_id') in self.voters_id:
            raise ValueError("Invalid voter id")
        try:
            candidate = [candidate for candidate in self.candidates
                         if candidate.id == kwargs.get('candidate_id')][0]
        except IndexError:
            raise ValueError("Invalid candidate id")
        candidate.count_vote()
        self.voters.append({"first_name": kwargs.get('first_name'), "last_name": kwargs.get('last_name'),
                            "email": kwargs.get('email')})
        
    def add_candidate(self, **kwargs):
        """ Add a candidate to the election

        Args:
            first_name (str): The candidate's first name
            last_name (str): The candidate's last name
            party (str): The candidate's party
            position (str): The candidate's position
            manifesto (str): The candidate's manifesto

            ValueError indicates invalid arguments

        Returns:
            None
        """
        keywords = ['first_name', 'last_name', 'party', 'position', 'manifesto']
        if not all(keyword in kwargs for keyword in keywords):
            raise ValueError("Invalid arguments")
        new_candidate = Candidate(election_id=self.id, **kwargs)
        self.candidates.append(new_candidate)

    def add_voters_id(self, ids=[]):
        """ Add voters id to the election
        """
        self.voters_id.extend(ids)
        self.expected_voters = len(ids)

    def get_voters(self):
        """ Get the list of voters
        """
        return {"voters_count": len(self.voters), "voters": self.voters}

    def start_election(self):
        """ Start the election
        """
        self.status = "Ongoing"

    def end_election(self):
        """ End the election
        """
        self.status = "Completed"

    def get_results(self):
        """ Get the election results
        """
        try:
            return self.results
        except AttributeError:
            if get_election_status == 'Upcoming':
                return {"status": "Upcoming", "result": "No result yet"}
            elif status == 'Ongoing':
                {'status': 'Ongoing', 'results': self.compute_results(close=False)}


    def get_election_status(self):
        """ Determine election status
        """
        current_time = datetime.now()

        if current_time < self.start_date:
            self.status = "Upcoming"
        elif self.start_date <= current_time <= self.end_date:
            self.status = "Ongoing"
        else:
            self.status = "Completed"

        return self.status
    
    def activate_election(self):
        """ Activate the election
        """
        if len(candidates) == 0:
            raise ValueError("No candidates added")
        if len(voters_id) == 0:
            raise ValueError("No voters added")
        if self.start_date > datetime.now():
            self.start_election()
        start_delay = self.start_date - datetime.now()
        Timer(start_delay.total_seconds(), self.start_election).start()
        end_delay = self.end_date - datetime.now()
        Timer(end_delay.total_seconds(), self.end_election).start()
        return True
    
    def update_state(self, **kwargs):
        """ Update the election's state """
        def add_candidates(candidates):
            """ Adds a list of candidates to the election """
            for candidate in candidates:
                self.add_candidate(**candidate)

        # over here should the update voters_id be added or should replace the voters_id entirely
        methods = {'voters_id': self.add_voters_id, 'candidates': add_candidates}

        for key, value in kwargs.items():
            if key in methods:
                methods[key](value)
            elif key not in ('id', 'public_id', 'status', 'created_at', 'results',
                             'total_votes', 'expected_voters', 'voters'):
                if key in ('start_date', 'end_date') and type(value) is str:
                    value = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
                setattr(self, key, value)

        self.activate_election()
        self.save()
        return self