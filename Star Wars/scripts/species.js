async function get_species() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = ''; 
    try {
        for (let i = 1; i < 5; i++) {
            const response = await axios.get(`https://swapi.dev/api/species/?page=${i}&format=json`);
            displayArticles4(response.data.results);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function displayArticles4(articles) {
    const newsContainer = document.getElementById('content');
    articles.forEach(async (article, index) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('content-item');
    const articleId = `peopleList-${index}`;
    const article2Id = `filmsList-${index}`;
    const homeworldName = await fetchHomeworld(article.homeworld);
    articleDiv.innerHTML = `
        <div>
            <h2>${article.name}</h2>
            <p>Classification: ${article.classification}</p>
            <p>Designation ${article.designation}</p>
            <p>Language: ${article.language}</p>
        </div>
    `;
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <h2>${article.name}</h2>
            <p>Classification: ${article.classification}</p>
            <p>Designation ${article.designation}</p>
            <p>Language: ${article.language}</p>
            <p>Average Height: ${article.average_height}</p>
            <p>Average Lifespan: ${article.average_lifespan}</p>
            <p>Skin Colors: ${article.skin_colors}</p>
            <p>Hair Colors: ${article.hair_colors}</p>
            <p>Eye Colors: ${article.eye_colors}</p>
            <p>Homeworld: ${homeworldName}</p>
            <p>People: <span id="${articleId}">Loading...</span></p>
            <p>Films: <span id="${article2Id}"></span></p>
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
    const peopleListString = await fetchPerson(article.people);
        const peopleListElement = document.getElementById(articleId);
        if (peopleListElement) {
            peopleListElement.textContent = peopleListString; 
        }
    const filmsListString = await fetchFilmTitles(article.films);
            const filmsListElement = document.getElementById(articleId);
            if (filmsListElement) {
                filmsListElement.textContent = filmsListString; 
            }
});

}
