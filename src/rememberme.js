let URL = require('./endpoints.js');

let memoryButtonID = 'remember-me';
let memoryButton = document.getElementById(memoryButtonID);
let cookieRequest = new Request(URL("/cookie"));

function setForgetButton() {
    memoryButton.removeEventListener('click', remembeMeClickHandler);
    memoryButton.innerText = 'Forget me';
    memoryButton.addEventListener('click', forgetMeClickHandler);
}

function setRememberButton() {
    memoryButton.removeEventListener('click', forgetMeClickHandler);
    memoryButton.innerText = 'Remember me';
    memoryButton.addEventListener('click', remembeMeClickHandler);
}

function remembeMeClickHandler(evt) {
    evt.preventDefault();
    memoryButton.disabled = true;
    fetch(cookieRequest, {
            mode: 'cors',
            credentials: 'include'
        })
        .then(() => {
            setForgetButton();
            memoryButton.disabled = false;
        })
        .catch(err => console.log(err))
}

function forgetMeClickHandler(evt) {
    evt.preventDefault()
    memoryButton.disabled = true
    document.cookie = 'downloadkubernetes=; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    setRememberButton();
    memoryButton.disabled = false;
}

function initializeMemoryButton() {
    if (document.cookie.includes('downloadkubernetes')) {
        setForgetButton();
        return
    }
    setRememberButton();
}

initializeMemoryButton();

