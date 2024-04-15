async function get_films() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = '';
    try {
        const response = await axios.get(`https://swapi.dev/api/films/?format=json`);
        displayArticles1(response.data.results);
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function displayArticles1(articles) {
    const newsContainer = document.getElementById('content');
    articles.forEach(async (article, index) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('content-item');
    const articleId = `peopleList-${index}`;
    const article2Id = `planetsList-${index}`;
    articleDiv.innerHTML = `
        <div>
            <h2>${article.title}</h2>
            <p>Episode: ${article.episode_id}</p>
            <p>Created: ${article.release_date}</p>
            <p>Created by: ${article.director}</p>
        </div>
    `;
    const peopleListString = await fetchPerson(article.characters);
    const planetsListString = await fetchPlanet(article.planets);
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <h2>${article.title}</h2>
        <p>Opening crawl: ${article.opening_crawl}</p>
        <p>Episode: ${article.episode_id}</p>
        <p>Created: ${article.release_date}</p>
        <p>Created by: ${article.director}</p>
        <p>Producers: ${article.producer}</p>
        <p>Characters: ${peopleListString}</p>
        <p>Planets: ${planetsListString}</p>
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
    
        const peopleListElement = document.getElementById(articleId);
        if (peopleListElement) {
            peopleListElement.textContent = peopleListString; 
        }
        
        const planetsListElement = document.getElementById(article2Id);
        if (planetsListElement) {
            planetsListElement.textContent = planetsListString; 
        }
});

}


