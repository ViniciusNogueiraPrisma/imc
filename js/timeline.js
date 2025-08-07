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
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < swiper.slides.length) {
          swiper.slideTo(slideIndex);
        }
      });

      // O hover agora é controlado apenas pelo CSS
    });

    // Inicializa o estado
    updateTimeline(swiper);
  }

  function updateTimeline(swiper) {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.activeIndex;
    
    const progressBar = document.querySelector('.track-progress');
    const points = document.querySelectorAll('.point-wrapper');
    const trackPoints = document.querySelector('.track-points');
    
    // Calcula o progresso considerando o padding dos pontos
    if (progressBar && trackPoints && totalSlides > 1) {
      const trackWidth = trackPoints.offsetWidth;
      // Verifica se está em modo responsivo
      const isMobile = window.innerWidth <= 768;
      const paddingLeft = isMobile ? 20 : 40; // padding definido no CSS
      const availableWidth = trackWidth - (paddingLeft * 2);
      const pointSpacing = availableWidth / (totalSlides - 1);
      const currentPosition = paddingLeft + (pointSpacing * currentIndex);
      const progressWidth = (currentPosition - paddingLeft) / availableWidth * 100;
      
      progressBar.style.width = `${Math.max(0, Math.min(100, progressWidth))}%`;
    }
    
    // Atualiza estados dos pontos
    points.forEach((point) => {
      const pointIndex = parseInt(point.dataset.index);
      
      // Remove todas as classes de estado
      point.classList.remove('active', 'passed');
      
      if (pointIndex < currentIndex) {
        // Estados passados
        point.classList.add('passed');
      } else if (pointIndex === currentIndex) {
        // Estado ativo
        point.classList.add('active');
      }
    });

    // Atualiza state dos botões
    updateNavigationButtons(swiper);
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