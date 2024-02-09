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
