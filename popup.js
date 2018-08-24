let recommendButton = document.getElementById('recommendNews');

// function setChangeColorButton(){
//   chrome.storage.sync.get('color', function(data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
//   });
// }
recommendButton.onclick = function(element) {
  console.log("click")
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    console.log(url)
    var apiURL = "http://maxreinisch-newsrecommender.crawl.archivelab.org/recommend/" + url
    chrome.tabs.create({url:apiURL}, function(tab){
      console.log("called api");
    });
    var request = new XMLHttpRequest();
    request.open("GET", apiURL, true);
    request.onreadystatechange = function() {
    if (request.readyState == 4) {
      console.log(request.responseText)

    }
}
request.send();

});
}
//
// let selectionTray = document.getElementById('selectionDiv');
//
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructSelections(kButtonColors){
//   for (let item of kButtonColors){
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function(){
//       chrome.storage.sync.set({color:item}, function() {
//         setChangeColorButton()
//         console.log('color is '+ item);
//       })
//     });
//     selectionTray.appendChild(button)
//   }
// }
// setChangeColorButton()
// constructSelections(kButtonColors)
