const API_KEY = 'b450e13820005d7e358ef780a0db8f67';

async function fetchAPI(page = 1) {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=pt-BR&page=${page}`);
        const data = await resposta.json();
        return data.results;
    } catch (error) {
        console.error(`Erro ao buscar o filme`, error);
    }
}

async function ResultadoFilmes() {
    try {
        const Filmes = await fetchAPI();
        console.log(Filmes)
        const DivFilmesLista = document.getElementById('ListaFilmes');

        Filmes.forEach(Filme => {
            const cardMovie = RenderizaFilmes(Filme);
            console.log(Filme)
            DivFilmesLista.appendChild(cardMovie); // Corrigido de appenChild para appendChild
        });

    } catch (error) {
        console.error('Erro ao exibir Filmes', error);
    }
}

function RenderizaFilmes(Filme) {
    const { title, overview, poster_path } = Filme;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('movie-card');
    const cardDiv2 = document.createElement('div');
    cardDiv2.classList.add('movie-card-text');

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    posterImg.alt = title;

    const overviewElement = document.createElement('p');
    overviewElement.textContent = overview;

    cardDiv2.appendChild(titleElement);
    cardDiv2.appendChild(overviewElement);
    cardDiv.appendChild(posterImg);
    cardDiv.appendChild(cardDiv2);

    return cardDiv;
}

ResultadoFilmes();
