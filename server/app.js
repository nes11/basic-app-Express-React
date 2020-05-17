const path = require('path')
const express = require('express');
const app = express();
const port = process.env.PORT || 1330;

app.get('/hello', (req, res) => {
    res.send('I got your back')
});

app.use(express.static('../client/build'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

app.listen(port, () => console.log(`Listening on port ${port}`))
