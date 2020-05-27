
## Dockerfile

Dockerfile is a set of instructions to build a Docker image.
Here's the Dockefile for this app:

```
FROM node:10

WORKDIR /app

# serverside
COPY server/package.json server/
COPY server/package-lock.json server/
RUN cd server && npm ci

# clientside
COPY client/package.json client/
COPY client/package-lock.json client/
RUN cd client && npm ci

COPY server/. server/.

COPY client/. client/.
RUN cd client && npm run build

WORKDIR /app/server

CMD ["npm", "start"]
```

The first line ```FROM``` defines the **base image** upon which your Docker image will be based. We chose node here, because our application is a Node.js app. Docker image are build as stacked layers, and node is here the first of them.

```WORKDIR``` sets the working directory (duh!) where the following commands will be run.

The ordering of the commands in the Dockerfile matters: the elements of the app that are **least likely** to change should be nearer the top. The reason for that is the layering we mentioned; if no changes have been made to a layer, Docker uses the cache and moves on to the next one. If a layer has changed **all subsequent ones** will be built from scratch.

We start with our dependencies, copying our source code's package.json and package-lock.json. The ```/server``` bit at the end of the line creates a folder **and** copies the stuff at ```server/package.json``` into it. Second line just copies ```server/package-lock.json``` since the ```/server``` folder has already been created.
```
COPY server/package.json server/
COPY server/package-lock.json server/
```
Then we want to install our dependencies. The ```WORKDIR``` is still ```/app``` so we need to ```cd``` into the server folder and (&& runs consecutive commands) run ```npm ci``` which will install dependencies based on the ```package-lock.json``` (more reliable than ```npm install```).
```
RUN cd server && npm ci
```
We then do the same for our client code.
```
COPY client/package.json client/
COPY client/package-lock.json client/
RUN cd client && npm ci
```

Next thing is to copy all our code into their respective ```/client``` and ```/server``` directories.
```
COPY server/. server/.

COPY client/. client/.
```

For the client code, we also add:
```
RUN cd client && npm run build
```
which will ```cd``` into the ```/client``` directory and run the command ```npm run build```. This bundles our frontend code for use in production.

Finally we move to the ```/app/server``` directory. We could very well then do:
```
RUN npm start
```
and start our app right away. However Docker lets you use:
```
CMD ["npm", "start"]
```
which instead runs ```npm start``` **when the container starts**. Note how ```CMD``` takes an array of strings.
