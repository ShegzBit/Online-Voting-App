#!/usr/bin/python3
import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
from models.base import Base, BaseModel, short_uuid
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
            public_key=short_uuid(),
            status="Upcoming",
            candidate_id="test_candidate_id",
            voters=[],
            ballots=[],
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

    def tearDown(self):
        self.session.close()

    def test_public_key(self):
        """ Test that public_key is a short UUID """
        self.assertTrue(isinstance(self.election.public_key, str))
        self.assertEqual(len(self.election.public_key), 14)

    def test_id(self):
        """ Test that private_key is a UUID """
        self.assertTrue(isinstance(self.election.id, str))
        self.assertEqual(len(self.election.id), 36)

    def test_add_voter(self):
        self.election.add_voter("John", "Doe", "john.doe@example.com")
        self.assertIn({"first_name": "John", "last_name": "Doe",
                       "email": "john.doe@example.com"}, self.election.voters)

    def test_ballot(self):
        self.election.ballots("Ballot 1", ["Candidate 1", "Candidate 3"])
        self.assertIn({"name": "Ballot 1",
                       "candidates": ["Candidate 1", "Candidate 3"]},
                      self.election.ballots)
