import AI from './js/AI'
import Board from './js/Board'
import Display from './js/Display'
import Player from './js/Player'
import { RandomStrategy, MinMaxStrategy } from './js/AIStrategies'

import TicTacToe from './js/TicTacToe'

import './scss/index.scss';

new TicTacToe ({
  ai: new AI(),
  board: new Board(),
  display: new Display(),
  player: new Player(),
  aiStrategies: new Array(RandomStrategy(), MinMaxStrategy())
})
