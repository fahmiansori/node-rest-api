# Restful API with NodeJS, Express, PostgreSQL, Sequelize, Travis, Mocha, Coveralls and Code Climate. #
[link to source](https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014)

Simple Restful API with:
* NodeJS — For writing Javascript server-side applications
* Express — A NodeJS framework
* PostgreSQL — An open source object-relational database
* Sequelize — An ORM(Object Relational Mapping) of PostreSQL
* Travis —A continuous integration service for Testing Applications
* Coveralls — A web service to help you track your code coverage over time.
* Code Climate — Provides automated code review for maintainability and test coverage.
* Babel — To convert ES6 javascript code to ES5

## First ##
> npm init -y

-y for without setup

1. Install Express and Body-parser:
    > npm install --save express body-parser

2. Install babel: Because we need to convert our ES6 code to ES5. Install babel dependencies by copying the code below and paste in the terminal of the working directory:
    > npm install --save-dev @babel/core @babel/cli @babel/node @babel/plugin-transform-runtime @babel/preset-env @babel/register @babel/runtime babel-loader

    if error, use :
    > npm install --save-dev babel-core babel-cli babel-node babel-plugin-transform-runtime babel-preset-env babel-register babel-runtime babel-loader

    Create the *.babelrc* file in the path: _/rest-api/_ and populate it with:
    ```
    {
       "presets": ["@babel/preset-env"],
       "plugins": [["@babel/transform-runtime"]]
    }
    ```

3. Install slint and airbnb style guide. This is Optional!
    This will help you format your code in an easy to read state.
    > npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import

    Create a file *.eslintrc.js* in the path: _/rest-api/_
    ```
    module.exports = {
      "extends": "airbnb-base",
    "rules": {
    "no-console": 0,
    "no-param-reassign": [2, {"props": false}],
    "prefer-destructuring": 0,
    "treatUndefinedAsUnspecified": true,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    },
    "env": {
    "commonjs": true,
    "node": true,
    "mocha": true
    },
    };
    ```

4. Install nodemon
    > npm install -g nodemon

    Note that this installation will not be in this project package.json     file, because it was installed globally.

    Open the *package.json* file, edit the scripts object as follows:
    ```
    "scripts": {
      "dev": "nodemon --exec babel-node ./api/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```


## Structuring the app #
Create a directory called _api_ . Then create the *index.js* file, which is the root file for this application. You should be in the path: _rest-api/api/_

source code for *index.js* [included]

