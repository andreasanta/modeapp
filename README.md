# Mode App Test

## Getting Started

This project contains a `docker-compose.yml`file for quick start. It will run a PostgreSQL database, compile the React front-end and serve the APIs from several containers.

You can get started with:

`docker-compose up -d`

Once the app image has been compiled and docker has finished executing all the containers, the app should be accessible at

`http://localhost:4000``

There are no initial logins created, so you need to head to the "Signup" page and enter an e-mail/password to get started. The UI is very basic so you won't get confirmation of creation. Try and login in order to operate on your virtual account.

## Tech Stack

To grant speed and consistency, PostgreSQL has been chosen as the storage layer.

For the back-end Node.js + Express + Passport handle session and page serving, while knex handles the database interface. A few utilities such as morgan have also been installed to facilitate development.

For the front-end, the stack is pretty lean and it's a basic CRA + redux + router + Styled Components.

## Tests and UI improvements

Albeit the task requirements demanded to include tests, I did not have time to include them, I'll be happy to discuss them during the interview.

Also, due to time constraints, I used a very basic UI with almost no styling. I understood that the objective of the exercise is to complete a full-stack and fully working program, but cosmetic changes should not matter too much.

## TODOs / Optimizations / Improvements

- Compile instead of transpiling TS in back-end
- Handle UI disable/failures/messages/redirects gracefully, now you have to jump from one page to another manually and the UI does not respond actively to changes
- Properly style all components with Styled Components and eliminate inline styled
- Make the session persistent by storing it on the database
- Require e-mail confirmation after signup
- Implement protection from basic attacks such as CSRF
- Include clear comments in the code, apply linting and reduce code duplication
- Optimize responsive degradation for mobile
- Use "connected-react-router" to push navigation actions in redux
- Use non UTC datetimes in front-end but localize them according to user timezone
- Build a service layer between controllers and models in order to abstract knex and data access complexity