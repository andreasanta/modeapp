FROM node:14

WORKDIR /usr/src/app

COPY ./client client
COPY ./server server

WORKDIR /usr/src/app/client
RUN npm i && npm run build

WORKDIR /usr/src/app/server
RUN cp -R /usr/src/app/client/build ./public
RUN npm i

EXPOSE 4000

CMD ["npm", "run", "server"]