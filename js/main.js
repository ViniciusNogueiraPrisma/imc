AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

document.addEventListener("DOMContentLoaded", function () {
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
        console.log(`Font size: ${currentFontSize}%`);
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
        console.log(`Font size: ${currentFontSize}%`);
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
  function initTableScrollShadows() {
    const tableContainers = document.querySelectorAll('.table-responsive');
    
    tableContainers.forEach(function(container) {
      function updateScrollShadows() {
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        
        container.classList.remove('scrolled-left', 'scrolled-right');
        
        if (scrollWidth > clientWidth) {
          if (scrollLeft > 10) {
            container.classList.add('scrolled-left');
          }
          
          if (scrollLeft < scrollWidth - clientWidth - 10) {
            container.classList.add('scrolled-right');
          }
        }
      }
      
      setTimeout(updateScrollShadows, 100);
      
      container.addEventListener('scroll', updateScrollShadows);
      
      window.addEventListener('resize', function() {
        setTimeout(updateScrollShadows, 100);
      });
    });
  }
  
  initTableScrollShadows();

  const languageToggle = document.querySelector(".language-toggle");
  const languageMenu = document.querySelector(".language-menu");
  const currentLang = document.querySelector(".current-lang");
  const languageLinks = document.querySelectorAll(".language-menu a");

  languageToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    languageToggle.classList.toggle("active");
    languageMenu.classList.toggle("show");
  });

  document.addEventListener("click", function () {
    languageToggle.classList.remove("active");
    languageMenu.classList.remove("show");
  });

  languageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      languageLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      const lang = this.getAttribute("data-lang");
      currentLang.textContent = lang.toUpperCase();
      languageToggle.classList.remove("active");
      languageMenu.classList.remove("show");
      console.log("Language changed to:", lang);
    });
  });

  const toggleMode = document.querySelector(".toggle-mode");
  const increaseFont = document.querySelector(".increase-font");
  const decreaseFont = document.querySelector(".decrease-font");

  let currentFontSize = 16;
  const minFontSize = 12;
  const maxFontSize = 24;
  const originalFontSize = 16;

  toggleMode.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
  });

  increaseFont.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentFontSize < maxFontSize) {
      currentFontSize += 2;
      document.documentElement.style.fontSize = currentFontSize + "px";
    }
  });

  decreaseFont.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentFontSize > minFontSize) {
      currentFontSize -= 2;
      document.documentElement.style.fontSize = currentFontSize + "px";
    }
  });
});



$(document).ready(function () {
  $(".dropdown").hover(
    function () {
      $(this).addClass("show active");
      $(this).find(".dropdown-menu").addClass("show");
    },
    function () {
      $(this).removeClass("show active");
      $(this).find(".dropdown-menu").removeClass("show");
    }
  );

  const searchButton = $(".search-bar a");
  const searchBox = $("#searchBox");
  const closeSearchBox = $(".close-search-box");

  searchButton.on("click", function (e) {
    e.preventDefault();
    searchBox.toggleClass("active");
    if (searchBox.hasClass("active")) {
      searchBox.find("input").focus();
    }
  });

  closeSearchBox.on("click", function () {
    searchBox.removeClass("active");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest("#searchBox, .search-bar").length) {
      searchBox.removeClass("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const glossarioContainer = document.querySelector(".container-glossario");
  if (!glossarioContainer) return;

  const letterLinks = document.querySelectorAll(".letter-link");
  const glossarioSections = document.querySelectorAll(".glossario-section");

  if (letterLinks.length === 0 || glossarioSections.length === 0) return;

  const availableLetters = new Set();
  glossarioSections.forEach((section) => {
    const letter = section.getAttribute("data-letter");
    if (letter) {
      availableLetters.add(letter);
    }
  });

  letterLinks.forEach((link) => {
    const letter = link.getAttribute("data-letter");
    if (!availableLetters.has(letter)) {
      link.classList.add("disabled");
      link.style.pointerEvents = "none";
    }
  });

  console.log(
    "Letras disponíveis no glossário:",
    Array.from(availableLetters).sort()
  );

  const observerOptions = {
    root: null,
    rootMargin: "-120px 0px -50% 0px",
    threshold: 0.1,
  };

  function activateLetter(letter) {
    letterLinks.forEach((link) => {
      if (!link.classList.contains("disabled")) {
        link.classList.remove("active");
      }
    });

    const currentLink = document.querySelector(`[data-letter="${letter}"]`);
    if (currentLink && !currentLink.classList.contains("disabled")) {
      currentLink.classList.add("active");
    }
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const letter = entry.target.getAttribute("data-letter");
        if (letter) {
          activateLetter(letter);
        }
      }
    });
  }, observerOptions);

  glossarioSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  letterLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.classList.contains("disabled")) {
        return;
      }

      const letter = this.getAttribute("data-letter");
      const targetSection = document.querySelector(
        `#letter-${letter.toLowerCase()}`
      );

      if (targetSection) {
        const headerHeight = document.querySelector(
          ".glossario-alphabet-header"
        ).offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        activateLetter(letter);
      }
    });
  });

  function checkInitialPosition() {
    const scrollTop = window.pageYOffset;
    const headerHeight = document.querySelector(
      ".glossario-alphabet-header"
    ).offsetHeight;

    for (let i = 0; i < glossarioSections.length; i++) {
      const section = glossarioSections[i];
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
        const letter = section.getAttribute("data-letter");
        activateLetter(letter);
        break;
      }
    }
  }

  setTimeout(checkInitialPosition, 100);
});

