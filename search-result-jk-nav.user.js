// ==UserScript==
// @name         Google Results J/K Navigation
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  listen for j or k to be pressed on google search results page and then shift the selected result based on this
// @author       Adam Shaver (@akuyume)
// @match        https://www.google.com/search?*q=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var results = document.querySelectorAll('.g');
    var selectedIndex = -1;

    if (results.length > 0) {
        document.onkeydown = function(e) {
            var typingInSearchBox = document.querySelector('input[type=text][role=combobox]').attributes['aria-haspopup'].value;
            if (typingInSearchBox == "true") {
                // don't do anything when typing
                return;
            }

            switch(e.key.toUpperCase()) {
                case "J":
                    moveNext();
                    break;
                case "K":
                    movePrev();
                    break;
            }
        };
    }

    function moveNext() {
        if (selectedIndex < results.length - 1) {
            resetCurrentResult();
            selectedIndex++;
            highlightSelectedResult();
        }
    }

    function movePrev() {
        if (selectedIndex > 0) {
            resetCurrentResult();
            selectedIndex--;
            highlightSelectedResult();
        }
    }

    function resetCurrentResult() {
        if (selectedIndex > -1 && selectedIndex < results.length) { // sanity check we're in bounds
            results[selectedIndex].style.borderLeft = "";
            results[selectedIndex].style.paddingLeft = "0";
        }
    }

    function highlightSelectedResult() {
        if (selectedIndex > -1 && selectedIndex < results.length) {
            var res = results[selectedIndex];
            res.style.borderLeft = "5px solid #1a73e8";
            res.style.paddingLeft = "10px";
            res.querySelectorAll('.r a')[0].focus();
            res.scrollIntoViewIfNeeded();
        }
    }
})();
