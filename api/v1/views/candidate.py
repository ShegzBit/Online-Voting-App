#!/usr/bin/python3
""" Definition of the candidate view for the API
"""
from flask import jsonify, request, abort

from api.v1.views import ovs_elect
from models import storage
from models.candidate import Candidate


@ovs_elect.route('/candidate/<candidate_id>', methods=['GET'],
                 strict_slashes=False)
def get_candidate(candidate_id):
    """Get a candidate"""
    candidate = storage.get('Candidate', candidate_id)
    if not candidate:
        abort(404, 'Candidate not found')
    return jsonify(candidate.to_dict()), 200


@ovs_elect.route('/candidate', methods=['GET'], strict_slashes=False)
def get_candidates():
    """Get all candidates"""
    candidates = storage.all(Candidate)
    sorted_candidates = sorted(candidates.values(), key=lambda c: c.full_name)
    return jsonify([c.to_dict() for c in sorted_candidates]), 200


@ovs_elect.route('/candidate/election/<election_id>', methods=['GET'],
                 strict_slashes=False)
def get_candidates_by_election(election_id):
    """Get all candidates by election"""
    election = storage.get('Election', election_id)
    if not election:
        abort(404, 'Election not found')
    candidates = sorted([c.to_dict() for c in election.candidates],
                        key=lambda c: c['full_name'])
    return jsonify(candidates), 200
