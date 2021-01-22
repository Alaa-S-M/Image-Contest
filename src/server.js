const express = require('express');
const app = express();

app.use(express.static('public'));

const images = [
    {src: 'example' }
];

// const users = [
//     { name: 'Kilani', password: '222222222' },
//     { name: 'Yara', password: '333333333' },
//     { name: 'Ihab', password: '444444' }
//   ];
  
  //routes
//   app.get('/get-users', (req, res) => {
  
//     res.send(users)
//   })


app.post('/add-image', (req, res) => {
    const {src} = req.body;
    console.log(src);
    const index = images.findIndex(image => image.src === src);
    if (index === -1) {
        images.push({ src });
    }
    res.send({ ok: true , src: src});

});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('listening', port);
});