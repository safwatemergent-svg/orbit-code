// Global Variables
let currentPage = 'home';
let showFullSite = false;
let isTyping = false;

// Predefined AI responses
const aiResponses = {
    "How does gravity work in space?": "Gravity in space works the same way it does on Earth, following Newton's law of universal gravitation. Every object with mass attracts every other object with mass. The strength of this attraction depends on the masses of the objects and the distance between them. In space, objects appear weightless because they are in continuous free fall around larger bodies like planets or stars.",
    "What are black holes?": "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon. They form when massive stars collapse at the end of their lives, creating a singularity where the laws of physics as we know them break down. Black holes can be stellar-mass, intermediate, or supermassive.",
    "Explain solar system formation": "Our solar system formed about 4.6 billion years ago from a giant rotating cloud of gas and dust called a solar nebula. Gravity caused this cloud to collapse, and as it did, it spun faster and flattened into a disk. The center became hot and dense enough to ignite nuclear fusion, forming our Sun. The remaining material clumped together to form planets, moons, asteroids, and comets.",
    "What is dark matter?": "Dark matter is a mysterious form of matter that makes up about 27% of the universe. It doesn't emit, absorb, or reflect light, making it invisible to direct observation. We know it exists because of its gravitational effects on visible matter, radiation, and the large-scale structure of the universe.",
    "How do stars form?": "Stars form in giant molecular clouds of gas and dust called nebulae. When these clouds become dense enough, gravity causes them to collapse. As the material contracts, it heats up and eventually becomes hot enough to ignite nuclear fusion, creating a new star. This process can take millions of years.",
    "What are exoplanets?": "Exoplanets are planets that orbit stars outside our solar system. Since the first confirmed discovery in 1995, thousands have been found using various detection methods. Some exoplanets may have conditions suitable for life, making them prime targets in the search for extraterrestrial life."
};

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const app = document.getElementById('app');
const header = document.getElementById('header');
const desktopNav = document.getElementById('desktop-nav');
const navSubtitle = document.getElementById('nav-subtitle');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const footer = document.getElementById('footer');

// Hero elements
const heroInitial = document.getElementById('hero-initial');
const heroFull = document.getElementById('hero-full');
const exploreBtn = document.getElementById('explore-btn');
const heroSubtitle = document.getElementById('hero-subtitle');

// Chat elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Initialize the application
function init() {
    // Hide loading screen after 3.5 seconds
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        app.classList.remove('hidden');
        startTypingAnimation();
    }, 3500);

    // Set up event listeners
    setupEventListeners();
}

// Start typing animation for hero subtitle
function startTypingAnimation() {
    const text = "Explore the Universe with Advanced Technology";
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (i < text.length) {
                heroSubtitle.textContent = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 120);
            }
        };
        typeWriter();
    }, 1500);

    // Cursor blinking
    setInterval(() => {
        const cursor = heroSubtitle.querySelector('.cursor');
        if (cursor) {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        } else if (heroSubtitle.textContent.length > 0) {
            heroSubtitle.innerHTML += '<span class="cursor" style="color: #06b6d4;">|</span>';
        }
    }, 600);
}

// Start typing animation for hero-full subtitle
function startFullHeroTyping() {
    const fullHeroSubtitle = document.querySelector('.hero-full-subtitle');
    if (!fullHeroSubtitle) return;
    
    const text = "Advanced Space Technology Platform";
    let i = 0;
    fullHeroSubtitle.textContent = '';
    
    const typeWriter = () => {
        if (i < text.length) {
            fullHeroSubtitle.textContent = text.slice(0, i + 1);
            i++;
            setTimeout(typeWriter, 120);
        }
    };
    typeWriter();
}

