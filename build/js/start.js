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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzQwNzZjODVlOThhMDhjMTQxZjkiLCJ3ZWJwYWNrOi8vL2Rldi9jb250ZW50U2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzQwNzZjODVlOThhMDhjMTQxZjlcbiAqKi8iLCIvKlxuICogIFRoaXMgZmlsZSBpcyBlbnRyeSBwb2ludCBmb3IgY29udGVudCBzY3JpcHRcbiAqL1xuIChmdW5jdGlvbigpIHtcbiAgIFwidXNlIHN0cmljdFwiICBcblxuICAgbGV0IGN0eCA9IHt9XG5cbiAgIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lciggZnVuY3Rpb24ocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICBpZiAocmVxdWVzdC50eXBlID09IFwidHJ5U3RhcnRMaW5rZWRJbkJvdFwiKSB7XG4gICAgICAgICBjb25zb2xlLmxvZyhcIk9LLCB0cnlpbmcgdG8gc3RhcnQgYm90XCIpXG5cbiAgICAgICAgIGlmKCBjaGVja1BhZ2UoKSApIHtcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIGNvcnJlY3QgLSBzdGFydGluZ1wiKVxuXG4gICAgICAgICAgIGN0eC5ib3QgPSB7XG4gICAgICAgICAgICAga2V5d29yZHMgOiBbXSxcbiAgICAgICAgICAgICBzZWxlY3RvcnMgOiB7XG4gICAgICAgICAgICAgICBjYXJkOiBcIi5jYXJkLnB5bWstY2FyZFwiLFxuICAgICAgICAgICAgICAgZGVzYzogXCJwLmhlYWRsaW5lIHNwYW5cIixcbiAgICAgICAgICAgICAgIGFkZDogXCIuYnQtcmVxdWVzdC1idWZmZWRcIixcbiAgICAgICAgICAgICAgIGNhbmNlbDogXCIuYnQtY2xvc2VcIlxuICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgc3RhcnQgOiBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICAgICAgICAgICAgIGlmKCAhKG9wdGlvbnMgJiYgb3B0aW9ucy5rZXl3b3JkcykgKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgIGlmKCB0eXBlb2YgdGhpcy50aW1lciAhPT0gXCJ1bmRlZmluZWRcIiApXG4gICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcblxuICAgICAgICAgICAgICAgY3R4Lm9wdGlvbnMgPSBvcHRpb25zXG5cbiAgICAgICAgICAgICAgIHRoaXMua2V5d29yZHMgPSBvcHRpb25zLmtleXdvcmRzIHx8IFtdXG5cbiAgICAgICAgICAgICAgIHRoaXMubWludXMgPSBvcHRpb25zLm1pbnVzIHx8IFtdXG5cbiAgICAgICAgICAgICAgIHRoaXMuY291bnQgPSBvcHRpb25zLmNvdW50IHx8IE51bWJlci5NQVhfVkFMVUVcblxuICAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG9wdGlvbnMuaW50ZXJ2YWwgfHwgMjAwMFxuXG4gICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgIHRoaXMudGljaygpXG5cbiAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgdGhpcy5pbnRlcnZhbClcblxuICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICBzdG9wIDogZnVuY3Rpb24oKSB7IGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcikgfSxcblxuICAgICAgICAgICAgIHRpY2sgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgIGxldCBjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIHRoaXMuc2VsZWN0b3JzLmNhcmQgKS5sZW5ndGhcbiAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDEyIClcbiAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGwoKVxuXG4gICAgICAgICAgICAgICB2YXIgcGVyc29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggdGhpcy5zZWxlY3RvcnMuY2FyZCApXG4gICAgICAgICAgICAgICBpZiAoIHBlcnNvbiApIHtcbiAgICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gcGVyc29uLnF1ZXJ5U2VsZWN0b3IoIHRoaXMuc2VsZWN0b3JzLmRlc2MgKS5pbm5lckhUTUxcblxuICAgICAgICAgICAgICAgICBpZiggdGhpcy50ZXN0KGRlc2NyaXB0aW9uKSAmJiAhdGhpcy5oYXNNaW51cyhkZXNjcmlwdGlvbikgKSB7XG4gICAgICAgICAgICAgICAgICAgbGV0IGJ0biAgPSBwZXJzb24ucXVlcnlTZWxlY3RvciggdGhpcy5zZWxlY3RvcnMuYWRkIClcbiAgICAgICAgICAgICAgICAgICBpZighYnRuKSB7XG4gICAgICAgICAgICAgICAgICAgICBwZXJzb24ucXVlcnlTZWxlY3RvciggdGhpcy5zZWxlY3RvcnMuY2FuY2VsICkuY2xpY2soKVxuXG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZXNjcmlwdGlvbiArIFwiOiBubyBtYXRjaFwiKVxuICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgIGJ0bi5jbGljaygpXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY291bnQtLVxuXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkFkZGVkOlwiICsgZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIkFkZGVkIDEuIExlZnQ6XCIgKyB0aGlzLmNvdW50KVxuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICBwZXJzb24ucXVlcnlTZWxlY3RvciggdGhpcy5zZWxlY3RvcnMuY2FuY2VsICkuY2xpY2soKVxuXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGVzY3JpcHRpb24gKyBcIjogbm8gbWF0Y2hcIilcbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgIGlmKCAhdGhpcy5jb3VudCApXG4gICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKClcblxuICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe3R5cGUgOiAncGFnZVJlZnJlc2gnLCBkYXRhIDogY3R4Lm9wdGlvbnN9KVxuICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgc2Nyb2xsIDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KSlcblxuICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbCgwLDApXG4gICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgIHRlc3QgOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgIGZvciggdmFyIHQgPSAwOyB0IDwgdGhpcy5rZXl3b3Jkcy5sZW5ndGg7IHQrKyApXG4gICAgICAgICAgICAgICAgIGlmICggbmV3IFJlZ0V4cCh0aGlzLmtleXdvcmRzW3RdLnRvTG93ZXJDYXNlKCkpLnRlc3QoIHN0ci50b0xvd2VyQ2FzZSgpICkgKVxuICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICBoYXNNaW51cyA6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgZm9yKCB2YXIgdCA9IDA7IHQgPCB0aGlzLm1pbnVzLmxlbmd0aDsgdCsrIClcbiAgICAgICAgICAgICAgICAgaWYoIG5ldyBSZWdFeHAoIHRoaXMubWludXNbdF0udG9Mb3dlckNhc2UoKSkudGVzdCggc3RyLnRvTG93ZXJDYXNlKCkgKSApXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgICAgIGN0eC5ib3Quc3RhcnQocmVxdWVzdC5kYXRhKVxuXG4gICAgICAgICB9IGVsc2UgY29uc29sZS5sb2coXCJXcm9uZyBwYWdlLCBzb3JyeSA9KVwiKVxuXG4gICAgICAgfSBlbHNlIGlmKHJlcXVlc3QudHlwZSA9PSBcInN0b3BMaW5rZWRJbkJvdFwiIClcbiAgICAgICAgIGlmKGN0eC5ib3QpXG4gICAgICAgICAgIGN0eC5ib3Quc3RvcCgpXG5cbiAgICAgfSlcblxuICAgZnVuY3Rpb24gY2hlY2tQYWdlKCkge1xuICAgICBpZiggL2xpbmtlZGluLmNvbS8udGVzdCh3aW5kb3cubG9jYXRpb24uaG9zdCkgJiYgL3Blb3BsZVxcL3B5bWsvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpKVxuICAgICAgIHJldHVybiB0cnVlXG4gICAgIGVsc2UgcmV0dXJuIGZhbHNlXG4gICB9XG4gfSkoKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogZGV2L2NvbnRlbnRTY3JpcHQuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUtBO0FBOUZBO0FBZ0dBO0FBRUE7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9