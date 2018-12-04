chrome.storage.local.get(['speed'], function(object) {
  
  let speedValue = object.speed || 1;
  
  // console.log("Attempting to set speed to: " + speedValue);
  
  document.querySelectorAll('video').forEach(function(item) {
    item.playbackRate = speedValue;
  });
  
});

