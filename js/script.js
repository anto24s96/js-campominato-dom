document.getElementById("play").addEventListener("click", function () {
  createNewgame();
});

//CREO UNA FUNZIONE CHE MI GENERA IL CAMPO DA GIOCO
function createNewgame() {
  //RECUPERO L'ELEMENTO "GRIGLIA" DAL DOM
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  const NUMBER_OF_BOMBS = 16;

  const difficulty = document.getElementById("difficulty");
  const level = parseInt(difficulty.value);

  let points = 0;

  let cells_number;
  let cells_per_row;

  //CREAZIONE DI UNO SWITCH PER GENERARE LE GRIGLIE DI VARIE DIMENSIONI
  switch (level) {
    case 1:
      cells_number = 100;
      break;
    case 2:
      cells_number = 81;
      break;
    case 3:
      cells_number = 49;
      break;
    default:
      alert("Devi selezionare il livello di gioco");
      break;
  }

  cells_per_row = Math.sqrt(cells_number);

  const bombs = bombGenerator(NUMBER_OF_BOMBS, cells_number);

  let gameOver = false;

  //CREO UNA FUNZIONE PER DETERMINARE LA CELLA
  function createdCell(numbers, cellsPerRow) {
    const element = document.createElement("div");
    element.classList.add("square");

    element.style.width = `calc(100% / ${cellsPerRow})`;
    element.style.height = element.style.width;

    //AGGIUNGO UN PARAMETRO PER AGGIUNGERE I NUMERI DA INSERIRE ALL'INTERNO DEI QUADRATI
    element.innerText = numbers;

    return element;
  }

  //CREO UN CICLO "FOR" PER INSERIRE I QUADRATI
  for (let i = 1; i <= cells_number; i++) {
    //CREO LA CELLA
    let square = createdCell(i, cells_per_row);

    //AGGIUNGO AI QUADRATI UNA FUNZIONE DI "CLICK"
    square.addEventListener("click", function () {
      // VERIFICO SE IL GIOCO TERMINA
      if(!gameOver){
        if (!bombs.includes(i)) {
          this.classList.add("clicked");
          points++;
  
          document.getElementById("score").innerText = `YOUR SCORE: ${points}`;
        }      
        else {
          this.classList.add("clicked-bomb");
          gameOver = true;
        }
      }
    });

    //APPENDO LA CELLA ALLA GRIGLIA
    grid.appendChild(square);
  }
}

//CREO UNA FUNZIONE CHE MI GENERI UN NUMERO RANDOMICO, E SE IL NUMERO NON É PRESENTE LO INSERISCE, ALTRIMENTI SE É PRESENTE NE GENERA UN'ALTRO
function generateRandomNumber(array_bombs, total_cells) {
  let check_number = false;
  let randomInt;

  //CREO UN CICLO PER LA VERIFICA DELL'INSERIMENTO DEL NUMERO RANDOMICO.
  while (!check_number) {
    randomInt = Math.floor(Math.random() * total_cells + 1);

    //VERIFICO LA CONDIZIONE
    if (!array_bombs.includes(randomInt)) {
      check_number = true;
    }
  }

  return randomInt;
}

//CREO UNA FUNZIONE CHE MI GENERA LE BOMBE
function bombGenerator(number_of_bombs, total_cells) {
  //CREO UN ARREY VUOTO INIZIALE
  let bombs = [];

  for (let i = 0; i < number_of_bombs; i++) {
    bombs.push(generateRandomNumber(bombs, total_cells));
  }

  return bombs;
}
