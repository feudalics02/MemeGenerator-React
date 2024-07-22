FROM node:18-alpine

WORKDIR /meme-generator-app/

COPY public /meme-generator-app/public
COPY src /meme-generator-app/src
COPY package.json /meme-generator-app/package.json
COPY package-lock.json /meme-generator-app/package-lock.json

RUN npm install
RUN npx update-browserslist-db@latest

EXPOSE 3000

CMD ["npm", "start"]
