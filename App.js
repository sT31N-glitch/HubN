const URL = 'localhost:8080'; // String Holding the URL for the App

// External Modules
const express = require('express');        // An external package built into nodejs. Used to build the backend
const path = require('path');              // An external javascript package allowing us to use file paths
const bodyParser = require('body-parser'); // An external package used to parse data from html bodies
const fs = require('fs');                  // An external package built into nodejs, which manipulates the files

// Internal Module
const message = require('./message');

// Begin Server Startup
console.log('Server Starting...');
const app = new express(); 
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

        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Disposition', 'attachment; filename=messages');
        response.write(content, 'utf-8');
        response.end();
    });

// Save the message to memory
app.post('/submitPost', function(request, response){
    message.Push(request.body.author, request.body.code, request.body.summary);
    response.writeHead(301, { "Location": "http://" + URL + '/' });
    return response.end();
});

let output = ''; // Variable used to store the output of the file run on the frontend
app.post('/runFile', function(request, response){ // Called when a user runs the code in a message
    // Create a temporary function.
    let func = new Function(message.GetMessages()[1][request.body.messageID]);
    // Stores the output 
    output = JSON.stringify(func());
    // Redirect
    response.writeHead(301, { "Location": "http://" + URL + '/consoleOutput' });
    return response.end();
});
// Used to show the console output
app.get('/consoleOutput', function(request, response){
    response.sendFile(path.resolve('./consoleOut.html'));
});
    app.get('/getOutput', function(request, response){
        response.setHeader('Content-Type', 'text/plain');
        response.setHeader('Content-Disposition', 'attachment; filename=messages');
        response.write(output, 'utf-8');
        response.end();
    });

// Finish Server Startup
app.listen(8080);
console.log('Server Online');