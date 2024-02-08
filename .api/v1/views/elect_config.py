#!/usr/bin/python3
"""
This module contains api handlers for routes/endpoints having to do
with election configuration.
"""

from flask import jsonify, make_response, request
from api.v1.views import app_views
from models.election import Election
from models import storage
from models.candidate import Candidate

@app_views.route('/', methods=['GET'])
def home():
    """
    Home
    """
    return make_response(jsonify({'message': 'welcome'}))

@app.route('/create-eletction', methods=['POST'])
def create_election():
    """
    Creates a new election.
    parameter:
    {
        "admin_id": str - id of admin creating election
        "election": {
            "title": str - title of election
            "start_date": datetime - start date of election
            "end_date": datetime - end date of election
            ...
        }
        "candidate_details": [
            {
                "firstname": str - firstname of candidate
                "lastname": str - lastname of candidate
                "position": str - position of candidate
            },
            {
                "firstname"; str - firstname of candidate
                "lastname": str - lastname of candidate
                "position": str - position of candidate
            }
            ...
        ]
        voters_id: [
            str - id of voter1
            str - id of voter2
            ...
        ]
    }
    """
    data = request.get_json()
    admin_id = data.get('admin_id')
    candidates = date.get('candidate_details')
    election = data.get('election')
    voters_id = data.get('voters_id')

    admin = storage.get('Ekection', admin_id)
    election = admin.new_election(**election, voters_id=voters_id)
    election.update_state(candidates=candidates)
    return make_response(jsonify(election.to_dict()), 201)