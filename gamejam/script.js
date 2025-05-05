const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
    
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });