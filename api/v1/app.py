#!/usr/bin/python3
"""
This module contains the Flask app
"""
import os
from flask import Flask, jsonify
from flask_cors import CORS
from api.v1.views import ovs_elect
from models import storage


# OVS_API_HOST=0.0.0.0 OVS_MYSQL_HOST=localhost OVS_MYSQL_USER=ovs_test
# OVS_MYSQL_PWD=ovs_test_pwd OVS_MYSQL_DB=ovs_test_db OVS_ENV=test
# python3 -m api.v1.app

app = Flask(__name__)
app.register_blueprint(ovs_elect)

# Set JSONIFY_PRETTYPRINT_REGULAR to True
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def close_storage(exception):
    """ Close the storage
    """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ Handle 404 errors
    """
    return jsonify({"error": str(error.description)}), 404


@app.errorhandler(400)
def bad_request(error):
    """ Handle 400 errors
    """
    return jsonify({"error": "Bad request",
                    "message": str(error.description)}), 400

@app.route('/api/v1/routes', methods=['GET'], strict_slashes=False)
def routes():
    """Returns all the available routes in the API with their respective docstrings"""
    routes = {}
    for route in app.url_map.iter_rules():
        view_func = app.view_functions[route.endpoint]
        docstring = view_func.__doc__
        routes[route.rule] = docstring
    return jsonify(routes), 200


if __name__ == "__main__":
    host = os.getenv('OVS_API_HOST', '0.0.0.0')
    port = os.getenv('OVS_API_PORT', 5000)
    app.run(host=host, port=port)
