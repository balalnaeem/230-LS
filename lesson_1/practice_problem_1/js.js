function walk(node, callback) {
  callback(node);
  var i;
  for(i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function countParagraphs() {
  var count = 0;
  walk(document, function(node) {
    if (node.nodeName === 'P') {
      count += 1;
    }
  });

  console.log(count);
}

function firstWords() {
  var firstWords = [];
  var text;
  walk(document, function(node) {
    if (node.nodeName === 'P') {
      text = node.innerText;
      firstWords.push(text);
    }
  });

  return firstWords.map(text => {
    return text.split(' ')[0];
  });
}

function addClass(nodeName, className) {
  var pNodes = [];
  walk(document, function(node) {
    if (node.nodeName === nodeName) {
      pNodes.push(node);
    }
  });

  pNodes.forEach((node, idx) => {
    if (idx > 0) {
      node.className = className;
    }
  });
}

addClass('P', 'stanza');





















