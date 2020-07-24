function walk(node, callback) {
  callback(node);
  var i;
  var childNode;
  for(i = 0; i < node.childNodes.length; i += 1) {
    childNode = node.childNodes[i];
    walk(childNode, callback);
  }
}

function getElementsByTagName(tagName) {
  var nodes = [];
  walk(document, function(node) {
    if (node.nodeName === tagName) {
      nodes.push(node);
    }
  });

  return nodes;
}

getElementsByTagName('P').forEach(node => {
  node.classList.add('article-text');
});

// var pNodes = [];

// walk(document, function(node) {
//   if (node instanceof HTMLParagraphElement) {
//     pNodes.push(node);
//   }
// });

// walk(document, function(node) {
//   if (node instanceof HTMLParagraphElement) {
//     node.classList.add('article-text');
//     console.log('done');
//   }
// });


