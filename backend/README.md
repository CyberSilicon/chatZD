# ChatZD API Documentation

## Project Description

ChatZD is a real-time messaging application backend built with Node.js, Express, and MongoDB. It provides a comprehensive set of APIs for user authentication, profile management, contact handling, chat functionality, media management, and more. This documentation provides detailed information on how to use the ChatZD API.

## Base URL

The base URL for all API endpoints is: `http://localhost:5000/api/v1`

## Authentication

Most API endpoints require authentication via JWT (JSON Web Token). You need to include the JWT in the `Authorization` header of your requests as a Bearer token.

Example:
```
Authorization: Bearer <JWT_TOKEN>
```

### Obtaining a JWT

You can obtain a JWT by registering a new user or logging in with an existing account via the authentication endpoints.

## API Endpoints

### 1. Authentication Endpoints

#### 1.1 Register a new user

*   **Endpoint:** `/auth/register`
*   **Method:** `POST`
*   **Request Body:**

    ```json
    {
        "email": "string (required, unique, max length: 50)",
        "username": "string (optional, unique, max length: 32)",
        "password": "string (required)"
    }
    ```
*   **Response:**

    *   **Success (201):** Returns the newly created user object.

        ```json
        {
            "email": "test@example.com",
            "username": "testuser",
            "lastSeen": "2024-07-30T14:30:00.000Z",
            "isOnline": false,
            "createdAt": "2024-07-30T14:30:00.000Z",
            "id": "66a9d4a0e5d1a3b2c8f90a1b"
        }
        ```
    *   **Error (400):** Returns an error message if the user creation fails.

        ```json
        {
            "message": "Erreur lors de la création de l'utilisateur",
            "error": {}
        }
        ```

#### 1.2 Login

*   **Endpoint:** `/auth/login`
*   **Method:** `POST`
*   **Request Body:**

    ```json
    {
        "email": "string (required)",
        "password": "string (required)"
    }
    ```
*   **Response:**

    *   **Success (200):** Returns a JWT token and the user object.

        ```json
        {
            "token": "string (JWT)",
            "user": {
                "email": "test@example.com",
                "username": "testuser",
                "lastSeen": "2024-07-30T14:30:00.000Z",
                "isOnline": false,
                "createdAt": "2024-07-30T14:30:00.000Z",
                "id": "66a9d4a0e5d1a3b2c8f90a1b"
            }
        }
        ```
    *   **Error (400):** Returns an error message if the login fails.

        ```json
        {
            "message": "Email ou mot de passe incorrect."
        }
        ```
    *   **Error (500):** Returns an error message if a server error occurs.

        ```json
            {
                "message": "Internal Server Error"
            }
        ```

### 2. User Endpoints

#### 2.1 Get User by ID

*   **Endpoint:** `/user`
*   **Method:** `GET`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, User ID)"
    }
    ```
*   **Response:**

    *   **Success (200):** Returns the user object.

        ```json
        {
            "email": "test@example.com",
            "username": "testuser",
            "lastSeen": "2024-07-30T14:30:00.000Z",
            "isOnline": false,
            "createdAt": "2024-07-30T14:30:00.000Z",
            "id": "66a9d4a0e5d1a3b2c8f90a1b"
        }
        ```
    *   **Error (404):** Returns an error message if the user is not found.

        ```json
        {
            "message": "Utilisateur non trouvé"
        }
        ```
    *   **Error (500):** Returns an error message if a server error occurs.

        ```json
        {
            "message": "Erreur serveur",
            "error": {}
        }
        ```

#### 2.2 Update User by ID

*   **Endpoint:** `/user`
*   **Method:** `PUT`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, User ID)",
        "email": "string (optional, unique, max length: 50)",
        "username": "string (optional, unique, max length: 32)"
    }
    ```
*   **Response:**

    *   **Success (200):** Returns the updated user object.

        ```json
        {
            "email": "updated@example.com",
            "username": "updateduser",
            "lastSeen": "2024-07-30T14:30:00.000Z",
            "isOnline": false,
            "createdAt": "2024-07-30T14:30:00.000Z",
            "id": "66a9d4a0e5d1a3b2c8f90a1b"
        }
        ```
    *   **Error (404):** Returns an error message if the user is not found.

        ```json
        {
            "message": "Utilisateur non trouvé"
        }
        ```
    *   **Error (400):** Returns an error message if the update fails.

        ```json
        {
            "message": "Erreur lors de la mise à jour de l'utilisateur",
            "error": {}
        }
        ```

#### 2.3 Delete User by ID

*   **Endpoint:** `/user`
*   **Method:** `DELETE`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, User ID)"
    }
    ```
*   **Response:**

    *   **Success (200):** Returns a success message.

        ```json
        {
            "message": "Utilisateur supprimé avec succès"
        }
        ```
    *   **Error (404):** Returns an error message if the user is not found.

        ```json
        {
            "message": "Utilisateur non trouvé"
        }
        ```
    *   **Error (500):** Returns an error message if a server error occurs.

        ```json
        {
            "message": "Erreur serveur",
            "error": {}
        }
        ```

### 3. Profile Endpoints

#### 3.1 Get Profile by ID

*   **Endpoint:** `/profile`
*   **Method:** `GET`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, Profile ID)"
    }
    ```

