// ===========================
// ENTREPIX - Interactive JavaScript
// ===========================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initRocketLaunch();
    initNavigation();
    initParticles();
    initAccordion();
    initIntersectionObserver();
    initCriteriaCircles();
    initCountUpAnimation();
    initContactForm();
    initCountdown();
});

// ===========================
// Countdown Timer
// ===========================
function initCountdown() {
    // Event date: October 25, 2025, 9:00 AM
    const eventDate = new Date('October 25, 2025 09:00:00').getTime();
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update DOM elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdown);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }, 1000);
}

/* DIWALI-START: Temporary Diwali JS (remove this block to disable Diwali modal) */
(function(){
    // Show Diwali modal after launch-screen is hidden or after a fallback timeout
    function showDiwaliModal(){
        const modal = document.getElementById('diwali-modal');
        if(!modal) return;
        modal.setAttribute('aria-hidden', 'false');

        // create a couple of small rockets that fly up for a festive effect
        for(let i=0;i<3;i++){
            const r = document.createElement('div');
            r.className = 'diwali-rocket';
            r.style.right = (10 + i*12) + '%';
            r.style.top = (70 + i*6) + '%';
            r.style.background = 'linear-gradient(180deg,#ff8a65,#ff6b35)';
            r.style.borderRadius = '6px';
            document.body.appendChild(r);
            // remove after animation
            setTimeout(()=> r.remove(), 1800 + i*200);
        }
    }

    function hideDiwaliModal(){
        const modal = document.getElementById('diwali-modal');
        if(!modal) return;
        modal.setAttribute('aria-hidden','true');
    }

    // Try to detect when launch-screen is removed
    const launchScreen = document.getElementById('launch-screen');
    if(launchScreen){
        // Observe display change using MutationObserver on body children
        const observer = new MutationObserver((mutations)=>{
            for(const m of mutations){
                if(m.type === 'childList'){
                    // if launch screen removed
                    if(!document.body.contains(launchScreen)){
                        setTimeout(showDiwaliModal, 400); // small delay
                        observer.disconnect();
                        break;
                    }
                }
            }
        });
        observer.observe(document.body, { childList:true, subtree:false });
    }

    // fallback: ensure it shows after 4.2s if observer didn't trigger
    setTimeout(()=>{
        const modal = document.getElementById('diwali-modal');
        if(modal && modal.getAttribute('aria-hidden') !== 'false'){
            showDiwaliModal();
        }
    }, 4200);

    // Hook up OK button
    document.addEventListener('click', (e)=>{
        if(e.target && e.target.id === 'diwali-ok'){
            hideDiwaliModal();
        }
    });

    // Create realistic fireworks bursts in hero section
    function createFireworks(){
        const heroSection = document.querySelector('.hero-section');
        if(!heroSection) return;

        // Create firework container if not exists
        let container = document.querySelector('.firework-container');
        if(!container){
            container = document.createElement('div');
            container.className = 'firework-container';
            document.body.appendChild(container);
        }

        function launchFirework(){
            const colors = ['#ff1744', '#ff6b35', '#ffd700', '#00f5d4', '#9b5de5', '#f72585', '#ffed4e', '#ff9500'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Launch position (bottom random x)
            const startX = 15 + Math.random() * 70;
            const startY = 85;
            
            // Explosion position (random upper area)
            const explodeX = 10 + Math.random() * 80;
            const explodeY = 15 + Math.random() * 50;
            
            // Create launch trail
            const trail = document.createElement('div');
            trail.className = 'firework-trail';
            trail.style.left = startX + '%';
            trail.style.top = startY + '%';
            trail.style.background = `linear-gradient(to bottom, ${color}, transparent)`;
            container.appendChild(trail);
            setTimeout(()=> trail.remove(), 800);
            
            // Wait for "launch" then create burst
            setTimeout(()=>{
                createBurst(explodeX, explodeY, color);
            }, 600);
        }
        
        function createBurst(x, y, color){
            const particleCount = 55 + Math.floor(Math.random() * 30); // Increased from 40+25 to 55+30
            const burstEl = document.createElement('div');
            burstEl.style.position = 'absolute';
            burstEl.style.left = x + '%';
            burstEl.style.top = y + '%';
            container.appendChild(burstEl);
            
            for(let i=0; i<particleCount; i++){
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.color = color;
                
                // Calculate explosion direction
                const angle = (Math.PI * 2 * i) / particleCount;
                const distance = 110 + Math.random() * 100; // Increased distance for bigger bursts
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                
                particle.style.setProperty('--x', dx + 'px');
                particle.style.setProperty('--y', dy + 'px');
                particle.style.animation = `fireworkExplode ${0.8 + Math.random()*0.4}s ease-out forwards`;
                particle.style.animationDelay = Math.random() * 0.08 + 's';
                
                burstEl.appendChild(particle);
            }
            
            setTimeout(()=> burstEl.remove(), 1500);
        }
        
        // Launch fireworks more frequently
        function scheduledLaunch(){
            launchFirework();
            setTimeout(scheduledLaunch, 900 + Math.random() * 600); // Reduced delay from 1200+800 to 900+600
        }
        scheduledLaunch();
        
        // Launch many more fireworks immediately for higher intensity
        setTimeout(launchFirework, 150);
        setTimeout(launchFirework, 400);
        setTimeout(launchFirework, 650);
        setTimeout(launchFirework, 900);
        setTimeout(launchFirework, 1150);
        setTimeout(launchFirework, 1400);
        setTimeout(launchFirework, 1650);
    }

    // Start fireworks after modal is shown or after delay
    setTimeout(createFireworks, 4500);
})();
/* DIWALI-END */

// ===========================
// Rocket Launch Sequence
// ===========================
function initRocketLaunch() {
    const launchScreen = document.getElementById('launch-screen');
    const mainContent = document.getElementById('main-content');
    
    // Hide launch screen and show main content after animation
    setTimeout(() => {
        launchScreen.style.opacity = '0';
        launchScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            launchScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Trigger nav animation
            animateNavItems();
        }, 500);
    }, 3500); // Matches rocket animation duration
}

