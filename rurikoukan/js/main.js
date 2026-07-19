// ===============================
// 1. Canvas Animation (Hero)
// ===============================
const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.y += this.speedY;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(184, 134, 11, ${this.opacity})`; // 金色
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ===============================
// 2. Existing Features (Hamburger, Scroll, Fade)
// ===============================
const hamburger = document.querySelector(".hamburger");
const drawer = document.querySelector(".drawer");

hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    drawer.classList.toggle("open");
    document.body.classList.toggle("menu-open");
});

// Fade Animation with Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade").forEach(item => observer.observe(item));

// Header Scroll
window.addEventListener("scroll", () => {
    document.querySelector("header").classList.toggle("scroll", window.scrollY > 80);
});