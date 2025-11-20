document.addEventListener("DOMContentLoaded", function() {
  console.log("Website MIPA siap digunakan");

  const mainNavbar = document.getElementById('mainNavbar');
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
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            
            // Menghitung posisi offset dikurangi tinggi navbar agar tidak tertutup
            const offsetPosition = targetElement.offsetTop - mainNavbar.offsetHeight;

            window.scrollTo({
                top: offsetPosition, 
                behavior: 'smooth'
            });
        }
    });
  });

  // 3. Handling Form Kontak
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault(); // Mencegah reload halaman
          
          // Mengambil nilai input
          const nama = document.getElementById('nama').value;
          const email = document.getElementById('email').value;
          const pesan = document.getElementById('pesan').value;

          // Validasi sederhana (opsional karena atribut 'required' di HTML sudah menangani ini)
          if(nama && email && pesan) {
              console.log("Data Terkirim:", { nama, email, pesan });
              
              // Simulasi pengiriman sukses
              alert(`Terima kasih, ${nama}. Pesan Anda telah kami terima. Kami akan menghubungi ${email} segera.`);
              
              // Reset form
              contactForm.reset();
          }
      });
  }

});