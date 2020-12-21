const Calculator = (function() {
  const $operations = $('#op-window');
  const $entries = $('#entry-window');
  
  const mathSymbols = ['+', '-', '*', '/'];
  let currentAns;
  let answerShown = false;

  function updateEntryWindow(digitStr) {
    if ($entries.text().includes('.') && digitStr === '.') { 
      return;
    } else if ($entries.text() === '0') {
      $entries.text(digitStr);
    } else if (answerShown) {
      $entries.text(digitStr);
      answerShown = false;
    } else {
      $entries.text($entries.text() + digitStr);
    }
  }

  function updateOpsWindow(opStr) {
    let entry = $entries.text();
    $operations.text($operations.text() + ` ${entry} ${opStr}`);
  }

  function calculateAnswer(text) {
    text = text.split('').filter(e => e !== ' ')
                 .map(char => char === 'x' ? '*' : char).join('');

    if (mathSymbols.includes(text.slice(-1))) {
      return eval(text.slice(0, -1));
    } else {
      return eval(text);
    }
  }

  function processFunction(func) {
    if (func === 'NEG') {
      $entries.text('-' + $entries.text());
    } else if (func === 'C') {
      $entries.text('0');
      answerShown = false;
    } else if (func === 'CE') {
      $operations.text('');
      $entries.text('0');
      answerShown = false;
    }
  }

  return {
    handleDigitClick(e) {
      let digitStr = e.target.innerText;
      updateEntryWindow(digitStr);
    },

    handleOpsClick(e) {
      let opStr = e.target.innerText;
      updateOpsWindow(opStr);

      currentAns = calculateAnswer($operations.text());
      $entries.text(currentAns);
      answerShown = true;
    },

    handleEqualClick(e) {
      let statement = $operations.text() + $entries.text();
      let answer = calculateAnswer(statement);

      $entries.text(answer);
      $operations.text('');
      answerShown = true;
    },

    handleFunctionClick(e) {
      let func = e.target.innerText;
      processFunction(func);
    },

    bindEvents() {
      $('.digits').on('click', this.handleDigitClick.bind(this));
      $('.ops').on('click', this.handleOpsClick.bind(this));
      $('.equal').on('click', this.handleEqualClick.bind(this));
      $('.funcs').on('click', this.handleFunctionClick.bind(this));
    },

    init() {
      $entries.text('0');
      this.bindEvents();
    },
  };
})();

Calculator.init();
