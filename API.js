let characterTemplate = Handlebars.compile(document.getElementById("pokeCard").innerHTML);
let offset = 1; // Start at 1 since SWAPI's pagination is 1-based.
const limit = 10;

async function fetchCharacters() {
    const response = await fetch(`https://swapi.dev/api/people/?page=${offset}`);
    const data = await response.json();
    offset += 1;
    let charactersArr = [];

    data.results.forEach(element => {
        const segments = element.url.split('/');
        const id = segments[segments.length - 2];

        charactersArr.push({
            id: id,
            name: element.name,
            url: element.url,
            height: element.height,
            gender: element.gender,
            // No direct image link in SWAPI; you can add a placeholder or fetch from another source if needed
            imageurl: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
        });
    });

    return { characters: charactersArr };
}

function renderCharacters(characterList) {
    const container = document.getElementById('content');
    const html = characterTemplate(characterList);
    container.insertAdjacentHTML('beforeend', html);
}

async function initialLoad() {
    const characterList = await fetchCharacters();
    renderCharacters(characterList);
}

document.querySelector("button").addEventListener('click', async () => {
    initialLoad();
});

window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        initialLoad();
    }
});

initialLoad();
document.getElementById('yearText').innerHTML = new Date().getFullYear();
    