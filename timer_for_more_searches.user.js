// ==UserScript==
// @name           Timer for more searches
// @namespace      http://stackexchange.com
// @include        http://*.stackexchange.com/search?q=*
// @include        http://stackoverflow.com/search?q=*
// @include        http://superuser.com/search?q=*
// @include        http://serverfault.com/search?q=*
// @include        http://askubuntu.com/search?q=*
// @include        http://meta.stackoverflow.com/search?q=*
// @include        http://answers.onstartups.com/search?q=*
// @include        http://stackapps.com/search?q=*
// ==/UserScript==
(function () {
		var error = document.querySelector(".page-description > p");
		if (error !== null && (error.textContent === "You can only perform 6 searches within a minute, please wait a minute then try again." || error.textContent === "You can only perform 6 searches within a 60 second window, please wait a moment and try again.")) {
				var remaining = 60 - new Date().getMinutes();
				var print = function () {
						error.textContent = "You can only perform 6 searches within a minute, please wait " + remaining + " seconds then try again.";
				}
				print();
				window.setInterval(function () {
						if (remaining-- > 0) {
								print();
						}
				}, 1000);
		}
}());
