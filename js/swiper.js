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
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 32,
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

  const swiperParceiros = new Swiper(".mySwiper-parceiros", {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 24,
    loop: true,
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 16,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
        centeredSlides: false,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 16,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 16,
        centeredSlides: true,
      },
    },
    on: {
      slideChangeTransitionEnd: function () {
        $(".mySwiper-parceiros .swiper-slide a").removeClass("slide-active");

        const activeSlide = $(".mySwiper-parceiros .swiper-slide-active");
        if (activeSlide.length) {
          activeSlide.find("a").addClass("slide-active");
        }
      },
      init: function () {
        setTimeout(() => {
          const activeSlide = $(".mySwiper-parceiros .swiper-slide-active");
          if (activeSlide.length) {
            activeSlide.find("a").addClass("slide-active");
          }
        }, 100);
      },
    },
  });

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
