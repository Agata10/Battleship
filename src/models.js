export class Ship {
  constructor(length, start, end) {
    this.length = length;
    this.attacked = 0;
    this.isSunk = false;
    this.start = start;
    this.end = end;
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

  createShip(length, start, end) {
    return new Ship(length, start, end);
  }

  addShip(ship) {
    return this.ships.push(ship);
  }

  getShips() {
    return this.ships;
  }

  receiveAttack(x, y) {
    //if ship is hit
    //send on correct ship hit()
    //record the coordinates of missed shot
    let isAttacked = false;
    this.ships.forEach((s) => {
      outer: for (let i = s.start[0]; i <= s.end[0]; i++) {
        for (let j = s.start[1]; j <= s.end[1]; j++) {
          if (i == x && j == y) {
            s.ship.hit();
            s.ship.isShipSunk();
            isAttacked = true;
            break outer;
          }
        }
      }
      if (isAttacked) return;
    });
    if (!isAttacked) {
      this.missedCoordinated.push([x, y]);
    }
    // console.log(this.missedCoordinated);

    return isAttacked;
  }

  isGameOver() {
    let count = 0;
    this.ships.forEach((obj) => {
      if (obj.ship.isSunk === true) {
        console.log(obj.ship.isSunk);
        count++;
      }
    });
    if (count === this.ships.length) {
      console.log("gameover");
      return true;
    }
    return false;
  }

  getMissedCoordinates() {
    return this.missedCoordinated;
  }

  randomAttack() {
    let x = Math.floor(Math.random() * this.size);
    let y = Math.floor(Math.random() * this.size);
    const allMissedCoord = this.getMissedCoordinates();
    allMissedCoord.forEach((coord) => {
      if (coord.x === x && coord.y === y) {
        console.log(`Cant hit again at ${x} and ${y}`);
        x = Math.floor(Math.random() * this.size);
        y = Math.floor(Math.random() * this.size);
      }
    });
    console.log(`Hit at ${x} and ${y}`);
    return [x, y];
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
}
