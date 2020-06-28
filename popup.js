document.addEventListener('DOMContentLoaded', function () {
    var enlargeButton = document.getElementById('enlargeFonts');
    enlargeButton.addEventListener('click', function () {
        sendMessage('increase');
    }, false);

    var reduceButton = document.getElementById('reduceFonts');
    reduceButton.addEventListener('click', function () {
        sendMessage('decrease');
    }, false);

    var saveFontButton = document.getElementById('saveFontSize');
    saveFontButton.addEventListener('click', function () {
        sendMessage('save');
    }, false);

    var applySavedFontButton = document.getElementById('applySavedFontSize');
    applySavedFontButton.addEventListener('click', function () {
        sendMessage('applySaved');
    }, false);
    
}, false);


function sendMessage(actionType) {
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, actionType);
    });
}