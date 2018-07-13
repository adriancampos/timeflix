var onChange = function(evt) {
  // console.info(evt.target.value);
  // console.log("textbox.onchange: " + evt.target.value);
  saveValue(evt.target.value);
  
};

function saveValue(value) {
  let speedVal = parseFloat(value);
  
  chrome.storage.local.get(['speed'], function(object) {
    chrome.storage.local.set({speed: speedVal});
  })
  chrome.tabs.executeScript(null, {
    file: 'content_script.js'
    // code: `
    // chrome.storage.local.get(['speed'], function(object) {
    //   document.querySelector('video').playbackRate = object.speed || 1;
    // });
    // `
  });
}

function loadValue() {
  chrome.storage.local.get(['speed'], function(object) {
    let pageList = document.getElementById('displayWords');
    if (object.speed) {
        document.getElementById('slider').value = object.speed;
        document.getElementById('slider').oninput();
    }
  });
}
loadValue();


// Update the textbox from the slider
document.getElementById('slider').oninput = function() {
  document.getElementById('textbox').value = document.getElementById('slider').value;
  // document.getElementById('textbox').oninput();
  // console.log("slider.oninput: " + document.getElementById('slider'));
  saveValue(document.getElementById('slider').value);
}



// Update the datastore and page from the textbox
// document.getElementById('textbox').oninput = saveValue();
document.getElementById('textbox').addEventListener('input', onChange, false);

document.getElementById('reset').onclick = function() {
  document.getElementById('slider').value = 1.0;
  document.getElementById('slider').oninput();
  saveValue(1.0);
}

/*
Notes:
is it possible to just override the video tag altogether? Then I don't have to care about listeners or anything

*/

