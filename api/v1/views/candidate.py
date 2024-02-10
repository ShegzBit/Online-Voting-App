#!/usr/bin/python3
""" Definition of the candidate view for the API
"""
from flask import jsonify, request, abort

from api.v1.views import ovs_elect
from models import storage
from models.candidate import Candidate


@ovs_elect.route('/candidate', methods=['POST'], strict_slashes=False)
def include_candidate():
    """ Add a new candidate
    """
    data = request.get_json()
    if 'candidates' not in data:
        abort(400, 'Missing candidate')
    if not isinstance(data['candidates'], list):
        abort(400, 'Invalid candidate list')
    candidates = data['candidates']
    candidates_list = []
    for candidate in candidates:
        if not isinstance(candidate, dict):
            abort(400, 'Invalid candidate')
        if not 'first_name' in candidate:
            abort(400, "Missing candidate's firstname")
        if not 'last_name' in candidate:
            abort(400, "Missing candidate's lastname")
        if not 'election_id' in candidate:
            abort(400, 'Missing election_id')
        if not 'position' in candidate:
            abort(400, "Missing candidate's position of interest")
        election_id = candidate['election_id']
        election = storage.get('Election', election_id)
        if not election:
            abort(400, 'Election not found')
    for candidate in candidates:
        try:
            new_candidate = Candidate(**candidate)
            new_candidate.save()
            candidates_list.append(new_candidate)
        except ValueError as e:
            abort(400, str(e))
    resp_dict = {'status': 'successful',
                 'candidates': [c.to_dict() for c in candidates_list]}
    return jsonify(resp_dict), 201


@ovs_elect.route('/candidate/<candidate_id>', methods=['GET'], strict_slashes=False)
def get_candidate(candidate_id):
    """ Get a candidate
    """
    candidate = storage.get('Candidate', candidate_id)
    if not candidate:
        abort(404, 'Candidate not found')
    return jsonify(candidate.to_dict()), 200

@ovs_elect.route('/candidate/<candidate_id>', methods=['DELETE'], strict_slashes=False)
def delete_candidate(candidate_id):
    """ Delete a candidate
    """
    candidate = storage.get('Candidate', candidate_id)
    if not candidate:
        abort(404, 'Candidate not found')
    storage.delete(candidate)
    storage.save()
    return jsonify({}), 200

@ovs_elect.route('/candidate/<candidate_id>', methods=['PUT'], strict_slashes=False)
def update_candidate(candidate_id):
    """ Update a candidate
    """
    candidate = storage.get('Candidate', candidate_id)
    if not candidate:
        abort(404, 'Candidate not found')
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    try:
        candidate.update(**data)
    except ValueError as e:
        abort(400, str(e))
    return jsonify(candidate.to_dict()), 200

@ovs_elect.route('/candidate', methods=['GET'], strict_slashes=False)
def get_candidates():
    """ Get all candidates
    """
    candidates = storage.all('Candidate')
    return jsonify([c.to_dict() for c in candidates.values()]), 200

@ovs_elect.route('/candidate/election/<election_id>', methods=['GET'], strict_slashes=False)
def get_candidates_by_election(election_id):
    """ Get all candidates by election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    candidates = [c.to_dict() for c in election.candidates]
    return jsonify(candidates), 200

@ovs_elect.route('/candidate/election/<election_id>', methods=['DELETE'], strict_slashes=False)
def delete_candidates_by_election(election_id):
    """ Delete all candidates by election
    """
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    for candidate in election.candidates:
        storage.delete(candidate)
    storage.save()
    return jsonify({}), 200
