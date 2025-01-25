document.addEventListener('DOMContentLoaded', function() {
    // Set the wedding date to November 2, 2025 at 16:00 (4:00 PM)
    const weddingDate = new Date("November 2, 2025 16:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");
        
        if (timeLeft < 0) {
            countdownElement.innerHTML = "¡Es el día de la boda! 💍";
            clearInterval(countdownFunction); // Stop the countdown
            return; // Exit the function
        }

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">días</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">segundos</span>
            </div>
        `;
    }

    // Update countdown immediately and then every second
    updateCountdown();
    const countdownFunction = setInterval(updateCountdown, 1000);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });

    // Photo sharing button animation
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('mouseover', function() {
            const icon = this.querySelector('.share-icon');
            icon.style.transform = 'scale(1.1) rotate(-5deg)';
        });

        shareButton.addEventListener('mouseout', function() {
            const icon = this.querySelector('.share-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });

        // Add touch feedback for mobile
        shareButton.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        shareButton.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    }
}); 