FROM node:20-alpine 

WORKDIR /usr/src/app

RUN npm install -g yarn --force

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]