import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(){
    
    const [icnLink, setIcnLink] = useState(null);
    
    useEffect(() => {
        const sidebarButton = document.querySelectorAll(".sidebarButton");
        const body = document.querySelector('body');
        const sideMenu = document.querySelector("#side");

        sidebarButton.forEach(btn => {
            btn.addEventListener("click", (event) => {
                event.stopPropagation();
                sideMenu.classList.add("show");
                body.classList.add("dimmed");
            })
        });
        
        body.addEventListener("click", () => {
            sideMenu.classList.remove("show");
            body.classList.remove("dimmed");
        });

        updateClock();
        setInterval(updateClock, 1000);
        
        async function updateWether(latitude, longitude) {
        
        
            const apiKey = "b25b86ff5f31ee72f5c323f68ffa0ac2";
        
            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
            const data = await weatherRes.json();
        
            setIcnLink(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        
            console.log(icnLink);
        
            const fields = document.querySelectorAll('.changeTemp');
        
            if (fields) {
                fields.forEach(field => {
                    field.textContent = Math.trunc(data.main.temp) + "°C";
                })
            }
        
            const humidField = document.querySelector("#humi");
            const speedField = document.querySelector('#speed');
            const visibilityField = document.querySelector('#visi');
            const conditionField = document.querySelector('#cond');
            if (humidField) humidField.textContent = data.main.humidity;
            if (speedField) speedField.textContent = data.wind.speed;
            if (visibilityField) visibilityField.textContent = data.visibility / 1000; 
            if (conditionField) conditionField.textContent = data.weather[0].main;
        }
        
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateWether(latitude, longitude);
        })
    }, []);

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

    return (
        <>
        <header>
            <div className="container">
                <nav>
                    <Link style={{"text-decoration": "none"}} to="/" className="logo">
                        <img src="/Navy_blue_circle_with_tree_202607301434.jpeg" alt="Logo" />
                        <h1 className="moduleWhiteText">Oakridge <span>Smart City</span></h1>
                    </Link>
                    <div className="menu">
                        <Link to="/">Home</Link>
                        <a className="sidebarButton">Departments</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="status">
                        <p>Monday, 20 July 2026</p>
                        <h2>09:45 AM</h2>
                        <p className="flex"><img src={icnLink}/><span className="changeTemp">--C</span></p>
                    </div>
                </nav>
            </div>
        </header>
        
        </>
    )
}