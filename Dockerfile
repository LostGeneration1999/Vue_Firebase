FROM node:12.16-alpine

RUN npm install --global @vue/cli
RUN npm install -g drakov

WORKDIR /projects