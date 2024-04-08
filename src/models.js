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
  constructor() {
    this.ships = [];
  }

  createShip(length) {
    return new Ship(length);
  }

  placeShip(ship, x, y) {
    return this.ships.push({ ship, x, y });
  }

  receiveAttack(x, y) {
    //if ship is hit
    //send on correct ship hit()
    //record the coordinates of missed shot
    const missedCoordinated = [];
    this.ships.forEach((s) => {
      if (s.x === x && s.y === y) {
        s.ship.hit();
      } else {
        missedCoordinated.push({ x, y });
      }
    });
    return missedCoordinated;
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
