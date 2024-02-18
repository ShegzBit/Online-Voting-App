from api.v1.views import ovs_candidate_image
from flask import request, jsonify, send_file, abort
from models.candidate import Candidate
from models import storage
import os


IMAGE_FOLDER = 'candidate_images/'

@ovs_candidate_image.route('/<candidate_id>', methods=['GET'], strict_slashes=False)
def get_candidate_image(candidate_id):
    """
    This function retrieves the image of a candidate
    """
    id = candidate_id
    candidate = storage.get('Candidate', id)
    if candidate:
        candidate_image = IMAGE_FOLDER + candidate.profile_image
        return send_file(candidate_image, mimetype='image/jpg')
    else:
        abort(404)

@ovs_candidate_image.route('/<candidate_id>', methods=['DELETE'], strict_slashes=False)
def delete_candidate_image(candidate_id):
    """
    This function deletes the image of a candidate
    """
    id = candidate_id
    candidate = storage.get('Candidate', id)
    if candidate:
        candidate_image = IMAGE_FOLDER + candidate_image
        os.remove(candidate_image)
        return jsonify({}), 200
    else:
        abort(404)

@ovs_candidate_image.route('/<candidate_id>', methods=['POST'], strict_slashes=False)
def post_image(candidate_id):
    """
    This function uploads the image of a candidate
    """
    id = candidate_id
    candidate = storage.get('Candidate', id)
    if candidate:
        candidate_image = IMAGE_FOLDER + f'Cnd.{id}.jpg'
        candidate.profile_image = candidate_image
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file:
            file.save(candidate_image)
            return jsonify({}), 201
    else:
        abort(404, 'Candidate not found')


@ovs_candidate_image.route('/<candidate_id>', methods=['PUT'], strict_slashes=False)
def replace_image(candidate_id):
    """
    This function replaces the image of a candidate
    """
    id = candidate_id
    candidate = storage.get('Candidate', id)
    if candidate:
        candidate_image = IMAGE_FOLDER + f'Cnd.{id}.jpg'
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file:
            if os.path.exists(candidate_image):
                os.remove(candidate_image)
            file.save(candidate_image)
            return jsonify({}), 200
    else:
        abort(404, 'Candidate not found')