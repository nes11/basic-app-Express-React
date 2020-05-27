## React-router-dom ```<Link>```

Rather than having to type a specific url in the address bar, I want to be able to click a link to navigate to a different view.

React-router-dom provides the handy ```<Link>``` to do just that.

```javascript
const NavBar = () => {
  return (
    <>
    <Link to='/cat'>Cat</Link>
    <Link to='/colour-changer'>Colour changer Link</Link>
    <Link to='/star-wars'>Star Wars API</Link>
    </>
  )
};
```

What ```<Link>``` does is simply change the state of the url (path?) to the value provided as the ```to``` prop. When the state of the url changes, react-router-dom will look through your defined routes and render the corresponding view. Here are the routes:

```javascript
const App = () => {
  return (
    <Router >
      <Route path='/'>
        <NavBar/>
      </Route>
      <Route exact path='/star-wars'>
        <StarWars/>
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

Because the ```NavBar``` has a ```path``` prop (as opposed to ```exact path```), the navbar will be rendered on all routes (which is what we want). However, if I've clicked the 'cat' ```<Link>```, the url state is updated to ```/cat```, and the app will render the route's child ```<CatChaseMouse>``` component.

This is notably different from an ```<a>``` with an ```<href>```. This is used to fetch a resource from the backend server. We can easily see in the network tab.

```javascript
<Link to='/cat'>Cat</Link>
```
```html
<a href='/cat'>Cat</a>
```

Clicking the first one will use the power of react-router to simply change the state of the url and render the component at that path. The network tab won't show any activity.

However, clicking the second one will trigger a request to the backend, where no ```/cat``` route exist. It will instead use our fall-through route and serve the frontend bundle again, where the ```/cat``` will be found. You can see it in the network tab, that shows the static files being served.

Fall-through route:
```javascript
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
```

Obviously ```<Link>``` is a much more efficient way to navigate between views.
