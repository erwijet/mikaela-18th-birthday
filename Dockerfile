FROM node:8-alpine

WORKDIR /project

COPY . /project

RUN npm install

RUN npm i -g pm2

CMD [ "pm2", "index.js" ]