// Menu functionality
const sidemenu = document.getElementById("sidemenu");
const menuIcon = document.querySelector(".fa-bars");
const closeIcon = document.querySelector(".fa-circle-xmark");

function openmenu() {
    sidemenu.style.right = "0";
    menuIcon.style.display = "none";
}

function closemenu() {
    sidemenu.style.right = "-200px";
    menuIcon.style.display = "block";
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!sidemenu.contains(e.target) && !menuIcon.contains(e.target)) {
        closemenu();
    }
});

// Active menu item highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === current) {
            link.classList.add("active");
        }
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "dark");
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

// Form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbwXYX5fmMzKssALirvMb9t_P-Dkw-hkgFjv9E3SPrctQbYQLigm1qqe-sIUqr-Msftr/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            msg.style.color = "#22c55e";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error sending message. Please try again.";
            msg.style.color = "#ef4444";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closemenu();
        }
    });
});