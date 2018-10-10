# Hearthstone API

This node.js application is used to serve as the API between our Android application and the 
MySQL database that contains all the information about the current Standard cards in 
Hearthstone (minus the ones from the latest expansion).

To run this app, you need to have `npm` installed on your laptop which comes bundled with 
Node.js.

After downloading and installing Node.js, make sure that :
1. You have a MySQL database service opened;
2. This MySQL database contains a 'hearthstone' database with all the data about cards;
3. This Node.js application has its MySQL connection details correctly set up.

When all of this is done, you can open a Terminal window and go to the root directory of this
project, then type `npm start` to start the application. Then, open your web browser, and go
to `localhost:3000/` to see the index page, or `localhost:3000/cards` to see a list of all
cards stored in the database.
