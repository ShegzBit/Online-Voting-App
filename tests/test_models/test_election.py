#!/usr/bin/python3
from datetime import datetime, timedelta
import unittest
from unittest.mock import patch

from models import storage
from models.admin import Admin
from models.base import short_uuid
from models.candidate import Candidate
from models.election import Election


class TestElection(unittest.TestCase):
    def setUp(self):
        """Set up the test environment."""
        self.admin = Admin(first_name="John", last_name="Doe",
                            email=f"john_{short_uuid()}@gmail.com",
                            password="password")
        self.admin.save()

        self.election = Election(
            admin_id=self.admin.id,
            title="Test Election",
            start_date=datetime.now() + timedelta(seconds=2),
            end_date=datetime.now() + timedelta(seconds=5),
            public_id=short_uuid(),
            status="Upcoming",
            voters=[],
            results={},
            total_votes=0,
            voters_id={'voter1'}
        )
        self.election.save()

    def test_election_creation(self):
        """Test the creation of an Election instance."""
        retrieved_election = storage.get("Election", self.election.id)
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
                                                  position="President"),)
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

    def test_positions_and_ballots(self):
        """
        Test that candidates are only returned from positions
        and ballots methods of an election instance
        """
        # Create two elections
        election1 = Election(admin_id=self.admin.id,
                             title="Election 1", start_date='2021-01-01 00:00:00',
                             end_date='2021-01-01 00:00:00',
                             voters_id={'voter1'})
        election1.save()
        election2 = Election(admin_id=self.admin.id,
                             title="Election 2", start_date='2021-01-01 00:00:00',
                             end_date='2021-01-01 00:00:00',
                             voters_id={'voter2'})
        election2.save()

        # Add a candidate to each election
        election1.add_candidate(first_name="John", last_name="Doe", position="President")
        election2.add_candidate(first_name="Jane", last_name="Smith", position="Vice President")

        # Check the positions and ballots for election1
        self.assertEqual(election1.positions, {"President"})
        self.assertEqual(election1.ballots, [{"name": "President", "candidates": ["John Doe"]}])

        # Check the positions and ballots for election2
        self.assertEqual(election2.positions, {"Vice President"})
        self.assertEqual(election2.ballots, [{"name": "Vice President", "candidates": ["Jane Smith"]}])

    def test_compute_results_no_votes(self):
        """Test the compute_results method with no votes."""
        self.election.add_candidate(first_name="John",
                                    last_name="Doe",
                                   party="Party A",
                                   position="President",
                                   manifesto="Manifesto A")
        self.election.add_candidate(first_name="Jane",
                                    last_name="Doe",
                                    party="Party B",
                                    position="Vice President",
                                    manifesto="Manifesto B")
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
        self.election.save()
        john = {'first_name': "John", 'last_name': "Doe", 'position': "President", 'votes': 5}
        self.election.add_candidate(**john)
        alice = {'first_name': "Alice", 'last_name': "Smith", 'position': "President", 'votes': 3}
        self.election.add_candidate(**alice)
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
                last_name="Eric",
                party="Party A",
                # position missing
                # Missing manifesto argument
            )

    def test_update_state_start_date(self):
        """Test updating the start_date of the election."""
        old_start_date = self.election.start_date
        new_start_date = datetime.now() + timedelta(days=3)
        self.election.update_state(start_date=new_start_date.strftime('%Y-%m-%d %H:%M:%S'))
        self.assertNotEqual(self.election.start_date, old_start_date)

    def test_update_state_end_date(self):
        """Test updating the end_date of the election."""
        new_end_date = datetime.now() + timedelta(days=4)
        old_end_date = self.election.end_date
        self.election.update_state(end_date=new_end_date.strftime('%Y-%m-%d %H:%M:%S'))
        self.assertNotEqual(self.election.end_date, old_end_date)

    def test_update_state_voters_id(self):
        """Test updating the voters_id of the election."""
        new_voters_id = {'voter2', 'voter3'}
        if len(self.election.voters_id) == 0:
            self.election.add_voters_id({'voter1'})
        self.election.update_state(voters_id=new_voters_id)
        self.assertEqual(self.election.voters_id, {'voter1', 'voter2', 'voter3'})
    
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

        self.election.update_state(candidates=new_candidates)
        self.assertEqual(len(self.election.candidates), 3)


    class TestElectionActivation(unittest.TestCase):
        def setUp(self):
            self.admin = Admin(first_name="John", last_name="Doe",
                               email="fawaz@gmail.com",
                                 password="password")
            self.admin.save()

            self.election = Election(
                admin_id=self.admin.id,
                title="Test Election",
                start_date=datetime.now() + timedelta(seconds=1),
                end_date=datetime.now() + timedelta(seconds=2),
                public_id=short_uuid(),
                status="Upcoming",
                voters=[],
                results={},
                total_votes=0,
                voters_id=['voter1']
            )

        @patch('models.election.Timer')
        def test_activate_election(self, mock_timer):
            """Test the activate_election method"""
            self.election.activate_election()

            # Check that Timer was called twice
            self.assertEqual(mock_timer.call_count, 2)

            # Check that the first Timer was set with the correct delay
            start_delay = (self.election.start_date - datetime.now()).total_seconds()
            mock_timer.assert_any_call(start_delay, self.election.start_election)

            # Check that the second Timer was set with the correct delay
            end_delay = (self.election.end_date - datetime.now()).total_seconds()
            mock_timer.assert_any_call(end_delay, self.election.end_election)

            # Check that start was called on both Timer instances
            mock_timer.return_value.start.assert_called_with()

            # Check that the method returned True
            self.assertTrue(self.election.activate_election())
