FROM node:14
WORKDIR /usr/src/app
COPY ./frontend frontend
WORKDIR /usr/src/app/frontend
RUN npm i
RUN npm run build