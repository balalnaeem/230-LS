function getEventTotal(cardNumber) {
  let total = 0;

  cardNumber.forEach((digit, index) => {
    if (index % 2 === 0) {
      total += +digit;
    }
  });

  return total;
}

function getOddTotal(cardNumber) {
  let total = 0;

  cardNumber.forEach((digit, index) => {
    if (index % 2 === 1) {
      digit = (+digit * 2) + '';

      if (digit.length > 1) {
        digit = +digit[0] + +digit[1];
      } else {
        digit = +digit;
      }

      total += digit;
    }
  });

  return total;
}

$(function() {
  $("nav a").on("mouseenter", function() {
    $(this).next("ul").addClass('opened');
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").removeClass('opened');
  });

  $('main p').eq(0).on('click', function(e) {
    e.preventDefault();
    $(e.target).addClass('clicked');
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();
    $(this).next('.accordion').toggleClass('opened');
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val().split("").reverse();
    var odd_total = getOddTotal(cc_number);
    var even_total = getEventTotal(cc_number);

    if ((odd_total + even_total) % 10 === 0) {
      $(this).find(".success").show();
      $(this).find(".error").hide();
    } else {
      $(this).find(".error").show();
      $(this).find(".success").hide();
    }
  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text();
    var $stone = $("#birthstone");
    var stones = {
      "January": 'jan',
      "February": 'feb',
      "March": 'mar',
      "April": 'apr',
      "May": 'may',
      "June": 'jun',
      "July": 'jul',
      "August": 'aug',
      "September": 'sep',
      "October": 'oct',
      "November": 'nov',
      "December": 'dec',
    };

    $stone.text(`Your birthstone is ${stones[month]}`);
  });
});