FROM node:20.3.1

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD npm run start:dev