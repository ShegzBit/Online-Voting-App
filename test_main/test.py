#!/usr/bin/python3
""" This module is used to test the models
"""
from models.candidate import Candidate
from models.election import Election

election = Election(title="Test Election", start_date="2024-02-07 01:20:00",
                    end_date="2024-02-07 01:30:00")
election.add_candidate(first_name="Test Candidate 1", last_name="Tesla",
                       position="Richer" ,party="Test Party 1",)

election.activate_election()