## Install Postgresql ##
[link](http://www.postgresqltutorial.com/install-postgresql/)


## Setup Sequelize ##
Sequelize is an ORM(Object Relational Mapping) for PostgreSQL. What this means is that, instead of writing raw SQL queries, ORM is used instead, which makes work easier.

1. Intall sequelize globally :
    > npm install -g sequelize-cli

    Note, if you wish not to install     this globally, you’ll need to     prefix every call to the sequelize     command with _./node_modules/.bin_

2. Create the file: *.sequelizerc* in the path: _/rest-api/_. That is, outside of the _api_ folder.

    source code [included]

    Observe that we required path. Let’s quickly install it:
    > npm install --save path

3. Install postgreSQL and sequelize dependencies
    > npm install --save sequelize pg pg-hstore

    Where: pg = postgreSQL and pg-hstore = converts data into the Postgres hstore format.

4. Initialize Sequelize:
    This will generate the Sequelize boilerplate which includes, models, migrations and seeders. Run:
    > sequelize init

    Directory tree should be like this :
    book-app

    ├── api

    │   └── index.js

    │   ├── server

    │   │   └── src

    │   │       └── config

    │   │       ├── └── config.js

    │   │       └── migrations

    │   │       └── models

    │   │       ├── └── index.js

    │   │       └── seeders│  

    ├── .babelrc

    └── .eslintrc.js

    └── .sequelizerc

    └── package.json

    └── package-lock.json

5. Edit _rest-api/api/server/src/models/index.js_ :
    We will use ES6 syntax :
    source code [included]

6. Edit *config.js* :
    Let’s quickly install dotenv package. This will make it easier when using *.env* variables :
    > npm install --save dotenv

    Then edit *config.js* :

    source code [included]

    You can replace the username with the one you used while setting up your postgreSQL. If you don’t remember creating a username, It means you are using the default user, which is postgres . For the password if you created a user, use the password, else, leave it the way it is above.

    Also, incase you are using an online database, such as ElephantSQL, uncomment this lines:
    ```
    development: {
       use_env_variable: 'DATABASE_URL'
    },
    ```

    Then, you will export the database URL into your environment
    ```
    export DATABASE_URL=our-database-url
    ```
    where our-database-url is the URL we copied from ElephantSQL. Every time you need to run this application, you will need to export the DATABASE_URL first.

    Remember, if you decide to use the online database, and have uncommented the line above, comment the development setup for the local PostgreSQL database. So as to avoid name duplication.

7. Create a *.env* file in the path: _/rest-api/_.
    source code [included]

## Create Databases, Model and Migration ##

1. Create the Databases:
    In the *config.js* file above, we referenced a database called 'books' for development and 'book_test' for testing. You can either use the GUI or Terminal to create these databases.

2. Create model
    Create model *book.js* :
    > sequelize model:create --name Book --attributes title:string, price:string, description:string

    Change to ES6 syntax and adding to the file *book.js*, we have the code below:
    source code [included]

3. Refactor migration file
    A migration file was also created when we ran that command to create the model, located in the path: _..server/migrations/<date>-create-book.js_ :

    Edit the migration file to :
    source code [included]

    Then run migration :
    > sequelize db:migrate

## Create Services, Controllers, Routes and Utilities ##
Yes, we can put all the code in one file. But that is not best practice. So, is good we separate code into different files. We will create four folders in the path: _/rest-api/api/server_ :

book-app

├── api

    ├── server

        ├── controllers

        ├── routes

        ├── services

        ├── utils


1. Services
    You might ask, what is a Service? See it as a medium that helps us interface with our 'book' model.

    In the Services folder, create a file: *BookService.js*
    source code [included]

2. Controllers
    The Service file created above is used in our controller. Create a file called *BookController.js* in the _controllers_ folder :

    source code [included]

3. Utilities
    As seen, in the *BookController.js* file, we imported a file called *Utils.js*. This file contain all the responses we will assert for while running and testing the api endpoints.

    Create the *Utils.js* file in the _Utils_ folder :

    source code [included]

4. Routes
    Create the route file called BookRoutes.js in the routes folder.

    source code [included]

5. Edit the _/rest-api/api/index.js_ file to add the route file :
    source code [included]

## Running Endpoints ##
Start up the server :
> npm run dev


## Write Test Cases for Endpoints ##
Now, let’s write test cases for each endpoint.
1. We will need to install testing framework like 'mocha' and assertion library like 'chai' and 'nyc' for test coverage. From the terminal run:
    > npm install --save-dev mocha chai chai-http nyc

2. We will create a _test_ folder in the path _/rest-api/api/_. Then create the test file, call it *test.js* . Hence, the file is located: _/rest-api/api/test/test.js_
    source code [included]

3. Include the test script in *package.json* file
    Replace :

    ```
    "test": "echo \"Error: no test specified\" && exit 1"
    ```

    with :

    ```
    "test": "export NODE_ENV=test &&  sequelize db:migrate:undo:all  && sequelize db:migrate  && nyc --require @babel/register  mocha ./api/test/test.js --timeout 20000 --exit"
    ```

    Observe :

    ```
    export NODE_ENV=test   //Works for mac OS
    SET NODE_ENV=test  //works for windows
    ```

    Remember, we have a test database we created earlier: 'book_test' So, from the test script, we run migrate afresh each time.
    Before you run the test, ensure that PostgreSQL server is running.
    Save all files and run the test:
    > npm run test

    (masih error :') .. )

## ADD Pagination ##
This use package *sequelize-paginate* :
> npm i sequelize-paginate

Use :
```
// model.js
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const MyModel = sequelize.define(
    'MyModel',
    {
      name: { type: DataTypes.STRING(255) }
    }
  )
  sequelizePaginate.paginate(MyModel)
  return MyModel
}

// controller.js
const { Op } = db.sequelize
// Default page = 1 and paginate = 25
const { docs, pages, total } = await db.MyModel.paginate()
// Or with extra options
const options = {
  attributes: ['id', 'name'],
  page: 1, // Default 1
  paginate: 25, // Default 25
  order: [['name', 'DESC']],
  where: { name: { [Op.like]: `%elliot%` } }
}
const { docs, pages, total } = await db.MyModel.paginate(options)
```

NOTE: If options include limit or offset are ignored.

source code [included in /controllers/BookController.js, /services/BookService.js, and /models/book.js]
mark by /\* Pagination \*/


# Dockerize App #
1. Create *Dockerfile* - tells Docker how to set up your container (environment) when you are not there to do so yourself. Basically you are automating the install/setup/startup process. Copy the code below into a file in the same place as the rest of your files called *Dockerfile*.

    source code :

    ```
    FROM node:7
    RUN mkdir /rest-api-dockerize
    ADD . /rest-api-dockerize
    WORKDIR /rest-api-dockerize
    RUN npm i
    EXPOSE 80
    CMD ["npm", "start"]
    ```

    Basically we are getting a package from DockerHub (a repository for free Docker containers that you can use as a starter) called node:7. With that container, we are going inside of it and making a directory called -  our repo name. After this, we are copying the file from our current directory (.) on our current machine to the repo name file in the container. After this, we are cd’ing into the directory. From inside, the file is running ‘npm i’ to download all dependencies. Finally, we are exposing port 80 since all ports are default closed on containers and then running the ‘npm start’ command to get things off the ground. With that, our 'script : {"start":"[command]"}' (in package.json) file should be running which starts our server and database. In summary, your *Dockerfile* is written to get your server up and running. That applies for whatever you are trying to get inside of a Docker container, you are trying to get it running.

    To get the database in its own container, however, we need to make a *docker-compose.yml* file. This file tells multiple containers how to work in a group/synchronized. This file is very important and also a HUGE security risk. Be very very careful what you do with this file. When you use a *docker-compose.yml* file for a repo, it is best practice to either keep the *docker-compose.yml* file one directory outside of the repo. This is because the *docker-compose.yml* file takes the place of a *.env* (environmental variable) file. As a result, accidentally committing this file to GitHub gives the world all of your keys and environmental variables. Therefore, one directory above…do it…or at least DO NOT forget to **.gitignore** it. Either way, bad news if you make a mistake here. So, inside that *docker-compose.yml* file, paste this in:

    ```
    version: "2"
    services:
      practice_docker:
        image: dockerhubusername/practice_docker
        ports:
          - 80:3000
        command: bash -c 'while !</dev/tcp/db/5432; do sleep 1; done; npm start'
        depends_on:
          - db
        environment:
          - DATABASE_URL=postgres://postgres:password@db:5432/practicedocker
          - PORT=3000   
      db:
        image: postgres
        environment:
          - POSTGRES_USER=postgres
          - POSTGRES_PASSWORD=password
          - POSTGRES_DB=practicedocker
      ```

      In the above file, change the ‘dockerhubusername’ to your DockerHub username. So, this file is using version 2 of docker-compose. Below that you can see that we are using 2 different services, one for the server and one for the database. In the server service, we are getting an image from DockerHub, then port mapping from repo port 3000 to container port 80. After this, the server is started with npm start once the database is up and properly running (notice the while file not exists, sleep line). It depends on the database, however, so it will wait until the database container is ready to run. After this, the environmental variables are put in for the server. Below this is where all of your environmental variables for this repo should be put. Anything that is in your *.env* file for the backend should end up here. For the database, the image that is being used is a default postgres image from the DockerHub. Use the environmental variables listed above with the exception of password which should be set to whatever your password is (also do this for DATABASE_URL). With that, your *docker-compose.yml* file should be ready to roll.

      The next step is to create a DockerHub account up. Go to DockerHub, create an account. After that, click Create at the top, and create and automated build. Here you should link your github repo for this repo. After it is linked, find your repo from the dropdown list here. Once you have selected it, you need to trigger Docker to retrieve the image if DockerHub has not previously gotten it. To do this, click Build Settings and then click the trigger button. After this you can go to the Build Details page. After waiting a few minutes and refreshing, the box on the right should change to Success from Building. When this is done, your *Dockerfile* from your GitHub repo has been successfully used by DockerHub to create an image of your server.

      Now on your local machine, you should test to make sure that the images are working as you want them to. To do this, run ‘docker-compose pull’ from where your *docker-compose.yml* file is located. After this runs, run ‘docker-compose up -d’ to start your containers. You can then run ‘docker ps’ to check which containers are running. Checking a few times in a row is a good idea to ensure that the containers boot up in the right sequence together. If you encounter any issues, double check that the files match what is here and follow the bugs as PostgreSQL can be finicky. Once you get the containers running good on your local machine, you should be ready to shut them down and deploy! To shut your containers down, ‘docker-compose down’.

      NOTE: If you encounter any issues or change your repo and commit to GitHub, make sure to delete your local images using ‘docker rmi <id>’ to prevent them from interfering. Also useful is ‘docker stop <id>’ to turn off an image. Remember that every push to GitHub causes DockerHub to create a new image so you should make sure to ‘docker-compose pull’ every time that you push to GitHub to get the latest version after you have removed the images.

      Now if you go into a deployment, you can just take the *docker-compose.yml* file with you. Yeah…literally you can copy paste that file from your local machine into the terminal that you are using for the deployment and save it there as *docker-compose.yml*. After you do that, install docker and docker-compose on the deployment. Once this is complete, run ‘docker-compose pull’. This will start a loading process that will take a few minutes for the containers to be downloaded. Once this is done, you can run ‘docker images’. You should be able to see both of your images. If you then run ‘docker-compose up -d’, you will be starting all of your containers. With success from the terminal (and no errors suggesting a database problem), you can go over to Postman on your local machine again. Use Postman to test your deployment by sending a GET request to the IP address with ‘:80’ for the port and the / route. With any luck, you should be seeing response!
