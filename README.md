# Node.js Post App

A full-stack post app built using Node.js, Express, MongoDB, and EJS. This app allows users to register, log in, write posts, edit and delete posts, and upload a profile picture.

## Features

- **User Authentication**: Register, log in, and log out securely.
- **Post Management**: Create, edit, and delete posts.
- **Profile Picture Upload**: Allow users to upload a profile picture.
- **Dynamic Rendering**: Use EJS for server-side rendering of views.

## Technologies Used

- **Node.js**: Backend server environment
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user information and posts
- **EJS**: Templating engine for rendering views
- **Express Sessions**: Session management for user authentication
- **Multer**: Middleware for handling file uploads

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nodejs-post-app.git
   cd nodejs-post-app
Install dependencies

bash
Copy code
npm install
Set up MongoDB

Ensure you have MongoDB installed and running. Create a .env file in the root of the project and specify your MongoDB URI:

env
Copy code
MONGO_URI=mongodb://localhost:27017/post-app
Start the server

bash
Copy code
npm start
The server will start on http://localhost:3000.

Usage
Register/Login

Navigate to http://localhost:3000/register to create a new account.
After registration, log in with your credentials at http://localhost:3000/login.
Write/Edit/Delete Posts

Once logged in, navigate to http://localhost:3000/posts.
Click on "New Post" to create a new post, or edit/delete existing posts.
Upload Profile Picture

Visit your profile page at http://localhost:3000/profile.
Click on "Edit Profile" to upload a profile picture.
File Structure
views/: EJS templates for rendering views
public/: Static files (CSS, images)
routes/: Route handlers
models/: Mongoose models for user and post schemas
middlewares/: Middleware functions
controllers/: Logic for handling requests
uploads/: Folder for storing uploaded profile pictures
app.js: Main application file
