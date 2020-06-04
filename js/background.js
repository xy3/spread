window.content = ""

function read_this(info, tab) {
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

