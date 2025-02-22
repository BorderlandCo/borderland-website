document.addEventListener("DOMContentLoaded", () => {
    // Проверяем, что скрипт выполняется только на странице terms-of-use.html
    if (!document.body.classList.contains("terms-page")) return;

    console.log("✅ Background script activated on Terms of Use page");

    const canvas = document.getElementById("backgroundCanvas");
    if (!canvas) {
        console.error("❌ Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    // Устанавливаем размер canvas на весь экран
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    class Particle {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.speedX = (Math.random() - 0.5) * 1;
            this.speedY = (Math.random() - 0.5) * 1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            let size = Math.random() * 6 + 2;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`;

            particles.push(new Particle(x, y, size, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Фиксируем стили фона
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1"; // Отправляем фон под контент
    canvas.style.background = "#1a1a1a"; // Цвет фона
    console.log("✅ Canvas background color set!");

    // Добавляем градиентный текст только на этой странице
    document.querySelectorAll("h2").forEach(h2 => {
        h2.classList.add("gradient-text");
    });
    setTimeout(() => {
        const canvas = document.getElementById("backgroundCanvas");
        if (canvas) {
            canvas.style.zIndex = "-1";
            canvas.style.opacity = "1";
            canvas.style.display = "block";
            canvas.style.visibility = "visible";
            console.log("✅ Исправлены стили canvas");
        } else {
            console.error("❌ Canvas не найден");
        }
    }, 100);
    
});
