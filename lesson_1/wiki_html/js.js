function walk(node, callback) {
  callback(node);
  var i;
  for(i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

// count the images on the page

var imgCount = 0;
walk(document, function(node) {
  if (node.nodeName === 'IMG') {
    imgCount += 1;
  }
});

// count the images on the page that are png

var pngCount += 1;
walk(document, function(node) {
  var imgSrc;
  var imgType;
  if (node.nodeName === 'IMG') {
    imgSrc = node.getAttribute('src');
    imgType = imgSrc.split('').slice(-3).join('').toLowerCase();
    if (imgType === 'png') {
      pngCount += 1;
    }
  }
});


// change link color to red for every link on the page

walk(document, function(node) {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
});




















