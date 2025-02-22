document.addEventListener("DOMContentLoaded", function () {
    function revealOnScroll() {
        const customInfo = document.querySelector(".custom-info");
        const windowHeight = window.innerHeight;
        const elementTop = customInfo.getBoundingClientRect().top;
        const elementVisible = 100; // Когда блок на 100px от низа экрана

        if (elementTop < windowHeight - elementVisible) {
            customInfo.classList.add("show");
        }
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Проверяем сразу после загрузки
});
