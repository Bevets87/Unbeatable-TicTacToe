import { Observable } from './Observable'

export default class Board extends Observable {
  constructor (grid) {
    super()

    this.grid = grid || new Array(
      new Array(null, null, null),
      new Array(null, null, null),
      new Array(null, null, null)
    )

    this.moves = [];
    this.winner = null;
    this.playable = true;

  }

  reset () {
    this.grid = this.grid
    .map(row => row
      .map(sqr => {
        sqr = null; return sqr
      })
    )
    this.winner = null;
    this.playable = true;
    this.moves.splice(0, this.moves.length)
    return this;
  }

  clone () {
    return new Board (this.grid)
  }

  isPlayable () {
    let playables = this.getPlayablePositions();
    return playables.length > 0;
  }

  isEmptyAt (position) {
    return !this.grid[position.row][position.col];
  }

  setMove (character, position) {
    this.grid[position.row][position.col] = character
    this.moves.push({ character, position })
    if (!this.isPlayable()) { this.playable = false }
    if (this.isWinner(character)) { this.winner = character; this.playable = false; }
    this.notifyAll(this)
    return this
  }

  getPlayablePositions () {
    let playables = this.grid
    .map((r, row) => r.map((square, col) => { if (square === null) return { row, col } }))
    .reduce((acc, next) => { let newArr = acc.concat(next); return newArr; })
    return playables.filter(p => p !== undefined)
  }

  getAllRows () {
    let topRow = this.grid[0], middleRow = this.grid[1], bottomRow = this.grid[2]
    return [ topRow, middleRow, bottomRow ]
  }

  getAllColumns () {
    let leftCol = [ this.grid[0][0], this.grid[1][0], this.grid[2][0] ],
    middleCol = [ this.grid[0][1], this.grid[1][1], this.grid[2][1] ],
    rightCol = [ this.grid[0][2], this.grid[1][2], this.grid[2][2] ]
    return [ leftCol, middleCol, rightCol ]
  }

  getAllDiagonals () {
    let diagonalOne = [ this.grid[0][0], this.grid[1][1], this.grid[2][2] ],
    diagonalTwo = [ this.grid[0][2], this.grid[1][1], this.grid[2][0] ]
    return [ diagonalOne, diagonalTwo ];
  }

  getAllCombos () {
    return this.getAllRows().concat(this.getAllColumns()).concat(this.getAllDiagonals())
  }

  isWinningCombo (character, combo) {
    for (let i = 0; i < combo.length; i++) {
      if (combo[i] != character) {
        return false;
      }
    }
    return true;
  }

  isWinner (character) {
    let allCombos = this.getAllCombos()
    for (var i = 0; i < allCombos.length; i++) {
      if (this.isWinningCombo(character, allCombos[i])) {
        return true;
      }
    }
    return false;
  }
}
