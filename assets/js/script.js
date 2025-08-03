'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Updated filter function to support multiple categories
const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    
    // The main change is using .includes() to check for the category.
    if (filterItems[i].dataset.category.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event listener to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const clickedLink = this; // The button that was clicked
    const targetPageName = clickedLink.innerHTML.toLowerCase();

    // Loop through all pages to show/hide them
    for (let j = 0; j < pages.length; j++) {
      if (targetPageName === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Loop through all links to set the active style
    for (let k = 0; k < navigationLinks.length; k++) {
      if (clickedLink === navigationLinks[k]) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }

    window.scrollTo(0, 0);
  });
}

// --- SCROLL BUTTONS FOR TECH STACK ---
document.addEventListener('DOMContentLoaded', () => {
  const allScrollingWrappers = document.querySelectorAll('.scrolling-wrapper');

  allScrollingWrappers.forEach(wrapper => {
    const scrollList = wrapper.querySelector('.clients-list');
    const prevBtn = wrapper.querySelector('[data-scroll-btn="prev"]');
    const nextBtn = wrapper.querySelector('[data-scroll-btn="next"]');

    if (scrollList && prevBtn && nextBtn) {
      
      const calculateScrollAmount = () => {
        const firstItem = scrollList.querySelector('.clients-item');
        if (!firstItem) return 250; // Default value if no items

        const listStyles = window.getComputedStyle(scrollList);
        const gap = parseFloat(listStyles.gap) || 20; // Get gap from CSS

        return firstItem.offsetWidth + gap; // Calculate width of one item + gap
      };

      nextBtn.addEventListener('click', () => {
        const scrollAmount = calculateScrollAmount();
        scrollList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', () => {
        const scrollAmount = calculateScrollAmount();
        scrollList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
  });
});

// --- Conditionally Load ClustrMaps on Live Site Only ---
const liveHostname = 'ks-mohit.github.io';
if (window.location.hostname === liveHostname) {
  const clustrMapScript = document.createElement('script');
  clustrMapScript.type = 'text/javascript';
  clustrMapScript.id = 'clustrmaps';
  clustrMapScript.src = '//clustrmaps.com/map_v2.js?d=qbshG7xcbGwHrIzZKOevBIletzGzMGhwLU-cjmiVwn8&cl=ffffff&w=a';
  document.querySelector('.visitor-map').appendChild(clustrMapScript);
}

// --- Run Filter on Page Load ---
window.addEventListener("load", () => {
  const initialFilterBtn = document.querySelector(".filter-list .active");
  if (initialFilterBtn) {
    filterFunc(initialFilterBtn.innerText.toLowerCase());
  }
});