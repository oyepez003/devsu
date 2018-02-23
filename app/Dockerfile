FROM node:9.6.1-alpine
RUN mkdir -p /usr/src/devsu
WORKDIR /usr/src/devsu
COPY package*.json /usr/src/devsu
RUN npm install
COPY . /usr/src/devsu
CMD [ "node", "app.js" ]
EXPOSE 8002