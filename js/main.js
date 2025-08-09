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

// Filter Component Functionality com Animações
document.addEventListener("DOMContentLoaded", function () {
  const filterButton = document.querySelector('[data-filter-toggle]');
  const filterOptions = document.querySelector('[data-filter-options]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  const filterSelects = document.querySelectorAll('.filter-select select');
  
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
  
  // Filters logic removed - backend will handle filtering
  
  // Função para filtrar o conteúdo (exemplo de implementação)
  function filterContent(filters) {
    // Esta função pode ser customizada baseada no conteúdo que precisa ser filtrado
    // Por exemplo, se houver uma lista de documentos, cards, etc.
    
    const contentItems = document.querySelectorAll('.content-item, .document-item, .accordion-item');
    
    contentItems.forEach(item => {
      let shouldShow = true;
      
      // Verificar filtro de ano
      if (filters.ano) {
        const itemYear = item.getAttribute('data-year') || item.querySelector('[data-year]')?.getAttribute('data-year');
        if (itemYear && itemYear !== filters.ano) {
          shouldShow = false;
        }
      }
      
      // Verificar filtro de tipo
      if (filters.tipo) {
        const itemType = item.getAttribute('data-type') || item.querySelector('[data-type]')?.getAttribute('data-type');
        if (itemType && itemType !== filters.tipo) {
          shouldShow = false;
        }
      }
      
      // Verificar filtro de data
      if (filters.data) {
        // Implementar lógica de ordenação por data se necessário
        // Esta parte dependeria da estrutura específica dos dados
      }
      
      // Mostrar/esconder item com animação suave
      if (shouldShow) {
        item.style.display = '';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          if (item.style.opacity === '0') {
            item.style.display = 'none';
          }
        }, 300);
      }
    });
  }
  
  // Adicionar event listeners aos selects
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      // Atualizar aparência do select quando uma opção é selecionada
      if (this.value) {
        this.style.color = '#3b3b3b';
        this.style.fontWeight = '500';
      } else {
        this.style.color = '#6e6e6e';
        this.style.fontWeight = '400';
      }
      
      // Aplicar filtros automaticamente quando uma opção é selecionada
      applyFilters();
    });
    
    // Efeito hover para os ícones SVG
    select.addEventListener('focus', function() {
      const svg = this.parentElement.querySelector('svg');
      if (svg) {
        svg.style.color = '#ea7425';
      }
    });
    
    select.addEventListener('blur', function() {
      const svg = this.parentElement.querySelector('svg');
      if (svg) {
        svg.style.color = '#6e6e6e';
      }
    });
  });
  
  // Função para limpar todos os filtros
  function clearAllFilters() {
    filterSelects.forEach(select => {
      select.value = '';
      select.style.color = '#6e6e6e';
      select.style.fontWeight = '400';
    });
    
    // Mostrar todos os itens
    const contentItems = document.querySelectorAll('.content-item, .document-item, .accordion-item');
    contentItems.forEach(item => {
      item.style.display = '';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
    
    // Fechar os filtros após limpar
    if (isFilterOpen) {
      toggleFilters();
    }
  }
  
  // Adicionar funcionalidade de tecla ESC para limpar filtros
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (isFilterOpen) {
        toggleFilters();
      } else {
        clearAllFilters();
      }
    }
  });
  
  // Inicialização: verificar se há filtros pré-selecionados via URL
  function initializeFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    let hasFilters = false;
    
    filterSelects.forEach(select => {
      const paramValue = urlParams.get(select.name);
      if (paramValue) {
        select.value = paramValue;
        select.style.color = '#3b3b3b';
        select.style.fontWeight = '500';
        hasFilters = true;
      }
    });
    
    // Se há filtros na URL, abrir o painel automaticamente
    if (hasFilters && !isFilterOpen) {
      setTimeout(() => {
        toggleFilters();
      }, 500);
    }
    
    // Aplicar filtros se houver parâmetros na URL
    if (urlParams.toString()) {
      applyFilters();
    }
  }
  
  // Inicializar filtros da URL
  initializeFiltersFromURL();
  
  // Adicionar indicador visual quando há filtros ativos
  function updateFilterButton() {
    const activeFilters = Array.from(filterSelects).filter(select => select.value);
    
    if (activeFilters.length > 0) {
      filterButton.classList.add('has-active-filters');
      filterButton.style.position = 'relative';
      
      // Adicionar badge de contagem se não existir
      if (!filterButton.querySelector('.filter-badge')) {
        const badge = document.createElement('span');
        badge.className = 'filter-badge';
        badge.textContent = activeFilters.length;
        badge.style.cssText = `
          position: absolute;
          top: -8px;
          right: -8px;
          background: #dc2626;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          z-index: 10;
        `;
        filterButton.appendChild(badge);
      } else {
        filterButton.querySelector('.filter-badge').textContent = activeFilters.length;
      }
    } else {
      filterButton.classList.remove('has-active-filters');
      const badge = filterButton.querySelector('.filter-badge');
      if (badge) {
        badge.remove();
      }
    }
  }
  
  // Atualizar badge quando filtros mudarem
  filterSelects.forEach(select => {
    select.addEventListener('change', updateFilterButton);
  });
  
  // Inicializar badge
  updateFilterButton();
});

// Accordion Component Integration with Bootstrap
document.addEventListener("DOMContentLoaded", function () {
  // Funcionalidade de download de arquivos
  window.downloadFile = function(filename) {
    // Simular download - substituir por lógica real de download
    console.log('Downloading file:', filename);
    
    // Criar elemento temporário para download
    const link = document.createElement('a');
    link.href = `/downloads/${filename}`; // Ajustar caminho conforme necessário
    link.download = filename;
    link.target = '_blank';
    
    // Adicionar feedback visual
    const downloadBtn = event.target.closest('.download-btn');
    if (downloadBtn) {
      const originalContent = downloadBtn.innerHTML;
      downloadBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2"/>
        </svg>
      `;
      downloadBtn.style.background = '#22c55e';
      downloadBtn.style.borderColor = '#22c55e';
      
      setTimeout(() => {
        downloadBtn.innerHTML = originalContent;
        downloadBtn.style.background = '';
        downloadBtn.style.borderColor = '';
      }, 2000);
    }
    
    // Tentar fazer o download
    try {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      alert('Erro ao fazer download do arquivo. Tente novamente.');
    }
  };
  
  // Configurar eventos dos accordions para controle exclusivo
  const accordionElement = document.getElementById('estatutosAccordion');
  
  if (accordionElement) {
    // Evento quando um accordion está prestes a abrir
    accordionElement.addEventListener('show.bs.collapse', function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(`[data-bs-target="#${targetCollapse.id}"]`);
      
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
      
      // Adicionar classe active ao botão que está abrindo
      if (targetButton) {
        targetButton.classList.remove('collapsed');
      }
    });
    
    // Evento quando um accordion foi aberto
    accordionElement.addEventListener('shown.bs.collapse', function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(`[data-bs-target="#${targetCollapse.id}"]`);
      
      if (targetButton) {
        targetButton.setAttribute('aria-expanded', 'true');
        
        // Scroll suave até o accordion aberto
        setTimeout(() => {
          targetCollapse.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }, 300);
      }
    });
    
    // Evento quando um accordion foi fechado
    accordionElement.addEventListener('hidden.bs.collapse', function (event) {
      const targetCollapse = event.target;
      const targetButton = document.querySelector(`[data-bs-target="#${targetCollapse.id}"]`);
      
      if (targetButton) {
        targetButton.classList.add('collapsed');
        targetButton.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Filter logic removed - backend will handle all filtering functionality
});
