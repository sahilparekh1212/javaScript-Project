"use strict";

let pageX, pageY, newWindow;
let currentSlide = 1;
let pointerDisplayToggleClicks = 0;
const $ = document.querySelector.bind(document);

window.onload = function () {
    updateBody();
}

function updateBody() {
    const body = $('body');
    body.classList.add('bg-dark', 'text-light');
    body.innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
    `;
    updateHeader();
    updateMain();
    updateFooter();
    addDOMEvents();
}

function updateHeader() {
    const header = $('header');
    header.innerHTML = `
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <span href="#" class="navbar-brand">ES6+ javaScript Project</span>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuItems">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
    `;
}

function updateMain() {
    const main = $('main');
    main.classList.add('container', 'p-3');
    main.innerHTML = `
        <div class="container">
            <div style="display:flex; flex-direction:column; flex-wrap:wrap;position:fixed; right:15px; bottom:45px; z-index:100;">
                <button id="toggleFullScreenButton" onclick="toggleFullScreen(this.id)" class="border-0 h2 bi bi-arrows-fullscreen bg-dark text-primary"></button>    
                <button onclick="printPage()" class="border-0 h2 bi bi-printer bg-dark text-primary"></button>    
                <button onclick="scrollToTop()" class="border-0 h2 bi bi-arrow-up-circle bg-dark text-primary"></button>
            </div>
            <button id="scrollSpy" class="bg-info" style="position:fixed; right:15px; bottom:10px; z-index:100; overflow-wrap:break-word;"></button>
            <div class="row d-flex">
                
                <div class="card col-md-2 m-2 bg-light text-dark" id="hoverToggleCard">
                    <div class="card-body">
                        <h5 class="card-title">Hover Toggle</h5>
                        <p>Lorem cingnihil?</p>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="viewCapsLockStateCard">
                    <div class="card-body">
                        <h5 class="card-title bi bi-keyboard"> View CapsLock State</h5>
                        <div>
                            <span id="capsLockText">Press CapsLock Key</span>
                        </div>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="viewVolumeCard">
                    <div class="card-body">
                        <h5 class="card-title bi bi-speaker"> View Volume + -</h5>
                        <div>
                            <span id="volumeChangeText">Press Volume Up/Down Key</span>
                        </div>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="copyToClipboardCard">
                    <div class="card-body">
                        <h5 class="card-title">Copy To Clipboard</h5>
                        <input id="clipboardInput" type="text" value="Sample Text" maxlength="20" style="max-width:70%"
                            class="rounded p-1">
                        <button id="clipboardIcon" onclick="copyToClipboard()" class="bi bi-clipboard rounded p-1">
                            Copy</button>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="shareText">
                    <div class="card-body">
                        <h5 class="card-title">Share Text</h5>
                        <div>
                            <input class="bg-light text-dark rounded p-1" id="textToBeShared" type="text"
                                value="Text To Be Shared" style="max-width:65%">
                            <button onclick="copyAndShareTextWithURL()" class="bi bi-share rounded p-1"> Share</button>
                        </div>
                    </div>
                </div>

                <div class="card col-md-2 m-2 bg-light text-dark" id="mouseOrTouchPointerPositionTracker">
                    <div class="card-body">
                        <h5 class="card-title">Pointer Display</h5>
                        <div id="mouseOrTouchPointerPositionTrackerText">--</div>
                        <button id="pointerDisplayToggle" class="mt-2 btn text-success border border-dark rounded">Start Tracking</button>
                    </div>
                </div>

                <div class="card col-md-2 m-2 bg-light text-dark" id="clickCounter">
                    <div class="card-body">
                        <h5 class="card-title">Click Counter</h5>
                        <div>
                            <div>click= <span id="windowClickCounterText" class="p-2">0</span></div>
                            <div>dblClick= <span id="windowDblClickCounterText" class="p-2">0</span></div>
                        </div>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="getLocationCard">
                    <div class="card-body">
                        <h5 class="card-title">Get Location</h5>
                        <div>
                            <button onclick="getLocation()" class="bi bi-geo-alt rounded p-1"> Location</button>
                            <span id="locationText"></span>
                        </div>
                    </div>
                </div>

                <div class="card col-md-2 m-2 bg-light text-dark" id="liveBatteryCard">
                    <div class="card-body">
                        <h5 class="card-title">Live Battery Info</h5>
                        <div>
                            <button onclick="getBattery(showBatteryLevelAndCharging)" class="bi bi-battery rounded p-1">
                                Show Battery</button><br>
                            <span id="batteryLevelText"></span>
                            <span id="batteryChargingText"></span>
                        </div>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="getTimeDiffCard">
                    <div class="card-body">
                        <h5 class="card-title">Get Time Elapsed/Remaining</h5>
                        <div>
                            <span>Pick a Date:</span>
                            <input oninput="countDifference(this.value)" class="bg-light text-dark rounded p-1" id="countDifferenceInput" type="date">
                            <p id="countDifferenceText"></p>
                        </div>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="openNewWindowCard">
                    <div class="card-body">
                        <h5 class="card-title"> Open New Window</h5>
                        <div class="d-flex">                        
                            <div>Width: <input class="bg-light text-dark rounded p-1 m-1" type="number" value="300" style="max-width:70px" id="newWindowWidth" ></div>
                            <div>Height: <input class="bg-light text-dark rounded p-1" type="number" value="300" style="max-width:70px" id="newWindowHeight"></div>
                        </div>
                        <button id="openNewWindowButton" onclick="openCustomWindow()" class="bi bi-box-arrow-up-right rounded p-1 m-1" style="width:100%">  Open</button>
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="accordionCard">
                    <div class="card-body">
                        <button id="accordionTitle" onclick="toggleAccordionInfo(this.id)" class="card-title d-flex justify-content-between h5 border-0" style="width:100%">
                            <div>Accordion</div>
                            <div id="accordionStatus">+</div>
                        </button>
                        <p id="accordionText" class="p-2" style="display:none">Lorem ipsum dolor sit amet consectetur.</p>    
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="navCard">
                    <div class="card-body">
                        <h5>Navigation Display</h5>
                        <div class="card-title">
                            <div class="row">
                                <button id="tab1" onclick="tabClicked(this.id)" class="col-4 border-0 p-2 bg-primary">A</button>
                                <button id="tab2" onclick="tabClicked(this.id)" class="col-4 border-0 p-2 bg-success">B</button>
                                <button id="tab3" onclick="tabClicked(this.id)" class="col-4 border-0 p-2 bg-info">C</button>
                            </div>
                            <div id="tabInfo" class="row" style="display:none">
                            </div>
                        </div>
                        <p id="accordionText" class="p-2" style="display:none">Lorem ipsum dolor sit amet consectetur.</p>    
                    </div>
                </div>

                <div class="card col-md-3 m-2 bg-light text-dark" id="slidesDisplayCard">
                    <div class="card-body" style="position:relative;">
                        <div class="card-title h5";>
                            Slides Display
                        </div>
                        <div class="d-flex justify-content-around">
                            <button onclick="slideDisplay(-1)" class="slideControl p-2 bg-secondary text-light border-0">&lt;</button>
                            <div id="slides" style="width:100%;">
                                <div class="bg-primary" style="height:5rem;"></div>
                                <div class="bg-success" style="height:5rem;"></div>
                                <div class="bg-info" style="height:5rem;"></div>
                            </div>
                            <button onclick="slideDisplay(1)" class="slideControl p-2 bg-secondary text-light border-0">&gt;</button>
                        </div>
                        <div id="currentSlideIndicator" class="d-flex justify-content-center">
                            <span class="p-1 m-2" style="border-radius:50%; border:1px solid black;"></span>
                            <span class="p-1 m-2" style="border-radius:50%; border:1px solid black;"></span>
                            <span class="p-1 m-2" style="border-radius:50%; border:1px solid black;"></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    `;
}

function updateFooter() {
    const footer = $('footer');
    footer.innerHTML = `
        <div class="container">
            <p class="dateModified text-info"></p>
        </div>
    `;
    injectProfileInfo();
}

function addDOMEvents() {

    beforeunload();

    pointerDisplayToggleHandler();

    const hoverToggleCard = $('#hoverToggleCard');
    hoverToggleCard.addEventListener('mouseenter', () => {
        hoverToggleCard.classList.remove('bg-light', 'text-dark');
        hoverToggleCard.classList.add('bg-dark', 'text-light');
    });
    hoverToggleCard.addEventListener('mouseleave', () => {
        hoverToggleCard.classList.remove('bg-dark', 'text-light');
        hoverToggleCard.classList.add('bg-light', 'text-dark');
    });

    const windowClickCounterElement = $('#windowClickCounterText');
    let windowClickCount = 0;
    let windowDblClickCount = 0;
    window.addEventListener('click', () => {
        windowClickCount++;
        windowClickCounterElement.innerText = `${windowClickCount}`;
    });

    const windowDblClickCounterElement = $('#windowDblClickCounterText');
    window.addEventListener('dblclick', () => {
        windowDblClickCount++;
        windowDblClickCounterElement.innerText = `${windowDblClickCount}`;
    });

    volumeChange();

    capsLockDisplay();

    tabClicked('tab1');

    slideDisplay(0);

    scrollSpy();
}

function copyToClipboard() {
    const copyTextElement = $('#clipboardInput');
    copyTextElement.select();
    copyTextElement.setSelectionRange(0, 20);
    navigator.clipboard.writeText(copyTextElement.value);
    navigator.clipboard.readText().then((text) => {
        alert("Copied: " + text + "\nLength: " + text.length);
    }).catch((error) => {
        console.log("Could not copy" + error);
    });
}

function copyAndShareTextWithURL() {
    const textToBeSharedElement = $('#textToBeShared');
    textToBeSharedElement.select();
    textToBeSharedElement.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textToBeSharedElement.value);
    navigator.clipboard.readText().then((text) => {
        const shareData = {
            title: 'ShareData',
            text: text,
            url: window.location.href
        }
        navigator.share(shareData);
    }).catch((error) => {
        console.log("Could not copy and Share" + error);
    });
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        const locationTextElement = $('#locationText')

        locationTextElement.innerText = `
        latitude= ${position.coords.latitude} ,\n longitude= ${position.coords.longitude}
        `;
    }, (error) => {
        console.log(error);
    });
}

function getBattery(functionName) {
    navigator.getBattery().then((battery) => {
        battery.addEventListener('chargingchange', (event) => {
            functionName(event.currentTarget.level, event.currentTarget.charging);
        });
        battery.addEventListener('levelchange', (event) => {
            functionName(event.currentTarget.level, event.currentTarget.charging);
        });
        functionName(battery.level, battery.charging);

    }).catch((error) => {
        console.log("getBattery() > error= " + error);
    });
}

function showBatteryLevelAndCharging(level, charging) {
    $('#batteryLevelText').innerText = `chargeLevel = ${(level * 100).toFixed(0)}% ,`;
    $('#batteryChargingText').innerText = `\nis charging ? = ${charging ? 'Yes' : 'No'}`;
}

function volumeChange() {
    window.addEventListener('keydown', (event) => {
        const volumeChangeTextElement = $('#volumeChangeText');
        volumeChangeTextElement.innerText = `Key pressed: Volume`;
        if (event.key === "AudioVolumeDown") {
            volumeChangeTextElement.innerText += ` Down (-)`;
            setTimeout(() => {
                volumeChangeTextElement.innerText = "Press Volume Up/Down Key";
            }, 3000);
        } else if (event.key === "AudioVolumeUp") {
            volumeChangeTextElement.innerText += ` Up (+)`;
            setTimeout(() => {
                volumeChangeTextElement.innerText = "Press Volume Up/Down Key";
            }, 3000);
        } else {
            volumeChangeTextElement.innerText = "Press Volume Up/Down Key";
        }
    });
}

function countDifference(input) {
    const countDifferenceInputEle = $('#countDifferenceInput');
    const countDifferenceTextEle = $('#countDifferenceText');
    const refDate = Date.parse(input);
    let displayCount = 4;
    let timer = 0;
    const setCount = () => {
        const diff = Date.now() - refDate;
        const days = Math.floor(diff / (1000 * 24 * 60 * 60));
        const hr = Math.floor((diff % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60));
        const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const sec = Math.floor((diff % (1000 * 60)) / (1000));
        countDifferenceInputEle.disabled = true;
        displayCount--;
        if (diff < 0) {
            countDifferenceTextEle.innerHTML = `Time Remaining<span> : ${Math.abs(days)} d, ${Math.abs(hr)} h, ${Math.abs(min)} m,  ${Math.abs(sec)} s</span>`;
        } else {
            countDifferenceTextEle.innerHTML = `Time Elapsed<span> : ${days} d, ${hr} h, ${min} m, ${sec} s</span>`;
        }
        if (displayCount < 0) {
            clearInterval(timer);
            countDifferenceTextEle.innerHTML = '';
            countDifferenceInputEle.disabled = false;
            countDifferenceInputEle.value = null;
        }
    }
    timer = setInterval(setCount, 1000);
}

function scrollToTop() {
    window.scroll(0, 0);
}

function capsLockDisplay() {
    window.addEventListener('keyup', (event) => {
        if (event.key == "CapsLock" && event.getModifierState("CapsLock")) {
            $('#capsLockText').innerHTML = `CAPSLOCK is ON`;
            setTimeout(() => {
                $('#capsLockText').innerHTML = `Press CapsLock Key`;
            }, 3000);

        } else if (event.key == "CapsLock" && !event.getModifierState("CapsLock")) {
            $('#capsLockText').innerHTML = `Capslock is off`;
            setTimeout(() => {
                $('#capsLockText').innerHTML = `Press CapsLock Key`;
            }, 3000);
        }
    })
}

function beforeunload() {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
        if (newWindow) {
            newWindow.close();
        }
    });
}

function openCustomWindow() {
    let href = window.location.href;
    newWindow = window.open(href.substring(0, href.indexOf(':') + 1), 'popup', `scrollbars=yes,resizable=yes,top=${pageY},left=${pageX},width=${$('#newWindowWidth').value} , height=${$('#newWindowHeight').value}`
    );
}

function printPage() {
    window.print();
}

function toggleAccordionInfo(id) {
    let accordionTextElement = $('#' + id.replace('Title', 'Text'));
    let accordionStatusElement = $('#' + id.replace('Title', 'Status'));
    if (accordionTextElement.style.display === 'none') {
        accordionTextElement.style.display = 'block';
        accordionStatusElement.innerHTML = '-';
    } else {
        accordionTextElement.style.display = 'none';
        accordionStatusElement.innerHTML = '+';
    }
}

function tabClicked(id) {
    let tabClickedEle = $('#' + id);
    let allTabsArray = [{ 'id': 'tab1', 'background': 'bg-primary' }, { 'id': 'tab2', 'background': 'bg-success' }, { 'id': 'tab3', 'background': 'bg-info' }];
    let tabInfoEle = $('#tabInfo');
    allTabsArray.forEach((currentLoopTab) => {
        let currentLoopTabElement = $('#' + currentLoopTab.id);
        if (currentLoopTabElement.id === tabClickedEle.id && !(currentLoopTabElement.classList.contains('text-light'))) {
            currentLoopTabElement.classList.add('text-light');
            tabInfoEle.innerHTML = `<div class="${currentLoopTab.background} p-3 col-12"></div>`;
            tabInfoEle.style.display = 'block';
        } else if (currentLoopTabElement.id !== tabClickedEle.id && (currentLoopTabElement.classList.contains('text-light'))) {
            currentLoopTabElement.classList.remove('text-light');
        }
    });
}

function slideDisplay(input) {
    let slides = $('#slides').children;
    currentSlide += input;

    if (currentSlide > slides.length) {
        currentSlide = 1;
    } else if (currentSlide <= 0) {
        currentSlide = slides.length;
    }

    for (let i = 1; i <= slides.length; i++) {
        if (i !== currentSlide) {
            slides[i - 1].style.display = 'none';
            $('#currentSlideIndicator').children[i - 1].classList.remove('bg-secondary');
        } else {
            slides[i - 1].style.display = 'block';
            $('#currentSlideIndicator').children[i - 1].classList.add('bg-secondary');
        }
    }
}

function pointerDisplayToggleHandler() {
    const pointerDisplayToggleEle = $('#pointerDisplayToggle');
    pointerDisplayToggleEle.addEventListener('click', () => {
        pointerDisplayToggleClicks++;
        if (pointerDisplayToggleClicks % 2 !== 0) {
            addPointerDisplay();
            pointerDisplayToggleEle.innerHTML = 'Stop Tracking';
        } else {
            pausePointerDisplay();
            pointerDisplayToggleEle.innerHTML = 'Start Tracking';
        }
        pointerDisplayToggleEle.classList.toggle('text-danger');
        pointerDisplayToggleEle.classList.toggle('text-success');
    });
}

function addPointerDisplay() {
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', touchMoveHandler);
}

function pausePointerDisplay() {
    window.removeEventListener('touchmove', touchMoveHandler);
    window.removeEventListener('mousemove', mouseMoveHandler);
}

function mouseMoveHandler(event) {
    const mouseOrTouchPointerPositionTrackerTextElement = $('#mouseOrTouchPointerPositionTrackerText');
    pageX = event.pageX;
    pageY = event.pageY;
    mouseOrTouchPointerPositionTrackerTextElement.innerHTML = `
        <span class="p-2">pageX= ${pageX}</span>
        <span class="p-2">pageY= ${pageY}</span>
    `;
}

function touchMoveHandler(event) {
    const mouseOrTouchPointerPositionTrackerTextElement = $('#mouseOrTouchPointerPositionTrackerText');
    pageX = event.touches[0].pageX;
    pageY = event.touches[0].pageY;
    mouseOrTouchPointerPositionTrackerTextElement.innerHTML = ` 
        <span class="p-2">pageX= ${pageX.toFixed(2)}</span>
        <span class="p-2">pageY= ${pageY.toFixed(2)}</span>
    `;
}

function toggleFullScreen(buttonId) {
    const ele = $('body');
    const buttonEle = $(`#${buttonId}`);
    if (ele.requestFullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            ele.requestFullscreen();
        }
        buttonEle.classList.toggle("bi-arrows-collapse");
        buttonEle.classList.toggle("bi-arrows-fullscreen");
    } else {
        alert(' Oops..!The feature is not optimized for your browser');
    }
}

