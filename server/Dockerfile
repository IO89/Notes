FROM node:14 as base

WORKDIR /notes/server

COPY package*.json ./

RUN npm i

COPY . .
