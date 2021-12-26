# MemeHub
[MemeHub](http://memehub-medium-clone.herokuapp.com/), a full-stack application inspired by the blogging network Medium, is an online platform for users to share and consume memes.

Visit our [wiki](https://github.com/minuminukim/memehub-express-project/wiki/MemeHub) for more information.

![MemeHub homepage](/public/images/documentation/memehub-homepage.png)

## Live Link
[MemeHub](http://memehub-medium-clone.herokuapp.com/)
## Installation
**Prerequisites**

 - Node.js
 - NPM
 - PostgreSQL

**Get Started**

 - Clone the repository: `git clone git@github.com:minuminukim/memehub-express-project.git`
 - Run `npm install` to install dependencies
 - Create a Postgres database called `memehub_database`
 - Create a `.env` file in the root directory, following `.env.example` as a reference.
 - Initialize the database:
	 - `npx dotenv sequelize db:migrate`
	 - `npx dotenv sequelize db:seed:all`
- Run `npm start` to launch the server.

## Features
 - Account Registration and Sign-In

<img src="./public/images/documentation/sign-in.png" height=300 alt="Sign in form">

 - Memes
   - Users can post memes via links.
   - Users can add a title and caption to their post.
   - Users can edit their posts.
   - Users can delete their posts.
 - Comments
   - Users can post comments under memes.
   - Users can edit their own comments.
   - Users can delete their own comments.
 - Like
   - Users can like memes that they find on their feeds.
   - Users can remove their previous likes.

 <img src="./public/images/documentation/like-and-comment.gif" height=500 alt="Like and comment on memes">

 - Follow and Feed
   - Users can follow other users and curate their own feed.
   - Users can view a feed of memes that can be sorted by most likes, most recent, or most engagement.
   - Users can post memes to their own personal pages.


## Technologies

- <img src="./public/images/documentation/technologies/jslogo.png" height=40 alt="JavaScript"> JavaScript
- <img src="./public/images/documentation/technologies/css3.png" height=40 alt="CSS"> CSS
- <img src="./public/images/documentation/technologies/pugFace.png" height=40 alt="Pug"> Pug
- <img src="./public/images/documentation/technologies/nodejs.png" height=40 alt="Node.js"> Node.js
- <img src="./public/images/documentation/technologies/express.png" height=40 alt="Express"> Express
- <img src="./public/images/documentation/technologies/postgres.png" height=40 alt="PostgreSQL"> PostgreSQL
- <img src="./public/images/documentation/technologies/sequelize.png" height=40 alt="Sequelize"> Sequelize

## Documentation

- [Feature List](https://github.com/minuminukim/memehub-express-project/wiki/Feature-List)
- [User Stories](https://github.com/minuminukim/memehub-express-project/wiki/User-Stories)
- [Database Schema](https://github.com/minuminukim/memehub-express-project/wiki/Database-Schema)
- [API Documentation](https://github.com/minuminukim/memehub-express-project/wiki/API-Documentation)
- [Frontend Routes](https://github.com/minuminukim/memehub-express-project/wiki/Frontend-Routes)
