#!/usr/bin/python3
"""
Handles election admin related calls
"""
from api.v1.views import ovs_elect
from models import storage
from models.admin import Admin

from flask import jsonify, request, abort

@ovs_elect.route('/sign_up', methods=['POST'], strict_slashes=False)
def create_admin():
    """ Create a new admin
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if not 'email' in data:
        abort(400, 'Missing email')
    # Query the database to check if the email already exists
    if Admin.get_by_attr('email', data['email']):
        abort(400, 'Email already exists')
    if not 'password' in data:
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
    if not 'email' in data:
        abort(400, 'Missing email')
    if not 'password' in data:
        abort(400, 'Missing password')
    admin = Admin.get_by_attr('email', data['email'])
    if not admin:
        abort(401, 'Invalid email')
    if not admin.is_valid_password(data['password']):
        abort(401, 'Invalid password')
    resp_dict = {'status': 'successful', 'user': admin.to_dict()}
    return jsonify(resp_dict), 201

@ovs_elect.route('/admin/update', methods=['PUT'], strict_slashes=False)
def update_user():
    """ Update user details
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if not 'email' in data:
        abort(400, 'Missing email')
    if not 'password' in data:
        abort(400, 'Missing password')
    admin = Admin.get_by_attr('email', data['email'])
    if not admin:
        abort(401, 'Invalid email')
    if not admin.is_valid_password(data['password']):
        abort(401, 'Invalid password')
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

@ovs_elect.route('/admin/<admin_id>', methods=['DELETE'], strict_slashes=False)
def delete_admin(admin_id):
    """ Delete an admin
    """
    admin = storage.get('Admin', admin_id)
    storage.delete(admin)
    storage.save()
    return jsonify({}), 200

@ovs_elect.route('/admin', methods=['GET'], strict_slashes=False)
def get_admins():
    """ Get all admins
    """
    admins = storage.all('Admin')
    return jsonify([a.to_dict() for a in admins.values()]), 200

@ovs_elect.route('/admin/<admin_id>/election/', methods=['GET'], strict_slashes=False)
def get_elections_by_admin(admin_id):
    """ Get all elections by admin
    """
    admin = storage.get('Admin', admin_id)
    elections = [e.to_dict() for e in admin.elections]
    return jsonify(elections), 200

@ovs_elect.route('/admin/<admin_id>/election/<election_id>', methods=['GET'], strict_slashes=False)
def get_election_by_admin(admin_id, election_id):
    """ Get an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        return jsonify(election.to_dict()), 200
    abort(404, 'Election not found')

@ovs_elect.route('/admin/<admin_id>/election/<election_id>', methods=['DELETE'], strict_slashes=False)
def delete_election_by_admin(admin_id, election_id):
    """ Delete an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        storage.delete(election)
        storage.save()
        return jsonify({}), 200
    abort(404, 'Election not found')

@ovs_elect.route('/admin/<admin_id>/election/<election_id>', methods=['PUT'], strict_slashes=False)
def update_election_by_admin(admin_id, election_id):
    """ Update an election by admin
    """
    admin = storage.get('Admin', admin_id)
    election = storage.get('Election', election_id)
    if election in admin.elections:
        data = request.get_json()
        if not data:
            abort(400, 'Not a JSON')
        try:
            election.update_state(**data)
        except ValueError as e:
            abort(400, str(e))
        return jsonify(election.to_dict()), 200
    abort(404, 'Election not found')
