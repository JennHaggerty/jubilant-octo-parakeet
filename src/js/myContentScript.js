const accountedFor = [];
// CREDENTIALS // REMOVE ASAP && CHANGE 
const user = "bardicwarrior";
const apiKey = "f8103c4d3db97743bcbbca492c18853be93c9d23";

function tellBgScriptAboutImages() {
//	const images = [... document.querySelectorAll('img')].filter((el) => {
//		if(el.src != "" && el.src.match(/(dyn1.heritagestatic.com)/g)){ // if image has a src and the src includes the domain address (ignore ads)
//			return el.alt.match(/(CGC*)\w+/g); // array of imageNodes with alt containing "CGC"
//		}
//	});
//	const newImagesOnly = images.filter(img => !accountedFor.includes(img));
//	const send = chrome.runtime.sendMessage;
//	const srcs = newImagesOnly.map(img => img.src);
//	const message = { images: srcs };
//	console.log('message to send:', message);
//	send(message, thenDoThis);
//	function thenDoThis() {
//		console.log("message sent!");
//		
//		newImagesOnly.forEach(img => accountedFor.push(img));
//	}
var popUp = document.createElement("div"); // create popup div
popUp.id = "pop-modal"; //set popup id
popUp.width = "100%"; 
// mk loadingGif
var loadingGif = document.createElement("span"); // create loading span
loadingGif.innerHTML = '<img alt="Comic details are loading" src="">'; // set span html
// mk notice
var noticeSpan = document.createElement("div"); // changed to div for aesthetic
noticeSpan.width = "90%";
noticeSpan.style.margin = "auto 10%";
noticeSpan.style.textAlign = "center";
noticeSpan.innerHTML = "Click on an image to get the details.";
popUp.prepend(noticeSpan);
// mk images array of images with high probability of being labeled with CGC
var cgcImages = [... document.querySelectorAll('img')].filter((el) => {
	if(el.src != "" && el.src.match(/(dyn1.heritagestatic.com)/g)){ // if image has a src and the src includes the domain address (ignore ads)
		return el.alt.match(/(CGC*)\w+/g); // array of imageNodes with alt containing "CGC"
    }
});
// mk thumbnailDiv of a thumbnail gallery
for(var i=0; i<=cgcImages.length; i++){ // loop through cgcImages
	if(cgcImages[i] != undefined){ // if image is not undefined
//console.log(cgcImages[i].src);
		// THUMBNAIL CONTAINING DIV
		thumbnailDiv = document.createElement("div"); // create div for thumbnail el and span
		thumbnailDiv.style.margin = "10px"; // grid style
		thumbnailDiv.style.background = "white"; // overlay
		// IMAGE FROM DOM
		imageDimensionSpan = document.createElement("span"); // create span for image dimensions
		imageDimensionSpan.style.display = "block"; // set span below image
		imageDimensionSpan.style.textAlign = "center"; // center info span
		imageHeight = cgcImages[i].height; // get image height
		imageWidth  = cgcImages[i].width; // get image width
		// THUMBNAIL
		thumbnail = document.createElement("canvas"); //create thumbnail el
		thumbnail.style.height = "200px"; // set thumbnail height
		thumbnail.style.width  = "150px"; // set thumbnail width
		thumbnail.style.display = "block"; // center align
		thumbnail.style.margin = "0 auto" ;
		thumbnail.style.background = "url("+ cgcImages[i].src +")";
		thumbnail.style.backgroundRepeat = "no-repeat";
		thumbnail.style.backgroundSize = "150px 200px";
		thumbnail.alt = cgcImages[i].alt; // set thumbnail alt text for accessibility
		//thumbnailSrc = cgcImages[i].src;
		// each image will have a function
		thumbnail.onclick = function() { // when user clicks this image
			// change look
			popUp.innerHTML = "";// other els and notices disappear
			popUp.appendChild(this);// this image should remain
			popUp.appendChild(loadingGif);// a loading gif launches while this image request processes
dataURL = thumbnail.toDataURL("image/png");
console.log('dataURL',dataURL);

var req = new XMLHttpRequest();
req.open('POST', 'https://comics.gocollect.com/api/certVision?user='+ user +'&key='+ apiKey +'&imageUrl='+ dataURL +'&returnWith[]=activeUser', true);
req.onreadystatechange = function() {
	if(req.readyState == 4 && req.status == 200){
		thumbnail.appendChild(req.responseText);
	} else {
		console.log('there was an error ' + req.responseText);
	}
}
req.send();
		};
		//set HTML
		imageDimensionSpan.innerHTML = imageHeight + "px  by " + imageWidth + "px"; // populate span with image dimensions
		// append children
		thumbnailDiv.appendChild(thumbnail); // add thumbnail to thumbnailDiv
		thumbnailDiv.appendChild(imageDimensionSpan); // add image dimensions to thumbnailDiv
		popUp.appendChild(thumbnailDiv); // add thumbnailDiv to popup
	}
}


//console.log("popUp " + popUp);

document.body.prepend(popUp); // add popup to body beginning
}
// message from bgScript
chrome.runtime.onMessage.addListener(forMessage);
function forMessage(request, sender) {
  console.log('trigger:tellBgScriptAboutImages');
  tellBgScriptAboutImages();
}

