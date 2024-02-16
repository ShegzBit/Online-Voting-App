#!/usr/bin/python3
""" Definition of BaseModel class
"""
from datetime import datetime
from shortuuid import ShortUUID
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from uuid import uuid4
import json


Base = declarative_base()


def short_uuid():
    """ Customize the public key
    """
    id = ShortUUID().random(length=12)
    return '-'.join(id[i:i+4] for i in range(0, 12, 4))

def is_jsonnable(obj):
    """ Check if an object is jsonnable
    """
    try:
        json.dumps(obj)
        return True
    except:
        return False

def is_iterable(obj):
    """ Check if an object is iterable
    """
    try:
        iter(obj)
        return True
    except:
        return False


class BaseModel():
    """ The Base class
    """
    id = Column(String(60), primary_key=True, default=str(uuid4()),
                nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow(), nullable=False)

    def __init__(self, *args, **kwargs):
        """ Constructor for BaseModel
        """
        self.id = str(uuid4())
        self.created_at = datetime.now()
        if kwargs:
            for key, value in kwargs.items():
                if (key in ('created_at', 'start_date', 'end_date')
                    and type(value) is str):
                    value = datetime.strptime(value, '%Y-%m-%d %H:%M:%S')
                if key not in ('__class__', '_sa_instance_state'):
                    setattr(self, key, value)

    def to_dict(self):
        """ Returns dictionary representation of an instance
        """
        # Get a copy of instance dict
        dict_copy = self.__dict__.copy()

        dict_copy['created_at'] = self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        if 'start_date' in dict_copy:
            dict_copy['start_date'] = (dict_copy['start_date']
                                       .strftime('%Y-%m-%d %H:%M:%S'))
        if 'end_date' in dict_copy:
            dict_copy['end_date'] = (dict_copy['end_date']
                                     .strftime('%Y-%m-%d %H:%M:%S'))

        dict_copy["__class__"] = f"{self.__class__.__name__}"
        if "_sa_instance_state" in dict_copy:
            del dict_copy["_sa_instance_state"]
        return dict_copy

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
        return '[{}] ({}) {}'.format(self.__class__.__name__, self.id,
                                     self.to_dict())
