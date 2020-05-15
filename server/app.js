const path = require('path')
const express = require('express');
const app = express();
const port = process.env.PORT || 1330;

app.get('/hello', (req, res) => {
    console.log('!!!!!!!!!!!!!')
    res.send('I got your back')
});

app.use(express.static('../client/build'));


app.listen(port, () => console.log(`Listening on port ${port}`))
