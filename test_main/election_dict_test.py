#!/usr/bin/python3
from models.election import Election


e = Election(title="Election 1", description="Election 1 description",
             start_date="2021-01-01 00:00:00", end_date="2021-01-02 00:00:00")

print(e.to_dict())
