$(function() {
	let tempFuncs = {};
	let photos;

	$('[type="text/x-handlebars"]').each(function() {
		let $temp = $(this);
		tempFuncs[$temp.attr('id')] = Handlebars.compile($temp.html());
	});

	$('[data-type=partial]').each(function() {
		Handlebars.registerPartial($(this).attr('id'), $(this).html());
	});

	let slideshow = {
		$el: $('#slideshow'),
		duration: 500,

		getCurrentSlide: function() {
			return this.$el.find('figure:visible');
		},

		getPrevSlide: function($current) {
			let $prev = $current.prev('figure');

			if ($prev.length === 0) {
				$prev = this.$el.find('figure').last();
			}
			return $prev
		},

		getNextSlide: function($current) {
			let $next = $current.next('figure');

			if ($next.length === 0) {
				$next = this.$el.find('figure').first();
			}
			return $next;
		},

		animateSlides: function($slide1, $slide2) {
			$slide1.fadeOut(this.duration);
			$slide2.fadeIn(this.duration);
		},

		renderPhotoContent: function(id) {
			$('[name=photo_id]').val(id);
			renderPhotoInfo(+id);
			getCommentsFor(id);
		},

		prevSlide: function(e) {
			e.preventDefault();
			let $current = this.getCurrentSlide();
			let $prev = this.getPrevSlide($current);
			
			this.animateSlides($current, $prev);
			this.renderPhotoContent($prev.attr('data-id'));
		},

		nextSlide: function(e) {
			e.preventDefault();
			let $current = this.getCurrentSlide();
			let $next = this.getNextSlide($current);
			
			this.animateSlides($current, $next);
			this.renderPhotoContent($next.attr('data-id'));
		},

		bind: function() {
			this.$el.find('a.prev').on('click', this.prevSlide.bind(this));
			this.$el.find('a.next').on('click', this.nextSlide.bind(this));
		},

		init: function() {
			this.bind();
		},
	};

	$.ajax({
		url: '/photos',
	})
		.done(function(json) {
			photos = json;
			renderPhotos();
			renderPhotoInfo(photos[0].id);
			slideshow.init();
			getCommentsFor(photos[0].id);
		});

	$('section header').on('click', '.actions a', function(e) {
		e.preventDefault();
		let $e = $(e.target);
		let photoIdx = slideshow.$el.find('figure:visible').index();
		let currentPhoto = photos[photoIdx];

		$.ajax({
			url: $e.attr('href'),
			type: 'POST',
			data: 'photo_id=' + $e.attr('data-id'),
		})
			.done(function(json) {
				$e.text(function(i, txt) {
					return txt.replace(/\d+/, json.total);
				});
				currentPhoto[$e.attr('data-property')] = json.total;
			});
	});

	$('form').on('submit', function(e) {
		e.preventDefault();
		let $f = $(this);

		$.ajax({
			url: $f.attr('action'),
			type: $f.attr('method'),
			data: $f.serialize(),
		})
			.done(function(json_comment) {
				$('#comments ul').append(tempFuncs.photo_comment(json_comment));
			});
		$f[0].reset();
	});

	function getCommentsFor(id) {
			$.ajax({
			url: '/comments',
			data: "photo_id=" + id,
		})
			.done(function(json) {
				$('#comments ul').html(tempFuncs.photo_comments({comments: json}));
			});
	}

	function renderPhotos() {
		$('#slides').html(tempFuncs.photos({photos: photos}));
	}

	function renderPhotoInfo(id) {
		let photo = photos.filter(photo => photo.id === id)[0]; 
		$('section > header').html(tempFuncs.photo_information(photo));
	}
});
