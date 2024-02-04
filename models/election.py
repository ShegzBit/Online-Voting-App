#!/usr/bin/python3
""" This module defines the Election class
"""
from datetime import datetime
from shortuuid import ShortUUID
from uuid import uuid4


class Election():
    """ The Election class
    """

    def __init__(self, title, start_date, end_date, ballot_name, candidates *arg, **kwargs):
        """ Initializes Election class.

        Args:
            title (str): The election title
            start_date (str): The election starting date
            end_date (str): The election ending date
            
            *arg: Variable length argument list
            **kwargs: Arbitrary keyword arguments

        Returns:
            None
        """
        self.__title = title
        self.__start_date = start_date
        self.__end_date = end_date
        self.id = str(uuid4())
        self.public_key = self.short_uuid()
        self.status = "Upcoming"
        self.candidates = []
        self.voters = []
        self.__ballots = [{"name": ballot_name, "candidates": candidates}]
        self.results = []
        self.total_votes = 0

    @property
    def title(self):
        """ The title property

        Args:
            value (str): The election title

        Raises:
            ValueError: If the title is empty
            TypeError: If the title is not a string

        Returns:
            str: The election title
        """
        return self.__title
   
    @title.setter
    def title(self, value):
        """ The title setter
        """
        if not value:
            raise ValueError("Title is required")
        if not isinstance(value, str):
            raise TypeError("Title must be a string")
        self.__title = value

    @property
    def start_date(self):
        """ The start_date property

        Args:
            value (str): The election starting date

        Raises:
            ValueError: If the date format is invalid
            TypeError: If the date is not a string

        Returns:
            str: The election starting date
        """
        return self.__start_date

    @start_date.setter
    def start_date(self, value):
        """ The start_date setter in the format 'YYYY-MM-DD HH:MM:SS'
        """
        if not value:
            raise ValueError("Election starting date is required in the "
                             "format 'YYYY-MM-DD HH:MM:SS'")
        if not isinstance(value, str):
            raise TypeError("Election starting date must be a string")
        try:
            start_date = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date format. Use 'YYYY-MM-DD HH:MM:SS'")
            
        self.__start_date = start_date

       
    @property
    def end_date(self):
        """ The end_date property

        Args:
            value (str): The election ending date

        Raises:
            ValueError: If the date format is invalid
            TypeError: If the date is not a string

        Returns:
            str: The election ending date
        """
        return self.__end_date
        
    @end_date.setter
    def end_date(self, value):
        """ The end_date setter in the format 'YYYY-MM-DD HH:MM:SS'
        """
        if not value:
            raise ValueError("Election ending date is required in the "
                             "format 'YYYY-MM-DD HH:MM:SS'")
        if not isinstance(value, str):
            raise TypeError("Election ending date must be a string")
        try:
            end_date = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date format. Use 'YYYY-MM-DD HH:MM:SS'")
            
        self.__end_date = end_date

        if self.start_date > self.end_date:
            msg = "Election starting date must be before the ending date"
            raise ValueError(msg)

    @staticmethod
    def short_uuid():
        """ Customize the public key
        """
        id = ShortUUID().random(length=12)
        return '-'.join(id[i:i+4] for i in range(0, 12, 4))

    @property
    def ballots(self):
        """ The ballots property
        """
        return self.__ballots
    
    @ballots.setter
    def ballots(self, name, candidates=[]):
        """ Make a ballot

        Args:
            name (str): The ballot name
            candidates (list): The list of candidates

        Raises:
            ValueError: If the ballot name is not a string
            ValueError: If the candidates list is not a list

        Returns:
            None
        """
        # Check if name is empty
        if not name:
            raise ValueError("Ballot name is required")

        # Check if name is a string
        if not isinstance(name, str):
            raise ValueError("Ballot name must be a string")

        # Check if candidates is a list
        if not isinstance(candidates, list):
            raise ValueError("Candidates list must be a list")

        # Check if the ballot name already exists
        for ballot in self.__ballots:
            if ballot["name"] == name:
                # If it exists, update the candidates list
                ballot["candidates"].extend(candidates)
                return

        # If it doesn't exist, add the ballot
        self.__ballots.append({"name": name, "candidates": candidates})
    
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
