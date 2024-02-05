#!/usr/bin/python3
""" Definition of BaseModel class
"""
from datetime import datetime
from shortuuid import ShortUUID
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from uuid import uuid4


Base = declarative_base()

def short_uuid():
        """ Customize the public key
        """
        id = ShortUUID().random(length=12)
        return '-'.join(id[i:i+4] for i in range(0, 12, 4))


class BaseModel():
    """ The Base class
    """
    id = Column(String(60), primary_key=True, default=str(uuid4()),
                nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow(), nullable=False)

    def save(self):
        """ Save the instance to the database
        """
        from models import storage
        storage.new(self)
        storage.save()

    def delete(self):
        """ Delete the instance from the database
        """
        from models import storage
        storage.delete(self)
        storage.save()

    def __str__(self):
        """Returns a string representation of the instance"""
        cls = (str(type(self)).split('.')[-1]).split('\'')[0]
        return '[{}] ({}) {}'.format(cls, self.id, self.to_dict())
