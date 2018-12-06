# Team-Send-It

## Team Roles
* **Team Lead:** Josh DeBest
* **Architect:** Lucas Han
* **UI/UX Design:** Julian Tan
* **API/DB Design:** Wesley Khademi
* **QA Lead:** Hayden Baker

## Team Motto
* Full Send.

## Team Pizza
* Pepperoni

## How to Set Up and Run Our Web App
Before running the web app there are few steps that need to be taken to set up the models and tables in the database.

To create the tables in the database:
1) Change into the server directory
2) Run `./node_modules/.bin/sequelize db:migrate` to set up the tables in database_development
3) Run `./node_modules/.bin/sequelize --env=test db:migrate` to set up the tables in database_test

To pre-populate the database_development tables:
1) Run `./node_modules/.bin/sequelize db:seed:all`

To run the web app:
1) Open up two terminals
2) In the first terminal, change into the app directory and run `npm run serve`
3) In the second terminal, change into the server directory and run `npm run start`
4) Then visit [localhost:8080](localhost:8080)

## Things to Note
To login as an Admin use the following info:
* **Username:** admin@gmail.com
* **Password:** admin

To login as an Employee use the following info:
* **Username:** employee@gmail.com
* **Password:** employee

To update Products, Orders, and Announcements in the management pages click on the row of the product/order/announcement in the table.

Do not delete the "Bikes" and "Accessories" Categories as they are required for the products to appear in the store.