*   **Response:**

    *   **Success (200):** Returns the profile object.

        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "bio": "A short bio",
            "userId": "66a9d4a0e5d1a3b2c8f90a1b",
            "avatarUrl": "https://example.com/avatar.jpg",
            "privacyLastSeen": "everyone",
            "privacyPhoto": "everyone",
            "_id": "66a9d4a0e5d1a3b2c8f90a1c"
        }
        ```
    *   **Error (404):** Returns an error message if the profile is not found.

        ```json
        {
            "message": "Profil non trouvé"
        }
        ```
    *   **Error (500):** Returns an error message if a server error occurs.

        ```json
        {
            "message": "Erreur serveur",
            "error": {}
        }
        ```

#### 3.2 Create Profile

*   **Endpoint:** `/profile`
*   **Method:** `POST`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "firstName": "string (required, max length: 64)",
        "lastName": "string (optional, max length: 64)",
        "bio": "string (optional, max length: 500)",
        "userId": "string (optional, User ID)",
        "avatarUrl": "string (optional, URL)",
        "privacyLastSeen": "string (optional, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone')",
        "privacyPhoto": "string (optional, enum: ['everyone', 'contacts', 'nobody'], default: 'everyone')"
    }
    ```

*   **Response:**

    *   **Success (201):** Returns the newly created profile object.

        ```json
        {
            "firstName": "John",
            "lastName": "Doe",
            "bio": "A short bio",
            "userId": "66a9d4a0e5d1a3b2c8f90a1b",
            "avatarUrl": "https://example.com/avatar.jpg",
            "privacyLastSeen": "everyone",
            "privacyPhoto": "everyone",
            "_id": "66a9d4a0e5d1a3b2c8f90a1c"
        }
        ```
    *   **Error (400):** Returns an error message if the profile creation fails.

        ```json
        {
            "message": "Erreur lors de la création du profil"
        }
        ```

#### 3.3 Update Profile by ID

*   **Endpoint:** `/profile`
*   **Method:** `PUT`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, Profile ID)",
        "firstName": "string (optional, max length: 64)",
        "lastName": "string (optional, max length: 64)",
        "bio": "string (optional, max length: 500)",
        "avatarUrl": "string (optional, URL)",
        "privacyLastSeen": "string (optional, enum: ['everyone', 'contacts', 'nobody'])",
        "privacyPhoto": "string (optional, enum: ['everyone', 'contacts', 'nobody'])"
    }
    ```

*   **Response:**

    *   **Success (200):** Returns the updated profile object.

        ```json
        {
            "firstName": "Updated John",
            "lastName": "Updated Doe",
            "bio": "An updated bio",
            "userId": "66a9d4a0e5d1a3b2c8f90a1b",
            "avatarUrl": "https://example.com/updated_avatar.jpg",
            "privacyLastSeen": "nobody",
            "privacyPhoto": "nobody",
            "_id": "66a9d4a0e5d1a3b2c8f90a1c"
        }
        ```
    *   **Error (404):** Returns an error message if the profile is not found.

        ```json
        {
            "message": "Profil non trouvé"
        }
        ```
    *   **Error (400):** Returns an error message if the update fails.

        ```json
        {
            "message": "Erreur lors de la mise à jour du profil",
            "error": {}
        }
        ```

#### 3.4 Delete Profile by ID

*   **Endpoint:** `/profile`
*   **Method:** `DELETE`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "id": "string (required, Profile ID)"
    }
    ```

*   **Response:**

    *   **Success (200):** Returns a success message.

        ```json
        {
            "message": "Profil supprimé avec succès"
        }
        ```
    *   **Error (404):** Returns an error message if the profile is not found.

        ```json
        {
            "message": "Profil non trouvé"
        }
        ```
    *   **Error (500):** Returns an error message if a server error occurs.

        ```json
        {
            "message": "Erreur serveur",
            "error": {}
        }
        ```

### 4. Chat Endpoints (Example - Not Fully Implemented)

_Note: Chat endpoints are not fully implemented in the provided code, but here's an example of how they would be documented._

#### 4.1 Create Chat

*   **Endpoint:** `/chat`
*   **Method:** `POST`
*   **Authentication:** Required
*   **Request Body:**

    ```json
    {
        "type": "string (required, enum: ['private', 'group', 'channel'])",
        "title": "string (optional, max length: 128)",
        "participants": "array of User IDs (required)",
        "admins": "array of User IDs (optional)"
    }
    ```

*   **Response:**

    *   **Success (201):** Returns the newly created chat object.
    *   **Error (400):** Returns an error message if the chat creation fails.

### 5. Media Endpoints (Example - Not Fully Implemented)

_Note: Media endpoints are not fully implemented in the provided code, but here's an example of how they would be documented._

#### 5.1 Upload Media

*   **Endpoint:** `/media`
*   **Method:** `POST`
*   **Authentication:** Required
*   **Request Body:** `multipart/form-data` with the media file.
*   **Response:**

    *   **Success (201):** Returns the newly uploaded media object.
    *   **Error (400):** Returns an error message if the media upload fails.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. Common error codes include:

*   **400 Bad Request:** The request was malformed or invalid.
*   **401 Unauthorized:** Authentication is required and has failed or has not yet been provided.
*   **403 Forbidden:** The server understood the request, but is refusing to fulfill it.
*   **404 Not Found:** The requested resource was not found.
*   **500 Internal Server Error:** An unexpected error occurred on the server.

## Contributing

Contributions to the ChatZD API are welcome! Please refer to the project's contribution guidelines for more information.
