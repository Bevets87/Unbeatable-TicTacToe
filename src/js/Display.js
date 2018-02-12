import { curry } from 'ramda';

export default class Display {
  constructor () {
    this.$board = document.getElementById('board');
    this.$squares = document.querySelectorAll('.square');
    this.$characters = document.querySelectorAll('.btn');
    this.$prompt = document.getElementById('prompt');
    this.$resultHeading = document.getElementById('result');

    this.handleInput = curry(this.handleInput)
    this.render = curry(this.render)
  }

  handleInput (eventName, handler) {
    if (eventName === 'startGame') {
      Array.prototype.forEach.call(this.$characters, $character => {
        $character.addEventListener('click', e => {
          handler(e.target.dataset.character)
        })
      })
    }
    if (eventName === 'move') {
      Array.prototype.forEach.call(this.$squares, $square => {
        $square.addEventListener('click', e => {
          handler({
            row: e.target.dataset.row,
            col: e.target.dataset.col
          })
        })
      })
    }
  }

  render (command, context) {
    const viewCommands = {
      'square': ({ moves }) => {
        let { position, character } = moves[moves.length - 1];
        let $square = Array.prototype.filter.call(this.$squares, $s =>
          $s.dataset.row == position.row && $s.dataset.col == position.col
        )[0]
        $square.textContent = character;
      },
      'board': () => {
        this.$board.style.display = 'table';
      },
      'clear-board': () => {
        Array.prototype.forEach.call(this.$squares, $square => {
          $square.textContent = '';
        })
      },
      'remove-board': () => {
        this.$board.style.display = 'none';
      },
      'prompt': () => {
        this.$prompt.style.display = 'block';
      },
      'remove-prompt': () => {
        this.$prompt.style.display = 'none';
      },
      'winner': ({ winner }) => {
        this.$resultHeading.textContent = `${winner} Wins!`;
      },
      'tie': () => {
        this.$resultHeading.textContent = `Tie!`
      },
      'remove-heading': () => {
        this.$resultHeading.textContent = '';
      },
      'winner-result': ({ winner }) => {
        this.render('winner', { winner });
        this.render('reset', null)
      },
      'tie-result': () => {
        this.render('tie', null)
        this.render('reset', null);
      },
      'start-game': () => {
        this.render('remove-prompt', null)
        this.render('board',null)
      },
      'reset': () => {
        setTimeout(() => {
          this.render('remove-heading', null);
          this.render('clear-board', null);
          this.render('remove-board', null);
          this.render('prompt', null)
        }, 1500)
      }
    }
    viewCommands[command](context)
  }
}
