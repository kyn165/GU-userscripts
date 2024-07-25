// ==UserScript==
// @name         GULMS - New Session Redirector
// @namespace    http://kyn165.github.io
// @version      2024-05-10
// @description  Redirect you to the my-course page if it is a new session, and let you access desired courses quickly.
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if(!sessionStorage.getItem("__r")){
        location.replace("/my/courses.php");
        sessionStorage.setItem("__r", "1");
    }
})();
