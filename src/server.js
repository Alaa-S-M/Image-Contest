const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

const images = [
    { score: 0, src: 'https://joombig.com/demo-extensions1/images/gallery_slider/Swan_large.jpg' },
    { score: 0, src: 'https://media.istockphoto.com/photos/gadisar-lake-at-jaisalmer-rajasthan-at-sunrise-with-ancient-temples-picture-id942152278?k=6&m=942152278&s=612x612&w=0&h=LgiUzhTUKiq34dKSqxyn0qGEaqo-tROvp2g6BqMvq4M=' },
    { score: 0, src: 'https://polarr-ppe-assets.s3-us-west-1.amazonaws.com/onboarding/01_04_preview_2x.jpg' },
    { score: 0, src: 'https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=6&m=535695503&s=612x612&w=0&h=uP8aDK4xlfjk3kEiyr9wwUiuh80UwAiICweFpiBDosk=' },
    { score: 0, src: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg' },
    { score: 0, src: 'https://www.searchenginejournal.com/wp-content/uploads/2018/10/How-to-Boost-Your-Images%E2%80%99-Visibility-on-Google-Images-760x400.png' },
    { score: 0, src: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg' },

];

app.post('/add-image', (req, res) => {
    const { score, src } = req.body;
    const index = images.findIndex(image => image.src === src);
    if (index === -1) {
        images.push({ score, src });
    }
    res.send({ ok: true });

});

app.get('/get-images', (req, res) => {
    res.send(images);
});

app.post('/update-score', (req, res) => {
    const { localImages } = req.body;
    localImages.forEach(localImage => {
        let index = images.findIndex(image => image.src === localImage.src);
        if (index > -1) {
            images[index].score += parseInt(localImage.score);
        }
    });
    res.send({ ok: true });
});

app.get('/sort-images', (req, res) => {
    images.sort((a, b) => b.score - a.score);
    res.send(images);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening', port);
});

