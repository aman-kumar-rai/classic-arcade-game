
// object for image caching...
let resourceCache = {};
// array of callback methods to be invoked when the images are loaded...
let readyCallbacks = [];


// method to load a single or multiple images
function load(imageUrl){
  // argument is an array of image urls
  if(imageUrl instanceof Array){
    imageUrl.forEach((url) => _load(url));
  }

  // argument is a single image url
  else{
    _load(imageUrl);
  }
}

function _load(url){
  // checking if image is alreay in cache...
  if(resourceCache[url]){
    return resourceCache[url];
  }

  // the image is not loaded previously...
  else{
    const img = new Image();

    // setting the entry for current image as false in cache...
    resourceCache[url] = false;
    img.src = url;
    
    img.onload = function(){
      // adding image to cache...
      resourceCache[url] = img;

      // executing the callback when the image/images are loaded...
      // will be executed when the last image is done loading...
      if(isReady()){
        readyCallbacks.forEach(func => func());
      }
    } 
  }

}


// function to return a cached image...
function get(imageUrl){
  return resourceCache[imageUrl];
}

// function to check if any entries in resourceCache are for an image that is still loading...
function isReady(){
  let ready = true;

  for(let image in resourceCache){
    if(resourceCache.hasOwnProperty(image) && !resourceCache[image]){
      ready = false;
    }
  }
  return ready;
}

function onReady(func){
  readyCallbacks.push(func);
}

module.exports = {
  load,
  get, 
  onReady, 
  isReady
}