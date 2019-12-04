var fs = require("fs");
var pdf = require('html-pdf');
const axios = require("axios");
const inquirer = require("inquirer");

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
        const { avatar_url, followers, login, name } = res.data;
        const html = `
            <html>
                <head>
                    <style>
                        body {
                            background-color: ${color};
                        }
                    </style>
                </head>
                <body>
                    <h1>${name} | ${login}</h1>
                    <img width="100" height="100" src="${avatar_url}" />
                </body>
            </html>
        `
        fs.writeFile('test.html', html, function(err) {
            if (err) throw err;
        });              
    });
});
        

// function writeToFile("profile.pdf", data) {
 
// }

// function init() {

// init();
