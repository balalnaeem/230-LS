$(function() {
  let result = $('#result');
  let input1 = $('#first_num');
  let input2 = $('#second_num');
  let operations = $('select');

  $('form').on('submit', function(e) {
    e.preventDefault();
    let firstNum = +input1.val();
    let secondNum = +input2.val();
    let operator = operations.val();

    switch (operator) {
      case '+':
	result.text(firstNum + secondNum);
	break;
      case '-':
	result.text(firstNum - secondNum);
	break;
      case '*':
	result.text(firstNum * secondNum);
	break;
      case '/':
	result.text(firstNum / secondNum);
	break;
    }
  });
});
