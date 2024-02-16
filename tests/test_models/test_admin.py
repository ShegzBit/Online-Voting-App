#!/usr/bin/python3
import unittest
from unittest.mock import patch

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models import storage
from models.admin import Admin
from models.base import short_uuid
from models.candidate import Candidate
from models.election import Election


class TestAdminModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.admin = Admin(first_name='Test', last_name='User',
                           username=f'testuser_{short_uuid()}',
                           email=f'test@example.com{short_uuid()}',
                           password='password')
        self.admin.save()

    def test_new_election(self):
        """Test the new_election method"""
        election = self.admin.new_election(title='Election Test',
                                           start_date='2019-01-01 00:00:00',
                                          end_date='2019-01-01 00:00:00')
        self.assertIsInstance(election, Election)
        self.assertIn(election, self.admin.elections)

    def test_to_dict(self):
        """Test the to_dict method"""
        dictionary = self.admin.to_dict()
        self.assertEqual(dictionary['first_name'], 'Test')
        self.assertEqual(dictionary['last_name'], 'User')
        self.assertIn('testuser', dictionary['username'])
        self.assertIn('test@example.com', dictionary['email'])
        self.assertNotIn('_Admin__password', dictionary)
        self.assertNotIn('_sa_instance_state', dictionary)

    def test_get_result(self):
        """Test the get_result method"""
        election = self.admin.new_election(title='Election Test',
                                           start_date='2019-01-01 00:00:00',
                                           end_date='2019-01-01 00:00:00',
                                           voters_id={'1', '2', '3'},
                                           candidates=[Candidate(first_name='Test',
                                                                 last_name='Candidate',
                                                                position='Test Position')])

        result = self.admin.get_result(election.id)
        self.assertEqual(result['status'], election.status)
        self.assertEqual(result['result'], election.results)

    def test_update_election(self):
        """Test the update_election method"""
        election = self.admin.new_election(title='Election Test',
                                           start_date='2019-01-01 00:00:00',
                                           end_date='2019-01-01 00:00:00',
                                           voters_id={'1', '2', '3'},
                                           candidates=[Candidate(first_name='Test',
                                                                 last_name='Candidate',
                                                                position='Test Position')])
        
        updated_election = self.admin.update_election(election.id,
                                                      first_name='Updated',
                                                      last_name='Election')
        self.assertEqual(updated_election.first_name, 'Updated')
        self.assertEqual(updated_election.last_name, 'Election')

class TestAdmin(unittest.TestCase):
    def setUp(self):
        """
        Set up for the tests
        """
        self.admin1 = Admin(first_name='John', last_name='Doe', email='me@you.us', password='1234')
        self.admin2 = Admin(first_name='Jane', last_name='Doe', email='you@me.us', password='1234')
        storage.new(self.admin1)
        storage.new(self.admin2)
        storage.save()

    def test_get_by_attr(self):
        """
        Test get_by_attr method
        """
        admin = Admin.get_by_attr('first_name', 'John')
        self.assertEqual(admin.email, self.admin1.email)

        admin = Admin.get_by_attr('email', 'you@me.us')
        self.assertEqual(admin.email, self.admin2.email)

        admin = Admin.get_by_attr('last_name', 'Smith')
        self.assertIsNone(admin)

    def tearDown(self):
        """
        Tear down for the tests
        """
        storage.delete(self.admin1)
        storage.delete(self.admin2)
        storage.save()


class TestAdminPassword(unittest.TestCase):
    def setUp(self):
        """
        Set up for the tests
        """
        self.admin1 = Admin(first_name='John', last_name='Doe', email='me@you.us', password='1234')
        storage.new(self.admin1)
        storage.save()

    def test_valid_password(self):
        """
        Test is_valid_password method with valid password
        """
        self.assertTrue(self.admin1.is_valid_password('1234'))

    def test_invalid_password(self):
        """
        Test is_valid_password method with invalid password
        """
        self.assertFalse(self.admin1.is_valid_password('wrong_password'))

    def tearDown(self):
        """
        Tear down for the tests
        """
        storage.delete(self.admin1)
        storage.save()

# FILEPATH: /Ubuntu/home/shegz/Online-Voting-App/tests/test_models/test_admin.py

class TestAdminUpdateState(unittest.TestCase):
    def setUp(self):
        """
        Set up for the tests
        """
        self.admin1 = Admin(first_name='John', last_name='Doe', email='me@you.us', password='1234')
        storage.new(self.admin1)
        storage.save()

    def test_update_state_valid_password(self):
        """
        Test update_state method with valid old password
        """
        updated_admin = self.admin1.update_state(old_password='1234', new_password='5678')
        self.assertTrue(updated_admin.is_valid_password('5678'))

    def test_update_state_invalid_password(self):
        """
        Test update_state method with invalid old password
        """
        with self.assertRaises(ValueError):
            updated_admin = self.admin1.update_state(old_password='wrong_password', new_password='5678')

    def test_update_state_other_attributes(self):
        """
        Test update_state method with other attributes
        """
        updated_admin = self.admin1.update_state(first_name='Jane', last_name='Smith')
        self.assertEqual(updated_admin.first_name, 'Jane')
        self.assertEqual(updated_admin.last_name, 'Smith')

    def test_update_state_protected_attributes(self):
        """
        Test update_state method with protected attributes
        """
        updated_admin = self.admin1.update_state(id='new_id', created_at='new_date', elections='new_elections')
        self.assertNotEqual(updated_admin.id, 'new_id')
        self.assertNotEqual(updated_admin.created_at, 'new_date')
        self.assertNotEqual(updated_admin.elections, 'new_elections')

    def tearDown(self):
        """
        Tear down for the tests
        """
        storage.delete(self.admin1)
        storage.save()

if __name__ == '__main__':
    unittest.main()