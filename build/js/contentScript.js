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

	"use strict";

	/*
	 *  This file is entry point for content script
	 */
	(function () {
	  "use strict";

	  var ctx = {};

	  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == "tryStartLinkedInBot") {
	      console.log("OK, trying to start bot");

	      if (checkPage()) {
	        console.log("Page correct - starting");

	        ctx.bot = {
	          keywords: [],
	          selectors: {
	            card: ".card.pymk-card",
	            desc: "p.headline span",
	            add: ".bt-request-buffed",
	            cancel: ".bt-close"
	          },
	          start: function start(options) {
	            if (!(options && options.keywords)) return;

	            if (typeof this.timer !== "undefined") clearInterval(this.timer);

	            ctx.options = options;

	            this.keywords = options.keywords || [];

	            this.minus = options.minus || [];

	            this.count = options.count || Number.MAX_VALUE;

	            this.interval = options.interval || 2000;

	            this.timer = setInterval(function () {

	              this.tick();
	            }.bind(this), this.interval);
	          },

	          stop: function stop() {
	            clearInterval(this.timer);
	          },

	          tick: function tick() {
	            var count = document.querySelectorAll(this.selectors.card).length;
	            if (count <= 12) this.scroll();

	            var person = document.querySelector(this.selectors.card);
	            if (person) {
	              var description = person.querySelector(this.selectors.desc).innerHTML;

	              if (this.test(description) && !this.hasMinus(description)) {
	                var btn = person.querySelector(this.selectors.add);
	                if (!btn) {
	                  person.querySelector(this.selectors.cancel).click();

	                  console.log(description + ": no match");
	                } else {
	                  btn.click();
	                  this.count--;

	                  console.info("Added:" + description);
	                  console.info("Added 1. Left:" + this.count);
	                }
	              } else {
	                person.querySelector(this.selectors.cancel).click();

	                console.log(description + ": no match");
	              }

	              if (!this.count) this.stop();
	            } else {
	              chrome.runtime.sendMessage({ type: 'pageRefresh', data: ctx.options });
	              window.location.reload();
	            }
	          },

	          scroll: function scroll() {

	            window.scroll(0, parseInt(window.getComputedStyle(document.body).height));

	            setTimeout(function () {
	              window.scroll(0, 0);
	            }, 500);
	          },

	          test: function test(str) {
	            for (var t = 0; t < this.keywords.length; t++) {
	              if (new RegExp(this.keywords[t].toLowerCase()).test(str.toLowerCase())) return true;
	            }return false;
	          },

	          hasMinus: function hasMinus(str) {
	            for (var t = 0; t < this.minus.length; t++) {
	              if (new RegExp(this.minus[t].toLowerCase()).test(str.toLowerCase())) return true;
	            }return false;
	          }
	        };
	        ctx.bot.start(request.data);
	      } else console.log("Wrong page, sorry =)");
	    } else if (request.type == "stopLinkedInBot") if (ctx.bot) ctx.bot.stop();
	  });

	  function checkPage() {
	    if (/linkedin.com/.test(window.location.host) && /people\/pymk/.test(window.location.href)) return true;else return false;
	  }
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZTBjYzA0YzgwZjkxZDBjNTc1NSIsIndlYnBhY2s6Ly8vZGV2L2NvbnRlbnRTY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjZTBjYzA0YzgwZjkxZDBjNTc1NVxuICoqLyIsIi8qXG4gKiAgVGhpcyBmaWxlIGlzIGVudHJ5IHBvaW50IGZvciBjb250ZW50IHNjcmlwdFxuICovXG4gKGZ1bmN0aW9uKCkge1xuICAgXCJ1c2Ugc3RyaWN0XCIgIFxuXG4gICBsZXQgY3R4ID0ge31cblxuICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKCBmdW5jdGlvbihyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgIGlmIChyZXF1ZXN0LnR5cGUgPT0gXCJ0cnlTdGFydExpbmtlZEluQm90XCIpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiT0ssIHRyeWluZyB0byBzdGFydCBib3RcIilcblxuICAgICAgICAgaWYoIGNoZWNrUGFnZSgpICkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2UgY29ycmVjdCAtIHN0YXJ0aW5nXCIpXG5cbiAgICAgICAgICAgY3R4LmJvdCA9IHtcbiAgICAgICAgICAgICBrZXl3b3JkcyA6IFtdLFxuICAgICAgICAgICAgIHNlbGVjdG9ycyA6IHtcbiAgICAgICAgICAgICAgIGNhcmQ6IFwiLmNhcmQucHltay1jYXJkXCIsXG4gICAgICAgICAgICAgICBkZXNjOiBcInAuaGVhZGxpbmUgc3BhblwiLFxuICAgICAgICAgICAgICAgYWRkOiBcIi5idC1yZXF1ZXN0LWJ1ZmZlZFwiLFxuICAgICAgICAgICAgICAgY2FuY2VsOiBcIi5idC1jbG9zZVwiXG4gICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICBzdGFydCA6IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuICAgICAgICAgICAgICAgaWYoICEob3B0aW9ucyAmJiBvcHRpb25zLmtleXdvcmRzKSApIHJldHVybjtcblxuICAgICAgICAgICAgICAgaWYoIHR5cGVvZiB0aGlzLnRpbWVyICE9PSBcInVuZGVmaW5lZFwiIClcbiAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuXG4gICAgICAgICAgICAgICBjdHgub3B0aW9ucyA9IG9wdGlvbnNcblxuICAgICAgICAgICAgICAgdGhpcy5rZXl3b3JkcyA9IG9wdGlvbnMua2V5d29yZHMgfHwgW11cblxuICAgICAgICAgICAgICAgdGhpcy5taW51cyA9IG9wdGlvbnMubWludXMgfHwgW11cblxuICAgICAgICAgICAgICAgdGhpcy5jb3VudCA9IG9wdGlvbnMuY291bnQgfHwgTnVtYmVyLk1BWF9WQUxVRVxuXG4gICAgICAgICAgICAgICB0aGlzLmludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbCB8fCAyMDAwXG5cbiAgICAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgdGhpcy50aWNrKClcblxuICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCB0aGlzLmludGVydmFsKVxuXG4gICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgIHN0b3AgOiBmdW5jdGlvbigpIHsgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKSB9LFxuXG4gICAgICAgICAgICAgdGljayA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggdGhpcy5zZWxlY3RvcnMuY2FyZCApLmxlbmd0aFxuICAgICAgICAgICAgICAgaWYoY291bnQgPD0gMTIgKVxuICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbCgpXG5cbiAgICAgICAgICAgICAgIHZhciBwZXJzb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCB0aGlzLnNlbGVjdG9ycy5jYXJkIClcbiAgICAgICAgICAgICAgIGlmICggcGVyc29uICkge1xuICAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBwZXJzb24ucXVlcnlTZWxlY3RvciggdGhpcy5zZWxlY3RvcnMuZGVzYyApLmlubmVySFRNTFxuXG4gICAgICAgICAgICAgICAgIGlmKCB0aGlzLnRlc3QoZGVzY3JpcHRpb24pICYmICF0aGlzLmhhc01pbnVzKGRlc2NyaXB0aW9uKSApIHtcbiAgICAgICAgICAgICAgICAgICBsZXQgYnRuICA9IHBlcnNvbi5xdWVyeVNlbGVjdG9yKCB0aGlzLnNlbGVjdG9ycy5hZGQgKVxuICAgICAgICAgICAgICAgICAgIGlmKCFidG4pIHtcbiAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5xdWVyeVNlbGVjdG9yKCB0aGlzLnNlbGVjdG9ycy5jYW5jZWwgKS5jbGljaygpXG5cbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlc2NyaXB0aW9uICsgXCI6IG5vIG1hdGNoXCIpXG4gICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgYnRuLmNsaWNrKClcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3VudC0tXG5cbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiQWRkZWQ6XCIgKyBkZXNjcmlwdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwiQWRkZWQgMS4gTGVmdDpcIiArIHRoaXMuY291bnQpXG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgIHBlcnNvbi5xdWVyeVNlbGVjdG9yKCB0aGlzLnNlbGVjdG9ycy5jYW5jZWwgKS5jbGljaygpXG5cbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbiArIFwiOiBubyBtYXRjaFwiKVxuICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgaWYoICF0aGlzLmNvdW50IClcbiAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKVxuXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7dHlwZSA6ICdwYWdlUmVmcmVzaCcsIGRhdGEgOiBjdHgub3B0aW9uc30pXG4gICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICBzY3JvbGwgOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLCBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5oZWlnaHQpKVxuXG4gICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsMClcbiAgICAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgdGVzdCA6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgZm9yKCB2YXIgdCA9IDA7IHQgPCB0aGlzLmtleXdvcmRzLmxlbmd0aDsgdCsrIClcbiAgICAgICAgICAgICAgICAgaWYgKCBuZXcgUmVnRXhwKHRoaXMua2V5d29yZHNbdF0udG9Mb3dlckNhc2UoKSkudGVzdCggc3RyLnRvTG93ZXJDYXNlKCkgKSApXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgIGhhc01pbnVzIDogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICBmb3IoIHZhciB0ID0gMDsgdCA8IHRoaXMubWludXMubGVuZ3RoOyB0KysgKVxuICAgICAgICAgICAgICAgICBpZiggbmV3IFJlZ0V4cCggdGhpcy5taW51c1t0XS50b0xvd2VyQ2FzZSgpKS50ZXN0KCBzdHIudG9Mb3dlckNhc2UoKSApIClcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgY3R4LmJvdC5zdGFydChyZXF1ZXN0LmRhdGEpXG5cbiAgICAgICAgIH0gZWxzZSBjb25zb2xlLmxvZyhcIldyb25nIHBhZ2UsIHNvcnJ5ID0pXCIpXG5cbiAgICAgICB9IGVsc2UgaWYocmVxdWVzdC50eXBlID09IFwic3RvcExpbmtlZEluQm90XCIgKVxuICAgICAgICAgaWYoY3R4LmJvdClcbiAgICAgICAgICAgY3R4LmJvdC5zdG9wKClcblxuICAgICB9KVxuXG4gICBmdW5jdGlvbiBjaGVja1BhZ2UoKSB7XG4gICAgIGlmKCAvbGlua2VkaW4uY29tLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ob3N0KSAmJiAvcGVvcGxlXFwvcHltay8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZikpXG4gICAgICAgcmV0dXJuIHRydWVcbiAgICAgZWxzZSByZXR1cm4gZmFsc2VcbiAgIH1cbiB9KSgpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBkZXYvY29udGVudFNjcmlwdC5qc1xuICoqLyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBS0E7QUE5RkE7QUFnR0E7QUFFQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFHQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=