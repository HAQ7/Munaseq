

# Munaseq API Endpoints Documentation

## 📖 Table of Contents

- 🔐 Authentication Module
    - 🚀 POST /auth/signup
    - 🔑 POST /auth/signin
- 📅 Event Module
    - 📋 GET /events
    - 📝 POST /events
    - 🔍 GET /events/
    - 🛠️ PATCH /events/
    - 🗑️ DELETE /events/
    - 📋 GET /events/current
- 👤 User Module
    - 👤 GET /user/me
    - 👥 GET /users
    - 🔍 GET /user/
    - 📧 GET /user/email/
    - 🧑‍💻 GET /user/username/
    - 🛠️ PATCH /user
    - 🔒 POST /user/changePassword
    - 🗑️ DELETE /user

> Base URL: ${process.env.BACKEND_URL}
> 

### 🔐 Authentication Module

### POST /auth/signup 🚀

- **Description**: Registers a new user in the system and returns an authentication token..
- **Request Body**:
    - `firstName` (string, required): The user's first name.
    - `lastName` (string, required): The user's last name.
    - `username` (string, required): The desired username (must be unique).
    - `email` (string, required): The user's email address (must be unique).
    - `password` (string, required): The user's password.
    - `gender`  (enum, required)
    - `visibleName` (string, optional)
    - `categories` (string [ ], required)
    - `description` (string, optional)
    - `profilePicture` (file, optional)
    - `socialAccounts` (json object, optional)
    - `cv` (file, optional)
- **Authorization**: Not required.
- **Responses**:
    - `201 Created` 🎉: User successfully registered.
        - **Body**:
            
            ```json
            {
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYzVkOWQxOC05NzU2LTQyYjAtYjJiMS04Y2UyNDQ4NDY5Y2EiLCJpYXQiOjE3Mjg5NjgxNzEsImV4cCI6MTcyOTU3Mjk3MX0.qH_hPdgPNjpk5RKCW9Dc1k0tvldruErMhJh7IxwRAsg",
            
            "id": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca",
            "email": "hisham@gmail.com",
            "firstName": "Hisham",
            "lastName": "Alsuhaibani",
            "username": "krcherheadx",
            "gender": "MALE",
            "visibleName": "Krcher",
            "description": "SWE student",
            "categories": [
                  "الدراسات الاسلامية",
                  "البرمجة",
                  "التكنولوجيا"
                ],
            "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
            "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
            "socialAccounts": {
                  "twitter": "https://x.com/KSU_HSS",
                  "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
                }
              }
            }
            
            ```
            
    
    Errors: 
    
    - `400 Bad Request` ❌: Validation error (e.g., missing fields).
    - `409 Conflict`  ❌: Conflict error  (e.g., existing user has one of the unique fields).

### POST /auth/signin 🔑

- **Description**: Logs in a user and returns an authentication token.
- **Authorization**: Not required.
- **Request Body**:
    - `username` or `email` (string, required): The user's username or email address.
    - `password` (string, required): The user's password.
- **Responses**:
    - `200 OK` ✅: User successfully authenticated.
        - **Body**:
            
            ```json
            {
              "accessToken": "<token>",
              "expiresIn": 3600
            }
            
            ```
            
    - `401 Unauthorized` ❌: Invalid credentials.
        - **Body**:
            
            ```json
            {
              "error": "Invalid email or password"
            }
            
            ```
            

### 📅 Event Module

### GET /event/   📋

- **Description**: Retrieves a list of all events.
- **Authorization**: not required.
- **Responses**:
    - `200 OK` ✅: List of events.
        - **Body**:
            
            ```json
            [
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "The best course in the university!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 0,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.927Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            ]
            ```
            

### POST /event/ 📝

