#!/usr/bin/python3
"""
Module containing election model
"""
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, ForeignKey, PickleType, String
from sqlalchemy.ext.mutable import MutableList
from shortuuid import ShortUUID


def short_uuid():
     id = ShortUUID().random(length=12)
     return '-'.join(id[i:i+4] for i in range(0, 12, 4))


Base = declarative_base()

class Election(Base):
    """
    class for managing and modelling elections
    """
    __tablename__ = "elections"
    id = Column(String(128), default=short_uuid, primary_key=True)
    elect_dict = Column(MutableList.as_mutable(PickleType), nullable=False)
