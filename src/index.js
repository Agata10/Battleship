import "./style.css";
import { Ship, GameBoard, Player } from "./models";

const singleMode = document.getElementById("singlePlayer");
const doubleMode = document.getElementById("twoplayers");
const chooseGameScreen = document.querySelector(".chooseGame");
const gameMode = document.getElementById("gameMode");
const player1BoardHolder = document.getElementById("player1-board");
const player2BoardHolder = document.getElementById("player2-board");

chooseGameScreen.classList.remove("active");
chooseGameScreen.classList.add("notActive");
gameMode.classList.add("active");

const playSingleMode = () => {
  chooseGameScreen.classList.remove("active");
  chooseGameScreen.classList.add("notActive");
  gameMode.classList.add("active");

  const playerBoard = new GameBoard(10);
  createBoard(player1BoardHolder, playerBoard.size);

  const compBoard = new GameBoard(10);
  createBoard(player2BoardHolder, compBoard.size);

  const player1 = new Player(compBoard);
  const player2 = new Player(playerBoard);
  //player1
  playerBoard.placeShip(playerBoard.createShip(5), [1, 2], [1, 6]);
  playerBoard.placeShip(playerBoard.createShip(4), [3, 1], [6, 1]);
  playerBoard.placeShip(playerBoard.createShip(4), [9, 2], [9, 5]);
  playerBoard.placeShip(playerBoard.createShip(3), [3, 6], [3, 8]);
  playerBoard.placeShip(playerBoard.createShip(4), [5, 3], [5, 6]);
  placeShips(playerBoard, player1BoardHolder);

  //computer
  compBoard.placeShip(compBoard.createShip(5), [0, 2], [0, 6]);
  compBoard.placeShip(compBoard.createShip(3), [2, 1], [4, 1]);
  compBoard.placeShip(compBoard.createShip(4), [7, 2], [7, 5]);
  compBoard.placeShip(compBoard.createShip(3), [3, 6], [3, 8]);
  compBoard.placeShip(compBoard.createShip(3), [3, 4], [5, 4]);
  placeShips(compBoard, player2BoardHolder);

  let currentPlayer = player1;
  let isGameOver = false;

  while (
    checkWinner(
      currentPlayer,
      player1,
      playerBoard,
      player2,
      compBoard,
      isGameOver
    )
  ) {
    player1BoardHolder.addEventListener((cell) => {
      console.log(cell);
    });
  }
};

const checkWinner = (
  currentPlayer,
  player1,
  player1BoardHolder,
  player2,
  player2BoardHolder,
  isGameOver
) => {
  if (currentPlayer === player1) {
    if (player1BoardHolder.isGameOver()) {
      console.log("player 1 lost!");
      isGameOver = true;
      return isGameOver;
    }
  } else if (currentPlayer === player2) {
    if (player2BoardHolder.isGameOver()) {
      console.log("player 2 lost!");
      isGameOver = true;
      return isGameOver;
    }
  }
};

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

const changeTurn = (player1, player2) => {
  return currentPlayer === player1 ? player2 : player1;
};

playSingleMode();

//singleMode.addEventListener("click", playSingleMode);
