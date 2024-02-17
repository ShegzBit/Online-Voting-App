#!/usr/bin/python3
from flask import Flask, request, jsonify, make_response
from models.election import Election
from models.candidate import Candidate
from datetime import datetime as dt, timedelta

app = Flask(__name__)

@app.route('/elections', methods=['GET'])
def get_elections():
    """
    Creates an election and return the json
    """
    candidates = [
        {
            'first_name': 'John',
            'last_name': 'Doe',
            'position': 'President'
        },
        {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'position': 'President'
        },
        {
            'first_name': 'Arnold',
            'last_name': 'Schwazenneger',
            'position': 'Vice President'
        }
    ]
    voters_id = ['1', '2', '3', '4', '5']
    election = Election(title='Election1', start_date=dt.now(), end_date=dt.now() + timedelta(seconds=5))
    election.add_voters_id(voters_id)
    election.update_state(candidates=candidates)
    election.add_voter(first_name='Joshua', last_name='Maini', email='me@you.those', candidate_id=election.candidates[0].id, voter_id='1')
    return make_response(jsonify(election.to_dict()))

if __name__ == '__main__':
    app.run(port='5000')