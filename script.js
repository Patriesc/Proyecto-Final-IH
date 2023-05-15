const searchBar = document.getElementById('search-bar')
const randomButton = document.getElementById('random-button')
const pokemonList = document.getElementById('pokemon-list')
const pageLogo = document.getElementById('page-logo')

// Get a list of all Pokemon
const getAllPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((response) => response.json())
    .then((data) => {
      const pokemon = data.results
      pokemonList.innerHTML = pokemon
        .map(
          (p) => `<li class="pokemon-card" data-url="${p.url}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          p.url.split('/')[6]
        }.png" alt="${p.name}">
        <h2>${p.name}</h2>
      </li>`,
        )
        .join('')
    })
}

getAllPokemon()

// Handle search bar input
searchBar.addEventListener('keyup', (e) => {
  const searchQuery = e.target.value.toLowerCase()
  const pokemonCards = pokemonList.querySelectorAll('.pokemon-card')
  pokemonCards.forEach((card) => {
    const pokemonName = card.querySelector('h2').textContent.toLowerCase()
    if (pokemonName.indexOf(searchQuery) !== -1) {
      card.style.display = 'block'
    } else {
      card.style.display = 'none'
    }
  })
})

// Handle random button click
randomButton.addEventListener('click', () => {
  const randomPokemonIndex = Math.floor(Math.random() * 151)
  const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex + 1}`
  fetch(randomPokemonUrl)
    .then((response) => response.json())
    .then((data) => {
      const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        type: data.types[0].type.name,
        abilities: data.abilities.map((a) => a.ability.name),
        moves: data.moves.slice(0, 4).map((m) => m.move.name),
      }
      const pokemonCard = `
        <li class="pokemon-card">
          <img src="${pokemon.image}" alt="${pokemon.name}">
          <h2>${pokemon.name}</h2>
          <p>Type: ${pokemon.type}</p>
          <p>Abilities: ${pokemon.abilities.join(', ')}</p>
          <p>Moves: ${pokemon.moves.join(', ')}</p>
        </li>
      `
      pokemonList.innerHTML = pokemonCard
    })
})

// Handle Pokemon card click
pokemonList.addEventListener('click', (e) => {
  const pokemonCard = e.target.closest('.pokemon-card')
  if (pokemonCard) {
    const pokemonUrl = pokemonCard.getAttribute('data-url')
    fetch(pokemonUrl)
      .then((response) => response.json())
      .then((data) => {
        const pokemon = {
          name: data.name,
          image: data.sprites.front_default,
          type: data.types[0].type.name,
          abilities: data.abilities.map((a) => a.ability.name),
          moves: data.moves.slice(0, 4).map((m) => m.move.name),
        }
        const pokemonCard = `
          <li class="pokemon-card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Type: ${pokemon.type}</p>
            <p>Abilities: ${pokemon.abilities.join(', ')}</p>
            <p>Moves: ${pokemon.moves.join(', ')}</p>
          </li>
        `
        pokemonList.innerHTML = pokemonCard
      })
  }
})

pageLogo.addEventListener('click', () => {
  getAllPokemon()
})
