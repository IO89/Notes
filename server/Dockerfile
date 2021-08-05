FROM node:15 as base

WORKDIR /notes/server

COPY package*.json ./

RUN npm i

COPY . .
