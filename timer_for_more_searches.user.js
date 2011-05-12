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
				var google = document.createElement("p");
				google.appendChild(document.createTextNode("Alternatively, try your search in Google:"));
				error.parentNode.appendChild(google);
				google = google.cloneNode(false);
				var query = window.location.search.replace("?q=", "http://www.google.com/search?q=site:stackoverflow.com/questions+");
				var googlelink = document.createElement("a");
				googlelink.href = query;
				googlelink.appendChild(document.createTextNode(query.replace("+", " ")));
				googlelink.setAttribute("style", "font-weight: bold;");
				google.appendChild(googlelink);
				error.parentNode.appendChild(google);
				var remaining = 60 - new Date().getMinutes();
				var print = function () {
						var text = "You can only perform 6 searches within a 60 second window, please wait " + remaining + " second";
						if (remaining !== 1) {
								text += "s";
						}
						error.textContent = text + " and try again.";
				}
				print();
				window.setInterval(function () {
						if (remaining-- > 0) {
								print();
						}
				}, 1000);
		}
}());
