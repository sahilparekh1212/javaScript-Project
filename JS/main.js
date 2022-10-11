window.onload = function () {
    updateBody();
}

function updateBody() {
    const body = document.querySelector('body');
    body.innerHTML = `
    <header></header>
    <main ></main>
    <footer></footer>
    `;
    updateHeader();
    updateMain();
    updateFooter();
}

function updateHeader() {
    const header = document.querySelector('header');
    header.innerHTML = `
        <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
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
    main.classList.add('container','p-3','bg-dark','text-light');
    main.innerHTML= createAccordianItem(2);
}

function updateFooter() {
    const footer= document.querySelector('footer');
    footer.classList.add('bg-dark','text-light');
    footer.innerHTML=`
    <div class="row d-flex justify-content-around">
        <div class="col-md-6 text-center">
            <p class="my-auto p-3"><i class="bi bi-info-circle p-2" aria-hidden="true"></i>Lorem ipsum dolor sit amet consectetur ing elit. Aperiam,e aliquam quas porro. Nisi?</p>
        </div>
        <div class="col-md-4 p-2 my-auto">
            <a href="https://www.facebook.com/" target="_blank"><i class="bi-facebook" aria-hidden="true"></i></a>
            <a href="https://twitter.com/?lang=en" target="_blank"><i class="bi-twitter" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/" target="_blank"><i class="bi-instagram" aria-hidden="true"></i></a>
            <a href="https://www.youtube.com/" target="_blank"><i class="bi-youtube" aria-hidden="true"></i></a>
        </div>
    </div>
    `;
}

function createAccordianItem(totalDiv){
    let accordianHTML=``;
    for(i=0;i<totalDiv;i++){
        accordianHTML+=`
        <div class="accordion-item bg-secondary text-light">
            <h2 class="accordion-header" id="accordionHeading${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#accordionCollapse${i}" aria-expanded="false"
                    aria-controls="accordionCollapse${i}">
                    Accordion ${i}
                </button>
            </h2>
            <div id="accordionCollapse${i}" class="accordion-collapse collapse"
                aria-labelledby="accordionHeading${i}">
                <div class="accordion-body">
                    Lorem ipsum dolor sit amet conse.
                </div>
            </div>
        </div>
        `;       
    } 
    return accordianHTML;
}