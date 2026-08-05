const sidebarButton = document.querySelectorAll(".sidebarButton");
const body = document.querySelector('body');
const sideMenu = document.querySelector("#side");
const floatBtn = document.querySelector("#sideBtn");


sidebarButton.forEach(btn => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        sideMenu.classList.add("show");
        body.classList.add("dimmed");
        floatBtn.style.opacity = 0;
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

function updateClock() {
    const now = new Date();
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };
    const date = now.toLocaleDateString("en-US", dateOptions);
    const time = now.toLocaleTimeString("en-US", timeOptions);
    const dateBox = document.querySelector(".status p");
    const clockBox = document.querySelector(".status h2");
    if (dateBox) dateBox.innerHTML = date;
    if (clockBox) clockBox.innerHTML = time;
}

updateClock();
setInterval(updateClock, 1000);


async function updateWether(latitude, longitude) {


    const apiKey = "b25b86ff5f31ee72f5c323f68ffa0ac2";

    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
    const data = await weatherRes.json();

    const fields = document.querySelectorAll('.changeTemp');

    if (fields) {
        fields.forEach(field => {
            field.textContent = Math.trunc(data.main.temp) + "°C";
        })
    }



}

navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    updateWether(latitude, longitude);
})