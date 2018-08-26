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
    fs.readdir(imageDir + '/set' + req.query.task, function (err, files) {
        let contents = [];
        let promises = [];
        files.forEach(file => {
            let imagePath = imageDir + '/set1/' + file;
            let content = path.join(__dirname, imagePath);
            contents.push(content);
        });
        res.send(contents);
    });
});

app.post('/tasks', (req, res) => {
    console.log("saved");
})

app.listen(4421, () => {
    console.log("Express server is up on port 4421");
});