- **Description**: Creates a new event.
- **Request Body**:
    - `title` (string, required): The title of the event .
    - `description` (string, optional): A detailed description of the event .
    - `categories` (string [ ], required): Event categories.
    - `date` (string, required): The event date in ISO format.
    - `location` (string, optional): The location of the event.
    - `capacity` (integer, optional): The maximum number of attendees.
    - `isPublic` (boolean, required)
    - `isOnline`  (boolean, required)
    - `gender` (enum, required)
    - `startDateTime` (string, required)
    - `endDateTime` (string, required)
    - `image`(file, required)
    - `price` (integer, optional)
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `201 Created` 🎉: Event successfully created.
        - **Body**:
            
            ```json
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "The best course in the university!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 0,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.927Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            ```
            
    - `400 Bad Request` ❌: Missing required fields or validation errors.
        - **Body**:
            
            ```json
            {
              "error": "Validation failed"
            }
            
            ```
            

### GET /event/:id 🔍

- **Description**: Retrieves details for a specific event by ID.
- **URL Parameters**:
    - `id` (string, required): The ID of the event.
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: Event details.
        - **Body**:
            
            ```json
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "The best course in the university!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 0,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.927Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            
            ```
            
    - `404 Not Found` ❌: Event not found.
        - **Body**:
            
            ```json
            {
              "error": "Event not found"
            }
            
            ```
            

### PATCH /event/:id

- **Description**: Updates the details of a specific event.
- **URL Parameters**:
    - `id` (string, required): The ID of the event.
- **Request Body**:
    - Any field that is updatable (e.g., `title`, `description`, `date`, etc.).
        - **Body:**
        
        ```json
        {
                "price": 100,
                "description": "Needs a great team 
                like Munaseq Team !",
        }
        ```
        
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: Event successfully updated.
        - **Body**:
            
            ```json
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "Needs a great team like Munaseq Team!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 100,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.938Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            ```
            
    - `400 Bad Request` ❌: Validation error.
        - **Body**:
            
            ```json
            {
              "error": "Invalid data"
            }
            
            ```
            
    - `404 Not Found` ❌: Event not found.
        - **Body**:
            
            ```json
            {
              "error": "Event not found"
            }
            
            ```
            

### DELETE /event/:eventId 🗑️

- **Description**: Deletes an event by ID.
- **URL Parameters**:
    - `eventId` (string, required): The ID of the event to delete.
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: Event successfully deleted.
        - **Body**:
            
            ```json
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "Needs a great team like Munaseq Team!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 100,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.938Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            
            ```
            
    - `404 Not Found` ❌: Event not found.
        - **Body**:
            
            ```json
            {
              "error": "Event not found"
            }
            
            ```
            

### GET /event/current

- **Description**: Retrieves events created by the currently authenticated user.
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: List of current user events.
        - **Body**:
            
            ```json
            [
            {
              "id": "dd0e7c77-65b5-4eb3-953d-1037dbbd5058",
              "title": "SWE444 Course",
              "description": "Needs a great team like Munaseq Team!",
              "categories": [
                "برمجة",
                "تكنولوجيا"
              ],
              "location": "Riyadh",
              "seatCapacity": 100,
              "isPublic": true,
              "isOnline": true,
              "gender": "BOTH",
              "startDateTime": "2024-10-15T04:56:11.621Z",
              "endDateTime": "2024-10-15T04:56:11.621Z",
              "imageUrl": null,
              "price": 100,
              "createdAt": "2024-10-15T04:56:11.927Z",
              "updatedAt": "2024-10-15T04:56:11.938Z",
              "eventCreatorId": "ac5d9d18-9756-42b0-b2b1-8ce2448469ca"
            }
            ]
            ```
            

### 👤 User Module

### GET /user/me

- **Description**: Retrieves the profile information of the currently authenticated user.
- **Authorization**: Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: User profile information.
        - **Body**:
            
            ```json
            {
              "id": "80283e4a-01c8-4c99-8281-0d03670434d7",
              "firstName": "Hisham",
              "lastName": "Alsuhaibani",
              "username": "krcherheadx",
              "email": "hisham@gmail.com",
              "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
              "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
              "visibleName": "Krcher",
              "gender": "MALE",
              "socialAccounts": {
                "twitter": "https://x.com/KSU_HSS",
                "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
              },
              "categories": [
                "الدراسات الاسلامية",
                "البرمجة",
                "التكنولوجيا"
              ],
              "description": "SWE student",
              "createdAt": "2024-10-15T04:24:46.737Z",
              "updatedAt": "2024-10-15T04:24:46.737Z"
            }
            
            ```
            

