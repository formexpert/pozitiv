jQuery(document).ready(function() {
	
	var browser = {
			chrome: false,
			mozilla: false,
			opera: false,
			msie: false,
			safari: false
		};
		var sBrowser, sUsrAg = navigator.userAgent;
		if(sUsrAg.indexOf("Chrome") > -1) {
			browser.chrome = true;
		} else if (sUsrAg.indexOf("Safari") > -1) {
			browser.safari = true;
		} else if (sUsrAg.indexOf("Opera") > -1) {
			browser.opera = true;
		} else if (sUsrAg.indexOf("Firefox") > -1) {
			browser.mozilla = true;
		} else if (sUsrAg.indexOf("MSIE") > -1) {
			browser.msie = true;
			browser.version = 0;
			if(sUsrAg.match(/MSIE ([0-9]+)\./)) {
				browser.version = RegExp.$1;
				$('html').addClass('ie'+browser.version);
				if (browser.version<10) { $('input, textarea').placeholder(); }
			}
		} else if (sUsrAg.match(/Trident\/7\./)) {
				$('html').addClass('ie11');
		}
		
	jQuery.browser = browser;

		
});
