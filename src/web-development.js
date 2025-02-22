document.addEventListener("DOMContentLoaded", () => {
    console.log("Web Development Page Loaded");

    // Анимация заголовка
    gsap.from(".hero-web h1", {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "power3.out",
    });

    // Анимация секций при скролле
    const sections = document.querySelectorAll(".web-info, .contact-form-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
});
