const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const images = [
    { score: '0', src: 'https://joombig.com/demo-extensions1/images/gallery_slider/Swan_large.jpg' }

];

app.post('/add-image', (req, res) => {
    const { score, src } = req.body;
    console.log(src);
    const index = images.findIndex(image => image.src === src);
    if (index === -1) {
        images.push({ score, src });
        console.log('Pushed');
    }
    res.send({ ok: true });

});

app.get('/get-images', (req,res) => {
    res.send(images);
});

app.post('/update-score', (req, res) => {
    const { score, src } = req.body;
    console.log(src);
    const index = images.findIndex(image => image.src === src);
    if (index > -1) {
        images[index].score = score;
        console.log('Updated');
    }
    console.log(images[index].score)
    res.send({ ok: true });

});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening', port);
});

