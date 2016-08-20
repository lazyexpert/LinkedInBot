/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/*
	  This file is managering the popup window of the extension
	  Basically, its the starting point
	 */

	(function () {
	  "use strict";

	  var DOM = {
	    keywords: document.getElementById('keywords'),
	    minus: document.getElementById('minus'),
	    count: document.getElementById('count'),
	    interval: document.getElementById('interval'),
	    start: document.getElementById('startBot'),
	    stop: document.getElementById('stopBot'),
	    save: document.getElementById('savePreset'),
	    load: document.getElementById('loadPreset')
	  };

	  /* EVENTS */
	  function initEvents() {
	    DOM.start.addEventListener('click', handlers.start.bind(this));
	    DOM.stop.addEventListener('click', handlers.stop.bind(this));
	    DOM.save.addEventListener('click', handlers.save.bind(this));
	    DOM.load.addEventListener('click', handlers.load.bind(this));

	    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	      if (request.type = "pageReload") {
	        console.log(request.data);
	      }
	    });
	  }

	  var handlers = {
	    start: function start(e) {
	      console.log("Starting events chain...");

	      chrome.tabs.executeScript(null, { file: "js/contentScript.js" });

	      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	        chrome.tabs.sendMessage(tabs[0].id, { type: "tryStartLinkedInBot", data: collectData() });
	      });
	    },

	    stop: function stop(e) {
	      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	        chrome.tabs.sendMessage(tabs[0].id, { type: "stopLinkedInBot" });
	      });
	    },

	    save: function save(e) {
	      localStorage.linkedInBotData = JSON.stringify({
	        keywords: DOM.keywords.value,
	        minus: DOM.minus.value,
	        count: DOM.count.value,
	        interval: DOM.interval.value
	      });
	    },

	    load: function load(e) {
	      if (!localStorage.linkedInBotData) return;
	      var data = JSON.parse(localStorage.linkedInBotData);

	      DOM.keywords.value = data.keywords || "";
	      DOM.minus.value = data.minus || "";
	      DOM.count.value = data.count | 0;
	      DOM.interval.value = data.interval | 0;
	    }
	  };

	  function collectData() {
	    var keywords = void 0,
	        minus = void 0,
	        count = void 0,
	        interval = void 0;

	    keywords = DOM.keywords.value;

	    if (keywords.length) {
	      keywords = keywords.split(/,\s*/g);
	    }

	    minus = DOM.minus.value;

	    if (minus.length) {
	      minus = minus.split(/,\s*/g);
	    }

	    count = DOM.count.value | 0;
	    interval = DOM.interval.value | 0;

	    return { keywords: keywords, minus: minus, count: count, interval: interval };
	  }

	  initEvents();
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDBmMGUyZGUzYzAwMDg4ZTEyYTQzIiwid2VicGFjazovLy9kZXYvcG9wdXBFeHRlbnNpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwZjBlMmRlM2MwMDA4OGUxMmE0M1xuICoqLyIsIi8qXG4gIFRoaXMgZmlsZSBpcyBtYW5hZ2VyaW5nIHRoZSBwb3B1cCB3aW5kb3cgb2YgdGhlIGV4dGVuc2lvblxuICBCYXNpY2FsbHksIGl0cyB0aGUgc3RhcnRpbmcgcG9pbnRcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiXG5cbiAgdmFyIERPTSA9IHtcbiAgICBrZXl3b3JkcyA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXl3b3JkcycpLFxuICAgIG1pbnVzIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbnVzJyksXG4gICAgY291bnQgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnQnKSxcbiAgICBpbnRlcnZhbCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnRlcnZhbCcpLFxuICAgIHN0YXJ0IDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Qm90JyksXG4gICAgc3RvcCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdG9wQm90JyksXG4gICAgc2F2ZSA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlUHJlc2V0JyksXG4gICAgbG9hZCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkUHJlc2V0JylcbiAgfVxuXG4gIC8qIEVWRU5UUyAqL1xuICBmdW5jdGlvbiBpbml0RXZlbnRzKCkge1xuICAgIERPTS5zdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJzLnN0YXJ0LmJpbmQodGhpcykpXG4gICAgRE9NLnN0b3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVycy5zdG9wLmJpbmQodGhpcykpXG4gICAgRE9NLnNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVycy5zYXZlLmJpbmQodGhpcykpXG4gICAgRE9NLmxvYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVycy5sb2FkLmJpbmQodGhpcykpXG5cbiAgICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgaWYocmVxdWVzdC50eXBlPVwicGFnZVJlbG9hZFwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVxdWVzdC5kYXRhKVxuICAgICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHZhciBoYW5kbGVycyA9IHtcbiAgICBzdGFydCA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIGV2ZW50cyBjaGFpbi4uLlwiKVxuXG4gICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KG51bGwsIHtmaWxlOiBcImpzL2NvbnRlbnRTY3JpcHQuanNcIn0pO1xuXG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgZnVuY3Rpb24odGFicykge1xuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7dHlwZTogXCJ0cnlTdGFydExpbmtlZEluQm90XCIsIGRhdGEgOiBjb2xsZWN0RGF0YSgpIH0pXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBzdG9wIDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHt0eXBlOiBcInN0b3BMaW5rZWRJbkJvdFwifSlcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIHNhdmUgOiBmdW5jdGlvbiAoZSkge1xuICAgICAgbG9jYWxTdG9yYWdlLmxpbmtlZEluQm90RGF0YSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAga2V5d29yZHMgOiBET00ua2V5d29yZHMudmFsdWUsXG4gICAgICAgIG1pbnVzIDogRE9NLm1pbnVzLnZhbHVlLFxuICAgICAgICBjb3VudCA6IERPTS5jb3VudC52YWx1ZSxcbiAgICAgICAgaW50ZXJ2YWwgOiBET00uaW50ZXJ2YWwudmFsdWVcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIGxvYWQgOiBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYoICFsb2NhbFN0b3JhZ2UubGlua2VkSW5Cb3REYXRhICkgcmV0dXJuXG4gICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmxpbmtlZEluQm90RGF0YSlcblxuICAgICAgRE9NLmtleXdvcmRzLnZhbHVlID0gZGF0YS5rZXl3b3JkcyB8fCBcIlwiXG4gICAgICBET00ubWludXMudmFsdWUgPSBkYXRhLm1pbnVzIHx8IFwiXCJcbiAgICAgIERPTS5jb3VudC52YWx1ZSA9IGRhdGEuY291bnQgfCAwXG4gICAgICBET00uaW50ZXJ2YWwudmFsdWUgPSBkYXRhLmludGVydmFsIHwgMFxuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gY29sbGVjdERhdGEoKSB7XG4gICAgbGV0IGtleXdvcmRzLCBtaW51cywgY291bnQsIGludGVydmFsXG5cbiAgICBrZXl3b3JkcyA9IERPTS5rZXl3b3Jkcy52YWx1ZVxuXG4gICAgaWYoa2V5d29yZHMubGVuZ3RoKSB7XG4gICAgICBrZXl3b3JkcyA9IGtleXdvcmRzLnNwbGl0KC8sXFxzKi9nKVxuICAgIH1cblxuICAgIG1pbnVzID0gRE9NLm1pbnVzLnZhbHVlXG5cbiAgICBpZihtaW51cy5sZW5ndGgpIHtcbiAgICAgIG1pbnVzID0gbWludXMuc3BsaXQoLyxcXHMqL2cpXG4gICAgfVxuXG4gICAgY291bnQgPSBET00uY291bnQudmFsdWUgfCAwXG4gICAgaW50ZXJ2YWwgPSBET00uaW50ZXJ2YWwudmFsdWUgfCAwXG5cbiAgICByZXR1cm4geyBrZXl3b3JkcywgbWludXMsIGNvdW50LCBpbnRlcnZhbCB9XG4gIH1cblxuXG4gIGluaXRFdmVudHMoKVxufSkoKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZGV2L3BvcHVwRXh0ZW5zaW9uLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbENBO0FBQ0E7QUFxQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9