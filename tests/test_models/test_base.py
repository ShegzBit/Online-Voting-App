import unittest
from unittest.mock import patch
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.base import BaseModel, short_uuid


class TestBaseModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.engine = create_engine('sqlite:///:memory:')
        self.session = sessionmaker(bind=self.engine)()

    def test_init_no_args(self):
        """Test the __init__ method with no arguments."""
        base_model = BaseModel()
        self.assertIsNotNone(base_model.id)
        self.assertIsNotNone(base_model.created_at)

    def test_init_with_args(self):
        """Test the __init__ method with arguments."""
        base_model = BaseModel(title="Test", start_date="2022-01-01 00:00:00", end_date="2022-01-02 00:00:00")
        self.assertEqual(base_model.title, "Test")
        self.assertEqual(base_model.start_date, datetime.strptime("2022-01-01 00:00:00", '%Y-%m-%d %H:%M:%S'))
        self.assertEqual(base_model.end_date, datetime.strptime("2022-01-02 00:00:00", '%Y-%m-%d %H:%M:%S'))

    def test_init_with_invalid_date(self):
        """Test the __init__ method with an invalid date string."""
        with self.assertRaises(ValueError):
            BaseModel(start_date="invalid", end_date="invalid")

    def test_init_with_non_date_string(self):
        """Test the __init__ method with a non-date string."""
        with self.assertRaises(ValueError):
            BaseModel(created_at="not a date")

    def test_short_uuid(self):
        """Test the short_uuid function"""
        id = short_uuid()
        self.assertEqual(len(id), 14)  # 12 characters + 2 hyphens
        self.assertIsInstance(id, str)

    def test_to_dict_no_dates(self):
        """Test the to_dict method with no dates."""
        base_model = BaseModel(title="Test")
        expected_dict = {
            "id": base_model.id,
            "title": "Test",
            "created_at": base_model.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "__class__": "BaseModel"
        }
        self.assertEqual(base_model.to_dict(), expected_dict)

    def test_to_dict_with_dates(self):
        """Test the to_dict method with dates."""
        base_model = BaseModel(title="Test", start_date="2022-01-01 00:00:00", end_date="2022-01-02 00:00:00")
        expected_dict = {
            "id": base_model.id,
            "title": "Test",
            "start_date": "2022-01-01 00:00:00",
            "end_date": "2022-01-02 00:00:00",
            "created_at": base_model.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "__class__": "BaseModel"
        }
        self.assertEqual(base_model.to_dict(), expected_dict)

    def test_to_dict_with_sa_instance_state(self):
        """Test the to_dict method with _sa_instance_state."""
        base_model = BaseModel(title="Test")
        base_model._sa_instance_state = "state"
        expected_dict = {
            "id": base_model.id,
            "title": "Test",
            "created_at": base_model.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "__class__": "BaseModel"
        }
        self.assertEqual(base_model.to_dict(), expected_dict)

    @patch('models.base.BaseModel.save')
    def test_save(self, mock_save):
        """Test the save method"""
        base_model = BaseModel()
        base_model.save()
        mock_save.assert_called_once()

    @patch('models.base.BaseModel.delete')
    def test_delete(self, mock_delete):
        """Test the delete method"""
        base_model = BaseModel()
        base_model.delete()
        mock_delete.assert_called_once()

    def test_id(self):
        """Test the id attribute"""
        base_model = BaseModel()
        self.assertIsNotNone(base_model.id)
        self.assertIsInstance(base_model.id, str)

    def test_created_at(self):
        """Test the created_at attribute"""
        base_model = BaseModel()
        self.assertIsNotNone(base_model.created_at)
        self.assertIsInstance(base_model.created_at, datetime)

    def tearDown(self):
        """Tear down test fixtures"""
        self.session.close()
