#!/usr/bin/python3
"""
Handles election admin related calls
"""
from api.v1.views import ovs_elect
from models import storage
from models.admin import Admin
from models.candidate import Candidate

from flask import jsonify, request, abort


@ovs_elect.route('/sign_up', methods=['POST'], strict_slashes=False)
def create_admin():
    """ Create a new admin
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'email' not in data:
        abort(400, 'Missing email')
    # Query the database to check if the email already exists
    if Admin.get_by_attr('email', data['email']):
        abort(400, 'Email already exists')
    if 'password' not in data:
        abort(400, 'Missing password')
    try:
        admin = Admin(**data)
        admin.save()
    except ValueError as e:
        abort(400, str(e))
    resp_dict = {'status': 'successful', 'user': admin.to_dict()}
    return jsonify(resp_dict), 201


@ovs_elect.route('/sign_in', methods=['POST'], strict_slashes=False)
def user_sign_in():
    """" Sign in an admin
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'email' not in data:
        if not 'username' in data:
            abort(400, 'Couldn\'t find email or username')
    if 'password' not in data:
        abort(400, 'Missing password')
    admin = Admin.authenticate(data['password'], email=data.get('email', None),
                       username=data.get('username', None))
    if not admin:
        abort(401, 'Invalid email, username or password')
    resp_dict = {'status': 'successful', 'user': admin.to_dict()}
    return jsonify(resp_dict), 201


@ovs_elect.route('/admin/update', methods=['PUT'], strict_slashes=False)
def update_user():
    """ Update user details
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if 'email' not in data:
        if not 'username' in data:
            abort(400, 'Couldn\'t find email or username')
    if 'password' not in data:
        abort(400, 'Missing password')
    if 'password' not in data:
        abort(400, 'Missing password')
    admin = Admin.authenticate(data['password'], email=data.get('email', None),
                       username=data.get('username', None))
    if not admin:
        abort(401, 'Invalid email, username or password')
    try:
        admin.update_state(**data)
    except ValueError as e:
        abort(400, str(e))
    resp_dict = {'status': 'successful', 'admin': admin.to_dict()}
    return jsonify(resp_dict), 201


@ovs_elect.route('/admin/<admin_id>', methods=['GET'], strict_slashes=False)
def get_admin(admin_id):
    """ Get an admin
    """
    admin = storage.get('Admin', admin_id)
    return jsonify(admin.to_dict()), 200


@ovs_elect.route('/admin/<admin_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_admin(admin_id):
    """ Delete an admin
    """
    admin = storage.get('Admin', admin_id)
    storage.delete(admin)
    storage.save()
    return jsonify({}), 200


@ovs_elect.route('/admin/<admin_id>/election/', methods=['GET'],
                 strict_slashes=False)
def get_elections_by_admin(admin_id):
    """ Get all elections by admin
    """
    admin = storage.get('Admin', admin_id)
    elections = sorted([e.to_dict() for e in admin.elections.values()],
                       key=lambda e: e['created_at'],
                       reverse=True)
    return jsonify(elections), 200


@ovs_elect.route('/admin/<admin_id>/election/<election_id>',
                 methods=['GET'], strict_slashes=False)
def get_election_by_admin(admin_id, election_id):
    """ Get an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections.values():
        return jsonify(election.to_dict()), 200
    abort(404, 'Election not found')


