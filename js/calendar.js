// Calendário de Eventos - JavaScript funcional
class EventCalendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedMonth = new Date().getMonth();
    this.selectedYear = new Date().getFullYear();
    this.monthSelector = document.getElementById('monthSelector');
    this.calendarGrid = document.getElementById('calendarGrid');
    
    // Eventos de exemplo seguindo o design do Figma
    this.events = {
      '2025-07-04': { type: 'divulgacao', title: 'Divulgação de Resultados 2T25' },
      '2025-07-06': { type: 'conferencia', title: 'Teleconferência' },
      '2025-07-10': { type: 'assembleia', title: 'Assembleia Geral' },
      '2025-07-30': { type: 'outros', title: 'Investor Day' },
      '2025-07-08': { type: 'conferencia', title: 'Teleconferência' },
      '2025-07-16': { type: 'assembleia', title: 'Assembleia Geral Extraordinária' },
      '2025-07-31': { type: 'outros', title: 'Apresentação Corporativa' }
    };

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCalendar();
    this.setupFilters();
  }

  setupEventListeners() {
    if (this.monthSelector) {
      this.monthSelector.addEventListener('change', (e) => {
        const [year, month] = e.target.value.split('-');
        this.selectedYear = parseInt(year);
        this.selectedMonth = parseInt(month) - 1;
        this.updateCalendar();
      });
    }
  }

  updateCalendar() {
    if (!this.calendarGrid) return;

    this.calendarGrid.innerHTML = '';
    
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1);
    const lastDay = new Date(this.selectedYear, this.selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Dias do mês anterior (cinza)
    const prevMonth = new Date(this.selectedYear, this.selectedMonth, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      const dayElement = this.createDayElement(day, 'prev-month');
      this.calendarGrid.appendChild(dayElement);
    }

    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayElement = this.createDayElement(day, 'current-month', dateStr);
      
      // Verificar se é hoje
      const today = new Date();
      if (
        this.selectedYear === today.getFullYear() &&
        this.selectedMonth === today.getMonth() &&
        day === today.getDate()
      ) {
        dayElement.classList.add('today');
      }

      // Verificar se tem evento
      if (this.events[dateStr]) {
        dayElement.classList.add('has-event', this.events[dateStr].type);
        dayElement.title = this.events[dateStr].title;
      }

      this.calendarGrid.appendChild(dayElement);
    }

    // Dias do próximo mês (cinza)
    const totalCells = this.calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 semanas * 7 dias = 42 células
    for (let day = 1; day <= remainingCells; day++) {
      const dayElement = this.createDayElement(day, 'next-month');
      this.calendarGrid.appendChild(dayElement);
    }
  }

  createDayElement(day, monthClass, dateStr = null) {
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${monthClass}`;
    dayElement.textContent = day;
    
    if (dateStr && this.events[dateStr]) {
      dayElement.addEventListener('click', () => {
        this.showEventDetails(dateStr);
      });
    }

    return dayElement;
  }

  showEventDetails(dateStr) {
    const event = this.events[dateStr];
    if (event) {
      alert(`Evento: ${event.title}\nData: ${dateStr}\nTipo: ${event.type}`);
    }
  }

  setupFilters() {
    // Setup dos filtros existentes
    const filterButton = document.querySelector('[data-filter-toggle]');
    const filterOptions = document.querySelector('[data-filter-options]');
    const filterItems = document.querySelectorAll('[data-filter-item]');

    if (filterButton && filterOptions) {
      filterButton.addEventListener('click', () => {
        filterButton.classList.toggle('active');
        filterOptions.classList.toggle('show');
        
        // Animar os itens de filtro
        if (filterOptions.classList.contains('show')) {
          setTimeout(() => {
            filterItems.forEach(item => {
              item.classList.add('animate-in');
            });
          }, 50);
        } else {
          filterItems.forEach(item => {
            item.classList.remove('animate-in');
          });
        }
      });
    }

    // Setup dos filtros de eventos realizados
    const anoFilter = document.getElementById('anoFilter');
    const tipoFilter = document.getElementById('tipoFilter');

    if (anoFilter) {
      anoFilter.addEventListener('change', () => {
        this.filterEventosRealizados();
      });
    }

    if (tipoFilter) {
      tipoFilter.addEventListener('change', () => {
        this.filterEventosRealizados();
      });
    }
  }

  filterEventosRealizados() {
    const anoFilter = document.getElementById('anoFilter');
    const tipoFilter = document.getElementById('tipoFilter');
    const eventItems = document.querySelectorAll('.evento-realizado-item');

    const selectedYear = anoFilter ? anoFilter.value : '';
    const selectedType = tipoFilter ? tipoFilter.value : '';

    eventItems.forEach(item => {
      const itemYear = item.getAttribute('data-year');
      const itemType = item.getAttribute('data-type');

      let showItem = true;

      if (selectedYear && itemYear !== selectedYear) {
        showItem = false;
      }

      if (selectedType && itemType !== selectedType) {
        showItem = false;
      }

      item.style.display = showItem ? 'grid' : 'none';
    });
  }

  // Métodos para adicionar eventos ao Gmail/Outlook
  addToGmail(eventData) {
    const { title, date, description } = eventData;
    const startDate = new Date(date + 'T15:00:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(date + 'T16:00:00').toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description || '')}`;
    
    window.open(googleUrl, '_blank');
  }

  addToOutlook(eventData) {
    const { title, date, description } = eventData;
    const startDate = new Date(date + 'T15:00:00').toISOString();
    const endDate = new Date(date + 'T16:00:00').toISOString();
    
    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(description || '')}`;
    
    window.open(outlookUrl, '_blank');
  }
}

// Inicializar o calendário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const calendar = new EventCalendar();

  // Adicionar event listeners para os botões de Gmail e Outlook
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-gmail')) {
      e.preventDefault();
      const eventItem = e.target.closest('.evento-item');
      if (eventItem) {
        const title = eventItem.querySelector('h4').textContent;
        const date = eventItem.querySelector('.evento-data').textContent;
        const description = eventItem.querySelector('p').textContent;
        
        // Converter data do formato DD/MM/YYYY para YYYY-MM-DD
        const [day, month, year] = date.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        calendar.addToGmail({ title, date: formattedDate, description });
      }
    }

    if (e.target.closest('.btn-outlook')) {
      e.preventDefault();
      const eventItem = e.target.closest('.evento-item');
      if (eventItem) {
        const title = eventItem.querySelector('h4').textContent;
        const date = eventItem.querySelector('.evento-data').textContent;
        const description = eventItem.querySelector('p').textContent;
        
        // Converter data do formato DD/MM/YYYY para YYYY-MM-DD
        const [day, month, year] = date.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        calendar.addToOutlook({ title, date: formattedDate, description });
      }
    }
  });
});
