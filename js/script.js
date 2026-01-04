// --- 1. MATRIX RAIN ---
function startMatrix() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let i = 0; i < columns; i++) drops[i] = 1;

    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        for(let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 35);
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

// --- 2. TYPEWRITER ---
const textToType = "Cyber Security Student | Street Photographer | Tech Enthusiast";
const typeWriterElement = document.getElementById('typing-text');
let typeIndex = 0;
function typeWriter() {
    if (typeWriterElement && typeIndex < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 80);
    }
}

// --- 3. HAMBURGER MENU ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// --- 4. LIGHTBOX ---
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);
const closeBtn = document.createElement('span');
closeBtn.id = 'lightbox-close';
closeBtn.innerHTML = '&times;';
lightbox.appendChild(closeBtn);

const images = document.querySelectorAll('.photo-container img');
images.forEach(image => {
    if (!image.closest('.slideshow-container')) {
        image.addEventListener('click', e => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    }
});
lightbox.addEventListener('click', e => { if (e.target !== lightboxImg) lightbox.style.display = 'none'; });

// --- 5. SLIDESHOW ---
let slideIndex = 1;
if (document.querySelector('.slideshow-container')) {
    showSlides(slideIndex);
    setInterval(function() { plusSlides(1); }, 5000); 
}
function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
    slides[slideIndex-1].style.display = "block";
    if(dots.length > 0) dots[slideIndex-1].className += " active";
}

// --- INIT ---
window.onload = function() {
    // Check for photo-theme class to disable matrix
    if (!document.body.classList.contains('photo-theme')) {
        startMatrix();
    }
    typeWriter();
};