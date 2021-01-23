
function addImage() {
    let src = document.querySelector('.image-src'), score = '0';
    src = !!src && src.value;
    !!src && fetch('/add-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ score, src })
    })
        .then(r => r.json())
        .then(data => {
            console.log(data);
        });
}
function getImages() {
    console.log('get Images');

    fetch('/get-images')
        .then(r => r.json())
        .then(images => {
            renderImages(images);
        });
}

function renderImages(images) {
    const root = document.querySelector('.un-sorted-images');
    let html = '';
    images.forEach(image => {
        html += `<div class='rate-image'> 
                <img src=${image.src}>
                <div class="rating">
                <span onclick>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                </div>
                </div>`;
    });

    root.innerHTML = html;
}

function sortImages() {

}