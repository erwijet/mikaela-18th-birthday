FROM node:8-alpine

WORKDIR /project

COPY . /project

RUN npm install

CMD ["npm", "start"]