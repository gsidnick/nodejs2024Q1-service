FROM node:20.11-alpine3.19 As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run prisma:generate

FROM node:20.11-alpine3.19
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/tsconfig*.json ./
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/src ./src
COPY --from=development /usr/src/app/prisma ./prisma/
COPY --from=development /usr/src/app/test ./test/
COPY --from=development /usr/src/app/doc ./dist/doc/

EXPOSE ${PORT}

CMD [ "npm", "run", "start:docker" ]