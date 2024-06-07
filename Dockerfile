FROM node:14.21.3-alpine

WORKDIR /app

RUN apk update && apk upgrade
RUN apk add git

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
