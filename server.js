const express = require("express");
const fs = require('fs');
const path = require('path')
const Promise = require('promise');

const app = express();
const imageDir = './public/images/set1';
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
    getImages(imageDir).then((contents) => {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(contents);
    })
});


function readFileAsync(file, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject(err) // rejects the promise with `err` as the reason
            resolve(data)               // fulfills the promise with `data` as the value
        })
    })
}


function getImages(imageDir) {
    return new Promise((resolve, reject) => {
        var fileType = '.jpg',
            files = [], i;
        fs.readdir(imageDir, function (err, list) {
            let contents = [];
            let promises = [];
            files.forEach(file => {
                console.log(file);
                let imagePath = imageDir + '/' + file;
                let promise = readFileAsync(imagePath).then((data) => {
                    contents.push(data);
                })
                promises.push(promise);

            });
            Promise.all(promises).then(() => {
                resolve(contents);
            }
            )

        });
    });

}


app.listen(4421, () => {
    console.log("Express server is up on port 4421");
});