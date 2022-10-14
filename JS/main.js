var windowClickCount=0;
var windowDblClickCount=0;

window.onload = function () {
    updateBody();
}

function updateBody() {
    const body = document.querySelector('body');
    body.classList.add('bg-light','text-dark');
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
    const header = document.querySelector('header');
    header.innerHTML = `
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a href="#" class="navbar-brand">javaScript Project</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuItems">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="menuItems">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link">A</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">B</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">C</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
}

function updateMain() {
    const main = document.querySelector('main');
    main.classList.add('container','p-3');
    main.innerHTML= createAccordianItem(2);
}

function updateFooter() {
    const footer= document.querySelector('footer');
    footer.innerHTML=`
        <div class="container">
            <div class="row d-flex">
                <div class="col-md-2 my-auto">
                    <span class="my-auto p-3">Follow Us:</span>
                </div>
                <div class="col-md-3 p-2 my-auto justify-content-around">        
                    <a href="https://www.youtube.com/" target="_blank"><i class="bi-youtube p-3" aria-hidden="true"></i></a>
                    <a href="https://twitter.com/?lang=en" target="_blank"><i class="bi-twitter p-3" aria-hidden="true"></i></a>
                    <a href="https://www.instagram.com/" target="_blank"><i class="bi-instagram p-3" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="row d-flex">
                <div class="col-md-2 my-auto">
                    <span class="my-auto p-3">Logo</span>
                </div>
                <div class="col-md-5 p-2 my-auto justify-content-around">        
                    <a href="#" target="_blank" class="text-decoration-none"><span class="p-3">Privacy and Terms</span></a>
                    <a href="#" target="_blank" class="text-decoration-none"><span class="p-3">About Us</span></a>
                    <a href="#" target="_blank" class="text-decoration-none"><span class="p-3">Our Products</span></a>
                </div>
                <div class="col-md-5 p-2">        
                    <a href="#" target="_blank" class="text-decoration-none"><i class="bi bi-question p-2" aria-hidden="true"></i><span>Help</span></a>
                </div>
            </div>
        </div>
    `;
}

function createAccordianItem(totalDiv){
    let accordianHTML=``;
    for(i=0;i<totalDiv;i++){
        accordianHTML+=`
            <div class="accordion-item bg-light text-dark ">
                <h2 class="accordion-header" id="accordionHeading${i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#accordionCollapse${i}" aria-expanded="false"
                        aria-controls="accordionCollapse${i}">
                        Dashboard ${i+1}
                    </button>
                </h2>
            </div>
        `;    
        if(i===0){
            accordianHTML+=`
                <div id="accordionCollapse${i}" class="accordion-collapse collapse border border-dark rounded"
                    aria-labelledby="accordionHeading${i}">
                    <div class="accordion-body">
                        ${eventsDashboard()}
                    </div>
                </div>
            `;
        }else if(i===1){
            accordianHTML+=`
                <div id="accordionCollapse${i}" class="accordion-collapse collapse border border-dark rounded"
                    aria-labelledby="accordionHeading${i}">
                    <div class="accordion-body">
                        ${applicationDashboard()}
                    </div>
                </div>
            `;
        }else{
            accordianHTML+=`
                <div id="accordionCollapse${i}" class="accordion-collapse collapse border border-dark rounded"
                    aria-labelledby="accordionHeading${i}">
                    <div class="accordion-body">
                        TBD
                    </div>
                </div>
            `;
        }
    } 


    return accordianHTML;
}

function eventsDashboard(){
    let itemHTML=`
        <div class="row justify-content-around">

            <div class="card col-md-3 bg-dark text-light" id="clipboard">
                <div class="card-body">
                    <h5 class="card-title">Copy To Clipboard</h5>
                    <input id="clipboardInput" type="text" value="Sample Text" maxlength="20" style="max-width:70%" class="rounded p-1">
                    <button id="clipboardIcon" onclick="copyToClipboard()" class="bi bi-clipboard rounded p-1"> Copy</button>
                </div>
            </div>

            <div class="card col-md-3 bg-dark text-light">
                <div class="card-body">
                    <h5 class="card-title">Share Text</h5>
                    <div>        
                        <input class="bg-light text-dark rounded p-1" id="textToBeShared" type="text" value="Text To Be Shared" style="max-width:65%">
                        <button onclick="copyAndShareTextWithURL()" class="bi bi-share rounded p-1"> Share</button>
                    </div>
                </div>
            </div>

            <div class="card col-md-2 bg-dark text-light" id="hoverToggle">
                <div class="card-body">
                    <h5 class="card-title">Hover Toggle</h5>
                    <p>Lorem cingnihil?</p>
                </div>
            </div>

            <div class="card col-md-3 bg-dark text-light">
                <div class="card-body">
                    <h5 class="card-title bi bi-speaker"> View Volume + -</h5>
                    <div>
                        <span id="volumeChangeText">Press Volume Up/Down Key</span>
                    </div>
                </div>
            </div>
    
        </div>
    `;
    return itemHTML;
}

function applicationDashboard(){
    let accordianHTML=``;
    accordianHTML+=`
    <div class="row justify-content-around">

        <div class="card col-md-2 bg-dark text-light" id="mousePointerPositionTracker">
            <div class="card-body">
                <h5 class="card-title">Pointer Display</h5>
                <div id="mousePointerPositionTrackerText"></div>
            </div>
        </div>

        <div class="card col-md-2 bg-dark text-light" id="clickCounter">
            <div class="card-body">
                <h5 class="card-title">Clicks Logger</h5>
                <div>
                    <div>click= <span id="windowClickCounterText" class="p-2">0</span></div>
                    <div>dblClick= <span id="windowDblClickCounterText" class="p-2">0</span></div>
                </div>
            </div>
        </div>

        <div class="card col-md-3 bg-dark text-light">
            <div class="card-body">
                <h5 class="card-title">Get Location</h5>
                <div>
                    <button onclick="getLocation()" class="bi bi-geo-alt rounded p-1"> Location</button>
                    <span id="locationText"></span>
                </div>
            </div>
        </div>

        <div class="card col-md-2 bg-dark text-light">
            <div class="card-body">
                <h5 class="card-title">Live Battery Info</h5>
                <div>
                    <button onclick="getBattery(showBatteryLevelAndCharging)" class="bi bi-battery rounded p-1"> Battery</button>
                    <span id="batteryLevelText"></span>
                    <span id="batteryChargingText"></span>
                </div>
            </div>
        </div>

    </div>
    `;
    return accordianHTML;
}

function addDOMEvents(){

    let mousePointerPositionTrackerTextElement=document.getElementById('mousePointerPositionTrackerText');
    window.addEventListener('mousemove',(event)=>{
        mousePointerPositionTrackerTextElement.innerHTML=`
            <span class="p-2">pageX= ${event.pageX}</span>
            <span class="p-2">pageY= ${event.pageY}</span>
        `;
    });

    let hoverToggle=document.getElementById('hoverToggle');
    hoverToggle.addEventListener('mouseenter',()=>{
        hoverToggle.classList.toggle('bg-dark');
        hoverToggle.classList.toggle('text-light');
        hoverToggle.classList.add('text-dark');
    });
    hoverToggle.addEventListener('mouseleave',()=>{
        hoverToggle.classList.toggle('bg-dark');
        hoverToggle.classList.toggle('text-light');
        hoverToggle.classList.toggle('text-dark');
    });

    let windowClickCounterElement = document.getElementById('windowClickCounterText');
    window.addEventListener('click',()=>{
        windowClickCount++;
        windowClickCounterElement.innerText=`${windowClickCount}`;
    });

    let windowDblClickCounterElement = document.getElementById('windowDblClickCounterText');
    window.addEventListener('dblclick',()=>{
        windowDblClickCount++;
        windowDblClickCounterElement.innerText=`${windowDblClickCount}`;
    });

    volumeChange();
}

function copyToClipboard() {
    let copyTextElement = document.getElementById("clipboardInput");
    copyTextElement.select();
    copyTextElement.setSelectionRange(0, 20);
    navigator.clipboard.writeText(copyTextElement.value);
    navigator.clipboard.readText().then((text)=>{
        alert("Copied: "+text+"\nLength: "+text.length);
    }).catch((error)=>{
        console.log("Could not copy"+error);
    });
}

function copyAndShareTextWithURL(){
    let textToBeSharedElement = document.getElementById("textToBeShared");
    textToBeSharedElement.select();
    textToBeSharedElement.setSelectionRange(0,99999);
    navigator.clipboard.writeText(textToBeSharedElement.value);
    navigator.clipboard.readText().then((text)=>{
        const shareData = {
            title: 'ShareData',
            text: text,
            url: window.location.href
          }
        navigator.share(shareData);
    }).catch((error)=>{
        console.log("Could not copy and Share"+error);
    });
}

function getLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
        let locationTextElement = document.getElementById('locationText')
        
        locationTextElement.innerText=`
        latitude= ${position.coords.latitude} ,\n longitude= ${position.coords.longitude}
        `;
    },(error)=>{
        console.log(error);
    });
}

function getBattery(functionName){
    navigator.getBattery().then((battery)=>{
        battery.addEventListener('chargingchange',(event)=>{
            functionName(event.currentTarget.level,event.currentTarget.charging);
        });
        battery.addEventListener('levelchange',(event)=>{
            functionName(event.currentTarget.level,event.currentTarget.charging);
        });
        functionName(battery.level,battery.charging);   

    }).catch((error)=>{
        console.log("getBattery() > error= "+error);
    });
}

function showBatteryLevelAndCharging(level,charging){
    document.getElementById('batteryLevelText').innerText = `chargeLevel = ${level*100}% ,`;
    document.getElementById('batteryChargingText').innerText =`\nis charging ? = ${charging ? 'Yes' : 'No'}`; 
}

function volumeChange(){
    window.addEventListener('keydown',(event)=>{
        var volumeChangeTextElement = document.getElementById('volumeChangeText');
        volumeChangeTextElement.innerText=`Key pressed: Volume`;
        if(event.key==="AudioVolumeDown"){
            volumeChangeTextElement.innerText+=` Down (-)`;
        }else if(event.key==="AudioVolumeUp"){
            volumeChangeTextElement.innerText+=` Up (+)`;
        }else{
            volumeChangeTextElement.innerText="Press Volume Up/Down Key";
        }
    });
}