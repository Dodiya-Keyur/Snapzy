# Content Hub

```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />`{=html}
`<img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />`{=html}
`<img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript ES6" />`{=html}
`<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />`{=html}
`<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />`{=html}
`<img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap 5" />`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />`{=html}
`<img src="https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white" alt="Express.js" />`{=html}
`<img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />`{=html}
`<img src="https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white" alt="Git" />`{=html}
`<img src="https://img.shields.io/badge/GitHub-Code%20Hosting-181717?logo=github&logoColor=white" alt="GitHub" />`{=html}
```{=html}
</p>
```
> A modern social media web application built with React and Node.js
> that allows users to create, explore, and interact with posts through
> a clean and responsive interface.

## Features

-   User registration and login
-   Secure authentication and logout
-   Change password functionality
-   User profile management
-   Update profile information
-   Update and delete profile pictures
-   Create, view, update, and delete posts
-   View all users' posts
-   View posts created by a specific user
-   View a single post by ID
-   Responsive and user-friendly interface
-   RESTful backend APIs
-   MongoDB-based data persistence

## Technologies Used

### Frontend

  Technology        Purpose
  ----------------- ----------------------------------------
  React 19          Building the user interface
  Vite 7            Frontend development and build tooling
  JavaScript ES6+   Application logic
  HTML5             Page structure
  CSS3              Styling and responsive layouts
  Bootstrap 5       UI components and responsive design

### Backend

  Technology   Purpose
  ------------ ------------------------------------------
  Node.js      JavaScript runtime
  Express.js   REST API and server framework
  MongoDB      NoSQL database
  Mongoose     MongoDB object modeling
  JWT          Authentication/token-based authorization

### Development Tools

  Tool      Purpose
  --------- ---------------------------------------
  Git       Version control
  GitHub    Source-code hosting and collaboration
  VS Code   Development environment

## Functionalities

### Authentication

-   Register a new account
-   Login with user credentials
-   Logout from the application
-   Change account password
-   Protect authenticated API routes

### User Management

-   Get the current user's profile
-   Get a user by ID
-   Update profile information
-   Update profile picture
-   Delete profile picture
-   Delete user account

### Post Management

-   Create a new post
-   Get all posts
-   Get posts created by a specific user
-   Get a post by ID
-   Update an existing post
-   Delete a post

### Application Flow

``` text
User
 │
 ├── Register / Login
 │
 ├── Manage Profile
 │
 ├── Create Post
 │
 ├── Explore All Posts
 │
 ├── View User Posts
 │
 └── Manage Own Posts
       ├── Update
       └── Delete
```

## Project Structure

``` text
Content-Hub/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── README.md
└── .gitignore
```

## Getting Started

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd Content-Hub
```

### 2. Install frontend dependencies

``` bash
cd frontend
npm install
npm run dev
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd backend
npm install
npm run dev
```

### 4. Configure environment variables

Create a `.env` file in the backend directory and add the required
configuration, for example:

``` env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Keep your `.env` file private and never commit secrets to GitHub.

## API Modules

The backend is organized into separate API modules:

-   **Authentication APIs** --- register, login, logout, and change
    password
-   **User APIs** --- profile, user lookup, profile updates, profile
    picture management, and account deletion
-   **Post APIs** --- create, read, update, and delete posts

This separation keeps the backend modular and makes the project easier
to maintain and extend.

## Future Improvements

-   Like and unlike posts
-   Comments and replies
-   Follow and unfollow users
-   User search
-   Post search
-   Image upload with cloud storage
-   Notifications
-   Direct messaging
-   Pagination and infinite scrolling
-   Post sharing/bookmarking
-   Admin dashboard

## Author

**Keyur**

Computer Science Engineering Student

------------------------------------------------------------------------

```{=html}
<p align="center">
```
Made with ❤️ using React, Node.js, Express, and MongoDB.
```{=html}
</p>
```
