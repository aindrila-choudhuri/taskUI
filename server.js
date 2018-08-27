const express = require("express");
const fs = require('fs');
const path = require('path')

const app = express();
const bodyParser = require('body-parser')
app.use( bodyParser.json() );  
const imageDir = './public/images';
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', (req, res) => {
    const getDirectories = srcPath => fs.readdirSync(imageDir).filter(file => fs.statSync(path.join(imageDir, file)).isDirectory())
    res.send(getDirectories());
});

app.get('/frames', (req, res) => {
    fs.readdir(imageDir + '/set' + req.query.task, function (err, files) {
        let contents = [];
        let promises = [];
        files.forEach(file => {
            let imagePath = './images/set'+req.query.task+'/';
            let content = path.join(imagePath, file);
            contents.push(content);
        });
        
        res.send(contents);
    });
});

app.post('/tasks', (req, res) => {
    res.send(req.body);
})

app.listen(4421, () => {
    console.log("Express server is up on port 4421");
});