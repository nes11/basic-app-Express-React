## Create-React-app, routing in local dev V production build

Create React App is an easy, no-fuss way to get started with React: Install the package, run a simple command and you're all set!

So I did that, and started making my own components, rendering them all at the ```'/'``` level of the app. Soon enough, it became a bit crowded there so I looked into React Router.
React Router conditionally renders certain components depending on the url. It allows the user to **seemingly** navigate to different pages (seemingly, because it actually is all a single page, rendering different components)

This is what my App component looked like:

```javascript
function App() {
  return (
    <Router>
      <Route exact path='/'>
        <HelloWorld/>
      </Route>
      <Route exact path='/cat'>
        <CatChaseMouse/>
      </Route>
      <Route exact path='/colour-changer'>
          <ChangingSquare/>
          <ChangingText/>
      </Route>
    </Router>
  );
}
```
I could now change the url, and render different components separately: ```'/cat'``` renders the ```<CatChaseMouse/>``` and so on. I tested it locally, saw that it worked as expected, and pushed it to Heroku. And it didn't work once deployed. I went to https://basic-express-react.herokuapp.com/cat and got a 404. Why?

To make local development easier, CRA comes with a frontend server that allows for hot-reloading: every saved change triggers an in-ram build, and the update can be seen immediately in the browser. Requests are handled by the frontend server, that proxies them to the backend.
For production, we run ```npm run build``` to bundle the React code into static files. That means no more frontend server when we deploy our code (I deployed it to an Heroku dyno).

When the app is running in an Heroku dyno, there is only one server running: the Express backend server. While my frontend server could handle the change in url by displaying the expected component, in production the change in the url triggers a request to the backend, at the ```/cat'``` endpoint. Since it doesn't exist in the backend, the server responds with 404.

To fix that, I used a **fall-through** route. At the high level of routing in the Express server, after declaring all the endpoints, I added:
```javascript
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
```
What happens here is, when the server gets a request that doesn't match any of its routes, it responds with the index.html file at /client/build (that was generated when the React code was bundled). The browser then uses it to figure out what to render when the url is ```'/cat'```.

In order to develop locally in 'pretend prod' mode, I first have to bundle my client code with ```npm run build```. I can then access the Express server running on port 1330 directly at **localhost:1330**.

Now I can go and change the url, and the corresponding component will render. I can see from the network tab that a request is sent to the backend, which responds with a whole bunch of static files. The browser then uses them to figure out wich component to render.

Having to type the url for the desired content is not a great user experience though, so I'll eventually use links to navigate within the app.
