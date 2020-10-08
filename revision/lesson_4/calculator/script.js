$(domeReady => {
  let result = $('#result');
  let answer;

  $('form').submit(e => {
    e.preventDefault();

    let firstNumber = parseFloat($('input[type=number]').first().val(), 10);
    let secondNumber = parseFloat($('input[type=number]').last().val(), 10);
    let operation =  $('select').val();

    switch (operation) {
      case '+':
        answer = firstNumber + secondNumber;
        break;
      case '-':
        answer = firstNumber - secondNumber;
        break;
      case '*':
        answer = firstNumber * secondNumber;
        break;
      case '/':
        answer = firstNumber / secondNumber;
        break;
    }

    result.text(answer);
  });
});