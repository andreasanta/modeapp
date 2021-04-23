# Mode App Test

## Getting Started

This project contains a `docker-compose.yml`file for quick start. It will run a PostgreSQL database, compile the React front-end and serve the APIs from several containers.

You can get started with:

`docker-compose up -d`

Once the app image has been compiled and docker has finished executing all the containers, the app should be accessible at

`http://localhost:4000`

There are no initial logins created, so you need to head to the "Signup" page and enter an e-mail/password to get started. The UI is very basic so you won't get confirmation of creation. Try and login in order to operate on your virtual account.

## Tech Stack

To grant speed and consistency, PostgreSQL has been chosen as the storage layer.

For the back-end Node.js + Express + Passport handle session and page serving, while knex handles the database interface. A few utilities such as morgan have also been installed to facilitate development.

For the front-end, the stack is pretty lean and it's a basic CRA + redux + router + Styled Components.

## Tests and UI improvements

Albeit the task requirements demanded to include tests, I did not have time to include them, I'll be happy to discuss them during the interview.

Also, due to time constraints, I used a very basic UI with almost no styling. I understood that the objective of the exercise is to complete a full-stack and fully working program, but cosmetic changes should not matter too much.

## Answers to Techinical Questions

### Did you have time to complete the coding test?
Yes, except tests and UI fine tuning. I even included Dockerfile and docker-compose for fast boot.

### What would you add to your solution if you had more time?

I would add unit, integration and component tests. I would Swap Styled Components with Tailwind, use Material UI with a basic theme.

### How would you optimise your solution?

The solution is ready to be scaled, since the database and the app containers are separated and there are no bottlenecks on the back-end. I would place the static files on a CDN, the API back-end in a K8S cluster and run a managed server on AWS. Also I would introduce an API gateway to control throttling and backpressure. Finally, I would use a shared in memory storage for sessions and caching, such as Redis.

### What are the security issues you can see in your solution?

- Passwords must be hardened, secrets exportes to env variables and transferred into shared secrects or vaults.
- There is no XSS, CSRF control, it must be added.
- The session is very weak and can be hijacked easily, I would enable TLS 1.3 and use JWT for authentication, instead of session cookies.

### How does your solution handle concurrency in order to maintain correct ordering or transfers.

By using transactions with "serial" isolation and locking records with FOR UPDATE clause on SELECT. All transactions acting on the same database row (or table) are necessarily waiting for each other and can fail in case of conflicts. In this case I would retry the transaction.

### List a few of your preferred JavaScript frameworks (also let us know in which situations you would choose to use/not use them).

- React: it's the de facto standard for front-end development. I always use it unless client has different requirements or we're upgrading a project that does not include React. Also very easy to combine with SSR.

- Jest/React Testing Library: a must for FE testing in all cases, actually it comes with CRA.

- VueJS: I find it lighter and I use it for quckly integrating with existing projects. It lacks the amount of libs that react provides, so I use it for simpler projects.

- Redux: It's the de facto state management library for React, but I only use it for simple projects. I prefer ApolloClient for local state management, especially if I can connect to a GraphQL server.

- Angular: To be honest it's my least favorite, it has the steepest learning curve and it complicates development with many complex patterns. I'd use it only if I have to maintain an existing project in Angular, paying special attention to the version number, since Google introduced breaking changes often. I like the concept of directives, custom attributes and guards, which are missing in React.

- I normally use many other "helper" libs such as lodash, react-router, React Hook Form, Material UI, TailwindCSS, etc...

## Other TODOs / Optimizations / Improvements

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
- Optimize Dockerfile to leverage cache and reduce file size

