# Word Search and History App

This is a web application that allows users to search for words and get their definitions and examples. It also stores the search history.

## Features

- **Search for Words**: Search for word definitions and examples.
- **Search History**:  Can see their search history.

## Tech Stack

- **Front-end**: React, TypeScript
- **Back-end**: Django, Django REST Framework
- **Database**: PostgreSQL

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Python and pip installed
- PostgreSQL installed and running

### Front-end Setup

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Back-end Setup

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate
   # On Windows use `env\Scripts\activate`
   ```
3. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:

   - Create a database in PostgreSQL (e.g., word_search_db).
   - Update the DATABASES setting in backend/settings.py with your database credentials:

   ```sh
       DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'word_search_db',
           'USER': 'your_db_user',
           'PASSWORD': 'your_db_password',
           'HOST': 'localhost',
           'PORT': '5432',
           }
       }
   ```

5. Apply migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the development server:
   ```sh
   python manage.py runserver
   ```

# API Endpoints

## POST /words/

### Description

Returns meaning of word and adds entry into db

### Example Request
    curl -X POST http://localhost:8000/api/words/ \
    -H "Content-Type: application/json" \
    -d '{
        "word": "example",
        }'
    

### Example Response

        {
            "id": 1,
            "word": "example",
            "definition_data": {
                "definition": "a representative form or pattern",
                "examples": ["an example of good behavior"]
            }
        }

### GET /search-history/
## Description
Get's previous search history
### Example Request
    curl -X GET http://localhost:8000/api/search-history/

### Example Response
    [
    {
        "id": 3,
        "word": {
            "id": 2,
            "word": "level",
            "definition_data": {
                "noun": {
                    "definition": "A tool for finding whether a surface is level, or for creating a horizontal or vertical line of reference.",
                    "example": "Hand me the level so I can tell if this is correctly installed."
                },
                "verb": {
                    "definition": "To adjust so as to make as flat or perpendicular to the ground as possible.",
                    "example": "You can level the table by turning the pads that screw into the feet."
                },
                "adjective": {
                    "definition": "The same height at all places; parallel to a flat ground.",
                    "example": "This table isn't quite level; see how this marble rolls off it?"
                }
            }
        },
        "search_timestamp": "2024-06-21T14:21:56.067566Z"
    },
    {
        "id": 4,
        "word": {
            "id": 3,
            "word": "history",
            "definition_data": {
                "noun": {
                    "definition": "The aggregate of past events.",
                    "example": "History repeats itself if we don’t learn from its mistakes."
                },
                "verb": {
                    "definition": "To narrate or record."
                }
            }
        },
        "search_timestamp": "2024-06-21T14:26:44.503583Z"
    }
]
### DELETE /search-history/int:pk/

## Description

Delete a search history entry.

### Example Request

```sh
curl -X DELETE http://localhost:8000/api/search-history/1/
```

### Example Response

```sh
{
    "message": "History entry deleted"
}
```
