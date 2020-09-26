const modal = document.querySelector("#modal");
const account = document.querySelector("#account");

account.addEventListener("click", e => {
    modal.style.display = "grid";
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}