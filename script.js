document.addEventListener("DOMContentLoaded", () => {
  
  function showSection(id) {
  // If id is 'home' or empty, default to home
  const targetId = (id === "home" || !id) ? "home" : id;
  
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
    sec.classList.remove("block");
  });

  const section = document.getElementById(targetId);
  if (section) {
    section.classList.remove("hidden");
    section.classList.add("block");
    window.scrollTo(0, 0);
  }

  // --- ADD THIS PART TO RESET THE URL ---
  if (targetId === "home") {
    // This removes the #delivery-info from the URL bar
    history.pushState("", document.title, window.location.pathname);
  } else {
    // This keeps the #gallery or #contact for other pages
    window.location.hash = targetId;
  }
}

// Keep the rest of your listeners as they are
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href').substring(1);
    showSection(id);
  });
});

const initialId = window.location.hash.substring(1);
showSection(initialId || "home");

  // --- Slideshow ---
  let slideIndex = 0;
  function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slides.length > 0) {
      slides[slideIndex - 1].style.display = "block";
    }
    setTimeout(showSlides, 3000);
  }
  showSlides();

  // --- Sidebar & Nav Logic ---
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.close-btn');

  if (menuToggle && sidebar && closeBtn) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('left-0');
      sidebar.classList.toggle('-left-64');
    });
    closeBtn.addEventListener('click', () => {
      sidebar.classList.add('-left-64');
      sidebar.classList.remove('left-0');
    });
  }

  document.querySelectorAll('.main-nav a, .sidebar a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        showSection(targetId);
        if (sidebar) {
          sidebar.classList.add('-left-64');
          sidebar.classList.remove('left-0');
        }
      }
    });
  });

  // --- Fixed Pagination Logic ---
  function setupPagination(gridSelector, paginationSelector, itemsPerPage) {
    const grid = document.querySelector(gridSelector);
    const pagination = document.querySelector(paginationSelector);
    if (!grid || !pagination) return;

    const items = Array.from(grid.children);
    let currentPage = 1;

    function showPage(page) {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      currentPage = page;

      items.forEach((item, index) => {
        const isVisible = index >= (page - 1) * itemsPerPage && index < page * itemsPerPage;
        item.style.display = isVisible ? "flex" : "none";
      });

      pagination.innerHTML = "";

      if (page > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.className = "w-10 h-10 flex items-center justify-center rounded-full bg-pink-400 text-white hover:bg-pink-500 transition mr-2";
        prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prev.onclick = e => { e.preventDefault(); showPage(page - 1); };
        pagination.appendChild(prev);
      }

      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.className = "px-3 py-1 mx-1 rounded transition " +
          (i === currentPage ? "bg-pink-500 text-white font-bold" : "bg-pink-200 text-black hover:bg-pink-300");
        pageLink.textContent = i;
        pageLink.onclick = e => { e.preventDefault(); showPage(i); };
        pagination.appendChild(pageLink);
      }

      if (page < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.className = "w-10 h-10 flex items-center justify-center rounded-full bg-pink-400 text-white hover:bg-pink-500 transition ml-2";
        next.innerHTML = '<i class="fas fa-chevron-right"></i>';
        next.onclick = e => { e.preventDefault(); showPage(page + 1); };
        pagination.appendChild(next);
      }
    }
    showPage(currentPage);
  }

  // --- Dynamic Initialization ---
  function initAllPagination() {
    // Gallery: If mobile (< 768px) show 4 items (2x2). If laptop, show 5 items.
    const galleryCount = window.innerWidth < 768 ? 4 : 5;
    setupPagination("#gallery .gallery", "#gallery .pagination", galleryCount);

    // Portfolio: stays at 3 items (1 row)
    setupPagination("#portfolio .portfolio-grid", "#portfolio .pagination", 3);
  }

  // Run on load
  initAllPagination();

  // Re-run if window is resized (like rotating a phone)
  window.addEventListener("resize", () => {
    initAllPagination();
  });

// --- Section hash navigation ---
  function handleHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      showSection(hash);
    } else {
      showSection("home");
    }
  }

  // 1. Run when page first loads
  handleHash();

  // 2. Run whenever the URL hash changes (fixes the button click issue)
  window.addEventListener("hashchange", handleHash);

});

document.addEventListener("DOMContentLoaded", () => {
    const messages = [
        "Chat to Buy! 🌸",
        "Ask an Inquiry? ✨",
        "Check Availability! 📅"
    ];

    let currentIndex = 0;
    const bubble = document.getElementById("chat-bubble");
    const textElement = document.getElementById("chat-text");

    // Safety Check: If bubble doesn't exist, stop here.
    if (!bubble || !textElement) {
        console.error("Telegram bubble elements not found!");
        return;
    }

    function cycleMessages() {
        // 1. Fade Out
        bubble.classList.add("opacity-0", "translate-x-5");
        
        setTimeout(() => {
            // 2. Change Text while invisible
            currentIndex = (currentIndex + 1) % messages.length;
            textElement.textContent = messages[currentIndex];
            
            // 3. Fade In
            bubble.classList.remove("opacity-0", "translate-x-5");
        }, 1000); 
    }

    // Start the cycle every 6 seconds
    setInterval(cycleMessages, 6000);

    // Initial Appearance
    setTimeout(() => {
        bubble.classList.remove("opacity-0", "translate-x-5");
        console.log("Chat bubble activated!");
    }, 2000);
});