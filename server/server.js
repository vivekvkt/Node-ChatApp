const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 80;

app.use(express.static(publicPath));


app.listen(80, ()=>{


console.log('server running at port${port}');

});