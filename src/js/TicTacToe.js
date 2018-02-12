export default class TicTacToe {
  constructor ({ board, display, player, ai, aiStrategies }) {
    this.board = board;
    this.display = display;
    this.player = player;
    this.ai = ai;
    this.aiStrategies = aiStrategies;

    this.board.subscribe({context: this.display, handler: this.display.render('square')})
    this.board.subscribe({context: this, handler: this.handleGameResult})
    this.board.subscribe({context: this.ai, handler: this.ai.setTurn})
    this.board.subscribe({context: this.player, handler: this.player.setTurn})
    this.board.subscribe({context: this.ai, handler: this.ai.move})

    this.display.handleInput('startGame', character => { this.handleStartGame(character) })
    this.display.handleInput('move', position => { this.handlePlayerMove(position) })
  }

  handleGameResult ({ playable, winner }) {
    if (winner) {
      this.display.render('winner-result', { winner });
    }
    if (!playable && !winner) {
      this.display.render('tie-result', null);
    }
  }

  handlePlayerMove (position) {
    if (this.player.turn && this.board.isEmptyAt(position)) {
      this.board.setMove(this.player.character, position)
    }
  }

  handleOpeningTurn () {
    let turn = Math.random() > 0.5 ? 'X' : 'O';
    if (turn == this.player.character) {
      this.player.turn = true
    } else {
      this.ai.strategy = this.aiStrategies[0]
      this.ai.turn = true
      this.ai.move(this.board)
    }
  }

  handleStartGame (character) {
    this.player.character = character
    this.ai.character = character == 'X' ? 'O' : 'X'
    this.board.reset()
    this.handleOpeningTurn()
    this.display.render('start-game', null)
    this.ai.strategy = this.aiStrategies[1]
  }

}
