async function get_vehicle() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = ''; 
    try {
        for (let i = 1; i < 5; i++) {
            const response = await axios.get(`https://swapi.dev/api/vehicles/?page=${i}&format=json`);
            displayArticles6(response.data.results);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
}


function displayArticles6(articles) {
    const newsContainer = document.getElementById('content');
    articles.forEach(async (article, index)=> {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('content-item');
        const filmId = `filmsList-${index}`;
        const personId = `peopleList-${index}`;
        articleDiv.innerHTML = `
            <div>
                <h2>${article.name}</h2>
                <p>Model: ${article.model}</p>
                <p>Class: ${article.vehicle_class}</p>
                <p>Manufacturer: ${article.manufacturer}</p>
            </div>
        `;
         const peopleListString = await fetchPilot(article.pilots);
        const filmsListString = await fetchFilmTitles(article.films);
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
                <p>Films: ${filmsListString}</p>
                <p>Pilots: ${peopleListString}</p>
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
       
        const peopleListElement = document.getElementById(personId);
        if (peopleListElement) {
            peopleListElement.textContent = peopleListString; 
        }
        
        const filmsListElement = document.getElementById(filmId);
        if (filmsListElement) {
            filmsListElement.textContent = filmsListString; 
        }
    });
}
