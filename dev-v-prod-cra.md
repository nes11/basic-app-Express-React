## Create-React-app, routing in local dev V production build

Create React App is an easy, no-fuss way to get started with React: Install the package, run a simple command and you're all set!
So I did that, and started making my own components, rendering them all at the ```'/'``` level of the app. Soon enough, it became a bit crowded there so I looked into React Router.
React Router conditionally renders certain components depending on the route being used in the URL. It allows the user to *seemingly* navigate to different pages (*seemingly* because it actually is all a single page, rendering different components)

To make local development easier, CRA comes with a frontend server that allows for hot-reloading: every saved change triggers an in-ram build, and the update can be seen immediately in the browser. Requests are handled by the frontend server, that proxies them to the backend.
For production, we run ```npm run build``` to bundle the React code into static files. That means no more frontend server when we deploy our code (I deployed it to an Heroku dyno).
