//Bucle Fectch

const getCharacters = async () => {
  const pokedex = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const res = await response.json();
    pokedex.push(res);
  }
  return pokedex;
};

//Recoger cualidades
const mappedCharacters = (characters) => {
  return characters.map((character) => ({
    name: character.name,
    image: character.sprites["front_default"],
    image2: character.sprites.versions['generation-v']['black-white'].animated.front_default,
    type: character.types.map((type) => type.type.name),
    id: character.id,
    height: character.height,
    weight: character.weight,
    stats: character.stats,
  }));
};

//Pintar mis cualidades
const main$$ = document.querySelector(".main");
const drawCharacters = (characters) => {
  main$$.innerHTML = "";
  for (const character of characters) {
    let characterFigure$$ = document.createElement("figure");
    characterFigure$$.setAttribute("class", "figure");
    characterFigure$$.setAttribute("id", character.type[0]);
    // characterFigure$$.addEventListener("click", () =>
    //   toggleZoomCharacter(character)
    // );
    characterFigure$$.innerHTML = `
    <div class="figurebox-1">  
    <img src="${character.image}" alt="${character.name}" class = "sprite"> 
    <p class="id">Nº${character.id}</p>
      <h2 class="name">${character.name
        .toUpperCase()
        .charAt(0)}${character.name.substring(1)}</h2>
      <div class = type>
      <p class="type${character.type[0]}">${character.type[0].toUpperCase()}</p>
      ${
        character.type[1]
          ? `<p class="type${
              character.type[1]
            }">${character.type[1].toUpperCase()}</p>`
          : ""
      }
      </div>
    </div> 
  `;
    characterFigure$$.addEventListener("click", () => {
      // Crear un div con fondo blanco
      let detailsDiv$$ = document.createElement("div");
      detailsDiv$$.classList.add("details");
      detailsDiv$$.innerHTML = ` 
    <div class ="detailbx">
    <button class="close-btn">RETURN</button>
    <img class="image2" src="${character.image2}" alt="${character.name}">
    <p class="iddet">Nº${character.id}</p> 
    <h2 class="namedetail">${character.name
      .toUpperCase()
      .charAt(0)}${character.name.substring(1)}</h2>
      <div class = detailtypes>
      <p class="type${character.type[0]}">${character.type[0].toUpperCase()}</p>
      ${
        character.type[1]
          ? `<p class="type${
              character.type[1]
            }">${character.type[1].toUpperCase()}</p>`
          : ""
      }
      </div>
      <div class="info">
      <p class ="infodat">HEIGHT: ${character.height}cm</p>
      <p class ="infodat">WEIGHT: ${character.weight}kg</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[0].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[0].base_stat}px"></div>
      <p class = "stat">${character.stats[0].base_stat}</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[1].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[1].base_stat}px"></div>
      <p class = "stat">${character.stats[1].base_stat}</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[2].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[2].base_stat}px"></div>
      <p class = "stat">${character.stats[2].base_stat}</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[3].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[3].base_stat}px"></div>
      <p class = "stat">${character.stats[3].base_stat}</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[4].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[4].base_stat}px"></div>
      <p class = "stat">${character.stats[4].base_stat}</p>
      </div>
      <div class="stats">
      <p class = "stat">${character.stats[5].stat.name.toUpperCase()}</p>
      <div class = "linebx"><hr class="type${character.type[0]}stat" style="width:${character.stats[5].base_stat}px"></div>
      <p class = "stat">${character.stats[5].base_stat}</p>
      </div>
    `;

      // Agregar el div de detalles al documento
      main$$.appendChild(detailsDiv$$);
      // Agregar evento para cerrar el div cuando se haga clic en el botón "X"
      const closeBtn$$ = detailsDiv$$.querySelector(".close-btn");
      closeBtn$$.addEventListener("click", () => {
        main$$.removeChild(detailsDiv$$);
        document.body.style.overflow = "auto"; // Restaurar el desplazamiento
      });
    });

    main$$.appendChild(characterFigure$$);
  }
};

const drawInput = (characters) => {
  // console.log(characters);
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
    searchCharacters(input$$.value, characters)
  );
};

const searchCharacters = (filter, characters) => {
  let filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log(filteredCharacters);
  drawCharacters(filteredCharacters);
};

const drawButton = (characters) => {
  const buttons$$ = document.querySelectorAll("button");
  buttons$$.forEach((button$$) => {
    button$$.addEventListener("click", () => {
      const inputValue = button$$.value;
      if (inputValue === "all") {
        // Limpiar los filtros
        drawCharacters(characters); // Mostrar todos los personajes
      } else {
        searchCharacters2(inputValue, characters);
      }
    });
  });
};

const searchCharacters2 = (filter, characters) => {
  let filteredCharacters2 = characters.filter(
    (character) =>
      character.type[0].includes(filter) ||
      (character.type[1] && character.type[1].includes(filter))
  );
  console.log(filteredCharacters2);
  drawCharacters(filteredCharacters2);
};

const sortCharactersDescending = (characters) => {
  const sortedCharacters = characters.slice().sort((a, b) => b.id - a.id);
  drawCharacters(sortedCharacters);
};

// Función para ordenar los personajes por ID de menor a mayor
const sortCharactersAscending = (characters) => {
  const sortedCharacters = characters.slice().sort((a, b) => a.id - b.id);
  drawCharacters(sortedCharacters);
};

//Init en paralelo de funciones
const init = async () => {
  const characters = await getCharacters();
  const mappeCharacter = mappedCharacters(characters);
  drawCharacters(mappeCharacter);
  drawInput(mappeCharacter);
  drawButton(mappeCharacter);

  // Obtener los botones
  const sortDescendingButton = document.getElementById("sortDescending");
  const sortAscendingButton = document.getElementById("sortAscending");

  // Agregar eventos de clic a los botones de ordenamiento
  sortDescendingButton.addEventListener("click", () =>
    sortCharactersDescending(mappeCharacter)
  );
  sortAscendingButton.addEventListener("click", () =>
    sortCharactersAscending(mappeCharacter)
  );
};
init();

//<img src="${character.image}" alt="${character.name}" class = "sprite">