// Set up all event listeners
function setupEventListeners() {
    // Explore button
    exploreBtn.addEventListener('click', handleExploreClick);

    // Mobile menu toggle
    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link, .hero-button').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Predefined questions
    document.querySelectorAll('.question-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.getAttribute('data-question');
            sendMessage(question);
        });
    });

    // Chat functionality (only if elements exist)
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
                chatInput.value = '';
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    sendMessage(message);
                    chatInput.value = '';
                }
            }
        });
    }

    // Fullscreen toggle for solar system (only if elements exist)
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Planet cards (only if they exist)
    const planetCards = document.querySelectorAll('.planet-card');
    if (planetCards.length > 0) {
        planetCards.forEach(card => {
            card.addEventListener('click', () => {
                const planet = card.getAttribute('data-planet');
                showPlanetModal(planet);
            });
        });
    }
}

// Handle explore button click (only if elements exist)
function handleExploreClick() {
    if (!heroInitial || !heroFull) return;

    showFullSite = true;

    // Hide initial hero and show full hero
    heroInitial.classList.add('hidden');
    heroFull.classList.remove('hidden');

    // Show full navigation (only if elements exist)
    if (desktopNav) desktopNav.classList.remove('hidden');
    if (navSubtitle) navSubtitle.classList.add('hidden');

    // Show footer (only if element exists)
    if (footer) footer.classList.remove('hidden');

    // Start typing animation
    setTimeout(startFullHeroTyping, 500);
}

// Toggle mobile menu
function toggleMobileMenu() {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
        mobileNav.classList.add('hidden');
        mobileToggle.querySelector('.menu-icon').classList.remove('hidden');
        mobileToggle.querySelector('.close-icon').classList.add('hidden');
    } else {
        mobileNav.classList.remove('hidden');
        mobileToggle.querySelector('.menu-icon').classList.add('hidden');
        mobileToggle.querySelector('.close-icon').classList.remove('hidden');
    }
}

// Handle navigation
function handleNavigation(e) {
    const link = e.target.closest('a');
    const href = link.getAttribute('href');

    // If it's an external link (doesn't start with #), let the browser handle it normally
    if (href && !href.startsWith('#')) {
        return; // Allow default behavior for external links
    }

    e.preventDefault();

    const page = link.getAttribute('data-page');
    if (!page) return;

    // If not showing full site yet, trigger explore first
    if (!showFullSite && page !== 'home') {
        handleExploreClick();
        setTimeout(() => navigateToPage(page), 500);
        return;
    }

    navigateToPage(page);

    // Close mobile menu if open
    if (!mobileNav.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

// Navigate to specific page
function navigateToPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else if (page === 'home') {
        document.getElementById('hero-page').classList.add('active');
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    currentPage = page;
    
    // Add page transition animation
    if (targetPage) {
        targetPage.style.animation = 'fadeInUp 0.6s ease-out';
    }
}

// Send chat message
function sendMessage(message) {
    // Add user message
    addMessage(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response, 'ai');
    }, 1500);
}

// Add message to chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    if (type === 'ai') {
        avatarDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = content;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message ai-message';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Get AI response
function getAIResponse(question) {
    return aiResponses[question] || "That's a fascinating question about space! While I don't have a specific answer programmed for that exact query, I can tell you that space is full of incredible phenomena. Each celestial body and cosmic event follows the fundamental laws of physics, creating the beautiful and complex universe we observe today.";
}

// Toggle fullscreen for solar system viewer
function toggleFullscreen() {
    const viewer = document.querySelector('.solar-system-viewer');
    const btn = document.querySelector('.fullscreen-btn');
    
    if (viewer.classList.contains('fullscreen')) {
        viewer.classList.remove('fullscreen');
        viewer.style.position = 'relative';
        viewer.style.top = 'auto';
        viewer.style.left = 'auto';
        viewer.style.width = 'auto';
        viewer.style.height = 'auto';
        viewer.style.zIndex = 'auto';
        
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
        `;
    } else {
        viewer.classList.add('fullscreen');
        viewer.style.position = 'fixed';
        viewer.style.top = '1rem';
        viewer.style.left = '1rem';
        viewer.style.width = 'calc(100vw - 2rem)';
        viewer.style.height = 'calc(100vh - 2rem)';
        viewer.style.zIndex = '50';
        
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
        `;
    }
}

