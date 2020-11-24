function expand() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { expand: true, type: 'expand' })
    })
}

function extract() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { extract: true, type: 'extract' })
    })
}

function launch() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { launch: true, type: 'launch' })
    })
}
function exportFile() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { exportFile: true, type: 'exportFile' })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("expand").addEventListener("click", expand)
    document.getElementById("extract").addEventListener("click", extract)
    document.getElementById("launch").addEventListener("click", launch)
    document.getElementById("export").addEventListener("click", exportFile)
})


