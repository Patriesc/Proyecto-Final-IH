const searchBar = document.getElementById('search-bar')
const randomButton = document.getElementById('random-button')
const pokemonList = document.getElementById('pokemon-list')
const pageLogo = document.getElementById('page-logo')
const genSelect = document.getElementById('generation-select')

// Mostrar a todos los pokemon
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

// Manejar el input de la barra de búsqueda
searchBar.addEventListener('keyup', (e) => {
  const searchQuery = e.target.value.toLowerCase()
  const pokemonCards = pokemonList.querySelectorAll('.pokemon-card')
  pokemonCards.forEach((card) => {
    const pokemonName = card.querySelector('h2').textContent.toLowerCase()
    if (pokemonName.indexOf(searchQuery) !== -1) {
      card.style.display = 'flex'
    } else {
      card.style.display = 'none'
    }
  })
})

// Selección aleatoria de Pokemon
randomButton.addEventListener('click', () => {
  const randomPokemonIndex = Math.floor(Math.random() * 151)
  const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex + 1}`
  window.location.href = `pokemon.html?url=${randomPokemonUrl}`
})

// Seleccionar un Pokemon
pokemonList.addEventListener('click', (e) => {
  const pokemonCard = e.target.closest('.pokemon-card')
  console.log(pokemonCard)
  if (pokemonCard) {
    const pokemonUrl = pokemonCard.getAttribute('data-url')
    window.location.href = `pokemon.html?url=${pokemonUrl}`
  }
})

// Mostrar a todos los Pokemon al pulsar el logo
pageLogo.addEventListener('click', () => {
  getAllPokemon()
})

// Cambiar la lista de Pokemon según la generación
genSelect.addEventListener('change', updatePokemonList)
function updatePokemonList() {
  const selectedGen = genSelect.value
  let limit = 151
  let offset = 0

  switch (selectedGen) {
    case '1':
      limit = 151
      offset = 0
      break
    case '2':
      limit = 100
      offset = 151
      break
    case '3':
      limit = 135
      offset = 251
      break
    case '4':
      limit = 107
      offset = 386
      break
    case '5':
      limit = 156
      offset = 493
      break
  }

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

  fetch(url)
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
