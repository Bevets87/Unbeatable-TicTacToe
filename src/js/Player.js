export default class Player {
  constructor () {
    this.character = null;
    this.turn = false;
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
