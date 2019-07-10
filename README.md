# full-stack-app-with-react-rest-api

### Description:

This app uses React to create a client for an existing school database REST API (that I created in the previous FSJS Techdegree project #9). This is a full stack application that provides a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database. In addition, users are required to create an account and sign in to make changes to the database.

### Installing the REST API

1. In a terminal window navigate to the Project folder, then to the api folder.
2. Install npm modules with the command npm install.
3. Create the database with the command npm run seed. The database will be populated with two users and three courses.

### Resetting the database

To reset database to its seed data

1. Stop the server with ctrl-C in the terminal window.
2. Delete the file fsjstd-restapi.db.
3. Recreate the database with the command npm run seed.
4. Restart the application server with the command npm start

### Setup And Installation

- Clone the project to a local directory
- Run npm install: npm install
- Seed database: npm run seed
- Run npm start: npm start
- Open http://localhost:3000 in the browser
