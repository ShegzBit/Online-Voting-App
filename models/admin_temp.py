"""
A module containing the candidate model
"""
from sqlalchemy import Column, Integer, String, PickleType, Table, ForeignKey, Date
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.ext.mutable import MutableList
from datetime import datetime as dt
from models.election import Base

from shortuuid import ShortUUID

def short_uuid():
     id = ShortUUID().random(length=12)
     return '-'.join(id[i:i+4] for i in range(0, 12, 4))


admin_election_table = Table("admins_elections",
                             Base.metadata,
                             Column('admin_id', ForeignKey('admins.id')),
                             Column('election_id', ForeignKey('elections.id'))
                             )

class Admin(Base):
    """
    An admin model for managing elections
    """
    __tablename__ = "admins"
    firstname = Column(String(128), nullable=False)
    lastname = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)

    __password = Column(String(128), nullable=False)
    id = Column(String(128), primary_key=True, default=short_uuid)
    username = Column(String(128), nullable=False)
    created_at = Column(Date, default=dt.utcnow)

    elections = relationship("Election", secondary=admin_election_table,
                             backref='admins')


    def __init__(self, *args, **kwargs):
        """
        Admin constructor
        """
        for prop, value in kwargs:
            if prop not in [id, created_at, elect_cred]:
                setattr(self, prop, value)
            if prop == 'created_at':
                value = dt.fromisoformat(value)
                setattr(self, prop, value)

    def create_election(self, *args, **kwargs):
        """
        create a new election
        """
        new_election = Election(kwargs)
        self.elections.append(new_election)
        return new_election

    def get_result(self, election_id):
        """
        get result of election
        """
        for election in elections:
            if election.keys[0] == election_id:
                return {'status': election.status, 'result': election.result}
