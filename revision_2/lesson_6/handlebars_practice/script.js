var post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  tags: ['blog', 'handle', 'bars', 'hello'],
};

post.body = '<p>' + post.body + '<p>';
var posts = [post];
var post2 = {
  title: 'This is the second Post',
  published: 'May 1, 2015',
  body: 'Sit magnam iusto voluptates quaerat animi! Aliquam perspiciatis suscipit natus sint sequi cum Velit enim facilis fuga odio maxime quam, placeat? Quaerat sapiente hic minima dolor dignissimos modi Quam dolor?',
};

posts.push(post2);

$(function() {
  Handlebars.registerPartial('tag', $('#tag').html());
  var postTemplate = Handlebars.compile($('#post').html());
  var postsHTML = postTemplate({posts: posts});
  $('body').append(postsHTML);
});

