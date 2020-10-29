let post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
  tags: ['coding', 'LS', 'DOM', 'JS'],
};

let post2 = {
  title: 'Lorem Ipsum Dolor',
  published: 'May 2, 2015',
  body: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque veniam, sint reiciendis. Voluptas adipisci, porro quae quas sapiente, nesciunt laborum placeat aspernatur iusto facilis beatae, dolor error unde assumenda sequi?</p>',
};

let posts = [post, post2];

Handlebars.registerPartial('tag', $('#tag').html());

let postsHTML = $('#posts').html();
let postTemplate = Handlebars.compile(postsHTML);
$('body').append(postTemplate({posts: posts}));


