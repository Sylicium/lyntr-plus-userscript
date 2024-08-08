// ==UserScript==
// @name         Lyntr+
// @version      1.14.0
// @github       https://github.com/Sylicium/lyntr-plus-userscript
// @namespace    https://lyntr.com/
// @description  A toolbox for small and medium changes for lyntr.com ! What is it ? -> https://youtu.be/-D2L3gHqcUA
// @author       Sylicium
// @match        https://lyntr.com/*
// @icon         https://lyntr.com/favicon.ico
// @grant        none
// @downloadURL https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.user.js
// @updateURL https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.meta.js
// ==/UserScript==

(function() {
    'use strict';


    const VERSION = "1.14.0"



    // Imports an general functions
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    // Configuration
    const _CONFIG = {
        "parseMessageMentions": {
            "enabled": true,
        },
        "showScriptAuthor": {
            "enabled": true,
        },
        "showVerified": {
            "enabled": true,
            "usernameColor": "#d39e00", // Default #d39e00
            "enableBadgeColor": true,
        },
        "profileButton": {
            "enabled": true,
            "color": "#7edcfd", // Default #7edcfd
        },
        "background": {
            "enabled": true,
            "mode": "image", // "image" or "color"
            "color": "",
            "image": "https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/assets/images/windows_plains.jpg",
            "doneClassName": "lyntr-plus-background-353CpZ7e89A6nSlP", // DO NOT EDIT THIS LINE
        },
        "lyntTransparency": {
            "enabled": true,
            "opacity": 0.7, // Default 0.7
            "overrideColor": "", // Default #EEEBE3
            "doneClassName": "lyntr-plus-lyntTransparency-So3E25ENwU0FkobI", // DO NOT EDIT THIS LINE
        }
    }


    // ---------------------------
    // DO NOT EDIT BELOW THIS LINE
    // ---------------------------

    const _CLASSES_ = {
        lyntDiv: "flex w-full gap-3 rounded-xl bg-lynt-foreground p-3 transition-colors hover:bg-border",
        lyntDivReplied: "rounded-lg border-2 border-primary p-4 drop-shadow",
        lyntrContent: "max-w-[490px] whitespace-pre-wrap break-words text-lg",
        lyntrUsername: "truncate max-w-[60%] rounded-sm text-xl font-bold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black",
        lyntrVerifiedBadge_div: "flex h-full w-7 justify-center",
        lyntrProfileButton: "static bottom-2 flex max-w-md cursor-pointer items-center gap-4 rounded-full bg-border p-4 md:absolute md:w-[250px]",
    }



    /**
     * Inject the CSS styles
     */
    async function injectStyle() {
        if(document.getElementById("lyntr-plus-injected-style-eKv9p9OQYXyJdfwh")) return
        let InjectedStyle = document.createElement("style")
        InjectedStyle.id = "lyntr-plus-injected-style-eKv9p9OQYXyJdfwh"
        InjectedStyle.textContent = `
        .lp-div-username-author-6FjpGV7F {
            color: #FFFF00;
            padding: 2px 5px;
            font-size: 24px;
            -webkit-text-stroke: 1px black;
        }
        .lp-div-username-verified-rWzoWbQ2 {
            color: ${_CONFIG.showVerified.usernameColor};
        }
        .lp-div-username-verified-img-rWzoWbQ2 {
            filter: opacity(0.5) drop-shadow(0 0 0 yellow);
        }
        `
        document.head.appendChild(InjectedStyle)
    }



    /**
     * Parse message mentions and convert them to links
     * @returns void
     */

    /*

    async function parseMessageMentions() {

        if(!_CONFIG.parseMessageMentions.enabled) return

        // Get all messages elements currently displayed
        let messages = [...document.getElementsByClassName(_CLASSES_.lyntrContent)]
        messages = messages.filter(msg => !msg.classList.contains("lp-spawn-lynt-content-a8rLbG38")) // Filter out the messages temps


        // Loop through each message and replace mentions with links
        messages.forEach(msg => {
            try {
                
                // Split the message by mentions
                // Hello @user how you are ? -> ["Hello ", "@user", " how you are ?"]
                let mentionRegex = /(@[a-zA-Z0-9_]+)/g
                let parts = msg.textContent.split(mentionRegex)
                // Transform the mentions into links
                parts = parts.map(part => {
                    if(part.match(mentionRegex)) {
                        let username = part.replace("@", "")
                        let elem = document.createElement("a")
                        elem.href = `https://lyntr.com/@${username}`
                        elem.textContent = part
                        return elem
                    } else {
                        let elem = document.createElement("span")
                        elem.textContent = part
                        return elem
                    }
                })
                // Join the parts back together
                msg.innerHTML = ""
                parts.forEach(part => {
                    msg.appendChild(part)
                })



                newMsgElement = document.createElement("span")
                newMsgElement.className = `${className} lp-spawn-lynt-content-a8rLbG38`
                
            } catch (error) {
                console.log(error)
            }
        })
    }

    */


    
    async function parseMessageMentions() {

        if(!_CONFIG.parseMessageMentions.enabled) return

        // Get all messages elements currently displayed
        let messages = [...document.getElementsByClassName(_CLASSES_.lyntrContent)].map(x => {
            return x.parentElement
        })


        


        // Loop through each message and replace mentions with links
        messages.forEach(msg => {
            try {

                if(!(msg.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")?.[0])) {

                    let sec = document.createElement("span")
                    sec.className = _CLASSES_.lyntrContent
                    
                    sec.classList.add("lp-lynt-content-second-jBRHEIwW")
                    msg.getElementsByClassName(_CLASSES_.lyntrContent)?.[0].classList.add(`lp-lynt-content-first-jBRHEIwW`)
                    msg.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")[0].style.display = "none"
                    console.log("created elements")
                    msg.appendChild(sec)

                }

                let first = msg.getElementsByClassName("lp-lynt-content-first-jBRHEIwW")[0]
                let second = msg.getElementsByClassName("lp-lynt-content-second-jBRHEIwW")[0]


                let text = first.textContent
                
                // Split the message by mentions
                // Hello @user how you are ? -> ["Hello ", "@user", " how you are ?"]
                let mentionRegex = /(@[a-zA-Z0-9_]+)/g
                let parts = text.split(mentionRegex)
                // Transform the mentions into links
                parts = parts.map(part => {
                    if(part.match(mentionRegex)) {
                        let username = part.replace("@", "")
                        let elem = document.createElement("a")
                        elem.href = `https://lyntr.com/@${username}`
                        elem.target = "_blank"
                        elem.textContent = part
                        return elem
                    } else {
                        let elem = document.createElement("span")
                        elem.textContent = part
                        return elem
                    }
                })
                // Join the parts back together
                second.innerHTML = ""
                parts.forEach(part => {
                    second.appendChild(part)
                })
                
            } catch (error) {
                console.log(error)
            }
        })
    }



    /**
     * Display the author of the script in a special way
     */
    async function showScriptAuthor() {

        if(!_CONFIG.showScriptAuthor.enabled) return;

        let elems = [...document.getElementsByClassName(_CLASSES_.lyntrUsername)]
        elems.forEach(e => {
            if(e.textContent === "Sylicium") {
                e.classList.add("lp-div-username-author-6FjpGV7F")
            } else {
                e.classList.remove("lp-div-username-author-6FjpGV7F")
            }
        })
    }


    /**
     * Display verified users in a special way
     */
    async function showVerified() {

        if(!_CONFIG.showVerified.enabled) return;

        let elems = [...document.getElementsByClassName(_CLASSES_.lyntrUsername)]


        elems.forEach(e => {
            let temp1 = e.nextElementSibling // Get the next element after the username
            let temp2 = e.nextElementSibling.getElementsByClassName(_CLASSES_.lyntrVerifiedBadge_div)?.[0] // Check if the next element has a child with the class lyntrVerifiedBadge_div (meaning it's a verified badge element)
            let badgeImg = e.nextElementSibling.getElementsByClassName("flex h-full w-7 justify-center")?.[0]?.getElementsByTagName("img")?.[0] // Double checking by getting the image element to check if it's the verified badge
            let isVerified = badgeImg?.src == document.location.origin + "/verified.png"
            || badgeImg?.src == document.location.origin + "/white_mode_verified.png" // Check if the image source is the verified badge itself to be sure
            
            // If there's the verified badge, change the style of the username
            if(isVerified) {
                e.classList.add("lp-div-username-verified-rWzoWbQ2")
                badgeImg?.classList.add("lp-div-username-verified-img-rWzoWbQ2")
            } else {
                e.classList.remove("lp-div-username-verified-rWzoWbQ2")
                badgeImg?.classList.remove("lp-div-username-verified-img-rWzoWbQ2")
            }
        })

    }

    /**
     * Modify the profile button
     */
    async function profileButton() {
        if(!_CONFIG.profileButton.enabled) return
        let elem = document.getElementsByClassName(_CLASSES_.lyntrProfileButton)?.[0]
        if(elem) {
            elem.style.backgroundColor = _CONFIG.profileButton.color
        }
    }

    /**
     * Modify the background
     */
    async function background() {
        if(!_CONFIG.background.enabled) return

        if(document.body.classList.contains(_CONFIG.background.doneClassName)) return
        

        if(_CONFIG.background.mode == "color") {
            document.body.style.backgroundColor = _CONFIG.background.color
        } else if(_CONFIG.background.mode == "image") {
            document.body.style.background = `url(${_CONFIG.background.image})`
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundSize = "cover"
        } else {
            console.error(`[Lyntr+] Invalid background mode: ${_CONFIG.background.mode}`)
        }

    }

    /**
     * Modify the transparency of the lynts
     */
    async function lyntTransparency() {
        if(!_CONFIG.lyntTransparency.enabled) return
        let lynts = [...document.getElementsByClassName(_CLASSES_.lyntDiv)]
        lynts = lynts.filter(lynt => {
            return !lynt.classList.contains(_CONFIG.lyntTransparency.doneClassName)
        })
        
        let overridedColor = _CONFIG.lyntTransparency.overrideColor.length > 0 ? _CONFIG.lyntTransparency.overrideColor : "#EEEBE3"
        
        lynts.forEach(lynt => {
            let border = `solid 2px #${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            let bgColor = `#${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            lynt.style.border = border
            lynt.style.backgroundColor = bgColor
            lynt.classList.add(_CONFIG.lyntTransparency.doneClassName)
        })

        let lyntDivsReplied = [...document.getElementsByClassName(_CLASSES_.lyntDivReplied)]
        lyntDivsReplied = lyntDivsReplied.filter(lynt => {
            return !lynt.classList.contains(_CONFIG.lyntTransparency.doneClassName)
        })


        lyntDivsReplied.forEach(lynt => {
            let border = `solid 2px #${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            let bgColor = `#${overridedColor.split("#").join("")}${Math.ceil(255*_CONFIG.lyntTransparency.opacity).toString(16)}`
            lynt.style.border = border
            lynt.style.backgroundColor = bgColor
            lynt.classList.add(_CONFIG.lyntTransparency.doneClassName)
        })

    }

    /**
     * Add a beta mark to the top right corner of the page
     */
    async function betaMark() {
        if(document.getElementById("lyntr-plus-beta-mark-IjA5RKoHXIFBxQvX")) return

        function extractVersionNumber(text) {
            const versionRegex = /@version\s+([0-9.]+)/;
            const match = text.match(versionRegex);
            if (match) {
                return match[1];
            }
            return null;
        }

        async function isUpToDate() {
            let lastVersionMeta = await fetch("https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.meta.js")
            let lastVersionMetaText = await lastVersionMeta.text()
            let lastVersion = extractVersionNumber(lastVersionMetaText)
            if(lastVersion != VERSION) {
                return {
                    status: false,
                    version: lastVersion
                }
            } else {
                return {
                    status: true,
                    version: lastVersion
                }
            }
        }


        let UpToDate = await isUpToDate()

        let betaBox = document.createElement("div")
        betaBox.style.position = "fixed"
        betaBox.style.top = "0"
        betaBox.style.right = "0"
        betaBox.style.zIndex = "1000"
        betaBox.style.display = "flex"
        betaBox.style.flexDirection = "column"
        betaBox.style.alignItems = "end"

        let betaMark = document.createElement("div")
            betaMark.id = "lyntr-plus-beta-mark-IjA5RKoHXIFBxQvX"
            betaMark.style.padding = "5px 10px"
            betaMark.style.backgroundColor = "rgb(0, 0, 0, 0.75)"
            betaMark.style.color = "rgb(255, 255, 255)"
            betaMark.style.fontWeight = "bold"
            betaMark.style.fontSize = "16px"
            betaMark.textContent = `Lyntr+ Beta v${VERSION}`

        let betaMarkUpdate = document.createElement("div")
        if(!UpToDate.status) {
            betaMarkUpdate.style.padding = "5px 10px"
            betaMarkUpdate.style.backgroundColor = "rgb(0, 0, 0, 0.75)"
            betaMarkUpdate.style.color = "rgb(255, 255, 255)"
            betaMarkUpdate.style.fontWeight = "bold"
            betaMarkUpdate.style.fontSize = "12px"
            betaMarkUpdate.innerHTML = `An update is available for Lyntr+ <a href="https://raw.githubusercontent.com/Sylicium/lyntr-plus-userscript/main/production/lyntr-plus.user.js" style="color:aqua;">Click here to update to v${UpToDate.version}</a>`
            document.body.appendChild(betaMarkUpdate)
        }

        betaBox.appendChild(betaMark)
        betaBox.appendChild(betaMarkUpdate)
        document.body.appendChild(betaBox)

    }


    // Start Lyntr+
    (async function __start__() {
        while(true) {

            injectStyle()
            
            parseMessageMentions()
            showScriptAuthor()
            showVerified()
            profileButton()
            background()
            lyntTransparency()
            
            betaMark()

            await sleep(250)
        }
    })()







    // Log that Lyntr+ has been loaded

    var css = "padding-bottom:20px;text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 30px;";
    
    console.log("%c| Lyntr+ loaded!",css)
    console.log("%c| Version: 1.2.3",css)
    console.log("%c| Author: Sylicium", css)
    console.log("%c| GitHub: https://github.com/Sylicium/lyntr-plus-userscript", css)

})();