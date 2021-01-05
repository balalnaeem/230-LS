$(function() {
  const $form = $('form');
  const $inputs = $form.find('input[type=text]');
  const $firstSpan = $form.find('span').first();
  const $nameInputs = $form.find('input[id*=name]');
  const $ccInputs = $form.find('input[name=cc]');

  const namePattern = /^[a-z A-Z]+$/;

  function validName(string) {
    return namePattern.test(string);
  }

  function validEmail(email) {
    return /.+@.+/.test(email);
  }

  function validPhoneNumber(phoneNumber) {
    if (phoneNumber === '') { return true; }
    return /\d{3}-\d{3}-\d{4}/.test(phoneNumber);
  }

  function validPassword(password) {
    return password.length >= 10;
  }

  function addRedBorder($ele) {
    $ele.css('border', '1px solid red');
  }

  function removeRedBorder($ele) {
    $ele.css('border', '1px solid lightgrey');
  }

  function showWarning($ele) {
    $ele.next().css('display', 'inline');
  }

  function allRequiredValid() {
    if ($('#fname').val() === '') { return false; }
    if ($('#lname').val() === '') { return false; }
    if (!validEmail($('#email').val())) { return false; }
    if (!validPassword($('#password').val())) { return false; }
    if (!validPhoneNumber($('#phone').val())) { return false; }
    return true;
  }

  function encodeFormData($form) {
    let data = {};

    $form.serializeArray().forEach(obj => {
      if (data[obj.name]) {
        data[obj.name] += obj.value;
        return;
      }

      data[obj.name] = obj.value;
    });

    return Object.keys(data).map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join('&');
  }

  $inputs.on('blur', function(e) {
    let $input = $(this);
    let value = $input.val();
    let id = $input.attr('id');

    if (id !== 'phone' && value === '') {
      showWarning($input);
      addRedBorder($input);
      return;
    }

    if (id === 'fname' || id === 'lname') {
      if (!validName(value)) {
        showWarning($input.next());
        addRedBorder($input);
      }
    }

    if (id === 'email' && !validEmail(value)) {
      showWarning($input.next());
      addRedBorder($input);
      return;
    }

    if (id === 'password' && !validPassword(value)) {
      showWarning($input.next());
      addRedBorder($input);
      return;
    }
    
    if (id === 'phone' && !validPhoneNumber(value)) {
      showWarning($input);
      addRedBorder($input);
      return;
    }

    if (allRequiredValid()) {
      $firstSpan.hide(); 
    }
  });

  $nameInputs.on('keypress', function(e) {
    if (!namePattern.test(e.key)) {
      e.preventDefault();
    }
  });

  $ccInputs.on('keypress', function(e) {
    let $ccField = $(this);

    if (!/\d/.test(e.key)) {
      e.preventDefault();
      return;
    }

    if ($ccField.val().length >= 3) {
      $ccField.next().focus();
    }
  });

  $inputs.on('focus', function(e) {
    let $input = $(this);
    removeRedBorder($input);
    $input.parent().find('span').hide();
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    let $form = $(this);
    let formData;

    $inputs.blur();
    if (!allRequiredValid()) {
      $firstSpan.show();
      return;
    }

    formData = encodeFormData($form);
    $('section p').text(formData);
  });
});

