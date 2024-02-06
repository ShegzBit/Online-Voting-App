#!/usr/bin/python3
import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.base import Base, BaseModel
from models.candidate import Candidate


class TestCandidate(unittest.TestCase):
    def setUp(self):
        # Use in-memory SQLite for testing
        self.engine = create_engine('sqlite:///:memory:')
        self.Session = sessionmaker(bind=self.engine)
        Base.metadata.create_all(self.engine)  # Create all tables
        self.session = self.Session()

        self.candidate = Candidate(
            first_name="John",
            last_name="Doe",
            party="Independent",
            position="President",
            manifesto="My manifesto...",
            votes=0,
            election_id="some-election-id"
        )

    def test_candidate_creation(self):
        self.session.add(self.candidate)
        self.session.commit()

        retrieved_candidate = self.session.query(Candidate).first()
        self.assertEqual(retrieved_candidate.first_name, "John")
        self.assertEqual(retrieved_candidate.last_name, "Doe")
        self.assertEqual(retrieved_candidate.party, "Independent")
        self.assertEqual(retrieved_candidate.position, "President")
        self.assertEqual(retrieved_candidate.manifesto, "My manifesto...")
        self.assertEqual(retrieved_candidate.votes, 0)
        self.assertEqual(retrieved_candidate.election_id, "some-election-id")

    def test_full_name_property(self):
        self.assertEqual(self.candidate.full_name, "John Doe")

    def tearDown(self):
        self.session.close()
