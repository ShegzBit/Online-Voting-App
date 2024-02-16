from api.v1.views import ovs_elect
from flask import jsonify


@ovs_elect.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Returns the status of the API
    """
    return jsonify({"status": "OK"}), 200
