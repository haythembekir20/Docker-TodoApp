FROM mhart/alpine-node:10 as node

WORKDIR /client


COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000
CMD [ "npm", "run", "start" ]