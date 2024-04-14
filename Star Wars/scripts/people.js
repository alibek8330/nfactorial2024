async function get_person() {
    const newsContainer = document.getElementById('content');
    newsContainer.innerHTML = ''; 
    try {
        for (let i = 1; i < 10; i++) {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${i}&format=json`)
        displayArticles2(response.data.results);
        }
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function displayArticles2(articles) {
    const newsContainer = document.getElementById('content');
    articles.forEach(async (article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('content-item');
        const filmId = `filmsList-${index}`;
        const specyName = await fetchSpecy(article.species);
        const starshipId = `starchipsList-${index}`;
        articleDiv.innerHTML = `
                <div>
                    <h2>${article.name}</h2>
                    <p>Birth Year: ${article.birth_year || 'N/A'}</p>
                    <p>Gender: ${article.gender}</p>
                    <p>Height: ${article.height}</p>
                    <p>Mass: ${article.mass}</p>
                </div>
            `;
        const homeworldName = await fetchHomeworld(article.homeworld);
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
                <h2>${article.name}</h2>
                <p>Gender: ${article.gender}</p>
                <p>Birth Year: ${article.birth_year}</p>
                <p>Height: ${article.height}</p>
                <p>Mass: ${article.mass}</p>
                <p>Homeworld: ${homeworldName}</p>
                <p>Species: ${specyName}</p>
                <p>Films: <span id="${filmId}"></span>Loading...</p>
                <p>Starchips: <span id="${starshipId}"></span>Loading...</p>
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
        const filmsListElement = document.getElementById(articleId);
        if (filmsListElement) {
            filmsListElement.textContent = filmsListString;
        }
        const starshipsListString = await fetchStarship(article.starships);
            const starshipsListElement = document.getElementById(starshipId);
            if (starshipsListElement) {
                starshipsListElement.textContent = starshipsListString; 
            }
    });
}




