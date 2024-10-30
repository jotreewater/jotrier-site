# jotrier-site

This repo is for hosting files related to the jotrier.com website. Jotrier is a personal portfolio website for hosting Joseph Trierweiler's resume, projects, and blog posts. The website's current status is **incomplete**.

## Below is a list of features to be implemented in sequence

### Phase 1: Backend Setup

- ~~Set up an Express server for handling routing, middleware, and HTTP requests~~
- ~~Set up a local MongoDB database for storing user and blog data~~
- ~~Set up a CRUD API for handling users~~
- ~~Set up a middleware for handling errors~~
- ~~Set up a middleware for handling private routes for users~~

### Phase 2: Frontend Setup

- Set up a React frontend with the folloiwng pages:
  - ~~Home Page~~
  - Login Page
  - Register Page
  - Me Page
- ~~Use Home Page to invent css stylings for the other pages~~
- Utilize React Router for routing
- Utilze Redux and Redux Toolkit to handle application state
- Implement Register features
- Implement Login features
- Protect the Me Page route and display basic user information

### Phase 3: Blog + Portfolio

- Set up a way to easily swap out resumes from the Home page as an Admin user
- Create the following pages/components
  - Blog Page
  - Blog Post List
  - Blog Post
  - Create Blog Post
  - Edit Blog Post
  - Portfolio Page

### Phase 4: Deploy

- Self host on Vultr

### Phase 5: Extra Features

- Implement some fun react + css for animations
- Implement IP logging to add more security for login
- Implement JWT refresh tokens, and shorten JWT token lifecycle
- Implement cycling JWT_SECRET
- Implement JWT's getting revoked due to logout.
- Implement being able to change password/email/delete account
- Implement non-admin accounts being able to comment on blog posts
