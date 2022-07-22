/*
* @Author: Alex Dong
* @Date:   2022-07-22 10:22:00
* @Last Modified by:   Alex Dong
* @Last Modified time: 2022-07-22 14:14:56
*/

(function($) {
    'use strict';
    var scriptSelector = 'script[type="text/translatexy"]',
        dataAttr = 'data-translatexy',
        virtuals = [];
	$(document).ready(function() {
		var translateXY = (function fn() {
		 		var $translatexyScript =  $(scriptSelector);
			    var $translatexyData =  $('[data-translatexy');
			    $translatexyData.each(function() {
			    	if($(this).hasClass('translatexy-init')){
			    		return;
			    	}
			    	var $element = $(this),
			    		translatexy  	  = $element.data('translatexy') || {},
			    		translatexyLength = translatexy.length,
			    		translatexyDelay  = parseInt($element.data('translatexy-delay')),
			    		translatexySort   = Object.keys(translatexy).sort().reverse().reduce((r, k) => (r[k] = translatexy[k], r), {});
					setTimeout(function(){
				    	$.each(translatexySort, function(originalStr, translateStr) {
				    		let regex 	  = new RegExp(originalStr, 'g');
				    		var content   = $element.html().replace(regex,translateStr);
				    		$element.html(content);
				    	});
					}, translatexyDelay);
			    });
		    return fn;
		}());
		$(document).on('contentUpdated', function(){
			translateXY();
		});    
	});
})(jQuery);
