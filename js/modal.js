const modal = document.querySelector("#modal");
const account = document.querySelector("#account");
const modalHeader = document.querySelector(".modal-header");
const ssWrapper = document.querySelector(".ss-wrapper");
const btnSignup = document.querySelector(".btn-signup");
const btnLogin = document.querySelector(".btn-signin");
const modalSignup = document.querySelector("#modal-signup");
const modalLogin = document.querySelector("#modal-signin");

account.addEventListener("click", e => {
    modal.style.display = "grid";
    ssWrapper.style.display = "block";
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalSignup.style.display = "none";
        modalLogin.style.display = "none";
        if (modalHeader.childElementCount > 0) {
            modalHeader.removeChild(modalHeader.childNodes[0]);
        }
    }
}

btnSignup.onclick = () => {
    ssWrapper.style.display = "none";
    modalSignup.style.display = "block";
    createModalHeaderText("Signup");
};

btnLogin.onclick = () => {
    ssWrapper.style.display = "none";
    modalLogin.style.display = "block";
    createModalHeaderText("Signin");
}

function createModalHeaderText(text) {
    const h = document.createElement("H2");
    const t = document.createTextNode(text); 
    h.appendChild(t); 
    modalHeader.appendChild(h);
} 