// This script is started on page load. Sets up a listener for when the video tag appears. Handles netflix page changes and stuff.
// Is this not needed? Since background.js can take care of this with match rules. It almost seems to work. I really want it to..

var obs = new MutationObserver(function(mutations, observer) {
  
  for (var i=0; i<mutations.length; ++i) {
    for (var j=0; j<mutations[i].addedNodes.length; ++j) {
      if (mutations[i].addedNodes[i]) {
        // TODO Probably a better way than ignoring the TypeError exception, but eh
        try {
          if(mutations[i].addedNodes[i].querySelector('video')) {
            // console.log("loadingPlaybackSpeed because appMountPoint was modified and video exists");
            loadPlaybackSpeed();
          }
        } catch (TypeError) {
          // noop
        }
      }
    }
  }
  
});

// observe appMountPoint for changes in children
obs.observe(document.querySelector("#appMountPoint"), {
  childList: true,
  subtree: true
});


function loadPlaybackSpeed() {
  chrome.storage.local.get(['speed'], function(object) {
    let speedValue = object.speed || 1;
    
    // console.log("Attempting to set speed to: " + speedValue);
    
    document.querySelector('video').playbackRate = speedValue;
  });
}
