var $message = $('#message');
var $letters = $('#spaces');
var $guesses = $('#guesses');
var $apples = $('#apples');
var $replay = $('#replay');

function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

const randomWord = (function() {
  let words = ['banana', 'apple', 'pear', 'orange'];

  return function() {
    return words.splice(randomIndex(words.length), 1)[0];
  };
})();

function Game() {
  this.incorrect = 0;
  this.letters_guessed = [];
  this.correct_spaces = 0;
  this.word = randomWord();

  if (!this.word) {
    this.displayMessage('Sorry, I have run out of words!');
    this.toggleReplayLink(false);
    return this;
  }

  this.word = this.word.split('');
  this.init();
}

Game.prototype = {
  guesses: 6,
  createBlanks: function() {
    var spaces = (new Array(this.word.length + 1)).join('<span></span>');

    $letters.find('span').remove();
    $letters.append(spaces);
    this.$spaces = $('#spaces span');
  },

  displayMessage: function(message) {
    $message.text(message);
  },

  toggleReplayLink: function(which) {
$replay.toggle(which);
  },

  processGuess: function(e) {
    let letter = String.fromCharCode(e.which);

    if (this.notALetter(e.which)) {
      return;
    }

    if (this.duplicateGuess(letter)) {
      alert('You have already guessed that letter!')
      return;
    }

    if ($.inArray(letter, this.word) !== -1) {
      this.fillBlanksFor(letter);
      this.renderGuess(letter);

      if (this.correct_spaces === this.$spaces.length) {
        this.win();
      }

    } else {
      this.renderIncorrectGuess(letter);
    }

    if (this.incorrect === this.guesses) {
      this.lose();
    }
  },

  duplicateGuess: function(letter) {
    let duplicate = this.letters_guessed.indexOf(letter) !== -1;

    if (!duplicate) {
      this.letters_guessed.push(letter);
    }

    return duplicate;
  },

  renderGuess: function(letter) {
    $('<span><span/>').text(letter).appendTo($guesses);
  },

  win: function() {
    this.unbind();
    this.displayMessage('You have won!');
    this.setGameStatus('win');
    this.toggleReplayLink(true);
  },

  lose: function() {
    this.unbind();
    this.displayMessage('Sorry, you are out of guesses!');
    this.setGameStatus('lose');
    this.toggleReplayLink(true);
  },


  renderIncorrectGuess: function(letter) {
    this.incorrect += 1;
    this.renderGuess(letter);
    this.setClass();
  },

  setClass: function() {
    $apples.removeClass().addClass("guess_" + this.incorrect);
  },

  fillBlanksFor: function(letter) {
    this.word.forEach((el, i) => {
      if (el === letter) {
        this.$spaces.eq(i).text(letter);
        this.correct_spaces += 1;
      }
    }, this);
  },

  notALetter: function(code) {
    var a_code = 'a'.charCodeAt(0);
    var z_code = 'z'.charCodeAt(0);

    return (code < a_code || code > z_code);
  },

  emptyGuesses: function() {
    $('#guesses').find('span').remove();
  },

  bind: function() {
    $(document).on('keypress.game', this.processGuess.bind(this))
  },

  unbind: function() {
    $(document).off('keypress.game');
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
  }
}

new Game();

$replay.on('click', function(e) {
  e.preventDefault();
  new Game();
});













