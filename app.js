/**
 * Abner Nteteubaka - Futuristic Portfolio Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle Canvas Background
    initCanvas();

    // 2. Navigation & Scrollspy
    initNavigation();

    // 3. Typing Subtitle Effect
    initTypingEffect();

    // 4. Project Filters and Modals
    initProjects();

    // 5. Interactive Terminal
    initTerminal();

    // 6. CV Viewer Modal
    initCVModal();

    // 7. Contact Form & Feedback
    initContactForm();

    // 8. Skill Progress Bar Animations
    initSkillObserver();
});

/* -----------------------------------------------------------
 * 1. Futuristic Canvas Grid & Starburst
 * ----------------------------------------------------------- */
function initCanvas() {
    const canvas = document.getElementById('cyber-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 55);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.8;
            this.alpha = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.3 ? '#00f2fe' : '#ffb300';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#00f2fe';
                    ctx.globalAlpha = (1 - dist / 120) * 0.15;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }

            // Mouse interaction
            const mdx = particles[i].x - mouseX;
            const mdy = particles[i].y - mouseY;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 140) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = '#ffb300';
                ctx.globalAlpha = (1 - mdist / 140) * 0.3;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        requestAnimationFrame(animate);
    }
    animate();
}

/* -----------------------------------------------------------
 * 2. Navigation & Mobile Drawer
 * ----------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('main-nav');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

    // Sticky nav backdrop change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateScrollspy();
    });

    // Mobile menu toggle
    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Close mobile drawer on link click & smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    closeDrawer();
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Active Section Scrollspy
    const sections = document.querySelectorAll('section[id]');
    function updateScrollspy() {
        const scrollPosition = window.scrollY + 160;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollPosition >= top && scrollPosition < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
}

/* -----------------------------------------------------------
 * 3. Dynamic Subtitle Typing Effect
 * ----------------------------------------------------------- */
