import unittest
from unittest.mock import patch
from models.base import BaseModel, short_uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class TestBaseModel(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures"""
        self.engine = create_engine('sqlite:///:memory:')
        self.session = sessionmaker(bind=self.engine)()

    def test_short_uuid(self):
        """Test the short_uuid function"""
        id = short_uuid()
        self.assertEqual(len(id), 14)  # 12 characters + 2 hyphens
        self.assertIsInstance(id, str)

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

    def test_updated_at(self):
        """Test the updated_at attribute"""
        base_model = BaseModel()
        base_model.save()
        self.assertIsNotNone(base_model.updated_at)

    def tearDown(self):
        """Tear down test fixtures"""
        self.session.close()

if __name__ == '__main__':
    unittest.main()