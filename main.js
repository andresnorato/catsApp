const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=56b9779d-6db2-48be-9def-c1471bdfa1cd';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=56b9779d-6db2-48be-9def-c1471bdfa1cd';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=56b9779d-6db2-48be-9def-c1471bdfa1cd`;


const spanError = document.getElementById('error')

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random michis', data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status
    } else {

        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btnrandom1 = document.getElementById('btn1Random');
        const btnrandom2 = document.getElementById('btn2Random');
        const btnrandom3 = document.getElementById('btn3Random');

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        btnrandom1.onclick = () => saveFavorites(data[0].id);
        btnrandom2.onclick = () => saveFavorites(data[1].id);
        btnrandom3.onclick = () => saveFavorites(data[2].id);

    }

}


async function loadFavoritesCats() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status
    } else {

        const section = document.getElementById('favoritesMiches');
        section.innerHTML = "";
        const h2 = document.createElement('h2');
        const h2text = document.createTextNode('Favorites Cats')
        h2.appendChild(h2text);
        section.appendChild(h2);


        data.forEach(cat => {

            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Remove Favorite');

            img.src = cat.image.url;
            btn.className = "btnRemove";
            btn.appendChild(btnText);
            btn.onclick = () => removeFavorite(cat.id);
            article.appendChild(img);
            section.appendChild(article);
            section.appendChild(btn);

        })
    }
}


async function saveFavorites(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();
    loadFavoritesCats();
}


async function removeFavorite(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
    })
    if (res.status !== 200) {
        spanError.innerHTML = spanError.innerHTML = 'Hubo un error: ' + res.status
    } else {
        loadFavoritesCats()
    }
}



















// const reload = async () => {
//     const response = await fetch(URL);
//     const data = await response.json();
//     const img = document.querySelector('img');
//     img.src = data[0].url
// } 

// getData();

// button.onclick = getData;


loadRandomCats();
loadFavoritesCats();