const accountedFor = [];
const user = "[your username]";
const apiKey = "[your apiKey]";

function tellBgScriptAboutImages() {
	var popUp = createPopUp();
	var loadingGif =createLoadingGif();
	var noticeSpan = createNotice();

	popUp.prepend(noticeSpan);

// mk images array of images with high probability of being labeled with CGC
	var cgcImages = [... document.querySelectorAll('img')].filter((el) => {
		// if image has a src and the src includes the domain address (ignore ads)
		if(el.src != "" && el.src.match(/(dyn1.heritagestatic.com)/g)){ 
			// array of imageNodes with alt containing "CGC"
			return el.alt.match(/(CGC*)\w+/g); 
	    }
	});
	console.log('cgcImages', cgcImages);
	
	// mk thumbnailDiv of a thumbnail gallery
	for(var i=0; i<=cgcImages.length; i++){
		// if image is not undefined
		if(cgcImages[i] != undefined){
			// create thumbnails container div
			var thumbnailDiv = createThumbnailDiv();
			// create info span with image width and height for each cgcImage
			var { imageDimensionSpan, imageHeight, imageWidth } = createImageDimensionSpan(cgcImages, i);
			// create canvas for each image
			var thumbnail = createThumbnail(cgcImages, i);
			// handle on image click
			thumbnail.onclick = buildOnClickFunction(popUp, thumbnail, loadingGif);
			// set span with image dimensions
			imageDimensionSpan.innerHTML = imageHeight + "px  by " + imageWidth + "px"; 
			// add thumbnail to thumbnailDiv
			thumbnailDiv.appendChild(thumbnail); 
			// add image dimensions to thumbnailDiv
			thumbnailDiv.appendChild(imageDimensionSpan); 
			// add thumbnailDiv to popup
			popUp.appendChild(thumbnailDiv); 
		}
	}
	// add popup to body beginning
	// would like to see as a grid overlay
	document.body.prepend(popUp); 
}

// message from bgScript
chrome.runtime.onMessage.addListener(forMessage);

// BEGIN FUNCTIONS
function forMessage(request, sender) {
	console.log('trigger:tellBgScriptAboutImages');
	tellBgScriptAboutImages();
}
function createPopUp() {
	// create popup div
	var popUp = document.createElement("div"); 
	popUp.width = "100%"; 
	return popUp;
}
function createLoadingGif(){
	// mk loadingGif
	var loadingGif = document.createElement("span"); 
	loadingGif.innerHTML = '<img alt="Comic details are loading" src="">'; 
	return loadingGif;
}
function createNotice() {
	// mk notice
	var noticeSpan = document.createElement("div"); 
	noticeSpan.width = "90%";
	noticeSpan.style.margin = "auto 10%";
	noticeSpan.style.textAlign = "center";
	noticeSpan.innerHTML = "Click on an image to get the details.";
	return noticeSpan;
}
function createThumbnailDiv(){
	// create div for thumbnail el and span
	var thumbnailDiv = document.createElement("div"); 
	thumbnailDiv.style.margin = "10px"; 
	thumbnailDiv.style.background = "white"; 
	return thumbnailDiv
}
function createImageDimensionSpan(cgcImages, i) {
	// create span for image dimensions
	var imageDimensionSpan = document.createElement("span"); 
	// set span below image
	imageDimensionSpan.style.display = "block"; 
	// center info span
	imageDimensionSpan.style.textAlign = "center"; 
	// get image height
	imageHeight = cgcImages[i].height; 
	// get image width
	imageWidth  = cgcImages[i].width; 
	return { imageDimensionSpan, imageHeight, imageWidth };
}
function createThumbnail(cgcImages, i){
	//create thumbnail el
	var thumbnail = document.createElement("canvas"); 
	thumbnail.style.height = "200px"; 
	thumbnail.style.width  = "150px"; 
	thumbnail.style.display = "block"; 
	thumbnail.style.margin = "0 auto" ;
	thumbnail.style.background = "url("+ cgcImages[i].src +")";
	thumbnail.style.backgroundRepeat = "no-repeat";
	thumbnail.style.backgroundSize = "150px 200px";
	// set thumbnail alt text for accessibility
	thumbnail.alt = cgcImages[i].alt; 
	return thumbnail;
}
// each image will have a function
function buildOnClickFunction(popUp, thumbnail, loadingGif) {
	// when user clicks this image
	return function() { 
		// other els and notices disappear
		popUp.innerHTML = "";
		// this image should remain
		popUp.appendChild(this);
		// a loading gif launches while this image request processes
		popUp.appendChild(loadingGif);
		// encode image
		dataURL = thumbnail.toDataURL("image/png");

		console.log('dataURL',dataURL);

		const url = 'https://comics.gocollect.com/api/certVision?user='+ user +'&key='+ apiKey +'&imageUrl='+ dataURL +'&returnWith[]=activeUser'
		const send = chrome.runtime.sendMessage;
		const message = { image: url };

		console.log('message to send:', message);

		send(message, thenDoThis);

		function thenDoThis() {
			console.log("message sent! ");
		};
	};
};
