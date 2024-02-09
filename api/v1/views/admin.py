#!/usr/bin/python3
"""
Handles election admin related calls
"""
from api.v1.views import ovs_elect
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
        abort(400, jsonify({'status': 'failed', 'error': 'Missing email'}))
    # Query the database to check if the email already exists
    if Admin.get_by_attr('email', data['email']):
        abort(400, jsonify({'status': 'failed', 'error': 'Email already exists'}))
    if not 'password' in data:
        abort(400, jsonify({'status': 'failed', 'error': 'Missing password'}))
    try:
        admin = Admin(**data)
        admin.save()
    except ValueError as e:
        abort(400, jsonify({'error': str(e)}))
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
        abort(400, jsonify({'status': 'failed','error': 'Missing email'}))
    if not 'password' in data:
        abort(400, jsonify({'status': 'failed', 'error': 'Missing password'}))
    admin = Admin.get_by_attr('email', data['email'])
    if not admin:
        abort(401, jsonify({'status': 'failed', 'error': 'Invalid email'}))
    if not admin.is_valid_password(data['password']):
        abort(401, jsonify({'error': 'Invalid password'}))
    resp_dict = {'status': 'successful', 'user': admin.to_dict()}
    return jsonify(resp_dict), 201

@ovs_elect.route('/user/update', methods=['PUT'], strict_slashes=False)
def update_user():
    """ Update user details
    """
    data = request.get_json()
    if not data:
        abort(400, 'Not a JSON')
    if not 'email' in data:
        abort(400, jsonify({'status': 'failed', 'error': 'Missing email'}))
    if not 'password' in data:
        abort(400, jsonify({'status': 'failed', 'error': 'Missing password'}))
    admin = Admin.get_by_attr('email', data['email'])
    if not admin:
        abort(401, jsonify({'status': 'failed', 'error': 'Invalid email'}))
    if not admin.is_valid_password(data['password']):
        abort(401, jsonify({'error': 'Invalid password'}))
    try:
        admin.update_state(**data)
    except ValueError as e:
        abort(400, jsonify({'status': 'failed', 'error': str(e)}))
    resp_dict = {'status': 'successful', 'user': admin.to_dict()}
    return jsonify(resp_dict), 201
