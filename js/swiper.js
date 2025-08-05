$(document).ready(function () {
  const tickersSwiper = new Swiper(".tickers-swiper", {
    slidesPerView: 2,
    spaceBetween: 32,
    // loop: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
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
});

const bannerSwiper = new Swiper(".banner-swiper", {
  slidesPerView: 1,
  // loop: true,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".banner-next",
    prevEl: ".banner-prev",
  },
  on: {
    init: function () {
      setTimeout(updateBannerCounter, 100);
    },
    slideChange: function () {
      updateBannerCounter();
    },
  },
});

function updateBannerCounter() {
  const currentSlide = bannerSwiper.realIndex + 1;
  const totalSlides = bannerSwiper.slides.length - (bannerSwiper.loop ? 2 : 0);

  document.querySelector(".current-slide").textContent = currentSlide
    .toString()
    .padStart(2, "0");
  document.querySelector(".total-slides").textContent = totalSlides
    .toString()
    .padStart(2, "0");
}
