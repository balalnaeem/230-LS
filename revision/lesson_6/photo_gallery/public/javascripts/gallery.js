$(function() {
  let templates = {};
  let photos;

  $("script[type='text/x-handlebars']").each(function() {
    let $tmpl = $(this);
    templates[$tmpl.attr('id')] = Handlebars.compile($tmpl.html());
  });

  $('[data-type=partial]').each(function() {
    let $partial = $(this);
    Handlebars.registerPartial($partial.attr('id'), $partial.html());
  });

  let slideshow = {
    $el: $('#slideshow'),

    prevSlide: function(e) {
      e.preventDefault();
    },

    bind: function() {
      this.$el.find('a.prev').on('click', this.prevSlide.bind(this));
    },

    init: function() {
      this.bind();
    },
  }

  $.ajax({
    url: "/photos",
    done: function(json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(0);
      slideshow.init();
      getCommentsFor(phtoso[0].id);
    }
  });

  function renderPhotos() {
    $('#slides').html(templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    $('section > header').html(templates.photo_information(photos[idx]));
  }

  function getCommentsFor(idx) {
    $.ajax({
      url: "/comments",
      data: "photo_id=" + idx,
      done: function(comment_json) {
        $('#comment ul').html(templates.comments({comments: comment_json}));
      }
    });
  }
});