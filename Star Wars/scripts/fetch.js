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