// Show planet modal (placeholder function)
function showPlanetModal(planet) {
    // This would show a modal with planet details
    // For now, just log the planet name
    console.log(`Showing details for ${planet}`);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add some visual effects
function addVisualEffects() {
    // Add floating particles effect
    const particles = document.querySelectorAll('.floating-orb');
    particles.forEach((particle, index) => {
        const delay = index * 0.5;
        particle.style.animationDelay = `${delay}s`;
    });

    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .planet-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.starry-background');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Call visual effects after page load
window.addEventListener('load', addVisualEffects);

    // Initialize Globe after DOM content is loaded (only if hero-page exists)
    const heroPage = document.getElementById('hero-page');
    if (heroPage && typeof Globe !== 'undefined') {
        try {
            // Initialize Globe
            const globeContainer = document.createElement('div');
            globeContainer.id = 'globeViz';
            globeContainer.style.position = 'fixed';
            globeContainer.style.top = '0';
            globeContainer.style.left = '0';
            globeContainer.style.width = '100%';
            globeContainer.style.height = '100vh';
            globeContainer.style.zIndex = '1';
            globeContainer.style.pointerEvents = 'none';
            heroPage.appendChild(globeContainer);

            const globe = Globe()
                .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
                .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
                .backgroundColor('rgba(0,0,0,0)')
                .width(window.innerWidth)
                .height(window.innerHeight)
                .showGraticules(false)
                .showAtmosphere(true)
                .atmosphereColor('#1ca4d8')
                .atmosphereAltitude(0.1);

            // Mount globe to container
            globe(globeContainer);

            // Set initial position (using correct API)
            globe.pointOfView({ lat: 30, lng: 140, altitude: 2.5 });

            // Rotate animation (using correct API)
            let frame = 0;
            const animate = () => {
                frame = requestAnimationFrame(animate);
                try {
                    // Check if globe controls exist and use correct rotation method
                    if (globe.controls && globe.controls().autoRotate) {
                        // Globe handles rotation automatically
                    }
                } catch (error) {
                    console.warn('Globe rotation error:', error);
                }
            }
            animate();
        } catch (error) {
            console.warn('Globe initialization failed:', error);
        }
    }

function initEarth() {
    const container = document.getElementById('earth-bg');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000000);
    camera.position.z = 400000;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const earthGeometry = new THREE.SphereGeometry(280000, 32, 32);
    const loader = new THREE.TextureLoader();
    
    const earth = new THREE.Mesh(
        earthGeometry,
        new THREE.MeshPhongMaterial({
            map: loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/earthmap1k.jpg'),
            bumpMap: loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/earthbump1k.jpg'),
            bumpScale: 0.8,
            specularMap: loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123879/earthspec1k.jpg'),
            specular: new THREE.Color('grey')
        })
    );
    // Position in left corner
    earth.position.set(-450000, -150000, -160000);
    scene.add(earth);

    const light = new THREE.PointLight(0xffffff, 8);
    light.position.set(200, 0, 399000);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xdddddd);
    scene.add(ambient);

    function animate() {
        requestAnimationFrame(animate);
        // Very slow rotation
        earth.rotation.y += 0.000003;
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);
    animate();
}
function initMarsBackground() {
    const canvas = document.getElementById("mars-canvas");
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const textureLoader = new THREE.TextureLoader();
    const marsTexture = textureLoader.load("https://raw.githubusercontent.com/rajatdiptabiswas/planet-textures/main/mars_1k_color.jpg");

    const marsGeometry = new THREE.SphereGeometry(3, 64, 64);
    const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    scene.add(mars);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);
        mars.rotation.y += 0.002; // <-- adjust this value to make Mars rotate slower/faster
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Add to your init function
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    initEarth();
});

