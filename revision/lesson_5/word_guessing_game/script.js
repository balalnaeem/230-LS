let $letters = $('#spaces');
let $guesses = $('#guesses');
let $apples = $('#apples');
let $message = $('#message');
let $replay = $('#replay');

let randomWord = (function() {
  let words = ['abacus', 'quotient', 'octothorpe', 'proselytize', 'stipend'];

  return function() {
    let index = Math.floor(Math.random() * words.length);
    let word = words.splice(index, 1)[0];
    return word;
  };
})();

function Game() {
  this.incorrect = 0;
  this.lettersGuessed = [];
  this.correctSpaces = 0;
  this.word = randomWord();

  if(!this.word) {
    this.displayMessage("Sorry, I have run out of words!");
    this.toggleReplayLink(false);
    return this;
  }

  this.word = this.word.split('');
  this.init();
}

Game.prototype = {
  guesses: 6,

  createBlanks: function() {
    let spaces = (new Array(this.word.length + 1)).join('<span></span>');

    $letters.find('span').remove();
    $letters.append(spaces);
    this.$spaces = $("#spaces span");
  },

  displayMessage: function(text) {
    $message.text(text);
  },

  fillBlanks: function(letter) {
    this.word.forEach((l, i) => {
      if (l === letter) {
        this.$spaces.eq(i).text(letter);
        this.correctSpaces += 1;
      }
    });
  },

  renderGuess: function(letter) {
    $('<span />', {
      text: letter,
    }).appendTo($guesses);
  },

  renderIncorrectGuess: function(letter) {
    this.incorrect++
    this.renderGuess(letter);
    this.setClass();
  },

  setClass: function() {
    $apples.removeClass().addClass('guess_' + this.incorrect);
  },

  win: function() {
    this.unbind();
    this.displayMessage('You win!');
    this.setGameStatus('win');
    this.toggleReplayLink(true);
  },

  lose: function() {
    this.unbind();
    this.displayMessage("Sorry! You are out of guesses!");
    this.setGameStatus('lose');
    this.toggleReplayLink(true);
  },

  duplicateGuess: function(letter) {
    let duplicate = this.lettersGuessed.indexOf(letter) !== -1;

    if (!duplicate) {
      this.lettersGuessed.push(letter);
    }

    return duplicate;
  },

  processGuess: function(e) {
    let letter = String.fromCharCode(e.which);

    if (notALetter(e.which)) { return; }
    if (this.duplicateGuess(letter)) { return; }

    if ($.inArray(letter, this.word) !== -1) {
      this.fillBlanks(letter);
      this.renderGuess(letter);
      if (this.correctSpaces === this.$spaces.length) {
        this.win();
      }
    } else {
      this.renderIncorrectGuess(letter);
    }

    if (this.incorrect === this.guesses) {
      this.lose();
    }
  },

  toggleReplayLink: function(which) {
    $replay.toggle(which);
  },

  emptyGuesses: function() {
    $guesses.find('span').remove();
  },

  bind: function() {
    $(document).on('keypress.game', this.processGuess.bind(this));
  },

  unbind: function() {
    $(document).off('.game');
  },

  setGameStatus: function(status) {
    $(document.body).removeClass();
    if (status) {
      $(document.body).addClass(status);
    }
  },

  init: function() {
    this.bind();
    this.setClass();
    this.toggleReplayLink(false);
    this.emptyGuesses();
    this.createBlanks();
    this.setGameStatus();
    this.displayMessage("");
  },
};

function notALetter(code) {
  let a_code = 97;
  let z_code = 122;

  return code < a_code || code > z_code;
}

new Game();

$replay.on("click", function(e) {
  e.preventDefault();
  new Game();
});










