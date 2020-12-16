const linkedOptions = {
	classifications: {
		Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
		'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
		'Cold-blooded': ['Salmon', 'Turtle'],
		Mammal: ['Bear', 'Whale'],
		Bird: ['Ostrich'],
	},

	animals: {
		Bear: ['Vertebrate', 'Warm-blooded', 'Cold-blooded'],
		Turtle: ['Vertebrate', 'Cold-blooded'],
		Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
		Salmon: ['Vertebrate', 'Cold-blooded'],
		Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
	},
};

const animalClassifications = document.querySelector('#animal-classifications');
const animals = document.querySelector('#animals');
const claerFiltersBtn = document.querySelector('#clear');
let animalsClassificationsValue;
let animalsValue;

function setOptions({options}, filters) {
	options.length = 0;
	filters.forEach((value, index) => {
		options[index] = new Option(value);
	});
}

function setDefault(e) {
	event.preventDefault();
	setOptions(animalClassifications, ['Classifications', 'Vertebrates', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird']);
	setOptions(animals, ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich']);
}

animalClassifications.addEventListener('change', e => {
	e.preventDefault();
	setOptions(animals, linkedOptions['classifications'][e.target.value]);
});

animals.addEventListener('change', e => {
	e.preventDefault();
	setOptions(animalClassifications, linkedOptions['animals'][e.target.value]);
});
