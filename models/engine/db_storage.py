"""
Storage Handler for OVS.
"""
from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import models
from sqlalchemy.orm.scoping import scoped_session
from models.election import Election

from models.admin import Admin


Base = declarative_base()
load_dotenv()

USER = os.getenv('OVS_MYSQL_USER')
PWD = os.getenv('OVS_MYSQL_PWD')
HOST = os.getenv('OVS_MYSQL_HOST')
DB = os.getenv('OVS_MYSQL_DB')


class DBStorage:
    models = [Admin]
    """
    Model for storage engine class for handling data persistence
    """
    __session = None
    __engine = None

    def __init__(self):
        """
        Storage engine construction
        """
        url = f'mysql+mysqldb://{USER}:{PWD}@{HOST}/{DB}'
        self.__engine = create_engine(url, pool_pre_ping=True)
        self.__Session = sessionmaker(bind=self.__engine, expire_on_commit=False)

    def all(self, cls=None):
        """
        Returns all the object in the session
        """
        session = self.__session
        objects = []
        if not cls is None:
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
        obj_dict = self.all()
        key = model_name + '.' + id
        return obj_dict.get(key, None)

    def new(self, obj):
        """
        Takes a new obj and adds it to the current session
        """
        self.__session.add(obj)
        return obj
    
    def reload(self):
        """
        Reload data from database
        """
        Base.metadata.create_all(self.__engine)
        self.__session = scoped_session(self.__Session)()

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
