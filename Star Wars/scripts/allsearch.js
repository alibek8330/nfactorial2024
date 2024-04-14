async function searchFunction(event) {
    event.preventDefault();
    const input = document.getElementById('searchInput').value.toLowerCase();
    searchBySubstring(input);
}

async function fetchPlanets(planetsUrl) {
    try {
        const response = await axios.get(`${planetsUrl}?format=json`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching:', error);
    }
}


async function fetchPlanet(planetsUrls) {    
    if (!planetsUrls || planetsUrls.length === 0) {
        return 'N/A';
    }

    const planets = [];
    for (const url of planetsUrls) {
        try {
            const planet = await fetchPlanets(url);
            planets.push(planet);
        } catch (error) {
            console.error('Ошибка при запросе к:', url, error);
        }
    }
    return planets.join(', ') || 'N/A';
}

async function fetchPeople(personUrl) {
    try {
        const response = await axios.get(`${personUrl}?format=json`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function fetchPerson(peopleUrls) {
    if (!peopleUrls || peopleUrls.length === 0) {
        return 'N/A';
    }

    const people = [];
    for (const url of peopleUrls) {
        try {
            const person = await fetchPeople(url);
            people.push(person);
        } catch (error) {
            console.error('Ошибка при запросе к:', url, error);
        }
    }
    return people.join(', ') || 'N/A';
}

async function fetchFilm(filmUrl) {
    try {
        const response = await axios.get(`${filmUrl}?format=json`);
        return response.data.title;
    } catch (error) {
        console.error('Error fetching:', error);
    }
}

async function fetchFilmTitles(filmUrls) {
    if (!filmUrls || filmUrls.length === 0) {
        return 'N/A';
    }

    const titles = [];
    for (const url of filmUrls) {
        try {
            const title = await fetchFilm(url);
            titles.push(title);
        } catch (error) {
            console.error('Ошибка при запросе к:', url, error);
        }
    }
    return titles.join(', ') || 'N/A';
}

async function fetchHomeworld(homeworldUrl) {
    if (!homeworldUrl) {
        return 'N/A';
    }
    try {
        const response = await axios.get(`${homeworldUrl}?format=json`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'N/A';
    }
}


async function fetchSpecy(speciesUrls) {
    if (!speciesUrls || speciesUrls.length === 0) {
        return 'N/A';
    }
    try {
        const response = await axios.get(`${speciesUrls}?format=json`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'N/A';
    }
}


async function searchBySubstring(letter) {
    try {
        const responses = [];
        const urls = ['https://swapi.dev/api/films/?format=json', 'https://swapi.dev/api/people/?format=json', 'https://swapi.dev/api/species/?format=json', 'https://swapi.dev/api/planets/?format=json', 'https://swapi.dev/api/starships/?format=json', 'https://swapi.dev/api/vehicles/?format=json'];
        for (const url of urls) {
            if ('https://swapi.dev/api/people/?format=json' === url){
                for (let i = 1; i < 10; i++) {
                        const response = await axios.get(`https://swapi.dev/api/people/?page=${i}&format=json`);
                        responses.push(...response.data.results);
                }
            } 
            else if ('https://swapi.dev/api/planets/?format=json' === url ){
                for (let i = 1; i < 7; i++) {
                    const response = await axios.get(`https://swapi.dev/api/planets/?page=${i}&format=json`);
                    responses.push(...response.data.results);
                }
            }
            else if ('https://swapi.dev/api/vehicles/?format=json' === url ){
                for (let i = 1; i < 5; i++) {
                    const response = await axios.get(`https://swapi.dev/api/vehicles/?page=${i}&format=json`);
                    responses.push(...response.data.results);
                }
            }
            else if ('https://swapi.dev/api/species/?format=json' === url ){
                for (let i = 1; i < 5; i++) {
                    const response = await axios.get(`https://swapi.dev/api/species/?page=${i}&format=json`);
                    responses.push(...response.data.results);
                }
            }
            else if ('https://swapi.dev/api/starships/?format=json' === url ){
                for (let i = 1; i < 5; i++) {
                    const response = await axios.get(`https://swapi.dev/api/starships/?page=${i}&format=json`);
                    responses.push(...response.data.results);
                }

            }
            else{
                const response = await axios.get(url);
                responses.push(...response.data.results);
            }
        }
        const articles = responses.filter(item =>
            item.name?.toLowerCase().includes(letter.toLowerCase()) ||
            item.title?.toLowerCase().includes(letter.toLowerCase())
        );
        displayArticlesALL(articles);
    } catch (error) {
        console.error('Error in searchBySubstring:', error);
    }
}

async function displayArticlesALL(articles) {
    const allcontainer = document.getElementById('content');
    allcontainer.innerHTML = '';

    if (articles.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.classList.add('no-results');
        noResultsDiv.textContent = 'There is no information by your response.';
        noResultsDiv.style.color = 'white';
        noResultsDiv.style.fontSize = '20px';
        noResultsDiv.style.fontFamily = 'Arial, sans-serif';
        allcontainer.appendChild(noResultsDiv);
    } else {
        articles.forEach(async (article, index) => {
            const articleDiv = document.createElement('div'); 
            articleDiv.classList.add('content-item');
            const filmId = `filmsList-${index}`;
            const personId = `peopleList-${index}`;
            const speciesId = `speciesList-${index}`;
            const planetId = `planetsList-${index}`;
            const residentsId = `residentsList-${index}`;
            const starshipId = `starchipsList-${index}`;
            const homeworldName = await fetchHomeworld(article.homeworld);
            const specyName = await fetchSpecy(article.species);
            const title = article.title || article.name;
            articleDiv.innerHTML = `<div><h2>${title}</h2></div>`;
            const dialog = document.createElement('dialog');
            let details = '';
            if (article.episode_id) { // Фильмы
                details = `
                    <p>Opening Crawl: ${article.opening_crawl}</p>
                    <p>Episode: ${article.episode_id}</p>
                    <p>Release Date: ${article.release_date}</p>
                    <p>Director: ${article.director}</p>
                    <p>Producer: ${article.producer}</p>
                    <p>Characters: <span id="${personId}"></span>Loading...</p>
                    <p>Planets: <span id="${planetId}"></span>Loading...</p>
                    <p>Species: <span id="${speciesId}"></span>Loading...</p>
                `;
            } else if (article.climate) { // Планеты
                details = `
                    <p>Climate: ${article.climate}</p>
                    <p>Terrain: ${article.terrain}</p>
                    <p>Population: ${article.population}</p>
                    <p>Diameter: ${article.diameter}</p>
                    <p>Gravity: ${article.gravity}</p>
                    <p>Rotation Period: ${article.rotation_period}</p>
                    <p>Surface Water: ${article.surface_water}</p>
                    <p>Residents: <span id="${residentsId}">Loading..</span></p>
                    <p>Films: <span id="${filmId}"></span>Loading...</p>
                `;
            } else if (article.designation) { // Виды существ
                details = `
                <p>Classification: ${article.classification}</p>
                <p>Designation ${article.designation}</p>
                <p>Language: ${article.language}</p>
                <p>Average Height: ${article.average_height}</p>
                <p>Average Lifespan: ${article.average_lifespan}</p>
                <p>Skin Colors: ${article.skin_colors}</p>
                <p>Hair Colors: ${article.hair_colors}</p>
                <p>Eye Colors: ${article.eye_colors}</p>
                <p>Homeworld: ${homeworldName}</p>
                <p>People: <span id="${personId}">Loading...</span></p>
                <p>Films: <span id="${filmId}">Loading...</span></p>
                `;
            } else if (article.manufacturer) { // Звездные корабли и транспорт
                details = `
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
                <p>Films: <span id="${filmId}">Loading...</span></p>
                <p>Pilots: <span id="${personId}">Loading...</span></p>
                `;
            } else if (article.gender) { // Персонажи
                details = `
                    <p>Gender: ${article.gender}</p>
                    <p>Birth Year: ${article.birth_year}</p>
                    <p>Height: ${article.height}</p>
                    <p>Mass: ${article.mass}</p>
                    <p>Homeworld: ${homeworldName}</p>
                    <p>Species: ${specyName}</p>
                    <p>Films: <span id="${filmId}"></span>Loading...</p>
                    <p>Starchips: <span id="${starshipId}"></span>Loading...</p>
                `;
            }
            const dialogContent = `
                <h2>${title}</h2>
                ${details}
                <button aria-label="close" class="x">❌</button>
            `;
            dialog.innerHTML = dialogContent;
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
            allcontainer.appendChild(articleDiv);
            const filmsListString = await fetchFilmTitles(article.films);
            const filmsListElement = document.getElementById(filmId);
            if (filmsListElement) {
                filmsListElement.textContent = filmsListString; 
            }
            const peopleListString = await fetchPerson(article.characters);
            const peopleListElement = document.getElementById(personId);
            if (peopleListElement) {
                peopleListElement.textContent = peopleListString; 
            }
            const planetsListString = await fetchPlanet(article.planets);
            const planetsListElement = document.getElementById(planetId);
            if (planetsListElement) {
                planetsListElement.textContent = planetsListString; 
            }
            const speciesListString = await fetchSpecy(article.species);
            const speciesListElement = document.getElementById(speciesId);
            if (speciesListElement) {
                speciesListElement.textContent = speciesListString; 
            }
            const starshipsListString = await fetchStarship(article.starships);
            const starshipsListElement = document.getElementById(starshipId);
            if (starshipsListElement) {
                starshipsListElement.textContent = starshipsListString; 
            }
            const residentsListString = await fetchPerson(article.residents);
            const residentsListElement = document.getElementById(residentsId);
            if (residentsListElement) {
                residentsListElement.textContent = residentsListString; 
            }
        });
    }
}



