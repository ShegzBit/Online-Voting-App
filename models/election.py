#!/usr/bin/python3
""" This module defines the Election class
"""
from datetime import datetime
from sqlalchemy import (Column, String, DateTime, PickleType, Integer,
                        ForeignKey)
from sqlalchemy.ext.mutable import MutableList
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
    voters = Column(MutableList.as_mutable(PickleType), default=[])
    ballots = Column(MutableList.as_mutable(PickleType), default=[],
                     nullable=False)
    results = Column(MutableList.as_mutable(PickleType), default=[],
                     nullable=False)
    total_votes = Column(Integer, default=0, nullable=False)

    def make_ballot(self, ballot_name, candidates_list):
        """ Make a ballot

        Args:
            ballot_name (str): The ballot name
            candidates_list (list): The list of candidates

        Returns:
            None
        """
        # Check if candidates_list is a list
        if not isinstance(candidates_list, list):
            raise ValueError("Candidates list must be a list")

        # Check if the ballot name already exists
        for ballot in self.ballots:
            if ballot["name"] == ballot_name:
                # If it exists, update the candidates list
                ballot["candidate"].extend(candidates_list)
                return

        # If it doesn't exist, add the ballot
        self.ballots.append({"name": ballot_name,
                             "candidates": candidates_list})

    def make_results(self):
        """ Compute the election results
        """

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

    def to_dict(self):
        """ Returns dictionary representation of an election instance
        """
        # Get a copy of instance dict
        dict_copy = self.__dict__.copy()
        dict_copy["__class__"] = f"{self.__class__.__name__}"
        return dict_copy
