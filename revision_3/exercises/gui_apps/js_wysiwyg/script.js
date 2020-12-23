function toggleBold(e) {
  e.preventDefault();
  document.execCommand('bold', false, null);
}

$('button').on('click', toggleBold);
$('i.fa-bold').on('click', toggleBold);
