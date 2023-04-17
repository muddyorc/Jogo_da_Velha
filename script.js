const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

// Define uma matriz multidimensional
let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// Define as variáveis "xWins", "oWins" e "draws"
let xWins = 0;
let oWins = 0;
let draws = 0;

// Define a função "init", que inicializa o jogo com valores padrão
function init() {
 
  selected = [];
  currentPlayer.innerHTML = `Vez do Jogador: ${player}`;

  // Seleciona todos os botões do jogo e define seu texto como vazio
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

// Chama a função "init" para inicializar o jogo
init();

function newMove(e) {
  // Obtém o índice do botão clicado
  const index = e.target.getAttribute("data-i");
  
  // Define o texto do botão clicado
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);

  // Adiciona a posição selecionada ao array "selected"
  selected[index] = player;

  setTimeout(() => {
    check();
  }, [100]);

  // Alterna o jogador atual entre "X" e "O"
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Seleciona os elementos HTML que mostrarão o resultado do jogo e o número de vitórias e empates
const result = document.querySelector("#result");
const player1Wins = document.querySelector("#player1Wins");
const player2Wins = document.querySelector("#player2Wins");
const drawCounter = document.querySelector("#draws");

// Define a função "check" que verifica se algum jogador ganhou ou se houve um empate
function check() {
  // Define quem foi o último jogador a jogar
  let playerLastMove = player === "X" ? "O" : "X";

  // Cria um array com os índices das jogadas do último jogador
  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    // Verifica todas as posições de uma linha
    if (pos.every((item) => items.includes(item))) {
      // Exibe mensagem informando o vencedor
      result.textContent = `O JOGADOR ${playerLastMove} GANHOU!`;

      if (playerLastMove === "X") {
        xWins++;
        player1Wins.textContent = `Vitórias de X: ${xWins}`;
      } else {
        oWins++;
        player2Wins.textContent = `Vitórias de O: ${oWins}`;
      }

      // Reinicia o jogo
      init();
      return;
    }
  }

  if (selected.filter((item) => item).length === 9) {

    result.textContent = "Ocorreu um Empate!";
    draws++;
    drawCounter.textContent = `Empates: ${draws}`;
    // Reinicia o jogo
    init();
    return;
  }
}

