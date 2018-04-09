'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');

const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

console.log("Begin");

server.post('/get-movie-details', (req, res) => {

    console.log("Inside server.post");

    //const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    //const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=ae8d74da`);
    //const reqUrl = encodeURI(`http://www.omdbapi.com/?i=tt3896198&apikey=ae8d74da`);
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=Guardians of the Galaxy&apikey=ae8d74da`);
    
    console.log("reqUrl:"||reqUrl);

    http.get(reqUrl, (responseFromAPI) => {
        console.log("123");
        let completeResponse = '';
        console.log("456");
        responseFromAPI.on('data', (chunk) => {

            completeResponse += chunk;
        });

        console.log("789");
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            //let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
            let dataToSend = `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;
            //console.log($dataToSend);
            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-movie-details'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});

server.listen((process.env.PORT || 8001), () => {
    console.log("Server is up and running...");});