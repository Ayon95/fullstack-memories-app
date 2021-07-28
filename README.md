# Memories

A fullstack social-media application that allows users to share their memorable moments with others. Users can create, edit, or delete their own posts. They can also like and comment on other people's posts.

Link to the application: https://memories-app-mushfiq.netlify.app

### Try it out with these fake credentials

- Email: john123@email.com
- Password: john123

## Lessons learned

- How to use TypeScript with React, Redux-Toolkit, Express, and Mongoose
- How to use Redux-Toolkit for state management
- How to apply styling with styled components
- How to create an Express server
- How to set up a MongoDB database (cluster on MongoDB Atlas) and connect it to an Express app
- How to create schemas and models, and make queries using Mongoose
- How to implement routing and create controllers
- How to use custom middleware for things like user authorization, and error-handling
- How to implement token-based authentication
- How to implement Google OAuth user authentication and authorization
- How to structure a fullstack application using the client-server architecture
- How to deploy a fullstack JavaScript application

## Features

- CRUD functionalities
- User authentication and authorization (JWT authentication)
- Google OAuth
- Picture upload
- Likes and comments
- Recommending similar posts
- Search feature (search posts by title or tags)
- Pagination

## Tools and technologies used

- TypeScript
- create-react-app
- React Hooks
- React Router
- Redux Toolkit
- Styled components
- Nodejs/Express
- MongoDB/Mongoose
- jsonwebtoken
- bcrypt
- google-auth-library

## Get started

Open up your command line and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/Ayon95/fullstack-memories-app

# Go into the repository
$ cd fullstack-memories-app

# Remove current origin repository
$ git remote remove origin

# If you want, you can add a new remote repository
$ git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
```

Go to the `server` folder, and create a `.env` file. Add the following environment variables with your own values:

```dosini
MONGO_URL='your-db-connection-string'
PORT=5000
SECRET='your-jwt-secret-string'
GOOGLE_OAUTH_CLIENT_ID='your-google-oauth-client-id'
```

Open up two terminals - one for the server, and one for the client:

```bash
# Terminal for the server
# cd into the server folder
$ cd server

# Install dependencies
$ npm install

# run the server
$ npm start
```

```bash
# Terminal for the client
# cd into the client folder
$ cd client

# Install dependencies
$ npm install

# run the client app
$ npm start
```

At this point, you will have the server running locally at http://localhost:5000, and the client app running in the browser at http://localhost:3000<br />

Note that the client app is configured to send all requests to the deployed server. If you want your client to send requests to the local server, then you just have to change the base url in `authThunks.ts` and `postsThunks.ts`:

```js
// In client/src/redux/auth/authThunks.ts
const baseUrl = "http://localhost:5000/user";
```

```js
// In client/src/redux/posts/postsThunks.ts
const baseUrl = "http://localhost:5000/posts";
```

## Deployment

Client-side app deployed with [netlify](https://netlify.com/)<br />
Server-side app deployed with [heroku](https://www.heroku.com/home)

### Deploying the server to Heroku

You will need to create a [Heroku account](https://signup.heroku.com/) first. Then, you have to install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) on your machine. Then, open a terminal and log in to your Heroku account:

```bash
$ heroku login
```

Then, go to the `server` folder, and create a file named `Procfile`. Inside that file, include the following:

```
web: node build/index.js
```

Generate a production build of the server:

```bash
$ cd server

# create a production build
$ npm run build
```

Then, go to your Heroku dashboard on the Heroku website, and create a Heroku app. Initialize a git repository if your project does not have one, and add a heroku remote:

```bash
# Make sure you are in the project root directory
# Initialize an empty git repository
$ git init

# Add a heroku remote for your project
$ heroku git:remote -a your-project-name

# Push the server folder (which is a subdirectory) from the master branch to the remote heroku
git subtree push --prefix server heroku master
```

As final steps, make sure:

- to add config variables to your heroku app, for example, your database connection string and jwt secret
  (the config variables need to be named exactly the same as your environment variables)
- to allow your heroku app to connect to your MongoDB Atlas cluster
- to configure your client app to send all requests to your deployed heroku app

### Deploying the client app to Netlify

First, create a Netlify account if you do not have one already. Log in to your account. If your project is already on GitHub, then you can opt for Netlify's continuous deployment:

- Click `New site from git`, then select `GitHub`
- Select the project repo that you want to link to your Netlify site for continuous deployment
- Apply these settings -> Base Directory: client, Build Command: npm run build, Publish directory: client/build
- Click `Deploy Site`

If you do not have a git repo for your project on GitHub, then you have to manually generate a production build of the client app:

```bash
$ cd client

# create a production build
$ npm run build
```

You can use this `build` folder to deploy the client app to Netlify.
