#!/usr/bin/python3
import requests
import json

import models
from models.admin import Admin
from models.candidates import Candidates
from models.election import Election


def test_admin_sign_up():
    url = "http://0.0.0.0:5000/api/v1/sign_up"
    data = {
        "first_name": "Feranmi",
        "last_name": "Awotubo",
        "email": "ibukun12345678910@gmail.com",
        "password": "my_password"
    }
    response = requests.post(url, data=json.dumps(data))
    print(response.json())

def test_admin_sign_in():
    url = "http://0.0.0.0:5000/api/v1/sign_in"
    data = {
        "email": "ibukun12345678910@gmail.com",
        "password": "my_password"
    }
    response = requests.post(url, data=json.dumps(data))
    return response.json().get("id")

def test_create_election():
    url = "http://0.0.0.0:5000/api/v1/create_election"
    data = {
        "admin_id": test_admin_sign_in(),
        "election": {
                        "title": "Election API Test3",
                        "start_date": "2024-02-12 01:56:00",
                        "end_date": "2024-02-16 13:48:48",
                        "description": "This is a test election"
                    }
    }
    response = requests.post(url, data=json.dumps(data))
    print(response.json())
