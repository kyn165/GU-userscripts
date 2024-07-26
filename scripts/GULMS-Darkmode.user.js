// ==UserScript==
// @name         GULMS - Darkmode
// @namespace    http://kyn165.github.io/GU-userscripts/
// @version      2024-04-19
// @description  Enables comfortable LMS for eyes. Add a dark mode toggle on header.
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/*
// @match        https://kyn165.github.io/GU-userscripts/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.origin.includes("github.io")){
        (window.__installedExtension ??= []).push(3);
        return;
    }

    var checkbox;
    var style;

    function initDarkmodeButton(){
        if(!document.querySelector("[data-ij=ij_label]")){
            const p = document.createElement("label");
            p.dataset.ij = "ij_label";
            p.style.userSelect = "none";
            const input = checkbox = Object.assign(document.createElement("input"), { type: "checkbox" });
            input.addEventListener("click", switchDarkMode);
            p.appendChild(input);
            p.append("ダークモード");
            const nav = document.getElementById("usernavigation");
            const height = window.getComputedStyle(nav).height;
            p.style.lineHeight = height;
            nav.insertBefore(p, nav.children[0]);
            input.checked = localStorage.getItem("darkmode") === "true";
        }

        if(!document.querySelector("[data-ij=ij_style]")){
            style = document.createElement("style");
            style.dataset.ij = "ij_style";
            document.head.appendChild(style);
            changeToDarkMode();
        }
    }

    window.initDarkmodeButton = initDarkmodeButton;

    function changeToDarkMode() {
        if (localStorage.getItem("darkmode") === "true")
        {
            style.textContent = "body, #page.drawers .main-inner, #region-main, .card { background-image: none; background-color: #ddd; } html {filter: invert(100%) hue-rotate(180deg);} html :is(iframe,video,img:not(.logo),[class$=\"img\"]) {filter: invert(100%) hue-rotate(180deg);} ::selection { background-color: cyan; }";
        }
        else if (localStorage.getItem("darkmode") === "false")
        {
            style.textContent = "";
        }
    }

    function switchDarkMode() {
        localStorage.setItem("darkmode", checkbox.checked);
        changeToDarkMode();
    }


    window.addEventListener("load", (event) => {
        initDarkmodeButton();
    }, { once: true });
})();
