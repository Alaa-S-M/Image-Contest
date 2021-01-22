
function addImage(e) {
    let src = document.querySelector('.image-src'), score = '0';
    if (!src) {
        return;
    }
    src = src.value;
    console.log()
    fetch('/add-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify( {src: src} )
    })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })

    // fetch('/add-image', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }, body: JSON.stringify({ score, src })
    // })
    // .then(r => r.json())
    //     .then(data => {
    //         console.log(data)
    //     })
}
// function getUsers() {
//     console.log('get users')

//     fetch('/get-users')
//         .then(r => r.json())
//         .then(users => {
//             console.log('then')
//             console.log(users)
//         })
//     console.log('after fetch')
// }
// getUsers();
