document.addEventListener("DOMContentLoaded", function() {
  console.log("Landing page siap digunakan");

  const mainNavbar = document.getElementById('mainNavbar');
  const scrollThreshold = 50; 

  // Fungsi untuk efek Header Shrink
  window.onscroll = function() {
    if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
      mainNavbar.classList.add("scrolled");
    } else {
      mainNavbar.classList.remove("scrolled");
    }
  };

  // 1. Implementasi Smooth Scroll untuk semua tautan internal
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Hanya jalankan smooth scroll jika ID tujuan ada di halaman
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();

            // Gulir secara halus ke elemen tujuan
            window.scrollTo({
                top: targetElement.offsetTop - mainNavbar.offsetHeight, // Mengurangi tinggi navbar sticky
                behavior: 'smooth'
            });
            
            console.log(`Smooth scroll ke section: ${targetId} berhasil.`);
        } else {
             // Jika link mengarah ke # yang tidak ada di halaman utama (misal #program yang sebenarnya sub-halaman)
             e.preventDefault();
             console.log(`Tautan navigasi "${this.textContent}" diklik, tetapi tidak ada section yang sesuai.`);
        }
    });
  });

  // Interaksi Tombol CTA (Tautan CTA kini sudah terintegrasi dengan smooth scroll)
  const ctaButton = document.getElementById('cta-button');

  if (ctaButton) {
    ctaButton.addEventListener('click', function(event) {
        // Smooth scroll sudah dihandle oleh querySelectorAll di atas
    });
  }

});