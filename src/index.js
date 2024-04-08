import "./style.css";
import { Ship, GameBoard } from "./models";

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
};

const createBoard = (board, size) => {
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.id = i;
    div.classList.add("cell");
    board.append(div);
  }
};

playSingleMode();

//singleMode.addEventListener("click", playSingleMode);
