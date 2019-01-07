FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
COPY server.js .
RUN npm install
EXPOSE 4000
CMD [ "npm", "start" ]