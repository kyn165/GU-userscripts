// ==UserScript==
// @name         GULMS - Fast my-course listing
// @namespace    http://kyn165.github.io/GU-userscripts/
// @version      2024-07-17
// @description  List your course cards fastly by caching the request
// @author       kyn
// @match        https://mdl.media.gunma-u.ac.jp/my/courses.php
// @match        https://kyn165.github.io/GU-userscripts/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.gunma-u.ac.jp
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if(window.location.origin.includes("github.io")){
        (window.__installedExtension ??= []).push(10);
        return;
    }

    const LS_CACHE_KEY = "course_cache";
    const LS_CACHE_IV_KEY = "course_cache_v";
    let cacheStore = {};

    const onLoad = () => {
        const controlContainer = document.querySelector("[aria-label=コース概要コントロール]").children[0];
        const div = Object.assign(document.createElement("div"), {
            className: "mb-1 ml-1",
        });
        const button = Object.assign(document.createElement("button"), {
            textContent: "更新",
            className: "btn btn-outline-secondary",
        });
        button.addEventListener("click", () => {
            window.localStorage.removeItem(LS_CACHE_KEY);
            window.localStorage.removeItem(LS_CACHE_IV_KEY);
            location.reload();
        });
        controlContainer.appendChild(div).appendChild(button);
    };

    window.addEventListener("load", onLoad);

    const encoder = new TextEncoder();
    const encodeBinary = binaryString => Uint8Array.from(binaryString, binaryChar => binaryChar.charCodeAt(0));
    const decodeBinary = uint8Array => uint8Array.reduce((binaryString, uint8) => binaryString + String.fromCharCode(uint8), "");
    const hexToNumArr = hex => hex.split("").map((v, i) => i % 2 === 0 ? parseInt(hex.slice(i, i + 2), 16) : null).filter(d => d !== null);
    const numArrToHex = arr => arr.map(num => num.toString(16)).join("");
    const hash = location.hash;
    const rawIv = window.localStorage.getItem(LS_CACHE_IV_KEY);
    let iv = rawIv ? new Uint8Array(hexToNumArr(rawIv)) : null;

    const originalXhrOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(...args){
        this.__requestMethod = args[0];
        this.__requestUrl = args[1];
        originalXhrOpen.apply(this, args);
    };
    const originalXhrSend = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = async function(...args){
        console.log("xhr body", args[0]);

        if(this.__requestMethod = "POST" && this.__requestUrl.includes("/lib/ajax/service.php") && args[0].includes("core_course_get_enrolled_courses_by_timeline_classification")){
            const pass = document.querySelector("[title=\"プロファイルを表示する\"]").innerHTML;
            const rawEncKey = await crypto.subtle.digest("SHA-256", encoder.encode(pass));

            if(Object.keys(cacheStore).length === 0){
                const rawCache = window.localStorage.getItem(LS_CACHE_KEY);
                try{
                    if(rawCache && iv){
                        console.log("trying to reuse the cache");
                        const decKey = await crypto.subtle.importKey("raw", rawEncKey, "AES-GCM", false, ["decrypt"]);
                        const decryptionPromise = crypto.subtle.decrypt({
                            name: "AES-GCM",
                            iv,
                        }, decKey, encodeBinary(atob(rawCache)));
                        (window.__dp ??= {})[Date.now()] = decryptionPromise;
                        const decryptedArr = await decryptionPromise;
                        console.log("decryption succeeded.");
                        cacheStore = JSON.parse(decodeBinary(new Uint8Array(decryptedArr)));
                        console.log("parsing succeeded.");
                    }
                }
                catch(e){
                    console.error("Something went wrong while running cache storation or restoration:", e);
                }
            }

            const targetCache = cacheStore[args[0]];
            if(targetCache){
                console.log("found matched response cache");
                Object.defineProperty(this, "responseText", { value: targetCache });
                this.dispatchEvent(new ProgressEvent("load"));
                return;
            }else{
                console.log("no cache found so proceeding xhr");
            }

            console.log("setting up a hook to intercept xhr response");
            this.addEventListener("load", async () => {
                console.log("encrypting the response...");
                cacheStore[args[0]] = this.responseText;
                iv ??= crypto.getRandomValues(new Uint8Array(12));
                const encKey = await crypto.subtle.importKey("raw", rawEncKey, "AES-GCM", false, ["encrypt"]);
                const encryptedArr = await crypto.subtle.encrypt({
                    name: "AES-GCM",
                    iv,
                }, encKey, encoder.encode(JSON.stringify(cacheStore)));
                const encrypted = btoa(decodeBinary(new Uint8Array(encryptedArr)));
                window.localStorage.setItem(LS_CACHE_KEY, encrypted);
                window.localStorage.setItem(LS_CACHE_IV_KEY, numArrToHex(Array.from(iv)));
                console.log("cache stored successfully.");
            });
        }

        originalXhrSend.apply(this, args);
    }
})();