function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = [
        "Étudiant en Sciences Informatiques (UPC)",
        "Développeur Web Full-Stack",
        "Spécialiste Cybersécurité & Pentest",
        "Prompt Engineer & Passionné d'IA",
        "Bâtisseur de Solutions Digitales & Systèmes Sécurisés"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 65;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1800; // pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // pause before next
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* -----------------------------------------------------------
 * 4. Project Filters & Modals
 * ----------------------------------------------------------- */
const projectData = {
    'fasi-space': {
        title: "FASI Space — Portail Universitaire UPC",
        category: "Web & Plateforme Académique",
        image: "/src/assets/images/fasi_space_showcase_1790678402500.jpg",
        status: "En production / Déploiement Faculté",
        description: "Plateforme web officielle conçue pour la Faculté des Sciences Informatiques de l'Université Protestante au Congo (UPC). Elle centralise les ressources académiques, la communication entre étudiants et enseignants, l'accès aux emplois du temps et les devoirs numériques.",
        features: [
            "Gestion des modules de cours et documentation technique téléchargeable",
            "Espace sécurisé de transmission et validation des travaux pratiques",
            "Tableau de bord dynamique pour le suivi académique des promotions",
            "Interface responsive haute performance et sécurité des données étudiantes"
        ],
        stack: ["React", "JavaScript ES6+", "Tailwind CSS", "PHP / MySQL", "Sécurité Auth & RBAC"],
        role: "Concepteur principal & Développeur Full-Stack"
    },
    'ant-technology': {
        title: "ANT Technology — Solutions & Conseil Digital PME",
        category: "Entreprise & Services Numériques",
        image: "/src/assets/images/ant_technology_showcase_1790678414137.jpg",
        status: "Startup Active / RDC",
        description: "Plateforme web et vitrine d'une startup technologique dédiée à l'accélération numérique des PME et organisations en Afrique centrale. Offre des services allant de la conception applicative à l'audit de sécurité des systèmes d'information.",
        features: [
            "Catalogue interactif de solutions numériques sur mesure (Web, Cloud, IA)",
            "Portail de demande d'audit de sécurité et conseil en infrastructure",
            "Canal direct de messagerie et de support client pour les décideurs",
            "Optimisation SEO, temps de chargement éclair et architecture résiliente"
        ],
        stack: ["JavaScript", "HTML5 / CSS3", "Python / Flask", "Postman API", "Architecture Cloud"],
        role: "Fondateur & Développeur Lead"
    },
    'security-lab': {
        title: "Audit & Pentesting Lab — Akili Inc.",
        category: "Cybersécurité & Pentest",
        image: "/src/assets/images/ant_technology_showcase_1790678414137.jpg",
        status: "Projet de Recherche & Tests Validés",
        description: "Laboratoire d'expérimentation et méthodologie d'audit applicatif réalisée dans le cadre autorisé du projet Akili Inc. Détection de vulnérabilités Web (OWASP Top 10), analyse des flux HTTP, tests de robustesse des mots de passe et sécurisation des endpoints.",
        features: [
            "Tests d'intrusion applicative ciblés avec Burp Suite et scripts Python sur mesure",
            "Vérification des algorithmes de hachage et protocoles de chiffrement",
            "Sécurisation contre les injections SQL, failles XSS et contrôle d'accès défaillant",
            "Rédaction de rapports de remédiation technique pour les développeurs"
        ],
        stack: ["Burp Suite", "Python", "Postman", "Hashing & Chiffrement", "OWASP"],
        role: "Pentester & Auditeur Sécurité"
    },
    'ai-prompt-lab': {
        title: "AI & Prompt Engineering Hub",
        category: "Intelligence Artificielle Appliquée",
        image: "/src/assets/images/fasi_space_showcase_1790678402500.jpg",
        status: "Projets & Expérimentations 2026",
        description: "Ensemble d'outils, chaînes d'invite (prompt chains) et mini-applications exploitant les modèles de langage de pointe pour automatiser l'analyse de code, la détection précoce d'anomalies de sécurité et l'optimisation des flux de travail de développement.",
        features: [
            "Conception de métaprompts structurés pour l'analyse de vulnérabilités",
            "Génération assistée de scripts C et Python avec contraintes de sécurité",
            "Intégration d'APIs LLM dans des flux métiers pour PME",
            "Veille active sur les attaques d'injection de prompt et leur mitigation"
        ],
        stack: ["Prompt Engineering", "Python", "REST APIs", "GenAI Tools", "JSON Schema"],
        role: "Prompt Engineer & Chercheur Indépendant"
    }
};

function initProjects() {
    // Filter tabs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project modal setup
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');

    function openProjectModal(key) {
        const data = projectData[key];
        if (!data || !modal) return;

        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-category').textContent = data.category;
        document.getElementById('modal-status').textContent = data.status;
        document.getElementById('modal-image').src = data.image;
        document.getElementById('modal-image').alt = data.title;
        document.getElementById('modal-description').textContent = data.description;
        document.getElementById('modal-role').textContent = data.role;

        // Features list
        const featList = document.getElementById('modal-features');
        featList.innerHTML = '';
        data.features.forEach(f => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="bullet-accent">▹</span> ${f}`;
            featList.appendChild(li);
        });

        // Tech stack
        const stackContainer = document.getElementById('modal-stack');
        stackContainer.innerHTML = '';
        data.stack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            stackContainer.appendChild(tag);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.open-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.getAttribute('data-project');
            openProjectModal(key);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* -----------------------------------------------------------
 * 5. Interactive Cyber Terminal (ANT-CLI)
 * ----------------------------------------------------------- */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const form = document.getElementById('terminal-form');
    if (!input || !output || !form) return;

    const commands = {
        help: `Commandes disponibles dans le terminal ANT-CLI :
  - <span class="cmd-cyan">help</span>        : Affiche la liste des commandes
  - <span class="cmd-cyan">about</span>       : Profil & vision professionnelle
  - <span class="cmd-cyan">skills</span>      : Liste synthétique des compétences
  - <span class="cmd-cyan">cyber</span>       : Modules & compétences Cybersécurité
  - <span class="cmd-cyan">projects</span>    : Projets phares (FASI Space, ANT Tech...)
  - <span class="cmd-cyan">experience</span>  : Parcours professionnel & associatif
  - <span class="cmd-cyan">education</span>   : Formation universitaire (UPC)
  - <span class="cmd-cyan">contact</span>     : Coordonnées (Email, Tél, WhatsApp)
  - <span class="cmd-cyan">clear</span>       : Efface l'écran du terminal
  - <span class="cmd-cyan">sudo hire</span>   : Initie la prise de contact prioritaire`,
        
        about: `Abner Nteteubaka — Kinshasa, RDC
Étudiant en Sciences Informatiques (UPC) — Niveau L2.
Passionné par le développement web moderne, la cybersécurité offensive/défensive 
et le prompt engineering appliqué. Construit des solutions concrètes de bout en bout.`,

        skills: `Développement : HTML5, CSS3, JavaScript ES6+, Python, PHP, C, React, Tailwind CSS, Bootstrap
Backend & Bases : MySQL, Flask, REST API, Git / GitHub, Postman
Cybersécurité : Pentesting applicatif, Hachage, Chiffrement, Audit de sécurité, Burp Suite
IA : Prompt Engineering, LLM integration, Automatisation`,

        cyber: `Cybersécurité & Pentest :
  ✓ Pentester certifié sur le projet Akili Inc.
  ✓ Sécurisation de comptes & gestion des identités (IAM)
  ✓ Sécurité des données & chiffrement symétrique/asymétrique
  ✓ Audit de code & protection contre OWASP Top 10 (SQLi, XSS, CSRF)
  ✓ Pratique régulière sur Burp Suite, analyses de paquets & CTFs`,

        projects: `1. FASI Space : Plateforme web de la Faculté des Sciences Informatiques (UPC).
2. ANT Technology : Startup & services numériques aux PME africaines.
3. Pentest Lab (Akili Inc.) : Audit applicatif et tests d'intrusion.
4. AI Prompt Engineering Lab : Outils d'automatisation et prompts avancés.`,

        experience: `Expériences :
  • Pentester — Projet Akili Inc. (Tests de sécurité applicative autorisés)
  • Community Skiller — Microsoft (Partage technique et animation de sessions)
  • Chargé de coordination & dev — Cercle des Informaticiens du Congo`,

        education: `Formation :
  • Licence en Sciences Informatiques (L2 - En cours) — Université Protestante au Congo (UPC)
  • Baccalauréat Scientifique (2024) — Collège Frère Zuza, Kinshasa`,

        contact: `Contact direct :
  • Email     : anteteubaka@gmail.com
  • Téléphone : +243 97 96 47 633
  • WhatsApp  : ANT TECHNOLOGY (https://whatsapp.com/channel/0029Vb6L4mlliRomtPZ3eU39)
  • GitHub    : https://github.com/Abner703
  • LinkedIn  : Abner Nteteubaka`,

        'sudo hire': `<span class="cmd-gold">[ACCÈS VIP ACCORDÉ]</span> Merci de votre intérêt !
Envoyez directement votre proposition à <a href="mailto:anteteubaka@gmail.com" class="cmd-cyan">anteteubaka@gmail.com</a>
ou par WhatsApp au <a href="https://wa.me/243979647633" target="_blank" class="cmd-cyan">+243 97 96 47 633</a>.
Je réponds généralement en moins de 24 heures.`
    };

    function appendOutput(html) {
        const div = document.createElement('div');
        div.className = 'term-line';
        div.innerHTML = html;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const raw = input.value.trim();
        const cmd = raw.toLowerCase();
        input.value = '';

        if (!cmd) return;

        appendOutput(`<span class="term-prompt">visitor@ant7-core:~$</span> <span class="term-cmd">${raw}</span>`);

        if (cmd === 'clear') {
            output.innerHTML = '';
            return;
        }

        if (commands[cmd]) {
            appendOutput(commands[cmd]);
        } else {
            appendOutput(`Commande non reconnue : "${cmd}". Tapez <span class="cmd-cyan">help</span> pour voir les commandes valides.`);
        }
    });

    // Quick command buttons
    document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            input.value = cmd;
            form.dispatchEvent(new Event('submit'));
        });
    });
}

