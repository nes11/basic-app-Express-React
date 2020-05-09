FROM node:10

WORKDIR /app

# clientside
COPY client/package.json client/
COPY client/package-lock.json client/
RUN cd client && npm ci

# serverside
COPY server/package.json server/
COPY server/package-lock.json server/
RUN cd server && npm ci

COPY client/. client/.
RUN cd client && npm run build

COPY server/. server/.

WORKDIR /app/server

CMD ["npm", "start"]