// ===========================
// Navigation
// ===========================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(9px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('.section, .hero-section');
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animate navigation items on load
function animateNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// ===========================
// Floating Particles
// ===========================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 6}s`;
        
        // Random animation duration
        particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
        
        // Random color
        const colors = ['var(--accent-teal)', 'var(--accent-violet)', 'var(--accent-orange)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        particlesContainer.appendChild(particle);
    }
}

// ===========================
// Accordion Functionality
// ===========================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ===========================
// Intersection Observer for Scroll Animations
// ===========================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                if (entry.target.classList.contains('track-card')) {
                    animateTrackCard(entry.target);
                }
                if (entry.target.classList.contains('criteria-item')) {
                    animateCriteriaCircle(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.timeline-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.track-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.criteria-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.organizer-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animate timeline items with stagger
function animateTimelineItem(item) {
    const items = document.querySelectorAll('.timeline-item');
    const index = Array.from(items).indexOf(item);
    
    setTimeout(() => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.opacity = '1';
    }, index * 150);
}

// Animate track cards with flip effect
function animateTrackCard(card) {
    const cards = document.querySelectorAll('.track-card');
    const index = Array.from(cards).indexOf(card);
    
    setTimeout(() => {
        card.style.transform = 'rotateY(0deg)';
        card.style.opacity = '1';
    }, index * 100);
}

// Animate criteria circles
function animateCriteriaCircle(item) {
    const circle = item.querySelector('.criteria-progress');
    if (circle) {
        const percentage = parseInt(circle.getAttribute('data-percentage'));
        const circumference = 2 * Math.PI * 90; // radius is 90
        const offset = circumference - (percentage / 100) * circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 300);
    }
}

// ===========================
// Criteria Circles Animation
// ===========================
function initCriteriaCircles() {
    // Add SVG gradient definitions
    const svg = document.querySelector('.criteria-svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#00f5d4;stop-opacity:1');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#9b5de5;stop-opacity:1');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
}

// ===========================
// Count-Up Animation
// ===========================
function initCountUpAnimation() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    
    const animateCount = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        
        updateCount();
    };
    
    // Intersection observer for count-up animation
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        countObserver.observe(stat);
    });
}

// ===========================
// Contact Form Handling
// ===========================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Construct mailto link with form data
            const mailtoLink = `mailto:entrepix.ici@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #00f5d4, #9b5de5);
                color: white;
                padding: 30px 50px;
                border-radius: 15px;
                font-size: 18px;
                font-weight: 600;
                box-shadow: 0 20px 60px rgba(0, 245, 212, 0.4);
                z-index: 10000;
                animation: slideIn 0.5s ease-out;
            `;
            successMessage.textContent = '✓ Opening your email client...';
            
            document.body.appendChild(successMessage);
            
            // Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 3000);
        });
    }
}

// ===========================
// Parallax Effect on Scroll
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero section
    const heroAnimation = document.querySelector('.hero-animation');
    if (heroAnimation) {
        heroAnimation.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallax for orbits
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        const speed = 0.1 + (index * 0.05);
        orbit.style.transform = `translate(-50%, -50%) rotate(${scrolled * speed}deg)`;
    });
});

// ===========================
// Dynamic Gradient Animation
// ===========================
function animateGradients() {
    const gradients = document.querySelectorAll('.text-gradient');
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        gradients.forEach(gradient => {
            gradient.style.filter = `hue-rotate(${hue}deg)`;
        });
    }, 50);
}

// Optional: Uncomment to enable dynamic gradient animation
// animateGradients();

// ===========================
// Cursor Trail Effect (Optional Enhancement)
// ===========================
function initCursorTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 245, 212, 0.5), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
    `;
    document.body.appendChild(cursor);
    
    function updateCursor() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        cursor.style.left = trailX - 10 + 'px';
        cursor.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// Optional: Uncomment to enable cursor trail
// initCursorTrail();

// ===========================
// Easter Egg: Konami Code
// ===========================
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function triggerEasterEgg() {
    // Create fireworks effect
    const colors = ['#00f5d4', '#9b5de5', '#ff6b35', '#f72585'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                animation: explode 1s ease-out forwards;
                pointer-events: none;
                z-index: 10000;
            `;
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                document.body.removeChild(firework);
            }, 1000);
        }, i * 100);
    }
    
    // Add explosion animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Easter Egg Activated! ENTREPIX power-up!');
}

initKonamiCode();

// ===========================
// Performance Optimization
// ===========================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// Loading Performance
// ===========================

// Lazy load images (if you add images later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🚀 ENTREPIX - Where Ideas Ignite 🚀', 'font-size: 20px; font-weight: bold; color: #00f5d4; text-shadow: 0 0 10px #00f5d4;');
console.log('%cOrganized by Indian Concrete Institute - Sustainable Engineering Club', 'font-size: 14px; color: #9b5de5;');
console.log('%cInterested in how this was built? Check out the source code!', 'font-size: 12px; color: #b8c1ec;');
console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #ff6b35;');
