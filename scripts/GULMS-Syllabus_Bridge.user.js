// ==UserScript==
// @name         GULMS - Syllabus Bridge
// @namespace    http://kyn165.github.io
// @version      2024-04-08
// @description  Show a button on course pages on LMS to allow you to access the syllabus page quickly.
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/course/view.php?id=*
// @match        https://www.kyomu-sys.gunma-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const searchParams = new URLSearchParams(location.search);

    switch(location.host){
        case "mdl.media.gunma-u.ac.jp":
            {
                const id = document.title.match(/^コース:\s+(?<id>[A-Z]+\d+)/)?.groups?.id;
                if(!id) break;
                const a = document.createElement("a");
                const date = new Date();
                date.setMonth(date.getMonth() - 3);
                a.href = `https://www.kyomu-sys.gunma-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?lct_year=${date.getFullYear()}&lct_cd=${id}&je_cd=1`;
                a.target = "_blank";
                a.rel = "noreferrer noopener";
                a.classList.add("bg-secondary", "__ij_slbb");
                a.textContent = "シラバス";
                a.title = "このコースのシラバスを開く";
                document.body.appendChild(a);
                const style = document.createElement("style");
                style.textContent = `
                .__ij_slbb {
                  position: fixed;
                  bottom: 2.05rem;
                  right: 5rem;
                  padding: 0.4rem 0.5rem;
                  border-radius: 0.7rem;
                  color: black;
                }
                .__ij_slbb:hover {
                  text-decoration: none;
                }
                `;
                document.head.appendChild(style);
            }
            break;
        case "www.kyomu-sys.gunma-u.ac.jp":
            //const lctCd = searchParams.get("lct_cd");
            break;
    }
})();
