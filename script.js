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
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          p.url.split('/')[6]
        }.svg" alt="${p.name}">
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
  window.location.href = `pokemon.html?url=${randomPokemonUrl}`
})

// Handle Pokemon card click
pokemonList.addEventListener('click', (e) => {
  const pokemonCard = e.target.closest('.pokemon-card')
  console.log(pokemonCard)
  if (pokemonCard) {
    const pokemonUrl = pokemonCard.getAttribute('data-url')
    window.location.href = `pokemon.html?url=${pokemonUrl}`
  }
})

pageLogo.addEventListener('click', () => {
  getAllPokemon()
})
