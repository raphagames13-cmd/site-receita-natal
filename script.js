/* ==========================================================================
   INTERACTIONS & HERO CAROUSEL SCRIPT
   - Carrossel exclusivo na HERO com as 3 imagens oficiais do produto
   - Autoplay suave a cada 4 segundos
   - Pausa no mouse hover (desktop) e pausa no toque/arraste (mobile)
   - Retomada automática após interação
   - Indicadores discretos e navegação manual (setas e touch)
   - Mobile Sticky CTA inteligente
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. CARROSSEL DE IMAGENS DO PRODUTO NA HERO
  const track = document.getElementById('hero-carousel-track');
  const viewport = document.getElementById('hero-carousel-viewport');
  const carouselWrapper = document.querySelector('.hero-carousel-wrapper');
  const prevBtn = document.getElementById('hero-carousel-prev');
  const nextBtn = document.getElementById('hero-carousel-next');
  const indicators = document.querySelectorAll('.hero-indicator');
  const slides = document.querySelectorAll('.hero-carousel-slide');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;
    let isUserInteracting = false;
    let touchResumeTimeout = null;

    // Atualiza a posição do slide com transição suave
    const updateCarousel = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Atualiza os indicadores
      indicators.forEach((indicator, idx) => {
        if (idx === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    };

    // Botões Próximo e Anterior
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
      });
    }

    // Clique direto nos indicadores discretos
    indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        const targetIdx = parseInt(indicator.getAttribute('data-index'), 10);
        updateCarousel(targetIdx);
      });
    });

    // SISTEMA DE AUTOPLAY (A cada 4 segundos)
    const startAutoplay = () => {
      stopAutoplay();
      if (isUserInteracting) return;
      autoplayTimer = setInterval(() => {
        if (!isUserInteracting) {
          updateCarousel(currentIndex + 1);
        }
      }, 4000);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    // Pausar ao passar o mouse no Desktop
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopAutoplay();
      });

      carouselWrapper.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        startAutoplay();
      });
    }

    // SUPORTE A SWIPE / TOQUE NO CELULAR
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 40; // Sensibilidade do deslize em pixels

    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        isUserInteracting = true;
        clearTimeout(touchResumeTimeout);
        stopAutoplay();
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            // Deslizou para a esquerda -> Próxima imagem
            updateCarousel(currentIndex + 1);
          } else {
            // Deslizou para a direita -> Imagem anterior
            updateCarousel(currentIndex - 1);
          }
        }

        // Aguarda 2 segundos após a interação antes de retomar o autoplay suavemente
        clearTimeout(touchResumeTimeout);
        touchResumeTimeout = setTimeout(() => {
          isUserInteracting = false;
          startAutoplay();
        }, 2000);
      }, { passive: true });
    }

    // Inicia o autoplay na carga da página
    startAutoplay();
  }

  // 2. CARROSSEL DE DEPOIMENTOS REAIS
  const testTrack = document.getElementById('testimonials-carousel-track');
  const testViewport = document.getElementById('testimonials-carousel-viewport');
  const testWrapper = document.getElementById('testimonials-carousel-wrapper');
  const testPrevBtn = document.getElementById('testimonials-carousel-prev');
  const testNextBtn = document.getElementById('testimonials-carousel-next');
  const testIndicators = document.querySelectorAll('.testimonials-indicator');
  const testSlides = document.querySelectorAll('.testimonials-carousel-slide');

  if (testTrack && testSlides.length > 0) {
    let currentTestIndex = 0;
    const totalTestSlides = testSlides.length;

    const updateTestimonialsCarousel = (index) => {
      currentTestIndex = (index + totalTestSlides) % totalTestSlides;
      testTrack.style.transform = `translateX(-${currentTestIndex * 100}%)`;

      testIndicators.forEach((ind, i) => {
        if (i === currentTestIndex) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      });
    };

    if (testNextBtn) {
      testNextBtn.addEventListener('click', () => {
        updateTestimonialsCarousel(currentTestIndex + 1);
      });
    }

    if (testPrevBtn) {
      testPrevBtn.addEventListener('click', () => {
        updateTestimonialsCarousel(currentTestIndex - 1);
      });
    }

    testIndicators.forEach((ind) => {
      ind.addEventListener('click', () => {
        const targetIdx = parseInt(ind.getAttribute('data-index'), 10);
        updateTestimonialsCarousel(targetIdx);
      });
    });

    // Suporte a swipe no mobile para os depoimentos
    let testTouchStartX = 0;
    let testTouchEndX = 0;

    if (testViewport) {
      testViewport.addEventListener('touchstart', (e) => {
        testTouchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      testViewport.addEventListener('touchend', (e) => {
        testTouchEndX = e.changedTouches[0].screenX;
        const diff = testTouchStartX - testTouchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) {
            updateTestimonialsCarousel(currentTestIndex + 1);
          } else {
            updateTestimonialsCarousel(currentTestIndex - 1);
          }
        }
      }, { passive: true });
    }
  }

  // 2. MOBILE STICKY CTA (Discreto e elegante durante a rolagem no Mobile)
  const mobileSticky = document.getElementById('mobile-sticky-cta');

  if (mobileSticky) {
    const handleMobileSticky = () => {
      if (window.innerWidth <= 768) {
        mobileSticky.classList.add('visible');
      } else {
        mobileSticky.classList.remove('visible');
      }
    };

    window.addEventListener('resize', handleMobileSticky);
    handleMobileSticky();
  }

  // 3. ANCORAGEM SUAVE PARA O CHECKOUT
  document.querySelectorAll('a[href="#checkout"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.getElementById('checkout');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. ACCORDION DE DÚVIDAS FREQUENTES (FAQ)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha outros itens para navegação limpa
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Alterna o item clicado
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });
});
