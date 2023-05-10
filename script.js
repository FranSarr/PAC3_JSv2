


async function fetchRandomPokemon() {
    const maxNumofPokemons = 1010;
    const pokemonId = Math.floor(Math.random() * maxNumofPokemons) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
    }
    
    

    // I use Set instead of Array for avoiding duplicates in the fetched Pokemons
    const promises = new Set();
    while (promises.size < 10) {
    promises.add(fetchRandomPokemon());
    }

    
    Promise.all(promises)
    .then(results => {
      results.forEach((pokemon) => {
        const out = document.querySelector('#cards'); // seleccionar el body y guardar-lo en una variable
        const temp = document.getElementById('template'); // seleccionar el template i guardar-lo en una variable
        const clonedTemplate = temp.content.cloneNode(true); // clonar el template

        let card = clonedTemplate.querySelector('.card');
        let randomFact = clonedTemplate.querySelector('.fact'); // seleccionar el p i guardar-lo en una variable
        let img = clonedTemplate.querySelector('img'); // seleccionar la img i guardar-la en una variable
        let label = clonedTemplate.querySelector('label'); // seleccionar la label i guardar-la una variable
        let check = clonedTemplate.querySelector('input'); // seleccionar el checkbox i guardar-lo en una variable

        card.setAttribute('id', pokemon.id); // assigna l'id rebut de la API
        randomFact.textContent = pokemon.name; // assigna el text rebut de la API
        img.setAttribute('src', pokemon.sprites.front_default);
        label.setAttribute('for', `check-${pokemon.id}`); // assigna a l'atribut for l'id rebut de la API amb el prefix "check-", per enllaçar-lo al checkbox
        check.setAttribute('id', `check-${pokemon.id}`); // assigna l'id rebut de la API amb el prefix "check-", per evitar duplicat amb l'id de l'article
 
        out.appendChild(clonedTemplate); // afegeix el clon amb tota la informació al section id="cards"
        
        //   const card = document.createElement("div");
      //   card.classList.add("card");
      //   card.setAttribute("id", `pokemon-container-$(i)`);
      //   card.setAttribute("data-index",i);
  
      //   const name = document.createElement("h2");
      //   name.textContent = pokemon.name;
  
      //   const image = document.createElement("img");
      //   image.src = pokemon.sprites.front_default;
      //   image.setAttribute("alt", pokemon.name);
  
      //   card.appendChild(name);
      //   card.appendChild(image);
      //   container.appendChild(card);

      });

      
      

    })
    .catch(error => console.error(error));
  
    

    container.addEventListener("click", event => {
      const card = event.target.closest(".card");
      if (card) {
        const pokemon = results[card.getAttribute("data-index")];
        const pokemonId = pokemon.id;
        const baseURL = window.location.origin;
        const new_url = `${baseURL}?PokeId=${pokemonId}`;
        window.location.href = new_url; // Navigate to the URL
      }
    });

    // Get the PokeId parameter from the URL

    const urlParams = new URLSearchParams(window.location.search);
    const pokeId = urlParams.get('PokeId');

if (pokeId) {
  console.log(pokeId);
  // If the PokeId parameter exists, generate the new page with information
  // and display it to the user.
  // ...
} else {
  // If the PokeId parameter does not exist, show the standard page.
  // ...
}
  
   