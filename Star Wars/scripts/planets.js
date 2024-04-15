async function get_planets() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = ''; 
    try {
        for (let i = 1; i < 7; i++) {
            const response = await axios.get(`https://swapi.dev/api/planets/?page=${i}&format=json`);
            displayArticles3(response.data.results);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function displayArticles3(articles) {
    const newsContainer = document.getElementById('content');
    
    articles.forEach(async (article, index) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('content-item');
    const residentsId = `residentsList-${index}`;
    const filmId = `filmsList-${index}`
    articleDiv.innerHTML = `
        <div>
            <h2>${article.name}</h2>
            <p>Climate: ${article.climate}</p>
            <p>Terrain: ${article.terrain}</p>
            <p>Population: ${article.population}</p>
            <p>Diameter: ${article.diameter}</p>
            <p>Gravity: ${article.gravity}</p>
        </div>
    `;
    const residentsListString = await fetchResident(article.residents);
    const filmsListString = await fetchFilmTitles(article.films);
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <h2>${article.name}</h2>
            <p>Climate: ${article.climate}</p>
            <p>Terrain: ${article.terrain}</p>
            <p>Population: ${article.population}</p>
            <p>Diameter: ${article.diameter}</p>
            <p>Gravity: ${article.gravity}</p>
            <p>Rotation Period: ${article.rotation_period}</p>
            <p>Surface Water: ${article.surface_water}</p>
            <p>Residents: ${residentsListString}</p>
            <p>Films: ${filmsListString}</p>
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
    
        const residentsListElement = document.getElementById(residentsId);
        if (residentsListElement) {
            residentsListElement.textContent = residentsListString; 
        }
    
            const filmsListElement = document.getElementById(filmId);
            if (filmsListElement) {
                filmsListElement.textContent = filmsListString; 
            }
});

}
