(function() {
  "use strict"

  let DOM = {
    keywords : document.getElementById('keywords'),
    minus : document.getElementById('minus'),
    count : document.getElementById('count'),
    interval : document.getElementById('interval'),
    start : document.getElementById('startBot'),
    stop : document.getElementById('stopBot'),
    save : document.getElementById('savePreset'),
    load : document.getElementById('loadPreset')
  }

  /* EVENTS */
  function initEvents() {
    DOM.start.addEventListener('click', onStartClick.bind(this))
    DOM.stop.addEventListener('click', onStopClick.bind(this))
    DOM.save.addEventListener('click', onSaveClick.bind(this))
    DOM.load.addEventListener('click', onLoadClick.bind(this))
  }

  function onStartClick(e) {
    console.log("Starting events chain...")

    chrome.tabs.executeScript(null, {file: "js/start.js"});

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "tryStartLinkedInBot", data : collectData() })
    })
  }

  function onStopClick(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "stopLinkedInBot"})
    })
  }

  function onSaveClick(e) {
    localStorage.linkedInBotData = JSON.stringify({
      keywords : DOM.keywords.value,
      minus : DOM.minus.value,
      count : DOM.count.value,
      interval : DOM.interval.value
    })
  }

  function onLoadClick(e) {
    if( !localStorage.linkedInBotData ) return
    let data = JSON.parse(localStorage.linkedInBotData)

    DOM.keywords.value = data.keywords || ""
    DOM.minus.value = data.minus || ""
    DOM.count.value = data.count | 0
    DOM.interval.value = data.interval | 0
  }

  function collectData() {
    let keywords, minus, count, interval

    keywords = DOM.keywords.value

    if(keywords.length) {
      keywords = keywords.split(/,/g)
      keywords.forEach(keyword => keyword.trim())
    }

    minus = DOM.minus.value

    if(minus.length) {
      minus = minus.split(/,/g)
      minus.forEach(el => el.trim())
    }

    count = DOM.count.value | 0
    interval = DOM.interval.value | 0

    return { keywords, minus, count, interval }
  }


  initEvents()
})()
