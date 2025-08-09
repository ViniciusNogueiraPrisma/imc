// dropdown idiomas
document.addEventListener("DOMContentLoaded", function () {
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

// dropdown header active
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

  // abrir searchbox
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

// Filter Component - Visual Only (backend will handle filtering logic)
document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.querySelector('[data-filter-toggle]');
  const filterOptions = document.querySelector('[data-filter-options]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  
  let isFilterOpen = false;
  
  // Função para abrir/fechar filtros com animação
  function toggleFilters() {
    isFilterOpen = !isFilterOpen;
    
    if (isFilterOpen) {
      // Abrir filtros
      filterButton.classList.add('active');
      filterOptions.classList.add('show');
      
      // Animar cada item individualmente com delay
      filterItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate-in');
        }, 100 + (index * 100)); // Delay escalonado
      });
      
    } else {
      // Fechar filtros
      filterButton.classList.remove('active');
      
      // Remover animação dos itens primeiro
      filterItems.forEach(item => {
        item.classList.remove('animate-in');
      });
      
      // Depois fechar o container com delay
      setTimeout(() => {
        filterOptions.classList.remove('show');
      }, 200);
    }
  }
  
  // Event listener para o botão de toggle
  if (filterButton) {
    filterButton.addEventListener('click', function(e) {
      e.preventDefault();
      toggleFilters();
    });
  }
  
  // Fechar filtros ao clicar fora
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-controls') && isFilterOpen) {
      toggleFilters();
    }
  });
  
  // Fechar filtros com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isFilterOpen) {
      toggleFilters();
    }
  });

  // Funcionalidade de download de arquivos (visual feedback only)
  window.downloadFile = function(filename) {
    console.log('Download requested for:', filename);
    // Backend will handle actual download logic
  };

  // Configurar eventos dos accordions para controle exclusivo (se existir)
  const accordionElement = document.getElementById('estatutosAccordion');
  
  if (accordionElement) {
    // Evento quando um accordion está prestes a abrir
    accordionElement.addEventListener('show.bs.collapse', function (event) {
      const targetCollapse = event.target;
      
      // Fechar todos os outros accordions
      const allCollapses = accordionElement.querySelectorAll('.accordion-collapse');
      allCollapses.forEach(collapse => {
        if (collapse !== targetCollapse && collapse.classList.contains('show')) {
          const collapseInstance = bootstrap.Collapse.getInstance(collapse);
          if (collapseInstance) {
            collapseInstance.hide();
          }
        }
      });
    });
    
    // Evento quando um accordion foi aberto
    accordionElement.addEventListener('shown.bs.collapse', function (event) {
      const targetCollapse = event.target;
      
      // Scroll suave até o accordion aberto
      setTimeout(() => {
        targetCollapse.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 300);
    });
  }
});
