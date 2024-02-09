"""
Storage Handler for OVS.
"""
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

import models
from models.admin import Admin
from models.base import BaseModel, Base
from models.candidate import Candidate
from models.election import Election


load_dotenv()


class DBStorage:
    models = [Admin, Election, Candidate]
    """
    Model for storage engine class for handling data persistence
    """
    __session = None
    __engine = None

    def __init__(self):
        """
        Storage engine construction
        """
        USER = os.getenv('OVS_MYSQL_USER')
        PWD = os.getenv('OVS_MYSQL_PWD')
        HOST = os.getenv('OVS_MYSQL_HOST')
        DB = os.getenv('OVS_MYSQL_DB')

        url = f'mysql+mysqldb://{USER}:{PWD}@{HOST}/{DB}'
        self.__engine = create_engine(url, pool_pre_ping=True)

        if os.getenv('OVS_ENV') == 'test':
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """
        Returns all the object in the session
        """
        session = self.__session
        objects = []
        if cls is not None:
            objects.extend(session.query(cls).all())
        else:
            for model in DBStorage.models:
                objects.extend(session.query(model).all())
        obj_dict = {}
        for obj in objects:
            key = obj.to_dict()['__class__'] + '.' + obj.id
            obj_dict.update({key: obj})
        return obj_dict

    def get(self, model_name, id):
        """
        gets an object of a given id
        """
        for model in DBStorage.models:
            if model.__name__ == model_name:
                all_objs = self.all(model)
                for obj in all_objs.values():
                    if obj.id == id:
                        return obj


    def new(self, obj):
        """
        Takes a new obj and adds it to the current session
        """
        self.__session.add(obj)

    def reload(self):
        """
        Reload data from database
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)
        self.__session = scoped_session(session_factory)

    def save(self):
        """
        Saves current session to database
        """
        self.__session.commit()

    def delete(self, obj):
        """
        Delets obj from current session
        """
        self.__session.delete(obj)

    def close(self):
        """
        Closes the current session
        """
        self.__session.remove()