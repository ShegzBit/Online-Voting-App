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
    if not data:
        abort(400, 'Not a JSON')
    if not 'first_name' in data:
        abort(400, "Missing candidate's firstname")
    if not 'last_name' in data:
        abort(400, "Missing candidate's lastname")
    if not 'election_id' in data:
        abort(400, 'Missing election_id')
    if not 'position' in data:
        abort(400, "Missing candidate's position of interest")
    election_id = data['election_id']
    election = storage.get('Election', election_id)
    if not election:
        abort(400, 'Election not found')
    try:
        candidate = Candidate(**data)
        candidate.save()
    except ValueError as e:
        abort(400, str(e))
    resp_dict = {'status': 'successful', 'candidate': candidate.to_dict()}
    return jsonify(resp_dict), 201
