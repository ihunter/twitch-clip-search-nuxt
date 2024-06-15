FROM node:14-slim

WORKDIR /app

RUN apt-get update && apt-get upgrade

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=false
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

CMD [ "npm", "run", "start" ]
