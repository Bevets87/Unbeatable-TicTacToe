export default class AI {
  constructor () {
    this.character = null
    this.strategy = null
    this.turn = false;
  }

  move (board) {
    if (this.turn) {
      this.strategy.calculateMove(this.character, board)
    }
  }

  setTurn ({ playable, moves }) {
    if (playable) {
      let { character } = moves[moves.length - 1];
      this.turn = character === this.character ? false : true;
    } else {
      this.turn = false;
    }
  }

}
