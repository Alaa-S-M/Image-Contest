
function addImage() {
    let srcInput = document.querySelector('.image-src-input'), score = 0;
    let src = !!srcInput && srcInput.value;
    srcInput.value = '';
    !!src && fetch('/add-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ score, src })
    })
        .then(r => r.json());
}

function getImages() {
    fetch('/get-images')
        .then(r => r.json())
        .then(images => {
            renderImages(images, '.un-sorted-images');
        });
}

function renderImages(images, selector) {
    const root = document.querySelector(selector);
    let html = '';
    images.forEach(image => {
        html += `<div class='rate-image'> 
                <img src=${image.src} />`;
        if (selector == '.un-sorted-images') {
            html += `<div class="image-data rating"> 
                        <span id="5" onclick="handleSatrs(event)">☆</span>
                        <span id="4" onclick="handleSatrs(event)">☆</span>
                        <span id="3" onclick="handleSatrs(event)">☆</span>
                        <span id="2" onclick="handleSatrs(event)">☆</span>
                        <span id="1" onclick="handleSatrs(event)">☆</span>
                    </div>`;
        } else if (selector == '.sorted-images') {
            html += `<p class="score"> ${image.score} </p>`;
        }
        html += `</div>`;
    });

    root.innerHTML = html;
}

function handleSatrs(e) {
    let stars = [...e.target.closest('.rating').children];
    stars.forEach(el => el.classList.remove("gold"));
    stars.forEach(el => {
        if (el.id <= e.target.id) {
            el.classList.add("gold");
        }
    });
    let score = parseInt(e.target.id),
        src = e.target.closest('.rate-image').firstElementChild.src;
    updateScore(score, src);
}

function updateScore(score = 0, src) {
    !!src && fetch('/update-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ score, src })
    })
        .then(r => r.json());

}

function sortImages() {
    fetch('/sort-images')
        .then(r => r.json())
        .then(images => {
            renderImages(images, '.sorted-images');
        });
}