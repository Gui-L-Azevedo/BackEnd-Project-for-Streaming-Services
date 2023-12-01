# BackEnd for Streaming Services

Hi! This is my project regarding the 2023 CompJR's selective process, it is intended to simulate how an streaming service would work, as in the regular user (if logged in) can only access data, but not alter or delete it, unlike admins that have full access to all routes. In this project since we are simulating an streaming service, I figured it would be an nice idea to use a streaming service that has both movies and TV shows as products, for testing purposes and better "visualisation" of the things you can do in the project, I used an datasheet that contained all movies and TV shows from disney, then I altered the datasheet slightly to fit my purposes, and also of course the original and modified versions will be linked below.

## Table of Contents

- [Getting Started](#getting-started)
  - [How to run](#how-to-run)
- [Routes](#routes)
- [Acknowledgments](#acknowledgments)

## How to run

- Before running the project you must do -npm install on the terminal relative to the folder.

- In order for the project to work you need (preferably) to have Mongo Compass installed, for the API tests use either insomnia or PostMan.

- Inside the folder of the project go into the uploads folder, then into the images folder, now copy the root of the said images folder and copy paste it into line 8 of the .babelrc file. The line should look like this: "@": "(your selected path here)".

- Before opening the project you should first make the connection with MongoDB.

- To connect to MongoDB you should go to the "database" folder and add your own link where it says "YOUR LINK HERE.

- In order to run the project just type "npm run serve" on the terminal.

## Routes

### Authentication

| HTTP Method | Route                 | Description       | Parameters                  | Permission Level Required |
| ----------- | --------------------- | ----------------- | --------------------------- | ------------------------- |
| POST        | /auth/register        | User registration | {email, name, password}     | None                      |
| POST        | /auth/login           | User login        | {email, password}           | None                      |
| POST        | /auth/forgot-password | Forgot password   | {email}                     | None                      |
| POST        | /auth/reset-password  | Reset password    | {email, token, newPassword} | None                      |

### Movies

| HTTP Method | Route                            | Description           | Parameters                                                                           | Permission Level Required |
| ----------- | -------------------------------- | --------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| POST        | /movies                          | Create Movie          | {title, directors, cast, dateAddedtoPlatform, releaseYear, duration, rating, genres} | Logged in Admin           |
| POST        | /movies/featured-image/:moviesId | Upload Featured Image | {file}                                                                               | Logged in Admin           |
| GET         | /movies                          | Get Movie by Title    | {title}                                                                              | Logged in user            |
| PUT         | /movies/:moviesId                | Update Movie          | {title, directors, cast, dateAddedtoPlatform, releaseYear, duration, rating, genres} | Logged in Admin           |
| DELETE      | /movies/:moviesId                | Delete Movie          | None                                                                                 | Logged in Admin           |

### Shows

| HTTP Method | Route                          | Description           | Parameters                                                                           | Permission Level Required |
| ----------- | ------------------------------ | --------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| POST        | /shows                         | Create Show           | {title, directors, cast, dateAddedtoPlatform, releaseYear, duration, rating, genres} | Logged in Admin           |
| POST        | /shows/featured-image/:showsId | Upload Featured Image | {file}                                                                               | Logged in Admin           |
| GET         | /shows                         | Get Show by Title     | {title}                                                                              | Logged in user            |
| PUT         | /shows/:showsId                | Update Show           | {title, directors, cast, dateAddedtoPlatform, releaseYear, duration, rating, genres} | Logged in Admin           |
| DELETE      | /shows/:showsId                | Delete Show           | None                                                                                 | Logged in Admin           |

## General Info

The routes used for authentication do not require the user to be logged in or to be and admin, the get routes for both movies and shows require the user to be logged in, and the other routes require the user to be an logged in admin. I took the decision to make things this way because thats how an actual streaming service would work, the user only get to have acces to the data, but not alter it, unlike the admins that have full access to absolutely everything.

In order to be logged in you first need to create an account.
After you registered, if you forget your password, dont worry we have an recovery password system. You can learn more about these routes in the "routes" topic above.

To make an user be an admin, you have to make the change manually and make the change directly in the database after you create you user.

## Acknowledgments

Original datasheet: https://www.kaggle.com/datasets/shivamb/disney-movies-and-tv-shows

You can also find 2 datasheets derivated from the one above, wich is the onde that I recommend you use for your testing of the platform

Especial thanks to Fredao.
