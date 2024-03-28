FROM mhart/alpine-node:10 as node

WORKDIR /server

COPY package*.json /server/

RUN npm install


COPY . /server/

EXPOSE 5000
CMD [ "npm", "run", "server" ]