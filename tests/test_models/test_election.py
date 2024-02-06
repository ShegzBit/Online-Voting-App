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
            results={},
            total_votes=0,
            voters_id=['voter1']
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
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.election.candidates.append(Candidate(first_name="Jane",
                                                  last_name="Doe",
                                                  position="President"))
        self.election.candidates.append(Candidate(first_name="Bob",
                                                  last_name="Smith",
                                                  position="Vice President"))
        positions = self.election.positions
        self.assertEqual(len(positions), 2)
        self.assertIn("President", positions)
        self.assertIn("Vice President", positions)

    def test_ballot_candidates(self):
        """Test the ballots method's handling of candidates."""
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.assertEqual(self.election.ballots[0]["candidates"], ["John Doe"])

    def test_ballot_no_duplicates(self):
        """
        Test the ballots method with a candidate
        that already exists in the ballot.
        """
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.assertEqual(len(self.election.ballots[0]["candidates"]), 1)
        self.assertEqual(self.election.ballots[0]["candidates"][0], "John Doe")

    def test_ballots_multiple_positions(self):
        """Test the ballots method with multiple positions."""
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.election.candidates.append(Candidate(first_name="Jane",
                                                  last_name="Doe",
                                                  position="Vice President"))
        self.assertEqual(len(self.election.ballots), 2)
        self.assertIn({"name": "President", "candidates": ["John Doe"]},
                      self.election.ballots)
        self.assertIn({"name": "Vice President", "candidates": ["Jane Doe"]},
                      self.election.ballots)

    def test_ballots_multiple_candidates(self):
        """
        Test the ballots method with multiple candidates
        for the same position.
        """
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.election.candidates.append(Candidate(first_name="Jane",
                                                  last_name="Doe",
                                                  position="President"))
        self.assertEqual(len(self.election.ballots[0]["candidates"]), 2)
        self.assertIn("John Doe", self.election.ballots[0]["candidates"])
        self.assertIn("Jane Doe", self.election.ballots[0]["candidates"])

    def test_ballots_no_candidates(self):
        """Test the ballots method with no candidates."""
        self.assertEqual(len(self.election.ballots), 0)

    def test_compute_results_no_votes(self):
        """Test the compute_results method with no votes."""
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President"))
        self.election.candidates.append(Candidate(first_name="Jane",
                                                  last_name="Doe",
                                                  position="Vice President"))
        self.election.compute_results()
        expected_results = {
            "President": {"John Doe": 0},
            "Vice President": {"Jane Doe": 0}
        }
        self.assertEqual(self.election.results, expected_results)

    def test_compute_results_with_votes(self):
        """Test the compute_results method with votes."""
        john = Candidate(first_name="John", last_name="Doe", position="President")
        john.votes = 5
        self.election.candidates.append(john)
        print(john)
        jane = Candidate(first_name="Jane", last_name="Doe", position="Vice President")
        jane.votes = 3
        self.election.candidates.append(jane)
        self.election.compute_results()
        expected_results = {
            "President": {"John Doe": 5},
            "Vice President": {"Jane Doe": 3}
        }
        self.assertEqual(self.election.results, expected_results)

    def test_compute_results_multiple_candidates_same_position(self):
        """Test the compute_results method with multiple candidates for the same position."""
        john = Candidate(first_name="John", last_name="Doe", position="President")
        john.votes = 5
        self.election.candidates.append(john)
        alice = Candidate(first_name="Alice", last_name="Smith", position="President")
        alice.votes = 3
        self.election.candidates.append(alice)
        self.election.compute_results()
        expected_results = {
            "President": {"John Doe": 5, "Alice Smith": 3}
        }
        self.assertEqual(self.election.results, expected_results)

    def test_public_key(self):
        """ Test that public_key is a short UUID """
        self.assertTrue(isinstance(self.election.public_id, str))
        self.assertEqual(len(self.election.public_id), 14)

    def test_id(self):
        """ Test that private_key is a UUID """
        self.assertTrue(isinstance(self.election.id, str))
        self.assertEqual(len(self.election.id), 36)

    def test_add_voter(self):
        """Test the add_voter method."""
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President",
                                                  id="candidate1"))
        self.election.add_voter(first_name="Jane",
                                last_name="Doe",
                                email="jane.doe@example.com",
                                candidate_id="candidate1",
                                voter_id="voter1")
        self.assertEqual(len(self.election.voters), 1)
        self.assertEqual(self.election.voters[0]["first_name"], "Jane")
        self.assertEqual(self.election.voters[0]["last_name"], "Doe")
        self.assertEqual(self.election.voters[0]["email"], "jane.doe@example.com")
        self.assertEqual(self.election.candidates[0].votes, 1)

    def test_add_voter_invalid_arguments(self):
        """Test the add_voter method with invalid arguments."""
        with self.assertRaises(ValueError):
            self.election.add_voter(first_name="Jane",
                                    last_name="Doe",
                                    email="jane.doe@example.com",
                                    voter_id="voter1")

    def test_add_voter_invalid_voter_id(self):
        """Test the add_voter method with an invalid voter id."""
        self.election.candidates.append(Candidate(first_name="John",
                                                  last_name="Doe",
                                                  position="President",
                                                  id="candidate1"))
        with self.assertRaises(ValueError):
            self.election.add_voter(first_name="Jane",
                                    last_name="Doe",
                                    email="jane.doe@example.com",
                                    candidate_id="candidate1",
                                    voter_id="invalid_voter_id")
    def test_add_candidate(self):
        """Test the add_candidate method with valid arguments."""
        self.election.add_candidate(
            first_name="John",
            last_name="Doe",
            party="Party A",
            position="President",
            manifesto="Manifesto A"
        )
        self.assertEqual(len(self.election.candidates), 1)
        self.assertEqual(self.election.candidates[0].first_name, "John")
        self.assertEqual(self.election.candidates[0].last_name, "Doe")
        self.assertEqual(self.election.candidates[0].party, "Party A")
        self.assertEqual(self.election.candidates[0].position, "President")
        self.assertEqual(self.election.candidates[0].manifesto, "Manifesto A")

    def test_add_candidate_missing_argument(self):
        """Test the add_candidate method with a missing argument."""
        with self.assertRaises(ValueError):
            self.election.add_candidate(
                first_name="John",
                last_name="Doe",
                party="Party A",
                position="President"
                # Missing manifesto argument
            )

    def test_add_candidate_invalid_argument(self):
        """Test the add_candidate method with an invalid argument."""
        with self.assertRaises(ValueError):
            self.election.add_candidate(
                first_name="John",
                last_name="Doe",
                party="Party A",
                position="President",
                manifesto="Manifesto A",
                invalid_arg="Invalid"  # Invalid argument
            )

    def test_update_state_start_date(self):
        """Test updating the start_date of the election."""
        new_start_date = datetime.now() + timedelta(days=3)
        self.election.update_state(start_date=new_start_date.strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(self.election.start_date, new_start_date)

    def test_update_state_end_date(self):
        """Test updating the end_date of the election."""
        new_end_date = datetime.now() + timedelta(days=4)
        self.election.update_state(end_date=new_end_date.strftime('%Y-%m-%d %H:%M:%S'))
        self.assertEqual(self.election.end_date, new_end_date)

    def test_update_state_voters_id(self):
        """Test updating the voters_id of the election."""
        new_voters_id = ['voter2', 'voter3']
        self.election.update_state(voters_id=new_voters_id)
        self.assertEqual(self.election.voters_id, ['voter1', 'voter2', 'voter3'])
    
    def test_update_state_invalid_date_format(self):
        """Test updating the election with an invalid date format."""
        with self.assertRaises(ValueError):
            self.election.update_state(start_date='invalid_date_format')
        
    def test_update_state_candidates(self):
        """Test updating the candidates of the election."""
        new_candidates = [
            {'first_name': 'Alice', 'last_name': 'Johnson', 'party': 'Party A', 'position': 'Treasurer', 'manifesto': 'I will work hard!'},
            {'first_name': 'Bob', 'last_name': 'Williams', 'party': 'Party B', 'position': 'Secretary', 'manifesto': 'I will bring change!'},
            {'first_name': 'Charlie', 'last_name': 'Brown', 'party': 'Party C', 'position': 'President', 'manifesto': 'I will make a difference!'}
        ]
        self.election.candidates = []
        self.election.update_state(candidates=new_candidates)
        self.assertEqual(len(self.election.candidates), 3)
        self.assertEqual(self.election.candidates[0].first_name, 'Alice')
        self.assertEqual(self.election.candidates[0].last_name, 'Johnson')
        self.assertEqual(self.election.candidates[0].party, 'Party A')
        self.assertEqual(self.election.candidates[0].position, 'Treasurer')
        self.assertEqual(self.election.candidates[0].manifesto, 'I will work hard!')
        self.assertEqual(self.election.candidates[1].first_name, 'Bob')
        self.assertEqual(self.election.candidates[1].last_name, 'Williams')
        self.assertEqual(self.election.candidates[1].party, 'Party B')
        self.assertEqual(self.election.candidates[1].position, 'Secretary')
        self.assertEqual(self.election.candidates[1].manifesto, 'I will bring change!')
        self.assertEqual(self.election.candidates[2].first_name, 'Charlie')
        self.assertEqual(self.election.candidates[2].last_name, 'Brown')
        self.assertEqual(self.election.candidates[2].party, 'Party C')
        self.assertEqual(self.election.candidates[2].position, 'President')
        self.assertEqual(self.election.candidates[2].manifesto, 'I will make a difference!')

    def tearDown(self):
        self.session.close()