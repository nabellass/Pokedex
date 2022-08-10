async function getData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
        method: "GET"
    });
  
    const json = await response.json();
    const results = json.results;
    
    let uicard = '';
    for (let i = 0; i < results.length; i++) {
        const url2 = await fetch(results[i].url, {
            method: "GET"
        })

        const pokemon = await url2.json();

        // // pokemon background colors
        const colors = {
            fire: '#FDDFDF',
            grass: '#DEFDE0',
            electric: '#FCF7DE',
            water: '#DEF3FD',
            ground: '#f4e7da',
            rock: '#d5d5d4',
            fairy: '#fceaff',
            poison: '#98d7a5',
            bug: '#f8d5a3',
            dragon: '#97b3e6',
            psychic: '#eaeda1',
            flying: '#F5F5F5',
            fighting: '#E6E0D4',
            normal: '#F5F5F5'
        };

        const main_types = Object.keys(colors);

        const pokeBack = document.createElement('div');
        pokeBack.classList.add('pokemon');

        let id = pokemon.id;
        let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        let poke_types = pokemon.types.map(type => type.type.name);
        let type = main_types.find(type => poke_types.indexOf(type) > -1);
        let image = pokemon.sprites.front_default;
        let color = colors[type];

        pokeBack.style.backgroundColor = color;

        uicard += `
            <div class="poke-thumbnail ${color} ">
                <div class="img-container">
                    <img src="${image}" class="card-img-top" alt="${name}">
                </div>
                <div class="poke-info">
                    <span class="number">#${id.toString().padStart(3, '0')}</span>
                    <h3 class="name">${name}</h3>
                    <small class="type">Type: <span>${type}</span></small>
                </div>
            </div>
        `;
    }
    
    document.getElementById("uicard").innerHTML = uicard;
}
