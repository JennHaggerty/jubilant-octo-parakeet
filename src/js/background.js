import '../img/icon-34.png';

// extension api
chrome.browserAction.onClicked.addListener(handleButton);

// handler
function handleButton(tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		const messageToTab = {data: "request"};
		console.log('button pressed.. give me images!', messageToTab);
		chrome.tabs.sendMessage(tabs[0].id, messageToTab, response => {
		});
	});
}

// extension api
chrome.runtime.onMessage.addListener(forMessage);

// handler
function forMessage(request, sender, sendResponse) {
	console.log('images to handle', request.image);
	const { image } = request;

	var xhr = new XMLHttpRequest();
	xhr.open('POST', image, true);
	xhr.send();
}
