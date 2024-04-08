export class Ship {
  constructor(length) {
    (this.length = length), (this.attacked = 0), (this.isSunk = false);
  }

  hit() {
    return this.attacked++;
  }

  isShipSunk() {
    // based on nubmer of hits and length
    if (this.attacked === this.length) {
      this.isSunk = true;
      return this.isSunk;
    }
  }
}

export class GameBoard {
  constructor(size) {
    this.ships = [];
    this.missedCoordinated = [];
    this.size = size;
  }

  createShip(length) {
    return new Ship(length);
  }

  placeShip(ship, start, end) {
    return this.ships.push({ ship, start, end });
  }

  getShips() {
    return this.ships;
  }

  receiveAttack(x, y) {
    //if ship is hit
    //send on correct ship hit()
    //record the coordinates of missed shot
    this.ships.forEach((s) => {
      if (s.x === x && s.y === y) {
        s.ship.hit();
      } else {
        this.missedCoordinated.push({ x, y });
      }
    });
    return this.missedCoordinated;
  }

  isGameOver() {
    const count = 0;
    this.ships.forEach((ship) => {
      if (ship.isShipSunk() === true) {
        count++;
      }
    });
    if (count === this.ships.length) {
      console.log("gameover");
    }
  }
}

export class Player {
  constructor(enemyGameBoard) {
    this.enemyGameBoard = enemyGameBoard;
  }

  attack(x, y) {
    if (this.enemyGameBoard.receiveAttack(x, y)) {
      console.log(`Hit the ${x} and ${y}`);
    } else {
      console.log(`Missed by hitting ${x} and ${y}`);
    }
  }

  randomAttack() {
    const x = Math.random;
  }
}
