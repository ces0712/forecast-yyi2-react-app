# Forecast Weather app (Yii2 backend + React frontend + Docker)

# Expected behavior of the app
When you enter to the app shows you the map of berlin and some temperature graghics related to the next five days of weather, when you click to the button shows always a different city. 

Note: this app was made thinking in the best ways to scale according to the posible changes that could happen in real life, thinking always in the posible scenarios and difficulties that developers have when they are building from development environment and prepare for a deployment in production.

To see the api docs go to this site [Apiary Demo](http://docs.demo197.apiary.io)

To see a demo of the app in docker cloud go to this site:
[App Demo](http://frontend.forecastapp2.1c06e58b.svc.dockerapp.io)


This project contains two applications one for REST API backend, and another for React frontend.

The project involves:

* Yii2 framework for providing RESTful API managing the city name and country code from the database and processing the data of the [openweathermap](https://openweathermap.org/)
* The authentication process require a username and password to consume the REST API through Basic Auth 
* [Reactjs v15](https://facebook.github.io/react/), base in [Redux](http://redux.js.org/docs/introduction/) container pattern, using [react sparklines graph](https://github.com/borisyankov/react-sparklines) component, [redux-form v6](https://github.com/erikras/redux-form), [react router v4](https://github.com/ReactTraining/react-router), and google maps library
* For processing ES6 javascript babel and webpack (with hrm for development) as module bundler
* Dockerize app of frontend, backend, database
* Database use for production postgresql and for api test using codeception mysql database

## Getting Started

### Directory Structure

  * backend/ contains Yii2 framework Restful API application
  * frontend/ contains Reactjs frontend application

### Prerequisites
* Docker 17.05-ce+
* docker-compose 1.10.1+

### Usage
To run the application open the console and execute the following commands:

```
  $ git clone https://github.com/ces0712/forecast-yyi2-react-app.git
  $ cd forecast-yyi2-react-app
```
Then
```
  $ cp docker-compose-example.yml docker-compose.yml

```
Edit the `docker-compose.yml` file with your favorite editor and replace `<YOUR GITHUB API TOKEN>` to Personal access tokens from [Github](https://github.com/settings/tokens)

Once you replaced API token, run following command.

```
    $ docker-compose up
```

Once it is up and running, please open another console window and execute following command to migrate database.

```
    $ docker-compose run --rm backend ./yii migrate
```
Once migration is done, then open the browser and access to:

* Frontend: http://localhost:3000
* Backend: http://localhost:8081

The application will run with the default environment vars

## How it works?

### How everything is connect ?
The backend, frontend, and database are connected through docker linked as containers and using environment vars, the files involved are the DockerFiles in both projects, the .env file in the backend project, and the docker-compose.yml setting the environmental vars allow the easy trransition to develoment and production environment.

### How setting production environment
Edit the docker-compose.yml 
```
backend:
...
  environment:
    YII_ENV=prod
...
frontend:
...
  environment:
    NODE_ENV=production

```
You can change the host, port etc according to your production environment
This will prepare both your backend as your frontend for production

### How run the tests?
Backend side:
```
  $ cd backend/tests
```
Then prepare the test environment: Yii2 framework uses [codeception](codeception.com) a test framework base in PhpUnit, for testing you will need to set up another database different from your developing and production environment all the settings are already in the docker-compose.yml of this folder follow this [guide](https://github.com/codemix/yii2-dockerized/wiki/4.-How-to-test):

The custom tests are in /backend/tests/codeception/api

Once you have set up the environment run the tests with this command:

```
$ docker-compose run --rm test codecept run api --steps

``` 
![Alt text](/screenshots/1.png?raw=true "Screenshot test backend")

Frontend side:
I used mocha-chai-enzyme-jsdom-sinon libraries to test the frontend side
you dont need internet connection to test the app
 
Just run this command:

```
$ docker-compose run --rm frontend npm run test

```
![Alt text](/screenshots/2.png?raw=true "Screenshot test frontend")

