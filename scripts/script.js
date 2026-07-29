const sidebarButton = document.querySelectorAll(".sidebarButton");
const body = document.querySelector('body');
const sideMenu = document.querySelector("#side");

sidebarButton.forEach(btn => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        sideMenu.classList.add("show");
        body.classList.add("dimmed");
        // floatBtn.style.opacity = 0;
    })       
});

sideMenu.addEventListener("click", (event) => {
    event.stopPropagation();
});

body.addEventListener("click", () => {
    sideMenu.classList.remove("show");
    body.classList.remove("dimmed");
    sidebarButton.forEach(btn => {
        floatBtn.style.opacity = 1;
    })
});