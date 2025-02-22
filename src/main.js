document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    // Устанавливаем размеры
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles = [];

    class Particle {
        constructor(x, y, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0; // Очищаем массив перед инициализацией
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 3 + 2;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 2;
            const speedY = (Math.random() - 0.5) * 2;

            particles.push(new Particle(x, y, size, speedX, speedY));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();

            particle.size += Math.sin(Date.now() * 0.002) * 0.15;
            if (particle.size < 1.5) particle.size = 1.5;
            if (particle.size > 4) particle.size = 4;
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // 🔹 Анимация заголовка "Typing"
    const textElement = document.querySelector(".typing-text");
    if (textElement) {
        const text = "We create next-gen mobile solutions";
        let index = 0;

        function typeText() {
            if (index < text.length) {
                textElement.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            } else {
                textElement.classList.remove("border-right");
            }
        }

        textElement.innerHTML = "";
        textElement.style.display = "inline-block";
        setTimeout(typeText, 500);
    }

    // 🔹 Плавный скролл к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            const target = targetId === "#home" ? document.querySelector(".hero") : document.querySelector(targetId);

            let offset = 80;
            if (targetId === "#services") offset = 215;

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        });
    });

    // 🔹 Анимация появления секций при скролле
    const sections = document.querySelectorAll("section");

    function revealSections() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    // 🔹 Скрытие/появление navbar при скролле
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    let isScrolling;

    window.addEventListener("scroll", () => {
        clearTimeout(isScrolling);

        if (window.scrollY > lastScrollY) {
            navbar.classList.add("hidden");
        } else {
            navbar.classList.remove("hidden");
        }

        lastScrollY = window.scrollY;

        isScrolling = setTimeout(() => {
            navbar.classList.remove("hidden");
        }, 300);
    });

    // 🔹 Бургер-меню
    const burgerMenu = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("#nav-menu");

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener("click", () => {
            navMenu.classList.toggle("show-menu");
        });
    }

    // 🔹 Скрытие заголовка "Our Services" при наведении на Web Development
    const servicesTitle = document.getElementById("services-title");
    const webDevelopment = document.querySelector(".service:nth-child(2)");

    if (servicesTitle && webDevelopment) {
        webDevelopment.addEventListener("mouseenter", function () {
            servicesTitle.style.opacity = "0";
            servicesTitle.style.transition = "opacity 0.3s ease-in-out";
        });

        webDevelopment.addEventListener("mouseleave", function () {
            servicesTitle.style.opacity = "1";
        });
    }

    document.querySelectorAll(".service").forEach(service => {
        service.addEventListener("click", (event) => {
            // Проверяем, что клик был не по всплывающему окну
            if (!event.target.closest(".popup")) {
                const link = service.getAttribute("data-link");
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });

    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    let hideTimeout;

    dropdown.addEventListener("mouseenter", function () {
        clearTimeout(hideTimeout); // Отмена задержки скрытия
        dropdownMenu.style.opacity = "1";
        dropdownMenu.style.visibility = "visible";
        dropdownMenu.style.transform = "translateX(-50%) translateY(0)";
    });

    dropdown.addEventListener("mouseleave", function () {
        hideTimeout = setTimeout(() => {
            if (!dropdownMenu.matches(":hover")) {
                dropdownMenu.style.opacity = "0";
                dropdownMenu.style.visibility = "hidden";
                dropdownMenu.style.transform = "translateX(-50%) translateY(10px)";
            }
        }, 300); // Задержка в 300 мс перед скрытием
    });

    dropdownMenu.addEventListener("mouseenter", function () {
        clearTimeout(hideTimeout); // Останавливаем скрытие при наведении на выпадающее меню
    });

    dropdownMenu.addEventListener("mouseleave", function () {
        hideTimeout = setTimeout(() => {
            dropdownMenu.style.opacity = "0";
            dropdownMenu.style.visibility = "hidden";
            dropdownMenu.style.transform = "translateX(-50%) translateY(10px)";
        }, 300);
    });

});