### GET /user/

- **Description**: Retrieves a list of all users.
- **Authorization**: not required.
- **Responses**:
    - `200 OK` ✅: List of users.
        - **Body**:
            
            ```json
            [
            {
              "id": "80283e4a-01c8-4c99-8281-0d03670434d7",
              "firstName": "Hisham",
              "lastName": "Alsuhaibani",
              "username": "krcherheadx",
              "email": "hisham@gmail.com",
              "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
              "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
              "visibleName": "Krcher",
              "gender": "MALE",
              "socialAccounts": {
                "twitter": "https://x.com/KSU_HSS",
                "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
              },
              "categories": [
                "الدراسات الاسلامية",
                "البرمجة",
                "التكنولوجيا"
              ],
              "description": "SWE student",
              "createdAt": "2024-10-15T04:24:46.737Z",
              "updatedAt": "2024-10-15T04:24:46.737Z"
            }
            ]
            ```
            

### GET /user/:id 🔍

- **Description**: Retrieves user information by user ID.
- **URL Parameters**:
    - `id` (string, required): The ID of the user.
- **Authorization**: not required.
- **Responses**:
    - `200 OK` ✅: User information.
        - **Body**:
            
            ```json
            {
              "id": "80283e4a-01c8-4c99-8281-0d03670434d7",
              "firstName": "Hisham",
              "lastName": "Alsuhaibani",
              "username": "krcherheadx",
              "email": "hisham@gmail.com",
              "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
              "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
              "visibleName": "Krcher",
              "gender": "MALE",
              "socialAccounts": {
                "twitter": "https://x.com/KSU_HSS",
                "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
              },
              "categories": [
                "الدراسات الاسلامية",
                "البرمجة",
                "التكنولوجيا"
              ],
              "description": "SWE student",
              "createdAt": "2024-10-15T04:24:46.737Z",
              "updatedAt": "2024-10-15T04:24:46.737Z"
            }
            ```
            
    - `404 Not Found` ❌: User not found.
        - **Body**:
            
            ```json
            {
              "error": "User not found"
            }
            
            ```
            

### GET /user/email/:email 📧

- **Description**: Retrieves user information by email.
- **URL Parameters**:
    - `email` (string, required): The email address of the user.
