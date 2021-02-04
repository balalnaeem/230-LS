const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let lastChecked;

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', handleCheck);
});

function handleCheck(e) {
  let inBetween = false;

  if (e.shiftKey) {
    checkboxes.forEach(checkbox => {
      if (checkbox === e.target || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}
