// OUTER STELLAR - JavaScript functionality

class OuterStellar {
    constructor() {
        this.currentSection = 'home';
        this.planetData = {
            mercury: {
                title: "Mercury",
                description: "Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations, from 800°F (430°C) during the day to -290°F (-180°C) at night. A day on Mercury lasts 59 Earth days."
            },
            venus: {
                title: "Venus",
                description: "Venus is the hottest planet in our solar system with surface temperatures around 900°F (475°C). It's often called Earth's twin due to similar size, but its thick atmosphere creates a runaway greenhouse effect."
            },
            earth: {
                title: "Earth",
                description: "Earth is the only known planet with life in the universe. It has liquid water, a protective atmosphere, and the perfect distance from the Sun. Earth is about 4.5 billion years old."
            },
            mars: {
                title: "Mars",
                description: "Mars is known as the Red Planet due to iron oxide on its surface. It has the largest volcano in the solar system (Olympus Mons) and evidence suggests it once had liquid water on its surface."
            },
            jupiter: {
                title: "Jupiter",
                description: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined. It has over 80 moons, including the four largest discovered by Galileo in 1610."
            },
            saturn: {
                title: "Saturn",
                description: "Saturn is famous for its prominent ring system made of ice and rock particles. It's a gas giant with a density so low it would float in water if there were an ocean large enough."
            },
            uranus: {
                title: "Uranus",
                description: "Uranus is an ice giant that rotates on its side, likely due to a collision with an Earth-sized object long ago. It has a faint ring system and 27 known moons."
            },
            neptune: {
                title: "Neptune",
                description: "Neptune is the windiest planet in the solar system, with speeds reaching 1,200 mph (2,000 km/h). It's so far from the Sun that it takes 165 Earth years to complete one orbit."
            }
        };

        this.starTypes = [
            { type: 'red-giant', name: 'Red Giant', description: 'Large, cool stars in their final stages of evolution.' },
            { type: 'main-sequence', name: 'Main Sequence Star', description: 'Stars like our Sun, fusing hydrogen into helium.' },
            { type: 'white-dwarf', name: 'White Dwarf', description: 'Dense remnants of low to medium mass stars.' },
            { type: 'blue-giant', name: 'Blue Giant', description: 'Massive, hot stars that burn bright and die young.' }
        ];

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupPlanetInteractions();
        this.setupStarField();
        this.setupModal();
        this.startAnimations();
    }

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Re-initialize star field if stars section is shown
        if (sectionName === 'stars') {
            setTimeout(() => this.setupStarField(), 100);
        }
    }

    setupPlanetInteractions() {
        const planetCards = document.querySelectorAll('.planet-card');
        planetCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const planet = e.currentTarget.dataset.planet;
                if (this.planetData[planet]) {
                    this.showModal(this.planetData[planet].title, this.planetData[planet].description);
                }
            });
        });
    }

    setupStarField() {
        const starField = document.getElementById('starField');
        if (!starField) return;

        // Clear existing stars
        starField.innerHTML = '';

        // Generate random stars
        const numStars = 50;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            
            // Random star type
            const starType = this.starTypes[Math.floor(Math.random() * this.starTypes.length)];
            star.style.backgroundColor = this.getStarColor(starType.type);
            
            // Add click event
            star.addEventListener('click', () => {
                this.showModal(starType.name, starType.description);
            });

            // Add twinkling animation
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animation = 'twinkle 3s infinite';

            starField.appendChild(star);
        }

        // Add CSS for twinkling animation if not exists
        if (!document.querySelector('#twinkle-animation')) {
            const style = document.createElement('style');
            style.id = 'twinkle-animation';
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    getStarColor(type) {
        const colors = {
            'red-giant': '#ff4444',
            'main-sequence': '#ffff44',
            'white-dwarf': '#ffffff',
            'blue-giant': '#4444ff'
        };
        return colors[type] || '#ffffff';
    }

    setupModal() {
        const modal = document.getElementById('modal');
        const closeBtn = document.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    showModal(title, description) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'block';
    }

    startAnimations() {
        // Add floating animation to planets
        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            planet.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        });

        // Add CSS for floating animation if not exists
        if (!document.querySelector('#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }

        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            document.body.style.backgroundPosition = `0 ${rate}px`;
        });
    }

    // Utility method to create shooting stars
    createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.style.position = 'fixed';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.backgroundColor = '#ffffff';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.boxShadow = '0 0 10px #ffffff';
        shootingStar.style.left = Math.random() * window.innerWidth + 'px';
        shootingStar.style.top = '0px';
        shootingStar.style.pointerEvents = 'none';
        shootingStar.style.zIndex = '1000';

        document.body.appendChild(shootingStar);

        // Animate the shooting star
        let position = 0;
        const animate = () => {
            position += 5;
            shootingStar.style.top = position + 'px';
            shootingStar.style.left = (parseInt(shootingStar.style.left) + 2) + 'px';

            if (position < window.innerHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(shootingStar);
            }
        };

        animate();
    }

    // Start random shooting stars
    startShootingStars() {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.createShootingStar();
            }
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new OuterStellar();
    
    // Start shooting stars after a delay
    setTimeout(() => {
        app.startShootingStars();
    }, 3000);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const sections = ['home', 'planets', 'stars', 'galaxies'];
        const currentIndex = sections.indexOf(app.currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            app.showSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            app.showSection(sections[currentIndex - 1]);
        }
    });

    // Add smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
});