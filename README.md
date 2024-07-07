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


# API Documentation

This document provides an overview of the RESTful API endpoints, request/response formats, and security schemes implemented in this project.

## OpenAPI Specification

This project follows the OpenAPI 3.0.3 specification.

## Endpoints

### 1. `/api/login/`

#### POST `/api/login/`

Authenticate a user.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `UserLogin` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `UserLogin` schema in JSON format.

### 2. `/api/register/`

#### POST `/api/register/`

Register a new user.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `UserCreation` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `UserCreation` schema in JSON format.

### 3. `/api/request-password-reset/`

#### POST `/api/request-password-reset/`

Request a password reset.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `RequestPasswordReset` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `RequestPasswordReset` schema in JSON format.

### 4. `/api/search-history/`

#### GET `/api/search-history/`

Retrieve search history.

- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns array of `SearchHistory` schema in JSON format.

### 5. `/api/search-history/{id}/`

#### DELETE `/api/search-history/{id}/`

Delete a search history entry.

- **Path Parameter**: `id` (integer) - ID of the search history entry to delete.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: No response body (204 status).

### 6. `/api/verify-password-reset/`

#### POST `/api/verify-password-reset/`

Verify and reset password.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `VerifyPasswordReset` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `VerifyPasswordReset` schema in JSON format.

### 7. `/api/verify-registration-otp/`

#### POST `/api/verify-registration-otp/`

Verify registration OTP.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `VerifyRegistration` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `VerifyRegistration` schema in JSON format.

### 8. `/api/words/`

#### POST `/api/words/`

Create a new word entry.

- **Request Body**: Accepts JSON, x-www-form-urlencoded, or multipart/form-data with fields defined in `Word` schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns `Word` schema in JSON format.

### 9. `/api_schema/`

#### GET `/api_schema/`

Retrieve OpenAPI schema.

- **Query Parameters**: 
  - `format` (string): Format of the schema (json or yaml).
  - `lang` (string): Language code for the schema.
- **Security**: Requires either `cookieAuth` or `tokenAuth`.
- **Response**: Returns OpenAPI schema in specified format.

## Schemas

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
