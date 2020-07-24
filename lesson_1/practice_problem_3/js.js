// Write some JavaScript code to retrieve a word count for each h2 heading on the page.

function walk(element, callback) {
  callback(element);
  var child;
  var i;

  for (i = 0; i < element.children.length; i += 1) {
    child = element.children[i];
    walk(child, callback);
  }
}

// walk(document.body, function(ele) {
//   if (ele.nodeName === 'H2') {
//     console.log(ele.textContent.split(' ').length);
//   }
// });


var thumbCaptions = document.querySelectorAll('.thumbcaption');
thumbCaptions = [].slice.call(thumbCaptions);
var captionsText = thumbCaptions.map(ele => ele.textContent.trim());

console.log(captionsText);


let tds = document.querySelectorAll('.infobox td');
console.log(tds);

let link = document.querySelector('#toggle')
let hidden = document.querySelector('#notice')
link.onclick = function(e) {
  e.preventDefault();
  if (hidden.className === 'hidden') {
    hidden.className = 'visible';
  } else {
    hidden.className = 'hidden';
  }
};

let hiddenPara = document.querySelector('#notice p');
hiddenPara.onclick = e => {
  e.preventDefault();
  let notice = document.querySelector('#notice');
  notice.className = 'hidden';
}

let multiplication = document.querySelector('#multiplication');
multiplication.textContent = `13 times 9 is ${13 * 9}`;

let body = document.body;

function walk(node) {
  console.log(node.nodeName);
  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index]);
  }
}



































