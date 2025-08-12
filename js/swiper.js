$(document).ready(function () {
  let destaquesSwiper;

  function initDestaquesSwiper() {
    if (window.innerWidth < 1200) {
      if (!destaquesSwiper) {
        destaquesSwiper = new Swiper(".destaques-swiper", {
          slidesPerView: 1.2,
          spaceBetween: 16,
          centeredSlides: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            480: {
              slidesPerView: 2.2,
              centeredSlides: false,
            },
            768: {
              slidesPerView: 3.2,
              centeredSlides: false,
            },
            992: {
              slidesPerView: 4.2,
              centeredSlides: false,
            },
          },
        });
      }
    } else if (destaquesSwiper) {
      destaquesSwiper.destroy();
      destaquesSwiper = null;
    }
  }

  initDestaquesSwiper();
  window.addEventListener("resize", initDestaquesSwiper);
  const tickersSwiper = new Swiper(".tickers-swiper", {
    slidesPerView: 1,
    spaceBetween: 32,
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
        allowTouchMove: false,
        allowSlideNext: false,
        allowSlidePrev: false,
      },
    },
  });

  const bannerSwiper = new Swiper(".banner-swiper", {
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 600,
    allowTouchMove: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChangeTransitionStart: function () {
        $(".banner-swiper .text-slide").removeClass("slide-active");
        $(".banner-swiper .video-slide").removeClass("slide-active");
      },
      slideChangeTransitionEnd: function () {
        const activeSlide = $(".banner-swiper .swiper-slide-active");
        if (activeSlide.length) {
          activeSlide.find(".text-slide").addClass("slide-active");
          activeSlide.find(".video-slide").addClass("slide-active");
        }
      },
      init: function () {
        setTimeout(() => {
          const activeSlide = $(".banner-swiper .swiper-slide-active");
          if (activeSlide.length) {
            activeSlide.find(".text-slide").addClass("slide-active");
            activeSlide.find(".video-slide").addClass("slide-active");
          }
        }, 100);
      },
    },
  });

  let parceirosSwiper = null;
  function initParceirosSwiper() {
    const parceirosEl = document.querySelector('.mySwiper-parceiros');
    if (!parceirosEl) return;

    const nextEl = parceirosEl.querySelector('.swiper-button-next');
    const prevEl = parceirosEl.querySelector('.swiper-button-prev');
    const slidesCount = parceirosEl.querySelectorAll('.swiper-wrapper .swiper-slide').length || 1;

    if (parceirosSwiper) {
      try { parceirosSwiper.destroy(true, true); } catch (_) {}
      parceirosSwiper = null;
    }

    parceirosSwiper = new Swiper(parceirosEl, {
      // Core
      speed: 400,
      spaceBetween: 16,
      slidesPerView: 1,
      slidesPerGroup: 1,
      initialSlide: 0,

      // Loop infinito estável
      loop: true,
      centeredSlides: true,
      centerInsufficientSlides: true,
      loopedSlides: slidesCount,
      loopAdditionalSlides: slidesCount,
      loopedSlidesLimit: false,
      normalizeSlideIndex: true,
      watchOverflow: true,

      // UX
      grabCursor: true,
      slideToClickedSlide: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      navigation: { nextEl, prevEl },

      breakpoints: {
        480:  { slidesPerView: 2, centeredSlides: true },
        768:  { slidesPerView: 3, centeredSlides: true },
        992:  { slidesPerView: 3, centeredSlides: true },
        1200: { slidesPerView: 5, centeredSlides: true },
      },
    });
  }

  initParceirosSwiper();

  const marcasSwiper = new Swiper(".marcas-swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 800,
    loop: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".marcas-destaque .swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".marcas-destaque .swiper-button-next",
      prevEl: ".marcas-destaque .swiper-button-prev",
    },
  });
});