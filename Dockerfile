FROM node:10.19.0

WORKDIR /usr/src/app

COPY package.json* ./
#COPY package-lock.json /app && COPY package-lock.json

RUN npm install --save-exact
RUN npm install --save-dev
COPY . .

# Check the app for any syntax errors
RUN node app.js

EXPOSE 4193
