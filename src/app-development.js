document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ App Development Page Loaded");

    // Проверяем, есть ли canvas
    let canvas = document.getElementById("backgroundCanvas");
    if (!canvas) {
        console.error("❌ Ошибка: backgroundCanvas не найден!");
        return;
    } else {
        console.log("✅ Canvas найден.");
    }

    const ctx = canvas.getContext("2d");

    // Устанавливаем размер canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Создаём частицы
    const particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1; // Размер от 1 до 6 пикселей
            this.speedX = (Math.random() - 0.5) * 2; // Скорость по X
            this.speedY = (Math.random() - 0.5) * 2; // Скорость по Y
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Отскок от границ экрана
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    console.log("✅ Фоновая анимация запущена.");
});
