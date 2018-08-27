let recommendButton = document.getElementById('recommendNews');


recommendButton.onclick = function(element) {
  console.log("click")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    chrome.runtime.sendMessage({article:url, action:"setArticle"});


  });
}
