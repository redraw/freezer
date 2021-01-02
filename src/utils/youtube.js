function getQueryVariable(link, variable) {
  var query = link.split('?')[1];
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query variable %s not found', variable);
}

function getYoutubeID(link) {
  if (link.includes("youtu.be/")) {
    return link.split("/").slice(-1).pop()
  } else {
    return getQueryVariable(link, 'v')
  }
}

export {
  getYoutubeID
}