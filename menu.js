// Script simplifié pour le menu mobile

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, initialisation du menu...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const headerMenu = document.querySelector('.header-menu');
    
    if (!menuToggle || !headerMenu) {
        console.error('Erreur: Éléments du menu non trouvés');
        return;
    }
    
    // Styles initiaux du bouton
    
    // Gestion du clic sur le bouton
    menuToggle.addEventListener('click', function(e) {
        console.log('Clic sur le bouton détecté');
        e.stopPropagation();
        
        // Basculer les classes
        headerMenu.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        console.log('Menu actif:', headerMenu.classList.contains('active'));
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function() {
        if (headerMenu.classList.contains('active')) {
            headerMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Empêcher la fermeture lors du clic dans le menu
    headerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
