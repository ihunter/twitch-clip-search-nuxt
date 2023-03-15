FROM node:14.21.2-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

CMD [ "npm", "start" ]
