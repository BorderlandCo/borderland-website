document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        for (let i = 0; i < 50; i++) { // Количество шариков
            let size = Math.random() * 6 + 2; // Уменьшил размер (2px - 8px)
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.3})`; // Белый цвет

            particles.push(new Particle(x, y, size, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();

});
