#!/usr/bin/python3
"""
This module contains the api handler for the election
"""

from flask import jsonify, request, abort, redirect
from models import storage
from models.election import Election
from models.candidate import Candidate
from models.admin import Admin
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
    if 'election' not in data:
        abort(400, 'Missing election')
    if 'title' not in data['election']:
        abort(400, 'Missing title')
    if 'start_date' not in data['election']:
        abort(400, 'Missing start_date')
    if 'end_date' not in data['election']:
        abort(400, 'Missing end_date')
    if 'admin_id' not in data:
        abort(400, 'Missing admin_id')

    # create the election
    admin_id = data['admin_id']
    election = data['election']
    try:
        candidates = data['candidates']
        voters_id = set(data.get('voters_id', []))
    except KeyError:
        candidates = []
        voters_id = set()

    admin = storage.get('Admin', admin_id)
    if not admin:
        abort(400, 'Admin not found')
    try:
        new_election = admin.new_election(**election)
        new_election.update_state(candidates=candidates)
        new_election.update_state(voters_id=voters_id)
    except ValueError as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400
    resp_dict = {'status': 'successful', 'election': new_election.to_dict()}
    return jsonify(resp_dict), 201


@ovs_elect.route('/election/<election_id>', methods=['GET'],
                 strict_slashes=False)
def get_election(election_id):
    """ Get an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.to_dict()), 200


@ovs_elect.route('/election', methods=['GET'], strict_slashes=False)
def get_elections():
    """ Get all elections
    """
    elections = storage.all(Election)
    sorted_elections = sorted(elections.values(), key=lambda e: e.created_at
                              reverse=True)
    return jsonify([e.to_dict() for e in sorted_elections]), 200


@ovs_elect.route('/election/<election_id>/result', methods=['GET'],
                 strict_slashes=False)
def get_election_result(election_id):
    """ Get the result of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_results()), 200


@ovs_elect.route('/election/<election_id>/status', methods=['GET'],
                 strict_slashes=False)
def get_election_status(election_id):
    """ Get the status of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_election_status()), 200


@ovs_elect.route('/election/<election_id>/vote', methods=['POST'],
                 strict_slashes=False)
def vote(election_id):
    """ Vote in an election
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'voter_id' not in data:
        abort(400, 'Missing voter_id')
    if 'candidate_id' not in data:
        abort(400, 'Missing candidate_id')
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    candidate = storage.get('Candidate', data['candidate_id'])
    if not candidate:
        abort(404, 'Candidate not found')
    election.add_voter(**data)
    return jsonify({}), 201


@ovs_elect.route('/election/<election_id>/voters', methods=['GET'],
                 strict_slashes=False)
def get_voters(election_id):
    """ Get the voters of an election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    return jsonify(election.get_voters()), 200


@ovs_elect.route('/election/<election_id>/start', methods=['PUT'],
                 strict_slashes=False)
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
