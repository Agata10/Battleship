import "./style.css";
import { Ship, GameBoard, Player } from "./models";

const singleMode = document.getElementById("singlePlayer");
const doubleMode = document.getElementById("twoplayers");
const chooseGameScreen = document.querySelector(".chooseGame");
const gameMode = document.getElementById("gameMode");
const player1Board = document.getElementById("player1-board");
const player2Board = document.getElementById("player2-board");

chooseGameScreen.classList.remove("active");
chooseGameScreen.classList.add("notActive");
gameMode.classList.add("active");

const playSingleMode = () => {
  chooseGameScreen.classList.remove("active");
  chooseGameScreen.classList.add("notActive");
  gameMode.classList.add("active");

  const playerBoard = new GameBoard(10);
  createBoard(player1Board, playerBoard.size);

  const compBoard = new GameBoard(10);
  createBoard(player2Board, compBoard.size);

  const player1 = new Player(compBoard);
  const player2 = new Player(playerBoard);
  //player1
  playerBoard.placeShip(playerBoard.createShip(3), [1, 2], [1, 6]);
  playerBoard.placeShip(playerBoard.createShip(3), [3, 1], [6, 1]);
  playerBoard.placeShip(playerBoard.createShip(3), [9, 2], [9, 5]);
  playerBoard.placeShip(playerBoard.createShip(3), [3, 6], [3, 8]);
  playerBoard.placeShip(playerBoard.createShip(3), [5, 3], [5, 6]);
  placeShips(playerBoard, player1Board);

  //computer
  compBoard.placeShip(compBoard.createShip(3), [0, 2], [0, 6]);
  compBoard.placeShip(compBoard.createShip(3), [2, 1], [4, 1]);
  compBoard.placeShip(compBoard.createShip(3), [7, 2], [7, 5]);
  compBoard.placeShip(compBoard.createShip(3), [3, 6], [3, 8]);
  compBoard.placeShip(compBoard.createShip(3), [3, 4], [5, 4]);
  placeShips(compBoard, player2Board);
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

playSingleMode();

//singleMode.addEventListener("click", playSingleMode);
