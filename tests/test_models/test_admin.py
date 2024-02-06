#!/usr/bin/python3
import unittest
from unittest.mock import patch

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.admin import Admin
from models.election import Election


class TestAdminModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.engine = create_engine('sqlite:///:memory:')
        self.session = sessionmaker(bind=self.engine)()
        self.admin = Admin(firstname='Test', lastname='User',
                           username='testuser',
                           email='test@example.com', password='password')

    def test_new_election(self):
        """Test the new_election method"""
        election = self.admin.new_election(firstname='Election',
                                           lastname='Test',
                                           email='election@example.com',
                                           password='password')
        self.assertIsInstance(election, Election)
        self.assertIn('Election.' + election.id, self.admin.elections)

    def test_to_dict(self):
        """Test the to_dict method"""
        dictionary = self.admin.to_dict()
        self.assertEqual(dictionary['firstname'], 'Test')
        self.assertEqual(dictionary['lastname'], 'User')
        self.assertEqual(dictionary['username'], 'testuser')
        self.assertEqual(dictionary['email'], 'test@example.com')
        self.assertNotIn('_Admin__password', dictionary)
        self.assertNotIn('_sa_instance_state', dictionary)

    def test_get_result(self):
        """Test the get_result method"""
        election = self.admin.new_election(firstname='Election',
                                           lastname='Test',
                                           email='election@example.com',
                                           password='password')
        result = self.admin.get_result(election.id)
        self.assertEqual(result['status'], election.status)
        self.assertEqual(result['result'], election.result)

    def test_update_election(self):
        """Test the update_election method"""
        election = self.admin.new_election(firstname='Election',
                                           lastname='Test',
                                           email='election@example.com',
                                           password='password')
        updated_election = self.admin.update_election(election.id,
                                                      firstname='Updated',
                                                      lastname='Election')
        self.assertEqual(updated_election.firstname, 'Updated')
        self.assertEqual(updated_election.lastname, 'Election')

    def tearDown(self):
        """Tear down test fixtures"""
        self.session.close()
