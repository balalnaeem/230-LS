var questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein']
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  universe and everything?',
    options: ['66', '13', '111', '42']
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above']
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri']
  }
];

var answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', 4: 'Betelgeuse' };

function App() {
  this.questions = questions;
  this.answerKey = answerKey;
  this.score = 0;
  this.questionTemplate = Handlebars.compile($('#question_template').html());
  this.renderQuestions();
  this.bindEvents();
}

App.prototype = {
  renderQuestions: function() {
    this.questions.forEach(function(question) {
      $('fieldset').append(this.questionTemplate(question));
    }.bind(this));
  },

  markQuestion: function(element) {
    var qid = element.getAttribute('data-id');
    var givenAns = element.querySelector('input:checked');
    if (givenAns) {
      givenAns = givenAns.value;
    }
    var result = element.querySelector('.result');
    var correctAnswer = this.answerKey[qid];

    if (!givenAns) {
      this.markUnanswered(result, correctAnswer);
    } else if (givenAns === correctAnswer) {
      this.markCorrect(result);
    } else {
      this.markWrong(result, correctAnswer);
    }
  },

  markCorrect: function(result) {
    result.textContent = 'Correct Answer';
    result.classList.add('correct');
  },

  markWrong: function(result, correctAnswer) {
    result.textContent = 'Wrong answer. The correct answer is "' + correctAnswer + '".';
    result.classList.add('wrong');
  },

  markUnanswered: function(result, correctAnswer) {
    result.textContent = 'You didn\'t answer the question. Correct answer is "' + correctAnswer + '".';
    result.classList.add('wrong');
  },

  markQuiz: function() {
    var self = this;
    $('.question').each(function(i, ele) {
      self.markQuestion(ele);
    });
  },

  handleSubmit: function(event) {
    var submitBtn = event.target;
    event.preventDefault();

    if (!submitBtn.classList.contains('disabled')) {
      this.markQuiz();
      submitBtn.classList.add('disabled');
      $('.reset_form').removeClass('disabled');
    }
  },

  resetForm: function(event) {
    var $results = $('.result');
    event.preventDefault();
    $('form')[0].reset();
    event.target.classList.add('disabled');

    $results.each(function(i, ele) {
      ele.textContent = '';
      ele.setAttribute('class', 'result');
    });

    $('.submit').removeClass('disabled');
  },

  bindEvents: function() {
    $('.submit').on('click', this.handleSubmit.bind(this));
    $('.reset_form').on('click', this.resetForm.bind(this));
  },
}

new App;
