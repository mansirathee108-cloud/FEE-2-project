import { useState, useEffect } from 'react';
import './MainPage.css'


export default function Main(){

    const explore = document.querySelector(".primary");
        if (explore) {
            explore.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelector(".dashboard").scrollIntoView({
                    behavior: "smooth"
                });
            });
        }

        const cards = document.querySelectorAll(
            ".card,.dept,.stat-card,.service,.event-card,.emergency"
        );
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0px)";
                }
            });
        }, {
            threshold: .15
        });

        cards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = ".8s";
            observer.observe(card);
        });

        const stats = document.querySelectorAll(".stat-card h1");
        stats.forEach((stat) => {
            const target = stat.innerHTML;
            let numeric = parseInt(target);
            if (isNaN(numeric)) return;
            let count = 0;
            const speed = Math.ceil(numeric / 80);

            function update() {
                count += speed;
                if (count >= numeric) {
                    count = numeric;
                }
                if (target.includes("%")) {
                    stat.innerHTML = count + "%";
                } else if (target.includes("M")) {
                    stat.innerHTML = (count / 10).toFixed(1) + "M";
                } else {
                    stat.innerHTML = count;
                }
                if (count < numeric) {
                    requestAnimationFrame(update);
                }
            }

            update();
        });

        const weather = document.querySelector(".temp");
        const hour = new Date().getHours();
        if (weather) {
            if (hour >= 6 && hour < 12) {
                weather.style.color = "#FACC15";
            } else if (hour >= 12 && hour < 18) {
                weather.style.color = "#38BDF8";
            } else {
                weather.style.color = "#A855F7";
            }
        }

        setInterval(() => {
            document.body.style.background =
                `linear-gradient(
                    180deg,
                    rgb(${8 + Math.random() * 5},
                    ${17 + Math.random() * 5},
                    ${32 + Math.random() * 5}),
                    #111827,
                    #172C4A)`;
        }, 8000);

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.boxShadow = "0px 20px 45px rgba(56,189,248,.25)";
            });
            card.addEventListener("mouseleave", () => {
                card.style.boxShadow = "0px 20px 40px rgba(0,0,0,.25)";
            });
        });

        window.onload = function () {
            document.body.style.opacity = "0";
            document.body.style.transition = "1s";
            setTimeout(() => {
                document.body.style.opacity = "1";
            }, 100);
        };


    return(
        <div id="mainB">
    <section className="hero">
        <div className="container">
            <div className="hero-grid">
                <div className="card welcome">
                    <div className="tag">SMART • SAFE • SUSTAINABLE</div>
                    <h1>
                        Welcome to
                        <span>Oakridge</span>
                        Smart City
                    </h1>
                    <p>
                        Discover a city where innovation meets sustainability.
                        Explore smart governance, healthcare, education,
                        tourism, food services and public safety through one
                        integrated digital platform.
                    </p>
                    <div className="buttons">
                        <a href="#" className="btn primary">Explore City</a>
                        <a href="#" className="btn secondary">Learn More</a>
                    </div>
                </div>
                <div className="card mayor">
                    <img src="images/mayor.png" alt="Mayor" />
                    <h2>Himanshi</h2>
                    <h4>Mayor of Oakridge</h4>
                    <p className="quote">
                        "Working together to build a smarter, cleaner, and safer tomorrow—because every citizen deserves a world that stands strong."
                    </p>
                    <div className="mini-stats">
                        <div className="mini">
                            <p>Population</p>
                            <span>1.8M</span>
                        </div>
                        <div className="mini">
                            <p>Safety Index</p>
                            <span>94%</span>
                        </div>
                        <div className="mini">
                            <p>Green Score</p>
                            <span>96%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="dashboard">
        <div className="container">
            <h2 className="section-title">City Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="icon">👥</div>
                    <h1>1.8M</h1>
                    <p>Population</p>
                </div>
                <div className="stat-card green">
                    <div className="icon">🛡️</div>
                    <h1>94%</h1>
                    <p>Safety Index</p>
                </div>
                <div className="stat-card orange">
                    <div className="icon">🌿</div>
                    <h1>96%</h1>
                    <p>Green Score</p>
                </div>
                <div className="stat-card yellow">
                    <div className="icon">🌤️</div>
                    <h1>72</h1>
                    <p>AQI</p>
                </div>
                <div className="stat-card purple">
                    <div className="icon">🚦</div>
                    <h1>32%</h1>
                    <p>Traffic</p>
                </div>
            </div>
            <div className="news-weather">
                <div className="card news">
                    <h2>Live Updates</h2>
                    <div id="news-container">
                        <ul>
                            <li>New Metro Line Phase-II inaugurated.</li>
                            <li>Free Health Camp this Sunday.</li>
                            <li>Smart Parking System launched downtown.</li>
                            <li>Education Scholarship Portal now open.</li>
                            <li>Tourism Festival begins next week.</li>
                            <li>New EV charging hubs completed in 12 neighborhoods.</li>
                            <li>City library extends hours for summer study.</li>
                            <li>Smart waste bins now live across central districts.</li>
                            <li>Night market returns with local artisans.</li>
                            <li>Water conservation app hits 100k downloads.</li>
                            <li>City safety camera network expands to 30 new junctions.</li>
                            <li>Urban garden plots available for residents.</li>
                            <li>Solar streetlights activated in West Oakridge.</li>
                            <li>Stand user sighted near downtown murals.</li>
                            <li>Stone Ocean art installation opens by the river.</li>
                        </ul>
                    </div>
                </div>
                <div className="card weather">
                    <h2>☀ Live Weather</h2>
                    <div className="weather-box">
                        <div className="temp changeTemp">30°C</div>
                        <div className="weather-details">
                            <p><strong>Condition:</strong> Sunny</p>
                            <p><strong>Humidity:</strong> 63%</p>
                            <p><strong>Wind:</strong> 11 km/h</p>
                            <p><strong>Visibility:</strong> 9 km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="extras">
        <div className="container">
            <h2 className="section-title">Upcoming Events</h2>
            <div className="events-grid">
                <div className="event-card">
                    <div className="event-date">
                        <h2>15</h2>
                        <p>JUL</p>
                    </div>
                    <div className="event-info">
                        <h3>Smart City Hackathon</h3>
                        <p>
                            Develop innovative smart city solutions with students,
                            developers and professionals.
                        </p>
                    </div>
                </div>
                <div className="event-card">
                    <div className="event-date">
                        <h2>21</h2>
                        <p>JUL</p>
                    </div>
                    <div className="event-info">
                        <h3>Mega Health Camp</h3>
                        <p>
                            Free health checkups, blood donation,
                            BMI analysis and awareness programs.
                        </p>
                    </div>
                </div>
                <div className="event-card">
                    <div className="event-date">
                        <h2>30</h2>
                        <p>AUG</p>
                    </div>
                    <div className="event-info">
                        <h3>Tourism Carnival</h3>
                        <p>
                            Food festivals, music performances,
                            art exhibitions and local handicrafts.
                        </p>
                    </div>
                </div>
            </div>
            <h2 className="section-title">Quick Services</h2>
            <div className="services">
                <div className="service">
                    <h2>📄</h2>
                    <p>Apply for Birth Certificate</p>
                </div>
                <div className="service">
                    <h2>💡</h2>
                    <p>Electricity Bill</p>
                </div>
                <div className="service">
                    <h2>💧</h2>
                    <p>Water Bill</p>
                </div>
                <div className="service">
                    <h2>🚗</h2>
                    <p>Traffic Fine</p>
                </div>
                <div className="service">
                    <h2>🚌</h2>
                    <p>Bus Pass</p>
                </div>
                <div className="service">
                    <h2>🏠</h2>
                    <p>Property Tax</p>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}