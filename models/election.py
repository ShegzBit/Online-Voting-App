#!/usr/bin/python3
""" This module defines the Election class
"""
from datetime import datetime
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

    def add_voter(self, *args, **kwargs):
        """ Add a voter to the election

        Args:
            first_name (str): The voter's first name
            last_name (str): The voter's last name
            email (str): The voter's email
            candidate_id (str): The voter's candidate id
            voter_id (str): The voter's id

            ValueError indicates invalid voter's id

        Returns:
            None
        """
        keywords = ['first_name', 'last_name', 'email', 'candidate_id']
        if not all(keyword in kwargs for keyword in keywords):
            raise ValueError("Invalid arguments")
        if not kwargs.get('voter_id') in self.voters_id:
            raise ValueError("Invalid voter id")
        candidate = [candidate for candidate in self.candidates
                     if candidate.id == kwargs.get('candidate_id')][0]
        candidate.count_vote()
        self.voters.append({"first_name": kwargs.get('first_name'), "last_name": kwargs.get('last_name'),
                            "email": kwargs.get('email')})

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
        return self.results

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
