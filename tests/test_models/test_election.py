#!/usr/bin/python3
from datetime import datetime, timedelta
import unittest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.base import Base, BaseModel, short_uuid
from models.candidate import Candidate
from models.election import Election


class TestElection(unittest.TestCase):
    def setUp(self):
        # Use in-memory SQLite for testing
        self.engine = create_engine('sqlite:///:memory:')
        self.Session = sessionmaker(bind=self.engine)
        Base.metadata.create_all(self.engine)  # Create all tables
        self.session = self.Session()

        self.election = Election(
            title="Test Election",
            start_date=datetime.now() + timedelta(days=1),
            end_date=datetime.now() + timedelta(days=2),
            public_id=short_uuid(),
            status="Upcoming",
            voters=[],
            results=[],
            total_votes=0
        )

    def test_election_creation(self):
        self.session.add(self.election)
        self.session.commit()

        retrieved_election = self.session.query(Election).first()
        self.assertEqual(retrieved_election.title, "Test Election")
        self.assertEqual(retrieved_election.status, "Upcoming")
        self.assertEqual(retrieved_election.total_votes, 0)

    def test_positions(self):
        """Test the positions property."""
        self.election.candidates.append(Candidate(first_name="John", last_name="Doe", position="President"))
        self.election.candidates.append(Candidate(first_name="Jane", last_name="Doe", position="President"))
        self.election.candidates.append(Candidate(first_name="Bob", last_name="Smith", position="Vice President"))
        positions = self.election.positions
        self.assertEqual(len(positions), 2)
        self.assertIn("President", positions)
        self.assertIn("Vice President", positions)

    def test_ballot_candidates(self):
        """Test the ballots method's handling of candidates."""
        self.election.candidates.append(Candidate(first_name="John", last_name="Doe", position="President"))
        self.assertEqual(self.election.ballots[0]["candidates"], ["John Doe"])

    def test_ballot_no_duplicates(self):
        """Test the ballots method with a candidate that already exists in the ballot."""
        self.election.candidates.append(Candidate(first_name="John", last_name="Doe", position="President"))
        self.assertEqual(len(self.election.ballots[0]["candidates"]), 1)
        self.assertEqual(self.election.ballots[0]["candidates"][0], "John Doe")

    def test_ballots_multiple_positions(self):
        """Test the ballots method with multiple positions."""
        self.election.candidates.append(Candidate(first_name="John", last_name="Doe", position="President"))
        self.election.candidates.append(Candidate(first_name="Jane", last_name="Doe", position="Vice President"))
        self.assertEqual(len(self.election.ballots), 2)
        self.assertIn({"name": "President", "candidates": ["John Doe"]}, self.election.ballots)
        self.assertIn({"name": "Vice President", "candidates": ["Jane Doe"]}, self.election.ballots)

    def test_ballots_multiple_candidates(self):
        """Test the ballots method with multiple candidates for the same position."""
        self.election.candidates.append(Candidate(first_name="John", last_name="Doe", position="President"))
        self.election.candidates.append(Candidate(first_name="Jane", last_name="Doe", position="President"))
        self.assertEqual(len(self.election.ballots[0]["candidates"]), 2)
        self.assertIn("John Doe", self.election.ballots[0]["candidates"])
        self.assertIn("Jane Doe", self.election.ballots[0]["candidates"])

    def test_ballots_no_candidates(self):
        """Test the ballots method with no candidates."""
        self.assertEqual(len(self.election.ballots), 0)

    def tearDown(self):
        self.session.close()

    def test_public_key(self):
        """ Test that public_key is a short UUID """
        self.assertTrue(isinstance(self.election.public_id, str))
        self.assertEqual(len(self.election.public_id), 14)

    def test_id(self):
        """ Test that private_key is a UUID """
        self.assertTrue(isinstance(self.election.id, str))
        self.assertEqual(len(self.election.id), 36)

    def test_add_voter(self):
        self.election.add_voter("John", "Doe", "john.doe@example.com")
        self.assertIn({"first_name": "John", "last_name": "Doe",
                       "email": "john.doe@example.com"}, self.election.voters)
