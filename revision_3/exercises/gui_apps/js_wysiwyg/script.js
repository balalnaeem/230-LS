let state;

$('i').on('mousedown', function(e) {
  e.preventDefault();
  let command = $(this).attr('id');
  let link;
  
  if (command === 'createLink') {
    link = prompt('Enter the link:')
    doCommand(command, false, link);
  } else {
    doCommand(command, false, null);
  }

  state = checkState(command);
  $(this).toggleClass('selected', state);
});

$(document).on('keydown', function(e) {
  let key = e.key;
  if (key === 'Enter') {
    $('i[id^=insert]').each(function() {
      let command = $(this).attr('id');
      state = checkState(command);
      $(this).toggleClass('selected', state);
    });
  }
});

function doCommand(command, boolean, valueArg) {
  document.execCommand(command, boolean, valueArg);
}

function checkState(command) {
  return document.queryCommandState(command);
}
