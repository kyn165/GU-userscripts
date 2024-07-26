// ==UserScript==
// @name         GULMS - Course Page Scroll Restore
// @namespace    http://kyn165.github.io
// @version      2024-06-02
// @description  Memorize and restore the scroll position in course page
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/course/view.php?id=*
// @match        https://kyn165.github.io/GU-userscripts/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.origin.includes("github.io")){
        (window.__installedExtension ??= []).push(9);
        return;
    }

    const SCROLL_TOP_STORAGE_KEY = "scroll_top_storage_key";
    const LOCATION_STORAGE_KEY = () => `${window.location.pathname}${window.location.search}`;
    const MAIN_ELEMENT = () => document.getElementById("page");

    document.body.addEventListener("click", function(ev){
        if(ev.target.tagName === "A"){
            const scrollPosStorage = JSON.parse(window.sessionStorage.getItem(SCROLL_TOP_STORAGE_KEY) || "{}");
            scrollPosStorage[LOCATION_STORAGE_KEY()] = MAIN_ELEMENT().scrollTop;
            window.sessionStorage.setItem(SCROLL_TOP_STORAGE_KEY, JSON.stringify(scrollPosStorage));
        }
    });

    window.addEventListener("load", function(){
        const scrollPosStorage = JSON.parse(window.sessionStorage.getItem(SCROLL_TOP_STORAGE_KEY) || "{}");
        const key = LOCATION_STORAGE_KEY();
        if(key in scrollPosStorage){
            console.log("Restoring scroll location");
            MAIN_ELEMENT().scrollTop = scrollPosStorage[key];
        }
    });
})();
