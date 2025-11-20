document.addEventListener("DOMContentLoaded", function() {
  console.log("Website MIPA siap digunakan");

  const mainNavbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const scrollThreshold = 50; 

  // 1. Fungsi Header Shrink saat scroll
  window.onscroll = function() {
    if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
      mainNavbar.classList.add("scrolled");
    } else {
      mainNavbar.classList.remove("scrolled");
    }
  };

  // 2. Smooth Scroll untuk semua tautan navigasi
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            
            const offsetPosition = targetElement.offsetTop - mainNavbar.offsetHeight;

            window.scrollTo({
                top: offsetPosition, 
                behavior: 'smooth'
            });
        }
    });
  });

  // 3. Active State pada Navbar saat Scroll (Intersection Observer)
  // Fungsi ini membuat tombol biru pindah otomatis sesuai posisi layar
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Memicu saat elemen di tengah layar
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hapus kelas active dari semua link
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Tambah kelas active ke link yang sesuai dengan section ID
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 4. Handling Form Kontak
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault(); 
          
          const nama = document.getElementById('nama').value;
          const email = document.getElementById('email').value;
          const pesan = document.getElementById('pesan').value;

          if(nama && email && pesan) {
              console.log("Data Terkirim:", { nama, email, pesan });
              alert(`Terima kasih, ${nama}. Pesan Anda telah kami terima.`);
              contactForm.reset();
          }
      });
  }

});