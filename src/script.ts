// Initialize AOS
// We need to wait for the script to load if it's from CDN, or we can assume it's loaded in HTML
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  if (typeof AOS !== 'undefined') {
    // @ts-ignore
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && closeMenuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('closed');
      mobileMenu.classList.add('open');
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('closed');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenu.classList.add('closed');
      });
    });
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Handle root path
    if (currentPath === '/' && (href === '/' || href === '/index.html')) {
      link.classList.add('text-terracotta');
      link.classList.remove('text-espresso');
    } else if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('text-terracotta');
      link.classList.remove('text-espresso');
    }
  });

  // Menu Filtering
  const filterBtns = document.querySelectorAll('.menu-tab');
  const menuItems = document.querySelectorAll('.menu-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        menuItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (category === 'all' || itemCategory === category) {
            (item as HTMLElement).style.display = 'block';
            // Add animation
            item.classList.add('fade-in-up');
            setTimeout(() => item.classList.remove('fade-in-up'), 800);
          } else {
            (item as HTMLElement).style.display = 'none';
          }
        });
      });
    });
  }

  // Reservation Form Handling
  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(reservationForm as HTMLFormElement);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const date = formData.get('date');
      const time = formData.get('time');
      const guests = formData.get('guests');
      const requests = formData.get('requests') || 'None';

      const message = `*New Table Reservation*%0A%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0ATime: ${time}%0AGuests: ${guests}%0ASpecial Requests: ${requests}`;
      
      const whatsappUrl = `https://wa.me/918390083077?text=${message}`;
      
      // Show confirmation alert or modal if needed, but request says redirect
      window.open(whatsappUrl, '_blank');
      
      // Optional: Reset form
      (reservationForm as HTMLFormElement).reset();
      
      alert("We'll confirm your table via WhatsApp within 30 minutes!");
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Floating Contact Buttons
  const container = document.createElement('div');
  container.className = 'fixed bottom-6 left-6 z-40 flex flex-col gap-4';
  
  // Phone Button
  const phoneBtn = document.createElement('a');
  phoneBtn.href = 'tel:+918390083077';
  phoneBtn.className = 'w-14 h-14 bg-terracotta text-white rounded-full shadow-lg flex items-center justify-center hover:bg-espresso transition-all duration-300 hover:scale-110 focus:outline-none';
  phoneBtn.setAttribute('aria-label', 'Call Us');
  phoneBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  
  // WhatsApp Button
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/918390083077';
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.className = 'w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 focus:outline-none';
  whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
  whatsappBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
  
  container.appendChild(whatsappBtn);
  container.appendChild(phoneBtn);
  document.body.appendChild(container);
});
