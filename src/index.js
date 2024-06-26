import "./style.css";
import { Ship, GameBoard, Player } from "./models";

// const singleMode = document.getElementById("singlePlayer");
// const doubleMode = document.getElementById("twoplayers");
// const chooseGameScreen = document.querySelector(".chooseGame");
// const gameMode = document.getElementById("gameMode");
// const player1BoardHolder = document.getElementById("player1-board");
// const player2BoardHolder = document.getElementById("player2-board");

// // chooseGameScreen.classList.remove("active");
// // chooseGameScreen.classList.add("notActive");
// // gameMode.classList.add("active");

// let currentPlayer;
// let isGameOver = false;
// let firstTimeClicked = false;

// const playSingleMode = () => {
//   chooseGameScreen.classList.remove("active");
//   chooseGameScreen.classList.add("notActive");
//   gameMode.classList.add("active");

//   const [playerBoard, player1, compBoard, player2] = genereteGame();

//   const handleCompTurn = () => {
//     if (isGameOver) return;
//     player2BoardHolder.removeEventListener("click", handlePlayerTurn);
//     player1BoardHolder.classList.remove("disabled");
//     player2BoardHolder.classList.add("disabled");
//     const coordinates = playerBoard.randomAttack();
//     const x = coordinates[0];
//     const y = coordinates[1];
//     isGameOver = checkWinner(playerBoard, compBoard, isGameOver);

//     const isHitted = playerBoard.receiveAttack(x, y);
//     const cell = player1BoardHolder.querySelector(`#_${x}${y}`);

//     if (isHitted) {
//       cell.textContent = " ";
//       cell.textContent = "X";
//       cell.style.color = "red";
//     } else {
//       cell.textContent = " ";
//       cell.textContent = "0";
//       cell.style.color = "green";
//     }

//     currentPlayer = changeTurn(currentPlayer, player1, player2);
//     setTimeout(() => {
//       player1BoardHolder.classList.add("disabled");
//       player2BoardHolder.classList.remove("disabled");
//       player2BoardHolder.addEventListener("click", handlePlayerTurn);
//     }, 500);
//   };

//   const handlePlayerTurn = (e) => {
//     if (isGameOver) return;
//     const coordinates = e.target.id.slice(1, 3);
//     const x = coordinates[0];
//     const y = coordinates[1];
//     firstTimeClicked = true;
//     isGameOver = checkWinner(playerBoard, compBoard, isGameOver);

//     const isHitted = compBoard.receiveAttack(x, y);

//     if (isHitted) {
//       e.target.textContent = " ";
//       e.target.textContent = "X";
//       e.target.style.color = "red";
//     } else {
//       e.target.textContent = " ";
//       e.target.textContent = "0";
//       e.target.style.color = "black";
//     }
//     currentPlayer = changeTurn(currentPlayer, player1, player2);
//     setTimeout(handleCompTurn(), 2000);
//   };

//   player2BoardHolder.addEventListener("click", handlePlayerTurn);
//   //if (!firstTimeClicked) {
//   player1BoardHolder.classList.add("disabled");
//   player2BoardHolder.classList.remove("disabled");
//   //}
// };

// const genereteGame = () => {
//   const playerBoard = new GameBoard(10);
//   createBoard(player1BoardHolder, playerBoard.size);

//   const compBoard = new GameBoard(10);
//   createBoard(player2BoardHolder, compBoard.size);

//   const player1 = new Player(compBoard);
//   const player2 = new Player(playerBoard);
//   currentPlayer = player1;
//   //player1
//   playerBoard.placeShip(playerBoard.createShip(5), [1, 2], [1, 6]);
//   playerBoard.placeShip(playerBoard.createShip(4), [3, 1], [6, 1]);
//   playerBoard.placeShip(playerBoard.createShip(4), [9, 2], [9, 5]);
//   playerBoard.placeShip(playerBoard.createShip(3), [3, 6], [3, 8]);
//   playerBoard.placeShip(playerBoard.createShip(4), [5, 3], [5, 6]);
//   placeShips(playerBoard, player1BoardHolder);

//   //computer
//   compBoard.placeShip(compBoard.createShip(5), [0, 2], [0, 6]);
//   compBoard.placeShip(compBoard.createShip(3), [2, 1], [4, 1]);
//   compBoard.placeShip(compBoard.createShip(4), [7, 2], [7, 5]);
//   compBoard.placeShip(compBoard.createShip(3), [3, 6], [3, 8]);
//   compBoard.placeShip(compBoard.createShip(3), [3, 4], [5, 4]);
//   placeShips(compBoard, player2BoardHolder);

//   return [playerBoard, player1, compBoard, player2];
// };

// const changeTurn = (currentPlayer, player1, player2) => {
//   return currentPlayer === player1 ? player2 : player1;
// };

// //playSingleMode();

