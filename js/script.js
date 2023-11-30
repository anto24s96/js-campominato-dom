//CREO UNA FUNZIONOA CHE MI GENERA IL CAMPO DA GIOCO
function createNewgame() {
  document.getElementById("grid").innerHTML = "";
}

document.getElementById("play").addEventListener("click", function () {
  createNewgame();

  //CREO UNA FUNZIONA PER DETERMINARE LA CELLA
  function createdCell(numbers) {
    const element = document.createElement("div");
    element.classList.add("square");

    //AGGIUNGO UN PARAMETRO PER AGGIUNGERE I NUMERI DA INSERIRE ALL'INTERNO DEI QUADRATI
    element.innerText = numbers;

    return element;
  }

  //RECUPERO L'ELEMENTO "GRIGLIA" DAL DOM
  const grid = document.getElementById("grid");

  //CREO UN CICLO "FOR" PER INSERIRE I QUADRATI
  for (let i = 0; i < 100; i++) {
    //CREO LA CELLA
    let square = createdCell(i + 1);

    //AGGIUNGO AI QUADRATI UNA FUNZIONE DI "CLICK"
    square.addEventListener("click", function () {
      this.classList.toggle("clicked");

      console.log(i + 1);
    });

    //APPENDO LA CELLA ALLA GRIGLIA
    grid.appendChild(square);
  }
});
