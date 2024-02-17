#!/usr/bin/python3
"""
test admin for the app
"""

from models import storage
from models.admin import Admin


admin = Admin(first_name='John', last_name='Doe', email='me@you.us', password='1234')

print(admin.to_dict())