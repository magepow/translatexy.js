/*
* @Author: Alex Dong
* @Date:   2022-07-22 10:22:00
* @Last Modified by:   Alex Dong
* @Last Modified time: 2022-07-22 15:07:21
*/

(function() {
    'use strict';
	document.addEventListener("DOMContentLoaded", () => {
		var translateXY = (function fn() {
            var $translatexyScript =  document.querySelectorAll('script[type="text/translatexy"]');
            document.querySelectorAll('data-translatexy').forEach((element) => {
                if(element.classList.contains('translatexy-init')) {
                    return;
                }
                var translatexy       = JSON.parse(element.dataset.translatexy) || {},
                    translatexyDelay  = element.dataset.translatexyDelay ? parseInt(element.dataset.translatexyDelay) : 0,
                    translatexySort   = Object.keys(translatexy).sort().reverse().reduce((r, k) => (r[k] = translatexy[k], r), {});
                setTimeout(function(){
                    Object.entries(translatexySort).forEach(entry => {
                        const [originalStr, translateStr] = entry;
                        let regex     = new RegExp(originalStr, 'g');
                        element.getElementsByTagName('*').forEach((el) => {
                            el.innerHTML = el.innerHTML.replace(regex,translateStr);
                        });
                    });
                }, translatexyDelay);
            });
		    return fn;
		}());

	    document.querySelector("body").addEventListener("contentUpdated", function(event){
	        translateXY();
	    });   
	});
})();