@ovs_elect.route('/admin/<admin_id>/election/<election_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_election_by_admin(admin_id, election_id):
    """ Delete an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections.values():
        storage.delete(election)
        storage.save()
        return jsonify({}), 200
    abort(404, 'Election not found')


@ovs_elect.route('/admin/<admin_id>/election/<election_id>',
                 methods=['PUT'], strict_slashes=False)
def update_election_by_admin(admin_id, election_id):
    """ Update an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections.values():
        data = request.get_json()
        if not data:
            abort(400, 'Not a JSON')
        try:
            election.update_election(election_id, **data)
        except ValueError as e:
            abort(400, str(e))
        return jsonify(election.to_dict()), 200
    abort(404, 'Election not found')


# @ovs_elect.route('/admin/<admin_id>/election/<election_id>/candidate',
#                  methods=['POST'], strict_slashes=False)
# def add_candidates_by_election(admin_id, election_id):
#     """ Add candidates to an election
#     """
#     admin = storage.get('Admin', admin_id)
#     election = storage.get('Election', election_id)
#     if election in admin.elections.values():
#         data = request.get_json()
#         if not data:
#             abort(400, 'Not a JSON')
#         if 'candidates' not in data:
#             abort(400, 'Missing candidates')
#         if not isinstance(data['candidates'], list):
#             abort(400, 'Invalid candidate list')
#         candidates = data['candidates']
#         candidates_list = []
#         for candidate in candidates:
#             if not isinstance(candidate, dict):
#                 abort(400, 'Invalid candidate')
#             if 'first_name' not in candidate:
#                 abort(400, "Missing candidate's firstname")
#             if 'last_name' not in candidate:
#                 abort(400, "Missing candidate's lastname")
#             if 'election_id' not in candidate:
#                 abort(400, 'Missing election_id')
#             if 'position' not in candidate:
#                 abort(400, "Missing candidate's position of interest")
#             election_id = candidate['election_id']
#             election = storage.get('Election', election_id)
#             if not election:
#                 abort(400, 'Election not found')
#         for candidate in candidates:
#             try:
#                 new_candidate = Candidate(**candidate)
#                 new_candidate.save()
#                 candidates_list.append(new_candidate)
#             except ValueError as e:
#                 abort(400, str(e))
#         resp_dict = {'status': 'successful',
#                      'candidates': [c.to_dict() for c in candidates_list]}
#         return jsonify(resp_dict), 201


@ovs_elect.route('/admin/<admin_id>/election/<election_id>/candidate/<candidate_id>',
                 methods=['DELETE'], strict_slashes=False)
def delete_candidate_by_admin(admin_id, election_id, candidate_id):
    """ Delete a candidate by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        candidate = storage.get('Candidate', candidate_id)
        storage.delete(candidate)
        storage.save()
        return jsonify({}), 200
    abort(404, 'Candidate not found')


@ovs_elect.route('/admin/<admin_id>/election/<election_id>/candidate/<candidate_id>',
                 methods=['PUT'], strict_slashes=False)
def update_candidate_by_admin(admin_id, election_id, candidate_id):
    """ Update a candidate by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        candidate = storage.get('Candidate', candidate_id)
        data = request.get_json()
        if not data:
            abort(400, 'Not a JSON')
        try:
            candidate.update(**data)
        except ValueError as e:
            abort(400, str(e))
        return jsonify(candidate.to_dict()), 200
    abort(404, 'Candidate not found')


@ovs_elect.route('/admin/<admin_id>/election/<election_id>/candidate',
                 methods=['DELETE'], strict_slashes=False)
def delete_candidates_by_election(admin_id, election_id):
    """ Delete all candidates by election
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        for candidate in election.candidates:
            storage.delete(candidate)
        storage.save()
        return jsonify({}), 200
    abort(404, 'Election not found')


@ovs_elect.route('/admin/<admin_id>/election', methods=['DELETE'],
                 strict_slashes=False)
def delete_elections_by_admin(admin_id):
    """ Delete all elections by admin
    """
    admin = storage.get('Admin', admin_id)
    for election in admin.elections:
        storage.delete(election)
    storage.save()
    return jsonify({}), 200


@ovs_elect.route('/admin/<admin_id>/election/<election_id>/end',
                 methods=['PUT'], strict_slashes=False)
def end_election(admin_id, election_id):
    """ End an election
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        election.end_election()
        return jsonify(election.to_dict()), 200
    abort(404, 'Election not found')
