/*
* @Author: Alex Dong
* @Date:   2022-07-22 10:22:00
* @Last Modified by:   Alex Dong
* @Last Modified time: 2022-07-22 15:07:21
*/

(function($) {
    'use strict';
    var scriptSelector = 'script[type="text/translatexy"]',
        dataAttr = 'data-translatexy';
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
			    		translatexyDelay  = $element.data('translatexy-delay') ? parseInt($element.data('translatexy-delay')) : 0,
			    		translatexySort   = Object.keys(translatexy).sort().reverse().reduce((r, k) => (r[k] = translatexy[k], r), {});
			    		console.log(translatexyDelay);
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
