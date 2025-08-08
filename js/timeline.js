document.addEventListener('DOMContentLoaded', function() {
  // Verificar se os elementos da timeline existem
  const timelineContainer = document.querySelector('.timeline-slider');
  if (!timelineContainer) {
    console.warn('Timeline container not found');
    return;
  }

  const timelineSlider = new Swiper('.timeline-slider', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 600,
    allowTouchMove: false,
    loop: false,
    autoHeight: false,
    spaceBetween: 0,
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },
    on: {
      init: function() {
        initializeTimeline(this);
      },
      slideChange: function() {
        updateTimeline(this);
      }
    }
  });

  function initializeTimeline(swiper) {
    const points = document.querySelectorAll('.point-wrapper');
    
    if (points.length === 0) {
      console.warn('Timeline points not found');
      return;
    }

    // Adiciona eventos de clique nos pontos
    points.forEach((point, index) => {
      point.addEventListener('click', () => {
        const slideIndex = parseInt(point.dataset.index);
        const slideYear = point.dataset.year;
        
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < swiper.slides.length) {
          swiper.slideTo(slideIndex);
          
          // Log para debug da ligação entre slide e ano
          console.log(`Navegando para slide ${slideIndex} (${slideYear})`);
        }
      });
    });

    // Inicializa o estado com o primeiro slide ativo
    updateTimeline(swiper);
    
    // Garante que a barra de progresso comece no primeiro ponto
    setTimeout(() => {
      updateTimeline(swiper);
    }, 100);
  }

  function updateTimeline(swiper) {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    const currentSlide = swiper.slides[currentIndex];
    const currentYear = currentSlide ? currentSlide.dataset.year : null;
    
    const progressBar = document.querySelector('.track-progress');
    const points = document.querySelectorAll('.point-wrapper');
    const trackPoints = document.querySelector('.track-points');
    const timelineTrack = document.querySelector('.timeline-track');
    
    // Log para debug
    console.log(`Timeline Update: Slide ${currentIndex}, Year ${currentYear}`);
    
    // Calcula a barra de progresso baseada na posição real dos pontos
    if (progressBar && points.length > 1) {
      const activePoint = document.querySelector(`.point-wrapper[data-year="${currentYear}"]`);
      const firstPoint = points[0];
      
      if (activePoint && firstPoint) {
        // Espaçamento fixo: 80px por ponto + 40px de margem = 120px entre centros dos pontos
        const pointSpacing = 120; // 80px width + 40px margin
        // A barra começa no centro do primeiro ponto (40px padding + 40px para o centro = 80px)
        // Mas agora a barra está posicionada em left: 40px, então adicionamos 40px ao cálculo
        const progressWidth = 40 + (currentIndex * pointSpacing);
        
        progressBar.style.width = `${progressWidth}px`;
      }
    } else if (progressBar && points.length === 1) {
      // Se só há um ponto, não mostra barra
      progressBar.style.width = '0px';
    }
    
    // Atualiza estados dos pontos baseado no ano
    points.forEach((point) => {
      const pointYear = point.dataset.year;
      const pointIndex = parseInt(point.dataset.index);
      
      // Remove todas as classes de estado
      point.classList.remove('active', 'passed');
      
      if (pointIndex < currentIndex) {
        // Estados passados
        point.classList.add('passed');
      } else if (pointYear === currentYear) {
        // Estado ativo baseado no ano
        point.classList.add('active');
        
        // Scroll automático para o ponto ativo
        scrollToActivePoint(point);
      }
    });

    // Atualiza state dos botões
    updateNavigationButtons(swiper);
  }

  function scrollToActivePoint(activePoint) {
    const timelineTrack = document.querySelector('.timeline-track');
    if (!timelineTrack || !activePoint) return;
    
    const trackRect = timelineTrack.getBoundingClientRect();
    const pointRect = activePoint.getBoundingClientRect();
    const scrollLeft = timelineTrack.scrollLeft;
    
    // Calcula a posição para manter o ponto ativo visível
    const pointLeft = pointRect.left - trackRect.left + scrollLeft;
    const pointRight = pointLeft + pointRect.width;
    const trackWidth = trackRect.width;
    
    let targetScroll = scrollLeft;
    
    // Se o ponto está fora da view à direita
    if (pointRight > trackWidth + scrollLeft) {
      targetScroll = pointRight - trackWidth + 40; // +40px de margem
    }
    // Se o ponto está fora da view à esquerda
    else if (pointLeft < scrollLeft) {
      targetScroll = Math.max(0, pointLeft - 40); // -40px de margem
    }
    
    // Scroll suave
    if (targetScroll !== scrollLeft) {
      timelineTrack.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  function updateNavigationButtons(swiper) {
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');
    
    if (prevButton && nextButton) {
      // Reset classes
      prevButton.classList.remove('swiper-button-disabled');
      nextButton.classList.remove('swiper-button-disabled');
      
      // Adiciona classe disabled quando necessário
      if (swiper.isBeginning) {
        prevButton.classList.add('swiper-button-disabled');
      }
      
      if (swiper.isEnd) {
        nextButton.classList.add('swiper-button-disabled');
      }
    }
  }

  // Adiciona navegação por teclado
  document.addEventListener('keydown', function(e) {
    if (!timelineSlider) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      timelineSlider.slidePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      timelineSlider.slideNext();
    }
  });

  // Função para ir para um slide específico (pode ser chamada externamente)
  window.goToTimelineSlide = function(index) {
    if (timelineSlider && index >= 0 && index < timelineSlider.slides.length) {
      timelineSlider.slideTo(index);
    }
  };
});