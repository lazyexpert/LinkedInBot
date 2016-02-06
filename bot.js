var bot = {
  keywords : [],
  selectors : {
    card: ".card.pymk-card",
    desc: "p.headline span",
    add: ".bt-request-buffed",
    cancel: ".bt-close"
  },
  start : function( options ) {
    if( !(options && options.keywords) ) return;

    if( typeof this.timer !== "undefined" ) 
      clearInterval(this.timer)

    this.keywords = options.keywords || []

    this.minus = options.minus || []

    this.count = options.count || Number.MAX_VALUE

    this.interval = options.interval || 2000

    this.timer = setInterval( function() {

      this.tick()

    }.bind(this), this.interval)

  },

  stop : function() {

    clearInterval(this.timer)

  },

  tick : function() {

    var person = document.querySelector( this.selectors.card )
    if ( person ) {
      var description = person.querySelector( this.selectors.desc ).innerHTML

      if( this.test(description) && !this.hasMinus(description) ) {
      	person.querySelector( this.selectors.add ).click()

      	this.count--

        console.info("Added:" + description)
      	console.info("Added 1. Left:" + this.count)


      } else {
      	person.querySelector( this.selectors.cancel ).click()

      	console.log(description + ": no match")
      }

      if( !this.count )
      	this.stop()

    } else {
      window.scroll(0,500)

      setTimeout( function() {
      	window.scroll(0,0)
      }, 1000)

    }

  },

  test : function(str) {
    for( var t = 0; t < this.keywords.length; t++ )
      if ( new RegExp(this.keywords[t], 'i').test( str.toLowerCase() ) )
        return true

    return false
  },

  hasMinus : function(str) {
    for( var t = 0; t < this.minus.length; t++ )
      if( new RegExp( this.minus[t], 'i').test( str.toLowerCase() ) )
	return true

    return false
  }
}
