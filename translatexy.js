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
            document.querySelectorAll('[data-translatexy]').forEach((el) => {
                if(el.classList.contains('translatexy-init')) {
                    return;
                }
                var translatexy       = JSON.parse(el.dataset.translatexy) || {},
                    translatexyDelay  = el.dataset.translatexyDelay ? parseInt(el.dataset.translatexyDelay) : 0,
                    translatexySort   = Object.keys(translatexy).sort().reverse().reduce((r, k) => (r[k] = translatexy[k], r), {});
                setTimeout(function(){
                    Object.entries(translatexySort).forEach(entry => {
                        const [originalStr, translateStr] = entry;
                        let regex     = new RegExp(originalStr, 'g');
                        var elements = el.getElementsByTagName('*');
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                        
                            for (var j = 0; j < element.childNodes.length; j++) {
                                var node = element.childNodes[j];
                        
                                if (node.nodeType === 3) {
                                    var text = node.nodeValue;
                                    var replacedText = text.replace(regex,translateStr);
                        
                                    if (replacedText !== text) {
                                        element.replaceChild(document.createTextNode(replacedText), node);
                                    }
                                }
                            }
                        }
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
