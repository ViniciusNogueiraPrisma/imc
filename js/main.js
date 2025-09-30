// Initialize Locomotive Scroll
let scroll;

function initLocomotiveScroll() {
  scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    class: 'is-revealed',
    scrollbarContainer: false,
    lerp: 0.1,
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });

  // Update scroll on window resize
  window.addEventListener('resize', () => {
    scroll.update();
  });
}

// Initialize AOS with Locomotive Scroll integration
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Update AOS on Locomotive Scroll update
if (scroll) {
  scroll.on('scroll', () => {
    AOS.refresh();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Locomotive Scroll
  initLocomotiveScroll();
  
  let currentFontSize = parseInt(localStorage.getItem("fontLevel")) || 100;

  const increaseBtn = document.getElementById("increaseFont");
  const decreaseBtn = document.getElementById("decreaseFont");

  function applyFontSize() {
    document.body.style.fontSize = currentFontSize + "%";
  }

  if (currentFontSize !== 100) {
    applyFontSize();
  }

  if (increaseBtn) {
    increaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize < 130) {
        currentFontSize += 10;
        applyFontSize();
        localStorage.setItem("fontLevel", currentFontSize);
        updateButtons();
      }
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentFontSize > 80) {
        currentFontSize -= 10;
        applyFontSize();
        localStorage.setItem("fontLevel", currentFontSize);
        updateButtons();
      }
    });
  }

  function updateButtons() {
    if (increaseBtn) {
      increaseBtn.style.opacity = currentFontSize >= 130 ? "0.5" : "1";
    }
    if (decreaseBtn) {
      decreaseBtn.style.opacity = currentFontSize <= 80 ? "0.5" : "1";
    }
  }

  updateButtons();
});

document.addEventListener("DOMContentLoaded", function () {
  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector(".language-menu");

  languageToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    languageToggle.classList.toggle("active");
    languageMenu.classList.toggle("show");
  });

  document.addEventListener("click", function () {
    languageToggle.classList.remove("active");
    languageMenu.classList.remove("show");
  });

  const languageLinks = document.querySelectorAll(".language-menu a");

  languageLinks.forEach((link) => {
    link.addEventListener("click", function () {
      languageToggle.classList.remove("active");
      languageMenu.classList.remove("show");
    });
  });

  const toggleMode = document.querySelector(".toggle-mode");

  toggleMode.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
  });
});

