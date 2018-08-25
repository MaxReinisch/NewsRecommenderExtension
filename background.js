chrome.runtime.onInstalled.addListener(function() {

  console.log("Reloaded");

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.huffingtonpost.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  let article = null;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    // Sent from popup.js requesting new tab
    if(request.action === "setArticle"){
      article = request.article;
      console.log("creating recommendation tab")
      chrome.tabs.create({url:"recommendations.html"});
    }
    // Sent from new tab requesting article
    if(request.action === "getArticle"){
      console.log("sending article to recommendation tab")
      sendResponse({url : article});
    }
  });

});
