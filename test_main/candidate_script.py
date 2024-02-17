#!/usr/bin/python3
"""
Creates a candidate and prints it dictionary state
"""

from models.candidate import Candidate
from models.election import Election
from datetime import datetime as dt

elect1 = Election(title='Elect1', start_date=dt.now(), end_date=dt.now())

cand1 = Candidate(first_name='John', last_name='Doe', position='President', election_id=elect1.id)
elect1.add_candidate(obj=cand1)
print(cand1.to_dict())
print('_______________________________________________________________________')
print('\n\n')
print('_______________________________________________________________________')
print(elect1.to_dict())