// ==UserScript==
// @name         GU-KYOMU - Disable interval alert
// @namespace    http://kyn165.github.io
// @version      2024-05-12
// @description  Disable the meaningless alerts that are somehow shown periodically.
// @author       kyn
// @match        https://www.kyomu-sys.gunma-u.ac.jp/portal/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    Object.defineProperty(window, "timeoutAction", {
        value: function(){},
        writable: false,
        configurable: false,
    });
})();