- **Authorization**: not required.
- **Responses**:
    - `200 OK` ✅: User information.
        - **Body**:
            
            ```json
            {
              "id": "80283e4a-01c8-4c99-8281-0d03670434d7",
              "firstName": "Hisham",
              "lastName": "Alsuhaibani",
              "username": "krcherheadx",
              "email": "hisham@gmail.com",
              "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
              "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
              "visibleName": "Krcher",
              "gender": "MALE",
              "socialAccounts": {
                "twitter": "https://x.com/KSU_HSS",
                "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
              },
              "categories": [
                "الدراسات الاسلامية",
                "البرمجة",
                "التكنولوجيا"
              ],
              "description": "SWE student",
              "createdAt": "2024-10-15T04:24:46.737Z",
              "updatedAt": "2024-10-15T04:24:46.737Z"
            }
            ```
            
    - `404 Not Found` ❌: User not found.
    
    ### GET /user/username/:username  📇
    
    - **Description**: Retrieves user information by username.
    - **URL Parameters**:
        - `username` (string, required): The username of the user.
    - **Authorization**: not required.
    - **Responses**:
        - `200 OK` ✅: User information.
            - **Body**:
                
                ```json
                {
                  "id": "80283e4a-01c8-4c99-8281-0d03670434d7",
                  "firstName": "Hisham",
                  "lastName": "Alsuhaibani",
                  "username": "krcherheadx",
                  "email": "hisham@gmail.com",
                  "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728968171728.png",
                  "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728968171730.pdf",
                  "visibleName": "Krcher",
                  "gender": "MALE",
                  "socialAccounts": {
                    "twitter": "https://x.com/KSU_HSS",
                    "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
                  },
                  "categories": [
                    "الدراسات الاسلامية",
                    "البرمجة",
                    "التكنولوجيا"
                  ],
                  "description": "SWE student",
                  "createdAt": "2024-10-15T04:24:46.737Z",
                  "updatedAt": "2024-10-15T04:24:46.737Z"
                }
                ```
                
        - `404 Not Found` ❌: User not found.
        
        ### PATCH /user/
        
        - **Description**: Retrieves user information by email.
        - **Authorization**:  Required (`Authorization: Bearer <token>`).
        - **Request Body:**
            - Any field that is updatable (e.g., `firstName`, `lastName`, `username`, etc.).
                - Body:
                
                ```json
                {
                "firstName": "Mohammed",
                "lastName": "AlOsaimi",
                "username": "bestDevelopers"
                }
                ```
                
        - **Responses**:
            - `200 OK` ✅: User information.
                - **Body**:
                    
                    ```json
                    {
                      "id": "d60431a1-d9f2-47fe-b3c2-5047608d0e64",
                      "firstName": "Mohammed",
                      "lastName": "AlOsaimi",
                      "username": "bestDevelopers",
                      "email": "hisham@gmail.com",
                      "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728967909364.png",
                      "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728967909366.pdf",
                      "visibleName": "Krcher",
                      "gender": "MALE",
                      "socialAccounts": {
                        "twitter": "https://x.com/KSU_HSS",
                        "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
                      },
                      "categories": [
                        "الدراسات الاسلامية",
                        "البرمجة",
                        "التكنولوجيا"
                      ],
                      "description": "SWE student",
                      "createdAt": "2024-10-15T04:51:49.413Z",
                      "updatedAt": "2024-10-15T04:51:49.594Z"
                    }
                    ```
                    
            - `404 Not Found` ❌: User not found.
            
            ### POST /user/changedPassword
            
            - **Description**: Updates the current user password.
            - **Authorization**:  Required (`Authorization: Bearer <token>`).
            - **Request Body:**
                - Any field that is updatable (e.g., `firstName`, `lastName`, `username`, etc.).
                    - Body:
                    
                    ```json
                    {
                    "firstName": "Mohammed",
                    "lastName": "AlOsaimi",
                    "username": "bestDevelopers"
                    }
                    ```
                    
            - **Responses**:
                - `200 OK` ✅: User information.
                    - **Body**:
                        
                        ```json
                        {
                          "message":"Updated successfully"
                        }
                        ```
                        
                - `404 Not Found` ❌: User not found.

### DELETE /user/

- **Description**: Updates the current user password.
- **Authorization**:  Required (`Authorization: Bearer <token>`).
- **Responses**:
    - `200 OK` ✅: User information.
        - **Body**:
            
            ```json
            {
              "id": "d60431a1-d9f2-47fe-b3c2-5047608d0e64",
              "firstName": "Mohammed",
              "lastName": "AlOsaimi",
              "username": "bestDevelopers",
              "email": "hisham@gmail.com",
              "profilePictureUrl": "${process.env.BACKEND_URL}/images/munaseq-logo-1728967909364.png",
              "cvUrl": "${process.env.BACKEND_URL}/pdfs/infection_4-1728967909366.pdf",
              "visibleName": "Krcher",
              "gender": "MALE",
              "socialAccounts": {
                "twitter": "https://x.com/KSU_HSS",
                "linkedin": "https://www.linkedin.com/in/hisham-alsuhaibani-649a8a238/"
              },
              "categories": [
                "الدراسات الاسلامية",
                "البرمجة",
                "التكنولوجيا"
              ],
              "description": "SWE student",
              "createdAt": "2024-10-15T04:51:49.413Z",
              "updatedAt": "2024-10-15T04:51:49.594Z"
            }
            ```
            
    - `404 Not Found` ❌: User not found.