// singleMode.addEventListener("click", playSingleMode);
const singleModeBtn = document.getElementById("singlePlayer");
const chooseGameScreen = document.querySelector(".chooseGame");
const gameScreen = document.getElementById("gameMode");
const playerBoardHolder = document.getElementById("player1-board");
const computerBoardHolder = document.getElementById("player2-board");

const createBoard = (board, size) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      div.id = `_${i}${j}`;
      div.classList.add("cell");
      board.append(div);
      div.textContent = div.id;
    }
  }
};

const placeShips = (board, divBoard) => {
  const ships = board.getShips();
  ships.forEach((ship) => {
    for (let i = ship.start[0]; i <= ship.end[0]; i++) {
      for (let j = ship.start[1]; j <= ship.end[1]; j++) {
        const cell = divBoard.querySelector(`#_${i}${j}`);
        cell.classList.add("taken");
      }
    }
  });
};

const createShips = (playerBoard, compBoard) => {
  //player1
  playerBoard.addShip(playerBoard.createShip(5, [1, 2], [1, 6]));
  playerBoard.addShip(playerBoard.createShip(4, [3, 1], [6, 1]));
  playerBoard.addShip(playerBoard.createShip(4, [9, 2], [9, 5]));
  playerBoard.addShip(playerBoard.createShip(3, [3, 6], [3, 8]));
  playerBoard.addShip(playerBoard.createShip(4, [5, 3], [5, 6]));
  placeShips(playerBoard, playerBoardHolder);

  //computer
  compBoard.addShip(compBoard.createShip(5, [0, 2], [0, 6]));
  compBoard.addShip(compBoard.createShip(3, [2, 1], [4, 1]));
  compBoard.addShip(compBoard.createShip(4, [7, 2], [7, 5]));
  compBoard.addShip(compBoard.createShip(3, [3, 6], [3, 8]));
  compBoard.addShip(compBoard.createShip(3, [3, 4], [5, 4]));
  placeShips(compBoard, computerBoardHolder);
};

const generateGame = () => {
  const playerBoard = new GameBoard(10);
  createBoard(playerBoardHolder, playerBoard.size);

  const compBoard = new GameBoard(10);
  createBoard(computerBoardHolder, compBoard.size);

  const player = new Player(compBoard);
  const compPlayer = new Player(playerBoard);

  createShips(playerBoard, compBoard);

  return [player, playerBoard, compPlayer, compBoard];
};

const checkWinner = (playerBoard, compBoard) => {
  let isGameOver = false;
  if (compBoard.isGameOver()) {
    console.log("Computer lost!");
    isGameOver = true;
  }
  if (playerBoard.isGameOver()) {
    console.log("Player lost!");
    isGameOver = true;
  }

  return isGameOver;
};

const singleModeGame = () => {
  chooseGameScreen.classList.remove("active");
  chooseGameScreen.classList.add("notActive");
  gameScreen.classList.add("active");
  const [player, playerBoard, compPlayer, compBoard] = generateGame();
  let currentPlayer = player;
  let start = true;

  const handleComputerTurn = () => {
    computerBoardHolder.classList.add("disabled");
    playerBoardHolder.classList.remove("disabled");
    playerBoardHolder.removeEventListener("click", handlePlayerTurn);
    const coordinates = playerBoard.randomAttack();
    const x = coordinates[0];
    const y = coordinates[1];
    //compPlayer.attack(x, y);
    console.log(playerBoard.getHitCoordinates());
    console.log(playerBoard.getMissedCoordinates());
    const cell = playerBoardHolder.querySelector(`#_${x}${y}`);
    const isAttacked = playerBoard.receiveAttack(x, y);
    cell.textContent = "";
    if (isAttacked) {
      cell.classList.add("attacked");
    } else {
      cell.classList.add("not-attacked");
    }
    if (checkWinner(playerBoard, compBoard)) return;
    currentPlayer = player;
    setTimeout(() => {
      playerBoardHolder.classList.add("disabled");
      computerBoardHolder.classList.remove("disabled");
      playerBoardHolder.addEventListener("click", handlePlayerTurn);
    }, 0);
  };

  const handlePlayerTurn = (e) => {
    if (checkWinner(playerBoard, compBoard)) return;
    const coordinates = e.target.id.slice(1, 3);
    const x = coordinates[0];
    const y = coordinates[1];
    start = false;
    // console.log(compBoard.getHitCoordinates());
    // console.log(compBoard.getMissedCoordinates());
    //player.attack(x, y);
    const isAttacked = compBoard.receiveAttack(x, y);
    //delete it later when appended ships:
    e.target.textContent = "";
    if (isAttacked) {
      e.target.classList.add("attacked");
    } else {
      e.target.classList.add("not-attacked");
    }
    currentPlayer = compPlayer;
    setTimeout(handleComputerTurn(), 300);
  };

  if (start) {
    playerBoardHolder.classList.add("disabled");
    computerBoardHolder.classList.remove("disabled");
  }
  computerBoardHolder.addEventListener("click", handlePlayerTurn);
};

singleModeGame();
//singleModeBtn.addEventListener("click", singleModeGame);
