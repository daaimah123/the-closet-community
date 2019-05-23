# The Closet Community

the Closet Community is a social media platform designed to be a safe space for LGBT members still in the closet find each other and share experiences.

## Table of Contents

- [react](#react)
- [BootStrap](#bootstrap)
- [Node](#Node)
- [PostgreSQL](#PostgreSQL)

## Installation

Download to your project directory, add `README.md`, and commit:
1. clone this repo
2.  cd sever folder
3. install dependencies
4. create an auth0 account
5. create an api in auth0 and make the url/audience https://friend
6. go to applications where your api app will now be, click it and add http://localhost:3000/callback to your auth0 "Allowed Callback URLs" section and save changes

```sh
cd server
npm install
npm start \\ to start the express server
```

gi into the client folder
```sh
cd client
npm install
npm start \\ to start the React app
```
## Feature list

- private diary, for personal notes
- contribute the public post
- participate in close chat rooms
