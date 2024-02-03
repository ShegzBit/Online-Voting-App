#!/usr/bin/python3
import unittest
from datetime import datetime, timedelta
from models.election import Election


class TestElection(unittest.TestCase):
    def setUp(self):
        """ Define a setUp method """
        start_date = (datetime.now()
                      + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S')
        end_date = (datetime.now()
                    + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S')
        self.election = Election("Test Election",
                                 start_date,
                                 end_date)

    def test_init(self):
        """ Test that new instance is instantiated as expected """
        self.assertEqual(self.election.title, "Test Election")
        self.assertEqual(self.election.voters, [])
        self.assertEqual(self.election.ballots, [])
        self.assertEqual(self.election.status, "Upcoming")
        self.assertEqual(self.election.total_votes, 0)
        self.assertEqual(self.election.results, [])

        self.assertIsInstance(self.election.public_key, str)
        self.assertIsInstance(self.election.private_key, str)

    def test_init_title_validations(self):
        """ Test that title parameter is validated as expected """
        with self.assertRaises(TypeError):
            E1 = Election()

        with self.assertRaises(TypeError) as cm:
            Election(12,
                     (datetime.now()
                      + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'),
                     (datetime.now()
                      + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'))

        self.assertEqual(str(cm.exception), "Title must be a string")

    def test_init_title_empty(self):
        """ Test that title parameter cannot be empty """
        with self.assertRaises(ValueError) as cm:
            Election("",
                     (datetime.now()
                      + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'),
                     (datetime.now()
                      + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(str(cm.exception), "Title is required")

    def test_init_start_date_validation(self):
        """ Test that start date is instantiated as expected """
        with self.assertRaises(ValueError) as cm:
            Election("Test", "test_time",
                     (datetime.now()
                      + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(str(cm.exception),
                         "Invalid date format. Use 'YYYY-MM-DD HH:MM:SS'")

    def test_init_start_date_empty(self):
        """ Test that start_date parameter cannot be empty """
        with self.assertRaises(ValueError) as cm:
            Election("Test Election",
                     "",
                     (datetime.now()
                      + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(str(cm.exception),
                         ("Election starting date is required in the "
                          "format 'YYYY-MM-DD HH:MM:SS'"))

    def test_init_end_date_empty(self):
        """ Test that end_date parameter cannot be empty """
        with self.assertRaises(ValueError) as cm:
            Election("Test Election",
                     (datetime.now()
                      + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'),
                     "")
        self.assertEqual(str(cm.exception),
                         ("Election ending date is required in the "
                          "format 'YYYY-MM-DD HH:MM:SS'"))

    def test_init_start_date_after_end_date(self):
        """ Test that start_date cannot be after end_date """
        with self.assertRaises(ValueError) as cm:
            Election("Test Election",
                     (datetime.now()
                      + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'),
                     (datetime.now()
                      + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(str(cm.exception),
                         ("Election starting date must be before "
                          "the ending date"))

    def test_public_key(self):
        """ Test that public_key is a short UUID """
        self.assertTrue(isinstance(self.election.public_key, str))
        self.assertEqual(len(self.election.public_key), 14)

    def test_private_key(self):
        """ Test that private_key is a UUID """
        self.assertTrue(isinstance(self.election.private_key, str))
        self.assertEqual(len(self.election.private_key), 36)

    def test_add_voter(self):
        self.election.add_voter("John", "Doe", "john.doe@example.com")
        self.assertIn({"first_name": "John", "last_name": "Doe",
                       "email": "john.doe@example.com"}, self.election.voters)

    def test_make_ballot(self):
        self.election.make_ballot("Ballot 1", ["Candidate 1", "Candidate 3"])
        self.assertIn({"name": "Ballot 1",
                       "candidates": ["Candidate 1", "Candidate 3"]},
                      self.election.ballots)
