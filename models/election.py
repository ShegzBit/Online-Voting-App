#!/usr/bin/python3
""" This module defines the Election class
"""


class Election():
    """ The Election class
    """
    from datetime import datetime
    from shortuuid import ShortUUID
    from uuid import uuid4

    def __init__(self, title, start_date, end_date, candidates_list):
        """ Initializes Election class.

        Args:
            title (str): The election title
            start_date (str): The election starting date
            end_date (str): The election ending date
            candidates_list (list): The list of candidates

        Returns:
            None
        """
        # Validate the title parameter
        if not title:
            raise ValueError("Title is required")
        if not isinstance(title, str):
            raise ValueError("Title must be a string")

        # Validate received dates as strings
        # in the format 'YYYY-MM-DD HH:MM:SS'
        if not start_date:
            raise ValueError("Election starting date is required in
                             the format 'YYYY-MM-DD HH:MM:SS'")
        if not end_date:
            raise ValueError("Election ending date is required in
                             the format 'YYYY-MM-DD HH:MM:SS'")
        try:
            start_date = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
            end_date = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date format. Use 'YYYY-MM-DD HH:MM:SS'")
        if start_date > end_date:
            raise ValueError("Election starting date must be
                             before the ending date")

        # Validate the candidates_list parameter
        if not candidates_list:
            raise ValueError("Candidates' list is required")
        if not isinstance(candidates_list, list):
            raise ValueError("Candidates' list must be a list")
        if not all(isinstance(candidate, str)
                   for candidate in candidates_list):
            raise ValueError("Candidates' list must contain strings only")

        self.public_key = short_uuid()
        self.private_key = str(uuid4())
        self.title = title
        self.start_date = start_date
        self.end_date = end_date
        self.candidates = candidates_list
        self.voters = []
        self.ballots = []
        self.status = "Upcoming"
        self.total_votes = 0
        self.results = []

    @staticmethod
    def short_uuid():
        """ Customize the public key
        """
        id = ShortUUID().random(length=12)
        return '-'.join(id[i:i+4] for i in range(0, 12, 4))

    def add_candidate(self, candidate):
        """ Add a candidate to the election

        Args:
            candidate (str): The candidate's name

        Returns:
            None
        """
        self.candidates.append(candidate)

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

    def get_voters(self):
        """ Get the list of voters
        """
        voters = []
        voters_count = len(self.voters)

        return self.voters

    def start_election(self):
        """ Start the election
        """
        self.status = "Ongoing"

    def end_election(self):
        """ End the election
        """
        self.status = "Ended"

    def get_results(self):
        """ Get the election results
        """
        return self.results
