// ==UserScript==
// @name         Lyntr+
// @deprecated   true
// @version      2.0.0.0
// @github       https://github.com/Sylicium/lyntr-plus-userscript
// @namespace    https://lyntr.com/
// @description  A toolbox for small and medium changes for lyntr.com ! What is it ? -> https://youtu.be/-D2L3gHqcUA
// @author       Sylicium
// @match        https://lyntr.com/*
// @icon         https://lyntr.com/favicon.ico
// @grant        none
// @downloadURL https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/nightly/lyntr-plus.user.js
// @updateURL https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/nightly/lyntr-plus.meta.js
// ==/UserScript==


// HTML element that takes all the page and display settings to change
// Make the div the size of the screen and background color to black with 50% opacity
// Add a button to close the div
let settingsDiv = document.createElement("div");
settingsDiv.style.position = "fixed";
settingsDiv.style.top = "0";
settingsDiv.style.left = "0";
settingsDiv.style.width = "100%";
settingsDiv.style.height = "100%";
settingsDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
settingsDiv.style.display = "none";
settingsDiv.style.zIndex = "99999";
settingsDiv.style.alignItems = "center";
settingsDiv.style.justifyContent = "center";
settingsDiv.style.display = "flex";
settingsDiv.style.border = "solid 1px black";


let settingsCloseButton = document.createElement("button");
settingsCloseButton.textContent = "Close";

settingsCloseButton.addEventListener("click", () => {
    settingsDiv.classList.add("lp-hidden");
})

settingsDiv.appendChild(settingsCloseButton);
document.body.appendChild(settingsDiv);