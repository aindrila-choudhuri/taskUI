const express = require("express");
const fs = require('fs');
const path = require('path')
const Promise = require('promise');

const app = express();
const imageDir = './public/images';
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
    const getDirectories = srcPath => fs.readdirSync(imageDir).filter(file => fs.statSync(path.join(imageDir, file)).isDirectory())
    res.send(getDirectories());
});

app.get('/frames', (req, res) => {
    fs.readdir(imageDir + '/set1', function (err, files) {
        let contents = [];
        let promises = [];
        files.forEach(file => {
            console.log(file);
            let imagePath = imageDir + '/set1/' + file;
            res.sendFile(path.join(__dirname, imagePath));
        });
    });
});

app.post('/tasks', (req, res) => {
    console.log("saved");
})



app.listen(4421, () => {
    console.log("Express server is up on port 4421");
});