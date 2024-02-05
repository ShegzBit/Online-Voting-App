#!/usr/bin/python3
"""
Module Package Manager
"""
from models.engine.db_storage import DBStorage


storage = DBStorage()

storage.reload()
