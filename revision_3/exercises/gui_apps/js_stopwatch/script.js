const App = (function() {
	const $timer = $('#timer');
	
	const $centis = $timer.find('#centi-seconds');
	const $seconds = $timer.find('#seconds');
	const $minutes = $timer.find('#minutes');
	const $hours = $timer.find('#hours');

	const $start = $('#start');
	const $stop = $('#stop');
	const $reset = $('#reset');

	let counterId;
	let centis;
	let seconds;
	let minutes;
	let hours;

	function padZero(num) {
		return String(num).padStart(2, '0');
	}

	function toggleStartStop() {
		$start.toggle();
		$stop.toggle();
	}

	function processTimeUnit(timeUnit, domEle) {
		timeUnit++;
		if (timeUnit < 10) {
			domEle.text(padZero(timeUnit));
		} else {
			domEle.text(timeUnit);
		}

		return timeUnit;
	}

	return {
		incrementHour() {
			hours = processTimeUnit(hours, $hours);

			if (hours > 99) { clearInterval(counterId); }
		},

		incrementMinutes() {
			minutes = processTimeUnit(minutes, $minutes);

			if (minutes >= 60) {
				minutes = 0;
				$minutes.text(padZero(minutes));
				this.incrementHour();
			}
		},

		incrementSeconds() {
			seconds = processTimeUnit(seconds, $seconds);

			if (seconds >= 60) {
				seconds = 0;
				$seconds.text(padZero(seconds));
				this.incrementMinutes();
			}
		},

		startTimer(e) {
			e.preventDefault();

			let self = this;
			toggleStartStop();
			
			counterId = setInterval(function() {
				centis++;
				if (centis < 10) {
					$centis.text(padZero(centis));
				} else if (centis < 100) {
					$centis.text(centis);
				} else {
					self.incrementSeconds();
					centis = 0;
				}
			}, 10);
		},

		stopTimer(e) {
			e.preventDefault();

			clearInterval(counterId);
			toggleStartStop();
		},

		reset(e) {
			e.preventDefault();

			if (counterId) { 
				clearInterval(counterId);
			}

			this.setup();
		},

		bindEvents() {
			$start.on('click', this.startTimer.bind(this));
			$stop.on('click', this.stopTimer.bind(this));
			$reset.on('click', this.reset.bind(this));
		},

		setup() {
			$start.show();
			$stop.hide();

			centis = 0;
			seconds = 0;
			minutes = 0;
			hours = 0;

			$centis.text(padZero(centis));
			$seconds.text(padZero(seconds));
			$minutes.text(padZero(minutes));
			$hours.text(padZero(hours));
		},

		init() {
			this.setup();
			this.bindEvents();
		},
	};
})();

// setup the stop watch
App.init();
