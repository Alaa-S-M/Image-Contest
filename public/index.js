
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
    // const sortedRoot = document.querySelector('.sorted-images');
    let html = '';
    images.forEach(image => {
        html += `<div class='rate-image'> 
                <img src=${image.src}>
                <div class="rating">
                    <span id="5" onclick="handleSatrs(event)">☆</span>
                    <span id="4" onclick="handleSatrs(event)">☆</span>
                    <span id="3" onclick="handleSatrs(event)">☆</span>
                    <span id="2" onclick="handleSatrs(event)">☆</span>
                    <span id="1" onclick="handleSatrs(event)">☆</span>
                </div>
            </div>`;
    });

    root.innerHTML = html;
}

function renderSortedImages(images) {
    const sortedRoot = document.querySelector('.sorted-images');
    let html = '';
    images.forEach(image => {
        html += `<div class='sort-image'> 
                <img src=${image.src}>
                <h1>${image.score}</h1>
                </div>
            </div>`;
    });

    sortedRoot.innerHTML = html;
}

function handleSatrs(e) {
    let stars = [...e.target.closest('.rating').children];
    console.log(stars)
    stars.forEach((elm, index) => {
        if (elm.id <= e.target.id) {
            elm.classList.add("gold");
        }     
    })
    console.log(e.target.closest('.rate-image').firstElementChild.src+ ' === src ==== ');
    console.log(parseInt(e.target.id) + ' ====id ==== ');
    updateScore(parseInt(e.target.id),e.target.closest('.rate-image').firstElementChild.src);
}

function updateScore(score,src){
    !!src && fetch('/update-score', {
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

function sortImages() {
    console.log('get Images');

    fetch('/sort-images')
        .then(r => r.json())
        .then(images => {
            renderSortedImages(images);
        });
}