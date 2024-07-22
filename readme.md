# Express JSON API with Static file serving

A simple express.js server providing a JSON API to manage posts with CRUD operation s. 
It also serves static HTML page to interact with the API

## Features
- **GET** `/api/posts` - Retrieve all posts.
- **GET** `/api/posts/:id` - Retrieve a single post by ID.
- **POST** `/api/posts` - Create a new post.
- **PUT** `/api/posts/:id` - Update an existing post by ID.
- **DELETE** `/api/posts/:id` - Delete a post by ID.

## Extra 
- Clone the repo using `git clone https://github.com/badmuffin/express-json-api.git`
- Install dependencies: `npm i` or `npm install`
- `npm run dev` to start the server. Server will run on `http://localhost:8000`.
