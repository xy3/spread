// chrome.browserAction.onClicked.addListener(function(activeTab){
//   var newURL = "popup.html";
//   chrome.tabs.create({ url: newURL });
// });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup"
  }, function(win) {
    // win represents the Window object from windows API
    // Do something after opening
  });
});