/* -----------------------------------------------------------
 * 6. CV Viewer Modal & Print Function
 * ----------------------------------------------------------- */
function initCVModal() {
    const cvModal = document.getElementById('cv-modal');
    const openCVBtns = document.querySelectorAll('.open-cv-btn');
    const closeCVBtn = document.getElementById('close-cv-btn');
    const cvBackdrop = document.getElementById('cv-backdrop');
    const printCVBtn = document.getElementById('print-cv-btn');

    function openCV() {
        if (!cvModal) return;
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCV() {
        if (!cvModal) return;
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openCVBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCV();
    }));

    if (closeCVBtn) closeCVBtn.addEventListener('click', closeCV);
    if (cvBackdrop) cvBackdrop.addEventListener('click', closeCV);

    if (printCVBtn) {
        printCVBtn.addEventListener('click', () => {
            window.print();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
            closeCV();
        }
    });
}

/* -----------------------------------------------------------
 * 7. Contact Form Handler with In-Page Feedback
 * ----------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const feedback = document.getElementById('form-feedback');
    const copyEmailBtn = document.getElementById('copy-email-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nom = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!nom || !email || !message) return;

            // Generate mailto link fallback so visitor can directly send real message
            const subject = encodeURIComponent(`Prise de contact portfolio - ${nom}`);
            const body = encodeURIComponent(`Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            if (feedback) {
                feedback.style.display = 'block';
                feedback.innerHTML = `
                    <div class="feedback-success">
                        <span class="icon">✓</span>
                        <div>
                            <strong>Message préparé avec succès !</strong><br>
                            Merci ${nom}, votre message a été enregistré. 
                            <a href="mailto:anteteubaka@gmail.com?subject=${subject}&body=${body}" class="feedback-link">
                                Cliquez ici pour ouvrir votre messagerie par défaut
                            </a> ou écrivez-moi sur WhatsApp.
                        </div>
                    </div>
                `;
            }

            form.reset();
        });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('anteteubaka@gmail.com').then(() => {
                const originalText = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<span>✓</span> Copié !';
                copyEmailBtn.classList.add('copied');
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalText;
                    copyEmailBtn.classList.remove('copied');
                }, 2200);
            });
        });
    }
}

/* -----------------------------------------------------------
 * 8. Skill Progress Bar Observer
 * ----------------------------------------------------------- */
function initSkillObserver() {
    const bars = document.querySelectorAll('.skill-progress-bar');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    bars.forEach(bar => observer.observe(bar));
}
