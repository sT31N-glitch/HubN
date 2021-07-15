const URL = 'localhost:8080'; // String Holding the URL for the App

// External Modules
const express = require('express');
const path = require('path');
const app = new express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Internal Module
const message = require('./message');

// Begin Server Startup
console.log('Server Starting...');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Variable Used to Get Current Date
const date = new Date();

// Home Page
app.get('/', function(request, response){
    response.sendFile(path.resolve('./home.html'));
});
    app.get('/getPosts', function(request, response){
        let content = '';
        content += message.GetMessages()[0] + '|#|';
        content += message.GetMessages()[1] + '|#|';
        content += message.GetMessages()[2] + '|#|';
        // fs.writeFileSync('./files/temp/messages.xml', content);
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Disposition', 'attachment; filename=messages');
        response.write(content, 'utf-8');
        response.end();
    });

app.post('/submitPost', function(request, response){
    message.Push(request.body.author, request.body.code, request.body.summary);
    response.writeHead(301, { "Location": "http://" + URL + '/' });
    return response.end();
});

// Finish Server Startup
app.listen(8080);
console.log('Server Online');