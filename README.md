# 📸 Snapzy Backend 

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-Password%20Hashing-5C5C5C?style=for-the-badge&logo=letsencrypt&logoColor=white)
![ImageKit](https://img.shields.io/badge/ImageKit-Media-0066FF?style=for-the-badge&logo=imagekit&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Git](https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Code-181717?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-Editor-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

### Snapzy Backend is built as a learning and practice project to understand how to design and build a modular backend using Node.js, Express.js, MongoDB, Mongoose, JWT authentication.

</div>

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure Authentication Middleware
- Logout
- Change Password
- Protected Routes
- Password Hashing
- Cookie-based Authentication
  
### 👤 User Management

- Get Current User
- Get User By ID
- Get User Posts
- Update Profile & Username
- Update & Delete Profile Picture
- Delete User Account

### 📝 Posts

- Create Post
- Get Post By ID
- Get All Posts
- Get Current User Posts
- Update Post
- Delete Post
- Add Post Caption
- Upload Post Image
- Post Ownership Authorization

### ❤️ Likes

- Like Post
- Unlike Post
- Get Post Likes
- Check Like Status
- Manage User Likes

### 💬 Comments

- Create Comment
- Get Post Comments
- Update Comment
- Delete Comment
- Comment Ownership Authorization

### ↩️ Comment Replies

- Create Reply
- Get Comment Replies
- Update Reply
- Delete Reply
- Reply Ownership Authorization

### 👥 Followers & Following

- Follow User
- Unfollow User
- Get Followers
- Get Following
- Check Follow Status
- Prevent Self Follow
- Follow Relationship Management

### 🔖 Saved Posts

- Save Post
- Remove Saved Post
- Get Saved Posts
- Prevent Duplicate Saves

### 🔔 Notifications

Notifications can be generated for social interactions such as:

- New Followers
- Post Likes
- Comments
- Comment Replies
- Other User Activities

Available operations include:

- Get Notifications
- Mark Notification as Read
- Delete Notification
- Delete All Notifications

### 🔎 Search

Search functionality can be used for discovering:

- Users
- Usernames
- Posts
- Captions

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password Hashing |
| ImageKit | Image Storage |
| Multer | File Upload Handling |
| Cookie Parser | Cookie Handling |
| CORS | Cross-Origin Requests |
| dotenv | Environment Variables |

---

# 🏗️ Backend Architecture

Snapzy follows a modular backend architecture.

The project separates:

- Routes
- Controllers
- Models
- Middlewares
- Database Configuration
- Utilities
- Authentication
- Error Handling

This structure makes the application easier to understand, maintain, test, and extend.

---

# 📁 Project Structure

```text
Snapzy-Backend/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   ├── like.controller.js
│   │   ├── comment.controller.js
│   │   ├── follow.controller.js
│   │   ├── notification.controller.js
│   │   ├── comment.controller.js
│   │   ├── reply.controller.js
│   │   └── ...
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── like.model.js
│   │   ├── comment.model.js
│   │   ├── follow.model.js
│   │   ├── notification.model.js
│   │   └── ...
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   ├── like.routes.js
│   │   ├── comment.routes.js
│   │   ├── follow.routes.js
│   │   ├── notification.routes.js
│   │   ├── search.routes.js
│   │   └── ...
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── upload.middleware.js
│   │   └── validateRegister.middleware.js
│   │   └── ...
│   │
│   ├── services/
│   │   ├── storage.services.js
│   │   └── notification.service.js
│   │   └── ...
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── app.js
|
├──server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🔐 Authentication Flow

Snapzy uses JWT-based authentication.

```text
User
 │
 │ Register / Login
 ▼
Authentication API
 │
 ▼
Validate User
 │
 ▼
Client Stores Authentication
 │
 ▼
Protected API Request
 │
 ▼
Authentication Middleware
 │
 ▼
Verify Token
 │
 ▼
Allow Request

```

Protected routes require valid authentication.

---


# 🗄️ Database Design

Snapzy uses **MongoDB** with **Mongoose**.

The application separates different relationships into dedicated collections/models.

```text
User
 │
 ├── Posts
 ├── Likes
 ├── Comments
 ├── Replies
 ├── Followers
 ├── Following
 ├── Saved Posts
 └── Notifications

Post
 │
 ├── Likes
 ├── Comments
 └── Author

Comment
 │
 ├── Author
 ├── Post
 └── Replies

Follow
 │
 ├── Follower
 └── Following

Notification
 │
 ├── Recipient
 ├── Sender
 └── Related Resource
```

Using separate models for relationships helps keep documents manageable and makes relationships easier to query.

---

# 📡 REST API Modules

## Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh-token
PATCH  /auth/change-password
```

## Users

```text
GET    /users/me
GET    /users/:userid
GET    /users/:userid/posts

PATCH  /users/me
PATCH  /users/me/profile-picture

DELETE /users/me/profile-picture
DELETE /users/me
```

## Posts

```text
POST   /posts

GET    /posts
GET    /posts/:postid

PATCH  /posts/:postid
DELETE /posts/:postid
```

## Likes

```text
POST   /posts/:postid/like
POST   /posts/:postid/unlike

GET    /posts/:postid/likes
```

## Comments

```text
POST   /posts/:postid/comments
GET    /posts/:postid/comments

PATCH  /comments/:commentid
DELETE /comments/:commentid
```

## Comment Replies

```text
POST   /comments/:commentid/replies
GET    /comments/:commentid/replies

PATCH  /replies/:replyid
DELETE /replies/:replyid
```

## Followers / Following

```text
POST   /follow/:userid
POST   /unfollow/:userid

GET    /users/me/followers
GET    /users/me/following
```

## Saved Posts

```text
POST   /posts/add-saved-post/:postid
POST   /posts/removed-saved-post/:postid

GET    /users/me/saved-post
```

## Notifications

```text
GET    /notifications

PATCH  /notifications/:notificationid

DELETE /notifications/:notificationid
DELETE /notifications
```

## Search

```text
GET /search/users
GET /search/posts
```

Example:

```text
/search/users?q=keyur
/search/posts?q=javascript
```

---

# 🔒 Security

The project includes several security practices:

- JWT Authentication
- Protected Routes
- Authentication Middleware
- Password Hashing with bcrypt
- HTTP-only Cookies where applicable
- Token Verification
- User Authorization
- Resource Ownership Checks
- Environment Variables
- CORS Configuration
- Input Validation
- Centralized Error Handling

Users should only be able to modify resources they own.

---


# ⚙️ Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=8000

IMAGEKIT_PRIVATE_KEY=

NODE_ENV=development

CORS_ORIGIN=

MONGO_URI=

JWT_SECRET=
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Dodiya-Keyur/Snapzy.git
```

## 2. Go Into the Project

```bash
cd Snapzy-Backend
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create Environment File

```bash
cp .env.example .env
```

On Windows, you can manually create `.env` and copy the variables from `.env.example`.

## 5. Configure Environment Variables

Add your:

- MongoDB connection string
- JWT secrets
- Cloudinary credentials
- CORS origin
- Server port

## 6. Start Development Server

```bash
nodemon server.js
```

## 7. Start Production Server

If your project contains a production start script:

```bash
npm start
```

---

# 🧩 Backend Concepts Practiced

### Node.js

- Modules
- Async/Await
- Promises
- File Handling
- Environment Variables

### Express.js

- Routing
- Middleware
- Controllers
- Request/Response Handling
- Error Handling
- REST API Design

### MongoDB

- CRUD Operations
- Documents
- Collections
- References
- MongoDB Queries
- Aggregation
- Pagination
- Indexing Concepts

### Mongoose

- Schemas
- Models
- References
- Population
- Validation
- Middleware
- Query Methods

### Authentication

- JWT
- Cookies
- Password Hashing
- Authentication Middleware

### Backend Architecture

- MVC Pattern
- Modular Folder Structure
- Controllers
- Routes
- Middlewares
- Utilities
- Centralized Error Handling

---

# 🚧 Future Improvements

Possible future features include:

### 💬 Social Features

- User mentions
- Hashtags
- Comment mentions
- Post sharing
- Post reporting

### 🔎 Search

- Better user search
- Hashtag search
- Advanced post search
- Search suggestions

### 🏠 Feed

- Following feed
- Personalized feed
- Trending posts
- Explore page
- Recommended users

### ⚡ Real-Time Features

- Socket.IO
- Real-time notifications
- Real-time chat
- Online/offline status

### 📧 Account Features

- Email verification
- Forgot password
- Password reset
- Two-factor authentication

### 🛡️ Moderation

- Report post
- Report user
- Block user
- Admin dashboard
- Content moderation

### 🚀 Performance

- Redis caching
- MongoDB indexes
- Rate limiting
- API optimization
- Image optimization
- Query optimization

---

# 📌 Project Notes

Snapzy Backend is primarily built for **learning and practicing backend development**.

It demonstrates how a social-media backend can be built with multiple related resources and user interactions.

It should not be considered fully production-ready without additional work around:

- Rate limiting
- Advanced validation
- Security hardening
- Logging
- Monitoring
- Automated testing
- Performance optimization
- Database indexing
- Caching
- Abuse prevention
- Production deployment configuration

---

# ⭐ Support

If you find this project useful for learning backend development, consider giving the repository a ⭐ Star.

It helps motivate further development and learning.

---

# 👨‍💻 Author

**Keyur**

Computer Science Engineering Student

Interested in:

- Backend Development
- Node.js
- Express.js
- MongoDB
- REST APIs
- Full Stack Development
- Software Engineering

---

# ❤️ Built With

```text
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
ImageKit
Multer
```

Built with ❤️ while learning backend development.
