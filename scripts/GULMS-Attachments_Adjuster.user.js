// ==UserScript==
// @name         GULMS - Attachments Adjuster
// @namespace    http://kyn165.github.io
// @version      2024-04-18
// @description  Adjust attachment links on LMS so Office files will be downloaded while others (including pdf files) not.
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/mod/*
// @match        https://mdl.media.gunma-u.ac.jp/pluginfile.php/*
// @match        https://kyn165.github.io/GU-userscripts/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.origin.includes("github.io")){
        (window.__installedExtension ??= []).push(2);
        return;
    }

    const extToDl = [".docx", ".pptx", ".xlsx", ".doc", ".ppt", ".xls"];

    if(extToDl.some(ext => location.href.endsWith(ext))){
        window.open(location.href + "?forcedownload=1", "_blank");
        history.back();
    }else{
        Array.prototype.filter.call(document.getElementsByTagName("a"), el => el.href.endsWith(".pdf?forcedownload=1")).forEach(el => { el.href = el.href.slice(0, -1) });
    }
})();