function scrollSpy() {
    let eleList = document.querySelectorAll(".card");
    let currentElement = null;
    let objList = [];
    let scrollSpyEle = $("#scrollSpy");

    for (let ele of eleList) {
        objList.push(ele);
    }
    document.addEventListener("scroll", (e) => {
        currentElement = objList.find((item) => item.offsetTop > window.scrollY);
        if (!currentElement) {
            currentElement = objList[objList.length - 1];
        }
        scrollSpyEle.innerHTML = `<div id="${currentElement.id}ScrollSpy" style="padding:5px">At: #${currentElement.id}</div>`;
    })
}

function injectProfileInfo() {
    const URL = 'https://api.github.com/users/sahilparekh1212';
    fetch(URL, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((data) => {
            let gitHubData = data;
            console.log('gitHubData=', gitHubData);
            let footerContainer = $('footer .container');
            let gitHubInfoEle = document.createElement('div');
            gitHubInfoEle.innerHTML = `
                <p><i class="bi bi-github"></i> GitHub: <a target="_blank" href="${gitHubData['html_url']}">${gitHubData['html_url']}</a></p>
                <p><i class="bi bi-linkedin"></i> LinkedIn: <a target="_blank" href="https://linkedin.com/in/sahilparekh1212">https://linkedin.com/in/sahilparekh1212</a></p>
                <p><i class="bi bi-envelope"></i> Email: <a target="_blank" href="mailto:sahilparekh1212@gmail.com">sahilparekh1212@gmail.com</a></p>
                <p><i class="bi bi-code-slash"></i> Leetcode: <a target="_blank" href="https://www.leetcode.com/sahilparekh1212">https://www.leetcode.com/sahilparekh1212</a></p>
            `;
            footerContainer.appendChild(gitHubInfoEle);
        });
}
