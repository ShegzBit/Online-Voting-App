#!/usr/bin/python3
"""
This module contains the api handler for the election
"""

from flask import jsonify, request, abort, redirect
from models import storage
from models.election import Election
from models.candidate import Candidate
from api.v1.views import ovs_elect


@ovs_elect.route('/', methods=['GET'], strict_slashes=False)
def home():
    """ Redirects to the landing page
    """
    return redirect('https://pollmaster.webflow.io/')

@ovs_elect.route('/create_election', methods=['POST'], strict_slashes=False)
def create_election():
    """ Create a new election
    """
    data = request.get_json()
    # handle for errors
    if not data:
        abort(400, 'Not a JSON')
    if not 'candidates' in data:
        abort(400, 'Missing candidate')
    if not 'election' in data:
        abort(400, 'Missing election')
    if not 'title' in data['election']:
        abort(400, 'Missing title')
    if not 'start_date' in data['election']:
        abort(400, 'Missing start_date')
    if not 'end_date' in data['election']:
        abort(400, 'Missing end_date')
    if not 'admin_id' in data:
        abort(400, 'Missing admin_id')
    
    # create the election
    admin_id = data['admin_id']
    candidates = data['candidates']
    election = data['election']
    voters_id = set(data.get('voters_id', []))
    admin = storage.get('Admin', admin_id)
    if not admin:
        abort(400, 'Admin not found')
    try:
        new_election = admin.new_election(**election, voters_id=voters_id)
        new_election.update_state(candidates=candidates)
    except ValueError as e:
        return(400, str(e))
    resp_dict = {'status': 'successful', 'election': new_election.to_dict()}
    return jsonify(resp_dict), 201

@ovs_elect.route('/election/<election_id>', methods=['GET'], strict_slashes=False)
def get_election(election_id):
    """ Get an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.to_dict()), 200

@ovs_elect.route('/election/<election_id>', methods=['DELETE'], strict_slashes=False)
def delete_election(election_id):
    """ Delete an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    storage.delete(election)
    storage.save()
    return jsonify({}), 200

@ovs_elect.route('/election/<election_id>', methods=['PUT'], strict_slashes=False)
def update_election(election_id):
    """ Update an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    try:
        election.update_state(**data)
    except ValueError as e:
        abort(400, str(e))
    return jsonify(election.to_dict()), 200

@ovs_elect.route('/election', methods=['GET'], strict_slashes=False)
def get_elections():
    """ Get all elections
    """
    elections = storage.all('Election')
    return jsonify([e.to_dict() for e in elections.values()]), 200

@ovs_elect.route('/election/<election_id>/result', methods=['GET'], strict_slashes=False)
def get_election_result(election_id):
    """ Get the result of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_results()), 200

@ovs_elect.route('/election/<election_id>/status', methods=['GET'], strict_slashes=False)
def get_election_status(election_id):
    """ Get the status of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_election_status()), 200

@ovs_elect.route('/election/<election_id>/vote', methods=['POST'], strict_slashes=False)
def vote(election_id):
    """ Vote in an election
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if not 'voter_id' in data:
        abort(400, 'Missing voter_id')
    if not 'candidate_id' in data:
        abort(400, 'Missing candidate_id')
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    candidate = storage.get('Candidate', data['candidate_id'])
    if not candidate:
        abort(404, 'Candidate not found')
    election.add_voter(**data)
    return jsonify({}), 201

@ovs_elect.route('/election/<election_id>/voters', methods=['GET'], strict_slashes=False)
def get_voters(election_id):
    """ Get the voters of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_voters()), 200

@ovs_elect.route('/election/<election_id>/start', methods=['PUT'], strict_slashes=False)
def start_election(election_id):
    """ Start an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    try:
        election.activate_election()
    except ValueError as e:
        abort(400, str(e))
    return jsonify({}), 200
