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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXBFeHRlbnNpb24uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTg4ZDQxOWNiYTJiOTk3M2ZmODEiLCJ3ZWJwYWNrOi8vL2Rldi9wb3B1cEV4dGVuc2lvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDk4OGQ0MTljYmEyYjk5NzNmZjgxXG4gKiovIiwiLypcbiAgVGhpcyBmaWxlIGlzIG1hbmFnZXJpbmcgdGhlIHBvcHVwIHdpbmRvdyBvZiB0aGUgZXh0ZW5zaW9uXG4gIEJhc2ljYWxseSwgaXRzIHRoZSBzdGFydGluZyBwb2ludFxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCJcblxuICB2YXIgRE9NID0ge1xuICAgIGtleXdvcmRzIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tleXdvcmRzJyksXG4gICAgbWludXMgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXMnKSxcbiAgICBjb3VudCA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudCcpLFxuICAgIGludGVydmFsIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludGVydmFsJyksXG4gICAgc3RhcnQgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRCb3QnKSxcbiAgICBzdG9wIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3BCb3QnKSxcbiAgICBzYXZlIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVQcmVzZXQnKSxcbiAgICBsb2FkIDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvYWRQcmVzZXQnKVxuICB9XG5cbiAgLyogRVZFTlRTICovXG4gIGZ1bmN0aW9uIGluaXRFdmVudHMoKSB7XG4gICAgRE9NLnN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcnMuc3RhcnQuYmluZCh0aGlzKSlcbiAgICBET00uc3RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJzLnN0b3AuYmluZCh0aGlzKSlcbiAgICBET00uc2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJzLnNhdmUuYmluZCh0aGlzKSlcbiAgICBET00ubG9hZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJzLmxvYWQuYmluZCh0aGlzKSlcblxuICAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICBpZihyZXF1ZXN0LnR5cGU9XCJwYWdlUmVsb2FkXCIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0LmRhdGEpXG4gICAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdmFyIGhhbmRsZXJzID0ge1xuICAgIHN0YXJ0IDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgZXZlbnRzIGNoYWluLi4uXCIpXG5cbiAgICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQobnVsbCwge2ZpbGU6IFwianMvY29udGVudFNjcmlwdC5qc1wifSk7XG5cbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCBmdW5jdGlvbih0YWJzKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHt0eXBlOiBcInRyeVN0YXJ0TGlua2VkSW5Cb3RcIiwgZGF0YSA6IGNvbGxlY3REYXRhKCkgfSlcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIHN0b3AgOiBmdW5jdGlvbiAoZSkge1xuICAgICAgY2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZX0sIGZ1bmN0aW9uKHRhYnMpIHtcbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwge3R5cGU6IFwic3RvcExpbmtlZEluQm90XCJ9KVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgc2F2ZSA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UubGlua2VkSW5Cb3REYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBrZXl3b3JkcyA6IERPTS5rZXl3b3Jkcy52YWx1ZSxcbiAgICAgICAgbWludXMgOiBET00ubWludXMudmFsdWUsXG4gICAgICAgIGNvdW50IDogRE9NLmNvdW50LnZhbHVlLFxuICAgICAgICBpbnRlcnZhbCA6IERPTS5pbnRlcnZhbC52YWx1ZVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgbG9hZCA6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiggIWxvY2FsU3RvcmFnZS5saW5rZWRJbkJvdERhdGEgKSByZXR1cm5cbiAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UubGlua2VkSW5Cb3REYXRhKVxuXG4gICAgICBET00ua2V5d29yZHMudmFsdWUgPSBkYXRhLmtleXdvcmRzIHx8IFwiXCJcbiAgICAgIERPTS5taW51cy52YWx1ZSA9IGRhdGEubWludXMgfHwgXCJcIlxuICAgICAgRE9NLmNvdW50LnZhbHVlID0gZGF0YS5jb3VudCB8IDBcbiAgICAgIERPTS5pbnRlcnZhbC52YWx1ZSA9IGRhdGEuaW50ZXJ2YWwgfCAwXG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBjb2xsZWN0RGF0YSgpIHtcbiAgICBsZXQga2V5d29yZHMsIG1pbnVzLCBjb3VudCwgaW50ZXJ2YWxcblxuICAgIGtleXdvcmRzID0gRE9NLmtleXdvcmRzLnZhbHVlXG5cbiAgICBpZihrZXl3b3Jkcy5sZW5ndGgpIHtcbiAgICAgIGtleXdvcmRzID0ga2V5d29yZHMuc3BsaXQoLyxcXHMqL2cpXG4gICAgfVxuXG4gICAgbWludXMgPSBET00ubWludXMudmFsdWVcblxuICAgIGlmKG1pbnVzLmxlbmd0aCkge1xuICAgICAgbWludXMgPSBtaW51cy5zcGxpdCgvLFxccyovZylcbiAgICB9XG5cbiAgICBjb3VudCA9IERPTS5jb3VudC52YWx1ZSB8IDBcbiAgICBpbnRlcnZhbCA9IERPTS5pbnRlcnZhbC52YWx1ZSB8IDBcblxuICAgIHJldHVybiB7IGtleXdvcmRzLCBtaW51cywgY291bnQsIGludGVydmFsIH1cbiAgfVxuXG5cbiAgaW5pdEV2ZW50cygpXG59KSgpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkZXYvcG9wdXBFeHRlbnNpb24uanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQUNBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsQ0E7QUFDQTtBQXFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=