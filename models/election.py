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

    def compute_results(self):
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
        self.end_election()

    def add_voter(self, first_name, last_name, email):
        """ Add a voter to the election

        Args:
            first_name (str): The voter's first name
            last_name (str): The voter's last name
            email (str): The voter's email

        Returns:
            None
        """
        self.voters.append({"first_name": first_name, "last_name": last_name,
                            "email": email})

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
