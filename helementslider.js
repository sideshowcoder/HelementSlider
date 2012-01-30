/*!
 * HELemenetSlider
 * Examples and documentation at: 
 * http://sideshowcoder.com
 * 2012 Philipp Fehre
 * Version: 0.1 (25-JAN-2012)
 * Licensed under the BSD license:
 * http://www.opensource.org/licenses/bsd-license.php
 * Requires:
 * jQuery v1.4.4 or later
 * 
 */
 
(function( $ ){
  
  that = this;
      
  var methods = {
    
    init: function( settings ) {
      
      that = this;
      
      settings = $.extend({
        duration: 500,
        subSelector: 'li',
        active: 0
      }, settings );
      
      return this.each( function( ) {
        
        var $this = $(this),
            data = $this.data('helementslider'),
            elements, i;
        
        // initialize the plugin because it has not been initialized yet
        if( ! data ) {
          $this.data('helementslider', settings);
         
          // hide all besides the initial active element
          $this.children(settings.elSelector).each( function( idx ) {
            if( idx !== settings.active ) {
              $(this).hide();
            }
          });
        }        
      });
    },
        
    slideTo: function( pos ) {
      return this.each( function( ) {

        var $this = $(this),
            data = $this.data('helementslider'),
            elements = $this.children(data.elSelector),
            inDirection, outDirection;

        if( pos === data.active ) {
          return;
        }
        
        if( pos > data.active ) {
          inDirection = 'right';
          outDirection = 'left';
        } else {
          inDirection = 'left';
          outDirection = 'right';
        }
                        
        elements.each( function( idx ) {
          if( idx === data.active ) {
            $(this).css('z-index', -100);
            $(this).hide('slide',{direction:outDirection},500);
          }
        });
        elements.each( function( idx ) {
          if( idx === pos ) {
            $(this).css('z-index', 100);
            $(this).show('slide',{direction:inDirection},500);          }
        });
        
        data.active = pos;
      });      
    }
  };

  $.fn.helementSlider = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.helementSlider' );
    }      
  
  };
})( jQuery );