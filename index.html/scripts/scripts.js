// Smooth scrolling para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const headerOffset = 90;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Header background dinâmico no scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 40px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Animação dos cards de serviço
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de serviço
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        cardObserver.observe(card);
    });
});

// Animação dos números das estatísticas
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observer para estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar seção sobre
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Funcionalidade do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta dados do formulário
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Simulação de envio (aqui você conectaria com seu backend)
    console.log('Dados do formulário:', data);
    
    // Mostra modal de sucesso
    showModal();
    
    // Limpa o formulário
    this.reset();
});

// Função para selecionar serviço
function selectService(serviceType) {
    const serviceSelect = document.getElementById('service');
    const serviceOptions = {
        'screen': 'Troca de Tela/Display',
        'battery': 'Substituição de Bateria',
        'water': 'Danos por Líquidos',
        'software': 'Problemas de Software',
        'charging': 'Conector de Carga',
        'camera': 'Reparo de Câmera'
    };
    
    // Define o valor do select
    serviceSelect.value = serviceType;
    
    // Rola para o formulário
    scrollToSection('contact');
    
    // Destaca o campo de serviço
    setTimeout(() => {
        serviceSelect.style.borderColor = '#2563eb';
        serviceSelect.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        
        setTimeout(() => {
            serviceSelect.style.borderColor = '#e2e8f0';
            serviceSelect.style.boxShadow = 'none';
        }, 2000);
    }, 500);
}

// Modal functions
function showModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modal clicando fora dele
window.addEventListener('click', function(e) {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Animação de hover para cards de depoimentos
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector('.hero-particles');
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth scroll para links de navegação
document.querySelector