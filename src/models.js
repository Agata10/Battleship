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
    this.missedCoordinates = [];
    this.hitCoordinates = [];
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
            s.hit();
            s.isShipSunk();
            isAttacked = true;
            break outer;
          }
        }
      }
      if (isAttacked) {
        return;
      }
    });
    //console.log(isAttacked + " was attacked");
    if (!isAttacked) {
      this.missedCoordinates.push([x, y]);
    } else {
      this.hitCoordinates.push([x, y]);
    }
    // console.log(this.missedCoordinated);

    return isAttacked;
  }

  isGameOver() {
    let count = 0;
    this.ships.forEach((ship) => {
      if (ship.isSunk === true) {
        // console.log(ship.isSunk);
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
    return this.missedCoordinates;
  }

  getHitCoordinates() {
    return this.hitCoordinates;
  }

  randomAttack() {
    let x;
    let y;
    const allMissedCoord = this.getMissedCoordinates();
    const allHitCoord = this.getHitCoordinates();
    const allCoords = [...allMissedCoord, ...allHitCoord];
    do {
      x = Math.floor(Math.random() * this.size);
      y = Math.floor(Math.random() * this.size);
      //console.log("Can\t hit at " + x + y);
    } while (allCoords.find((coord) => coord[0] === x && coord[1] === y));
    // console.log(`Computer hit at x: ${x} and y: ${y}`);
    return [x, y];
  }
}

export class Player {
  constructor(enemyGameBoard) {
    this.enemyGameBoard = enemyGameBoard;
  }

  attack(x, y) {
    if (this.enemyGameBoard.receiveAttack(x, y)) {
      console.log(`Hit the x:${x} and y:${y}`);
    } else {
      console.log(`Missed by hitting x:${x} and y:${y}`);
    }
  }
}
