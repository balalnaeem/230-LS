const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

const App = (() => {
	const templates = {};
	
	function isEmptyObj(obj) {
		return Object.keys(obj).length === 0;
	}

	$('script[type="text/x-handlebars"]').each(function(index) {
		let $ele = $(this);
		templates[$ele.attr('id')] = Handlebars.compile($ele.html());
	});

	$('[data-type="partial"]').each(function(index) {
		let $ele = $(this);
		Handlebars.registerPartial($ele.attr('id'), $ele.html());
	});

	return {
		renderImages(cars) {
			$('main').append(templates['images-list']({ images: cars }));
		},

		removeImages() {
			$('figure').remove();
		},

		getFormData($form) {
			let data = {};
			$form.serializeArray().forEach(option => {
				if (option.value !== 'All') {
					if (option.name === 'price' || option.name === 'year') {
						data[option.name] = +option.value
					} else {
						data[option.name] = option.value;
					}
				}
			});
			
			return data;
		},

		renderSelectedCars(data) {
			if (isEmptyObj(data)) { 
				this.removeImages();
				this.renderImages(cars);
				return; }

			let selectedCars = cars.filter(car => {
				return Object.keys(data).every(key => data[key] === car[key]);
			});

			this.removeImages();
			this.renderImages(selectedCars);

		},

		filterCars(e) {
			e.preventDefault();

			let $form = $(e.target);
			let data = this.getFormData($form);
			this.renderSelectedCars(data);
		},

		getModels(makeChoice) {
			return cars.filter(car => car.make === makeChoice)
			             .map(car => car.model)
			             .filter((model, index, self) => self.indexOf(model) === index);
		},
		
		renderValidModels(modelsArr) {
			let $models = $('#model');
			$models.children().remove();

			$models.append(new Option('All'));
			modelsArr.forEach(model => {
				$models.append(new Option(model));
			});
		},

		renderAllModels() {
			let $models = $('#model');
			$models.children().remove();

			$models.append(new Option('All'));
			cars.map(car => car.model)
			      .filter((model, index, self) => self.indexOf(model) === index)
			      .forEach(model => $models.append(new Option(model)));
		},

		adjustModels(e) {
			let make = e.target.value;
			if (make === 'All') { 
				this.renderAllModels();
				return;
			}

			let models = this.getModels(make);;
			this.renderValidModels(models);
		},

		disableButtons() {
			$('figure button').each(function(index) {
				this.disabled = true;
			});
		},

		bindEvents() {
			$('form').on('submit', this.filterCars.bind(this));
			$('#make').on('change', this.adjustModels.bind(this));
		},

		init() {
			this.renderImages(cars);
			this.bindEvents();
			this.disableButtons();
		},
	};
})();

App.init();
