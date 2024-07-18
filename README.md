# Word Search and History App

This is a web application that allows users to search for words and get their definitions and examples. It also stores the search history.

## Features

- **Search for Words**: Search for word definitions and examples.
- **Search History**:  Can see their search history.

## Tech Stack

- **Front-end**: React, TypeScript
- **Back-end**: Django, Django REST Framework
- **Database**: PostgreSQL

## Setup Instructions using Docker


## Prerequisites

Ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Local Setup

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

Clone the repository to your local machine:

```sh
git clone https://github.com/mokshanirugutti/dictionary_book.git
cd dictionary_book
```

> [!IMPORTANT]
> Make these changes for backend in **setting.py** during development
> 
> Change `DEBUG = True`
> 
> comment out
> 
> ```
> 'OPTIONS': {
>            'sslmode': 'require',
>       },
> ```
>  at DATABASES .


### 2. Build and Start the Services

Use Docker Compose to build and start the frontend, backend, and database services:

```sh
docker-compose up --build
```

This command will build the Docker images for the frontend and backend, start the services, and initialize the PostgreSQL database.

### 3. Verify Service Status

After the services are up and running, you can check their status and see where they are running by executing:

```sh
docker-compose ps
```

### 4. Access the Application

- **Frontend**: Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the React frontend.
- **Backend**: The Django backend is accessible via [http://localhost:8000](http://localhost:8000). This endpoint will be used by the frontend to interact with the backend service.

### 5. Stopping the Services

To stop the services, run:

```sh
docker-compose down
```

This command stops and removes the containers but leaves the volumes intact.

### 6. Running Backend Migrations

If you need to apply database migrations manually, you can execute:

```sh
docker-compose exec backend python manage.py migrate
```

This will apply any pending migrations to the PostgreSQL database.

### Troubleshooting

- **Backend Exits Immediately**: Ensure the `start.sh` script is correctly configured and executable. Check the logs with `docker-compose logs backend` for any errors.
- **Frontend Not Loading**: Ensure that the frontend service is correctly building and running. Check the logs with `docker-compose logs frontend` if needed.

## Development

To make changes to the code, edit the files in the `frontend` or `backend` directories. Docker Compose will automatically reflect these changes without needing to rebuild the images, thanks to the volume mounts specified in `docker-compose.yml`.



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


# API Documentation

This document provides an overview of the RESTful API endpoints, request/response formats, and security schemes implemented in this project.

## OpenAPI Specification

This project follows the OpenAPI 3.0.3 specification.

## Endpoints

Here is the revised documentation with direct schema navigation links for better clarity:

### 1. `/api/login/`

#### POST `/api/login/`

Authenticate a user.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`UserLogin`](#userlogin).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`UserLogin`](#userlogin) schema in JSON format.

### 2. `/api/register/`

#### POST `/api/register/`

Register a new user.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`UserCreation`](#usercreation).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`UserCreation`](#usercreation) schema in JSON format.

### 3. `/api/request-password-reset/`

#### POST `/api/request-password-reset/`

Request a password reset.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`RequestPasswordReset`](#requestpasswordreset).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`RequestPasswordReset`](#requestpasswordreset) schema in JSON format.

### 4. `/api/search-history/`

#### GET `/api/search-history/`

Retrieve search history.

- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns array of [`SearchHistory`](#searchhistory) schema in JSON format.

### 5. `/api/search-history/{id}/`

#### DELETE `/api/search-history/{id}/`

Delete a search history entry.

- **Path Parameter**: `id` (integer) - ID of the search history entry to delete.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: No response body (204 status).

### 6. `/api/verify-password-reset/`

#### POST `/api/verify-password-reset/`

Verify and reset password.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`VerifyPasswordReset`](#verifypasswordreset).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`VerifyPasswordReset`](#verifypasswordreset) schema in JSON format.

### 7. `/api/verify-registration-otp/`

#### POST `/api/verify-registration-otp/`

Verify registration OTP.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`VerifyRegistration`](#verifyregistration).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`VerifyRegistration`](#verifyregistration) schema in JSON format.

### 8. `/api/words/`

#### POST `/api/words/`

Create a new word entry.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in [`Word`](#word).
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns [`Word`](#word) schema in JSON format.

### 9. `/api_schema/`

#### GET `/api_schema/`

Retrieve OpenAPI schema.

- **Query Parameters**: 
  - `format` (string): Format of the schema (json or yaml).
  - `lang` (string): Language code for the schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns OpenAPI schema in specified format.

# Schemas

### UserLogin

- **Json Body**: 
  - `username` (string).
  - `password` (string).

### UserCreation

- **Json Body**: 
  - `username` (string).
  - `password` (string).
  - `email` (email).

### RequestPasswordReset

- **Json Body**: 
  - `email` (email).

### SearchHistory

- **Security**: Requires either `cookieAuth` or `tokenAuth`.

### VerifyPasswordReset

- **Json Body**: 
  - `email` (email).
  - `otp` (6 digit otp).
  - `new_password` (string).

### VerifyRegistration

- **Json Body**: 
  - `email` (email).
  - `otp` (6 digit otp).

### Word

- **Json Body**: 
  - `word` (string).
  - **Security**: Requires either `cookieAuth` or `tokenAuth`.
## Security Schemes

### cookieAuth

- **Type**: API Key
- **Location**: Cookie
- **Name**: sessionid

### tokenAuth

- **Type**: API Key
- **Location**: Header
- **Name**: Authorization
- **Description**: Token-based authentication with required prefix "Token"
