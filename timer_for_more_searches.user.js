// ==UserScript==
// @name    Timer for more searches
// @namespace      http://stackexchange.com
// @include     http://*.stackexchange.com/search?q=*
// @include     http://stackoverflow.com/search?q=*
// @include     http://superuser.com/search?q=*
// @include     http://serverfault.com/search?q=*
// @include     http://askubuntu.com/search?q=*
// @include     http://meta.stackoverflow.com/search?q=*
// @include     http://answers.onstartups.com/search?q=*
// @include     http://stackapps.com/search?q=*
// ==/UserScript==
(function () {
    var error = document.querySelector(".page-description > p");
    if (error !== null && error.textContent === "You can only perform 6 searches within a 60 second window, please wait a moment and try again.") {
        var search = window.location.search;
        var q = search.indexOf("q=") + 2;
        var google = "http://www.google.com/search?q=site:stackoverflow.com/questions+" + search.substring(q, search.indexOf("&", q));
        error.innerHTML = "<p>You can only perform 6 searches within a 60 second window, please wait <span id='timeRemaining'></span> and try again.</p><p>Alternatively, try your search in Google:</p><p><b><a href=\"" + google + "\">" + google.replace("+", " ") + "</a></b></p>";
        var timeRemaining = document.getElementById("timeRemaining");
        var remaining = 60 - new Date().getSeconds();
        var timer;
        var print = function (a) {
            if (a === true) {
                timer = window.setInterval(print, 1000);
            }
            remaining--;
            if (remaining === 1) {
                timeRemaining.textContent = "1 second";
            } else if (remaining > 0) {
                timeRemaining.textContent = remaining + " seconds";
            } else {
                window.clearInterval(timer);
            }
        };
        print(false);
        window.setTimeout(function () {
            print(true);
        }, 1000 - (new Date().milliseconds % 1000));
    }
}());
