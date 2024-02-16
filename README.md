# Online Voting System (PollMaster)

This is an online voting system built with Python, using Flask and SQLAlchemy.

## Features

- Create and manage elections
- Add candidates to elections
- Voters can vote for candidates in an election
- View election results

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/ShegzBit/Online-Voting-App.git
    cd Online-Voting-App
    ```

2. Install the requirements:
    ```
    pip3 install -r requirements.txt
    ```

3. Set up the database:
    ```
    cat setup_mysql_dev.sql | mysql -uroot -p
    ```

4. Run the application:
    ```
    python3 -m api.v1.app
    ```

5. Make request to the system api
    e.g
    ```bash
    curl -X POST -H 'Content-Type: application/json' -d '{
        "first_name": "Feranmi",
        "last_name": "Awotubo",
        "email": "ibukun12345678910@gmail.com",
        "password": "my_password"
    }' http://0.0.0.0:5000/api/v1/sign_up
    ```
    Sign up response
    ```json
    {
        "status": "successful"
        "user": {
            "__class__":"Admin",
            "created_at":"2024-02-08 10:00:32",
            "elections"{},
            "email":"ibukun12345678910@gmail.com",
            "first_name":"Feranmi",
            "id":"03939f31-1511-4c62-8af4-75cbd3389ad9",
            "last_name":"Awotubo",
            "username":"ibukun12345678910"
        }
    }
    ```

    ```bash
    curl -X POST -H 'Content-Type: application/json' -d '{
        "email": "ibukun12345678910@gmail.com",
        "password": "my_password"
    }' http://0.0.0.0:5000/api/v1/sign_in
    ```
    Response
    ```json
    {
        "status":"successful",
        "user":{
            "__class__":"Admin",
            "created_at":"2024-02-08 10:00:32",
            "elections"{},
            "email":"ibukun12345678910@gmail.com",
            "first_name":"Feranmi",
            "id":"03939f31-1511-4c62-8af4-75cbd3389ad9",
            "last_name":"Awotubo",
            "username":"ibukun12345678910"
        }
    }
    ```

    ```bash
    curl -X POST -H 'Content-Type: application/json' -d '{
        "admin_id": "03939f31-1511-4c62-8af4-75cbd3389ad9",
        "election": {
            "title": "Election API Test",
            "start_date": "2024-02-07 13:48:48",
            "end_date": "2024-02-07 13:48:48",
            "description": "This is a test election"
        },
        "candidates": [
            {
                "first_name": "John",
                "last_name": "Doe",
                "position": "President"
            },
            {
                "first_name": "Jane",
                "last_name": "Doe",
                "position": "President"
            },
            {
                "first_name": "Fawaz",
                "last_name": "Abdganiyu",
                "position": "Prime Minister"
            }
        ],
        "voters_id": ["voter1", "voter2", "voter2", "some other voters"]
    }' http://localhost:5000/api/v1/create_election
    ```
    Response
    ```json
    {
        "election": {
            "__class__": "Election",
            "candidates": [
            {
                "__class__": "Candidate",
                "created_at": "2024-02-08 21:32:07",
                "election_id": "2255d484-3a34-46a2-b203-ea759306ba52",
                "first_name": "John",
                "id": "0ef83aea-e0d2-4d1f-acbd-2cab01b75af9",
                "last_name": "Doe",
                "manifesto": "",
                "party": "",
                "position": "President",
                "votes": 0
            },
            {
                "__class__": "Candidate",
                "created_at": "2024-02-08 21:32:07",
                "election_id": "2255d484-3a34-46a2-b203-ea759306ba52",
                "first_name": "Jane",
                "id": "dabfbcf9-ea6e-4cda-b470-cb4272c63740",
                "last_name": "Doe",
                "manifesto": "",
                "party": "",
                "position": "President",
                "votes": 0
            },
            {
                "__class__": "Candidate",
                "created_at": "2024-02-08 21:32:07",
                "election_id": "2255d484-3a34-46a2-b203-ea759306ba52",
                "first_name": "Fawaz",
                "id": "33cf9cd7-689a-4996-9f1d-3eca46aef5fc",
                "last_name": "Abdganiyu",
                "manifesto": "",
                "party": "",
                "position": "Prime Minister",
                "votes": 0
            }
            ],
            "created_at": "2024-02-08 21:32:06",
            "description": "This is a test election",
            "end_date": "2024-02-07 13:48:48",
            "expected_voters": 0,
            "id": "2255d484-3a34-46a2-b203-ea759306ba52",
            "public_id": "6JEn-kWPw-XXrm",
            "results": {},
            "start_date": "2024-02-07 13:48:48",
            "status": "Upcoming",
            "title": "Election API Test",
            "total_votes": 0,
            "voters": []
        },
        "status": "successful"
    }
    ```

## Testing

To run the tests, use the following command:
```
python3 -m unittest discover tests
```

## Accessing the Application

The landing page can be found at [https://pollmaster.webflow.io/](https://pollmaster.webflow.io/).
The application is hosted at [http://pollmaster.me](http://pollmaster.me).
You can use them by navigating these URLs in your web browser.

## Contributing

## License

