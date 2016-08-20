/*
  This file is managering the popup window of the extension
  Basically, its the starting point
 */

(function() {
  "use strict"

  var DOM = {
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
    DOM.start.addEventListener('click', handlers.start.bind(this))
    DOM.stop.addEventListener('click', handlers.stop.bind(this))
    DOM.save.addEventListener('click', handlers.save.bind(this))
    DOM.load.addEventListener('click', handlers.load.bind(this))

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.type="pageReload") {
          console.log(request.data)
        }
    })
  }

  var handlers = {
    start : function (e) {
      console.log("Starting events chain...")

      chrome.tabs.executeScript(null, {file: "js/contentScript.js"});

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "tryStartLinkedInBot", data : collectData() })
      })
    },

    stop : function (e) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "stopLinkedInBot"})
      })
    },

    save : function (e) {
      localStorage.linkedInBotData = JSON.stringify({
        keywords : DOM.keywords.value,
        minus : DOM.minus.value,
        count : DOM.count.value,
        interval : DOM.interval.value
      })
    },

    load : function (e) {
      if( !localStorage.linkedInBotData ) return
      let data = JSON.parse(localStorage.linkedInBotData)

      DOM.keywords.value = data.keywords || ""
      DOM.minus.value = data.minus || ""
      DOM.count.value = data.count | 0
      DOM.interval.value = data.interval | 0
    }
  }


  function collectData() {
    let keywords, minus, count, interval

    keywords = DOM.keywords.value

    if(keywords.length) {
      keywords = keywords.split(/,\s*/g)
    }

    minus = DOM.minus.value

    if(minus.length) {
      minus = minus.split(/,\s*/g)
    }

    count = DOM.count.value | 0
    interval = DOM.interval.value | 0

    return { keywords, minus, count, interval }
  }


  initEvents()
})()
