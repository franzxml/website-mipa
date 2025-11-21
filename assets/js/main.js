// Menunggu seluruh konten DOM selesai dimuat sebelum menjalankan script
// Hal ini memastikan elemen sudah dapat diakses oleh JavaScript
document.addEventListener("DOMContentLoaded", function() {
  console.log("Website MIPA siap digunakan");

  // Mendapatkan elemen navbar utama
  const mainNavbar = document.getElementById('mainNavbar');

  // Mendapatkan semua link navigasi
  const navLinks = document.querySelectorAll('.nav-link');

  // Mengambil seluruh elemen section untuk memantau posisi scroll
  const sections = document.querySelectorAll('section');

  // Batas scroll untuk memicu efek shrink pada navbar
  const scrollThreshold = 50;

  // =============================================================
  // 1. Efek Navbar Mengecil (Shrink) ketika di-scroll
  // =============================================================
  window.onscroll = function() {
    // Mengecek apakah user telah scroll lebih dari batas
    if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
      // Tambahkan class untuk efek shrink
      mainNavbar.classList.add("scrolled");
    } else {
      // Hapus class shrink ketika kembali ke atas
      mainNavbar.classList.remove("scrolled");
    }
  };

  // =============================================================
  // 2. Smooth Scroll untuk Link Navigasi
  // =============================================================
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href'); // Contoh: #program
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault(); // Mencegah lompatan tiba-tiba

        // Mengatur jarak agar posisi section tidak tertutup navbar
        const offsetPosition = targetElement.offsetTop - mainNavbar.offsetHeight;

        // Melakukan scroll halus menuju posisi section
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
      }
    });
  });

  // =============================================================
  // 3. Memberi Highlight (Active State) pada Navbar saat Scroll
  //    Menggunakan Intersection Observer
  // =============================================================

  // Pengaturan area pemantauan (trigger ketika elemen berada di tengah layar)
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  // Membuat observer baru untuk memantau setiap section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hapus kelas active dari semua link navigasi
        navLinks.forEach(link => link.classList.remove('active'));

        // Tambahkan kelas active pada link yang sesuai dengan ID section
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Menjalankan observer untuk masing-masing section
  sections.forEach(section => {
    observer.observe(section);
  });

  // =============================================================
  // 4. Form Kontak (Validasi dan Pesan Notifikasi)
  // =============================================================

  const contactForm = document.getElementById('contactForm');

  // Mengecek apakah form ada di halaman
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        // Validasi sederhana: semua input harus terisi
        if(nama && email && pesan) {
            console.log("Data Terkirim:", { nama, email, pesan });

            // Menampilkan notifikasi sederhana kepada pengguna
            alert(`Terima kasih, ${nama}. Pesan Anda telah kami terima.`);

            // Reset form setelah dikirim
            contactForm.reset();
        }
    });
  }

});