$(document).ready(function () {
  const searchButton = $(".search-bar a");
  const searchBox = $("#searchBox");
  const closeSearchBox = $(".close-search-box");

  searchButton.on("click", function (e) {
    e.preventDefault();
    searchBox.toggleClass("active");
    $("body").toggleClass("open-menu", searchBox.hasClass("active"));
    if (searchBox.hasClass("active")) {
      searchBox.find("input").focus();
    }
  });

  closeSearchBox.on("click", function () {
    searchBox.removeClass("active");
    $("body").removeClass("open-menu");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#searchBox, .search-bar").length) {
      searchBox.removeClass("active");
      $("body").removeClass("open-menu");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navigation = document.querySelector(".navigation");
  const body = document.body;

  function isMobileMode() {
    return window.innerWidth <= 1200;
  }

  function toggleMobileMenu() {
    const isActive = mobileMenuToggle.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenuToggle.classList.add("active");
    navigation.classList.add("mobile-active");
    body.style.overflow = "hidden";

    const logoImg = document.querySelector(".logo img");
    if (logoImg) {
      logoImg.style.filter = "none";
    }
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navigation.classList.remove("mobile-active");
    body.style.overflow = "";

    const logoImg = document.querySelector(".logo img");
    if (logoImg) {
      logoImg.style.filter = "";
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (navigation) {
    navigation.addEventListener("click", function (e) {
      if (isMobileMode() && e.target === navigation) {
        closeMobileMenu();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navigation.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      closeMobileMenu();
    }
  });
});

const header = document.querySelector("header");
let lastScrollTop = 0;

function handleScroll() {
  const currentScroll = window.scrollY;

  if (currentScroll === 0) {
    header.classList.remove("hide-header", "show-header");
    header.classList.add("at-top");
  } else {
    header.classList.remove("at-top");

    if (currentScroll > lastScrollTop) {
      header.classList.remove("show-header");
      header.classList.add("hide-header");
    } else {
      header.classList.remove("hide-header");
      header.classList.add("show-header");
    }
  }

  lastScrollTop = currentScroll;
}

window.addEventListener("scroll", handleScroll);

function initTextCarousel() {
  const titleSlide = document.querySelector(".title-slide");
  if (!titleSlide) return;

  const texts = titleSlide.querySelectorAll("h1");
  if (texts.length === 0) return;

  let currentIndex = 0;

  function showNextText() {
    const currentText = texts[currentIndex];
    const nextIndex = (currentIndex + 1) % texts.length;
    const nextText = texts[nextIndex];

    currentText.classList.remove("active");
    currentText.classList.add("slide-up");

    nextText.classList.add("active");

    setTimeout(() => {
      currentText.classList.remove("slide-up");
      currentText.style.transform = "";
      currentText.style.opacity = "";

      currentIndex = nextIndex;
    }, 800);
  }

  texts.forEach((text, index) => {
    if (index === 0) {
      text.classList.add("active");
      text.style.transform = "";
      text.style.opacity = "";
    } else {
      text.style.transform = "";
      text.style.opacity = "";
    }
  });

  setInterval(showNextText, 3000);
}

document.addEventListener("DOMContentLoaded", initTextCarousel);

document.addEventListener("DOMContentLoaded", function () {
  const atuacaoSection = document.querySelector(".atuacao-home");
  const boxes = document.querySelectorAll(".box-atuacao .box");

  if (!atuacaoSection || !boxes.length) return;

  let currentTimeout = null;
  let currentLayer = "before";
  let autoplayInterval = null;
  let currentBoxIndex = 0;
  let isUserInteracting = false;

  function activateBox(box) {
    const bgImage = box.dataset.bg;
    if (!bgImage) return;

    const fullPath =
      bgImage.startsWith("http") || bgImage.startsWith("/")
        ? bgImage
        : `../${bgImage}`;

    boxes.forEach((b) => b.classList.remove("active"));
    box.classList.add("active");

    if (currentLayer === "before") {
      atuacaoSection.style.setProperty(
        "--bg-before",
        `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url("${fullPath}")`
      );
      atuacaoSection.classList.add("show-before");
      atuacaoSection.classList.remove("show-after");
      currentLayer = "after";
    } else {
      atuacaoSection.style.setProperty(
        "--bg-after",
        `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url("${fullPath}")`
      );
      atuacaoSection.classList.add("show-after");
      atuacaoSection.classList.remove("show-before");
      currentLayer = "before";
    }
  }

  function deactivateAllBoxes() {
    boxes.forEach((b) => b.classList.remove("active"));
    atuacaoSection.classList.remove("show-before", "show-after");
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);

    autoplayInterval = setInterval(() => {
      if (!isUserInteracting) {
        activateBox(boxes[currentBoxIndex]);
        currentBoxIndex = (currentBoxIndex + 1) % boxes.length;
      }
    }, 5000);
  }

  boxes.forEach((box, index) => {
    box.addEventListener("mouseenter", function () {
      isUserInteracting = true;

      if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
      }

      currentBoxIndex = index;
      activateBox(box);
    });

    box.addEventListener("mouseleave", function () {
      currentTimeout = setTimeout(() => {
        isUserInteracting = false;
        deactivateAllBoxes();
      }, 200);
    });
  });

  startAutoplay();
  activateBox(boxes[0]);
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.querySelector(".back-to-top");
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

let atuacaoSwiper = null;

function initAtuacaoSwiper() {
  const swiperElement = document.querySelector(".atuacao-swiper");
  
  if (!swiperElement) return;

  if (window.innerWidth <= 1199) {
    if (!atuacaoSwiper) {
      atuacaoSwiper = new Swiper(".atuacao-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: false,
        centeredSlides: false,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },
      });
    }
  } else {
    if (atuacaoSwiper) {
      atuacaoSwiper.destroy(true, true);
      atuacaoSwiper = null;
    }
  }
}

document.addEventListener("DOMContentLoaded", initAtuacaoSwiper);
window.addEventListener("resize", initAtuacaoSwiper);
