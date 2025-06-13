document.addEventListener('DOMContentLoaded', function() {
    const initSkillsCarousel = () => {
        const skills = [
            // Your skills array
        ];

        const container = document.querySelector('.carousel-container');
        if (!container) return;

        // Adjust radius based on screen size
        const radius = window.innerWidth <= 768 ? 120 : 180;
        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        
        // Create skill items
        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - (window.innerWidth <= 576 ? 25 : 40);
            const y = centerY + radius * Math.sin(angle) - (window.innerWidth <= 576 ? 25 : 40);
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.style.left = `${x}px`;
            skillItem.style.top = `${y}px`;
            
            skillItem.innerHTML = `
                <img src="${skill.logo}" alt="${skill.name}">
                ${window.innerWidth > 576 ? `<span class="skill-name">${skill.name}</span>` : ''}
                <span class="tooltip">${skill.description}</span>
            `;
            
            container.appendChild(skillItem);
        });
        
        // Animation function with responsive adjustments
        function animate() {
            const skillItems = document.querySelectorAll('.skill-item');
            if (skillItems.length === 0) return;
            
            let time = Date.now() * 0.001;
            const currentRadius = window.innerWidth <= 768 ? 120 : 180;
            
            skillItems.forEach((item, index) => {
                const angle = (index / skills.length) * 2 * Math.PI + time * 0.5;
                const x = centerX + currentRadius * Math.cos(angle) - (window.innerWidth <= 576 ? 25 : 40);
                const y = centerY + currentRadius * Math.sin(angle) - (window.innerWidth <= 576 ? 25 : 40);
                
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const skillItems = document.querySelectorAll('.skill-item');
                skillItems.forEach(item => item.remove());
                initSkillsCarousel();
            }, 200);
        });
    };

    initSkillsCarousel();
});
