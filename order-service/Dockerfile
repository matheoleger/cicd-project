FROM node:latest

WORKDIR /order-service

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]