import debounce from './debounce.js';

const Autocomplete = {
  wrapInput: function() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI: function() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  valueChanged: function() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, matches => {
	this.visible = true;
	this.matches = matches;
	this.bestMatchIndex = 0;
	this.selectedIndex = null;
	this.draw();
      });
    } else {
      this.reset();
    }
  },

  fetchMatches: function(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', function(e) {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  },

  draw: function() {
    while(this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    }

    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
	li.classList.add('selected');
	this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  },

  generateOverlayContent: function(value, match) {
    let end = match.name.substr(value.length);
    return value + end;
  },

  handleKeyDown: function(e) {
    switch(e.key) {
      case 'ArrowDown':
	e.preventDefault();
	if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1 ) {
	  this.selectedIndex = 0;
	} else {
	  this.selectedIndex += 1;
	}
	this.bestMatchIndex = null;
	this.draw();
	break;
      case 'ArrowUp':
	e.preventDefault();
	if (this.selectedIndex === null || this.selectedIndex === 0) {
	  this.selectedIndex = this.matches.length - 1;
	} else {
	  this.selectedIndex -= 1;
	}
	this.bestMatchIndex = null;
	this.draw();
	break;
      case 'Tab':
	if (this.bestMatchIndex !== null & this.matches.length !== 0) {
	  this.input.value = this.matches[this.bestMatchIndex].name;
	  e.preventDefault();
	}
	this.reset();
	break;
      case 'Enter':
	this.reset();
	break;
      case 'Escape':
	e.preventDefault();
	this.input.value = this.previousValue;
	this.reset();
	break;
    }
  },

  handleMousedown: function(e) {
    let clickedMatch = e.target;
    this.input.value = clickedMatch.textContent;
    this.reset();
  },

  reset: function() {
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previousValue = null;

    this.draw();
  },

  bindEvents: function() {
    this.input.addEventListener('input', this.valueChanged.bind(this));
    this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
  },

  init: function() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];

    this.wrapInput();
    this.createUI();

    this.valueChanged = debounce(this.valueChanged.bind(this), 300);

    this.bindEvents();
    this.reset();
  },
};

document.addEventListener('DOMContentLoaded', function(e) {
  Autocomplete.init();
});
