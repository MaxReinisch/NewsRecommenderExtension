let tray = document.getElementById('RecommendationTray');

function constructArticles(clips){
  for (let entry of clips){
    let clip = entry['TV Clip'];
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = clip.preview_thumb;
    let anchor = document.createElement('a');
    anchor.href = clip.preview_url;
    anchor.appendChild(img);
    div.appendChild(anchor);
    let show = document.createElement('p');
    show.appendChild(document.createTextNode(clip.station + ": "+ clip.show));
    div.appendChild(show);
    tray.appendChild(div);
  }
}


// Requests URL from background.js
var article = null;
chrome.runtime.sendMessage({action: "getArticle"}, function(response){
  article = response.url;
  console.log(article);

  var apiURL = "http://maxreinisch-newsrecommender.crawl.archivelab.org/recommend/" + article
  var request = new XMLHttpRequest();
  request.open("GET", apiURL, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      var clips = JSON.parse(request.responseText);
      constructArticles(clips);
    }
  }
  request.send();

});
