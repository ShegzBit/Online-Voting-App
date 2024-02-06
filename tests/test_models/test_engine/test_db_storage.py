#!/usr/bin/python3
import unittest
from unittest.mock import MagicMock
from models.engine.db_storage import DBStorage
from models.admin import Admin
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session


class TestDBStorage(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.engine = create_engine('sqlite:///:memory:')
        self.session = scoped_session(sessionmaker(bind=self.engine,
                                                   expire_on_commit=False))()
        self.storage = DBStorage()
        # Access the private attribute
        self.storage._DBStorage__session = self.session

    def test_all(self):
        """Test the all method"""
        # Create a mock object and add it to the session
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')
        self.session.add(mock_obj)
        self.session.commit()

        # Call the all method and check the returned dictionary
        obj_dict = self.storage.all()
        self.assertIn('Admin.' + mock_obj.id, obj_dict)
        self.assertEqual(obj_dict['Admin.' + mock_obj.id], mock_obj)

    def test_get(self):
        """Test the get method"""
        # Create a mock object and add it to the session
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')
        self.session.add(mock_obj)
        self.session.commit()

        # Call the get method and check the returned object
        obj = self.storage.get('Admin', mock_obj.id)
        self.assertEqual(obj, mock_obj)

    def test_new(self):
        """Test the new method"""
        # Create a mock object
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')

        # Call the new method and check the session
        self.storage.new(mock_obj)
        self.assertIn(mock_obj, self.session)

    def test_reload(self):
        """Test the reload method"""
        # Create a mock object and add it to the session
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')
        self.session.add(mock_obj)
        self.session.commit()

        # Call the reload method and check the session
        self.storage.reload()
        self.assertNotIn(mock_obj, self.session)

    def test_save(self):
        """Test the save method"""
        # Create a mock object and add it to the session
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')
        self.session.add(mock_obj)

        # Call the save method and check the session
        self.storage.save()
        self.assertIn(mock_obj, self.session)

    def test_delete(self):
        """Test the delete method"""
        # Create a mock object and add it to the session
        mock_obj = Admin(firstname='Test', lastname='User',
                         username='testuser',
                         email='test@example.com', password='password')
        self.session.add(mock_obj)
        self.session.commit()

        # Call the delete method and check the session
        self.storage.delete(mock_obj)
        self.assertNotIn(mock_obj, self.session)

    def tearDown(self):
        """Tear down test fixtures"""
        self.session.close()
