FROM node:8

# Create app directory
WORKDIR /usr/src/app

COPY ./events_sub/package.json ./

RUN [ "npm", "install" ]

COPY ./events_sub/ .

EXPOSE 3000
CMD [ "npm", "start" ]
