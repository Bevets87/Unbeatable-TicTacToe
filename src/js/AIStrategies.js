export const RandomStrategy = () => {

  const getRandomPosition = positions => {
    let randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
  }

  const calculateMove = (character, board) => {
    let positions = board.getPlayablePositions();
    let position = getRandomPosition(positions);
    return board.setMove(character, position)
  }

  return {
    calculateMove
  }
}

export const MinMaxStrategy = () => {

  const minMax = (character, board, AI, Hu) => {
    const playables = board.getPlayablePositions();

    if (board.isWinner(AI)) {
      return {score: 10}
    }
    else if (board.isWinner(Hu)) {
      return {score: -10}
    }
    else if (!board.isPlayable()) {
      return {score: 0}
    }

    const moves = []

    for (var i = 0; i < playables.length; i++) {
      const move = {};
      move.position = playables[i];

      board.grid[move.position.row][move.position.col] = character;

      if (character === Hu) {
        let aiResult = minMax(AI, board, AI, Hu)
        move.score = aiResult.score;
      }

      if (character === AI) {
        let huResult = minMax(Hu, board, AI, Hu)
        move.score = huResult.score
      }

      board.grid[move.position.row][move.position.col] = null;
      moves.push(move)
    }

    if (character === AI) {
      return moves.reduce((thisMove, nextMove) => {
        if (thisMove.score > nextMove.score) {
          return thisMove
        } else {
          return nextMove
        }
      })
    } else {
      return moves.reduce((thisMove, nextMove) => {
        if (thisMove.score < nextMove.score) {
          return thisMove
        } else {
          return nextMove
        }
      })
    }

  }

  const calculateMove = (character, board) => {
    let AI = character, Hu = character == 'X' ? 'O' : 'X';
    const result = minMax(character, board.clone(), AI, Hu)
    board.setMove(character, result.position)
  }


  return {
    calculateMove
  }
}