const header = document.querySelector("header");
let lastScrollTop = 0;

function isGlossarioPage() {
  const currentUrl = window.location.href;
  const pathname = window.location.pathname;

  return (
    currentUrl.includes("glossario.html") ||
    pathname.includes("glossario.html") ||
    pathname.endsWith("/glossario") ||
    pathname.endsWith("/glossario/")
  );
}

function handleScroll() {
  if (isGlossarioPage()) {
    return;
  }

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

if (!isGlossarioPage()) {
  window.addEventListener("scroll", handleScroll);
} else {

  if (header) {
    header.classList.add("at-top");
    header.classList.remove("hide-header", "show-header");
    header.style.position = "absolute";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.querySelector("[data-filter-toggle]");
  const filterOptions = document.querySelector("[data-filter-options]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterSelects = document.querySelectorAll(".filter-select select");

  let isFilterOpen = false;

  function toggleFilters() {
    isFilterOpen = !isFilterOpen;

    if (isFilterOpen) {
      filterButton.classList.add("active");
      filterOptions.classList.add("show");

      filterItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animate-in");
        }, 100 + index * 100);
      });
    } else {
      filterButton.classList.remove("active");

      filterItems.forEach((item) => {
        item.classList.remove("animate-in");
      });

      setTimeout(() => {
        filterOptions.classList.remove("show");
      }, 200);
    }
  }

  if (filterButton) {
    filterButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleFilters();
    });
  }

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".filter-controls") && isFilterOpen) {
      toggleFilters();
    }
  });

  function filterContent(filters) {
    const contentItems = document.querySelectorAll(
      ".content-item, .document-item, .accordion-item"
    );

    contentItems.forEach((item) => {
      let shouldShow = true;

      if (filters.ano) {
        const itemYear =
          item.getAttribute("data-year") ||
          item.querySelector("[data-year]")?.getAttribute("data-year");
        if (itemYear && itemYear !== filters.ano) {
          shouldShow = false;
        }
      }

      if (filters.tipo) {
        const itemType =
          item.getAttribute("data-type") ||
          item.querySelector("[data-type]")?.getAttribute("data-type");
        if (itemType && itemType !== filters.tipo) {
          shouldShow = false;
        }
      }

      if (filters.data) {
      }

      if (shouldShow) {
        item.style.display = "";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(-10px)";
        setTimeout(() => {
          if (item.style.opacity === "0") {
            item.style.display = "none";
          }
        }, 300);
      }
    });
  }

  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      if (this.value) {
        this.style.color = "#3b3b3b";
        this.style.fontWeight = "500";
      } else {
        this.style.color = "#6e6e6e";
        this.style.fontWeight = "400";
      }

      applyFilters();
    });

    select.addEventListener("focus", function () {
      const svg = this.parentElement.querySelector("svg");
      if (svg) {
        svg.style.color = "#ea7425";
      }
    });

    select.addEventListener("blur", function () {
      const svg = this.parentElement.querySelector("svg");
      if (svg) {
        svg.style.color = "#6e6e6e";
      }
    });
  });

  function clearAllFilters() {
    filterSelects.forEach((select) => {
      select.value = "";
      select.style.color = "#6e6e6e";
      select.style.fontWeight = "400";
    });

    const contentItems = document.querySelectorAll(
      ".content-item, .document-item, .accordion-item"
    );
    contentItems.forEach((item) => {
      item.style.display = "";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    });

    if (isFilterOpen) {
      toggleFilters();
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (isFilterOpen) {
        toggleFilters();
      } else {
        clearAllFilters();
      }
    }
  });

  function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let hasFilters = false;

    filterSelects.forEach((select) => {
      const paramValue = urlParams.get(select.name);
      if (paramValue) {
        select.value = paramValue;
        select.style.color = "#3b3b3b";
        select.style.fontWeight = "500";
        hasFilters = true;
      }
    });

    if (hasFilters && !isFilterOpen) {
      setTimeout(() => {
        toggleFilters();
      }, 500);
    }

    if (urlParams.toString()) {
      applyFilters();
    }
  }

  initializeFiltersFromURL();

  function updateFilterButton() {
    const activeFilters = Array.from(filterSelects).filter(
      (select) => select.value
    );

    if (activeFilters.length > 0) {
      filterButton.classList.add("has-active-filters");
      filterButton.style.position = "relative";
    } else {
      filterButton.classList.remove("has-active-filters");
      const badge = filterButton.querySelector(".filter-badge");
      if (badge) {
        badge.remove();
      }
    }
  }

  filterSelects.forEach((select) => {
    select.addEventListener("change", updateFilterButton);
  });

  updateFilterButton();
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navigation = document.querySelector(".navigation");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
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
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    navigation.classList.remove("mobile-active");
    body.style.overflow = "";

    if (isMobileMode()) {
      dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;
        toggle.setAttribute("aria-expanded", "false");
        dropdownMenu.classList.remove("mobile-show");
      });
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

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (isMobileMode()) {

        e.preventDefault();
        e.stopPropagation();

        const dropdownMenu = this.nextElementSibling;
        const isExpanded = this.getAttribute("aria-expanded") === "true";

        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            const otherMenu = otherToggle.nextElementSibling;
            otherToggle.setAttribute("aria-expanded", "false");
            otherMenu.classList.remove("mobile-show");
          }
        });

        if (isExpanded) {
          this.setAttribute("aria-expanded", "false");
          dropdownMenu.classList.remove("mobile-show");
        } else {
          this.setAttribute("aria-expanded", "true");
          dropdownMenu.classList.add("mobile-show");
        }
      }
    });
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (isMobileMode()) {
        setTimeout(() => {
          closeMobileMenu();
        }, 100);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navigation.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      closeMobileMenu();
      dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;
        toggle.setAttribute("aria-expanded", "false");
        dropdownMenu.classList.remove("mobile-show");
      });
    }
  });

  let touchStartY = 0;

  if (navigation) {
    navigation.addEventListener("touchstart", function (e) {
      if (isMobileMode() && navigation.classList.contains("mobile-active")) {
        touchStartY = e.touches[0].clientY;
      }
    });

    navigation.addEventListener("touchmove", function (e) {
      if (isMobileMode() && navigation.classList.contains("mobile-active")) {
        const touchY = e.touches[0].clientY;
        const touchDelta = touchY - touchStartY;

        // Use o contêiner rolável correto: submenu aberto ou o próprio overlay
        const targetScrollable = e.target.closest('.dropdown-menu.mobile-show');
        const scrollContainer = targetScrollable || this;

        const atTop = scrollContainer.scrollTop === 0;
        const atBottom = scrollContainer.scrollTop >= (scrollContainer.scrollHeight - scrollContainer.clientHeight);

        if ((atTop && touchDelta > 0) || (atBottom && touchDelta < 0)) {
          // Evita o bounce do container atual sem bloquear o scroll interno
          e.preventDefault();
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  window.downloadFile = function (filename) {
    console.log("Downloading file:", filename);

    const link = document.createElement("a");
    link.href = `/downloads/${filename}`;
    link.download = filename;
    link.target = "_blank";

    const downloadBtn = event.target.closest(".download-btn");
    if (downloadBtn) {
      const originalContent = downloadBtn.innerHTML;
      downloadBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2"/>
        </svg>
      `;
      downloadBtn.style.background = "#22c55e";
      downloadBtn.style.borderColor = "#22c55e";

      setTimeout(() => {
        downloadBtn.innerHTML = originalContent;
        downloadBtn.style.background = "";
        downloadBtn.style.borderColor = "";
      }, 2000);
    }

    try {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao fazer download:", error);
      alert("Erro ao fazer download do arquivo. Tente novamente.");
    }
  };

  const accordionElement = document.getElementById("estatutosAccordion");

  if (accordionElement) {
    accordionElement.addEventListener("show.bs.collapse", function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(
        `[data-bs-target="#${targetCollapse.id}"]`
      );

      const allCollapses = accordionElement.querySelectorAll(
        ".accordion-collapse"
      );
      allCollapses.forEach((collapse) => {
        if (
          collapse !== targetCollapse &&
          collapse.classList.contains("show")
        ) {
          const collapseInstance = bootstrap.Collapse.getInstance(collapse);
          if (collapseInstance) {
            collapseInstance.hide();
          }
        }
      });

      if (targetButton) {
        targetButton.classList.remove("collapsed");
      }
    });

    accordionElement.addEventListener("shown.bs.collapse", function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(
        `[data-bs-target="#${targetCollapse.id}"]`
      );

      if (targetButton) {
        targetButton.setAttribute("aria-expanded", "true");

        setTimeout(() => {
          targetCollapse.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, 300);
      }
    });

    accordionElement.addEventListener("hidden.bs.collapse", function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(
        `[data-bs-target="#${targetCollapse.id}"]`
      );

      if (targetButton) {
        targetButton.classList.add("collapsed");
        targetButton.setAttribute("aria-expanded", "false");
      }
    });
  }
});
