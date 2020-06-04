// chrome.browserAction.onClicked.addListener(function(activeTab){
//   var newURL = "popup.html";
//   chrome.tabs.create({ url: newURL });
// });

// chrome.browserAction.onClicked.addListener(function(tab) {
// 	chrome.windows.create({
// 		url: chrome.runtime.getURL("popup.html"),
// 		type: "popup"
// 	}, function(win) {
//     // win represents the Window object from windows API
//     // Do something after opening
// });
// });

window.content = ""

function read_this(info, tab) {
	// console.log(info.selectionText)
	window.content = info.selectionText
	chrome.windows.create({
		url: chrome.runtime.getURL("popup.html"),
		type: "popup"
	}, function(win) {
});
}

chrome.contextMenus.create({
	title: "Speed read this", 
	contexts: ["selection"], 
	onclick: read_this
});

