FROM node:14-alpine as builder

RUN apk add --no-cache bash

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli

ENV NODE_ENV build

USER node

WORKDIR /home/node

COPY . /home/node

RUN npm ci

RUN npm run build

EXPOSE 5000

CMD ["npm","run","start:prod"]