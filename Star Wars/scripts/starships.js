async function get_starship() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = ''; 
    try {
        for (let i = 1; i < 5; i++) {
            const response = await axios.get(`http://swapi.dev/api/starships/?page=${i}&format=json`);
            displayArticles5(response.data.results);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

function displayArticles5(articles) {
    const newsContainer = document.getElementById('content');
    articles.forEach(async (article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('content-item');
        const filmId = `filmsList-${index}`;
        const personId = `peopleList-${index}`;
        articleDiv.innerHTML = `
            <div>
                <h2>${article.name}</h2>
                <p>Model: ${article.model}</p>
                <p>Class: ${article.starship_class}</p>
                <p>Manufacturer: ${article.manufacturer}</p>
            </div>
        `;
        const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <h2>${article.name}</h2>
                <p>Model: ${article.model}</p>
                <p>Class: ${article.starship_class}</p>
                <p>Manufacturer: ${article.manufacturer}</p>
                <p>Length: ${article.length}</p>
                <p>Passengers: ${article.passengers}</p>
                <p>Crew: ${article.crew}</p>
                <p>Consumables: ${article.consumables}</p>
                <p>Max Speed: ${article.max_atmosphering_speed}</p>
                <p>Hyperdrive Rating: ${article.hyperdrive_rating}</p>
                <p>Cost: ${article.cost_in_credits}</p>
                <p>Films: <span id="${filmId}">Loading films...</span></p>
                <p>Pilots: <span id="${personId}"></span></p>
        <button aria-label="close" class="x">❌</button>
    `;
    const closeButton = dialog.querySelector('.x');
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation(); 
        dialog.close();
    });
    articleDiv.appendChild(dialog);
    articleDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        dialog.showModal();
    });
        newsContainer.appendChild(articleDiv);
        const filmsListString = await fetchFilmTitles(article.films);
        const filmsListElement = document.getElementById(filmId);
        if (filmsListElement) {
            filmsListElement.textContent = filmsListString; 
        }
        const peopleListString = await fetchPerson(article.pilots);
        const peopleListElement = document.getElementById(personId);
        if (peopleListElement) {
            peopleListElement.textContent = peopleListString; 
        }
    });
}