// JENN BELOW
//	setTimeout(function(){
//var popUp = document.createElement("div"); // create popup div
//popUp.id = "pop-modal"; //set popup id
//popUp.width = "100%"; 
//// mk loadingGif
//var loadingGif = document.createElement("span"); // create loading span
//loadingGif.innerHTML = '<img alt="Comic details are loading" src="">'; // set span html
//// mk notice
//var noticeSpan = document.createElement("div"); // changed to div for aesthetic
//noticeSpan.width = "90%";
//noticeSpan.style.margin = "auto 10%";
//noticeSpan.style.textAlign = "center";
//noticeSpan.innerHTML = "Click on an image to get the details.";
//popUp.prepend(noticeSpan);
//// mk images array of images with high probability of being labeled with CGC
//var cgcImages = [... document.querySelectorAll('img')].filter((el) => {
//	if(el.src != "" && el.src.match(/(dyn1.heritagestatic.com)/g)){ // if image has a src and the src includes the domain address (ignore ads)
//		return el.alt.match(/(CGC*)\w+/g); // array of imageNodes with alt containing "CGC"
//    }
//});
//// mk thumbnailDiv of a thumbnail gallery
//for(var i=0; i<=cgcImages.length; i++){ // loop through cgcImages
//	if(cgcImages[i] != undefined){ // if image is not undefined
////console.log(cgcImages[i].src);
//		// THUMBNAIL CONTAINING DIV
//		thumbnailDiv = document.createElement("div"); // create div for thumbnail el and span
//		thumbnailDiv.style.margin = "10px"; // grid style
//		thumbnailDiv.style.background = "white"; // overlay
//		// IMAGE FROM DOM
//		imageDimensionSpan = document.createElement("span"); // create span for image dimensions
//		imageDimensionSpan.style.display = "block"; // set span below image
//		imageDimensionSpan.style.textAlign = "center"; // center info span
//		imageHeight = cgcImages[i].height; // get image height
//		imageWidth  = cgcImages[i].width; // get image width
//		// THUMBNAIL
//		thumbnail = document.createElement("canvas"); //create thumbnail el
//		thumbnail.style.height = "200px"; // set thumbnail height
//		thumbnail.style.width  = "150px"; // set thumbnail width
//		thumbnail.style.display = "block"; // center align
//		thumbnail.style.margin = "0 auto" ;
//		thumbnail.style.background = "url("+ cgcImages[i].src +")";
//		thumbnail.style.backgroundRepeat = "no-repeat";
//		thumbnail.style.backgroundSize = "150px 200px";
//		thumbnail.alt = cgcImages[i].alt; // set thumbnail alt text for accessibility
//		//thumbnailSrc = cgcImages[i].src;
//		// each image will have a function
//		thumbnail.onclick = function() { // when user clicks this image
//			// change look
//			popUp.innerHTML = "";// other els and notices disappear
//			popUp.appendChild(this);// this image should remain
//			popUp.appendChild(loadingGif);// a loading gif launches while this image request processes
//dataURL = thumbnail.toDataURL("image/png");
//console.log('dataURL',dataURL);
//
//var req = new XMLHttpRequest();
//req.open('POST', 'https://comics.gocollect.com/api/certVision?user='+ user +'&key='+ apiKey +'&imageUrl='+ dataURL +'&returnWith[]=activeUser', true);
//req.onreadystatechange = function() {
//	if(req.readyState == 4 && req.status == 200){
//		thumbnail.appendChild(req.responseText);
//	} else {
//		console.log('there was an error ' + req.responseText);
//	}
//}
//req.send();
//		};
//		//set HTML
//		imageDimensionSpan.innerHTML = imageHeight + "px  by " + imageWidth + "px"; // populate span with image dimensions
//		// append children
//		thumbnailDiv.appendChild(thumbnail); // add thumbnail to thumbnailDiv
//		thumbnailDiv.appendChild(imageDimensionSpan); // add image dimensions to thumbnailDiv
//		popUp.appendChild(thumbnailDiv); // add thumbnailDiv to popup
//	}
//}
//
//
////console.log("popUp " + popUp);
//
//document.body.prepend(popUp); // add popup to body beginning
//	}, 3000);
