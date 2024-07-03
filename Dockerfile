FROM node:20.12.2-slim as base

WORKDIR /usr/src/app

FROM base as build

COPY --link package.json package-lock.json ./

RUN npm install

COPY --link . .

RUN npm run build
RUN npm prune

FROM base

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080

EXPOSE 8080

COPY --from=build /usr/src/app /usr/src/app

CMD [ "npm", "run", "start" ]
