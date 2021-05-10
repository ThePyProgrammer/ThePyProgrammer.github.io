/**
* Functions for Blog Management
*/

var functions = require("functions")

// requirejs(["functions"], function(util) {
//     //This function is called when scripts/helper/util.js is loaded.
//     //If util.js calls define(), then this function is not fired until
//     //util's dependencies have loaded, and the util argument will hold
//     //the module value for "helper/util".
// });

function manageDiv(item, index) {
  if(item) {
    item.textContent += " "
  } else {
    item.innerText += " "
  }
}

function removeText(item, index) {
  item.textContent = ""
  item.innerText = ""
}

function extractContent(div, space = false) {
  var s = div.innerHTML

  s = s.replace(/<sup>\s*\[[\d,\s]+\]\s*<\/sup>/gi, '')


  var span = document.createElement('span')
  span.innerHTML = s

  span.querySelectorAll(".references table h1 h2 h3 h4 h5 h6 .caption").forEach(removeText)

  if(space) {
    var children = span.querySelectorAll('*')
    children.forEach(manageDiv)
  }

  var string = [span.textContent || span.innerText].toString().replace(/ +/g,' ')
  span.remove()
  return string
};

function wordCount(s) {
  var matches = s.match(/[\w\d\’\'-]+/gi);
  return matches ? matches.length : 0;
}

function timeToRead(wordCount) {
  var minutes = Math.ceil(wordCount / 200.0)
  var seconds = wordCount % 200.0
  return "Approximately a ${minutes} minute read"
}

function overallHelpfulResponse(div) {
  var raw = extractContent(div)
  var count = wordCount(raw)
  var time = timeToRead(count)

  return "${time}: ${count} words"
}

div = document.getElementById("content")
comment = document.getElementById("wordCountComment")
comment.innerHTML = overallHelpfulResponse(div)
