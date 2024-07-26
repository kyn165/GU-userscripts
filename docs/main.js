// @ts-check
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.1.min.js";
import { App } from "./app.js";

(function(self){
  function onLoad(){
    const appElement = self.document.getElementById("app");

    if(!appElement){
      throw new Error("App element not found");
    }

    appElement.replaceChildren();

    van.add(appElement, App());
  }

  self.addEventListener("load", onLoad);
}(window));
