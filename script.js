// Portfolio Gloire ALITAKAMUNGU - JS principal

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    
    if (menuToggle && headerMenu) {
        menuToggle.addEventListener('click', function() {
            headerMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Gestion du formulaire de contact
async function handleSubmit(event) {
    event.preventDefault();
    
    // Récupération des éléments du formulaire
    const form = event.target;
    const formMessage = document.getElementById('form-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnIcon = submitButton.querySelector('.btn-icon');
    
    // Désactiver le bouton pendant l'envoi
    submitButton.disabled = true;
    btnText.textContent = 'Envoi en cours...';
    btnIcon.textContent = '⏳';
    
    try {
        // Récupération des données du formulaire
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validation des données
        if (!isValidEmail(data.email)) {
            throw new Error('Veuillez entrer une adresse email valide.');
        }
        
        // Simulation d'envoi (à remplacer par un appel API réel)
        await simulateSendEmail(data);
        
        // Message de succès
        showMessage('Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.', 'success');
        form.reset();
    } catch (error) {
        // Message d'erreur
        showMessage(error.message || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.', 'error');
        console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
        // Réactiver le bouton
        submitButton.disabled = false;
        btnText.textContent = 'Envoyer le message';
        btnIcon.textContent = '→';
    }
}

// Fonction de validation d'email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Fonction de simulation d'envoi d'email (à remplacer par un appel API réel)
function simulateSendEmail(data) {
    return new Promise((resolve, reject) => {
        // Simulation d'un délai réseau
        setTimeout(() => {
            // Pour simuler une erreur aléatoire (à supprimer en production)
            // if (Math.random() > 0.8) {
            //     reject(new Error('Erreur de connexion au serveur'));
            //     return;
            // }
            console.log('Données du formulaire:', data);
            resolve();
        }, 1500);
    });
}

// Fonction d'affichage des messages
function showMessage(message, type = 'info') {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Animation au défilement
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

// Écouteur d'événement pour l'animation au défilement
window.addEventListener('scroll', animateOnScroll);

// Déclencher une première fois au chargement de la page
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Gestion du menu mobile
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.querySelector('.header-menu').classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinks = document.querySelectorAll('.header-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const headerMenu = document.querySelector('.header-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        if (headerMenu && headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Effet de frappe (Typing Effect)
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    const subtext = document.querySelector('.typing-subtext');
    
    if (!typingText || !subtext) return;
    
    const text = "Bonjour, je suis Gloire";
    const subtexts = [
        "Développeur en devenir",
        "Passionné par le web",
        "Spécialiste en droit OHADA",
        "Acteur du changement"
    ];
    
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        // Texte principal (titre)
        if (charIndex < text.length && !typingText.textContent.includes(text)) {
            typingText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
            return;
        }
        
        // Une fois le texte principal terminé, commencer le sous-texte
        if (charIndex >= text.length && !isEnd) {
            isEnd = true;
            cursor.style.animation = 'none';
            setTimeout(() => {
                cursor.style.animation = 'blink 1s infinite';
                typeSubtext();
            }, 1000);
            return;
        }
    }
    
    function typeSubtext() {
        const currentText = subtexts[textIndex];
        const currentLength = subtext.textContent.length;
        
        if (!isDeleting && currentLength < currentText.length) {
            // Écriture
            subtext.textContent = currentText.substring(0, currentLength + 1);
            setTimeout(typeSubtext, 100);
        } else if (isDeleting && currentLength > 0) {
            // Effacement
            subtext.textContent = currentText.substring(0, currentLength - 1);
            setTimeout(typeSubtext, 50);
        } else {
            // Changement de texte
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % subtexts.length;
            }
            setTimeout(typeSubtext, isDeleting ? 1500 : 500);
        }
    }
    
    // Démarrer l'animation après un court délai
    setTimeout(type, 1000);
});