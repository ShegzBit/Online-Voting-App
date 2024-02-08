#!/usr/bin/python3
"""
This module contains the Flask app
"""
from flask import Flask, request, jsonify, Blueprint
from models import storage
from api.v1.views import ovs_elect
import os

host = os.getenv('OVS_MYSQL_HOST', '0.0.0.0')
# OVS_MYSQL_HOST=localhost OVS_MYSQL_USER=ovs_test OVS_MYSQL_PWD=ovs_test_pwd OVS_MYSQL_DB=ovs_test_db OVS_ENV=test python3 -m api.v1.app


app = Flask(__name__)
app.register_blueprint(ovs_elect)

@app.teardown_appcontext
def close_storage(exception):
    """ Close the storage
    """
    storage.close()


if __name__ == "__main__":
    app.run(host=host, port=5000, threaded=True)