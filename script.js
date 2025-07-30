// Portfolio Gloire ALITAKAMUNGU - JS principal

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

async function handleSubmit(event) {
    event.preventDefault();
    
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
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        if (!isValidEmail(data.email)) {
            throw new Error('Veuillez entrer une adresse email valide.');
        }
        
        await simulateSendEmail(data);
        showMessage('Votre message a été envoyé avec succès !', 'success');
        form.reset();
    } catch (error) {
        showMessage(error.message || 'Erreur lors de l\'envoi du message.', 'error');
        console.error('Erreur:', error);
    } finally {
        submitButton.disabled = false;
        btnText.textContent = 'Envoyer le message';
        btnIcon.textContent = '→';
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function simulateSendEmail(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Données du formulaire:', data);
            resolve();
        }, 1500);
    });
}

function showMessage(message, type = 'info') {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = 'form-message';
    formMessage.classList.add(type);
    
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}
