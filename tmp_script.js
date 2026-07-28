
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

        const news = [
            "🚇 Metro Phase-II has officially opened.",
            "🏥 Mega Health Camp starts this Sunday.",
            "🎓 Scholarship Portal is now accepting applications.",
            "🌳 10,000 new trees planted this month.",
            "🚔 Crime reduced by 18% compared to last year.",
            "🏖 Tourism Festival begins next week.",
            "⚡ Smart Street Lights installed in downtown."
        ];
        let newsIndex = 0;
        const newsList = document.querySelector(".news ul");

        function rotateNews() {
            if (!newsList) return;
            newsList.style.opacity = "0";
            setTimeout(() => {
                newsList.innerHTML = "<li>" + news[newsIndex] + "</li>";
                newsIndex++;
                if (newsIndex >= news.length) {
                    newsIndex = 0;
                }
                newsList.style.opacity = "1";
            }, 400);
        }

        setInterval(rotateNews, 3500);

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

        const body = document.querySelector('body');
        const sideMenu = document.querySelector("#side");
        const sidebarButton = document.querySelector(".sidebarButton");

        sidebarButton.addEventListener("click", (event) => {
            event.stopPropagation();
            sideMenu.classList.add("show");
            body.classList.add("dimmed");
            sidebarButton.style.opacity = 0;
        });

        sideMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

        body.addEventListener("click", () => {
            sideMenu.classList.remove("show");
            body.classList.remove("dimmed");
            sidebarButton.style.opacity = 1;
        });
    