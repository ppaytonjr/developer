var fs = require("fs");
var pdf = require('html-pdf');
const axios = require("axios");
const inquirer = require("inquirer");
var pdfcrowd = require("pdfcrowd");


inquirer.prompt([
    {
    type: "input",
    message: "What is your GitHub Username?",
    name: "username"
    },
    
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"

    },
])
.then(function({ username, color }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    
    axios.get(queryUrl).then(function(res){
        const { avatar_url, followers, repos_url, login, name, following, bio, starred_url, following_url, followers_url  } = res.data;
        const html = `
        
            <html>
                <head>
                    <style>
                    <div id="html-2-pdfwrapper">
                        body {
                            background-color: ${color};
                        }
                    </style>
                </head>
                <body>
                    <h1>${name} | ${login}</h1>
                    <img width="100" height="100" src="${avatar_url}" />
                    <br>${bio}</br>
                    <a href="${repos_url}" target="_blank">Link to Repos</a>
                    <br><a href="${followers_url}">Followers:${followers}</a></br>
                    <br><a href="${following_url}" target="_blank">Following:${following}</a></br>
                    <br><a href="${starred_url}" target="_blank">Starrs</a></br>
                </body>
            </html>
        `
        fs.writeFile('index.html', html, function(err) {
            if (err) throw err;
        });              
    });
});
var client = new pdfcrowd.HtmlToPdfClient(
    "demo", "ce544b6ea52a5621fb9d55f8b542d14d");

    var callbacks = pdfcrowd.saveToFile("index.pdf");        

    callbacks.error = function(errMessage, statusCode) {
        if(statusCode) {
            console.error("Pdfcrowd Error: " + statusCode + " - " + errMessage);
        } else {
            console.error("Pdfcrowd Error: " + errMessage);
        }
    };

    client.convertUrl("https://ppaytonjr.github.io/developer", callbacks);
 

// function init() {

// init();
