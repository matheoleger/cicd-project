FROM node:latest

WORKDIR /front-end-react

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]