# Instructions

## Setup project
- Git clone
- Navigate to the project folder via terminal
- `npm i` to install packages
- Set your environment variables in `server/config/config.json` if needed (probably you will not need it)

## Start server on local machine
- `npm start`
- API URL = http://localhost:5353
- Swagger URL = http://localhost:5353/swagger

## Start auto testing on local machine
- `npm test`

----

## Notes
- While setting your authentication token in swagger do not forget to put Bearer before the token. The whole token should look like this `Bearer your-token`
- Everytime the server is restarted, the authentication tokens will be invoked because there is no persistent database for users in this project.

----

## Heroku
- API URL = https://trip-list-task.herokuapp.com
- Swagger URL = https://trip-list-task.herokuapp.com/swagger