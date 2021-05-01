chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    resolveMessage(message);
});

function resolveMessage(message) {
    if (message === messages.SAVE) {
        saveFontSize();
    }
    else if (message === messages.APPLY_SAVED) {
        applySavedFontSize();
    }
    else {
        changeFontSizeInDom(message);
    }
}

function applySavedFontSize() {
    let captionsContainer = getCaptionsElement();
    if (captionsContainer) {
        chrome.storage.local.get('linkedInLearningVideoFontSize', function (result) {
            captionsContainer.style.maxWidth = 'none';
            captionsContainer.style.fontSize = result.linkedInLearningVideoFontSize;
        });
    }
}

function saveFontSize() {
    let captionsContainer = getCaptionsElement();
    if (captionsContainer) {
        chrome.storage.local.set({ "linkedInLearningVideoFontSize": captionsContainer.style.fontSize }, function () {
        });
    }
}

function changeFontSizeInDom(action) {
    let captionsContainer = getCaptionsElement();
    if (captionsContainer) {
        captionsContainer.style.maxWidth = 'none';
        captionsContainer.style.fontSize = `${changeFontSizeBy1px(action, captionsContainer)}px`;
    }
}

function changeFontSizeBy1px(action, element) {
    let style = window.getComputedStyle(element, null).getPropertyValue('font-size');
    let currentSize = parseInt(style);
    if (action === actions.INCREASE) {
        currentSize++;
    }

    if (action === actions.DECREASE) {
        currentSize--;
    }
    return currentSize.toString();
}

function getCaptionsElement() {
    return document.getElementsByClassName('vjs-custom-captions-cue')[0];
}