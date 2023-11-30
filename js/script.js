document.getElementById("play").addEventListener("click", function () {
  createNewgame();
});

//CREO UNA FUNZIONE CHE MI GENERA IL CAMPO DA GIOCO
function createNewgame() {
  //RECUPERO L'ELEMENTO "GRIGLIA" DAL DOM
  const grid = document.getElementById("grid");
  const NUMBER_OF_BOMBS = 16;

  grid.innerHTML = "";

  const bombs = bombGenerator(NUMBER_OF_BOMBS);
  console.log(bombs);
  let points = 0;

  //CREO UNA FUNZIONE PER DETERMINARE LA CELLA
  function createdCell(numbers) {
    const element = document.createElement("div");
    element.classList.add("square");

    //AGGIUNGO UN PARAMETRO PER AGGIUNGERE I NUMERI DA INSERIRE ALL'INTERNO DEI QUADRATI
    element.innerText = numbers;

    return element;
  }

  //CREO UN CICLO "FOR" PER INSERIRE I QUADRATI
  for (let i = 1; i <= 100; i++) {
    //CREO LA CELLA
    let square = createdCell(i);

    //AGGIUNGO AI QUADRATI UNA FUNZIONE DI "CLICK"
    square.addEventListener("click", function () {
      
      // VERIFICA DELLA CASELLA CON E SENZA BOMBA
      if (!bombs.includes(i)) {
        this.classList.add("clicked");
        points++;

        document.getElementById(
          "score"
        ).innerText = `IL TUO PUNTEGGIO É: ${points}`;
      } else {
        this.classList.add("clicked-bomb");
      }
    });

    //APPENDO LA CELLA ALLA GRIGLIA
    grid.appendChild(square);
  }
}


//CREO UNA FUNZIONE CHE MI GENERI UN NUMERO RANDOMICO, E SE IL NUMERO NON É PRESENTE LO INSERISCE, ALTRIMENTI SE É PRESENTE NE GENERA UN'ALTRO
function generateRandomNumber(array_bombs) {
  let check_number = false;
  let randomInt;

  //CREO UN CICLO PER LA VERIFICA DELL'INSERIMENTO DEL NUMERO RANDOMICO.
  while (!check_number) {
    randomInt = Math.floor(Math.random() * 100 + 1);

    //VERIFICO LA CONDIZIONE
    if (!array_bombs.includes(randomInt)) {
      check_number = true;
    }
  }

  return randomInt;
}

//CREO UNA FUNZIONE CHE MI GENERA LE BOMBE
function bombGenerator(number_of_bombs) {
  //CREO UN ARREY VUOTO INIZIALE
  let bombs = [];

  for (let i = 0; i < number_of_bombs; i++) {
    bombs.push(generateRandomNumber(bombs));
  }

  return bombs;
}
