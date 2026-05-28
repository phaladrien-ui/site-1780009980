Voici le fichier `static/script.js` pour votre landing page e-commerce de montres de luxe, avec animations et interactions au scroll, en JavaScript vanilla :

// static/script.js
// Landing page e-commerce montre de luxe - Animations et interactions

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================
    // 1. SMOOTH SCROLL NAVIGATION
    // ============================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Hauteur du header fixe
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 2. INTERSECTION OBSERVER - ANIMATIONS AU SCROLL
    // ============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionnel : arrêter d'observer une fois l'animation déclenchée
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ============================================
    // 3. PARALLAX EFFECT ON HERO SECTION
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const heroOffset = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            
            // Effet parallax uniquement dans la section hero
            if (scrollPosition >= heroOffset && scrollPosition <= heroOffset + heroHeight) {
                const parallaxSpeed = 0.5;
                const yPos = (scrollPosition - heroOffset) * parallaxSpeed;
                heroImage.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // ============================================
    // 4. COUNTER ANIMATION FOR STATS
    // ============================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 secondes
                const step = Math.ceil(targetValue / (duration / 16)); // ~60fps
                
                let currentValue = 0;
                const updateCounter = () => {
                    currentValue += step;
                    if (currentValue >= targetValue) {
                        target.textContent = targetValue.toLocaleString();
                        counterObserver.unobserve(target);
                    } else {
                        target.textContent = currentValue.toLocaleString();
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // 5. PRODUCT CARD HOVER EFFECT
    // ============================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
        
        // Effet 3D tilt sur les cartes
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ============================================
    // 6. NAVBAR BACKGROUND CHANGE ON SCROLL
    // ============================================
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // 7. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
        
        // Fermer le menu au clic sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ============================================
    // 8. IMAGE ZOOM ON HOVER (GALLERY)
    // ============================================
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // 9. TESTIMONIAL CAROUSEL (AUTOMATIC)
    // ============================================
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonialContainer && testimonials.length > 0) {
        let currentIndex = 0;
        const intervalTime = 5000; // 5 secondes
        
        const showNextTestimonial = () => {
            testimonials.forEach((testimonial, index) => {
                testimonial.classList.remove('active');
                if (index === currentIndex) {
                    testimonial.classList.add('active');
                }
            });
            
            currentIndex = (currentIndex + 1) % testimonials.length;
        };
        
        // Initialiser le premier témoignage
        testimonials[0].classList.add('active');
        
        // Démarrer le carousel automatique
        let carouselInterval = setInterval(showNextTestimonial, intervalTime);
        
        // Pause au survol
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(showNextTestimonial, intervalTime);
        });
    }

    // ============================================
    // 10. SCROLL TO TOP BUTTON
    // ============================================
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 11. LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // 12. WATCH 3D ROTATION (INTERACTIVE)
    // ============================================
    const watch3D = document.querySelector('.watch-3d');
    
    if (watch3D) {
        let isDragging = false;
        let previousX = 0;
        let rotation = 0;
        
        watch3D.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousX = e.clientX;
            watch3D.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - previousX;
                rotation += deltaX * 0.5;
                watch3D.style.transform = `rotateY(${rotation}deg)`;
                previousX = e.clientX;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            watch3D.style.cursor = 'grab';
        });
        
        // Touch support for mobile
        watch3D.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousX = e.touches[0].clientX;
        });
        
        watch3D.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const deltaX = e.touches[0].clientX - previousX;
                rotation += deltaX * 0.5;
                watch3D.style.transform = `rotateY(${rotation}deg)`;
                previousX = e.touches[0].clientX;
            }
        });
        
        watch3D.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // ============================================
    // 13. PRICE FILTER (RANGE SLIDER)
    // ============================================
    const priceRange = document.querySelector('.price-range');
    const priceDisplay = document.querySelector('.price-display');
    
    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', () => {
            const value = priceRange.value;
            priceDisplay.textContent = `€${parseInt(value).toLocaleString()}`;
            
            // Filtrer les produits (exemple)
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                const productPrice = parseInt(product.dataset.price);
                if (productPrice <= parseInt(value)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }

    // ============================================
    // 14. NEWSLETTER FORM SUBMISSION
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Animation de succès
                const submitBtn = newsletterForm.querySelector('button');
                submitBtn.textContent = '✓ Inscrit !';
                submitBtn.classList.add('success');
                
                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = 'S\'inscrire';
                    submitBtn.classList.remove('success');
                    emailInput.value = '';
                }, 3000);
                
                // Ici, vous enverriez l'email à votre backend
                console.log(`Newsletter subscription: ${email}`);
            }
        });
    }

    // ============================================
    // 15. ADD TO CART ANIMATION
    // ============================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Animation du bouton
            button.textContent = '✓ Ajouté';
            button.classList.add('added');
            
            // Animation du panier
            if (cartIcon) {
                cartIcon.classList.add('bounce');
                setTimeout(() => {
                    cartIcon.classList.remove('bounce');
                }, 500);
            }
            
            // Réinitialiser le bouton
            setTimeout(() => {
                button.textContent = 'Ajouter au panier';
                button.classList.remove('added');
            }, 2000);
            
            // Mettre à jour le compteur du panier
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + 1;
                cartCount.classList.add('pop');
                setTimeout(() => {
                    cartCount.classList.remove('pop');
                }, 300);
            }
        });
    });

    // ============================================
    // 16. VIDEO BACKGROUND CONTROL
    // ============================================
    const videoBg = document.querySelector('.video-background');
    const videoControl = document.querySelector('.video-control');
    
    if (videoBg && videoControl) {
        videoControl.addEventListener('click', () => {
            if (videoBg.paused) {
                videoBg.play();
                videoControl.textContent = '⏸';
            } else {
                videoBg.pause();
                videoControl.textContent = '▶';
            }
        });
    }

    // ============================================
    // 17. PROGRESS BAR FOR READING
    // ============================================
    const progressBar = document.querySelector('.reading-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // ============================================
    // 18. TOOLTIP INITIALIZATION
    // ============================================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.dataset.tooltip;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                element._tooltip.remove();
                delete element._tooltip;
            }
        });
    });

    // ============================================
    // 19. KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Touche Escape pour fermer les menus
        if (e.key === 'Escape') {
            const openMenu = document.querySelector('.mobile-menu.open');
            if (openMenu) {
                openMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        }
        
        // Flèche haut/bas pour le carousel
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const testimonialContainer = document.querySelector('.testimonials-container');
            if (testimonialContainer) {
                // Logique de navigation du carousel
            }
        }
    });

    // ============================================
    // 20. PERFORMANCE OPTIMIZATION
    // ============================================
    // Debounce pour les événements de scroll
    function debounce(func, wait = 20) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Appliquer le debounce aux événements de scroll lourds
    const optimizedScroll = debounce(() => {
        // Logique de scroll optimisée
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // ============================================
    // INITIALIZATION LOG
    // ============================================
    console.log('🚀 Landing page e-commerce montre de luxe initialisée');
    console.log(`📦 ${animateElements.length} éléments animés au scroll`);
    console.log(`🖼️ ${lazyImages.length} images en lazy loading`);
    console.log(`💳 ${addToCartButtons.length} boutons d'ajout au panier`);

});

Ce fichier JavaScript vanilla complet pour votre