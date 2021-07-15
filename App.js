const URL = 'localhost:8080';

const express = require('express');
const path = require('path');
const app = new express();
const bodyParser = require('body-parser');

console.log('Server Starting...');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function(request, response){

});

app.listen(8080);
console.log('Server Online');