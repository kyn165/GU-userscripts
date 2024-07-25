// ==UserScript==
// @name         GULMS - Dismissable Banner
// @namespace    http://kyn165.github.io
// @version      2024-05-14
// @description  Empower banners shown on LMS about the regular maintenance. Now it is closable.
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const dismissBannerLS = "dismissed_banner";
    const banner = document.getElementsByClassName("addinghtml")[0];
    if(banner){
        banner.style.position = "relative";
        if(localStorage.getItem(dismissBannerLS) === banner.textContent){
            banner.style.display = "none";
        }else{
            const closeButton = Object.assign(document.createElement("button"), {
                textContent: "×",
            });
            Object.assign(closeButton.style, {
                position: "absolute",
                top: "75%",
                transform: "translateY(-50%)",
                right: "3rem",
                zIndex: "5",
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.5em",
                fontWeight: "800",
            });
            closeButton.addEventListener("click", function(){
                closeButton.remove();
                banner.style.display = "none";
                localStorage.setItem(dismissBannerLS, banner.textContent);
            });
            banner.appendChild(closeButton);
        }
    }
})();
