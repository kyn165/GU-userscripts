// ==UserScript==
// @name         GU-KYOMU - Disable interval alert
// @namespace    http://kyn165.github.io/GU-userscripts/
// @version      2024-05-12
// @description  Disable the meaningless alerts that are somehow shown periodically.
// @author       kyn
// @match        https://www.kyomu-sys.gunma-u.ac.jp/portal/*
// @match        https://kyn165.github.io/GU-userscripts/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.origin.includes("github.io")){
        (window.__installedExtension ??= []).push(7);
        return;
    }

    Object.defineProperty(window, "timeoutAction", {
        value: function(){},
        writable: false,
        configurable: false,
    });
})();
