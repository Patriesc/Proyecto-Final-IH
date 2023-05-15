// Obtener la url en la api del Pokemon de la URL de la página
const urlParams = new URLSearchParams(window.location.search)
const pokemonUrl = urlParams.get('url')

console.log(pokemonUrl)
// Obtener los elementos HTML
const pokemonImage = document.getElementById('pokemon-image')
const pokemonName = document.getElementById('pokemon-name')
const pokemonType = document.getElementById('pokemon-type')
const pokemonAbilities = document.getElementById('pokemon-abilities')
const pokemonMoves = document.getElementById('pokemon-moves')
const randomButton = document.getElementById('random-button')

// Obtener los detalles del Pokemon desde la API
fetch(pokemonUrl)
  .then((response) => response.json())
  .then((data) => {
    // Actualizar la imagen del Pokemon
    pokemonImage.src = data.sprites.other.dream_world.front_default
    pokemonImage.alt = data.name

    // Actualizar el nombre del Pokemon
    pokemonName.textContent = data.name

    // Actualizar los tipos del Pokemon
    const types = data.types.map((type) => type.type.name)
    pokemonType.textContent = `Type: ${types.join(', ')}`

    // Actualizar las habilidades del Pokemon
    const abilities = data.abilities.map((ability) => ability.ability.name)
    pokemonAbilities.innerHTML = `<strong>Abilities:</strong> ${abilities.join(', ')}`

    // Actualizar los movimientos del Pokemon
    const moves = data.moves.slice(0, 5).map((move) => move.move.name)
    pokemonMoves.innerHTML = `<strong>Moves:</strong> ${moves.join(', ')}`
  })
  .catch((error) => console.log(error))

randomButton.addEventListener('click', () => {
  const randomPokemonIndex = Math.floor(Math.random() * 649)
  const randomPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex + 1}`
  window.location.href = `pokemon.html?url=${randomPokemonUrl}`
})
