/*
 *  This file is entry point for content script
 */
 (function() {
   "use strict"  

   let ctx = {}

   chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
       if (request.type == "tryStartLinkedInBot") {
         console.log("OK, trying to start bot")

         if( checkPage() ) {
           console.log("Page correct - starting")

           ctx.bot = {
             keywords : [],
             selectors : {
               card: ".pymk-card",
               desc: ".pymk-card__details span.pymk-card__occupation",
               add: ".pymk-card__action-container button.button-secondary-small",
               cancel: ".pymk-card__close-btn"
             },
             start : function( options ) {
               if( !(options && options.keywords) ) return;

               if( typeof this.timer !== "undefined" )
                 clearInterval(this.timer)

               ctx.options = options

               this.keywords = options.keywords || []

               this.minus = options.minus || []

               this.count = options.count || Number.MAX_VALUE

               this.interval = options.interval || 2000

               this.timer = setInterval( function() {

                 this.tick()

               }.bind(this), this.interval)

             },

             stop : function() { clearInterval(this.timer) },

             tick : function() {
               let count = document.querySelectorAll( this.selectors.card ).length
               if(count <= 12 )
                 this.scroll()

               var person = document.querySelector( this.selectors.card )
               if ( person ) {
                 var description = person.querySelector( this.selectors.desc ).innerHTML

                 if( this.test(description) && !this.hasMinus(description) ) {
                   let btn  = person.querySelector( this.selectors.add )
                   if(!btn) {
                     person.querySelector( this.selectors.cancel ).click()

                     console.log(description + ": no match")
                   } else {
                       btn.click()
                       this.count--

                       console.info("Added:" + description)
                       console.info("Added 1. Left:" + this.count)
                   }
                 } else {
                   person.querySelector( this.selectors.cancel ).click()

                   console.log(description + ": no match")
                 }

                 if( !this.count )
                   this.stop()

               } else {
                 chrome.runtime.sendMessage({type : 'pageRefresh', data : ctx.options})
                 window.location.reload()
               }
             },

             scroll : function() {

               window.scroll(0, parseInt(window.getComputedStyle(document.body).height))

               setTimeout(function() {
                 window.scroll(0,0)
               }, 500)
             },

             test : function(str) {
               for( var t = 0; t < this.keywords.length; t++ )
                 if ( new RegExp(this.keywords[t].toLowerCase()).test( str.toLowerCase() ) )
                   return true

               return false
             },

             hasMinus : function(str) {
               for( var t = 0; t < this.minus.length; t++ )
                 if( new RegExp( this.minus[t].toLowerCase()).test( str.toLowerCase() ) )
                   return true

               return false
             }
           }
           ctx.bot.start(request.data)

         } else console.log("Wrong page, sorry =)")

       } else if(request.type == "stopLinkedInBot" )
         if(ctx.bot)
           ctx.bot.stop()

     })

   function checkPage() {
     if( /linkedin.com/.test(window.location.host) && /people\/pymk/.test(window.location.href))
       return true
     else return false
   }
 })()
