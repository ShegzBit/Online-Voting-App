#!/usr/bin/python3
"""
This module contains the api handler for the election
"""

from flask import jsonify, request, abort, redirect
from models import storage
from models.election import Election
from models.candidate import Candidate
from api.v1.views import ovs_elect


@ovs_elect.route('/home', methods=['GET'], strict_slashes=False)
def home():
    """ Redirects to the landing page
    """
    return redirect('https://pollmaster.webflow.io/')

@ovs_elect.route('/create-election', methods=['POST'], strict_slashes=False)
def create_election():
    """ Create a new election
    """
    data = request.get_json()
    # handle for errors
    if not data:
        abort(400, 'Not a JSON')
    if not 'candidates' in data:
        abort(400, jsonify({'error': 'Missing candidate'}))
    if not 'election' in data:
        abort(400, jsonify({'error': 'Missing election'}))
    if not 'title' in data['election']:
        abort(400, jsonify({'error': 'Missing title'}))
    if not 'start_date' in data['election']:
        abort(400, jsonify({'error': 'Missing start_date'}))
    if not 'end_date' in data['election']:
        abort(400, jsonify({'error': 'Missing end_date'}))
    if not 'admin_id' in data:
        abort(400, jsonify({'error': 'Missing admin_id'}))
    
    # create the election
    admin_id = data['admin_id']
    candidates = data['candidates']
    election = data['election']
    voters_id = set(data.get('voters_id', []))
    admin = storage.get('Admin', admin_id)
    if not admin:
        abort(400, jsonify({'error': 'Admin not found'}))
    try:
        new_election = admin.new_election(**election, voters_id=voters_id)
        new_election.update_state(candidates=candidates)
    except ValueError as e:
        print(e)
        print(data)
        return(400, jsonify({'error': str(e)}))
    finally:
        # storage.save()
        new_election.save()
    resp_dict = {'status': 'successful', 'election': new_election.to_dict()}
    return jsonify(resp_dict), 201