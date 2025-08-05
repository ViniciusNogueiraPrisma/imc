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
