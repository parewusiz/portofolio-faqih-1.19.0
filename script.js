/* =========================================
   PORTFOLIO WEBSITE - INTERACTIONS
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = [...document.querySelectorAll(".nav-link")];

  // Navbar active state + smooth navigation
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Navbar: pil biru meluncur halus + bola senyum yang mengikuti
  const navMenu = document.querySelector(".nav-menu");
  const pill = document.querySelector(".nav-pill"), hoverPill = document.querySelector(".nav-hover");
  const mascot = document.querySelector(".nav-mascot");
  let mascotLink = null;
  const place = (el, link) => { el.style.width = link.offsetWidth + "px"; el.style.transform = `translateX(${link.offsetLeft}px)`; };
  const moveMascot = link => {
    if (!mascot || !link || link === mascotLink) return;
    mascotLink = link;
    mascot.style.translate = `${link.offsetLeft + link.offsetWidth / 2 - mascot.offsetWidth / 2}px 0`;
    mascot.classList.remove("hop"); void mascot.offsetWidth; mascot.classList.add("hop");
  };
  const activeLink = () => navLinks.find(l => l.classList.contains("active")) || navLinks[0];
  const syncNav = () => { const a = activeLink(); if (pill && a) { place(pill, a); moveMascot(a); } };
  navLinks.forEach(l => l.addEventListener("mouseenter", () => { place(hoverPill, l); hoverPill.classList.add("on"); moveMascot(l); }));
  navMenu?.addEventListener("mouseleave", () => { hoverPill?.classList.remove("on"); moveMascot(activeLink()); });
  if (navMenu) new MutationObserver(syncNav).observe(navMenu, { attributes: true, subtree: true, attributeFilter: ["class"] });
  addEventListener("resize", () => { mascotLink = null; syncNav(); });
  document.fonts?.ready.then(() => { mascotLink = null; syncNav(); });
  syncNav();

  // ===== DATA PORTOFOLIO: foto & teks diatur dari sini (taruh file di folder images/) =====
  const portfolioData = {
    Projects: [
      { title: "Project 01", description: "Karya project pertama.", image: "images/project-01.svg" },
      { title: "Project 02", description: "Karya project kedua.", image: "images/project-02.svg" },
      { title: "Project 03", description: "Karya project ketiga.", image: "images/project-03.svg" },
      { title: "Project 04", description: "Karya project keempat.", image: "images/project-04.svg" },
      { title: "Project 05", description: "Deskripsi singkat karya ini.", image: "images/project-05.svg" },
      { title: "Project 06", description: "Deskripsi singkat karya ini.", image: "images/project-06.svg" }
    ],
    Certificates: [
      { title: "Certificate 01", description: "Sertifikat kegiatan atau pelatihan.", image: "images/certificate-01.svg" },
      { title: "Certificate 02", description: "Sertifikat kegiatan atau pelatihan.", image: "images/certificate-02.svg" },
      { title: "Certificate 03", description: "Sertifikat kegiatan atau pelatihan.", image: "images/certificate-03.svg" },
      { title: "Certificate 04", description: "Sertifikat kegiatan atau pelatihan.", image: "images/certificate-04.svg" },
      { title: "Certificate 05", description: "Deskripsi singkat karya ini.", image: "images/certificate-05.svg" },
      { title: "Certificate 06", description: "Deskripsi singkat karya ini.", image: "images/certificate-06.svg" }
    ],
    Awards: [
      { title: "Award 01", description: "Penghargaan pertama.", image: "images/award-01.svg" },
      { title: "Award 02", description: "Penghargaan kedua.", image: "images/award-02.svg" },
      { title: "Award 03", description: "Penghargaan ketiga.", image: "images/award-03.svg" },
      { title: "Award 04", description: "Penghargaan keempat.", image: "images/award-04.svg" },
      { title: "Award 05", description: "Deskripsi singkat karya ini.", image: "images/award-05.svg" },
      { title: "Award 06", description: "Deskripsi singkat karya ini.", image: "images/award-06.svg" }
    ]
  };

  // ===== DATA PENDIDIKAN & PENGALAMAN: edit di sini =====
  const timelineData = {
    // ============================================================
    // FOTO KOTAK KECIL (bentuk kotak tidak berubah, cuma isinya foto)
    // Isi "logo" salah satu dari cara ini:
    //   1) Nama file di folder images/ :  logo: "images/edu-2.jpg"   (jpg / png / webp)
    //   2) Kode img                    :  logo: '<img src="images/edu-2.png">'
    //   3) Tertanam di kode (tanpa file terpisah, tidak bisa diganti orang):
    //      logo: "data:image/png;base64,AAAA..."
    // Folder images/ harus sejajar dengan index.html.
    // Kalau fotonya belum ada, kotak menampilkan huruf pertama nama.
    // ============================================================
    Education: [
      { logo: "images/edu-1.png", title: "SMKN 1 WAJO", year: "2025 – Present", headline: "Siswa Jurusan Desain Komunikasi Visual", sub: "Vocational High School", tag: "DKV" },
      { logo: "images/edu-2.png", title: "MTS DARUSSALAM IMPA-IMPA", year: "2024 – 2025", headline: "Siswa Madrasah", sub: "Islamic Junior High School", tag: "MTS" },
      { logo: "images/edu-3.png", title: "MTS AS'ADIYAH PUTRA 2 PUSAT SENGKANG", year: "2022 – 2024", headline: "Santri As'adiyah", sub: "Islamic Junior High School", tag: "MTS" },
      { logo: "images/edu-4.png", title: "SDN 26 PAJALELE", year: "2016 – 2022", headline: "Siswa Sekolah Dasar", sub: "Elementary School", tag: "SDN" },
      { logo: "images/edu-5.png", title: "TK ISLAM AL-HIDAYAH PAJALELE", year: "2015 – 2016", headline: "Siswa Tk Al-Hidayah", sub: "Kindergarten", tag: "TK" },
      { logo: "images/edu-6.png", title: "PAUD", year: "20XX – 20XX", headline: "-", sub: "Early Childhood Education atau Pre-school.", tag: "PD" }
    ],
    Experience: [
      { logo: "images/exp-1.png", title: "Pandu Digital", year: "2025", headline: "Anggota", sub: "Instansi", tag: "SMK" },
      { logo: "images/exp-2.png", title: "Nama Pengalaman 2", year: "20XX", headline: "Posisi / Jabatan", sub: "Instansi", tag: "Role" },
      { logo: "images/exp-3.png", title: "Nama Pengalaman 3", year: "20XX", headline: "Posisi / Jabatan", sub: "Instansi", tag: "Role" },
      { logo: "images/exp-4.png", title: "Nama Pengalaman 4", year: "20XX", headline: "Posisi / Jabatan", sub: "Instansi", tag: "Role" },
      { logo: "images/exp-5.png", title: "Nama Pengalaman 5", year: "20XX", headline: "Posisi / Jabatan", sub: "Instansi", tag: "Role" },
      { logo: "images/exp-6.png", title: "Nama Pengalaman 6", year: "20XX", headline: "Posisi / Jabatan", sub: "Instansi", tag: "Role" }
    ]
  };
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Logo kotak kecil: isi dengan path gambar ("images/sekolah.png")
  // ATAU langsung kode img: '<img src="images/sekolah.png" alt="">'
  const logoHTML = v => {
    if (!v) return "";
    let s = String(v).trim();
    if (/^<img[\s>]/i.test(s)) {
      const m = s.match(/src\s*=\s*["']([^"']+)["']/i);
      if (!m) return "";
      s = m[1];
    }
    return `<img src="${esc(s)}" alt="" onload="this.parentNode.classList.add('has-img')" onerror="this.remove()">`;
  };

  const timelineRoot = document.querySelector("#timeline");
  if (timelineRoot) timelineRoot.innerHTML = Object.entries(timelineData).map(([name, items]) => `
    <div class="timeline-column"><h3>${name}</h3><div class="timeline-scroll">${items.map((it, i) => `
      <div class="timeline-item"><span class="timeline-number">${i + 1}</span>
        <div class="timeline-content">
          <div class="tl-head">
            <span class="tl-logo"><b>${esc(String(it.title).charAt(0))}</b>${logoHTML(it.logo)}</span>
            <h4>${esc(it.title)}</h4><span class="tl-year">${esc(it.year)}</span>
          </div>
          <p class="tl-headline">${esc(it.headline)}</p>
          <p class="tl-sub">${esc(it.sub)} <i></i> <span class="tl-tag">${esc(it.tag)}</span></p>
        </div>
      </div>`).join("")}
    </div></div>`).join("");

  const folderRoot = document.querySelector("#folders");
  if (folderRoot) folderRoot.innerHTML = Object.entries(portfolioData).map(([name, items]) => `
    <article class="folder-card" data-folder="${name}">
      <div class="folder-preview" aria-label="Preview ${name}">
        ${["one", "two", "three", "four"].map((n, i) => items[i] ? `<button class="folder-photo photo-${n}" data-folder="${name}" data-index="${i}" aria-label="Buka ${esc(items[i].title)}"><img src="${esc(items[i].image)}" alt="${esc(items[i].title)}"></button>` : "").join("")}
      </div>
      <div class="folder-info"><h2>${items.length}</h2><p>${name}</p><button type="button" class="folder-open" aria-label="Lihat semua ${name}">•••</button></div>
    </article>`).join("");

  // Reveal elements
  const revealElements = document.querySelectorAll(
    ".introduction, .timeline-item, .folder-card"
  );
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => {
      el.classList.add("scroll-reveal");
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  const tabs = [...document.querySelectorAll(".portfolio-tabs .tab")];
  const content = document.querySelector(".portfolio-content");

  function showPortfolio(category, selectedIndex = null) {
    if (!portfolioData[category] || !content) return;
    tabs.forEach(tab => {
      const active = tab.dataset.tab === category;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    content.dataset.category = category;
    content.innerHTML = portfolioData[category].map((item, index) => `
      <article class="portfolio-item ${selectedIndex === index ? "selected" : ""}" data-item-index="${index}">
        <button class="portfolio-image-open" type="button" aria-label="Perbesar ${item.title}">
          <img src="${item.image}" alt="${item.title}"
               onerror="this.classList.add('image-missing'); this.alt='Tambahkan JPG untuk ${item.title}'">
        </button>
        <span class="portfolio-item-caption">
          <strong>${item.title}</strong>
          <small>${item.description}</small>
        </span>
      </article>
    `).join("");

    carouselReset(selectedIndex);
    content.querySelectorAll(".portfolio-image-open").forEach(button => {
      button.addEventListener("click", () => {
        const index = Number(button.closest(".portfolio-item").dataset.itemIndex);
        openImageViewer(portfolioData[category][index]);
      });
    });
  }

  // Carousel galeri: geser ke samping + tombol kiri/kanan
  const prevBtn = document.querySelector(".carousel-btn.prev"), nextBtn = document.querySelector(".carousel-btn.next");
  function updateArrows() {
    if (!content || !prevBtn || !nextBtn) return;
    prevBtn.disabled = content.scrollLeft <= 4;
    nextBtn.disabled = content.scrollLeft >= content.scrollWidth - content.clientWidth - 4;
  }
  function carouselReset(index) {
    const card = index != null ? content.children[index] : null;
    content.scrollTo({ left: card ? card.offsetLeft - 24 : 0, behavior: card ? "smooth" : "auto" });
    requestAnimationFrame(updateArrows);
  }
  const cardStep = () => (content.children[0]?.offsetWidth || 400) + 28;
  prevBtn?.addEventListener("click", () => content.scrollBy({ left: -cardStep(), behavior: "smooth" }));
  nextBtn?.addEventListener("click", () => content.scrollBy({ left: cardStep(), behavior: "smooth" }));
  content?.addEventListener("scroll", updateArrows, { passive: true });
  addEventListener("resize", updateArrows);

  // Full-screen image viewer
  const viewer = document.createElement("div");
  viewer.className = "portfolio-viewer";
  viewer.innerHTML = `
    <div class="portfolio-viewer-panel" role="dialog" aria-modal="true" aria-label="Detail portofolio">
      <button type="button" class="viewer-close" aria-label="Tutup">&times;</button>
      <img class="viewer-image" alt="">
      <h2 class="viewer-title"></h2>
      <p class="viewer-description"></p>
    </div>`;
  document.body.appendChild(viewer);

  function openImageViewer(item) {
    const image = viewer.querySelector(".viewer-image");
    image.src = item.image;
    image.alt = item.title;
    image.onerror = () => image.classList.add("image-missing");
    image.onload = () => image.classList.remove("image-missing");
    viewer.querySelector(".viewer-title").textContent = item.title;
    viewer.querySelector(".viewer-description").textContent = item.description;
    viewer.classList.add("show");
    document.body.classList.add("viewer-open");
  }
  function closeImageViewer() {
    viewer.classList.remove("show");
    document.body.classList.remove("viewer-open");
  }
  viewer.querySelector(".viewer-close").addEventListener("click", closeImageViewer);
  viewer.addEventListener("click", e => {
    if (e.target === viewer) closeImageViewer();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeImageViewer();
  });

  tabs.forEach(tab => tab.addEventListener("click", () => {
    showPortfolio(tab.dataset.tab);
  }));

  // Clicking any of the four folder photos selects its category and scrolls quickly
  // to the actual Portfolio gallery. The selected photo is highlighted.
  function jumpToPortfolio(category, index) {
    showPortfolio(category, index);
    const target = document.querySelector("#portfolio-content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.querySelectorAll(".folder-photo").forEach(photo => {
    photo.addEventListener("click", event => {
      event.stopPropagation();
      jumpToPortfolio(photo.dataset.folder, Number(photo.dataset.index));
    });
  });

  document.querySelectorAll(".folder-card").forEach(folder => {
    folder.addEventListener("click", event => {
      if (event.target.closest(".folder-photo, .folder-open")) return;
      jumpToPortfolio(folder.dataset.folder, 0);
    });
    folder.querySelector(".folder-open")?.addEventListener("click", event => {
      event.stopPropagation();
      jumpToPortfolio(folder.dataset.folder, 0);
    });
  });

  // Scroll-driven deep zoom: progress is mapped to a long sticky section.
  // Transforms are updated with requestAnimationFrame to keep scrolling smooth.
  const transition = document.querySelector(".portfolio-transition");
  const bigText = document.querySelector(".portfolio-big-text");
  const whiteWipe = document.querySelector(".portfolio-white-wipe");
  const scrollHint = document.querySelector(".portfolio-scroll-hint");

  if (transition && bigText && whiteWipe) {
    // Tulisan dipecah per huruf supaya zoom bisa masuk tepat ke huruf "T"
    bigText.innerHTML = [...bigText.textContent.trim()].map(c => `<span>${c}</span>`).join("");
    const letters = bigText.children;
    const tIndex = Math.max(0, bigText.textContent.toUpperCase().indexOf("T"));
    let tx0 = 0, ty0 = 0, S = 30, ticking = false;
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const smooth = v => v * v * (3 - 2 * v);

    const update = () => {
      const rect = transition.getBoundingClientRect();
      const p = clamp(-rect.top / Math.max(1, transition.offsetHeight - innerHeight));
      const e = Math.pow(clamp((p - 0.1) / 0.85), 2.2);   // awal diam, lalu makin cepat
      const m = smooth(clamp((p - 0.1) / 0.6));            // geser huruf T ke tengah layar
      const r = -7 * smooth(clamp((p - 0.06) / 0.5));      // miring sedikit
      bigText.style.transform = `translate(${(innerWidth / 2 - tx0) * m}px, ${(innerHeight / 2 - ty0) * m}px) rotate(${r}deg) scale(${1 + (S - 1) * e})`;
      whiteWipe.style.opacity = smooth(clamp((p - 0.9) / 0.1)); // penutup putih halus di akhir
      if (scrollHint) scrollHint.style.opacity = 1 - clamp(p / 0.12);
      ticking = false;
    };
    const measure = () => {
      bigText.style.transform = "none";
      const fs = parseFloat(getComputedStyle(bigText).fontSize), t = letters[tIndex];
      const ox = t.offsetLeft + t.offsetWidth / 2, oy = fs * 0.207; // tengah palang atas huruf T
      tx0 = bigText.offsetLeft + ox; ty0 = bigText.offsetTop + oy;
      S = Math.max(14, innerHeight * 1.5 / (0.14 * fs));
      bigText.style.transformOrigin = `${ox}px ${oy}px`;
      update();
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    measure();
  }

  // Timeline selection
  document.querySelectorAll(".timeline-column").forEach(column => {
    const items = [...column.querySelectorAll(".timeline-item")];
    if (items.length) items[0].classList.add("active");
    items.forEach(item => item.addEventListener("click", () => {
      items.forEach(other => other.classList.remove("active"));
      item.classList.add("active");
    }));
  });

  // Navbar section tracking: menu aktif mengikuti posisi scroll (Home → About → Portfolio → Contact)
  // (dulu pakai IntersectionObserver 35%, tapi bagian About terlalu panjang sehingga tidak pernah terdeteksi)
  const navTargets = ["home", "about", "portfolio", "contact"]
    .map(id => ({ id, el: document.getElementById(id) })).filter(t => t.el);
  let currentNav = null, navLock = false, navLockTimer = null, navTick = false;
  const pickNav = () => {
    const line = innerHeight * 0.4;                       // garis acuan di 40% tinggi layar
    let id = navTargets[0].id;
    navTargets.forEach(t => { if (t.el.getBoundingClientRect().top <= line) id = t.id; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) id = "contact";
    return id;
  };
  const updateNav = () => {
    navTick = false;
    if (navLock || !navTargets.length) return;
    const id = pickNav();
    if (id === currentNav) return;
    currentNav = id;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  };
  // saat menu diklik, tahan dulu supaya pil tidak "lari-lari" selama scroll halus
  navLinks.forEach(link => link.addEventListener("click", () => {
    currentNav = (link.getAttribute("href") || "").slice(1);
    navLock = true;
    clearTimeout(navLockTimer);
    navLockTimer = setTimeout(() => { navLock = false; updateNav(); }, 1800);
  }));
  addEventListener("scroll", () => {
    if (navLock) { clearTimeout(navLockTimer); navLockTimer = setTimeout(() => { navLock = false; updateNav(); }, 160); }
    if (!navTick) { navTick = true; requestAnimationFrame(updateNav); }
  }, { passive: true });
  addEventListener("resize", updateNav);
  updateNav();

  showPortfolio("Projects");
  // Cahaya timeline: makin dekat kursor, makin terang
  const glowItems = [...document.querySelectorAll(".timeline-item")];
  let glowTick = false, gx = -9999, gy = -9999;
  const paintGlow = () => {
    glowItems.forEach(item => {
      const r = item.getBoundingClientRect();
      const dx = Math.max(r.left - gx, 0, gx - r.right);
      const dy = Math.max(r.top - gy, 0, gy - r.bottom);
      item.style.setProperty("--glow", Math.max(0, 1 - Math.hypot(dx, dy) / 240).toFixed(3));
      item.style.setProperty("--mx", `${gx - r.left}px`);
      item.style.setProperty("--my", `${gy - r.top}px`);
    });
    glowTick = false;
  };
  document.addEventListener("scroll", () => { if (!glowTick && gx > -9000) { glowTick = true; requestAnimationFrame(paintGlow); } }, { capture: true, passive: true });
  window.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    gx = e.clientX; gy = e.clientY;
    if (!glowTick) { glowTick = true; requestAnimationFrame(paintGlow); }
  }, { passive: true });

  // ===== FOTO BERTEBARAN: transisi Portfolio → Contact =====
  // Taruh foto kenanganmu di folder images/ lalu tulis nama filenya di sini (jpg / png / webp, maksimal 12).
  // Jumlah foto yang tampil = jumlah yang kamu tulis. Mau 8 foto? Hapus 4 baris terakhir.
  // Kalau file belum ada, kartunya tampil kosong (tanpa ikon rusak).
  const scatterPhotos = [
    "images/kenangan-01.jpg",
    "images/kenangan-02.jpg",
    "images/kenangan-03.jpg",
    "images/kenangan-04.jpg",
    "images/kenangan-05.jpg",
    "images/kenangan-06.jpg",
    "images/kenangan-07.jpg",
    "images/kenangan-08.jpg",
    "images/kenangan-09.jpg",
    "images/kenangan-10.jpg",
    "images/kenangan-11.jpg",
    "images/kenangan-12.jpg"
  ];
  // ===== FOTO BERJEJER (PEMBARUAN 67): muncul SETELAH kenangan memudar, SEBELUM tulisan "Something Amazing" =====
  // Taruh foto di folder images/ lalu tulis namanya di sini (jpg / png / webp). Boleh berapa saja (disarankan 6-14).
  // Foto yang filenya belum ada otomatis dilewati. Kosongkan [] kalau mau pakai foto kenangan lagi.
  const galleryPhotos = [
    "images/galeri-01.jpg",
    "images/galeri-02.jpg",
    "images/galeri-03.jpg",
    "images/galeri-04.jpg",
    "images/galeri-05.jpg",
    "images/galeri-06.jpg",
    "images/galeri-07.jpg",
    "images/galeri-08.jpg",
    "images/galeri-09.jpg",
    "images/galeri-10.jpg"
  ];
  const scatterSection = document.querySelector("#scatter"), scatterRoot = document.querySelector(".scatter-photos");
  if (scatterSection && scatterRoot) {
    // [kiri %, atas %, lebar vw, putar derajat, kedalaman]
    const layout = [[5,12,15,-8,1.2],[26,5,17,5,.8],[49,9,16,-4,1.1],[71,6,18,7,.9],[84,33,14,-6,1.3],[3,46,17,6,.9],[24,55,15,-7,1.2],[45,50,18,4,1],[67,57,16,-5,1.1],[9,75,14,8,.8],[35,77,15,-3,1.3],[77,73,17,5,.9]];
    const srcs = (scatterPhotos.length ? scatterPhotos : Object.values(portfolioData).flatMap(list => list.slice(0, 4).map(i => i.image))).slice(0, layout.length);
    // kalau fotonya kurang dari 12, posisinya disebar merata
    const slots = srcs.map((_, k) => layout[Math.floor(k * layout.length / srcs.length)]);
    const photos = slots.map(([x, y, w, rot, depth], i) => {
      const el = document.createElement("div");
      el.className = "scatter-photo";
      el.style.cssText = `left:${x}%;top:${y}%;width:max(${w}vw,96px)`;
      el.innerHTML = `<img src="${esc(srcs[i])}" alt="" loading="lazy" draggable="false" onerror="this.style.visibility='hidden'">`;
      scatterRoot.appendChild(el);
      return { el, x, y, w, rot, depth };
    });
    const title = scatterSection.querySelector(".scatter-title");
    const c01 = v => Math.min(1, Math.max(0, v)), ease = v => v * v * (3 - 2 * v);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ----- FOTO BERJEJER: 2 baris foto sejajar, saling berlawanan arah mengikuti scroll, foto di tengah layar paling besar & terang ----- */
    const gHost = scatterSection.querySelector(".scatter-sticky") || scatterRoot.parentNode;
    const gSrcs = galleryPhotos.length ? galleryPhotos : scatterPhotos.slice().reverse();
    let gallery = null, gStage = null, gRows = [], gVW = innerWidth, gMeasureTick = false;
    if (gSrcs.length) {
      gallery = document.createElement("div");
      gallery.className = "scatter-gallery";
      gallery.setAttribute("aria-hidden", "true");
      gStage = document.createElement("div");
      gStage.className = "sg-stage";
      const evens = gSrcs.filter((_, i) => i % 2 === 0), odds = gSrcs.filter((_, i) => i % 2 === 1);
      const fill = list => { const o = list.slice(); while (o.length < 5 && list.length) o.push(...list); return o; };   // kurang dari 5 foto per baris? diulang supaya baris tetap panjang
      [evens, odds.length ? odds : evens.slice().reverse()].forEach((list, r) => {
        const row = document.createElement("div");
        row.className = "sg-row";
        const base = fill(r ? list.slice().reverse() : list), n = base.length;
        base.concat(base, base, base).forEach((src, i) => {   // urutan diulang 4x supaya baris tidak pernah putus / kosong di pinggir, berapa pun lebar layarnya
          const el = document.createElement("div");
          el.className = "scatter-photo sg-photo";
          el.dataset.rot = ((((i % n) + r * 2) % 3) - 1) * 2.4;
          el.innerHTML = `<img src="${esc(src)}" alt="" draggable="false">`;
          el.firstChild.addEventListener("load", queueMeasure);   // lebar kartu mengikuti rasio foto asli, jadi ukur ulang setelah foto termuat
          el.firstChild.addEventListener("error", () => { el.classList.add("is-empty"); el.firstChild.style.visibility = "hidden"; queueMeasure(); });   // file belum ada = bingkai tetap tampil kosong (seperti kenangan)
          row.appendChild(el);
        });
        gStage.appendChild(row);
        gRows.push({ el: row, dir: r ? 1 : -1, n, cycle: 0, items: [] });
      });
      gallery.appendChild(gStage);
      gHost.appendChild(gallery);
    }
    function measureGallery() {
      gMeasureTick = false;
      if (!gallery) { updateScatter(); return; }
      gVW = innerWidth;
      let any = false;
      gRows.forEach(r => {
        r.items = [...r.el.children].map(el => ({ el, cx: el.offsetLeft + el.offsetWidth / 2, rot: Number(el.dataset.rot) || 0 }));
        r.cycle = r.items.length > r.n ? r.items[r.n].el.offsetLeft - r.items[0].el.offsetLeft : r.el.offsetWidth;   // lebar satu putaran urutan foto
        if (r.items.length) any = true;
      });
      gallery.style.display = any ? "" : "none";
      updateScatter();
    }
    function queueMeasure() { if (!gMeasureTick) { gMeasureTick = true; requestAnimationFrame(measureGallery); } }
    const G0 = 0.3, G1 = 0.82;   // galeri tampil di 30%-82% scroll section ini (kenangan selesai memudar ~32%, tulisan muncul mulai 80%)
    function paintGallery(p) {
      if (!gallery || gallery.style.display === "none") return;
      const gp = c01((p - G0) / (G1 - G0));
      const op = ease(c01(gp / 0.14)) * (1 - ease(c01((gp - 0.86) / 0.14)));
      gallery.style.opacity = op.toFixed(3);
      gallery.style.visibility = op > 0.005 ? "visible" : "hidden";
      if (op <= 0.005) return;
      const sc = 0.9 + 0.12 * gp + 0.1 * ease(c01((gp - 0.86) / 0.14));
      gStage.style.transform = still ? `translateY(-3vh) scale(${sc.toFixed(3)})` : `translateY(-3vh) perspective(1500px) rotateX(6deg) rotateZ(-4deg) scale(${sc.toFixed(3)})`;
      gRows.forEach(r => {
        const Wc = r.cycle || gVW, D = Wc * 0.9;
        const x = r.dir < 0 ? -Wc * 0.5 - D * gp : -Wc * 2.5 + D * gp;   // baris atas ke kiri, baris bawah ke kanan (kedua baris selalu penuh sampai ujung layar)
        r.el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
        r.items.forEach((it, i) => {
          const dist = Math.abs(x + it.cx - gVW / 2);
          if (dist > gVW * 0.9) return;   // di luar layar, tidak perlu dihitung
          const d = Math.min(1, dist / (gVW * 0.55));   // 0 = tepat di tengah layar
          const y = still ? 0 : Math.sin(i * 1.4 + gp * 7 + r.dir) * 9;
          it.el.style.transform = `translate3d(0,${y.toFixed(1)}px,0) rotate(${it.rot}deg) scale(${(1.08 - 0.2 * d * d).toFixed(3)})`;
          it.el.style.opacity = (1 - 0.5 * d * d).toFixed(2);
        });
      });
    }

    let scatterTick = false;
    const updateScatter = () => {
      const p = c01(-scatterSection.getBoundingClientRect().top / Math.max(1, scatterSection.offsetHeight - innerHeight));
      const sp = c01(p / 0.4);   // foto kenangan bertebaran & memudar di 40% pertama (dulu seluruh section)
      photos.forEach(ph => {
        const dx = (ph.x + ph.w / 2 - 50) * sp * 1.1 * ph.depth, dy = (ph.y - 40) * sp * 1.1 * ph.depth;
        ph.el.style.transform = `translate3d(${dx}vw, ${dy}vh, 0) rotate(${ph.rot + Math.sign(ph.rot) * sp * 20}deg) scale(${1 - 0.5 * sp})`;
        ph.el.style.opacity = 1 - ease(c01((sp - 0.2) / 0.6));
      });
      paintGallery(p);
      if (title) {
        const t = c01((p - 0.8) / 0.18);   // "Something Amazing" baru muncul setelah galeri selesai
        title.style.opacity = ease(t);
        title.style.transform = `scale(${0.92 + 0.08 * t})`;
      }
      scatterTick = false;
    };
    addEventListener("scroll", () => { if (!scatterTick) { scatterTick = true; requestAnimationFrame(updateScatter); } }, { passive: true });
    addEventListener("resize", queueMeasure);
    document.fonts?.ready.then(queueMeasure);
    measureGallery();
    updateScatter();
  }

  // ===== KONTAK & KOMENTAR: isi di sini =====
  const CONTACT_CONFIG = {
    formEndpoint: "", // contoh Formspree: "https://formspree.io/f/xxxxxxxx" (pesan masuk ke emailmu)
    email: ""         // cadangan: membuka aplikasi email kalau formEndpoint kosong
  };
  const socials = [
    { name: "TikTok 1", note: "@mtropro909", url: "https://www.tiktok.com/@mtropro909", icon: "tt" },
    { name: "TikTok 2", note: "@parewusiz_67", url: "https://www.tiktok.com/@parewusiz_67", icon: "tt" },
    { name: "Instagram", note: "@mtrofaqih", url: "https://www.instagram.com/mtrofaqih", icon: "ig" }
    // nanti kalau sudah siap, hapus tanda // di baris yang kamu mau:
    // { name: "GitHub", note: "@username", url: "https://github.com/username", icon: "gh" },
    // { name: "LinkedIn", note: "Let's Connect", url: "#", icon: "in" }
  ];
  // Komentar yang tampil dipilih olehmu: tambahkan setelah kamu setujui komentar yang masuk.
  const comments = [
    { name: "Nama Pengunjung", text: "Ini contoh tampilan komentar. Ganti dengan komentar asli.", time: "contoh" }
  ];
  const socialRoot = document.querySelector("#socials");
  if (socialRoot) socialRoot.innerHTML = socials.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><span class="social-ico">${esc(s.icon)}</span><span><b>${esc(s.name)}</b><small>${esc(s.note)}</small></span><span class="social-go" aria-hidden="true">↗</span></a></li>`).join("");
  const commentRoot = document.querySelector("#comment-list"), countEl = document.querySelector("#comment-count");
  if (commentRoot) {
    commentRoot.innerHTML = comments.length
      ? comments.map(c => `<li class="comment"><span class="avatar">${esc(c.name.charAt(0).toUpperCase())}</span><div><b>${esc(c.name)}</b><p>${esc(c.text)}</p></div><time>${esc(c.time)}</time></li>`).join("")
      : `<li class="comment-empty">Belum ada komentar. Jadilah yang pertama!</li>`;
    if (countEl) countEl.textContent = `(${comments.length})`;
  }
  async function sendForm(form, type, okMessage) {
    const status = form.querySelector(".form-status"), btn = form.querySelector("button[type=submit]");
    if (form.elements.website && form.elements.website.value) return; // jebakan spam
    const data = Object.fromEntries(new FormData(form));
    delete data.website;
    data.jenis = type;
    btn.disabled = true;
    status.textContent = "Mengirim…";
    try {
      if (CONTACT_CONFIG.formEndpoint) {
        const res = await fetch(CONTACT_CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error("HTTP " + res.status);
      } else if (CONTACT_CONFIG.email) {
        location.href = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(type + " dari " + data.nama)}&body=${encodeURIComponent(data.pesan + "\n\n" + data.nama + (data.email ? " (" + data.email + ")" : ""))}`;
      } else {
        throw new Error("CONTACT_CONFIG belum diisi");
      }
      status.textContent = okMessage;
      form.reset();
    } catch (err) {
      console.warn("Form gagal:", err);
      status.textContent = "Maaf, belum bisa terkirim. Coba lagi nanti.";
    }
    btn.disabled = false;
  }
  document.querySelector("#contact-form")?.addEventListener("submit", e => { e.preventDefault(); sendForm(e.target, "Pesan", "Terima kasih! Pesanmu sudah terkirim."); });
  document.querySelector("#comment-form")?.addEventListener("submit", e => { e.preventDefault(); sendForm(e.target, "Komentar", "Terima kasih! Komentarmu terkirim dan tampil setelah disetujui."); });

  /* =========================================
     REVISION 4 MODULES
  ========================================= */
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- Theme toggle (dark / light) ---------- */
  const themeBtn = document.getElementById("themeToggle");
  const syncThemeUI = () => {
    const light = root.dataset.theme === "light";
    themeBtn?.setAttribute("aria-checked", String(light));
    themeBtn?.setAttribute("aria-label", light ? "Ganti ke mode gelap" : "Ganti ke mode terang");
  };
  /* penyimpanan SEMENTARA (hanya di memori): easter egg tidak permanen, setiap muat ulang kembali ke awal */
  const mem = {};
  const store = { get: k => (k in mem ? mem[k] : null), set: (k, v) => { mem[k] = v; } };
  let skyLP = false;   // true sesaat setelah tekan-lama, supaya klik susulan tidak ikut mengganti mode
  themeBtn?.addEventListener("click", () => {
    if (skyLP) { skyLP = false; return; }
    if (root.dataset.bleach) return;   // mode Shinji / Aizen: tombol ini jadi Biasa / Sekai atau Biasa / Kyōka
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.classList.add("theme-anim");
    root.dataset.theme = next;
    store.set("theme", next);
    syncThemeUI();
    skyChime(skyKind(next));
    setTimeout(() => root.classList.remove("theme-anim"), 700);
  });
  syncThemeUI();

  /* ---------- Easter egg LANGIT: tahan tombol terang/gelap -> pilih SENJA (terang) / MONOKROM (gelap) ---------- */
  const skyStore = { duo: false };   // false = pasangan Terang/Gelap · true = pasangan Senja/Monokrom (tombol tema tetap bolak-balik dalam pasangannya)
  const skyKind = th => (th === "light" ? (skyStore.duo ? "dusk" : "l") : (skyStore.duo ? "mono" : "d"));
  skyStore.duo = store.get("skyDuo") === "1";
  const applyVariant = () => {
    const v = skyStore.duo ? (root.dataset.theme === "light" ? "dusk" : "mono") : "";
    if (v) root.dataset.variant = v; else delete root.dataset.variant;
  };
  new MutationObserver(applyVariant).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  applyVariant();
  document.querySelector(".background-pattern")?.insertAdjacentHTML("beforeend", '<span class="sky-vignette"></span>');

  /* bunyi ganti langit (Web Audio, tanpa file): tiap mode punya "ting" sendiri */
  let skyAC = null;
  function skyChime(kind) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      skyAC = skyAC || new AC();
      if (skyAC.state === "suspended") skyAC.resume();
      const t0 = skyAC.currentTime, master = skyAC.createGain();
      master.gain.value = 0.5;
      master.connect(skyAC.destination);
      const P = {
        l:    [[1318.5, 0.8, 1.1, 0], [1975.5, 0.7, 1.4, 0.09], [3951, 0.22, 0.7, 0.09]],            // pagi: dua nada naik, cerah
        dusk: [[783.99, 0.8, 1.6, 0], [1174.7, 0.5, 1.8, 0.07], [1568, 0.25, 1.4, 0.14], [2349, 0.1, 0.8, 0.14]], // senja: lonceng hangat
        d:    [[987.8, 0.7, 1.0, 0], [659.3, 0.7, 1.5, 0.1], [1318.5, 0.15, 0.6, 0.1]],              // malam: dua nada turun, lembut
        mono: [[220, 0.9, 0.9, 0, "triangle"], [110, 0.6, 1.2, 0], [1760, 0.12, 0.18, 0]],           // monokrom: dalam & kering
        egg:  [[1318.5, 0.7, 1.2, 0], [1568, 0.6, 1.2, 0.11], [1975.5, 0.6, 1.2, 0.22], [2637, 0.7, 1.7, 0.33], [3951, 0.3, 1.0, 0.33]]
      };
      (P[kind] || P.l).forEach(([f, v, d, delay, type]) => {
        const o = skyAC.createOscillator(), g = skyAC.createGain();
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + delay);
        g.gain.exponentialRampToValueAtTime(v, t0 + delay + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + d);
        o.connect(g); g.connect(master);
        o.start(t0 + delay); o.stop(t0 + delay + d + 0.05);
      });
    } catch (_) { /* audio tidak tersedia */ }
  }
  let skyToast = null, skyToastT = 0;
  function hideSkyToast() {
    clearTimeout(skyToastT);
    if (!skyToast) return;
    const el = skyToast; skyToast = null;
    el.classList.remove("open");
    setTimeout(() => el.remove(), 450);
  }
  function showSkyToast(o = {}) {
    hideSkyToast();
    const el = document.createElement("div");
    el.className = "sky-toast";
    el.setAttribute("role", "status");
    el.innerHTML = `<span class="st-ico" aria-hidden="true">${o.icon || "✦"}</span><div class="st-body"><p class="st-k">EASTER EGG DITEMUKAN!</p><p class="st-t">${o.title || "Selamat, kamu telah menemukan easter egg Langit 🎉"}</p><p class="st-s">${o.sub || "Pilihan Senja (suasana sore) dan Monokrom (malam hitam-putih) kini terbuka di menu Langit."}</p></div><button type="button" class="st-x" aria-label="Tutup">&times;</button>`;
    el.querySelector(".st-x").addEventListener("click", hideSkyToast);
    document.body.appendChild(el);
    skyToast = el;
    requestAnimationFrame(() => el.classList.add("open"));
    skyChime("egg");
    skyToastT = setTimeout(hideSkyToast, 7000);
  }

  const SKY_OPTS = [
    { theme: "light", v: "",     key: "l",    name: "Terang",   sub: "Pagi cerah" },
    { theme: "light", v: "dusk", key: "dusk", name: "Senja",    sub: "Langit jingga-ungu" },
    { theme: "dark",  v: "",     key: "d",    name: "Gelap",    sub: "Malam berbintang" },
    { theme: "dark",  v: "mono", key: "mono", name: "Monokrom", sub: "Malam hitam-putih" }
  ];
  let skyMenu = null;
  const closeSkyMenu = () => { if (skyMenu) { skyMenu.classList.remove("open"); const m = skyMenu; skyMenu = null; setTimeout(() => m.remove(), 220); themeBtn?.setAttribute("aria-expanded", "false"); } };
  function setSky(o) {
    root.classList.add("theme-anim");
    skyStore.duo = !!o.v;
    root.dataset.theme = o.theme;
    applyVariant();
    store.set("theme", o.theme);
    store.set("skyDuo", skyStore.duo ? "1" : "0");
    syncThemeUI();
    skyChime(o.key);
    setTimeout(() => root.classList.remove("theme-anim"), 700);
  }
  function openSkyMenu() {
    if (!themeBtn || root.dataset.bleach) return;
    closeSkyMenu();
    let first = false;
    if (!store.get("skyEgg")) { first = true; store.set("skyEgg", "1"); }
    if (first) showSkyToast();
    const cur = skyKind(root.dataset.theme);
    const m = document.createElement("div");
    m.className = "sky-menu";
    m.setAttribute("role", "menu");
    m.setAttribute("aria-label", "Pilihan langit");
    m.innerHTML = '<p class="sky-menu-title">LANGIT<small>easter egg</small></p>' + SKY_OPTS.map(o =>
      `<button type="button" role="menuitemradio" aria-checked="${o.key === cur}" data-k="${o.key}"><i class="sky-sw sw-${o.key}"></i><span>${o.name}<small>${o.sub}</small></span></button>`).join("");
    document.body.appendChild(m);
    const r = themeBtn.getBoundingClientRect();
    const mw = m.offsetWidth, mh = m.offsetHeight;
    m.style.left = clamp(r.right - mw, 8, window.innerWidth - mw - 8) + "px";
    m.style.top = (r.top > window.innerHeight / 2 ? Math.max(8, r.top - mh - 10) : r.bottom + 10) + "px";
    m.addEventListener("click", e => {
      const b = e.target.closest("button[data-k]");
      if (!b) return;
      setSky(SKY_OPTS.find(o => o.key === b.dataset.k));
      closeSkyMenu();
    });
    skyMenu = m;
    themeBtn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => m.classList.add("open"));
    m.querySelector('[aria-checked="true"]')?.focus({ preventScroll: true });
  }
  let lpTimer = 0, lpX = 0, lpY = 0, lpReset = 0;
  const lpCancel = () => clearTimeout(lpTimer);
  const lpFlag = () => { skyLP = true; clearTimeout(lpReset); lpReset = setTimeout(() => { skyLP = false; }, 450); };
  themeBtn?.addEventListener("pointerdown", e => {
    if (root.dataset.bleach || (e.pointerType === "mouse" && e.button !== 0)) return;
    lpX = e.clientX; lpY = e.clientY;
    lpCancel();
    lpTimer = setTimeout(() => { lpFlag(); openSkyMenu(); if (navigator.vibrate) navigator.vibrate(18); }, 650);
  });
  themeBtn?.addEventListener("pointermove", e => { if (Math.hypot(e.clientX - lpX, e.clientY - lpY) > 10) lpCancel(); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => themeBtn?.addEventListener(ev, lpCancel));
  themeBtn?.addEventListener("contextmenu", e => { e.preventDefault(); if (!root.dataset.bleach) { lpFlag(); openSkyMenu(); } });
  document.addEventListener("pointerdown", e => { if (skyMenu && !skyMenu.contains(e.target) && !themeBtn.contains(e.target)) closeSkyMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSkyMenu(); });
  new MutationObserver(() => { if (root.dataset.bleach) closeSkyMenu(); }).observe(root, { attributes: true, attributeFilter: ["data-bleach"] });

  /* ---------- Easter egg CUACA: ketuk tombol tema 10x saat lagu "About You" (lagu ke-1) diputar ---------- */
  (function weatherMode() {
    const WCFG = { songIndex: 0, taps: 10, maxGap: 800, maxTotal: 5000 };   // sama seperti kode rahasia Bleach, tapi lagu ke-1
    const MODES = [
      { key: "off",   name: "Cerah",         sub: "Matikan cuaca" },
      { key: "wind",  name: "Angin Kencang", sub: "Daun beterbangan" },
      { key: "rain",  name: "Hujan",         sub: "Rintik & suara hujan" },
      { key: "storm", name: "Hujan Petir",   sub: "Kilat & guntur" }
    ];
    const TINT = { wind: 0.05, rain: 0.16, storm: 0.28 };
    const TAU2 = Math.PI * 2;

    /* ----- warna cuaca mengikuti mode karakter Bleach (Shinji, Sekai, Aizen, Kyoka, Zaraki, Ichigo x3) ----- */
    const WPAL = {
      base:   { drop: [190,210,245], dropN: [215,230,255], streak: [235,242,255], tint: [8,16,34],  flash: [225,232,255], boltG: [150,175,255], leaves: null },
      shinji: { drop: [255,214,150], dropN: [255,236,190], streak: [255,238,200], tint: [30,8,28],  flash: [255,240,210], boltG: [246,207,69],  leaves: ["#f6cf45","#ff8fb8","#e9739c","#ffd98a","#c9507f"] },
      sekai:  { drop: [255,190,215], dropN: [255,225,235], streak: [255,230,240], tint: [40,10,28], flash: [255,236,244], boltG: [233,115,156], leaves: ["#ff8fb8","#ffb3cf","#e9739c","#ffd1e0","#c9507f"] },
      aizen:  { drop: [196,170,255], dropN: [225,210,255], streak: [225,212,255], tint: [14,8,34],  flash: [232,220,255], boltG: [150,110,255], leaves: ["#b49bff","#8a6bff","#d6c7ff","#6a4bd6","#a88cff"] },
      kyoka:  { drop: [150,235,245], dropN: [200,250,255], streak: [210,250,255], tint: [4,28,34],  flash: [215,252,255], boltG: [60,200,220],  leaves: ["#7fe3ee","#3fb7c9","#c9f6fb","#2a8fa3","#9eeaf2"] },
      uryu:   { drop: [150,210,255], dropN: [200,235,255], streak: [205,238,255], tint: [4,14,30],  flash: [220,244,255], boltG: [90,190,255],  leaves: ["#7fdcff","#3fa8ff","#e8fbff","#1f75d8","#bff3ff"] },
      ichibe: { drop: [232,90,60], dropN: [255,170,140], streak: [255,190,160], tint: [14,6,4],  flash: [255,230,210], boltG: [255,120,60],  leaves: ["#e8452c","#ff9a78","#f1e7d3","#b3261e","#ffd0b8"] },
      ibankai: { drop: [242,183,5], dropN: [255,224,138], streak: [255,230,150], tint: [14,6,4],  flash: [255,244,200], boltG: [255,200,40],  leaves: ["#f2b705","#ffe08a","#f6ecd0","#b88300","#fff2b8"] },
      uletzt: { drop: [220,248,255], dropN: [245,253,255], streak: [245,253,255], tint: [8,24,44],  flash: [240,252,255], boltG: [170,235,255], leaves: ["#ffffff","#bff3ff","#7fdcff","#e8fbff","#9fe4ff"] },
      zaraki: { drop: [255,130,120], dropN: [255,175,165], streak: [255,170,160], tint: [34,4,6],   flash: [255,214,208], boltG: [255,60,50],   leaves: ["#c1272d","#8e1b1f","#ff5a4d","#5a0f12","#e0463a"] },
      tensa:  { drop: [255,160,70],  dropN: [255,200,140], streak: [255,200,140], tint: [26,10,2],  flash: [255,226,190], boltG: [255,106,0],   leaves: ["#ff6a00","#ff9a3d","#ffd08a","#c24d00","#ff7a1a"] },
      hollow: { drop: [255,90,110],  dropN: [255,160,170], streak: [255,160,170], tint: [26,2,10],  flash: [255,214,222], boltG: [240,24,47],   leaves: ["#f0182f","#b50f24","#ff6070","#e8e0e0","#7a0b18"] },
      chain:  { drop: [255,110,100], dropN: [240,230,230], streak: [245,225,225], tint: [20,4,6],   flash: [255,236,236], boltG: [255,50,50],   leaves: ["#ff3a3a","#c01a1a","#e8e8e8","#7a1010","#ff7070"] }
    };
    const wKey = () => {
      const b = root.dataset.bleach;
      if (!b) return "base";
      if (b === "shinji") return root.dataset.sekai === "on" ? "sekai" : "shinji";
      if (b === "aizen") return root.dataset.kyoka === "on" ? "kyoka" : "aizen";
      if (b === "zaraki") return "zaraki";
      if (b === "ichibe") return root.dataset.ibankai === "on" ? "ibankai" : "ichibe";
      if (b === "uryu") return root.dataset.uletzt === "on" ? "uletzt" : "uryu";
      if (b === "ichigo") return root.dataset.ichigo === "hollow" ? "hollow" : root.dataset.ichigo === "chain" ? "chain" : "tensa";
      return "base";
    };
    let P = WPAL.base;   // palet aktif, diperbarui tiap frame di render()
    let mode = "off", drawMode = "rain", strength = 0, raf = 0, last = 0;
    let canvas = null, ctx = null, W = 0, H = 0;
    let drops = [], splashes = [], leaves = [], streaks = [];
    let bolt = null, boltT = -1, nextBolt = 2;
    let unlocked = false, wrap = null, fab = null, menuEl = null, menuOpen = false;
    unlocked = store.get("weatherUnlocked") === "1";

    /* ----- suara (Web Audio, tanpa file) ----- */
    let wAC = null, noiseBuf = null, snd = null, thTimers = [];
    function audio() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      if (!wAC) {
        wAC = new AC();
        const len = wAC.sampleRate * 3;
        noiseBuf = wAC.createBuffer(1, len, wAC.sampleRate);
        const d = noiseBuf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (wAC.state === "suspended") wAC.resume();
      return wAC;
    }
    const noiseSrc = a => { const s = a.createBufferSource(); s.buffer = noiseBuf; s.loop = true; s.start(0, Math.random() * 2); return s; };
    const mkFilter = (a, type, f, q) => { const x = a.createBiquadFilter(); x.type = type; x.frequency.value = f; if (q) x.Q.value = q; return x; };
    const mkGain = (a, v) => { const g = a.createGain(); g.gain.value = v; return g; };
    const chain = (...n) => { for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]); return n[n.length - 1]; };
    function startSound(m) {
      const a = audio();
      if (!a) return null;
      const t = a.currentTime, out = a.createGain(), nodes = [];
      out.gain.setValueAtTime(0.0001, t);
      out.connect(a.destination);
      let target;
      if (m === "wind") {
        const s = noiseSrc(a), bp = mkFilter(a, "bandpass", 520, 0.9), g = mkGain(a, 0.6);
        chain(s, bp, g, mkFilter(a, "lowpass", 2600), out);
        nodes.push(s);
        [[0.13, 0.4, g.gain], [0.41, 0.15, g.gain], [0.09, 260, bp.frequency]].forEach(([hz, amp, param]) => {
          const o = a.createOscillator(), lg = mkGain(a, amp);
          o.frequency.value = hz; o.connect(lg); lg.connect(param); o.start(); nodes.push(o);
        });
        const s2 = noiseSrc(a); chain(s2, mkFilter(a, "bandpass", 1500, 3), mkGain(a, 0.05), out); nodes.push(s2);   // siulan tipis
        target = 1.1;
      } else {
        const storm = m === "storm";
        const s1 = noiseSrc(a), s2 = noiseSrc(a), s3 = noiseSrc(a);
        chain(s1, mkFilter(a, "highpass", 700), mkFilter(a, "lowpass", 7500), mkGain(a, storm ? 0.55 : 0.42), out);   // desis hujan
        chain(s2, mkFilter(a, "bandpass", 2600, 0.6), mkGain(a, 0.25), out);                                          // rintik
        chain(s3, mkFilter(a, "lowpass", 420), mkGain(a, storm ? 0.5 : 0.3), out);                                    // dengung jauh
        nodes.push(s1, s2, s3);
        target = storm ? 0.9 : 0.75;
      }
      out.gain.linearRampToValueAtTime(target, t + 1.8);
      return { out, nodes };
    }
    function stopSound(h) {
      if (!h || !wAC) return;
      const t = wAC.currentTime;
      h.out.gain.cancelScheduledValues(t);
      h.out.gain.setValueAtTime(Math.max(h.out.gain.value, 0.0001), t);
      h.out.gain.linearRampToValueAtTime(0.0001, t + 1);
      setTimeout(() => { h.nodes.forEach(n => { try { n.stop(); } catch (_) {} }); try { h.out.disconnect(); } catch (_) {} }, 1200);
    }
    function thunder() {
      const a = wAC;
      if (!a || !snd || mode !== "storm") return;
      const t = a.currentTime, dur = 4.2;
      const s = noiseSrc(a), lp = mkFilter(a, "lowpass", 380), g = a.createGain();
      lp.frequency.setValueAtTime(380, t); lp.frequency.exponentialRampToValueAtTime(70, t + dur);
      g.gain.setValueAtTime(0.0001, t);
      [[1.4, 0.1], [0.5, 0.5], [1.0, 0.9], [0.35, 1.5], [0.7, 1.9], [0.0001, dur]].forEach(([v, at]) => g.gain.linearRampToValueAtTime(Math.max(v, 0.0001), t + at));
      chain(s, lp, g, a.destination);
      s.stop(t + dur + 0.1);
      const c = noiseSrc(a), cg = a.createGain();   // retakan tajam di awal
      cg.gain.setValueAtTime(0.0001, t); cg.gain.exponentialRampToValueAtTime(0.5, t + 0.02); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      chain(c, mkFilter(a, "highpass", 1800), cg, a.destination);
      c.stop(t + 0.3);
    }

    /* ----- gambar (kanvas) ----- */
    function ensureCanvas() {
      if (canvas) return;
      canvas = document.createElement("canvas");
      canvas.className = "weather-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      window.addEventListener("resize", () => { if (mode !== "off") rebuild(); });
    }
    function rebuild() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = Math.min(1, (W * H) / 1000000);
      const k = (reduceMotion ? 0.5 : 1) * (0.55 + 0.45 * area);
      const n = Math.round((drawMode === "storm" ? 340 : 230) * k);
      drops = Array.from({ length: n }, () => ({ x: rand(-H * 0.35, W), y: rand(-H, H), l: rand(10, 26), v: rand(950, 1500), f: Math.random() < 0.45, g: H - rand(0, H * 0.14) }));
      splashes = [];
      const COL = ["#6fae3f", "#9bc34a", "#c9a23a", "#b5652b", "#7a8f2e"];
      leaves = Array.from({ length: Math.round(30 * k) }, () => ({ x: rand(-W * 0.2, W), y: rand(0, H), s: rand(5, 11), vx: rand(350, 800), vy: rand(10, 60), ph: rand(0, 6.28), fr: rand(1.5, 3.5), amp: rand(30, 110), rot: rand(0, 6.28), rs: rand(-6, 6), c: COL[(Math.random() * COL.length) | 0], ci: (Math.random() * 5) | 0 }));
      streaks = Array.from({ length: Math.round(26 * k) }, () => ({ x: rand(-200, W), y: rand(0, H), len: rand(90, 280), v: rand(1600, 2600), a: rand(0.08, 0.25) }));
      bolt = null; boltT = -1; nextBolt = 1.6;
    }
    function makeBolt() {
      let x = rand(W * 0.15, W * 0.85), y = 0;
      const yEnd = rand(H * 0.5, H * 0.8), pts = [[x, y]], br = [];
      while (y < yEnd) {
        y += rand(14, 40); x += rand(-28, 28); pts.push([x, y]);
        if (Math.random() < 0.14) {
          let bx = x, by = y; const b = [[bx, by]], dir = Math.random() < 0.5 ? -1 : 1;
          for (let i = 0, n = 3 + ((Math.random() * 4) | 0); i < n; i++) { by += rand(10, 26); bx += dir * rand(8, 26); b.push([bx, by]); }
          br.push(b);
        }
      }
      return { pts, br };
    }
    function strike() {
      bolt = makeBolt(); boltT = 0;
      thTimers.push(setTimeout(thunder, rand(350, 1800)));   // guntur menyusul setelah kilat
    }
    function drawRain(dt, S, storm) {
      const slope = storm ? 0.3 : 0.12, pf = new Path2D(), pn = new Path2D();
      for (const d of drops) {
        d.y += d.v * dt; d.x += d.v * slope * dt;
        if (d.y > d.g) {
          if (splashes.length < 70 && Math.random() < (storm ? 0.5 : 0.35)) splashes.push({ x: d.x, y: d.g, t: 0 });
          d.y = -rand(10, H * 0.3); d.x = rand(-H * 0.35, W); d.g = H - rand(0, H * 0.14);
        }
        const p = d.f ? pf : pn;
        p.moveTo(d.x, d.y); p.lineTo(d.x + slope * d.l, d.y + d.l);
      }
      ctx.lineCap = "round";
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(${P.drop},${(0.28 * S).toFixed(3)})`; ctx.stroke(pf);
      ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(${P.dropN},${(0.5 * S).toFixed(3)})`; ctx.stroke(pn);
      ctx.lineWidth = 1;
      for (let i = splashes.length - 1; i >= 0; i--) {
        const p = splashes[i]; p.t += dt;
        if (p.t > 0.35) { splashes.splice(i, 1); continue; }
        const k = p.t / 0.35;
        ctx.strokeStyle = `rgba(${P.dropN},${((1 - k) * 0.5 * S).toFixed(3)})`;
        ctx.beginPath(); ctx.ellipse(p.x, p.y, 2 + k * 9, 1 + k * 3, 0, 0, TAU2); ctx.stroke();
      }
    }
    function drawWind(t, dt, S) {
      const gust = clamp(0.7 + 0.35 * Math.sin(t * 0.45) + 0.3 * Math.sin(t * 1.3 + 1), 0.25, 1.4);
      ctx.lineCap = "round"; ctx.lineWidth = 1.2;
      for (const s of streaks) {
        s.x += s.v * gust * dt;
        if (s.x - s.len > W) { s.x = -rand(0, 200); s.y = rand(0, H); s.len = rand(90, 280); }
        const g = ctx.createLinearGradient(s.x - s.len, 0, s.x, 0);
        g.addColorStop(0, `rgba(${P.streak},0)`); g.addColorStop(1, `rgba(${P.streak},${(s.a * S * gust).toFixed(3)})`);
        ctx.strokeStyle = g; ctx.beginPath(); ctx.moveTo(s.x - s.len, s.y + s.len * 0.04); ctx.lineTo(s.x, s.y); ctx.stroke();
      }
      ctx.globalAlpha = S * 0.9;
      for (const l of leaves) {
        l.x += l.vx * gust * dt;
        l.y += (Math.sin(t * l.fr + l.ph) * l.amp + l.vy) * dt;
        l.rot += l.rs * gust * dt;
        if (l.x > W + 40 || l.y > H + 40) { l.x = -rand(20, 200); l.y = rand(-20, H * 0.9); }
        ctx.save(); ctx.translate(l.x, l.y); ctx.rotate(l.rot);
        ctx.fillStyle = P.leaves ? P.leaves[l.ci % P.leaves.length] : l.c; ctx.beginPath(); ctx.ellipse(0, 0, l.s, l.s * 0.45, 0, 0, TAU2); ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(-l.s, 0); ctx.lineTo(l.s, 0); ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }
    function drawStorm(dt, S) {
      if (mode === "storm") { nextBolt -= dt; if (nextBolt <= 0) { strike(); nextBolt = rand(5, 12); } }
      if (boltT < 0) return;
      boltT += dt;
      const bt = boltT;
      let f = bt < 0.07 ? 1 : bt < 0.13 ? 0.12 : bt < 0.24 ? 0.85 : Math.max(0, 0.85 - (bt - 0.24) * 3.2);
      if (reduceMotion) f *= 0.25;
      if (f > 0) { ctx.fillStyle = `rgba(${P.flash},${(f * 0.38 * S).toFixed(3)})`; ctx.fillRect(0, 0, W, H); }
      const a = bt < 0.45 ? 1 - bt / 0.45 : 0;
      if (bolt && a > 0) {
        ctx.lineJoin = "round"; ctx.lineCap = "round";
        [bolt.pts, ...bolt.br].forEach((p, i) => {
          ctx.beginPath(); p.forEach(([x, y], j) => (j ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.strokeStyle = `rgba(${P.boltG},${(0.4 * a * S).toFixed(3)})`; ctx.lineWidth = i ? 5 : 9; ctx.stroke();
          ctx.strokeStyle = `rgba(255,255,255,${(a * S).toFixed(3)})`; ctx.lineWidth = i ? 1.2 : 2.4; ctx.stroke();
        });
      }
      if (bt > 0.9) { boltT = -1; bolt = null; }
    }
    function render(t, dt) {
      ctx.clearRect(0, 0, W, H);
      P = WPAL[wKey()] || WPAL.base;
      strength = clamp(strength + (mode !== "off" ? dt * 0.8 : -dt * 0.9), 0, 1);
      ctx.fillStyle = `rgba(${P.tint},${((TINT[drawMode] || 0) * strength).toFixed(3)})`;
      ctx.fillRect(0, 0, W, H);
      if (drawMode === "wind") drawWind(t, dt, strength); else drawRain(dt, strength, drawMode === "storm");
      if (drawMode === "storm") drawStorm(dt, strength);
    }
    function frame(ts) {
      const t = ts / 1000, dt = Math.min(0.05, t - last);
      last = t;
      render(t, dt);
      if (mode === "off" && strength <= 0) { raf = 0; ctx.clearRect(0, 0, W, H); return; }
      raf = requestAnimationFrame(frame);
    }
    function startLoop() {
      if (raf || document.hidden) return;
      last = performance.now() / 1000;
      raf = requestAnimationFrame(frame);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; if (wAC && wAC.state === "running") wAC.suspend(); }
      else { if (wAC && mode !== "off") wAC.resume(); if (canvas && (mode !== "off" || strength > 0)) startLoop(); }
    });

    /* ----- ganti mode ----- */
    let pendingSound = false;   // true = cuaca dipulihkan setelah muat ulang, suara menyusul di sentuhan pertama
    function setMode(k, silent) {
      if (k === mode) return;
      thTimers.forEach(clearTimeout); thTimers = [];
      stopSound(snd); snd = null;
      mode = k;
      if (k !== "off") {
        ensureCanvas();
        drawMode = k; strength = 0;
        rebuild();
        snd = silent ? null : startSound(k);
        root.dataset.weather = k;
        startLoop();
      } else {
        delete root.dataset.weather;
        if (canvas) startLoop();   // biarkan memudar pelan
      }
      pendingSound = !!silent && k !== "off";
      store.set("weatherMode", k);
      syncUI();
    }

    /* ----- tombol & menu cuaca ----- */
    const WX_ICON = '<svg class="wf-svg" viewBox="0 0 48 40" aria-hidden="true">' +
      '<g class="wf-sun"><circle cx="34" cy="13" r="6.5"/><path class="wf-rays" d="M34 2.5v3M34 20.5v3M23.5 13h3M41.5 13h3M26.6 5.6l2.1 2.1M39.3 18.3l2.1 2.1M41.4 5.6l-2.1 2.1M28.7 18.3l-2.1 2.1"/></g>' +
      '<g class="wf-wind"><path d="M6 14h22a4 4 0 1 0-4-4"/><path d="M4 22h30a4.5 4.5 0 1 1-4.5 4.5"/><path d="M10 30h15"/></g>' +
      '<path class="wf-cloud" d="M13 29a6.5 6.5 0 1 1 1.3-12.9A8.5 8.5 0 0 1 30.5 18 5.5 5.5 0 0 1 30 29z"/>' +
      '<g class="wf-drops"><path d="M15 32l-2 5"/><path d="M22 32l-2 5"/><path d="M29 32l-2 5"/></g>' +
      '<path class="wf-bolt" d="M24 22l-5 8h4l-2 7 7-10h-4z"/></svg>';
    function syncUI() {
      if (!fab) return;
      const cur = MODES.find(m => m.key === mode);
      fab.dataset.mode = mode;
      fab.querySelector(".wx-ico-fab").dataset.mode = mode;
      fab.classList.toggle("is-on", mode !== "off");
      fab.querySelector(".wf-state").textContent = cur.name;
      fab.setAttribute("aria-label", "Menu cuaca. Sekarang: " + cur.name);
      menuEl.querySelectorAll("button").forEach(b => b.setAttribute("aria-checked", String(b.dataset.k === mode)));
    }
    function toggleMenu(open) {
      menuOpen = typeof open === "boolean" ? open : !menuOpen;
      wrap.classList.toggle("open", menuOpen);
      fab.setAttribute("aria-expanded", String(menuOpen));
    }
    function buildFab(pop) {
      if (wrap) return;
      wrap = document.createElement("div");
      wrap.className = "weather-wrap" + (pop ? " pop" : "");
      wrap.innerHTML = '<div class="weather-menu" role="menu" aria-label="Menu cuaca"><p class="weather-menu-title">CUACA<small>easter egg</small></p>' +
        MODES.map(m => `<button type="button" role="menuitemradio" aria-checked="false" data-k="${m.key}"><i class="wx-ico" data-mode="${m.key}">${WX_ICON}</i><span>${m.name}<small>${m.sub}</small></span></button>`).join("") +
        `</div><button class="weather-fab" type="button" data-mode="off" aria-haspopup="menu" aria-expanded="false" aria-label="Buka menu cuaca"><i class="wx-ico wx-ico-fab" data-mode="off">${WX_ICON}</i><span class="wf-text"><b>CUACA</b><small class="wf-state">Cerah</small></span></button>`;
      document.body.appendChild(wrap);
      fab = wrap.querySelector(".weather-fab");
      menuEl = wrap.querySelector(".weather-menu");
      fab.addEventListener("click", () => toggleMenu());
      menuEl.addEventListener("click", e => {
        const b = e.target.closest("button[data-k]");
        if (!b) return;
        setMode(b.dataset.k);
        toggleMenu(false);
      });
      document.addEventListener("pointerdown", e => { if (menuOpen && !wrap.contains(e.target)) toggleMenu(false); });
      document.addEventListener("keydown", e => { if (e.key === "Escape" && menuOpen) { toggleMenu(false); fab.focus(); } });
      syncUI();
    }

    /* ----- membuka kunci: ketuk tombol tema 10x saat "About You" diputar ----- */
    function unlock(fresh) {
      unlocked = true;
      store.set("weatherUnlocked", "1");
      buildFab(fresh);
      if (fresh) showSkyToast({ icon: "☂", title: "Selamat, kamu telah menemukan easter egg Cuaca 🌧️", sub: "Tombol cuaca muncul di kiri bawah: pilih Angin Kencang, Hujan, atau Hujan Petir (lengkap dengan suaranya)." });
    }
    const taps = [];
    themeBtn?.addEventListener("click", () => {
      if (unlocked) return;
      const now = performance.now();
      if (taps.length && now - taps[taps.length - 1] > WCFG.maxGap) taps.length = 0;
      taps.push(now);
      if (taps.length > WCFG.taps) taps.shift();
      if (taps.length === WCFG.taps && now - taps[0] <= WCFG.maxTotal) {
        const m = window.siteMusic;
        if (m && m.isSong(WCFG.songIndex)) { taps.length = 0; unlock(true); }
      }
    });
    window.cuacaBuka = () => unlock(true);   // uji cepat lewat Console
    if (unlocked) buildFab(false);
  })();

  /* ---------- Latar langit: MALAM (bintang, bulan, galaksi, aurora, kunang-kunang) / PAGI (burung, sinar matahari) ---------- */
  (function spaceBackground() {
    const canvas = document.getElementById("spaceCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const TAU = Math.PI * 2;
    const TINTS = ["255,255,255", "255,255,255", "205,222,255", "255,238,210", "190,210,255"];
    let W = 0, H = 0, stars = [], shooters = [], birds = [], flies = [], motes = [];
    let raf = 0, last = 0, nextShoot = 2.6, nextBird = 1.5;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const isLight = () => root.dataset.theme === "light";
    const paused = () => !!root.dataset.bleach;   // di mode karakter Bleach kanvas ini disembunyikan, jadi tidak perlu digambar

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(clamp((W * H) / 8500, 80, 230));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        const near = depth > 0.82;
        return {
          x: Math.random() * W, y: Math.random() * H,
          r: near ? rand(1.1, 1.7) : rand(0.35, 0.95),
          a: near ? rand(0.7, 1) : rand(0.3, 0.75),
          depth, sp: rand(0.6, 2.2), ph: rand(0, 6.28),
          c: TINTS[(Math.random() * TINTS.length) | 0],
          drift: rand(1.2, 4) * (0.4 + depth)
        };
      });
      // kunang-kunang (malam): melayang pelan di separuh bawah layar
      flies = Array.from({ length: Math.round(clamp((W * H) / 60000, 10, 26)) }, () => ({
        cx: Math.random() * W, cy: rand(H * 0.45, H * 0.98),
        ax: rand(20, 70), ay: rand(10, 36), sp: rand(0.25, 0.7), ph: rand(0, 6.28), r: rand(1.1, 2.1)
      }));
      // butiran cahaya / serbuk sari (pagi): naik pelan
      motes = Array.from({ length: Math.round(clamp((W * H) / 30000, 18, 50)) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: rand(0.8, 2.4), a: rand(0.35, 0.8),
        vy: rand(5, 15), sw: rand(8, 26), sp: rand(0.2, 0.6), ph: rand(0, 6.28)
      }));
    }

    /* ================= MALAM ================= */
    function drawGalaxy() {
      ctx.save();
      ctx.translate(W * 0.62 - mx * 10, H * 0.38 - my * 6);
      ctx.rotate(-0.55);
      ctx.scale(1, 0.16);
      const R = Math.max(W, H) * 0.75;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
      g.addColorStop(0, "rgba(190,170,255,.17)");
      g.addColorStop(0.35, "rgba(120,140,230,.08)");
      g.addColorStop(1, "rgba(80,100,200,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fill();
      ctx.restore();
    }

    const RIBBONS = [
      { at: 0.1,  rgb: "80,255,190",  s1: 0.5,  s2: 0.9, a: 0.11 },
      { at: 0.19, rgb: "150,120,255", s1: 0.35, s2: 0.6, a: 0.09 }
    ];
    function drawAurora(t) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const r of RIBBONS) {
        const base = H * r.at, amp = H * 0.045, hgt = H * 0.2;
        const top = x => base + Math.sin(x * 0.004 + t * r.s1) * amp + Math.sin(x * 0.011 - t * r.s2 * 0.7) * amp * 0.4;
        const bot = x => top(x) + hgt * (0.7 + 0.3 * Math.sin(x * 0.006 + t * 0.3));
        ctx.beginPath();
        for (let x = 0; x <= W + 14; x += 14) (x ? ctx.lineTo(x, top(x)) : ctx.moveTo(x, top(x)));
        for (let x = W + 14; x >= 0; x -= 14) ctx.lineTo(x, bot(x));
        ctx.closePath();
        const g = ctx.createLinearGradient(0, base - amp * 1.5, 0, base + hgt + amp);
        g.addColorStop(0, `rgba(${r.rgb},0)`);
        g.addColorStop(0.3, `rgba(${r.rgb},${r.a})`);
        g.addColorStop(1, `rgba(${r.rgb},0)`);
        ctx.fillStyle = g;
        ctx.fill();
      }
      ctx.restore();
    }

    const CRATERS = [[-0.35, -0.2, 0.22], [0.25, 0.15, 0.3], [-0.1, 0.5, 0.16], [0.45, -0.35, 0.14], [-0.5, 0.35, 0.12]];
    function drawMoon(t) {
      const R = clamp(Math.min(W, H) * 0.075, 32, 68);
      const cx = W * 0.17 - mx * 6, cy = H * 0.2 - my * 4;
      const pulse = reduceMotion ? 1 : 0.9 + 0.1 * Math.sin(t * 0.6);
      let g = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 4.2);
      g.addColorStop(0, `rgba(200,220,255,${(0.3 * pulse).toFixed(3)})`);
      g.addColorStop(0.4, "rgba(150,180,255,.09)");
      g.addColorStop(1, "rgba(120,150,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 4.2, 0, TAU); ctx.fill();
      g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, "#fffbe8"); g.addColorStop(0.7, "#e9ecf6"); g.addColorStop(1, "#b9c2dc");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
      for (const [ox, oy, rr] of CRATERS) {
        ctx.fillStyle = "rgba(140,152,186,.32)";
        ctx.beginPath(); ctx.arc(cx + ox * R, cy + oy * R, rr * R, 0, TAU); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.22)";
        ctx.beginPath(); ctx.arc(cx + ox * R - rr * R * 0.15, cy + oy * R - rr * R * 0.15, rr * R * 0.75, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }

    function drawFlies(t) {
      for (const f of flies) {
        const x = f.cx + Math.sin(t * f.sp + f.ph) * f.ax;
        const y = f.cy + Math.cos(t * f.sp * 0.8 + f.ph) * f.ay;
        const p = reduceMotion ? 0.7 : Math.pow(Math.max(0, Math.sin(t * f.sp * 3 + f.ph)), 2) * 0.85 + 0.15;
        ctx.fillStyle = `rgba(210,255,140,${(0.13 * p).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, f.r * 5, 0, TAU); ctx.fill();
        ctx.fillStyle = `rgba(235,255,170,${(0.95 * p).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, f.r, 0, TAU); ctx.fill();
      }
    }

    function drawStars(t, dt) {
      const px = mx * 7, py = my * 5;
      for (const s of stars) {
        if (!reduceMotion) {
          s.y -= s.drift * dt;
          s.x -= s.drift * 0.35 * dt;
          if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
          if (s.x < -4) s.x = W + 4;
        }
        const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
        const alpha = s.a * tw;
        const x = s.x + px * s.depth, y = s.y + py * s.depth;
        ctx.fillStyle = `rgba(${s.c},${alpha.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, TAU); ctx.fill();
        if (s.r > 1.1 && alpha > 0.6) {
          ctx.fillStyle = `rgba(${s.c},${(alpha * 0.18).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(x, y, s.r * 3.2, 0, TAU); ctx.fill();
        }
      }
    }

    function spawnShooter() {
      const fromTop = Math.random() < 0.7;
      const ang = rand(28, 42) * Math.PI / 180;
      const speed = rand(650, 950);
      shooters.push({
        x: fromTop ? rand(W * 0.35, W * 1.05) : W + 20,
        y: fromTop ? rand(-20, H * 0.25) : rand(0, H * 0.4),
        vx: -Math.cos(ang) * speed, vy: Math.sin(ang) * speed,
        len: rand(110, 200), life: 0, max: rand(0.9, 1.4)
      });
    }

    function drawShooters(dt) {
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.life += dt; s.x += s.vx * dt; s.y += s.vy * dt;
        const k = s.life / s.max;
        if (k >= 1 || s.x < -s.len || s.y > H + s.len) { shooters.splice(i, 1); continue; }
        const fade = k < 0.15 ? k / 0.15 : Math.pow(1 - (k - 0.15) / 0.85, 1.4);
        const sp = Math.hypot(s.vx, s.vy);
        const tx = s.x - (s.vx / sp) * s.len, ty = s.y - (s.vy / sp) * s.len;
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${(0.95 * fade).toFixed(3)})`);
        g.addColorStop(0.25, `rgba(170,200,255,${(0.45 * fade).toFixed(3)})`);
        g.addColorStop(1, "rgba(120,160,255,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 1.7, 0, TAU); ctx.fill();
        ctx.fillStyle = `rgba(180,205,255,${(0.18 * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, 6, 0, TAU); ctx.fill();
      }
    }

    /* ================= PAGI ================= */
    function drawRays(t) {
      const sx = W * 0.98, sy = -H * 0.04, len = Math.hypot(W, H) * 1.1;
      for (let i = 0; i < 6; i++) {
        const ang = Math.PI * 0.62 + i * 0.13 + (reduceMotion ? 0 : Math.sin(t * 0.12 + i) * 0.02);
        const wid = 0.045 + (i % 3) * 0.015;
        const a = 0.05 + 0.04 * (reduceMotion ? 0.5 : Math.sin(t * 0.35 + i * 1.7));
        const g = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
        g.addColorStop(0, `rgba(255,246,205,${(a * 2.4).toFixed(3)})`);
        g.addColorStop(1, "rgba(255,246,205,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(ang - wid) * len, sy + Math.sin(ang - wid) * len);
        ctx.lineTo(sx + Math.cos(ang + wid) * len, sy + Math.sin(ang + wid) * len);
        ctx.closePath();
        ctx.fill();
      }
    }

    function drawMotes(t, dt) {
      for (const m of motes) {
        if (!reduceMotion) {
          m.y -= m.vy * dt;
          if (m.y < -6) { m.y = H + 6; m.x = Math.random() * W; }
        }
        const x = m.x + Math.sin(t * m.sp + m.ph) * m.sw;
        const a = m.a * (reduceMotion ? 0.7 : 0.6 + 0.4 * Math.sin(t * m.sp * 3 + m.ph));
        ctx.fillStyle = `rgba(255,226,140,${(a * 0.22).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, m.y, m.r * 3.4, 0, TAU); ctx.fill();
        ctx.fillStyle = `rgba(255,248,215,${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, m.y, m.r, 0, TAU); ctx.fill();
      }
    }

    function spawnFlock() {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const r = Math.random();
      const n = r < 0.3 ? 1 : r < 0.5 ? 3 : 5 + ((Math.random() * 4) | 0);
      birds.push({
        dir, n, t: 0,
        size: rand(5, 9) * (W < 600 ? 0.8 : 1),
        speed: rand(70, 130),
        x: dir > 0 ? -60 : W + 60,
        y0: rand(H * 0.08, H * 0.55),
        slope: rand(-12, 8),
        ph: rand(0, 6.28), fl: rand(5, 8), alpha: rand(0.6, 0.85)
      });
    }

    function drawBird(x, y, s, f, alpha) {
      ctx.strokeStyle = `rgba(30,45,75,${alpha.toFixed(3)})`;
      ctx.lineWidth = Math.max(1.2, s * 0.26);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      const cy = y - s * 0.5 - f * s * 0.2;
      ctx.beginPath();
      ctx.moveTo(x - s * 1.15, y - f * s * 0.65);
      ctx.quadraticCurveTo(x - s * 0.55, cy, x, y);
      ctx.quadraticCurveTo(x + s * 0.55, cy, x + s * 1.15, y - f * s * 0.65);
      ctx.stroke();
    }

    function drawBirds(t, dt) {
      for (let i = birds.length - 1; i >= 0; i--) {
        const b = birds[i];
        b.t += dt;
        b.x += b.dir * b.speed * dt;
        const ly = b.y0 + b.slope * b.t + Math.sin(b.t * 0.8) * 8;
        if ((b.dir > 0 && b.x > W + b.n * b.size * 3 + 100) || (b.dir < 0 && b.x < -b.n * b.size * 3 - 100)) { birds.splice(i, 1); continue; }
        for (let k = 0; k < b.n; k++) {
          const row = Math.ceil(k / 2), side = k % 2 ? 1 : -1;
          const x = b.x - b.dir * row * b.size * 2.6;
          const y = ly + (k ? side * row * b.size * 1.5 : 0);
          const f = Math.sin(t * b.fl + b.ph + k * 0.5);
          drawBird(x, y, k ? b.size * 0.9 : b.size, f, b.alpha * (k ? 0.9 : 1));
        }
      }
    }

    function drawDusk(t) {
      const sx = W * 0.7, sy = H * 0.86, r = Math.min(W, H) * 0.07 * (1 + 0.02 * Math.sin(t * 0.6));
      let g = ctx.createRadialGradient(sx, sy, 0, sx, sy, Math.max(W, H) * 0.75);
      g.addColorStop(0, "rgba(255,220,150,.75)"); g.addColorStop(0.18, "rgba(255,150,110,.38)");
      g.addColorStop(0.5, "rgba(220,110,160,.14)"); g.addColorStop(1, "rgba(220,110,160,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 1.6);
      g.addColorStop(0, "rgba(255,252,230,1)"); g.addColorStop(0.55, "rgba(255,226,160,.95)"); g.addColorStop(1, "rgba(255,190,120,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, r * 1.6, 0, TAU); ctx.fill();
      const lim = H * 0.45;   // bintang pertama muncul di langit atas, memudar ke arah cakrawala
      for (const s of stars) {
        if (s.y > lim) continue;
        const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
        ctx.fillStyle = `rgba(255,255,255,${(s.a * tw * (1 - s.y / lim) * 0.8).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r || 1, 0, TAU); ctx.fill();
      }
    }

    function render(t, dt) {
      ctx.clearRect(0, 0, W, H);
      if (isLight()) {
        if (root.dataset.variant === "dusk") drawDusk(t); else drawRays(t);
        drawMotes(t, dt);
        if (!reduceMotion) {
          nextBird -= dt;
          if (nextBird <= 0 && birds.length < 3) { spawnFlock(); nextBird = rand(7, 14); }
          drawBirds(t, dt);
        }
      } else {
        drawGalaxy();
        drawAurora(t);
        drawStars(t, dt);
        drawMoon(t);
        if (!reduceMotion) {
          nextShoot -= dt;
          if (nextShoot <= 0) { spawnShooter(); nextShoot = rand(3.5, 8); }
          drawShooters(dt);
        }
        drawFlies(t);
      }
    }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      const t = ts / 1000;
      const dt = Math.min(0.05, t - last);
      last = t;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;
      render(t, dt);
    }

    function start() {
      if (raf || document.hidden || paused()) return;
      if (reduceMotion) { render(0, 0); return; }
      last = performance.now() / 1000;
      raf = requestAnimationFrame(frame);
    }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    build();
    start();

    let resizeTimer;
    let lastW = W, lastH = H;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // ignore the small height changes caused by mobile address bars
        if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 140) return;
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        build();
        if (reduceMotion) { stop(); start(); }
      }, 160);
    });
    window.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      tmx = (e.clientX / W - 0.5) * 2;
      tmy = (e.clientY / H - 0.5) * 2;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    new MutationObserver(() => {
      if (paused()) { stop(); return; }
      if (isLight()) nextBird = 1.2;   // ganti ke pagi: burung pertama segera lewat
      stop(); start();
    }).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach", "data-variant"] });
  })();

  /* ---------- Bantuan bersama untuk easter egg elang & alien ---------- */
  const EGG_SOUND = true;   // ganti false kalau tidak mau ada bunyi saat easter egg diklik
  let eggAC = null;
  function eggSound(kind) {
    if (!EGG_SOUND) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      eggAC = eggAC || new AC();
      if (eggAC.state === "suspended") eggAC.resume();
      const ac = eggAC, t0 = ac.currentTime;
      const out = ac.createGain(); out.gain.value = 0.5; out.connect(ac.destination);
      const tone = (type, f0, f1, at, dur, vol, vib) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.type = type;
        o.frequency.setValueAtTime(f0, t0 + at);
        if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t0 + at + dur);
        g.gain.setValueAtTime(0.0001, t0 + at);
        g.gain.exponentialRampToValueAtTime(vol, t0 + at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
        if (vib) {
          const l = ac.createOscillator(), lg = ac.createGain();
          l.frequency.value = vib[0]; lg.gain.value = vib[1];
          l.connect(lg); lg.connect(o.frequency);
          l.start(t0 + at); l.stop(t0 + at + dur + 0.05);
        }
        o.connect(g); g.connect(out);
        o.start(t0 + at); o.stop(t0 + at + dur + 0.05);
      };
      const whoosh = (at, dur, f0, f1, vol) => {
        const len = Math.floor(ac.sampleRate * dur), buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
        s.buffer = buf; f.type = "bandpass"; f.Q.value = 1.1;
        f.frequency.setValueAtTime(f0, t0 + at); f.frequency.exponentialRampToValueAtTime(f1, t0 + at + dur);
        g.gain.setValueAtTime(0.0001, t0 + at);
        g.gain.exponentialRampToValueAtTime(vol, t0 + at + dur * 0.35);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
        s.connect(f); f.connect(g); g.connect(out);
        s.start(t0 + at); s.stop(t0 + at + dur + 0.05);
      };
      if (kind === "eagle-charge") {
        tone("sine", 420, 1700, 0, 1.35, 0.1); tone("triangle", 840, 3400, 0.08, 1.25, 0.04);
      } else if (kind === "eagle-burst") {
        [1318.5, 1661.2, 1975.5, 2637].forEach((f, i) => { tone("sine", f, f, i * 0.07, 1.2, 0.2); tone("sine", f * 2.76, f * 2.76, i * 0.07, 0.5, 0.05); });
        whoosh(0, 0.7, 500, 3600, 0.22);
      } else if (kind === "ufo-beam") {
        tone("sine", 560, 170, 0, 1.3, 0.12, [7, 22]); tone("triangle", 280, 85, 0, 1.3, 0.08, [7, 10]);
      } else if (kind === "ufo-hi") {
        [[880, 0], [1175, 0.1], [988, 0.2]].forEach(([f, at]) => tone("sine", f, f * 1.03, at, 0.14, 0.12));
      } else if (kind === "ufo-warp") {
        tone("sine", 180, 2600, 0, 0.6, 0.13); tone("triangle", 90, 1300, 0, 0.6, 0.07); whoosh(0.05, 0.5, 300, 4200, 0.16);
      }
    } catch (_) { /* audio tidak tersedia */ }
  }

  // Posisi & kemiringan asli elemen yang sedang dianimasikan (dibaca dari matriks transform).
  function livePos(el) {
    try {
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return { x: m.m41, y: m.m42, rot: Math.atan2(m.m12, m.m11) * 180 / Math.PI };
    } catch (_) {
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, rot: 0 };
    }
  }

  // Cincin kejut yang melebar lalu hilang (warna dari kelas: ek-ring / au-ring).
  function eggRing(x, y, cls) {
    const r = document.createElement("span");
    r.className = "egg-ring " + cls;
    r.style.left = x + "px"; r.style.top = y + "px";
    document.body.appendChild(r);
    r.animate([
      { transform: "scale(.15)", opacity: 0.95 },
      { transform: "scale(3.8)", opacity: 0 }
    ], { duration: 850, easing: "cubic-bezier(.15,.7,.25,1)", fill: "forwards" }).onfinish = () => r.remove();
  }

  /* ---------- Easter egg PAGI: ELANG RAJA bermahkota (jarang lewat, bisa diklik) ---------- */
  (function eagleKing() {
    const lightOn = () => root.dataset.theme === "light" && !root.dataset.bleach;
    const EAGLE_SVG = `
<svg class="ek-svg" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
<defs>
  <linearGradient id="ekGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe98f"/><stop offset=".55" stop-color="#f3b92a"/><stop offset="1" stop-color="#cf8a0c"/></linearGradient>
  <linearGradient id="ekBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4f28"/><stop offset=".6" stop-color="#52331a"/><stop offset="1" stop-color="#34200f"/></linearGradient>
  <radialGradient id="ekHead" cx=".55" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ece5d4"/></radialGradient>
</defs>
<g class="ek-bodywrap">
  <g class="ek-wing ek-far" style="transform-origin:120px 120px"><g transform="translate(118.0 114.0) rotate(-112.0)"><path d="M-6.4 0 L-6.1 -39.6 Q-5.8 -46.0 0 -46.0 Q5.8 -46.0 6.1 -39.6 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.5 L0 -41.4" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(117.4 108.3) rotate(-106.3)"><path d="M-6.4 0 L-6.1 -38.7 Q-5.8 -45.1 0 -45.1 Q5.8 -45.1 6.1 -38.7 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.4 L0 -40.6" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.9 102.6) rotate(-100.6)"><path d="M-6.4 0 L-6.1 -37.9 Q-5.8 -44.3 0 -44.3 Q5.8 -44.3 6.1 -37.9 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.3 L0 -39.9" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.3 96.9) rotate(-94.9)"><path d="M-6.4 0 L-6.1 -37.0 Q-5.8 -43.4 0 -43.4 Q5.8 -43.4 6.1 -37.0 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.2 L0 -39.1" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.7 91.1) rotate(-89.1)"><path d="M-6.4 0 L-6.1 -36.2 Q-5.8 -42.6 0 -42.6 Q5.8 -42.6 6.1 -36.2 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.1 L0 -38.3" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.1 85.4) rotate(-83.4)"><path d="M-6.4 0 L-6.1 -35.3 Q-5.8 -41.7 0 -41.7 Q5.8 -41.7 6.1 -35.3 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.0 L0 -37.5" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.6 79.7) rotate(-77.7)"><path d="M-6.4 0 L-6.1 -34.5 Q-5.8 -40.9 0 -40.9 Q5.8 -40.9 6.1 -34.5 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -4.9 L0 -36.8" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 74.0) rotate(-72.0)"><path d="M-6.4 0 L-6.1 -33.6 Q-5.8 -40.0 0 -40.0 Q5.8 -40.0 6.1 -33.6 L6.4 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -4.8 L0 -36.0" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 118.0) rotate(-124.0)"><path d="M-6.0 0 L-5.7 -24.0 Q-5.4 -30.0 0 -30.0 Q5.4 -30.0 5.7 -24.0 L6.0 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.6 L0 -27.0" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 113.0) rotate(-118.0)"><path d="M-6.0 0 L-5.7 -22.0 Q-5.4 -28.0 0 -28.0 Q5.4 -28.0 5.7 -22.0 L6.0 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.4 L0 -25.2" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 108.0) rotate(-112.0)"><path d="M-6.0 0 L-5.7 -20.0 Q-5.4 -26.0 0 -26.0 Q5.4 -26.0 5.7 -20.0 L6.0 0 Z" fill="#3a2312" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -23.4" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><path d="M122 122 L114 72" stroke="#58381c" stroke-width="19" stroke-linecap="round" fill="none"/><g transform="translate(122.0 118.0) rotate(-100.0)"><path d="M-5.8 0 L-5.5 -20.2 Q-5.2 -26.0 0 -26.0 Q5.2 -26.0 5.5 -20.2 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -23.4" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(120.8 111.0) rotate(-95.0)"><path d="M-5.8 0 L-5.5 -19.7 Q-5.2 -25.5 0 -25.5 Q5.2 -25.5 5.5 -19.7 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -22.9" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.7 104.0) rotate(-90.0)"><path d="M-5.8 0 L-5.5 -19.2 Q-5.2 -25.0 0 -25.0 Q5.2 -25.0 5.5 -19.2 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.0 L0 -22.5" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(118.5 97.0) rotate(-85.0)"><path d="M-5.8 0 L-5.5 -18.7 Q-5.2 -24.5 0 -24.5 Q5.2 -24.5 5.5 -18.7 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.9 L0 -22.1" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(117.3 90.0) rotate(-80.0)"><path d="M-5.8 0 L-5.5 -18.2 Q-5.2 -24.0 0 -24.0 Q5.2 -24.0 5.5 -18.2 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.9 L0 -21.6" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.2 83.0) rotate(-75.0)"><path d="M-5.8 0 L-5.5 -17.7 Q-5.2 -23.5 0 -23.5 Q5.2 -23.5 5.5 -17.7 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.8 L0 -21.2" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.0 76.0) rotate(-70.0)"><path d="M-5.8 0 L-5.5 -17.2 Q-5.2 -23.0 0 -23.0 Q5.2 -23.0 5.5 -17.2 L5.8 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.8 L0 -20.7" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><path d="M124 120 L117 76" stroke="#946033" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/><g class="ek-hand" style="transform-origin:114px 72px"><g transform="translate(114.0 72.0) rotate(0.0)"><path d="M-5.2 0 L-4.9 -54.8 Q-4.7 -60.0 0 -60.0 Q4.7 -60.0 4.9 -54.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.2 L0 -54.0" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-12.0)"><path d="M-5.2 0 L-4.9 -60.8 Q-4.7 -66.0 0 -66.0 Q4.7 -66.0 4.9 -60.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.9 L0 -59.4" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-24.0)"><path d="M-5.2 0 L-4.9 -62.8 Q-4.7 -68.0 0 -68.0 Q4.7 -68.0 4.9 -62.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -8.2 L0 -61.2" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-37.0)"><path d="M-5.2 0 L-4.9 -60.8 Q-4.7 -66.0 0 -66.0 Q4.7 -66.0 4.9 -60.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.9 L0 -59.4" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-50.0)"><path d="M-5.2 0 L-4.9 -56.8 Q-4.7 -62.0 0 -62.0 Q4.7 -62.0 4.9 -56.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.4 L0 -55.8" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-63.0)"><path d="M-5.2 0 L-4.9 -50.8 Q-4.7 -56.0 0 -56.0 Q4.7 -56.0 4.9 -50.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -6.7 L0 -50.4" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-77.0)"><path d="M-5.2 0 L-4.9 -44.8 Q-4.7 -50.0 0 -50.0 Q4.7 -50.0 4.9 -44.8 L5.2 0 Z" fill="#2a190c" stroke="#1b0f06" stroke-width="1" stroke-linejoin="round"/><path d="M0 -6.0 L0 -45.0" stroke="#1b0f06" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.0 78.0) rotate(12.0)"><path d="M-3.4 0 L-3.2 -14.6 Q-3.1 -18.0 0 -18.0 Q3.1 -18.0 3.2 -14.6 L3.4 0 Z" fill="#52331a" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.2 L0 -16.2" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><circle cx="114" cy="72" r="8.5" fill="#58381c"/></g></g>
  <rect x="8" y="114.5" width="68" height="13" rx="6.5" fill="#fbf8f0" stroke="#d6cbb4" stroke-width="1.2" transform="rotate(-16 74 124)"/><rect x="8" y="114.5" width="68" height="13" rx="6.5" fill="#fbf8f0" stroke="#d6cbb4" stroke-width="1.2" transform="rotate(-8 74 124)"/><rect x="8" y="114.5" width="68" height="13" rx="6.5" fill="#fbf8f0" stroke="#d6cbb4" stroke-width="1.2" transform="rotate(0 74 124)"/><rect x="8" y="114.5" width="68" height="13" rx="6.5" fill="#fbf8f0" stroke="#d6cbb4" stroke-width="1.2" transform="rotate(8 74 124)"/><rect x="8" y="114.5" width="68" height="13" rx="6.5" fill="#fbf8f0" stroke="#d6cbb4" stroke-width="1.2" transform="rotate(16 74 124)"/>
  <path d="M160 108 C173 112 181 125 173 137 C160 153 120 157 88 141 L66 135 L70 118 C100 104 135 100 160 108 Z" fill="url(#ekBody)" stroke="#2a190c" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M96 118 Q112 110 138 111 M92 128 Q118 119 152 121 M100 138 Q128 130 160 132" fill="none" stroke="#2a190c" stroke-width="1" opacity=".35" stroke-linecap="round"/>
  <path d="M104 142 C112 154 132 156 144 148" fill="none" stroke="#7a5028" stroke-width="1" opacity=".5"/>
  <path d="M118 151 L109 170 M129 152 L126 172" stroke="#f2b632" stroke-width="4.6" stroke-linecap="round"/>
  <path d="M109 170 l-9 5 M109 170 l-2 8 M109 170 l7 5 M126 172 l-9 5 M126 172 l-1 8 M126 172 l8 4" stroke="#e0a21a" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <path d="M155 114 C156 96 168 85 186 86 C201 87 208 100 202 113 C197 123 184 129 172 134 L160 131 Z" fill="url(#ekHead)" stroke="#d9ceb6" stroke-width="1.2"/>
  <path d="M158 118 q5 4 10 2 M160 126 q6 4 12 1 M168 108 q6 3 11 0" fill="none" stroke="#cfc3aa" stroke-width="1" stroke-linecap="round" opacity=".8"/>
  <path d="M199 94 C215 91 230 100 228 117 C227 124 220 123 219 117 C218 111 209 109 201 111 Z" fill="#f6bd2f" stroke="#b9780a" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M201 109 C210 109 216 112 219 117" fill="none" stroke="#b9780a" stroke-width="1.3" stroke-linecap="round"/>
  <circle cx="208" cy="99" r="1.5" fill="#8a5a06"/>
  <path d="M183 92 L204 99" stroke="#b8893a" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="194" cy="101" r="4.6" fill="#f8d84c" stroke="#a97a10" stroke-width=".8"/>
  <circle cx="194.6" cy="101.2" r="2.4" fill="#1b1209"/><circle cx="195.5" cy="100.2" r=".9" fill="#fff"/><circle class="ek-eye-glow" cx="194.6" cy="101.2" r="3.25" fill="#fff" opacity="0"/>
  <g class="ek-crown" transform="translate(0 -25) rotate(-5 188 63)">
  <!-- mahkota emas: bentuk lebih tegas dengan ukiran halus -->
  <path d="M173 89 L169 65 L180 76 L188 57 L197 76 L207 65 L203 90 Z"
        fill="url(#ekGold)" stroke="#94620a" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M176 85 L173 69 L181 78 L188 62 L195 78 L203 69 L200 85 Z"
        fill="none" stroke="#fff2b0" stroke-width="1.15" opacity=".82" stroke-linejoin="round"/>
  <path d="M173 87 Q188 91 203 87 L203 94 Q188 98 173 94 Z"
        fill="url(#ekGold)" stroke="#94620a" stroke-width="1.5"/>
  <path d="M176 91 Q188 94 200 91" fill="none" stroke="#fff0a0" stroke-width="1" opacity=".9"/>
  <circle cx="169" cy="64" r="3.1" fill="#fff6c8" stroke="#c98a0c" stroke-width=".9"/>
  <circle cx="188" cy="57" r="4" fill="#3aa0ff" stroke="#1e5fb0" stroke-width="1"/>
  <circle cx="207" cy="64" r="3.1" fill="#fff6c8" stroke="#c98a0c" stroke-width=".9"/>
  <path d="M181 78 L188 72 L195 78" fill="none" stroke="#a86d0a" stroke-width="1.1" opacity=".85"/>
  <circle cx="181" cy="89" r="2.4" fill="#e8344a" stroke="#a91f31" stroke-width=".5"/>
  <circle cx="188" cy="90" r="2.6" fill="#3aa0ff" stroke="#1e5fb0" stroke-width=".5"/>
  <circle cx="195" cy="89" r="2.4" fill="#e8344a" stroke="#a91f31" stroke-width=".5"/>
  <path d="M177 96 Q188 99 199 96" fill="none" stroke="#8b5b0a" stroke-width="1.1" opacity=".7"/>
</g>
  <g class="ek-wing ek-near" style="transform-origin:120px 120px"><g transform="translate(118.0 114.0) rotate(-112.0)"><path d="M-6.4 0 L-6.1 -39.6 Q-5.8 -46.0 0 -46.0 Q5.8 -46.0 6.1 -39.6 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.5 L0 -41.4" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(117.4 108.3) rotate(-106.3)"><path d="M-6.4 0 L-6.1 -38.7 Q-5.8 -45.1 0 -45.1 Q5.8 -45.1 6.1 -38.7 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.4 L0 -40.6" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.9 102.6) rotate(-100.6)"><path d="M-6.4 0 L-6.1 -37.9 Q-5.8 -44.3 0 -44.3 Q5.8 -44.3 6.1 -37.9 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.3 L0 -39.9" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.3 96.9) rotate(-94.9)"><path d="M-6.4 0 L-6.1 -37.0 Q-5.8 -43.4 0 -43.4 Q5.8 -43.4 6.1 -37.0 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.2 L0 -39.1" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.7 91.1) rotate(-89.1)"><path d="M-6.4 0 L-6.1 -36.2 Q-5.8 -42.6 0 -42.6 Q5.8 -42.6 6.1 -36.2 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.1 L0 -38.3" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.1 85.4) rotate(-83.4)"><path d="M-6.4 0 L-6.1 -35.3 Q-5.8 -41.7 0 -41.7 Q5.8 -41.7 6.1 -35.3 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -5.0 L0 -37.5" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.6 79.7) rotate(-77.7)"><path d="M-6.4 0 L-6.1 -34.5 Q-5.8 -40.9 0 -40.9 Q5.8 -40.9 6.1 -34.5 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -4.9 L0 -36.8" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 74.0) rotate(-72.0)"><path d="M-6.4 0 L-6.1 -33.6 Q-5.8 -40.0 0 -40.0 Q5.8 -40.0 6.1 -33.6 L6.4 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -4.8 L0 -36.0" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 118.0) rotate(-124.0)"><path d="M-6.0 0 L-5.7 -24.0 Q-5.4 -30.0 0 -30.0 Q5.4 -30.0 5.7 -24.0 L6.0 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.6 L0 -27.0" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 113.0) rotate(-118.0)"><path d="M-6.0 0 L-5.7 -22.0 Q-5.4 -28.0 0 -28.0 Q5.4 -28.0 5.7 -22.0 L6.0 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.4 L0 -25.2" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.0 108.0) rotate(-112.0)"><path d="M-6.0 0 L-5.7 -20.0 Q-5.4 -26.0 0 -26.0 Q5.4 -26.0 5.7 -20.0 L6.0 0 Z" fill="#4d3019" stroke="#2d1a0b" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -23.4" stroke="#2d1a0b" stroke-width=".8" opacity=".55" fill="none"/></g><path d="M122 122 L114 72" stroke="#7a5028" stroke-width="19" stroke-linecap="round" fill="none"/><g transform="translate(122.0 118.0) rotate(-100.0)"><path d="M-5.8 0 L-5.5 -20.2 Q-5.2 -26.0 0 -26.0 Q5.2 -26.0 5.5 -20.2 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -23.4" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(120.8 111.0) rotate(-95.0)"><path d="M-5.8 0 L-5.5 -19.7 Q-5.2 -25.5 0 -25.5 Q5.2 -25.5 5.5 -19.7 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.1 L0 -22.9" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(119.7 104.0) rotate(-90.0)"><path d="M-5.8 0 L-5.5 -19.2 Q-5.2 -25.0 0 -25.0 Q5.2 -25.0 5.5 -19.2 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -3.0 L0 -22.5" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(118.5 97.0) rotate(-85.0)"><path d="M-5.8 0 L-5.5 -18.7 Q-5.2 -24.5 0 -24.5 Q5.2 -24.5 5.5 -18.7 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.9 L0 -22.1" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(117.3 90.0) rotate(-80.0)"><path d="M-5.8 0 L-5.5 -18.2 Q-5.2 -24.0 0 -24.0 Q5.2 -24.0 5.5 -18.2 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.9 L0 -21.6" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.2 83.0) rotate(-75.0)"><path d="M-5.8 0 L-5.5 -17.7 Q-5.2 -23.5 0 -23.5 Q5.2 -23.5 5.5 -17.7 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.8 L0 -21.2" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(115.0 76.0) rotate(-70.0)"><path d="M-5.8 0 L-5.5 -17.2 Q-5.2 -23.0 0 -23.0 Q5.2 -23.0 5.5 -17.2 L5.8 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.8 L0 -20.7" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><path d="M124 120 L117 76" stroke="#946033" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/><g class="ek-hand" style="transform-origin:114px 72px"><g transform="translate(114.0 72.0) rotate(0.0)"><path d="M-5.2 0 L-4.9 -54.8 Q-4.7 -60.0 0 -60.0 Q4.7 -60.0 4.9 -54.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.2 L0 -54.0" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-12.0)"><path d="M-5.2 0 L-4.9 -60.8 Q-4.7 -66.0 0 -66.0 Q4.7 -66.0 4.9 -60.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.9 L0 -59.4" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-24.0)"><path d="M-5.2 0 L-4.9 -62.8 Q-4.7 -68.0 0 -68.0 Q4.7 -68.0 4.9 -62.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -8.2 L0 -61.2" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-37.0)"><path d="M-5.2 0 L-4.9 -60.8 Q-4.7 -66.0 0 -66.0 Q4.7 -66.0 4.9 -60.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.9 L0 -59.4" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-50.0)"><path d="M-5.2 0 L-4.9 -56.8 Q-4.7 -62.0 0 -62.0 Q4.7 -62.0 4.9 -56.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -7.4 L0 -55.8" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-63.0)"><path d="M-5.2 0 L-4.9 -50.8 Q-4.7 -56.0 0 -56.0 Q4.7 -56.0 4.9 -50.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -6.7 L0 -50.4" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(114.0 72.0) rotate(-77.0)"><path d="M-5.2 0 L-4.9 -44.8 Q-4.7 -50.0 0 -50.0 Q4.7 -50.0 4.9 -44.8 L5.2 0 Z" fill="#3b2412" stroke="#241408" stroke-width="1" stroke-linejoin="round"/><path d="M0 -6.0 L0 -45.0" stroke="#241408" stroke-width=".8" opacity=".55" fill="none"/></g><g transform="translate(116.0 78.0) rotate(12.0)"><path d="M-3.4 0 L-3.2 -14.6 Q-3.1 -18.0 0 -18.0 Q3.1 -18.0 3.2 -14.6 L3.4 0 Z" fill="#6d4624" stroke="#3a2210" stroke-width="1" stroke-linejoin="round"/><path d="M0 -2.2 L0 -16.2" stroke="#3a2210" stroke-width=".8" opacity=".55" fill="none"/></g><circle cx="114" cy="72" r="8.5" fill="#7a5028"/></g></g>
</g>
</svg>`;

    let flying = null;                 // { el, anim }
    let countdown = rand(40, 80);      // detik (hanya berkurang saat mode terang & tab terlihat)
    let toastTimer = 0;

    function removeEagle() {
      if (!flying) return;
      try { flying.anim.cancel(); } catch (_) { /* sudah dibatalkan */ }
      if (flying.trailTimer) clearInterval(flying.trailTimer);
      flying.el.remove();
      flying = null;
    }

    function sparkles(x, y) {
      for (let i = 0; i < 16; i++) {
        const s = document.createElement("span");
        s.className = "ek-spark";
        s.textContent = i % 3 ? "✦" : "★";
        s.style.left = x + "px"; s.style.top = y + "px";
        s.style.fontSize = rand(12, 24) + "px";
        document.body.appendChild(s);
        const ang = rand(0, Math.PI * 2), dist = rand(50, 140);
        const a = s.animate([
          { transform: "translate(-50%,-50%) scale(.3)", opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist + 30}px)) scale(1) rotate(${rand(-90, 90)}deg)`, opacity: 0 }
        ], { duration: rand(800, 1400), easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" });
        a.onfinish = () => s.remove();
      }
    }

    // Bulu emas: jatuh melayang pelan dengan goyangan kiri-kanan (jejak saat elang lewat + hujan bulu saat ditangkap).
    const FEATHER_SVG = '<svg viewBox="0 0 24 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<path d="M12 1C21 13 23 35 12 58C1 35 3 13 12 1Z" fill="#f6c244" stroke="#b9780a" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M12 1C17 12 18 30 12 58C8 32 8 13 12 1Z" fill="#ffe58a" opacity=".85"/>' +
      '<path d="M12 6V58M12 20L6 15M12 20L18 15M12 32L5 26M12 32L19 26M12 44L7 39M12 44L17 39" fill="none" stroke="#a86d0a" stroke-width="1" stroke-linecap="round" opacity=".7"/></svg>';

    function featherFall(x, y, o) {
      o = o || {};
      const f = document.createElement("span");
      f.className = "ek-feather";
      const w = rand(9, 15) * (o.size || 1);
      f.style.width = w + "px"; f.style.height = w * 2.5 + "px";
      f.innerHTML = FEATHER_SVG;
      document.body.appendChild(f);
      const drop = o.drop || 160, sway = rand(26, 60), ph = rand(0, 6.28), r0 = rand(-70, 70), turn = rand(50, 120) * (Math.random() < 0.5 ? -1 : 1);
      const steps = 8, kf = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        kf.push({
          transform: `translate(${x + Math.sin(t * Math.PI * 3 + ph) * sway}px,${y + drop * t}px) rotate(${r0 + Math.sin(t * Math.PI * 3 + ph + 1) * turn * 0.5}deg)`,
          opacity: t < 0.12 ? t / 0.12 : t > 0.75 ? (1 - t) / 0.25 : 1,
          offset: t
        });
      }
      f.animate(kf, { duration: o.dur || 2800, easing: "linear", fill: "forwards" }).onfinish = () => f.remove();
    }

    // Hujan bulu emas memenuhi layar saat elang berubah wujud.
    function featherRain() {
      if (reduceMotion) return;
      const vw = window.innerWidth, vh = window.innerHeight, n = vw < 600 ? 22 : 38;
      for (let i = 0; i < n; i++) {
        setTimeout(() => featherFall(rand(0, vw), -50, { drop: vh + 120, dur: rand(3800, 6800), size: rand(0.9, 1.7) }), rand(0, 1300));
      }
    }

    // Kilatan cahaya hangat dari posisi elang.
    function glowFlash(cx, cy) {
      const f = document.createElement("div");
      f.className = "ek-flash";
      f.style.background = `radial-gradient(circle at ${cx}px ${cy}px, rgba(255,250,215,.95), rgba(255,214,100,.55) 22%, rgba(255,200,80,.16) 48%, transparent 72%)`;
      document.body.appendChild(f);
      f.animate([{ opacity: 0 }, { opacity: 1, offset: 0.18 }, { opacity: 0 }], { duration: 900, easing: "ease-out" }).onfinish = () => f.remove();
    }

    // Kilau emas kecil tertinggal di belakang elang; sesekali sehelai bulu ikut rontok.
    function startGoldTrail(el, dir) {
      let n = 0;
      return setInterval(() => {
        if (!el.isConnected) return;
        const r = el.getBoundingClientRect();
        const dot = document.createElement("span");
        dot.className = "ek-trail";
        dot.textContent = Math.random() < .35 ? "✦" : "·";
        const x = dir > 0 ? r.left + r.width * .18 : r.left + r.width * .82;
        const y = r.top + r.height * rand(.35, .78);
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        dot.style.fontSize = rand(7, 15) + "px";
        document.body.appendChild(dot);
        const drift = rand(-17, 17);
        const life = rand(650, 1050);
        const a = dot.animate([
          { transform: "translate(-50%,-50%) scale(.45)", opacity: 0 },
          { transform: `translate(calc(-50% + ${-dir * rand(12, 28)}px), calc(-50% + ${drift}px)) scale(1)`, opacity: .95, offset: .28 },
          { transform: `translate(calc(-50% + ${-dir * rand(28, 48)}px), calc(-50% + ${drift * 1.7}px)) scale(.2)`, opacity: 0 }
        ], { duration: life, easing: "ease-out", fill: "forwards" });
        a.onfinish = () => dot.remove();
        if (!reduceMotion && ++n % 8 === 0) featherFall(r.left + r.width * .5, r.top + r.height * .7, { drop: rand(110, 190), dur: rand(2400, 3400), size: 0.8 });
      }, 145);
    }

    // Semburan partikel emas yang rapat saat elang berubah dan melesat.
    function goldDashBurst(el, dir) {
      let ticks = 0;
      const timer = setInterval(() => {
        if (!el.isConnected || ticks++ > 30) { clearInterval(timer); return; }
        const r = el.getBoundingClientRect();
        for (let i = 0; i < 2; i++) {
          const p = document.createElement("span");
          p.className = "ek-dash-spark";
          p.textContent = Math.random() < .55 ? "✦" : "•";
          p.style.left = (dir > 0 ? r.left + r.width * .2 : r.left + r.width * .8) + "px";
          p.style.top = (r.top + r.height * rand(.2, .85)) + "px";
          p.style.fontSize = rand(9, 19) + "px";
          document.body.appendChild(p);
          const dx = -dir * rand(45, 115), dy = rand(-34, 34);
          const a = p.animate([
            { transform: "translate(-50%,-50%) scale(.35)", opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(1.25) rotate(${rand(-120,120)}deg)`, opacity: 0 }
          ], { duration: rand(260, 520), easing: "cubic-bezier(.12,.72,.2,1)", fill: "forwards" });
          a.onfinish = () => p.remove();
        }
      }, 24);
      return timer;
    }

    function hideToast() {
      clearTimeout(toastTimer);
      document.getElementById("eagleToast")?.classList.remove("show");
    }

    function showToast() {
      let n = 1;
      try { n = (parseInt(localStorage.getItem("eagleFound") || "0", 10) || 0) + 1; localStorage.setItem("eagleFound", String(n)); } catch (_) { /* private mode */ }
      let t = document.getElementById("eagleToast");
      if (!t) {
        t = document.createElement("div");
        t.id = "eagleToast"; t.className = "eagle-toast";
        t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite");
        t.innerHTML = '<div class="et-crown" aria-hidden="true">👑</div>' +
          '<p class="et-title"><span class="et-grad">Selamat!</span> 🎉</p>' +
          '<p class="et-text">Ini <b>easter egg</b>! Kamu berhasil menangkap Elang Raja yang jarang sekali lewat.</p>' +
          '<p class="et-sub"></p>' +
          '<button type="button" class="et-close">Tutup</button>';
        t.querySelector(".et-close").addEventListener("click", hideToast);
        document.body.appendChild(t);
      }
      t.querySelector(".et-sub").textContent = n > 1 ? "Easter egg ini sudah kamu temukan " + n + " kali" : "Easter egg pertamamu di sini";
      void t.offsetWidth;              // ulang animasi masuk
      t.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(hideToast, 7000);
    }

    function spawn() {
      if (flying || !lightOn()) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      const dir = Math.random() < 0.5 ? 1 : -1;       // 1 = terbang ke kanan
      const w = vw < 600 ? 92 : 128, h = Math.round(w * 200 / 280);

      const el = document.createElement("button");
      el.type = "button"; el.tabIndex = -1;
      el.className = "eagle-king";
      el.setAttribute("aria-label", "Elang raja bermahkota. Ketuk untuk kejutan!");
      el.style.width = w + "px"; el.style.height = h + "px";
      el.innerHTML = '<span class="ek-flip" style="transform:scaleX(' + dir + ')">' + EAGLE_SVG + "</span>";
      document.body.appendChild(el);

      // Jalur melayang: naik-turun lembut seperti terbawa arus udara, badan miring mengikuti arah.
      const y0 = rand(vh * 0.10, vh * 0.30), y1 = y0 + rand(-30, 40);
      const sx = dir > 0 ? -w - 40 : vw + 40, ex = dir > 0 ? vw + 40 : -w - 40;
      const span = Math.abs(ex - sx), N = 8, amp = rand(14, 30), ph = rand(0, 6.28);
      const ys = Array.from({ length: N + 1 }, (_, i) => {
        const t = i / N;
        return y0 + (y1 - y0) * t + Math.sin(t * Math.PI * 2 + ph) * amp - Math.sin(t * Math.PI) * 14;
      });
      const frames = ys.map((y, i) => {
        const a = Math.max(0, i - 1), b = Math.min(N, i + 1);
        const rot = dir * Math.max(-9, Math.min(9, Math.atan2(ys[b] - ys[a], span * (b - a) / N) * 57.3 * 0.7));
        return { transform: `translate3d(${sx + (ex - sx) * i / N}px,${y}px,0) rotate(${rot}deg)`, offset: i / N };
      });
      const dur = Math.max(9000, (span / (vw < 600 ? 70 : 95)) * 1000);   // elang raja terbang anggun & pelan
      const anim = el.animate(frames, { duration: dur, easing: "linear", fill: "forwards" });
      anim.onfinish = removeEagle;
      flying = { el, anim, trailTimer: startGoldTrail(el, dir), dir };

      el.addEventListener("click", e => {
        e.preventDefault();
        if (el.dataset.found || !flying || flying.el !== el) return;
        el.dataset.found = "1";
        el.classList.add("is-found", "is-golden");
        const dirNow = flying.dir || dir;
        const p = livePos(el);
        try { flying.anim.cancel(); } catch (_) { /* animasi awal selesai */ }
        if (flying.trailTimer) clearInterval(flying.trailTimer);
        el.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        const cx = p.x + w / 2, cy = p.y + h / 2;
        sparkles(cx, cy);
        eggSound("eagle-charge");
        // Fase 1: elang menahan posisi, membesar, sayap mengepak cepat, sinar emas berputar di belakangnya.
        el.classList.add("is-charging");
        setTimeout(() => {
          if (!el.isConnected) return;
          // Fase 2: ledakan cahaya, cincin kejut, hujan bulu emas, lalu melesat dengan ekor komet.
          el.classList.remove("is-charging");
          eggRing(cx, cy, "ek-ring");
          setTimeout(() => eggRing(cx, cy, "ek-ring"), 140);
          glowFlash(cx, cy);
          featherRain();
          goldDashBurst(el, dirNow);
          eggSound("eagle-burst");
          const comet = document.createElement("span");
          comet.className = "ek-comet";
          comet.style.cssText = (dirNow > 0 ? "right:56%;transform-origin:right center;background:linear-gradient(to left," : "left:56%;transform-origin:left center;background:linear-gradient(to right,") +
            "rgba(255,240,170,.95),rgba(255,196,60,.55) 38%,rgba(255,180,40,0))";
          el.appendChild(comet);
          const vwNow = window.innerWidth;
          const endX = dirNow > 0 ? vwNow + w * 1.8 : -w * 2.2;
          const endY = p.y - rand(60, 130);
          const dash = el.animate([
            { transform: `translate3d(${p.x}px,${p.y}px,0) scale(1)`, opacity: 1, easing: "ease-out" },
            { transform: `translate3d(${p.x - dirNow * 18}px,${p.y + 10}px,0) scale(1.14)`, opacity: 1, offset: .2, easing: "cubic-bezier(.5,0,.9,.45)" },
            { transform: `translate3d(${p.x + (endX - p.x) * .5}px,${p.y - 40}px,0) scale(.85) rotate(${-dirNow * 6}deg)`, opacity: 1, offset: .55, easing: "linear" },
            { transform: `translate3d(${endX}px,${endY}px,0) scale(.16) rotate(${-dirNow * 12}deg)`, opacity: 0 }
          ], { duration: 1100, easing: "linear", fill: "forwards" });
          if (flying && flying.el === el) flying.anim = dash;
          dash.onfinish = () => {
            if (flying && flying.el === el) flying = null;
            el.remove();
            showToast();
          };
        }, reduceMotion ? 0 : 1400);
      });
    }

    // Jarang muncul: pertama ~40-80 dtk setelah mode terang aktif, lalu tiap ~3-6 menit.
    setInterval(() => {
      if (document.hidden || reduceMotion || flying || !lightOn() || document.body.classList.contains("is-loading")) return;
      countdown -= 1;
      if (countdown <= 0) { spawn(); countdown = rand(180, 360); }
    }, 1000);

    new MutationObserver(() => { if (!lightOn()) { removeEagle(); hideToast(); } })
      .observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach"] });
    document.addEventListener("keydown", e => { if (e.key === "Escape") hideToast(); });

    // Untuk mencoba langsung: buka Console (F12), ketik  elangRaja()  (harus di mode terang)
    window.elangRaja = () => { removeEagle(); spawn(); };
  })();

  /* ---------- Easter egg MALAM: UFO & ALIEN NYASAR (mode gelap) ---------- */
  (function lostAlienUfo() {
    const darkOn = () => root.dataset.theme === "dark" && !root.dataset.bleach;

    // Kepala alien dipakai dua kali: sebagai penumpang di kubah UFO dan sebagai tamu kecil yang turun lewat sinar.
    const ALIEN_G = `
  <g class="au-ant au-ant-l"><path d="M99 37 Q91 26 87 19" fill="none" stroke="#65d87b" stroke-width="3" stroke-linecap="round"/><circle cx="86" cy="17" r="4" fill="#b8ff8b"/></g>
  <g class="au-ant au-ant-r"><path d="M121 37 Q129 26 133 19" fill="none" stroke="#65d87b" stroke-width="3" stroke-linecap="round"/><circle cx="134" cy="17" r="4" fill="#b8ff8b"/></g>
  <ellipse cx="110" cy="54" rx="24" ry="25" fill="url(#au-alien)" stroke="#267f52" stroke-width="1.8"/>
  <g class="au-eyes"><g class="au-blink">
    <ellipse cx="100" cy="53" rx="5.5" ry="8" fill="#102d39"/><ellipse cx="120" cy="53" rx="5.5" ry="8" fill="#102d39"/>
    <circle cx="102" cy="50" r="1.8" fill="#fff"/><circle cx="122" cy="50" r="1.8" fill="#fff"/>
  </g></g>
  <path class="au-mouth" d="M105 67 Q110 71 115 67" fill="none" stroke="#28734c" stroke-width="2" stroke-linecap="round"/>
  <circle cx="94" cy="64" r="4" fill="#ff9caa" opacity=".7"/><circle cx="126" cy="64" r="4" fill="#ff9caa" opacity=".7"/>`;

    const UFO_SVG = `
<svg class="alien-ufo-svg" viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
 <defs>
  <linearGradient id="au-saucer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8e7ed"/><stop offset=".48" stop-color="#8299a7"/><stop offset="1" stop-color="#3d5363"/></linearGradient>
  <linearGradient id="au-glass" x1="0" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#eafff5" stop-opacity=".95"/><stop offset=".45" stop-color="#75e8b0" stop-opacity=".85"/><stop offset="1" stop-color="#168b68" stop-opacity=".9"/></linearGradient>
  <radialGradient id="au-alien" cx=".35" cy=".25" r=".8"><stop offset="0" stop-color="#d8ff9c"/><stop offset="1" stop-color="#58c96e"/></radialGradient>
  <filter id="au-glow"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 </defs>
 <path d="M65 77 C67 36 84 17 110 17 C136 17 153 36 155 77Z" fill="url(#au-glass)" stroke="#a8ffd0" stroke-width="2.5"/>
 <g class="alien-passenger">${ALIEN_G}</g>
 <path d="M82 47 Q95 24 119 27" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".75"/>
 <path d="M29 82 Q110 47 191 82 Q184 105 110 108 Q36 105 29 82Z" fill="url(#au-saucer)" stroke="#d8f5ed" stroke-width="2.2"/>
 <path d="M29 82 Q110 101 191 82" fill="none" stroke="#e9fff6" stroke-width="2" opacity=".9"/>
 <path d="M45 84 Q110 64 175 84" fill="none" stroke="#344c5d" stroke-width="2" opacity=".65"/>
 <g fill="#baff83" stroke="#397f65" stroke-width="1" filter="url(#au-glow)">
  <circle class="au-lt" style="animation-delay:0s" cx="57" cy="91" r="4.2"/><circle class="au-lt" style="animation-delay:-.2s" cx="83" cy="98" r="4.2"/><circle class="au-lt" style="animation-delay:-.4s" cx="110" cy="100" r="4.2"/><circle class="au-lt" style="animation-delay:-.6s" cx="137" cy="98" r="4.2"/><circle class="au-lt" style="animation-delay:-.8s" cx="163" cy="91" r="4.2"/>
 </g>
 <path d="M79 109 Q110 118 141 109" fill="none" stroke="#75f0a8" stroke-width="3" stroke-linecap="round" opacity=".8"/>
 <circle cx="110" cy="119" r="3" fill="#d5ff9b"/>
</svg>`;

    const VISITOR_SVG = `
<svg class="au-visitor-svg" viewBox="78 8 64 92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
 <defs><radialGradient id="au-alien2" cx=".35" cy=".25" r=".8"><stop offset="0" stop-color="#d8ff9c"/><stop offset="1" stop-color="#58c96e"/></radialGradient></defs>
 <path d="M119 80 Q128 86 130 94" fill="none" stroke="#58c96e" stroke-width="5" stroke-linecap="round"/>
 <path class="au-arm" d="M101 80 Q90 76 88 66" fill="none" stroke="#58c96e" stroke-width="5" stroke-linecap="round"/>
 <ellipse cx="110" cy="86" rx="12" ry="11" fill="#4db866" stroke="#267f52" stroke-width="1.5"/>
 ${ALIEN_G.replace("#au-alien)", "#au-alien2)")}
</svg>`;

    let craft = null;
    let countdown = rand(45, 85);
    let toastTimer = 0;
    const sleep = ms => new Promise(r => setTimeout(r, reduceMotion ? Math.min(ms, 60) : ms));

    function clearAlien() {
      if (!craft) return;
      try { craft.anim.cancel(); } catch (_) {}
      if (craft.trailTimer) clearInterval(craft.trailTimer);
      craft.timers.forEach(clearInterval);
      craft.el.remove();
      craft = null;
    }

    function greenTrail(el, dir, ms) {
      return setInterval(() => {
        if (!el.isConnected) return;
        const r = el.getBoundingClientRect();
        const p = document.createElement("span");
        p.className = "alien-trail-particle";
        p.textContent = Math.random() < .28 ? "✦" : "·";
        p.style.left = (dir > 0 ? r.left + r.width * .15 : r.left + r.width * .85) + "px";
        p.style.top = (r.top + r.height * rand(.42, .8)) + "px";
        p.style.fontSize = rand(9, 17) + "px";
        document.body.appendChild(p);
        const dx = -dir * rand(24, 58), dy = rand(-15, 20);
        const a = p.animate([
          { transform: "translate(-50%,-50%) scale(.45)", opacity: .95 },
          { transform: `translate(${dx}px,${dy}px) scale(.1)`, opacity: 0 }
        ], { duration: rand(480, 850), easing: "ease-out", fill: "forwards" });
        a.onfinish = () => p.remove();
      }, ms || 95);
    }

    function greenSmoke(x, y) {
      for (let i = 0; i < 19; i++) {
        const puff = document.createElement("span");
        puff.className = "alien-smoke";
        puff.style.left = x + rand(-12, 12) + "px";
        puff.style.top = y + rand(-10, 10) + "px";
        const size = rand(15, 31);
        puff.style.width = size + "px";
        puff.style.height = size + "px";
        document.body.appendChild(puff);
        const dx = rand(-65, 65), dy = rand(-75, 45), scale = rand(1.5, 2.7);
        const a = puff.animate([
          { transform: "translate(-50%,-50%) scale(.35)", opacity: .88 },
          { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(${scale})`, opacity: 0 }
        ], { duration: rand(520, 850), easing: "ease-out", fill: "forwards" });
        a.onfinish = () => puff.remove();
      }
    }

    // Titik cahaya kecil naik di dalam sinar penarik, menuju UFO.
    function beamDot(beam, W, L) {
      const d = document.createElement("span");
      d.className = "au-bp";
      const u = rand(0.14, 0.86), s = rand(3, 6);
      d.style.width = d.style.height = s + "px";
      beam.appendChild(d);
      d.animate([
        { transform: `translate(${u * W}px,${L}px)`, opacity: 0.9 },
        { transform: `translate(${W * (0.5 + (u - 0.5) * 0.4)}px,0px)`, opacity: 0 }
      ], { duration: rand(900, 1500), easing: "ease-in", fill: "forwards" }).onfinish = () => d.remove();
    }

    function hideAlienToast() {
      clearTimeout(toastTimer);
      document.getElementById("alienToast")?.classList.remove("show");
    }

    function showAlienToast() {
      let n = 1;
      try { n = (parseInt(localStorage.getItem("alienFound") || "0", 10) || 0) + 1; localStorage.setItem("alienFound", String(n)); } catch (_) { /* private mode */ }
      let t = document.getElementById("alienToast");
      if (!t) {
        t = document.createElement("div");
        t.id = "alienToast";
        t.className = "alien-toast";
        t.setAttribute("role", "status");
        t.setAttribute("aria-live", "polite");
        t.innerHTML = '<div class="at-ufo" aria-hidden="true">🛸</div>' +
          '<p class="at-title">Selamat! 👽</p>' +
          '<p class="at-text">Kamu menemukan alien nyasar!</p>' +
          '<p class="at-sub"></p>' +
          '<button type="button" class="at-close">Tutup</button>';
        t.querySelector(".at-close").addEventListener("click", hideAlienToast);
        document.body.appendChild(t);
      }
      t.querySelector(".at-sub").textContent = n > 1 ? "Pertemuan ke-" + n + ", dia masih saja nyasar ✨" : "Sepertinya dia tersesat dari galaksinya ✨";
      void t.offsetWidth;
      t.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(hideAlienToast, 7000);
    }

    // Adegan setelah UFO diklik: sinar penarik -> tamu kecil turun & menyapa -> naik lagi -> UFO melesat (warp).
    async function visit(el, stretch, p, w, h, dir) {
      const vw = window.innerWidth, vh = window.innerHeight;
      const alive = () => craft && craft.el === el && el.isConnected;
      const cx = p.x + w / 2;
      const beamTop = h * 0.62;
      const L = Math.max(140, Math.min(vh - (p.y + beamTop) - 14, 380));
      const Wb = w * 2.3;

      el.classList.add("is-beaming");
      eggSound("ufo-beam");
      const beam = document.createElement("span");
      beam.className = "au-beam";
      beam.style.cssText = `top:${beamTop}px;width:${Wb}px;height:${L}px;margin-left:${-Wb / 2}px`;
      el.appendChild(beam);
      craft.timers.push(setInterval(() => beamDot(beam, Wb, L), 110));
      await sleep(520); if (!alive()) return;

      // Tamu kecil turun mengikuti sinar.
      const vW = w * 0.4, vH = vW * 92 / 64;
      const ty = Math.max(40, L - vH - 18);
      const vis = document.createElement("span");
      vis.className = "au-visitor";
      vis.style.cssText = `top:${beamTop}px;width:${vW}px;height:${vH}px;margin-left:${-vW / 2}px`;
      vis.innerHTML = VISITOR_SVG;
      el.appendChild(vis);
      const down = vis.animate([
        { transform: "translateY(0) scale(.2)", opacity: 0 },
        { transform: `translateY(${ty * 0.9}px) scale(1.05)`, opacity: 1, offset: 0.8 },
        { transform: `translateY(${ty}px) scale(1)`, opacity: 1 }
      ], { duration: reduceMotion ? 60 : 750, easing: "ease-out", fill: "forwards" });
      await sleep(780); if (!alive()) return;

      // Gelembung bicara, diketik huruf demi huruf.
      eggSound("ufo-hi");
      const onRight = (vw - cx) >= cx;
      const room = Math.max(110, Math.min(190, (onRight ? vw - cx : cx) - vW * 0.2 - 12));
      const bub = document.createElement("span");
      bub.className = "au-bubble" + (onRight ? "" : " left");
      bub.style.cssText = `top:${beamTop + ty + vH * 0.2}px;max-width:${room}px;` + (onRight ? `left:calc(50% + ${vW * 0.2}px)` : `right:calc(50% + ${vW * 0.2}px)`);
      el.appendChild(bub);
      const say = async txt => {
        bub.innerHTML = '<span class="au-ghost"></span><span class="au-type"></span>';
        bub.firstChild.textContent = txt;
        bub.classList.add("show"); vis.classList.add("is-talking");
        const chars = Array.from(txt), typed = bub.lastChild, t0 = performance.now();
        for (;;) {   // diketik berdasarkan waktu (bukan jumlah ketukan timer), jadi tetap rapi di HP yang lambat
          const k = Math.min(chars.length, Math.ceil((performance.now() - t0) / 34));
          typed.textContent = chars.slice(0, k).join("");
          if (k >= chars.length) break;
          await sleep(34); if (!alive()) return false;
        }
        vis.classList.remove("is-talking");
        return true;
      };
      if (!(await say("Halo, Bumi! 👋"))) return;
      await sleep(650); if (!alive()) return;
      if (!(await say("Aku nyasar… pulang dulu, ya! ✨"))) return;
      await sleep(950); if (!alive()) return;

      // Tamu naik kembali, sinar menutup.
      bub.classList.remove("show");
      down.cancel();
      vis.animate([
        { transform: `translateY(${ty}px) scale(1)`, opacity: 1 },
        { transform: "translateY(0) scale(.2)", opacity: 0 }
      ], { duration: reduceMotion ? 60 : 560, easing: "ease-in", fill: "forwards" });
      await sleep(580); if (!alive()) return;
      vis.remove(); bub.remove();
      craft.timers.forEach(clearInterval); craft.timers = [];
      beam.classList.add("closing");
      await sleep(400); if (!alive()) return;
      beam.remove();
      el.classList.remove("is-beaming");

      // Warp: UFO menarik diri sebentar, lalu memanjang dan melesat ke pojok langit.
      eggSound("ufo-warp");
      eggRing(cx, p.y + h * 0.5, "au-ring");
      greenSmoke(cx, p.y + h * 0.55);
      const endX = dir > 0 ? vw + w * 2.5 : -w * 3.5, endY = p.y - Math.min(vh * 0.35, 240);
      const ms = reduceMotion ? 120 : 760;
      stretch.style.transformOrigin = (dir > 0 ? "20%" : "80%") + " 50%";
      el.getAnimations().forEach(a => a.cancel());
      el.animate([
        { transform: `translate3d(${p.x}px,${p.y}px,0)`, offset: 0, easing: "ease-out" },
        { transform: `translate3d(${p.x - dir * 16}px,${p.y + 8}px,0)`, offset: 0.22, easing: "cubic-bezier(.6,0,1,.4)" },
        { transform: `translate3d(${endX}px,${endY}px,0)`, offset: 1 }
      ], { duration: ms, easing: "linear", fill: "forwards" });
      stretch.animate([
        { transform: "scale(1,1)", filter: "brightness(1)", easing: "ease-out" },
        { transform: "scale(.92,1.1)", filter: "brightness(1.4)", offset: 0.22, easing: "cubic-bezier(.6,0,1,.4)" },
        { transform: "scale(3,.42)", filter: "brightness(2.4)" }
      ], { duration: ms, easing: "linear", fill: "forwards" });
      craft.trailTimer = greenTrail(el, dir, 28);
      await sleep(ms + 40); if (!alive()) return;
      clearInterval(craft.trailTimer);
      craft.el.remove();
      craft = null;
      showAlienToast();
    }

    function spawnAlien() {
      if (craft || !darkOn()) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      const dir = Math.random() < .5 ? 1 : -1;
      const w = vw < 600 ? 94 : 132;
      const h = Math.round(w * 150 / 220);
      const el = document.createElement("button");
      el.type = "button";
      el.tabIndex = -1;
      el.className = "lost-alien-ufo";
      el.setAttribute("aria-label", "UFO kecil dengan alien nyasar. Ketuk untuk kejutan!");
      el.style.width = w + "px";
      el.style.height = h + "px";
      el.innerHTML = '<span class="au-q" aria-hidden="true">?</span>' +
        '<span class="au-stretch"><span class="alien-ufo-flip" style="transform:scaleX(' + dir + ')">' + UFO_SVG + '</span></span>';
      document.body.appendChild(el);

      // Jalur nyasar: belok-belok tak menentu, sempat berhenti "bingung" di tengah jalan, badan miring mengikuti arah.
      const sx = dir > 0 ? -w - 35 : vw + 35;
      const ex = dir > 0 ? vw + 35 : -w - 35;
      const span = Math.abs(ex - sx), N = 10, pz = 0.09, pk = Math.floor(rand(3, 7));
      const base = rand(vh * .14, vh * .34), amp = rand(26, 54), ph = rand(0, 6.28);
      const ys = Array.from({ length: N + 1 }, (_, i) => base + Math.sin(i / N * Math.PI * 2.4 + ph) * amp + rand(-12, 12));
      const rotAt = i => {
        const a = Math.max(0, i - 1), b = Math.min(N, i + 1);
        return dir * Math.max(-11, Math.min(11, Math.atan2(ys[b] - ys[a], span * (b - a) / N) * 57.3 * 0.7));
      };
      const frames = [];
      for (let i = 0; i <= N; i++) {
        const x = sx + (ex - sx) * i / N, off = i <= pk ? (i / N) / (1 + pz) : ((i / N) + pz) / (1 + pz);
        const tf = rot => `translate3d(${x}px,${ys[i]}px,0) rotate(${rot}deg)`;
        frames.push({ transform: tf(i === pk ? 0 : rotAt(i)), offset: off });
        if (i === pk) frames.push({ transform: tf(0), offset: off + pz / (1 + pz) });   // berhenti sejenak
      }
      const duration = Math.max(9500, span / (vw < 600 ? 82 : 110) * 1000 + 1200);
      const anim = el.animate(frames, { duration, easing: "linear", fill: "forwards" });
      anim.onfinish = clearAlien;
      craft = { el, anim, trailTimer: greenTrail(el, dir), timers: [], dir };

      el.addEventListener("click", e => {
        e.preventDefault();
        if (el.dataset.found || !craft || craft.el !== el) return;
        el.dataset.found = "1";
        const p = livePos(el);
        try { craft.anim.cancel(); } catch (_) {}
        if (craft.trailTimer) clearInterval(craft.trailTimer);
        craft.trailTimer = 0;
        el.classList.add("is-found");
        el.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        el.animate([
          { transform: `translate3d(${p.x}px,${p.y}px,0) rotate(${p.rot}deg)` },
          { transform: `translate3d(${p.x}px,${p.y}px,0) rotate(0deg)` }
        ], { duration: 320, easing: "ease-out", fill: "forwards" });
        visit(el, el.querySelector(".au-stretch"), p, w, h, dir);
      });
    }

    setInterval(() => {
      if (document.hidden || reduceMotion || craft || !darkOn() || document.body.classList.contains("is-loading")) return;
      countdown -= 1;
      if (countdown <= 0) {
        spawnAlien();
        countdown = rand(190, 360);
      }
    }, 1000);

    new MutationObserver(() => {
      if (!darkOn()) { clearAlien(); hideAlienToast(); }
    }).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach"] });
    document.addEventListener("keydown", e => { if (e.key === "Escape") hideAlienToast(); });
    window.alienNyasar = () => { clearAlien(); spawnAlien(); };
  })();

  /* ---------- Profile photo: slow cross-fade when the cursor gets close ---------- */
  (function profilePhoto() {
    const profile = document.getElementById("profilePhoto");
    if (!profile) return;
    const altImg = profile.querySelector(".profile-image-alt");
    const ease = reduceMotion ? 0.3 : 0.045; // smaller = slower
    let near = false, pinned = false, blend = 0, raf = 0, noAlt = false;

    const apply = () => profile.style.setProperty("--blend", blend.toFixed(3));
    const animate = () => {
      const target = pinned || near ? 1 : 0;
      blend += (target - blend) * ease;
      if (Math.abs(target - blend) < 0.004) { blend = target; apply(); raf = 0; return; }
      apply();
      raf = requestAnimationFrame(animate);
    };
    const kick = () => { if (!noAlt && !raf) raf = requestAnimationFrame(animate); };

    altImg?.addEventListener("error", () => { noAlt = true; blend = 0; apply(); });

    /* Foto per mode: images/p.png & pv.png (dark) · p-light / pv-light · p-shinji / pv-shinji · p-aizen / pv-aizen.
       Kalau file varian belum ada, otomatis pakai foto biasa. */
    const mainImg = profile.querySelector(".profile-image-main");
    const baseMain = mainImg ? mainImg.getAttribute("src") : "";
    const baseAlt = altImg ? altImg.getAttribute("src") : "";
    const photoTag = () => root.dataset.bleach === "ichigo" ? ("ichigo" + (root.dataset.ichigo === "hollow" ? "-hollow" : root.dataset.ichigo === "chain" ? "-chain" : "")) : root.dataset.bleach === "aizen" ? "aizen" : root.dataset.bleach === "ichibe" ? ("ichibe" + (root.dataset.ibankai === "on" ? "-bankai" : "")) : root.dataset.bleach === "uryu" ? ("uryu" + (root.dataset.uletzt === "on" ? "-letzt" : "")) : root.dataset.bleach === "shinji" ? "shinji" : root.dataset.theme === "light" ? "light" : "";
    function swapPhoto(img, base, t, isAlt) {
      if (!img || !base) return;
      const want = t ? base.replace(/(\.\w+)$/, "-" + t + "$1") : base;
      if (img.getAttribute("src") === want) return;
      const probe = new Image();
      probe.onload = () => { img.src = want; if (isAlt) noAlt = false; };
      probe.onerror = () => { if (img.getAttribute("src") !== base) { img.src = base; if (isAlt) noAlt = false; } };
      probe.src = want;
    }
    const applyPhotos = () => { const t = photoTag(); swapPhoto(mainImg, baseMain, t, false); swapPhoto(altImg, baseAlt, t, true); };
    new MutationObserver(applyPhotos).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach", "data-ichigo", "data-uletzt"] });
    applyPhotos();

    document.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = profile.getBoundingClientRect();
      const m = 50; // how close the cursor must be (px around the photo)
      const inside = e.clientX > r.left - m && e.clientX < r.right + m &&
                     e.clientY > r.top - m && e.clientY < r.bottom + m;
      if (inside !== near) { near = inside; kick(); }
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => { near = false; kick(); });

    // tap / click keeps the second photo on, tap again to go back (also for touch screens)
    profile.addEventListener("click", () => {
      pinned = !pinned;
      profile.setAttribute("aria-pressed", String(pinned));
      kick();
    });
  })();

  /* ---------- ID card on a lanyard: drag, release, tap to flip ---------- */
  (function idCard() {
    const zone = document.getElementById("idcardZone");
    const card = document.getElementById("idcard");
    const cvs = document.getElementById("lanyardCanvas");
    const hint = document.getElementById("idcardHint");
    const homeSection = document.getElementById("home");
    if (!zone || !card || !cvs) return;
    const ctx = cvs.getContext("2d");

    const N = 11;            // rope points
    const STEP = 1 / 60;     // fixed physics step
    let W = 0, H = 0, L = 0, seg = 0, cw = 0, ch = 0;
    let anchor = { x: 0, y: -16 };
    let pts = [];
    let dragging = false, pointerId = null, moved = 0;
    let grab = { x: 0, y: 0 }, drag = { x: 0, y: 0 }, down = { x: 0, y: 0, t: 0 };
    let raf = 0, lastT = 0, acc = 0, visible = true, started = false;

    function setup() {
      const r = zone.getBoundingClientRect();
      W = r.width; H = r.height;
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = Math.round(W * dpr);
      cvs.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = card.offsetWidth;
      ch = card.offsetHeight;
      anchor = { x: W / 2, y: -16 };
      L = Math.max(120, H - ch - 24);       // rope length so the card ends just above the hint
      seg = L / (N - 1);
      pts = Array.from({ length: N }, (_, i) => {
        const y = anchor.y + seg * i;
        return { x: anchor.x, y, px: anchor.x, py: y, m: i === N - 1 ? 5 : 1 };
      });
      draw();
    }

    // gives the card a small push (power = px per physics step of sideways speed)
    function nudge(power) {
      const p = pts[N - 1];
      if (p) p.px -= power;
    }

    function simulate(time) {
      const g = 0.55;
      const sway = reduceMotion ? 0 : Math.sin(time * 0.8) * 0.004;
      for (let i = 1; i < N; i++) {
        const p = pts[i];
        if (dragging && i === N - 1) continue;
        const vx = (p.x - p.px) * 0.988;
        const vy = (p.y - p.py) * 0.988;
        p.px = p.x; p.py = p.y;
        p.x += vx + sway;
        p.y += vy + g;
      }
      if (dragging) {
        const p = pts[N - 1];
        p.px = p.x; p.py = p.y;
        p.x += (drag.x - p.x) * 0.55;
        p.y += (drag.y - p.y) * 0.55;
      }
      for (let it = 0; it < 16; it++) {
        pts[0].x = anchor.x; pts[0].y = anchor.y;
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const diff = (d - seg) / d;
          const wa = i === 0 ? 0 : 1 / a.m;
          const wb = dragging && i + 1 === N - 1 ? 0 : 1 / b.m;
          const s = wa + wb;
          if (!s) continue;
          a.x += dx * diff * (wa / s); a.y += dy * diff * (wa / s);
          b.x -= dx * diff * (wb / s); b.y -= dy * diff * (wb / s);
        }
      }
    }

    // warna tali: [warna kain, warna aksen]; mengikuti tema aktif (dipakai juga oleh holder ID card lewat variabel CSS)
    function lanyardColors() {
      const LC = root.dataset.bleach === "ichigo" ? (root.dataset.ichigo === "hollow" ? ["#1a0709", "rgba(240,24,47,.95)"] : root.dataset.ichigo === "chain" ? ["#140607", "rgba(255,50,50,.95)"] : ["#120a05", "rgba(255,106,0,.95)"]) : root.dataset.bleach === "aizen" ? (root.dataset.kyoka === "on" ? ["#2a7f9a", "rgba(200,250,255,.95)"] : ["#1a1236", "rgba(196,170,255,.95)"]) : root.dataset.bleach === "ichibe" ? (root.dataset.ibankai === "on" ? ["#2a1c00", "rgba(255,224,138,.95)"] : ["#2a0d08", "rgba(255,154,120,.95)"]) : root.dataset.bleach === "uryu" ? (root.dataset.uletzt === "on" ? ["#5aa9dc", "rgba(255,255,255,.95)"] : ["#0c2038", "rgba(127,220,255,.95)"]) : root.dataset.bleach === "shinji" ? (root.dataset.sekai === "on" ? ["#e9739c", "rgba(255,246,200,.95)"] : ["#2a0f2a", "rgba(246,207,69,.95)"]) : (root.dataset.theme === "light" ? ["#3b7be0", "rgba(255,255,255,.95)"] : ["#16254a", "rgba(76,128,255,.95)"]);
      {   // PEMBARUAN 72: tema yang dulu jatuh ke warna biru bawaan
        const bl = root.dataset.bleach, th = root.dataset.theme;
        if (bl === "zaraki") { LC[0] = "#2a0a0c"; LC[1] = "rgba(255,138,61,.95)"; }                                   // Kenpachi: merah-hitam, aksen oranye
        else if (!bl && root.dataset.jjk === "gojo") { LC[0] = "#0b1d44"; LC[1] = "rgba(127,233,255,.95)"; }          // Gojo: biru malam, aksen cyan Infinity
        else if (!bl && root.dataset.jjk === "sukuna") { LC[0] = "#2a0508"; LC[1] = "rgba(255,70,60,.95)"; }          // Sukuna: hitam-merah darah
        else if (!bl && th === "light" && root.dataset.variant === "dusk") { LC[0] = "#d9683c"; LC[1] = "rgba(255,236,200,.95)"; }   // Senja
      }
      if (root.dataset.shiro === "on") { LC[0] = "#c99200"; LC[1] = "rgba(255,226,92,.98)"; }   // White Ichigo: tali kuning
      return LC;
    }

    /* ---------- LANYARD KAIN (PEMBARUAN 68): tali gepeng bermotif bentuk V, gesper, label & kait ----------
       Warna ikut tema (lanyardColors). Teks & lebar tali diatur di LAN. */
    const LAN = { name: "ANDI AHMAD FAQIH", major: "DESAIN KOMUNIKASI VISUAL", tag: "DKV", width: 26 };
    const hx = h => { h = String(h).replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&"); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const mixHex = (h, to, t) => { const a = hx(h), b = hx(to); return "rgb(" + a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",") + ")"; };
    const lumOf = h => { const c = hx(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
    const inkFor = h => (lumOf(h) > 0.22 ? "#0e121e" : "#ffffff");   // titik silang kontras: di atas 0.22 tulisan gelap lebih terbaca (≥5:1)
    let lastTheme = "";
    function themeCard(LC) {   // kirim warna tema ke holder/mika lewat variabel CSS (hanya saat tema berubah)
      const key = LC[0] + "|" + LC[1];
      if (key === lastTheme) return;
      lastTheme = key;
      card.style.setProperty("--idh-dark", LC[0]);
      card.style.setProperty("--idh-lite", mixHex(LC[0], "#ffffff", 0.58));
      card.style.setProperty("--idh-deep", mixHex(LC[0], "#000000", 0.55));
      card.style.setProperty("--idh-acc", LC[1]);
      const ink = inkFor(LC[0]);   // PEMBARUAN 72: tulisan putih di warna gelap, tulisan gelap di warna terang
      card.style.setProperty("--idh-ink", ink);
      card.style.setProperty("--idh-ink-soft", ink === "#ffffff" ? "rgba(255,255,255,.72)" : "rgba(14,18,30,.72)");
      card.style.setProperty("--idh-slot", ink === "#ffffff" ? "rgba(2,4,12,.82)" : "rgba(14,18,30,.55)");
    }
    function mkCurve(p) {
      const c = [0];
      for (let i = 1; i < p.length; i++) c.push(c[i - 1] + Math.hypot(p[i].x - p[i - 1].x, p[i].y - p[i - 1].y));
      return { p: p, c: c, len: c[c.length - 1] };
    }
    const revCurve = cv => mkCurve(cv.p.slice().reverse());
    function atCurve(cv, s) {   // titik + sudut singgung pada jarak s sepanjang kurva
      s = Math.max(0, Math.min(cv.len, s));
      let i = 1;
      while (i < cv.p.length - 1 && cv.c[i] < s) i++;
      const a = cv.p[i - 1], b = cv.p[i], d = (cv.c[i] - cv.c[i - 1]) || 1, t = (s - cv.c[i - 1]) / d;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, a: Math.atan2(b.y - a.y, b.x - a.x) };
    }
    function subCurve(cv, s0, s1) {
      const out = [], A = atCurve(cv, s0), B = atCurve(cv, s1);
      out.push({ x: A.x, y: A.y });
      for (let i = 0; i < cv.p.length; i++) if (cv.c[i] > s0 && cv.c[i] < s1) out.push(cv.p[i]);
      out.push({ x: B.x, y: B.y });
      return mkCurve(out);
    }
    function sideEdges(cv, w) {   // dua tepi tali (kiri / kanan) pada jarak w/2 dari garis tengah
      const L = [], R = [], p = cv.p, n = p.length;
      for (let i = 0; i < n; i++) {
        const a = p[Math.max(0, i - 1)], b = p[Math.min(n - 1, i + 1)];
        let dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
        L.push({ x: p[i].x - dy * w / 2, y: p[i].y + dx * w / 2 });
        R.push({ x: p[i].x + dy * w / 2, y: p[i].y - dx * w / 2 });
      }
      return { L: L, R: R };
    }
    function polyBand(a, b) {
      ctx.beginPath(); ctx.moveTo(a[0].x, a[0].y);
      for (let i = 1; i < a.length; i++) ctx.lineTo(a[i].x, a[i].y);
      for (let i = b.length - 1; i >= 0; i--) ctx.lineTo(b[i].x, b[i].y);
      ctx.closePath();
    }
    function polyLine(a) { ctx.beginPath(); ctx.moveTo(a[0].x, a[0].y); for (let i = 1; i < a.length; i++) ctx.lineTo(a[i].x, a[i].y); }
    function rrPath(x, y, w, h, r) {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    }
    const quadPts = (x0, y0, x1, y1, x2, y2, n) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push({ x: u * u * x0 + 2 * u * t * x1 + t * t * x2, y: u * u * y0 + 2 * u * t * y1 + t * t * y2 }); } return o; };
    function ropeDense() {   // titik padat sepanjang tali fisika (kurva sama dengan tali lama)
      const out = [{ x: pts[0].x, y: pts[0].y }];
      let px = pts[0].x, py = pts[0].y;
      for (let i = 1; i < N - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
        for (let k = 1; k <= 4; k++) { const t = k / 4, u = 1 - t; out.push({ x: u * u * px + 2 * u * t * pts[i].x + t * t * mx, y: u * u * py + 2 * u * t * pts[i].y + t * t * my }); }
        px = mx; py = my;
      }
      out.push({ x: pts[N - 1].x, y: pts[N - 1].y });
      return out;
    }
    function drawStrap(cv, w, base) {
      const e = sideEdges(cv, w);
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.38)"; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
      ctx.fillStyle = base; polyBand(e.L, e.R); ctx.fill();
      ctx.restore();
      ctx.fillStyle = "rgba(255,255,255,.11)"; polyBand(sideEdges(cv, w * 0.76).L, sideEdges(cv, w * 0.2).L); ctx.fill();   // kilau kain
      ctx.fillStyle = "rgba(0,0,0,.15)"; polyBand(sideEdges(cv, w * 0.2).R, e.R); ctx.fill();                                // sisi teduh
      const st = sideEdges(cv, w - 6);
      ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.strokeStyle = "rgba(255,255,255,.34)";                                   // jahitan tepi
      polyLine(st.L); ctx.stroke(); polyLine(st.R); ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle = "rgba(0,0,0,.32)"; polyLine(e.L); ctx.stroke(); polyLine(e.R); ctx.stroke();
    }
    const cwCache = {};
    function strapText(cv, txt, color, size, start, gap) {   // teks dibaca dari bawah ke atas mengikuti lengkung tali
      const r = revCurve(cv), font = "800 " + size + "px Inter, 'Segoe UI', Arial, sans-serif";
      ctx.save(); ctx.fillStyle = color; ctx.font = font; ctx.textBaseline = "middle"; ctx.textAlign = "center";
      const str = (txt + "   \u2022   ").repeat(9);
      let s = start;
      for (const ch of str) {
        const key = size + ch; let cw = cwCache[key];
        if (cw === undefined) cw = cwCache[key] = ctx.measureText(ch).width + gap;
        if (s + cw > r.len - 6) break;
        if (ch !== " ") { const P = atCurve(r, s + cw / 2); ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(P.a); ctx.fillText(ch, 0, 0.6); ctx.restore(); }
        s += cw;
      }
      ctx.restore();
    }
    function drawBuckle(P, w, deep) {   // gesper pengaman (hitam)
      ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(P.a + Math.PI);
      const hw = w / 2 + 4, g = ctx.createLinearGradient(0, -hw, 0, hw);
      g.addColorStop(0, "#454d63"); g.addColorStop(0.5, "#232837"); g.addColorStop(1, "#10131c");
      ctx.shadowColor = "rgba(0,0,0,.45)"; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      ctx.fillStyle = g; rrPath(-17, -hw, 34, hw * 2, 6); ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "rgba(0,0,0,.4)"; rrPath(-9, -hw + 6, 15, hw * 2 - 12, 3); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.lineWidth = 1; rrPath(-16.5, -hw + 0.5, 33, hw * 2 - 1, 5.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, -hw + 2); ctx.lineTo(8, hw - 2); ctx.stroke();
      ctx.fillStyle = "#2f3649"; rrPath(-3, -hw - 2, 8, 4, 1.5); ctx.fill(); rrPath(-3, hw - 2, 8, 4, 1.5); ctx.fill();   // tombol lepas
      ctx.restore();
    }
    function drawTag(P, acc, deep) {   // label berlian di ujung tali (seperti emblem di referensi)
      ctx.save(); ctx.translate(P.x, P.y); ctx.rotate(P.a + Math.PI);
      ctx.shadowColor = "rgba(0,0,0,.45)"; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2;
      ctx.beginPath(); ctx.moveTo(-17, 0); ctx.lineTo(0, -17); ctx.lineTo(17, 0); ctx.lineTo(0, 17); ctx.closePath();
      ctx.fillStyle = deep; ctx.fill(); ctx.shadowColor = "transparent";
      ctx.lineWidth = 1.6; ctx.strokeStyle = acc; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(0, -12); ctx.lineTo(12, 0); ctx.lineTo(0, 12); ctx.closePath();
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "900 8px Inter, Arial, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(LAN.tag, 0, 0.5);
      ctx.restore();
    }
    function drawLanyard(LC) {   // satu tali kain dari atas sampai kait
      const w = LAN.width, rope = mkCurve(ropeDense());
      const E = rope.len - 44;   // ujung tali tertutup jepitan kait
      const dark = LC[0], deep = mixHex(LC[0], "#000000", 0.5);
      const main = subCurve(rope, 0, E);
      drawStrap(main, w, dark);
      strapText(main, LAN.name, inkFor(LC[0]) === "#ffffff" ? "rgba(255,255,255,.93)" : "rgba(14,18,30,.9)", 10, main.len > 150 ? 88 : 8, 1.3);
      if (main.len > 110) { drawBuckle(atCurve(main, main.len - 62), w, deep); drawTag(atCurve(main, main.len - 20), LC[1], deep); }
      else if (main.len > 60) drawTag(atCurve(main, main.len - 24), LC[1], deep);
    }

    function draw() {
      if (pts.length < N) return;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < N - 1; i++) {
          const mxp = (pts[i].x + pts[i + 1].x) / 2;
          const myp = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, mxp, myp);
        }
        ctx.lineTo(pts[N - 1].x, pts[N - 1].y);
      };
      const LC = lanyardColors();
      themeCard(LC);
      drawLanyard(LC);

      const a = pts[N - 1], b = pts[N - 3];
      const angle = -Math.atan2(a.x - b.x, a.y - b.y);
      card.style.transform = `translate3d(${(a.x - cw / 2).toFixed(2)}px, ${a.y.toFixed(2)}px, 0) rotate(${angle.toFixed(4)}rad)`;
    }

    function frame(ts) {
      raf = requestAnimationFrame(frame);
      const t = ts / 1000;
      acc += Math.min(0.05, t - lastT);
      lastT = t;
      let guard = 0;
      while (acc >= STEP && guard++ < 4) { simulate(t); acc -= STEP; }
      draw();
    }
    function run() {
      if (raf || !visible || document.hidden || !pts.length) return;
      lastT = performance.now() / 1000;
      acc = 0;
      raf = requestAnimationFrame(frame);
    }
    function halt() { cancelAnimationFrame(raf); raf = 0; }

    const toLocal = e => {
      const r = zone.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    function flip() {
      const flipped = card.classList.toggle("flipped");
      card.setAttribute("aria-pressed", String(flipped));
      nudge(flipped ? 1.5 : -1.5);
    }
    function hideHint() { hint?.classList.add("hide"); }

    card.addEventListener("pointerdown", e => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      card.setPointerCapture(e.pointerId);
      pointerId = e.pointerId;
      dragging = true;
      moved = 0;
      down = { x: e.clientX, y: e.clientY, t: performance.now() };
      const p = toLocal(e), tip = pts[N - 1];
      grab = { x: p.x - tip.x, y: p.y - tip.y };
      drag = { x: tip.x, y: tip.y };
      card.classList.add("dragging");
      hideHint();
      e.preventDefault();
    });
    card.addEventListener("pointermove", e => {
      if (!dragging || e.pointerId !== pointerId) return;
      moved = Math.max(moved, Math.hypot(e.clientX - down.x, e.clientY - down.y));
      const p = toLocal(e);
      let tx = clamp(p.x - grab.x, cw / 2 + 4, W - cw / 2 - 4);
      let ty = clamp(p.y - grab.y, anchor.y + L * 0.4, H - ch - 4);
      const dx = tx - anchor.x, dy = ty - anchor.y, d = Math.hypot(dx, dy), max = L * 1.3;
      if (d > max) { tx = anchor.x + (dx / d) * max; ty = anchor.y + (dy / d) * max; }
      drag.x = tx; drag.y = ty;
    });
    const release = (e, allowFlip) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      card.classList.remove("dragging");
      try { card.releasePointerCapture(e.pointerId); } catch (_) { /* already released */ }
      if (allowFlip && moved < 7 && performance.now() - down.t < 600) flip();
    };
    card.addEventListener("pointerup", e => release(e, true));
    card.addEventListener("pointercancel", e => release(e, false));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hideHint(); flip(); }
    });

    if ("ResizeObserver" in window) new ResizeObserver(setup).observe(zone);
    window.addEventListener("resize", setup);
    if ("IntersectionObserver" in window && homeSection) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        visible ? run() : halt();
      }, { threshold: 0 }).observe(homeSection);
    }
    document.addEventListener("visibilitychange", () => (document.hidden ? halt() : run()));

    setup();
    run();
    // the card swings in once the loading screen is gone
    window.addEventListener("portfolio:ready", () => {
      if (started) return;
      started = true;
      setTimeout(() => nudge(reduceMotion ? 0 : 3.2), 350);
    });
  })();

  /* ---------- PEMBARUAN 68: ID CARD MASUK HOLDER + MIKA BERKILAU + KAIT LOGAM ----------
     Foto ID card (images/idcard-id.png) "dimasukkan" ke saku holder; bingkai & belakang holder ikut warna tema (variabel --idh-* dikirim oleh modul idCard).
     Di depan ada mika bening: kilau mengikuti kursor / jari, dan menyapu pelan sendiri saat didiamkan. Semua gaya ada di blok PEMBARUAN 68 style.css. */
  (function idHolder() {
    const card = document.getElementById("idcard");
    if (!card) return;
    const CFG = {
      photo: "images/idcard-id.png",
      photoBack: "images/idcard-id-back.png",
      alt: "ID card Andi Ahmad Faqih, SMKN 1 Wajo, Desain Komunikasi Visual",
      name: "ANDI AHMAD FAQIH", school: "SMKN 1 WAJO", major: "DESAIN KOMUNIKASI VISUAL", from: "PAREWUSI",
      lipFront: "SMKN 1 WAJO", lipBack: "DKV \u00B7 WAJO"
    };
    const faces = Array.from(card.querySelectorAll(".idcard-face"));
    if (!faces.length || card.querySelector(".idh")) return;
    const back = card.querySelector(".idcard-back") || (faces.length > 1 ? faces[1] : null);
    const front = faces.find(f => f !== back) || faces[0];
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const holder = (kind, lip, pocket) =>
      '<div class="idh idh-' + kind + '"><div class="idh-lip"><i class="idh-slot"></i><span class="idh-lip-txt">' + esc(lip) + '</span></div>' +
      '<div class="idh-pocket">' + pocket + '<div class="idh-mika"></div></div><div class="idh-sheen"></div></div>';

    front.insertAdjacentHTML("beforeend", holder("front", CFG.lipFront,
      '<div class="idh-card"><div class="idh-nophoto"><b>DKV</b><span>' + esc(CFG.name) + '</span></div>' +
      '<img class="idh-photo" src="' + esc(CFG.photo) + '" alt="' + esc(CFG.alt) + '" draggable="false"></div>'));
    const img = front.querySelector(".idh-photo");
    if (img) {
      img.addEventListener("load", () => front.classList.add("has-photo"));
      img.addEventListener("error", () => img.remove());
      if (img.complete && img.naturalWidth) front.classList.add("has-photo");
    }
    if (back) back.insertAdjacentHTML("beforeend", holder("back", "", '<div class="idh-card idh-cardback"><img class="idh-photo" src="' + esc(CFG.photoBack) + '" alt="" draggable="false"></div>'));
    const imgB = back && back.querySelector(".idh-photo");
    if (imgB) imgB.addEventListener("error", () => imgB.remove());   // file belakang tidak ada = kartu polos bertema

    // kait logam (lobster clasp) di atas kartu; tali kain berhenti di jepitannya
    let clip = card.querySelector(".idcard-clip");
    if (!clip) { clip = document.createElement("div"); clip.className = "idcard-clip"; card.insertBefore(clip, card.firstChild); }
    clip.setAttribute("aria-hidden", "true");
    clip.innerHTML = '<svg class="idh-clasp" viewBox="0 0 30 66" aria-hidden="true"><defs>' +
      '<linearGradient id="idhM" x1="0" x2="1"><stop offset="0" stop-color="#f4f6fb"/><stop offset=".45" stop-color="#aab3c6"/><stop offset="1" stop-color="#6b7488"/></linearGradient>' +
      '<linearGradient id="idhK" x1="0" x2="1"><stop offset="0" stop-color="#7f889b"/><stop offset=".5" stop-color="#e9edf5"/><stop offset="1" stop-color="#7a8397"/></linearGradient></defs>' +
      '<rect x="3" y="0" width="24" height="11" rx="3" fill="url(#idhM)" stroke="#59627a" stroke-width=".8"/><rect x="6" y="3" width="18" height="2" rx="1" fill="rgba(255,255,255,.55)"/>' +
      '<ellipse cx="15" cy="20" rx="6.5" ry="8" fill="none" stroke="url(#idhK)" stroke-width="3"/>' +
      '<rect x="11" y="27" width="8" height="8" rx="2" fill="url(#idhM)" stroke="#59627a" stroke-width=".6"/>' +
      '<path fill-rule="evenodd" d="M15 33C27 38 28 54 15 64C2 54 3 38 15 33ZM15 40C20.5 43 21 52 15 58C9 52 9.5 43 15 40Z" fill="url(#idhM)" stroke="#59627a" stroke-width=".8"/>' +
      '<path d="M23.4 44L25.8 47.2" stroke="#2a3042" stroke-width="1.6" stroke-linecap="round"/></svg>';

    // kilau mika mengikuti kursor / jari
    const cl = (v, a, b) => Math.max(a, Math.min(b, v));
    const VARS = ["--idh-mx", "--idh-my", "--idh-sw", "--idh-mxb", "--idh-swb"];
    let raf = 0, nx = 0.3, ny = 0.2;
    function apply() {
      raf = 0;
      if (!card.classList.contains("idh-lit")) return;
      const sw = nx * 110 - 5 + (ny - 0.5) * 24, st = card.style;
      st.setProperty("--idh-mx", (nx * 100).toFixed(1) + "%");
      st.setProperty("--idh-my", (ny * 100).toFixed(1) + "%");
      st.setProperty("--idh-sw", sw.toFixed(1) + "%");
      st.setProperty("--idh-mxb", (100 - nx * 100).toFixed(1) + "%");   // sisi belakang tercermin
      st.setProperty("--idh-swb", (110 - sw).toFixed(1) + "%");
    }
    function move(e) {
      const r = card.getBoundingClientRect();
      if (!r.width || !r.height) return;
      nx = cl((e.clientX - r.left) / r.width, 0, 1);
      ny = cl((e.clientY - r.top) / r.height, 0, 1);
      card.classList.add("idh-lit");
      if (!raf) raf = requestAnimationFrame(apply);
    }
    function leave() {
      card.classList.remove("idh-lit");
      VARS.forEach(v => card.style.removeProperty(v));
    }
    card.addEventListener("pointerenter", move);
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    card.addEventListener("pointerup", e => { if (e.pointerType !== "mouse") leave(); });
    card.addEventListener("pointercancel", leave);
  })();

  /* ---------- White portfolio section: empty first, content fades in later ---------- */
  const whiteSection = document.getElementById("portfolio-content");
  if (whiteSection) {
    let ticking = false;
    const check = () => {
      ticking = false;
      const top = whiteSection.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.45) whiteSection.classList.add("is-ready");
      else if (top > window.innerHeight * 0.85) whiteSection.classList.remove("is-ready");
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }, { passive: true });
    window.addEventListener("resize", check);
    check();
  }

  /* ---------- Certificates: tilt + sheen follow the cursor ---------- */
  content?.addEventListener("pointermove", e => {
    if (content.dataset.category !== "Certificates" || e.pointerType === "touch") return;
    const item = e.target.closest(".portfolio-item");
    if (!item) return;
    const r = item.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    item.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
    item.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    item.style.setProperty("--rx", ((0.5 - y) * 7).toFixed(2) + "deg");
    item.style.setProperty("--ry", ((x - 0.5) * 9).toFixed(2) + "deg");
  });
  content?.addEventListener("pointerout", e => {
    const item = e.target.closest(".portfolio-item");
    if (!item || item.contains(e.relatedTarget)) return;
    ["--mx", "--my", "--rx", "--ry"].forEach(v => item.style.removeProperty(v));
  });

  /* ---------- Awards: small sparkle burst from the tab ---------- */
  function sparkleBurst(tab) {
    const bar = tab?.parentElement;
    if (!bar || reduceMotion) return;
    const cx = tab.offsetLeft + tab.offsetWidth / 2;
    const cy = tab.offsetTop + tab.offsetHeight / 2;
    const icA = document.documentElement.dataset.bleach ? getComputedStyle(document.documentElement).getPropertyValue("--ic-a").trim() : "";
    const colors = icA ? [icA, "#ffffff", icA, "#ffd978"] : ["#f3b232", "#ffd978", "#6ea5ff", "#ffffff"];   // mode karakter (Ichigo/Shinji/Aizen/Kenpachi): ikut warna tema
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      const ang = rand(0, Math.PI * 2);
      const dist = rand(50, 120);
      s.className = "spark-burst";
      s.textContent = Math.random() < 0.6 ? "✦" : "✧";
      s.style.cssText =
        `--x:${cx}px;--y:${cy}px;--dx:${(Math.cos(ang) * dist).toFixed(0)}px;` +
        `--dy:${(Math.sin(ang) * dist - 24).toFixed(0)}px;--s:${rand(10, 19).toFixed(0)}px;` +
        `--c:${colors[i % colors.length]}`;
      bar.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }
  tabs.forEach(tab => tab.addEventListener("click", () => {
    if (tab.dataset.tab === "Awards") sparkleBurst(tab);
  }));
  document.querySelectorAll(".folder-card[data-folder='Awards'], .folder-photo[data-folder='Awards']")
    .forEach(el => el.addEventListener("click", () => {
      setTimeout(() => sparkleBurst(tabs.find(t => t.dataset.tab === "Awards")), 950);
    }));

  /* ---------- data: tempat & tanggal lahir ---------- */
  (function biodata() {
    // ===== ISI DI SINI =====
    const BIODATA = {
      place: "Watan, Soppeng",   // ← ganti, contoh: "Sengkang, Wajo"
      date: "2010-3-30"       // ← ganti, format TAHUN-BULAN-TANGGAL, contoh: "2008-08-17"
    };
    // ========================
    const el = id => document.getElementById(id);
    if (!el("bio")) return;
    const [Y, M, D] = BIODATA.date.split("-").map(Number);
    if (!Y || !M || !D) return;
    const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const ZODIAC = [[1, 20, "Capricorn"], [2, 19, "Aquarius"], [3, 21, "Pisces"], [4, 20, "Aries"], [5, 21, "Taurus"], [6, 21, "Gemini"],
      [7, 23, "Cancer"], [8, 23, "Leo"], [9, 23, "Virgo"], [10, 23, "Libra"], [11, 22, "Scorpio"], [12, 22, "Sagittarius"]];
    const zodiac = (m, d) => { for (const [mm, dd, n] of ZODIAC) if (m < mm || (m === mm && d < dd)) return n; return "Capricorn"; };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let age = today.getFullYear() - Y;
    if (today < new Date(today.getFullYear(), M - 1, D)) age--;
    let next = new Date(today.getFullYear(), M - 1, D);
    if (next < today) next = new Date(today.getFullYear() + 1, M - 1, D);
    const days = Math.round((next - today) / 86400000);

    el("bioMonth").textContent = MONTHS[M - 1].slice(0, 3).toUpperCase();
    el("bioDay").textContent = String(D).padStart(2, "0");
    el("bioYear").textContent = Y;
    el("bioPlace").textContent = BIODATA.place;
    el("bioFull").textContent = `${D} ${MONTHS[M - 1]} ${Y}`;
    el("bioFull").setAttribute("datetime", BIODATA.date);
    el("bioAge").textContent = age + " tahun";
    el("bioWeekday").textContent = DAYS[new Date(Y, M - 1, D).getDay()];
    el("bioZodiac").textContent = zodiac(M, D);
    el("bioNext").textContent = days === 0 ? "Hari ini! 🎂" : days + " hari lagi";

    const card = el("bio");
    if ("IntersectionObserver" in window) {
      card.classList.add("scroll-reveal");
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { card.classList.add("visible"); io.disconnect(); } }), { threshold: 0.15 });
      io.observe(card);
    }
  })();

  /* ---------- Loading screen: monogram digambar + cincin progres + tirai terbelah ---------- */
  (function loadingScreen() {
    const el = document.getElementById("loader");
    const finishBody = () => document.body.classList.remove("is-loading");
    if (!el) { finishBody(); return; }
    const pct = document.getElementById("loaderPercent");
    const status = document.getElementById("loaderStatus");

    const MIN = 2200, MAX = 9000;
    const t0 = performance.now();
    let p = 0, loaded = document.readyState === "complete", done = false;
    window.addEventListener("load", () => { loaded = true; });
    const messages = [
      [0, "Menyiapkan ruang…"],
      [30, "Menata warna & huruf…"],
      [62, "Merakit portofolio…"],
      [90, "Hampir siap…"]
    ];
    /* ----- SUARA LOADING (PEMBARUAN 35): Web Audio, tanpa file mp3 -----
       Alur bunyi: desir tinta saat monogram digambar -> dengung pad hangat yang naik & makin terang mengikuti persen
       -> "ting" kristal tiap 10% (nadanya naik) -> akhir: arpeggio lonceng B-mayor + dentum + desir tirai terbelah + kilau.
       Mati kalau tapSound.on = false. Browser memblokir suara sebelum ada interaksi, jadi di kunjungan pertama
       muncul petunjuk "Ketuk layar..." dan suara mulai begitu layar diketuk / tombol ditekan. */
    const SND = (() => {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      let ac;
      try { ac = new AC(); } catch (e) { return null; }
      const rnd = (a, b) => a + Math.random() * (b - a);
      const allowed = () => !(window.tapSound && window.tapSound.on === false);
      const comp = ac.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
      const master = ac.createGain(); master.gain.value = 0.9;
      master.connect(comp); comp.connect(ac.destination);
      const verb = ac.createConvolver();
      (() => {
        const L = (ac.sampleRate * 1.6) | 0, b = ac.createBuffer(2, L, ac.sampleRate);
        for (let c = 0; c < 2; c++) { const d = b.getChannelData(c); for (let i = 0; i < L; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / L, 2.6); }
        verb.buffer = b;
      })();
      const vg = ac.createGain(); vg.gain.value = 0.45; verb.connect(vg); vg.connect(master);
      const nbuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      (() => { const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; })();
      const out = (n, wet) => { n.connect(master); if (wet) { const g = ac.createGain(); g.gain.value = wet; n.connect(g); g.connect(verb); } };
      function tone(type, f0, f1, t, dur, vol, wet, att) {
        const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
        o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.004)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); out(g, wet); o.start(t); o.stop(t + dur + 0.05);
      }
      function noise(ft, f0, f1, t, dur, vol, wet, q, att) {
        const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
        const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1;
        f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
        const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || Math.min(0.012, dur * 0.3))); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        s.connect(f); f.connect(g); out(g, wet); s.start(t, Math.random()); s.stop(t + dur + 0.05);
      }

      // tangga nada B-mayor pentatonik: "ting" tiap 10% naik satu anak tangga
      const STEPS = [493.88, 554.37, 622.25, 739.99, 830.61, 987.77, 1108.7, 1244.5, 1479.98];
      const ROOT0 = 110, ROOT1 = 123.47;                 // dengung naik satu nada penuh (A -> B)
      let droneG = null, droneF = null, droneO = [], lfo = null;
      let started = false, ended = false, lastP = 0, step = 0, base = 0;
      const api = { onrun: null, running: () => ac.state === "running" };
      const live = () => ac.state === "running" && !ended && allowed();

      function startDrone() {
        const t = ac.currentTime;
        droneF = ac.createBiquadFilter(); droneF.type = "lowpass"; droneF.frequency.value = 260; droneF.Q.value = 0.7;
        droneG = ac.createGain(); droneG.gain.setValueAtTime(0.0001, t); droneG.gain.exponentialRampToValueAtTime(0.15, t + 1.4);
        droneF.connect(droneG); out(droneG, 0.5);
        [[1, "sine", 0], [1.5, "sine", -4], [2, "triangle", 5], [0.5, "sine", 0]].forEach(([m, type, det]) => {
          const o = ac.createOscillator(); o.type = type; o.frequency.value = ROOT0 * m; o.detune.value = det;
          o.connect(droneF); o.start(t); droneO.push({ o, m });
        });
        lfo = ac.createOscillator(); const lg = ac.createGain();
        lfo.frequency.value = 0.45; lg.gain.value = 0.018; lfo.connect(lg); lg.connect(droneG.gain); lfo.start(t);
      }
      function followProgress(p) {
        if (!droneF) return;
        const t = ac.currentTime, k = p / 100;
        droneF.frequency.setTargetAtTime(260 + 2600 * Math.pow(k, 1.3), t, 0.15);
        const ratio = 1 + (ROOT1 / ROOT0 - 1) * k;
        droneO.forEach(x => x.o.frequency.setTargetAtTime(ROOT0 * x.m * ratio, t, 0.2));
      }
      function intro() {
        const now = ac.currentTime, at = s => base + s;      // base = saat loader mulai (detik, jam audio)
        const when = s => Math.max(now + 0.01, at(s));
        const late = s => at(s) < now - 0.05;                // kalau terlambat (menunggu ketukan), lewati
        tone("sine", 52, 110, now + 0.01, 1.1, 0.2, 0.3, 0.35);                         // swell rendah pembuka
        tone("sine", 1975.5, 0, when(0.02), 0.9, 0.025, 0.9, 0.02);                      // kilau tipis
        if (!late(0.2)) noise("bandpass", 320, 3200, at(0.2), 1.05, 0.085, 0.5, 1.1, 0.5);   // desir tinta stroke 1
        if (!late(0.75)) noise("bandpass", 420, 4200, at(0.75), 1.05, 0.085, 0.5, 1.1, 0.5); // desir tinta stroke 2
        if (!late(0.9)) tone("sine", 2093, 0, at(0.9), 0.35, 0.04, 0.8, 0.004);          // nama muncul
        if (!late(1.15)) tone("sine", 2637, 0, at(1.15), 0.4, 0.04, 0.8, 0.004);         // peran muncul
      }
      function onRun() {
        if (started || ended) return;
        started = true;
        if (!allowed()) return;
        startDrone(); followProgress(lastP); intro();
        if (api.onrun) api.onrun();
      }
      api.begin = t0Ms => {
        base = ac.currentTime - (performance.now() - t0Ms) / 1000;
        ac.addEventListener("statechange", () => { if (ac.state === "running") onRun(); });
        if (ac.state === "running") onRun();
      };
      api.unlock = () => { if (ac.state === "suspended") ac.resume().catch(() => {}); };
      api.progress = p => {
        lastP = p; if (!live() || !started) return;
        followProgress(p);
        const s = Math.min(9, Math.floor(p / 10));
        while (step < s) {
          const f = STEPS[step++]; const t = ac.currentTime + 0.01;
          tone("sine", f, 0, t, 0.7, 0.05, 0.9, 0.005); tone("triangle", f * 2, 0, t, 0.2, 0.012, 0.6, 0.004);
        }
        step = Math.max(step, s);
      };
      api.finale = () => {
        if (ended) return;
        const was = live() && started; ended = true;
        if (was) {
          const t = ac.currentTime + 0.02;
          // arpeggio lonceng B-mayor add9
          [493.88, 622.25, 739.99, 987.77, 1108.7, 1479.98].forEach((f, i) => {
            const s = t + i * 0.075;
            tone("sine", f, 0, s, 1.7, 0.11, 0.9, 0.006); tone("triangle", f * 2, 0, s, 0.5, 0.025, 0.7, 0.004);
          });
          // tirai terbelah: dentum + desir naik + kilau
          const c = t + 0.45;
          tone("sine", 66, 38, c, 1.1, 0.34, 0.15, 0.02);
          noise("bandpass", 350, 5200, c, 1.0, 0.2, 0.4, 0.9, 0.35);
          noise("highpass", 5000, 9000, c + 0.1, 0.8, 0.05, 0.7, 1, 0.3);
          for (let i = 0; i < 7; i++) tone("sine", rnd(2400, 4800), 0, c + 0.05 + i * 0.09, 0.35, 0.03, 0.9, 0.003);
          if (droneG) droneG.gain.setTargetAtTime(0.0001, t, 0.3);
          if (lfo) { try { lfo.stop(t); } catch (e) {} }
        }
        setTimeout(() => droneO.forEach(x => { try { x.o.stop(); } catch (e) {} }), 1900);
        setTimeout(() => { try { ac.close(); } catch (e) {} }, 5500);
      };
      return api;
    })();
    let hint = null;
    const unlockEvents = ["pointerdown", "pointerup", "touchend", "keydown", "click"];
    const unlock = () => { if (SND) SND.unlock(); };
    if (SND) {
      unlockEvents.forEach(ev => window.addEventListener(ev, unlock, { capture: true, passive: true }));
      SND.onrun = () => {
        unlockEvents.forEach(ev => window.removeEventListener(ev, unlock, true));
        if (hint) hint.classList.add("is-hidden");
      };
      SND.begin(t0);
      // coba nyalakan otomatis: ulangi resume() beberapa kali (berhasil kalau browser mengizinkan autoplay)
      [0, 150, 400, 900, 1600].forEach(ms => setTimeout(() => { if (!done) SND.unlock(); }, ms));
    }

    const render = value => {
      el.style.setProperty("--p", value.toFixed(2));
      if (pct) pct.textContent = Math.round(value) + "%";
      if (status) status.textContent = value >= 99.5 ? "Selamat datang ✦" : messages.filter(m => value >= m[0]).pop()[1];
      if (SND) SND.progress(value);
    };
    const finish = () => {
      if (done) return;
      done = true;
      render(100);
      if (SND) { SND.finale(); unlockEvents.forEach(ev => window.removeEventListener(ev, unlock, true)); if (hint) hint.classList.add("is-hidden"); }
      setTimeout(() => {
        el.classList.add("is-done");
        finishBody();
        window.dispatchEvent(new Event("portfolio:ready"));
        setTimeout(() => el.remove(), 1700);
      }, 450);
    };
    const tick = now => {
      const elapsed = now - t0;
      const timeP = Math.max(0, Math.min(1, elapsed / MIN));
      const eased = 1 - Math.pow(1 - timeP, 2.4);
      const target = Math.min(loaded ? 100 : 90, eased * 100);
      p += (target - p) * 0.1;
      if (loaded && timeP >= 1 && 100 - p < 0.6) p = 100;
      p = Math.max(0, Math.min(100, p));
      render(p);
      if (p >= 100 || elapsed > MAX) { finish(); return; }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })();


  /* ---------- Musik: backsound santai + pemutar lagu (kiri bawah) ---------- */
  (function musicPlayer() {
    // ===== ATUR DI SINI =====
    // Taruh file mp3 di folder "music/" (sejajar dengan index.html).
    const musicConfig = {
      ambient: { src: "music/backsound.mp3", volume: 0.25 },   // backsound santai (loop)
      songVolume: 0.7,
      songs: [
        { title: "About You", src: "music/lagu-01.mp3" },
        { title: "Merry Christmas, Please don't call", src: "music/lagu-02.mp3" },
        { title: "Merry Christmas, I miss you", src: "music/lagu-03.mp3" },
        { title: "Multo", src: "music/lagu-04.mp3" },
        { title: "December", src: "music/lagu-05.mp3" },
        { title: "Let Down", src: "music/lagu-06.mp3" },
        { title: "No Surprises", src: "music/lagu-07.mp3" },
        { title: "Wish You Were", src: "music/lagu-08.mp3" },
        { title: "Sailor Song", src: "music/lagu-09.mp3" },
        { title: "Your New Home", src: "music/lagu-10.mp3" }
      ]
    };
    // ========================

    const player = document.getElementById("musicPlayer");
    const btn = document.getElementById("musicToggle");
    const menu = document.getElementById("musicMenu");
    const list = document.getElementById("musicList");
    const tip = document.getElementById("musicTip");
    if (!player || !btn || !menu || !list) return;

    const HINT = "Klik: putar lagu · Tahan: pilih lagu";
    const ambient = new Audio(musicConfig.ambient.src);
    ambient.loop = true; ambient.preload = "auto"; ambient.volume = 0;
    const song = new Audio();
    song.preload = "none"; song.volume = 0;

    let mode = "idle";          // idle | ambient | song
    let idx = 0;
    let ambientErr = false;
    let menuOpen = false;
    const missing = new Set();

    /* --- backsound mengecil saat mini game dibuka --- */
    let ducked = false;
    const ambTarget = () => musicConfig.ambient.volume * (ducked ? 0.35 : 1);
    window.addEventListener("game:open", () => { ducked = true; if (mode === "ambient") fade(ambient, ambTarget(), 800); });
    window.addEventListener("game:close", () => { ducked = false; if (mode === "ambient") fade(ambient, ambTarget(), 1200); });

    /* --- fade volume halus --- */
    const fades = new WeakMap();
    function fade(a, to, ms, done) {
      clearInterval(fades.get(a));
      const from = a.volume;
      if (ms <= 0 || from === to) { a.volume = to; if (done) done(); return; }
      const steps = Math.max(1, Math.round(ms / 40));
      let i = 0;
      const id = setInterval(() => {
        i++;
        a.volume = Math.min(1, Math.max(0, from + (to - from) * (i / steps)));
        if (i >= steps) { clearInterval(id); fades.delete(a); if (done) done(); }
      }, 40);
      fades.set(a, id);
    }
    const ambientIn = ms => {
      if (ambientErr) return;
      const go = () => fade(ambient, ambTarget(), ms);
      const p = ambient.play();
      if (p && p.then) p.then(go).catch(() => {}); else go();
    };
    const ambientOut = ms => fade(ambient, 0, ms, () => ambient.pause());

    /* --- daftar lagu --- */
    list.innerHTML = musicConfig.songs.map((sg, i) => `
      <li><button type="button" role="menuitem" data-i="${i}">
        <span class="mm-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="mm-title">${esc(sg.title)}</span>
        <span class="mm-eq" aria-hidden="true"><i></i><i></i><i></i></span>
      </button></li>`).join("");
    const items = [...list.querySelectorAll("button")];

    function ui() {
      btn.classList.toggle("is-ambient", mode === "ambient");
      btn.classList.toggle("is-song", mode === "song");
      player.classList.toggle("is-song", mode === "song");
      btn.setAttribute("aria-pressed", mode === "song" ? "true" : "false");
      btn.setAttribute("aria-label", mode === "song"
        ? "Matikan lagu: " + musicConfig.songs[idx].title + ". Tahan untuk memilih lagu."
        : "Putar lagu. Tahan untuk memilih lagu.");
      if (tip) tip.textContent = mode === "song" ? "♪ " + musicConfig.songs[idx].title : HINT;
      items.forEach((el, i) => {
        const on = mode === "song" && i === idx;
        el.classList.toggle("is-playing", on);
        el.classList.toggle("is-missing", missing.has(i));
        el.setAttribute("aria-current", on ? "true" : "false");
        el.title = missing.has(i) ? "File lagu belum ada di folder music/" : "";
      });
    }

    /* --- aksi --- */
    function playSong(i) {
      idx = i;
      mode = "song";
      window.dispatchEvent(new CustomEvent("music:play", { detail: { index: i } }));
      song.src = musicConfig.songs[i].src;
      song.volume = 0;
      const p = song.play();
      if (p && p.then) p.then(() => fade(song, musicConfig.songVolume, 1200))
        .catch(e => { if (e && e.name === "NotSupportedError") songFail(i); });
      ambientOut(1200);
      ui();
    }
    function stopSong() {
      mode = ambientErr ? "idle" : "ambient";
      fade(song, 0, 700, () => song.pause());
      ambientIn(1800);
      ui();
    }
    function songFail(i) {
      missing.add(i);
      if (mode === "song" && idx === i) { stopSong(); } else { ui(); }
    }
    song.addEventListener("error", () => { if (song.getAttribute("src")) songFail(idx); });
    song.addEventListener("ended", () => { if (mode === "song") stopSong(); });
    ambient.addEventListener("error", () => { ambientErr = true; if (mode === "ambient") mode = "idle"; ui(); offGesture(); });

    /* --- backsound mulai setelah sentuhan/klik pertama (aturan browser) --- */
    const gestureEvents = ["pointerdown", "pointerup", "keydown", "touchend", "click"];
    function onGesture(e) {
      if (player.contains(e.target) || mode !== "idle" || ambientErr) return;
      ambient.volume = 0;
      const p = ambient.play();
      if (!p || !p.then) return;
      p.then(() => {
        if (mode === "idle") { mode = "ambient"; fade(ambient, ambTarget(), 2500); }
        else if (mode === "song") { ambient.pause(); }
        ui(); offGesture();
        player.classList.add("show-hint");
        setTimeout(() => player.classList.remove("show-hint"), 4500);
      }).catch(() => {});
    }
    function offGesture() { gestureEvents.forEach(t => document.removeEventListener(t, onGesture, true)); }
    gestureEvents.forEach(t => document.addEventListener(t, onGesture, true));

    /* --- menu --- */
    function toggleMenu(open) {
      menuOpen = typeof open === "boolean" ? open : !menuOpen;
      menu.classList.toggle("is-open", menuOpen);
      player.classList.toggle("menu-open", menuOpen);
      btn.setAttribute("aria-expanded", menuOpen ? "true" : "false");
    }
    items.forEach((el, i) => el.addEventListener("click", () => {
      if (mode === "song" && idx === i) stopSong(); else playSong(i);
      toggleMenu(false);
    }));
    document.addEventListener("pointerdown", e => { if (menuOpen && !player.contains(e.target)) toggleMenu(false); });
    menu.addEventListener("keydown", e => {
      const k = e.key, cur = items.indexOf(document.activeElement);
      if (k === "Escape") { toggleMenu(false); btn.focus(); }
      else if (k === "ArrowDown") { e.preventDefault(); items[(cur + 1) % items.length].focus(); }
      else if (k === "ArrowUp") { e.preventDefault(); items[(cur - 1 + items.length) % items.length].focus(); }
      else if (k === "Home") { e.preventDefault(); items[0].focus(); }
      else if (k === "End") { e.preventDefault(); items[items.length - 1].focus(); }
    });

    /* --- tombol: klik = on/off lagu · tahan / klik kanan = menu --- */
    let pressTimer = null, longFired = false;
    btn.addEventListener("pointerdown", e => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      longFired = false;
      btn.classList.add("is-pressing");
      pressTimer = setTimeout(() => {
        longFired = true;
        btn.classList.remove("is-pressing");
        if (navigator.vibrate) navigator.vibrate(12);
        toggleMenu(true);
      }, 520);
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(t => btn.addEventListener(t, () => {
      clearTimeout(pressTimer); btn.classList.remove("is-pressing");
    }));
    btn.addEventListener("click", () => {
      if (longFired) { longFired = false; return; }
      if (menuOpen) { toggleMenu(false); return; }
      if (mode === "song") stopSong(); else playSong(idx);
    });
    btn.addEventListener("contextmenu", e => { e.preventDefault(); toggleMenu(); });
    btn.addEventListener("keydown", e => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); toggleMenu(true); (items[idx] || items[0]).focus();
      }
    });

    /* --- jeda saat tab disembunyikan --- */
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { ambient.pause(); song.pause(); return; }
      if (mode === "ambient") ambient.play().catch(() => {});
      else if (mode === "song") song.play().catch(() => {});
    });

    ui();

    /* API kecil untuk fitur lain (kode rahasia Bleach) */
    window.siteMusic = {
      isSong: i => mode === "song" && idx === i,
      removeSong(src) {      // hapus lagu tambahan (dipakai easter egg Pramuka saat keluar dari mode Senja); hanya lagu paling akhir
        const i = musicConfig.songs.findIndex(x => x.src === src);
        if (i < 0 || i !== musicConfig.songs.length - 1) return false;
        if (mode === "song" && idx === i) stopSong();
        musicConfig.songs.pop();
        const el = items.pop();
        if (el && el.parentNode) el.parentNode.remove();
        missing.delete(i);
        if (idx >= musicConfig.songs.length) idx = 0;
        ui();
        return true;
      },
      addSong(sg) {          // tambah lagu ke daftar musik saat berjalan (dipakai easter egg Pramuka); aman dipanggil berulang
        const had = musicConfig.songs.findIndex(x => x.src === sg.src);
        if (had >= 0) return had;
        const i = musicConfig.songs.push({ title: sg.title, src: sg.src }) - 1;
        const li = document.createElement("li");
        li.className = "mm-new";
        li.innerHTML = `<button type="button" role="menuitem" data-i="${i}"><span class="mm-num">${String(i + 1).padStart(2, "0")}</span><span class="mm-title">${esc(sg.title)}</span><span class="mm-eq" aria-hidden="true"><i></i><i></i><i></i></span></button>`;
        list.appendChild(li);
        const el = li.querySelector("button");
        items.push(el);
        el.addEventListener("click", () => { if (mode === "song" && idx === i) stopSong(); else playSong(i); toggleMenu(false); });
        ui();
        return i;
      },
      duck(on) {
        if (mode === "song") fade(song, on ? 0.08 : musicConfig.songVolume, 600);
        else if (mode === "ambient") fade(ambient, on ? 0.03 : ambTarget(), 600);
      }
    };
  })();

  /* ---------- Aku Wibu: daftar anime + filter genre + jendela sinopsis ---------- */
  (function animeVault() {
    const list = window.ANIME_LIST;
    const root = document.getElementById("wibu");
    if (!root || !Array.isArray(list) || !list.length) return;

    const head = document.getElementById("wibuHead"), bodyEl = document.getElementById("wibuBody");
    const filtersEl = document.getElementById("wibuFilters"), statusEl = document.getElementById("wibuStatus");
    const gridEl = document.getElementById("wibuGrid"), countEl = document.getElementById("wibuCount");
    const modal = document.getElementById("wibuModal"), posterBox = document.getElementById("wibuModalPoster");
    const mNo = document.getElementById("wibuModalNo"), mTitle = document.getElementById("wibuModalTitle");
    const mTags = document.getElementById("wibuModalTags"), mSyn = document.getElementById("wibuModalSyn");

    // Poster dicari di images/anime/<id>.jpg lalu .jpeg .png .webp (otomatis)
    const EXTS = ["jpg", "jpeg", "png", "webp"];
    const items = list.map((a, i) => ({
      ...a, n: i + 1,
      genres: String(a.g || "").split("·").map(x => x.trim()).filter(Boolean)
    }));
    const ORDER = ["Action", "Adventure", "Fantasy", "Supernatural", "Dark Fantasy", "Isekai", "Comedy", "Romance", "Drama", "Slice of Life", "Mystery", "Sci-Fi", "Sports", "School"];
    const present = [...new Set(items.flatMap(a => a.genres))];
    const genres = [...ORDER.filter(g => present.includes(g)), ...present.filter(g => !ORDER.includes(g)).sort()];
    const selected = new Set();
    let built = false;

    countEl.textContent = items.length + " anime dalam koleksiku";
    const initials = t => String(t).split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

    // gambar poster dengan fallback ekstensi; kalau tidak ada, tampil kartu kosong yang rapi
    function loadPoster(img, id) {
      let k = 0;
      img.addEventListener("error", () => {
        k++;
        if (k < EXTS.length) img.src = `images/anime/${id}.${EXTS[k]}`;
        else img.remove();
      });
      img.src = `images/anime/${id}.${EXTS[0]}`;
    }

    /* --- filter genre (logika DAN: harus punya semua genre terpilih) --- */
    const matches = a => [...selected].every(g => a.genres.includes(g));
    function renderChips() {
      filtersEl.innerHTML = "";
      const all = document.createElement("button");
      all.type = "button"; all.className = "wibu-chip wibu-chip-all"; all.textContent = "Semua";
      all.setAttribute("aria-pressed", selected.size === 0 ? "true" : "false");
      all.addEventListener("click", () => { selected.clear(); update(); });
      filtersEl.appendChild(all);
      genres.forEach(g => {
        const on = selected.has(g);
        const n = items.filter(a => matches(a) && (on || a.genres.includes(g))).length;
        const b = document.createElement("button");
        b.type = "button"; b.className = "wibu-chip";
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.disabled = !on && n === 0;
        b.innerHTML = `${esc(g)} <i>${on ? items.filter(matches).length : n}</i>`;
        b.addEventListener("click", () => { on ? selected.delete(g) : selected.add(g); update(); });
        filtersEl.appendChild(b);
      });
    }
    function update() {
      renderChips();
      let shown = 0;
      if (built) gridEl.querySelectorAll(".wibu-card").forEach((c, i) => {
        const ok = matches(items[i]);
        c.hidden = !ok;
        if (ok) shown++;
      });
      else shown = items.filter(matches).length;
      statusEl.textContent = selected.size
        ? `Genre ${[...selected].join(" + ")}: ${shown} anime`
        : `Menampilkan semua ${shown} anime`;
      gridEl.classList.toggle("is-empty", shown === 0);
    }

    /* --- kartu poster (dibuat saat panel dibuka pertama kali) --- */
    function build() {
      built = true;
      items.forEach((a, i) => {
        const card = document.createElement("button");
        card.type = "button"; card.className = "wibu-card"; card.dataset.i = i;
        card.setAttribute("aria-label", a.t + ". Lihat sinopsis");
        card.innerHTML = `<span class="wibu-art"><span class="wibu-ph" aria-hidden="true">${esc(initials(a.t))}</span></span>
          <span class="wibu-name">${esc(a.t)}</span>`;
        const img = document.createElement("img");
        img.alt = ""; img.loading = "lazy"; img.draggable = false;
        loadPoster(img, a.id);
        card.querySelector(".wibu-art").prepend(img);
        card.addEventListener("click", () => openModal(i, card));
        gridEl.appendChild(card);
      });
      update();
    }

    /* --- buka / tutup panel --- */
    head.addEventListener("click", () => {
      const open = !root.classList.contains("is-open");
      root.classList.toggle("is-open", open);
      head.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && !built) build();
    });

    /* --- jendela poster + sinopsis --- */
    let lastFocus = null, closeTimer = null;
    function openModal(i, from) {
      const a = items[i];
      clearTimeout(closeTimer);
      lastFocus = from || document.activeElement;
      mNo.textContent = "No. " + String(a.n).padStart(2, "0");
      mTitle.textContent = a.t;
      mTags.innerHTML = a.genres.map(g => `<span>${esc(g)}</span>`).join("");
      mSyn.textContent = a.s || "";
      posterBox.innerHTML = `<span class="wibu-ph" aria-hidden="true">${esc(initials(a.t))}</span>`;
      const img = document.createElement("img");
      img.alt = "Poster " + a.t; img.draggable = false;
      loadPoster(img, a.id);
      posterBox.prepend(img);
      modal.hidden = false;
      document.documentElement.classList.add("wibu-lock");
      requestAnimationFrame(() => { modal.classList.add("is-open"); modal.querySelector(".wibu-close").focus(); });
    }
    function closeModal() {
      if (modal.hidden) return;
      modal.classList.remove("is-open");
      document.documentElement.classList.remove("wibu-lock");
      closeTimer = setTimeout(() => { modal.hidden = true; }, 260);
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", e => {
      if (modal.hidden) return;
      if (e.key === "Escape") closeModal();
      else if (e.key === "Tab") { e.preventDefault(); modal.querySelector(".wibu-close").focus(); }
    });

    renderChips();
    statusEl.textContent = `Menampilkan semua ${items.length} anime`;
  })();


  /* ---------- PECAH LAYAR (dipakai adegan Aizen & mini game) ----------
     window.bleachShatter(host, opsi) -> { crack(), shatter(), destroy() }
     crack()   : retakan menjalar dari titik tumbukan
     shatter() : kaca pecah, serpihan terlempar 3D, gelombang kejut + layar bergetar */
  (function bleachShatterBuilder() {
    const NS = "http://www.w3.org/2000/svg";
    const rand = (a, b) => a + Math.random() * (b - a);
    window.bleachShatter = function (host, o) {
      o = o || {};
      const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      const W = host.clientWidth || window.innerWidth, H = host.clientHeight || window.innerHeight;
      const cx = (o.cx != null ? o.cx : .5) * W, cy = (o.cy != null ? o.cy : .45) * H;
      const diag = Math.hypot(W, H);
      const tint = o.tint || ["196,181,253", "126,231,255", "157,123,255"];
      const RAYS = o.rays || 16;
      const RING = [0, .045, .105, .185, .3, .46, .68, 1.2];
      const root = document.createElement("div");
      root.className = "bs-shatter" + (still ? " is-still" : "");
      root.setAttribute("aria-hidden", "true");

      // titik-titik jaring retakan: tiap cincin sedikit digeser acak agar tampak seperti kaca asli
      const angs = [];
      for (let i = 0; i < RAYS; i++) angs.push(((i + rand(-.34, .34)) / RAYS) * Math.PI * 2);
      const P = RING.map((r, j) => angs.map(a => {
        if (j === 0) return [cx, cy];
        const rr = r * diag * rand(.9, 1.1), aa = a + rand(-.05, .05) / (1 + j * .3);
        return [cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr];
      }));

      // lapisan retakan (garis putih bercahaya)
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "bs-cracks");
      svg.setAttribute("viewBox", "0 0 " + W + " " + H);
      svg.setAttribute("preserveAspectRatio", "none");
      const addPath = (d, cls, delay) => {
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d); p.setAttribute("pathLength", "1"); p.setAttribute("class", cls);
        p.style.setProperty("--cd", delay.toFixed(3) + "s");
        svg.appendChild(p);
      };
      for (let i = 0; i < RAYS; i++) {
        let d = "M" + cx.toFixed(1) + " " + cy.toFixed(1);
        for (let j = 1; j < RING.length; j++) d += "L" + P[j][i][0].toFixed(1) + " " + P[j][i][1].toFixed(1);
        addPath(d, "bs-crack-ray", rand(0, .12));
      }
      for (let j = 2; j < RING.length - 1; j++) {
        for (let i = 0; i < RAYS; i++) {
          if (Math.random() < .28) continue;
          const a = P[j][i], b = P[j][(i + 1) % RAYS];
          addPath("M" + a[0].toFixed(1) + " " + a[1].toFixed(1) + "L" + b[0].toFixed(1) + " " + b[1].toFixed(1), "bs-crack-ring", .1 + j * .06 + rand(0, .08));
        }
      }
      root.appendChild(svg);

      // serpihan kaca
      const shards = document.createElement("div");
      shards.className = "bs-glass";
      for (let j = 0; j < RING.length - 1; j++) {
        for (let i = 0; i < RAYS; i++) {
          const i2 = (i + 1) % RAYS;
          const pts = j === 0 ? [P[0][i], P[1][i], P[1][i2]] : [P[j][i], P[j][i2], P[j + 1][i2], P[j + 1][i]];
          let minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9, mx = 0, my = 0;
          pts.forEach(q => { minx = Math.min(minx, q[0]); miny = Math.min(miny, q[1]); maxx = Math.max(maxx, q[0]); maxy = Math.max(maxy, q[1]); mx += q[0]; my += q[1]; });
          mx /= pts.length; my /= pts.length;
          const vx = mx - cx, vy = my - cy, dist = Math.hypot(vx, vy) || 1, bw = Math.max(2, maxx - minx), bh = Math.max(2, maxy - miny);
          const s = document.createElementNS(NS, "svg");
          s.setAttribute("class", "gs"); s.setAttribute("viewBox", "0 0 " + bw.toFixed(1) + " " + bh.toFixed(1));
          s.style.left = minx.toFixed(1) + "px"; s.style.top = miny.toFixed(1) + "px"; s.style.width = bw.toFixed(1) + "px"; s.style.height = bh.toFixed(1) + "px";
          const fly = 260 + j * 150 + rand(0, 240);
          const t1 = tint[(i + j) % tint.length], t2 = tint[(i + 2) % tint.length];
          const poly = document.createElementNS(NS, "polygon");
          poly.setAttribute("points", pts.map(q => (q[0] - minx).toFixed(1) + "," + (q[1] - miny).toFixed(1)).join(" "));
          poly.setAttribute("fill", "rgba(" + t1 + "," + rand(.1, .26).toFixed(2) + ")");
          poly.setAttribute("stroke", "rgba(" + t2 + ",.95)"); poly.setAttribute("stroke-width", "1.6"); poly.setAttribute("stroke-linejoin", "round");
          s.appendChild(poly);
          // kilau diagonal pada kaca
          const sheen = document.createElementNS(NS, "polygon");
          sheen.setAttribute("points", poly.getAttribute("points")); sheen.setAttribute("fill", "rgba(255,255,255," + rand(.04, .2).toFixed(2) + ")");
          s.appendChild(sheen);
          s.style.setProperty("--dx", (vx / dist * fly).toFixed(0) + "px");
          s.style.setProperty("--dy", (vy / dist * fly).toFixed(0) + "px");
          s.style.setProperty("--fall", Math.round(rand(160, 520) * (1 + j * .12)) + "px");
          s.style.setProperty("--rot", Math.round(rand(-300, 300)) + "deg");
          s.style.setProperty("--ax", rand(-1, 1).toFixed(2));
          s.style.setProperty("--ay", rand(-1, 1).toFixed(2));
          s.style.setProperty("--dl", (j * .04 + rand(0, .07)).toFixed(3) + "s");
          s.style.setProperty("--cd", (j * .05 + rand(0, .1)).toFixed(3) + "s");
          shards.appendChild(s);
        }
      }
      root.appendChild(shards);

      // inti benturan, gelombang kejut, percikan
      const core = document.createElement("b"); core.className = "bs-core"; core.style.left = cx + "px"; core.style.top = cy + "px";
      root.appendChild(core);
      for (let k = 0; k < 2; k++) {
        const w = document.createElement("b"); w.className = "bs-wave" + (k ? " w2" : "");
        w.style.left = cx + "px"; w.style.top = cy + "px"; root.appendChild(w);
      }
      for (let k = 0; k < 34; k++) {
        const u = document.createElement("u"), a = rand(0, 6.283), d = rand(.25, 1) * diag * .6;
        u.style.left = cx + "px"; u.style.top = cy + "px";
        u.style.setProperty("--sx", (Math.cos(a) * d).toFixed(0) + "px");
        u.style.setProperty("--sy", (Math.sin(a) * d).toFixed(0) + "px");
        u.style.setProperty("--ss", rand(2, 7).toFixed(1) + "px");
        u.style.setProperty("--sd", rand(.05, .22).toFixed(2) + "s");
        u.style.background = "rgb(" + tint[k % tint.length] + ")";
        root.appendChild(u);
      }
      const flash = document.createElement("span"); flash.className = "bs-shflash"; root.appendChild(flash);
      host.appendChild(root);

      const shakeEl = o.shake || host;
      function quake(power, ms) {
        if (still || !shakeEl.animate) return;
        const f = [];
        for (let i = 0; i <= 10; i++) { const k = 1 - i / 10; f.push({ transform: "translate(" + (rand(-1, 1) * power * k).toFixed(1) + "px," + (rand(-1, 1) * power * k).toFixed(1) + "px) rotate(" + (rand(-1, 1) * power * k * .05).toFixed(2) + "deg)" }); }
        f.push({ transform: "none" });
        try { shakeEl.animate(f, { duration: ms, easing: "ease-out" }); } catch (_) {}
      }
      return {
        el: root,
        crack() { root.classList.add("is-crack"); quake(7, 380); if (navigator.vibrate) try { navigator.vibrate(25); } catch (_) {} },
        shatter() { root.classList.add("is-shatter"); quake(26, 780); if (navigator.vibrate) try { navigator.vibrate([20, 30, 70]); } catch (_) {} },
        destroy() { root.remove(); }
      };
    };
  })();

  /* ---------- REIATSU + KUPU-KUPU (dipakai saat Aizen pertama kali dipanggil) ----------
     window.bleachReiatsu(host, opsi) -> { charge(), surge(), destroy() }
     charge() : tekanan reiatsu terkumpul (cincin menyempit, partikel naik)
     surge()  : ledakan reiatsu + gelombang + kupu-kupu menyebar (TANPA efek kaca) */
  (function bleachReiatsuBuilder() {
    const rand = (a, b) => a + Math.random() * (b - a);
    window.bleachReiatsu = function (host, o) {
      o = o || {};
      const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      const W = host.clientWidth || window.innerWidth, H = host.clientHeight || window.innerHeight;
      const cx = (o.cx != null ? o.cx : .5) * W, cy = (o.cy != null ? o.cy : .45) * H;
      const k = Math.max(.5, Math.min(1.25, Math.min(W, H) / 720));
      const cols = o.colors || ["#c4b5fd", "#e9e6ff", "#7ee7ff", "#9d7bff"];
      const root = document.createElement("div");
      root.className = "bs-rei" + (still ? " is-still" : "") + (o.red ? " is-red" : "");
      root.setAttribute("aria-hidden", "true");
      root.style.setProperty("--cx", cx.toFixed(0) + "px");
      root.style.setProperty("--cy", cy.toFixed(0) + "px");
      root.style.setProperty("--k", k.toFixed(2));
      const add = (tag, cls, style) => { const e = document.createElement(tag); e.className = cls; if (style) e.style.cssText = style; root.appendChild(e); return e; };
      add("span", "bs-rei-edge"); add("span", "bs-rei-rays"); add("b", "bs-rei-aura"); add("b", "bs-rei-beam");
      for (let i = 0; i < 4; i++) add("b", "bs-rei-ring r" + i);
      for (let i = 0; i < 44; i++) {
        const c = cols[i % cols.length];
        add("i", "bs-rei-mote", "--x:" + Math.round(cx + rand(-260, 260) * k) + "px;--s:" + rand(2, 6).toFixed(1) + "px;--d:" + rand(2.2, 4.2).toFixed(1) + "s;--dl:" + rand(0, 2.4).toFixed(2) + "s;--dx:" + Math.round(rand(-90, 90)) + "px;--c:" + c);
      }
      for (let i = 0; i < 26; i++) {
        const a = rand(0, 6.283), d = rand(.3, 1) * Math.min(W, H) * .7;
        const b = add("i", "bs-rbf", "--tx:" + Math.round(Math.cos(a) * d) + "px;--ty:" + Math.round(Math.sin(a) * d * .75 - rand(60, 240)) + "px;--c:" + cols[i % cols.length] + ";--s:" + rand(.8, 1.6).toFixed(2) + ";--dl:" + rand(0, .7).toFixed(2) + "s;--d:" + rand(2.6, 4.4).toFixed(1) + "s;--rot:" + Math.round(rand(-40, 40)) + "deg");
        b.innerHTML = "<b></b><b></b>";
      }
      add("span", "bs-rei-flash");
      host.appendChild(root);

      const shakeEl = o.shake || host;
      function rumble(power, ms) {
        if (still || !shakeEl.animate) return;
        const f = [];
        for (let i = 0; i <= 14; i++) { const q = 1 - i / 14; f.push({ transform: "translate(" + (rand(-1, 1) * power * q).toFixed(1) + "px," + (rand(-1, 1) * power * q).toFixed(1) + "px)" }); }
        f.push({ transform: "none" });
        try { shakeEl.animate(f, { duration: ms, easing: "ease-out" }); } catch (_) {}
      }
      return {
        el: root,
        charge() { root.classList.add("is-charge"); rumble(3, 1300); },
        surge() { root.classList.add("is-surge"); rumble(13, 900); if (navigator.vibrate) try { navigator.vibrate([20, 30, 60]); } catch (_) {} },
        destroy() { root.remove(); }
      };
    };
  })();

  /* ---------- BLEACH rahasia: 10x ketuk tombol tema saat "Merry Christmas, Please don't call" ---------- */
  (function bleachSecret() {
    // ===== ATUR DI SINI =====
    const cfg = {
      songIndex: 1,                 // lagu ke-2 di daftar musik = "Merry Christmas, Please don't call"
      taps: 10,                     // jumlah ketukan
      maxGap: 800,                  // jeda maksimal antar ketukan (ms)
      maxTotal: 5000,               // 10 ketukan harus selesai dalam waktu ini (ms)
      // taruh file di folder ini; ekstensi dicoba berurutan, yang belum ada dilewati
      bankaiImg: ["images/shinji.gif", "images/shinji.png", "images/shinji.webp", "images/shinji.jpg"],
      sekaiImg:  ["images/shinji-sekai.gif", "images/shinji-sekai.png", "images/shinji-sekai.webp", "images/shinji-sekai.jpg"],
      bankaiAudio: "music/shinji-bankai.mp3",
      sekaiAudio:  "music/shinji-sekai.mp3",
      // --- Sōsuke Aizen (karakter ke-2) ---
      aizenImg:  ["images/aizen.gif", "images/aizen.png", "images/aizen.webp", "images/aizen.jpg"],
      kyokaImg:  ["images/aizen-kyoka.gif", "images/aizen-kyoka.png", "images/aizen-kyoka.webp", "images/aizen-kyoka.jpg"],
      aizenAudio: "music/aizen-yokoso.mp3",   // "Yōkoso, watashi no Soul Society e"
      kyokaAudio: "music/aizen-ikuyo.mp3",    // "Kudakero, Kyōka Suigetsu" (nama file lama tetap dipakai)
      // --- Kenpachi Zaraki (karakter ke-3) ---
      zarakiImg:  ["images/zaraki.gif", "images/zaraki.png", "images/zaraki.webp", "images/zaraki.jpg"],
      zbankaiImg: ["images/zaraki-bankai.gif", "images/zaraki-bankai.png", "images/zaraki-bankai.webp", "images/zaraki-bankai.jpg"],
      zarakiAudio: "music/zaraki-nozarashi.mp3",   // suara "Nozarashi"
      zbankaiAudio: "music/zaraki-bankai.mp3",     // "Bankai da yo! Aaakhh"
      // --- Ichigo Kurosaki (karakter ke-4, 3 mode: Bankai Tensa Zangetsu · Hollow · Chain Armor) ---
      ichigoImg:  ["images/ichigo.gif", "images/ichigo.png", "images/ichigo.webp", "images/ichigo.jpg"],
      ihollowImg: ["images/ichigo-hollow.gif", "images/ichigo-hollow.png", "images/ichigo-hollow.webp", "images/ichigo-hollow.jpg"],
      ichainImg:  ["images/ichigo-chain.gif", "images/ichigo-chain.png", "images/ichigo-chain.webp", "images/ichigo-chain.jpg"],
      ichigoAudio:  "music/ichigo-bankai.mp3",   // "Bankai... Tensa Zangetsu"
      ihollowAudio: "music/ichigo-hollow.mp3",   // teriakan Hollow
      ichainAudio:  "music/ichigo-chain.mp3",    // Bankai zirah berantai
      // --- Uryū Ishida (golongan QUINCY: Biasa · Letzt Stil) ---
      uryuImg:    ["images/uryu.gif", "images/uryu.png", "images/uryu.webp", "images/uryu.jpg"],
      uletztImg:  ["images/uryu-letzt.gif", "images/uryu-letzt.png", "images/uryu-letzt.webp", "images/uryu-letzt.jpg"],
      uryuAudio:   "music/uryu-quincy.mp3",       // suara pembuka (opsional; kalau tidak ada dibacakan suara Jepang bawaan browser)
      uletztAudio: "music/uryu-letzt.mp3",        // suara Letzt Stil (opsional)
      // --- Ichibē Hyōsube (Shikai · Bankai) - foto & suara opsional ---
      ichibeImg:  ["images/ichibe.gif", "images/ichibe.png", "images/ichibe.webp", "images/ichibe.jpg"],
      ibankaiImg: ["images/ichibe-bankai.gif", "images/ichibe-bankai.png", "images/ichibe-bankai.webp", "images/ichibe-bankai.jpg"],
      ichibeAudio: "music/ichibe-shikai.mp3", ibankaiAudio: "music/ichibe-bankai.mp3"
    };
    // ========================

    const secret = document.getElementById("bleachSecret");
    const btn = document.getElementById("bleachToggle");
    const menu = document.getElementById("bleachMenu");
    const pick = document.getElementById("bleachShinji");
    const pickState = document.getElementById("bleachShinjiState");
    const pickA = document.getElementById("bleachAizen");
    const pickAState = document.getElementById("bleachAizenState");
    const pickZ = document.getElementById("bleachZaraki");
    const pickZState = document.getElementById("bleachZarakiState");
    const pickI = document.getElementById("bleachIchigo");
    const pickIState = document.getElementById("bleachIchigoState");
    const stage = document.getElementById("bleachStage");
    const photo = document.getElementById("bsPhoto");
    const kanji = document.getElementById("bsKanji");
    const title = document.getElementById("bsTitle");
    const sub = document.getElementById("bsSub");
    const skipBtn = document.getElementById("bsSkip");
    if (!themeBtn || !secret || !btn || !menu || !pick || !pickA || !stage) return;

    /* ---------- PEMBARUAN 36: pilihan golongan di menu Bleach (Shinigami | Quincy) ---------- */
    const list0 = menu.querySelector(".bleach-list");
    const menuTitle = menu.querySelector(".bleach-menu-title");
    let pickU = null, pickUState = null, listU = null, facBtns = [], pickB = null, pickBState = null;
    function showFac(name) {
      if (!listU || !list0) return;
      list0.hidden = name === "quincy"; listU.hidden = name !== "quincy";
      facBtns.forEach(b => b.setAttribute("aria-selected", String(b.dataset.fac === name)));
    }
    if (list0) {
      const fac = document.createElement("div");
      fac.className = "bl-fac"; fac.setAttribute("role", "tablist"); fac.setAttribute("aria-label", "Golongan");
      fac.innerHTML = '<button type="button" role="tab" data-fac="shinigami" aria-selected="true"><i class="bl-fi bl-fi-s"></i>Shinigami</button>' +
                      '<button type="button" role="tab" data-fac="quincy" aria-selected="false"><i class="bl-fi bl-fi-q"></i>Quincy</button>';
      listU = document.createElement("ul"); listU.className = "bleach-list bl-quincy"; listU.hidden = true;
      listU.innerHTML = '<li><button type="button" id="bleachUryu"><span class="bl-num">石</span><span class="bl-name">Uryū Ishida<small>Quincy · Biasa &amp; Letzt Stil</small></span><span class="bl-state" id="bleachUryuState">Panggil</span></button></li>';
      if (menuTitle && menuTitle.nextSibling) menu.insertBefore(fac, menuTitle.nextSibling); else menu.insertBefore(fac, list0);
      list0.parentNode.insertBefore(listU, list0.nextSibling);
      const liB = document.createElement("li");
      liB.innerHTML = '<button type="button" id="bleachIchibe"><span class="bl-num">墨</span><span class="bl-name">Ichibē Hyōsube<small>Shikai &amp; Bankai</small></span><span class="bl-state" id="bleachIchibeState">Panggil</span></button>';
      list0.appendChild(liB); pickB = liB.querySelector("button"); pickBState = liB.querySelector("#bleachIchibeState");
      facBtns = Array.from(fac.querySelectorAll("button"));
      facBtns.forEach(b => b.addEventListener("click", () => showFac(b.dataset.fac)));
      pickU = document.getElementById("bleachUryu"); pickUState = document.getElementById("bleachUryuState");
    }

    // status Bleach sengaja hanya di memori: refresh/reset halaman = kembali seperti semula
    const mem = {};
    const store = {
      get(k) { if (k.indexOf("bleach") === 0) return mem[k] || null; try { return localStorage.getItem(k); } catch (_) { return null; } },
      set(k, v) { if (k.indexOf("bleach") === 0) { mem[k] = v; return; } try { localStorage.setItem(k, v); } catch (_) {} },
      del(k) { if (k.indexOf("bleach") === 0) { delete mem[k]; return; } try { localStorage.removeItem(k); } catch (_) {} }
    };

    let unlocked = store.get("bleachUnlocked") === "1";
    let menuOpen = false;
    let busy = false;
    let finishNow = null;

    /* ---------- label tombol tema jadi Biasa / Sekai ---------- */
    const tt = themeBtn.querySelector(".tt-track");
    if (tt && !tt.querySelector(".tt-bleach")) {
      const seg = document.createElement("span");
      seg.className = "tt-bleach";
      seg.setAttribute("aria-hidden", "true");
      seg.innerHTML = "<i></i><b>Bankai</b><b>Sekai</b><b></b>";
      tt.appendChild(seg);
    }
    const isShinji = () => root.dataset.bleach === "shinji";
    const isAizen = () => root.dataset.bleach === "aizen";
    const isSekai = () => root.dataset.sekai === "on";
    const isKyoka = () => root.dataset.kyoka === "on";
    const isZaraki = () => root.dataset.bleach === "zaraki";
    const isUryu = () => root.dataset.bleach === "uryu";
    const isLetzt = () => root.dataset.uletzt === "on";
    const isIchibe = () => root.dataset.bleach === "ichibe";
    const isIBankai = () => root.dataset.ibankai === "on";
    const isIchigo = () => root.dataset.bleach === "ichigo";
    const ichi = () => root.dataset.ichigo || "tensa";
    const isZBankai = () => root.dataset.zbankai === "on";
    const segB = tt ? tt.querySelectorAll(".tt-bleach b") : [];

    function syncToggle() {
      if (isIchigo()) {
        const m = ichi();
        if (segB.length === 3) { segB[0].textContent = "Bankai"; segB[1].textContent = "Hollow"; segB[2].textContent = "Chain"; }
        themeBtn.setAttribute("aria-checked", String(m !== "tensa"));
        themeBtn.setAttribute("aria-label", "Mode Ichigo: " + ({ tensa: "Bankai Tensa Zangetsu", hollow: "Hollow", chain: "Chain Armor Bankai" })[m] + " (klik untuk ganti mode)");
      } else if (isShinji() || isAizen() || isZaraki() || isUryu() || isIchibe()) {
        const on = isIchibe() ? isIBankai() : isShinji() ? isSekai() : isZaraki() ? isZBankai() : isUryu() ? isLetzt() : isKyoka();
        if (segB.length >= 2) {
          segB[0].textContent = isIchibe() ? "Shikai" : isShinji() ? "Bankai" : isZaraki() ? "Nozarashi" : "Biasa";
          segB[1].textContent = isIchibe() ? "Bankai" : isShinji() ? "Sekai" : isZaraki() ? "Bankai" : isUryu() ? "Letzt Stil" : "Kyōka";
        }
        themeBtn.setAttribute("aria-checked", String(on));
        themeBtn.setAttribute("aria-label", isShinji()
          ? (on ? "Kembali ke mode biasa" : "Aktifkan mode Sekai (dunia terbalik)")
          : isIchibe() ? (on ? "Kembali ke Shikai" : "Aktifkan Bankai") : isUryu() ? (on ? "Kembali ke mode Quincy biasa" : "Aktifkan Quincy: Letzt Stil")
          : isZaraki() ? (on ? "Kembali ke Nozarashi" : "Aktifkan Bankai (mode iblis)") : (on ? "Akhiri ilusi Kyōka Suigetsu" : "Aktifkan ilusi Kyōka Suigetsu"));
      } else {
        syncThemeUI();
      }
      pickState.textContent = isShinji() ? "Aktif" : "Panggil";
      pick.classList.toggle("is-active", isShinji());
      pickAState.textContent = isAizen() ? "Aktif" : "Panggil";
      pickA.classList.toggle("is-active", isAizen());
      if (pickI) { pickIState.textContent = isIchigo() ? "Aktif" : "Panggil"; pickI.classList.toggle("is-active", isIchigo()); }
      if (pickZ) { pickZState.textContent = isZaraki() ? "Aktif" : "Panggil"; pickZ.classList.toggle("is-active", isZaraki()); }
      if (pickB) { pickBState.textContent = isIchibe() ? "Aktif" : "Panggil"; pickB.classList.toggle("is-active", isIchibe()); }
      if (pickU) {
        pickUState.textContent = isUryu() ? "Aktif" : "Panggil"; pickU.classList.toggle("is-active", isUryu());
        if (root.dataset.bleach) showFac(isUryu() ? "quincy" : "shinigami");   // menu langsung menampilkan golongan karakter yang aktif
      }
    }

    /* ---------- buka kunci ---------- */
    function reveal(animate) {
      secret.hidden = false;
      if (animate) {
        secret.classList.add("is-new");
        setTimeout(() => secret.classList.remove("is-new"), 3200);
      }
    }
    function unlock() {
      if (unlocked) return;
      unlocked = true;
      store.set("bleachUnlocked", "1");
      // Ucapan selamat adalah konfirmasi unlock: status disimpan lalu mini game diberi sinyal.
      root.dataset.bleachEggUnlocked = "1";
      try { localStorage.setItem("shinjiPowerUnlocked", "1"); } catch (_) {}
      window.dispatchEvent(new CustomEvent("bleach:shinji-unlocked", { detail: { source: "congratulations-toast", taps: cfg.taps } }));
      if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
      const pulse = document.createElement("div");
      pulse.className = "bleach-pulse";
      document.body.appendChild(pulse);
      setTimeout(() => pulse.remove(), 1600);
      reveal(true);
      showEggToast();
    }
    /* bunyi "ting" (Web Audio, tanpa file) */
    let eggCtx = null;
    function ting() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        eggCtx = eggCtx || new AC();
        if (eggCtx.state === "suspended") eggCtx.resume();
        const t = eggCtx.currentTime;
        const master = eggCtx.createGain();
        master.gain.value = 0.55;
        master.connect(eggCtx.destination);
        // lonceng kecil: nada dasar + partial tidak harmonis, hilang cepat
        [[1318.5, 0.9, 1.5, 0], [3640, 0.34, 0.8, 0], [2637, 0.45, 0.9, 0.11], [7280, 0.12, 0.4, 0]].forEach(([f, v, d, delay]) => {
          const o = eggCtx.createOscillator(), g = eggCtx.createGain();
          o.type = "sine"; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t + delay);
          g.gain.exponentialRampToValueAtTime(v, t + delay + 0.008);
          g.gain.exponentialRampToValueAtTime(0.0001, t + delay + d);
          o.connect(g); g.connect(master);
          o.start(t + delay); o.stop(t + delay + d + 0.05);
        });
      } catch (_) {}
    }

    /* ucapan selamat + tombol */
    const eggEl = document.getElementById("eggToast");
    let eggTimer = 0, eggHide = 0, eggRemain = 0, eggStart = 0;
    function hideEggToast(after) {
      clearTimeout(eggTimer); clearTimeout(eggHide);
      if (!eggEl || eggEl.hidden) { if (after) after(); return; }
      eggEl.classList.add("is-out");
      eggHide = setTimeout(() => {
        eggEl.hidden = true;
        eggEl.classList.remove("is-in", "is-out", "is-paused");
        if (after) after();
      }, 650);
    }
    function armEgg(ms) {
      clearTimeout(eggTimer);
      eggRemain = ms; eggStart = performance.now();
      eggTimer = setTimeout(() => hideEggToast(), ms);
    }
    function showEggToast() {
      if (!eggEl) return;
      clearTimeout(eggHide);
      eggEl.hidden = false;
      eggEl.classList.remove("is-out", "is-paused"); void eggEl.offsetWidth; eggEl.classList.add("is-in");
      ting();
      armEgg(7000);
    }
    if (eggEl) {
      // jeda hitung mundur saat kursor / fokus di atas notifikasi
      const pause = () => { if (eggEl.classList.contains("is-in") && !eggEl.classList.contains("is-out")) { clearTimeout(eggTimer); eggRemain -= performance.now() - eggStart; eggEl.classList.add("is-paused"); } };
      const resume = () => { if (eggEl.classList.contains("is-paused")) { eggEl.classList.remove("is-paused"); armEgg(Math.max(2500, eggRemain)); } };
      eggEl.addEventListener("pointerenter", pause);
      eggEl.addEventListener("pointerleave", resume);
      eggEl.addEventListener("focusin", pause);
      eggEl.addEventListener("focusout", resume);
      document.getElementById("eggX")?.addEventListener("click", () => hideEggToast());
      document.addEventListener("keydown", e => { if (e.key === "Escape" && !eggEl.hidden) hideEggToast(); });
    }
    // ketuk beruntun pada tombol tema
    const taps = [];
    themeBtn.addEventListener("click", () => {
      if (unlocked) return;
      const now = performance.now();
      if (taps.length && now - taps[taps.length - 1] > cfg.maxGap) taps.length = 0;
      taps.push(now);
      if (taps.length > cfg.taps) taps.shift();
      if (taps.length === cfg.taps && now - taps[0] <= cfg.maxTotal) {
        const m = window.siteMusic;
        if (m && m.isSong(cfg.songIndex)) { taps.length = 0; unlock(); }
      }
    });

    /* ---------- menu kecil ---------- */
    function toggleMenu(open) {
      menuOpen = typeof open === "boolean" ? open : !menuOpen;
      menu.classList.toggle("is-open", menuOpen);
      secret.classList.toggle("menu-open", menuOpen);
      btn.setAttribute("aria-expanded", menuOpen ? "true" : "false");
    }
    btn.addEventListener("click", () => toggleMenu());
    document.addEventListener("pointerdown", e => { if (menuOpen && !secret.contains(e.target)) toggleMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && menuOpen) { toggleMenu(false); btn.focus(); } });

    /* ---------- pintasan keyboard: Ctrl + B L E A C H  atau  Win/Cmd + Shift + = ----------
       Belum terbuka -> membuka kunci Bleach (sama seperti 10x ketuk). Sudah terbuka -> buka/tutup menu Bleach. */
    (function bleachShortcut() {
      const WORD = ["KeyB", "KeyL", "KeyE", "KeyA", "KeyC", "KeyH"];
      const GAP = 2500;                       // jeda maksimal antar huruf (ms)
      let step = 0, last = 0;
      const typing = t => !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      function trigger() { step = 0; if (!unlocked) unlock(); else toggleMenu(); }
      document.addEventListener("keydown", e => {
        if (e.key === "Control" || e.key === "Shift" || e.key === "Meta" || e.key === "Alt") return;
        if (e.metaKey && e.shiftKey && (e.code === "Equal" || e.key === "=" || e.key === "+")) {
          if (!e.repeat && !typing(e.target)) { e.preventDefault(); trigger(); }
          return;
        }
        const now = performance.now();
        if (step && now - last > GAP) step = 0;
        const ok = e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey;
        if (ok && step && e.code === WORD[step]) {
          e.preventDefault(); last = now;
          if (e.repeat) return;
          if (++step === WORD.length) trigger();
        } else if (ok && e.code === WORD[0] && !typing(e.target)) {
          e.preventDefault(); last = now; step = 1;
        } else {
          step = 0;
        }
      }, true);
    })();

    /* ---------- bantu: muat gambar / audio ---------- */
    function firstImage(list) {
      return new Promise(resolve => {
        let i = 0;
        (function next() {
          if (i >= list.length) return resolve(null);
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = () => { i++; next(); };
          im.src = list[i];
        })();
      });
    }
    function setPhoto(list) {
      photo.classList.remove("has-art");
      photo.querySelectorAll("img").forEach(n => n.remove());
      firstImage(list).then(im => {
        if (!im) return;
        im.className = "bs-art"; im.alt = ""; im.draggable = false;
        photo.appendChild(im);
        photo.classList.add("has-art");
      });
    }
    // suara cadangan: bila file mp3 belum ada, kalimatnya dibacakan suara Jepang bawaan browser
    function speakJa(text) {
      try {
        const ss = window.speechSynthesis;
        if (!ss || !text) return;
        ss.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "ja-JP"; u.pitch = 0.4; u.rate = 0.8; u.volume = 1;
        // pilih suara Jepang PRIA bila ada (Otoya, Hattori, Ichiro, Keita, dst.); kalau hanya ada suara wanita, nada diturunkan
        const sc = x => (/otoya|hattori|ichiro|keita|takumi|kenji|ryota|male|man\b/i.test(x.name) ? 10 : 0) - (/kyoko|haruka|ayumi|sayaka|nanami|mizuki|o-?ren|female|woman/i.test(x.name) ? 3 : 0) + (/natural|neural|online/i.test(x.name) ? 2 : 0);
        const v = (ss.getVoices() || []).filter(x => /^ja/i.test(x.lang)).sort((m, n) => sc(n) - sc(m))[0];
        if (v) u.voice = v;
        ss.speak(u);
      } catch (_) {}
    }
    function playAudio(src, say) {
      const a = new Audio(src);
      a.volume = 1;
      let ok = true, said = false;
      const fallback = () => { ok = false; if (!said && say) { said = true; speakJa(say); } };
      a.addEventListener("error", fallback);
      const p = a.play();
      if (p && p.catch) p.catch(fallback);
      return { audio: a, alive: () => ok };
    }

    /* ---------- adegan (stage) ---------- */
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const clearAll = () => { while (timers.length) clearTimeout(timers.pop()); };

    /* efek khusus panggung Aizen (kupu-kupu, cermin pecah) */
    let fxBox = null, shatterObj = null, reiObj = null;
    function clearFx() { if (fxBox) fxBox.innerHTML = ""; shatterObj = null; reiObj = null; }
    /* efek panggung Ichigo (desain sendiri): Getsuga Tenshō · topeng Hollow · rantai api oranye */
    function ichigoStageFx(kind) {
      const add = (cls, style, html) => { const e = document.createElement("i"); e.className = cls; if (style) e.style.cssText = style; if (html) e.innerHTML = html; fxBox.appendChild(e); return e; };
      const r = (a, b) => a + Math.random() * (b - a);
      /* bara melayang naik dari bawah layar */
      const embers = (n, cols, from) => {
        for (let i = 0; i < n; i++) add("ic-ember", "--x:" + r(0, 100).toFixed(1) + "%;--s:" + r(2, 7).toFixed(1) + "px;--c:" + cols[i % cols.length] + ";--d:" + r(2.2, 4.6).toFixed(2) + "s;--dl:" + (from + r(0, 2.2)).toFixed(2) + "s;--dx:" + Math.round(r(-130, 130)) + "px");
      };
      if (kind === "itensa") {
        [[10, 50, -14, 0.8], [27, 64, -6, 1.0], [44, 52, -20, 1.2], [60, 68, -9, 1.4], [76, 46, -16, 1.6]].forEach(c => add("ic-cres", "--y:" + c[0] + "%;--w:" + c[1] + "vmax;--r:" + c[2] + "deg;--dl:" + c[3] + "s"));
        [[16, -20, 2.3], [30, -12, 2.38], [45, -26, 2.46], [60, -16, 2.54], [75, -22, 2.62]].forEach(c => add("ic-slash", "--y:" + c[0] + "%;--r:" + c[1] + "deg;--dl:" + c[2] + "s"));
        add("ic-flash", "--dl:1.4s;--pk:.35");
        add("ic-wave", "--dl:2.3s"); add("ic-wave", "--dl:2.55s");
        add("ic-flash", "--dl:2.3s");
        embers(34, ["#ff6a00", "#ffffff", "#ffb066"], 2.3);
      } else if (kind === "ihollow") {
        for (let i = 0; i < 30; i++) add("ic-flame", "--x:" + (i * 3.5 - 2 + r(-2, 2)).toFixed(1) + "%;--s:" + Math.round(r(28, 76)) + "px;--h:" + Math.round(r(140, 340)) + "px;--d:" + r(1.2, 2).toFixed(2) + "s;--dl:" + r(1.4, 3.8).toFixed(2) + "s;--k:" + Math.round(r(-18, 18)) + "deg");
        add("ic-mask", "", '<svg viewBox="0 -30 200 300" aria-hidden="true"><defs><linearGradient id="icm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1ecec"/><stop offset="1" stop-color="#c9c0c3"/></linearGradient></defs>' +
          '<path d="M62 44 C36 30 18 6 24 -26 C34 -12 40 -4 52 4 C50 -8 54 -18 62 -26 C66 -4 78 14 92 26 Z" fill="url(#icm)" stroke="#2a1018" stroke-width="3" stroke-linejoin="round"/>' +
          '<path d="M100 18 C154 18 178 72 171 134 C166 186 136 244 100 258 C64 244 34 186 29 134 C22 72 46 18 100 18 Z" fill="url(#icm)" stroke="#2a1018" stroke-width="3"/>' +
          '<g fill="#d4121e" stroke="#7d0a12" stroke-width="1.4" stroke-linejoin="round">' +
          '<path d="M96 20 C110 18 122 28 121 60 C119 100 113 140 104 184 C101 140 97 100 96 60 Z"/>' +
          '<path d="M124 34 C142 38 158 58 165 88 L153 84 C147 64 138 50 124 44 Z"/>' +
          '<path d="M126 24 C150 22 172 46 176 80 L168 78 C164 52 148 34 128 32 Z"/>' +
          '<path d="M119 100 C142 88 164 92 172 108 L162 110 C150 102 134 102 121 112 Z"/>' +
          '<path d="M112 160 C134 144 160 142 176 154 L170 162 C154 154 134 156 114 172 Z"/>' +
          '<path d="M100 252 L126 222 L138 230 L108 262 Z"/><path d="M96 238 L120 214 L126 220 L100 246 Z"/></g>' +
          '<g fill="#0a0508" stroke="#2a1018" stroke-width="2"><path d="M42 116 L94 128 C92 142 84 150 68 148 C52 144 42 132 42 116 Z"/><path d="M158 116 L106 128 C108 142 116 150 132 148 C148 144 158 132 158 116 Z"/></g>' +
          '<g class="ic-eye"><ellipse cx="70" cy="134" rx="11" ry="6" fill="#ffb21a" transform="rotate(10 70 134)"/><ellipse cx="130" cy="134" rx="11" ry="6" fill="#ffb21a" transform="rotate(-10 130 134)"/></g>' +
          '<path d="M50 172 L150 172 L142 228 C126 246 74 246 58 228 Z" fill="#14080a"/>' +
          '<g fill="#fff" stroke="#2a1018" stroke-width="1.4" stroke-linejoin="round"><path d="M52 166 L60 166 L56 212 Z"/><path d="M64 166 L73 166 L68 218 Z"/><path d="M78 166 L88 166 L82 222 Z"/><path d="M92 166 L102 166 L97 224 Z"/><path d="M107 166 L117 166 L112 222 Z"/><path d="M122 166 L132 166 L126 218 Z"/><path d="M136 166 L145 166 L140 212 Z"/>' +
          '<path d="M60 236 L68 214 L74 242 Z"/><path d="M78 244 L86 216 L94 246 Z"/><path d="M96 247 L104 216 L112 247 Z"/><path d="M114 246 L122 216 L130 244 Z"/><path d="M130 242 L136 214 L142 236 Z"/></g>' +
          '<g class="ic-crack" fill="none" stroke="#111" stroke-width="3"><path d="M118 22 L108 58 L124 80 L112 112"/><path d="M62 150 L80 170 L70 196"/><path d="M140 160 L124 186 L134 214"/></g></svg>');
        add("ic-wave", "--dl:2.0s"); add("ic-wave", "--dl:2.3s"); add("ic-wave", "--dl:2.6s");
        add("ic-flash", "--dl:2.0s;--pk:.6");
        add("ic-flash", "--dl:3s");
        embers(30, ["#ff2a44", "#ff8a96", "#ffffff"], 1.6);
      } else if (kind === "ichain") {
        /* 7 rantai api menghantam dari dua sisi, tiap benturan memercikkan kilatan oranye */
        [[28, -6, "-130%", 0.6], [56, 5, "130%", 1.0], [78, -4, "-130%", 1.4]]
          .forEach(c => add("ic-chain", "--y:" + c[0] + "%;--r:" + c[1] + "deg;--from:" + c[2] + ";--dl:" + c[3] + "s"));
        [1.2, 1.9].forEach(d => add("ic-flash", "--dl:" + d + "s;--pk:.32"));
        add("ic-chainring", "--dl:1.2s");
        /* ledakan api: pilar api + gelombang kejut + bara berhamburan, selaras dengan reiatsu di detik 2.3 */
        for (let i = 0; i < 9; i++) add("ic-flame ic-fire", "--x:" + (i * 4 - 2 + r(-2, 2)).toFixed(1) + "%;--s:" + Math.round(r(34, 92)) + "px;--h:" + Math.round(r(180, 460)) + "px;--d:" + r(1.3, 2.3).toFixed(2) + "s;--dl:" + r(2.2, 4).toFixed(2) + "s;--k:" + Math.round(r(-16, 16)) + "deg");
        add("ic-wave", "--dl:2.3s"); add("ic-wave", "--dl:2.55s"); add("ic-wave", "--dl:2.8s");
        add("ic-flash", "--dl:2.3s");
        embers(26, ["#ff2b2b", "#ff6b6b", "#ffffff", "#b3101a"], 2.2);
      }
    }
    /* ---------- PEMBARUAN 36: QUINCY (Uryū Ishida) - bunyi & efek panggung, semuanya dibuat kode ---------- */
    const QN_CROSS = '<svg viewBox="-100 -100 200 200" aria-hidden="true"><g fill="none" stroke="currentColor"><circle r="92" stroke-width="3"/><circle r="82" stroke-width="1" opacity=".7"/>' +
      '<path d="M0 -70V70M-70 0H70" stroke-width="9"/><path d="M-15 -70H15M-15 70H15M-70 -15V15M70 -15V15" stroke-width="5"/>' +
      '<path d="M-52 -52L52 52M-52 52L52 -52" stroke-width="1.6" opacity=".55"/><circle r="10" fill="currentColor" stroke="none"/></g></svg>';
    function quincyWings() {
      const feather = (sg, a, len, i) => {
        const w = 22 + (len / 340) * 10, x = v => (v * sg).toFixed(1);
        const d = "M0 0 C" + x(len * .25) + " " + (-w) + " " + x(len * .72) + " " + (-w * .85) + " " + x(len) + " 0 C" + x(len * .72) + " " + (w * .85) + " " + x(len * .25) + " " + w + " 0 0Z";
        return '<g class="qn-f" style="--a:' + (a * sg).toFixed(1) + 'deg;--i:' + i + '"><path d="' + d + '" fill="url(#' + (sg > 0 ? "qnwr" : "qnwl") + ')" stroke="#ffffff" stroke-opacity=".7" stroke-width="1.4"/>' +
               '<path d="M0 0 L' + x(len * .94) + ' 0" stroke="#ffffff" stroke-opacity=".55" stroke-width="1.2"/></g>';
      };
      let g = "";
      [1, -1].forEach(sg => { for (let i = 0; i < 8; i++) g += feather(sg, -72 + i * 12.5, 350 - Math.abs(i - 2.2) * 24, i); });
      return '<svg viewBox="0 0 800 400" aria-hidden="true"><defs>' +
        '<linearGradient id="qnwr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".55" stop-color="#bff3ff" stop-opacity=".8"/><stop offset="1" stop-color="#4fb8ff" stop-opacity=".18"/></linearGradient>' +
        '<linearGradient id="qnwl" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".55" stop-color="#bff3ff" stop-opacity=".8"/><stop offset="1" stop-color="#4fb8ff" stop-opacity=".18"/></linearGradient></defs>' +
        '<g transform="translate(400 200)">' + g + '</g></svg>';
    }
    function quincyStageFx(kind) {
      const L = kind === "uletzt";
      const r = (a, b) => a + Math.random() * (b - a);
      const add = (cls, style, html) => { const e = document.createElement("i"); e.className = cls; if (style) e.style.cssText = style; if (html) e.innerHTML = html; fxBox.appendChild(e); return e; };
      add("qn-cross", "--dl:.15s", QN_CROSS);
      add("qn-halo", "--dl:.4s");
      const n = L ? 13 : 8;                       // hujan panah reishi (Heilig Pfeil)
      for (let i = 0; i < n; i++) add("qn-arrow", "--y:" + r(8, 88).toFixed(1) + "%;--r:" + r(-15, 12).toFixed(1) + "deg;--len:" + Math.round(r(240, 480)) + "px;--dl:" + (0.8 + i * (1.3 / n)).toFixed(2) + "s;--d:" + r(.4, .62).toFixed(2) + "s;--dir:" + (i % 2 ? 1 : -1));
      for (let i = 0; i < (L ? 46 : 30); i++) add("qn-mote", "--x:" + r(0, 100).toFixed(1) + "%;--s:" + r(2, 7).toFixed(1) + "px;--d:" + r(2.6, 5).toFixed(2) + "s;--dl:" + r(.3, 3.2).toFixed(2) + "s;--dx:" + Math.round(r(-60, 60)) + "px");
      if (L) {
        add("qn-flash", "--dl:1.35s;--pk:.22");
        add("qn-wings", "", quincyWings());
      }
      if (window.uryuRuneSVG) for (let i = 0; i < (L ? 7 : 9); i++) add("qn-rune", "--x:" + r(3, 88).toFixed(1) + "%;--y:" + r(6, 80).toFixed(1) + "%;--s:" + Math.round(r(26, 54)) + "px;--r:" + r(-25, 25).toFixed(0) + "deg;--dl:" + r(.6, 3.2).toFixed(2) + "s", window.uryuRuneSVG());
      if (L) add("qn-eclipse", "--dl:.3s");
      add("qn-wave", "--dl:2.3s"); add("qn-wave", "--dl:2.55s");
      add("qn-flash", "--dl:2.3s;--pk:" + (L ? ".85" : ".55"));
    }
    let qAC = null;
    function quincySfx(kind) {
      if (window.tapSound && window.tapSound.on === false) return;
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        qAC = qAC || new AC(); const ac = qAC; if (ac.state === "suspended") ac.resume();
        const L = kind === "uletzt", t0 = ac.currentTime + 0.05;
        const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
        const master = ac.createGain(); master.gain.value = 0.9; master.connect(comp); comp.connect(ac.destination);
        const verb = ac.createConvolver(), VL = (ac.sampleRate * 1.8) | 0, vb = ac.createBuffer(2, VL, ac.sampleRate);
        for (let c = 0; c < 2; c++) { const d = vb.getChannelData(c); for (let i = 0; i < VL; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / VL, 2.6); }
        verb.buffer = vb; const vg = ac.createGain(); vg.gain.value = 0.5; verb.connect(vg); vg.connect(master);
        const nb = ac.createBuffer(1, ac.sampleRate, ac.sampleRate), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
        const out = (n, wet) => { n.connect(master); if (wet) { const g = ac.createGain(); g.gain.value = wet; n.connect(g); g.connect(verb); } };
        const tone = (type, f0, f1, t, dur, vol, wet, att) => {
          const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t);
          if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
          g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.005)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          o.connect(g); out(g, wet); o.start(t); o.stop(t + dur + 0.05);
        };
        const noise = (ft, f0, f1, t, dur, vol, wet, q, att) => {
          const s = ac.createBufferSource(); s.buffer = nb; s.loop = true;
          const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1; f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
          const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || Math.min(0.012, dur * 0.3))); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          s.connect(f); f.connect(g); out(g, wet); s.start(t, Math.random()); s.stop(t + dur + 0.05);
        };
        noise("bandpass", 180, 2400, t0, 0.8, 0.07, 0.4, 1, 0.5);                       // hawa berkumpul
        tone("sine", 1568, 0, t0 + 0.1, 1.2, 0.025, 0.9, 0.05);
        const na = L ? 12 : 8;                                                           // panah: petikan tali + desir
        for (let i = 0; i < na; i++) {
          const t = t0 + 0.8 + i * (1.3 / na);
          tone("triangle", 340, 110, t, 0.24, 0.1, 0.25, 0.003); noise("bandpass", 1800, 7500, t + 0.02, 0.24, 0.09, 0.5, 1.4); tone("sine", 3136 + (i % 3) * 330, 0, t + 0.05, 0.3, 0.03, 0.9, 0.003);
        }
        const sw = (f0, f1, vol) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.setValueAtTime(f0, t0 + 1.2); o.frequency.exponentialRampToValueAtTime(f1, t0 + 2.3);
          g.gain.setValueAtTime(0.0001, t0 + 1.2); g.gain.exponentialRampToValueAtTime(vol, t0 + 2.28); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.9); o.connect(g); out(g, 0.5); o.start(t0 + 1.2); o.stop(t0 + 3); };
        sw(196, 392, 0.1); sw(294, 588, 0.07);                                           // dengung naik menuju puncak
        const b = t0 + 2.3;                                                              // PUNCAK
        tone("sine", 72, 34, b, 0.95, 0.36, 0.15, 0.015); noise("lowpass", 1400, 140, b, 0.55, 0.22, 0.2, 1, 0.02);
        (L ? [392, 523.25, 659.25, 783.99, 1046.5] : [440, 659.25, 880]).forEach((f, i) => { tone("sine", f, 0, b + i * 0.03, L ? 2.8 : 1.8, L ? 0.065 : 0.08, 0.9, L ? 0.45 : 0.03); if (L) tone("triangle", f * 2, 0, b + i * 0.03, 2.2, 0.018, 0.8, 0.5); });
        for (let i = 0; i < (L ? 12 : 6); i++) tone("sine", 2800 + Math.random() * 3200, 0, b + 0.1 + i * 0.12, 0.4, 0.03, 0.9, 0.004);   // kilau reishi
        setTimeout(() => { try { comp.disconnect(); } catch (_) {} }, 7000);
      } catch (_) {}
    }
    function aizenFx(kind) {
      if (!fxBox) { fxBox = document.createElement("div"); fxBox.className = "bs-fx"; stage.appendChild(fxBox); }
      fxBox.innerHTML = "";
      if (kind === "aizen") {
        const cols = ["#c4b5fd", "#e9e6ff", "#7ee7ff", "#9d7bff"];
        for (let i = 0; i < 28; i++) {
          const b = document.createElement("i");
          b.className = "bs-bfly";
          b.style.cssText = "--x:" + (4 + Math.random() * 92).toFixed(1) + "%;--c:" + cols[i % cols.length] + ";--d:" + (3.4 + Math.random() * 2.6).toFixed(1) + "s;--dl:" + (1.1 + Math.random() * 2.2).toFixed(2) + "s;--dx:" + Math.round(-120 + Math.random() * 240) + "px;--s:" + (.7 + Math.random() * .9).toFixed(2);
          b.innerHTML = "<b></b><b></b>";
          fxBox.appendChild(b);
        }
      } else if (kind === "kyoka") {
        /* cermin besar: retak lalu pecah (dibuat di bawah) */
      }
      // kaca pecah HANYA untuk Kyōka Suigetsu; masuk mode Aizen = reiatsu + kupu-kupu
      shatterObj = kind === "kyoka" && window.bleachShatter ? window.bleachShatter(fxBox, { cx: .5, cy: .46, shake: stage }) : null;
      reiObj = kind === "aizen" && window.bleachReiatsu ? window.bleachReiatsu(fxBox, { cx: .64, cy: .46, shake: stage }) : null;
      if (kind === "zbankai" && window.bleachReiatsu) reiObj = window.bleachReiatsu(fxBox, { cx: .5, cy: .46, shake: stage, red: true, colors: ["#ff3b2f", "#ff8a3d", "#ffd2a0", "#e0172e"] });
      if ((kind === "itensa" || kind === "ihollow" || kind === "ichain") && window.bleachReiatsu) {
        const cols = kind === "ichain" ? ["#ff2b2b", "#ff7a7a", "#ffffff", "#b3101a"] : kind === "ihollow" ? ["#f0182f", "#ff7a86", "#ffffff", "#8a0a1c"] : ["#ff6a00", "#ffffff", "#ffb066", "#a13a00"];
        reiObj = window.bleachReiatsu(fxBox, { cx: .5, cy: .46, shake: stage, red: true, colors: cols });
        if (kind === "itensa" && reiObj && reiObj.el) reiObj.el.classList.add("is-fire");   // reiatsu oranye pekat
      }
      if (kind === "itensa" || kind === "ihollow" || kind === "ichain") ichigoStageFx(kind);
      if ((kind === "uryu" || kind === "uletzt") && window.bleachReiatsu) {
        reiObj = window.bleachReiatsu(fxBox, { cx: .5, cy: .46, shake: stage, colors: kind === "uletzt" ? ["#ffffff", "#bff3ff", "#7fdcff", "#e8fbff"] : ["#7fdcff", "#ffffff", "#3fa8ff", "#bff3ff"] });
      }
      if (kind === "uryu" || kind === "uletzt") quincyStageFx(kind);
      if (kind === "zaraki") {
        [[22, -17, 0], [36, -22, .12], [50, -14, .24], [64, -25, .36]].forEach(c => {
          const e = document.createElement("i"); e.className = "bs-claw";
          e.style.cssText = "--y:" + c[0] + "%;--r:" + c[1] + "deg;--dl:" + c[2] + "s";
          fxBox.appendChild(e);
        });
      }
    }
    function openStage(kind) {
      stage.hidden = false;
      stage.setAttribute("aria-hidden", "false");
      stage.dataset.kind = kind;
      stage.classList.remove("is-in", "is-out", "is-flip", "t-kanji", "t-photo", "t-text", "t-reveal", "t-glint", "t-mirror", "t-shatter", "t-crack", "t-break");
      void stage.offsetWidth;
      stage.classList.add("is-in");
    }
    function closeStage(done) {
      stage.classList.add("is-out");
      setTimeout(() => {
        stage.hidden = true;
        stage.setAttribute("aria-hidden", "true");
        stage.classList.remove("is-in", "is-out", "is-flip", "t-kanji", "t-photo", "t-text", "t-reveal", "t-glint", "t-mirror", "t-shatter", "t-crack", "t-break");
        clearFx();
        try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (_) {}
        if (done) done();
      }, reduceMotion ? 60 : 650);
    }

    function runScene(kind, applyState, afterState) {
      if (busy) return;
      busy = true;
      toggleMenu(false);
      const SC = {
        bankai: { ch: "shinji", kanji: "卍解", title: "Sakashima Yokoshima Happō Fusagari", sub: "逆様邪八方塞 · Bankai Hirako Shinji", img: cfg.bankaiImg, audio: cfg.bankaiAudio, flow: "enter" },
        sekai:  { ch: "shinji", kanji: "ようこそ逆様の世界へ", title: "Yōkoso Sakasama no Sekai e", sub: "Selamat datang di dunia yang terbalik", img: cfg.sekaiImg, audio: cfg.sekaiAudio, flow: "flip" },
        aizen:  { ch: "aizen", kanji: "ようこそ", title: "Yōkoso, Watashi no Soul Society e", sub: "ようこそ、私の尸魂界へ · Selamat datang di Soul Society-ku", img: cfg.aizenImg, audio: cfg.aizenAudio, flow: "enter", say: "ようこそ、わたしの、ソウルソサエティへ" },
        kyoka:  { ch: "aizen", kanji: "鏡花水月", title: "Kudakero, Kyōka Suigetsu", sub: "砕けろ、鏡花水月 · 完全催眠 — apa yang kau lihat belum tentu nyata", img: cfg.kyokaImg, audio: cfg.kyokaAudio, flow: "illusion", say: "くだけろ、きょうかすいげつ" },
        zaraki:  { ch: "zaraki", kanji: "野晒", title: "Nozarashi", sub: "野晒 · Kenpachi Zaraki — bertarung sampai tetes darah terakhir", img: cfg.zarakiImg, audio: cfg.zarakiAudio, flow: "slash", say: "のざらし" },
        zbankai: { ch: "zaraki", kanji: "卍解", title: "Bankai da yo!", sub: "卍解 · Mode iblis — tekanan spiritual meledak", img: cfg.zbankaiImg, audio: cfg.zbankaiAudio, flow: "boom", say: "ばんかい だよ、あああああ" },
        uryu:    { ch: "uryu", kanji: "滅却師", title: "Heilig Bogen", sub: "滅却師 · Uryū Ishida — Quincy yang memanah dengan anggun, tak pernah meleset", img: cfg.uryuImg, audio: cfg.uryuAudio, flow: "quincy", say: "クインシー、いしだ うりゅう" },
        uletzt:  { ch: "uryu", kanji: "最終形態", title: "Quincy: Letzt Stil", sub: "最終形態 · Uryū Ishida — sayap reishi bercahaya, hujan panah tanpa akhir", img: cfg.uletztImg, audio: cfg.uletztAudio, flow: "quincy", say: "クインシー、レツト シュティール" },
        ichibe:  { ch: "ichibe", kanji: "", title: "", sub: "", img: cfg.ichibeImg, audio: cfg.ichibeAudio, flow: "ichigo" },
        ibankai: { ch: "ichibe", kanji: "", title: "", sub: "", img: cfg.ibankaiImg, audio: cfg.ibankaiAudio, flow: "ichigo" },
        itensa:  { ch: "ichigo", kanji: "卍解", title: "Bankai · Tensa Zangetsu", sub: "天鎖斬月 · Ichigo Kurosaki — Getsuga Tenshō!", img: cfg.ichigoImg, audio: cfg.ichigoAudio, flow: "ichigo", say: "ばんかい、てんさざんげつ" },
        ihollow: { ch: "ichigo", kanji: "虚化", title: "Hollowfication", sub: "虚化 · Ichigo Kurosaki — topeng Hollow, jeritan di hadapan Ulquiorra", img: cfg.ihollowImg, audio: cfg.ihollowAudio, flow: "ichigo", say: "うおおおおおお" },
        ichain:  { ch: "ichigo", kanji: "鎖", title: "Bankai · Chain Armor", sub: "鎖の卍解 · Ichigo Kurosaki — rantai merah menyala, reiatsu gelap", img: cfg.ichainImg, audio: cfg.ichainAudio, flow: "ichigo", say: "ばんかい" }
      }[kind];
      kanji.textContent = SC.kanji;
      title.textContent = SC.title;
      sub.textContent = SC.sub;
      stage.dataset.char = SC.ch;
      const fb = photo.querySelector(".bs-fallback");
      if (fb) fb.innerHTML = SC.ch === "aizen" ? "<b>藍染</b><b>惣右介</b>" : SC.ch === "ichigo" ? "<b>黒崎</b><b>一護</b>" : SC.ch === "zaraki" ? "<b>更木</b><b>剣八</b>" : SC.ch === "ichibe" ? "<i class=\"ib-hanko\"></i>" : SC.ch === "uryu" ? "<b>石田</b><b>雨竜</b>" : "<b>平子</b><b>真子</b>";
      const bigChar = stage.querySelector(".bs-saka");
      if (bigChar) bigChar.textContent = SC.ch === "aizen" ? "鏡" : SC.ch === "ichigo" ? "月" : SC.ch === "zaraki" ? "剣" : SC.ch === "ichibe" ? "" : SC.ch === "uryu" ? "滅" : "逆";
      setPhoto(SC.img);

      const snd = playAudio(SC.audio, SC.say);
      if (SC.ch === "uryu") quincySfx(kind);
      if (SC.ch === "ichibe" && window.ichibeInk) window.ichibeInk.scene(kind, stage);
      if (window.siteMusic) window.siteMusic.duck(true);

      const t = reduceMotion ? 0.25 : 1;
      let applied = false, closed = false;
      const apply = () => { if (applied) return; applied = true; stage.classList.add("t-reveal"); applyState(); };
      const end = () => {
        if (closed) return; closed = true;
        clearAll();
        apply();
        closeStage(() => {
          if (afterState) afterState();
          const release = () => { if (window.siteMusic) window.siteMusic.duck(false); busy = false; finishNow = null; };
          if (snd.alive() && !snd.audio.ended && !snd.audio.paused && snd.audio.duration && snd.audio.duration < 20) {
            snd.audio.addEventListener("ended", release, { once: true });
            setTimeout(release, 12000);
          } else release();
        });
      };
      finishNow = () => { try { snd.audio.pause(); } catch (_) {} end(); };

      aizenFx(kind);
      openStage(kind);
      later(() => stage.classList.add("t-kanji"), 350 * t);
      later(() => stage.classList.add("t-photo"), 900 * t);
      later(() => stage.classList.add("t-text"), 1500 * t);
      if (SC.flow === "enter" && SC.ch === "aizen") {
        later(() => stage.classList.add("t-glint"), 1750 * t);   // kilau kacamata
        later(() => { stage.classList.add("t-crack"); if (reiObj) reiObj.charge(); }, 2150 * t);   // reiatsu terkumpul (t-crack = kilat foto)
        later(() => {                                            // ... ledakan reiatsu + kupu-kupu: Soul Society terbuka
          stage.classList.add("t-break");
          if (reiObj) reiObj.surge();
          apply();
        }, 3050 * t);
        later(end, 7300 * t);
      } else if (SC.flow === "enter") {
        later(apply, 1900 * t);          // tema berubah pelan di balik adegan
        later(end, 5600 * t);
      } else if (SC.flow === "slash") {
        later(() => stage.classList.add("t-slash"), 1500 * t);   // tebasan cakar merah melintas
        later(apply, 2100 * t);
        later(end, 5600 * t);
      } else if (SC.flow === "boom") {
        later(() => { stage.classList.add("t-crack"); if (reiObj) reiObj.charge(); }, 1300 * t);   // tekanan merah terkumpul
        later(() => { stage.classList.add("t-break"); if (reiObj) reiObj.surge(); apply(); }, 2300 * t);   // MELEDAK
        later(end, 6200 * t);
      } else if (SC.flow === "ichigo" || SC.flow === "quincy") {
        later(() => { if (reiObj) reiObj.charge(); }, 1300 * t);                 // tekanan reiatsu terkumpul
        later(() => { if (reiObj) reiObj.surge(); apply(); }, 2300 * t);          // LEDAKAN + mode berganti di puncaknya
        later(end, 6400 * t);
      } else if (SC.flow === "illusion") {
        later(() => { stage.classList.add("t-mirror", "t-crack"); if (shatterObj) shatterObj.crack(); }, 1500 * t);  // cermin retak
        later(() => {                                            // ... lalu pecah berkeping-keping
          stage.classList.add("t-shatter", "t-break");
          if (shatterObj) shatterObj.shatter();
        }, 2450 * t);
        later(apply, 2800 * t);          // ilusi menyelimuti dunia
        later(end, 6000 * t);
      } else {
        later(() => { stage.classList.add("is-flip"); }, 1900 * t);
        later(apply, 2100 * t);          // dunia berbalik
        later(end, 4600 * t);
      }
    }
    skipBtn.addEventListener("click", () => { if (finishNow) finishNow(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && finishNow && !stage.hidden) finishNow(); });

    /* ---------- tema Shinji ---------- */
    function morph(ms) {
      root.classList.add("bleach-morph");
      setTimeout(() => root.classList.remove("bleach-morph"), ms);
    }
    function enterBleach(name) {
      if (busy) return;
      const scene = name === "aizen" ? "aizen" : name === "uryu" ? "uryu" : name === "ichibe" ? "ichibe" : name === "zaraki" ? "zaraki" : name === "ichigo" ? "itensa" : "bankai";
      runScene(scene, () => {
        morph(reduceMotion ? 50 : 3600);
        setSekai(false); setKyoka(false); setZBankai(false); delete root.dataset.uletzt; delete root.dataset.ibankai; delete root.dataset.ichigo; if (name === "ichigo") root.dataset.ichigo = "tensa";   // pindah karakter: efek karakter lama dilepas
        root.dataset.theme = "dark";
        root.dataset.bleach = name;
        store.set("bleachMode", name);
        syncToggle();
      });
    }
    const enterShinji = () => enterBleach("shinji");
    const enterAizen = () => enterBleach("aizen");
    function leaveBleach() {
      if (busy) return;
      toggleMenu(false);
      morph(reduceMotion ? 50 : 1800);
      setSekai(false); setKyoka(false); setZBankai(false); delete root.dataset.uletzt; delete root.dataset.ibankai; delete root.dataset.ichigo;
      delete root.dataset.bleach;
      store.del("bleachMode");
      const saved = store.get("theme");
      root.dataset.theme = saved === "light" ? "light" : "dark";
      syncThemeUI();
      syncToggle();
    }
    pick.addEventListener("click", () => { if (isShinji()) leaveBleach(); else enterBleach("shinji"); });
    pickA.addEventListener("click", () => { if (isAizen()) leaveBleach(); else enterBleach("aizen"); });
    if (pickZ) pickZ.addEventListener("click", () => { if (isZaraki()) leaveBleach(); else enterBleach("zaraki"); });
    if (pickI) pickI.addEventListener("click", () => { if (isIchigo()) leaveBleach(); else enterBleach("ichigo"); });
    if (pickB) pickB.addEventListener("click", () => { if (isIchibe()) leaveBleach(); else enterBleach("ichibe"); });
    if (pickU) pickU.addEventListener("click", () => { if (isUryu()) leaveBleach(); else enterBleach("uryu"); });

    /* ---------- Sekai: dunia terbalik ---------- */
    let sekTimer = 0;
    function setSekai(on) {
      root.dataset.sekaiAnim = "1";
      clearTimeout(sekTimer);
      sekTimer = setTimeout(() => { delete root.dataset.sekaiAnim; }, 2000);
      if (on) root.dataset.sekai = "on"; else delete root.dataset.sekai;
      syncToggle();
    }

    /* ---------- Kyōka Suigetsu: ilusi (khusus Aizen) ---------- */
    const veil = document.createElement("div");
    veil.className = "kyoka-veil"; veil.setAttribute("aria-hidden", "true");
    document.body.appendChild(veil);
    function setKyoka(on) {
      if (on) root.dataset.kyoka = "on"; else delete root.dataset.kyoka;
      syncToggle();
    }
    /* ---------- Ichigo: 3 mode (tensa = Bankai Tensa Zangetsu · hollow · chain = Bankai zirah berantai) ---------- */
    function setIchigo(m) { root.dataset.ichigo = m; syncToggle(); }
    /* ---------- Quincy: Letzt Stil (Uryū) ---------- */
    function setIBankai(on) {
      if (on) root.dataset.ibankai = "on"; else delete root.dataset.ibankai;
      syncToggle();
    }
    function setLetzt(on) {
      if (on) root.dataset.uletzt = "on"; else delete root.dataset.uletzt; delete root.dataset.ibankai;
      syncToggle();
    }
    /* ---------- Bankai Zaraki (mode iblis) ---------- */
    function setZBankai(on) {
      if (on) root.dataset.zbankai = "on"; else delete root.dataset.zbankai;
      syncToggle();
    }
    themeBtn.addEventListener("click", (e) => {
      if (busy) return;
      if (isIchigo()) {
        const order = ["tensa", "hollow", "chain"], cur = ichi(), r = themeBtn.getBoundingClientRect();
        const byKey = !e.clientX && !e.clientY;   // Enter/Spasi = pindah ke mode berikutnya; klik/ketuk = segmen yang ditekan
        const to = byKey ? order[(order.indexOf(cur) + 1) % 3] : order[Math.min(2, Math.max(0, Math.floor((e.clientX - r.left) / (r.width / 3))))];
        if (to === cur) return;
        runScene(to === "tensa" ? "itensa" : to === "hollow" ? "ihollow" : "ichain", () => setIchigo(to));
        return;
      }
      if (isIchibe()) {
        if (isIBankai()) setIBankai(false);
        else runScene("ibankai", () => setIBankai(true));
        return;
      }
      if (isUryu()) {
        if (isLetzt()) setLetzt(false);
        else runScene("uletzt", () => setLetzt(true));
        return;
      }
      if (isZaraki()) {
        if (isZBankai()) setZBankai(false);
        else runScene("zbankai", () => setZBankai(true));
        return;
      }
      if (isShinji()) {
        if (isSekai()) setSekai(false);
        else runScene("sekai", () => setSekai(true));
      } else if (isAizen()) {
        if (isKyoka()) setKyoka(false);
        else runScene("kyoka", () => setKyoka(true));
      }
    });


    /* ---------- kilau latar tema Shinji ---------- */
    (function sparkles() {
      const host = document.querySelector(".background-pattern");
      if (!host) return;
      const cv = document.createElement("canvas");
      cv.id = "sparkCanvas"; cv.setAttribute("aria-hidden", "true");
      host.appendChild(cv);
      const cx = cv.getContext("2d");
      const COLORS_SHINJI = ["255,229,138", "246,207,69", "255,120,170", "255,244,222"];
      const COLORS_AIZEN = ["196,181,253", "233,230,255", "126,231,255", "157,123,255"];
      const COLORS_ZARAKI = ["255,70,50", "255,138,61", "255,210,160", "224,23,46"];
      const COLORS_QUINCY = ["127,220,255", "255,255,255", "63,168,255", "191,243,255"];
      const colors = () => isUryu() ? COLORS_QUINCY : isAizen() ? COLORS_AIZEN : isZaraki() ? COLORS_ZARAKI : COLORS_SHINJI;
      let W = 0, H = 0, dots = [], raf = 0, last = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      function size() {
        W = innerWidth; H = innerHeight;
        cv.width = W * dpr; cv.height = H * dpr;
        cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(clamp(W * H / 9000, 40, 130));
        dots = Array.from({ length: n }, () => mk(true));
      }
      function mk(init) {
        const C = colors();
        return { x: rand(0, W), y: rand(0, H), r: rand(2, 6), c: C[(Math.random() * C.length) | 0],
                 ph: rand(0, 6.28), sp: rand(.6, 1.9), vy: rand(-6, -1.5), star: Math.random() < (isUryu() ? .7 : .45),
                 fly: isAizen() && Math.random() < .5, rot: rand(-.5, .5), dx: rand(-9, 9) };
      }
      function star(x, y, r, a, c) {
        cx.save(); cx.translate(x, y); cx.globalAlpha = a; cx.fillStyle = "rgba(" + c + ",1)";
        cx.shadowColor = "rgba(" + c + ",.9)"; cx.shadowBlur = r * 3;
        cx.beginPath();
        for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * .22 : r * 1.6; const an = i * Math.PI / 4; cx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); }
        cx.closePath(); cx.fill(); cx.restore();
      }
      // kupu-kupu kecil (tema Aizen): dua sayap mengepak
      function butterfly(x, y, r, a, c, ph, rot) {
        const flap = .35 + Math.abs(Math.sin(ph * 3.2)) * .65, s = r * 2.4;
        cx.save(); cx.translate(x, y); cx.rotate(rot); cx.globalAlpha = a; cx.fillStyle = "rgba(" + c + ",1)";
        cx.shadowColor = "rgba(" + c + ",.9)"; cx.shadowBlur = r * 3;
        cx.beginPath(); cx.ellipse(-s * .5 * flap, -s * .1, s * .55 * flap, s * .38, -.5, 0, 6.283); cx.fill();
        cx.beginPath(); cx.ellipse(s * .5 * flap, -s * .1, s * .55 * flap, s * .38, .5, 0, 6.283); cx.fill();
        cx.beginPath(); cx.ellipse(0, s * .05, s * .06, s * .3, 0, 0, 6.283); cx.fill();
        cx.restore();
      }
      let lastMode = "";
      function frame(t) {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(.05, (t - last) / 1000 || 0); last = t;
        cx.clearRect(0, 0, W, H);
        for (const d of dots) {
          d.ph += dt * d.sp * 2.4; d.y += d.vy * dt; if (d.fly) d.x += Math.sin(d.ph * .7) * d.dx * dt;
          if (d.y < -10) { d.y = H + 10; d.x = rand(0, W); }
          const a = Math.max(0, Math.sin(d.ph)) ** 2 * .95;
          if (a < .02) continue;
          if (d.fly) butterfly(d.x, d.y, d.r, a, d.c, d.ph, d.rot);
          else if (d.star) star(d.x, d.y, d.r, a, d.c);
          else { cx.globalAlpha = a * .8; cx.fillStyle = "rgba(" + d.c + ",1)"; cx.shadowColor = "rgba(" + d.c + ",1)"; cx.shadowBlur = d.r * 3; cx.beginPath(); cx.arc(d.x, d.y, d.r * .6, 0, 6.283); cx.fill(); }
        }
        cx.globalAlpha = 1; cx.shadowBlur = 0;
      }
      function sync() {
        const on = !!root.dataset.bleach && root.dataset.bleach !== "ichigo" && !document.hidden;
        const m = root.dataset.bleach || "";
        if (on && raf && m !== lastMode) size();       // ganti karakter: warna & bentuk dibuat ulang
        lastMode = m;
        if (on && !raf) { size(); last = performance.now(); raf = requestAnimationFrame(frame); }
        else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; cx.clearRect(0, 0, W, H); }
      }
      new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach"] });
      document.addEventListener("visibilitychange", sync);
      addEventListener("resize", () => { if (raf) size(); });
      if (reduceMotion) { cv.dataset.still = "1"; }
      sync();
    })();

    /* ---------- reset ---------- */
    window.resetBleach = function () {
      store.del("bleachUnlocked"); store.del("bleachMode");
      delete root.dataset.bleachEggUnlocked;
      try { localStorage.removeItem("shinjiPowerUnlocked"); } catch (_) {}
      delete root.dataset.bleach; delete root.dataset.sekai; delete root.dataset.kyoka; delete root.dataset.zbankai; delete root.dataset.uletzt; delete root.dataset.ibankai; delete root.dataset.ichigo;
      const saved = store.get("theme");
      root.dataset.theme = saved === "light" ? "light" : "dark";
      unlocked = false; secret.hidden = true; toggleMenu(false);
      syncThemeUI(); syncToggle();
      return "Bleach direset.";
    };

    syncToggle();
  })();


  /* ---------- VARIAN GAMBAR ID CARD per tema (opsional) ----------
     Kalau pakai gambar sendiri, taruh images/idcard-front-light.png, -shinji.png, -sekai.png
     (dan idcard-back-light.png, dst). Kalau tidak ada, otomatis pakai gambar biasa. */
  (function () {
    const arts = Array.from(document.querySelectorAll(".idcard-art")).map(function (img) { return { img: img, base: img.getAttribute("src") }; });
    if (!arts.length) return;
    const tag = function () { return root.dataset.bleach === "ichigo" ? "ichigo" + (root.dataset.ichigo === "hollow" ? "-hollow" : root.dataset.ichigo === "chain" ? "-chain" : "") : root.dataset.bleach === "aizen" ? (root.dataset.kyoka === "on" ? "kyoka" : "aizen") : root.dataset.bleach === "ichibe" ? (root.dataset.ibankai === "on" ? "ichibe-bankai" : "ichibe") : root.dataset.bleach === "uryu" ? (root.dataset.uletzt === "on" ? "uryu-letzt" : "uryu") : root.dataset.bleach === "shinji" ? (root.dataset.sekai === "on" ? "sekai" : "shinji") : (root.dataset.theme === "light" ? "light" : ""); };
    function apply() {
      const t = tag();
      arts.forEach(function (a) {
        if (!a.img.isConnected) return;
        if (!t) { a.img.src = a.base; return; }
        const alt = a.base.replace(/(\.\w+)$/, "-" + t + "$1"), probe = new Image();
        probe.onload = function () { a.img.src = alt; };
        probe.onerror = function () { a.img.src = a.base; };
        probe.src = alt;
      });
    }
    new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach", "data-sekai", "data-kyoka", "data-ichigo", "data-uletzt"] });
  })();

  /* ---------- FOTO DI ID CARD (PEMBARUAN 67): foto asli mengisi bingkai bulat di depan kartu ----------
     Taruh foto (PNG transparan paling bagus, rasio persegi) di images/idcard-photo.png. Kalau file tidak ada, huruf/inisial bawaan tetap tampil.
     Ganti nama file / posisi wajah: ubah CFG di bawah. */
  (function idCardPhoto() {
    const CFG = { src: "images/idcard-photo.png", pos: "50% 18%" };   // pos = bagian foto yang dipusatkan di bingkai
    const slots = Array.from(document.querySelectorAll(".idc-photo"));
    if (!slots.length) return;
    slots.forEach(function (slot) {
      if (slot.querySelector("img.idc-me")) return;
      const img = new Image();
      img.className = "idc-me"; img.alt = ""; img.draggable = false;
      img.style.objectPosition = CFG.pos;
      img.onload = function () { slot.classList.add("has-photo"); };
      img.onerror = function () { img.remove(); };
      img.src = CFG.src;
      slot.appendChild(img);
    });
  })();

  /* ---------- EFEK KLIK LANGIT: beda untuk Dark, Light, Shinji, dan Sekai ---------- */
  (function () {
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, fx = [], raf = 0, last = 0, lastClick = 0;
    function size() { const d = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
    size(); window.addEventListener("resize", size);
    const R = function (a, b) { return a + Math.random() * (b - a); };
    const mode = function () { return root.dataset.bleach === "aizen" ? (root.dataset.kyoka === "on" ? "kyoka" : "aizen") : root.dataset.bleach === "shinji" ? (root.dataset.sekai === "on" ? "sekai" : "shinji") : (root.dataset.theme === "light" ? "light" : "dark"); };
    const pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

    function ring(x, y, r0, r1, d, col, w, add) { fx.push({ k: "ring", x: x, y: y, r0: r0, r1: r1, d: d, t: 0, col: col, w: w, add: add }); }
    function spark(x, y, sp, d, col, add, star, g, up) {
      const a = R(0, 6.2832), v = R(sp * 0.35, sp);
      fx.push({ k: "spark", x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v + (up ? -sp * 0.3 : 0), g: g || 0, d: d * R(0.7, 1.2), t: 0, s: R(2, 5), col: col, add: add, star: star, ph: R(0, 6) });
    }
    function petal(x, y, d, col, up) { fx.push({ k: "petal", x: x, y: y, vx: R(-30, 30), vy: up ? -R(30, 90) : R(20, 70), d: d * R(0.8, 1.3), t: 0, s: R(4, 8), col: col, rot: R(0, 6), vr: R(-3, 3), ph: R(0, 6) }); }

    function spawn(m, x, y) {
      if (reduce) { ring(x, y, 6, 60, 0.6, m === "light" ? "255,190,60" : "170,200,255", 2, m !== "light"); }
      else if (m === "dark") {
        ring(x, y, 4, 90, 0.8, "130,180,255", 3, true); ring(x, y, 4, 150, 1.2, "170,140,255", 1.5, true);
        for (let i = 0; i < 18; i++) spark(x, y, 170, 1.2, pick(["255,255,255", "190,215,255", "255,236,190"]), true, true, 0);
        const a = R(-1.1, -0.4), v = R(700, 900);
        fx.push({ k: "streak", x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, d: 0.7, t: 0, len: 150, add: true });
      } else if (m === "light") {
        ring(x, y, 6, 110, 0.9, "255,190,60", 3, false);
        fx.push({ k: "rays", x: x, y: y, d: 1.0, t: 0, n: 12, rot: R(0, 1) });
        for (let i = 0; i < 6; i++) fx.push({ k: "puff", x: x + R(-26, 26), y: y + R(-10, 14), vy: -R(14, 34), r: R(14, 26), d: R(1.3, 1.9), t: 0 });
        for (let i = 0; i < 10; i++) spark(x, y, 130, 1.0, pick(["255,196,60", "255,150,40", "255,255,255"]), false, true, 0);
      } else if (m === "aizen") {
        ring(x, y, 4, 110, 0.9, "157,123,255", 3, true); ring(x, y, 4, 175, 1.35, "233,230,255", 1.5, true);
        for (let i = 0; i < 9; i++) petal(x + R(-26, 26), y + R(-8, 16), 2.0, pick(["196,181,253", "233,230,255", "157,123,255"]), true);
        for (let i = 0; i < 10; i++) spark(x, y, 150, 1.1, pick(["196,181,253", "255,255,255", "126,231,255"]), true, true, 0);
      } else if (m === "kyoka") {
        ring(x, y, 4, 90, 0.9, "126,231,255", 2.5, true); ring(x, y, 4, 150, 1.2, "126,231,255", 2, true);
        fx.push({ k: "ring", x: x, y: y, r0: 4, r1: 210, d: 1.5, t: -0.25, col: "196,181,253", w: 1.5, add: true });
        fx.push({ k: "text", x: x, y: y, vy: -30, d: 1.3, t: 0, txt: "鏡" });
        for (let i = 0; i < 8; i++) spark(x, y, 120, 1.0, pick(["126,231,255", "255,255,255"]), true, false, 0);
      } else if (m === "shinji") {
        ring(x, y, 150, 6, 0.55, "246,207,69", 4, true); ring(x, y, 4, 120, 0.8, "255,79,147", 2.5, true);
        const L = R(60, 90), A = R(-0.9, -0.5);
        fx.push({ k: "slash", x1: x - Math.cos(A) * L, y1: y - Math.sin(A) * L, x2: x + Math.cos(A) * L, y2: y + Math.sin(A) * L, d: 0.5, t: 0 });
        fx.push({ k: "slash", x1: x - Math.cos(A + 1.6) * L * 0.8, y1: y - Math.sin(A + 1.6) * L * 0.8, x2: x + Math.cos(A + 1.6) * L * 0.8, y2: y + Math.sin(A + 1.6) * L * 0.8, d: 0.5, t: -0.08 });
        for (let i = 0; i < 20; i++) spark(x, y, 220, 1.0, pick(["246,207,69", "255,79,147", "255,240,190"]), true, i % 2 === 0, 120);
      } else {
        ring(x, y, 150, 8, 0.8, "233,115,156", 4, false); ring(x, y, 6, 110, 1.0, "246,190,60", 2.5, false);
        fx.push({ k: "text", x: x, y: y, vy: -34, d: 1.3, t: 0, txt: "逆" });
        for (let i = 0; i < 14; i++) petal(x + R(-30, 30), y + R(-10, 20), 1.8, pick(["255,150,185", "255,200,110", "255,225,235"]), true);
      }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }

    function star4(x, y, s) { ctx.beginPath(); ctx.moveTo(x, y - s); ctx.quadraticCurveTo(x, y, x + s, y); ctx.quadraticCurveTo(x, y, x, y + s); ctx.quadraticCurveTo(x, y, x - s, y); ctx.quadraticCurveTo(x, y, x, y - s); ctx.fill(); }
    function frame(ts) {
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      ctx.clearRect(0, 0, W, H);
      fx = fx.filter(function (e) { e.t += dt; return e.t < e.d; });
      for (const e of fx) {
        if (e.t < 0) continue;
        const u = Math.max(0, e.t / e.d), al = 1 - u;
        ctx.globalCompositeOperation = e.add ? "lighter" : "source-over";
        if (e.k === "ring") {
          const r = e.r0 + (e.r1 - e.r0) * (1 - Math.pow(1 - u, 3));
          ctx.strokeStyle = "rgba(" + e.col + "," + (al * 0.9) + ")"; ctx.lineWidth = e.w * al + 0.6;
          ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.2832); ctx.stroke();
        } else if (e.k === "spark") {
          e.vy += e.g * dt; e.vx *= 0.985; e.x += e.vx * dt; e.y += e.vy * dt;
          ctx.fillStyle = "rgba(" + e.col + "," + (al * (0.65 + 0.35 * Math.sin(e.t * 18 + e.ph))) + ")";
          if (e.star) star4(e.x, e.y, e.s * (1.6 - u * 0.8)); else { ctx.beginPath(); ctx.arc(e.x, e.y, e.s * (1 - u * 0.5), 0, 6.2832); ctx.fill(); }
        } else if (e.k === "streak") {
          e.x += e.vx * dt; e.y += e.vy * dt;
          const m = Math.hypot(e.vx, e.vy), tx = e.x - e.vx / m * e.len, ty = e.y - e.vy / m * e.len;
          const gr = ctx.createLinearGradient(tx, ty, e.x, e.y); gr.addColorStop(0, "rgba(160,200,255,0)"); gr.addColorStop(1, "rgba(255,255,255," + al + ")");
          ctx.strokeStyle = gr; ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(e.x, e.y); ctx.stroke();
        } else if (e.k === "rays") {
          ctx.strokeStyle = "rgba(255,196,60," + (al * 0.85) + ")"; ctx.lineWidth = 3 * al + 1; ctx.lineCap = "round";
          for (let i = 0; i < e.n; i++) { const a = e.rot + i / e.n * 6.2832 + u * 0.6, r1 = 24 + u * 50, r2 = r1 + 22 * al; ctx.beginPath(); ctx.moveTo(e.x + Math.cos(a) * r1, e.y + Math.sin(a) * r1); ctx.lineTo(e.x + Math.cos(a) * r2, e.y + Math.sin(a) * r2); ctx.stroke(); }
        } else if (e.k === "puff") {
          e.y += e.vy * dt; const r = e.r * (1 + u * 0.8), gr = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, r);
          gr.addColorStop(0, "rgba(255,255,255," + (al * 0.8) + ")"); gr.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.2832); ctx.fill();
        } else if (e.k === "slash") {
          const p = Math.min(1, e.t / (e.d * 0.45));
          ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
          ctx.shadowColor = "rgba(246,207,69,.9)"; ctx.shadowBlur = 14; ctx.strokeStyle = "rgba(255,236,160," + al + ")"; ctx.lineWidth = 4 * al + 1;
          ctx.beginPath(); ctx.moveTo(e.x1, e.y1); ctx.lineTo(e.x1 + (e.x2 - e.x1) * p, e.y1 + (e.y2 - e.y1) * p); ctx.stroke(); ctx.restore();
        } else if (e.k === "petal") {
          e.x += (e.vx + Math.sin(e.t * 4 + e.ph) * 24) * dt; e.y += e.vy * dt; e.rot += e.vr * dt;
          ctx.fillStyle = "rgba(" + e.col + "," + (al * 0.9) + ")"; ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.rot);
          ctx.beginPath(); ctx.ellipse(0, 0, e.s, e.s * 0.55, 0, 0, 6.2832); ctx.fill(); ctx.restore();
        } else if (e.k === "text") {
          e.y += e.vy * dt; ctx.font = "700 " + (54 + u * 26) + "px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillStyle = (e.txt === "鏡" ? "rgba(150,230,255," : "rgba(233,115,156,") + (al * 0.85) + ")"; ctx.fillText(e.txt, e.x, e.y);
        }
      }
      ctx.globalCompositeOperation = "source-over";
      raf = fx.length ? requestAnimationFrame(frame) : 0;
    }

    const SKY = ".home-section,.home-orbit,.home-content,.idcard-zone,.about-section,.about-hero";
    document.addEventListener("pointerdown", function (ev) {
      if (ev.button > 0 || root.dataset.bleach === "zaraki" || root.dataset.bleach === "ichigo" || root.dataset.bleach === "uryu" || root.dataset.bleach === "ichibe") return;
      const t = ev.target;
      if (!(t === document.documentElement || t === document.body || (t.matches && t.matches(SKY)))) return;
      const now = performance.now(); if (now - lastClick < 90) return; lastClick = now;
      spawn(mode(), ev.clientX, ev.clientY);
    });
  })();

  /* ---------- ZARAKI: goresan (Nozarashi) · ledakan (Bankai) · kartu TERPOTONG (keduanya) ---------- */
  (function zarakiClicks() {
    const root = document.documentElement;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CARD = ".contact-card,.gh-card,.folder-card,.portfolio-item,.timeline-item,.wibu-card,.bio-stat,.idcard,.gh-panel";
    const SKIP = "#bleachStage,#bleachSecret,#eggToast";
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:61";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, marks = [], fx = [], raf = 0, last = 0, lastClick = 0;
    const R = (a, b) => a + Math.random() * (b - a);
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const on = () => root.dataset.bleach === "zaraki";
    const bankai = () => root.dataset.zbankai === "on";
    function size() { const d = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
    size(); addEventListener("resize", size);
    function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }

    function spark(x, y, sp, d, col, g) {
      const a = R(0, 6.2832), v = R(sp * .3, sp);
      fx.push({ k: "spark", x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * .15, g: g || 0, d: d * R(.7, 1.2), t: 0, s: R(2, 5), col });
    }

    /* bekas tebasan PEDANG: luka sayatan runcing di kedua ujung, berbekas beberapa detik */
    function scratch(x, y) {
      const sgn = Math.random() < .5 ? 1 : -1, ang = R(.3, 1.15) * sgn, len = R(250, 350), n = 14;
      const mk = (a, l, w, delay) => ({
        k: "slash", x, y, ang: a, len: l, w, t: -delay, d: 7,
        J: Array.from({ length: n + 1 }, () => R(-1.6, 1.6)),
        br: Array.from({ length: 5 }, () => ({ s: R(.2, .8), a: R(.5, 1.2) * (Math.random() < .5 ? 1 : -1), l: R(14, 34) }))
      });
      marks.push(mk(ang, len, R(7, 10), 0));
      if (Math.random() < .4) marks.push(mk(ang + R(.7, 1.1) * -sgn, len * .62, R(5, 7), .12));   // tebasan silang kedua
      const dx = Math.cos(ang), dy = Math.sin(ang);
      cutFx(x - dx * len / 2, y - dy * len / 2, x + dx * len / 2, y + dy * len / 2);
      for (let i = 0; i < 16; i++) { const s = R(-.5, .5) * len; spark(x + dx * s, y + dy * s, 200, .8, pick(["255,60,50", "255,140,60", "255,235,220"]), 240); }
      while (marks.length > 18) marks.shift();
      kick();
    }
    /* ledakan Bankai (merah, seperti mode iblis) */
    function boom(x, y) {
      fx.push({ k: "flash", x, y, d: .55, t: 0 });
      fx.push({ k: "ring", x, y, r1: 180, d: .75, t: 0, col: "255,110,50", w: 6 });
      fx.push({ k: "ring", x, y, r1: 290, d: 1.1, t: -.08, col: "224,23,46", w: 3 });
      for (let i = 0; i < 28; i++) spark(x, y, 380, 1.1, pick(["255,70,40", "255,150,50", "255,230,170", "224,23,46"]), 280);
      for (let i = 0; i < 7; i++) fx.push({ k: "smoke", x: x + R(-20, 20), y: y + R(-10, 10), vy: -R(20, 60), r: R(24, 44), d: R(1.2, 1.9), t: 0 });
      marks.push({ k: "scorch", x, y, r: R(46, 72), t: 0, d: 4.5 });
      if (marks.length > 16) marks.shift();
      kick();
    }
    function cutFx(x1, y1, x2, y2) { fx.push({ k: "cut", x1, y1, x2, y2, t: 0, d: .75 }); kick(); }

    /* kartu TERPOTONG di titik yang ditekan: dua belahan bergeser, jatuh, lalu menyatu lagi */
    function cut(el, cx, cy) {
      if (el.dataset.zcut || !el.parentNode) return false;
      const r = el.getBoundingClientRect();
      if (r.width < 36 || r.height < 36) return false;
      const ow = el.offsetWidth || r.width, oh = el.offsetHeight || r.height, bk = bankai();
      const px = (cx - r.left) * (ow / r.width), py = (cy - r.top) * (oh / r.height);
      const ang = R(-.6, .6), m = Math.tan(ang), pad = 40, yAt = x => (py + m * (x - px)).toFixed(1);
      const A = "polygon(" + (-pad) + "px " + (-pad) + "px," + (ow + pad) + "px " + (-pad) + "px," + (ow + pad) + "px " + yAt(ow + pad) + "px," + (-pad) + "px " + yAt(-pad) + "px)";
      const B = "polygon(" + (-pad) + "px " + yAt(-pad) + "px," + (ow + pad) + "px " + yAt(ow + pad) + "px," + (ow + pad) + "px " + (oh + pad) + "px," + (-pad) + "px " + (oh + pad) + "px)";
      const nx = -Math.sin(ang), ny = Math.cos(ang), tx = Math.cos(ang);
      const d = bk ? 52 : 34, rot = bk ? 8 : 5, dur = reduce ? 500 : (bk ? 1800 : 1500);

      const cl = el.cloneNode(true);
      cl.removeAttribute("id"); cl.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));
      cl.setAttribute("aria-hidden", "true");
      const fixed = getComputedStyle(el).position === "fixed";
      cl.style.cssText += ";position:" + (fixed ? "fixed" : "absolute") + ";box-sizing:border-box;margin:0;pointer-events:none;z-index:50;width:" + ow + "px;height:" + oh + "px;left:" + (fixed ? r.left : el.offsetLeft) + "px;top:" + (fixed ? r.top : el.offsetTop) + "px;";
      el.dataset.zcut = "1";
      el.parentNode.insertBefore(cl, el.nextSibling);

      const clipKeys = poly => [
        { clipPath: poly, opacity: 1, offset: 0 }, { clipPath: poly, opacity: 1, offset: .55 }, { clipPath: poly, opacity: 0, offset: .8 },
        { clipPath: "none", opacity: 0, offset: .86 }, { clipPath: "none", opacity: 1, offset: 1 }];
      const mv = (sg, k, rr, fall) => "translate(" + (nx * sg * d * k + tx * sg * 10 * k).toFixed(1) + "px," + (ny * sg * d * k + fall).toFixed(1) + "px) rotate(" + (sg * rot * rr).toFixed(1) + "deg)";
      const moveKeys = sg => reduce ? [{ transform: mv(sg, 0, 0, 0) }, { transform: mv(sg, 0, 0, 0) }] : [
        { transform: mv(sg, 0, 0, 0), offset: 0 }, { transform: mv(sg, .7, .5, 0), offset: .14, easing: "ease-out" },
        { transform: mv(sg, 1, 1, 0), offset: .55 }, { transform: mv(sg, 1.3, 1.6, 36), offset: .8, easing: "ease-in" },
        { transform: mv(sg, 0, 0, 0), offset: .86 }, { transform: mv(sg, 0, 0, 0), offset: 1 }];
      const run = (target, poly, sg) => {
        const a = target.animate(clipKeys(poly), { duration: dur, easing: "linear" });
        try { target.animate(moveKeys(sg), { duration: dur, composite: "add", easing: "linear" }); } catch (_) {}
        return a;
      };
      run(el, A, -1);
      const aB = run(cl, B, 1);
      const done = () => { cl.remove(); delete el.dataset.zcut; };
      aB.onfinish = done; aB.oncancel = done;

      // garis tebasan merah-putih sepanjang potongan
      const dir = Math.random() < .5 ? 1 : -1, xa = r.left - 14, xb = r.right + 14;
      const ya = cy + m * (xa - cx), yb = cy + m * (xb - cx);
      if (dir > 0) cutFx(xa, ya, xb, yb); else cutFx(xb, yb, xa, ya);
      for (let i = 0; i < 10; i++) { const xx = R(xa, xb); spark(xx, cy + m * (xx - cx), 150, .8, pick(["255,60,50", "255,235,220"]), 220); }
      if (bk) boom(cx, cy);
      return true;
    }

    function drawMark(m) {
      const al = Math.min(1, (m.d - m.t) / 1.6);
      if (m.k === "scorch") {
        const g = ctx.createRadialGradient(m.x, m.y, 2, m.x, m.y, m.r);
        g.addColorStop(0, "rgba(10,2,2," + (.75 * al) + ")"); g.addColorStop(.6, "rgba(60,8,8," + (.4 * al) + ")"); g.addColorStop(1, "rgba(60,8,8,0)");
        ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = "rgba(255,70,40," + (.5 * al) + ")"; ctx.lineWidth = 1.4;
        for (let i = 0; i < 7; i++) { const a = i * .9 + m.x; ctx.beginPath(); ctx.moveTo(m.x + Math.cos(a) * 10, m.y + Math.sin(a) * 10); ctx.lineTo(m.x + Math.cos(a + .2) * m.r * .8, m.y + Math.sin(a + .2) * m.r * .8); ctx.stroke(); }
        return;
      }
      if (m.t < 0) return;
      const p = Math.min(1, m.t / .14), half = m.len / 2, n = m.J.length - 1, L = m.len * p;
      ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.ang); ctx.lineJoin = "round"; ctx.lineCap = "round";
      const up = [], dn = [];
      for (let i = 0; i <= n; i++) {
        const s = i / n; if (s * m.len > L) break;
        const w = m.w * Math.pow(Math.sin(Math.PI * s), .8), px = -half + m.len * s;
        up.push([px, -w + m.J[i]]); dn.push([px, w * .8 + m.J[i] * .6]);
      }
      if (up.length > 1) {
        const path = () => { ctx.beginPath(); ctx.moveTo(up[0][0], up[0][1]); for (const q of up) ctx.lineTo(q[0], q[1]); for (let i = dn.length - 1; i >= 0; i--) ctx.lineTo(dn[i][0], dn[i][1]); ctx.closePath(); };
        ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(255,40,40," + (.45 * al) + ")"; ctx.lineWidth = 7; path(); ctx.stroke();
        ctx.globalCompositeOperation = "source-over";
        const g = ctx.createLinearGradient(0, -m.w, 0, m.w);
        g.addColorStop(0, "rgba(20,2,4," + al + ")"); g.addColorStop(.5, "rgba(150,8,20," + (.9 * al) + ")"); g.addColorStop(1, "rgba(15,2,3," + al + ")");
        ctx.fillStyle = g; path(); ctx.fill();
        ctx.strokeStyle = "rgba(255,240,230," + (.8 * al) + ")"; ctx.lineWidth = 1.2; ctx.beginPath(); up.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
        ctx.strokeStyle = "rgba(255,90,70," + (.55 * al) + ")"; ctx.lineWidth = 1; ctx.beginPath(); dn.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
        // retakan halus yang memancar dari luka
        ctx.strokeStyle = "rgba(255,70,50," + (.4 * al) + ")"; ctx.lineWidth = .9;
        for (const b of m.br) {
          const s = b.s; if (s * m.len > L) continue;
          const bx = -half + m.len * s, by = (b.a > 0 ? dn : up)[Math.round(s * n)] ? (b.a > 0 ? dn : up)[Math.round(s * n)][1] : 0;
          ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(b.a) * b.l * .5, by + Math.sin(b.a) * b.l); ctx.stroke();
        }
      }
      ctx.restore();
    }
    function drawFx(e) {
      const u = Math.max(0, e.t / e.d), al = 1 - u;
      if (e.k === "ring") {
        ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle = "rgba(" + e.col + "," + (al * .9) + ")"; ctx.lineWidth = e.w * al + .6;
        ctx.beginPath(); ctx.arc(e.x, e.y, 6 + (e.r1 - 6) * (1 - Math.pow(1 - u, 3)), 0, 6.2832); ctx.stroke();
      } else if (e.k === "spark") {
        e.vy += e.g * .016; e.x += e.vx * .016; e.y += e.vy * .016; e.vx *= .985;
        ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = "rgba(" + e.col + "," + al + ")";
        ctx.beginPath(); ctx.arc(e.x, e.y, e.s * (1 - u * .5), 0, 6.2832); ctx.fill();
      } else if (e.k === "flash") {
        const r = 40 + u * 120, g = ctx.createRadialGradient(e.x, e.y, 1, e.x, e.y, r);
        g.addColorStop(0, "rgba(255,255,255," + al + ")"); g.addColorStop(.3, "rgba(255,170,60," + (al * .8) + ")"); g.addColorStop(1, "rgba(224,23,46,0)");
        ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.2832); ctx.fill();
      } else if (e.k === "smoke") {
        e.y += e.vy * .016; const r = e.r * (1 + u), g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, r);
        g.addColorStop(0, "rgba(40,8,8," + (al * .55) + ")"); g.addColorStop(1, "rgba(40,8,8,0)");
        ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, 6.2832); ctx.fill();
      } else if (e.k === "cut") {
        const p = Math.min(1, e.t / .1), ex = e.x1 + (e.x2 - e.x1) * p, ey = e.y1 + (e.y2 - e.y1) * p;
        ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(255,30,40," + (al * .85) + ")"; ctx.lineWidth = 14 * al + 2; ctx.beginPath(); ctx.moveTo(e.x1, e.y1); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255," + al + ")"; ctx.lineWidth = 3 * al + 1; ctx.beginPath(); ctx.moveTo(e.x1, e.y1); ctx.lineTo(ex, ey); ctx.stroke();
      }
    }
    function frame(ts) {
      const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts;
      ctx.clearRect(0, 0, W, H);
      marks = marks.filter(m => (m.t += dt) < m.d);
      fx = fx.filter(e => (e.t += dt) < e.d);
      for (const m of marks) drawMark(m);
      for (const e of fx) if (e.t >= 0) drawFx(e);
      ctx.globalCompositeOperation = "source-over";
      raf = (marks.length || fx.length) ? requestAnimationFrame(frame) : 0;
    }

    addEventListener("scroll", () => { for (const m of marks) m.t = Math.max(m.t, m.d - .4); }, { passive: true });
    new MutationObserver(() => { if (!on()) { marks = []; fx = []; } }).observe(root, { attributes: true, attributeFilter: ["data-bleach"] });
    document.addEventListener("pointerdown", ev => {
      if (!on() || ev.button > 0) return;
      const t = ev.target;
      if (!t || !t.closest || t.closest(SKIP)) return;
      const now = performance.now(); if (now - lastClick < 120) return; lastClick = now;
      const card = t.closest(CARD);
      if (card && cut(card, ev.clientX, ev.clientY)) return;
      if (bankai()) boom(ev.clientX, ev.clientY); else scratch(ev.clientX, ev.clientY);
    }, true);
  })();

  /* ---------- LATAR ZARAKI: reiatsu merah, bara, kilatan pedang, api (Bankai) ---------- */
  (function zarakiBackdrop() {
    const host = document.querySelector(".background-pattern");
    if (!host) return;
    const root = document.documentElement;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas");
    cv.id = "zakCanvas"; cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;z-index:1;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease";
    host.appendChild(cv);
    const cx = cv.getContext("2d");
    const R = (a, b) => a + Math.random() * (b - a);
    const pick = a => a[Math.floor(Math.random() * a.length)];
    const bk = () => root.dataset.zbankai === "on";
    const on = () => root.dataset.bleach === "zaraki" && !document.hidden;
    const COL = ["255,90,40", "255,150,50", "255,60,50", "255,225,180"];
    let W = 0, H = 0, raf = 0, last = 0, t = 0, nextStreak = 1.2, nextWave = 0;
    let embers = [], smoke = [], streaks = [], waves = [];

    function size() {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
      smoke = Array.from({ length: 9 }, () => ({ x: R(0, W), y: R(H * .3, H * 1.1), r: R(140, 300), vy: -R(6, 16), ph: R(0, 6.28) }));
    }
    const ember = init => ({ x: R(0, W), y: init ? R(0, H) : H + 12, r: R(1.2, 3.8), vy: -R(20, 72), sw: R(.5, 2), ph: R(0, 6.28), c: pick(COL) });

    function kanji(B) {
      const s = Math.min(W, H) * (B ? .62 : .78), a = (B ? .07 : .045) + .02 * Math.sin(t * 1.3);
      cx.save(); cx.globalCompositeOperation = "source-over";
      cx.font = "800 " + s + "px serif"; cx.textAlign = "center"; cx.textBaseline = "middle";
      cx.fillStyle = "rgba(255,60,50," + a + ")";
      cx.fillText(B ? "卍解" : "剣八", W * .3 + (B ? R(-2, 2) : 0), H * .56 + (B ? R(-2, 2) : 0));
      cx.restore();
    }
    function flames(k) {
      const step = 26, n = Math.ceil(W / step) + 1;
      cx.globalCompositeOperation = "lighter";
      for (let i = 0; i < n; i++) {
        const x = i * step, ph = i * .9;
        const h = (60 + 70 * Math.abs(Math.sin(t * 2.3 + ph)) + 45 * Math.pow(Math.sin(t * 5.1 + ph * 1.7), 2)) * k, sx = Math.sin(t * 3 + ph) * 9;
        const g = cx.createLinearGradient(0, H, 0, H - h);
        g.addColorStop(0, "rgba(255,170,50,.55)"); g.addColorStop(.45, "rgba(255,60,30,.38)"); g.addColorStop(1, "rgba(224,23,46,0)");
        cx.fillStyle = g; cx.beginPath(); cx.moveTo(x - 20, H);
        cx.quadraticCurveTo(x - 8 + sx * .4, H - h * .55, x + sx, H - h); cx.quadraticCurveTo(x + 8 + sx * .4, H - h * .5, x + 20, H); cx.fill();
      }
    }
    function frame(ts) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; t += dt;
      draw(dt);
    }
    function draw(dt) {
      const B = bk(), sp = B ? 1.9 : 1;
      cx.globalCompositeOperation = "source-over"; cx.clearRect(0, 0, W, H);
      // asap gelap
      for (const s of smoke) {
        s.y += s.vy * dt * sp; s.x += Math.sin(t * .3 + s.ph) * 6 * dt; if (s.y < -s.r) { s.y = H + s.r; s.x = R(0, W); }
        const g = cx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, "rgba(80,8,12," + (B ? .3 : .22) + ")"); g.addColorStop(1, "rgba(80,8,12,0)");
        cx.fillStyle = g; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.2832); cx.fill();
      }
      kanji(B);
      // gelombang reiatsu dari titik tekanan
      nextWave -= dt;
      if (nextWave <= 0) { waves.push({ r: 20, a: B ? .55 : .38 }); nextWave = B ? R(.7, 1.3) : R(2, 3.2); }
      cx.globalCompositeOperation = "lighter";
      const ox = W * .78, oy = H * .3, lim = Math.hypot(W, H) * .9;
      waves = waves.filter(w => { w.r += (B ? 300 : 170) * dt; w.a *= (1 - dt * (B ? .9 : .7)); return w.r < lim && w.a > .01; });
      for (const w of waves) {
        cx.strokeStyle = "rgba(255,50,50," + w.a + ")"; cx.lineWidth = 3 + w.r * .01; cx.beginPath(); cx.arc(ox, oy, w.r, 0, 6.2832); cx.stroke();
        cx.strokeStyle = "rgba(255,170,90," + (w.a * .5) + ")"; cx.lineWidth = 1; cx.beginPath(); cx.arc(ox, oy, w.r * .93, 0, 6.2832); cx.stroke();
      }
      // kilatan tebasan pedang melintas di latar
      nextStreak -= dt;
      if (nextStreak <= 0) {
        const a = R(.35, .95) * (Math.random() < .5 ? 1 : -1), mx = R(.2, .8) * W, my = R(.15, .7) * H, L = Math.max(W, H) * .8;
        streaks.push({ x1: mx - Math.cos(a) * L, y1: my - Math.sin(a) * L, x2: mx + Math.cos(a) * L, y2: my + Math.sin(a) * L, t: 0, d: B ? .6 : .8 });
        nextStreak = B ? R(.8, 1.8) : R(2.2, 4.5);
      }
      streaks = streaks.filter(s => (s.t += dt) < s.d);
      cx.lineCap = "round";
      for (const s of streaks) {
        const u = s.t / s.d, p = Math.min(1, s.t / .14), al = 1 - u;
        const ex = s.x1 + (s.x2 - s.x1) * p, ey = s.y1 + (s.y2 - s.y1) * p;
        const g = cx.createLinearGradient(s.x1, s.y1, s.x2, s.y2);
        g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(.5, "rgba(255,255,255," + al + ")"); g.addColorStop(1, "rgba(255,255,255,0)");
        cx.strokeStyle = "rgba(255,40,40," + (al * .35) + ")"; cx.lineWidth = 16 * al + 3; cx.beginPath(); cx.moveTo(s.x1, s.y1); cx.lineTo(ex, ey); cx.stroke();
        cx.strokeStyle = g; cx.lineWidth = 3 * al + 1; cx.beginPath(); cx.moveTo(s.x1, s.y1); cx.lineTo(ex, ey); cx.stroke();
      }
      // api / bara di dasar layar (Nozarashi: redup, Bankai: berkobar)
      flames(B ? 1 : .3);
      // bara beterbangan
      const want = B ? 150 : 80;
      while (embers.length < want) embers.push(ember(true));
      if (embers.length > want) embers.length = want;
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy * dt * sp; e.x += Math.sin(t * e.sw + e.ph) * 16 * dt * sp;
        if (e.y < -10) { embers[i] = ember(false); continue; }
        const a = .45 + .55 * Math.abs(Math.sin(t * 3 + e.ph));
        cx.fillStyle = "rgba(" + e.c + "," + (a * .22) + ")"; cx.beginPath(); cx.arc(e.x, e.y, e.r * 3.2, 0, 6.2832); cx.fill();
        cx.fillStyle = "rgba(" + e.c + "," + a + ")"; cx.beginPath(); cx.arc(e.x, e.y, e.r, 0, 6.2832); cx.fill();
      }
      cx.globalCompositeOperation = "source-over";
    }
    function sync() {
      if (on()) {
        cv.style.opacity = "1";
        if (!raf) { size(); last = performance.now(); if (reduce) draw(0); else raf = requestAnimationFrame(frame); }
      } else {
        cv.style.opacity = "0";
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        setTimeout(() => { if (!on()) cx.clearRect(0, 0, W, H); }, 1700);
      }
    }
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-zbankai"] });
    document.addEventListener("visibilitychange", sync);
    addEventListener("resize", () => { if (raf) size(); });
    sync();
  })();

  /* ---------- PEMBARUAN 36: LATAR QUINCY (Uryū) - reishi, salib Quincy berputar, panah cahaya; Letzt Stil = sayap & bulu ---------- */
  (function quincyBackdrop() {
    const host = document.querySelector(".background-pattern");
    if (!host) return;
    const root = document.documentElement;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas");
    cv.id = "qnCanvas"; cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;z-index:1;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease";
    host.appendChild(cv);
    const cx = cv.getContext("2d");
    const R = (a, b) => a + Math.random() * (b - a);
    const TAU = 6.2832;
    const on = () => root.dataset.bleach === "uryu" && !document.hidden;
    const LZ = () => root.dataset.uletzt === "on";
    let W = 0, H = 0, raf = 0, last = 0, t = 0, nextArrow = 1.2;
    let motes = [], feathers = [], arrows = [];
    const mote = init => ({ x: R(0, W), y: init ? R(0, H) : H + 10, r: R(1, 3.2), vy: -R(14, 46), sw: R(.4, 1.6), ph: R(0, TAU), cross: Math.random() < .16 });
    const feather = init => ({ x: R(0, W), y: init ? R(0, H) : -20, l: R(10, 20), vy: R(18, 44), sw: R(.4, 1.1), ph: R(0, TAU), rot: R(0, TAU), vr: R(-1, 1) });
    function size() {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0);
      motes = Array.from({ length: Math.round(Math.min(150, W * H / 9000)) }, () => mote(true));
      feathers = Array.from({ length: 34 }, () => feather(true));
    }
    /* salib Quincy (Sprenger) digambar garis */
    function cross(x, y, r, a, rot) {
      cx.save(); cx.translate(x, y); cx.rotate(rot); cx.strokeStyle = "rgba(160,225,255," + a + ")"; cx.lineCap = "butt";
      cx.lineWidth = Math.max(1.5, r * .018); cx.beginPath(); cx.arc(0, 0, r, 0, TAU); cx.stroke();
      cx.lineWidth = Math.max(1, r * .008); cx.beginPath(); cx.arc(0, 0, r * .89, 0, TAU); cx.stroke();
      cx.lineWidth = r * .05; cx.beginPath(); cx.moveTo(0, -r * .76); cx.lineTo(0, r * .76); cx.moveTo(-r * .76, 0); cx.lineTo(r * .76, 0); cx.stroke();
      cx.lineWidth = r * .028; cx.beginPath();
      [[0, -1], [0, 1], [1, 0], [-1, 0]].forEach(d => { const px = d[0] * r * .76, py = d[1] * r * .76; cx.moveTo(px + d[1] * r * .09, py + d[0] * r * .09); cx.lineTo(px - d[1] * r * .09, py - d[0] * r * .09); });
      cx.stroke();
      cx.lineWidth = Math.max(1, r * .008); cx.beginPath(); cx.moveTo(-r * .56, -r * .56); cx.lineTo(r * .56, r * .56); cx.moveTo(-r * .56, r * .56); cx.lineTo(r * .56, -r * .56); cx.stroke();
      cx.restore();
    }
    function smallCross(x, y, r, a, c) {
      cx.strokeStyle = "rgba(" + c + "," + a + ")"; cx.lineWidth = 1.2; cx.beginPath();
      cx.moveTo(x - r * 2, y); cx.lineTo(x + r * 2, y); cx.moveTo(x, y - r * 2); cx.lineTo(x, y + r * 2); cx.stroke();
    }
    function draw(dt) {
      const Lz = LZ(), sp = Lz ? 1.5 : 1;
      cx.globalCompositeOperation = "source-over"; cx.clearRect(0, 0, W, H);
      cx.globalCompositeOperation = "lighter";
      // berkas cahaya turun dari atas (Letzt Stil)
      if (Lz) {
        for (let i = 0; i < 6; i++) {
          const bx = W * (.12 + i * .16) + Math.sin(t * .25 + i) * 40, a = .05 + .035 * Math.sin(t * .8 + i * 1.7);
          const g = cx.createLinearGradient(bx, 0, bx - 90, H);
          g.addColorStop(0, "rgba(210,245,255," + a + ")"); g.addColorStop(1, "rgba(210,245,255,0)");
          cx.fillStyle = g; cx.beginPath(); cx.moveTo(bx - 26, 0); cx.lineTo(bx + 26, 0); cx.lineTo(bx - 90 + 120, H); cx.lineTo(bx - 90 - 60, H); cx.closePath(); cx.fill();
        }
      }
      // salib Quincy besar berputar pelan
      const base = Math.min(W, H) * (Lz ? .4 : .34), pulse = .5 + .5 * Math.sin(t * 1.1);
      cross(W * .78, H * .34, base, (Lz ? .14 : .085) + .03 * pulse, t * (Lz ? .12 : .07));
      if (Lz) cross(W * .78, H * .34, base * 1.28, .06, -t * .08);
      // reishi: titik cahaya naik pelan
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y += m.vy * dt * sp; m.x += Math.sin(t * m.sw + m.ph) * 14 * dt;
        if (m.y < -10) { motes[i] = mote(false); continue; }
        const a = .35 + .65 * Math.abs(Math.sin(t * 2.2 + m.ph));
        if (m.cross) { smallCross(m.x, m.y, m.r + 1, a * .7, Lz ? "255,255,255" : "160,225,255"); continue; }
        cx.fillStyle = "rgba(" + (Lz ? "235,250,255" : "127,220,255") + "," + (a * .2) + ")"; cx.beginPath(); cx.arc(m.x, m.y, m.r * 3.4, 0, TAU); cx.fill();
        cx.fillStyle = "rgba(" + (Lz ? "255,255,255" : "200,240,255") + "," + a + ")"; cx.beginPath(); cx.arc(m.x, m.y, m.r, 0, TAU); cx.fill();
      }
      // bulu sayap berjatuhan (Letzt Stil)
      if (Lz) {
        for (let i = 0; i < feathers.length; i++) {
          const f = feathers[i];
          f.y += f.vy * dt; f.x += Math.sin(t * f.sw + f.ph) * 22 * dt; f.rot += f.vr * dt;
          if (f.y > H + 24) { feathers[i] = feather(false); continue; }
          cx.save(); cx.translate(f.x, f.y); cx.rotate(f.rot);
          const g = cx.createLinearGradient(0, -f.l, 0, f.l); g.addColorStop(0, "rgba(255,255,255,.75)"); g.addColorStop(1, "rgba(127,220,255,.1)");
          cx.fillStyle = g; cx.beginPath(); cx.moveTo(0, -f.l); cx.quadraticCurveTo(f.l * .45, 0, 0, f.l); cx.quadraticCurveTo(-f.l * .45, 0, 0, -f.l); cx.fill(); cx.restore();
        }
      }
      // panah cahaya (Heilig Pfeil) melintas di latar
      nextArrow -= dt;
      if (nextArrow <= 0) {
        const a = R(-.5, .35) + (Math.random() < .5 ? 0 : Math.PI), my = R(.12, .8) * H, mx = R(.15, .85) * W, Ln = Math.max(W, H) * .75;
        arrows.push({ x1: mx - Math.cos(a) * Ln, y1: my - Math.sin(a) * Ln, x2: mx + Math.cos(a) * Ln, y2: my + Math.sin(a) * Ln, t: 0, d: Lz ? .55 : .75 });
        nextArrow = Lz ? R(.7, 1.6) : R(2.4, 4.6);
      }
      arrows = arrows.filter(s => (s.t += dt) < s.d);
      cx.lineCap = "round";
      for (const s of arrows) {
        const u = s.t / s.d, p = Math.min(1, s.t / .16), tail = Math.max(0, p - .3 - u * .3);
        const hx = s.x1 + (s.x2 - s.x1) * p, hy = s.y1 + (s.y2 - s.y1) * p, tx = s.x1 + (s.x2 - s.x1) * tail, ty = s.y1 + (s.y2 - s.y1) * tail, al = 1 - u * u;
        const g = cx.createLinearGradient(tx, ty, hx, hy); g.addColorStop(0, "rgba(127,220,255,0)"); g.addColorStop(1, "rgba(255,255,255," + al + ")");
        cx.strokeStyle = "rgba(90,190,255," + (al * .35) + ")"; cx.lineWidth = 12 * al + 2; cx.beginPath(); cx.moveTo(tx, ty); cx.lineTo(hx, hy); cx.stroke();
        cx.strokeStyle = g; cx.lineWidth = 2.6 * al + .8; cx.beginPath(); cx.moveTo(tx, ty); cx.lineTo(hx, hy); cx.stroke();
        cx.fillStyle = "rgba(255,255,255," + al + ")"; cx.beginPath(); cx.arc(hx, hy, 3.2 * al + 1, 0, TAU); cx.fill();
      }
      cx.globalCompositeOperation = "source-over";
    }
    function frame(ts) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; t += dt; draw(dt);
    }
    function sync() {
      if (on()) {
        cv.style.opacity = "1";
        if (!raf) { size(); last = performance.now(); if (reduce) draw(0); else raf = requestAnimationFrame(frame); }
      } else {
        cv.style.opacity = "0";
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        setTimeout(() => { if (!on()) cx.clearRect(0, 0, W, H); }, 1700);
      }
    }
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-uletzt"] });
    document.addEventListener("visibilitychange", sync);
    addEventListener("resize", () => { if (raf) size(); });
    sync();
  })();

  /* ---------- PEMBARUAN 36: KLIK QUINCY - Biasa: panah + percikan reishi · Letzt Stil: salib Quincy + bulu cahaya ---------- */
  (function quincyClicks() {
    const root = document.documentElement;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SKIP = "a,button,input,textarea,select,label,iframe,[role=button],#bleachStage,#bleachSecret,#eggToast,.music-player,.game-launcher,.game-hub,.theme-toggle";
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:61";
    document.body.appendChild(cv);
    const ctx = cv.getContext("2d");
    const R = (a, b) => a + Math.random() * (b - a), TAU = 6.2832;
    let W = 0, H = 0, fx = [], raf = 0, last = 0, lastClick = 0;
    function size() { const d = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
    size(); addEventListener("resize", size);
    function burst(x, y, Lz) {
      const cols = Lz ? ["255,255,255", "191,243,255", "127,220,255"] : ["127,220,255", "255,255,255", "63,168,255"];
      for (let i = 0; i < (Lz ? 30 : 18); i++) { const a = R(0, TAU), v = R(70, Lz ? 300 : 240); fx.push({ k: "spark", x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, d: R(.5, 1), t: 0, s: R(1.6, 4.2), c: cols[i % 3] }); }
      fx.push({ k: "ring", x, y, r1: Lz ? 190 : 120, d: .7, t: 0, c: Lz ? "255,255,255" : "127,220,255", w: Lz ? 4 : 3 });
      if (Lz) { fx.push({ k: "ring", x, y, r1: 300, d: 1, t: -.08, c: "127,220,255", w: 2 }); fx.push({ k: "cross", x, y, r: 70, d: .9, t: 0, rot: R(-.4, .4) }); for (let i = 0; i < 8; i++) fx.push({ k: "feather", x, y, vx: R(-120, 120), vy: R(-170, -30), d: R(1, 1.8), t: 0, l: R(9, 17), rot: R(0, TAU), vr: R(-3, 3) }); }
      const a = R(-2.4, -.7), Ln = Lz ? 420 : 300;
      fx.push({ k: "arrow", x, y, a, L: Ln, d: .42, t: 0 });
      if (Lz) { fx.push({ k: "arrow", x, y, a: a + R(.5, .9), L: Ln * .8, d: .42, t: -.06 }); fx.push({ k: "arrow", x, y, a: a - R(.5, .9), L: Ln * .8, d: .42, t: -.12 }); }
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }
    function drawFx(dt) {
      ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      fx = fx.filter(f => (f.t += dt) < f.d);
      for (const f of fx) {
        if (f.t < 0) continue;
        const u = f.t / f.d, al = 1 - u;
        if (f.k === "spark") { f.x += f.vx * dt; f.y += f.vy * dt; f.vx *= .96; f.vy *= .96; ctx.fillStyle = "rgba(" + f.c + "," + al + ")"; ctx.beginPath(); ctx.arc(f.x, f.y, f.s * al + .4, 0, TAU); ctx.fill(); }
        else if (f.k === "ring") { const r = f.r1 * (1 - Math.pow(1 - u, 3)); ctx.strokeStyle = "rgba(" + f.c + "," + al * .8 + ")"; ctx.lineWidth = f.w * al + .5; ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, TAU); ctx.stroke(); }
        else if (f.k === "cross") {
          const r = f.r * (.6 + .6 * (1 - Math.pow(1 - u, 3))); ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot + u * .6); ctx.strokeStyle = "rgba(220,248,255," + al + ")"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke(); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -r * .78); ctx.lineTo(0, r * .78); ctx.moveTo(-r * .78, 0); ctx.lineTo(r * .78, 0); ctx.stroke(); ctx.restore();
        } else if (f.k === "feather") {
          f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 140 * dt; f.vx *= .985; f.rot += f.vr * dt;
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.fillStyle = "rgba(235,250,255," + al * .85 + ")";
          ctx.beginPath(); ctx.moveTo(0, -f.l); ctx.quadraticCurveTo(f.l * .45, 0, 0, f.l); ctx.quadraticCurveTo(-f.l * .45, 0, 0, -f.l); ctx.fill(); ctx.restore();
        } else if (f.k === "arrow") {
          const p = Math.min(1, f.t / .14), tail = Math.max(0, p - .5 - u * .4), dx = Math.cos(f.a), dy = Math.sin(f.a);
          const hx = f.x + dx * f.L * p, hy = f.y + dy * f.L * p, tx = f.x + dx * f.L * tail, ty = f.y + dy * f.L * tail;
          const g = ctx.createLinearGradient(tx, ty, hx, hy); g.addColorStop(0, "rgba(127,220,255,0)"); g.addColorStop(1, "rgba(255,255,255," + al + ")");
          ctx.strokeStyle = "rgba(90,190,255," + al * .35 + ")"; ctx.lineWidth = 9 * al + 2; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
          ctx.strokeStyle = g; ctx.lineWidth = 2.4 * al + .6; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    }
    function frame(ts) {
      const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; drawFx(dt);
      if (fx.length) raf = requestAnimationFrame(frame); else { raf = 0; ctx.clearRect(0, 0, W, H); }
    }
    document.addEventListener("pointerdown", ev => {
      if (root.dataset.bleach !== "uryu" || reduce) return;
      if (ev.button > 0 || (ev.target.closest && ev.target.closest(SKIP))) return;
      const now = performance.now(); if (now - lastClick < 80) return; lastClick = now;
      burst(ev.clientX, ev.clientY, root.dataset.uletzt === "on");
    });
  })();

  console.log("Portfolio Website Loaded Successfully!");
});

/* ---------- Ichigo: efek latar & klik sendiri (tiap mode berbeda, tidak meminjam karakter lain) ----------
   tensa  : abu + bara merah naik, tebasan Getsuga bergantian · klik = sabit ganda + tebasan + percikan
   hollow : api hitam-merah besar + kilat reiatsu + retakan · klik = cincin + pilar api + retakan
   chain  : API ORANYE — lidah api, bara, rantai membara berayun, rantai api menyambar layar
            · klik = ledakan api + pilar api + mata rantai membara · kursor meninggalkan jejak bara */
(function ichigoFx() {
  const root = document.documentElement, host = document.querySelector(".background-pattern");
  if (!host) return;
  const cv = document.createElement("canvas");
  cv.id = "ichigoCanvas"; cv.setAttribute("aria-hidden", "true");
  host.appendChild(cv);
  const cx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on = () => root.dataset.bleach === "ichigo" && !document.hidden;
  const mode = () => root.dataset.ichigo || "tensa";
  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = 6.2832, MAXP = 460;
  /* palet: luar / tengah / inti api */
  const FIRE = { out: "255,20,20", mid: "255,70,50", core: "255,215,205" };
  const BLOOD = { out: "240,24,47", mid: "255,96,96", core: "4,4,6" };
  const COL = { tensa: ["255,106,0", "255,255,255"], hollow: ["240,24,47", "255,200,200"], chain: ["255,40,40", "255,190,170"] };
  let W = 0, H = 0, P = [], chains = [], raf = 0, last = 0, time = 0, lastMove = 0;
  let nSlash = 1, nCrack = 1, nWhip = 4, nBolt = 2;
  function size() {
    W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    /* hanya 2 rantai tipis di tepi kiri & kanan (sebelumnya banyak) */
    chains = [0.07, 0.93].map(f => ({ x: f * W, len: rnd(0.2, 0.3), ph: rnd(0, 6.28), sp: rnd(0.4, 0.7) }));
  }
  function crackPts(x, y, L) {
    const pts = [[x, y]]; let a = rnd(0, 6.28), px = x, py = y;
    for (let i = 0; i < 7; i++) { a += rnd(-0.9, 0.9); px += Math.cos(a) * L / 7; py += Math.sin(a) * L / 7; pts.push([px, py]); }
    return pts;
  }
  function boltPts(x) {
    const pts = [[x, 0]]; let px = x, py = 0; const end = rnd(0.35, 0.8) * H;
    while (py < end) { py += rnd(24, 60); px += rnd(-34, 34); pts.push([px, py]); }
    return pts;
  }
  function ember(x, y, vx, vy, r, d, g) {
    if (P.length > MAXP) return;
    const c = COL[mode()];
    P.push({ k: "ember", x, y, vx, vy, g: g || 0, r, t: 0, d, ph: rnd(0, 6.28), c: c[0], c2: c[1] });
  }
  function spawn(dt) {
    const m = mode(); if (P.length > MAXP) return;
    if (m === "tensa") {
      if (Math.random() < dt * 34) P.push({ k: "ash", x: rnd(0, W), y: H + 8, vx: rnd(-12, 12), vy: -rnd(25, 80), r: rnd(0.8, 2.6), t: 0, d: rnd(5, 9), c: Math.random() < 0.3 ? "255,106,0" : "255,255,255" });
      if (Math.random() < dt * 9) ember(rnd(0, W), H + 6, rnd(-20, 20), -rnd(60, 150), rnd(1, 2.4), rnd(2.4, 4.4));
      if ((nSlash -= dt) < 0) {
        const x = rnd(0.1 * W, 0.9 * W), y = rnd(0.1 * H, 0.7 * H), a = rnd(-0.62, -0.38);
        P.push({ k: "slash", x, y, a, L: rnd(0.3 * W, 0.6 * W), t: 0, d: 0.75 });
        if (Math.random() < 0.5) P.push({ k: "slash", x: x + rnd(-60, 60), y: y + rnd(30, 90), a: a + rnd(-0.1, 0.1), L: rnd(0.25 * W, 0.5 * W), t: -0.12, d: 0.7 });
        nSlash = rnd(1.3, 3);
      }
    } else if (m === "hollow") {
      if (Math.random() < dt * 14) P.push({ k: "flame", pal: BLOOD, x: rnd(0, W), by: H, h: rnd(90, 260), w: rnd(18, 44), t: 0, d: rnd(1.2, 2.1) });
      if (Math.random() < dt * 14) ember(rnd(0, W), H + 6, rnd(-25, 25), -rnd(70, 170), rnd(1, 2.6), rnd(2.2, 4));
      if ((nCrack -= dt) < 0) { P.push({ k: "crack", pts: crackPts(rnd(0.1 * W, 0.9 * W), rnd(0.1 * H, 0.8 * H), rnd(90, 190)), t: 0, d: 1.2 }); nCrack = rnd(1, 2.4); }
      if ((nSlash -= dt) < 0) { P.push({ k: "slash", x: rnd(0.05 * W, 0.8 * W), y: rnd(0.1 * H, 0.7 * H), a: rnd(-0.7, -0.25), L: rnd(0.35 * W, 0.7 * W), t: 0, d: 0.9, col: "240,24,47" }); nSlash = rnd(1.8, 3.6); }
      if ((nBolt -= dt) < 0) { P.push({ k: "bolt", pts: boltPts(rnd(0.05 * W, 0.95 * W)), t: 0, d: 0.45 }); nBolt = rnd(2.2, 4.8); }
    } else {
      if (Math.random() < dt * 7) P.push({ k: "flame", pal: FIRE, x: rnd(0, W), by: H, h: rnd(110, 300), w: rnd(22, 54), t: 0, d: rnd(1.1, 2) });
      if (Math.random() < dt * 20) ember(rnd(0, W), H + 6, rnd(-30, 30), -rnd(70, 200), rnd(1, 3), rnd(2.2, 4.4));
      if (Math.random() < dt * 1.2) P.push({ k: "spark", x: rnd(0, W), y: rnd(0, H), vx: rnd(-80, 80), vy: rnd(-80, 80), t: 0, d: 0.7 });
      if ((nWhip -= dt) < 0) {
        const dir = Math.random() < 0.5 ? 1 : -1, a = rnd(-0.28, 0.28), y0 = rnd(0.12 * H, 0.82 * H);
        P.push({ k: "whip", dir, a, y0, t: 0, d: 1.0 });
        nWhip = rnd(7, 12);
      }
    }
  }
  /* mata rantai: gagang redup + cahaya (glow) opsional */
  function link(x, y, rx, ry, rot, a, col, glow) {
    cx.beginPath(); cx.ellipse(x, y, rx, ry, rot, 0, TAU);
    if (glow) { cx.strokeStyle = "rgba(" + glow + "," + a * 0.32 + ")"; cx.lineWidth = 5.5; cx.stroke(); }
    cx.strokeStyle = "rgba(" + col + "," + a + ")"; cx.lineWidth = 1.8; cx.stroke();
  }
  /* lidah api tiga lapis: luar, tengah, inti */
  function tongue(p, k, col, a, hh, sw, by) {
    const w = p.w * k, h = hh * (0.5 + 0.5 * k);
    cx.fillStyle = "rgba(" + col + "," + a + ")"; cx.beginPath(); cx.moveTo(p.x - w / 2, by);
    cx.quadraticCurveTo(p.x - w / 3 + sw * k, by - h * 0.6, p.x + sw * k, by - h);
    cx.quadraticCurveTo(p.x + w / 3 + sw * k, by - h * 0.6, p.x + w / 2, by); cx.fill();
  }
  function draw(dt) {
    const m = mode();
    /* cahaya dasar yang berdenyut (api / reiatsu merah) */
    if (m === "chain" || m === "hollow") {
      const col = m === "chain" ? "255,30,30" : "255,30,60", a = (m === "chain" ? 0.2 : 0.16) * (0.8 + 0.2 * Math.sin(time * 5));
      const g = cx.createLinearGradient(0, H, 0, H * 0.5); g.addColorStop(0, "rgba(" + col + "," + a + ")"); g.addColorStop(1, "rgba(" + col + ",0)");
      cx.fillStyle = g; cx.fillRect(0, H * 0.5, W, H * 0.5);
    }
    if (m === "chain") {
      cx.save(); cx.globalCompositeOperation = "lighter";
      for (const c of chains) {
        const ang = 0.26 * Math.sin(time * c.sp + c.ph), n = Math.floor(c.len * H / 13), sx = Math.sin(ang), sy = Math.cos(ang);
        let tx = c.x, ty = -4;
        for (let i = 0; i < n; i++) {
          const d = i * 13 + 8, heat = 0.35 + 0.65 * (i / n);
          tx = c.x + sx * d; ty = -4 + sy * d;
          link(tx, ty, i % 2 ? 4.6 : 2, 7, -ang, 0.28 + 0.4 * heat, heat > 0.6 ? "255,170,150" : "255,110,100", "255,35,35");
        }
        /* ujung rantai membara */
        const fl = 0.7 + 0.3 * Math.sin(time * 14 + c.ph), gr = cx.createRadialGradient(tx, ty, 0, tx, ty, 26);
        gr.addColorStop(0, "rgba(255,215,205," + 0.85 * fl + ")"); gr.addColorStop(0.35, "rgba(255,50,40," + 0.5 * fl + ")"); gr.addColorStop(1, "rgba(255,0,0,0)");
        cx.fillStyle = gr; cx.beginPath(); cx.arc(tx, ty, 26, 0, TAU); cx.fill();
        if (Math.random() < dt * 5) ember(tx, ty, rnd(-30, 30), rnd(20, 90), rnd(0.8, 1.8), rnd(0.8, 1.5), 140);
      }
      cx.restore();
    }
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i]; p.t += dt;
      if (p.t < 0) continue;
      const u = p.t / p.d;
      if (u >= 1) { P.splice(i, 1); continue; }
      const al = 1 - u;
      if (p.k === "ash") { p.x += p.vx * dt; p.y += p.vy * dt; cx.fillStyle = "rgba(" + p.c + "," + (0.7 * Math.sin(u * 3.14)) + ")"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, TAU); cx.fill(); }
      else if (p.k === "slash") {
        const head = p.L * (1 - Math.pow(1 - Math.min(1, u * 2), 3)), tail = u > 0.4 ? p.L * (u - 0.4) / 0.6 : 0, cs = Math.cos(p.a), sn = Math.sin(p.a);
        cx.save(); cx.globalCompositeOperation = "lighter"; cx.lineCap = "round";
        cx.strokeStyle = "rgba(" + (p.col || "255,106,0") + "," + 0.22 * al + ")"; cx.lineWidth = 16; cx.beginPath(); cx.moveTo(p.x + cs * tail, p.y + sn * tail); cx.lineTo(p.x + cs * head, p.y + sn * head); cx.stroke();
        cx.strokeStyle = "rgba(" + (p.col || "255,106,0") + "," + 0.55 * al + ")"; cx.lineWidth = 7; cx.stroke();
        cx.strokeStyle = "rgba(255,255,255," + al + ")"; cx.lineWidth = 1.8; cx.stroke(); cx.restore();
      } else if (p.k === "flame") {
        const by = p.by == null ? H : p.by, hh = p.h * Math.sin(u * 3.1416), sw = Math.sin(p.t * 8 + p.x) * 7;
        if (p.pal === FIRE) {
          cx.save(); cx.globalCompositeOperation = "lighter";
          tongue(p, 1, FIRE.out, 0.5 * al, hh, sw, by); tongue(p, 0.66, FIRE.mid, 0.62 * al, hh, sw, by); tongue(p, 0.34, FIRE.core, 0.8 * al, hh, sw, by);
          if (by < H - 1) { const gb = cx.createRadialGradient(p.x, by, 0, p.x, by, p.w); gb.addColorStop(0, "rgba(255,210,200," + 0.75 * al + ")"); gb.addColorStop(1, "rgba(255,30,30,0)"); cx.fillStyle = gb; cx.beginPath(); cx.arc(p.x, by, p.w, 0, TAU); cx.fill(); }   // pangkal pilar api dihaluskan
          cx.restore();
        } else {
          tongue(p, 1, BLOOD.out, 0.5 * al, hh, sw, by); tongue(p, 0.5, "4,4,6", 0.82 * al, hh, sw * 0.8, by);
          if (by < H - 1) { cx.save(); cx.globalCompositeOperation = "lighter"; const gb = cx.createRadialGradient(p.x, by, 0, p.x, by, p.w); gb.addColorStop(0, "rgba(255,30,300," + 0.6 * al + ")"); gb.addColorStop(1, "rgba(240,24,47,0)"); cx.fillStyle = gb; cx.beginPath(); cx.arc(p.x, by, p.w, 0, TAU); cx.fill(); cx.restore(); }
        }
      } else if (p.k === "ember") {
        p.x += (p.vx + Math.sin(p.t * 4 + p.ph) * 14) * dt; p.y += p.vy * dt; p.vy += p.g * dt;
        if (p.y < -20) { P.splice(i, 1); continue; }
        const fl = 0.6 + 0.4 * Math.sin(p.t * 22 + p.ph);
        cx.save(); cx.globalCompositeOperation = "lighter";
        cx.fillStyle = "rgba(" + p.c + "," + 0.22 * al * fl + ")"; cx.beginPath(); cx.arc(p.x, p.y, p.r * 3.2, 0, TAU); cx.fill();
        cx.fillStyle = "rgba(" + p.c2 + "," + 0.95 * al * fl + ")"; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, TAU); cx.fill(); cx.restore();
      } else if (p.k === "crack") {
        const nseg = Math.max(1, Math.ceil(p.pts.length * Math.min(1, u * 3)));
        cx.strokeStyle = "rgba(255,255,255," + 0.55 * al + ")"; cx.lineWidth = 1.4; cx.beginPath(); cx.moveTo(p.pts[0][0], p.pts[0][1]);
        for (let q = 1; q < nseg; q++) cx.lineTo(p.pts[q][0], p.pts[q][1]); cx.stroke();
      } else if (p.k === "bolt") {
        const nseg = Math.max(2, Math.ceil(p.pts.length * Math.min(1, u * 5)));
        cx.save(); cx.globalCompositeOperation = "lighter"; cx.lineJoin = "round";
        cx.fillStyle = "rgba(255,30,60," + 0.07 * al + ")"; cx.fillRect(0, 0, W, H);
        cx.beginPath(); cx.moveTo(p.pts[0][0], p.pts[0][1]); for (let q = 1; q < nseg; q++) cx.lineTo(p.pts[q][0], p.pts[q][1]);
        cx.strokeStyle = "rgba(240,24,47," + 0.55 * al + ")"; cx.lineWidth = 9; cx.stroke();
        cx.strokeStyle = "rgba(255,255,255," + al + ")"; cx.lineWidth = 2; cx.stroke(); cx.restore();
      } else if (p.k === "spark") {
        p.x += p.vx * dt; p.y += p.vy * dt;
        cx.save(); cx.globalCompositeOperation = "lighter"; cx.strokeStyle = "rgba(255,170,150," + 0.9 * al + ")"; cx.lineWidth = 1.6; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x - p.vx * 0.06, p.y - p.vy * 0.06); cx.stroke(); cx.restore();
      } else if (p.k === "whip") {
        /* rantai api menyambar melintasi layar, meninggalkan bara di kepalanya */
        const e = 1 - Math.pow(1 - Math.min(1, u * 1.2), 3), cs = Math.cos(p.a) * p.dir, sn = Math.sin(p.a) * p.dir;
        const sx0 = p.dir > 0 ? -80 : W + 80, hx = sx0 + cs * (W + 160) * e, hy = p.y0 + sn * (W + 160) * e;
        const fade = Math.min(1, al * 3.2), n = 16;
        cx.save(); cx.globalCompositeOperation = "lighter";
        for (let q = 0; q < n; q++) {
          const wob = Math.sin(q * 0.6 + p.t * 18) * 7 * (1 - q / n), x = hx - cs * q * 17 - sn * wob, y = hy - sn * q * 17 + cs * wob;
          link(x, y, q % 2 ? 7 : 3, 10, Math.atan2(sn, cs), (1 - q / n) * fade, "255,205,195", "255,35,35");
        }
        const gr = cx.createRadialGradient(hx, hy, 0, hx, hy, 46);
        gr.addColorStop(0, "rgba(255,230,225," + fade + ")"); gr.addColorStop(0.4, "rgba(255,50,40," + 0.6 * fade + ")"); gr.addColorStop(1, "rgba(255,0,0,0)");
        cx.fillStyle = gr; cx.beginPath(); cx.arc(hx, hy, 46, 0, TAU); cx.fill(); cx.restore();
        if (Math.random() < 0.9) ember(hx, hy, rnd(-80, 80), rnd(-130, -10), rnd(1, 2.4), rnd(0.7, 1.4), 200);
      } else if (p.k === "arc") {
        const r = 170 * (1 - Math.pow(1 - u, 3));
        cx.save(); cx.globalCompositeOperation = "lighter"; cx.lineCap = "round";
        cx.strokeStyle = "rgba(" + (p.col || "255,106,0") + "," + 0.85 * al + ")"; cx.lineWidth = 14 * al + 1; cx.beginPath(); cx.arc(p.x, p.y, r, p.a - 0.95, p.a + 0.95); cx.stroke();
        cx.strokeStyle = "rgba(255,255,255," + al + ")"; cx.lineWidth = 2.2; cx.stroke(); cx.restore();
      } else if (p.k === "ring") {
        const r = (p.R || 130) * (1 - Math.pow(1 - u, 3)), c = p.col || "240,24,47";
        cx.save(); cx.globalCompositeOperation = "lighter";
        cx.strokeStyle = "rgba(" + c + "," + 0.35 * al + ")"; cx.lineWidth = 16 * al + 2; cx.beginPath(); cx.arc(p.x, p.y, r, 0, TAU); cx.stroke();
        cx.strokeStyle = "rgba(" + (p.core || c) + "," + al + ")"; cx.lineWidth = 5 * al + 1; cx.stroke(); cx.restore();
      } else if (p.k === "flare") {
        const r = 190 * (1 - Math.pow(1 - u, 2)), gr = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r + 1);
        gr.addColorStop(0, "rgba(" + p.core + "," + 0.9 * al + ")"); gr.addColorStop(0.4, "rgba(" + p.col + "," + 0.5 * al + ")"); gr.addColorStop(1, "rgba(" + p.col + ",0)");
        cx.save(); cx.globalCompositeOperation = "lighter"; cx.fillStyle = gr; cx.beginPath(); cx.arc(p.x, p.y, r + 1, 0, TAU); cx.fill(); cx.restore();
      } else if (p.k === "lk") {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 260 * dt; p.rot += p.vr * dt;
        cx.save(); cx.globalCompositeOperation = "lighter"; link(p.x, p.y, 5, 8, p.rot, al, p.col || "223,232,245", p.glow); cx.restore();
      }
    }
  }
  function fireBurst(x, y, pal, n) {
    for (let i = 0; i < n; i++) P.push({ k: "flame", pal, x: x + rnd(-42, 42), by: y, h: rnd(170, 400), w: rnd(26, 62), t: -rnd(0, 0.18), d: rnd(0.8, 1.4) });
  }
  function radial(x, y, n, sMin, sMax, g) {
    for (let i = 0; i < n; i++) { const a = rnd(0, TAU), s = rnd(sMin, sMax); ember(x, y, Math.cos(a) * s, Math.sin(a) * s - 40, rnd(1.2, 3.2), rnd(0.8, 1.7), g); }
  }
  function burst(x, y) {
    const m = mode();
    if (m === "tensa") {
      const a0 = rnd(-0.6, 0.6);
      P.push({ k: "arc", x, y, a: a0, t: 0, d: 0.55 });
      P.push({ k: "arc", x, y, a: a0 + Math.PI, t: -0.08, d: 0.6 });
      P.push({ k: "ring", x, y, t: 0, d: 0.5, R: 110, col: "255,106,0", core: "255,255,255" });
      P.push({ k: "slash", x: x - 90, y: y + 40, a: rnd(-0.62, -0.38), L: 0.45 * W, t: 0, d: 0.6 });
      radial(x, y, 20, 80, 300, 120);
    } else if (m === "hollow") {
      P.push({ k: "ring", x, y, t: 0, d: 0.65, R: 150, col: "240,24,47", core: "255,255,255" });
      P.push({ k: "ring", x, y, t: -0.12, d: 0.6, R: 100, col: "240,24,47" });
      for (let i = 0; i < 6; i++) P.push({ k: "crack", pts: crackPts(x, y, rnd(60, 160)), t: 0, d: 0.9 });
      fireBurst(x, y, BLOOD, 7);
      radial(x, y, 24, 80, 320, 140);
    } else {
      P.push({ k: "flare", x, y, t: 0, d: 0.5, col: "255,40,40", core: "255,230,225" });
      P.push({ k: "ring", x, y, t: 0, d: 0.7, R: 180, col: "255,40,40", core: "255,215,205" });
      P.push({ k: "ring", x, y, t: -0.14, d: 0.65, R: 120, col: "255,20,20", core: "255,170,150" });
      fireBurst(x, y, FIRE, 5);
      radial(x, y, 22, 100, 380, 200);
      for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU + rnd(-0.2, 0.2), s = rnd(140, 300); P.push({ k: "lk", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 90, rot: rnd(0, 3), vr: rnd(-7, 7), t: 0, d: 1.0, col: "255,205,195", glow: "255,35,35" }); }
      for (let i = 0; i < 8; i++) P.push({ k: "spark", x, y, vx: rnd(-260, 260), vy: rnd(-260, 120), t: 0, d: 0.6 });
    }
  }
  function frame(t) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t; time += dt;
    cx.clearRect(0, 0, W, H); spawn(dt); draw(dt);
  }
  function sync() {
    if (on() && !reduce) { if (!raf) { size(); last = performance.now(); raf = requestAnimationFrame(frame); } }
    else { if (raf) { cancelAnimationFrame(raf); raf = 0; } P = []; setTimeout(() => { if (!raf) cx.clearRect(0, 0, W, H); }, 1300); }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-ichigo"] });
  document.addEventListener("visibilitychange", sync);
  addEventListener("resize", () => { if (raf) size(); });
  document.addEventListener("pointerdown", e => {
    if (!on() || reduce || e.button > 0) return;
    if (e.target.closest && e.target.closest("a, button, input, textarea, select, label, [role=button], .idcard, .music-menu, .bleach-secret, .bleach-stage")) return;
    burst(e.clientX, e.clientY);
  });
  /* jejak bara mengikuti kursor / jari */
  addEventListener("pointermove", e => {
    if (!on() || reduce) return;
    const now = performance.now(); if (now - lastMove < 26) return; lastMove = now;
    const n = 1;
    for (let i = 0; i < n; i++) ember(e.clientX + rnd(-6, 6), e.clientY + rnd(-6, 6), rnd(-30, 30), -rnd(30, 110), rnd(1, 2.4), rnd(0.6, 1.2));
  }, { passive: true });
  sync();
})();


/* ==========================================================================
   PEMBARUAN 25: EASTER EGG SHINJI - NOREN MEKURI (menyibak "tirai" langit, muncul Aizen)
   Hanya di mode Shinji BIASA (bukan Sekai). Alur:
   gumpalan warna-warni muncul -> diketuk (ucapan selamat) -> memanjang SEPANJANG LAYAR dekat scroll bar
   -> ditarik dari bagian mana pun: tali jadi TIRAI MELENGKUNG bercahaya, latar warna-warni campur terbuka
   -> dilepas cukup jauh: tirai terbuka jadi kubah cahaya, Aizen berdiri di dalamnya -> semuanya kembali seperti semula.
   Coba langsung: masuk mode Shinji, buka Console (F12), ketik  norenMekuri()
   ========================================================================== */
(function norenMekuri() {
  const root = document.documentElement;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CFG = {
    firstDelay: [20, 45],     // detik: jeda pertama setelah masuk mode Shinji
    nextDelay: [150, 300],    // detik: jeda munculnya lagi
    lifetime: 25,             // detik: gumpalan menghilang sendiri kalau tidak diketuk
    doneP: 0.4,               // tarik sampai sini (0-1) baru dianggap berhasil
    pull: 0.6,                // jarak tarik penuh = lebar layar x angka ini
    holdMs: 4200,             // lama Aizen tampil (ms)
    sound: true,              // false = semua bunyi easter egg ini dimatikan
    volume: 1,                // 0 - 1.5
    aizenImg: ["images/aizen-noren.png", "images/aizen-noren.webp", "images/aizen.png", "images/aizen.webp", "images/aizen.jpg", "images/aizen.gif"],
    bgImg: ["images/noren-bg.jpg", "images/noren-bg.png", "images/noren-bg.webp", "images/noren-bg.gif"],   // opsional: fotomu sendiri untuk latar. Kalau tidak ada, latar warna campur buatan kode.
    title: "Selamat! Kamu menemukan easter egg Noren Mekuri 🎉",
    sub: "Gumpalan itu kini memanjang di dekat scroll bar. Tarik ke kiri dari bagian mana saja, seperti Shinji menyibak tirai langit.",
    say: "…Sōsuke?"
  };
  const active = () => root.dataset.bleach === "shinji" && root.dataset.sekai !== "on";
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; };

  let state = "off";   // off | blob | morph | handle | drag | hold
  let blob, orb, layer, rev, mix, bgimg, img, fb, bubble, rope, card, dim, aura, puller, grad, polys = [];
  let spawnT = 0, lifeT = 0, cardT = 0, holdT = 0, nudgeT = 0, decayT = 0, raf = 0, armed = false;
  let startX = 0, lastX = 0, lastY = 0, bubbleOn = false, p = 0;
  const S = { ax: 0, ay: 0, o: 0 };   // ax,ay = ujung segitiga (tempat kursor menarik) · o = 0 segitiga, 1 terbuka miring penuh

  /* ==================== SOUND (Web Audio, tanpa file) ==================== */
  let ac = null, master = null, verb = null, nbuf = null, dsnd = null;
  function audio(create) {
    if (!CFG.sound) return null;
    if (!ac) {
      if (!create) return null;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
      const comp = ac.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
      master = ac.createGain(); master.gain.value = 0.9 * CFG.volume; master.connect(comp); comp.connect(ac.destination);
      verb = ac.createConvolver();   // gema ruangan buatan
      const L = (ac.sampleRate * 1.8) | 0, ib = ac.createBuffer(2, L, ac.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ib.getChannelData(c); for (let i = 0; i < L; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / L, 2.8); }
      verb.buffer = ib;
      const vg = ac.createGain(); vg.gain.value = 0.4; verb.connect(vg); vg.connect(master);
      nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const nd = nbuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  const dest = (n, wet) => { n.connect(master); if (wet) { const g = ac.createGain(); g.gain.value = wet; n.connect(g); g.connect(verb); } };
  function tone(type, f0, f1, t, dur, vol, wet, att) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); dest(g, wet); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(ftype, f0, f1, t, dur, vol, wet, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ftype; f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.05, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); dest(g, wet); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  /* ---------- bahan bunyi baru: pad berlapis, kilau kristal, riser, dentuman ---------- */
  const PENT = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2];   // tangga nada pentatonik: kilau selalu terdengar harmonis
  function sparkle(t, n, base, span, vol, down) {      // rentetan denting kristal naik (atau turun)
    for (let i = 0; i < n; i++) {
      const k = down ? n - 1 - i : i, oct = Math.floor(k / PENT.length), f = base * PENT[k % PENT.length] * Math.pow(2, oct);
      tone("sine", f, 0, t + (i * span) / n + rnd(0, 0.025), rnd(0.55, 1.2), vol, 0.85, 0.004);
      if (i % 2 === 0) tone("triangle", f * 2, 0, t + (i * span) / n, 0.35, vol * 0.4, 0.7, 0.004);
    }
  }
  function pad(freqs, t, dur, vol, wet, att) {         // paduan nada tebal: saw bergetar -> disaring membuka lalu menutup
    freqs.forEach(f => [-9, 0, 9].forEach(dt => {
      const o = ac.createOscillator(), lp = ac.createBiquadFilter(), g = ac.createGain();
      o.type = "sawtooth"; o.frequency.value = f; o.detune.value = dt;
      lp.type = "lowpass"; lp.Q.value = 0.8;
      lp.frequency.setValueAtTime(260, t); lp.frequency.exponentialRampToValueAtTime(2600, t + dur * 0.45); lp.frequency.exponentialRampToValueAtTime(380, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol / 3, t + (att || dur * 0.35)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(lp); lp.connect(g); dest(g, wet); o.start(t); o.stop(t + dur + 0.05);
    }));
  }
  function boom(t, vol) {                              // dentuman sinematik: sub jatuh + hantaman rendah
    tone("sine", 130, 26, t, 1.8, vol, 0.25, 0.005);
    tone("triangle", 70, 30, t, 0.9, vol * 0.5, 0.2, 0.005);
    noise("lowpass", 1100, 70, t, 1.1, vol * 0.55, 0.45);
  }
  function whoosh(t, dur, f0, f1, vol) { noise("bandpass", f0, f1, t, dur, vol, 0.55, 3); noise("highpass", f0 * 1.6, f1 * 1.6, t, dur, vol * 0.3, 0.4); }
  const sfx = {
    spawn() {   // kerlip kecil saat gumpalan muncul (hanya kalau audio sudah aktif)
      if (!ac || ac.state !== "running" || !CFG.sound) return;
      sparkle(ac.currentTime, 3, 1568, 0.3, 0.02);
    },
    pop() {     // diketuk: gelembung kaca pecah + rentetan kristal naik
      const a = audio(true); if (!a) return; const t = a.currentTime;
      tone("sine", 320, 1500, t, 0.1, 0.14, 0.2);
      noise("highpass", 7000, 11000, t, 0.25, 0.06, 0.6);
      sparkle(t + 0.05, 9, 1046.5, 0.6, 0.05);
      tone("sine", 2093, 0, t + 0.3, 1.6, 0.05, 0.9);
    },
    stretch() { // memanjang sepanjang layar: riser + paduan membengkak + kilau di ujung
      const a = audio(true); if (!a) return; const t = a.currentTime;
      whoosh(t, 0.95, 300, 5200, 0.1);
      tone("sine", 196, 1568, t, 0.95, 0.07, 0.4, 0.3);
      pad([146.83, 220, 293.66], t, 1.4, 0.07, 0.7, 0.6);
      sparkle(t + 0.55, 6, 1318.5, 0.4, 0.04);
    },
    grab() {    // tali dipegang: ketukan lembut + denting
      const a = audio(true); if (!a) return; const t = a.currentTime;
      tone("sine", 360, 110, t, 0.12, 0.12, 0.15, 0.003);
      noise("highpass", 4000, 4000, t, 0.04, 0.04, 0.3);
      tone("sine", 1568, 0, t + 0.02, 0.5, 0.035, 0.8, 0.003);
    },
    fail() {    // dilepas terlalu cepat: kilau meluncur turun + hembusan
      const a = audio(true); if (!a) return; const t = a.currentTime;
      sparkle(t, 5, 784, 0.3, 0.045, true);
      whoosh(t, 0.4, 3000, 300, 0.06);
      tone("sine", 220, 70, t + 0.05, 0.4, 0.08, 0.3);
    },
    tear() {    // langit terbuka: sobekan -> dentuman -> paduan megah + lonceng + kilau menghujan
      const a = audio(true); if (!a) return; const t = a.currentTime;
      noise("highpass", 9000, 1800, t, 0.35, 0.22, 0.3);                       // sobekan
      for (let i = 0; i < 8; i++) noise("bandpass", rnd(2500, 8000), 0, t + i * 0.035, 0.06, 0.1, 0.3, 6);   // retakan kaca
      boom(t + 0.04, 0.55);
      whoosh(t, 0.9, 400, 6500, 0.16);
      pad([73.42, 146.83, 220, 293.66, 440], t + 0.05, 4.2, 0.12, 0.8, 0.9);     // Dsus2 megah
      pad([587.33, 880], t + 0.4, 3.4, 0.045, 0.9, 0.8);
      [1174.7, 1760, 2349].forEach((f, i) => { tone("sine", f, 0, t + 0.12 + i * 0.12, 2.4, 0.07, 0.95, 0.005); tone("sine", f * 2.01, 0, t + 0.12 + i * 0.12, 1.2, 0.025, 0.95, 0.005); });
      sparkle(t + 0.3, 20, 880, 1.7, 0.05);
    },
    bubble() {  // gelembung "...Sosuke?" muncul: dua denting kaca
      const a = audio(true); if (!a) return; const t = a.currentTime;
      tone("sine", 1318.5, 0, t, 0.5, 0.07, 0.7, 0.004);
      tone("sine", 1975.5, 0, t + 0.09, 0.8, 0.06, 0.8, 0.004);
      noise("bandpass", 3200, 3200, t, 0.06, 0.03, 0.2, 3);
    },
    close() {   // langit menutup: desir terbalik, kilau turun, dentum pelan
      const a = audio(true); if (!a) return; const t = a.currentTime;
      whoosh(t, 1.0, 5500, 200, 0.12);
      sparkle(t, 10, 784, 0.8, 0.04, true);
      pad([146.83, 220], t, 1.2, 0.05, 0.7, 0.2);
      boom(t + 0.8, 0.28);
    }
  };
  // bunyi menerus saat menarik: paduan kristal bergetar yang NAIK nadanya makin jauh ditarik + desir udara
  function dragSnd(on) {
    if (on) {
      const a = audio(true); if (!a || dsnd) return;
      const mg = a.createGain(); mg.gain.value = 0;
      const trem = a.createGain(); trem.gain.value = 0.7;
      const lfo = a.createOscillator(), lg = a.createGain(); lfo.frequency.value = 5; lg.gain.value = 0.3; lfo.connect(lg); lg.connect(trem.gain);
      const lp = a.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900; lp.Q.value = 1.2;
      const o1 = a.createOscillator(), o2 = a.createOscillator(), o3 = a.createOscillator();
      o1.type = "sine"; o2.type = "triangle"; o3.type = "sine"; o1.detune.value = -7; o3.detune.value = 7;
      [o1, o2, o3].forEach(o => { o.frequency.value = 174.6; o.connect(lp); });
      lp.connect(trem); trem.connect(mg); dest(mg, 0.4);
      const s = a.createBufferSource(); s.buffer = nbuf; s.loop = true;
      const bp = a.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3; bp.frequency.value = 1200;
      const ng = a.createGain(); ng.gain.value = 0; s.connect(bp); bp.connect(ng); dest(ng, 0.3);
      s.start(0, Math.random()); o1.start(); o2.start(); o3.start(); lfo.start();
      dsnd = { s, o1, o2, o3, lfo, bp, ng, mg, lp };
    } else if (dsnd) {
      const d = dsnd, t = ac.currentTime; dsnd = null;
      d.ng.gain.setTargetAtTime(0, t, 0.05); d.mg.gain.setTargetAtTime(0, t, 0.08);
      setTimeout(() => { try { d.s.stop(); d.o1.stop(); d.o2.stop(); d.o3.stop(); d.lfo.stop(); } catch (e) {} }, 500);
    }
  }
  function dragUpd(pv, speed) {
    if (!dsnd) return; const t = ac.currentTime, f = 174.6 * Math.pow(2, pv * 2.2);
    dsnd.o1.frequency.setTargetAtTime(f, t, 0.05); dsnd.o3.frequency.setTargetAtTime(f, t, 0.05); dsnd.o2.frequency.setTargetAtTime(f / 2, t, 0.05);
    dsnd.lfo.frequency.setTargetAtTime(4 + pv * 9, t, 0.1);
    dsnd.lp.frequency.setTargetAtTime(600 + pv * 3200, t, 0.06);
    dsnd.mg.gain.setTargetAtTime(0.025 + pv * 0.11, t, 0.06);
    dsnd.bp.frequency.setTargetAtTime(1000 + pv * 4500 + speed * 1500, t, 0.04);
    dsnd.ng.gain.setTargetAtTime(0.01 + speed * 0.12, t, 0.04);
  }

  /* ==================== lapisan: tali pelangi, segitiga, latar warna campur, Aizen ==================== */
  const dims = () => layer ? { W: layer.clientWidth, H: layer.clientHeight } : { W: root.clientWidth, H: window.innerHeight };
  function loadImg(im, list, cb) {
    let i = 0;
    im.onload = () => cb(true);
    im.onerror = () => { i++; if (i < list.length) im.src = list[i]; else cb(false); };
    im.src = list[0];
  }
  function buildLayer() {
    if (layer) return;
    layer = el("div", "nm-layer"); layer.setAttribute("aria-hidden", "true");
    rev = el("div", "nm-rev no-img");
    mix = el("div", "nm-mix"); for (let i = 0; i < 6; i++) mix.appendChild(document.createElement("i"));
    aura = el("div", "nm-aura");   // di belakang Aizen: sinar berputar, lidah cahaya BIRU, cincin gelombang, butiran cahaya
    let ah = '<span class="rays"></span><span class="f f1"></span><span class="f f2"></span><span class="f f3"></span><span class="f f4"></span><span class="f f5"></span><span class="ring"></span><span class="ring r2"></span><span class="ring r3"></span>';
    for (let i = 0; i < 30; i++) ah += '<span class="mote" style="left:' + rnd(34, 98).toFixed(1) + '%;--s:' + rnd(2, 6).toFixed(1) + 'px;--d:' + rnd(4, 9).toFixed(1) + 's;--x:' + rnd(-40, 40).toFixed(0) + 'px;animation-delay:' + (-rnd(0, 9)).toFixed(1) + 's"></span>';
    aura.innerHTML = ah;
    bgimg = el("img", "nm-bgimg"); bgimg.alt = ""; bgimg.draggable = false;
    img = el("img", "nm-aizen"); img.alt = ""; img.draggable = false;
    fb = el("div", "nm-aizen-fb"); fb.innerHTML = "<b>藍染</b><small>Sōsuke Aizen</small>";
    rev.append(mix, bgimg, aura, fb, img);
    dim = el("div", "nm-dim");   // malam gelap di luar tirai (seperti referensi)
    bubble = el("div", "nm-bubble"); bubble.appendChild(el("span", "", CFG.say));
    const NS = "http://www.w3.org/2000/svg";
    rope = document.createElementNS(NS, "svg"); rope.setAttribute("class", "nm-rope");
    // urutan: halo biru lebar, sinar putih, lalu 4 garis pelangi berjalan (tali). Saat terbuka: tepi jadi putih bercahaya.
    // tali: halo biru lebar + inti DOMINAN PUTIH yang bergradasi ke biru/ungu (atas) dan cyan/pink (bawah) + kilau putih berjalan
    const defs = document.createElementNS(NS, "defs"), lg = document.createElementNS(NS, "linearGradient");
    lg.setAttribute("id", "nmRopeG"); lg.setAttribute("gradientUnits", "userSpaceOnUse"); lg.setAttribute("x1", "0"); lg.setAttribute("y1", "0"); lg.setAttribute("x2", "0"); lg.setAttribute("y2", "800");
    [[0, "#5aa0ff"], [0.1, "#a9c8ff"], [0.24, "#ffffff"], [0.76, "#ffffff"], [0.9, "#9fe8ff"], [1, "#c7a8ff"]].forEach(s => { const st = document.createElementNS(NS, "stop"); st.setAttribute("offset", s[0]); st.setAttribute("stop-color", s[1]); lg.appendChild(st); });
    defs.appendChild(lg); rope.appendChild(defs); grad = lg;
    polys = [["nm-halo", "#4f93ff"], ["nm-rim", "url(#nmRopeG)"], ["nm-core", "#ffffff"], ["nm-shine", "#ffffff"]].map(s => {
      const pl = document.createElementNS(NS, "path");
      pl.setAttribute("class", s[0]); pl.setAttribute("stroke", s[1]);
      rope.appendChild(pl); return pl;
    });
    puller = el("div", "nm-puller");   // sosok berambut panjang berjubah putih (dari belakang) yang menarik tepi tirai
    puller.innerHTML = '<svg viewBox="0 0 240 520" aria-hidden="true"><defs>' +
      '<linearGradient id="nmHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c4"/><stop offset="1" stop-color="#e3c96a"/></linearGradient>' +
      '<linearGradient id="nmRobe" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cdd8ff"/></linearGradient></defs>' +
      '<path d="M62 150 Q36 320 8 520 L196 520 Q176 340 150 160 Z" fill="url(#nmRobe)"/>' +
      '<path d="M96 330 L70 520 L118 520 Z M140 340 L150 520 L176 520 Z" fill="#aab8ee" opacity=".55"/>' +
      '<path d="M58 46 Q58 2 100 2 Q142 2 142 46 L152 322 Q132 352 112 338 Q92 356 66 326 Z" fill="url(#nmHair)"/>' +
      '<path d="M84 18 L90 330 M104 8 L106 340 M124 14 L128 332" stroke="#c9ad4c" stroke-width="2" opacity=".55" fill="none"/>' +
      '<path d="M128 150 Q176 124 226 134 L230 152 Q184 160 142 190 Z" fill="url(#nmRobe)"/>' +
      '<circle cx="230" cy="143" r="9" fill="#fff"/></svg>';
    layer.append(dim, rev, rope, puller, bubble); document.body.appendChild(layer);
    loadImg(img, CFG.aizenImg, ok => rev.classList.toggle("no-img", !ok));
    loadImg(bgimg, CFG.bgImg, ok => rev.classList.toggle("has-bg", ok));
    reset();
  }
  function reset() { if (!layer) return; const { W, H } = dims(); S.ax = W - 18; S.ay = H / 2; S.o = 0; render(); }

  // Bentuk (mengikuti referensi): tali lurus (o=0) -> ditarik jadi TIRAI MELENGKUNG (lengkung halus lewat kursor, seperti
  // tepi bola cahaya yang disibak) -> o=1: kubah terbuka lebar, Aizen berdiri di dalamnya.
  function render() {
    if (!layer) return;
    const { W, H } = dims(), xb = W - 18, o = S.o;
    const tx = lerp(xb, W * 0.58, o), bx = lerp(xb, W * 0.82, o), xr = W + 80;
    const ax = lerp(S.ax, W * 0.3, o), ay = lerp(S.ay, H * 0.4, o);
    // titik kontrol kurva kuadrat supaya lengkungan PERSIS lewat (ax, ay)
    const cx = 2 * ax - (tx + bx) / 2, cy = 2 * ay - H / 2;
    const f = n => n.toFixed(1);
    const edge = "M" + f(tx) + " 0 Q" + f(cx) + " " + f(cy) + " " + f(bx) + " " + f(H);
    p = clamp((xb - S.ax) / (W * CFG.pull), 0, 1);
    for (const pl of polys) pl.setAttribute("d", edge);
    rope.style.setProperty("--o", o.toFixed(3)); grad.setAttribute("y2", H);
    const clip = "path('" + edge + " L" + f(xr) + " " + f(H) + " L" + f(xr) + " 0 Z')";
    rev.style.clipPath = rev.style.webkitClipPath = clip;
    const vis = xb - ax > 1.5 || o > 0.01;
    rev.style.visibility = vis ? "visible" : "hidden";
    layer.classList.toggle("live", vis);
    dim.style.opacity = Math.max(p * 0.5, clamp(o * 1.1, 0, 1)).toFixed(3);
    // sosok penarik: tangannya memegang tepi tirai di (ax, ay)
    const sc = H * 0.86 / 520;
    puller.style.height = (520 * sc) + "px"; puller.style.width = (240 * sc) + "px";
    puller.style.left = (ax - 230 * sc) + "px"; puller.style.top = (ay - 143 * sc) + "px";
    puller.style.opacity = Math.max(clamp((p - 0.12) / 0.3, 0, 1), clamp(o * 2, 0, 1)).toFixed(3);
    const a = Math.max(clamp((p - 0.45) / 0.4, 0, 1) * 0.9, clamp((o - 0.25) / 0.45, 0, 1));
    img.style.opacity = fb.style.opacity = a;
    aura.style.opacity = a;
    img.style.transform = fb.style.transform = `translateX(${(1 - a) * 70}px)`;
    const on = o > 0.7;
    if (on !== bubbleOn) { bubbleOn = on; bubble.classList.toggle("on", on); if (on && state === "hold") sfx.bubble(); }
  }
  function tweenS(to, ms, done) {
    cancelAnimationFrame(raf);
    const f = { ax: S.ax, ay: S.ay, o: S.o }, t0 = performance.now();
    const step = t => {
      const k = clamp((t - t0) / ms, 0, 1), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      for (const key in to) S[key] = lerp(f[key], to[key], e);
      render();
      if (k < 1) raf = requestAnimationFrame(step); else if (done) done();
    };
    raf = requestAnimationFrame(step);
  }

  /* ==================== gumpalan ==================== */
  function place(l, t, w, h) { blob.style.left = l + "px"; blob.style.top = t + "px"; if (w) { blob.style.width = w + "px"; blob.style.height = h + "px"; } }
  function spawn() {
    if (state !== "off" || !active()) return;
    blob = el("div", "nm-blob is-float"); blob.tabIndex = 0; blob.setAttribute("role", "button");
    blob.setAttribute("aria-label", "Gumpalan warna-warni. Tekan untuk membukanya");
    orb = el("span", "nm-orb"); blob.append(orb, el("span", "nm-hint", "◀ tarik ke kiri"));
    place(rnd(0.12, 0.8) * innerWidth, rnd(0.22, 0.7) * innerHeight, 36, 36);
    document.body.appendChild(blob);
    requestAnimationFrame(() => blob && blob.classList.add("is-in"));
    state = "blob"; sfx.spawn();
    blob.addEventListener("pointerdown", onDown);
    blob.addEventListener("keydown", onKey);
    lifeT = setTimeout(() => { if (state === "blob") { cleanupBlob(true); state = "off"; schedule(CFG.nextDelay); } }, CFG.lifetime * 1000);
  }
  function cleanupBlob(fade) {
    const b = blob; blob = orb = null;
    if (!b) return;
    if (fade) { b.classList.remove("is-in"); setTimeout(() => b.remove(), 600); } else b.remove();
  }
  function cleanupLayer() { if (layer) layer.remove(); layer = rev = mix = bgimg = img = fb = bubble = rope = dim = aura = puller = grad = null; polys = []; bubbleOn = false; }
  function burst(x, y) {
    const cols = ["#ffffff", "#ff8fc0", "#7cc8ff", "#ffffff", "#ffe066", "#8dffc0", "#ffffff", "#ff6b6b"];
    for (let i = 0; i < 14; i++) {
      const d = el("i", "nm-spark"); d.style.left = x + "px"; d.style.top = y + "px"; d.style.background = cols[i % cols.length];
      document.body.appendChild(d);
      const ang = (Math.PI * 2 * i) / 14 + rnd(-0.2, 0.2), r = rnd(40, 95);
      if (!d.animate) { d.remove(); continue; }
      d.animate([
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(ang) * r}px),calc(-50% + ${Math.sin(ang) * r}px)) scale(.2)`, opacity: 0 }
      ], { duration: 650, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => d.remove();
    }
  }
  function showCard() {
    clearTimeout(cardT);
    if (!card) {
      card = el("div", "nm-card"); card.setAttribute("role", "status");
      card.innerHTML = '<span class="nm-card-orb" aria-hidden="true"></span><div><p class="nm-card-k">EASTER EGG DITEMUKAN!</p><p class="nm-card-t"></p><p class="nm-card-s"></p></div><button class="nm-card-x" type="button" aria-label="Tutup">&times;</button>';
      card.querySelector(".nm-card-t").textContent = CFG.title;
      card.querySelector(".nm-card-s").textContent = CFG.sub;
      card.querySelector(".nm-card-x").addEventListener("click", hideCard);
      document.body.appendChild(card);
    }
    void card.offsetWidth; card.classList.add("is-in");
    cardT = setTimeout(hideCard, 7000);
  }
  function hideCard() { if (card) card.classList.remove("is-in"); }

  /* ---------- ketuk: ucapan selamat, lalu memanjang sepanjang layar ---------- */
  function pop() {
    if (state !== "blob") return;
    state = "morph"; clearTimeout(lifeT);
    const r = blob.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    sfx.pop(); showCard();
    blob.classList.remove("is-float");
    setTimeout(() => {
      if (state !== "morph" || !blob) return;
      sfx.stretch();
      blob.classList.add("is-morph", "is-pill");
      place(root.clientWidth - 32, 0, 28, window.innerHeight);   // tinggi = seluruh layar, dekat scroll bar
      setTimeout(() => {
        if (state !== "morph" || !blob) return;
        buildLayer();
        const d = dims(); blob.classList.remove("is-morph"); place(d.W - 32, 0, 28, d.H);
        layer.classList.add("rope-on");
        blob.classList.add("is-handle", "nudge");
        state = "handle";
        nudgeT = setTimeout(() => blob && blob.classList.remove("nudge"), 10000);
      }, 1000);
    }, 700);
  }

  /* ---------- tarik dengan kursor / jari ---------- */
  function onDown(e) {
    if (state === "blob") { e.preventDefault(); pop(); return; }
    if (state !== "handle") return;
    e.preventDefault();
    state = "drag"; cancelAnimationFrame(raf); clearTimeout(nudgeT);
    startX = lastX = e.clientX; lastY = e.clientY;
    const { H } = dims(); S.ay = clamp(e.clientY, 30, H - 30); render();
    blob.classList.add("dragging"); blob.classList.remove("nudge");
    sfx.grab(); dragSnd(true);
    try { blob.setPointerCapture(e.pointerId); } catch (_) {}
    blob.addEventListener("pointermove", onMove);
    blob.addEventListener("pointerup", onUp);
    blob.addEventListener("pointercancel", onUp);
  }
  function onMove(e) {
    if (state !== "drag" || !layer) return;
    const { W, H } = dims(), xb = W - 18;
    S.ax = clamp(xb - (startX - e.clientX), 8, xb);
    S.ay = clamp(e.clientY, 30, H - 30);
    render();
    const sp = clamp((Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY)) / 38, 0, 1);
    lastX = e.clientX; lastY = e.clientY;
    dragUpd(p, sp);
    clearTimeout(decayT); decayT = setTimeout(() => dragUpd(p, 0), 90);
  }
  function onUp(e) {
    if (!blob) return;
    blob.removeEventListener("pointermove", onMove); blob.removeEventListener("pointerup", onUp); blob.removeEventListener("pointercancel", onUp);
    blob.classList.remove("dragging");
    try { blob.releasePointerCapture(e.pointerId); } catch (_) {}
    clearTimeout(decayT); dragSnd(false);
    if (state !== "drag") return;
    if (p >= CFG.doneP) reveal();
    else { state = "handle"; sfx.fail(); tweenS({ ax: dims().W - 18 }, 380); }   // gagal: tali memantul kembali
  }
  function onKey(e) {   // keyboard: Enter / Spasi
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (state === "blob") pop();
    else if (state === "handle") {
      state = "drag"; const { W, H } = dims(); S.ay = H / 2; sfx.grab();
      tweenS({ ax: W - 18 - W * CFG.pull * 0.6 }, 500, reveal);
    }
  }

  /* ---------- Aizen tampil, lalu semua kembali semula ---------- */
  function reveal() {
    if (!layer) return;
    state = "hold"; blob && blob.classList.add("is-hide");
    sfx.tear(); layer.classList.remove("boom"); void layer.offsetWidth; layer.classList.add("boom");
    tweenS({ o: 1 }, 800, () => { holdT = setTimeout(closeUp, CFG.holdMs); });
  }
  function closeUp() {
    if (!layer) return;
    sfx.close(); layer.classList.remove("boom");
    tweenS({ o: 0 }, 800, () => tweenS({ ax: dims().W - 18 }, 450, finish));
  }
  function finish() {
    if (!layer) { state = "off"; return; }
    layer.classList.add("is-end");
    if (blob) { blob.classList.remove("is-hide"); void blob.offsetWidth; blob.classList.add("is-gone"); }
    setTimeout(() => { cleanupLayer(); cleanupBlob(); state = "off"; hideCard(); schedule(CFG.nextDelay); }, 700);
  }

  /* ---------- jadwal & sinkron mode ---------- */
  function schedule(r) { clearTimeout(spawnT); if (REDUCE || !armed) return; spawnT = setTimeout(trySpawn, rnd(r[0], r[1]) * 1000); }
  function trySpawn() {
    if (!active()) return;
    const st = document.getElementById("bleachStage");
    if (document.hidden || root.classList.contains("bleach-morph") || (st && !st.hidden)) { spawnT = setTimeout(trySpawn, 5000); return; }
    spawn();
  }
  function cleanup() {
    clearTimeout(spawnT); clearTimeout(lifeT); clearTimeout(cardT); clearTimeout(holdT); clearTimeout(nudgeT); clearTimeout(decayT); cancelAnimationFrame(raf);
    dragSnd(false); cleanupBlob(); cleanupLayer(); if (card) { card.remove(); card = null; }
    state = "off"; p = 0;
  }
  function sync() {
    if (active()) { if (!armed) { armed = true; schedule(CFG.firstDelay); } }
    else if (armed) { armed = false; cleanup(); }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-sekai"] });
  window.addEventListener("resize", () => {
    if (!layer || !blob) return;
    if (state === "handle") { const d = dims(); place(d.W - 32, 0, 28, d.H); reset(); } else render();
  });
  window.norenMekuri = function () {
    if (!active()) { console.log("Masuk dulu ke mode Shinji (biasa, bukan Sekai), lalu ketik norenMekuri() lagi."); return; }
    armed = true; clearTimeout(spawnT);
    if (state === "off") spawn();
  };
  sync();
})();


/* ==========================================================================
   PEMBARUAN 28: ABOUT - "SKILLS & KEMAMPUAN" (sederhana, bisa dibuka-tutup)
   Disisipkan otomatis di dalam .about-section, tepat setelah blok perkenalan (foto + nama).
   Isi, urutan, dan warna ikon diatur di daftar SKILLS. Tampilan ikut mode (lihat style.css, PEMBARUAN 28).
   ========================================================================== */
(function skillsAbout() {
  const CATS = { coding: "Coding", design: "Desain & Video", office: "Office", ai: "AI" };
  // n = nama · cat = kategori · g = tulisan di ikon (atau svg: kunci di SVG) · c = [warna1, warna2] · t = warna tulisan ikon
  const SVG = {
    cut:    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="17.2" r="2.7"/><circle cx="17" cy="17.2" r="2.7"/><path d="M8.7 15.2 18 4.2M15.3 15.2 6 4.2"/></svg>',
    claude: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M12 2.8v18.4M2.8 12h18.4M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>',
    gpt:    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7l7.6 4.4v9.8L12 21.3l-7.6-4.4V7.1z"/><path d="M12 7.9l3.7 2.1v4.2M12 7.9 8.3 10v4.2M8.3 14.2 12 16.3l3.7-2.1"/></svg>'
  };
  const SKILLS = [
    { n: "HTML",       cat: "coding", g: "</>", c: ["#ff8a4c", "#e44d26"] },
    { n: "CSS",        cat: "coding", g: "{ }", c: ["#4aa3ff", "#1d63d8"] },
    { n: "JavaScript", cat: "coding", g: "JS",  c: ["#ffe45c", "#f0b800"], t: "#2a2100" },
    { n: "CorelDRAW",  cat: "design", g: "Cdr", c: ["#4fd67a", "#13923f"] },
    { n: "Photoshop",  cat: "design", g: "Ps",  c: ["#1a3a78", "#0a1b44"], t: "#6fd8ff" },
    { n: "CapCut",     cat: "design", svg: "cut", c: ["#3a3d4a", "#0d0e14"] },
    { n: "Word",       cat: "office", g: "W",   c: ["#4f8dff", "#1b4fc0"] },
    { n: "Excel",      cat: "office", g: "X",   c: ["#3fcf7c", "#0f7a3c"] },
    { n: "Claude AI",  cat: "ai",     svg: "claude", c: ["#f09a78", "#c8573a"] },
    { n: "ChatGPT",    cat: "ai",     svg: "gpt",    c: ["#2fd3a4", "#0b8a67"] }
  ];
  const ico = s => `<span class="sk-ico" style="--c1:${s.c[0]};--c2:${s.c[1]};--tc:${s.t || "#fff"}" aria-hidden="true">${s.svg ? SVG[s.svg] : `<b>${s.g}</b>`}</span>`;

  function build() {
    if (document.getElementById("skillsAbout")) return;
    const host = document.querySelector(".about-section");
    if (!host) return;
    const sec = document.createElement("section");
    sec.id = "skillsAbout"; sec.className = "sk-section is-open";
    sec.innerHTML = `
      <button type="button" class="sk-head" id="skToggle" aria-expanded="true" aria-controls="skPanel">
        <span class="sk-head-main"><span class="sk-spark" aria-hidden="true">✦</span><span class="sk-title">Skills <em>&amp;</em> Kemampuan</span><span class="sk-count">${SKILLS.length}</span></span>
        <span class="sk-peek" aria-hidden="true">${SKILLS.map(ico).join("")}</span>
        <span class="sk-chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
      </button>
      <div class="sk-panel" id="skPanel"><div class="sk-inner"><ul class="sk-grid">${SKILLS.map((s, i) => `
        <li class="sk-card" style="--i:${i}">${ico(s)}<span class="sk-name">${s.n}</span><span class="sk-cat">${CATS[s.cat]}</span></li>`).join("")}</ul></div></div>`;
    const intro = host.querySelector(".about-hero, .introduction");
    if (intro && intro.parentNode) intro.parentNode.insertBefore(sec, intro.nextSibling); else host.appendChild(sec);
    const btn = sec.querySelector("#skToggle");
    btn.addEventListener("click", () => {
      const open = !sec.classList.contains("is-open");
      sec.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", open);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();


/* ==========================================================================
   PEMBARUAN 29: SUARA KETUK LAYAR (semua mode)
   Setiap kali layar ditekan/diketuk terdengar bunyi pendek yang BEDA tiap mode:
   Gelap, Terang, Shinji, Sekai, Aizen, Kyoka, Zaraki (+Bankai), Ichigo (Bankai / Hollow / Chain).
   Semua dibuat browser (Web Audio), tanpa file. Matikan: tapSound.on = false (di Console atau ubah CFG di bawah).
   Tidak berbunyi di dalam mini game (sudah punya suara sendiri), pada gumpalan Noren Mekuri, dan pada tombol tema.
   ========================================================================== */
(function tapSound() {
  const root = document.documentElement;
  const CFG = { on: true, volume: 1, gap: 45 };   // gap = jeda minimal antar bunyi (ms)
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];
  let ac = null, master = null, verb = null, nbuf = null, last = 0;

  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC();
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    master = ac.createGain(); master.connect(comp); comp.connect(ac.destination);
    verb = ac.createConvolver();
    const L = (ac.sampleRate * 1.1) | 0, ib = ac.createBuffer(2, L, ac.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ib.getChannelData(c); for (let i = 0; i < L; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / L, 3); }
    verb.buffer = ib; const vg = ac.createGain(); vg.gain.value = 0.35; verb.connect(vg); vg.connect(master);
    nbuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const nd = nbuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  const out = (n, wet) => { n.connect(master); if (wet) { const g = ac.createGain(); g.gain.value = wet; n.connect(g); g.connect(verb); } };
  function tone(type, f0, f1, t, dur, vol, wet, att) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.004)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); out(g, wet); o.start(t); o.stop(t + dur + 0.04);
  }
  function noise(ft, f0, f1, t, dur, vol, wet, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.012, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); out(g, wet); s.start(t, Math.random()); s.stop(t + dur + 0.04);
  }
  const mode = () => {
    const b = root.dataset.bleach;
    if (b === "ichigo") return "ichigo-" + (root.dataset.ichigo || "tensa");
    if (b === "zaraki") return root.dataset.zbankai === "on" ? "zbankai" : "zaraki";
    if (b === "ichibe") return root.dataset.ibankai === "on" ? "ibankai" : "ichibe";
      if (b === "uryu") return root.dataset.uletzt === "on" ? "uletzt" : "uryu";
    if (b === "aizen") return root.dataset.kyoka === "on" ? "kyoka" : "aizen";
    if (b === "shinji") return root.dataset.sekai === "on" ? "sekai" : "shinji";
    return root.dataset.theme === "light" ? "light" : "dark";
  };
  const PENT = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
  const SND = {
    dark(t) {      // ping kaca lembut
      const f = pick(PENT) * 2; tone("sine", f, 0, t, 0.42, 0.09, 0.6); tone("sine", f * 1.5, 0, t, 0.25, 0.025, 0.5); noise("highpass", 7000, 7000, t, 0.03, 0.02);
    },
    light(t) {     // denting cerah seperti marimba
      const f = pick(PENT) * 2; tone("triangle", f, 0, t, 0.3, 0.1, 0.35); tone("sine", f * 3, 0, t, 0.12, 0.03, 0.3);
    },
    shinji(t) {    // lonceng emas berkilau
      const f = pick([1174.7, 1318.5, 1568]); tone("sine", f, 0, t, 0.7, 0.08, 0.8); tone("sine", f * 1.505, 0, t + 0.04, 0.55, 0.05, 0.8); tone("sine", f * 2.01, 0, t, 0.3, 0.02, 0.6);
    },
    sekai(t) {     // bunyi terbalik: naik lalu hilang (dunia terbalik)
      tone("sine", 260, 1500, t, 0.22, 0.09, 0.5, 0.15); tone("triangle", 520, 2400, t, 0.2, 0.03, 0.5, 0.14); tone("sine", 2000, 0, t + 0.22, 0.2, 0.04, 0.7);
    },
    aizen(t) {     // kaca tipis retak + denting ungu
      noise("bandpass", 6500, 3000, t, 0.08, 0.09, 0.4, 5); tone("triangle", 2349, 1760, t, 0.4, 0.06, 0.7); tone("sine", 1174.7, 0, t + 0.02, 0.5, 0.05, 0.8);
    },
    kyoka(t) {     // tetes air: riak berantai
      tone("sine", 1500, 380, t, 0.13, 0.12, 0.5); tone("sine", 1100, 330, t + 0.11, 0.14, 0.06, 0.6); tone("sine", 800, 300, t + 0.2, 0.16, 0.03, 0.7);
    },
    uryu(t) {      // petikan tali busur + desir panah reishi
      tone("triangle", 330, 120, t, 0.2, 0.1, 0.25, 0.003); noise("bandpass", 2200, 7500, t + 0.015, 0.2, 0.1, 0.4, 1.4); tone("sine", pick([2349, 2637, 3136]), 0, t + 0.04, 0.35, 0.05, 0.8, 0.003);
    },
    uletzt(t) {    // denting kristal cahaya berlapis
      const f = pick([1318.5, 1568, 1760]); tone("sine", f, 0, t, 0.9, 0.07, 0.9, 0.004); tone("sine", f * 1.5, 0, t + 0.035, 0.8, 0.05, 0.9, 0.004); tone("sine", f * 2, 0, t + 0.07, 0.6, 0.035, 0.9, 0.004); noise("highpass", 7000, 7000, t, 0.05, 0.03);
    },
    zaraki(t) {    // tebasan berat + dentum
      noise("bandpass", 1200, 6500, t, 0.17, 0.2, 0.15, 1.4); tone("sine", 120, 42, t + 0.02, 0.3, 0.3, 0.1); noise("lowpass", 800, 120, t + 0.02, 0.18, 0.12);
    },
    zbankai(t) {   // Bankai: lebih dalam, retak, bergema
      noise("bandpass", 900, 7000, t, 0.22, 0.22, 0.3, 1.2); tone("sine", 95, 30, t, 0.55, 0.42, 0.2); tone("sawtooth", 70, 40, t, 0.25, 0.06, 0.1);
      for (let i = 0; i < 4; i++) noise("highpass", rnd(4000, 8000), 0, t + 0.03 + i * 0.03, 0.03, 0.08, 0.3);
    },
    "ichigo-tensa"(t) {   // tebasan Getsuga: desir pedang + denting baja
      noise("bandpass", 700, 5500, t, 0.2, 0.2, 0.2, 2); tone("triangle", 2600, 2100, t + 0.1, 0.25, 0.05, 0.5); tone("sine", 140, 70, t, 0.14, 0.14, 0.1);
    },
    "ichigo-hollow"(t) {  // geraman + retakan topeng
      tone("sawtooth", 110, 52, t, 0.28, 0.1, 0.3, 0.01); noise("lowpass", 1500, 200, t, 0.18, 0.18, 0.2); noise("bandpass", 4200, 1500, t + 0.03, 0.08, 0.1, 0.3, 4); tone("sine", 70, 38, t, 0.3, 0.25, 0.1);
    },
    "ichigo-chain"(t) {   // rantai berdenting dua kali
      [0, 0.055].forEach((d, i) => { tone("sine", 3100 - i * 500, 0, t + d, 0.2, 0.07, 0.5, 0.002); tone("sine", 4650 - i * 700, 0, t + d, 0.12, 0.04, 0.4, 0.002); noise("highpass", 6000, 6000, t + d, 0.03, 0.06); });
      tone("sine", 200, 90, t, 0.12, 0.1, 0.1);
    }
  };
  function play() {
    if (!CFG.on) return;
    const now = performance.now(); if (now - last < CFG.gap) return; last = now;
    if (!init()) return;
    master.gain.value = 0.85 * CFG.volume;
    (SND[mode()] || SND.dark)(ac.currentTime + 0.005);
  }
  const blocked = el => !!(el && el.closest && el.closest('[class^="al-"],[class*=" al-"],.nm-blob,.nm-layer,.theme-toggle'));
  document.addEventListener("pointerdown", e => {
    if (e.isPrimary === false || (e.pointerType === "mouse" && e.button !== 0)) return;
    if (blocked(e.target)) return;
    play();
  }, { passive: true, capture: true });
  window.tapSound = CFG;
})();


/* =========================================================
   PEMBARUAN 31 — EASTER EGG: WHITE ICHIGO (Shirosaki)
   Alur: mode Ichigo > Hollow + lagu ke-10 "Your New Home" (musik index 9) diputar -> gerbang rahasia (topeng kecil)
         muncul di paling bawah bagian Kontak. Ditekan -> adegan "Yo, King." -> tema WHITE ICHIGO (kuning + putih).
         Tekan lagi (topeng hitam) untuk kembali ke Hollow. Lagu diganti / keluar Hollow = gerbang tersembunyi lagi.
   Mengatur: objek CFG di bawah (songIndex = urutan lagu, mulai dari 0).
   Mencoba cepat: Console -> shiroIchigo.force(true) (paksa gerbang muncul) · shiroIchigo.force(false) (kembali otomatis)
   Tampilan tema ada di style.css (blok PEMBARUAN 31, awalan html[data-shiro="on"]).
========================================================= */
(function shiroIchigo() {
  "use strict";
  const root = document.documentElement;
  const CFG = {
    songIndex: 9,            // lagu ke-10 "Your New Home" (index mulai 0)
    poll: 500,               // ms: seberapa sering syarat (Hollow + lagu) dicek
    photo: "images/white-ichigo.png", // FOTO yang tampil di animasi (taruh file ini; kosongkan "" untuk mematikan)
    congrats: "Selamat! Kamu menemukan easter egg White Ichigo",
    hint: true,              // bisikan kecil saat gerbang terbuka (hanya kalau sedang di mode Hollow)
    sound: true,             // bunyi adegan (ikut mati kalau tapSound.on = false)
    volume: 1
  };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const K = reduce ? 0.28 : 1;                        // faktor waktu adegan
  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;
  const isHollow = () => root.dataset.bleach === "ichigo" && root.dataset.ichigo === "hollow";
  const isWhite = () => root.dataset.shiro === "on";

  let forced = null, wasKey = false, busy = false, gate = null, btn = null;

  const songOn = () => !!(window.siteMusic && window.siteMusic.isSong && window.siteMusic.isSong(CFG.songIndex));
  const keyWanted = () => forced !== null ? forced : (isWhite() || (isHollow() && songOn()));
  function syncKey() {
    const on = keyWanted();
    if (on) root.dataset.shiroKey = "1"; else delete root.dataset.shiroKey;
    if (on && !wasKey && CFG.hint && isHollow() && !isWhite()) toast("<b>白</b>&nbsp; Ada yang bergerak di dasar halaman <b>Kontak</b>…");
    wasKey = on;
  }
  function syncUI() { if (btn) btn.setAttribute("aria-pressed", String(isWhite())); }
  setInterval(syncKey, CFG.poll);

  /* ---------- gambar topeng (SVG buatan kode; warna lewat CSS) ---------- */
  function maskSVG(cls) {
    return '<svg class="' + cls + '" viewBox="-4 -10 108 132" aria-hidden="true" focusable="false">' +
      '<path class="m-horn" d="M24 26 C14 20 8 10 10 -4 C18 4 26 12 34 18Z"/>' +
      '<path class="m-horn" d="M76 26 C86 20 92 10 90 -4 C82 4 74 12 66 18Z"/>' +
      '<path class="m-face" d="M50 6 C70 6 88 20 90 46 C91 66 82 88 70 102 C64 110 57 115 50 117 C43 115 36 110 30 102 C18 88 9 66 10 46 C12 20 30 6 50 6Z"/>' +
      '<path class="m-stripe" d="M50 8 L54 30 L50 60 L46 30Z"/>' +
      '<path class="m-mark" d="M18 62 C20 76 24 88 30 98"/><path class="m-mark" d="M82 62 C80 76 76 88 70 98"/>' +
      '<path class="m-eye" d="M16 44 L44 52 L40 66 C28 66 20 58 16 44Z"/><path class="m-eye" d="M84 44 L56 52 L60 66 C72 66 80 58 84 44Z"/>' +
      '<circle class="m-iris" cx="33" cy="57" r="4.5"/><circle class="m-iris" cx="67" cy="57" r="4.5"/>' +
      '<path class="m-mark" d="M47 74 L50 80 L53 74"/>' +
      '<path class="m-mark" d="M27 88 Q50 94 73 88"/>' +
      '<path class="m-teeth" d="M27 88 L32 98 L37 89 L42 99 L47 90 L50 100 L53 90 L58 99 L63 89 L68 98 L73 88"/>' +
      '<path class="m-crack" d="M70 9 L63 26 L72 37 L62 52"/></svg>';
  }

  /* ---------- gerbang rahasia di paling bawah .contact-section ---------- */
  function buildGate() {
    if (gate && gate.isConnected) return;
    const host = document.querySelector(".contact-section");
    if (!host) return;
    gate = document.createElement("div");
    gate.className = "shiro-gate";
    gate.innerHTML = '<button type="button" class="shiro-btn" aria-pressed="false" aria-label="Lepaskan topeng: panggil White Ichigo">' +
      maskSVG("shiro-mask") + '<span class="shiro-cap"><i>白</i><span class="cap-on">lepas topengnya</span><span class="cap-off">pasang kembali</span></span></button>';
    host.appendChild(gate);
    btn = gate.querySelector(".shiro-btn");
    btn.addEventListener("click", () => { if (!busy && isHollow()) runScene(!isWhite()); });
    syncUI();
  }

  /* ---------- tema: White hanya hidup bersama Hollow ---------- */
  function apply(on) {
    root.classList.add("bleach-morph");
    setTimeout(() => root.classList.remove("bleach-morph"), reduce ? 60 : 2400);
    if (on) root.dataset.shiro = "on"; else delete root.dataset.shiro;
    if (btn) btn.setAttribute("aria-label", on ? "Pasang kembali topeng: kembali ke Hollow" : "Lepaskan topeng: panggil White Ichigo");
    syncUI(); fx.sync();
  }
  new MutationObserver(() => {
    if (isWhite() && !isHollow()) { delete root.dataset.shiro; syncUI(); fx.sync(); }
  }).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-ichigo"] });

  /* ---------- bunyi (Web Audio, tanpa file) ---------- */
  let ac = null, mix = null, nbuf = null;
  function audio() {
    if (!CFG.sound || (window.tapSound && window.tapSound.on === false)) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      if (!ac) {
        ac = new AC(); mix = ac.createGain(); const comp = ac.createDynamicsCompressor();
        mix.connect(comp); comp.connect(ac.destination);
        nbuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
        const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ac.state === "suspended") ac.resume();
      mix.gain.value = 0.9 * CFG.volume;
      return ac;
    } catch (_) { return null; }
  }
  function tone(type, f0, f1, t, dur, vol, lp) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.03, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let n = o; if (lp) { const f = ac.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = lp; o.connect(f); n = f; }
    n.connect(g); g.connect(mix); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(type, f0, f1, t, dur, vol, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = type; f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(mix); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  function sfxIn(T) {           // menuju WHITE: detak jantung -> topeng -> retak -> geraman -> pecah -> lonceng
    if (!audio()) return;
    const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise("highpass", 2500, 9000, t0, 0.35, 0.14, 1.2); tone("sine", 1480, 1900, t0, 0.5, 0.05); tone("triangle", 330, 90, t0, 0.3, 0.12);   // klik topeng + desing pedang
    [0.1, 0.95, 1.8].forEach((b, i) => { const v = 0.28 + i * 0.14; tone("sine", 70, 38, s(b), 0.26 * K + 0.1, v); tone("sine", 62, 34, s(b + 0.27), 0.22 * K + 0.1, v * 0.8); });
    tone("sawtooth", 52, 58, s(T.mask), (T.flash - T.mask) * K, 0.07, 240);              // dengung rendah menaik
    noise("lowpass", 500, 160, s(T.mask), 1.6 * K, 0.07);
    [0, 0.09, 0.19, 0.31, 0.42].forEach((d, i) => {                                       // kaca retak
      noise("highpass", 5200 - i * 500, 0, s(T.crack + d), 0.07, 0.16, 1);
      tone("sine", 2800 - i * 380, 0, s(T.crack + d), 0.18, 0.04);
    });
    tone("sawtooth", 96, 58, s(T.text), 0.62 * K + 0.1, 0.13, 420);                       // "Yo, King." (geraman Hollow)
    noise("bandpass", 700, 260, s(T.text), 0.62 * K + 0.1, 0.1, 3);
    tone("square", 130, 70, s(T.glitch), 0.18, 0.05, 900);
    noise("highpass", 6000, 2500, s(T.flash - 0.02), 0.5, 0.26, 0.8);                    // pecah
    tone("sine", 64, 24, s(T.flash), 1.1, 0.55);
    noise("bandpass", 1500, 300, s(T.flash), 0.7, 0.18, 0.7);
    [880, 1318.5, 1760, 2637].forEach((f, i) => tone("sine", f, 0, s(T.apply) + i * 0.05, 2.2, 0.06 / (1 + i * 0.35)));   // lonceng putih
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => { const tt = t0 + T.reveal * K + i * 0.11; tone("triangle", f, 0, tt, 1.3, 0.09); tone("sine", f * 2, 0, tt, 1.6, 0.04); });   // fanfare selamat (arpeggio emas)
    tone("sine", 98, 49, t0 + T.reveal * K, 1.2, 0.3); noise("highpass", 7000, 3000, t0 + T.reveal * K + 0.5, 1.4, 0.05, 0.8);          // dentum + kilau
  }
  function sfxOut() {           // kembali ke Hollow: tinta menyapu, nada turun
    if (!audio()) return;
    const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise("lowpass", 2400, 120, s(0.1), 1.2 * K + 0.1, 0.2); tone("sine", 220, 46, s(0.1), 1.3 * K + 0.1, 0.3);
    tone("sawtooth", 80, 55, s(0.7), 0.7 * K + 0.1, 0.09, 300);
    tone("sine", 70, 28, s(1.45), 0.9, 0.4); tone("sine", 523.25, 0, s(1.5), 1.4, 0.05);
  }

  /* ---------- adegan ---------- */
  const TL = { mask: 0.55, crack: 1.35, text: 1.95, glitch: 2.4, flash: 2.78, apply: 2.92, reveal: 3.25, out: 7.2, end: 8.4 };
  function crackPaths(W, H) {
    const cx = W / 2, cy = H * 0.46, L = Math.max(W, H) * 0.75, r0 = Math.min(W, H) * 0.09, out = [];
    for (let i = 0; i < 5; i++) {
      let a = (i / 5) * TAU + rnd(-0.4, 0.4), x = cx + Math.cos(a) * r0, y = cy + Math.sin(a) * r0, d = "M" + x.toFixed(1) + " " + y.toFixed(1);
      for (let k = 0; k < 9; k++) { a += rnd(-0.5, 0.5); const l = L / 9 * rnd(0.75, 1.25); x += Math.cos(a) * l; y += Math.sin(a) * l; d += " L" + x.toFixed(1) + " " + y.toFixed(1); }
      out.push(d);
    }
    return out;
  }
  function runScene(toWhite) {
    if (busy) return; busy = true;
    const sc = document.createElement("div");
    sc.className = "shiro-scene"; sc.dataset.dir = toWhite ? "in" : "out"; sc.setAttribute("aria-hidden", "true");
    const W = innerWidth, H = innerHeight;
    sc.innerHTML = '<div class="ss-stage"><div class="ss-aura"></div><div class="ss-kanji">白</div>' + maskSVG("ss-mask") +
      '<svg class="ss-cracks" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none">' + crackPaths(W, H).map(d => '<path d="' + d + '"/>').join("") + '</svg>' +
      '<div class="ss-ink"></div><div class="ss-ring"></div><div class="ss-ring r2"></div>' +
      (toWhite ? '<div class="ss-reveal"><div class="ss-photo">' + (CFG.photo ? '<img alt="" src="' + CFG.photo + '">' : '<i>白</i>') + '</div>' +
        '<div class="ss-congrats"><small>★ EASTER EGG DITEMUKAN ★</small><b>' + CFG.congrats + '</b><em>Tema White Ichigo aktif · ketuk untuk lanjut</em></div></div>' : '') +
      '<div class="ss-text"><b>' + (toWhite ? "Yo, King." : "Sampai nanti, King.") + '</b><em>' + (toWhite ? "kali ini, giliranku" : "topengnya kupasang lagi") + '</em></div></div>' +
      '<div class="ss-vig"></div><div class="ss-flash"></div>';
    document.body.appendChild(sc);
    const im = sc.querySelector(".ss-photo img");
    if (im) im.addEventListener("error", () => { im.parentNode.innerHTML = "<i>白</i>"; });
    sc.querySelectorAll(".ss-cracks path").forEach(p => { const l = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1200; p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    const timers = []; let done = false, applied = false;
    const at = (sec, fn) => timers.push(setTimeout(fn, sec * 1000 * K));
    const add = c => sc.classList.add(c);
    function doApply() { if (applied) return; applied = true; apply(toWhite); }
    function end() { if (done) return; done = true; timers.forEach(clearTimeout); document.removeEventListener("keydown", onKey, true); sc.remove(); busy = false; }
    function finish() { timers.forEach(clearTimeout); doApply(); add("is-out"); setTimeout(end, 350); }
    function onKey(e) { if (e.key === "Escape") { e.stopPropagation(); finish(); } }
    document.addEventListener("keydown", onKey, true);
    void sc.offsetWidth; add("is-in");
    if (toWhite) {
      sfxIn(TL);
      at(TL.mask, () => add("t-mask"));
      at(TL.crack, () => add("t-crack"));
      at(TL.text, () => add("t-text"));
      at(TL.glitch, () => add("t-glitch"));
      at(TL.flash, () => { sc.classList.remove("t-glitch"); add("t-flash"); add("t-shake"); if (navigator.vibrate) navigator.vibrate([40, 30, 90]); });
      at(TL.apply, doApply);
      at(TL.reveal, () => { add("t-reveal"); setTimeout(() => sc.addEventListener("click", finish), 600); });
      at(TL.out, () => add("is-out"));
      at(TL.end, end);
    } else {
      sfxOut();
      at(0.25, () => add("t-ink"));
      at(0.8, () => add("t-text"));
      at(1.45, doApply);
      at(1.95, () => add("is-out"));
      at(3.0, end);
    }
  }

  /* ---------- bisikan kecil ---------- */
  let toastEl = null, toastTimer = 0;
  function toast(html) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "shiro-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html;
    requestAnimationFrame(() => toastEl.classList.add("is-on"));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 6200);
  }

  /* ---------- latar hidup White Ichigo: abu tinta, tebasan kuas, percikan tinta ---------- */
  const fx = (function () {
    const noop = { sync() {} };
    const host = document.querySelector(".background-pattern");
    if (!host) return noop;
    const cv = document.createElement("canvas"); cv.id = "shiroCanvas"; cv.setAttribute("aria-hidden", "true"); host.appendChild(cv);
    const cx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, P = [], raf = 0, last = 0, nextSlash = 1.6;
    function size() { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function slash(x, y) {
      P.push({ k: "slash", x: x == null ? rnd(-0.05, 0.5) * W : x, y: y == null ? rnd(0.05, 0.75) * H : y, a: rnd(-0.62, -0.3), L: rnd(0.45, 0.85) * W, w: rnd(16, 34), t: 0, d: 1.9 });
    }
    function splat(x, y) {
      P.push({ k: "ring", x, y, t: 0, d: 0.75, R: 120 });
      for (let i = 0; i < 9; i++) { const a = rnd(0, TAU), dist = rnd(8, 82); P.push({ k: "blob", x: x + Math.cos(a) * dist, y: y + Math.sin(a) * dist, r: rnd(2, 9), t: 0, d: rnd(0.9, 1.6) }); }
      P.push({ k: "blob", x, y, r: 15, t: 0, d: 1.5 });
    }
    function draw(dt) {
      const next = [];
      for (const p of P) {
        p.t += dt; if (p.t >= p.d) continue;
        const u = p.t / p.d;
        if (p.k === "ash") {
          p.x += p.vx * dt + Math.sin(p.t * 1.7 + p.x) * 6 * dt; p.y += p.vy * dt;
          cx.fillStyle = "rgba(" + p.c + "," + (Math.sin(Math.PI * u) * 0.5).toFixed(3) + ")";
          cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, TAU); cx.fill();
        } else if (p.k === "slash") {
          const grow = Math.min(1, u / 0.18), fade = u < 0.18 ? 1 : 1 - (u - 0.18) / 0.82, N = 26, ca = Math.cos(p.a), sa = Math.sin(p.a);
          for (let pass = 0; pass < 2; pass++) {
            const off = pass === 0 ? 8 : 0;
            cx.fillStyle = pass === 0 ? "rgba(230,168,0," + (0.55 * fade).toFixed(3) + ")" : "rgba(13,13,18," + (0.82 * fade).toFixed(3) + ")";
            cx.beginPath();
            for (let i = 0; i <= N; i++) { const s = i / N, wd = p.w * Math.pow(Math.sin(Math.PI * Math.min(1, s * 0.96 + 0.02)), 0.7) * (pass === 0 ? 0.55 : 1); const px = p.x + ca * p.L * s * grow - sa * (wd / 2 + off), py = p.y + sa * p.L * s * grow + ca * (wd / 2 + off); if (i === 0) cx.moveTo(px, py); else cx.lineTo(px, py); }
            for (let i = N; i >= 0; i--) { const s = i / N, wd = p.w * Math.pow(Math.sin(Math.PI * Math.min(1, s * 0.96 + 0.02)), 0.7) * (pass === 0 ? 0.55 : 1); const px = p.x + ca * p.L * s * grow + sa * (wd / 2 - off), py = p.y + sa * p.L * s * grow - ca * (wd / 2 - off); cx.lineTo(px, py); }
            cx.closePath(); cx.fill();
          }
        } else if (p.k === "ring") {
          cx.strokeStyle = "rgba(230,168,0," + (0.7 * (1 - u)).toFixed(3) + ")"; cx.lineWidth = 3 * (1 - u) + 0.5;
          cx.beginPath(); cx.arc(p.x, p.y, 8 + p.R * (1 - Math.pow(1 - u, 3)), 0, TAU); cx.stroke();
        } else if (p.k === "blob") {
          const g = Math.min(1, u / 0.12), a = u < 0.4 ? 0.85 : 0.85 * (1 - (u - 0.4) / 0.6);
          cx.fillStyle = "rgba(13,13,18," + a.toFixed(3) + ")"; cx.beginPath(); cx.arc(p.x, p.y, p.r * g, 0, TAU); cx.fill();
        }
        next.push(p);
      }
      P = next;
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
      cx.clearRect(0, 0, W, H);
      if (P.length < 170 && Math.random() < dt * 14) P.push({ k: "ash", x: rnd(0, W), y: H + 8, vx: rnd(-10, 10), vy: -rnd(18, 60), r: rnd(0.8, 2.8), t: 0, d: rnd(6, 11), c: Math.random() < 0.18 ? "230,168,0" : "13,13,18" });
      nextSlash -= dt; if (nextSlash <= 0) { slash(); nextSlash = rnd(5, 10); }
      draw(dt);
    }
    function sync() {
      if (isWhite() && !reduce && !document.hidden) { if (!raf) { size(); last = performance.now(); raf = requestAnimationFrame(frame); } }
      else { if (raf) { cancelAnimationFrame(raf); raf = 0; } P = []; setTimeout(() => { if (!raf) cx.clearRect(0, 0, W, H); }, 1300); }
    }
    document.addEventListener("visibilitychange", sync);
    addEventListener("resize", () => { if (raf) size(); });
    document.addEventListener("pointerdown", e => {
      if (!isWhite() || reduce || !raf || e.button > 0) return;
      if (e.target.closest && e.target.closest("a, button, input, textarea, select, label, [role=button], .idcard, .music-menu, .bleach-secret, .bleach-stage, .shiro-scene")) return;
      splat(e.clientX, e.clientY);
      if (Math.random() < 0.35) slash(e.clientX - rnd(40, 160), e.clientY + rnd(-30, 50));
    });
    return { sync };
  })();

  /* ---------- mulai ---------- */
  syncKey();
  buildGate();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildGate);
  window.addEventListener("portfolio:ready", buildGate);

  /* ---------- pintu belakang untuk mencoba (Console) ---------- */
  window.shiroIchigo = {
    CFG,
    get active() { return keyWanted(); },
    force(v) { forced = v === undefined ? true : (v === null ? null : !!v); buildGate(); syncKey(); return forced === null ? "Otomatis lagi (Hollow + lagu ke-10)." : "Gerbang dipaksa " + (forced ? "muncul (masuk Ichigo > Hollow, turun ke Kontak)." : "tersembunyi."); },
    reset() { forced = null; syncKey(); if (isWhite()) apply(false); return "Direset."; },
    enter() { if (isHollow() && !isWhite() && !busy) runScene(true); },
    leave() { if (isWhite() && !busy) runScene(false); }
  };
})();

/* =========================================================
   PEMBARUAN 34 — EASTER EGG: PRAMUKA (Tunas Kelapa + Salam Pramuka)
   Alur: 1) masuk mode SENJA (tahan tombol terang/gelap > Senja)
         2) ketuk ID card 15 kali berturut-turut (jeda antar ketukan maks. 3 detik)
         3) lagu baru "Hymne Pramuka" muncul di daftar musik (tahan tombol musik) - keluar dari Senja = lagu & tunas hilang lagi
         4) tekan lagu itu di daftar musik -> TUNAS KELAPA muncul di paling bawah bagian Kontak
         5) ketuk tunas kelapa -> adegan SALAM PRAMUKA (dunia hitam-putih berubah berwarna)
   Mengatur: objek CFG di bawah. File lagu: music/lagu-11.mp3 (atau ubah CFG.songSrc).
   Tunas ditekan bergantian: ke-1 SALAM PRAMUKA, ke-2 PERSIAPAN DUDUK (api unggun), ke-3 SALAM PRAMUKA lagi, dst.
   Mencoba cepat (Console):
     pramuka.unlock()      langsung buka lagu baru (tanpa 15 ketukan)
     (tidak disimpan: muat ulang halaman = kembali seperti semula)
     pramuka.force(true)   paksa tunas kelapa muncul | force(false) sembunyikan | force(null) otomatis lagi
     pramuka.scene()       putar adegan berikutnya (bergantian) | scene(1) Salam Pramuka | scene(2) Persiapan Duduk | pramuka.reset() kunci lagi
   Tampilan ada di style.css (blok PEMBARUAN 34, awalan .pr- / html[data-pr-...]).
========================================================= */
(function pramukaEgg() {
  "use strict";
  const root = document.documentElement;
  const CFG = {
    taps: 15,                 // jumlah ketukan ID card
    gap: 3000,                // ms: jeda maksimal antar ketukan (lebih lama = hitungan mulai dari 0)
    tickFrom: 6,              // mulai ketukan ke-berapa terdengar "tek" kecil sebagai petunjuk
    needDusk: true,           // ketukan hanya dihitung saat mode SENJA aktif; keluar dari Senja = lagu & tunas kelapa hilang lagi
    songTitle: "Hymne Pramuka",
    songSrc: "music/lagu-11.mp3",   // taruh filenya di sini; tunas tetap muncul walau file belum ada
    poll: 500,                // ms: cek apakah lagu sedang diputar
    hint: true,               // bisikan kecil saat tunas kelapa muncul
    sound: true,              // bunyi (ikut mati kalau tapSound.on = false)
    volume: 1,
    sfxSrc: "music/salam-pramuka.mp3",  // SUARA MP3 saat tunas kelapa ditekan ("" = pakai bunyi buatan kode saja)
    sfxVolume: 1,             // 0 - 1
    sfxDelay: 0,              // detik: tunda mp3 supaya pas dengan adegan (dentum + terompet ada di detik ke-3)
    sfx2Src: "music/persiapan-duduk.mp3",  // SUARA MP3 untuk adegan ke-2 "Persiapan Duduk" ("" = bunyi buatan kode)
    sfx2Delay: 0,             // detik: tunda mp3 adegan ke-2 (HUUU mulai detik ke-3,4 · DUDUK detik ke-5,9 · HAAA detik ke-6,7)
    sfxReplace: true,         // true = kalau mp3 berhasil diputar, bunyi buatan kode dimatikan · false = keduanya bareng
    congrats: "Selamat! Kamu menemukan easter egg Pramuka"
  };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const K = reduce ? 0.28 : 1;                        // faktor waktu adegan
  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;
  const isDusk = () => root.dataset.variant === "dusk" && !root.dataset.bleach;

  // TIDAK disimpan: muat ulang halaman = semuanya kembali seperti semula
  let unlocked = false, played = false;
  let songIdx = -1, forced = null, wasKey = false, busy = false, gate = null;

  /* ---------- lagu baru masuk ke daftar musik ---------- */
  function ensureSong() {
    if (!unlocked || songIdx >= 0) return;
    const m = window.siteMusic;
    if (m && m.addSong) songIdx = m.addSong({ title: CFG.songTitle, src: CFG.songSrc });
  }
  // lagu ditekan di daftar musik -> tunas kelapa muncul (tetap sampai halaman dimuat ulang)
  window.addEventListener("music:play", e => { if (songIdx >= 0 && e.detail && e.detail.index === songIdx) { played = true; syncKey(); } });
  const keyWanted = () => (forced !== null ? forced : (unlocked && played));
  /* ---------- keluar dari mode Senja: lagu Pramuka & tunas kelapa hilang, ketukan harus diulang dari awal ---------- */
  let keep = false;          // true kalau dibuka lewat Console (pramuka.unlock()), supaya tidak langsung dikunci lagi
  function relock() {
    if (!unlocked && songIdx < 0) return;
    unlocked = false; played = false; taps = 0;
    if (songIdx >= 0 && window.siteMusic && window.siteMusic.removeSong) window.siteMusic.removeSong(CFG.songSrc);
    songIdx = -1;
    syncKey();
  }
  function checkSky() { if (CFG.needDusk && !keep && (unlocked || songIdx >= 0) && !isDusk()) relock(); }
  if (window.MutationObserver) new MutationObserver(() => setTimeout(checkSky, 60)).observe(root, { attributes: true, attributeFilter: ["data-variant", "data-theme", "data-bleach"] });

  function syncKey() {
    checkSky();
    ensureSong();
    const on = keyWanted();
    if (on) root.dataset.prKey = "1"; else delete root.dataset.prKey;
    if (on && !wasKey && CFG.hint && forced === null) toast("<b>⚜</b>&nbsp; Ada tunas kecil tumbuh di dasar halaman <b>Kontak</b>…");
    wasKey = on;
  }
  setInterval(syncKey, CFG.poll);

  /* ---------- gambar: tunas kelapa & tangan hormat (SVG buatan kode) ---------- */
  function emblemSVG(cls, rope) {
    return '<svg class="' + cls + '" viewBox="0 0 120 140" aria-hidden="true" focusable="false">' +
      (rope ? '<circle class="e-ring" cx="60" cy="70" r="57"/><circle class="e-disc" cx="60" cy="70" r="50"/>' : '') +
      '<g class="e-sprout">' +
      '<path class="e-leaf l3" d="M58 94 C41 86 25 67 23 40 C40 49 52 66 58 94Z"/>' +
      '<path class="e-leaf l4" d="M62 94 C79 86 95 67 97 40 C80 49 68 66 62 94Z"/>' +
      '<path class="e-leaf l1" d="M60 96 C51 72 53 42 60 16 C67 42 69 72 60 96Z"/>' +
      '<path class="e-vein" d="M60 92 L60 30"/></g>' +
      '<path class="e-nut" d="M33 102 C33 87 46 84 60 91 C74 84 87 87 87 102 C87 118 74 127 60 127 C46 127 33 118 33 102Z"/>' +
      '<path class="e-husk" d="M42 106 Q60 117 78 106"/>' +
      '<circle class="e-eye" cx="52" cy="102" r="2.6"/><circle class="e-eye" cx="68" cy="102" r="2.6"/><circle class="e-eye" cx="60" cy="111" r="2.6"/>' +
      '<path class="e-root" d="M51 127 Q49 134 44 137 M60 127 L60 137 M69 127 Q71 134 76 137"/></svg>';
  }
  function handSVG() {      // tiga jari terangkat (jempol menutup kelingking) = salam Pramuka
    return '<svg class="pr-hand" viewBox="0 0 100 130" aria-hidden="true" focusable="false">' +
      '<rect class="h-f" x="20" y="16" width="17" height="60" rx="8.5" transform="rotate(-7 28 76)"/>' +
      '<rect class="h-f" x="41" y="6" width="17" height="68" rx="8.5"/>' +
      '<rect class="h-f" x="62" y="16" width="17" height="60" rx="8.5" transform="rotate(7 70 76)"/>' +
      '<path class="h-p" d="M16 68 H84 V94 C84 114 70 126 50 126 C30 126 16 114 16 94Z"/>' +
      '<ellipse class="h-t" cx="55" cy="92" rx="30" ry="10.5" transform="rotate(-17 55 92)"/></svg>';
  }

  /* ---------- gerbang rahasia di paling bawah .contact-section ---------- */
  function buildGate() {
    if (gate && gate.isConnected) return;
    const host = document.querySelector(".contact-section");
    if (!host) return;
    gate = document.createElement("div");
    gate.className = "pr-gate";
    gate.innerHTML = '<button type="button" class="pr-btn" aria-label="Tunas kelapa: panggil Salam Pramuka">' +
      emblemSVG("pr-mini", false) + '<span class="pr-cap"><i>⚜</i><span>Siap! Salam Pramuka</span></span></button>';
    host.appendChild(gate);
    gate.querySelector(".pr-btn").addEventListener("click", () => { if (!busy) runScene(); });
  }

  /* ---------- bunyi (Web Audio, tanpa file) ---------- */
  let ac = null, mix = null, nbuf = null;
  function audio() {
    if (!CFG.sound || (window.tapSound && window.tapSound.on === false)) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      if (!ac) {
        ac = new AC(); mix = ac.createGain(); const comp = ac.createDynamicsCompressor();
        mix.connect(comp); comp.connect(ac.destination);
        nbuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
        const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ac.state === "suspended") ac.resume();
      mix.gain.value = 0.9 * CFG.volume;
      return ac;
    } catch (_) { return null; }
  }
  function tone(type, f0, f1, t, dur, vol, lp) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.03, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let n = o; if (lp) { const f = ac.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = lp; o.connect(f); n = f; }
    n.connect(g); g.connect(mix); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(type, f0, f1, t, dur, vol, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = type; f.Q.value = q || 1;
    f.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur * 0.3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(mix); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  function bugle(t, notes, vol) {          // terompet: [frekuensi, mulai, lama]
    notes.forEach(([f, d, len]) => {
      const o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter();
      o.type = "sawtooth"; o.frequency.value = f;
      lp.type = "lowpass"; lp.frequency.setValueAtTime(900, t + d); lp.frequency.linearRampToValueAtTime(2600, t + d + 0.08);
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(vol, t + d + 0.04);
      g.gain.setValueAtTime(vol, t + d + Math.max(0.05, len - 0.09)); g.gain.exponentialRampToValueAtTime(0.0001, t + d + len);
      o.connect(lp); lp.connect(g); g.connect(mix); o.start(t + d); o.stop(t + d + len + 0.05);
    });
  }
  function whistle(t, dur) {               // peluit: "priiit"
    const o = ac.createOscillator(), l = ac.createOscillator(), lg = ac.createGain(), g = ac.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(2500, t); o.frequency.linearRampToValueAtTime(3300, t + dur * 0.5);
    l.frequency.value = 34; lg.gain.value = 110; l.connect(lg); lg.connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.11, t + 0.04); g.gain.setValueAtTime(0.11, t + dur - 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(mix); o.start(t); l.start(t); o.stop(t + dur + 0.05); l.stop(t + dur + 0.05);
  }
  function sfxTick(n) {                    // petunjuk ketukan: makin tinggi makin dekat
    if (!audio()) return;
    const t = ac.currentTime + 0.01;
    tone("triangle", 520 + n * 42, 0, t, 0.09, 0.12); noise("bandpass", 3200, 0, t, 0.05, 0.07, 2);
  }
  function sfxFound() {                    // terbuka: drum kecil + terompet pendek
    if (!audio()) return;
    const t = ac.currentTime + 0.03;
    [0, 0.07, 0.14].forEach(d => { noise("bandpass", 1900, 0, t + d, 0.06, 0.14, 1.2); tone("triangle", 190, 120, t + d, 0.06, 0.08); });
    bugle(t + 0.24, [[392, 0, 0.16], [523, 0.19, 0.16], [659, 0.38, 0.16], [784, 0.57, 0.9]], 0.15);
  }
  function sfxScene(T) {
    if (!audio()) return;
    const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    for (let i = 0; i < 60; i++) {         // gulungan drum menaik
      const x = 0.15 + i * 0.07; if (x > T.burst - 0.1) break;
      noise("bandpass", 1900, 0, s(x), 0.06, 0.05 + i * 0.004, 1.2); tone("triangle", 190, 120, s(x), 0.05, 0.03);
    }
    tone("sine", 95, 38, s(T.burst), 1.0, 0.6); noise("highpass", 6500, 3000, s(T.burst), 1.5 * K + 0.3, 0.12, 0.8);   // dentum + simbal
    bugle(s(T.burst), [[392, 0, 0.16], [392, 0.19, 0.16], [523, 0.38, 0.5], [659, 1.0, 0.2], [784, 1.25, 1.0]], 0.16);  // terompet
    whistle(s(T.hand), 0.55); whistle(s(T.hand) + 0.7, 0.4);                                                         // peluit
    noise("bandpass", 500, 2200, s(T.hand), 1.3, 0.13, 1.6); tone("sawtooth", 220, 520, s(T.hand), 1.1, 0.05, 1100);   // "whooooow"
    [392, 494, 587, 784].forEach((f, i) => tone("triangle", f, 0, s(T.sub) + i * 0.06, 1.6, 0.07));                  // akor penutup
  }

  /* ---------- suara mp3 saat tunas ditekan (cadangan: bunyi buatan kode kalau file tidak ada) ---------- */
  let sfxAudio = null;
  function stopFile(ms) {
    const a = sfxAudio; sfxAudio = null; if (!a) return;
    const v0 = a.volume, n = Math.max(1, Math.round(ms / 40)); let i = 0;
    const id = setInterval(() => { i++; a.volume = Math.max(0, v0 * (1 - i / n)); if (i >= n) { clearInterval(id); a.pause(); } }, 40);
  }
  function startSound(sc, src, delay, synth) {
    if (!CFG.sound || (window.tapSound && window.tapSound.on === false)) return;
    if (!src) { synth(); return; }
    const a = new Audio(src);
    a.volume = Math.max(0, Math.min(1, CFG.sfxVolume));
    sfxAudio = a;
    const go = () => {
      if (!sc.isConnected || sfxAudio !== a) return;
      const fallback = () => { if (sfxAudio === a) sfxAudio = null; if (sc.isConnected) synth(); };
      let p; try { p = a.play(); } catch (_) { fallback(); return; }
      if (p && p.then) p.then(() => { if (!CFG.sfxReplace && sc.isConnected) synth(); }).catch(fallback);
    };
    if (delay > 0) setTimeout(go, delay * 1000); else go();
  }

  /* ---------- bunyi adegan 2: PERSIAPAN DUDUK (paduan suara "huuu" & "haaa" dibuat dari gelombang + formant) ---------- */
  function choir(t, dur, f0a, f0b, F1, F2, vol, voices) {
    for (let v = 0; v < voices; v++) {
      const det = 1 + rnd(-0.025, 0.025), o = ac.createOscillator(), g = ac.createGain(), b1 = ac.createBiquadFilter(), b2 = ac.createBiquadFilter(), g2 = ac.createGain();
      o.type = "sawtooth"; o.frequency.setValueAtTime(f0a * det, t); o.frequency.linearRampToValueAtTime(f0b * det, t + dur);
      b1.type = "bandpass"; b1.frequency.value = F1 * det; b1.Q.value = 5;
      b2.type = "bandpass"; b2.frequency.value = F2 * det; b2.Q.value = 5; g2.gain.value = 0.55;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.3, dur * 0.35));
      g.gain.setValueAtTime(vol, t + Math.max(0.1, dur - 0.18)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(b1); b1.connect(g); o.connect(b2); b2.connect(g2); g2.connect(g); g.connect(mix);
      o.start(t); o.stop(t + dur + 0.05);
    }
  }
  function sfxDuduk(T) {
    if (!audio()) return;
    const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    for (let i = 0; i < 7; i++) { const x = T.in + i * 0.2; tone("sine", 110, 60, s(x), 0.08, 0.13); noise("bandpass", 900, 0, s(x), 0.07, 0.07, 1); }   // langkah berbaris
    whistle(s(T.p1), 0.7);                                                                                     // peluit: "persiapan!"
    whistle(s(T.p2) - 0.4, 0.3);                                                                               // peluit pendek sebelum "huuu"
    choir(s(T.p2), Math.max(0.5, (T.p3 - T.p2) * K - 0.1), 120, 170, 320, 800, 0.3, 4);                         // "huuuu": naik pelan
    tone("sine", 70, 50, s(T.sit), 0.3, 0.4); noise("lowpass", 1400, 300, s(T.sit), 0.35, 0.25, 0.8);          // duduk: bruk
    noise("bandpass", 3500, 0, s(T.sit) + 0.05, 0.3, 0.06, 1.2);                                                // gesekan baju
    choir(s(T.ha), 0.75 * K + 0.2, 210, 190, 800, 1250, 0.4, 5);                                               // "haaa!"
    noise("highpass", 6000, 3000, s(T.ha), 1.2, 0.1, 0.8); tone("sine", 90, 38, s(T.ha), 0.8, 0.45);
    [784, 988, 1174].forEach((f, i) => tone("triangle", f, 0, s(T.sub) + i * 0.06, 1.4, 0.05));
  }

  /* ---------- konfeti (dipakai dua adegan) ---------- */
  function confetti(sc) {
    const cols = ["#e3202c", "#ffffff", "#f0c36a", "#3f8f3a", "#caa56a", "#ffd9a0", "#e3202c", "#ffffff"];
    const R = Math.min(innerWidth, 820) * 0.62; let h = "";
    for (let i = 0; i < 64; i++) {
      const a = rnd(0, TAU), d = rnd(0.25, 1) * R, x = Math.cos(a) * d, y = Math.sin(a) * d * 0.75 - 40;
      h += '<span class="' + (Math.random() < 0.35 ? "leaf" : "") + '" style="--x:' + x.toFixed(0) + "px;--y:" + y.toFixed(0) + "px;--r:" + rnd(-540, 540).toFixed(0) + "deg;--d:" + rnd(1.8, 3.2).toFixed(2) + "s;--w:" + rnd(6, 12).toFixed(0) + "px;--h:" + rnd(10, 20).toFixed(0) + "px;--c:" + cols[i % cols.length] + '"></span>';
    }
    sc.querySelector(".pr-confetti").innerHTML = h;
  }
  function flagsHTML() { let f = ""; for (let i = 0; i < 16; i++) f += '<i class="f' + (i % 2) + '" style="--i:' + i + '"></i>'; return '<div class="pr-flags">' + f + "</div>"; }

  /* ---------- adegan 1: SALAM PRAMUKA ---------- */
  const TL = { flags: 0.5, grow: 0.9, burst: 3.0, text: 3.2, hand: 4.0, sub: 5.0, click: 5.4, out: 11.5, end: 12.6 };
  function salamHTML() {
    let n = 0;
    const word = (w, c) => '<span class="pr-w ' + c + '">' + Array.from(w).map(ch => '<span class="pr-letter" style="--i:' + (n++) + '">' + ch + "</span>").join("") + "</span>";
    return '<div class="pr-stage"><div class="pr-rays"></div><div class="pr-glow"></div>' + flagsHTML() +
      '<div class="pr-emblem-wrap">' + emblemSVG("pr-emblem", true) + '<i class="pr-ring"></i><i class="pr-ring r2"></i></div>' +
      '<div class="pr-title">' + word("SALAM", "w1") + word("PRAMUKA!", "w2") + "</div>" +
      '<div class="pr-hand-wrap">' + handSVG() + "</div>" +
      '<div class="pr-sub"><small>★ EASTER EGG DITEMUKAN ★</small><b>' + CFG.congrats + "</b><em>Satyaku kudharmakan, dharmaku kubaktikan · ketuk untuk lanjut</em></div>" +
      '<div class="pr-confetti"></div></div><div class="pr-flash"></div>';
  }

  /* ---------- adegan 2: PERSIAPAN DUDUK (api unggun malam) ---------- */
  const TL2 = { flags: 0.4, in: 0.3, p1: 0.8, p2: 3.4, p3: 5.9, sit: 6.05, ha: 6.7, sub: 7.6, click: 8.0, out: 13.0, end: 14.1 };
  function scoutSVG() {      // satu pramuka: kaki + badan (bisa menunduk) + lipatan kaki bersila
    return '<svg viewBox="0 0 60 112" aria-hidden="true" focusable="false">' +
      '<g class="sc-leg"><rect class="sc-pants" x="19" y="62" width="10" height="42" rx="4.5"/><rect class="sc-pants" x="31" y="62" width="10" height="42" rx="4.5"/>' +
      '<ellipse class="sc-shoe" cx="24" cy="104" rx="7.5" ry="4"/><ellipse class="sc-shoe" cx="36" cy="104" rx="7.5" ry="4"/></g>' +
      '<g class="sc-up"><rect class="sc-skin sc-arm l" x="10" y="26" width="9" height="36" rx="4.5"/><rect class="sc-skin sc-arm r" x="41" y="26" width="9" height="36" rx="4.5"/>' +
      '<rect class="sc-shirt" x="15" y="24" width="30" height="44" rx="11"/><path class="sc-scarf" d="M18 25 L42 25 L30 47Z"/><path class="sc-scarf2" d="M26 25 L34 25 L30 33Z"/>' +
      '<circle class="sc-skin" cx="30" cy="14" r="10"/><path class="sc-hat" d="M18.5 13 Q30 -3 41.5 13 Q30 8.5 18.5 13Z"/></g>' +
      '<ellipse class="sc-fold" cx="30" cy="95" rx="26" ry="9"/></svg>';
  }
  function fireSVG() {
    return '<svg viewBox="0 0 50 64" aria-hidden="true" focusable="false"><path class="fl f1" d="M25 4 C32 18 44 26 42 42 C41 54 33 60 25 60 C17 60 9 54 8 42 C6 26 18 20 25 4Z"/>' +
      '<path class="fl f2" d="M25 20 C30 30 36 34 35 45 C34 53 30 57 25 57 C20 57 16 53 15 45 C14 34 20 30 25 20Z"/>' +
      '<path class="fl f3" d="M25 36 C28 42 30 46 29 51 C28 55 27 56 25 56 C23 56 22 55 21 51 C20 46 22 42 25 36Z"/>' +
      '<rect class="log" x="3" y="56" width="44" height="7" rx="3.5" transform="rotate(-8 25 59.5)"/><rect class="log" x="3" y="56" width="44" height="7" rx="3.5" transform="rotate(8 25 59.5)"/></svg>';
  }
  function padukHTML() {
    let stars = ""; for (let i = 0; i < 38; i++) stars += '<i style="left:' + rnd(1, 99).toFixed(1) + "%;top:" + rnd(2, 62).toFixed(1) + "%;--s:" + rnd(1.5, 3.4).toFixed(1) + "px;--dl:" + rnd(0, 3).toFixed(1) + 's"></i>';
    let sparks = ""; for (let i = 0; i < 7; i++) sparks += '<i style="--dx:' + rnd(-26, 26).toFixed(0) + "px;--dl:" + rnd(0, 2).toFixed(1) + "s;--du:" + rnd(1.2, 2.2).toFixed(1) + 's"></i>';
    let k = 0; const fig = cls => '<div class="pr2-fig ' + cls + '" style="--k:' + (((k++) * 37) % 11 / 11).toFixed(2) + '">' + scoutSVG() + "</div>";
    const row = (n, cls) => { let h = ""; for (let i = 0; i < n; i++) h += fig(cls + (i % 2 ? " alt" : "")); return h; };
    const U = (n) => Array.from({ length: n }, (_, j) => '<span class="u" style="--j:' + j + '">U</span>').join("");
    const A = (n) => Array.from({ length: n }, (_, j) => '<span class="u" style="--j:' + j + '">A</span>').join("");
    return '<div class="pr2-sky">' + stars + '<b class="pr2-moon"></b></div>' +
      '<div class="pr-stage">' + flagsHTML() +
      '<div class="pr2-say">' +
        '<div class="pr2-p p1"><span class="pr2-t">PERSIAPAN</span><span class="pr2-t">DUDUK</span></div>' +
        '<div class="pr2-p p2"><span class="pr2-t">H' + U(6) + '…</span></div>' +
        '<div class="pr2-p p3"><span class="pr2-t">DUDUK!</span></div>' +
        '<div class="pr2-p p4"><span class="pr2-t">H' + A(4) + '!</span></div></div>' +
      '<div class="pr2-field"><i class="pr2-tent l"></i><i class="pr2-tent r"></i><div class="pr2-ground"></div>' +
        '<div class="pr2-crowd"><div class="pr2-row back">' + row(7, "back") + "</div>" +
        '<div class="pr2-row front">' + row(4, "") + '<div class="pr2-fire-wrap">' + fireSVG() + '<span class="pr2-sparks">' + sparks + "</span></div>" + row(4, "") + "</div></div>" +
        '<div class="pr-confetti"></div></div>' +
      '<div class="pr-sub"><small>★ PRAMUKA SIAP ★</small><b>Persiapan duduk… huuu… duduk… haaa!</b><em>ketuk untuk lanjut</em></div></div><div class="pr-flash"></div>';
  }
  function dust(sc) {
    const f = sc.querySelector(".pr2-field"); if (!f) return; let h = "";
    for (let i = 0; i < 16; i++) h += '<i class="pr2-dust" style="left:' + rnd(8, 92).toFixed(0) + "%;--dx:" + rnd(-40, 40).toFixed(0) + "px;--s:" + rnd(0.7, 1.6).toFixed(2) + ";--dl:" + rnd(0, 0.25).toFixed(2) + 's"></i>';
    f.insertAdjacentHTML("beforeend", h);
  }

  /* ---------- pemutar adegan: ketukan 1 = Salam Pramuka, 2 = Persiapan Duduk, 3 = Salam Pramuka lagi, dst ---------- */
  let turn = 0;
  function runScene(which) {
    if (busy) return; busy = true;
    const v = which === 1 || which === 2 ? which : (turn % 2 === 0 ? 1 : 2);
    turn = v;
    root.dataset.prScene = "in";           // dunia hitam-putih berubah berwarna selama adegan
    const sc = document.createElement("div");
    sc.className = "pr-scene" + (v === 2 ? " pr-scene2" : ""); sc.setAttribute("aria-hidden", "true");
    sc.innerHTML = v === 1 ? salamHTML() : padukHTML();
    document.body.appendChild(sc);
    const T = v === 1 ? TL : TL2;
    const timers = []; let done = false;
    const at = (sec, fn) => timers.push(setTimeout(fn, sec * 1000 * K));
    const add = c => sc.classList.add(c);
    const say = n => { sc.dataset.say = String(n); };
    function end() {
      if (done) return; done = true; timers.forEach(clearTimeout);
      document.removeEventListener("keydown", onKey, true); sc.remove(); busy = false;
      stopFile(0); if (window.siteMusic && window.siteMusic.duck) window.siteMusic.duck(false);
      root.dataset.prScene = "out"; setTimeout(() => { if (!busy) delete root.dataset.prScene; }, 1000);
    }
    function finish() { timers.forEach(clearTimeout); add("is-out"); stopFile(350); setTimeout(end, 350); }
    function onKey(e) { if (e.key === "Escape") { e.stopPropagation(); finish(); } }
    document.addEventListener("keydown", onKey, true);
    void sc.offsetWidth; add("is-in");
    if (window.siteMusic && window.siteMusic.duck) window.siteMusic.duck(true);   // lagu latar mengecil selama adegan
    if (v === 1) {
      startSound(sc, CFG.sfxSrc, CFG.sfxDelay, () => sfxScene(TL));
      at(T.flags, () => add("t-flags"));
      at(T.grow, () => add("t-grow"));
      at(T.burst, () => { confetti(sc); add("t-burst"); if (navigator.vibrate) navigator.vibrate([40, 30, 90]); });
      at(T.text, () => add("t-text"));
      at(T.hand, () => add("t-hand"));
    } else {
      startSound(sc, CFG.sfx2Src, CFG.sfx2Delay, () => sfxDuduk(TL2));
      at(T.flags, () => add("t-flags"));
      at(T.in, () => add("t-in"));                                   // pramuka berbaris masuk
      at(T.p1, () => say(1));                                        // PERSIAPAN DUDUK
      at(T.p2, () => { say(2); add("t-bend"); });                    // HUUUU… (lutut menekuk pelan)
      at(T.p3, () => say(3));                                        // DUDUK!
      at(T.sit, () => { add("t-sit"); dust(sc); if (navigator.vibrate) navigator.vibrate(30); });   // bruk, duduk bersila
      at(T.ha, () => { say(4); add("t-ha"); confetti(sc); add("t-burst"); if (navigator.vibrate) navigator.vibrate([30, 20, 70]); });   // HAAA!
    }
    at(T.sub, () => add("t-sub"));
    at(T.click, () => sc.addEventListener("click", finish));
    at(T.out, () => { add("is-out"); stopFile(1000); });
    at(T.end, end);
  }

  /* ---------- bisikan kecil ---------- */
  let toastEl = null, toastTimer = 0;
  function toast(html, ms) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "pr-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html;
    requestAnimationFrame(() => toastEl.classList.add("is-on"));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), ms || 6200);
  }

  /* ---------- buka kunci: ketuk ID card ---------- */
  function unlock(silent) {
    if (unlocked) return;
    unlocked = true;
    ensureSong();
    if (!silent) {
      sfxFound();
      toast("<small>★ EASTER EGG DITEMUKAN ★</small><b>" + CFG.congrats + "</b><span>Lagu baru muncul di daftar musik: <i>" + CFG.songTitle + "</i>. Putar, lalu lihat dasar halaman Kontak.</span>", 9000);
    }
  }
  let taps = 0, lastTap = 0, dn = null;
  function tap() {
    if (unlocked) return;
    if (CFG.needDusk && !isDusk()) { taps = 0; return; }
    const now = performance.now();
    if (now - lastTap > CFG.gap) taps = 0;
    lastTap = now; taps++;
    if (taps >= CFG.taps) { taps = 0; unlock(false); }
    else if (taps >= CFG.tickFrom) sfxTick(taps - CFG.tickFrom);
  }
  let wired = false;
  function wire() {
    if (wired) return;
    const card = document.getElementById("idcard"); if (!card) return;
    wired = true;
    card.addEventListener("pointerdown", e => { dn = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    card.addEventListener("pointerup", e => {       // hitung hanya ketukan (bukan geseran/tahan), sama seperti pembalik kartu
      if (!dn) return;
      const moved = Math.hypot(e.clientX - dn.x, e.clientY - dn.y), dt = performance.now() - dn.t; dn = null;
      if (moved < 7 && dt < 600) tap();
    });
    card.addEventListener("pointercancel", () => { dn = null; });
    card.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) tap(); });
  }

  /* ---------- mulai ---------- */
  wire(); buildGate(); syncKey();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { wire(); buildGate(); });
  window.addEventListener("portfolio:ready", () => { wire(); buildGate(); });

  /* ---------- pintu belakang untuk mencoba (Console) ---------- */
  window.pramuka = {
    CFG,
    get unlocked() { return unlocked; },
    get active() { return keyWanted(); },
    unlock() { keep = true; unlock(false); return "Lagu \"" + CFG.songTitle + "\" terbuka di daftar musik (tanpa syarat Senja, sampai reset())."; },
    force(v) { forced = v === undefined ? true : (v === null ? null : !!v); buildGate(); syncKey(); return forced === null ? "Otomatis lagi (buka kunci + lagu ditekan)." : "Tunas kelapa dipaksa " + (forced ? "muncul (turun ke dasar Kontak)." : "tersembunyi."); },
    scene(n) { if (!busy) runScene(n); },   // scene() = bergantian · scene(1) Salam Pramuka · scene(2) Persiapan Duduk
    reset() { keep = false; relock(); return "Dikunci lagi; lagu dan tunas kelapa dihilangkan."; }
  };
})();


/* =========================================================
   PEMBARUAN 37: KURSOR CUSTOM (siteCursor)
   Hanya aktif untuk mouse asli (HP/tablet tidak). Warna & bentuk mengikuti tema (lihat blok PEMBARUAN 37 di style.css).
   Console: siteCursor.off() / siteCursor.on() / siteCursor.CFG
========================================================= */
(function siteCursor() {
  "use strict";
  const root = document.documentElement;
  if (!window.matchMedia || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const CFG = { enabled: true, ringLag: 0.2, trail: true, trailGap: 16, maxParticles: 80 };

  const SHAPES = { ichibe: "star", shinji: "star", aizen: "wing", zaraki: "blade", ichigo: "moon", uryu: "cross" };
  const GLYPH = { star: "spark", wing: "dot", blade: "slash", moon: "spark", cross: "plus", hack: "bit" };
  const ICONS =
    '<svg class="s-star" viewBox="0 0 24 24"><path d="M12 1C12.9 7.6 16.4 11.1 23 12 16.4 12.9 12.9 16.4 12 23 11.1 16.4 7.6 12.9 1 12 7.6 11.1 11.1 7.6 12 1Z"/><circle cx="12" cy="12" r="2.3" fill="#fff"/></svg>' +
    '<svg class="s-wing" viewBox="0 0 24 24"><g class="wl"><path d="M12 11.5C9.5 3.5 2.5 1.5 2.2 7.2 2 11.2 7.5 12.6 12 11.5Z"/><path d="M12 12.5C8.5 12.6 4.2 14 5.6 18.6 7.4 23 11 17.4 12 12.5Z"/></g><g class="wr"><path d="M12 11.5C14.5 3.5 21.5 1.5 21.8 7.2 22 11.2 16.5 12.6 12 11.5Z"/><path d="M12 12.5C15.5 12.6 19.8 14 18.4 18.6 16.6 23 13 17.4 12 12.5Z"/></g><rect x="11.4" y="7" width="1.2" height="11" rx=".6" fill="#fff" opacity=".85"/></svg>' +
    '<svg class="s-blade" viewBox="0 0 24 24"><g transform="rotate(45 12 12)"><path d="M12 .5L14.3 12 12 23.5 9.7 12Z"/></g><g transform="rotate(-45 12 12)"><path d="M12 4L13.4 12 12 20 10.6 12Z" opacity=".75"/></g><circle cx="12" cy="12" r="1.8" fill="#fff"/></svg>' +
    '<svg class="s-moon" viewBox="0 0 24 24"><g transform="rotate(-25 12 12)"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></g></svg>' +
    '<svg class="s-cross" viewBox="0 0 24 24"><path d="M12 .8L13.7 9.4 12 23.2 10.3 9.4Z"/><path d="M.8 12L9.4 10.3 23.2 12 9.4 13.7Z"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="1.1" fill="#fff"/></svg>' +
    '<svg class="s-hack" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8V2h6M16 2h6v6M22 16v6h-6M8 22H2v-6"/><path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke-width="1.2"/></g><rect class="hk-blk" x="10.2" y="10.2" width="3.6" height="3.6"/></svg>';

  const TEXT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="file"]):not([type="color"]),textarea,[contenteditable="true"],[contenteditable=""]';
  const LINK = 'a[href],button,summary,select,label[for],[role="button"],[role^="menuitem"],input[type="checkbox"],input[type="radio"],input[type="range"],input[type="submit"],input[type="button"]';
  const NO = ':disabled,[aria-disabled="true"]';

  let headPos, ringPos, head, ring, cvs, ctx, dpr = 1, W = 0, H = 0;
  let mx = -100, my = -100, rx = -100, ry = -100, lx = 0, ly = 0, acc = 0, raf = 0, dirty = false;
  let active = false, shown = false, lastEl = null, scanned = false;
  let col = "#4f9dff", col2 = "#bfe0ff", shape = "star";
  const parts = [];
  const sel = { pointer: [], grab: [], aim: [], no: [] };

  /* ----- membaca style.css sekali: elemen mana yang bercursor pointer / grab / crosshair / not-allowed ----- */
  function scan() {
    scanned = true;
    const kindOfCursor = { pointer: "pointer", "zoom-in": "pointer", grab: "grab", grabbing: "grab", move: "grab", crosshair: "aim", "not-allowed": "no" };
    const walk = rules => {
      for (const r of rules) {
        try {
          if (!r.selectorText && r.cssRules) {
            if (r.media && !window.matchMedia(r.media.mediaText).matches) continue;
            walk(r.cssRules);
            continue;
          }
          if (!r.selectorText || !r.style) continue;
          const k = kindOfCursor[r.style.cursor];
          if (!k || /\.sc-|html\.sc-on/.test(r.selectorText)) continue;
          sel[k].push(r.selectorText);
        } catch (e) { /* abaikan */ }
      }
    };
    for (const sheet of document.styleSheets) { try { walk(sheet.cssRules); } catch (e) { /* stylesheet lintas-domain */ } }
  }
  function closestAny(el, list) {
    for (let i = 0; i < list.length; i++) { try { if (el.closest(list[i])) return true; } catch (e) { /* selector tidak valid */ } }
    return false;
  }
  function kindOf(el) {
    if (!el || el.nodeType !== 1) return "";
    if (el.closest(TEXT)) return "text";
    if (el.closest(NO) || closestAny(el, sel.no)) return "no";
    if (closestAny(el, sel.aim) || el.closest("canvas")) return "aim";
    if (closestAny(el, sel.grab)) return "grab";
    if (el.closest(LINK) || closestAny(el, sel.pointer)) return "link";
    return "";
  }

  /* ----- partikel (jejak + ledakan klik) ----- */
  function spawn(x, y, n, burst) {
    const g = GLYPH[shape] || "dot";
    for (let i = 0; i < n; i++) {
      if (parts.length >= CFG.maxParticles) parts.shift();
      const a = Math.random() * 6.283, sp = burst ? 1.6 + Math.random() * 3 : Math.random() * .6;
      parts.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (burst ? 0 : .15), grav: burst ? .04 : -.005,
        life: 1, decay: burst ? .032 + Math.random() * .02 : .02 + Math.random() * .02,
        s: burst ? 2.4 + Math.random() * 2.6 : 1.8 + Math.random() * 2.6,
        r: Math.random() * 6.283, vr: (Math.random() - .5) * .2, c: Math.random() < .35 ? col2 : col, g
      });
    }
    if (burst) parts.push({ x, y, vx: 0, vy: 0, grav: 0, life: 1, decay: .045, s: 1, r: 0, vr: 0, c: col2, g: "wave" });
    dirty = true;
  }
  function drawPart(p) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
    ctx.fillStyle = ctx.strokeStyle = p.c;
    if (p.g === "wave") {
      ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(p.x, p.y, 8 + (1 - p.life) * 34, 0, 6.283); ctx.stroke(); return;
    }
    const s = p.s * (.4 + .6 * p.life);
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    if (p.g === "spark") {
      ctx.beginPath(); ctx.moveTo(0, -s * 1.9);
      ctx.quadraticCurveTo(0, 0, s * 1.9, 0); ctx.quadraticCurveTo(0, 0, 0, s * 1.9);
      ctx.quadraticCurveTo(0, 0, -s * 1.9, 0); ctx.quadraticCurveTo(0, 0, 0, -s * 1.9); ctx.fill();
    } else if (p.g === "bit") {
      ctx.font = "700 " + Math.round(8 + s * 1.6) + "px ui-monospace, Menlo, Consolas, monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(Math.random() < 0.5 ? "0" : "1", 0, 0);
    } else if (p.g === "plus") {
      ctx.fillRect(-s * 1.5, -s * .28, s * 3, s * .56); ctx.fillRect(-s * .28, -s * 1.5, s * .56, s * 3);
    } else if (p.g === "slash") {
      ctx.lineWidth = Math.max(1, s * .45); ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-s * 1.8, 0); ctx.lineTo(s * 1.8, 0); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(0, 0, s * .7, 0, 6.283); ctx.fill();
    }
    ctx.restore();
  }

  /* ----- loop animasi: hanya jalan selama ada gerakan / partikel ----- */
  function frame() {
    raf = 0;
    const k = reduce.matches ? 1 : CFG.ringLag;
    rx += (mx - rx) * k; ry += (my - ry) * k;
    ringPos.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
    if (parts.length || dirty) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.shadowColor = col; ctx.shadowBlur = 8;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy; p.vx *= .97; p.vy = p.vy * .97 + p.grav; p.r += p.vr; p.life -= p.decay;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        drawPart(p);
      }
      ctx.globalAlpha = 1;
      dirty = parts.length > 0;
    }
    if (Math.abs(mx - rx) > .1 || Math.abs(my - ry) > .1 || parts.length) raf = requestAnimationFrame(frame);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  /* ----- tema: bentuk + warna ----- */
  function theme() {
    shape = root.dataset.hacker === "on" ? "hack" : (SHAPES[root.dataset.bleach || ""] || "star");
    head.dataset.s = shape;
    const cs = getComputedStyle(root);
    col = cs.getPropertyValue("--sc-c").trim() || col;
    col2 = cs.getPropertyValue("--sc-c2").trim() || col2;
  }

  function setState(k) {
    head.dataset.st = k; ring.dataset.st = k;
    headPos.classList.toggle("is-text", k === "text");
    ringPos.classList.toggle("is-text", k === "text");
  }
  const show = () => { if (shown) return; shown = true; headPos.classList.add("is-show"); ringPos.classList.add("is-show"); };
  const hide = () => { shown = false; headPos.classList.remove("is-show"); ringPos.classList.remove("is-show"); };

  function onMove(e) {
    if (!CFG.enabled) return;
    if (e.pointerType === "touch") { active = false; root.classList.remove("sc-on"); hide(); return; }
    if (!active) {
      active = true; root.classList.add("sc-on");
      if (!scanned) scan();
      rx = lx = mx = e.clientX; ry = ly = my = e.clientY;
    }
    mx = e.clientX; my = e.clientY;
    headPos.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    show();
    if (e.target !== lastEl) { lastEl = e.target; setState(kindOf(lastEl)); }
    if (CFG.trail && !reduce.matches) {
      acc += Math.hypot(mx - lx, my - ly);
      if (acc >= CFG.trailGap) { acc = 0; spawn(mx, my, 1, false); }
    }
    lx = mx; ly = my;
    kick();
  }
  function onDown(e) {
    if (!active || !CFG.enabled || e.pointerType === "touch") return;
    head.classList.add("is-down"); ring.classList.add("is-down");
    if (!reduce.matches) { spawn(e.clientX, e.clientY, 9, true); kick(); }
  }
  function onUp() { head.classList.remove("is-down"); ring.classList.remove("is-down"); }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight;
    cvs.width = Math.round(W * dpr); cvs.height = Math.round(H * dpr);
  }

  function init() {
    const wrap = document.createElement("div");
    wrap.innerHTML =
      '<div class="sc-pos sc-ring-pos" aria-hidden="true"><div class="sc-ring"></div></div>' +
      '<div class="sc-pos sc-head-pos" aria-hidden="true"><div class="sc-head" data-s="star">' + ICONS + "</div></div>";
    ringPos = wrap.children[0]; headPos = wrap.children[1];
    ring = ringPos.firstChild; head = headPos.firstChild;
    cvs = document.createElement("canvas"); cvs.className = "sc-trail"; cvs.setAttribute("aria-hidden", "true");
    document.body.append(cvs, ringPos, headPos);
    ctx = cvs.getContext("2d");
    resize(); theme();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("blur", () => { hide(); onUp(); });
    root.addEventListener("mouseleave", hide);
    new MutationObserver(() => requestAnimationFrame(theme)).observe(root, {
      attributes: true,
      attributeFilter: ["data-bleach", "data-theme", "data-variant", "data-ichigo", "data-sekai", "data-kyoka", "data-uletzt", "data-shiro", "data-zbankai", "data-ibankai", "data-hacker"]
    });
  }
  if (document.body) init(); else document.addEventListener("DOMContentLoaded", init);

  window.siteCursor = {
    CFG,
    off() { CFG.enabled = false; active = false; root.classList.remove("sc-on"); hide(); parts.length = 0; dirty = true; kick(); return "Kursor bawaan browser aktif lagi."; },
    on() { CFG.enabled = true; return "Kursor custom nyala (gerakkan mouse)."; }
  };
})();


/* =========================================================
   PEMBARUAN 38: QUINCY - proyektil panah reishi (Heilig Pfeil) melintas di atas web,
   rune Quincy melayang, gerhana + serpihan kristal (Letzt Stil).
   Console: uryuArrows.fire() | uryuArrows.volley(5) | uryuArrows.off() / on() | uryuArrows.CFG
========================================================= */
(function uryuProjectiles() {
  "use strict";
  const root = document.documentElement;
  const host = document.querySelector(".background-pattern");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const R = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;
  const CFG = { enabled: true, runes: true, gapBiasa: [2.2, 4.4], gapLetzt: [1.1, 2.4], volleyChance: .3, speed: [1500, 2300], maxSparks: 260 };

  /* aksara Quincy: segmen garis pada kisi 4 x 6 (dipakai kanvas & adegan) */
  const GLYPHS = [
    [[0,0,4,0],[0,0,0,6],[0,3,4,3],[0,6,4,6]],
    [[2,0,2,6],[0,2,4,2],[0,4,4,4],[0,6,4,6]],
    [[0,0,4,3],[4,3,0,6],[0,3,3,3]],
    [[0,6,2,0],[2,0,4,6],[1,4,3,4]],
    [[0,0,4,0],[2,0,2,6],[0,6,4,6],[0,3,4,3]],
    [[0,2,4,2],[0,4,4,4],[1,0,1,6],[3,0,3,6]],
    [[0,0,3,3],[3,3,0,6],[4,0,4,6]],
    [[0,1,4,1],[2,1,2,6],[0,4,4,4]]
  ];
  window.uryuRuneSVG = function () {   // dipakai adegan panggung (quincyStageFx)
    const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    const one = (g, oy) => "M" + g.map(s => s[0] + " " + (s[1] + oy) + "L" + s[2] + " " + (s[3] + oy)).join("M");
    return '<svg viewBox="-1 -1 6 15" fill="none" stroke="currentColor" stroke-width=".95" stroke-linecap="butt"><path d="' + one(pick(), 0) + "M" + one(pick(), 7.5).slice(1) + '"/></svg>';
  };
  if (reduce || !document.body) return;

  /* ----- kanvas ----- */
  const fc = document.createElement("canvas");
  fc.id = "uqFront"; fc.setAttribute("aria-hidden", "true");
  fc.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:850;pointer-events:none;opacity:0;transition:opacity .8s ease;mix-blend-mode:screen";
  document.body.appendChild(fc);
  const fx = fc.getContext("2d");
  let bc = null, bx = null;
  if (host) {
    bc = document.createElement("canvas");
    bc.id = "uqBack"; bc.setAttribute("aria-hidden", "true");
    bc.style.cssText = "position:absolute;z-index:1;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease";
    host.appendChild(bc); bx = bc.getContext("2d");
  }

  const on = () => root.dataset.bleach === "uryu" && !document.hidden;
  const LZ = () => root.dataset.uletzt === "on";
  let W = 0, H = 0, raf = 0, last = 0, t = 0, nextArrow = .9, nextRune = 1.5, ecl = 0, prevLz = null, fDirty = false, bDirty = false;
  let arrows = [], sparks = [], runes = [], shards = [];

  const shard = init => ({ x: R(0, W), y: init ? R(0, H) : H + 40, vx: R(6, 18), vy: -R(14, 38), rot: R(0, TAU), vr: R(-.5, .5), l: R(14, 34), wd: R(5, 10), ph: R(0, TAU) });
  function size() {
    const d = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth; H = window.innerHeight;
    fc.width = Math.round(W * d); fc.height = Math.round(H * d); fx.setTransform(d, 0, 0, d, 0, 0);
    if (bc) { bc.width = Math.round(W * d); bc.height = Math.round(H * d); bx.setTransform(d, 0, 0, d, 0, 0); }
    shards = Array.from({ length: 14 }, () => shard(true));
  }

  /* ----- panah ----- */
  function pushOut(x, y, dx, dy) {   // mundurkan titik sampai tepat di luar layar
    let n = 0;
    while (x > -90 && x < W + 90 && y > -90 && y < H + 90 && n++ < 80) { x -= dx * 60; y -= dy * 60; }
    return [x, y];
  }
  function volley(n, fan) {
    const lz = LZ();
    n = n || Math.max(1, Math.round(lz ? R(3, 6) : R(2, 4)));
    const ltr = Math.random() < .5, diag = Math.random() < .3;
    let ang = diag ? R(.35, 1.0) * (Math.random() < .5 ? 1 : -1) : R(-.28, .28);
    if (!ltr) ang = Math.PI - ang;
    const cxp = R(.2, .8) * W, cyp = R(.12, .88) * H, gap = lz ? 38 : 30;
    for (let i = 0; i < n; i++) {
      const o = i - (n - 1) / 2, a = ang + (fan ? o * .07 : 0), dx = Math.cos(a), dy = Math.sin(a);
      const p = pushOut(cxp - Math.sin(ang) * o * gap, cyp + Math.cos(ang) * o * gap, dx, dy);
      arrows.push({
        x: p[0], y: p[1], dx, dy, sp: R(CFG.speed[0], CFG.speed[1]) * (lz ? 1.15 : 1), len: lz ? R(280, 440) : R(200, 340),
        w: lz ? 2.3 : 1.8, s: lz ? 1.3 : 1, delay: i * R(.04, .1), age: 0, acc: 0, c: lz ? "225,248,255" : "127,220,255"
      });
    }
  }
  function spark(x, y, lz) {
    if (sparks.length >= CFG.maxSparks) return;
    sparks.push({ x, y, vx: R(-26, 26), vy: R(-26, 26), l: 1, dl: R(1.1, 2), s: R(1.2, 3.2), star: Math.random() < .4, c: lz ? "255,255,255" : (Math.random() < .5 ? "200,240,255" : "127,220,255") });
    fDirty = true;
  }
  function drawArrow(a) {
    const tx = a.x - a.dx * a.len, ty = a.y - a.dy * a.len;
    fx.lineCap = "round";
    const g = fx.createLinearGradient(tx, ty, a.x, a.y);
    g.addColorStop(0, "rgba(" + a.c + ",0)"); g.addColorStop(.75, "rgba(" + a.c + ",.55)"); g.addColorStop(1, "rgba(" + a.c + ",.95)");
    fx.strokeStyle = "rgba(" + a.c + ",.14)"; fx.lineWidth = a.w * 7; fx.beginPath(); fx.moveTo(tx, ty); fx.lineTo(a.x, a.y); fx.stroke();
    fx.strokeStyle = g; fx.lineWidth = a.w * 2.4; fx.beginPath(); fx.moveTo(tx, ty); fx.lineTo(a.x, a.y); fx.stroke();
    const g2 = fx.createLinearGradient(tx, ty, a.x, a.y);
    g2.addColorStop(0, "rgba(255,255,255,0)"); g2.addColorStop(1, "rgba(255,255,255,1)");
    fx.strokeStyle = g2; fx.lineWidth = a.w * .8; fx.beginPath(); fx.moveTo(tx, ty); fx.lineTo(a.x, a.y); fx.stroke();
    fx.save(); fx.translate(a.x, a.y); fx.rotate(Math.atan2(a.dy, a.dx)); fx.scale(a.s, a.s);
    fx.shadowColor = "rgba(" + a.c + ",1)"; fx.shadowBlur = 16;
    fx.fillStyle = "rgba(" + a.c + ",.8)";   // sirip reishi
    fx.beginPath(); fx.moveTo(-5, 0); fx.lineTo(-18, -8); fx.lineTo(-13, 0); fx.lineTo(-18, 8); fx.closePath(); fx.fill();
    fx.fillStyle = "#fff";                    // mata panah
    fx.beginPath(); fx.moveTo(20, 0); fx.lineTo(-3, -6.5); fx.lineTo(1, 0); fx.lineTo(-3, 6.5); fx.closePath(); fx.fill();
    fx.restore();
  }
  function stepFront(dt) {
    const lz = LZ();
    if (CFG.enabled && on()) {
      nextArrow -= dt;
      if (nextArrow <= 0) {
        if (Math.random() < CFG.volleyChance) volley(0, lz); else volley(1);
        const gp = lz ? CFG.gapLetzt : CFG.gapBiasa; nextArrow = R(gp[0], gp[1]);
      }
    }
    for (let i = arrows.length - 1; i >= 0; i--) {
      const a = arrows[i];
      if (a.delay > 0) { a.delay -= dt; continue; }
      a.x += a.dx * a.sp * dt; a.y += a.dy * a.sp * dt; a.age += dt; a.acc += a.sp * dt;
      while (a.acc > 15) { a.acc -= 15; const k = R(0, a.len * .85); spark(a.x - a.dx * k, a.y - a.dy * k, lz); }
      const m = a.len + 160;
      if (a.age > .25 && (a.x < -m || a.x > W + m || a.y < -m || a.y > H + m)) arrows.splice(i, 1);
    }
    if (!arrows.length && !sparks.length) { if (fDirty) { fx.clearRect(0, 0, W, H); fDirty = false; } return; }
    fx.clearRect(0, 0, W, H); fDirty = true;
    fx.globalCompositeOperation = "lighter";
    for (const a of arrows) if (a.delay <= 0) drawArrow(a);
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .96; s.vy *= .96; s.l -= s.dl * dt;
      if (s.l <= 0) { sparks.splice(i, 1); continue; }
      fx.fillStyle = fx.strokeStyle = "rgba(" + s.c + "," + (s.l * .9) + ")";
      if (s.star) {
        const r = s.s * (1 + s.l) * 1.6;
        fx.lineWidth = 1; fx.beginPath(); fx.moveTo(s.x - r, s.y); fx.lineTo(s.x + r, s.y); fx.moveTo(s.x, s.y - r); fx.lineTo(s.x, s.y + r); fx.stroke();
      } else { fx.beginPath(); fx.arc(s.x, s.y, s.s * s.l, 0, TAU); fx.fill(); }
    }
    fx.globalCompositeOperation = "source-over";
  }

  /* ----- latar: rune, gerhana, serpihan kristal ----- */
  function newRune() {
    const lz = LZ(), n = (Math.random() * 2 | 0) + 2;
    return {
      x: R(.05, .95) * W, y: R(.12, .88) * H, rot: R(-.5, .5), sc: R(5, 8.5), vx: R(-7, 7), vy: R(-6, 4), age: 0, life: R(7, 11),
      max: lz ? .5 : .4, g: Array.from({ length: n }, () => (Math.random() * GLYPHS.length) | 0),
      sp: Array.from({ length: 7 }, () => ({ gi: (Math.random() * n) | 0, si: (Math.random() * 3) | 0, u: Math.random(), ph: R(0, TAU) }))
    };
  }
  function glyphPath(g, ox, oy, sc) {
    bx.beginPath();
    for (const s of GLYPHS[g]) { bx.moveTo(ox + s[0] * sc, oy + s[1] * sc); bx.lineTo(ox + s[2] * sc, oy + s[3] * sc); }
  }
  function drawRune(r, a) {
    bx.save(); bx.translate(r.x, r.y); bx.rotate(r.rot + Math.sin(t * .3 + r.x) * .05);
    bx.lineJoin = "miter"; bx.lineCap = "butt"; bx.lineWidth = r.sc * 1.0;
    r.g.forEach((g, i) => {
      const ox = i * r.sc * 5.4;
      for (let k = 5; k >= 1; k--) { bx.strokeStyle = "rgba(20,80,160," + (a * .55) + ")"; glyphPath(g, ox + k * r.sc * .1, k * r.sc * .1, r.sc); bx.stroke(); }   // ketebalan 3D
      const gr = bx.createLinearGradient(0, 0, 0, r.sc * 6);
      gr.addColorStop(0, "rgba(225,248,255," + a + ")"); gr.addColorStop(1, "rgba(63,168,255," + a + ")");
      bx.shadowColor = "rgba(90,190,255," + a + ")"; bx.shadowBlur = 12; bx.strokeStyle = gr;
      glyphPath(g, ox, 0, r.sc); bx.stroke(); bx.shadowBlur = 0;
    });
    bx.strokeStyle = "#fff"; bx.lineWidth = 1;
    for (const p of r.sp) {   // kilau bintang di dalam aksara
      const g = r.g[p.gi], sg = GLYPHS[g][Math.min(p.si, GLYPHS[g].length - 1)], tw = Math.max(0, Math.sin(t * 3 + p.ph));
      const x = p.gi * r.sc * 5.4 + (sg[0] + (sg[2] - sg[0]) * p.u) * r.sc, y = (sg[1] + (sg[3] - sg[1]) * p.u) * r.sc, q = 1.5 + tw * 3;
      bx.globalAlpha = a * tw * 1.8; bx.beginPath(); bx.moveTo(x - q, y); bx.lineTo(x + q, y); bx.moveTo(x, y - q); bx.lineTo(x, y + q); bx.stroke();
    }
    bx.restore(); bx.globalAlpha = 1;
  }
  function drawEclipse(e) {
    const x = W * .78, y = H * .34, r = Math.min(W, H) * .075, cr = r * 3.6, pulse = .5 + .5 * Math.sin(t * 1.1);
    bx.globalCompositeOperation = "lighter";
    const g = bx.createRadialGradient(x, y, r * .9, x, y, cr);
    g.addColorStop(0, "rgba(235,250,255," + ((.5 + .1 * pulse) * e) + ")"); g.addColorStop(.28, "rgba(150,220,255," + (.2 * e) + ")"); g.addColorStop(1, "rgba(63,168,255,0)");
    bx.fillStyle = g; bx.beginPath(); bx.arc(x, y, cr, 0, TAU); bx.fill();
    bx.lineCap = "round";
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * TAU + t * .05, l = r * (1.9 + .9 * Math.sin(t * 1.3 + i * 2.1));
      const lg = bx.createLinearGradient(x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * l, y + Math.sin(a) * l);
      lg.addColorStop(0, "rgba(235,250,255," + (.28 * e) + ")"); lg.addColorStop(1, "rgba(235,250,255,0)");
      bx.strokeStyle = lg; bx.lineWidth = 2; bx.beginPath(); bx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); bx.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); bx.stroke();
    }
    bx.globalCompositeOperation = "source-over";
    bx.fillStyle = "rgba(2,6,12," + (.97 * e) + ")"; bx.beginPath(); bx.arc(x, y, r, 0, TAU); bx.fill();
    bx.strokeStyle = "rgba(235,250,255," + (.75 * e) + ")"; bx.lineWidth = 2; bx.beginPath(); bx.arc(x, y, r * 1.015, 0, TAU); bx.stroke();
  }
  function drawShards(e) {
    bx.globalCompositeOperation = "lighter";
    for (let i = 0; i < shards.length; i++) {
      const s = shards[i];
      s.x += s.vx * .016; s.y += s.vy * .016; s.rot += s.vr * .016;
      if (s.y < -50 || s.x > W + 50) { shards[i] = shard(false); shards[i].x = R(0, W * .9); continue; }
      const tw = .5 + .5 * Math.sin(t * 2 + s.ph);
      bx.save(); bx.translate(s.x, s.y); bx.rotate(s.rot);
      const g = bx.createLinearGradient(0, -s.l, 0, s.l);
      g.addColorStop(0, "rgba(255,255,255," + (.55 * e) + ")"); g.addColorStop(1, "rgba(90,190,255," + (.12 * e) + ")");
      bx.fillStyle = g; bx.strokeStyle = "rgba(220,248,255," + (.55 * e) + ")"; bx.lineWidth = 1;
      bx.beginPath(); bx.moveTo(0, -s.l); bx.lineTo(s.wd, -s.l * .1); bx.lineTo(0, s.l * .45); bx.lineTo(-s.wd, -s.l * .1); bx.closePath(); bx.fill(); bx.stroke();
      bx.fillStyle = "rgba(255,255,255," + (tw * .9 * e) + ")"; bx.beginPath(); bx.arc(0, -s.l * .1, 1.4 + tw, 0, TAU); bx.fill();
      bx.restore();
    }
    bx.globalCompositeOperation = "source-over";
  }
  function stepBack(dt) {
    if (!bx) return;
    const lz = LZ(), want = on() && lz ? 1 : 0;
    ecl += (want - ecl) * Math.min(1, dt * 1.4);
    if (CFG.runes && on()) {
      nextRune -= dt;
      if (nextRune <= 0 && runes.length < (lz ? 4 : 3)) { runes.push(newRune()); nextRune = R(2.6, 5.2); }
    }
    if (!runes.length && ecl < .01) { if (bDirty) { bx.clearRect(0, 0, W, H); bDirty = false; } return; }
    bx.clearRect(0, 0, W, H); bDirty = true;
    if (ecl > .01) { drawEclipse(ecl); drawShards(ecl); }
    for (let i = runes.length - 1; i >= 0; i--) {
      const r = runes[i];
      r.age += dt; r.x += r.vx * dt; r.y += r.vy * dt;
      if (r.age > r.life) { runes.splice(i, 1); continue; }
      const a = r.max * Math.min(1, r.age / 1.3, (r.life - r.age) / 1.6);
      if (a > .01) drawRune(r, a);
    }
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts; t += dt;
    stepFront(dt); stepBack(dt);
  }
  function sync() {
    if (on()) {
      fc.style.opacity = "1"; if (bc) bc.style.opacity = "1";
      const lz = LZ();
      if (!raf) { size(); last = performance.now(); nextArrow = .8; raf = requestAnimationFrame(frame); prevLz = lz; }
      else if (prevLz !== null && prevLz !== lz) { volley(lz ? 6 : 4, true); prevLz = lz; }   // ganti mode = rentetan panah
    } else {
      fc.style.opacity = "0"; if (bc) bc.style.opacity = "0";
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      prevLz = null; arrows = []; sparks = []; runes = [];
      setTimeout(() => { if (!on()) { fx.clearRect(0, 0, W, H); if (bx) bx.clearRect(0, 0, W, H); ecl = 0; fDirty = bDirty = false; } }, 1700);
    }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-uletzt"] });
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("resize", () => { if (raf) size(); });
  sync();

  window.uryuArrows = {
    CFG,
    fire(n) { if (on()) volley(n || 1); return on() ? "Panah melesat." : "Masuk mode Uryu dulu."; },
    volley(n) { if (on()) volley(n || 5, true); return on() ? "Rentetan panah!" : "Masuk mode Uryu dulu."; },
    off() { CFG.enabled = false; return "Panah otomatis dimatikan."; },
    on() { CFG.enabled = true; return "Panah otomatis menyala."; }
  };
})();


/* =========================================================
   PEMBARUAN 45: ICHIBĒ HYŌSUBE - DIGAMBAR ULANG: gaya tinta asli + MODE LUKIS (kuas raksasa) yang bisa dicoret-coret
   SHIKAI  = tinta abu-abu (wash) di atas hitam + GARIS MERAH tipis agak bergeser (seperti ilustrasi aslinya)
   BANKAI  = washi putih bergaris hitam tebal + bayangan merah muda berbintik (seperti halaman berwarna Ichimonji)
   Latar: sapuan kuas kering, enso, cipratan, serpihan, segel hanko. Adegan: kuas melukis enso + goresan "ichi" lalu hanko dicap.
   LUKIS: tombol kuas di kiri bawah. Kuas besar (tebal-tipis ikut kecepatan, ujung kering, menetes) atau pena coret tipis.
          Ganti Shikai <-> Bankai = lukisanmu ikut berganti gaya. Tombol: alat, ukuran, urungkan, hapus, simpan PNG.
          Pintasan: Esc keluar | Ctrl+Z urungkan | [ ] ukuran | roda mouse ukuran.
   Console: ichibeInk.draw(true/false) | undo() | clear() | save() | splash() | enso() | off() | on()
   ========================================================= */
(function ichibeInk() {
  "use strict";
  const root = document.documentElement;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TAU = Math.PI * 2;
  const R = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const hash = (a, b) => { let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  const isOn = () => root.dataset.bleach === "ichibe";
  const gold = () => root.dataset.ibankai === "on";
  let enabled = true;

  /* ----- gaya (Shikai = abu + garis merah; Bankai = washi + garis hitam) ----- */
  function STY(g) {
    if (g === undefined) g = gold();
    return g ? {
      gold: true, fillA: "#fbf5ea", fillB: "#d9cbb9", edge: "#070204", edgeW: 3.2, hair: null, hairW: 0,
      shadow: "rgba(224,72,90,.6)", wash: "rgba(160,60,72,.18)", washL: "rgba(255,255,255,.4)", bA: "rgba(255,255,255,.5)", bB: "rgba(120,50,58,.24)",
      acc: "224,72,90", paper: "246,239,228", ink: "7,2,4", bg: "#12060a", thin: "#fbf5ea", blob: "#f6efe4",
      shard: ["#fbf5ea", "#e0485a", "#070204", "#ffb9b0"]
    } : {
      gold: false, fillA: "#c6c6cd", fillB: "#8a8a95", edge: null, edgeW: 0, hair: "rgba(225,29,42,.96)", hairW: 1.5,
      shadow: null, wash: "rgba(14,14,20,.46)", washL: "rgba(240,240,246,.3)", bA: "rgba(244,244,248,.3)", bB: "rgba(16,16,20,.3)",
      acc: "225,29,42", paper: "236,235,234", ink: "8,8,10", bg: "#08080a", thin: "#dcdce1", blob: "#a4a4ad",
      shard: ["#f2f2f4", "#8d8d96", "#050506", "#cfcfd5"]
    };
  }

  /* ----- pita kuas: tepi kiri/kanan dari titik berlebar ----- */
  function edges(pts) {
    const n = pts.length, L = [], Rr = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
      let dx = b.x - a.x, dy = b.y - a.y; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      const w = pts[i].w / 2; L.push([pts[i].x - dy * w, pts[i].y + dx * w]); Rr.push([pts[i].x + dy * w, pts[i].y - dx * w]);
    }
    return { L, Rr };
  }
  function ribbonPath(c, L, Rr) {
    c.beginPath(); c.moveTo(L[0][0], L[0][1]);
    for (let i = 1; i < L.length; i++) c.quadraticCurveTo(L[i - 1][0], L[i - 1][1], (L[i - 1][0] + L[i][0]) / 2, (L[i - 1][1] + L[i][1]) / 2);
    const n = Rr.length - 1;
    c.lineTo(L[L.length - 1][0], L[L.length - 1][1]); c.lineTo(Rr[n][0], Rr[n][1]);
    for (let i = n - 1; i >= 0; i--) c.quadraticCurveTo(Rr[i + 1][0], Rr[i + 1][1], (Rr[i + 1][0] + Rr[i][0]) / 2, (Rr[i + 1][1] + Rr[i][1]) / 2);
    c.closePath();
  }
  function paint(c, pts, S, o) {
    o = o || {}; const n = pts.length; if (n < 2) return;
    const al = o.alpha == null ? 1 : o.alpha, seed = o.seed || 1, thin = !!o.thin, dry = o.dry || 0;
    const { L, Rr } = edges(pts);
    let sw = 0; for (let i = 0; i < n; i++) sw += pts[i].w; const avgW = sw / n;
    c.save(); c.globalAlpha = al; c.lineJoin = "round"; c.lineCap = "round";
    if (S.shadow && !thin) { c.save(); c.translate(4, 5); ribbonPath(c, L, Rr); c.fillStyle = S.shadow; c.fill(); c.restore(); }
    ribbonPath(c, L, Rr);
    if (thin) c.fillStyle = S.thin;
    else { const g = c.createLinearGradient(pts[0].x, pts[0].y, pts[n - 1].x, pts[n - 1].y); g.addColorStop(0, S.fillA); g.addColorStop(1, S.fillB); c.fillStyle = g; }
    c.fill();
    if (!thin && avgW > 7) {
      c.save(); ribbonPath(c, L, Rr); c.clip();
      const step = Math.max(1, Math.floor(n / 12));
      for (let i = 0, q = 0; i < n; i += step, q++) {            // genangan tinta (wash): gelap & terang bergantian
        const p = pts[i], rad = p.w * (.7 + hash(seed, i) * 1.1), ox = (hash(seed, i + 99) - .5) * p.w * .7;
        const gr = c.createRadialGradient(p.x + ox, p.y, 0, p.x + ox, p.y, rad); gr.addColorStop(0, q % 2 ? S.washL : S.wash); gr.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = gr; c.fillRect(p.x + ox - rad, p.y - rad, rad * 2, rad * 2);
      }
      for (let i = 0; i < n; i++) for (let k = 0; k < 2; k++) {   // butiran tinta
        const f = hash(seed * 3 + k, i), x = L[i][0] + (Rr[i][0] - L[i][0]) * f, y = L[i][1] + (Rr[i][1] - L[i][1]) * f;
        c.fillStyle = hash(seed + 5, i * 2 + k) > .5 ? S.bB : S.bA; c.fillRect(x, y, 1.4, 1.4);
      }
      const B = clamp(Math.round(avgW / 7), 3, 6);  // bulu kuas: garis putus-putus makin kering di ujung
      c.lineWidth = clamp(avgW / B * .22, .8, 2.2);
      for (let b = 0; b < B; b++) {
        const t = -1 + 2 * (b + .5) / B, f0 = (t + 1) / 2; c.strokeStyle = b % 2 ? S.bA : S.bB; c.beginPath(); let on = false;
        for (let i = 0; i < n; i++) {
          const f = clamp(f0 + Math.sin(i * .21 + b * 2.7 + seed) * .07, .02, .98), x = L[i][0] + (Rr[i][0] - L[i][0]) * f, y = L[i][1] + (Rr[i][1] - L[i][1]) * f;
          const dr = (pts[i].v || 0) * .5 + (i / (n - 1)) * dry + Math.abs(t) * .22;
          if (hash(seed + b * 7, i >> 2) < Math.max(0, dr - .32) * 1.3) { on = false; continue; }
          if (!on) { c.moveTo(x, y); on = true; } else c.lineTo(x, y);
        }
        c.stroke();
      }
      c.restore();
    }
    if (S.edgeW) { ribbonPath(c, L, Rr); c.strokeStyle = S.edge; c.lineWidth = thin ? S.edgeW * .5 : S.edgeW; c.stroke(); }
    if (S.hair) { c.save(); c.translate(1.8, -1.5); ribbonPath(c, L, Rr); c.strokeStyle = S.hair; c.lineWidth = thin ? 1.1 : S.hairW; c.stroke(); c.restore(); }
    c.restore();
  }

  /* ----- bentuk lain: gumpalan tinta, cipratan, serpihan, hanko ----- */
  function blobPath(c, x, y, r, seed) {
    const k = 18; c.beginPath();
    for (let i = 0; i <= k; i++) {
      const a = i / k * TAU, rr = r * (1 + .16 * Math.sin(3 * a + seed) + .11 * Math.sin(5 * a + seed * 2.1) + (hash(seed, i % k) - .5) * .16);
      const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr; if (i) c.lineTo(px, py); else c.moveTo(px, py);
    }
    c.closePath();
  }
  function paintBlob(c, x, y, r, S, seed, alpha) {
    c.save(); c.globalAlpha = alpha; if (r < 7) { c.beginPath(); c.arc(x, y, r, 0, TAU); } else blobPath(c, x, y, r, seed); c.fillStyle = S.blob; c.fill();
    if (S.edgeW) { c.strokeStyle = S.edge; c.lineWidth = Math.max(1.2, S.edgeW * .8); c.stroke(); }
    if (S.hair) { c.translate(1.6, -1.3); if (r < 7) { c.beginPath(); c.arc(x, y, r, 0, TAU); } else blobPath(c, x, y, r, seed); c.strokeStyle = S.hair; c.lineWidth = 1.2; c.stroke(); }
    c.restore();
  }
  function makeSplash(x, y, s) {
    s = s || 1; const d = [], n = Math.round(R(8, 14)), seed = Math.floor(R(1, 9999));
    for (let i = 0; i < n; i++) { const a = R(0, TAU), dist = R(14, 80) * s * (i % 3 ? 1 : 1.5); d.push({ x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: Math.max(1.2, R(1.5, 6.5) * s * (1.25 - dist / 150)), a }); }
    return { x, y, r: R(13, 24) * s, d, seed, t: 0 };
  }
  function paintSplash(c, sp, S, g, alpha) {
    c.save(); c.globalAlpha = alpha; c.lineCap = "round";
    sp.d.forEach((d, i) => {                                   // garis cipratan menyebar dari pusat
      if (i % 2) return; const len = Math.hypot(d.x, d.y) * g;
      c.beginPath(); c.moveTo(sp.x + Math.cos(d.a) * sp.r * .6 * g, sp.y + Math.sin(d.a) * sp.r * .6 * g); c.lineTo(sp.x + Math.cos(d.a) * len * .75, sp.y + Math.sin(d.a) * len * .75);
      c.strokeStyle = S.blob; c.lineWidth = Math.max(1, d.r * .8); c.stroke();
    });
    c.restore();
    paintBlob(c, sp.x, sp.y, sp.r * g, S, sp.seed, alpha);
    sp.d.forEach((d, i) => paintBlob(c, sp.x + d.x * g, sp.y + d.y * g, d.r, S, sp.seed + i + 3, alpha));
  }
  function makeShard(x, y, sz) { return { x, y, l: sz * R(.7, 1.3), w: sz * R(.14, .3), r: R(0, TAU), vr: R(-1.2, 1.2), vx: 0, vy: 0, col: Math.floor(R(0, 4)) }; }
  function paintShard(c, s, S, alpha) {
    c.save(); c.translate(s.x, s.y); c.rotate(s.r); c.globalAlpha = alpha; c.beginPath();
    c.moveTo(0, -s.l); c.lineTo(s.w, s.l * .1); c.lineTo(s.w * .2, s.l); c.lineTo(-s.w, s.l * .25); c.closePath();
    c.fillStyle = S.shard[s.col % S.shard.length]; c.fill();
    if (S.hair) { c.strokeStyle = S.hair; c.lineWidth = 1; c.stroke(); } else if (S.edgeW) { c.strokeStyle = S.edge; c.lineWidth = 1.4; c.stroke(); }
    c.restore();
  }
  function paintHanko(c, x, y, s, S, alpha, rot, seed) {
    c.save(); c.translate(x, y); c.rotate(rot || 0); c.globalAlpha = alpha; const h = s / 2, P = [[-h, -h], [h, -h], [h, h], [-h, h]], N = 6;
    c.beginPath();
    for (let e = 0; e < 4; e++) { const a = P[e], b = P[(e + 1) % 4]; for (let k = 0; k < N; k++) { const t = k / N, px = a[0] + (b[0] - a[0]) * t + (hash(seed, e * 10 + k) - .5) * s * .04, py = a[1] + (b[1] - a[1]) * t + (hash(seed, e * 10 + k + 5) - .5) * s * .04; if (!e && !k) c.moveTo(px, py); else c.lineTo(px, py); } }
    c.closePath(); c.fillStyle = "rgb(" + S.acc + ")"; c.fill();
    c.strokeStyle = "rgb(" + S.paper + ")"; c.lineCap = "round"; c.lineWidth = Math.max(2, s * .06);
    c.strokeRect(-h * .74, -h * .74, s * .74, s * .74);
    c.beginPath(); c.moveTo(-h * .42, -h * .3); c.lineTo(h * .1, h * .42); c.moveTo(h * .38, -h * .38); c.lineTo(-h * .04, h * .06); c.stroke();
    c.fillStyle = "rgb(" + S.paper + ")"; c.beginPath(); c.arc(h * .36, h * .36, Math.max(2, s * .05), 0, TAU); c.fill();
    c.restore();
  }

  /* ----- pembuat jalur ----- */
  function sweepPts(x, y, len, ang, w, n) {
    const mx = x + Math.cos(ang) * len * .5 + R(-1, 1) * len * .14, my = y + Math.sin(ang) * len * .5 + R(-1, 1) * len * .14, ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len, pts = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), u = 1 - t;
      pts.push({ x: u * u * x + 2 * u * t * mx + t * t * ex, y: u * u * y + 2 * u * t * my + t * t * ey, w: Math.max(.8, w * Math.pow(Math.sin(Math.PI * clamp(t * .92 + .04, 0, 1)), .55) * (1 - .22 * t)), v: t * .7 });
    }
    return pts;
  }
  function ensoPts(x, y, r, a0, w, n, sweep) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), a = a0 + t * sweep, rr = r * (1 - .05 * t) + Math.sin(t * 5) * r * .012;
      pts.push({ x: x + Math.cos(a) * rr, y: y + Math.sin(a) * rr, w: Math.max(.8, w * (t < .12 ? .45 + t / .12 * .55 : 1) * (1 - .82 * Math.pow(t, 3))), v: t * .8 });
    }
    return pts;
  }

  /* =====================================================
     1) LATAR KANVAS (di belakang konten)
     ===================================================== */
  const host = document.querySelector(".background-pattern") || document.body;
  const cv = document.createElement("canvas"); cv.className = "ib-canvas"; cv.setAttribute("aria-hidden", "true"); host.appendChild(cv);
  const cx = cv.getContext("2d");
  let W = 0, H = 0, dpr = 1, raf = 0, last = 0, nextAt = 0;
  const fx = [];
  const liveBg = () => isOn() && !document.hidden && enabled;
  function sizeBg() { dpr = Math.min(2, window.devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  sizeBg();

  function addSweep(x, y, len, ang, w, life) { fx.push({ k: "r", pts: sweepPts(x, y, len, ang, w, 56), seed: Math.floor(R(1, 9999)), dry: .9, t: 0, dur: R(.9, 1.4), life: life || 4.6 }); }
  function addEnso(x, y, r) { const w = r * .15; fx.push({ k: "r", pts: ensoPts(x, y, r, R(0, TAU), w, 70, 5.6), seed: Math.floor(R(1, 9999)), dry: .7, t: 0, dur: 1.9, life: 6.4, drop: { x: x + Math.cos(0) * r, y, r: w * .5 } }); }
  function addHanko(x, y, s) { fx.push({ k: "h", x, y, s, rot: R(-.12, .12), seed: Math.floor(R(1, 9999)), t: 0, life: 6 }); }
  function addShards(x, y, n, sz) { const a = []; for (let i = 0; i < n; i++) { const s = makeShard(x + R(-1, 1) * sz * 2.6, y + R(-1, 1) * sz * 2, sz * R(.5, 1.2)); s.vx = R(-6, 6); s.vy = R(-9, 3); a.push(s); } fx.push({ k: "k", a, t: 0, life: 6.5 }); }
  function addWash(x, y, r) { fx.push({ k: "w", x, y, r, t: 0, life: 7 }); }

  function drawBg(dt) {
    const S = STY(), AM = S.gold ? .36 : .4;
    cx.clearRect(0, 0, W, H);
    for (let i = fx.length - 1; i >= 0; i--) {
      const f = fx[i]; f.t += dt;
      if (f.t > f.life) { fx.splice(i, 1); continue; }
      const u = f.t / f.life, fade = u < .62 ? 1 : 1 - (u - .62) / .38;
      if (f.k === "r") {
        const p = clamp(f.t / f.dur, 0, 1), e = 1 - Math.pow(1 - p, 3), k = Math.max(2, Math.ceil(f.pts.length * e));
        paint(cx, f.pts.slice(0, k), S, { seed: f.seed, dry: f.dry, alpha: fade * AM });
        if (f.drop && p > .02) paintBlob(cx, f.drop.x, f.drop.y, f.drop.r, S, f.seed + 5, fade * AM);
      } else if (f.k === "i") {
        const g = 1 - Math.pow(1 - Math.min(1, f.sp.t / .5), 3); f.sp.t += dt; paintSplash(cx, f.sp, S, g, fade * AM);
      } else if (f.k === "h") {
        const g = f.t < .25 ? 1.5 - f.t * 2 : 1; paintHanko(cx, f.x, f.y, f.s * g, S, fade * AM * Math.min(1, f.t * 5), f.rot, f.seed);
      } else if (f.k === "k") {
        f.a.forEach(s => { s.x += s.vx * dt * 8; s.y += s.vy * dt * 8; s.vy += dt * 3; s.vx *= .985; s.r += s.vr * dt; paintShard(cx, s, S, fade * AM * Math.min(1, f.t * 3)); });
      } else if (f.k === "w") {
        const g = Math.min(1, f.t / 2.2), rad = f.r * (.6 + .4 * g);
        for (let j = 0; j < 4; j++) {
          const ox = Math.cos(j * 1.9 + f.x) * rad * .35, oy = Math.sin(j * 2.3 + f.y) * rad * .3, rr = rad * (.55 + j * .1);
          const gr = cx.createRadialGradient(f.x + ox, f.y + oy, 0, f.x + ox, f.y + oy, rr);
          gr.addColorStop(0, S.gold ? "rgba(224,72,90," + (.2 * fade).toFixed(3) + ")" : "rgba(150,150,160," + (.16 * fade).toFixed(3) + ")"); gr.addColorStop(1, "rgba(0,0,0,0)");
          cx.fillStyle = gr; cx.fillRect(f.x + ox - rr, f.y + oy - rr, rr * 2, rr * 2);
        }
      }
    }
  }
  function spawn() {
    const x = R(.08, .92) * W, y = R(.1, .9) * H, r = Math.random();
    if (r < .3) addSweep(x, y, R(160, Math.min(520, W * .7)), R(-.9, .5) + (Math.random() < .5 ? 0 : Math.PI), R(14, 34));
    else if (r < .45) addEnso(x, y, R(70, 150));
    else if (r < .62) fx.push({ k: "i", sp: makeSplash(x, y, R(.9, 1.8)), t: 0, life: 3.8 });
    else if (r < .8) addShards(x, y, Math.round(R(5, 10)), R(14, 30));
    else if (r < .93) addWash(x, y, R(160, 320));
    else addHanko(x, y, R(52, 84));
  }
  function loop(ts) {
    raf = 0; if (!liveBg()) { cx.clearRect(0, 0, W, H); fx.length = 0; return; }
    const dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts;
    nextAt -= dt; if (nextAt <= 0) { spawn(); nextAt = gold() ? R(1.4, 2.6) : R(1.8, 3.4); }
    drawBg(dt); raf = requestAnimationFrame(loop);
  }
  function kick() { if (!reduce && liveBg() && !raf) { last = performance.now(); nextAt = .2; raf = requestAnimationFrame(loop); } }

  /* =====================================================
     2) BUNYI (Web Audio, ikut mati kalau tapSound.on = false)
     ===================================================== */
  let ac = null;
  const okSnd = () => !(window.tapSound && window.tapSound.on === false);
  const A = () => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); return ac; } catch (_) { return null; } };
  function swish(at, dur, vol) {
    const c = A(); if (!c || !okSnd()) return; const t = c.currentTime + at, n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / n);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = b; f.type = "bandpass"; f.Q.value = 1.4;
    f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(500, t + dur); g.gain.value = vol; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
  }
  function thud(at, vol, bright) {
    const c = A(); if (!c || !okSnd()) return; const t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + .5); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + .7); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .75);
    if (bright) [880, 1320, 1760].forEach((fr, i) => { const q = c.createOscillator(), h = c.createGain(); q.type = "triangle"; q.frequency.value = fr; h.gain.setValueAtTime(.0001, t + i * .06); h.gain.exponentialRampToValueAtTime(.09, t + i * .06 + .02); h.gain.exponentialRampToValueAtTime(.0001, t + 1.6); q.connect(h); h.connect(c.destination); q.start(t + i * .06); q.stop(t + 1.7); });
  }
  let scr = null;   // desir kuas yang mengikuti kecepatan tangan
  function scratchStart() {
    const c = A(); if (!c || !okSnd()) return; scratchEnd();
    const n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = b; s.loop = true; f.type = "bandpass"; f.Q.value = .9; f.frequency.value = 1200; g.gain.value = 0;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start(); scr = { s, f, g };
  }
  function scratchMove(v) { if (!scr || !ac) return; const t = ac.currentTime; scr.g.gain.setTargetAtTime(Math.min(.15, .015 + v * .13), t, .03); scr.f.frequency.setTargetAtTime(900 + v * 2800, t, .04); }
  function scratchEnd() { if (!scr) return; const o = scr; scr = null; try { o.g.gain.setTargetAtTime(0, ac.currentTime, .04); o.s.stop(ac.currentTime + .25); } catch (_) {} }

  /* =====================================================
     3) ADEGAN (dipanggil dari runScene): kuas melukis enso + goresan "ichi", hanko dicap di puncak
     ===================================================== */
  function scene(kind, stage) {
    if (!stage) return;
    const old = stage.querySelector(".ib-ink"); if (old) old.remove();
    const c2 = document.createElement("canvas"); c2.className = "ib-ink"; c2.dataset.k = kind; c2.setAttribute("aria-hidden", "true"); stage.appendChild(c2);
    const w = innerWidth, h = innerHeight, d = Math.min(2, window.devicePixelRatio || 1), m = Math.min(w, h);
    c2.width = w * d; c2.height = h * d; const c = c2.getContext("2d"); c.setTransform(d, 0, 0, d, 0, 0);
    const S = STY(kind === "ibankai");
    const items = [
      { at: .25, dur: 1.3, dry: .9, seed: 11, pts: sweepPts(-w * .05, h * .95, w * 1.12, -.62, m * .075, 80) },
      { at: .8, dur: 2.1, dry: .75, seed: 23, pts: ensoPts(w * .5, h * .47, m * .43, -2.35, m * .08, 100, 5.7), drop: true },
      { at: 1.55, dur: .6, dry: .9, seed: 37, pts: sweepPts(w * .14, h * .83, w * .72, -.03, m * .045, 60) },
      { at: 1.75, dur: .5, dry: .9, seed: 41, pts: sweepPts(w * .88, h * .1, w * .3, 2.25, m * .03, 40) }
    ];
    let shards = null, splashes = null, flash = 0, burst = false, ring = -1;
    const T0 = performance.now(); let prev = T0, stop = false;
    swish(.3, .6, .2); swish(.9, 1.4, .13); swish(1.6, .45, .18); swish(1.8, .35, .1);
    thud(2.3, .6, kind === "ibankai"); if (kind === "ibankai") thud(2.42, .35, false);
    function frame(now) {
      if (stop || !c2.isConnected) return;
      const t = reduce ? 9 : (now - T0) / 1000, dt = Math.min(.05, (now - prev) / 1000); prev = now;
      if (t > 7.4) { c2.remove(); return; }
      c.clearRect(0, 0, w, h);
      const fade = t < 5.6 ? 1 : clamp(1 - (t - 5.6) / 1.5, 0, 1);
      items.forEach(it => {
        const p = clamp((t - it.at) / it.dur, 0, 1); if (p <= 0) return; const e = 1 - Math.pow(1 - p, 3);
        paint(c, it.pts.slice(0, Math.max(2, Math.ceil(it.pts.length * e))), S, { seed: it.seed, dry: it.dry, alpha: fade * .95 });
        if (it.drop) paintBlob(c, it.pts[0].x, it.pts[0].y, m * .028, S, 77, fade);
      });
      if (t >= 2.3 && !burst) {
        burst = true; flash = 1; ring = 0;
        shards = []; if (!reduce) for (let i = 0; i < 34; i++) { const s = makeShard(w / 2, h * .47, m * R(.025, .075)), a = R(0, TAU), v = R(160, 620); s.vx = Math.cos(a) * v; s.vy = Math.sin(a) * v; shards.push(s); }
        splashes = []; for (let i = 0; i < 5; i++) { const sp = makeSplash(R(.12, .88) * w, R(.15, .85) * h, R(1.2, 2.2)); sp.t0 = t + i * .06; splashes.push(sp); }
      }
      if (burst) {
        if (ring >= 0 && !reduce) { ring += dt; const rr = ring * m * 1.4; if (rr < m * 1.3) { c.save(); c.strokeStyle = "rgba(" + S.acc + "," + (.8 * (1 - ring / .9)).toFixed(3) + ")"; c.lineWidth = 2.5; c.beginPath(); c.arc(w / 2, h * .47, rr, 0, TAU); c.stroke(); c.restore(); } }
        splashes.forEach(sp => { const g = 1 - Math.pow(1 - clamp((t - sp.t0) / .5, 0, 1), 3); if (g > 0) paintSplash(c, sp, S, g, fade * .95); });
        shards.forEach(s => { s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= .965; s.vy = s.vy * .965 + 90 * dt; s.r += s.vr * dt * 3; paintShard(c, s, S, fade * clamp(1 - (t - 2.3) / 3.2, 0, 1)); });
        const g = t - 2.3 < .26 ? 2.3 - (t - 2.3) * 5 : 1;       // hanko dicap: besar -> pas
        paintHanko(c, w * .8, h * .8, m * .17 * g, S, fade * Math.min(1, (t - 2.3) * 8), -.07, 5);
        if (flash > 0) { c.fillStyle = "rgba(" + (S.gold ? "255,235,230" : "255,255,255") + "," + (flash * .3).toFixed(3) + ")"; c.fillRect(0, 0, w, h); flash = Math.max(0, flash - dt * 3.2); }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    setTimeout(() => { stop = true; c2.remove(); }, 7800);
  }

  /* =====================================================
     4) MODE LUKIS: kuas raksasa / pena coret. Lukisan disimpan sebagai titik, jadi ikut berganti gaya Shikai <-> Bankai
     ===================================================== */
  const strokes = [];
  let drawOn = false, tool = "brush", sizeIdx = 1, drawing = false, cur = null;
  const SIZES = [.55, 1, 1.7];
  const layer = document.createElement("div"); layer.className = "ib-layer"; layer.setAttribute("aria-hidden", "true");
  const dv = document.createElement("canvas"), lv = document.createElement("canvas"); dv.className = "ib-draw"; lv.className = "ib-live";
  layer.appendChild(dv); layer.appendChild(lv); document.body.appendChild(layer);
  const dctx = dv.getContext("2d"), lctx = lv.getContext("2d");
  let DW = 0, DH = 0, DD = 1;
  function sizeDraw() {
    DD = Math.min(2, window.devicePixelRatio || 1); DW = innerWidth; DH = innerHeight;
    [dv, lv].forEach(k => { k.width = DW * DD; k.height = DH * DD; k.getContext("2d").setTransform(DD, 0, 0, DD, 0, 0); });
    redrawAll();
  }
  const baseW = () => (tool === "brush" ? 34 : 3.6) * SIZES[sizeIdx] * clamp(Math.min(DW, DH) / 700, .7, 1.3);
  function paintStroke(c, s, S) {
    paint(c, s.pts, S, { seed: s.seed, thin: s.tool === "pen", dry: s.tool === "brush" ? .75 : 0, alpha: 1 });
    if (s.drip) paint(c, s.drip, S, { seed: s.seed + 3, thin: false, dry: 0, alpha: 1 });
    if (s.dot) paintBlob(c, s.dot.x, s.dot.y, s.dot.r, S, s.seed, 1);
  }
  function redrawAll() {
    dctx.clearRect(0, 0, DW, DH); const S = STY(); strokes.forEach(s => paintStroke(dctx, s, S));
  }
  function addPoint(e, first) {
    const x = e.clientX, y = e.clientY, t = e.timeStamp || performance.now(), Lp = cur.last, dt = Math.max(1, t - Lp.t), dist = Math.hypot(x - Lp.x, y - Lp.y);
    if (!first && dist < 1.2) return;
    const v = clamp(dist / dt / 2.2, 0, 1); cur.vs = cur.vs * .7 + v * .3;
    const lag = cur.tool === "brush" ? .42 : .7; cur.sm.x += (x - cur.sm.x) * lag; cur.sm.y += (y - cur.sm.y) * lag;
    let target = cur.tool === "brush" ? cur.base * (1.12 - cur.vs * .8) : cur.base * (1.1 - cur.vs * .45);
    if (e.pointerType === "pen" && e.pressure) target = cur.base * (.35 + e.pressure * 1.0);
    cur.w += (target - cur.w) * .28;
    const ramp = Math.min(1, (cur.pts.length + 1) / 8), nw = Math.max(1, cur.w * (.35 + .65 * ramp)), pv = cur.pts[cur.pts.length - 1];
    if (!pv) cur.pts.push({ x: cur.sm.x, y: cur.sm.y, w: nw, v: cur.vs });
    else {                                           // rapatkan titik tiap ~5px supaya goresan mulus berapa pun kecepatan mouse
      const dd = Math.hypot(cur.sm.x - pv.x, cur.sm.y - pv.y), kk = Math.max(1, Math.ceil(dd / 5));
      for (let j = 1; j <= kk; j++) { const f = j / kk; cur.pts.push({ x: pv.x + (cur.sm.x - pv.x) * f, y: pv.y + (cur.sm.y - pv.y) * f, w: pv.w + (nw - pv.w) * f, v: pv.v + (cur.vs - pv.v) * f }); }
    }
    Lp.x = x; Lp.y = y; Lp.t = t; scratchMove(cur.vs);
  }
  function renderLive() { lctx.clearRect(0, 0, DW, DH); if (cur && cur.pts.length > 1) paintStroke(lctx, cur, STY()); else if (cur && cur.pts.length === 1) paintBlob(lctx, cur.pts[0].x, cur.pts[0].y, cur.pts[0].w * .5, STY(), cur.seed, 1); }
  function pdown(e) {
    if (!drawOn || (e.button && e.button > 0)) return; e.preventDefault();
    try { layer.setPointerCapture(e.pointerId); } catch (_) {}
    drawing = true; const base = baseW();
    cur = { tool, pts: [], base, vs: 0, w: base * .55, seed: Math.floor(R(1, 99999)), sm: { x: e.clientX, y: e.clientY }, last: { x: e.clientX, y: e.clientY, t: e.timeStamp || performance.now() } };
    addPoint(e, true); renderLive(); scratchStart(); swish(0, .12, .06);
  }
  function pmove(e) {
    if (!drawing || !cur) return; const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    (evs.length ? evs : [e]).forEach(ev => addPoint(ev)); renderLive();
  }
  function pup() {
    if (!drawing || !cur) return; drawing = false; scratchEnd();
    const p = cur.pts, n = p.length, b = p[n - 1];
    if (n < 3) {                                   // sekali ketuk = gumpalan tinta
      cur.pts = [{ x: b.x - .1, y: b.y, w: 1, v: 0 }, { x: b.x, y: b.y, w: 1, v: 0 }]; cur.dot = { x: b.x, y: b.y, r: Math.max(2.2, cur.base * (cur.tool === "brush" ? .55 : .5)) };
    } else {
      const a = p[n - 2]; let dx = b.x - a.x, dy = b.y - a.y; const dd = Math.hypot(dx, dy) || 1; dx /= dd; dy /= dd;
      for (let k = 1; k <= 5; k++) p.push({ x: b.x + dx * k * cur.base * .14 * (1 + cur.vs * .8), y: b.y + dy * k * cur.base * .14 * (1 + cur.vs * .8), w: Math.max(.8, b.w * (1 - k / 6)), v: Math.min(1, b.v + k * .1) });
      if (cur.tool === "brush" && cur.vs < .16 && n > 14) {   // tinta menetes kalau berhenti pelan
        const L = R(26, 74); cur.drip = [{ x: b.x, y: b.y, w: Math.max(2, b.w * .34), v: 0 }, { x: b.x + R(-2, 2), y: b.y + L * .6, w: Math.max(1.8, b.w * .3), v: 0 }, { x: b.x + R(-3, 3), y: b.y + L, w: 1.6, v: 0 }];
        cur.dot = { x: cur.drip[2].x, y: cur.drip[2].y + 2, r: Math.max(2.5, b.w * .16) };
      }
    }
    paintStroke(dctx, cur, STY()); lctx.clearRect(0, 0, DW, DH);
    strokes.push(cur); if (strokes.length > 140) strokes.shift(); cur = null; setUndoState();
  }
  function undo() { if (!strokes.length) return "Tidak ada yang bisa diurungkan."; strokes.pop(); redrawAll(); setUndoState(); swish(0, .18, .07); return "Goresan terakhir dihapus."; }
  function clearAll() { if (strokes.length) { strokes.length = 0; redrawAll(); setUndoState(); swish(0, .5, .12); } return "Kanvas dibersihkan."; }
  function save() {
    const c = document.createElement("canvas"); c.width = dv.width; c.height = dv.height; const x = c.getContext("2d"), S = STY();
    x.fillStyle = S.bg; x.fillRect(0, 0, c.width, c.height); x.drawImage(dv, 0, 0);
    x.setTransform(DD, 0, 0, DD, 0, 0); paintHanko(x, DW - 70, DH - 70, 54, S, .95, -.07, 9);
    c.toBlob(b => { if (!b) return; const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "ichibe-lukisan.png"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }, "image/png");
    return "Lukisan disimpan.";
  }

  /* ----- tombol (hanya ikon; judul muncul saat disorot) ----- */
  const IC = {
    brush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c.9.9-.5 4.6-5.2 9.2l-2.3-2.3C17.2 6.2 19.1 3.1 20 4Z" fill="currentColor" fill-opacity=".25"/><path d="M10.7 12.2l1.2 1.2c0 3.3-2.2 5.7-6.7 6.1.7-1.3.6-2.3.8-3.1.5-2.1 2.4-3.6 4.7-4.2Z" fill="currentColor"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17c2.5-9 4.6 5 7.2-2.6S15 5.5 21 7"/></svg>',
    size: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.3"/><circle class="ib-sz" cx="12" cy="12" r="5" fill="currentColor" stroke="none"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
    clear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
    save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>'
  };
  const dock = document.createElement("div"); dock.className = "ib-dock";
  const mk = (k, ti, ic) => '<button type="button" class="ib-b ib-' + k + '" data-a="' + k + '" title="' + ti + '" aria-label="' + ti + '">' + ic + '</button>';
  dock.innerHTML = '<div class="ib-tools">' + mk("save", "Simpan lukisan (PNG)", IC.save) + mk("clear", "Hapus semua", IC.clear) + mk("undo", "Urungkan (Ctrl+Z)", IC.undo) + mk("size", "Ukuran kuas ([ ] atau roda mouse)", IC.size) + mk("tool", "Ganti alat: kuas besar / pena coret", IC.pen) + '</div>' + mk("main", "Mode lukis: coret-coret di layar (Esc keluar)", IC.brush);
  document.body.appendChild(dock);
  const bMain = dock.querySelector(".ib-main"), bTool = dock.querySelector(".ib-tool"), bSize = dock.querySelector(".ib-size"), bUndo = dock.querySelector(".ib-undo"), szDot = dock.querySelector(".ib-sz");
  function setUndoState() { bUndo.disabled = !strokes.length; dock.querySelector(".ib-clear").disabled = !strokes.length; dock.querySelector(".ib-save").disabled = !strokes.length; }
  function syncUI() {
    dock.classList.toggle("is-open", drawOn); bMain.classList.toggle("is-on", drawOn); bMain.setAttribute("aria-pressed", String(drawOn));
    layer.classList.toggle("is-on", drawOn); if (drawOn) root.dataset.ibdraw = "on"; else delete root.dataset.ibdraw;
    bTool.innerHTML = tool === "brush" ? IC.brush : IC.pen; dock.querySelector(".ib-sz") && (dock.querySelector(".ib-sz").setAttribute("r", [3, 5.2, 7.4][sizeIdx]));
    setUndoState();
  }
  function setDraw(on) { drawOn = !!on && isOn(); if (!drawOn && drawing) pup(); syncUI(); return drawOn ? "Mode lukis menyala. Coret di layar!" : "Mode lukis mati."; }
  function setSize(i) { sizeIdx = clamp(i, 0, SIZES.length - 1); syncUI(); }
  dock.addEventListener("click", e => {
    const b = e.target.closest(".ib-b"); if (!b || b.disabled) return; const a = b.dataset.a;
    if (a === "main") setDraw(!drawOn);
    else if (a === "tool") { tool = tool === "brush" ? "pen" : "brush"; syncUI(); swish(0, .1, .05); }
    else if (a === "size") setSize((sizeIdx + 1) % SIZES.length);
    else if (a === "undo") undo(); else if (a === "clear") clearAll(); else if (a === "save") save();
  });
  layer.addEventListener("pointerdown", pdown); layer.addEventListener("pointermove", pmove);
  layer.addEventListener("pointerup", pup); layer.addEventListener("pointercancel", pup); layer.addEventListener("contextmenu", e => { if (drawOn) e.preventDefault(); });
  layer.addEventListener("wheel", e => { if (!drawOn) return; e.preventDefault(); setSize(sizeIdx + (e.deltaY < 0 ? 1 : -1)); }, { passive: false });
  addEventListener("keydown", e => {
    if (!isOn() || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "")) return;
    if (e.key === "Escape" && drawOn) setDraw(false);
    else if (drawOn && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); }
    else if (drawOn && e.key === "[") setSize(sizeIdx - 1); else if (drawOn && e.key === "]") setSize(sizeIdx + 1);
  });

  /* ----- klik layar (di luar mode lukis): cipratan tinta + sapuan ----- */
  addEventListener("pointerdown", e => {
    if (!isOn() || !enabled || drawOn || e.button > 0 || (e.target.closest && e.target.closest("a,button,input,textarea,select,canvas,[role=button]"))) return;
    fx.push({ k: "i", sp: makeSplash(e.clientX, e.clientY, 1), t: 0, life: 3.2 });
    if (!reduce) addSweep(e.clientX - 40, e.clientY + 10, R(110, 200), R(-.6, .2), R(12, 22), 3);
    swish(0, .22, .09); kick();
  }, { passive: true });

  /* ----- sinkron dengan perubahan mode ----- */
  let wasBankai = gold();
  new MutationObserver(() => {
    kick();
    if (!isOn() && drawOn) setDraw(false);
    if (gold() !== wasBankai) { wasBankai = gold(); redrawAll(); }
    if (isOn() && !dock.dataset.shown) { dock.dataset.shown = "1"; bMain.classList.add("ib-ping"); setTimeout(() => bMain.classList.remove("ib-ping"), 4200); }
  }).observe(root, { attributes: true, attributeFilter: ["data-bleach", "data-ibankai"] });
  document.addEventListener("visibilitychange", kick);
  addEventListener("resize", () => { sizeBg(); sizeDraw(); });
  sizeDraw(); syncUI(); kick();

  window.ichibeInk = {
    scene, splash: (x, y) => { fx.push({ k: "i", sp: makeSplash(x || W / 2, y || H / 2, 1.6), t: 0, life: 3.4 }); kick(); },
    enso: () => { addEnso(W / 2, H / 2, Math.min(W, H) * .25); kick(); },
    draw: on => setDraw(on === undefined ? !drawOn : on), undo, clear: clearAll, save,
    off() { enabled = false; return "Ichibe: kuas diletakkan."; }, on() { enabled = true; kick(); return "Ichibe: kuas diangkat."; }
  };
})();


/* =========================================================
   PEMBARUAN 41: EASTER EGG JUJUTSU KAISEN (jjkEgg)
   Pemicu: lagu ke-3 diputar (siteMusic.isSong(2)) + ketuk ID card 15x berturut-turut -> tombol JJK "keluar" di kanan bawah.
   Isi: Gojo Satoru (Domain Expansion: Unlimited Void, biru) & Ryomen Sukuna (Malevolent Shrine, merah).
   Bunyi: Web Audio (ikut mati kalau tapSound.on = false). Tidak disimpan: muat ulang halaman = terkunci lagi.
   PEMBARUAN 51: PINTASAN KEYBOARD  Win + Shift + -  (Mac: Cmd + Shift + -) = buka kunci mode JJK / buka-tutup menu | cadangan: Ctrl + Alt + J
   Console: jjk.unlock() | jjk.scene("gojo" | "sukuna") | jjk.off() | jjk.reset()
========================================================= */
(function jjkEgg() {
  "use strict";
  const root = document.documentElement;
  const CFG = {
    songIndex: 2,             // lagu ke-3 = "Merry Christmas, I miss you"
    taps: 15,                 // jumlah ketukan ID card
    gap: 3000,                // ms: jeda maksimal antar ketukan
    tickFrom: 6,              // mulai ketukan ke-berapa terdengar "tek" kecil sebagai petunjuk
    sound: true,
    volume: 1,
    congrats: "Selamat! Kamu menemukan easter egg Jujutsu Kaisen"
  };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const K = reduce ? 0.3 : 1;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;
  let unlocked = false, busy = false, menuOpen = false, taps = 0, lastTap = 0, dn = null;
  let wrap = null, btn = null, menu = null, aura = null, scene = null, orbFlip = false;

  /* ---------- urutan tumpukan tombol: yang terbuka lebih dulu di bawah, yang menyusul di atas ---------- */
  const order = [];                 // "bleach" / "jjk" menurut urutan kemunculan tombolnya
  let watched = null;
  function restack() { if (order[0] === "jjk") root.dataset.jjkfirst = "1"; else delete root.dataset.jjkfirst; }
  function noteBleach() {
    const el = document.getElementById("bleachSecret"); if (!el) return;
    const upd = () => { const i = order.indexOf("bleach"); if (el.hidden) { if (i >= 0) order.splice(i, 1); } else if (i < 0) order.push("bleach"); restack(); };
    if (watched !== el) { watched = el; if (window.MutationObserver) new MutationObserver(upd).observe(el, { attributes: true, attributeFilter: ["hidden"] }); }
    upd();
  }

  /* ---------- bunyi ---------- */
  let ac = null, master = null, nb = null;
  const okSnd = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  function audio() {
    if (!okSnd()) return null;
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); master = ac.createGain(); master.gain.value = 0.5 * CFG.volume; master.connect(ac.destination);
    nb = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = nb.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  function tone(type, f0, f1, t, dur, vol) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(ft, f0, f1, t, dur, vol) {
    const s = ac.createBufferSource(); s.buffer = nb; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ft; f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.03, dur / 3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
  }
  function sfxTick(n) { if (!audio()) return; tone("triangle", 420 + n * 55, 0, ac.currentTime, 0.09, 0.07); }
  function sfxFound() {
    if (!audio()) return; const t = ac.currentTime + 0.02;
    [196, 233, 294, 392].forEach((f, i) => tone("triangle", f, 0, t + i * 0.09, 0.9, 0.08));
    tone("sine", 65, 40, t, 1.2, 0.3); noise("bandpass", 600, 3000, t, 0.7, 0.08);
  }
  function sfxGojo() {
    if (!audio()) return; const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise("bandpass", 200, 3200, s(0), 0.9 * K, 0.12);                       // desir energi naik
    tone("sawtooth", 55, 48, s(0), 3.2 * K, 0.07);                           // dengung rendah
    noise("highpass", 5000, 2500, s(0.9), 0.25, 0.3); tone("sine", 140, 50, s(0.9), 0.5, 0.45);   // tepukan tangan (kaishu)
    [1318, 1760, 2093, 2637].forEach((f, i) => tone("sine", f, 0, s(1.4 + i * 0.12), 1.8, 0.04));  // mata terbuka: denting kaca
    noise("bandpass", 3000, 6000, s(1.4), 2.2 * K, 0.04);                    // aliran data
    tone("sine", 80, 38, s(3.0), 0.9, 0.5);                                  // dentum judul
    tone("sine", 70, 35, s(6.2 * K), 1.2, 0.55); noise("highpass", 4000, 1500, s(6.2 * K), 1.2, 0.2);  // kilat akhir
  }
  function sfxSukuna() {
    if (!audio()) return; const t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    tone("sawtooth", 50, 44, s(0), 3.6 * K, 0.09); noise("lowpass", 500, 120, s(0), 1.2 * K, 0.18);   // dengung berat
    [0.9, 1.15, 1.35, 1.6, 1.8, 2.05].forEach((x, i) => { noise("highpass", 3500 + i * 400, 1800, s(x), 0.22, 0.22); tone("triangle", 1800 - i * 120, 300, s(x), 0.18, 0.06); });  // tebasan
    tone("sine", 100, 36, s(2.5), 1.2, 0.6); tone("square", 392, 0, s(2.5), 1.4, 0.03); tone("sine", 784, 0, s(2.5), 2.2, 0.04);   // lonceng kuil
    tone("sine", 65, 30, s(6.2 * K), 1.4, 0.6); noise("highpass", 3000, 800, s(6.2 * K), 1.0, 0.25);
  }
  function sfxClick(kind) {
    if (!audio()) return; const t = ac.currentTime;
    if (kind === "cut") { noise("highpass", 4500, 2000, t, 0.16, 0.2); tone("triangle", 1600, 400, t, 0.14, 0.05); }
    else if (kind === "aka") { tone("sine", 160, 40, t, 0.5, 0.35); noise("lowpass", 900, 200, t, 0.4, 0.1); }
    else { tone("sine", 900, 1500, t, 0.35, 0.07); tone("sine", 120, 50, t, 0.4, 0.22); }
  }

  /* ---------- bisikan kecil ---------- */
  let toastEl = null, toastTimer = 0;
  function toast(html, ms) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "jjk-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html;
    requestAnimationFrame(() => toastEl.classList.add("is-on"));
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), ms || 6500);
  }

  /* ---------- tombol JJK yang "keluar" setelah terbuka ---------- */
  const EYE = '<svg viewBox="0 0 40 24" aria-hidden="true" focusable="false"><path class="j-lid" d="M2 12 Q20 -2 38 12 Q20 26 2 12Z"/><circle class="j-iris" cx="20" cy="12" r="6.4"/><circle class="j-pup" cx="20" cy="12" r="2.6"/></svg>';
  function build() {
    if (wrap && wrap.isConnected) return;
    wrap = document.createElement("div"); wrap.className = "jjk-secret"; wrap.id = "jjkSecret";
    wrap.innerHTML =
      '<div class="jjk-menu" role="menu" aria-label="Menu Jujutsu Kaisen"><p class="jjk-menu-title"><span>JUJUTSU</span><small>呪術廻戦</small></p>' +
      '<ul class="jjk-list"><li><button type="button" data-k="gojo"><span class="jj-num">五</span><span class="jj-name">Satoru Gojo<small>Biasa &amp; Domain Expansion</small></span><span class="jj-s">Panggil</span></button></li>' +
      '<li><button type="button" data-k="sukuna"><span class="jj-num">宿</span><span class="jj-name">Ryomen Sukuna<small>Biasa, Heian &amp; Domain</small></span><span class="jj-s">Panggil</span></button></li></ul></div>' +
      '<button type="button" class="jjk-toggle" aria-expanded="false" aria-label="Menu Jujutsu Kaisen"><span class="jj-track"><i class="jj-slash"></i><span class="jj-word">JJK</span>' +
      '<span class="jj-knob"><svg class="kg" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><circle cx="20" cy="22" r="13" fill="#f5dccd"/><path d="M4 24 Q2 7 20 2 Q38 7 36 24 Q33 14 29 15 L27 8 L23 16 L20 7 L17 16 L13 8 L11 15 Q7 14 4 24Z" fill="#f6faff" stroke="#9bb4de" stroke-width="1"/><rect x="5" y="14" width="30" height="6" rx="1.5" fill="#070a1c"/><ellipse cx="14" cy="25" rx="3.6" ry="2.6" fill="#7fd0ff"/><ellipse cx="26" cy="25" rx="3.6" ry="2.6" fill="#7fd0ff"/><circle cx="14" cy="25" r="1.4" fill="#fff"/><circle cx="26" cy="25" r="1.4" fill="#fff"/><path d="M16 33 Q20 35.5 24 33" fill="none" stroke="#b76a6a" stroke-width="1.3" stroke-linecap="round"/><path d="M6 38 Q20 30 34 38 L34 40 L6 40Z" fill="#0b1230"/></svg><svg class="ks" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><circle cx="20" cy="22" r="13" fill="#f0cfc0"/><path d="M5 22 Q4 6 20 4 Q36 6 35 22 Q32 13 28 14 L25 8 L21 14 L17 8 L13 14 Q8 13 5 22Z" fill="#ff93ab" stroke="#c4506b" stroke-width="1"/><ellipse cx="14" cy="22" rx="3" ry="2" fill="#ff2a2a"/><ellipse cx="26" cy="22" rx="3" ry="2" fill="#ff2a2a"/><circle cx="14" cy="22" r="1" fill="#2a0005"/><circle cx="26" cy="22" r="1" fill="#2a0005"/><ellipse cx="14" cy="27.5" rx="2.2" ry="1.4" fill="#ff2a2a"/><ellipse cx="26" cy="27.5" rx="2.2" ry="1.4" fill="#ff2a2a"/><path d="M9 18 Q12 17 15 18 M25 18 Q28 17 31 18 M8 25 Q10 31 13 32 M32 25 Q30 31 27 32" fill="none" stroke="#2a0a14" stroke-width="1.4" stroke-linecap="round"/><path d="M17 34 Q20 35 23 34" fill="none" stroke="#7a2030" stroke-width="1.3" stroke-linecap="round"/></svg></span></span></button>';
    document.body.appendChild(wrap);
    btn = wrap.querySelector(".jjk-toggle"); menu = wrap.querySelector(".jjk-menu");
    btn.addEventListener("click", () => toggleMenu());
    menu.querySelectorAll("button[data-k]").forEach(b => b.addEventListener("click", () => { toggleMenu(false); pickChar(b.dataset.k); }));
    document.addEventListener("pointerdown", e => { if (menuOpen && !wrap.contains(e.target)) toggleMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && menuOpen) toggleMenu(false); });
    aura = document.createElement("div"); aura.className = "jjk-aura"; aura.setAttribute("aria-hidden", "true"); document.body.appendChild(aura);
    document.addEventListener("pointerdown", burst, true);
    wrap.classList.add("is-new"); setTimeout(() => { if (wrap) wrap.classList.remove("is-new"); }, 3200);   // muncul + gemetar seperti tombol Bleach
    sync();
  }
  function toggleMenu(open) {
    menuOpen = typeof open === "boolean" ? open : !menuOpen;
    if (!wrap) return;
    wrap.classList.toggle("menu-open", menuOpen); btn.setAttribute("aria-expanded", String(menuOpen));
  }
  function sync() {
    if (!wrap) return;
    const cur = root.dataset.jjk || "";
    wrap.querySelectorAll("button[data-k]").forEach(b => {
      const on = b.dataset.k === cur; b.classList.toggle("is-active", on); b.querySelector(".jj-s").textContent = on ? "Aktif" : "Panggil";
    });
    wrap.dataset.mode = cur;
  }
  function pickChar(k) {
    if (busy) return;
    if (root.dataset.jjk === k) { off(); return; }     // tekan lagi = nonaktif
    if (k === "sukuna" && window.sukunaTheme) { window.sukunaTheme.enter(); return; }   // PEMBARUAN 66: Sukuna = tema penuh (Biasa + Heian + Domain)
    if (k === "gojo" && window.gojoTheme) { window.gojoTheme.enter(); return; }   // PEMBARUAN 42: Gojo = tema penuh (Biasa + Domain)
    play(k);
  }
  function off() { delete root.dataset.jjk; delete root.dataset.gojo; delete root.dataset.sukuna; sync(); }

  /* ---------- efek klik layar saat mode JJK aktif ---------- */
  function burst(e) {
    const k = root.dataset.jjk; if (!k || busy || (wrap && wrap.contains(e.target))) return;
    if (k === "gojo") {
      if (window.gojoTheme) return;   // PEMBARUAN 42: klik di mode Gojo ditangani modul gojoTheme
      orbFlip = !orbFlip; sfxClick(orbFlip ? "ao" : "aka");
      const o = document.createElement("i"); o.className = "jjk-orb " + (orbFlip ? "ao" : "aka");
      o.style.left = e.clientX + "px"; o.style.top = e.clientY + "px"; document.body.appendChild(o); setTimeout(() => o.remove(), 900);
    } else {
      if (window.sukunaTheme) return;   // PEMBARUAN 66: klik di mode Sukuna ditangani modul sukunaTheme
      sfxClick("cut");
      [-38, 38].forEach((r, i) => {
        const c = document.createElement("i"); c.className = "jjk-cut"; c.style.cssText = "left:" + e.clientX + "px;top:" + e.clientY + "px;--r:" + (r + rnd(-8, 8)).toFixed(0) + "deg;animation-delay:" + (i * 0.06) + "s";
        document.body.appendChild(c); setTimeout(() => c.remove(), 800);
      });
    }
  }

  /* ---------- adegan Domain Expansion ---------- */
  function flowHTML(n) { let h = ""; for (let i = 0; i < n; i++) { const a = rnd(0, TAU), d = rnd(35, 75); h += '<i style="--x:' + (Math.cos(a) * d).toFixed(1) + 'vmax;--y:' + (Math.sin(a) * d).toFixed(1) + 'vmax;--dl:' + rnd(0, 2.4).toFixed(2) + 's;--s:' + rnd(1.5, 3.5).toFixed(1) + 'px"></i>'; } return h; }
  function gojoHTML() {
    return '<div class="jj-stage"><div class="jj-void"></div><div class="jj-flow">' + flowHTML(70) + '</div><i class="jj-ring"></i><i class="jj-ring r2"></i>' +
      '<svg class="jj-eye" viewBox="0 0 200 100" aria-hidden="true"><defs><radialGradient id="jjIris" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#bfe6ff"/><stop offset=".75" stop-color="#3b9dff"/><stop offset="1" stop-color="#0b3fa8"/></radialGradient></defs>' +
      '<path d="M8 50 Q100 -8 192 50 Q100 108 8 50Z" fill="#050a18" stroke="#9fd3ff" stroke-width="2.4"/><circle cx="100" cy="50" r="30" fill="url(#jjIris)"/><circle cx="100" cy="50" r="11" fill="#031030"/><circle cx="92" cy="42" r="4" fill="#fff" opacity=".9"/></svg>' +
      '<div class="jj-kanji">無量空処</div><div class="jj-title">DOMAIN EXPANSION<b>Unlimited Void</b></div>' +
      '<div class="jj-sub"><small>★ EASTER EGG DITEMUKAN ★</small><b>' + CFG.congrats + '</b><em>Throughout Heaven and Earth, I alone am the honored one · ketuk untuk lanjut</em></div></div><div class="jj-flash"></div>';
  }
  function sukunaHTML() {
    let sl = ""; for (let i = 0; i < 14; i++) sl += '<i class="jj-sl" style="--r:' + (rnd(-80, 80)).toFixed(0) + 'deg;--ty:' + rnd(-32, 32).toFixed(0) + 'vh;--dl:' + (0.9 + i * 0.16).toFixed(2) + 's"></i>';
    return '<div class="jj-stage"><div class="jj-void red"></div><div class="jj-flow red">' + flowHTML(40) + '</div>' +
      '<svg class="jj-shrine" viewBox="0 0 300 230" aria-hidden="true"><path class="sh-roof" d="M6 74 Q150 14 294 74 L276 90 Q150 44 24 90Z"/><path class="sh-roof2" d="M36 104 Q150 62 264 104 L250 118 Q150 82 50 118Z"/>' +
      '<rect class="sh-pil" x="62" y="118" width="14" height="76"/><rect class="sh-pil" x="112" y="118" width="14" height="76"/><rect class="sh-pil" x="174" y="118" width="14" height="76"/><rect class="sh-pil" x="224" y="118" width="14" height="76"/>' +
      '<rect class="sh-base" x="40" y="194" width="220" height="10"/><rect class="sh-base" x="26" y="204" width="248" height="10"/><rect class="sh-base" x="12" y="214" width="276" height="10"/>' +
      '<path class="sh-bone" d="M150 20 L158 40 L142 40Z M98 34 L104 50 L92 50Z M202 34 L208 50 L196 50Z"/></svg>' +
      '<div class="jj-slashes">' + sl + '</div>' +
      '<div class="jj-kanji red">伏魔御廚子</div><div class="jj-title red">DOMAIN EXPANSION<b>Malevolent Shrine</b></div>' +
      '<div class="jj-sub red"><small>★ EASTER EGG DITEMUKAN ★</small><b>' + CFG.congrats + '</b><em>Know your place, fool · ketuk untuk lanjut</em></div></div><div class="jj-flash red"></div>';
  }
  function play(k) {
    if (busy) return; busy = true; toggleMenu(false);
    scene = document.createElement("div"); scene.className = "jj-scene jj-" + k; scene.setAttribute("role", "dialog"); scene.setAttribute("aria-label", "Domain Expansion");
    scene.innerHTML = k === "gojo" ? gojoHTML() : sukunaHTML();
    document.body.appendChild(scene);
    const timers = []; const at = (s, fn) => timers.push(setTimeout(fn, s * 1000 * K));
    const cls = c => () => scene.classList.add(c);
    let canClose = false, done = false;
    requestAnimationFrame(() => scene.classList.add("is-in"));
    if (k === "gojo") { sfxGojo(); at(0.9, cls("is-void")); at(1.4, cls("is-eye")); at(3.0, cls("is-kanji")); at(3.6, cls("is-title")); }
    else { sfxSukuna(); at(0.3, cls("is-void")); at(0.6, cls("is-shrine")); at(0.9, cls("is-slash")); at(2.5, cls("is-kanji")); at(3.1, cls("is-title")); }
    at(6.2, () => { scene.classList.add("is-flash"); root.dataset.jjk = k; sync(); });
    at(6.8, () => { scene.classList.add("is-sub"); });
    at(7.2, () => { canClose = true; });
    at(12, () => close());
    function close() {
      if (done) return; done = true; timers.forEach(clearTimeout);
      root.dataset.jjk = k; sync(); scene.classList.add("is-out");
      const s = scene; setTimeout(() => { s.remove(); }, 700); scene = null; busy = false;
    }
    scene.addEventListener("pointerup", () => { if (canClose) close(); });
    const esc = e => { if (e.key === "Escape" && canClose) { close(); document.removeEventListener("keydown", esc); } };
    document.addEventListener("keydown", esc);
  }

  /* ---------- buka kunci: ketuk ID card 15x saat lagu ke-3 diputar ---------- */
  function unlock(silent) {
    if (unlocked) return; unlocked = true;
    noteBleach(); if (order.indexOf("jjk") < 0) order.push("jjk"); restack();
    build();
    if (!silent) { sfxFound(); toast("<small>★ EASTER EGG DITEMUKAN ★</small><b>" + CFG.congrats + "</b><span>Tombol <i>呪</i> muncul di kanan bawah. Buka, lalu panggil Gojo atau Sukuna.</span>", 9000); }
  }
  function tap() {
    if (unlocked) return;
    const m = window.siteMusic;
    if (!(m && m.isSong && m.isSong(CFG.songIndex))) { taps = 0; return; }      // hanya dihitung saat lagu ke-3 sedang diputar
    const now = performance.now();
    if (now - lastTap > CFG.gap) taps = 0;
    lastTap = now; taps++;
    if (taps >= CFG.taps) { taps = 0; unlock(false); }
    else if (taps >= CFG.tickFrom) sfxTick(taps - CFG.tickFrom);
  }
  let wired = false;
  function wire() {
    if (wired) return; const card = document.getElementById("idcard"); if (!card) return; wired = true;
    card.addEventListener("pointerdown", e => { dn = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    card.addEventListener("pointerup", e => {      // hitung hanya ketukan (bukan geseran/tahan)
      if (!dn) return; const mv = Math.hypot(e.clientX - dn.x, e.clientY - dn.y), dt = performance.now() - dn.t; dn = null;
      if (mv < 7 && dt < 600) tap();
    });
    card.addEventListener("pointercancel", () => { dn = null; });
    card.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) tap(); });
  }
  wire(); noteBleach();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { wire(); noteBleach(); });
  window.addEventListener("portfolio:ready", () => { wire(); noteBleach(); });

  /* ---------- PEMBARUAN 51: pintasan keyboard ----------
     Win + Shift + -  (Mac: Cmd + Shift + -)  = buka kunci mode JJK (tombol 呪 muncul); kalau sudah terbuka = buka/tutup menu Gojo & Sukuna.
     Cadangan kalau Windows/browser menelan kombinasi di atas: Ctrl + Alt + J. */
  document.addEventListener("keydown", e => {
    if (e.repeat) return;
    const minus = e.code === "Minus" || e.code === "NumpadSubtract" || e.key === "_" || e.key === "-";
    const combo = (minus && e.shiftKey && e.metaKey && !e.ctrlKey && !e.altKey) || (e.code === "KeyJ" && e.ctrlKey && e.altKey && !e.shiftKey && !e.metaKey);
    if (!combo) return;
    e.preventDefault();
    if (!unlocked) unlock(false); else if (!busy) toggleMenu();
  }, true);

  window.jjk = {
    CFG, sync,
    get unlocked() { return unlocked; },
    unlock() { unlock(false); return "Tombol JJK keluar di kanan bawah."; },
    scene(k) { unlock(true); if (k === "sukuna" && window.sukunaTheme) { window.sukunaTheme.enter(); return; } if (k !== "sukuna" && window.gojoTheme) { window.gojoTheme.enter(); return; } if (!busy) play(k === "sukuna" ? "sukuna" : "gojo"); },
    off() { off(); return "Mode JJK dimatikan."; },
    reset() { off(); unlocked = false; taps = 0; const oi = order.indexOf("jjk"); if (oi >= 0) order.splice(oi, 1); restack(); if (wrap) { wrap.remove(); wrap = null; } if (aura) { aura.remove(); aura = null; } document.removeEventListener("pointerdown", burst, true); return "Dikunci lagi."; }
  };
})();


/* =========================================================
   PEMBARUAN 42: SLOT GOJO PENUH  (modul gojoTheme)
   Gojo sekarang punya tema sendiri dengan 2 mode, diganti lewat tombol tema (kiri bawah / kanan atas):
   - BIASA   : "Limitless / Infinity" - langit biru Six Eyes, kisi titik yang melengkung menjauhi kursor (Infinity),
               bola Ao (biru) & Aka (merah) mengorbit, tiap ~12-20 dtk bertabrakan jadi Hollow Purple. Klik = Ao / Aka / Murasaki.
   - DOMAIN  : "Unlimited Void" - lubang hitam raksasa bercincin pelangi + pusaran + cipratan tinta putih/hitam (gaya gambar referensi).
               Klik = cipratan tinta. Masuk lewat adegan sinematik (tepukan -> lubang hitam terbuka -> 無量空処 -> kilat).
   Dipicu dari menu tombol JJK (pilih Satoru Gojo). Tombol tema berubah jadi pil "Biasa | Domain".
   Bunyi: Web Audio (ikut mati kalau tapSound.on = false). Tidak disimpan: muat ulang = kembali seperti semula.
   PEMBARUAN 43: TANGAN GOJO di mode DOMAIN. Adegan: tangan naik -> jari menyilang (kilat, gelombang kejut, glitch) -> meluncur ke depan lubang hitam.
   Di mode Domain tangan tetap ada di latar (mengambang, miring mengikuti kursor, berdenyut tiap 8-14 dtk, tiap klik ke-5 denyut besar + bunyi).
   PEMBARUAN 50: SIX EYES. Di mode Gojo BIASA ada penutup mata tersembunyi di paling bawah bagian Kontak; ditekan -> adegan penutup mata ditarik naik, mata digambar terbuka -> tema Six Eyes
   (biru-putih-sedikit-ungu, iris raksasa + HUD, klik = analisis heksagon). Tekan penutup mata lagi (atau tombol tema > Domain) untuk keluar.
   Console: gojoTheme.enter() | .domain() | .collapse() | .six() | .unsix() | .off() | .pulse() | .CFG (handSrc: ganti gambar tangan)
========================================================= */
(function gojoTheme() {
  "use strict";
  const root = document.documentElement;
  const CFG = { sound: true, volume: 1, handSrc: null };   // handSrc: isi "images/gojo-hand.png" kalau mau ganti gambar tangan
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const K = reduce ? 0.3 : 1;                         // pengali durasi adegan (kurangi gerakan = jauh lebih singkat)
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const eo = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
  const eio = u => { u = clamp(u, 0, 1); return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
  const isOn = () => root.dataset.jjk === "gojo" && !root.dataset.bleach;
  const isDom = () => root.dataset.gojo === "domain";
  const isSix = () => root.dataset.gojo === "six";
  const modeName = () => isDom() ? "domain" : isSix() ? "six" : "normal";
  const SKIP = "a,button,input,textarea,select,label,iframe,[role=button],.jjk-secret,.bleach-secret,.music-player,.game-launcher,.game-hub,.theme-toggle,.idcard,.gj-scene,.gj-blind,.gs-menu,.gs-void";
  let busy = false, forcedDark = false, clicks = 0;
  const ptr = { x: -999, y: -999, on: false };
  const lsGet = k => { try { return localStorage.getItem(k); } catch (_) { return null; } };

  /* ---------- PEMBARUAN 43: TANGAN GOJO (pose Domain Expansion) ---------- */
  const HAND_AR = 0.4007, HAND_TX = 0.53, HAND_TY = 0.03, HAND_SL = 0.06;   // lebar/tinggi gambar, posisi ujung jari (x,y), bagian lengan baju yang terpotong bawah layar
  let handURL = null, handEl = null, handPx = null, handIn = null, nextPulse = 8, lastHit = 0;
  const hp = { x: 0, y: 0 };
  function getHandURL() {
    if (handURL) return handURL;
    if (CFG.handSrc) return (handURL = CFG.handSrc);
    try {
      const bin = atob(HAND_B64), u = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
      handURL = URL.createObjectURL(new Blob([u], { type: "image/png" }));
    } catch (_) { handURL = "data:image/png;base64," + HAND_B64; }
    return handURL;
  }
  /* posisi tangan: "center" = tengah layar (saat tangan baru muncul), "dock" = ujung jari tepat di pusat lubang hitam */
  function handBox(W, H, mode) {
    const G = geo(W, H), mob = W < 760 || H > W * 1.15, k = 1 - HAND_TY - HAND_SL;
    let h, cx;
    if (mode === "center") { h = Math.min(H * 0.9, W * 1.9); cx = W / 2; }
    else {
      const tx = G.cx, ty = mob ? G.cy + G.R * 0.55 : G.cy - G.R * 0.12;
      h = Math.min((H - ty) / k, H * (mob ? 0.62 : 0.92));
      cx = tx - (HAND_TX - 0.5) * h * HAND_AR;
    }
    return { h, cx, bottom: -HAND_SL * h, tipX: cx + (HAND_TX - 0.5) * h * HAND_AR, tipY: H + (HAND_SL - 1 + HAND_TY) * h };
  }
  function applyHand(el, b) { el.style.setProperty("--hh", b.h.toFixed(1) + "px"); el.style.setProperty("--hl", b.cx.toFixed(1) + "px"); el.style.setProperty("--hb", b.bottom.toFixed(1) + "px"); }
  function handHTML(cls) {
    const u = getHandURL();
    return '<div class="gj-hand' + (cls ? " " + cls : "") + '" aria-hidden="true"><div class="gj-hand-px"><div class="gj-hand-in">' +
      '<i class="gj-hand-aura"></i><i class="gj-hand-halo"></i>' +
      '<img class="gj-hand-g gj-hand-g1" alt="" draggable="false" src="' + u + '"><img class="gj-hand-g gj-hand-g2" alt="" draggable="false" src="' + u + '">' +
      '<img class="gj-hand-img" alt="" draggable="false" src="' + u + '"><i class="gj-hand-flare"></i><i class="gj-hand-star"></i></div></div></div>';
  }
  function streaksHTML() {
    let s = '<div class="gj-streaks">';
    for (let i = 0; i < 16; i++) s += '<i style="left:' + rnd(4, 96).toFixed(1) + '%;--d:' + rnd(1.1, 2.4).toFixed(2) + 's;--l:' + (rnd(10, 26) | 0) + 'vh;animation-delay:-' + rnd(0, 2).toFixed(2) + 's"></i>';
    return s + "</div>";
  }
  /* tangan permanen di latar mode Domain (di belakang konten, di depan lubang hitam) */
  function layoutHand() { if (handEl) applyHand(handEl, handBox(innerWidth, innerHeight, "dock")); }
  function ensureHand() {
    if (handEl && handEl.isConnected) return;
    const host = document.querySelector(".background-pattern"); if (!host) return;
    const d = document.createElement("div"); d.innerHTML = handHTML("gj-bg-hand"); handEl = d.firstChild;
    handPx = handEl.querySelector(".gj-hand-px"); handIn = handEl.querySelector(".gj-hand-in");
    host.appendChild(handEl); layoutHand();
  }
  function hit() {
    if (!handIn) return;
    handIn.classList.remove("is-hit"); void handIn.offsetWidth; handIn.classList.add("is-hit");
    clearTimeout(handIn._t); handIn._t = setTimeout(() => handIn.classList.remove("is-hit"), 1000);
  }
  function pulseHand(loud) {                              // denyut energi dari ujung jari: cincin kejut + kilat tangan
    if (!handEl || !isDom() || busy) return;
    const b = handBox(innerWidth, innerHeight, "dock"), m = Math.min(innerWidth, innerHeight);
    hit();
    if (bg) { bg.ring(b.tipX, b.tipY, m * 0.62, 1.2, "200,225,255", 5); bg.ring(b.tipX, b.tipY, m * 0.95, 1.7, "166,107,255", 3, 0.12); }
    if (loud) sfxClick("hand");
  }
  function handHit(n) { const now = performance.now(); if (now - lastHit < 600) return; lastHit = now; if (n % 5 === 0) pulseHand(true); else hit(); }
  function updateHand(dt) {                               // tangan mengambang + miring pelan mengikuti kursor + denyut tiap 8-14 dtk
    if (!handEl || !isDom()) return;
    const tx = ptr.on ? ptr.x / innerWidth - 0.5 : 0, ty = ptr.on ? ptr.y / innerHeight - 0.5 : 0, k = 1 - Math.exp(-dt * 3);
    hp.x += (tx - hp.x) * k; hp.y += (ty - hp.y) * k;
    handPx.style.transform = "translate3d(" + (-hp.x * 22).toFixed(1) + "px," + (-hp.y * 12).toFixed(1) + "px,0) rotate(" + (hp.x * 1.8).toFixed(2) + "deg)";
    nextPulse -= dt; if (nextPulse <= 0) { nextPulse = rnd(8, 14); pulseHand(false); }
  }

  /* ---------- bunyi ---------- */
  let ac = null, master = null, nbuf = null;
  const sndOK = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  function audio() {
    if (!sndOK()) return null;
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC();
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    master = ac.createGain(); master.gain.value = 0.55 * CFG.volume; master.connect(comp); comp.connect(ac.destination);
    nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  const bus = () => { const g = ac.createGain(); g.connect(master); return g; };
  function stopBus(b) { if (!b || !ac) return; const t = ac.currentTime; b.gain.cancelScheduledValues(t); b.gain.setValueAtTime(b.gain.value, t); b.gain.linearRampToValueAtTime(0, t + 0.2); }
  function tone(d, type, f0, f1, t, dur, vol, att) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.02)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(d); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(d, ft, f0, f1, t, dur, vol, q, att) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1; f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || Math.min(0.03, dur / 3))); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(d); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  function sfxEnter() {
    if (!audio()) return null; const b = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    tone(b, "sine", 260, 980, s(0.2), 1.6 * K, 0.07, 0.9 * K); tone(b, "triangle", 130, 520, s(0.2), 1.6 * K, 0.05, 0.9 * K);
    noise(b, "bandpass", 300, 4200, s(0.2), 1.6 * K, 0.07, 1.2, 0.8 * K);
    tone(b, "sine", 130, 36, s(1.8), 1.2, 0.6, 0.005); noise(b, "highpass", 5000, 1200, s(1.8), 0.9, 0.3, 1, 0.005);   // Hollow Purple meledak
    [523, 659, 784, 1047, 1319].forEach((f, i) => tone(b, "sine", f, 0, s(1.85 + i * 0.07), 2.2, 0.05, 0.01));
    return b;
  }
  function sfxDomain() {
    if (!audio()) return null; const b = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise(b, "bandpass", 380, 5200, s(0.25), 0.7 * K, 0.1, 1.4, 0.5 * K);                                    // tangan terangkat (desir naik)
    [1760, 2637, 3520].forEach((f, i) => tone(b, "sine", f, 0, s(0.92 + i * 0.03), 1.4, 0.035, 0.004));       // jari menyilang: ting kristal
    tone(b, "sawtooth", 42, 74, s(0), 3.4 * K, 0.055, 1.4 * K); noise(b, "bandpass", 140, 2600, s(0), 1.0 * K, 0.09, 1, 0.5 * K);
    tone(b, "sine", 90, 40, s(0.55), 0.35, 0.3, 0.005);                                                     // detak
    noise(b, "highpass", 3500, 1800, s(0.9), 0.18, 0.5, 1, 0.004); tone(b, "sine", 160, 45, s(0.9), 0.6, 0.6, 0.004);   // TEPUKAN
    [220, 329.6, 440, 659.3].forEach((f, i) => tone(b, "sine", f, f * 1.02, s(1.0 + i * 0.1), 2.6 * K, 0.04, 0.9 * K));    // lubang hitam membuka
    for (let i = 0; i < 9; i++) tone(b, "sine", rnd(1800, 4200), 0, s(1.4 + i * 0.22), 0.5, 0.025, 0.005);
    [1.7, 2.15, 2.6].forEach(x => { noise(b, "lowpass", 1400, 260, s(x), 0.28, 0.24, 1, 0.01); tone(b, "sine", 300, 70, s(x), 0.25, 0.2, 0.005); });   // cipratan tinta
    tone(b, "sine", 100, 30, s(3.3), 1.5, 0.7, 0.005); noise(b, "highpass", 2800, 700, s(3.3), 0.9, 0.25, 1, 0.01);        // judul menghantam
    [196, 294, 392, 587].forEach((f, i) => tone(b, "triangle", f, 0, s(3.3 + i * 0.04), 2.4, 0.05, 0.02));
    tone(b, "sine", 70, 28, s(5.5), 1.4, 0.6, 0.01); noise(b, "highpass", 4000, 1200, s(5.5), 1.1, 0.28, 1, 0.01);           // kilat akhir
    return b;
  }
  function sfxCollapse() {
    if (!audio()) return null; const b = bus(), t = ac.currentTime + 0.03;
    tone(b, "sine", 900, 60, t, 0.9, 0.12, 0.01); noise(b, "bandpass", 4200, 200, t, 0.9, 0.14, 1, 0.1);
    tone(b, "sine", 110, 32, t + 0.85, 0.7, 0.55, 0.005); noise(b, "highpass", 3500, 900, t + 0.85, 0.5, 0.22, 1, 0.005);
    return b;
  }
  function sfxSix() {
    if (!audio()) return null; const b = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    tone(b, "sine", 98, 196, s(0), 2.2 * K, 0.08, 1.2 * K); tone(b, "triangle", 196, 392, s(0), 2.2 * K, 0.04, 1.4 * K);              // dengung naik
    noise(b, "bandpass", 500, 3400, s(0.6), 0.7 * K, 0.13, 1.2, 0.3 * K);                                                          // kain ditarik naik
    tone(b, "sine", 2600, 5200, s(0.95), 0.5, 0.05, 0.005);                                                                        // garis cahaya muncul
    noise(b, "bandpass", 700, 4800, s(1.4), 0.8 * K, 0.1, 1.2, 0.4 * K);                                                           // kelopak membuka
    tone(b, "sine", 96, 34, s(2.2), 1.6, 0.65, 0.006); noise(b, "highpass", 3000, 900, s(2.2), 1.0, 0.3, 1, 0.01);                 // mata terbuka: dentum
    [880, 1108.7, 1318.5, 1760, 2217].forEach((f, i) => tone(b, "sine", f, f * 1.003, s(2.22 + i * 0.06), 3.2, 0.045, 0.02));      // paduan kristal
    for (let i = 0; i < 10; i++) tone(b, "sine", rnd(2400, 5200), 0, s(2.5 + i * 0.18), 0.5, 0.02, 0.004);
    tone(b, "sine", 80, 32, s(3.0), 1.2, 0.5, 0.006); tone(b, "triangle", 440, 0, s(3.0), 2, 0.04, 0.02);                          // kanji menghantam
    tone(b, "sine", 200, 1800, s(4.4), 1.0 * K, 0.07, 0.9 * K); noise(b, "bandpass", 300, 7000, s(4.4), 1.0 * K, 0.12, 1.4, 0.8 * K);  // masuk ke iris
    tone(b, "sine", 70, 28, s(5.3), 1.4, 0.55, 0.01); noise(b, "highpass", 4000, 1200, s(5.3), 1.1, 0.26, 1, 0.01);                // kilat akhir
    return b;
  }
  function sfxUnsix() {
    if (!audio()) return null; const b = bus(), t = ac.currentTime + 0.03;
    noise(b, "bandpass", 3200, 500, t + 0.2, 0.55, 0.12, 1.2, 0.2); tone(b, "sine", 700, 120, t + 0.2, 0.6, 0.06, 0.1);
    tone(b, "sine", 100, 34, t + 0.85, 0.7, 0.5, 0.005); noise(b, "highpass", 3500, 900, t + 0.85, 0.4, 0.2, 1, 0.005);
    return b;
  }
  function sfxClick(kind) {
    if (!audio()) return; const b = bus(), t = ac.currentTime;
    if (kind === "ao") { tone(b, "sine", 500, 1500, t, 0.35, 0.08); tone(b, "sine", 130, 55, t + 0.3, 0.3, 0.25); }
    else if (kind === "aka") { tone(b, "sine", 170, 42, t, 0.5, 0.38); noise(b, "lowpass", 900, 200, t, 0.4, 0.12); }
    else if (kind === "mur") { tone(b, "sine", 140, 34, t, 0.9, 0.5); noise(b, "highpass", 4000, 1200, t, 0.6, 0.2); [659, 988, 1319].forEach((f, i) => tone(b, "sine", f, 0, t + i * 0.05, 1.2, 0.05)); }
    else if (kind === "six") { tone(b, "sine", 1760, 2640, t, 0.3, 0.05, 0.005); tone(b, "sine", 880, 0, t + 0.05, 0.8, 0.04, 0.005); noise(b, "highpass", 5000, 3000, t, 0.12, 0.08, 1, 0.003); }
    else if (kind === "hand") { tone(b, "sine", 1320, 0, t, 0.9, 0.05, 0.005); tone(b, "sine", 1980, 0, t + 0.04, 1.1, 0.03, 0.005); tone(b, "sine", 120, 48, t, 0.4, 0.25, 0.005); noise(b, "highpass", 4500, 2000, t, 0.25, 0.12, 1, 0.004); }
    else { noise(b, "lowpass", 1900, 240, t, 0.26, 0.24, 1, 0.01); tone(b, "sine", 280, 66, t, 0.26, 0.22, 0.005); }
  }

  /* ---------- cipratan tinta (gaya gambar referensi: putih bercahaya & hitam berbingkai biru) ---------- */
  function mkSplat(x, y, s, kind) {
    const n = 16, pts = [], drops = [], streaks = [];
    for (let i = 0; i < n; i++) { const a = i / n * TAU, r = s * (i % 2 ? rnd(0.5, 0.8) : rnd(0.9, 1.35)); pts.push([Math.cos(a) * r, Math.sin(a) * r]); }
    for (let i = 0, m = 10 + (Math.random() * 8 | 0); i < m; i++) { const a = rnd(0, TAU), d = s * rnd(1.25, 3.4); drops.push([Math.cos(a) * d, Math.sin(a) * d, s * rnd(0.025, 0.13)]); }
    for (let i = 0, m = 4 + (Math.random() * 4 | 0); i < m; i++) streaks.push([rnd(0, TAU), s * rnd(1.4, 3.8), s * rnd(0.05, 0.12)]);
    return { x, y, s, kind, pts, drops, streaks, t: 0, d: rnd(3.4, 6.2), rot: rnd(0, TAU) };
  }
  function drawSplat(c, p, mul) {
    const pop = clamp(p.t / 0.22, 0, 1), sc = pop < 1 ? eo(pop) * (1 + 0.5 * Math.sin(pop * Math.PI)) : 1;
    const a = clamp(p.t / 0.06, 0, 1) * clamp((p.d - p.t) / 1.4, 0, 1) * (mul == null ? 1 : mul);
    if (a <= 0.004) return;
    const w = p.kind === "w";
    c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.scale(sc, sc);
    c.fillStyle = w ? "rgba(255,255,255," + a.toFixed(3) + ")" : "rgba(2,3,9," + a.toFixed(3) + ")";
    if (w) { c.shadowColor = "rgba(150,200,255," + (0.8 * a).toFixed(3) + ")"; c.shadowBlur = p.s * 0.35; }
    for (const q of p.streaks) {                       // cipratan memanjang (lancip)
      c.save(); c.rotate(q[0]); c.beginPath(); c.moveTo(p.s * 0.4, -q[2]); c.lineTo(q[1], 0); c.lineTo(p.s * 0.4, q[2]); c.closePath(); c.fill(); c.restore();
    }
    const P = p.pts, n = P.length;                     // gumpalan utama (kurva halus)
    c.beginPath(); c.moveTo((P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2);
    for (let i = 0; i < n; i++) { const q = P[i], q2 = P[(i + 1) % n]; c.quadraticCurveTo(q[0], q[1], (q[0] + q2[0]) / 2, (q[1] + q2[1]) / 2); }
    c.closePath(); c.fill();
    c.shadowBlur = 0;
    for (const d of p.drops) { c.beginPath(); c.arc(d[0], d[1], d[2], 0, TAU); c.fill(); }
    if (!w) { c.strokeStyle = "rgba(130,180,255," + (0.55 * a).toFixed(3) + ")"; c.lineWidth = 1.3; c.beginPath(); c.moveTo((P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2); for (let i = 0; i < n; i++) { const q = P[i], q2 = P[(i + 1) % n]; c.quadraticCurveTo(q[0], q[1], (q[0] + q2[0]) / 2, (q[1] + q2[1]) / 2); } c.closePath(); c.stroke(); }
    c.restore();
  }

  /* ---------- posisi lubang hitam (desktop: kanan-tengah, HP: atas-tengah) ---------- */
  function geo(W, H) {
    return (W < 760 || H > W * 1.15)
      ? { cx: W * 0.5, cy: H * 0.30, R: Math.min(W * 0.32, H * 0.19) }
      : { cx: W * 0.67, cy: H * 0.47, R: Math.min(H * 0.25, W * 0.17) };
  }

  /* ---------- penggambar utama (dipakai latar DAN adegan, jadi hasilnya persis sama) ---------- */
  function makeRenderer(cv) {
    const c = cv.getContext("2d");
    let W = 0, H = 0, T = 0, stars = [], flows = [], wisps = [], splats = [], rings = [], sparks = [];
    let nSplat = 1.2, nSpark = 0.3, ang = 0, ph = "orbit", phT = 0, nMur = 9, trA = [], trB = [], blast = null;
    const newFlow = init => { const G = geo(W, H); return { a: rnd(0, TAU), r: G.R * (init ? rnd(1.15, 9) : rnd(5, 9)), s: rnd(0.8, 1.8) }; };
    function build() {
      stars = Array.from({ length: Math.round(clamp(W * H / 7500, 80, 240)) }, () => ({ x: rnd(0, W), y: rnd(0, H), r: Math.random() < 0.15 ? rnd(1.1, 1.8) : rnd(0.4, 0.95), a: rnd(0.3, 0.85), ph: rnd(0, TAU), sp: rnd(0.6, 2.2), dp: Math.random() }));
      flows = Array.from({ length: Math.round(clamp(W * H / 9000, 60, 170)) }, () => newFlow(true));
      wisps = Array.from({ length: 54 }, () => ({ k: rnd(1.07, 1.95), a: rnd(0, TAU), len: rnd(0.25, 1.1), w: rnd(0.6, 2.8), al: rnd(0.08, 0.34), sp: rnd(0.5, 1.2) }));
    }
    function glow(x, y, r, rgb, a) {
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255," + a.toFixed(3) + ")"); g.addColorStop(0.18, "rgba(" + rgb + "," + (a * 0.95).toFixed(3) + ")");
      g.addColorStop(0.5, "rgba(" + rgb + "," + (a * 0.28).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + rgb + ",0)");
      c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    }
    function drawStars(k) {
      for (const s of stars) {
        const a = s.a * (0.55 + 0.45 * Math.sin(T * s.sp + s.ph)) * k;
        c.fillStyle = "rgba(200,222,255," + a.toFixed(3) + ")";
        if (s.r < 1) c.fillRect(s.x, s.y, s.r * 1.6, s.r * 1.6); else { c.beginPath(); c.arc(s.x, s.y, s.r, 0, TAU); c.fill(); }
      }
    }
    /* ===== BIASA: Infinity + Ao / Aka / Hollow Purple ===== */
    function drawNormal(dt) {
      const mob = W < 760, oc = mob ? [W * 0.5, H * 0.2] : [W * 0.74, H * 0.3], oR = Math.min(W, H) * (mob ? 0.16 : 0.12), sr = Math.min(W, H) * 0.024;
      phT += dt; let rr = oR, spin = 0.6;
      if (ph === "orbit") { if (phT > nMur) { ph = "conv"; phT = 0; } }
      else if (ph === "conv") { const u = clamp(phT / 2.2, 0, 1); rr = oR * (1 - eio(u)); spin = 0.6 + 3.2 * u; if (phT >= 2.2) { ph = "pur"; phT = 0; blast = { t: 0 }; } }
      else if (ph === "pur") { rr = 0; spin = 0; if (phT >= 1.3) { ph = "split"; phT = 0; } }
      else { const u = clamp(phT / 1.6, 0, 1); rr = oR * eio(u); spin = 0.6 + 1.6 * (1 - u); if (phT >= 1.6) { ph = "orbit"; phT = 0; nMur = rnd(12, 20); } }
      ang += dt * spin;
      const ax = oc[0] + Math.cos(ang) * rr, ay = oc[1] + Math.sin(ang) * rr * 0.78, bx = oc[0] * 2 - ax, by = oc[1] * 2 - ay;
      drawStars(1);
      // kisi Infinity: titik-titik terdorong menjauhi kursor & bola (tak ada yang bisa menyentuh)
      const src = [];
      if (ptr.on) src.push({ x: ptr.x, y: ptr.y, r: 190 });
      if (ph === "pur") src.push({ x: oc[0], y: oc[1], r: sr * 9 }); else { src.push({ x: ax, y: ay, r: sr * 6 }); src.push({ x: bx, y: by, r: sr * 6 }); }
      const sp = W < 700 ? 38 : 46, near = [];
      c.fillStyle = "rgba(150,200,255,.16)";
      for (let y = sp / 2; y < H; y += sp) for (let x = sp / 2; x < W; x += sp) {
        let dx = 0, dy = 0, nr = 0;
        for (const q of src) { const ex = x - q.x, ey = y - q.y, d = Math.hypot(ex, ey); if (d < q.r && d > 0.1) { const f = Math.pow(1 - d / q.r, 2) * q.r * 0.42; dx += ex / d * f; dy += ey / d * f; nr = Math.max(nr, 1 - d / q.r); } }
        if (nr > 0) near.push([x + dx, y + dy, nr]); else c.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
      }
      for (const p of near) { c.fillStyle = "rgba(170,215,255," + (0.16 + p[2] * 0.75).toFixed(3) + ")"; const z = 1.6 + p[2] * 1.4; c.fillRect(p[0] - z / 2, p[1] - z / 2, z, z); }
      if (ptr.on) {                                     // cincin penghalang di sekitar kursor
        const g = c.createRadialGradient(ptr.x, ptr.y, 20, ptr.x, ptr.y, 110);
        g.addColorStop(0, "rgba(90,170,255,.0)"); g.addColorStop(0.8, "rgba(90,170,255,.10)"); g.addColorStop(1, "rgba(90,170,255,0)");
        c.fillStyle = g; c.beginPath(); c.arc(ptr.x, ptr.y, 110, 0, TAU); c.fill();
        c.strokeStyle = "rgba(150,210,255,.28)"; c.lineWidth = 1.2; c.beginPath(); c.arc(ptr.x, ptr.y, 62 + Math.sin(T * 2) * 3, 0, TAU); c.stroke();
      }
      // Ao & Aka
      c.save(); c.globalCompositeOperation = "lighter";
      if (ph !== "pur") {
        trA.push([ax, ay]); trB.push([bx, by]); if (trA.length > 20) { trA.shift(); trB.shift(); }
        trA.forEach((p, i) => glow(p[0], p[1], sr * (0.6 + 1.6 * i / 20), "70,150,255", 0.2 * i / 20));
        trB.forEach((p, i) => glow(p[0], p[1], sr * (0.6 + 1.6 * i / 20), "255,60,90", 0.2 * i / 20));
        glow(ax, ay, sr * 4.2, "70,150,255", 0.95); glow(bx, by, sr * 4.2, "255,60,90", 0.95);
      } else {
        trA.length = trB.length = 0;
        glow(oc[0], oc[1], sr * (6.5 + 0.7 * Math.sin(T * 16)), "176,96,255", 1);
        glow(oc[0], oc[1], sr * 2.6, "255,235,255", 1);
      }
      if (blast) {
        blast.t += dt; const u = blast.t / 1.7;
        if (u >= 1) blast = null; else {
          for (let i = 0; i < 2; i++) { const v = clamp(u - i * 0.12, 0, 1); c.strokeStyle = "rgba(176,110,255," + ((1 - v) * 0.6).toFixed(3) + ")"; c.lineWidth = 3 + (1 - v) * 9; c.beginPath(); c.arc(oc[0], oc[1], eo(v) * Math.max(W, H) * 0.5, 0, TAU); c.stroke(); }
          c.fillStyle = "rgba(150,80,255," + (Math.max(0, 1 - u * 2.4) * 0.12).toFixed(3) + ")"; c.fillRect(0, 0, W, H);
        }
      }
      // kerlip Six Eyes
      nSpark -= dt; if (nSpark < 0) { sparks.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(5, 12), t: 0, d: rnd(0.9, 1.6) }); nSpark = rnd(0.35, 0.8); }
      sparks = sparks.filter(q => (q.t += dt) < q.d);
      for (const q of sparks) {
        const u = q.t / q.d, a = Math.sin(u * Math.PI), r = q.r * (0.5 + a * 0.6);
        c.strokeStyle = "rgba(190,230,255," + (a * 0.85).toFixed(3) + ")"; c.lineWidth = 1.2; c.beginPath();
        c.moveTo(q.x - r, q.y); c.lineTo(q.x + r, q.y); c.moveTo(q.x, q.y - r * 1.5); c.lineTo(q.x, q.y + r * 1.5); c.stroke();
      }
      c.restore();
    }
    /* ===== DOMAIN: Unlimited Void - lubang hitam bercincin pelangi + pusaran + cipratan tinta ===== */
    function drawDomain(dt, g) {
      const G = geo(W, H), gr = clamp(g, 0, 1), R = Math.max(0.5, G.R * gr), cx = G.cx, cy = G.cy;
      c.fillStyle = "rgba(0,0,8," + (0.55 * gr).toFixed(3) + ")"; c.fillRect(0, 0, W, H);
      const haze = c.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 4.2);
      haze.addColorStop(0, "rgba(70,120,255," + (0.34 * gr).toFixed(3) + ")"); haze.addColorStop(0.35, "rgba(40,70,200," + (0.16 * gr).toFixed(3) + ")"); haze.addColorStop(1, "rgba(10,20,80,0)");
      c.fillStyle = haze; c.fillRect(0, 0, W, H);
      drawStars(0.35 + 0.65 * gr);
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
      // aliran bintang tersedot ke lubang hitam
      const vis = clamp(gr * 3, 0, 1);
      for (const f of flows) {
        const q = G.R / Math.max(f.r, G.R * 0.5), w = (0.12 + 1.5 * q * q) * f.s, vr = (0.18 + 1.6 * q * q) * G.R * f.s;
        f.a += w * dt; f.r -= vr * dt; if (f.r < G.R * 1.03) { Object.assign(f, newFlow(false)); continue; }
        const a2 = f.a - w * 0.09, r2 = f.r + vr * 0.09, al = clamp(0.16 + 0.6 * q, 0, 0.85) * vis;
        c.strokeStyle = "rgba(" + (q > 0.55 ? "170,230,255" : "205,225,255") + "," + al.toFixed(3) + ")"; c.lineWidth = 0.7 + q * 1.5;
        c.beginPath(); c.moveTo(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2); c.lineTo(cx + Math.cos(f.a) * f.r, cy + Math.sin(f.a) * f.r); c.stroke();
      }
      // pusaran kabut di sekeliling cincin
      for (const w of wisps) {
        c.strokeStyle = "rgba(200,222,255," + (w.al * vis).toFixed(3) + ")"; c.lineWidth = w.w;
        const a0 = w.a + T * w.sp * (1.4 / w.k); c.beginPath(); c.arc(cx, cy, R * w.k, a0, a0 + w.len); c.stroke();
      }
      // cincin tipis konsentris (seperti gambar kedua)
      c.setLineDash([3, 11]); c.lineWidth = 1;
      [1.55, 1.85, 2.3].forEach((k, i) => { c.strokeStyle = "rgba(140,190,255," + ((0.16 - i * 0.04) * vis).toFixed(3) + ")"; c.lineDashOffset = -T * (8 + i * 5) * (i % 2 ? -1 : 1); c.beginPath(); c.arc(cx, cy, R * k, 0, TAU); c.stroke(); });
      c.setLineDash([]);
      // cincin pelangi bercahaya (emas - merah muda - ungu - biru - cyan)
      let grad = "#9fd0ff";
      if (c.createConicGradient) {
        grad = c.createConicGradient(T * 0.35, cx, cy);
        [[0, "#ffe9a8"], [0.1, "#ffd27a"], [0.2, "#ff9ad0"], [0.32, "#a66bff"], [0.46, "#4f86ff"], [0.58, "#7fe9ff"], [0.7, "#e8fbff"], [0.8, "#9fe0ff"], [0.9, "#ffd7a0"], [1, "#ffe9a8"]].forEach(s => grad.addColorStop(s[0], s[1]));
      }
      c.globalAlpha = 0.92 * gr; c.lineWidth = R * 0.11; c.strokeStyle = grad; c.shadowColor = "rgba(120,170,255,.95)"; c.shadowBlur = R * 0.45;
      c.beginPath(); c.arc(cx, cy, R * 1.06, 0, TAU); c.stroke();
      c.shadowBlur = 0;
      if (c.createConicGradient) {                       // kilau putih yang berputar di sepanjang cincin
        const h = c.createConicGradient(-T * 0.6, cx, cy);
        h.addColorStop(0, "rgba(255,255,255,0)"); h.addColorStop(0.06, "rgba(255,255,255,.95)"); h.addColorStop(0.14, "rgba(255,255,255,0)"); h.addColorStop(0.55, "rgba(255,255,255,0)"); h.addColorStop(0.6, "rgba(220,240,255,.7)"); h.addColorStop(0.68, "rgba(255,255,255,0)"); h.addColorStop(1, "rgba(255,255,255,0)");
        c.lineWidth = R * 0.05; c.strokeStyle = h; c.beginPath(); c.arc(cx, cy, R * 1.06, 0, TAU); c.stroke();
      }
      c.lineWidth = Math.max(1.5, R * 0.022); c.strokeStyle = "rgba(255,255,255,.95)"; c.beginPath(); c.arc(cx, cy, R * 1.0, 0, TAU); c.stroke();
      // kilau lensa (garis horizontal & vertikal tipis)
      const lf = c.createLinearGradient(cx - R * 3, 0, cx + R * 3, 0);
      lf.addColorStop(0, "rgba(180,210,255,0)"); lf.addColorStop(0.5, "rgba(210,230,255,.5)"); lf.addColorStop(1, "rgba(180,210,255,0)");
      c.globalAlpha = gr; c.fillStyle = lf; c.fillRect(cx - R * 3, cy - 1, R * 6, 2);
      c.globalAlpha = 1; c.restore();
      // inti hitam
      const core = c.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 1.0);
      core.addColorStop(0, "#000"); core.addColorStop(0.85, "#000"); core.addColorStop(1, "rgba(0,0,6,.92)");
      c.fillStyle = core; c.beginPath(); c.arc(cx, cy, R * 0.99, 0, TAU); c.fill();
      // gelombang kejut
      c.save(); c.globalCompositeOperation = "lighter";
      rings = rings.filter(r => (r.t += dt) < r.d);
      for (const r of rings) { if (r.t < 0) continue; const u = r.t / r.d; c.strokeStyle = "rgba(" + r.col + "," + ((1 - u) * 0.85).toFixed(3) + ")"; c.lineWidth = r.w * (1 - u) + 0.8; c.beginPath(); c.arc(r.x, r.y, r.r1 * eo(u), 0, TAU); c.stroke(); }
      c.restore();
      // cipratan tinta
      if (o_auto && gr > 0.95) { nSplat -= dt; if (nSplat < 0 && splats.length < 14) { R_API.burstInk(1); nSplat = rnd(0.9, 2.1); } }
      splats = splats.filter(p => (p.t += dt) < p.d);
      for (const p of splats) drawSplat(c, p, 1);
    }
    /* ===== SIX EYES (PEMBARUAN 50): iris raksasa + HUD analisis + aliran energi + partikel biru-putih-ungu ===== */
    let sixP = null, sixBlink = 0, sixBlinkT = rnd(5, 9);
    function hexPath(r) { c.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; if (i) c.lineTo(Math.cos(a) * r, Math.sin(a) * r); else c.moveTo(r, 0); } c.closePath(); }
    function drawSix(dt, g) {
      const mob = W < 760 || H > W * 1.15, cx = mob ? W * 0.5 : W * 0.7, cy = mob ? H * 0.27 : H * 0.44, R = mob ? Math.min(W * 0.3, H * 0.17) : Math.min(H * 0.24, W * 0.17);
      if (!sixP || sixP.w !== W + H) sixP = { w: W + H, list: Array.from({ length: Math.round(clamp(W * H / 15000, 40, 110)) }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.8, 2.6), v: rnd(10, 34), ph: rnd(0, TAU), col: Math.random() < 0.22 ? "196,160,255" : Math.random() < 0.5 ? "255,255,255" : "160,214,255" })) };
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
      for (let i = 0; i < 10; i++) {                                          // aliran energi: garis melengkung tipis
        const y0 = H * (i + 0.5) / 10, ph = T * 0.25 + i * 1.7, a = 0.05 + 0.04 * Math.sin(T * 0.8 + i);
        c.strokeStyle = "rgba(" + (i % 3 === 0 ? "200,170,255" : "200,230,255") + "," + (a * g).toFixed(3) + ")"; c.lineWidth = 1 + (i % 3) * 0.8;
        c.beginPath(); c.moveTo(-20, y0 + Math.sin(ph) * 24);
        for (let x = 0; x <= W + 40; x += 40) c.lineTo(x, y0 + Math.sin(ph + x * 0.004) * 26 + Math.sin(ph * 1.7 + x * 0.011) * 9);
        c.stroke();
      }
      for (const p of sixP.list) {                                            // partikel melayang naik
        p.y -= p.v * dt; p.x += Math.sin(T * 0.6 + p.ph) * 8 * dt; if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); }
        const a = (0.28 + 0.3 * Math.sin(T * 1.4 + p.ph)) * g;
        c.fillStyle = "rgba(" + p.col + "," + a.toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill();
        c.fillStyle = "rgba(" + p.col + "," + (a * 0.18).toFixed(3) + ")"; c.beginPath(); c.arc(p.x, p.y, p.r * 4, 0, TAU); c.fill();
      }
      const halo = c.createRadialGradient(cx, cy, R * 0.3, cx, cy, R * 3.6);
      halo.addColorStop(0, "rgba(255,255,255," + (0.5 * g).toFixed(3) + ")"); halo.addColorStop(0.22, "rgba(130,200,255," + (0.32 * g).toFixed(3) + ")");
      halo.addColorStop(0.55, "rgba(150,120,255," + (0.13 * g).toFixed(3) + ")"); halo.addColorStop(1, "rgba(120,160,255,0)");
      c.fillStyle = halo; c.fillRect(cx - R * 3.6, cy - R * 3.6, R * 7.2, R * 7.2);
      c.restore();
      sixBlinkT -= dt; if (sixBlinkT < 0 && !sixBlink) { sixBlink = 0.0001; sixBlinkT = rnd(6, 11); }
      let sy = 1; if (sixBlink) { sixBlink += dt; const u = sixBlink / 0.3; if (u >= 1) sixBlink = 0; else sy = Math.max(0.06, Math.abs(1 - 2 * u)); }
      c.save(); c.translate(cx, cy); c.scale(1, sy); c.globalAlpha = g;                 // iris (berkedip: ditipiskan ke atas-bawah)
      const ir = c.createRadialGradient(0, 0, R * 0.12, 0, 0, R);
      ir.addColorStop(0, "#d9f6ff"); ir.addColorStop(0.28, "#74d0ff"); ir.addColorStop(0.62, "#2f8cff"); ir.addColorStop(0.9, "#3b4fd8"); ir.addColorStop(1, "#5a3cc4");
      c.fillStyle = ir; c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fill();
      c.globalCompositeOperation = "lighter";
      for (let i = 0; i < 90; i++) {
        const a = i / 90 * TAU + 0.03 * Math.sin(T * 0.3 + i), r0 = R * 0.26, r1 = R * (0.62 + 0.3 * Math.abs(Math.sin(i * 7.3))), al = 0.1 + 0.18 * Math.abs(Math.sin(T * 0.9 + i * 1.3));
        c.strokeStyle = "rgba(210,240,255," + al.toFixed(3) + ")"; c.lineWidth = 1; c.beginPath(); c.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); c.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); c.stroke();
      }
      c.globalCompositeOperation = "source-over";
      c.strokeStyle = "rgba(235,248,255,.9)"; c.lineWidth = Math.max(2, R * 0.045); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.stroke();
      c.fillStyle = "#02030c"; c.beginPath(); c.arc(0, 0, R * 0.2, 0, TAU); c.fill();
      c.fillStyle = "rgba(255,255,255,.95)"; c.beginPath(); c.arc(-R * 0.1, -R * 0.12, R * 0.065, 0, TAU); c.fill();
      c.restore();
      c.save(); c.globalCompositeOperation = "lighter"; c.translate(cx, cy);          // HUD analisis Six Eyes
      const hv = clamp(sy, 0, 1) * g;
      c.save(); c.rotate(T * 0.12); c.setLineDash([2, 9]); c.strokeStyle = "rgba(180,220,255," + (0.35 * hv).toFixed(3) + ")"; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 0, R * 1.28, 0, TAU); c.stroke(); c.restore();
      c.save(); c.rotate(-T * 0.08);
      for (let i = 0; i < 72; i++) { const a = i / 72 * TAU, lg = i % 6 === 0, r0 = R * 1.42, r1 = r0 + R * (lg ? 0.14 : 0.06); c.strokeStyle = "rgba(" + (lg ? "255,255,255" : "170,210,255") + "," + ((lg ? 0.7 : 0.35) * hv).toFixed(3) + ")"; c.lineWidth = lg ? 1.6 : 1; c.beginPath(); c.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); c.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); c.stroke(); }
      c.restore();
      c.save(); c.rotate(T * 0.18); c.strokeStyle = "rgba(190,150,255," + (0.55 * hv).toFixed(3) + ")"; c.lineWidth = Math.max(2, R * 0.03);
      for (let i = 0; i < 3; i++) { const a0 = i * TAU / 3; c.beginPath(); c.arc(0, 0, R * 1.78, a0, a0 + 0.9); c.stroke(); } c.restore();
      c.restore();
      if (ptr.on) {                                                          // retikel heksagon di kursor
        c.save(); c.globalCompositeOperation = "lighter"; c.translate(ptr.x, ptr.y);
        c.rotate(T * 0.6); hexPath(30 + Math.sin(T * 3) * 2); c.strokeStyle = "rgba(225,242,255,.6)"; c.lineWidth = 1.4; c.stroke();
        c.rotate(-T * 1.2); hexPath(18); c.strokeStyle = "rgba(196,160,255,.55)"; c.lineWidth = 1.2; c.stroke(); c.restore();
      }
    }
    let o_auto = true;
    const R_API = {
      resize(dpr) { W = innerWidth; H = innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); c.setTransform(dpr, 0, 0, dpr, 0, 0); build(); },
      auto(v) { o_auto = !!v; },
      ring(x, y, r1, d, col, w, delay) { rings.push({ x, y, r1, d, t: -(delay || 0), col, w }); },
      geo() { return geo(W, H); },
      burstInk(n) {
        const G = geo(W, H);
        for (let i = 0; i < (n || 1); i++) {
          const a = rnd(-0.9, 0.9), d = G.R * rnd(1.6, 3.2);
          splats.push(mkSplat(Math.min(G.cx + Math.cos(a) * d, W * 0.96), clamp(G.cy + Math.sin(a) * d, 20, H - 20), G.R * rnd(0.16, 0.34), "w"));
          const a2 = rnd(0, TAU), d2 = G.R * rnd(0.9, 1.55);
          splats.push(mkSplat(G.cx + Math.cos(a2) * d2, G.cy + Math.sin(a2) * d2, G.R * rnd(0.1, 0.22), "k"));
        }
      },
      frame(dt, mode, g) {
        T += dt; c.clearRect(0, 0, W, H);
        if (mode === "domain") drawDomain(dt, g == null ? 1 : g);
        else if (mode === "six") drawSix(dt, g == null ? 1 : g);
        else if (mode === "stars") drawStars(0.9);
        else drawNormal(dt);
      },
      glow(x, y, r, rgb, a) { glow(x, y, r, rgb, a); },
      ctx: c
    };
    return R_API;
  }

  /* ---------- latar halaman (di balik konten) ---------- */
  let bgCv = null, bg = null, raf = 0, last = 0;
  const dprBg = () => Math.min(window.devicePixelRatio || 1, 1.5);
  function ensureBg() {
    if (bgCv) return;
    const host = document.querySelector(".background-pattern"); if (!host) return;
    bgCv = document.createElement("canvas"); bgCv.id = "gojoCanvas"; bgCv.setAttribute("aria-hidden", "true");
    host.appendChild(bgCv); bg = makeRenderer(bgCv); bg.resize(dprBg());
  }
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
    bg.frame(dt, modeName(), 1);
    updateHand(dt);
  }
  function start() {
    if (raf || document.hidden || !isOn()) return;
    ensureBg(); if (!bg) return;
    if (reduce) { bg.frame(0.016, modeName(), 1); return; }
    last = performance.now(); raf = requestAnimationFrame(loop);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  /* ---------- efek klik (di atas konten) ---------- */
  let fxCv = null, fxc = null, fxRaf = 0, fxLast = 0, fxs = [], fxW = 0, fxH = 0;
  function ensureFx() {
    if (fxCv) return;
    fxCv = document.createElement("canvas"); fxCv.setAttribute("aria-hidden", "true");
    fxCv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:61";
    document.body.appendChild(fxCv); fxc = fxCv.getContext("2d"); sizeFx();
  }
  function sizeFx() { if (!fxCv) return; const d = Math.min(window.devicePixelRatio || 1, 2); fxW = innerWidth; fxH = innerHeight; fxCv.width = fxW * d; fxCv.height = fxH * d; fxc.setTransform(d, 0, 0, d, 0, 0); }
  function addFx(o) { o.t = o.t || 0; fxs.push(o); if (!fxRaf) { fxLast = performance.now(); fxRaf = requestAnimationFrame(fxLoop); } }
  function fxLoop(ts) {
    const dt = Math.min(0.05, (ts - fxLast) / 1000 || 0.016); fxLast = ts;
    fxc.clearRect(0, 0, fxW, fxH); fxs = fxs.filter(o => (o.t += dt) < o.d);
    for (const o of fxs) {
      if (o.t < 0) continue;
      const u = o.t / o.d, al = 1 - u;
      if (o.k === "splat") { drawSplat(fxc, o.p, 1); o.p.t = o.t; continue; }
      fxc.save(); fxc.globalCompositeOperation = "lighter";
      if (o.k === "ring") {
        const r = o.inv ? o.r0 + (o.r1 - o.r0) * eo(u) : o.r1 * eo(u);
        fxc.strokeStyle = "rgba(" + o.col + "," + (al * 0.9).toFixed(3) + ")"; fxc.lineWidth = o.w * al + 0.8; fxc.beginPath(); fxc.arc(o.x, o.y, Math.max(1, r), 0, TAU); fxc.stroke();
      } else if (o.k === "spark") {
        o.x += o.vx * dt; o.y += o.vy * dt; o.vx *= 0.96; o.vy *= 0.96;
        fxc.fillStyle = "rgba(" + o.col + "," + al.toFixed(3) + ")"; fxc.beginPath(); fxc.arc(o.x, o.y, o.s * al + 0.4, 0, TAU); fxc.fill();
      } else if (o.k === "hex") {
        const r = Math.max(2, o.r1 * eo(u));
        fxc.strokeStyle = "rgba(" + o.col + "," + (al * 0.9).toFixed(3) + ")"; fxc.lineWidth = 2.2 * al + 0.7; fxc.beginPath();
        for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + (o.rot || 0) * u * 2; const px = o.x + Math.cos(a) * r, py = o.y + Math.sin(a) * r; if (i) fxc.lineTo(px, py); else fxc.moveTo(px, py); }
        fxc.closePath(); fxc.stroke();
      } else if (o.k === "orb") {
        const g = fxc.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * (0.6 + u));
        g.addColorStop(0, "rgba(255,255,255," + al.toFixed(3) + ")"); g.addColorStop(0.3, "rgba(" + o.col + "," + (al * 0.8).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + o.col + ",0)");
        fxc.fillStyle = g; fxc.beginPath(); fxc.arc(o.x, o.y, o.r * (0.6 + u), 0, TAU); fxc.fill();
      }
      fxc.restore();
    }
    fxRaf = fxs.length ? requestAnimationFrame(fxLoop) : 0;
    if (!fxs.length) fxc.clearRect(0, 0, fxW, fxH);
  }
  const sparks = (x, y, n, v, col, delay) => { for (let i = 0; i < n; i++) { const a = rnd(0, TAU), s = rnd(v * 0.3, v); addFx({ k: "spark", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, d: rnd(0.5, 1), s: rnd(1.6, 4), col, t: -(delay || 0) }); } };
  function clickFx(e) {
    if (!isOn() || busy || e.button > 0) return;
    if (e.target && e.target.closest && e.target.closest(SKIP)) return;
    ensureFx(); const x = e.clientX, y = e.clientY; clicks++;
    if (isSix()) {                                      // Six Eyes: analisis heksagon
      sfxClick("six");
      addFx({ k: "hex", x, y, r1: 150, d: 0.85, col: "190,225,255" }); addFx({ k: "hex", x, y, r1: 90, d: 0.65, col: "200,160,255", rot: 1, t: -0.08 });
      addFx({ k: "ring", x, y, r1: 210, d: 0.9, col: "150,205,255", w: 3 }); addFx({ k: "orb", x, y, r: 60, d: 0.5, col: "170,215,255" }); sparks(x, y, 14, 260, "215,235,255");
    } else if (isDom()) {                                      // Domain: cipratan tinta
      sfxClick("ink"); handHit(clicks);
      addFx({ k: "splat", d: 5, p: mkSplat(x, y, rnd(22, 36), "w") });
      addFx({ k: "splat", d: 4.4, p: mkSplat(x + rnd(-40, 40), y + rnd(-30, 30), rnd(12, 22), "k") });
      addFx({ k: "ring", x, y, r1: 120, d: 0.7, col: "160,200,255", w: 3 }); addFx({ k: "ring", x, y, r1: 200, d: 1, col: "176,120,255", w: 2, t: -0.08 });
    } else if (clicks % 3 === 0) {                      // Murasaki (Hollow Purple)
      sfxClick("mur");
      addFx({ k: "orb", x, y, r: 130, d: 0.7, col: "176,96,255" });
      addFx({ k: "ring", x, y, r1: 230, d: 0.9, col: "176,110,255", w: 6 }); addFx({ k: "ring", x, y, r1: 340, d: 1.2, col: "120,150,255", w: 3, t: -0.1 });
      sparks(x, y, 26, 360, "190,150,255");
    } else if (clicks % 2) {                            // Ao: menarik ke dalam, lalu pecah
      sfxClick("ao");
      addFx({ k: "ring", x, y, r0: 120, r1: 6, inv: true, d: 0.4, col: "90,170,255", w: 4 });
      addFx({ k: "orb", x, y, r: 70, d: 0.8, col: "70,150,255", t: -0.3 });
      addFx({ k: "ring", x, y, r1: 110, d: 0.6, col: "150,210,255", w: 3, t: -0.3 }); sparks(x, y, 14, 260, "150,210,255", 0.3);
    } else {                                            // Aka: mendorong keluar
      sfxClick("aka");
      addFx({ k: "orb", x, y, r: 90, d: 0.6, col: "255,60,90" });
      addFx({ k: "ring", x, y, r1: 190, d: 0.7, col: "255,70,100", w: 6 }); sparks(x, y, 20, 340, "255,120,140");
    }
  }

  /* ---------- tombol tema -> Biasa | Domain ---------- */
  function syncLabels() {
    const b = document.querySelectorAll("#themeToggle .tt-bleach b"), t = document.getElementById("themeToggle");
    if (!t || b.length < 2 || !isOn()) return;
    b[0].textContent = "Biasa"; b[1].textContent = "Domain";
    t.setAttribute("aria-checked", String(isDom()));
    t.setAttribute("aria-label", isDom() ? "Kembali ke mode Gojo biasa" : "Aktifkan Domain Expansion: Unlimited Void");
  }
  document.addEventListener("click", e => {
    if (!isOn() || !e.target.closest || !e.target.closest("#themeToggle")) return;
    e.stopImmediatePropagation(); e.preventDefault();
    if (busy) return;
    if (isDom()) collapse(); else domain();
  }, true);

  /* ---------- adegan sinematik ---------- */
  /* ---------- PEMBARUAN 50: SIX EYES - penutup mata + adegan ---------- */
  let blindEl = null;
  function bfSVG(id) {
    return '<svg class="gj-bf-svg" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#2b2b36"/><stop offset=".5" stop-color="#07070a"/><stop offset="1" stop-color="#1a1a22"/></linearGradient></defs>' +
      '<path d="M0 40 C150 10 300 70 500 38 S850 10 1000 44 L1000 160 C850 190 650 130 500 164 S150 200 0 156 Z" fill="url(#' + id + ')" stroke="#8fc2ff" stroke-opacity=".55" stroke-width="3" vector-effect="non-scaling-stroke"/>' +
      '<path d="M0 98 C200 72 320 120 500 96 S840 72 1000 100" fill="none" stroke="#7b7b92" stroke-opacity=".35" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
  }
  function sixHTML(kind) {
    return '<div class="gj-in"><canvas class="gj-cv"></canvas><div class="gj-bf">' + bfSVG("gjbfS") + '</div>' +
      (kind === "six" ? '<div class="gj-ent"><div class="gj-k2">六眼</div><div class="gj-ttl">SIX EYES<b>Mata yang melihat segalanya</b></div></div><div class="gj-hint">ketuk untuk lanjut</div>' : '') +
      '</div><div class="gj-flash"></div>';
  }
  /* PEMBARUAN 52: penutup mata di dasar Kontak digambar ulang: pita kain melengkung + jahitan + lipatan + simpul dengan dua ekor yang berkibar */
  function bfGate(id) {
    return '<svg class="gj-bf-svg gj-bf-gate" viewBox="-8 0 196 78" aria-hidden="true"><defs>' +
      '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#31313e"/><stop offset=".45" stop-color="#0a0a0e"/><stop offset="1" stop-color="#1c1c26"/></linearGradient>' +
      '<linearGradient id="' + id + 'r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fd0ff" stop-opacity=".25"/><stop offset=".5" stop-color="#dff0ff" stop-opacity=".8"/><stop offset="1" stop-color="#b79bff" stop-opacity=".35"/></linearGradient></defs>' +
      '<g class="gj-tail t1"><path d="M17 33 C9 46 15 58 5 74 L19 72 C22 60 19 48 27 38 Z" fill="url(#' + id + ')" stroke="url(#' + id + 'r)" stroke-width="1"/></g>' +
      '<g class="gj-tail t2"><path d="M21 34 C19 48 27 58 24 76 L37 70 C33 58 31 46 30 36 Z" fill="url(#' + id + ')" stroke="url(#' + id + 'r)" stroke-width="1"/></g>' +
      '<path d="M10 20 Q92 38 176 20 L180 46 Q92 66 6 46 Z" fill="url(#' + id + ')" stroke="url(#' + id + 'r)" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M16 24 Q92 41 170 24" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M14 29 Q92 47 172 29" fill="none" stroke="#7f8fc8" stroke-opacity=".5" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<path d="M11 41 Q92 60 176 41" fill="none" stroke="#7f8fc8" stroke-opacity=".4" stroke-width="1" stroke-dasharray="3 3"/>' +
      '<path d="M60 29 Q64 43 58 55 M104 33 Q108 46 103 58 M142 28 Q145 40 141 50" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M62 28 Q66 42 60 54 M106 32 Q110 45 105 57" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="1.5" stroke-linecap="round"/>' +
      '<ellipse cx="20" cy="33" rx="11" ry="9" transform="rotate(-12 20 33)" fill="url(#' + id + ')" stroke="url(#' + id + 'r)" stroke-width="1.2"/>' +
      '<path d="M13 31 Q20 36 28 31" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round"/></svg>';
  }
  /* penutup mata tersembunyi di paling bawah bagian Kontak (hanya di mode Gojo Biasa / Six Eyes) */
  function ensureBlind() {
    if (blindEl && blindEl.isConnected) return;
    const host = document.querySelector(".contact-section"); if (!host) return;
    blindEl = document.createElement("div"); blindEl.className = "gj-blind";
    blindEl.innerHTML = '<button type="button" class="gj-bl-btn" aria-label="Penutup mata Gojo: Six Eyes"><span class="gj-bl-cloth">' + bfGate("gjbfG") + '<i class="gj-bl-glint"></i></span><span class="gj-bl-cap"></span></button>';
    host.appendChild(blindEl);
    blindEl.querySelector(".gj-bl-btn").addEventListener("click", () => { if (busy) return; if (isSix()) unsix(); else six(); });
  }
  function sceneHTML(kind) {
    if (kind === "six" || kind === "unsix") return sixHTML(kind);
    if (kind === "domain") return '<div class="gj-in"><canvas class="gj-cv"></canvas>' + streaksHTML() + handHTML("") + '<div class="gj-txt"><div class="gj-k2">無量空処</div><div class="gj-k1">領域展開</div></div>' +
      '<div class="gj-ttl">DOMAIN EXPANSION<b>Unlimited Void</b></div><div class="gj-hint">ketuk untuk lanjut</div></div><div class="gj-flash"></div>';
    if (kind === "enter") return '<div class="gj-in"><canvas class="gj-cv"></canvas><div class="gj-ent"><div class="gj-k2">五条悟</div><div class="gj-ttl">SATORU GOJO<b>天上天下 唯我独尊</b></div></div></div><div class="gj-flash"></div>';
    return '<div class="gj-in"><canvas class="gj-cv"></canvas>' + handHTML("") + '</div><div class="gj-flash"></div>';
  }
  function runScene(kind, apply) {
    busy = true; if (window.jjk && window.jjk.sync) window.jjk.sync();
    const sc = document.createElement("div"); sc.className = "gj-scene gj-" + kind; sc.setAttribute("role", "dialog"); sc.setAttribute("aria-label", kind === "domain" ? "Domain Expansion: Unlimited Void" : kind === "six" || kind === "unsix" ? "Six Eyes" : "Satoru Gojo");
    sc.innerHTML = sceneHTML(kind); document.body.appendChild(sc);
    const cv = sc.querySelector(".gj-cv"), inner = sc.querySelector(".gj-in"), fl = sc.querySelector(".gj-flash");
    const r = makeRenderer(cv); r.auto(false); r.resize(Math.min(window.devicePixelRatio || 1, 2));
    const G = r.geo(), c = r.ctx, W = innerWidth, H = innerHeight;
    const hand = sc.querySelector(".gj-hand"), BC = handBox(W, H, "center"), BD = handBox(W, H, "dock");
    if (hand) { applyHand(hand, kind === "collapse" ? BD : BC); if (kind === "collapse") sc.classList.add("is-hand", "is-dock"); }
    /* ----- Six Eyes: mata digambar sendiri di kanvas (tanpa foto), lalu kamera masuk ke dalam iris ----- */
    const sx = { rings: [], p: null, boomT: -1, zoom: 1, look: 0 };
    const EX = W / 2, EY = H * 0.38, EW = Math.min(W * 0.46, H * 0.62), EH = EW * 0.46, IR = EH * 0.9;
    const bz = (p0, p1, p2, p3, u) => { const v = 1 - u; return v * v * v * p0 + 3 * v * v * u * p1 + 3 * v * u * u * p2 + u * u * u * p3; };
    const hs = i => { const x = Math.sin(i * 127.1 + 3.7) * 43758.5453; return x - Math.floor(x); };
    let dt0 = 0;
    const sixRings = () => {
      sx.rings = sx.rings.filter(q => (q.t += dt0) < q.d);
      c.save(); c.globalCompositeOperation = "lighter";
      for (const q of sx.rings) {
        if (q.t < 0) continue; const u = q.t / q.d, rr = q.r1 * eo(u);
        c.strokeStyle = "rgba(" + q.col + "," + ((1 - u) * 0.85).toFixed(3) + ")"; c.lineWidth = q.w * (1 - u) + 0.8; c.beginPath();
        if (q.hex) { for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + u * 1.2, px = q.x + Math.cos(a) * rr, py = q.y + Math.sin(a) * rr; if (i) c.lineTo(px, py); else c.moveTo(px, py); } c.closePath(); }
        else c.arc(q.x, q.y, rr, 0, TAU);
        c.stroke();
      }
      c.restore();
    };
    /* a = bukaan kelopak (0..1), slit = garis cahaya tipis sebelum mata terbuka, pu = denyut pupil */
    const drawEye = (a, slit, T, pu) => {
      c.save(); c.translate(EX, EY); c.scale(sx.zoom, sx.zoom);
      c.save(); c.globalCompositeOperation = "lighter";
      const ga = Math.max(a, slit * 0.5);
      let g = c.createRadialGradient(0, 0, EH * 0.2, 0, 0, EW * 1.5);
      g.addColorStop(0, "rgba(190,225,255," + (0.55 * ga).toFixed(3) + ")"); g.addColorStop(0.4, "rgba(130,110,255," + (0.22 * ga).toFixed(3) + ")"); g.addColorStop(1, "rgba(100,140,255,0)");
      c.fillStyle = g; c.fillRect(-EW * 1.5, -EW * 1.5, EW * 3, EW * 3);
      if (a < 0.25 && slit > 0) {
        const w = EW * slit, lg = c.createLinearGradient(-w, 0, w, 0);
        lg.addColorStop(0, "rgba(160,210,255,0)"); lg.addColorStop(0.5, "rgba(255,255,255," + Math.max(0, 1 - a * 3).toFixed(3) + ")"); lg.addColorStop(1, "rgba(160,210,255,0)");
        c.fillStyle = lg; c.fillRect(-w, -2, w * 2, 4);
      }
      c.restore();
      if (a > 0.004) {
        const k = EH * a * 1.35, kb = EH * a * 0.85;
        c.save(); c.beginPath(); c.moveTo(-EW, 0); c.bezierCurveTo(-EW * 0.45, -k, EW * 0.45, -k, EW, 0); c.bezierCurveTo(EW * 0.45, kb, -EW * 0.45, kb, -EW, 0); c.closePath(); c.clip();
        g = c.createLinearGradient(0, -k, 0, kb); g.addColorStop(0, "#8f9be0"); g.addColorStop(0.3, "#e9f2ff"); g.addColorStop(1, "#c3d3fb");
        c.fillStyle = g; c.fillRect(-EW, -k - 4, EW * 2, k + kb + 8);
        c.save(); c.translate(sx.look * IR * 0.45, -IR * 0.03);
        const R = IR, ir = c.createRadialGradient(0, 0, R * 0.12, 0, 0, R);
        ir.addColorStop(0, "#d9f6ff"); ir.addColorStop(0.28, "#74d0ff"); ir.addColorStop(0.62, "#2f8cff"); ir.addColorStop(0.9, "#3b4fd8"); ir.addColorStop(1, "#5a3cc4");
        c.fillStyle = ir; c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fill();
        c.globalCompositeOperation = "lighter";
        for (let i = 0; i < 80; i++) { const an = i / 80 * TAU, r1 = R * (0.62 + 0.3 * hs(i)), al = 0.1 + 0.2 * Math.abs(Math.sin(T * 0.9 + i * 1.3)); c.strokeStyle = "rgba(210,240,255," + al.toFixed(3) + ")"; c.lineWidth = 1; c.beginPath(); c.moveTo(Math.cos(an) * R * 0.26, Math.sin(an) * R * 0.26); c.lineTo(Math.cos(an) * r1, Math.sin(an) * r1); c.stroke(); }
        c.globalCompositeOperation = "source-over";
        c.strokeStyle = "rgba(235,248,255,.9)"; c.lineWidth = Math.max(2, R * 0.045); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.stroke();
        c.fillStyle = "#02030c"; c.beginPath(); c.arc(0, 0, R * (0.2 + 0.14 * pu), 0, TAU); c.fill();
        c.fillStyle = "rgba(255,255,255,.95)"; c.beginPath(); c.arc(-R * 0.1, -R * 0.12, R * 0.065, 0, TAU); c.fill();
        c.restore();
        g = c.createLinearGradient(0, -k, 0, -k * 0.3); g.addColorStop(0, "rgba(20,16,80,.6)"); g.addColorStop(1, "rgba(20,16,80,0)");
        c.fillStyle = g; c.fillRect(-EW, -k - 4, EW * 2, k * 0.7 + 4);
        c.restore();
        c.lineCap = "round";
        c.strokeStyle = "#140e45"; c.lineWidth = Math.max(3, EW * 0.014); c.beginPath(); c.moveTo(-EW, 0); c.bezierCurveTo(-EW * 0.45, -k, EW * 0.45, -k, EW, 0); c.stroke();
        c.strokeStyle = "rgba(205,222,255,.85)"; c.lineWidth = Math.max(2, EW * 0.006); c.beginPath(); c.moveTo(-EW, 0); c.bezierCurveTo(-EW * 0.45, kb, EW * 0.45, kb, EW, 0); c.stroke();
        for (let pass = 0; pass < 2; pass++) {                                   // bulu mata putih khas Gojo
          c.strokeStyle = pass ? "rgba(247,252,255,.96)" : "rgba(130,190,255,.28)"; c.lineWidth = pass ? Math.max(1.5, EW * 0.0035) : Math.max(4, EW * 0.01); c.beginPath();
          for (let i = 0; i < 44; i++) {
            const u = 0.03 + 0.94 * i / 43, x = bz(-EW, -EW * 0.45, EW * 0.45, EW, u), y = bz(0, -k, -k, 0, u), x2 = bz(-EW, -EW * 0.45, EW * 0.45, EW, u + 0.01), y2 = bz(0, -k, -k, 0, u + 0.01);
            let nx = y2 - y, ny = -(x2 - x); const nl = Math.hypot(nx, ny) || 1; nx /= nl; ny /= nl; if (ny > 0) { nx = -nx; ny = -ny; }
            const L = EH * (0.16 + 0.24 * hs(i + 9)) * Math.min(1, a * 1.4), sw = (x / EW) * L * 0.5;
            c.moveTo(x, y); c.lineTo(x + nx * L + sw, y + ny * L);
          }
          c.stroke();
        }
      }
      c.restore();
    };
    const rays = (al, T) => {                                                   // sinar putih memancar dari mata
      if (al <= 0.01) return; const L = Math.hypot(W, H);
      c.save(); c.globalCompositeOperation = "lighter"; c.translate(EX, EY); c.rotate(T * 0.12);
      for (let i = 0; i < 28; i++) {
        const a0 = i / 28 * TAU, w = 0.012 + 0.02 * hs(i + 3), lg = c.createLinearGradient(0, 0, Math.cos(a0) * L, Math.sin(a0) * L);
        lg.addColorStop(0, "rgba(210,235,255," + (0.5 * al).toFixed(3) + ")"); lg.addColorStop(1, "rgba(160,140,255,0)"); c.fillStyle = lg;
        c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a0 - w) * L, Math.sin(a0 - w) * L); c.lineTo(Math.cos(a0 + w) * L, Math.sin(a0 + w) * L); c.closePath(); c.fill();
      }
      c.restore();
    };
    const hud = (u, T) => {                                                     // cincin analisis Six Eyes mengembang dari iris
      if (u <= 0) return; const sc2 = 0.55 + 0.45 * eo(clamp(u, 0, 1)), al = clamp(u * 2, 0, 1), R = IR * sc2;
      c.save(); c.globalCompositeOperation = "lighter"; c.translate(EX, EY); c.scale(sx.zoom, sx.zoom);
      c.save(); c.rotate(T * 0.12); c.setLineDash([2, 9]); c.strokeStyle = "rgba(180,220,255," + (0.45 * al).toFixed(3) + ")"; c.lineWidth = 1.2; c.beginPath(); c.arc(0, 0, R * 1.28, 0, TAU); c.stroke(); c.restore();
      c.save(); c.rotate(-T * 0.08);
      for (let i = 0; i < 72; i++) { const a = i / 72 * TAU, lg = i % 6 === 0, r0 = R * 1.42, r1 = r0 + R * (lg ? 0.14 : 0.06); c.strokeStyle = "rgba(" + (lg ? "255,255,255" : "170,210,255") + "," + ((lg ? 0.75 : 0.4) * al).toFixed(3) + ")"; c.lineWidth = lg ? 1.6 : 1; c.beginPath(); c.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); c.lineTo(Math.cos(a) * r1, Math.sin(a) * r1); c.stroke(); }
      c.restore();
      c.save(); c.rotate(T * 0.18); c.strokeStyle = "rgba(190,150,255," + (0.6 * al).toFixed(3) + ")"; c.lineWidth = Math.max(2, R * 0.03);
      for (let i = 0; i < 3; i++) { const a0 = i * TAU / 3; c.beginPath(); c.arc(0, 0, R * 1.78, a0, a0 + 0.9); c.stroke(); } c.restore();
      c.restore();
    };
    const motes = (t, dt) => {                                                  // energi terhisap ke mata, lalu meledak keluar
      const D = Math.hypot(W, H) * 0.5, boomed = sx.boomT >= 0;
      if (!sx.p) sx.p = Array.from({ length: 70 }, () => ({ a: rnd(0, TAU), d: rnd(0.4, 1) * D, v: rnd(0.8, 1.4), col: Math.random() < 0.25 ? "196,160,255" : "200,230,255" }));
      const al = boomed ? clamp(1 - (t - sx.boomT) / 1.4, 0, 1) : clamp((t - 0.9) / 1, 0, 1); if (al <= 0.01) return;
      c.save(); c.globalCompositeOperation = "lighter"; c.lineWidth = 1.6; c.lineCap = "round";
      for (const p of sx.p) {
        if (boomed) p.d += p.v * D * 1.6 * dt; else { p.d -= p.v * D * 0.55 * dt; if (p.d < IR) p.d = D * rnd(0.7, 1); }
        const len = 10 + p.v * 22, cs = Math.cos(p.a), sn = Math.sin(p.a) * 0.75;
        c.strokeStyle = "rgba(" + p.col + "," + (al * 0.7).toFixed(3) + ")"; c.beginPath(); c.moveTo(EX + cs * p.d, EY + sn * p.d); c.lineTo(EX + cs * (p.d + len), EY + sn * (p.d + len)); c.stroke();
      }
      c.restore();
    };
    let t0 = 0, last = 0, done = false, applied = false, canSkip = false, bus0 = null, raf0 = 0;
    const flags = {}, once = (k, at, t, fn) => { if (t >= at && !flags[k]) { flags[k] = 1; fn(); } };
    const cls = n => () => sc.classList.add(n);
    const flash = (t, at, peak, dec) => Math.max(0, peak * (1 - (t - at) / dec)) * (t >= at ? 1 : 0);
    const quake = (p, ms) => { if (reduce || !inner.animate) return; const f = []; for (let i = 0; i <= 10; i++) { const q = 1 - i / 10; f.push({ transform: "translate(" + (rnd(-1, 1) * p * q).toFixed(1) + "px," + (rnd(-1, 1) * p * q).toFixed(1) + "px)" }); } f.push({ transform: "none" }); try { inner.animate(f, { duration: ms, easing: "ease-out" }); } catch (_) {} };
    const doApply = () => { if (applied) return; applied = true; apply(); };
    function finish() {
      if (done) return; done = true; cancelAnimationFrame(raf0); stopBus(bus0); doApply();
      sc.classList.add("is-out"); document.removeEventListener("keydown", esc); setTimeout(() => { sc.remove(); }, 700); busy = false;
      if (window.jjk && window.jjk.sync) window.jjk.sync(); syncLabels();
    }
    const esc = e => { if (e.key === "Escape" && canSkip) finish(); };
    document.addEventListener("keydown", esc);
    sc.addEventListener("pointerup", () => { if (canSkip) finish(); });
    requestAnimationFrame(() => sc.classList.add("is-in"));

    function tick(ts) {
      if (done) return;
      raf0 = requestAnimationFrame(tick);
      if (!t0) { t0 = ts; last = ts; }
      const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
      const t = (ts - t0) / 1000 / K;                       // detik "adegan" (sudah dipercepat bila kurangi gerakan)
      let f = 0;
      if (kind === "domain") {
        const g = eio((t - 1.0) / 2.4);
        r.frame(dt, "domain", g);
        once("hand", 0.25, t, cls("is-hand"));                                    // 1. tangan Gojo naik dari bawah, berpendar biru
        once("hb", 0.55, t, () => { r.ring(BC.tipX, BC.tipY, 90, 0.8, "170,210,255", 2); });
        once("hb2", 0.72, t, () => { r.ring(BC.tipX, BC.tipY, 150, 0.7, "190,170,255", 2); });
        once("clap", 0.9, t, () => {                                              // 2. JARI MENYILANG: kilat, gelombang kejut dari ujung jari, glitch
          sc.classList.add("is-snap");
          r.ring(BC.tipX, BC.tipY, Math.hypot(W, H) * 0.7, 1.1, "255,255,255", 8); r.ring(BC.tipX, BC.tipY, Math.hypot(W, H) * 0.5, 0.9, "130,180,255", 4, 0.1); r.ring(BC.tipX, BC.tipY, Math.hypot(W, H) * 0.35, 0.8, "176,120,255", 3, 0.2);
          quake(18, 500);
        });
        once("dock", 1.5, t, () => { if (hand) { applyHand(hand, BD); sc.classList.add("is-dock"); } });   // 3. tangan meluncur ke depan lubang hitam yang membuka
        once("snapoff", 2.7, t, () => sc.classList.remove("is-snap"));
        [1.7, 2.15, 2.6].forEach((at, i) => once("ink" + i, at, t, () => { r.burstInk(i === 2 ? 3 : 2); r.ring(G.cx, G.cy, G.R * 2.4, 0.9, "176,120,255", 4); quake(9 + i * 3, 380); }));
        once("k1", 2.2, t, cls("is-k1")); once("k2", 3.3, t, () => { sc.classList.add("is-k2"); quake(22, 650); }); once("tt", 3.7, t, cls("is-ttl"));
        once("skip", 1.2, t, () => { canSkip = true; }); once("hint", 4.6, t, cls("is-hint"));
        f = Math.max(flash(t, 0.9, 0.9, 0.35), flash(t, 3.3, 0.3, 0.3), flash(t, 5.5, 1, 0.7));
        once("apply", 5.7, t, doApply);
        if (t > 6.9) finish();
      } else if (kind === "six") {                           // Six Eyes: penutup mata ditarik -> garis cahaya -> mata terbuka -> HUD -> kamera masuk ke iris
        dt0 = dt; r.frame(dt, "stars", 1);
        once("bf", 0.05, t, cls("is-bf")); once("pull", 0.6, t, cls("is-pull"));
        const a = eio(clamp((t - 1.4) / 0.8, 0, 1)), slit = eo(clamp((t - 0.95) / 0.5, 0, 1));
        sx.look = t < 2.2 ? -0.25 * (1 - a) : Math.sin(t * 0.8) * 0.08;
        sx.zoom = t > 4.4 ? 1 + 11 * Math.pow(clamp((t - 4.4) / 0.9, 0, 1), 3) : 1;
        once("boom", 2.2, t, () => {
          sx.boomT = 2.2; if (sx.p) sx.p.forEach(p => { p.d = rnd(IR * 0.8, IR * 1.8); });
          const m = Math.hypot(W, H);
          sx.rings.push({ x: EX, y: EY, r1: m * 0.6, d: 1.1, t: 0, col: "255,255,255", w: 8 }, { x: EX, y: EY, r1: m * 0.42, d: 0.95, t: -0.08, col: "150,205,255", w: 4 }, { x: EX, y: EY, r1: m * 0.3, d: 0.85, t: -0.16, col: "180,140,255", w: 3 },
            { x: EX, y: EY, r1: m * 0.5, d: 1.2, t: -0.05, col: "200,230,255", w: 3, hex: true }, { x: EX, y: EY, r1: m * 0.32, d: 1.0, t: -0.2, col: "196,160,255", w: 2, hex: true });
          quake(22, 650);
        });
        rays(sx.boomT >= 0 && sx.zoom === 1 ? clamp(1 - (t - sx.boomT) / 1.6, 0, 1) : 0, t);
        motes(t, dt);
        drawEye(a, slit, t, t > 2.2 ? Math.max(0, 1 - (t - 2.2) / 0.6) : 0);
        hud(clamp((t - 2.3) / 1.2, 0, 1), t);
        sixRings();
        once("k2", 3.0, t, () => { sc.classList.add("is-k2"); quake(12, 450); }); once("ttl", 3.4, t, cls("is-ttl"));
        once("skip", 1.2, t, () => { canSkip = true; }); once("hint", 3.9, t, cls("is-hint")); once("zoom", 4.4, t, cls("is-zoom"));
        f = Math.max(flash(t, 2.2, 0.9, 0.45), flash(t, 3.0, 0.2, 0.3), t < 4.8 ? 0 : clamp((t - 4.8) / 0.6, 0, 1));
        once("apply", 5.4, t, doApply);
        if (t > 5.9) finish();
      } else if (kind === "unsix") {                         // penutup mata dipasang kembali
        dt0 = dt; r.frame(dt, "stars", 1);
        sx.look = Math.sin(t * 0.8) * 0.08; drawEye(1, 1, t, 0); hud(1, t);
        once("drop", 0.25, t, cls("is-drop")); once("skip", 0.3, t, () => { canSkip = true; });
        once("thud", 0.85, t, () => quake(10, 320));
        sixRings();
        f = Math.max(flash(t, 0.85, 0.8, 0.4), 0);
        once("apply", 1.0, t, doApply);
        if (t > 1.7) finish();
      } else if (kind === "enter") {
        r.frame(dt, "stars", 1);
        const cx = W / 2, cy = H * 0.44, sep = Math.min(W, H) * 0.34, sr = Math.min(W, H) * 0.03;
        c.save(); c.globalCompositeOperation = "lighter";
        const u = eio((t - 0.2) / 1.6), pos = uu => { const d = sep * (1 - uu), a = (1 - uu) * 3.2; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6, cx - Math.cos(a) * d, cy - Math.sin(a) * d * 0.6]; };
        if (t >= 0.2 && t < 1.85) {
          for (let i = 0; i < 16; i++) { const uu = eio((t - 0.2 - i * 0.03) / 1.6); if (uu <= 0) continue; const p = pos(uu), a = 0.22 * (1 - i / 16); r.glow(p[0], p[1], sr * (2.4 - i * 0.08), "70,150,255", a); r.glow(p[2], p[3], sr * (2.4 - i * 0.08), "255,60,90", a); }
          const p = pos(u), s = Math.min(1, (t - 0.2) / 0.4); r.glow(p[0], p[1], sr * 4.2 * s, "70,150,255", 0.95); r.glow(p[2], p[3], sr * 4.2 * s, "255,60,90", 0.95);
        } else if (t >= 1.85) {
          const pt = t - 1.85; r.glow(cx, cy, sr * (8 + 22 * eo(pt / 0.5)) * (1 - 0.5 * clamp((pt - 0.4) / 1.4, 0, 1)), "176,96,255", clamp(1.2 - pt * 0.6, 0.15, 1));
          for (let i = 0; i < 3; i++) { const v = clamp((pt - i * 0.14) / 1.4, 0, 1); c.strokeStyle = "rgba(176,110,255," + ((1 - v) * 0.7).toFixed(3) + ")"; c.lineWidth = 2 + (1 - v) * 10; c.beginPath(); c.arc(cx, cy, eo(v) * Math.max(W, H) * 0.7, 0, TAU); c.stroke(); }
          const lf = c.createLinearGradient(0, 0, W, 0); lf.addColorStop(0, "rgba(176,110,255,0)"); lf.addColorStop(0.5, "rgba(230,210,255," + clamp(1 - pt * 0.8, 0, 0.8).toFixed(3) + ")"); lf.addColorStop(1, "rgba(176,110,255,0)");
          c.fillStyle = lf; c.fillRect(0, cy - 2 - 5 * (1 - clamp(pt, 0, 1)), W, 4 + 10 * (1 - clamp(pt, 0, 1)));
        }
        c.restore();
        once("boom", 1.85, t, () => quake(20, 600));
        once("apply", 1.95, t, doApply); once("txt", 2.2, t, cls("is-k2")); once("ttl", 2.5, t, cls("is-ttl")); once("skip", 1.0, t, () => { canSkip = true; });
        f = Math.max(flash(t, 1.85, 1, 0.55), 0);
        if (t > 4.2) finish();
      } else {                                              // collapse: Domain menutup
        const g = 1 - eio(t / 0.95);
        r.frame(dt, "domain", Math.max(0.001, g));
        once("c0", 0.02, t, () => r.ring(G.cx, G.cy, G.R * 3, 0.9, "176,120,255", 5)); once("drop", 0.05, t, cls("is-drop"));
        f = Math.max(flash(t, 0.9, 1, 0.4), 0);
        once("apply", 1.0, t, doApply); once("skip", 0.3, t, () => { canSkip = true; });
        if (t > 1.45) finish();
      }
      fl.style.opacity = f.toFixed(3);
    }
    bus0 = kind === "domain" ? sfxDomain() : kind === "six" ? sfxSix() : kind === "unsix" ? sfxUnsix() : kind === "enter" ? sfxEnter() : sfxCollapse();
    raf0 = requestAnimationFrame(tick);
  }

  /* ---------- aksi publik ---------- */
  function ensureDark() { if (root.dataset.theme !== "dark") { root.dataset.theme = "dark"; } forcedDark = true; }
  function enter() {
    if (busy || isOn()) return;
    if (root.dataset.bleach) return;
    runScene("enter", () => { delete root.dataset.gojo; ensureDark(); root.dataset.jjk = "gojo"; sync(); });
  }
  function domain() { if (busy || !isOn() || isDom()) return; runScene("domain", () => { root.dataset.gojo = "domain"; sync(); }); }
  function six() { if (busy || !isOn() || isDom() || isSix()) return; runScene("six", () => { root.dataset.gojo = "six"; sync(); }); }
  function unsix() { if (busy || !isOn() || !isSix()) return; runScene("unsix", () => { delete root.dataset.gojo; sync(); }); }
  function collapse() { if (busy || !isOn() || !isDom()) return; runScene("collapse", () => { delete root.dataset.gojo; sync(); }); }
  function off() { delete root.dataset.gojo; delete root.dataset.jjk; if (window.jjk && window.jjk.sync) window.jjk.sync(); sync(); }

  function sync() {
    if (isOn()) { ensureDark(); ensureBg(); ensureFx(); ensureHand(); ensureBlind(); syncLabels(); stop(); start(); if (reduce && bg) bg.frame(0.016, modeName(), 1); }
    else {
      stop();
      if (root.dataset.jjk !== "gojo") delete root.dataset.gojo;
      if (forcedDark) { forcedDark = false; if (!root.dataset.bleach) { root.dataset.theme = lsGet("theme") === "light" ? "light" : "dark"; } }
    }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-jjk", "data-bleach", "data-gojo"] });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
  let rz = 0;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (bg) { bg.resize(dprBg()); if (reduce && isOn()) bg.frame(0.016, modeName(), 1); } sizeFx(); layoutHand(); }, 160); });
  addEventListener("pointermove", e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; }, { passive: true });
  addEventListener("pointerdown", e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; }, { passive: true });
  addEventListener("pointerup", e => { if (e.pointerType === "touch") ptr.on = false; }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { ptr.on = false; });
  document.addEventListener("pointerdown", clickFx, true);

  window.gojoTheme = { CFG, enter, domain, collapse, off, six, unsix, pulse: () => pulseHand(true), get mode() { return !isOn() ? "off" : isDom() ? "domain" : isSix() ? "six" : "biasa"; } };

  /* ---------- data gambar tangan (PNG 349x871, garis putih + siluet gelap, dari gambar buatanmu) ---------- */
  var HAND_B64 = "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";
})();

/* =========================================================
   PEMBARUAN 44: EASTER EGG BANJIR
   Pemicu: mode cuaca HUJAN atau HUJAN PETIR menyala terus 2 menit (genangan mulai muncul di dasar layar sejak ~1,5 menit).
   Alur: guntur + ucapan selamat -> layar menggulir ke ID card -> air naik sampai TENGAH ID CARD (tinggi air tetap di halaman:
   gulir ke bawah = semuanya tenggelam, makin dalam makin gelap) -> kartu tenggelam / mengapung, gelembung, ikan, paus, suara air.
   Ganti cuaca ke Cerah / Angin = banjir surut (bisa dipicu lagi 2 menit hujan berikutnya).
   Semua suara Web Audio (ikut mati kalau tapSound.on = false). Hormati prefers-reduced-motion.
   Console: banjir.fire() | banjir.flood() | banjir.drain() | banjir.state() | banjir.CFG (seconds, rise, autoClose, sound, volume, blur)
   PEMBARUAN 48 - HIU: banjir.shark() hiu muncul sekarang | banjir.bite() uji adegan terkaman | CFG.shark / sharkSpeed / sharkFirst / sharkCool
========================================================= */
(function banjirEgg() {
  "use strict";
  const root = document.documentElement;
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = { seconds: 120, seepFrom: 90, rise: 6.5, autoClose: 8, sound: true, volume: 1, blur: true, scroll: true, shark: true, sharkCongrats: true, sharkSpeed: 105, sharkFirst: 6, sharkCool: [14, 26] };
  const R = (a, b) => a + Math.random() * (b - a), TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, k) => a + (b - a) * k;
  const ease = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const SEL = ".sk-card, .timeline-item, .folder-card, .scatter-photo, .contact-card, .gh-card, .wibu-card";
  const wet = () => root.dataset.weather === "rain" || root.dataset.weather === "storm";
  const stormy = () => root.dataset.weather === "storm";
  const loud = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);

  /* ================= SUARA ================= */
  const SND = (function () {
    let ac = null, master = null, bus = null, nbuf = null, amb = null, riseN = null;
    function init() {
      if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      ac = new AC();
      master = ac.createGain(); master.gain.value = 0.9 * CFG.volume;
      const comp = ac.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4;
      master.connect(comp); comp.connect(ac.destination);
      const len = Math.floor(ac.sampleRate * 2.2), ir = ac.createBuffer(2, len, ac.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      const conv = ac.createConvolver(); conv.buffer = ir;
      const wetG = ac.createGain(); wetG.gain.value = 0.32; conv.connect(wetG); wetG.connect(master);
      bus = ac.createGain(); bus.connect(master); bus.connect(conv);
      nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
      const nd = nbuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      return ac;
    }
    const ready = () => loud() && init();
    function tone(type, f0, f1, t, dur, vol, atk, pan) {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
      o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      let tail = g; o.connect(g);
      if (pan != null && ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.value = clamp(pan, -1, 1); g.connect(p); tail = p; }
      tail.connect(bus); o.start(t); o.stop(t + dur + 0.05);
    }
    function noise(type, f0, f1, t, dur, vol, atk, q) {
      const s = ac.createBufferSource(); s.buffer = nbuf; const f = ac.createBiquadFilter(), g = ac.createGain();
      f.type = type; f.Q.value = q || 0.8; f.frequency.setValueAtTime(f0, t); if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
    }
    function loopNoise(type, freq, q) {
      const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true; const f = ac.createBiquadFilter(), g = ac.createGain();
      f.type = type; f.frequency.value = freq; f.Q.value = q || 0.7; g.gain.value = 0.0001; s.connect(f); f.connect(g); g.connect(bus); s.start();
      return { s: s, f: f, g: g };
    }
    const bubbleAt = (t, vol, pan) => { const f = R(380, 1100); tone("sine", f, f * R(1.7, 2.5), t, R(0.05, 0.11), vol, 0.004, pan); };
    return {
      warm() { if (loud()) init(); },
      resume() { if (ac && ac.state === "suspended") ac.resume(); },
      thunder() {
        if (!ready()) return; const t = ac.currentTime + 0.02;
        noise("highpass", 4200, 1400, t, 0.12, 0.4, 0.002);
        noise("lowpass", 1100, 80, t + 0.03, 3.0, 0.62, 0.06); tone("sine", 55, 26, t, 2.6, 0.5, 0.08); tone("sine", 92, 40, t + 0.4, 1.8, 0.22, 0.2);
      },
      rumble() { if (!ready()) return; const t = ac.currentTime; noise("lowpass", 420, 70, t, 3.4, 0.2, 0.9); tone("sine", 44, 30, t, 3, 0.16, 1); },
      jingle() {   // tetes air + tangga nada pentatonik, lembut
        if (!ready()) return; const t = ac.currentTime + 0.35;
        [523.25, 659.25, 783.99, 1046.5, 1318.5, 1568].forEach((f, i) => { tone("sine", f, f, t + i * 0.11, 1.5, 0.11, 0.004, (i - 2.5) / 5); tone("triangle", f * 2, f * 2, t + i * 0.11, 0.5, 0.025, 0.004); });
        [261.63, 329.63, 392].forEach(f => tone("triangle", f, f, t + 0.5, 2.8, 0.05, 0.7));
        bubbleAt(t, 0.12); bubbleAt(t + 0.14, 0.09); noise("highpass", 2200, 700, t, 0.3, 0.12, 0.004);
      },
      splash(v) { if (!ready()) return; const t = ac.currentTime; noise("highpass", 2000, 600, t, 0.4, (v || 0.25), 0.004); tone("sine", 220, 90, t, 0.18, 0.14, 0.004); },
      bubble(x) { if (!ready()) return; bubbleAt(ac.currentTime, 0.1, (x / Math.max(1, window.innerWidth)) * 2 - 1); },
      pop(x) { if (!ready()) return; const t = ac.currentTime; bubbleAt(t, 0.13, (x / Math.max(1, window.innerWidth)) * 2 - 1); bubbleAt(t + 0.06, 0.07, 0); },
      sink(x) { if (!ready()) return; const t = ac.currentTime, p = (x / Math.max(1, window.innerWidth)) * 2 - 1; tone("sine", 190, 70, t, 0.25, 0.16, 0.006, p); for (let i = 0; i < 3; i++) bubbleAt(t + 0.05 + i * R(0.04, 0.09), 0.07, p); },
      float(x) { if (!ready()) return; const t = ac.currentTime, p = (x / Math.max(1, window.innerWidth)) * 2 - 1; tone("sine", 260, 640, t, 0.3, 0.1, 0.01, p); noise("bandpass", 1500, 500, t, 0.25, 0.08, 0.01, 2); },
      rise(dur) {
        if (!ready()) return; const t = ac.currentTime;
        riseN = loopNoise("bandpass", 200, 0.9); const o = ac.createOscillator(), og = ac.createGain(); o.type = "sine"; o.frequency.setValueAtTime(36, t); o.frequency.linearRampToValueAtTime(70, t + dur);
        og.gain.setValueAtTime(0.0001, t); og.gain.linearRampToValueAtTime(0.2, t + dur * 0.6); og.gain.linearRampToValueAtTime(0.0001, t + dur + 1.5); o.connect(og); og.connect(bus); o.start(t); o.stop(t + dur + 1.6);
        riseN.f.frequency.setValueAtTime(180, t); riseN.f.frequency.linearRampToValueAtTime(1300, t + dur * 0.7); riseN.f.frequency.linearRampToValueAtTime(600, t + dur + 1.5);
        riseN.g.gain.setValueAtTime(0.0001, t); riseN.g.gain.linearRampToValueAtTime(0.26, t + dur * 0.4); riseN.g.gain.linearRampToValueAtTime(0.16, t + dur); riseN.g.gain.linearRampToValueAtTime(0.0001, t + dur + 1.5);
        riseN.s.stop(t + dur + 1.6); noise("highpass", 2400, 500, t, 0.7, 0.3, 0.01);
        for (let i = 0; i < 26; i++) bubbleAt(t + R(0.2, dur), R(0.05, 0.11), R(-0.8, 0.8));
        for (let i = 0; i < 5; i++) noise("highpass", 1800, 600, t + R(0.5, dur), 0.35, 0.12, 0.004);
      },
      ambient(on) {
        if (!ready()) return;
        if (on && !amb) { amb = loopNoise("lowpass", 900, 0.6); amb.g.gain.setTargetAtTime(0.05, ac.currentTime, 1.5); amb.lfo = ac.createOscillator(); const lg = ac.createGain(); lg.gain.value = 0.02; amb.lfo.frequency.value = 0.13; amb.lfo.connect(lg); lg.connect(amb.g.gain); amb.lfo.start(); }
        else if (!on && amb) { const a = amb; amb = null; a.g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.8); try { a.s.stop(ac.currentTime + 3); a.lfo.stop(ac.currentTime + 3); } catch (e) { /* abaikan */ } }
      },
      depth(sub) {   // makin tenggelam: makin redam & makin keras
        if (!amb || !ac) return;
        const t = ac.currentTime; amb.f.frequency.setTargetAtTime(lerp(2600, 360, sub), t, 0.3); amb.g.gain.setTargetAtTime(0.03 + 0.1 * sub, t, 0.4);
      },
      whale() {
        if (!ready()) return; const t = ac.currentTime + 0.1, o = ac.createOscillator(), l = ac.createOscillator(), lg = ac.createGain(), g = ac.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(78, t); o.frequency.exponentialRampToValueAtTime(150, t + 1.6); o.frequency.exponentialRampToValueAtTime(64, t + 3.8);
        l.frequency.value = 5; lg.gain.value = 4; l.connect(lg); lg.connect(o.frequency);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.07, t + 1.2); g.gain.linearRampToValueAtTime(0.0001, t + 4);
        o.connect(g); g.connect(bus); o.start(t); l.start(t); o.stop(t + 4.1); l.stop(t + 4.1);
      },
      drain(dur) {
        if (!ready()) return; const t = ac.currentTime, n = loopNoise("bandpass", 1100, 1);
        n.f.frequency.setValueAtTime(1100, t); n.f.frequency.exponentialRampToValueAtTime(140, t + dur);
        n.g.gain.setValueAtTime(0.0001, t); n.g.gain.linearRampToValueAtTime(0.2, t + 0.8); n.g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.5); n.s.stop(t + dur + 0.6);
        for (let i = 0; i < 16; i++) { const f = R(500, 900); tone("sine", f, f * 0.4, t + R(0, dur), R(0.08, 0.16), 0.07, 0.005, R(-0.7, 0.7)); }
        tone("sine", 320, 70, t + dur, 0.3, 0.2, 0.006); noise("highpass", 1800, 500, t + dur, 0.3, 0.16, 0.004);
      },
      drip() { if (!ready()) return; const t = ac.currentTime, f = R(900, 1500); tone("sine", f, f * 0.6, t, 0.12, 0.05, 0.003, R(-0.5, 0.5)); },
      sharkHint() {   // dua denyut rendah: "dun... dun" saat hiu lewat di layar
        if (!ready()) return; const t = ac.currentTime + 0.02;
        tone("sine", 62, 44, t, 0.55, 0.3, 0.03); tone("sine", 58, 40, t + 0.62, 0.8, 0.34, 0.03); noise("lowpass", 300, 90, t, 1.2, 0.08, 0.2);
      },
      sharkTurn() {   // belok tajam: desir air + dengung naik + gelembung
        if (!ready()) return; const t = ac.currentTime + 0.01;
        noise("bandpass", 380, 2400, t, 0.8, 0.28, 0.2, 1.2); tone("sawtooth", 70, 150, t, 0.8, 0.07, 0.2);
        for (let i = 0; i < 6; i++) bubbleAt(t + R(0, 0.7), 0.08, R(-0.6, 0.6));
      },
      sharkDash(dur) {   // melesat ke arah layar: desir menaik + dentum membesar
        if (!ready()) return; const t = ac.currentTime + 0.01;
        noise("bandpass", 420, 4800, t, dur + 0.3, 0.42, dur * 0.8, 0.9); tone("sine", 46, 210, t, dur + 0.3, 0.5, dur * 0.75); tone("sawtooth", 80, 300, t, dur, 0.05, dur * 0.8);
      },
      sharkRoar() {   // geraman saat rahang terbuka
        if (!ready()) return; const t = ac.currentTime + 0.01, o = ac.createOscillator(), l = ac.createOscillator(), lg = ac.createGain(), f = ac.createBiquadFilter(), g = ac.createGain();
        o.type = "sawtooth"; o.frequency.setValueAtTime(95, t); o.frequency.exponentialRampToValueAtTime(52, t + 1.1);
        l.frequency.value = 26; lg.gain.value = 14; l.connect(lg); lg.connect(o.frequency);
        f.type = "lowpass"; f.frequency.setValueAtTime(260, t); f.frequency.linearRampToValueAtTime(900, t + 0.5); f.frequency.linearRampToValueAtTime(220, t + 1.1);
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.38, t + 0.25); g.gain.linearRampToValueAtTime(0.0001, t + 1.15);
        o.connect(f); f.connect(g); g.connect(bus); o.start(t); l.start(t); o.stop(t + 1.2); l.stop(t + 1.2);
        noise("bandpass", 700, 250, t, 1.0, 0.16, 0.2, 1.4);
      },
      sharkChomp() {   // rahang menutup: DUM + kretek retakan kaca
        if (!ready()) return; const t = ac.currentTime + 0.005;
        tone("sine", 130, 28, t, 0.8, 0.9, 0.003); noise("lowpass", 2200, 100, t, 0.55, 0.8, 0.002); noise("highpass", 3200, 1200, t, 0.22, 0.55, 0.001);
        for (let i = 0; i < 10; i++) noise("highpass", R(3500, 7000), R(1500, 3000), t + 0.02 + R(0, 0.4), R(0.04, 0.1), R(0.1, 0.22), 0.001);
        tone("triangle", 90, 40, t + 0.06, 0.6, 0.3, 0.01); bubbleAt(t + 0.3, 0.12); bubbleAt(t + 0.42, 0.09);
      }
    };
  })();

  /* ================= KONDISI ================= */
  let state = "idle";            // idle | congrats | prep | rising | flooded | draining
  let elapsed = 0, seepRumbled = false, raf = 0, last = 0, t = 0;
  let wy = 0, wy0 = 0, wyT = 0, riseT = 0, surge = 0, drainT = 0, seepH = 0, congratsT = 0;
  let W = 0, H = 0, dpr = 1;
  let layer = null, body = null, cv = null, cx = null, congrats = null, flash = null, autoTimer = 0, refreshTimer = 0;
  const bubbles = [], drops = [], ripples = [], foam = [], schools = [], rays = [], caustics = [];
  let whale = null, nextFish = 2, nextWhale = 40, nextBubble = 0, nextRipple = 0, nextCardBubble = 0, nextIdRing = 0, nextDrip = 0, lastSub = 0;
  let pend = [];                 // kartu yang menunggu air lewat: { el, mid }
  const acts = new Map();        // kartu yang sudah terendam: el -> { mid, anims, light }
  const idZone = () => document.getElementById("idcardZone");
  const idCard = () => document.getElementById("idcard");

  function idMid() {
    const el = idCard(); if (!el) return window.scrollY + H * 0.4;
    const r = el.getBoundingClientRect(); return r.top + window.scrollY + r.height / 2;
  }
  const surfaceY = () => (state === "idle" || state === "congrats" || state === "prep") ? H - seepH : wy - window.scrollY;

  /* ================= LAPISAN AIR ================= */
  function build() {
    if (layer) return;
    layer = document.createElement("div"); layer.className = "fl-layer"; layer.setAttribute("aria-hidden", "true");
    body = document.createElement("div"); body.className = "fl-body";
    cv = document.createElement("canvas"); cv.className = "fl-canvas";
    layer.append(body, cv); document.body.appendChild(layer); cx = cv.getContext("2d");
    size();
    for (let i = 0; i < 7; i++) rays.push({ x: (i * 0.16 + 0.04), w: R(26, 60), ph: R(0, TAU), sp: R(0.2, 0.45) });
    for (let i = 0; i < 46; i++) caustics.push({ x: Math.random(), y: Math.random(), r: R(10, 26), ph: R(0, TAU), sp: R(0.5, 1.2) });
    for (let i = 0; i < 28; i++) foam.push({ k: Math.random(), r: R(1.1, 2.7), ph: R(0, TAU), sp: R(8, 26) * (Math.random() < 0.5 ? -1 : 1) });
  }
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight;
    if (!cv) return; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function loopOn() { if (!raf) { build(); layer.classList.add("on"); last = performance.now(); raf = requestAnimationFrame(frame); } }
  function loopOff() { root.removeAttribute("data-fl-under"); if (raf) { cancelAnimationFrame(raf); raf = 0; } if (layer) { layer.classList.remove("on"); cx.clearRect(0, 0, W, H); } }

  const wave = (x, tt, A) => A * (Math.sin(x * 0.010 + tt * 1.5) + 0.6 * Math.sin(x * 0.024 - tt * 2.0 + 1.3) + 0.32 * Math.sin(x * 0.052 + tt * 3.1 + 0.6));

  function spawnBubble(x, y, big) {
    if (bubbles.length > 90) return;
    bubbles.push({ x: x, y: y, r: big ? R(4, 9) : R(1.5, 5), vy: -R(40, 130), ph: R(0, TAU), wb: R(6, 18), life: 0 });
  }
  function splashAt(x, y, n, v) {
    for (let i = 0; i < n; i++) drops.push({ x: x + R(-12, 12), y: y, vx: R(-70, 70), vy: -R(80, 260) * (v || 1), life: R(0.6, 1.2), r: R(1, 2.8) });
  }

  /* ----- kartu: tenggelam (berat: merosot + miring) atau mengapung (ringan: terangkat + berayun) ----- */
  let cardIdx = 0;
  function activate(el, mid, silent) {
    if (acts.has(el) || !el.animate) return;
    const near = Math.abs(mid - wyT) < 170 || el.id === "idcardZone", light = near || (cardIdx++ % 3 === 0), sg = Math.random() < 0.5 ? -1 : 1;
    const dy = el.id === "idcardZone" ? -5 : light ? -R(8, 16) : R(10, 18), rot = sg * (el.id === "idcardZone" ? 1.1 : light ? R(0.6, 1.6) : R(1, 2.4));
    const dur = 1000 + R(0, 500), anims = [];
    if (!reduce) {
      anims.push(el.animate([{ translate: "0 0", rotate: "0deg" }, { translate: "0 " + dy * 1.3 + "px", rotate: rot * 1.3 + "deg", offset: 0.55 }, { translate: "0 " + dy + "px", rotate: rot + "deg" }], { duration: dur, easing: "cubic-bezier(.3,.7,.3,1)", fill: "forwards" }));
      anims.push(el.animate([{ translate: "0 " + dy + "px", rotate: rot + "deg" }, { translate: R(-5, 5) + "px " + (dy + (light ? -R(3, 8) : R(3, 6))) + "px", rotate: -rot * 0.7 + "deg" }],
        { delay: dur, duration: R(3200, 6200), iterations: Infinity, direction: "alternate", easing: "ease-in-out", fill: "backwards" }));
    } else anims.push(el.animate([{ translate: "0 " + dy + "px" }], { duration: 1, fill: "forwards" }));
    el.dataset.flood = light ? "float" : "sink"; acts.set(el, { mid: mid, anims: anims, light: light });
    if (!silent) {
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2;
      if (r.bottom > 0 && r.top < H) { if (light) SND.float(x); else SND.sink(x); for (let i = 0; i < (light ? 4 : 7); i++) spawnBubble(r.left + R(0, r.width), clamp(r.top + R(0, r.height), 0, H), false); }
    }
  }
  function release(el) {
    const a = acts.get(el); if (!a) return;
    a.anims.forEach(an => an.cancel()); acts.delete(el); delete el.dataset.flood;
    if (el.animate && !reduce) el.animate([{ translate: "0 10px" }, { translate: "0 0" }], { duration: 700, easing: "cubic-bezier(.2,1.6,.4,1)" });
  }
  function collect() {
    const sy = window.scrollY, list = [];
    const z = idZone(); if (z) list.push({ el: z, mid: idMid() });
    document.querySelectorAll(SEL).forEach(el => {
      if (acts.has(el) || !el.getClientRects().length) return;
      const r = el.getBoundingClientRect(); list.push({ el: el, mid: r.top + sy + r.height / 2 });
    });
    return list;
  }
  function refreshCards() {   // kartu baru (ganti tab portofolio, dll.) yang berada di bawah air ikut tenggelam
    if (state !== "flooded") return;
    for (const c of collect()) if (c.mid > wyT) activate(c.el, c.mid, true);
  }

  /* ================= GAMBAR ================= */
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const raw = (now - last) / 1000 || 0.016, dt = Math.min(0.05, raw), rdt = Math.min(0.5, raw); last = now; t += dt;
    stepState(dt, rdt);
    draw(dt);
    sharkStep(dt);
  }
  function stepState(dt, rdt) {   // dt = fisika partikel (dibatasi), rdt = waktu nyata untuk garis waktu air (tetap tepat walau FPS rendah)
    if (state === "idle") { seepH = ease(clamp((elapsed - CFG.seepFrom) / Math.max(1, CFG.seconds - CFG.seepFrom), 0, 1)) * 34; }
    else if (state === "congrats") { congratsT += rdt; seepH = Math.min(120, 34 + congratsT * 9); }
    else if (state === "rising") {
      riseT += rdt; const p = clamp(riseT / CFG.rise, 0, 1); wy = lerp(wy0, wyT, ease(p)); surge = Math.max(surge, 1 - p * 0.3);
      for (let i = pend.length - 1; i >= 0; i--) if (wy <= pend[i].mid) { activate(pend[i].el, pend[i].mid, false); pend.splice(i, 1); }
      if (p >= 1) { state = "flooded"; surge = 0.8; SND.ambient(true); refreshTimer = setInterval(refreshCards, 1500); }
    } else if (state === "flooded") { wy = wyT + Math.sin(t * 0.5) * 2.5; surge = Math.max(0, surge - dt * 0.25); }
    else if (state === "draining") {
      drainT += rdt; wy += (70 + Math.min(220, drainT * 38)) * rdt; surge = Math.max(0, surge - dt * 0.3);
      for (const [el, a] of Array.from(acts)) if (wy > a.mid) release(el);
      if (surfaceY() > H + 50) finishDrain();
    }
    if (state === "idle" && seepH < 0.4 && !bubbles.length && !drops.length && !ripples.length && !wet()) { loopOff(); }
  }

  function draw(dt) {
    cx.clearRect(0, 0, W, H);
    const sy = surfaceY(), scrollY = window.scrollY, hidden = sy > H + 40;
    const d = (state === "flooded" || state === "rising" || state === "draining") ? clamp((scrollY + H * 0.5 - wy) / 2400, 0, 1) : 0;
    const A = reduce ? 2 : 5 + 9 * surge + (stormy() ? 5 : 0) + (state === "idle" ? -1.5 : 0);
    const ys = clamp(sy, -40, H + 60), subH = Math.max(0, H - Math.max(0, ys));
    const under = !hidden && sy <= -10 && (state === "flooded" || state === "rising");   // hujan di layar diredam saat semuanya tenggelam
    if (under !== root.hasAttribute("data-fl-under")) root.toggleAttribute("data-fl-under", under);
    // area backdrop-filter (blur ringan di bawah permukaan)
    if (CFG.blur && !hidden) { body.style.transform = "translate3d(0," + Math.max(0, ys + A + 4) + "px,0)"; body.style.opacity = "1"; } else body.style.opacity = "0";

    if (!hidden) {
      // lapisan gelombang belakang
      const step = 10;
      cx.beginPath(); cx.moveTo(-10, H + 5);
      for (let x = -10; x <= W + 10; x += step) cx.lineTo(x, ys + wave(x + 140, t * 0.8 + 2, A * 0.8) - 5);
      cx.lineTo(W + 10, H + 5); cx.closePath(); cx.fillStyle = "rgba(150,215,255,0.20)"; cx.fill();
      // badan air
      const c1 = [lerp(70, 18, d), lerp(176, 98, d), lerp(232, 150, d)], c2 = [lerp(8, 3, d), lerp(60, 34, d), lerp(112, 70, d)];
      const g = cx.createLinearGradient(0, Math.max(0, ys), 0, H);
      g.addColorStop(0, "rgba(" + (c1[0] | 0) + "," + (c1[1] | 0) + "," + (c1[2] | 0) + "," + (0.24 + 0.14 * d) + ")");
      g.addColorStop(1, "rgba(" + (c2[0] | 0) + "," + (c2[1] | 0) + "," + (c2[2] | 0) + "," + (0.5 + 0.14 * d) + ")");
      cx.beginPath(); cx.moveTo(-10, H + 5);
      for (let x = -10; x <= W + 10; x += step) cx.lineTo(x, ys + wave(x, t, A));
      cx.lineTo(W + 10, H + 5); cx.closePath(); cx.fillStyle = g; cx.fill();
      // garis permukaan + busa
      if (ys > -20) {
        cx.save(); cx.beginPath();
        for (let x = -10; x <= W + 10; x += step) { const y = ys + wave(x, t, A); if (x === -10) cx.moveTo(x, y); else cx.lineTo(x, y); }
        cx.strokeStyle = "rgba(235,250,255,0.85)"; cx.lineWidth = 2.2; cx.shadowColor = "rgba(190,235,255,0.9)"; cx.shadowBlur = 10; cx.stroke(); cx.restore();
        cx.fillStyle = "#fff";
        for (const f of foam) {
          const x = (((f.k * W + f.sp * t) % W) + W) % W, y = ys + wave(x, t, A) + 1.5;
          cx.globalAlpha = 0.35 + 0.4 * Math.abs(Math.sin(t * 2 + f.ph)); cx.beginPath(); cx.arc(x, y, f.r, 0, TAU); cx.fill();
        }
        cx.globalAlpha = 1;
      }
      // cahaya: berkas dari permukaan + jaring kaustik
      if (subH > 90) {
        cx.save(); cx.globalCompositeOperation = "lighter";
        const top = Math.max(0, ys);
        for (const r of rays) {
          const x0 = r.x * W + Math.sin(t * r.sp + r.ph) * 70, w0 = r.w, w1 = r.w * 3.2, lean = 60 + Math.sin(t * 0.3 + r.ph) * 30;
          const rg = cx.createLinearGradient(0, top, 0, H); rg.addColorStop(0, "rgba(220,245,255," + 0.11 * (1 - d * 0.6) + ")"); rg.addColorStop(1, "rgba(220,245,255,0)");
          cx.fillStyle = rg; cx.beginPath(); cx.moveTo(x0 - w0, top); cx.lineTo(x0 + w0, top); cx.lineTo(x0 + w1 + lean, H); cx.lineTo(x0 - w1 + lean, H); cx.closePath(); cx.fill();
        }
        cx.strokeStyle = "rgba(210,242,255," + 0.07 * (1 - d * 0.5) + ")"; cx.lineWidth = 1.3;
        for (const c of caustics) {
          const x = c.x * W + Math.sin(t * c.sp + c.ph) * 16, y = top + 20 + c.y * Math.min(subH, 520) + Math.cos(t * c.sp * 0.8 + c.ph) * 10;
          if (y > H) continue; cx.beginPath(); cx.arc(x, y, c.r, c.ph, c.ph + 2.4); cx.stroke();
        }
        cx.restore();
      }
      // vinyet saat hampir semuanya tenggelam
      if (ys <= 0) { const vg = cx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.95); vg.addColorStop(0, "rgba(0,20,50,0)"); vg.addColorStop(1, "rgba(0,20,50," + (0.26 + 0.2 * d) + ")"); cx.fillStyle = vg; cx.fillRect(0, 0, W, H); }
    }

    // percikan, riak hujan, cincin di ID card
    if (!hidden) {
      if (surge > 0.2 && state === "rising" && Math.random() < 0.5 && ys > 0 && ys < H) splashAt(R(0, W), ys, 1, 0.8);
      nextRipple -= dt; if (nextRipple <= 0 && wet() && ys > 0 && ys < H) { nextRipple = R(0.04, 0.12); ripples.push({ x: R(0, W), y: 0, life: 0, rx: R(16, 30), ring: false }); }
      nextIdRing -= dt;
      if ((state === "flooded" || state === "rising") && nextIdRing <= 0 && ys > 0 && ys < H) {
        const el = idCard(); if (el) { const r = el.getBoundingClientRect(); if (r.top < ys && r.bottom > ys) { nextIdRing = R(0.55, 0.9); ripples.push({ x: r.left + r.width / 2, y: 0, life: 0, rx: R(70, 120), ring: true }); if (Math.random() < 0.4) SND.drip(); } }
      }
    }
    cx.save();
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i]; rp.life += dt * (rp.ring ? 0.9 : 1.5); if (rp.life >= 1) { ripples.splice(i, 1); continue; }
      const y = ys + wave(rp.x, t, A), k = rp.life;
      cx.strokeStyle = "rgba(235,250,255," + (0.6 * (1 - k)) + ")"; cx.lineWidth = rp.ring ? 2 : 1.4; cx.beginPath(); cx.ellipse(rp.x, y, rp.rx * k + 3, (rp.rx * k + 3) * 0.22, 0, 0, TAU); cx.stroke();
    }
    cx.fillStyle = "#fff";
    for (let i = drops.length - 1; i >= 0; i--) {
      const p = drops[i]; p.life -= dt; if (p.life <= 0) { drops.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 520 * dt; cx.globalAlpha = clamp(p.life * 1.4, 0, 0.9); cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, TAU); cx.fill();
    }
    cx.restore(); cx.globalAlpha = 1;

    // gelembung
    const aqua = state === "rising" || state === "flooded" || state === "draining";
    if (aqua && subH > 40) {
      nextBubble -= dt; if (nextBubble <= 0) { nextBubble = R(0.06, 0.16); spawnBubble(R(0, W), H + 10, Math.random() < 0.15); if (Math.random() < 0.18) SND.bubble(R(0, W)); }
      nextCardBubble -= dt;
      if (nextCardBubble <= 0 && acts.size) {
        nextCardBubble = R(0.15, 0.4); const arr = Array.from(acts.keys()), el = arr[(Math.random() * arr.length) | 0], r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < H && r.top + r.height / 2 > ys) spawnBubble(r.left + R(0, r.width), clamp(r.top + R(0.2, 1) * r.height, 0, H), false);
      }
    } else if (state === "idle" && seepH > 6 && Math.random() < dt * 4) spawnBubble(R(0, W), H + 6, false);
    cx.save();
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i]; b.life += dt; b.y += b.vy * dt; b.x += Math.sin(b.life * 3 + b.ph) * b.wb * dt;
      const surf = ys + wave(b.x, t, A);
      if (b.y < surf - 2 && !hidden && state !== "congrats") { if (b.y > -20 && b.r > 3) { ripples.push({ x: b.x, y: 0, life: 0, rx: 14, ring: false }); if (Math.random() < 0.3) SND.pop(b.x); } bubbles.splice(i, 1); continue; }
      if (b.y < -20 || b.life > 14) { bubbles.splice(i, 1); continue; }
      cx.globalAlpha = 0.85; cx.strokeStyle = "rgba(235,250,255,0.6)"; cx.fillStyle = "rgba(190,235,255,0.12)"; cx.lineWidth = 1;
      cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, TAU); cx.fill(); cx.stroke();
      cx.fillStyle = "rgba(255,255,255,0.8)"; cx.beginPath(); cx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, Math.max(0.8, b.r * 0.22), 0, TAU); cx.fill();
    }
    cx.restore(); cx.globalAlpha = 1;

    // ikan & paus (hanya saat sudah banjir dan area bawah air cukup tinggi)
    if (state === "flooded" && !reduce && subH > 260) {
      nextFish -= dt; if (nextFish <= 0) { nextFish = R(5, 11); spawnSchool(Math.max(ys + 90, 100)); }
      nextWhale -= dt; if (nextWhale <= 0 && !whale) { nextWhale = R(55, 95); whale = { x: Math.random() < 0.5 ? -260 : W + 260, y: R(H * 0.35, H * 0.7), t: 0 }; whale.dir = whale.x < 0 ? 1 : -1; whale.s = R(0.9, 1.4); SND.whale(); }
    }
    drawFish(dt);
    if (whale) {
      whale.t += dt; whale.x += whale.dir * 26 * dt; drawWhale(whale);
      if ((whale.dir > 0 && whale.x > W + 300) || (whale.dir < 0 && whale.x < -300)) whale = null;
    }
    // suara latar ikut kedalaman
    lastSub = lerp(lastSub, clamp(subH / H, 0, 1), 0.08);
    SND.depth(lastSub);
    // titik tetes kecil saat genangan
    if (state === "idle" && seepH > 4) { nextDrip -= dt; if (nextDrip <= 0) { nextDrip = R(1.2, 2.6); SND.drip(); } }
  }

  function spawnSchool(yMin) {
    const yMax = H - 70; if (yMax < yMin + 40) return;
    const n = Math.random() < 0.35 ? 1 : ((R(5, 9)) | 0), dir = Math.random() < 0.5 ? 1 : -1, size = R(7, 13) * (n === 1 ? 2.2 : 1);
    schools.push({ x: dir > 0 ? -90 : W + 90, y: R(yMin, yMax), sp: R(50, 110) * dir, dir: dir, a: R(0.28, 0.45), t: 0,
      fish: Array.from({ length: n }, (_, i) => ({ dx: -dir * i * R(18, 34), dy: R(-26, 26), ph: R(0, TAU), sc: size * R(0.85, 1.15) })) });
  }
  function drawFish(dt) {
    for (let i = schools.length - 1; i >= 0; i--) {
      const s = schools[i]; s.t += dt; s.x += s.sp * dt;
      if ((s.dir > 0 && s.x > W + 200) || (s.dir < 0 && s.x < -200)) { schools.splice(i, 1); continue; }
      for (const f of s.fish) {
        const x = s.x + f.dx, y = s.y + f.dy + Math.sin(s.t * 1.4 + f.ph) * 12, wag = Math.sin(s.t * 9 + f.ph) * f.sc * 0.5;
        cx.save(); cx.translate(x, y); cx.scale(s.dir, 1); cx.fillStyle = "rgba(6,38,78," + s.a + ")";
        cx.beginPath(); cx.ellipse(0, 0, f.sc * 1.5, f.sc * 0.55, 0, 0, TAU); cx.fill();
        cx.beginPath(); cx.moveTo(-f.sc * 1.3, 0); cx.lineTo(-f.sc * 2.3, -f.sc * 0.8 + wag); cx.lineTo(-f.sc * 2.3, f.sc * 0.8 + wag); cx.closePath(); cx.fill();
        cx.fillStyle = "rgba(220,245,255," + s.a * 1.2 + ")"; cx.beginPath(); cx.arc(f.sc * 0.9, -f.sc * 0.1, Math.max(0.8, f.sc * 0.12), 0, TAU); cx.fill();
        cx.restore();
      }
    }
  }
  function drawWhale(w) {
    const fl = Math.sin(w.t * 1.6) * 8;
    cx.save(); cx.translate(w.x, w.y); cx.scale(w.dir * w.s, w.s); cx.fillStyle = "rgba(4,34,70,0.15)";
    cx.beginPath(); cx.moveTo(150, 0); cx.bezierCurveTo(120, -46, 40, -54, -40, -34); cx.bezierCurveTo(-90, -24, -120, -8, -160, -6);
    cx.lineTo(-195, -34 + fl); cx.lineTo(-178, 2); cx.lineTo(-195, 36 + fl); cx.lineTo(-160, 10);
    cx.bezierCurveTo(-110, 30, -30, 58, 40, 50); cx.bezierCurveTo(100, 44, 140, 26, 150, 0); cx.fill(); cx.restore();
  }

  /* =========================================================
     HIU (PEMBARUAN 48)
     Setelah banjir naik, seekor hiu berenang di bawah air di antara bagian ABOUT sampai KONTAK.
     Ketuk hiunya: dia belok tajam, melesat ke arah kita, membuka mulut lalu MENERKAM layar (retakan + gigitan).
     ========================================================= */
  const SKH = 0.52, OPEN = 100;      // SKH = tinggi/lebar gambar hiu samping, OPEN = bukaan rahang (satuan gambar depan)
  let skWrap = null, skEl = null, skTail = null, skState = "off", skBusy = false, skX = 0, skY0 = 0, skDir = 1, skW = 220, skT = 0, skAng = 0;
  let skTimer = 0, skOy = 0, skLane = null, skLaneAt = -9, skHeard = false, skHintAt = -99, skRaf = 0, skAtkEl = null, skTO = [];

  function sideSVG(u) {   // hiu tampak samping, menghadap kanan
    return '<svg viewBox="0 -18 300 156" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><linearGradient id="skb' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34506a"/><stop offset="1" stop-color="#7f9db2"/></linearGradient>' +
      '<linearGradient id="skw' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f8fb"/><stop offset="1" stop-color="#bccfda"/></linearGradient></defs>' +
      '<g class="sk-tail"><path d="M52 64L4 34C16 54 22 66 20 76C22 88 16 100 4 120L52 88Z" fill="#35505f"/></g>' +
      '<path d="M110 100L94 118L134 104Z" fill="#46657b"/>' +
      '<path d="M178 33C172 14 160 -6 146 -16C152 6 144 24 114 38Z" fill="#2f4858"/>' +
      '<path d="M200 90C190 110 168 126 140 136C176 130 214 108 232 92Z" fill="#46657b"/>' +
      '<path d="M294 68C270 44 230 30 180 30C130 30 86 44 48 64L48 90C86 104 130 108 180 104C232 100 270 88 294 68Z" fill="url(#skb' + u + ')"/>' +
      '<path d="M294 68C270 88 232 100 180 104C130 108 86 104 48 90L52 84C96 92 140 90 190 84C240 78 274 72 294 68Z" fill="url(#skw' + u + ')"/>' +
      '<path d="M216 52Q221 63 216 75M225 51Q230 63 225 76M234 51Q239 63 234 75" stroke="#243847" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>' +
      '<circle cx="267" cy="58" r="4.4" fill="#08121a"/><circle cx="268.4" cy="56.6" r="1.4" fill="#fff"/>' +
      '<path d="M296 70Q276 81 250 76" stroke="#17262f" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M286 76l2 6l3-6zM275 79l2 6l3-6zM264 79l2 6l3-5z" fill="#fff"/>' +
      '</svg>';
  }

  const cavPath = o => {   // rongga mulut di antara bibir atas & bawah yang bergeser sejauh o
    const m = o + 6, a = 232 - m, b = 232 + m;
    return "M44 " + a + " Q200 " + (332 - m) + " 356 " + a + " C372 " + (232 - m * 0.55) + " 372 " + (232 + m * 0.55) + " 356 " + b +
      " Q200 " + (332 + m) + " 44 " + b + " C28 " + (232 + m * 0.55) + " 28 " + (232 - m * 0.55) + " 44 " + a + "Z";
  };
  function frontSVG() {   // hiu tampak depan: rahang atas (.uj) & bawah (.lj) digerakkan lewat JS
    const row = (up, n, hs, ws, dy, fill) => {
      let s = '<g fill="' + fill + '" stroke="#9c9884" stroke-width=".8" stroke-linejoin="round">';
      for (let i = 0; i < n; i++) {
        const tt = 0.045 + 0.91 * i / (n - 1), mt = 1 - tt;
        const x = mt * mt * 44 + 2 * mt * tt * 200 + tt * tt * 356, y = mt * mt * 232 + 2 * mt * tt * 332 + tt * tt * 232 + dy;
        const mid = 1 - Math.abs(tt - 0.5) * 2, h = hs * (0.45 + 0.55 * Math.sqrt(mid)), w = ws * (0.7 + 0.3 * mid);
        s += up
          ? '<path d="M' + (x - w / 2).toFixed(1) + " " + (y + 3).toFixed(1) + "L" + x.toFixed(1) + " " + (y - h).toFixed(1) + "L" + (x + w / 2).toFixed(1) + " " + (y + 3).toFixed(1) + 'Z"/>'
          : '<path d="M' + (x - w / 2).toFixed(1) + " " + (y - 3).toFixed(1) + "L" + x.toFixed(1) + " " + (y + h).toFixed(1) + "L" + (x + w / 2).toFixed(1) + " " + (y - 3).toFixed(1) + 'Z"/>';
      }
      return s + "</g>";
    };
    return '<svg viewBox="-20 -20 440 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="skfU" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c465c"/><stop offset=".55" stop-color="#58778e"/><stop offset="1" stop-color="#7f9db2"/></linearGradient>' +
      '<linearGradient id="skfL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfdce5"/><stop offset=".4" stop-color="#eef4f7"/><stop offset="1" stop-color="#cbd9e3"/></linearGradient>' +
      '<radialGradient id="skfM" cx=".5" cy=".5" r=".62"><stop offset="0" stop-color="#0a0107"/><stop offset=".6" stop-color="#35060f"/><stop offset="1" stop-color="#7a1320"/></radialGradient>' +
      '<radialGradient id="skfG"><stop offset="0" stop-color="#ff5a3c" stop-opacity="1"/><stop offset=".45" stop-color="#ff2a22" stop-opacity=".6"/><stop offset="1" stop-color="#ff1a1a" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="skfCU"><path d="M-40 -40H440V232H356Q200 332 44 232H-40Z"/></clipPath>' +
      '<clipPath id="skfCL"><path d="M-40 232H44Q200 332 356 232H440V440H-40Z"/></clipPath></defs>' +
      '<path d="M60 250C14 280-14 326-10 372C40 338 92 312 120 286Z" fill="#46657b"/><path d="M340 250C386 280 414 326 410 372C360 338 308 312 280 286Z" fill="#46657b"/>' +
      '<path class="cav" d="M0 0" fill="url(#skfM)"/>' +
      '<g class="lj"><g clip-path="url(#skfCL)"><ellipse cx="200" cy="205" rx="160" ry="155" fill="url(#skfL)"/></g></g>' +
      '<g class="uj"><path d="M192 60L200 0L208 60Z" fill="#2f4858"/><g clip-path="url(#skfCU)"><ellipse cx="200" cy="205" rx="160" ry="155" fill="url(#skfU)"/>' +
      '<ellipse cx="200" cy="118" rx="96" ry="46" fill="#fff" opacity=".09"/></g>' +
      '<circle cx="92" cy="178" r="11" fill="#06101a"/><circle cx="95" cy="174" r="3.6" fill="#fff"/><circle cx="308" cy="178" r="11" fill="#06101a"/><circle cx="311" cy="174" r="3.6" fill="#fff"/>' +
      '<path d="M74 160Q92 149 114 160M286 160Q308 149 326 160" stroke="#1b2f40" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>' +
      '<ellipse cx="168" cy="196" rx="5" ry="2.6" fill="#142636"/><ellipse cx="232" cy="196" rx="5" ry="2.6" fill="#142636"/>' +
      '<circle class="eg" cx="92" cy="178" r="26" fill="url(#skfG)" opacity="0"/><circle class="eg" cx="308" cy="178" r="26" fill="url(#skfG)" opacity="0"/></g>' +
      '<g class="lj">' + row(true, 15, 32, 14, 7, "#d8d3bd") + row(true, 17, 34, 14, 0, "#f8f5e9") + "</g>" +
      '<g class="uj">' + row(false, 15, 36, 15, -7, "#d8d3bd") + row(false, 17, 38, 15, 0, "#f8f5e9") + "</g>" +
      "</svg>";
  }

  /* ----- jalur renang: dari awal bagian About sampai dasar bagian Kontak, hanya di bawah permukaan air ----- */
  function sharkLane() {
    const a = document.querySelector(".about-section"), c = document.querySelector(".contact-section"); if (!c) return null;
    const sy = window.scrollY, cr = c.getBoundingClientRect();
    let top = (a ? a.getBoundingClientRect().top + sy : cr.top + sy) + 40; const bot = cr.bottom + sy - 90;
    top = Math.max(top, wyT + 90);
    return bot - top > 140 ? { top: top, bot: bot } : null;
  }
  function sharkBuild() {
    if (skWrap) return;
    skWrap = document.createElement("div"); skWrap.className = "fl-sk-wrap"; skWrap.style.display = "none";
    skEl = document.createElement("button"); skEl.type = "button"; skEl.className = "fl-sk"; skEl.tabIndex = -1; skEl.setAttribute("aria-label", "Hiu");
    skEl.innerHTML = sideSVG("a"); skTail = skEl.querySelector(".sk-tail");
    skWrap.appendChild(skEl); document.body.appendChild(skWrap);
    skEl.addEventListener("click", () => sharkAttack(false));
  }
  function sharkSpawn(lane) {
    const vT = window.scrollY + 70, vB = window.scrollY + H - 70, lo = Math.max(lane.top, vT), hi = Math.min(lane.bot, vB);
    skY0 = (hi - lo > 60 && Math.random() < 0.7) ? R(lo, hi) : R(lane.top, lane.bot);   // sering lewat di layar yang sedang dilihat
    skDir = Math.random() < 0.5 ? 1 : -1; skW = clamp(W * 0.26, 140, 250); skT = R(0, 6); skHeard = false;
    skX = skDir > 0 ? -skW - 30 : W + 30; skState = "swim";
    skEl.style.width = skW + "px"; skEl.style.height = skW * SKH + "px";
  }
  function sharkStep(dt) {
    if (!CFG.shark || state !== "flooded") {
      if (state !== "flooded") skState = "off";
      if (skWrap && skWrap.style.display !== "none") skWrap.style.display = "none";
      return;
    }
    if (skBusy) return;
    if (t - skLaneAt > 0.4) { skLane = sharkLane(); skLaneAt = t; }
    const lane = skLane;
    if (!lane) { if (skWrap) skWrap.style.display = "none"; return; }
    sharkBuild();
    if (skState === "off") { skState = "wait"; skTimer = CFG.sharkFirst; }
    if (skState === "wait") {
      skTimer -= dt; if (skWrap.style.display !== "none") skWrap.style.display = "none";
      if (skTimer > 0) return;
      sharkSpawn(lane);
    }
    const sp = (reduce ? 0.55 : 1) * CFG.sharkSpeed * (W < 700 ? 0.8 : 1);
    skX += skDir * sp * dt; skT += dt;
    if ((skDir > 0 && skX > W + 40) || (skDir < 0 && skX < -skW - 40)) { skState = "wait"; skTimer = R(5, 11); skWrap.style.display = "none"; return; }
    // wadah mengikuti jalur (koordinat halaman, dikoreksi dengan posisi asal wadah)
    const wTop = lane.top - 70, wH = lane.bot - lane.top + 140; skWrap.style.display = "block";
    if (Math.abs((parseFloat(skWrap.style.top) || 0) - (wTop - skOy)) > 0.5) {
      const css = wTop - skOy; skWrap.style.top = css + "px"; skWrap.style.height = wH + "px";
      skOy = skWrap.getBoundingClientRect().top + window.scrollY - css;
    } else if (Math.abs((parseFloat(skWrap.style.height) || 0) - wH) > 0.5) skWrap.style.height = wH + "px";
    const bob = reduce ? 0 : Math.sin(skT * 0.9) * 18, vy = reduce ? 0 : Math.cos(skT * 0.9) * 16;
    skAng = Math.atan2(vy, sp) * 57.3 * skDir;
    const ly = skY0 + bob - wTop - (skW * SKH) / 2;
    skEl.style.transform = "translate3d(" + skX.toFixed(1) + "px," + ly.toFixed(1) + "px,0) rotate(" + skAng.toFixed(2) + "deg) scaleX(" + skDir + ")";
    if (skTail) skTail.setAttribute("transform", "rotate(" + (reduce ? 0 : Math.sin(skT * 7) * 14).toFixed(1) + " 52 76)");
    const scrY = skY0 + bob - window.scrollY;   // pertama kali masuk layar: dua denyut rendah sebagai isyarat
    if (!skHeard && skX > -skW * 0.2 && skX < W - skW * 0.8 && scrY > 30 && scrY < H - 30 && t - skHintAt > 25) { skHeard = true; skHintAt = t; SND.sharkHint(); }
  }

  /* ----- TERKAMAN: belok -> melesat -> mulut terbuka -> gigit (semua dihitung per frame dari satu garis waktu) ----- */
  function buildGlass(host) {
    const w = W, h = H, cx = w / 2, cy = h / 2, mx = Math.max(w, h); let paths = "", marks = "", n = 0;
    const add = (d, extra) => { paths += '<path pathLength="1" style="--d:' + (R(0, 0.14) + (extra || 0)).toFixed(2) + 's" d="' + d + '"/>'; };
    const rays = 15;
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * TAU + R(-0.12, 0.12), len = mx * R(0.3, 0.75), segs = 5 + ((Math.random() * 3) | 0);
      let x = cx + R(-30, 30), y = cy + R(-12, 12), d = "M" + x.toFixed(0) + " " + y.toFixed(0);
      for (let s = 0; s < segs; s++) {
        const aa = a + R(-0.28, 0.28), sl = len / segs; x += Math.cos(aa) * sl; y += Math.sin(aa) * sl; d += "L" + x.toFixed(0) + " " + y.toFixed(0);
        if (Math.random() < 0.35) { const ba = aa + (Math.random() < 0.5 ? -1 : 1) * R(0.5, 0.9), bl = sl * R(0.5, 1.1); add("M" + x.toFixed(0) + " " + y.toFixed(0) + "L" + (x + Math.cos(ba) * bl).toFixed(0) + " " + (y + Math.sin(ba) * bl).toFixed(0), 0.12); }
      }
      add(d);
    }
    add("M0 " + (cy - 14) + "Q" + cx + " " + (cy - 14 + h * 0.14) + " " + w + " " + (cy - 14), 0.05);   // garis bibir atas & bawah
    add("M0 " + (cy + 14) + "Q" + cx + " " + (cy + 14 + h * 0.14) + " " + w + " " + (cy + 14), 0.08);
    const step = w / 22;
    for (let x = step * 0.6; x < w; x += step) {   // lubang gigi atas (menunjuk ke bawah) & gigi bawah (menunjuk ke atas) berselang-seling
      const u1 = x / w, u2 = Math.min(1, (x + step / 2) / w), sz = 5 + 6 * Math.sin(u1 * Math.PI);
      const w1 = 0.28 * h * u1 * (1 - u1), w2 = 0.28 * h * u2 * (1 - u2), xa = x + step / 2;
      marks += '<path class="tm" style="--d:' + (0.08 + n * 0.012).toFixed(2) + 's" d="M' + (x - sz).toFixed(0) + " " + (cy - 14 + w1).toFixed(0) + "L" + (x + sz).toFixed(0) + " " + (cy - 14 + w1).toFixed(0) + "L" + x.toFixed(0) + " " + (cy + 4 + w1 + sz).toFixed(0) + 'Z"/>' +
        '<path class="tm" style="--d:' + (0.1 + n * 0.012).toFixed(2) + 's" d="M' + (xa - sz).toFixed(0) + " " + (cy + 14 + w2).toFixed(0) + "L" + (xa + sz).toFixed(0) + " " + (cy + 14 + w2).toFixed(0) + "L" + xa.toFixed(0) + " " + (cy - 4 + w2 - sz).toFixed(0) + 'Z"/>'; n++;
    }
    let drops = ""; for (let i = 0; i < 16; i++) drops += '<i class="fl-sk-drop" style="left:' + R(2, 98).toFixed(1) + "%;top:" + R(0, 45).toFixed(1) + "%;--s:" + R(7, 15).toFixed(0) + "px;--t:" + R(1.6, 3.2).toFixed(2) + "s;--dl:" + R(0, 0.7).toFixed(2) + 's"></i>';
    host.innerHTML = '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true"><g class="cr">' + paths + "</g><g>" + marks + "</g></svg>" + drops;
  }

  function skBurst(host, n, spread, big) {   // ledakan gelembung dari mulut
    for (let i = 0; i < n; i++) {
      const b = document.createElement("i"), a = R(0, TAU), d = R(0.2, 1) * spread; b.className = "fl-sk-bub";
      b.style.cssText = "left:" + (W / 2 + R(-40, 40)).toFixed(0) + "px;top:" + (H / 2 + R(-30, 30)).toFixed(0) + "px;--dx:" + (Math.cos(a) * d).toFixed(0) + "px;--dy:" + (Math.sin(a) * d - R(0, 120)).toFixed(0) + "px;--s:" + (big ? R(8, 38) : R(5, 22)).toFixed(0) + "px;--t:" + R(0.9, 2.1).toFixed(2) + "s";
      b.addEventListener("animationend", () => b.remove()); host.appendChild(b);
    }
  }
  function skRings(host) {   // gelombang kejut air
    [0, 0.14].forEach(d => { const r = document.createElement("i"); r.className = "fl-sk-ring"; r.style.setProperty("--dl", d + "s"); r.addEventListener("animationend", () => r.remove()); host.appendChild(r); });
  }
  let skCgKill = null;
  function sharkCongrats(done) {   // ucapan selamat setelah digigit
    if (!CFG.sharkCongrats) { done(); return; }
    const c = document.createElement("div"); c.className = "fl-congrats fl-sk-cg"; c.setAttribute("role", "dialog"); c.setAttribute("aria-label", "Easter egg Hiu ditemukan");
    const title = "Selamat!".split("").map((ch, i) => '<i style="--i:' + i + '">' + ch + "</i>").join("");
    c.innerHTML = '<div class="fl-cg-card"><div class="fl-cg-in"><div class="fl-sk-cg-ico">' + sideSVG("c") + '</div><p class="fl-cg-kick">EASTER EGG DITEMUKAN</p>' +
      '<h2 class="fl-cg-title"><span class="fl-cg-ltr">' + title + '</span><span class="fl-cg-sub1">Kamu menemukan easter egg <b>Hiu</b></span></h2>' +
      '<p class="fl-cg-text">Kamu berani mengetuk hiu di dasar banjir&hellip; dan layarmu pun tergigit. Hati-hati kalau air naik lagi.</p>' +
      '<p class="fl-cg-hint">Ketuk untuk lanjut &middot; Esc</p></div></div>';
    for (let i = 0; i < 14; i++) { const b = document.createElement("i"); b.className = "fl-cg-b"; b.style.cssText = "--x:" + R(4, 96).toFixed(1) + "%;--s:" + R(6, 20).toFixed(0) + "px;--d:" + R(0, 3).toFixed(2) + "s;--t:" + R(3.5, 7).toFixed(2) + "s"; c.appendChild(b); }
    document.body.appendChild(c); requestAnimationFrame(() => c.classList.add("in")); SND.jingle();
    let closed = false, to = 0;
    const key = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); close(); } };
    function close() {
      if (closed) return; closed = true; clearTimeout(to); document.removeEventListener("keydown", key); skCgKill = null;
      c.classList.remove("in"); c.classList.add("out"); setTimeout(() => c.remove(), 700); done();
    }
    skCgKill = () => { closed = true; clearTimeout(to); document.removeEventListener("keydown", key); c.remove(); skCgKill = null; };
    c.addEventListener("pointerdown", close); document.addEventListener("keydown", key); to = setTimeout(close, 9000);
  }

  function sharkAttack(fake) {
    if (skBusy || (!fake && state !== "flooded")) return;
    let cx0 = W * 0.72, cy0 = H * 0.5, w0 = clamp(W * 0.26, 140, 250), ang0 = 0, dir0 = 1;
    if (!fake && skEl) { const r = skEl.getBoundingClientRect(); cx0 = r.left + r.width / 2; cy0 = r.top + r.height / 2; w0 = skW; ang0 = skAng; dir0 = skDir; }
    skBusy = true; SND.warm(); if (skWrap) skWrap.style.display = "none";
    const S = Math.min(W, H) * 0.92, oy = 0.641, sgn = dir0 > 0 ? -1 : 1;
    const k0 = (0.51 * w0 * 440) / (320 * S), kF = 1.1 * Math.max(W / (312 * S / 440), H / (2 * OPEN * S / 440));
    const el = document.createElement("div"); el.className = "fl-sk-atk"; skAtkEl = el;
    el.innerHTML = '<div class="fl-sk-stage"><div class="fl-sk-dark"></div><div class="fl-sk-streaks"></div>' +
      '<div class="fl-sk-side">' + sideSVG("b") + '</div><div class="fl-sk-front">' + frontSVG() + '</div></div><div class="fl-sk-red"></div><div class="fl-sk-fx"></div><div class="fl-sk-flash"></div><div class="fl-sk-glass"></div>';
    document.body.appendChild(el);
    const $ = s => el.querySelector(s), stage = $(".fl-sk-stage"), dark = $(".fl-sk-dark"), streaks = $(".fl-sk-streaks"), side = $(".fl-sk-side"), front = $(".fl-sk-front");
    const red = $(".fl-sk-red"), fx = $(".fl-sk-fx"), egs = el.querySelectorAll(".eg"), flash = $(".fl-sk-flash"), glass = $(".fl-sk-glass"), cav = $(".cav"), ups = el.querySelectorAll(".uj"), lows = el.querySelectorAll(".lj"), tail = $(".sk-tail");
    side.style.cssText = "left:" + (cx0 - w0 / 2) + "px;top:" + (cy0 - (w0 * SKH) / 2) + "px;width:" + w0 + "px;height:" + w0 * SKH + "px";
    front.style.cssText = "width:" + S + "px;height:" + S + "px;left:" + (W / 2 - S / 2) + "px;top:" + (H / 2 - oy * S) + "px;opacity:0";
    const fdx0 = (cx0 - W / 2) * 0.7, fdy0 = (cy0 - H / 2) * 0.7;
    const D = reduce ? 0.55 : 1, eIn = k => k * k * k, eOut = k => 1 - Math.pow(1 - k, 3);
    let bitten = false;
    const evs = [{ t: 0, f: () => SND.sharkTurn() }, { t: 0.62, f: () => SND.sharkDash(0.95) }, { t: 1.35, f: () => SND.sharkRoar() }, { t: 1.55, f: () => skBurst(fx, 22, W * 0.5, false) },
      { t: 2.38, f: () => {
        bitten = true; SND.sharkChomp(); flash.classList.add("go"); red.classList.add("go"); skBurst(fx, 46, Math.max(W, H) * 0.7, true); skRings(fx); buildGlass(glass); void glass.offsetWidth; glass.classList.add("go");
      } }];
    const t0 = performance.now();
    function fin() {   // tinggal retakan & tetesan air -> ucapan selamat -> pudar
      stage.style.display = "none"; el.classList.add("rel");
      const after = () => {
        el.classList.add("end");
        skTO.push(setTimeout(() => { if (skAtkEl === el) { el.remove(); skAtkEl = null; } skBusy = false; skState = "wait"; skTimer = R(CFG.sharkCool[0], CFG.sharkCool[1]); }, 1100));
      };
      skTO.push(setTimeout(() => sharkCongrats(after), 1000 * D));
    }
    function step(now) {
      const tt = (now - t0) / (1000 * D), P = (a, b) => clamp((tt - a) / (b - a), 0, 1);
      for (const e of evs) if (!e.d && tt >= e.t) { e.d = 1; e.f(); }
      // 1) belok: tampak samping memutar ke arah kita
      const eu = ease(P(0, 0.8)), cf = P(0.5, 0.8);
      side.style.transform = "translate(" + (W / 2 - cx0) * 0.3 * eu + "px," + (H / 2 - cy0) * 0.3 * eu + "px) scale(" + (1 + 0.55 * eu) + ") perspective(900px) rotateY(" + (reduce ? 0 : 82 * eu * sgn) + "deg) rotate(" + ang0 * (1 - eu) + "deg) scaleX(" + dir0 + ")";
      side.style.opacity = 1 - cf; if (tail && !reduce) tail.setAttribute("transform", "rotate(" + (Math.sin(tt * 30) * 20).toFixed(1) + " 52 76)");
      // 2) melesat + 3) mulut terbuka
      const dp = P(0.75, 1.5), op = P(1.25, 2.15), sn = P(2.15, 2.38), rp = P(2.95, 3.65);
      let k = k0 * Math.pow(1 / k0, dp * dp) * Math.pow(kF, eIn(op)) * (1 + 0.12 * eIn(sn)) * Math.pow(0.07, eIn(rp));
      const o = tt < 2.15 ? OPEN * eOut(op) : OPEN * (1 - eIn(sn));
      const fd = 1 - ease(dp);
      front.style.transform = "translate(" + fdx0 * fd + "px," + fdy0 * fd + "px) scale(" + k + ")"; front.style.opacity = cf * (1 - rp * rp);
      const tr = "translate(0," + (-o).toFixed(1) + ")", tl = "translate(0," + o.toFixed(1) + ")";
      ups.forEach(g => g.setAttribute("transform", tr)); lows.forEach(g => g.setAttribute("transform", tl)); cav.setAttribute("d", o > 0.4 ? cavPath(o) : "M0 0");
      dark.style.opacity = 0.94 * ease(P(0.2, 1.7)) * (1 - rp); streaks.style.opacity = reduce ? 0 : 0.9 * Math.sin(Math.PI * P(0.7, 1.9));
      streaks.style.transform = "scale(" + (1 + 0.6 * P(0.7, 1.9)) + ")";
      const eg = P(1.2, 1.7); egs.forEach(g => g.setAttribute("opacity", (eg * (0.75 + 0.25 * Math.sin(tt * 34))).toFixed(2)));   // mata menyala merah
      // getaran + hentakan saat gigitan
      if (bitten && !reduce) { const a = 16 * Math.max(0, 1 - (tt - 2.38) / 0.57); stage.style.transform = "translate(" + R(-a, a).toFixed(1) + "px," + R(-a, a).toFixed(1) + "px) scale(" + (1 + 0.005 * a).toFixed(3) + ")"; }
      if (tt < 3.7) skRaf = requestAnimationFrame(step); else { skRaf = 0; fin(); }
    }
    skRaf = requestAnimationFrame(step);
  }
  function sharkReset() {
    cancelAnimationFrame(skRaf); skRaf = 0; skTO.forEach(clearTimeout); skTO = []; if (skCgKill) skCgKill();
    if (skAtkEl) { skAtkEl.remove(); skAtkEl = null; }
    skBusy = false; skState = "off"; if (skWrap) skWrap.style.display = "none";
  }

  /* ================= ALUR ================= */
  function trigger() {
    if (state !== "idle") return;
    state = "congrats"; congratsT = 0; SND.thunder(); SND.jingle(); doFlash(); showCongrats(); loopOn();
    autoTimer = setTimeout(closeCongrats, CFG.autoClose * 1000);
  }
  function doFlash() {
    if (!flash) { flash = document.createElement("div"); flash.className = "fl-flash"; document.body.appendChild(flash); }
    flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
  }
  function showCongrats() {
    congrats = document.createElement("div"); congrats.className = "fl-congrats"; congrats.setAttribute("role", "dialog"); congrats.setAttribute("aria-label", "Easter egg Banjir ditemukan");
    const title = "Selamat!".split("").map((c, i) => '<i style="--i:' + i + '">' + c + "</i>").join("");
    congrats.innerHTML =
      '<div class="fl-cg-card"><div class="fl-cg-fill"><span class="fl-w fl-w1"></span><span class="fl-w fl-w2"></span></div>' +
      '<div class="fl-cg-in"><p class="fl-cg-kick">EASTER EGG DITEMUKAN</p>' +
      '<h2 class="fl-cg-title"><span class="fl-cg-ltr">' + title + '</span><span class="fl-cg-sub1">Kamu menemukan easter egg <b>Banjir</b></span></h2>' +
      '<p class="fl-cg-text">Hujan turun 2 menit tanpa henti&hellip; air mulai naik sampai tengah ID card. Gulir ke bawah dan lihat semuanya tenggelam.</p>' +
      '<p class="fl-cg-hint">Ketuk untuk lanjut &middot; Esc</p>' +
      '<p class="fl-cg-tip">Ganti cuaca ke Cerah atau Angin untuk menyurutkan banjir</p></div></div>';
    for (let i = 0; i < 14; i++) { const b = document.createElement("i"); b.className = "fl-cg-b"; b.style.cssText = "--x:" + R(4, 96).toFixed(1) + "%;--s:" + R(6, 20).toFixed(0) + "px;--d:" + R(0, 3).toFixed(2) + "s;--t:" + R(3.5, 7).toFixed(2) + "s"; congrats.appendChild(b); }
    document.body.appendChild(congrats);
    requestAnimationFrame(() => { if (congrats) congrats.classList.add("in"); });
    congrats.addEventListener("pointerdown", closeCongrats);
    document.addEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { if (state === "congrats") { e.preventDefault(); closeCongrats(); } } }
  function closeCongrats() {
    if (state !== "congrats") return;
    clearTimeout(autoTimer); document.removeEventListener("keydown", onKey);
    state = "prep";
    if (congrats) { const c = congrats; congrats = null; c.classList.remove("in"); c.classList.add("out"); setTimeout(() => c.remove(), 700); }
    let top = null;
    if (CFG.scroll) { top = clamp(idMid() - H * 0.5, 0, Math.max(0, document.documentElement.scrollHeight - H)); window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" }); }
    const t0 = performance.now();
    (function wait() {
      const done = top == null || Math.abs(window.scrollY - top) < 3 || performance.now() - t0 > 2200;
      if (done) setTimeout(startRise, 350); else setTimeout(wait, 60);
    })();
  }
  function startRise() {
    if (state !== "prep") return;
    wyT = idMid(); wy0 = window.scrollY + H - seepH; wy = wy0; riseT = 0; surge = 1; state = "rising";
    if (reduce) { CFG._rise = CFG.rise; }
    pend = [];
    for (const c of collect()) { if (c.mid > wy0 + 4) activate(c.el, c.mid, true); else if (c.mid > wyT) pend.push(c); }
    SND.splash(0.3); SND.rise(CFG.rise);
    splashAt(W / 2, H - seepH, 18, 1.1);
  }
  function drain() {
    if (state !== "flooded" && state !== "rising") return;
    clearInterval(refreshTimer); state = "draining"; drainT = 0; surge = 0.5; SND.ambient(false); SND.drain(8); pend = [];
  }
  function finishDrain() {
    for (const el of Array.from(acts.keys())) release(el);
    state = "idle"; elapsed = 0; seepH = 0; seepRumbled = false; whale = null; schools.length = 0;
    setTimeout(() => { if (state === "idle") loopOff(); }, 1200);
  }
  function reset() {
    clearTimeout(autoTimer); clearInterval(refreshTimer); document.removeEventListener("keydown", onKey);
    if (congrats) { congrats.remove(); congrats = null; }
    for (const el of Array.from(acts.keys())) release(el);
    SND.ambient(false); state = "idle"; elapsed = 0; seepH = 0; seepRumbled = false; whale = null; schools.length = 0; bubbles.length = 0; drops.length = 0; ripples.length = 0; pend = [];
    sharkReset(); loopOff();
  }

  /* ================= PEMICU: hujan / hujan petir 2 menit ================= */
  setInterval(() => {
    if (document.hidden) return;
    if (state === "idle") {
      if (wet()) {
        elapsed += 0.25;
        if (elapsed >= CFG.seconds) trigger();
        else if (elapsed >= CFG.seepFrom) {
          loopOn();
          if (!seepRumbled && elapsed >= CFG.seepFrom + (CFG.seconds - CFG.seepFrom) * 0.5) { seepRumbled = true; SND.rumble(); }
        }
      } else if (elapsed > 0) { elapsed = Math.max(0, elapsed - 1.5); if (elapsed < CFG.seepFrom) seepRumbled = false; }
    } else if (state === "flooded" && !wet()) drain();
  }, 250);
  ["pointerdown", "keydown"].forEach(ev => window.addEventListener(ev, () => { if (wet() || state !== "idle") SND.warm(); SND.resume(); }, { passive: true, capture: true }));
  window.addEventListener("resize", () => { size(); if (state === "flooded") wyT = idMid(); });
  window.addEventListener("pointerdown", e => {   // klik di bawah air = gelembung
    if (state !== "flooded" && state !== "rising") return; if (e.pointerType === "mouse" && e.button !== 0) return;
    const sy = surfaceY(); if (e.clientY < sy) return;
    for (let i = 0; i < 6; i++) spawnBubble(e.clientX + R(-14, 14), e.clientY + R(-6, 10), Math.random() < 0.25);
    SND.pop(e.clientX);
  }, { passive: true, capture: true });
  document.addEventListener("visibilitychange", () => { if (document.hidden) SND.ambient(false); else if (state === "flooded") SND.ambient(true); });

  window.banjir = {
    CFG: CFG,
    state: () => state + " · hujan " + Math.round(elapsed) + "/" + CFG.seconds + " dtk",
    fire() { if (state === "idle") trigger(); return "Banjir dipicu."; },
    flood() { if (state === "idle") { trigger(); closeCongrats(); } return "Air naik."; },
    drain() { drain(); return "Banjir surut."; },
    reset() { reset(); return "Direset."; },
    shark() { if (state !== "flooded") return "Banjir belum naik (pakai banjir.flood() dulu)."; if (!skBusy) { skState = "wait"; skTimer = 0; } return "Hiu muncul."; },
    bite() { sharkAttack(true); return "Hiu menerkam."; }
  };
})();


/* =========================================================
   PEMBARUAN 49: EASTER EGG PETIR (modul petirEgg)
   Saat mode cuaca HUJAN PETIR menyala, ada KESEMPATAN acak layar tersambar petir langsung:
   layar berkedip & bergemuruh -> petir menyambar -> layar PUTIH SEMENTARA (telinga berdenging) -> memudar -> ucapan selamat.
   Semua suara Web Audio (ikut mati kalau tapSound.on = false). Hormati prefers-reduced-motion.
   Console: petir.strike() | petir.reset() | petir.CFG (chance, minStorm, cooldown, whiteHold, sound, volume, congrats)
========================================================= */
(function petirEgg() {
  "use strict";
  const root = document.documentElement;
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = { chance: 0.025, minStorm: 5, cooldown: 60, whiteHold: 1.4, sound: true, volume: 1, congrats: true };   // chance = peluang per detik saat Hujan Petir (rata-rata ~40 dtk)
  const R = (a, b) => a + Math.random() * (b - a), TAU = Math.PI * 2;
  const stormy = () => root.dataset.weather === "storm";
  const loud = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);

  /* ---------- suara ---------- */
  let ac = null, bus = null, nbuf = null;
  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); const m = ac.createGain(); m.gain.value = 0.9 * CFG.volume;
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 5; m.connect(comp); comp.connect(ac.destination); bus = m;
    nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  const ready = () => loud() && init();
  function tone(type, f0, f1, t, dur, vol, atk) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(type, f0, f1, t, dur, vol, atk, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; const f = ac.createBiquadFilter(), g = ac.createGain(); f.type = type; f.Q.value = q || 0.8;
    f.frequency.setValueAtTime(f0, t); if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }
  const SND = {
    warm() { if (loud()) init(); },
    warn() {   // dengung statis + kretek yang makin rapat
      if (!ready()) return; const t = ac.currentTime + 0.02;
      noise("lowpass", 500, 90, t, 1.0, 0.22, 0.4); tone("sine", 48, 38, t, 1.0, 0.16, 0.5);
      for (let i = 0; i < 9; i++) noise("highpass", R(3500, 7000), R(2000, 3500), t + 0.1 + i * (0.09 - i * 0.006), 0.04, 0.05 + i * 0.012, 0.001);
    },
    crack() {   // DUAR
      if (!ready()) return; const t = ac.currentTime + 0.005;
      noise("highpass", 3600, 700, t, 0.22, 1.0, 0.001); noise("bandpass", 1800, 300, t, 0.5, 0.8, 0.002, 0.7);
      noise("lowpass", 1600, 60, t + 0.03, 2.8, 0.75, 0.05); tone("sine", 70, 24, t, 2.2, 0.7, 0.01);
    },
    ring() {   // telinga berdenging setelah tersambar
      if (!ready()) return; const t = ac.currentTime + 0.1;
      tone("sine", 3150, 3150, t, 3.4, 0.1, 0.08); tone("sine", 3260, 3260, t, 3.0, 0.06, 0.1);
    },
    jingle() {   // kartu selamat: arpeggio listrik terang
      if (!ready()) return; const t = ac.currentTime + 0.05;
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => { tone("triangle", f, f, t + i * 0.08, 1.2, 0.1, 0.004); tone("sine", f * 2, f * 2, t + i * 0.08, 0.5, 0.03, 0.004); });
      noise("highpass", 5000, 2500, t, 0.25, 0.14, 0.003);
    }
  };
  ["pointerdown", "keydown"].forEach(ev => window.addEventListener(ev, () => { if (stormy()) SND.warm(); if (ac && ac.state === "suspended") ac.resume(); }, { passive: true, capture: true }));

  /* ---------- petir digambar ---------- */
  function boltPaths(W, H) {
    const x0 = W * R(0.2, 0.8), tx = clamp(x0 + R(-W * 0.12, W * 0.12), 40, W - 40), ty = H * R(0.4, 0.85), n = 16, main = [];
    for (let i = 0; i <= n; i++) { const k = i / n, j = (1 - k * 0.5) * 46; main.push([x0 + (tx - x0) * k + (i === 0 || i === n ? 0 : R(-j, j)), -20 + (ty + 20) * k]); }
    const d = a => "M" + a.map(p => p[0].toFixed(0) + " " + p[1].toFixed(0)).join("L"), out = [d(main)];
    for (let b = 0; b < 4; b++) {
      const s = main[(R(3, n - 3)) | 0], dir = Math.random() < 0.5 ? -1 : 1, br = [s]; let x = s[0], y = s[1];
      for (let i = 0; i < 6; i++) { x += dir * R(14, 42); y += R(18, 44); br.push([x, y]); }
      out.push(d(br));
    }
    return { paths: out, tx: tx, ty: ty };
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---------- alur ---------- */
  let busy = false, stormT = 0, cdUntil = 0, timers = [], fx = null, card = null, cardKill = null;
  const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };

  function strike() {
    if (busy) return "Sedang berlangsung."; busy = true; SND.warm();
    const W = window.innerWidth, H = window.innerHeight;
    fx = document.createElement("div"); fx.className = "pt-fx"; fx.setAttribute("aria-hidden", "true");
    const b = boltPaths(W, H);
    fx.innerHTML = '<div class="pt-dim"></div><svg class="pt-bolt" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none"><g class="glow">' + b.paths.map(p => '<path pathLength="1" d="' + p + '"/>').join("") +
      '</g><g class="core">' + b.paths.map(p => '<path pathLength="1" d="' + p + '"/>').join("") + '</g></svg><div class="pt-scorch" style="left:' + b.tx + "px;top:" + b.ty + 'px"></div><div class="pt-white"></div>';
    document.body.appendChild(fx);
    const dim = fx.querySelector(".pt-dim"), white = fx.querySelector(".pt-white");
    // 1) peringatan: langit berkedip + dengung statis
    SND.warn(); if (!reduce) dim.classList.add("warn");
    // 2) menyambar
    later(() => {
      fx.classList.add("hit"); SND.crack(); white.classList.add("on");
      // 3) putih sementara + denging
      SND.ring();
      later(() => { white.classList.remove("on"); white.classList.add("fade"); fx.classList.add("after"); }, (reduce ? 0.5 : CFG.whiteHold) * 1000);
      // 4) ucapan selamat
      later(() => congrats(), (reduce ? 0.5 : CFG.whiteHold) * 1000 + (reduce ? 700 : 1700));
    }, reduce ? 300 : 1000);
    return "Petir menyambar!";
  }
  function finish() {
    if (fx) { const f = fx; fx = null; f.classList.add("end"); setTimeout(() => f.remove(), 900); }
    busy = false; stormT = 0; cdUntil = performance.now() + CFG.cooldown * 1000;
  }
  function congrats() {
    if (!CFG.congrats) { finish(); return; }
    const c = document.createElement("div"); c.className = "fl-congrats pt-cg"; c.setAttribute("role", "dialog"); c.setAttribute("aria-label", "Easter egg Petir ditemukan");
    const title = "Selamat!".split("").map((ch, i) => '<i style="--i:' + i + '">' + ch + "</i>").join("");
    c.innerHTML = '<div class="fl-cg-card"><div class="fl-cg-in"><div class="pt-cg-ico"><svg viewBox="0 0 120 150" aria-hidden="true"><path d="M70 4L18 82h32l-12 64 64-84H64z" fill="#ffe46a" stroke="#fff6c2" stroke-width="3" stroke-linejoin="round"/></svg></div>' +
      '<p class="fl-cg-kick">EASTER EGG DITEMUKAN</p><h2 class="fl-cg-title"><span class="fl-cg-ltr">' + title + '</span><span class="fl-cg-sub1">Kamu terkena <b>Petir</b></span></h2>' +
      '<p class="fl-cg-text">Hujan petir menyambarmu langsung sampai layar putih sesaat. Untung cuma di layar!</p><p class="fl-cg-hint">Ketuk untuk lanjut &middot; Esc</p></div></div>';
    for (let i = 0; i < 14; i++) { const s = document.createElement("i"); s.className = "pt-spark"; s.style.cssText = "--x:" + R(4, 96).toFixed(1) + "%;--y:" + R(6, 94).toFixed(1) + "%;--d:" + R(0, 2.4).toFixed(2) + "s"; c.appendChild(s); }
    document.body.appendChild(c); card = c; requestAnimationFrame(() => c.classList.add("in")); SND.jingle();
    let closed = false, to = 0;
    const key = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); close(); } };
    function close() { if (closed) return; closed = true; clearTimeout(to); document.removeEventListener("keydown", key); cardKill = null; c.classList.remove("in"); c.classList.add("out"); setTimeout(() => c.remove(), 700); card = null; finish(); }
    cardKill = () => { closed = true; clearTimeout(to); document.removeEventListener("keydown", key); c.remove(); card = null; cardKill = null; };
    c.addEventListener("pointerdown", close); document.addEventListener("keydown", key); to = setTimeout(close, 9000);
  }
  function reset() {
    timers.forEach(clearTimeout); timers = []; if (cardKill) cardKill(); if (fx) { fx.remove(); fx = null; } busy = false; stormT = 0; cdUntil = 0; return "Direset.";
  }

  /* ---------- kesempatan acak saat Hujan Petir ---------- */
  setInterval(() => {
    if (busy || document.hidden) return;
    if (!stormy()) { stormT = 0; return; }
    stormT += 0.5;
    if (stormT >= CFG.minStorm && performance.now() >= cdUntil && Math.random() < CFG.chance * 0.5) strike();
  }, 500);

  window.petir = { CFG: CFG, strike: strike, reset: reset };
})();

/* =========================================================
   PEMBARUAN 52: TOMBOL BLEACH & JJK LEBIH KEREN (modul btnFx)
   Bentuk jajar genjang bergaya manga, bingkai bercahaya, kilau menyapu, lingkaran energi berputar di bola,
   percikan roh/kutukan naik dari tombol, miring 3D + sorotan cahaya mengikuti kursor, ledakan percikan saat diketuk.
   Gaya ada di style.css (blok PEMBARUAN 52). Modul ini hanya menambah elemen hias + mengatur variabel kursor.
   ========================================================= */
(function btnFx() {
  "use strict";
  const rnd = (a, b) => a + Math.random() * (b - a);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function burst(btn) {
    if (reduce) return;
    for (let i = 0; i < 12; i++) {
      const b = document.createElement("i"), a = rnd(0, Math.PI * 2), d = rnd(26, 58);
      b.className = "fx-b"; b.style.setProperty("--bx", (Math.cos(a) * d * 1.5).toFixed(1) + "px"); b.style.setProperty("--by", (Math.sin(a) * d * 0.8).toFixed(1) + "px");
      b.style.setProperty("--bs", rnd(3, 6).toFixed(1) + "px"); btn.appendChild(b); setTimeout(() => b.remove(), 760);
    }
  }
  function enhance(btn) {
    if (btn.dataset.fx) return; btn.dataset.fx = "1";
    if (!reduce) for (let i = 0; i < 7; i++) {
      const p = document.createElement("i"); p.className = "fx-p";
      p.style.setProperty("--x", rnd(14, 86).toFixed(0) + "%"); p.style.setProperty("--dx", rnd(-16, 16).toFixed(0) + "px");
      p.style.setProperty("--dl", rnd(0, 3).toFixed(2) + "s"); p.style.setProperty("--du", rnd(1.8, 3.2).toFixed(2) + "s"); p.style.setProperty("--s", rnd(2, 4).toFixed(1) + "px");
      btn.appendChild(p);
    }
    btn.addEventListener("pointermove", e => {
      if (e.pointerType === "touch") return;
      const r = btn.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      btn.style.setProperty("--mx", (x * 100).toFixed(0) + "%"); btn.style.setProperty("--my", (y * 100).toFixed(0) + "%");
      if (!reduce) { btn.style.setProperty("--ry", ((x - 0.5) * 16).toFixed(1) + "deg"); btn.style.setProperty("--rx", (-(y - 0.5) * 12).toFixed(1) + "deg"); }
    });
    btn.addEventListener("pointerleave", () => { btn.style.setProperty("--rx", "0deg"); btn.style.setProperty("--ry", "0deg"); });
    btn.addEventListener("click", () => burst(btn));
  }
  function scan() { document.querySelectorAll(".bleach-toggle, .jjk-toggle").forEach(enhance); }
  scan();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan);
  window.addEventListener("portfolio:ready", scan);
  if (window.MutationObserver) { let q = 0; new MutationObserver(() => { if (q) return; q = setTimeout(() => { q = 0; scan(); }, 120); }).observe(document.body || document.documentElement, { childList: true, subtree: true }); }
})();


/* =========================================================
   PEMBARUAN 53: EASTER EGG ANGIN PUTING BELIUNG (modul putingBeliung)
   Saat mode cuaca ANGIN KENCANG menyala TERUS selama 2 menit, langit menggelap, awan hitam menurun jadi PUTING BELIUNG,
   menyedot semua yang ada di layar (teks, kartu, gambar, tombol) berputar-putar, lalu DUAR: semuanya dihempaskan ke segala arah.
   Langit cerah lagi, semuanya jatuh kembali ke tempatnya, lalu muncul ucapan selamat.
   Tidak mengubah modul cuaca: hanya membaca html[data-weather] == "wind". Semua suara Web Audio (ikut mati kalau tapSound.on = false).
   Hormati prefers-reduced-motion (versi singkat tanpa putaran: elemen menghilang sebentar lalu muncul lagi).
   Esc = hentikan adegan (semua langsung dikembalikan).
   Console: puting.start() uji langsung | puting.reset() | puting.CFG (after, repeat, maxItems, sound, volume, congrats)
   Siklus: 2 menit angin kencang -> puting beliung -> 2 menit angin kencang lagi -> puting beliung lagi, dst (hitungan 2 menit mulai lagi setelah adegan selesai).
   Uji cepat: puting.CFG.after = 5; lalu nyalakan Angin Kencang.
========================================================= */
(function putingBeliung() {
  "use strict";
  const root = document.documentElement;
  const reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = { after: 120, repeat: true, maxItems: 160, sound: true, volume: 1, congrats: true };   // after = detik angin kencang menyala terus; repeat true = berulang tiap 2 menit angin kencang, false = sekali per muat halaman
  const TL = { desc0: 1.6, desc1: 4.4, pull: 4.0, blast: 12.4, lift0: 12.6, lift1: 14.2, ret: 14.6 };   // garis waktu adegan (detik)
  const R = (a, b) => a + Math.random() * (b - a), TAU = Math.PI * 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = p => { p = clamp(p, 0, 1); return p * p * (3 - 2 * p); };
  const bounce = p => { const n = 7.5625, d = 2.75; if (p < 1 / d) return n * p * p; if (p < 2 / d) return n * (p -= 1.5 / d) * p + 0.75; if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + 0.9375; return n * (p -= 2.625 / d) * p + 0.984375; };
  const windy = () => root.dataset.weather === "wind";
  const loud = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  const HAS_IND = !!(window.CSS && CSS.supports && CSS.supports("translate", "1px 1px") && CSS.supports("rotate", "1deg") && CSS.supports("scale", "1"));

  /* ---------- suara ---------- */
  let ac = null, bus = null, nbuf = null;
  function init() {
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC(); const m = ac.createGain(); m.gain.value = 0.9 * CFG.volume;
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 5; m.connect(comp); comp.connect(ac.destination); bus = m;
    nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate); const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  const ready = () => loud() && init();
  function tone(type, f0, f1, t, dur, vol, atk) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(type, f0, f1, t, dur, vol, atk, q) {
    const s = ac.createBufferSource(); s.buffer = nbuf; const f = ac.createBiquadFilter(), g = ac.createGain(); f.type = type; f.Q.value = q || 0.8;
    f.frequency.setValueAtTime(f0, t); if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + (atk || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(f); f.connect(g); g.connect(bus); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
  }
  const SND = {
    warm() { if (loud()) init(); },
    bed() {   // gemuruh + siulan angin yang terus berjalan; intensitas diatur lewat .set(0..1)
      if (!ready()) return null;
      const out = ac.createGain(); out.gain.value = 0.0001; out.connect(bus);
      const srcs = [], mk = (type, f, q) => { const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true; const fl = ac.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q || 0.7; s.connect(fl); s.start(0, Math.random()); srcs.push(s); return fl; };
      const low = mk("lowpass", 150), mid = mk("bandpass", 600, 5), hi = mk("highpass", 3200);
      const gl = ac.createGain(), gm = ac.createGain(), gh = ac.createGain(); gl.gain.value = 0.9; gm.gain.value = 0; gh.gain.value = 0;
      low.connect(gl); mid.connect(gm); hi.connect(gh); gl.connect(out); gm.connect(out); gh.connect(out);
      const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 0.33; lg.gain.value = 240; lfo.connect(lg); lg.connect(mid.frequency); lfo.start();
      const sub = ac.createOscillator(), sg = ac.createGain(); sub.type = "sine"; sub.frequency.value = 38; sg.gain.value = 0; sub.connect(sg); sg.connect(out); sub.start();
      return {
        set(k, secs) {
          const n = ac.currentTime, s = n + (secs || 0.3);
          out.gain.cancelScheduledValues(n); out.gain.linearRampToValueAtTime(0.05 + 0.95 * k, s);
          mid.frequency.linearRampToValueAtTime(420 + 1100 * k, s); gm.gain.linearRampToValueAtTime(0.3 * k, s);
          gh.gain.linearRampToValueAtTime(0.14 * k, s); sg.gain.linearRampToValueAtTime(0.55 * k, s);
        },
        stop(secs) {
          const n = ac.currentTime, e = n + (secs || 1.2);
          out.gain.cancelScheduledValues(n); out.gain.setValueAtTime(Math.max(0.0001, out.gain.value), n); out.gain.linearRampToValueAtTime(0.0001, e);
          srcs.forEach(s => { try { s.stop(e + 0.1); } catch (x) {} }); try { lfo.stop(e + 0.1); sub.stop(e + 0.1); } catch (x) {}
        }
      };
    },
    thud() {   // puting beliung menyentuh tanah
      if (!ready()) return; const t = ac.currentTime + 0.01;
      tone("sine", 64, 28, t, 1.2, 0.6, 0.01); noise("lowpass", 700, 60, t, 1.1, 0.5, 0.02);
    },
    boom() {   // DUAR: semuanya dihempaskan
      if (!ready()) return; const t = ac.currentTime + 0.005;
      noise("lowpass", 1500, 50, t, 2.4, 1.0, 0.005); tone("sine", 92, 26, t, 2.0, 0.9, 0.005);
      noise("highpass", 2600, 500, t, 0.5, 0.55, 0.002); noise("bandpass", 900, 200, t + 0.05, 1.6, 0.5, 0.05, 0.6);
    },
    land() {   // elemen jatuh kembali
      if (!ready()) return; const t = ac.currentTime + 0.01;
      for (let i = 0; i < 7; i++) { noise("lowpass", R(500, 900), 80, t + i * 0.12 + R(0, 0.06), 0.12, 0.16, 0.002); tone("sine", R(110, 190), 50, t + i * 0.12, 0.14, 0.1, 0.002); }
    },
    chime() {   // kartu selamat: dentang pentatonik terang
      if (!ready()) return; const t = ac.currentTime + 0.05;
      [523.25, 587.33, 783.99, 880, 1174.66].forEach((f, i) => { tone("triangle", f, f, t + i * 0.09, 1.3, 0.1, 0.004); tone("sine", f * 2, f * 2, t + i * 0.09, 0.5, 0.03, 0.004); });
    }
  };
  [["pointerdown"], ["keydown"]].forEach(([ev]) => window.addEventListener(ev, () => { if (windy()) SND.warm(); if (ac && ac.state === "suspended" && !document.hidden) ac.resume(); }, { passive: true, capture: true }));

  /* ---------- mengumpulkan elemen yang akan disedot ---------- */
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "LINK", "META", "TEMPLATE", "HEAD", "BR", "WBR", "TITLE", "SOURCE", "TRACK"]);
  const MEDIA = new Set(["IMG", "PICTURE", "VIDEO", "SVG", "CANVAS", "IFRAME", "INPUT", "TEXTAREA", "SELECT", "BUTTON", "AUDIO"]);
  function hasText(el) { for (let n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) return true; return false; }
  function cardLike(cs) {
    const m = /rgba?\(([^)]+)\)/.exec(cs.backgroundColor || "");
    if (m) { const p = m[1].split(","); const a = p.length > 3 ? parseFloat(p[3]) : 1; if (a > 0.05) return true; }
    if (cs.backgroundImage && cs.backgroundImage !== "none") return true;
    if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none") return true;
    return !!(cs.boxShadow && cs.boxShadow !== "none");
  }
  function collect() {
    const vw = window.innerWidth, vh = window.innerHeight, area = vw * vh, list = [];
    let seen = 0;
    function visit(el) {
      if (++seen > 6000 || el.nodeType !== 1) return;
      const tag = el.tagName.toUpperCase();
      if (SKIP.has(tag)) return;
      const cl = el.classList;
      if (cl && (cl.contains("tw-fx") || cl.contains("weather-canvas") || cl.contains("pt-fx"))) return;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      if (cs.display === "contents") return descend(el);
      const r = el.getBoundingClientRect(), w = r.width, h = r.height;
      if (w === 0 || h === 0) return descend(el);
      if (!(r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh)) return;
      const big = w >= vw * 0.85 && h >= vh * 0.85;
      if (big && MEDIA.has(tag)) return;   // kanvas / latar layar penuh tetap di tempat
      if (!big && w >= 6 && h >= 6 && parseFloat(cs.opacity) > 0.05) {
        let unit = MEDIA.has(tag) || hasText(el);
        if (!unit && w * h < area * 0.35 && el.childElementCount && cardLike(cs)) unit = true;
        if (unit && w * h < area * 0.6) {
          list.push({ el, cx: r.left + w / 2, cy: r.top + h / 2, w, h, inl: cs.display === "inline", base: cs.transform && cs.transform !== "none" ? cs.transform : "" });
          return;
        }
      }
      descend(el);
    }
    function descend(el) { for (let c = el.firstElementChild; c; c = c.nextElementSibling) visit(c); }
    descend(document.body);
    let out = list;
    if (out.length > CFG.maxItems) {   // terlalu banyak: simpan yang besar dulu, sisanya acak
      out = out.slice().sort((a, b) => b.w * b.h - a.w * a.h);
      const keep = out.slice(0, 40), rest = out.slice(40).sort(() => Math.random() - 0.5).slice(0, Math.max(0, CFG.maxItems - 40));
      out = keep.concat(rest);
    }
    return out;
  }

  /* ---------- keadaan adegan ---------- */
  let S = null, done = false, windT = 0, timers = [], card = null, cardKill = null;
  const later = (fn, ms) => { timers.push(setTimeout(fn, ms)); };
  function geometry() {
    const W = window.innerWidth, H = window.innerHeight;
    S.W = W; S.H = H; S.G = H * 0.97; S.Ytop = H * 0.14;
    S.rTop = clamp(Math.min(W * 0.26, H * 0.36), 70, 300); S.rBot = S.rTop * 0.09;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); S.dpr = dpr;
    S.cv.width = Math.round(W * dpr); S.cv.height = Math.round(H * dpr);
  }
  const rAt = h => S.rBot + (S.rTop - S.rBot) * Math.pow(h, 1.85);
  const txc = t => S.W * 0.5 + S.W * 0.2 * Math.sin(t * 0.36 + S.ph0);
  const colX = (h, t) => txc(t) + Math.sin(t * 1.5 + h * 5) * (8 + 30 * h) + h * S.W * 0.04 * Math.sin(t * 0.3);
  const colY = h => S.G - h * (S.G - S.Ytop);

  function orbit(it, t) {
    const tt = Math.max(0, t - TL.pull);
    const h = clamp(it.h0 + 0.16 * Math.sin(t * 0.8 + it.ph) + tt * 0.012 * it.climb, 0.04, 0.97);
    const ang = it.a0 + it.sp * tt, rr = rAt(h) * it.rf + 6, s = Math.sin(ang);
    return { x: colX(h, t) + Math.cos(ang) * rr, y: colY(h) + s * rr * 0.17, sc: it.sf * (0.9 + 0.18 * s), rot: it.rot0 + it.rs * tt, ang: ang, rr: rr };
  }

  function setXf(it, x, y, rot, sc) {
    const st = it.el.style;
    if (HAS_IND) { st.translate = x.toFixed(1) + "px " + y.toFixed(1) + "px"; st.rotate = rot.toFixed(1) + "deg"; st.scale = sc.toFixed(3); }
    else st.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + rot.toFixed(1) + "deg) scale(" + sc.toFixed(3) + ") " + it.base;
  }
  function showIt(it, v) { if (it.vis === v) return; it.vis = v; if (v) it.el.removeAttribute("data-tw-hide"); else it.el.setAttribute("data-tw-hide", ""); }

  function place(it, t) {
    const shx = S.shx * it.sk, shy = S.shy * it.sk;
    let x = 0, y = 0, rot = 0, sc = 1, vis = true;
    if (t >= TL.ret + it.rd) {   // jatuh kembali ke tempat asal
      const p = clamp((t - TL.ret - it.rd) / 0.9, 0, 1), b = bounce(p);
      y = -(it.cy + it.h + 140) * (1 - b); rot = it.rr * (1 - b); sc = 0.8 + 0.2 * b;
    } else if (t >= TL.blast) {   // dihempaskan
      const tb = t - TL.blast, o = it.o0 || (it.o0 = orbit(it, TL.blast));
      x = o.x - it.cx + it.vx * tb; y = o.y - it.cy + it.vy * tb + 480 * tb * tb;
      rot = o.rot + it.rs * 2.2 * tb; sc = o.sc * (1 - 0.5 * Math.min(tb / 1.5, 1));
      if (tb > 1.7) vis = false;
      if (t >= TL.ret) vis = false;
    } else if (t >= TL.pull + it.delay) {   // disedot & berputar
      const p = clamp((t - TL.pull - it.delay) / 1.8, 0, 1), e = smooth(p), o = orbit(it, t);
      const dx = o.x - it.cx, dy = o.y - it.cy, cv = Math.sin(p * Math.PI) * 0.35;
      x = dx * e - dy * cv + shx; y = dy * e + dx * cv + shy; rot = o.rot * e; sc = 1 + (o.sc - 1) * e;
    } else {   // belum tersedot: bergetar + miring tertiup
      const k = smooth((t - 1.2) / 3.5), g = Math.sin(t * 9 + it.ph);
      x = shx * 0.5 + g * 1.4 * k * it.sk; y = shy * 0.5; rot = g * 1.1 * k;
    }
    if (t >= TL.ret + it.rd) vis = (t - TL.ret - it.rd) > 0;
    setXf(it, x, y, rot, sc); showIt(it, vis);
  }

  /* ---------- gambar (kanvas) ---------- */
  const DEBRIS = ["#3a2f24", "#5b4a36", "#6f7f3a", "#8c9b4a", "#d8d2c4", "#2b2b2b", "#7a5a3a", "#b9b09a"];
  function flashAt(t) {
    let f = 0;
    for (const ft of S.flashes) { const d = t - ft; if (d > 0 && d < 0.5) f = Math.max(f, d < 0.06 ? 1 : d < 0.12 ? 0.15 : d < 0.2 ? 0.8 : Math.max(0, 0.8 - (d - 0.2) * 2.7)); }
    return f;
  }
  function drawCloud(c, t, a, f) {
    if (a <= 0) return;
    const g = c.createLinearGradient(0, 0, 0, S.Ytop * 1.9); g.addColorStop(0, "rgba(10,14,24," + (0.92 * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(10,14,24,0)");
    c.fillStyle = g; c.fillRect(0, 0, S.W, S.Ytop * 1.9);
    for (let i = 0; i < 12; i++) {
      const x = (i / 11) * S.W * 1.15 - S.W * 0.08 + Math.sin(t * 0.25 + i * 1.3) * 26, y = S.Ytop * (0.55 + 0.25 * Math.sin(i * 2.1)) + Math.sin(t * 0.4 + i) * 8;
      const r = S.W * (0.13 + 0.05 * Math.sin(i * 1.7 + 1)) + 40, L = Math.round(30 + f * 130);
      const rg = c.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, "rgba(" + L + "," + (L + 4) + "," + (L + 14) + "," + (0.8 * a).toFixed(3) + ")"); rg.addColorStop(1, "rgba(" + L + "," + (L + 4) + "," + (L + 14) + ",0)");
      c.fillStyle = rg; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    }
    // awan dinding berputar di pangkal corong
    const cx = colX(1, t), ry = S.rTop * 0.2;
    c.lineWidth = 2.4; c.lineCap = "round";
    for (let j = 0; j < 5; j++) {
      c.beginPath(); c.strokeStyle = "rgba(200,210,224," + (0.1 * a).toFixed(3) + ")";
      c.ellipse(cx, S.Ytop + (j - 2) * 6, S.rTop * (1.1 + j * 0.12), ry * (1 + j * 0.1), 0, t * 0.8 + j, t * 0.8 + j + 4.2); c.stroke();
    }
  }
  function drawFunnel(c, t, A, hTip) {
    if (A <= 0.01) return;
    const N = 44, pts = [];
    for (let k = 0; k <= N; k++) { const h = hTip + (1 - hTip) * k / N; pts.push({ h: h, x: colX(h, t), y: colY(h), r: rAt(h) }); }
    [[1.28, 0.16], [1, 0.5]].forEach(([m, al]) => {
      const g = c.createLinearGradient(0, colY(1), 0, colY(0));
      g.addColorStop(0, "rgba(58,66,82," + (al * A).toFixed(3) + ")"); g.addColorStop(0.55, "rgba(104,112,126," + (al * A).toFixed(3) + ")"); g.addColorStop(1, "rgba(150,138,120," + (al * A).toFixed(3) + ")");
      c.fillStyle = g; c.beginPath();
      pts.forEach((p, i) => { if (i) c.lineTo(p.x - p.r * m, p.y); else c.moveTo(p.x - p.r * m, p.y); });
      for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i].x + pts[i].r * m, pts[i].y);
      c.closePath(); c.fill();
      const tp = pts[pts.length - 1];   // tutup atas corong supaya menyatu dengan awan
      c.beginPath(); c.ellipse(tp.x, tp.y, tp.r * m, tp.r * m * 0.17, 0, 0, TAU); c.fill();
    });
    c.lineWidth = 1.2; c.strokeStyle = "rgba(20,24,34," + (0.14 * A).toFixed(3) + ")";
    for (let k = 2; k <= N; k += 4) { const p = pts[k]; c.beginPath(); c.ellipse(p.x, p.y, p.r, p.r * 0.17, 0, 0, TAU); c.stroke(); }
    c.lineCap = "round";
    for (let j = 0; j < 18; j++) {
      const ph = j / 18 * TAU + t * 6.2;
      c.beginPath(); let pen = false;
      for (let k = 0; k <= N; k++) {
        const p = pts[k], a = ph + p.h * 7.5 + Math.sin(t * 1.3 + j) * 0.2, s = Math.sin(a);
        if (s < -0.05) { pen = false; continue; }
        const x = p.x + Math.cos(a) * p.r * 0.97, y = p.y + s * p.r * 0.17;
        if (pen) c.lineTo(x, y); else c.moveTo(x, y); pen = true;
      }
      c.strokeStyle = j % 3 ? "rgba(235,240,248," + (0.16 * A).toFixed(3) + ")" : "rgba(20,24,34," + (0.3 * A).toFixed(3) + ")"; c.lineWidth = j % 3 ? 1.6 : 2.6; c.stroke();
    }
  }
  function drawDust(c, t, a) {
    if (a <= 0.01) return;
    for (let i = 0; i < 10; i++) {
      const x = colX(0.02, t) + Math.sin(t * 2.1 + i * 1.7) * S.rBot * (2.5 + i * 0.8), y = S.G - 4 - (i % 3) * 8, r = 38 + i * 13;
      c.save(); c.translate(x, y); c.scale(1, 0.4);
      const rg = c.createRadialGradient(0, 0, 0, 0, 0, r); rg.addColorStop(0, "rgba(150,130,104," + (0.3 * a).toFixed(3) + ")"); rg.addColorStop(1, "rgba(150,130,104,0)");
      c.fillStyle = rg; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill(); c.restore();
    }
    const g = c.createLinearGradient(0, S.H * 0.84, 0, S.H); g.addColorStop(0, "rgba(120,104,84,0)"); g.addColorStop(1, "rgba(120,104,84," + (0.22 * a).toFixed(3) + ")");
    c.fillStyle = g; c.fillRect(0, S.H * 0.84, S.W, S.H * 0.16);
  }
  function drawDebris(c, t, dt, A) {
    for (const p of S.parts) {
      if (t < p.born) continue;
      if (t < TL.blast) {
        p.ang += p.sp * dt; p.h += p.rise * dt; if (p.h > 0.97) p.h = 0.02;
        const rr = rAt(p.h) * p.rf + 4, s = Math.sin(p.ang);
        p.x = colX(p.h, t) + Math.cos(p.ang) * rr; p.y = colY(p.h) + s * rr * 0.17; p.al = clamp((t - p.born) / 0.6, 0, 1) * A; p.rot += p.rs * dt;
        p.out = Math.cos(p.ang);
      } else {
        const tb = t - TL.blast;
        if (p.vx === undefined) { p.vx = (p.out * 0.9 + (-Math.sin(p.ang)) * 0.6) * R(900, 2200); p.vy = -R(100, 600); }
        p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 480 * dt * 2; p.rot += p.rs * dt * 2; p.al = Math.max(0, 1 - tb / 1.3);
      }
      if (p.al <= 0.01) continue;
      c.save(); c.globalAlpha = p.al; c.translate(p.x, p.y); c.rotate(p.rot); c.fillStyle = p.col;
      c.beginPath(); c.ellipse(0, 0, p.s * 1.6, p.s * 0.8, 0, 0, TAU); c.fill(); c.restore();
    }
  }
  function drawScene(t, dt) {
    const c = S.ctx, W = S.W, H = S.H;
    c.setTransform(S.dpr, 0, 0, S.dpr, S.shx * S.dpr, S.shy * S.dpr);
    c.clearRect(-20, -20, W + 40, H + 40);
    const dark = clamp(t / 2.4, 0, 1) * (1 - clamp((t - 13.6) / 2.4, 0, 1));
    const cloudA = clamp((t - 0.2) / 2.0, 0, 1) * (1 - clamp((t - 13.2) / 2.2, 0, 1));
    const desc = t < TL.lift0 ? smooth((t - TL.desc0) / (TL.desc1 - TL.desc0)) : 1 - smooth((t - TL.lift0) / (TL.lift1 - TL.lift0));
    const fA = (t < TL.lift0 ? 1 : 1 - clamp((t - TL.lift0) / 1.6, 0, 1)) * clamp((t - TL.desc0) / 0.8, 0, 1);
    const dustA = clamp((t - TL.desc1 + 0.3) / 1.2, 0, 1) * (1 - clamp((t - 13.4) / 2, 0, 1));
    const f = flashAt(t), fb = t >= TL.blast ? Math.max(0, 1 - (t - TL.blast) / 0.7) : 0;
    c.fillStyle = "rgba(6,10,20," + (0.42 * dark).toFixed(3) + ")"; c.fillRect(-20, -20, W + 40, H + 40);
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(4,8,16," + (0.5 * dark).toFixed(3) + ")"); g.addColorStop(0.6, "rgba(4,8,16," + (0.04 * dark).toFixed(3) + ")"); g.addColorStop(1, "rgba(70,56,38," + (0.2 * dark).toFixed(3) + ")");
    c.fillStyle = g; c.fillRect(-20, -20, W + 40, H + 40);
    drawCloud(c, t, cloudA, f);
    drawFunnel(c, t, fA, 1 - desc);
    drawDust(c, t, dustA);
    drawDebris(c, t, dt, fA);
    if (f > 0) { c.fillStyle = "rgba(215,228,255," + (f * 0.2).toFixed(3) + ")"; c.fillRect(-20, -20, W + 40, H + 40); }
    if (fb > 0) { c.fillStyle = "rgba(255,255,255," + (fb * 0.6).toFixed(3) + ")"; c.fillRect(-20, -20, W + 40, H + 40); }
  }
  const bedK = t => t < 1.6 ? 0.12 + 0.2 * t / 1.6 : t < 4.4 ? 0.32 + 0.5 * smooth((t - 1.6) / 2.8) : t < 12.4 ? 0.85 + 0.15 * smooth((t - 4.4) / 4) : t < 14.2 ? 1 - 0.85 * smooth((t - 12.4) / 1.8) : 0.15 * (1 - smooth((t - 14.2) / 2));

  /* ---------- alur ---------- */
  const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
  const noScroll = e => { if (e.cancelable) e.preventDefault(); };
  const keyLock = e => { if (e.key === "Escape") { abort(); return; } if (SCROLL_KEYS.has(e.key)) e.preventDefault(); };
  function lock(on) {
    const m = on ? "addEventListener" : "removeEventListener";
    window[m]("wheel", noScroll, { passive: false }); window[m]("touchmove", noScroll, { passive: false }); window[m]("keydown", keyLock, true);
  }
  function prep(items) {
    const marked = new Set();
    items.forEach(it => {
      const st = it.el.style;
      it.sv = { t: st.translate, r: st.rotate, s: st.scale, tf: st.transform };
      it.vis = true; it.ph = R(0, TAU); it.sk = R(0.5, 1.2);
      it.el.setAttribute("data-tw-it", ""); if (it.inl) it.el.setAttribute("data-tw-inl", "");
      for (let p = it.el.parentElement; p && p !== document.body && p !== root; p = p.parentElement) { if (marked.has(p)) break; marked.add(p); p.setAttribute("data-tw-ov", ""); }
    });
    S.marked = marked;
  }
  function restore() {
    if (!S) return;
    S.items.forEach(it => {
      const st = it.el.style;
      st.translate = it.sv.t; st.rotate = it.sv.r; st.scale = it.sv.s; st.transform = it.sv.tf;
      it.el.removeAttribute("data-tw-hide"); it.el.removeAttribute("data-tw-it"); it.el.removeAttribute("data-tw-inl");
    });
    S.marked.forEach(p => p.removeAttribute("data-tw-ov"));
  }
  function teardown() {
    if (!S) return;
    cancelAnimationFrame(S.raf); restore(); lock(false);
    if (S.bed) S.bed.stop(1.4);
    const fx = S.fx; S.fx = null; if (fx) { fx.classList.add("end"); setTimeout(() => fx.remove(), 700); }
    root.classList.remove("tw-on");
    window.removeEventListener("resize", S.onResize);
    S = null;
  }
  function abort() { timers.forEach(clearTimeout); timers = []; if (cardKill) cardKill(); teardown(); done = true; windT = 0; return "Dihentikan."; }

  function start() {
    if (S) return "Sedang berlangsung.";
    if (document.querySelector(".fl-congrats, .pt-fx")) return "Ada adegan / kartu lain yang sedang terbuka.";
    const items = collect();
    const fx = document.createElement("div"); fx.className = "tw-fx"; fx.setAttribute("aria-hidden", "true");
    const cv = document.createElement("canvas"); fx.appendChild(cv);
    S = { items: items, fx: fx, cv: cv, ctx: cv.getContext("2d"), t: 0, last: performance.now() / 1000, shx: 0, shy: 0, ph0: R(0, TAU), parts: [], flashes: [3.0, 5.9, 8.6, 10.9], touched: false, blasted: false, lastSet: -1, bed: null, raf: 0 };
    SND.warm(); geometry(); prep(items);
    S.onResize = () => { if (!S) return; geometry(); };
    window.addEventListener("resize", S.onResize);
    root.classList.add("tw-on"); document.body.appendChild(fx); lock(true);
    if (reduce) return startCalm();

    const hyp = Math.hypot(S.W, S.H);
    let maxRd = 0;
    items.forEach(it => {
      const d = Math.hypot(it.cx - S.W * 0.5, it.cy - S.G);
      it.delay = d / hyp * 2.6 + R(0, 0.5);
      it.h0 = R(0.08, 0.88); it.a0 = R(0, TAU); it.rf = R(0.35, 1.1); it.sp = R(5, 9); it.rs = (Math.random() < 0.5 ? -1 : 1) * R(200, 720);
      it.rot0 = R(0, 360); it.climb = R(0.4, 1.4); it.sf = clamp(110 / Math.max(it.w, it.h), 0.18, 0.75);
      it.rd = (it.cy / S.H) * 0.7 + R(0, 0.5); it.rr = R(-25, 25); maxRd = Math.max(maxRd, it.rd);
    });
    S.tEnd = TL.ret + maxRd + 0.9 + 0.5;
    const n = S.W < 600 ? 70 : 130;
    S.parts = Array.from({ length: n }, () => ({ h: R(0, 1), ang: R(0, TAU), rf: R(0.3, 1.15), sp: R(5, 10), s: R(2, 6), rot: R(0, TAU), rs: R(-8, 8), col: DEBRIS[(Math.random() * DEBRIS.length) | 0], rise: R(0.04, 0.12), born: R(TL.desc1 - 0.3, TL.desc1 + 3.0), al: 0 }));
    S.bed = SND.bed(); if (S.bed) S.bed.set(bedK(0), 0.5);
    S.last = performance.now() / 1000;
    S.raf = requestAnimationFrame(frame);
    return "Puting beliung datang!";
  }
  function startCalm() {   // versi prefers-reduced-motion: gelap sebentar, elemen menghilang lalu muncul lagi
    S.fx.classList.add("calm");
    S.items.forEach(it => showIt(it, false));
    later(() => { if (S) S.items.forEach(it => showIt(it, true)); }, 1400);
    later(() => { if (S) S.fx.classList.remove("calm"); }, 1500);
    later(() => { teardown(); onEnd(); }, 2300);
    return "Puting beliung (versi tenang).";
  }
  function frame(ts) {
    if (!S) return;
    const now = ts / 1000, dt = Math.min(0.05, Math.max(0, now - S.last)); S.last = now; S.t += dt;
    const t = S.t;
    const amp = t < 3.6 ? 0 : t < TL.blast ? 1.5 + 3 * smooth((t - 3.6) / 6) : t < TL.blast + 1.2 ? 10 * (1 - (t - TL.blast) / 1.2) : 0;
    S.shx = (Math.random() - 0.5) * 2 * amp; S.shy = (Math.random() - 0.5) * 2 * amp;
    if (!S.touched && t >= TL.desc1) { S.touched = true; SND.thud(); }
    if (!S.blasted && t >= TL.blast) {
      S.blasted = true; SND.boom();
      S.items.forEach(it => {   // arah & kecepatan hempasan tiap elemen
        const o = it.o0 || (it.o0 = orbit(it, TL.blast)), ox = Math.cos(o.ang), oy = Math.sin(o.ang) * 0.17, tx = -Math.sin(o.ang), ty = Math.cos(o.ang) * 0.17, sp = R(1100, 2600);
        it.vx = (ox * 0.9 + tx * 0.7) * sp; it.vy = (oy * 0.9 + ty * 0.7) * sp - R(100, 700);
      });
    }
    if (!S.landed && t >= TL.ret + 0.2) { S.landed = true; SND.land(); }
    S.items.forEach(it => place(it, t));
    drawScene(t, dt);
    if (S.bed && t - S.lastSet > 0.25) { S.lastSet = t; S.bed.set(bedK(t), 0.3); }
    if (t >= S.tEnd) { teardown(); onEnd(); return; }
    S.raf = requestAnimationFrame(frame);
  }
  document.addEventListener("visibilitychange", () => {
    if (!ac) return;
    if (document.hidden) { if (ac.state === "running") ac.suspend(); }
    else if (S || windy()) ac.resume();
  });
  function onEnd() { done = true; windT = 0; if (CFG.congrats) congrats(); }

  /* ---------- ucapan selamat ---------- */
  function congrats() {
    const c = document.createElement("div"); c.className = "fl-congrats pt-cg tw-cg"; c.setAttribute("role", "dialog"); c.setAttribute("aria-label", "Easter egg Puting Beliung ditemukan");
    const title = "Selamat!".split("").map((ch, i) => '<i style="--i:' + i + '">' + ch + "</i>").join("");
    c.innerHTML = '<div class="fl-cg-card"><div class="fl-cg-in"><div class="tw-cg-ico"><svg viewBox="0 0 120 150" aria-hidden="true"><g fill="none" stroke="#dfe8f2" stroke-width="7" stroke-linecap="round"><path d="M14 20q46 14 92 0"/><path d="M24 48q36 12 72 0"/><path d="M36 76q24 10 48 0"/><path d="M47 102q13 7 26 0"/><path d="M56 126q4 4 8 0"/></g></svg></div>' +
      '<p class="fl-cg-kick">EASTER EGG DITEMUKAN</p><h2 class="fl-cg-title"><span class="fl-cg-ltr">' + title + '</span><span class="fl-cg-sub1">Kamu terseret <b>Angin Puting Beliung</b></span></h2>' +
      '<p class="fl-cg-text">Dua menit angin kencang memanggil puting beliung yang menyedot dan menghempaskan semuanya. Tenang, semua sudah dikembalikan ke tempatnya.</p><p class="fl-cg-hint">Ketuk untuk lanjut &middot; Esc</p></div></div>';
    for (let i = 0; i < 14; i++) { const s = document.createElement("i"); s.className = "pt-spark"; s.style.cssText = "--x:" + R(4, 96).toFixed(1) + "%;--y:" + R(6, 94).toFixed(1) + "%;--d:" + R(0, 2.4).toFixed(2) + "s"; c.appendChild(s); }
    document.body.appendChild(c); card = c; requestAnimationFrame(() => c.classList.add("in")); SND.chime();
    let closed = false, to = 0;
    const key = e => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") { e.preventDefault(); close(); } };
    function close() { if (closed) return; closed = true; clearTimeout(to); document.removeEventListener("keydown", key); cardKill = null; c.classList.remove("in"); c.classList.add("out"); setTimeout(() => c.remove(), 700); card = null; }
    cardKill = () => { closed = true; clearTimeout(to); document.removeEventListener("keydown", key); c.remove(); card = null; cardKill = null; };
    c.addEventListener("pointerdown", close); document.addEventListener("keydown", key); to = setTimeout(close, 9000);
  }

  /* ---------- hitung: angin kencang menyala terus 2 menit ---------- */
  setInterval(() => {
    if (S || document.hidden) return;
    if (!windy()) { windT = 0; return; }
    if (done && !CFG.repeat) return;
    if (document.querySelector(".fl-congrats, .pt-fx")) return;   // jangan bertabrakan dengan adegan lain
    windT += 0.5;
    if (windT >= CFG.after) { windT = 0; start(); }
  }, 500);

  window.puting = { CFG: CFG, start: start, reset: abort, get waktu() { return windT; } };
})();


/* =========================================================
   PEMBARUAN 54: JURUS GOJO - KLIK 2x -> MENU BIRU / MERAH / HOLLOW PURPLE (modul gojoSkills)
   Aktif di mode GOJO (Biasa, Six Eyes, Domain). KLIK 2x (di HP: ketuk 2x) di bagian kosong layar -> menu jurus muncul di kursor.
   Saat masuk mode Gojo muncul petunjuk "klik 2x"; saat masuk DOMAIN jurus berubah jadi versi MAKSIMUM (jauh lebih dahsyat).
     BIRU (Ao)      : menghisap semua yang ada di dekat titik klik (kartu, foto, teks, tombol) lalu melepasnya lagi
     MERAH (Aka)    : gelombang kejut mendorong & menghancurkan SEMUA yang ada di layar, lalu kepingannya menyatu lagi
     HOLLOW PURPLE  : Biru + Merah menyatu -> ledakan ungu -> seluruh web menjadi HITAM (void). Ketuk / Esc untuk kembali.
   Tidak ada yang dihapus: elemen hanya digeser lewat animasi (translate / rotate / scale / opacity), jadi halaman selalu bisa kembali.
   Efek klik tunggal lama (Ao/Aka/Murasaki bergantian di Biasa, hex di Six Eyes, tinta di Domain) tetap ada; menu hanya untuk klik 2x.
   Pintasan saat menu terbuka: 1 / B = Biru | 2 / R = Merah | 3 / P = Hollow Purple | Esc = tutup. Esc di dalam void = kembali.
   Bunyi: Web Audio (ikut mati kalau tapSound.on = false). Hormati prefers-reduced-motion (adegan jauh lebih singkat).
   Console: gojoSkills.menu() | .blue(x,y) | .red(x,y) | .purple(x,y) | .exit() | .off() / .on() | .CFG
========================================================= */
(function gojoSkills() {
  "use strict";
  const root = document.documentElement;
  const CFG = {
    enabled: true, sound: true, volume: 1,
    blueRadius: 0.55,     // jari-jari hisap Biru = sisi layar terpendek x angka ini
    blueHold: 2.2,        // detik: Biru menahan semuanya sebelum dilepas
    redHold: 2.4,         // detik: kehancuran Merah bertahan sebelum kepingan menyatu lagi
    blueHoldDom: 3.4,     // sama, tapi di mode DOMAIN (jurus Maksimum)
    redHoldDom: 3.0,
    dblMs: 420,           // jeda maksimal antar dua klik / ketukan untuk membuka menu (ms)
    hint: true,           // petunjuk "klik 2x" saat masuk mode Gojo / Domain
    maxTargets: 240,      // batas jumlah elemen yang ikut terpengaruh
    hintDelay: 2.2        // detik: tulisan "ketuk untuk kembali" muncul di dalam void
  };
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const K = reduce ? 0.3 : 1;          // pengali waktu adegan
  const N = reduce ? 0.35 : 1;         // pengali jumlah partikel
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  const eo = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
  const eio = u => { u = clamp(u, 0, 1); return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
  const isGojo = () => root.dataset.jjk === "gojo" && !root.dataset.bleach;
  const dom = () => isGojo() && root.dataset.gojo === "domain";

  const SKIP = "a,button,input,textarea,select,label,iframe,[role=button],.jjk-secret,.bleach-secret,.music-player,.game-launcher,.game-hub,.theme-toggle,.idcard,.gj-scene,.jj-scene,.gj-blind,.gs-menu,.gs-void,.tw-fx";
  const TARGET = ".sk-card,.timeline-item,.folder-card,.scatter-photo,.contact-card,.gh-card,.wibu-card,.idcard,img,svg,h1,h2,h3,h4,h5,p,li,a,button,input,textarea,label,figure,blockquote,summary,.sk-head,.theme-toggle,.music-player,.jjk-secret,.game-launcher";
  const TEXTISH = "div,span,small,em,strong,b,dt,dd,time,figcaption";
  const IGN = ".gs-menu,.gs-void,.gs-cv,.gj-scene,.jj-scene,.sc-pos,.sc-trail,.fl-layer,.background-pattern,.gj-hand,.jjk-toast,.pr-toast,.shiro-toast,.tw-fx";
  const PT_N = { CH: 2.3, BOOM: 2.6, BLK0: 3.3, BLK1: 4.7 };   // garis waktu Hollow Purple (detik adegan)
  const PT_D = { CH: 3.4, BOOM: 3.8, BLK0: 4.6, BLK1: 6.4 };   // versi DOMAIN: pengisian lebih lama, ledakan lebih besar
  let PT = PT_N;
  const PAL_RED = ["#ff3b4d", "#ff9aa3", "#ffffff", "#7a0016", "#ff6b3d"];
  const PAL_PUR = ["#c79bff", "#7b3cff", "#ffffff", "#2a0a66", "#ff8ad8"];

  let shardCap = 800, lastTap = null;
  let state = "idle";            // idle | menu | busy | void | leaving
  let W = innerWidth, H = innerHeight, dpr = 1;
  let menu = null, menuAt = { x: 0, y: 0 }, cv = null, cx = null, raf = 0, last = 0;
  let acts = [], items = [], timers = [], voidEl = null, voidSince = 0, ptrDn = null, exitedAt = -1e5;
  const at = (sec, fn) => { timers.push(setTimeout(fn, sec * 1000 * K)); };

  /* ---------- bunyi ---------- */
  let ac = null, master = null, nbuf = null;
  const okSnd = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  function audio() {
    if (!okSnd()) return null;
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC();
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    master = ac.createGain(); master.gain.value = 0.6 * CFG.volume; master.connect(comp); comp.connect(ac.destination);
    nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  function tone(type, f0, f1, t, dur, vol, att) {
    const o = ac.createOscillator(), g = ac.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, t); if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(att || 0.02, dur * 0.9)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(ft, f0, f1, t, dur, vol, q, att) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1; f.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(att || 0.02, dur * 0.9)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  const sfx = {
    menu() { if (!audio()) return; const t = ac.currentTime; tone("sine", 880, 1500, t, 0.12, 0.06, 0.004); noise("highpass", 5000, 5000, t, 0.04, 0.03, 1, 0.002); },
    blue(hold) {
      if (!audio()) return; const t0 = ac.currentTime + 0.02, s = x => t0 + x * K;
      noise("bandpass", 250, 3600, s(0.1), (hold - 0.2) * K, 0.16, 1.2, 0.8 * K);       // desir terhisap
      tone("sine", 70, 260, s(0), hold * K, 0.22, 0.9 * K); tone("triangle", 220, 880, s(0.1), (hold - 0.3) * K, 0.05, 0.9 * K);
      [0, 0.3, 0.6].forEach(d => tone("sine", 1200 + d * 900, 400, s(d), 0.5, 0.03, 0.01));
      tone("sine", 140, 34, s(hold), 0.9, 0.5, 0.004); noise("highpass", 3500, 900, s(hold), 0.5, 0.2, 1, 0.004);   // dilepas
      [1318, 1760, 2093].forEach((f, i) => tone("sine", f, 0, s(hold + i * 0.05), 1.4, 0.04, 0.01));
      if (dom()) { tone("sine", 45, 150, s(0), hold * K, 0.28, 1.2 * K); tone("sine", 90, 22, s(hold), 1.6, 0.7, 0.004); noise("lowpass", 2200, 90, s(hold), 1.2, 0.5, 1, 0.004); }
    },
    red() {
      if (!audio()) return; const t = ac.currentTime + 0.01;
      tone("sine", 160, 30, t, 0.95, 0.62, 0.003); tone("sawtooth", 90, 40, t, 0.6, 0.12, 0.004);
      noise("lowpass", 2600, 100, t, 0.9, 0.55, 1, 0.003); noise("highpass", 4200, 1200, t, 0.3, 0.4, 1, 0.002);
      for (let i = 0; i < 8; i++) noise("highpass", rnd(3000, 7000), rnd(1000, 2500), t + 0.05 + i * 0.07 + rnd(0, 0.05), 0.08, 0.18, 1, 0.001);   // retakan
      if (dom()) { noise("highpass", 6000, 1500, t, 0.35, 0.6, 1, 0.001); tone("sine", 70, 18, t + 0.02, 1.6, 0.85, 0.004); [0.05, 0.16, 0.3].forEach(d => { noise("bandpass", 3000, 600, t + d, 0.14, 0.3, 2, 0.001); tone("square", 220, 60, t + d, 0.15, 0.05, 0.003); }); }   // Black Flash
    },
    redBack() {
      if (!audio()) return; const t = ac.currentTime + 0.01;
      noise("bandpass", 300, 2600, t, 0.9 * K + 0.2, 0.14, 1.2, 0.5); tone("triangle", 220, 660, t, 0.9 * K + 0.2, 0.06, 0.5);
      [659, 988, 1319].forEach((f, i) => tone("sine", f, 0, t + 0.7 * K + i * 0.06, 1.2, 0.04, 0.01));
    },
    purple() {
      if (!audio()) return; const t0 = ac.currentTime + 0.02, s = x => t0 + x * K;
      tone("sine", 70, 230, s(0), PT.CH * K, 0.14, 1.9 * K); tone("sawtooth", 52, 120, s(0), PT.CH * K, 0.06, 1.9 * K);   // menyatu
      noise("bandpass", 200, 3600, s(0), PT.CH * K, 0.13, 1.3, 1.8 * K);
      tone("sine", 440, 880, s(0.1), 2.1 * K, 0.04, 1.5 * K); tone("sine", 330, 660, s(0.1), 2.1 * K, 0.04, 1.5 * K);
      tone("sine", 100, 22, s(PT.BOOM), 2.4, 0.9, 0.004);                                                                 // DUAR
      noise("highpass", 5000, 700, s(PT.BOOM), 1.5, 0.45, 1, 0.004); noise("lowpass", 3000, 80, s(PT.BOOM), 1.4, 0.6, 1, 0.004);
      [196, 294, 392, 587].forEach((f, i) => tone("triangle", f, 0, s(PT.BOOM + i * 0.05), 2.6, 0.06, 0.02));
      tone("sine", 42, 36, s(PT.BLK0), 2.8 * K + 1, 0.1, 0.6);                                                            // dengung void
      if (dom()) { for (let i = 0; i < 10; i++) tone("sine", rnd(1500, 4200), 0, s(0.4 + i * 0.28), 0.4, 0.025, 0.004); tone("sine", 60, 16, s(PT.BOOM), 3.2, 0.7, 0.004); noise("bandpass", 400, 4800, s(PT.BOOM), 1.0, 0.35, 0.8, 0.02); }
    },
    back() {
      if (!audio()) return; const t = ac.currentTime + 0.01;
      noise("bandpass", 2400, 200, t, 1, 0.2, 1.2, 0.2); tone("sine", 60, 200, t, 0.9, 0.2, 0.5);
      [523, 659, 784, 1047].forEach((f, i) => tone("sine", f, 0, t + 0.5 + i * 0.09, 1.6, 0.05, 0.01));
    }
  };

  /* ---------- kanvas efek (di atas konten) ---------- */
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight;
    if (!cv) return; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function ensureCv() {
    if (cv) return;
    cv = document.createElement("canvas"); cv.className = "gs-cv"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv); cx = cv.getContext("2d"); size();
  }
  function kick() { if (raf) return; ensureCv(); cv.style.display = "block"; last = performance.now(); raf = requestAnimationFrame(frame); }
  function frame(ts) {
    raf = 0;
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016) / K; last = ts;
    cx.clearRect(0, 0, W, H);
    const cur = acts; acts = [];                       // efek baru yang muncul saat menggambar masuk ke daftar berikutnya
    for (const a of cur) { a.t += dt; if (!a.draw(cx, a, dt)) acts.push(a); }
    if (acts.length) { if (!raf) raf = requestAnimationFrame(frame); }
    else { cx.clearRect(0, 0, W, H); cv.style.display = "none"; }
  }
  function glow(c, x, y, r, rgb, a) {
    r = Math.max(0.5, r); const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(255,255,255," + a.toFixed(3) + ")"); g.addColorStop(0.2, "rgba(" + rgb + "," + (a * 0.9).toFixed(3) + ")");
    g.addColorStop(0.55, "rgba(" + rgb + "," + (a * 0.25).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + rgb + ",0)");
    c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }

  /* ---------- kepingan (serpihan elemen yang hancur) ---------- */
  const shards = []; let shardAct = null;
  function addShard(x, y, vx, vy, s, col, life) {
    if (shards.length > shardCap) return;
    const a0 = rnd(0, TAU), pt = k => { const a = a0 + k + rnd(-0.2, 0.2), r = s * rnd(0.5, 1.15); return [Math.cos(a) * r, Math.sin(a) * r]; };
    shards.push({ x, y, vx, vy, r: rnd(0, TAU), vr: rnd(-10, 10), col, life, t: 0, p: [pt(0), pt(2.2), pt(4.3)] });
    if (!shardAct) { shardAct = { t: 0, draw: drawShards }; acts.push(shardAct); kick(); }
  }
  function drawShards(c, a, dt) {
    for (let i = shards.length - 1; i >= 0; i--) {
      const s = shards[i]; s.t += dt;
      if (s.t >= s.life) { shards.splice(i, 1); continue; }
      s.vy += 760 * dt; s.vx *= 0.992; s.vy *= 0.996; s.x += s.vx * dt; s.y += s.vy * dt; s.r += s.vr * dt;
      c.save(); c.globalAlpha = Math.min(1, (1 - s.t / s.life) * 1.6); c.translate(s.x, s.y); c.rotate(s.r);
      c.fillStyle = s.col; c.beginPath(); c.moveTo(s.p[0][0], s.p[0][1]); c.lineTo(s.p[1][0], s.p[1][1]); c.lineTo(s.p[2][0], s.p[2][1]); c.closePath(); c.fill(); c.restore();
    }
    if (!shards.length) { shardAct = null; return true; }
    return false;
  }
  function burstShards(o, pal, speed, n) {
    n = Math.max(1, Math.round(n * N));
    for (let i = 0; i < n; i++) {
      const a = Math.atan2(o.uy, o.ux) + rnd(-0.9, 0.9), v = rnd(0.4, 1) * speed;
      addShard(o.x + rnd(-o.w / 2, o.w / 2), o.y + rnd(-o.h / 2, o.h / 2), Math.cos(a) * v, Math.sin(a) * v - rnd(0, 200), rnd(5, 16), pal[(Math.random() * pal.length) | 0], rnd(0.9, 1.7));
    }
  }

  /* ---------- elemen halaman: dikumpulkan lalu digeser lewat Web Animations (tidak mengubah isi halaman) ---------- */
  function ownText(el) { for (const n of el.childNodes) if (n.nodeType === 3 && n.nodeValue.trim().length > 1) return true; return false; }
  function collect(x, y, radius) {
    const set = new Set(document.querySelectorAll(TARGET));
    document.querySelectorAll(TEXTISH).forEach(el => { if (ownText(el)) set.add(el); });
    const out = [], els = new Set(), vw = innerWidth, vh = innerHeight;
    set.forEach(el => {
      if (el.closest(IGN)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 6 || r.height < 6 || r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return;
      if (r.width > vw * 0.9 && r.height > vh * 0.55) return;          // jangan sentuh wadah raksasa
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity < 0.05) return;
      const ex = r.left + r.width / 2, ey = r.top + r.height / 2, d = Math.hypot(ex - x, ey - y);
      if (d > radius) return;
      const an = rnd(0, TAU);
      out.push({ el, x: ex, y: ey, w: r.width, h: r.height, d, ux: d < 1 ? Math.cos(an) : (ex - x) / d, uy: d < 1 ? Math.sin(an) : (ey - y) / d });
      els.add(el);
    });
    const keep = out.filter(o => { for (let p = o.el.parentElement; p; p = p.parentElement) if (els.has(p)) return false; return true; });   // gerak tidak bertumpuk
    keep.sort((a, b) => a.d - b.d);
    return keep.slice(0, CFG.maxTargets);
  }
  const ID = { x: 0, y: 0, r: 0, s: 1 };
  const pose = (p, off) => {
    const o = { translate: p.x.toFixed(1) + "px " + p.y.toFixed(1) + "px", rotate: p.r.toFixed(1) + "deg", scale: p.sy != null ? (+p.s.toFixed(3)) + " " + (+p.sy.toFixed(3)) : String(+p.s.toFixed(3)) };
    if (p.o != null) o.opacity = p.o; if (off != null) o.offset = off; return o;
  };
  function track(o, a) { (o.anims || (o.anims = [])).push(a); if (!o.reg) { o.reg = 1; items.push(o); } return a; }
  function cancelAll(o) { if (o.anims) { o.anims.forEach(a => { try { a.cancel(); } catch (e) { /* abaikan */ } }); o.anims = []; } }
  function fly(o, frames, dur, delay, ease) {
    if (!o.el.animate) return;
    cancelAll(o);
    const kf = [pose(ID, 0)].concat(frames.map((f, i) => pose(f, f.off != null ? f.off : (i === frames.length - 1 ? 1 : (i + 1) / frames.length))));
    try {
      track(o, o.el.animate(kf, { duration: dur * 1000 * K, delay: delay * 1000 * K, easing: ease || "ease", fill: "both" }));
      o.pose = frames[frames.length - 1];
    } catch (e) { /* abaikan */ }
  }
  function shiver(o, amp) {
    if (!o.el.animate) return;
    try {
      track(o, o.el.animate([{ translate: "0px 0px", rotate: "0deg" }, { translate: rnd(-amp, amp).toFixed(1) + "px " + rnd(-amp, amp).toFixed(1) + "px", rotate: rnd(-0.7, 0.7).toFixed(2) + "deg" }],
        { duration: rnd(55, 100), iterations: Infinity, direction: "alternate", easing: "linear" }));
    } catch (e) { /* abaikan */ }
  }
  function settle(o, dur, delay, ease) {           // kembalikan ke tempat semula (animasi lama dibuang setelah selesai)
    if (!o.el.animate || !o.anims || !o.anims.length) return;
    const old = o.anims.slice();
    try {
      const b = o.el.animate([pose(o.pose || ID), pose(ID)], { duration: dur * 1000 * K, delay: delay * 1000 * K, easing: ease || "cubic-bezier(.2,1.25,.35,1)", fill: "both" });
      o.anims.push(b);
      b.onfinish = () => { old.concat([b]).forEach(a => { try { a.cancel(); } catch (e) { /* abaikan */ } }); o.anims = []; o.pose = null; o.reg = 0; };
    } catch (e) { /* abaikan */ }
  }

  /* ---------- BIRU (Ao): menghisap  (Domain = MAKSIMUM: seluruh layar + cakram akresi) ---------- */
  function blueAct(x, y, R, hold, pw) {
    const parts = Array.from({ length: Math.round(150 * N * (pw ? 2.2 : 1)) }, () => ({ a: rnd(0, TAU), d: rnd(0.2, 1) * R }));
    return {
      t: 0, draw(c, a, dt) {
        const t = a.t, grow = eo(t / 0.5), out = clamp((t - hold) / 0.55, 0, 1), eaten = clamp((t - 0.2) / Math.max(0.5, hold - 0.6), 0, 1);
        const rr = ((pw ? 34 : 20) + (pw ? 44 : 24) * eaten) * grow * (1 - out * out), al = grow * (1 - out);
        c.save(); c.lineCap = "round";
        if (pw) { c.fillStyle = "rgba(0,2,14," + (0.42 * al).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }   // gravitasi menggelapkan layar
        c.globalCompositeOperation = "lighter";
        glow(c, x, y, R * (pw ? 0.55 : 0.8), "60,140,255", (pw ? 0.2 : 0.13) * al);
        const arms = pw ? 6 : 4;
        for (let i = 0; i < arms; i++) {                                      // lengan spiral
          c.beginPath();
          for (let k = 0; k <= 34; k++) {
            const u = k / 34, rad = lerp(R * 0.95 * grow, rr * 1.15, Math.pow(u, pw ? 0.6 : 0.72)), an = i * TAU / arms + t * (1.4 + 5 * u) + u * (pw ? 6.2 : 4.6);
            const px = x + Math.cos(an) * rad, py = y + Math.sin(an) * rad; if (k) c.lineTo(px, py); else c.moveTo(px, py);
          }
          c.strokeStyle = "rgba(130,200,255," + ((pw ? 0.42 : 0.34) * al).toFixed(3) + ")"; c.lineWidth = pw ? 3 : 2.2; c.stroke();
        }
        c.lineWidth = pw ? 2 : 1.4;
        for (const p of parts) {                                              // partikel terhisap
          const x0 = x + Math.cos(p.a) * p.d, y0 = y + Math.sin(p.a) * p.d;
          if (!out) {
            p.d -= (30 + (pw ? 2600 : 1700) * Math.pow(rr / Math.max(p.d, rr, 1), 2)) * dt; p.a += (1.1 + 300 / (p.d + 30)) * dt;
            if (p.d < Math.max(6, rr * 0.75)) { p.d = rnd(0.55, 1) * R; p.a = rnd(0, TAU); continue; }
          } else p.d += 900 * dt * (0.5 + Math.random());
          c.strokeStyle = "rgba(190,225,255," + (0.6 * al).toFixed(3) + ")"; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x + Math.cos(p.a) * p.d, y + Math.sin(p.a) * p.d); c.stroke();
        }
        if (pw && rr > 1 && c.createConicGradient) {                          // cakram akresi pelangi (gaya Domain)
          [[2.4, 0.5, 0.85], [3.5, 0.16, 0.5]].forEach(d => {
            const g = c.createConicGradient(t * (d[0] > 3 ? -1.2 : 1.6), x, y);
            [[0, "#ffe9a8"], [0.14, "#ff9ad0"], [0.3, "#a66bff"], [0.46, "#4f86ff"], [0.6, "#7fe9ff"], [0.78, "#e8fbff"], [1, "#ffe9a8"]].forEach(s => g.addColorStop(s[0], s[1]));
            c.save(); c.translate(x, y); c.rotate(-0.35); c.scale(1, 0.32); c.translate(-x, -y);
            c.globalAlpha = d[2] * al; c.strokeStyle = g; c.lineWidth = rr * d[1]; c.beginPath(); c.arc(x, y, rr * d[0], 0, TAU); c.stroke(); c.restore();
          });
        }
        if (rr > 1) {                                                         // bola Biru
          glow(c, x, y, rr * 3.2, "70,150,255", 0.55 * al);
          c.globalCompositeOperation = "source-over";
          const g = c.createRadialGradient(x - rr * 0.25, y - rr * 0.3, rr * 0.05, x, y, rr);
          g.addColorStop(0, "#ffffff"); g.addColorStop(0.35, "#bfe4ff"); g.addColorStop(0.75, "#3d8bff"); g.addColorStop(1, "#1b3fd1");
          c.fillStyle = g; c.beginPath(); c.arc(x, y, rr, 0, TAU); c.fill();
          c.globalCompositeOperation = "lighter"; c.strokeStyle = "rgba(200,230,255," + (0.55 * al).toFixed(3) + ")"; c.lineWidth = 1.5;
          c.beginPath(); c.arc(x, y, rr * 1.45 + Math.sin(t * 8) * 1.5, 0, TAU); c.stroke();
        }
        if (t > hold) {                                                       // dilepas: cincin kejut
          if (pw && t < hold + 0.3) { c.fillStyle = "rgba(200,230,255," + (0.55 * (1 - (t - hold) / 0.3)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
          for (let i = 0; i < (pw ? 4 : 2); i++) {
            const v = clamp((t - hold - i * 0.1) / 0.7, 0, 1);
            c.strokeStyle = "rgba(150,210,255," + ((1 - v) * 0.8).toFixed(3) + ")"; c.lineWidth = (pw ? 11 : 7) * (1 - v) + 1; c.beginPath(); c.arc(x, y, eo(v) * R * 1.25, 0, TAU); c.stroke();
          }
        }
        c.restore();
        return t > hold + 0.9;
      }
    };
  }
  function blue(x, y) {
    if (!isGojo()) return "Masuk dulu ke mode Gojo (tombol JJK).";
    if (state !== "idle" && state !== "menu") return "Sedang ada jurus yang berjalan.";
    x = x == null ? W / 2 : x; y = y == null ? H / 2 : y;
    closeMenu(true); begin();
    const pw = dom(), R = pw ? Math.hypot(W, H) * 0.8 : Math.min(W, H) * CFG.blueRadius, hold = pw ? CFG.blueHoldDom : CFG.blueHold, list = collect(x, y, R);
    list.forEach(o => {
      const s = 1 - o.d / R, pull = pw ? clamp(0.6 + s * 0.5, 0.6, 1) : clamp(0.3 + s * 0.9, 0.3, 1), ex = (x - o.x) * pull, ey = (y - o.y) * pull;
      const fs = 1 - 0.96 * Math.pow(pull, 1.3), fo = 1 - Math.pow(pull, 1.6), sp = (Math.random() < 0.5 ? -1 : 1) * rnd(220, 540) * pull * (pw ? 2.4 : 1);
      const sw = (Math.random() < 0.5 ? -1 : 1) * o.d * (pw ? 0.5 : 0.28), px = o.d > 1 ? -(y - o.y) / o.d : 0, py = o.d > 1 ? (x - o.x) / o.d : 0;   // melengkung = pusaran
      fly(o, [
        { off: 0.5, x: ex * 0.45 + px * sw, y: ey * 0.45 + py * sw, r: sp * 0.4, s: lerp(1, fs, 0.35), o: lerp(1, fo, 0.3) },
        { x: ex, y: ey, r: sp, s: fs, o: fo }
      ], (pw ? 1 : 0.8) + 0.5 * (o.d / R), 0.1 + (o.d / R) * (pw ? 0.9 : 0.5), "cubic-bezier(.5,0,.9,.4)");
    });
    acts.push(blueAct(x, y, R, hold, pw)); kick(); sfx.blue(hold);
    at(hold, () => items.forEach(o => settle(o, pw ? 1.1 : 0.9, (o.d / R) * 0.2 + rnd(0, 0.08), "cubic-bezier(.2,1.35,.35,1)")));
    at(hold + 1.3, end);
    return pw ? "Biru Maksimum." : "Biru.";
  }

  /* ---------- MERAH (Aka): mendorong & menghancurkan  (Domain = MAKSIMUM: Black Flash, kepingan 2,5x) ---------- */
  function jag(pts, x0, y0, x1, y1, amp, n) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len; pts.length = 0;
    for (let k = 0; k <= n; k++) { const f = k / n, o = k && k < n ? rnd(-amp, amp) : 0; pts.push([x0 + dx * f + nx * o, y0 + dy * f + ny * o]); }
    return pts;
  }
  function redAct(x, y, list, maxD, pw) {
    const spd = pw ? 2600 : 1900;
    const cracks = Array.from({ length: Math.max(3, Math.round(8 * N * (pw ? 2 : 1))) }, () => {
      let an = rnd(0, TAU), px = 0, py = 0; const pts = [[0, 0]];
      for (let k = 0; k < 12; k++) { an += rnd(-0.45, 0.45); const l = rnd(0.05, 0.11) * maxD * (pw ? 1.3 : 1); px += Math.cos(an) * l; py += Math.sin(an) * l; pts.push([px, py]); }
      return pts;
    });
    const lines = Array.from({ length: Math.round(34 * N * (pw ? 2 : 1)) }, () => ({ a: rnd(0, TAU), k0: rnd(0.2, 0.6), k1: rnd(0.7, 1), w: rnd(1.5, 4.5) }));
    const bolts = pw ? Array.from({ length: Math.max(3, Math.round(9 * N)) }, () => { const an = rnd(0, TAU), L = maxD * rnd(0.45, 0.85); return { a: an, L, pts: [] }; }) : [];
    const pend = list.map(o => ({ o, at: o.d / spd })).sort((p, q) => p.at - q.at);
    return {
      t: 0, draw(c, a) {
        const t = a.t, wave = t * spd;
        while (pend.length && pend[0].at <= t) { const o = pend.shift().o; burstShards(o, PAL_RED, rnd(450, 1100) * (pw ? 1.4 : 1), clamp((o.w * o.h) / 8000, 2, 8) * (pw ? 2.5 : 1)); }
        c.save();
        const fl = pw ? 0.6 : 0.4;
        if (pw && t < 0.14) { c.fillStyle = "rgba(255,255,255," + (0.7 * (1 - t / 0.14)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
        if (t < fl) { c.fillStyle = "rgba(255,40,60," + ((pw ? 0.45 : 0.32) * (1 - t / fl)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
        c.globalCompositeOperation = "lighter";
        const ca = clamp(1 - t / 0.55, 0, 1); if (ca > 0) glow(c, x, y, (30 + 650 * eo(t / 0.55)) * (pw ? 1.5 : 1), "255,50,70", 0.9 * ca);
        (pw ? [0, 0.12, 0.26] : [0, 0.12]).forEach((dl, i) => {               // cincin kejut
          const rr = Math.max(0, (t - dl) * spd); if (rr <= 0 || rr > maxD * 1.05) return;
          const f = clamp(1 - rr / (maxD * 1.05), 0, 1);
          c.strokeStyle = "rgba(" + (i === 1 ? "255,140,150" : i === 2 ? "255,230,235" : "255,60,80") + "," + (0.85 * f).toFixed(3) + ")"; c.lineWidth = ((i === 0 ? 14 : 5) * (pw ? 1.5 : 1)) * f + 1;
          c.beginPath(); c.arc(x, y, rr, 0, TAU); c.stroke();
        });
        const lf = clamp(1 - t, 0, 1);
        if (lf > 0) for (const l of lines) {                                   // garis energi radial
          const r0 = wave * l.k0, r1 = Math.min(wave * l.k1, maxD * 1.1);
          c.strokeStyle = "rgba(255,90,110," + (0.7 * lf).toFixed(3) + ")"; c.lineWidth = l.w * lf + 0.5;
          c.beginPath(); c.moveTo(x + Math.cos(l.a) * r0, y + Math.sin(l.a) * r0); c.lineTo(x + Math.cos(l.a) * r1, y + Math.sin(l.a) * r1); c.stroke();
        }
        if (pw && t < 0.6) {                                                   // BLACK FLASH: petir merah-hitam menyambar
          const bf = (Math.random() < 0.8 ? 1 : 0.35) * (1 - t / 0.6), gr = eo(t / 0.16);
          for (const b of bolts) {
            jag(b.pts, x, y, x + Math.cos(b.a) * b.L * gr, y + Math.sin(b.a) * b.L * gr, 26, 14);
            c.beginPath(); b.pts.forEach((p, k) => { if (k) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); });
            c.strokeStyle = "rgba(255,30,60," + (0.55 * bf).toFixed(3) + ")"; c.lineWidth = 11; c.stroke();
            c.strokeStyle = "rgba(255,255,255," + (0.95 * bf).toFixed(3) + ")"; c.lineWidth = 2.2; c.stroke();
          }
        }
        const cg = eo(t / 0.5), cf = clamp(1 - (t - 0.7) / 1.1, 0, 1);
        if (cf > 0) for (const pts of cracks) {                                // retakan layar
          const m = Math.max(2, Math.ceil(pts.length * cg)); c.beginPath();
          for (let k = 0; k < m; k++) { const px = x + pts[k][0], py = y + pts[k][1]; if (k) c.lineTo(px, py); else c.moveTo(px, py); }
          c.strokeStyle = "rgba(255,40,60," + (0.55 * cf).toFixed(3) + ")"; c.lineWidth = 6; c.stroke();
          c.strokeStyle = "rgba(255,230,235," + (0.9 * cf).toFixed(3) + ")"; c.lineWidth = 2.2; c.stroke();
        }
        c.restore();
        return t > (pw ? 2.5 : 2);
      }
    };
  }
  function red(x, y) {
    if (!isGojo()) return "Masuk dulu ke mode Gojo (tombol JJK).";
    if (state !== "idle" && state !== "menu") return "Sedang ada jurus yang berjalan.";
    x = x == null ? W / 2 : x; y = y == null ? H / 2 : y;
    closeMenu(true); begin();
    const pw = dom(), spd = pw ? 2600 : 1900, hold = pw ? CFG.redHoldDom : CFG.redHold, maxD = Math.hypot(W, H), list = collect(x, y, Infinity);
    list.forEach(o => {
      const s = clamp(1 - o.d / (maxD * 0.9), 0.15, 1), dist = (260 + 1000 * s) * (pw ? 1.7 : 1), sp = (Math.random() < 0.5 ? -1 : 1) * rnd(160, 620) * (0.4 + s) * (pw ? 1.8 : 1);
      const tx = o.ux * dist + rnd(-120, 120), ty = Math.min(o.uy * dist + rnd(-120, 120), H + 160 - o.y);
      fly(o, [
        { off: 0.12, x: o.ux * 14, y: o.uy * 14, r: sp * 0.03, s: 1.06, o: 1 },
        { x: tx, y: ty, r: sp, s: rnd(0.15, 0.5), o: 0 }
      ], 0.85 + rnd(0, 0.3), o.d / spd, "cubic-bezier(.1,.75,.25,1)");
    });
    acts.push(redAct(x, y, list, maxD, pw)); kick(); sfx.red();
    at(hold, () => { sfx.redBack(); items.forEach(o => settle(o, 1, clamp(1 - o.d / maxD, 0, 1) * 0.3 + rnd(0, 0.15), "cubic-bezier(.15,.9,.25,1)")); });
    at(hold + 1.7, end);
    return pw ? "Merah Maksimum." : "Merah.";
  }

  /* ---------- HOLLOW PURPLE: Biru + Merah menyatu -> ledakan -> void ---------- */
  function ringAct(x, y, rgb) {
    return { t: 0, draw(c, a) {
      const t = a.t; c.save(); c.globalCompositeOperation = "lighter";
      glow(c, x, y, 60 + 300 * eo(t / 0.7), rgb, 0.6 * clamp(1 - t / 0.7, 0, 1));
      for (let i = 0; i < 2; i++) { const v = clamp((t - i * 0.12) / 0.9, 0, 1); c.strokeStyle = "rgba(" + rgb + "," + ((1 - v) * 0.8).toFixed(3) + ")"; c.lineWidth = 6 * (1 - v) + 1; c.beginPath(); c.arc(x, y, eo(v) * Math.min(W, H) * 0.7, 0, TAU); c.stroke(); }
      c.restore(); return t > 1.2;
    } };
  }
  function purpleAct(x, y, list, pw) {
    const trA = [], trB = [], a0 = rnd(0, TAU), maxD = Math.hypot(W, H), minD = Math.min(W, H), TL = pw ? 34 : 22;
    const streaks = pw ? Array.from({ length: Math.round(70 * N) }, () => ({ a: rnd(0, TAU), d: rnd(0.3, 1) * maxD * 0.6 })) : [];
    const tmp = [];
    const pend = list.map(o => ({ o, at: PT.BOOM + 1.15 * (1 - Math.pow(Math.max(0, 1 - o.d / (maxD * 1.15)), 1 / 3)) })).sort((p, q) => p.at - q.at);
    const bolt = (c, x0, y0, x1, y1, amp, lw, al) => {
      jag(tmp, x0, y0, x1, y1, amp, 9); c.beginPath(); tmp.forEach((p, k) => { if (k) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); });
      c.strokeStyle = "rgba(170,110,255," + (0.5 * al).toFixed(3) + ")"; c.lineWidth = lw * 4; c.stroke();
      c.strokeStyle = "rgba(245,235,255," + (0.95 * al).toFixed(3) + ")"; c.lineWidth = lw; c.stroke();
    };
    return {
      t: 0, draw(c, a, dt) {
        const t = a.t;
        while (pend.length && pend[0].at <= t) { const o = pend.shift().o; burstShards(o, PAL_PUR, rnd(300, 800) * (pw ? 1.4 : 1), clamp((o.w * o.h) / 10000, 1, 5) * (pw ? 2 : 1)); }
        c.save();
        const dim = t < PT.BOOM ? eo(t / PT.CH) * (pw ? 0.7 : 0.55) : 0;
        if (dim > 0) { c.fillStyle = "rgba(5,0,18," + dim.toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
        c.globalCompositeOperation = "lighter";
        if (t < PT.CH) {                                                       // dua bola mengorbit, makin dekat
          const u = t / PT.CH, e = eio(u), sep = minD * (pw ? 0.36 : 0.25) * (1 - e), ang = a0 + t * (1.4 + 7 * u * u), sr = (pw ? 22 : 14) + (pw ? 30 : 20) * u;
          const ax = x + Math.cos(ang) * sep, ay = y + Math.sin(ang) * sep * 0.82, bx = 2 * x - ax, by = 2 * y - ay;
          trA.push([ax, ay]); trB.push([bx, by]); if (trA.length > TL) { trA.shift(); trB.shift(); }
          trA.forEach((p, i) => glow(c, p[0], p[1], sr * (0.7 + 1.4 * i / TL), "70,150,255", 0.2 * i / TL));
          trB.forEach((p, i) => glow(c, p[0], p[1], sr * (0.7 + 1.4 * i / TL), "255,60,90", 0.2 * i / TL));
          glow(c, ax, ay, sr * 4.2, "70,150,255", 0.95); glow(c, bx, by, sr * 4.2, "255,60,90", 0.95);
          c.strokeStyle = "rgba(190,150,255," + (0.25 * u).toFixed(3) + ")"; c.lineWidth = 1.3; c.setLineDash([3, 9]);
          c.beginPath(); c.arc(x, y, minD * 0.34 * (1 - e) + 30, 0, TAU); c.stroke(); c.setLineDash([]);
          if (pw) {                                                            // Domain: petir ungu + energi tersedot ke inti
            c.lineCap = "round";
            if (Math.random() < 0.55) bolt(c, ax, ay, bx, by, 22 + 30 * u, 1.6, 0.4 + 0.6 * u);
            if (Math.random() < 0.5) { const an = rnd(0, TAU), L = minD * rnd(0.25, 0.6) * (0.4 + u); bolt(c, x, y, x + Math.cos(an) * L, y + Math.sin(an) * L, 24, 1.4, 0.3 + 0.6 * u); }
            for (const s of streaks) {
              const x0 = x + Math.cos(s.a) * s.d, y0 = y + Math.sin(s.a) * s.d; s.d -= (200 + u * 1800) * dt; s.a += 0.6 * dt;
              if (s.d < 30) { s.d = rnd(0.5, 1) * maxD * 0.6; s.a = rnd(0, TAU); continue; }
              c.strokeStyle = "rgba(200,170,255," + (0.5 * u).toFixed(3) + ")"; c.lineWidth = 1.4; c.beginPath(); c.moveTo(x0, y0); c.lineTo(x + Math.cos(s.a) * s.d, y + Math.sin(s.a) * s.d); c.stroke();
            }
          }
        } else if (t < PT.BOOM) {                                              // menyatu: inti ungu berdenyut
          const pu = t - PT.CH, r = (pw ? 40 : 26) + (pw ? 30 : 18) * eo(pu / 0.3) + Math.sin(t * 46) * 2;
          if (pu < 0.25) { c.fillStyle = "rgba(255,255,255," + (0.45 * (1 - pu / 0.25)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
          glow(c, x, y, r * 4.2, "176,96,255", 1); glow(c, x, y, r * 1.8, "255,235,255", 1);
        } else {                                                               // DUAR: bola ungu menelan layar
          const pu = t - PT.BOOM, u = pu / 1.15, R = eo(u) * maxD * 1.15;
          c.globalCompositeOperation = "source-over";
          if (R > 1) {
            const g = c.createRadialGradient(x, y, 0, x, y, R);
            g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.25, "rgba(236,214,255,.95)"); g.addColorStop(0.6, "rgba(160,90,255,.92)");
            g.addColorStop(0.92, "rgba(70,30,170,.9)"); g.addColorStop(1, "rgba(40,10,110,0)");
            c.fillStyle = g; c.beginPath(); c.arc(x, y, R, 0, TAU); c.fill();
          }
          if (u >= 1) { c.fillStyle = "rgba(60,20,150," + (0.9 + 0.05 * Math.sin(t * 20)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
          c.globalCompositeOperation = "lighter";
          if (pu < 0.3) { c.fillStyle = "rgba(255,255,255," + (0.9 * (1 - pu / 0.3)).toFixed(3) + ")"; c.fillRect(0, 0, W, H); }
          if (pw) {                                                            // Domain: sinar ungu melintang layar + aksara 茈
            const bu = eo(pu / 0.45), bh = H * 0.62 * bu * (1 - clamp((pu - 1.1) / 0.5, 0, 1)), g2 = c.createLinearGradient(0, y - bh / 2, 0, y + bh / 2);
            g2.addColorStop(0, "rgba(120,60,255,0)"); g2.addColorStop(0.35, "rgba(190,130,255,.85)"); g2.addColorStop(0.5, "rgba(255,255,255,1)"); g2.addColorStop(0.65, "rgba(190,130,255,.85)"); g2.addColorStop(1, "rgba(120,60,255,0)");
            if (bh > 1) { c.fillStyle = g2; c.fillRect(0, y - bh / 2, W, bh); }
            const ka = clamp(pu / 0.2, 0, 1) * clamp(1 - (pu - 0.7) / 1.2, 0, 1);
            if (ka > 0.01) {
              c.save(); c.globalCompositeOperation = "source-over"; c.textAlign = "center"; c.textBaseline = "middle";
              c.font = "900 " + Math.round(minD * 0.55) + "px 'Noto Serif JP','Dela Gothic One',serif";
              c.shadowColor = "rgba(190,120,255,1)"; c.shadowBlur = 50; c.fillStyle = "rgba(255,255,255," + ka.toFixed(3) + ")"; c.fillText("茈", W / 2, H / 2); c.restore();
            }
          }
          const nr = pw ? 5 : 3;
          for (let i = 0; i < nr; i++) {
            const v = clamp((pu - i * 0.12) / 1.2, 0, 1); if (v <= 0 || v >= 1) continue;
            c.strokeStyle = "rgba(" + (i % 2 ? "120,150,255" : "230,200,255") + "," + ((1 - v) * 0.8).toFixed(3) + ")"; c.lineWidth = 10 * (1 - v) + 1;
            c.beginPath(); c.arc(x, y, eo(v) * maxD * 1.1, 0, TAU); c.stroke();
          }
        }
        c.restore();
        return t > PT.BLK1 + 0.2;
      }
    };
  }
  function purple(x, y) {
    if (!isGojo()) return "Masuk dulu ke mode Gojo (tombol JJK).";
    if (state !== "idle" && state !== "menu") return "Sedang ada jurus yang berjalan.";
    x = x == null ? W / 2 : x; y = y == null ? H / 2 : y;
    closeMenu(true); begin();
    const pw = dom(); PT = pw ? PT_D : PT_N;
    const maxD = Math.hypot(W, H), list = collect(x, y, Infinity), near = Math.min(W, H) * 0.6;
    list.forEach(o => { if (pw) shiver(o, 2 + 5 * clamp(1 - o.d / maxD, 0, 1)); else if (o.d < near) shiver(o, 1 + 3 * (1 - o.d / near)); });   // bergetar saat energi terkumpul
    acts.push(purpleAct(x, y, list, pw)); kick(); sfx.purple();
    at(PT.BOOM, () => list.forEach(o => {                                          // musnah tepat saat bola ungu sampai
      const u = 1 - Math.pow(Math.max(0, 1 - o.d / (maxD * 1.15)), 1 / 3), m = pw ? 1.7 : 1;
      fly(o, [
        { off: 0.18, x: o.ux * 14, y: o.uy * 14, r: 0, s: 1.12, o: 1 },
        { x: o.ux * (140 + rnd(0, 200)) * m, y: o.uy * (140 + rnd(0, 200)) * m, r: rnd(-240, 240) * m, s: 0.02, o: 0 }
      ], 0.8, 1.15 * u, "cubic-bezier(.5,0,.9,.5)");
    }));
    at(PT.BLK0, () => openVoid(x, y));
    return pw ? "Hollow Purple Maksimum." : "Hollow Purple.";
  }
  function openVoid(x, y) {
    if (state !== "busy") return;
    voidEl = document.createElement("div"); voidEl.className = "gs-void";
    voidEl.innerHTML = '<span class="gs-void-hint" style="--gs-d:' + CFG.hintDelay + 's">ketuk di mana saja untuk kembali</span>';
    if (dom()) voidEl.classList.add("is-domain");
    document.body.appendChild(voidEl); root.dataset.gsVoid = "1";
    const big = Math.hypot(W, H) * 1.25, c0 = "circle(0px at " + x + "px " + y + "px)", c1 = "circle(" + big + "px at " + x + "px " + y + "px)";
    voidEl.style.clipPath = c0;
    const ready = () => { if (!voidEl) return; voidEl.style.clipPath = "none"; state = "void"; voidSince = performance.now(); };
    if (voidEl.animate) {
      const an = voidEl.animate([{ clipPath: c0 }, { clipPath: c1 }], { duration: (PT.BLK1 - PT.BLK0) * 1000 * K, easing: "cubic-bezier(.55,0,.25,1)", fill: "forwards" });
      an.onfinish = () => { ready(); try { an.cancel(); } catch (e) { /* abaikan */ } };
    } else ready();
    const stop = e => e.preventDefault();
    voidEl.addEventListener("wheel", stop, { passive: false }); voidEl.addEventListener("touchmove", stop, { passive: false });
    voidEl.addEventListener("pointerup", e => { if (state === "void" && performance.now() - voidSince > 900) leaveVoid(e.clientX, e.clientY); });
  }
  function leaveVoid(x, y) {
    if (state !== "void" || !voidEl) return;
    state = "leaving"; const el = voidEl, big = Math.hypot(W, H) * 1.25;
    const hint = el.querySelector(".gs-void-hint"); if (hint) hint.remove();
    sfx.back(); acts.push(ringAct(x, y, "176,120,255")); kick();
    items.forEach(o => settle(o, 0.95, clamp(o.d / big, 0, 1) * 0.55 + rnd(0, 0.12), "cubic-bezier(.15,.9,.25,1)"));
    const gone = () => { el.remove(); if (voidEl === el) voidEl = null; delete root.dataset.gsVoid; };
    if (el.animate) {
      const an = el.animate([{ clipPath: "circle(" + big + "px at " + x + "px " + y + "px)" }, { clipPath: "circle(0px at " + x + "px " + y + "px)" }], { duration: 950 * K, easing: "cubic-bezier(.6,0,.3,1)", fill: "forwards" });
      an.onfinish = gone;
    } else gone();
    at(1.8, () => { items = []; end(); exitedAt = performance.now(); });
  }

  /* ---------- menu jurus (muncul di titik klik) ---------- */
  function openMenu(x, y) {
    closeMenu(true);
    const pw = dom();
    menu = document.createElement("div"); menu.className = "gs-menu" + (pw ? " is-domain" : ""); menu.setAttribute("role", "menu"); menu.setAttribute("aria-label", pw ? "Jurus Gojo (Domain)" : "Jurus Gojo");
    menu.innerHTML = '<p class="gs-menu-title"><span>' + (pw ? "DOMAIN" : "JURUS") + '</span><small>' + (pw ? "領域展開" : "術式") + '</small></p>' +
      '<button type="button" role="menuitem" class="gs-it gs-ao" data-k="ao"><i class="gs-orb"></i><span class="gs-nm">Biru' + (pw ? " Maksimum" : "") + '<small>' + (pw ? "gravitasi menyedot seluruh layar" : "menghisap yang di dekatnya") + '</small></span><b>蒼</b></button>' +
      '<button type="button" role="menuitem" class="gs-it gs-aka" data-k="aka"><i class="gs-orb"></i><span class="gs-nm">Merah' + (pw ? " Maksimum" : "") + '<small>' + (pw ? "Black Flash, semuanya hancur" : "mendorong &amp; menghancurkan") + '</small></span><b>赫</b></button>' +
      '<button type="button" role="menuitem" class="gs-it gs-mur" data-k="mur"><i class="gs-orb"></i><span class="gs-nm">Hollow Purple' + (pw ? " Maksimum" : "") + '<small>' + (pw ? "sinar ungu, void total" : "Biru + Merah, web jadi void") + '</small></span><b>茈</b></button>';
    document.body.appendChild(menu);
    const w = menu.offsetWidth, h = menu.offsetHeight;
    let left = x + 16, top = y + 16;
    if (left + w > W - 8) left = x - 16 - w;
    if (top + h > H - 8) top = y - 16 - h;
    left = clamp(left, 8, Math.max(8, W - w - 8)); top = clamp(top, 8, Math.max(8, H - h - 8));
    menu.style.left = left + "px"; menu.style.top = top + "px";
    menu.style.setProperty("--ox", (x - left) + "px"); menu.style.setProperty("--oy", (y - top) + "px");
    menuAt = { x, y }; state = "menu"; sfx.menu();
    menu.querySelectorAll(".gs-it").forEach(b => b.addEventListener("click", ev => { ev.stopPropagation(); choose(b.dataset.k); }));
    const m = menu; requestAnimationFrame(() => { if (m.isConnected) m.classList.add("is-in"); });
  }
  function closeMenu(now) {
    if (!menu) return;
    const m = menu; menu = null;
    if (state === "menu") state = "idle";
    if (now) m.remove(); else { m.classList.remove("is-in"); setTimeout(() => m.remove(), 200); }
  }
  function choose(k) {
    const p = menuAt;
    if (k === "ao") blue(p.x, p.y); else if (k === "aka") red(p.x, p.y); else purple(p.x, p.y);
  }

  /* ---------- status ---------- */
  function begin() {
    state = "busy"; root.dataset.gsRun = "1"; shardCap = dom() ? 1800 : 800;
    if (dom() && window.gojoTheme && window.gojoTheme.pulse) { try { window.gojoTheme.pulse(); } catch (e) { /* abaikan */ } }   // tangan Gojo berdenyut saat jurus Domain dilepas
  }
  function end() { state = "idle"; delete root.dataset.gsRun; }
  function abortAll() {                       // keluar dari mode Gojo / dimatikan: semuanya langsung normal lagi
    timers.forEach(clearTimeout); timers = [];
    items.forEach(cancelAll); items = []; shards.length = 0; shardAct = null; acts = [];
    if (cv && cx) { cx.clearRect(0, 0, W, H); cv.style.display = "none"; }
    if (voidEl) { voidEl.remove(); voidEl = null; }
    closeMenu(true); state = "idle"; delete root.dataset.gsRun; delete root.dataset.gsVoid;
  }

  /* ---------- petunjuk (muncul saat masuk mode Gojo / Domain) ---------- */
  let toastEl = null, toastT = 0;
  function toast(html, ms) {
    if (!CFG.hint) return;
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "gs-toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.innerHTML = html; toastEl.classList.toggle("is-domain", dom());
    requestAnimationFrame(() => toastEl.classList.add("is-on"));
    clearTimeout(toastT); toastT = setTimeout(() => toastEl && toastEl.classList.remove("is-on"), ms || 9000);
  }
  function afterScenes(fn, n) {              // tunggu adegan sinematik selesai dulu, baru tampilkan petunjuk
    if (!isGojo()) return;
    if (document.querySelector(".gj-scene,.jj-scene")) { if ((n || 0) < 40) setTimeout(() => afterScenes(fn, (n || 0) + 1), 400); return; }
    fn();
  }
  const HINT = "<b>五</b>&nbsp; Mode Gojo aktif. <b>Klik 2x</b> (di HP: <b>ketuk 2x</b>) di bagian kosong layar untuk membuka menu jurus: <i>Biru, Merah, Hollow Purple</i>.";
  const HINT_DOM = "<b>無量空処</b>&nbsp; Domain aktif. <b>Klik 2x</b> (di HP: <b>ketuk 2x</b>) di layar: jurusmu jadi versi <b>Maksimum</b>, jauh lebih dahsyat.";

  /* ---------- klik 2x / ketuk 2x -> menu ---------- */
  document.addEventListener("pointerdown", e => {
    if (!CFG.enabled || !isGojo()) return;
    if (e.isPrimary === false || (e.pointerType === "mouse" && e.button !== 0)) return;
    if (state === "menu" && menu && !menu.contains(e.target)) { closeMenu(); ptrDn = null; lastTap = null; return; }   // klik di luar = tutup saja
    ptrDn = { x: e.clientX, y: e.clientY, t: performance.now(), skip: !!(e.target.closest && e.target.closest(SKIP)) };
  }, true);
  document.addEventListener("pointerup", e => {
    const d = ptrDn; ptrDn = null;
    if (!d || !CFG.enabled || !isGojo() || state !== "idle" || d.skip) { if (d && d.skip) lastTap = null; return; }
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (document.querySelector(".tw-fx")) return;      // adegan Puting Beliung (PEMBARUAN 53) sedang jalan
    const now = performance.now();
    if (now - exitedAt < 400 || now - d.t > 700 || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) { lastTap = null; return; }   // hanya ketukan, bukan geseran
    if (lastTap && now - lastTap.t < CFG.dblMs && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 40) {
      lastTap = null;
      const sel = window.getSelection && window.getSelection(); if (sel && sel.removeAllRanges) sel.removeAllRanges();   // klik 2x biasanya memilih satu kata
      openMenu(e.clientX, e.clientY);
    } else lastTap = { t: now, x: e.clientX, y: e.clientY };
  });
  document.addEventListener("pointercancel", () => { ptrDn = null; }, true);
  document.addEventListener("keydown", e => {
    if (!isGojo()) return;
    const k = (e.key || "").toLowerCase();
    if (state === "menu") {
      if (e.key === "Escape") closeMenu();
      else if (k === "1" || k === "b") { e.preventDefault(); choose("ao"); }
      else if (k === "2" || k === "r") { e.preventDefault(); choose("aka"); }
      else if (k === "3" || k === "p") { e.preventDefault(); choose("mur"); }
    } else if (state === "void") {
      if (e.key === "Escape") { if (performance.now() - voidSince > 900) leaveVoid(W / 2, H / 2); }
      else if ([" ", "arrowdown", "arrowup", "pagedown", "pageup", "home", "end"].indexOf(k) >= 0) e.preventDefault();
    }
  }, true);
  let wasGojo = isGojo(), wasDom = dom();
  if (window.MutationObserver) new MutationObserver(() => {
    const gj = isGojo(), dm = dom();
    if (!gj) { abortAll(); lastTap = null; if (toastEl) toastEl.classList.remove("is-on"); }
    else if (!wasGojo) afterScenes(() => toast(HINT));
    else if (dm && !wasDom) afterScenes(() => toast(HINT_DOM));
    wasGojo = gj; wasDom = dm;
  }).observe(root, { attributes: true, attributeFilter: ["data-jjk", "data-bleach", "data-gojo"] });
  window.addEventListener("resize", size);

  window.gojoSkills = {
    CFG,
    get takesClicks() { return CFG.enabled && isGojo(); },
    get state() { return state; },
    menu(x, y) { if (!isGojo()) return "Masuk dulu ke mode Gojo (tombol JJK)."; if (state === "idle") openMenu(x == null ? W / 2 : x, y == null ? H / 2 : y); return state; },
    blue, red, purple,
    exit() { if (state === "void") { leaveVoid(W / 2, H / 2); return "Kembali dari void."; } return "Tidak sedang di void."; },
    off() { CFG.enabled = false; abortAll(); return "Menu jurus dimatikan."; },
    on() { CFG.enabled = true; return "Menu jurus menyala (klik kiri di mode Gojo)."; }
  };
})();


/* ==========================================================================
   PEMBARUAN 55: TOMBOL "ARSIP RAHASIA" - PANDUAN SEMUA FITUR & EASTER EGG
   Tombol bulat kecil (desktop: kanan atas, tepat di bawah tombol tema; HP: tepi kanan layar).
   Ditekan -> panel berisi daftar fitur + easter egg, cara membukanya, dan (opsional) tombol "Coba".
   Isi panduan = konstanta DATA di bawah. Tambah easter egg baru: tambahkan satu objek ke GROUPS.
   Console: panduan.open() | .close() | .toggle() | .hide() | .show() | .CFG
   Pintasan keyboard: Ctrl + Alt + H (bisa diganti di CFG.hotkey). Esc = tutup.
   ========================================================================== */
(function panduanRahasia() {
  "use strict";
  const root = document.documentElement;
  const CFG = {
    show: true,        // false = tombol disembunyikan (panel tetap bisa dibuka lewat Ctrl+Alt+H atau panduan.open())
    hotkey: true,      // Ctrl + Alt + H
    demo: true,        // tombol "Coba" di kartu yang punya adegan uji langsung
    spoiler: true,     // true = cara akses dikaburkan sampai kartu diketuk
    sound: true        // bunyi kecil (ikut mati kalau tapSound.on = false)
  };
  const REDUCE = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ DATA ------------------------------------------------------------------
     g = golongan · t = judul · ic = ikon/aksara · tag = label kecil · d = deskripsi singkat · how = langkah cara akses · note = catatan · con = perintah Console
     demo = { label, run } (opsional)                                                                                                             */
  const GROUPS = [
    { id: "dasar",  n: "Fitur Dasar",       c: "#63a4ff" },
    { id: "langit", n: "Langit & Cuaca",    c: "#4fd1c5" },
    { id: "bleach", n: "Bleach",            c: "#ff7a3d" },
    { id: "quincy", n: "Quincy & Tinta",    c: "#8ec5ff" },
    { id: "jjk",    n: "Jujutsu Kaisen",    c: "#a78bfa" },
    { id: "kode",   n: "Kode & Pintasan",   c: "#f5c542" }
  ];
  const song = (i, t) => "lagu ke-" + i + " “" + t + "”";
  const ITEMS = [
    /* ---------------- FITUR DASAR ---------------- */
    { g: "dasar", ic: "☰", t: "Navbar bermaskot", tag: "Selalu ada", d: "Pil biru meluncur mengikuti menu, ditemani bola senyum yang melompat ke menu yang disorot.",
      how: ["Arahkan kursor ke menu di navbar atas.", "Klik menu untuk pindah bagian; maskot ikut melompat."] },
    { g: "dasar", ic: "☾", t: "Tema Terang / Gelap", tag: "Tombol kanan atas", d: "Pagi cerah dengan burung & sinar matahari, atau malam berbintang.",
      how: ["Klik tombol bulan/matahari (desktop: kanan atas, HP: kanan bawah)."], note: "Di mode karakter Bleach, tombol ini berubah fungsi jadi pengganti wujud (Bankai, Sekai, dll)." },
    { g: "dasar", ic: "✦", t: "ID Card di tali", tag: "Beranda", d: "Kartu identitas bergantung di tali dengan fisika asli. Gambarnya ikut berganti sesuai tema.",
      how: ["Seret kartu lalu lepas: tali memantul.", "Ketuk kartu untuk membaliknya."], note: "ID card juga dipakai sebagai kunci beberapa easter egg (lihat Pramuka & Jujutsu Kaisen)." },
    { g: "dasar", ic: "♫", t: "Pemutar musik (10 lagu)", tag: "Kiri bawah", d: "Backsound santai + daftar 10 lagu. Beberapa lagu adalah kunci easter egg.",
      how: ["Klik tombol: backsound / lagu hidup-mati.", "Tahan tombol atau klik kanan untuk membuka daftar 10 lagu."], note: "Lagu 1 = Cuaca · Lagu 2 = Bleach · Lagu 3 = Jujutsu Kaisen · Lagu 10 = White Ichigo." },
    { g: "dasar", ic: "⚙", t: "Skills & Kemampuan", tag: "Bagian About", d: "Daftar skill (HTML, desain, Office, AI, dll) yang bisa dibuka-tutup per kategori.",
      how: ["Buka bagian About, lalu ketuk kategori skill."] },
    { g: "dasar", ic: "▦", t: "Portofolio, Timeline & Kontak", tag: "Bagian bawah", d: "Folder portofolio, foto yang bertebaran saat berpindah ke Kontak, timeline pendidikan & pengalaman, kartu GitHub, daftar anime (wibu) dengan filter & poster, serta kolom komentar.",
      how: ["Gulir halaman ke bawah.", "Di daftar wibu: pilih chip filter, ketuk kartu untuk membuka poster & sinopsis."] },
    { g: "dasar", ic: "◎", t: "Kursor khusus", tag: "Mouse asli", d: "Kepala kursor + cincin yang mengekor + jejak percikan. Bentuknya ikut tema: bintang, kupu-kupu (Aizen), tebasan silang (Zaraki), bulan sabit (Ichigo), salib Quincy (Uryu).",
      how: ["Gerakkan mouse (HP/tablet tetap kursor normal).", "Ganti tema atau karakter Bleach untuk melihat bentuk lain."], con: "siteCursor.off() / siteCursor.on()" },
    { g: "dasar", ic: "♪", t: "Bunyi ketuk layar", tag: "Semua mode", d: "Setiap ketukan layar berbunyi pendek yang BERBEDA di tiap mode (Gelap, Terang, Shinji, Aizen, Zaraki, Ichigo, dll).",
      how: ["Ketuk/klik bagian kosong layar, ganti tema, dengarkan bedanya."], con: "tapSound.on = false  (matikan)" },
    { g: "dasar", ic: "▇", t: "Loading screen bersuara", tag: "Saat halaman dibuka", d: "Monogram digambar tinta, dengung naik mengikuti persen, 'ting' tiap 10%, ditutup arpeggio lonceng.",
      how: ["Muat ulang halaman. Kalau suara diblokir browser, ketuk layar sekali."] },
    { g: "dasar", ic: "⚔", t: "Mini game alien", tag: "Tombol game kanan bawah", d: "Game tembak alien. Karakter Bleach / JJK yang sedang aktif ikut jadi pemain (Ichigo menebas, Uryu memanah, Gojo melempar energi kutukan, Ichibē melempar tinta).",
      how: ["Pilih karakter lewat menu Bleach atau JJK (jika sudah terbuka).", "Tekan tombol game kanan bawah.", "Panel mode muncul di kanan; tekan 5 untuk ganti wujud, klik / J / F untuk menyerang, 3 / 4 / 6 = skill."], note: "Uryu menembak panah: makin jauh sasaran, makin besar damage (sampai +90%)." },

    /* ---------------- LANGIT & CUACA ---------------- */
    { g: "langit", ic: "☀", t: "Pilihan Langit: Senja & Monokrom", tag: "Easter egg", d: "Dua tema tersembunyi: SENJA (langit jingga-ungu, scrollbar matahari terbenam) dan MONOKROM (malam hitam-putih).",
      how: ["Tahan tombol tema sekitar 0,65 detik, atau klik kanan.", "Pilih Terang / Senja / Gelap / Monokrom dari menu LANGIT."], note: "Tidak bisa dibuka saat mode karakter Bleach aktif." },
    { g: "langit", ic: "🦅", t: "Elang Raja", tag: "Mode Terang", d: "Elang emas melintas langit pagi, meninggalkan bulu. Kalau berhasil diketuk, ia berubah wujud dan bulu emas menghujani layar.",
      how: ["Masuk mode Terang (bukan karakter Bleach).", "Tunggu ±3–6 menit, atau lihat langit sesekali.", "Ketuk elang saat melintas."], con: "elangRaja()" , demo: { label: "Panggil elang", run: () => { if (root.dataset.theme !== "light") return "Ganti dulu ke mode Terang."; window.elangRaja && window.elangRaja(); } } },
    { g: "langit", ic: "👽", t: "UFO & Alien nyasar", tag: "Mode Gelap", d: "UFO kecil terbang di langit malam. Diketuk: sinar penarik, tamu alien turun menyapa, lalu UFO melesat warp.",
      how: ["Masuk mode Gelap (bukan karakter Bleach).", "Tunggu ±45–85 detik.", "Ketuk UFO yang lewat."] },
    { g: "langit", ic: "☂", t: "Mode Cuaca", tag: "Easter egg", d: "Membuka tombol cuaca bulat kecil di kiri bawah: Cerah, Angin Kencang, Hujan, Hujan Petir (ikut tema & karakter).",
      how: ["Putar " + song(1, "About You") + ".", "Ketuk tombol tema 10x berturut-turut (jeda tiap ketukan maks 0,8 dtk, total maks 5 dtk).", "Muncul ucapan selamat dan tombol cuaca di kiri bawah."], note: "Jadi pintu masuk ke tiga easter egg berikutnya (Banjir, Petir, Puting Beliung)." },
    { g: "langit", ic: "⛈", t: "Tersambar Petir", tag: "Hujan Petir", d: "Saat hujan petir menyala, ada peluang acak layar tersambar: layar putih penuh, telinga berdenging, bekas gosong, lalu kartu ucapan selamat.",
      how: ["Buka easter egg Cuaca dulu.", "Pilih Hujan Petir dan tunggu (rata-rata ±40 detik).", "Setelah tersambar ada jeda 60 detik."], con: "petir.strike()", demo: { label: "Sambar sekarang", run: () => window.petir && window.petir.strike() } },
    { g: "langit", ic: "≈", t: "Banjir", tag: "Hujan / Hujan Petir 2 menit", d: "Air naik sampai tengah ID card. Gulir ke bawah: semuanya tenggelam, ada ikan, paus lewat, kartu mengapung. Ganti cuaca ke Cerah/Angin = air surut.",
      how: ["Nyalakan Hujan atau Hujan Petir dan biarkan 2 menit terus-menerus.", "Sejak ±1,5 menit ada genangan tipis sebagai petunjuk.", "Ketuk layar sekali dulu agar browser mengizinkan suara."], con: "banjir.fire()  |  banjir.flood()  |  banjir.drain()", demo: { label: "Tampilkan ucapan banjir", run: () => window.banjir && window.banjir.fire() } },
    { g: "langit", ic: "🦈", t: "Hiu di dalam banjir", tag: "Saat banjir penuh", d: "Hiu berenang di bawah permukaan antara About dan Kontak. Diketuk: hiu menerkam, rahang menutup, layar retak.",
      how: ["Biarkan banjir naik penuh (lihat Banjir).", "Tunggu ±6 detik, lalu gulir ke bawah (About sampai Kontak).", "Ketuk hiu saat melintas."], con: "banjir.shark()  |  banjir.bite()", demo: { label: "Uji terkaman hiu", run: () => window.banjir && window.banjir.bite() } },
    { g: "langit", ic: "🌪", t: "Angin Puting Beliung", tag: "Angin Kencang 2 menit", d: "Corong tornado menyedot SEMUA elemen halaman, memutarnya, lalu DUAR menghempaskannya dan semuanya jatuh kembali ke tempat asal.",
      how: ["Nyalakan Angin Kencang dan biarkan 2 menit terus-menerus (ganti cuaca = hitungan ulang).", "Setelah adegan, hitungan 2 menit mulai lagi (berulang)."], note: "Esc menghentikan adegan dan mengembalikan semuanya.", con: "puting.start()", demo: { label: "Mulai puting beliung", run: () => window.puting && window.puting.start() } },
    { g: "langit", ic: "⛺", t: "Pramuka: Salam & Persiapan Duduk", tag: "Mode Senja", d: "Lagu baru 'Hymne Pramuka', tunas kelapa di dasar Kontak, lalu adegan SALAM PRAMUKA dan PERSIAPAN DUDUK (bergantian).",
      how: ["Masuk mode SENJA (tahan tombol tema > Senja).", "Ketuk ID card 15x berturut-turut (jeda maks 3 dtk; mulai ketukan ke-6 terdengar 'tek').", "Lagu 'Hymne Pramuka' muncul di daftar musik; putar.", "Tunas kelapa muncul di paling bawah Kontak; ketuk. Ketukan ke-1 Salam Pramuka, ke-2 Persiapan Duduk, dst."], note: "Keluar dari Senja = lagu & tunas hilang lagi.", con: "pramuka.scene(1) / pramuka.scene(2)", demo: { label: "Putar adegan", run: () => window.pramuka && window.pramuka.scene() } },

    /* ---------------- BLEACH ---------------- */
    { g: "bleach", ic: "魂", t: "Buka kunci mode BLEACH", tag: "Pintu masuk", d: "Memunculkan tombol BLEACH di kanan bawah dengan menu karakter.",
      how: ["Cara 1: putar " + song(2, "Merry Christmas, Please don't call") + ", lalu ketuk tombol tema 10x cepat.", "Cara 2: ketik berurutan Ctrl + B L E A C H.", "Cara 3: Win / Cmd + Shift + = ."], note: "Tidak disimpan: muat ulang halaman = terkunci lagi. Setelah terbuka, pintasan yang sama membuka/menutup menu." },
    { g: "bleach", ic: "仮", t: "Shinji: Bankai & Sekai", tag: "Menu Bleach > Shinigami", d: "Tema Shinji, dan 'Sekai' dunia terbalik.",
      how: ["Tekan tombol BLEACH > Shinji Hirako.", "Tombol tema jadi pil Bankai / Sekai: ketuk untuk bergeser."] },
    { g: "bleach", ic: "藍", t: "Noren Mekuri (tirai langit)", tag: "Shinji mode Biasa", d: "Gumpalan warna-warni muncul, memanjang di dekat scrollbar. Ditarik, ia menjadi tirai bercahaya dan memperlihatkan Aizen.",
      how: ["Masuk mode Shinji Biasa (bukan Sekai).", "Tunggu 20–45 detik; gumpalan muncul (hilang sendiri setelah 25 dtk).", "Ketuk gumpalan.", "Tarik tali panjang ke kiri dari bagian mana saja, cukup jauh, lalu lepas."], con: "norenMekuri()" },
    { g: "bleach", ic: "惟", t: "Aizen: Biasa & Kyōka Suigetsu", tag: "Menu Bleach > Shinigami", d: "Tema Aizen (kupu-kupu), layar pecah saat adegan, dan ilusi Kyōka Suigetsu.",
      how: ["Tekan tombol BLEACH > Sōsuke Aizen.", "Tombol tema: Biasa / Kyōka."] },
    { g: "bleach", ic: "剤", t: "Zaraki: Nozarashi & Bankai", tag: "Menu Bleach > Shinigami", d: "Tema iblis merah-hitam dengan tebasan silang.",
      how: ["Tekan tombol BLEACH > Kenpachi Zaraki.", "Tombol tema: Nozarashi / Bankai."] },
    { g: "bleach", ic: "黒", t: "Ichigo: Bankai, Hollow, Chain", tag: "Menu Bleach > Shinigami", d: "Tiga wujud Ichigo dengan api reiatsu, bulan sabit, dan kursor khusus.",
      how: ["Tekan tombol BLEACH > Ichigo Kurosaki.", "Tombol tema: Bankai / Hollow / Chain (geser bergantian)."] },
    { g: "bleach", ic: "白", t: "White Ichigo (Shirosaki)", tag: "Rahasia di dalam rahasia", d: "Adegan 'Yo, King.' lalu tema kuning-putih. Topeng hitam mengembalikanmu ke Hollow.",
      how: ["Pilih Ichigo, lalu wujud HOLLOW.", "Putar " + song(10, "Your New Home") + ".", "Gulir ke paling bawah Kontak; muncul topeng kecil (ada bisikan 'Ada yang bergerak...').", "Tekan topeng."], note: "Ganti lagu / keluar Hollow = topeng hilang lagi.", con: "shiroIchigo.force(true)" },
    { g: "bleach", ic: "★", t: "Tombol Bleach & JJK bermaskot", tag: "Kanan bawah", d: "Tombol jajar genjang bercahaya dengan maskot chibi (Ichigo bertopeng, Gojo berikat mata), percikan roh/kutukan, miring 3D mengikuti kursor.",
      how: ["Setelah salah satu terbuka, arahkan kursor ke tombolnya.", "Ketuk untuk membuka menu karakter."] },

    /* ---------------- QUINCY & TINTA ---------------- */
    { g: "quincy", ic: "石", t: "Uryū Ishida: Quincy & Letzt Stil", tag: "Menu Bleach > tab Quincy", d: "Salib Quincy, hujan panah reishi, aksara bercahaya. Letzt Stil menambah sayap kristal dan gerhana.",
      how: ["Buka menu BLEACH, pindah ke tab QUINCY.", "Pilih Uryū Ishida.", "Tombol tema: Biasa / Letzt Stil.", "Panah reishi melintas di atas konten secara acak; ganti mode = rentetan panah."], con: "uryuArrows.fire()  |  uryuArrows.volley(5)" },
    { g: "quincy", ic: "墨", t: "Ichibē Hyōsube: Shikai & Bankai", tag: "Menu Bleach > Shinigami", d: "Tema lukisan tinta sumi: sapuan kuas, enso, segel hanko, cipratan saat klik.",
      how: ["Tekan tombol BLEACH > Ichibē Hyōsube (karakter ke-5, paling bawah).", "Tombol tema: Shikai / Bankai.", "Klik layar = cipratan tinta + sapuan kuas."] },
    { g: "quincy", ic: "✎", t: "Mode Lukis / Coret-coret", tag: "Ichibē aktif", d: "Kuas tinta sungguhan: tebal-tipis ikut kecepatan tangan, tinta menetes, dan lukisan ikut berganti gaya saat Shikai <-> Bankai.",
      how: ["Aktifkan Ichibē.", "Tekan tombol kuas bulat di kiri bawah.", "Pilih alat (kuas / pena), ukuran, urungkan, hapus, simpan PNG.", "Pintasan: Esc keluar, Ctrl+Z urungkan, [ ] atau roda mouse = ukuran."], note: "Lukisan hilang saat halaman dimuat ulang; simpan PNG dulu.", con: "ichibeInk.draw(true)  |  ichibeInk.save()" },
    { g: "quincy", ic: "蟻", t: "Ichibē di game alien: semut tinta", tag: "Game alien · Ichibē aktif", d: "Ichibē jadi pemain. Lempar Tinta mengubah alien jadi semut hitam yang jatuh dan tidak bisa menyerang, Tebas Kuas menebas garis panjang, Hujan Tinta menjatuhkan tetes ke seluruh layar. Bos tidak jadi semut, hanya terbungkus tinta (lambat & tidak bisa menembak).",
      how: ["Aktifkan Ichibē di menu Bleach (Shikai atau Bankai).", "Buka game alien lewat tombol game kanan bawah, lalu mulai.", "Tekan 5 untuk memanggil Ichibē (Shikai), tekan 5 lagi untuk Bankai tinta emas.", "Bidik dengan mouse: 3 = Lempar Tinta, 4 = Tebas Kuas, 6 = Hujan Tinta. Klik / J / F = tembakan tinta."], note: "Semut mati saat mendarat dan tetap dihitung kill. Bankai: area lebih luas, cooldown 40% lebih singkat, terima 70% damage." },

    /* ---------------- JUJUTSU KAISEN ---------------- */
    { g: "jjk", ic: "呪", t: "Buka kunci mode JJK", tag: "Pintu masuk", d: "Memunculkan tombol JJK (呪) di kanan bawah dengan menu Gojo & Sukuna.",
      how: ["Cara 1: putar " + song(3, "Merry Christmas, I miss you") + ", lalu ketuk ID card 15x berturut-turut (jeda maks 3 dtk; ketukan ke-6 dst terdengar 'tek').", "Cara 2: Win / Cmd + Shift + - .", "Cadangan: Ctrl + Alt + J."], note: "Setelah terbuka, kombinasi yang sama membuka/menutup menu. Tidak disimpan.", con: "jjk.unlock()" },
    { g: "jjk", ic: "無", t: "Gojo: Unlimited Void", tag: "Menu JJK > Satoru Gojo", d: "Tepukan tangan, Six Eyes terbuka, tulisan 無量空処, layar biru-ungu. Klik layar = bola Ao (biru) / Aka (merah) bergantian.",
      how: ["Tekan tombol JJK > Satoru Gojo.", "Tonton adegan (ketuk setelah ±7 dtk untuk lanjut).", "Klik layar 1x untuk efek Ao/Aka."], con: "jjk.scene(\"gojo\")", demo: { label: "Putar adegan Gojo", run: () => window.jjk && window.jjk.scene("gojo") } },
    { g: "jjk", ic: "巽", t: "Jurus Gojo: Biru, Merah, Hollow Purple", tag: "Mode Gojo", d: "Menu jurus di kursor. Biru menyedot elemen, Merah melempar & memecahnya, Hollow Purple menelan seluruh web jadi VOID hitam.",
      how: ["Di mode Gojo, KLIK KIRI 2x di bagian kosong layar (HP: ketuk 2x).", "Pilih Biru / Merah / Hollow Purple. Pintasan: 1 / B, 2 / R, 3 / P.", "Di void: ketuk atau Esc (setelah 1 detik) untuk kembali."], note: "Tombol, tautan, kolom isian, dan ID card tidak memunculkan menu.", con: "gojoSkills.blue(x,y) | .red(x,y) | .purple(x,y)" },
    { g: "jjk", ic: "目", t: "Six Eyes (penutup mata)", tag: "Mode Gojo Biasa", d: "Penutup mata hitam ditarik, mata Six Eyes terbuka, kamera masuk ke dalam iris. Tema biru langit dengan iris raksasa & HUD analisis.",
      how: ["Aktifkan Gojo (Biasa).", "Gulir ke paling bawah bagian KONTAK: ada penutup mata kecil yang berkilau biru.", "Tekan. Tekan lagi ('Pasang penutup mata') untuk keluar."], con: "gojoTheme.six() | gojoTheme.unsix()" },
    { g: "jjk", ic: "領", t: "Domain Expansion (tangan Gojo)", tag: "Mode Gojo > Domain", d: "Jari menyilang, lubang hitam membuka, 領域展開 無量空処. Di Domain tangan Gojo melayang di latar dan jurus jadi versi MAKSIMUM.",
      how: ["Aktifkan Gojo.", "Ketuk tombol tema > Domain.", "Klik 2x untuk jurus: Biru/Merah/Hollow Purple Maksimum.", "Tombol tema > Biasa untuk keluar."], note: "Biru Maksimum punya cakram akresi, Merah Maksimum ada Black Flash, Hollow Purple Maksimum ada sinar ungu & aksara 茈.", con: "gojoTheme.domain() | gojoTheme.collapse()" },
    { g: "jjk", ic: "宿", t: "Sukuna: Raja Kutukan (Biasa)", tag: "Menu JJK > Ryomen Sukuna", d: "Tema hitam-merah darah: kabut kutukan, pita asap, bara naik, tebasan Dismantle melintas acak (kadang dekat kursor), aksara 両面宿儺 samar. Klik = Dismantle (tebasan silang), tiap klik ke-3 = Cleave sepanjang layar.",
      how: ["Tekan tombol JJK > Ryomen Sukuna.", "Tonton adegan 6 tebasan (ketuk setelah ±1 dtk untuk lanjut).", "Klik layar untuk Dismantle; klik ke-3 = Cleave."], con: "jjk.scene(\"sukuna\")  |  sukunaTheme.biasa()", demo: { label: "Putar adegan Sukuna", run: () => window.jjk && window.jjk.scene("sukuna") } },
    { g: "jjk", ic: "平", t: "Sukuna: Heian (4 mata + Fūga)", tag: "Mode Sukuna > Heian", d: "Wujud era Heian: 4 mata merah raksasa yang berkedip dan menatap kursor, tanda wajah, dinding api di dasar layar, bara jingga. Klik = FŪGA 開: panah api melesat dari tepi layar, menancap, meledak.",
      how: ["Aktifkan Sukuna.", "Ketuk segmen \"Heian\" di tombol tema.", "Klik layar untuk melepas Fūga.", "Segmen Biasa / Domain untuk pindah mode."], note: "Adegan: 4 mata terbuka, api menyala, busur api ditarik lalu dilepas.", con: "sukunaTheme.heian()", demo: { label: "Putar adegan Heian", run: () => window.sukunaTheme && window.sukunaTheme.heian && (window.sukunaTheme.mode === "off" ? window.jjk.scene("sukuna") : window.sukunaTheme.heian()) } },
    { g: "jjk", ic: "厨", t: "Sukuna: Domain Malevolent Shrine", tag: "Mode Sukuna > Domain", d: "Langit merah, lautan darah, kuil bertengkorak lembu & tulang rusuk menjulang dengan pantulan, tengkorak mengambang, badai tebasan tanpa henti (sure-hit). Klik = badai Dismantle + riak air, tiap klik ke-4 = tebasan penuh layar.",
      how: ["Aktifkan Sukuna.", "Ketuk segmen \"Domain\" di tombol tema.", "Klik layar untuk badai tebasan.", "Segmen Biasa untuk keluar (satu tebasan menutup domain)."], note: "Adegan: tepuk tangan, lautan darah menyebar, kuil naik, DUAR, badai tebasan, 伏魔御廚子.", con: "sukunaTheme.domain()", demo: { label: "Putar adegan Domain", run: () => window.sukunaTheme && window.sukunaTheme.domain && (window.sukunaTheme.mode === "off" ? window.jjk.scene("sukuna") : window.sukunaTheme.domain()) } },

    /* ---------------- KODE & PINTASAN ---------------- */
    { g: "kode", ic: "👾", t: "Kode Arcade → Mode Hacker", tag: "Rahasia keyboard / HP", d: "Layar CRT menyala, hujan kode hijau, terminal mengetik sendiri, KODE DITERIMA, lalu seluruh web berubah jadi Mode Hacker hijau: kode mengalir di latar belakang dan ada terminal samping tempat kamu mengetik sembarang untuk memunculkan kode ala hacker.",
      how: ["Di keyboard (di luar kolom isian, game alien tertutup), tekan berurutan: ↑ ↑ ↓ ↓ ← → ← → lalu ENTER.", "Di HP: gesek layar berurutan atas, atas, bawah, bawah, kiri, kanan, kiri, kanan, lalu ketuk 1x.", "Tonton ±5 detik (Esc = langsung lompat ke mode hacker): kode diterima dan web berubah jadi MODE HACKER hijau dengan aliran kode di latar.", "Di mode hacker, ketik APA SAJA di keyboard (HP: ketuk panel terminal di samping) dan muncul kode hacker palsu. Enter = ledakan kode. Isi bar FIREWALL sampai 100% untuk ROOT ACCESS GRANTED.", "Keluar: tombol ✕ di panel terminal, atau ulangi kode atas-atas-bawah-bawah-kiri-kanan-kiri-kanan-Enter."], note: "Jeda antar tombol maksimal 4 detik. Semua kode di panel hanya hiasan, tidak menjalankan apa pun. Tidak disimpan: muat ulang = kembali normal.", con: "hackerMode.on()  |  hackerMode.off()", con: "konamiEgg.play()  |  konamiEgg.close()", demo: { label: "Mainkan sekarang", run: () => window.konamiEgg && window.konamiEgg.play() } },
    { g: "langit", ic: "🎆", t: "Malam Kembang Api (Hanabi)", tag: "Rahasia keyboard / HP", d: "Malam bertabur bintang dengan bulan, lentera langit, torii, dan pertunjukan kembang api penuh suara. Puncaknya kembang api membentuk tulisan, lalu kamu boleh menembakkan sendiri.",
      how: ["Di keyboard (di luar kolom isian, game alien tertutup), ketik kata: h a n a b i  (jeda antar huruf maks 2,5 detik).", "Di HP: tahan DUA jari di bagian kosong layar sekitar 1,4 detik tanpa digeser.", "Ketuk langit untuk menembakkan kembang api sendiri. Esc / tombol ✕ untuk keluar."], note: "Puncak pertunjukan sekitar detik ke-15, kartu ucapan muncul sekitar detik ke-30. Tutup otomatis setelah 2 menit tanpa ketukan.", con: "hanabiEgg.play()  |  hanabiEgg.shoot(x, y)  |  hanabiEgg.close()", demo: { label: "Mulai pertunjukan", run: () => window.hanabiEgg && window.hanabiEgg.play() } },
    { g: "kode", ic: "⌨", t: "Tabel pintasan keyboard", tag: "Ringkasan", d: "Semua kombinasi tombol yang ada di situs.",
      how: ["Ctrl + B L E A C H  (berurutan) = buka kunci / menu Bleach.", "Win/Cmd + Shift + =  = buka kunci / menu Bleach.", "Win/Cmd + Shift + -  = buka kunci / menu JJK  (cadangan Ctrl + Alt + J).", "Ctrl + Alt + H  = panduan ini.", "↑ ↑ ↓ ↓ ← → ← → Enter  = Mode Hacker (ulangi = keluar).", "Ketik h a n a b i  = Malam Kembang Api.", "Mode Gojo: 1 / B, 2 / R, 3 / P = jurus.", "Mode Lukis: Esc, Ctrl+Z, [ ], roda mouse.", "Game alien: 5 = ganti wujud karakter, 3 / 4 / 6 = skill, klik / J / F = serang.", "Esc = tutup adegan / menu."] },
    { g: "kode", ic: "⚒", t: "Perintah Console (F12)", tag: "Untuk menguji", d: "Hampir semua easter egg bisa dipanggil langsung dari Console browser.",
      how: ["elangRaja()  ·  norenMekuri()", "petir.strike()  ·  puting.start()", "banjir.fire() / flood() / drain() / shark() / bite()", "pramuka.unlock() / scene(1|2)  ·  shiroIchigo.force(true)", "jjk.unlock() / scene(\"gojo\"|\"sukuna\")  ·  sukunaTheme.heian() / domain() / biasa()", "gojoTheme.six() / domain() / collapse()", "gojoSkills.menu() / blue() / red() / purple()", "ichibeInk.draw(true) / save()  ·  uryuArrows.fire()", "konamiEgg.play()  ·  hanabiEgg.play() / shoot(x,y)  ·  hackerMode.on() / off()"], note: "Uji cepat tanpa menunggu: petir.CFG.chance = 2 · puting.CFG.after = 5 · banjir.CFG.seconds = 5." },
    { g: "kode", ic: "↻", t: "Tidak disimpan", tag: "Penting", d: "Semua easter egg sengaja tidak disimpan. Muat ulang halaman = semuanya terkunci lagi dan harus dicari dari awal.",
      how: ["Hanya hitungan penemuan Elang yang tersimpan di browser."] }
  ];

  /* --------------------------------------------------------------- helper --------------------------------------------------------------- */
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let ac = null;
  function blip(f1, f2, dur, vol) {
    if (!CFG.sound || (window.tapSound && window.tapSound.on === false)) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      ac = ac || new AC(); if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
      o.type = "sine"; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (_) {}
  }

  /* ----------------------------------------------------------------- DOM ----------------------------------------------------------------- */
  let host, fab, ov, panel, listEl, searchEl, countEl, toastEl;
  let isOpen = false, curGroup = "all", query = "", lastFocus = null;

  function build() {
    host = el("div", "gd-host");
    host.setAttribute("data-gd", "");
    fab = el("button", "gd-fab",
      '<span class="gd-fab-ring" aria-hidden="true"></span>' +
      '<svg class="gd-fab-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.2c2.9-.9 5.6-.7 8 1v13.3c-2.4-1.7-5.1-1.9-8-1z"/><path d="M20 5.2c-2.9-.9-5.6-.7-8 1v13.3c2.4-1.7 5.1-1.9 8-1z"/><path class="gd-star" d="M12 .9l.9 2.1 2.1.9-2.1.9L12 6.9l-.9-2.1L9 3.9l2.1-.9z"/></svg>' +
      '<span class="gd-fab-tip">Arsip Rahasia</span>');
    fab.type = "button";
    fab.setAttribute("aria-label", "Buka panduan fitur dan easter egg");
    fab.setAttribute("aria-haspopup", "dialog");
    fab.dataset.gdAct = "toggle";

    ov = el("div", "gd-ov");
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Panduan fitur dan easter egg");
    ov.hidden = true;
    ov.innerHTML =
      '<div class="gd-bg" data-gd-act="close"></div>' +
      '<section class="gd-panel" tabindex="-1">' +
        '<header class="gd-head">' +
          '<div class="gd-title"><span class="gd-seal" aria-hidden="true">秘</span><div><h2>Arsip Rahasia</h2><p>Panduan semua fitur &amp; easter egg</p></div></div>' +
          '<button type="button" class="gd-x" data-gd-act="close" aria-label="Tutup panduan">✕</button>' +
        '</header>' +
        '<div class="gd-tools">' +
          '<label class="gd-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/></svg><input type="search" class="gd-q" placeholder="Cari fitur, lagu, tombol..." autocomplete="off" spellcheck="false"></label>' +
          '<span class="gd-count" aria-live="polite"></span>' +
        '</div>' +
        '<nav class="gd-tabs" aria-label="Golongan"></nav>' +
        '<div class="gd-warn">⚠ Spoiler: cara akses dikaburkan. Ketuk kartu untuk membukanya.</div>' +
        '<div class="gd-list" role="list"></div>' +
        '<footer class="gd-foot"><span>Esc = tutup</span><span>Ctrl + Alt + H = buka panduan</span><span>Semua easter egg tidak disimpan; muat ulang = terkunci lagi</span></footer>' +
      '</section>';
    toastEl = el("div", "gd-toast"); toastEl.setAttribute("role", "status");
    host.append(fab, ov, toastEl);
    document.body.appendChild(host);

    panel = ov.querySelector(".gd-panel");
    listEl = ov.querySelector(".gd-list");
    searchEl = ov.querySelector(".gd-q");
    countEl = ov.querySelector(".gd-count");
    const tabs = ov.querySelector(".gd-tabs");
    tabs.innerHTML = '<button type="button" class="gd-tab is-on" data-gd-act="tab" data-g="all" style="--c:#fff">Semua</button>' +
      GROUPS.map(g => '<button type="button" class="gd-tab" data-gd-act="tab" data-g="' + g.id + '" style="--c:' + g.c + '">' + esc(g.n) + '</button>').join("");
    if (!CFG.spoiler) ov.querySelector(".gd-warn").hidden = true;
    renderList();
    syncFab();
  }

  function cardHTML(it, i) {
    const grp = GROUPS.find(g => g.id === it.g) || GROUPS[0];
    const steps = it.how.map(s => "<li>" + esc(s) + "</li>").join("");
    return '<article class="gd-card' + (CFG.spoiler ? "" : " is-open") + '" role="listitem" style="--c:' + grp.c + '" data-i="' + i + '">' +
      '<button type="button" class="gd-card-top" data-gd-act="card" aria-expanded="' + (!CFG.spoiler) + '">' +
        '<span class="gd-ic" aria-hidden="true">' + it.ic + '</span>' +
        '<span class="gd-ct"><b>' + esc(it.t) + '</b><em>' + esc(it.tag) + '</em></span>' +
        '<i class="gd-chev" aria-hidden="true"></i>' +
      '</button>' +
      '<p class="gd-desc">' + esc(it.d) + '</p>' +
      '<div class="gd-how"><div class="gd-how-in">' +
        '<h4>Cara akses</h4><ol>' + steps + '</ol>' +
        (it.note ? '<p class="gd-note">' + esc(it.note) + '</p>' : "") +
        (it.con ? '<p class="gd-con"><span>Console</span><code>' + esc(it.con) + '</code></p>' : "") +
        (CFG.demo && it.demo ? '<button type="button" class="gd-demo" data-gd-act="demo" data-i="' + i + '">▶ ' + esc(it.demo.label) + '</button>' : "") +
      '</div></div>' +
      (CFG.spoiler ? '<span class="gd-veil" aria-hidden="true">Ketuk untuk membuka rahasia</span>' : "") +
    '</article>';
  }

  function match(it) {
    if (curGroup !== "all" && it.g !== curGroup) return false;
    if (!query) return true;
    const hay = (it.t + " " + it.tag + " " + it.d + " " + it.how.join(" ") + " " + (it.note || "") + " " + (it.con || "")).toLowerCase();
    return query.split(/\s+/).every(w => hay.indexOf(w) >= 0);
  }

  function renderList() {
    const rows = [];
    let n = 0, lastG = "";
    ITEMS.forEach((it, i) => {
      if (!match(it)) return;
      n++;
      if (curGroup === "all" && it.g !== lastG) {
        lastG = it.g;
        const grp = GROUPS.find(g => g.id === it.g);
        rows.push('<h3 class="gd-gh" style="--c:' + grp.c + '"><i></i>' + esc(grp.n) + '</h3>');
      }
      rows.push(cardHTML(it, i));
    });
    listEl.innerHTML = rows.length ? rows.join("") : '<p class="gd-empty">Tidak ada yang cocok. Coba kata lain, misalnya “lagu”, “hujan”, atau “Gojo”.</p>';
    countEl.textContent = n + " / " + ITEMS.length;
  }

  function syncFab() {
    host.classList.toggle("gd-hidden", !CFG.show);
    fab.setAttribute("aria-expanded", String(isOpen));
  }

  function showToast(msg) {
    toastEl.textContent = msg; toastEl.classList.add("is-on");
    clearTimeout(showToast.t); showToast.t = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  function open() {
    if (isOpen) return;
    isOpen = true; lastFocus = document.activeElement;
    ov.hidden = false; host.classList.add("is-open");
    void ov.offsetWidth; ov.classList.add("is-on");
    syncFab(); blip(420, 880, 0.22, 0.05);
    setTimeout(() => panel.focus({ preventScroll: true }), 30);
  }
  function close(silent) {
    if (!isOpen) return;
    isOpen = false; ov.classList.remove("is-on"); host.classList.remove("is-open");
    syncFab(); if (!silent) blip(700, 300, 0.18, 0.04);
    setTimeout(() => { if (!isOpen) ov.hidden = true; }, REDUCE ? 0 : 260);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (_) {}
  }

  /* ------------------------------------------------------- aksi (satu pintu, fase capture) -------------------------------------------------------
     Semua kejadian yang berasal dari dalam panduan dihentikan di sini supaya efek klik situs (kursor, bunyi ketuk, menu jurus Gojo, dll) tidak ikut jalan.   */
  function act(a, node) {
    if (a === "toggle") { isOpen ? close() : open(); }
    else if (a === "close") close();
    else if (a === "tab") {
      curGroup = node.dataset.g;
      ov.querySelectorAll(".gd-tab").forEach(b => b.classList.toggle("is-on", b === node));
      renderList(); listEl.scrollTop = 0; blip(520, 640, 0.08, 0.03);
    } else if (a === "card") {
      const card = node.closest(".gd-card"), on = !card.classList.contains("is-open");
      card.classList.toggle("is-open", on); node.setAttribute("aria-expanded", String(on));
      blip(on ? 600 : 420, on ? 900 : 300, 0.12, 0.035);
    } else if (a === "demo") {
      const it = ITEMS[+node.dataset.i];
      if (!it || !it.demo) return;
      close(true);
      setTimeout(() => {
        let r; try { r = it.demo.run(); } catch (e) { r = "Gagal menjalankan: " + e.message; }
        if (typeof r === "string") showToast(r);
      }, REDUCE ? 0 : 320);
    }
  }
  const inside = t => !!(t && t.closest && t.closest("[data-gd]"));
  ["pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend", "dblclick", "contextmenu"].forEach(ev =>
    window.addEventListener(ev, e => { if (inside(e.target)) e.stopPropagation(); }, true));
  window.addEventListener("click", e => {
    if (!inside(e.target)) return;
    e.stopPropagation();
    const n = e.target.closest("[data-gd-act]");
    if (n) act(n.dataset.gdAct, n);
  }, true);
  window.addEventListener("input", e => {
    if (e.target === searchEl) { query = searchEl.value.trim().toLowerCase(); renderList(); e.stopPropagation(); }
  }, true);
  window.addEventListener("keydown", e => {
    const typing = !!e.target && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
    if (CFG.hotkey && e.ctrlKey && e.altKey && !e.metaKey && !e.shiftKey && e.code === "KeyH") { e.preventDefault(); e.stopPropagation(); isOpen ? close() : open(); return; }
    if (!isOpen) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === "Tab") {      // fokus tetap di dalam panel
      const f = [...panel.querySelectorAll("button,input")].filter(n => n.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      return;
    }
    if (typing || inside(e.target)) e.stopPropagation();   // ketikan di kolom cari tidak memicu pintasan situs
  }, true);

  function init() {
    if (document.querySelector(".gd-host")) return;
    build();
  }
  if (document.body) init(); else document.addEventListener("DOMContentLoaded", init);

  window.panduan = {
    CFG,
    open() { open(); return "Panduan dibuka."; },
    close() { close(); return "Panduan ditutup."; },
    toggle() { isOpen ? close() : open(); },
    hide() { CFG.show = false; if (host) syncFab(); return "Tombol disembunyikan (Ctrl+Alt+H tetap bisa)."; },
    show() { CFG.show = true; if (host) syncFab(); return "Tombol ditampilkan."; },
    get items() { return ITEMS.length; }
  };
})();


/* ==========================================================================
   PEMBARUAN 57: EASTER EGG "SOFI"  (pengganti "Faqihhhh" dari PEMBARUAN 56)
   Pemicu : sama dengan Elang Raja (mode Terang, bukan karakter Bleach).
   Alur   : Sofi mengintip dari bawah layar sambil memegang kamera -> LAYAR PENUH BUNGA (bunga menyembur keluar,
            taman bunga tumbuh dari dasar layar, bunga mekar acak, kelopak berjatuhan) -> hanya kalau DIKETUK baru
            easter egg-nya keluar: kilat kamera + "cekrek", fokus kamera mengunci, foto meledak ke tengah,
            tulisan "Faqihhhhhh!" huruf demi huruf + suara, hujan bunga & hati, lalu pesan.
            Ketuk layar / tombol X / Esc untuk menutup.
   File   : images/sofi.png (foto transparan)  |  music/sofi.mp3 (ISI DENGAN SUARANYA; kalau belum ada, dicoba music/faqih.mp3)
   Pintasan: Ctrl + S O P I (tahan Ctrl, tekan S, O, P, I berurutan) membuka / menutup adegannya langsung.
   Console: sofiEgg.peek() mengintip | sofiEgg.show() langsung meledak | sofiEgg.close() | sofiEgg.CFG
   ========================================================================== */
(function sofiEgg() {
  "use strict";
  const root = document.documentElement;
  const TAU = Math.PI * 2;
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = {
    photo: "images/sofi.png",
    sound: ["music/sofi.mp3", "music/faqih.mp3"],   // dicoba berurutan; kalau dua-duanya tidak ada -> fanfare buatan kode
    volume: 1,
    shout: "Faqihhhhhh!",
    kicker: "✿ EASTER EGG SOFI ✿",
    bubble: "Faqihhh~ ketuk aku 🌸",
    message: ["Ini Easter Egg Sofiaa 🌸", "Orang yang selalu menyemangatiku dengan memanggil “Faqihhhhhhhh!”", "Terima kasih, ya. 💙"],
    first: [90, 150],        // detik: muncul pertama setelah mode Terang aktif
    every: [240, 480],       // detik: jeda berikutnya
    stay: 14,                // detik: mengintip sebelum sembunyi lagi
    duck: true,              // lagu latar mengecil saat suaranya diputar
    flowers: 1               // pengali kepadatan bunga (0.5 = setengah, 2 = dua kali)
  };
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const eo = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
  const elastic = u => { u = clamp(u, 0, 1); return u === 0 || u === 1 ? u : Math.pow(2, -9 * u) * Math.sin((u * 10 - 0.75) * (TAU / 3)) + 1; };
  const lightOn = () => root.dataset.theme === "light" && !root.dataset.bleach;   // sama dengan Elang Raja
  const sndOK = () => !(window.tapSound && window.tapSound.on === false);
  let peekEl = null, peekTimer = 0, entranceT = 0, overlay = null, voice = null, ac = null, beepT = 0, countdown = rand(CFG.first[0], CFG.first[1]);

  /* ======================================================================
     SUARA (Web Audio buatan kode): cekrek, bip fokus, kerlip bunga, fanfare cadangan
     ====================================================================== */
  function audio() {
    if (!sndOK()) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = ac || new AC();
      if (ac.state === "suspended") ac.resume();
      return ac;
    } catch (_) { return null; }
  }
  function blip(fr, t0, dur, vol, type) {
    const a = ac; if (!a) return;
    try {
      const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
      o.type = type || "sine"; o.frequency.value = fr;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (_) { /* audio tidak tersedia */ }
  }
  function shutter() {
    const a = audio(); if (!a) return;
    try {
      const n = Math.floor(a.sampleRate * 0.2), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3) * (i % 1100 < 380 ? 1 : 0.35);
      const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
      f.type = "highpass"; f.frequency.value = 1300; g.gain.value = 0.55;
      s.buffer = buf; s.connect(f); f.connect(g); g.connect(a.destination); s.start();
    } catch (_) { /* audio tidak tersedia */ }
  }
  function focusBeep() { if (!audio()) return; blip(1760, 0, 0.07, 0.09, "square"); blip(2349, 0.11, 0.1, 0.09, "square"); }
  function twinkle() { if (!audio()) return; [784, 988, 1175, 1568, 1976].forEach((f, i) => blip(f, i * 0.07, 0.5, 0.04, "sine")); }
  function fanfare() { if (!audio()) return; [523.3, 659.3, 784, 1046.5].forEach((f, i) => blip(f, i * 0.09, 0.8, 0.14, "triangle")); }
  function duck(on) { if (CFG.duck && window.siteMusic && window.siteMusic.duck) { try { window.siteMusic.duck(on); } catch (_) {} } }
  function playVoice() {
    stopVoice();
    if (!sndOK()) return;
    const list = (Array.isArray(CFG.sound) ? CFG.sound : [CFG.sound]).slice();
    duck(true);
    const tryNext = () => {
      const src = list.shift();
      if (!src) { fanfare(); duck(false); return; }
      try {
        const v = new Audio(src); voice = v; v.volume = CFG.volume;
        let heard = false, moved = false;
        const next = () => { if (moved || heard || voice !== v) return; moved = true; tryNext(); };
        v.addEventListener("playing", () => { heard = true; });
        v.addEventListener("error", next);
        v.addEventListener("ended", () => duck(false));
        const p = v.play(); if (p && p.catch) p.catch(next);
      } catch (_) { tryNext(); }
    };
    tryNext();
  }
  function stopVoice() { if (voice) { try { voice.pause(); } catch (_) {} voice = null; } duck(false); }

  /* ======================================================================
     MESIN BUNGA: sprite digambar sendiri di kanvas (tidak butuh gambar / emoji), satu kanvas layar penuh
       - taman : bunga bertangkai tumbuh dari dasar layar, bergoyang
       - mekar : bunga muncul acak di layar (membesar memantul, lalu memudar)
       - jatuh : bunga, kelopak (dan hati saat ledakan) berjatuhan sambil meliuk
     Mode: off | peek (Sofi mengintip) | burst (setelah diketuk) | fade (menghilang pelan, lalu kanvas dibuang)
     ====================================================================== */
  let SP = null, cv = null, cx = null, W = 0, H = 0, dpr = 1, U = 1, raf = 0, last = 0, tNow = 0, mode = "off", level = 0, spawnF = 0, spawnB = 0;
  let fall = [], bloom = [], garden = [];

  function mkCanvas(size, fn) {
    const c = document.createElement("canvas"); c.width = c.height = size;
    const x = c.getContext("2d"); x.translate(size / 2, size / 2); fn(x, size / 2); return c;
  }
  function petalPath(x, k, L) {
    x.beginPath();
    if (k === "round") x.ellipse(0, -L * 0.58, L * 0.34, L * 0.46, 0, 0, TAU);
    else if (k === "daisy") x.ellipse(0, -L * 0.62, L * 0.11, L * 0.4, 0, 0, TAU);
    else if (k === "sun") { x.moveTo(0, -L * 0.12); x.quadraticCurveTo(L * 0.2, -L * 0.55, 0, -L); x.quadraticCurveTo(-L * 0.2, -L * 0.55, 0, -L * 0.12); }
    else {   // sakura: kelopak berlekuk di ujung
      const w = L * 0.4; x.moveTo(0, -L * 0.08);
      x.bezierCurveTo(-w * 1.25, -L * 0.3, -w * 1.05, -L * 0.97, -w * 0.22, -L); x.lineTo(0, -L * 0.86); x.lineTo(w * 0.22, -L);
      x.bezierCurveTo(w * 1.05, -L * 0.97, w * 1.25, -L * 0.3, 0, -L * 0.08);
    }
    x.closePath();
  }
  function flowerSprite(o) {
    return mkCanvas(128, (x, R) => {
      const L = R * 0.95, layers = o.layers || 1;
      for (let layer = 0; layer < layers; layer++) {
        const sc = layer ? 0.7 : 1, off = layer ? Math.PI / o.n : 0;
        for (let i = 0; i < o.n; i++) {
          x.save(); x.rotate(i / o.n * TAU + off); x.scale(sc, sc);
          const g = x.createLinearGradient(0, -L * 0.05, 0, -L); g.addColorStop(0, o.p[1]); g.addColorStop(1, o.p[0]);
          petalPath(x, o.k, L); x.fillStyle = g; x.fill();
          x.lineWidth = 1.1; x.strokeStyle = "rgba(120,40,70,.28)"; x.stroke(); x.restore();
        }
      }
      const cr = R * o.cr, g = x.createRadialGradient(-cr * 0.3, -cr * 0.3, cr * 0.1, 0, 0, cr);
      g.addColorStop(0, o.c[0]); g.addColorStop(1, o.c[1]); x.fillStyle = g; x.beginPath(); x.arc(0, 0, cr, 0, TAU); x.fill();
      if (o.dots) { x.fillStyle = "rgba(90,50,10,.55)"; for (let i = 0; i < o.dots; i++) { const a = i / o.dots * TAU; x.beginPath(); x.arc(Math.cos(a) * cr * 0.62, Math.sin(a) * cr * 0.62, cr * 0.1, 0, TAU); x.fill(); } }
    });
  }
  function petalSprite(c0, c1) {
    return mkCanvas(64, (x, R) => {
      const g = x.createLinearGradient(0, -R, 0, R); g.addColorStop(0, c0); g.addColorStop(1, c1);
      x.rotate(-0.3); x.beginPath(); x.moveTo(0, -R * 0.9); x.bezierCurveTo(R * 0.9, -R * 0.4, R * 0.6, R * 0.8, 0, R * 0.85); x.bezierCurveTo(-R * 0.6, R * 0.8, -R * 0.9, -R * 0.4, 0, -R * 0.9);
      x.fillStyle = g; x.fill(); x.lineWidth = 1; x.strokeStyle = "rgba(120,40,70,.25)"; x.stroke();
    });
  }
  function buildSprites() {
    if (SP) return SP;
    const specs = [
      { k: "sakura", n: 5, p: ["#fff4f8", "#ff9ec0"], c: ["#ffe29a", "#e8a317"], cr: 0.13, dots: 5 },
      { k: "daisy", n: 14, p: ["#ffffff", "#dbe6ff"], c: ["#ffd84d", "#e59a00"], cr: 0.22 },
      { k: "round", n: 5, layers: 2, p: ["#ffc2d6", "#ff5c8a"], c: ["#fff1a8", "#ffb000"], cr: 0.12, dots: 6 },
      { k: "round", n: 6, p: ["#f1e8ff", "#a98bff"], c: ["#ffffff", "#ffd166"], cr: 0.12 },
      { k: "sun", n: 16, p: ["#fff07a", "#ffb300"], c: ["#8a5522", "#3d2209"], cr: 0.3, dots: 9 },
      { k: "sakura", n: 5, p: ["#ffe9db", "#ff9a76"], c: ["#fff0a0", "#ffb000"], cr: 0.12, dots: 5 },
      { k: "round", n: 5, p: ["#e3f3ff", "#6cb8ff"], c: ["#fff6b0", "#ffc107"], cr: 0.14 }
    ];
    SP = {
      flowers: specs.map(flowerSprite),
      petals: [petalSprite("#fff0f6", "#ff9ec0"), petalSprite("#ffffff", "#ffd2e4"), petalSprite("#ffe3ee", "#ff6f9c")],
      heart: mkCanvas(64, (x, R) => {
        const g = x.createLinearGradient(0, -R, 0, R); g.addColorStop(0, "#ffb3cb"); g.addColorStop(1, "#ff3d78");
        x.beginPath(); x.moveTo(0, R * 0.72); x.bezierCurveTo(-R * 1.15, -R * 0.1, -R * 0.6, -R * 0.98, 0, -R * 0.36); x.bezierCurveTo(R * 0.6, -R * 0.98, R * 1.15, -R * 0.1, 0, R * 0.72);
        x.fillStyle = g; x.fill(); x.lineWidth = 1; x.strokeStyle = "rgba(150,20,60,.3)"; x.stroke();
      })
    };
    return SP;
  }

  function ensureCv() {
    if (cv && cv.isConnected) return;
    cv = document.createElement("canvas"); cv.className = "sfe-cv"; cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv); cx = cv.getContext("2d"); sizeCv();
  }
  function sizeCv() {
    if (!cv) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    U = clamp(Math.min(W, H) / 760, 0.62, 1.15);
  }
  function buildGarden() {
    const n = Math.ceil(W / (W < 600 ? 62 : 78)); garden = [];
    for (let i = 0; i < n; i++) {
      garden.push({
        x: (i + rand(0.1, 0.9)) * W / n, h: rand(0.05, 0.2) * H, s: rand(34, 66) * U, img: SP.flowers[(Math.random() * SP.flowers.length) | 0],
        f: rand(0.5, 1.1), ph: rand(0, TAU), amp: rand(5, 14), bend: rand(-14, 14), g: 0, delay: rand(0, 1.4) + Math.abs(i / n - 0.5) * 0.5, leaf: Math.random() < 0.75
      });
    }
  }
  function sprite(img, x, y, s, rot, a) {
    if (s < 1 || a <= 0.01) return;
    cx.save(); cx.globalAlpha = a; cx.translate(x, y); cx.rotate(rot); cx.drawImage(img, -s / 2, -s / 2, s, s); cx.restore();
  }
  function addFall(x, y, vx, vy) {
    const r = Math.random(); let img, s;
    if (mode === "burst" && r < 0.16) { img = SP.heart; s = rand(18, 34) * U; }
    else if (r < 0.5) { img = SP.petals[(Math.random() * SP.petals.length) | 0]; s = rand(16, 30) * U; }
    else { img = SP.flowers[(Math.random() * SP.flowers.length) | 0]; s = rand(26, 58) * U; }
    fall.push({ img, x, y, vx, vy, fy: rand(48, 112), s, rot: rand(0, TAU), vr: reduce ? 0 : rand(-1.6, 1.6), sw: rand(14, 46) * U, sf: rand(0.7, 1.6), sp: rand(0, TAU), a: rand(0.82, 1) });
  }
  function addBloom() {
    bloom.push({ img: SP.flowers[(Math.random() * SP.flowers.length) | 0], x: rand(0.04, 0.96) * W, y: rand(0.06, 0.9) * H, s: rand(44, 96) * U, t: 0, d: rand(2.6, 4.6), r: rand(-0.5, 0.5), vr: reduce ? 0 : rand(-0.25, 0.25) });
  }
  function entrance(x, y) {   // bunga menyembur dari tempat Sofi muncul
    if (!SP || mode === "off") return;
    for (let i = 0, n = reduce ? 10 : 30; i < n; i++) addFall(x + rand(-30, 30), y, rand(-420, 420), -rand(380, 920));
    for (let i = 0; i < (reduce ? 3 : 9); i++) addBloom();
  }
  function burstShots() {   // ledakan bunga & hati dari tengah layar
    for (let i = 0, n = reduce ? 28 : 110; i < n; i++) { const a = rand(0, TAU), v = rand(300, 1100); addFall(W / 2, H * 0.56, Math.cos(a) * v, Math.sin(a) * v - 250); }
  }

  function frame(ts) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts; tNow += dt;
    cx.clearRect(0, 0, W, H);
    const dens = CFG.flowers * (reduce ? 0.35 : 1), fading = mode === "fade", tl = (mode === "peek" ? 1 : mode === "burst" ? 1.9 : 0);
    level += (tl - level) * Math.min(1, dt * 2);
    const capF = Math.round((W < 600 ? 42 : 72) * dens * (mode === "burst" ? 1.5 : 1)), capB = Math.round(26 * dens);
    spawnF += dt * 13 * level * dens; while (spawnF >= 1) { spawnF -= 1; if (fall.length < capF) addFall(rand(-0.05, 1.05) * W, -60, rand(-18, 18), rand(48, 112)); }
    spawnB += dt * 4.5 * level * dens; while (spawnB >= 1) { spawnB -= 1; if (bloom.length < capB) addBloom(); }

    // ----- taman di dasar layar -----
    const gt = (mode === "peek" ? 1 : mode === "burst" ? 0.42 : 0);
    cx.save(); cx.shadowColor = "rgba(90,30,70,.25)"; cx.shadowBlur = 6; cx.lineCap = "round";
    for (const p of garden) {
      if (p.delay > 0 && gt) { p.delay -= dt; continue; }
      p.g += (gt - p.g) * Math.min(1, dt * (gt ? 1.8 : 2.6));
      const g = p.g; if (g < 0.012) continue;
      const hh = p.h * g, sway = Math.sin(tNow * p.f + p.ph) * p.amp * g, hx = p.x + sway, hy = H + 2 - hh, qx = p.x + sway * 0.15 + p.bend, qy = H - hh * 0.5;
      cx.strokeStyle = "#4caf6a"; cx.lineWidth = 2.4 + 1.6 * U; cx.beginPath(); cx.moveTo(p.x, H + 4); cx.quadraticCurveTo(qx, qy, hx, hy); cx.stroke();
      if (p.leaf) {
        for (const t of [0.42, 0.68]) {
          const m = 1 - t, lx = m * m * p.x + 2 * m * t * qx + t * t * hx, ly = m * m * (H + 4) + 2 * m * t * qy + t * t * hy, side = t < 0.5 ? -1 : 1;
          cx.save(); cx.translate(lx, ly); cx.rotate(side * 0.8); cx.fillStyle = "#62c97f"; cx.beginPath(); cx.ellipse(side * 8 * U * g, 0, 10 * U * g, 4.2 * U * g, 0, 0, TAU); cx.fill(); cx.restore();
        }
      }
      sprite(p.img, hx, hy, p.s * eo(g), Math.sin(tNow * p.f * 1.3 + p.ph) * 0.18, 1);
    }
    cx.restore();

    // ----- bunga mekar -----
    cx.save(); cx.shadowColor = "rgba(90,30,70,.22)"; cx.shadowBlur = 8;
    for (let i = bloom.length - 1; i >= 0; i--) {
      const b = bloom[i]; b.t += dt; if (fading) b.d = Math.min(b.d, b.t + 0.8);
      if (b.t >= b.d) { bloom.splice(i, 1); continue; }
      const out = clamp((b.d - b.t) / 0.8, 0, 1); b.r += b.vr * dt;
      sprite(b.img, b.x, b.y, b.s * elastic(b.t / 0.7) * (0.6 + 0.4 * out), b.r, out);
    }
    cx.restore();

    // ----- bunga & kelopak berjatuhan -----
    const k1 = Math.min(1, dt * 1.1), k2 = Math.min(1, dt * 1.3);
    for (let i = fall.length - 1; i >= 0; i--) {
      const p = fall[i];
      p.vx += (0 - p.vx) * k1; p.vy += (p.fy - p.vy) * k2; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (fading) p.a -= dt * 0.8;
      if (p.y > H + p.s || p.a <= 0) { fall.splice(i, 1); continue; }
      sprite(p.img, p.x + Math.sin(tNow * p.sf + p.sp) * p.sw, p.y, p.s, p.rot, p.a);
    }

    if (fading && !fall.length && !bloom.length && garden.every(g => g.g < 0.012)) stopFlowers();
  }
  function startFlowers() {
    buildSprites(); ensureCv(); cv.classList.remove("is-top", "in-ov");
    if (mode === "off") { fall = []; bloom = []; level = 0; buildGarden(); }
    mode = "peek";
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }
  function burstFlowers() {
    startFlowers(); mode = "burst";
    if (overlay) { cv.classList.add("in-ov"); overlay.insertBefore(cv, overlay.querySelector(".sfe-stage")); }   // bunga di belakang foto (wajah tidak pernah tertutup) & teks
    else cv.classList.add("is-top");
    burstShots();
  }
  function fadeFlowers() { if (mode !== "off") mode = "fade"; }
  function stopFlowers() {
    cancelAnimationFrame(raf); raf = 0; mode = "off"; fall = []; bloom = []; garden = [];
    if (cv) { cv.remove(); cv = null; cx = null; }
  }
  window.addEventListener("resize", () => { if (!cv) return; sizeCv(); const gs = garden.map(g => g.g); buildGarden(); garden.forEach((g, i) => { g.g = gs[i % Math.max(1, gs.length)] || 0; g.delay = 0; }); });

  /* ======================================================================
     MENGINTIP DARI BAWAH LAYAR
     ====================================================================== */
  function photoImg(cls) {
    const im = document.createElement("img");
    im.className = cls; im.src = CFG.photo; im.alt = ""; im.draggable = false;
    im.onerror = () => { const s = document.createElement("span"); s.className = cls + " sfe-emoji"; s.textContent = "📸"; im.replaceWith(s); };
    return im;
  }
  function removePeek() {
    clearTimeout(peekTimer); clearTimeout(entranceT);
    if (peekEl) { const p = peekEl; peekEl = null; p.classList.remove("is-up"); setTimeout(() => p.remove(), 1000); }
    if (!overlay) fadeFlowers();
  }
  function peek(force) {
    if (peekEl || overlay) return;
    if (!force && (!lightOn() || document.hidden)) return;
    const el = document.createElement("div");
    el.className = "sfe-peek " + (Math.random() < 0.5 ? "is-left" : "is-right");
    el.setAttribute("data-sfe", ""); el.setAttribute("role", "button"); el.tabIndex = 0;
    el.setAttribute("aria-label", "Ada yang mengintip di antara bunga. Ketuk untuk kejutan!");
    const aura = document.createElement("span"); aura.className = "sfe-aura";
    const bub = document.createElement("span"); bub.className = "sfe-bub"; bub.textContent = CFG.bubble;
    el.appendChild(aura); el.appendChild(photoImg("sfe-peek-img")); el.appendChild(bub);
    document.body.appendChild(el); peekEl = el;
    startFlowers();                                         // taman mulai tumbuh, bunga mulai jatuh
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-up")));
    entranceT = setTimeout(() => {                          // dia naik -> bunga menyembur dari kepalanya
      if (peekEl !== el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      entrance(r.left + r.width / 2, vh - r.height * 0.52); twinkle();
    }, 520);
    peekTimer = setTimeout(removePeek, CFG.stay * 1000);
  }

  /* ======================================================================
     LEDAKAN (setelah diketuk)
     ====================================================================== */
  function burst() {
    if (overlay) return;
    removePeek();
    const flash = document.createElement("div"); flash.className = "sfe-flash"; flash.setAttribute("data-sfe", "");
    document.body.appendChild(flash); setTimeout(() => flash.remove(), 800);
    shutter();

    const ov = document.createElement("div");
    ov.className = "sfe-ov"; ov.setAttribute("data-sfe", ""); ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Easter egg Sofi");
    const shout = CFG.shout.split("").map((c, i) => '<span style="animation-delay:' + (0.5 + i * 0.07) + "s," + (1.6 + i * 0.08) + 's">' + c + "</span>").join("");
    const ring = ["🌸", "🌼", "🌷", "🌺", "🌻", "💮", "🌹"].concat(["🌸", "🌼", "🌷", "🌺", "🌻", "💮", "🌹"]).map((e, i, a) => '<i style="--a:' + (i * 360 / a.length).toFixed(1) + "deg;--s:" + (i % 2 ? 0.8 : 1.1) + '">' + e + "</i>").join("");
    const m = CFG.message;
    ov.innerHTML = '<div class="sfe-rays"></div><div class="sfe-glow"></div><div class="sfe-ring">' + ring + "</div>" +
      '<div class="sfe-vf"><i></i><i></i><i></i><i></i><span class="sfe-vf-l">1/125 · F1.8 · ISO 100</span><span class="sfe-vf-r">SOFI ✿ AF-S</span></div>' +
      '<div class="sfe-stage"></div><div class="sfe-kick">' + CFG.kicker + '</div><div class="sfe-shout">' + shout + "</div>" +
      '<div class="sfe-msg"><strong>' + (m[0] || "") + "</strong>" + m.slice(1).map(l => "<span>" + l + "</span>").join("") + '</div><button type="button" class="sfe-x" data-sfe-close aria-label="Tutup">✕</button>';
    const st = ov.querySelector(".sfe-stage");
    st.appendChild(photoImg("sfe-big"));
    st.insertAdjacentHTML("beforeend", '<svg class="sfe-focus" viewBox="0 0 100 100" aria-hidden="true"><path d="M2 26V2h24M74 2h24v24M98 74v24H74M26 98H2V74" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
    document.body.appendChild(ov); overlay = ov;
    burstFlowers();
    setTimeout(() => {
      if (overlay !== ov) return;
      ov.classList.add("is-on"); playVoice();
      try { navigator.vibrate && navigator.vibrate([80, 40, 80, 40, 220]); } catch (_) {}
    }, 260);
    beepT = setTimeout(() => { if (overlay === ov) focusBeep(); }, 1500);
    setTimeout(() => { if (overlay === ov) ov.querySelector(".sfe-msg").classList.add("is-on"); }, 2800);
  }
  function closeBurst() {
    if (!overlay) return;
    const ov = overlay; overlay = null;
    clearTimeout(beepT); stopVoice(); fadeFlowers();
    ov.classList.remove("is-on"); setTimeout(() => ov.remove(), 500);
    countdown = rand(CFG.every[0], CFG.every[1]);
  }

  /* ---------- event: tidak bocor ke efek klik situs (kursor, bunyi ketuk, menu jurus, dll) ---------- */
  const inside = t => !!(t && t.closest && t.closest("[data-sfe]"));
  ["pointerdown", "pointerup", "mousedown", "mouseup", "touchstart", "touchend", "dblclick", "contextmenu"].forEach(ev =>
    window.addEventListener(ev, e => { if (inside(e.target)) e.stopPropagation(); }, true));
  window.addEventListener("click", e => {
    if (!inside(e.target)) return;
    e.stopPropagation();
    if (e.target.closest(".sfe-peek")) { burst(); return; }
    if (overlay && e.target.closest(".sfe-ov")) closeBurst();      // ketuk di mana saja / tombol X
  }, true);
  window.addEventListener("keydown", e => {
    if (overlay && e.key === "Escape") { e.stopPropagation(); closeBurst(); return; }
    if (peekEl && (e.key === "Enter" || e.key === " ") && document.activeElement === peekEl) { e.preventDefault(); burst(); }
  }, true);

  /* ---------- pintasan keyboard: Ctrl + S O P I (tahan Ctrl, tekan S, O, P, I berurutan) ----------
     Membuka adegan Sofi langsung di tema apa pun. Kalau adegannya sedang terbuka, pintasan yang sama menutupnya. */
  (function sofiShortcut() {
    const WORD = ["KeyS", "KeyO", "KeyP", "KeyI"], GAP = 2500;      // GAP = jeda maksimal antar huruf (ms)
    let step = 0, lastT = 0;
    const typing = t => !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    function trigger() { step = 0; if (overlay) { closeBurst(); return; } removePeek(); burst(); }
    window.addEventListener("keydown", e => {
      if (e.key === "Control" || e.key === "Shift" || e.key === "Meta" || e.key === "Alt") return;
      const now = performance.now();
      if (step && now - lastT > GAP) step = 0;
      const ok = e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey;
      if (ok && step && e.code === WORD[step]) {
        e.preventDefault(); lastT = now;
        if (e.repeat) return;
        if (++step === WORD.length) trigger();
      } else if (ok && e.code === WORD[0] && !typing(e.target)) {
        e.preventDefault(); lastT = now; step = 1;       // Ctrl+S biasa (simpan halaman) ikut tertahan, sama seperti Ctrl+B di pintasan Bleach
      } else step = 0;
    }, true);
  })();

  /* ---------- jadwal: ikut aturan Elang Raja (hanya jalan saat mode Terang) ---------- */
  setInterval(() => {
    if (document.hidden || !lightOn() || overlay || peekEl || document.body.classList.contains("is-loading")) return;
    if (document.querySelector(".eagle-king, .fl-congrats, .pt-fx, .tw-fx")) return;     // jangan bareng elang / adegan lain
    countdown -= 1;
    if (countdown <= 0) { peek(); countdown = rand(CFG.every[0], CFG.every[1]); }
  }, 1000);
  new MutationObserver(() => { if (!lightOn()) removePeek(); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme", "data-bleach"] });

  window.sofiEgg = {
    CFG,
    peek() { removePeek(); peek(true); return "Sofi mengintip di antara bunga..."; },
    show() { removePeek(); burst(); return "Faqihhhhhh!"; },
    close() { closeBurst(); removePeek(); },
    flowers(on) { if (on === false) { fadeFlowers(); return "Bunga memudar."; } startFlowers(); return "Bunga mekar."; }
  };
  window.faqihEgg = window.sofiEgg;     // nama lama tetap jalan di Console
})();

/* ==========================================================================
   PEMBARUAN 59: EASTER EGG SOFI DARI HURUF "S" DI TULISAN "PAREWUSI" (MENU HOME)
   Cara : ketuk / klik huruf S pada tulisan Parewusi di Home -> adegan Sofi (layar penuh bunga) langsung terbuka.
          Alternatif: arahkan kursor ke tulisan Parewusi lalu tekan tombol S di keyboard. Bisa juga lewat Tab ke huruf S lalu Enter / Spasi.
   Cara kerja: tulisan dicari otomatis di halaman, huruf S-nya dibungkus <span class="sfl-s"> (tampilan tidak berubah sama sekali),
          dan dibungkus ulang otomatis kalau tulisannya dirender ulang (animasi ketik, ganti tema, dll).
   Atur : sofiLetter.CFG.word / .scope  |  Console: sofiLetter.rescan()
   ========================================================================== */
(function sofiLetter() {
  "use strict";
  const CFG = {
    word: "parewusi",                              // tulisan yang dicari (huruf besar/kecil bebas)
    index: 6,                                      // urutan huruf S di kata itu (p0 a1 r2 e3 w4 u5 s6 i7)
    scope: ".home-section, .home-content, .home-orbit"   // area Home; kalau di sini tidak ketemu, dicari di seluruh halaman (satu kemunculan pertama)
  };
  const SKIP = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|NOSCRIPT|TITLE)$/;
  const norm = s => (s || "").toLowerCase().replace(/\s+/g, "");
  let hovering = null, timer = 0, busy = false;

  const css = document.createElement("style");
  css.textContent = ".sfl-s{cursor:pointer;-webkit-tap-highlight-color:transparent;outline:none}.sfl-s:focus-visible{outline:2px dashed currentColor;outline-offset:3px;border-radius:3px}";
  document.head.appendChild(css);

  function open() {
    if (!window.sofiEgg) return;
    if (document.querySelector(".sfe-ov")) return;      // adegannya sudah terbuka
    window.sofiEgg.show();
  }
  function mark(el) {
    el.classList.add("sfl-s"); el.setAttribute("data-sfl", "");
    el.setAttribute("role", "button"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", "S");
  }
  function inside(n) { return n.parentElement && n.parentElement.closest && n.parentElement.closest(".sfl-s, .sfe-ov"); }

  /* kasus 1: kata utuh dalam satu teks -> bungkus huruf S-nya */
  function wrapInText(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement && !SKIP.test(n.parentElement.tagName) && !inside(n) && n.nodeValue.toLowerCase().indexOf(CFG.word) >= 0) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    const list = []; let n; while ((n = w.nextNode())) list.push(n);
    let done = 0;
    for (const t of list) {
      const i = t.nodeValue.toLowerCase().indexOf(CFG.word), at = i + CFG.index;
      if (i < 0) continue;
      const after = t.splitText(at + 1), s = t.splitText(at);      // t = sebelum S, s = "S", after = sesudahnya
      const sp = document.createElement("span"); sp.textContent = s.nodeValue; mark(sp);
      s.parentNode.replaceChild(sp, s); done++;
    }
    return done;
  }
  /* kasus 2: tulisan dipecah per huruf (setiap huruf = elemen sendiri) -> tandai elemen huruf S */
  function markSplit(root) {
    let done = 0;
    for (const el of root.querySelectorAll("*")) {
      if (SKIP.test(el.tagName) || el.closest(".sfl-s, .sfe-ov") || el.querySelector(".sfl-s")) continue;
      if (norm(el.textContent) !== CFG.word) continue;
      const kids = Array.from(el.querySelectorAll("*")).filter(k => !k.children.length && norm(k.textContent).length === 1);
      if (kids.length === CFG.word.length) { mark(kids[CFG.index]); done++; }
    }
    return done;
  }
  function scan() {
    if (busy) return; busy = true;
    try {
      const roots = Array.from(document.querySelectorAll(CFG.scope));
      let found = 0;
      for (const r of roots) { found += wrapInText(r); found += markSplit(r); }
      if (!found && !document.querySelector(".sfl-s") && !roots.some(r => r.querySelector(".sfl-s"))) {   // cadangan: tidak ada di area Home -> kemunculan pertama di halaman
        found = wrapInText(document.body);
        if (!found) markSplit(document.body);
      }
    } finally { busy = false; }
  }
  function later() { clearTimeout(timer); timer = setTimeout(scan, 250); }

  document.addEventListener("click", e => {
    const s = e.target.closest && e.target.closest(".sfl-s");
    if (s) { e.preventDefault(); e.stopPropagation(); open(); }
  }, true);
  document.addEventListener("keydown", e => {
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const onS = t && t.classList && t.classList.contains("sfl-s");
    if (onS && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); open(); return; }
    if (e.code === "KeyS" && hovering) { e.preventDefault(); open(); }      // kursor di atas tulisan Parewusi + tekan S
  }, true);
  document.addEventListener("pointerover", e => {
    const s = e.target.closest && e.target.closest(".sfl-s");
    if (s) { hovering = s; return; }
    const el = e.target.closest && e.target.closest("*");
    let host = el; hovering = null;
    for (let i = 0; host && i < 4; i++, host = host.parentElement) { if (norm(host.textContent) === CFG.word) { hovering = host; break; } }
  }, true);

  new MutationObserver(m => { if (busy) return; if (m.some(x => !(x.target.nodeType === 1 && x.target.closest && x.target.closest(".sfe-ov")))) later(); })
    .observe(document.body, { childList: true, subtree: true, characterData: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scan); else scan();
  window.addEventListener("load", later);
  window.sofiLetter = { CFG, rescan: scan };
})();


/* =====================================================================================================================
   PEMBARUAN 61A (direvisi di 63): KODE ARCADE (modul konamiEgg) - tanpa game tembak. Kode diterima -> langsung Mode Hacker.
   Pemicu: urutan: ↑ ↑ ↓ ↓ ← → ← → Enter, atau (HP) gesek 8 arah lalu ketuk 1x. Digambar kanvas + Web Audio.
   Console: konamiEgg.play() | konamiEgg.close() | konamiEgg.CFG
   ===================================================================================================================== */
(function konamiEgg() {
  "use strict";
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = {
    sound: true, volume: 1,
    gap: 4000,            // ms: jeda maks antar tombol
    swipeMin: 46,         // px: panjang gesekan minimal (HP)
    length: 4.6           // detik: lama adegan sebelum Mode Hacker menyala
  };
  const SEQ = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "Enter"];
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const sndOK = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  const gameOpen = () => !!document.querySelector(".game-hub.is-open");

  let ov = null, cv = null, cx = null, raf = 0, t0 = 0, W = 0, H = 0, dpr = 1, running = false, last = 0, cols = [], fs = 16, tickAt = 0, okSet = {}, grantedPlayed = false, fin = false;
  let idx = 0, lastKey = 0;

  let ac = null, master = null;
  function audio() {
    if (!sndOK()) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      if (!ac) { ac = new AC(); master = ac.createGain(); master.gain.value = 0.5 * CFG.volume; const cp = ac.createDynamicsCompressor(); master.connect(cp); cp.connect(ac.destination); }
      if (ac.state === "suspended") ac.resume();
      return ac;
    } catch (_) { return null; }
  }
  function tone(fr, t, dur, vol, type, fr2) {
    const a = audio(); if (!a) return;
    try {
      const o = a.createOscillator(), g = a.createGain(), s = a.currentTime + t;
      o.type = type || "square"; o.frequency.setValueAtTime(fr, s);
      if (fr2) o.frequency.exponentialRampToValueAtTime(fr2, s + dur);
      g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(vol, s + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
      o.connect(g); g.connect(master); o.start(s); o.stop(s + dur + 0.04);
    } catch (_) { /* tanpa audio */ }
  }
  function noise(t, dur, vol, hp) {
    const a = audio(); if (!a) return;
    try {
      const n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
      f.type = "highpass"; f.frequency.value = hp || 1400; g.gain.value = vol;
      s.buffer = buf; s.connect(f); f.connect(g); g.connect(master); s.start(a.currentTime + t);
    } catch (_) { /* tanpa audio */ }
  }
  const SND = {
    power() { tone(60, 0, 0.5, 0.35, "sawtooth", 900); tone(1200, 0.35, 0.18, 0.12, "square"); noise(0, 0.5, 0.18, 2200); },
    tick() { tone(rand(1500, 2100), 0, 0.03, 0.05, "square"); },
    ok() { tone(880, 0, 0.07, 0.12, "square"); tone(1320, 0.07, 0.1, 0.12, "square"); },
    grant() { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => { tone(f, i * 0.08, 0.26, 0.14, "square"); tone(f / 2, i * 0.08, 0.26, 0.1, "triangle"); }); noise(0, 0.4, 0.2, 3000); }
  };

  const LINES = [
    "> KODE DITERIMA  ↑ ↑ ↓ ↓ ← → ← → ENTER",
    "> membuka arsip rahasia ........ [OK]",
    "> membobol firewall palsu ...... [OK]",
    "> menyiapkan MODE HACKER ....... [OK]"
  ];
  function build() {
    ov = document.createElement("div"); ov.className = "kn-scene"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Kode diterima");
    cv = document.createElement("canvas"); cv.className = "kn-cv"; ov.appendChild(cv);
    document.body.appendChild(ov);
    cx = cv.getContext("2d");
    resize();
  }
  function resize() {
    if (!cv) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.floor(W * dpr); cv.height = Math.floor(H * dpr);
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fs = W < 560 ? 14 : 17;
    cols = [];
    for (let i = 0; i < Math.ceil(W / fs); i++) cols.push({ y: rand(-H / fs, 0), v: rand(0.35, 1.0), len: Math.floor(rand(8, 24)) });
    cx.fillStyle = "#000"; cx.fillRect(0, 0, W, H);
  }
  function play() {
    if (window.hackerMode && window.hackerMode.active) { window.hackerMode.off(); return false; }   // kode kedua = keluar dari mode hacker
    if (running || gameOpen()) return false;
    running = true; fin = false; grantedPlayed = false; okSet = {}; tickAt = 0; last = 0;
    build();
    requestAnimationFrame(() => ov && ov.classList.add("on"));
    t0 = performance.now();
    SND.power();
    raf = requestAnimationFrame(frame);
    return true;
  }
  function close(toHack) {
    if (!running) return;
    running = false; cancelAnimationFrame(raf);
    const o = ov; ov = null; cv = null; cx = null;
    if (o) { o.classList.remove("on"); setTimeout(() => o.remove(), 450); }
    if (toHack && window.hackerMode) setTimeout(() => window.hackerMode.on(), 300);
  }
  function frame(now) {
    if (!running || !cx) return;
    raf = requestAnimationFrame(frame);
    const t = (now - t0) / 1000, dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (t < 0.7) {   /* layar CRT menyala */
      cx.fillStyle = "#000"; cx.fillRect(0, 0, W, H);
      const u = t / 0.7, hh = Math.max(2, H * Math.pow(u, 3));
      cx.fillStyle = "rgba(200,255,225," + (0.95 - u * 0.4).toFixed(2) + ")"; cx.fillRect(W * (0.5 - 0.5 * Math.min(1, u * 3)), H / 2 - hh / 2, W * Math.min(1, u * 3), hh);
      return;
    }
    cx.fillStyle = "rgba(0,10,6," + (reduce ? 0.3 : 0.14) + ")"; cx.fillRect(0, 0, W, H);
    cx.font = "700 " + fs + "px ui-monospace, Menlo, Consolas, monospace"; cx.textBaseline = "top";
    const speed = 1 + Math.max(0, t - 3) * 1.2;
    for (let i = 0; i < cols.length; i++) {
      const c = cols[i]; c.y += c.v * dt * 22 * speed; const hy = c.y * fs;
      cx.fillStyle = "rgba(220,255,235,.95)"; cx.fillText(String.fromCharCode(Math.random() < 0.72 ? 0x30A1 + Math.floor(Math.random() * 86) : 48 + Math.floor(Math.random() * 10)), i * fs, hy);
      cx.fillStyle = "rgba(0,255,150,.7)"; cx.fillText(String.fromCharCode(0x30A1 + Math.floor(Math.random() * 86)), i * fs, hy - fs);
      if (hy - c.len * fs > H) { c.y = rand(-12, 0); c.v = rand(0.35, 1.0); c.len = Math.floor(rand(8, 24)); }
    }
    /* terminal mengetik sendiri */
    const bw = Math.min(W - 24, 470), lh = fs + 9, bh = LINES.length * lh + 22, bx = 12, by = 14;
    cx.fillStyle = "rgba(0,12,6,.86)"; cx.fillRect(bx, by, bw, bh); cx.strokeStyle = "rgba(0,255,150,.55)"; cx.lineWidth = 1; cx.strokeRect(bx + .5, by + .5, bw, bh);
    const cps = 34; let used = 0;
    for (let l = 0; l < LINES.length; l++) {
      const start = 0.9 + 0.3 * l + used / cps, L = LINES[l], n = clamp(Math.floor((t - start) * cps), 0, L.length);
      if (n > 0) {
        cx.font = "700 " + Math.max(11, fs - 3) + "px ui-monospace, Menlo, Consolas, monospace"; cx.fillStyle = l === LINES.length - 1 ? "#ffd166" : "#7dffc0"; cx.textBaseline = "top";
        cx.fillText(L.slice(0, n) + (n < L.length && Math.floor(t * 8) % 2 ? "█" : ""), bx + 10, by + 11 + l * lh);
      }
      if (n >= 1 && n < L.length && now - tickAt > 55) { tickAt = now; SND.tick(); }
      if (n >= L.length && l > 0 && !okSet[l]) { okSet[l] = 1; SND.ok(); }
      used += L.length;
    }
    /* AKSES DITERIMA */
    const T = CFG.length - 1.7;
    if (t > T) {
      if (!grantedPlayed) { grantedPlayed = true; SND.grant(); }
      const ct = t - T, big = clamp(ct / 0.35, 0, 1), sz = Math.min(W * 0.1, 76) * (0.6 + 0.4 * big), jit = ct < 0.9 ? rand(-4, 4) : 0;
      cx.save(); cx.textAlign = "center"; cx.textBaseline = "middle"; cx.font = "900 " + sz + "px ui-monospace, Menlo, Consolas, monospace";
      cx.fillStyle = "rgba(255,0,90,.8)"; cx.fillText("KODE DITERIMA", W / 2 - 5 + jit, H * 0.5);
      cx.fillStyle = "rgba(0,230,255,.8)"; cx.fillText("KODE DITERIMA", W / 2 + 5 - jit, H * 0.5);
      cx.fillStyle = "#fff"; cx.fillText("KODE DITERIMA", W / 2, H * 0.5);
      cx.font = "800 " + Math.min(W * 0.04, 24) + "px ui-monospace, Menlo, Consolas, monospace"; cx.fillStyle = "#00ff96";
      cx.fillText("MENGAKTIFKAN MODE HACKER ...", W / 2, H * 0.5 + sz * 0.85);
      cx.restore();
    }
    if (t > CFG.length && !fin) { fin = true; close(true); }
  }

  /* ------------------------------------------------------------ pemicu ------------------------------------------------------------ */
  function feed(name) {
    const now = performance.now();
    if (now - lastKey > CFG.gap) idx = 0; lastKey = now;
    if (name === SEQ[idx]) idx++; else idx = name === SEQ[0] ? 1 : 0;
    if (idx >= SEQ.length) { idx = 0; play(); }
  }
  const MODS = /^(Shift|Control|Alt|AltGraph|Meta|CapsLock|NumLock|Tab|Dead|Process)$/;
  function onKey(e) {
    if (e.__knSeen) return; e.__knSeen = true;
    if (running) { if (e.key === "Escape") { e.preventDefault(); close(true); } return; }
    if (e.repeat || MODS.test(e.key)) return;                       // tombol pengubah (Shift dll) tidak mereset urutan
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (gameOpen()) { idx = 0; return; }
    /* nama tombol: pakai e.code supaya tetap jalan di layout/IME apa pun */
    let k = e.key;
    if (/^Arrow/.test(e.code)) k = e.code; else if (e.code === "Enter" || e.code === "NumpadEnter") k = "Enter"; else if (k.length === 1) k = k.toLowerCase();
    feed(k);
  }
  window.addEventListener("keydown", onKey, true);
  document.addEventListener("keydown", onKey, true);   // cadangan bila ada pendengar lain yang menelan di window
  let ts = null;
  addEventListener("touchstart", e => { ts = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }, { passive: true });
  addEventListener("touchend", e => {
    if (!ts || running || gameOpen()) { ts = null; return; }
    const t = e.changedTouches[0], dx = t.clientX - ts.x, dy = t.clientY - ts.y; ts = null;
    const m = Math.max(Math.abs(dx), Math.abs(dy));
    if (m >= CFG.swipeMin) feed(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "ArrowRight" : "ArrowLeft") : (dy > 0 ? "ArrowDown" : "ArrowUp"));
    else if (m < 14 && idx >= 8) feed(SEQ[idx]);
  }, { passive: true });
  addEventListener("resize", () => { if (running) resize(); });

  window.konamiEgg = { play, close, CFG };
})();

/* =====================================================================================================================
   PEMBARUAN 61B: EASTER EGG "MALAM KEMBANG API" (modul hanabiEgg)
   Pemicu: ketik sebuah kata rahasia di keyboard (di luar kolom isian), atau (HP) tahan 2 jari ~1,4 dtk di bagian kosong layar.
   Setelah pertunjukan otomatis, layar tetap bisa diketuk untuk menembakkan kembang api sendiri.
   Console: hanabiEgg.play() | hanabiEgg.shoot(x,y) | hanabiEgg.close() | hanabiEgg.CFG
   ===================================================================================================================== */
(function hanabiEgg() {
  "use strict";
  const TAU = Math.PI * 2;
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = {
    word: "hanabi",
    sound: true, volume: 1,
    holdMs: 1400,            // HP: lama tahan 2 jari
    finaleAt: 15,            // detik: puncak pertunjukan
    maxParticles: 2400,
    idleClose: 120,          // detik tanpa ketukan setelah pertunjukan -> tutup otomatis (0 = tidak)
    congrats: "Selamat! Kamu menemukan easter egg Malam Kembang Api"
  };
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const sndOK = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  const gameOpen = () => !!document.querySelector(".game-hub.is-open");
  const PAL = [[255, 90, 110], [255, 190, 70], [120, 220, 255], [190, 140, 255], [130, 255, 170], [255, 140, 220], [255, 245, 200], [255, 120, 60]];

  let ov = null, bg = null, fg = null, bx = null, fx = null, raf = 0, last = 0, t0 = 0, W = 0, H = 0, dpr = 1, running = false;
  let shells = [], parts = [], lamps = [], stars = [], nextAuto = 0, finale = 0, finaleDone = false, toastShown = false, lastTap = 0, towers = [];
  let buf = "", bufT = 0, hold = null, holdS = null, flashA = 0;

  /* ------------------------------------------------------------ suara ------------------------------------------------------------ */
  let ac = null, master = null;
  function audio() {
    if (!sndOK()) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      if (!ac) { ac = new AC(); master = ac.createGain(); master.gain.value = 0.55 * CFG.volume; const cp = ac.createDynamicsCompressor(); master.connect(cp); cp.connect(ac.destination); }
      if (ac.state === "suspended") ac.resume();
      return ac;
    } catch (_) { return null; }
  }
  function nz(t, dur, vol, type, f0, f1, curve) {
    const a = audio(); if (!a) return;
    try {
      const n = Math.floor(a.sampleRate * dur), b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, curve || 2);
      const s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(), st = a.currentTime + t;
      f.type = type; f.frequency.setValueAtTime(f0, st); if (f1) f.frequency.exponentialRampToValueAtTime(f1, st + dur);
      g.gain.value = vol; s.buffer = b; s.connect(f); f.connect(g); g.connect(master); s.start(st);
    } catch (_) { /* tanpa audio */ }
  }
  function sine(t, dur, vol, f0, f1) {
    const a = audio(); if (!a) return;
    try {
      const o = a.createOscillator(), g = a.createGain(), st = a.currentTime + t;
      o.type = "sine"; o.frequency.setValueAtTime(f0, st); o.frequency.exponentialRampToValueAtTime(f1, st + dur);
      g.gain.setValueAtTime(vol, st); g.gain.exponentialRampToValueAtTime(0.0001, st + dur);
      o.connect(g); g.connect(master); o.start(st); o.stop(st + dur + 0.05);
    } catch (_) { /* tanpa audio */ }
  }
  let lastBoom = 0;
  const SND = {
    launch() { nz(0, 0.7, 0.16, "bandpass", 500, 2600, 1.2); },
    boom(big) {
      const n = performance.now(); if (n - lastBoom < 70) return; lastBoom = n;
      sine(0, big ? 0.9 : 0.55, big ? 0.55 : 0.4, big ? 120 : 150, 34); nz(0, big ? 0.7 : 0.45, big ? 0.5 : 0.34, "lowpass", 1300, 140, 2.2);
      nz(0.05, 0.5, 0.12, "highpass", 3200, 5200, 3);
    },
    crackle(k) { for (let i = 0; i < k; i++) nz(0.25 + Math.random() * 0.9, 0.03, 0.12, "highpass", 4800 + Math.random() * 2500, 0, 1); },
    chime() { [784, 988, 1175, 1568].forEach((f, i) => sine(i * 0.13, 1.4, 0.12, f, f * 0.998)); }
  };

  /* ------------------------------------------------------------ latar malam ------------------------------------------------------------ */
  function build() {
    ov = document.createElement("div"); ov.className = "hb-scene"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Easter egg Malam Kembang Api");
    bg = document.createElement("canvas"); bg.className = "hb-bg"; fg = document.createElement("canvas"); fg.className = "hb-fg";
    ov.appendChild(bg); ov.appendChild(fg);
    const x = document.createElement("button"); x.type = "button"; x.className = "hb-x"; x.setAttribute("aria-label", "Tutup"); x.textContent = "✕";
    x.addEventListener("click", e => { e.stopPropagation(); close(); });
    ov.appendChild(x);
    const tip = document.createElement("div"); tip.className = "hb-tip"; tip.textContent = "Ketuk langit untuk menembakkan kembang api  ·  Esc untuk keluar";
    ov.appendChild(tip); ov._tip = tip;
    const down = e => { if (e.target.closest && e.target.closest(".hb-x")) return; lastTap = performance.now(); shoot(e.clientX, e.clientY); };
    ov.addEventListener("pointerdown", down);
    document.body.appendChild(ov);
    bx = bg.getContext("2d"); fx = fg.getContext("2d");
    resize();
  }
  function resize() {
    if (!ov) return;
    dpr = Math.min(window.devicePixelRatio || 1, reduce ? 1 : 1.5);
    W = innerWidth; H = innerHeight;
    for (const c of [bg, fg]) { c.width = Math.floor(W * dpr); c.height = Math.floor(H * dpr); }
    bx.setTransform(dpr, 0, 0, dpr, 0, 0); fx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = []; for (let i = 0; i < (W < 560 ? 70 : 130); i++) stars.push({ x: Math.random() * W, y: Math.random() * H * 0.7, r: rand(0.4, 1.5), ph: Math.random() * 6, sp: rand(0.8, 2.6) });
    lamps = []; for (let i = 0; i < (W < 560 ? 9 : 16); i++) lamps.push(newLamp(true));
  }
  function newLamp(init) { return { x: rand(0.05, 0.95) * W, y: init ? rand(0.35, 1.05) * H : H + 30, vy: rand(14, 30), ph: Math.random() * 6, s: rand(0.7, 1.35), a: rand(0.55, 0.95) }; }
  function hillY(x) { return H - H * 0.07 - Math.sin(x * 0.006 + 1) * H * 0.03 - Math.sin(x * 0.017) * H * 0.012; }
  function drawBg(t, dt) {
    const g = bx;
    g.clearRect(0, 0, W, H);
    const grd = g.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, "#04051a"); grd.addColorStop(0.55, "#1a1245"); grd.addColorStop(0.86, "#5a2a5e"); grd.addColorStop(1, "#d9704f");
    g.fillStyle = grd; g.fillRect(0, 0, W, H);
    for (const s of stars) { g.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * s.sp + s.ph)); g.fillStyle = "#fff"; g.beginPath(); g.arc(s.x, s.y, s.r, 0, TAU); g.fill(); }
    g.globalAlpha = 1;
    /* bulan */
    const mx = W * 0.14, my = H * 0.17, mr = Math.min(W, H) * 0.055;
    const mg = g.createRadialGradient(mx, my, mr * 0.4, mx, my, mr * 4); mg.addColorStop(0, "rgba(255,245,210,.35)"); mg.addColorStop(1, "rgba(255,245,210,0)");
    g.fillStyle = mg; g.beginPath(); g.arc(mx, my, mr * 4, 0, TAU); g.fill();
    g.fillStyle = "#fff6d8"; g.beginPath(); g.arc(mx, my, mr, 0, TAU); g.fill();
    g.fillStyle = "rgba(210,190,140,.35)"; g.beginPath(); g.arc(mx - mr * 0.3, my - mr * 0.2, mr * 0.22, 0, TAU); g.arc(mx + mr * 0.3, my + mr * 0.35, mr * 0.15, 0, TAU); g.fill();
    /* lentera langit */
    for (const l of lamps) {
      l.y -= l.vy * dt; const x = l.x + Math.sin(t * 0.7 + l.ph) * 14, w = 14 * l.s, h = 18 * l.s, fl = 0.8 + 0.2 * Math.sin(t * 7 + l.ph * 3);
      const lg = g.createRadialGradient(x, l.y, 1, x, l.y, w * 3.4); lg.addColorStop(0, "rgba(255,170,70," + (0.5 * l.a * fl) + ")"); lg.addColorStop(1, "rgba(255,120,40,0)");
      g.fillStyle = lg; g.beginPath(); g.arc(x, l.y, w * 3.4, 0, TAU); g.fill();
      g.fillStyle = "rgba(255,196,110," + (l.a * fl) + ")"; g.beginPath(); g.moveTo(x - w * 0.6, l.y - h / 2); g.lineTo(x + w * 0.6, l.y - h / 2); g.lineTo(x + w * 0.45, l.y + h / 2); g.lineTo(x - w * 0.45, l.y + h / 2); g.closePath(); g.fill();
      g.fillStyle = "rgba(255,240,200," + (0.9 * fl) + ")"; g.fillRect(x - w * 0.18, l.y + h / 2 - 2, w * 0.36, 3);
      if (l.y < -40) Object.assign(l, newLamp(false));
    }
    /* bukit + torii + rumah */
    g.fillStyle = "#07050f"; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) g.lineTo(x, hillY(x));
    g.lineTo(W, H); g.closePath(); g.fill();
    const tx = W * 0.84, ty = hillY(tx), th = Math.min(H * 0.17, 120), tw = th * 0.9;
    g.fillStyle = "#07050f";
    g.fillRect(tx - tw / 2, ty - th, tw * 0.1, th); g.fillRect(tx + tw / 2 - tw * 0.1, ty - th, tw * 0.1, th);
    g.fillRect(tx - tw * 0.64, ty - th - th * 0.06, tw * 1.28, th * 0.1); g.fillRect(tx - tw * 0.5, ty - th * 0.78, tw, th * 0.07);
    for (let i = 0; i < 7; i++) { const hx = W * (0.1 + i * 0.11) + Math.sin(i * 3.1) * 14, hy = hillY(hx), hw = 26 + (i % 3) * 8; g.fillStyle = "#07050f"; g.fillRect(hx, hy - 16, hw, 20); g.beginPath(); g.moveTo(hx - 5, hy - 16); g.lineTo(hx + hw / 2, hy - 30); g.lineTo(hx + hw + 5, hy - 16); g.fill(); if (i % 2 === 0) { g.fillStyle = "rgba(255,200,110,.85)"; g.fillRect(hx + 6, hy - 9, 5, 5); } }
    /* pantulan cahaya kilat kembang api di langit */
    if (flashA > 0.01) { g.fillStyle = "rgba(255,230,190," + (flashA * 0.18) + ")"; g.fillRect(0, 0, W, H); flashA *= 0.9; }
  }

  /* ------------------------------------------------------------ kembang api ------------------------------------------------------------ */
  function pushP(p) { if (parts.length < CFG.maxParticles) parts.push(p); }
  const K = () => reduce ? 0.45 : 1;
  function burst(x, y, kind, col) {
    const c = col || pick(PAL), c2 = pick(PAL), k = K(); flashA = Math.min(1, flashA + 0.55);
    SND.boom(kind === "double" || kind === "willow");
    const mk = (a, s, o) => pushP(Object.assign({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rand(1.2, 2.0), c, sz: rand(1.3, 2.3), drag: 1.6, g: 70, tw: false }, o));
    if (kind === "peony") { const n = Math.floor(120 * k); for (let i = 0; i < n; i++) mk(rand(0, TAU), rand(60, 250)); }
    else if (kind === "chrys") { const n = Math.floor(90 * k); for (let i = 0; i < n; i++) mk(i / n * TAU + rand(-.03, .03), rand(120, 250), { tw: true, max: rand(1.5, 2.3) }); SND.crackle(5); }
    else if (kind === "willow") { const n = Math.floor(100 * k); for (let i = 0; i < n; i++) mk(rand(0, TAU), rand(60, 210), { c: [255, 205, 110], max: rand(2.4, 3.6), drag: 1.1, g: 120, sz: 1.5 }); SND.crackle(3); }
    else if (kind === "ring") { const n = Math.floor(80 * k), tilt = rand(0.35, 1); for (let i = 0; i < n; i++) { const a = i / n * TAU; pushP({ x, y, vx: Math.cos(a) * 190, vy: Math.sin(a) * 190 * tilt, life: 0, max: rand(1.3, 1.7), c, sz: 2, drag: 1.7, g: 50, tw: false }); } for (let i = 0; i < 26 * k; i++) mk(rand(0, TAU), rand(20, 70), { c: c2 }); }
    else if (kind === "heart") { const n = Math.floor(96 * k); for (let i = 0; i < n; i++) { const a = i / n * TAU, hx = 16 * Math.pow(Math.sin(a), 3), hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)); pushP({ x, y, vx: hx * 9.5, vy: hy * 9.5, life: 0, max: rand(1.6, 2.0), c: [255, 90 + Math.random() * 50, 140], sz: 2.2, drag: 1.9, g: 35, tw: false }); } }
    else if (kind === "double") { for (let i = 0; i < 70 * k; i++) mk(rand(0, TAU), rand(40, 130), { c: c2 }); for (let i = 0; i < 110 * k; i++) mk(rand(0, TAU), rand(160, 270)); SND.crackle(6); }
    else if (kind === "palm") { const arms = 8; for (let a = 0; a < arms; a++) for (let i = 0; i < 14 * k; i++) { const ang = a / arms * TAU + rand(-.07, .07); mk(ang, rand(90, 230), { c: [255, 215, 120], max: rand(1.8, 2.6), g: 95, drag: 1.3 }); } }
  }
  function launch(tx, ty, kind, col, delay) {
    const x0 = clamp(tx + rand(-40, 40), 20, W - 20), d = rand(0.85, 1.2);
    shells.push({ x0, y0: H * 0.93, x1: tx, y1: ty, t: -(delay || 0), d, kind: kind || pick(["peony", "chrys", "willow", "ring", "heart", "double", "palm", "peony", "chrys"]), col, fired: false });
  }
  function shoot(x, y) { if (!running) return; SND.launch(); launch(clamp(x, 30, W - 30), clamp(y, H * 0.08, H * 0.7), null, null, 0); }
  function textBurst(text, cxp, cyp, size, col) {
    try {
      const oc = document.createElement("canvas"), w = Math.ceil(size * text.length * 0.95), h = Math.ceil(size * 1.3); oc.width = w; oc.height = h;
      const o = oc.getContext("2d"); o.fillStyle = "#fff"; o.textAlign = "center"; o.textBaseline = "middle"; o.font = "900 " + size + 'px "Hiragino Sans","Yu Gothic","Noto Sans JP","Noto Sans CJK JP",system-ui,sans-serif'; o.fillText(text, w / 2, h / 2);
      const d = o.getImageData(0, 0, w, h).data, step = Math.max(3, Math.round(size / 17)); let n = 0;
      for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (d[(y * w + x) * 4 + 3] > 140) {
        const tx = cxp + x - w / 2, ty = cyp + y - h / 2;
        pushP({ x: cxp, y: cyp, tx, ty, txt: true, life: 0, max: rand(3.4, 4.4), c: col || [255, 220, 130], sz: 2.4, drag: 0, g: 0, tw: true, ft: rand(0.9, 1.3) });
        n++; if (n > 700) return;
      }
    } catch (_) { burst(cxp, cyp, "double"); }
  }
  function drawFg(t, dt) {
    const g = fx;
    g.globalCompositeOperation = "destination-out"; g.fillStyle = "rgba(0,0,0," + (reduce ? 0.35 : 0.2) + ")"; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = "lighter";
    /* roket */
    for (let i = shells.length - 1; i >= 0; i--) {
      const s = shells[i]; s.t += dt; if (s.t < 0) continue;
      const u = clamp(s.t / s.d, 0, 1), e = 1 - Math.pow(1 - u, 2.2), x = s.x0 + (s.x1 - s.x0) * u, y = s.y0 + (s.y1 - s.y0) * e;
      pushP({ x: x + rand(-1.5, 1.5), y, vx: rand(-14, 14), vy: rand(10, 50), life: 0, max: rand(0.3, 0.7), c: [255, 200, 120], sz: 1.2, drag: 1, g: 60, tw: false });
      g.fillStyle = "rgba(255,240,200,.95)"; g.beginPath(); g.arc(x, y, 2.2, 0, TAU); g.fill();
      if (u >= 1) { burst(x, y, s.kind, s.col); shells.splice(i, 1); }
    }
    /* partikel */
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life += dt;
      if (p.life >= p.max) { parts.splice(i, 1); continue; }
      const f = p.life / p.max;
      if (p.txt) {
        const u = clamp(p.life / 1.05, 0, 1), ee = 1 - Math.pow(1 - u, 3);
        p.x += ((p.tx - p.x) * (u < 1 ? Math.min(1, dt * (4 + ee * 14)) : 0)); p.y += ((p.ty - p.y) * (u < 1 ? Math.min(1, dt * (4 + ee * 14)) : 0));
        if (u >= 1) p.y += 12 * dt * (f - 0.3 > 0 ? (f - 0.3) * 3 : 0);
        const tw = u >= 1 ? 0.55 + 0.45 * Math.sin(t * 14 * p.ft + p.tx) : 1, a = (f > 0.72 ? 1 - (f - 0.72) / 0.28 : 1) * tw;
        g.fillStyle = "rgba(" + p.c[0] + "," + p.c[1] + "," + p.c[2] + "," + a.toFixed(3) + ")"; g.beginPath(); g.arc(p.x, p.y, p.sz, 0, TAU); g.fill();
        continue;
      }
      const dr = Math.exp(-p.drag * dt); p.vx *= dr; p.vy = p.vy * dr + p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      let a = 1 - f * f; if (p.tw) a *= 0.55 + 0.45 * Math.sin(p.life * 40 + i);
      g.fillStyle = "rgba(" + p.c[0] + "," + p.c[1] + "," + p.c[2] + "," + Math.max(0, a).toFixed(3) + ")";
      g.beginPath(); g.arc(p.x, p.y, p.sz * (1 - f * 0.4), 0, TAU); g.fill();
    }
    g.globalCompositeOperation = "source-over";
  }

  /* ------------------------------------------------------------ alur pertunjukan ------------------------------------------------------------ */
  function auto(t) {
    if (t < 1.2) return;
    if (t < CFG.finaleAt) {
      if (t >= nextAuto) { SND.launch(); launch(rand(0.12, 0.88) * W, rand(0.14, 0.5) * H); if (Math.random() < 0.35) launch(rand(0.12, 0.88) * W, rand(0.14, 0.5) * H, null, null, 0.25); nextAuto = t + rand(0.7, 1.5) * (reduce ? 1.4 : 1); }
      return;
    }
    if (!finale) {
      finale = t;
      for (let i = 0; i < (reduce ? 10 : 24); i++) launch(rand(0.08, 0.92) * W, rand(0.12, 0.55) * H, null, null, i * 0.16);
      setTimeout(() => { if (running) { SND.launch(); launch(W / 2, H * 0.3, "double", [255, 220, 130], 0); } }, 3900);
      setTimeout(() => { if (running) { SND.launch(); shells.push({ x0: W / 2, y0: H * 0.93, x1: W / 2, y1: H * 0.36, t: 0, d: 1.1, kind: "txt1", fired: false }); } }, 4800);
      setTimeout(() => { if (running) { SND.launch(); shells.push({ x0: W / 2, y0: H * 0.93, x1: W / 2, y1: H * 0.36, t: 0, d: 1.1, kind: "txt2", fired: false }); } }, 9400);
    }
    if (t > finale + 14.2 && !finaleDone) { finaleDone = true; SND.chime(); showToast(); }
    if (finaleDone && t >= nextAuto) { SND.launch(); launch(rand(0.1, 0.9) * W, rand(0.14, 0.5) * H); nextAuto = t + rand(2.2, 4); }
  }
  const origBurst = burst;
  burst = function (x, y, kind, col) {
    if (kind === "txt1") { SND.boom(true); flashA = 1; textBurst("HANABI", x, y, clamp(W / 5.2, 52, 150), [255, 220, 130]); return; }
    if (kind === "txt2") { SND.boom(true); flashA = 1; textBurst("花火", x, y, clamp(W / 3.6, 70, 210), [255, 130, 170]); setTimeout(() => running && origBurst(x, y - Math.max(140, H * 0.2), "heart", [255, 110, 160]), 600); return; }
    origBurst(x, y, kind, col);
  };
  function showToast() {
    if (!ov || toastShown) return; toastShown = true;
    const c = document.createElement("div"); c.className = "hb-card";
    c.innerHTML = '<div class="hb-ic">🎆</div><div class="hb-tx"><b>' + CFG.congrats + '</b><span>Ketuk langit untuk menembakkan sendiri.</span></div>';
    ov.appendChild(c); requestAnimationFrame(() => c.classList.add("on"));
    setTimeout(() => { c.classList.remove("on"); setTimeout(() => c.remove(), 700); }, 7500);
  }
  function frame(now) {
    if (!running || !bx) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    const t = (now - t0) / 1000;
    drawBg(t, dt); drawFg(t, dt); auto(t);
    if (ov._tip) ov._tip.classList.toggle("on", t > 2.5);
    if (finaleDone && CFG.idleClose && (now - Math.max(lastTap, t0 + (finale + 14.2) * 1000)) / 1000 > CFG.idleClose) close();
  }
  function play() {
    if (running || gameOpen()) return false;
    running = true; shells = []; parts = []; finale = 0; finaleDone = false; toastShown = false; nextAuto = 1.4; lastTap = 0; flashA = 0;
    build(); requestAnimationFrame(() => ov && ov.classList.add("on"));
    t0 = performance.now(); last = 0;
    SND.chime();
    raf = requestAnimationFrame(frame);
    return true;
  }
  function close() {
    if (!running) return;
    running = false; cancelAnimationFrame(raf);
    const o = ov; ov = bg = fg = bx = fx = null; shells = []; parts = [];
    if (o) { o.classList.remove("on"); setTimeout(() => o.remove(), 700); }
  }

  /* ------------------------------------------------------------ pemicu ------------------------------------------------------------ */
  addEventListener("keydown", e => {
    if (running) { if (e.key === "Escape") { e.preventDefault(); close(); } return; }
    if (e.ctrlKey || e.altKey || e.metaKey || e.repeat || e.key.length !== 1) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (gameOpen()) { buf = ""; return; }
    const n = performance.now(); if (n - bufT > 2500) buf = ""; bufT = n;
    buf = (buf + e.key.toLowerCase()).slice(-CFG.word.length);
    if (buf === CFG.word) { buf = ""; play(); }
  }, true);
  /* HP: tahan 2 jari di bagian kosong layar */
  const SKIPSEL = "a,button,input,textarea,select,label,[role=button],.music-player,.game-launcher,.game-hub,.theme-toggle";
  addEventListener("touchstart", e => {
    clearTimeout(hold); hold = null;
    if (running || e.touches.length !== 2 || gameOpen()) return;
    if (e.target.closest && e.target.closest(SKIPSEL)) return;
    const a = e.touches[0], b = e.touches[1], sx = a.clientX, sy = a.clientY;
    holdS = [sx, sy];
    hold = setTimeout(() => { hold = null; play(); }, CFG.holdMs);
  }, { passive: true });
  addEventListener("touchmove", e => { if (hold && e.touches.length === 2 && holdS) { if (Math.hypot(e.touches[0].clientX - holdS[0], e.touches[0].clientY - holdS[1]) > 24) { clearTimeout(hold); hold = null; } } }, { passive: true });
  addEventListener("touchend", () => { clearTimeout(hold); hold = null; }, { passive: true });
  addEventListener("touchcancel", () => { clearTimeout(hold); hold = null; }, { passive: true });
  addEventListener("resize", () => { if (running) resize(); });

  window.hanabiEgg = { play, close, shoot, CFG };
})();


/* =====================================================================================================================
   PEMBARUAN 62: MODE HACKER (modul hackerMode) - diaktifkan oleh akhir adegan Kode Arcade
   Web jadi hijau-hitam ala terminal + hujan kode tipis + CRT. Panel terminal di samping: ketik APA SAJA, muncul kode "hacker" palsu
   (semua hanya teks hiasan, tidak melakukan apa-apa). Keluar: tombol ✕ di panel, ulangi kode Arcade, atau hackerMode.off().
   Console: hackerMode.on() | .off() | .toggle() | .active | .CFG
   ===================================================================================================================== */
(function hackerMode() {
  "use strict";
  const root = document.documentElement;
  const TAU = Math.PI * 2;
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const CFG = { sound: true, volume: 1, rain: true, cps: [2, 6], maxLines: 220, prompt: "root@parewusi:~# " };
  const rand = (a, b) => a + Math.random() * (b - a);
  const ri = (a, b) => Math.floor(rand(a, b + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const sndOK = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  const gameOpen = () => !!document.querySelector(".game-hub.is-open");
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ------------------------------------------------------------ generator kode palsu ------------------------------------------------------------ */
  const hex = n => { let s = ""; for (let i = 0; i < n; i++) s += "0123456789abcdef"[ri(0, 15)]; return s; };
  const ip = () => ri(11, 223) + "." + ri(0, 255) + "." + ri(0, 255) + "." + ri(1, 254);
  const WORDS = ["payload", "kernel", "daemon", "proxy", "vector", "token", "cipher", "socket", "tunnel", "shell", "packet", "rootkit", "buffer", "stack", "session", "hash", "nonce", "gateway"];
  const id = () => pick(WORDS) + (Math.random() < 0.5 ? ri(0, 99) : "_" + pick(WORDS));
  const GEN = [
    () => "$ nmap -sS -p " + ri(20, 900) + "-" + ri(1000, 9000) + " " + ip(),
    () => "[+] port " + ri(21, 9999) + "/tcp open  " + pick(["ssh", "http", "mysql", "ftp", "smtp", "redis", "rdp"]),
    () => "const " + id() + " = await decrypt(0x" + hex(8) + ', "' + hex(16) + '");',
    () => "for (let i = 0; i < 0x" + hex(2) + "; i++) buf[i] ^= key[i % " + ri(4, 32) + "];",
    () => "sudo ./exploit --target " + ip() + " --payload " + pick(["reverse_tcp", "bind_shell", "meterpreter", "stage2"]),
    () => ">> injecting shellcode @ 0x" + hex(8) + " ...... OK",
    () => "if (!firewall.bypass(" + id() + ')) throw new Error("ACCESS_DENIED");',
    () => "# cat /etc/shadow | john --stdin --format=sha512crypt",
    () => "SELECT * FROM users WHERE id = " + ri(1, 999) + " OR 1=1;--",
    () => "ssh -i ~/.ssh/id_rsa root@" + ip() + " -p " + ri(22, 2222),
    () => "function " + id() + "(" + id() + ") { return btoa(" + id() + ').split("").reverse().join(""); }',
    () => "[*] cracking hash " + hex(32) + " ...",
    () => "0x" + hex(8) + ": " + hex(2) + " " + hex(2) + " " + hex(2) + " " + hex(2) + " " + hex(2) + " " + hex(2) + " " + hex(2) + " " + hex(2),
    () => "import socket, struct, os   # " + id(),
    () => "[!] IDS evasion " + ri(60, 99) + "% ... spoofing MAC " + hex(2) + ":" + hex(2) + ":" + hex(2) + ":" + hex(2) + ":" + hex(2) + ":" + hex(2),
    () => "await fetch(\"https://" + ip() + "/api/v" + ri(1, 3) + "/auth\", { method: \"POST\", body: " + id() + " });",
    () => "while (true) { if (" + id() + ".length > 0x" + hex(2) + ") break; " + id() + "++; }",
    () => "tar -czf /tmp/." + hex(6) + ".tgz /var/www && scp /tmp/.* ghost@" + ip() + ":/dev/null",
    () => "#define MAGIC 0x" + hex(8).toUpperCase() + "  // " + id()
  ];
  const KW = /\b(const|let|var|for|while|if|else|await|async|function|return|throw|new|import|break|true|false|SELECT|FROM|WHERE|OR|define|sudo|ssh|scp|nmap|cat|tar|john)\b/g;
  function hl(s) {
    let h = esc(s), out = "";
    /* pewarnaan sederhana: komentar > string > token lain */
    const ci = h.search(/(#\s|\/\/)/);
    let cm = ""; if (ci >= 0) { cm = h.slice(ci); h = h.slice(0, ci); }
    h = h.replace(/("[^"]*"?)/g, "\u0001$1\u0002").split(/(\u0001[^\u0002]*\u0002)/).map(p => p[0] === "\u0001" ? '<i class="hk-s">' + p.slice(1, -1) + "</i>"
      : p.replace(/(\[[+*!]\]|&gt;&gt;)/g, '<i class="hk-p">$1</i>').replace(/\b(0x[0-9a-fA-F]+|\d+\.\d+\.\d+\.\d+|\d+)\b/g, '<i class="hk-n">$1</i>').replace(KW, '<i class="hk-k">$1</i>')).join("");
    out = h + (cm ? '<i class="hk-c">' + cm + "</i>" : "");
    return out;
  }

  /* ------------------------------------------------------------ suara ------------------------------------------------------------ */
  let ac = null, master = null;
  function audio() {
    if (!sndOK()) return null;
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
      if (!ac) { ac = new AC(); master = ac.createGain(); master.gain.value = 0.4 * CFG.volume; master.connect(ac.destination); }
      if (ac.state === "suspended") ac.resume();
      return ac;
    } catch (_) { return null; }
  }
  function tone(fr, dur, vol, type, fr2, t0) {
    const a = audio(); if (!a) return;
    try {
      const o = a.createOscillator(), g = a.createGain(), s = a.currentTime + (t0 || 0);
      o.type = type || "square"; o.frequency.setValueAtTime(fr, s); if (fr2) o.frequency.exponentialRampToValueAtTime(fr2, s + dur);
      g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(vol, s + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, s + dur);
      o.connect(g); g.connect(master); o.start(s); o.stop(s + dur + 0.03);
    } catch (_) { /* tanpa audio */ }
  }
  const SND = {
    key() { tone(rand(1700, 2600), 0.025, 0.035, "square"); },
    line() { tone(1200, 0.05, 0.05, "square"); },
    on() { [220, 330, 440, 660, 880].forEach((f, i) => tone(f, 0.16, 0.1, "square", 0, i * 0.07)); tone(80, 0.5, 0.2, "sawtooth", 600, 0); },
    off() { tone(700, 0.4, 0.12, "sawtooth", 60); },
    root() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, 0.12, "square", 0, i * 0.08)); }
  };

  /* ------------------------------------------------------------ UI ------------------------------------------------------------ */
  let active = false, panel = null, body = null, cur = null, curLine = "", curPos = 0, keys = 0, pct = 0, rootN = 0, inp = null, bar = null, pctEl = null, kEl = null, rainCv = null, rainRaf = 0, crt = null, banner = null;
  let lines = 0, boost = 0, flowCv = null, flowRaf = 0;
  function addLine(text, cls) {
    const d = document.createElement("div"); d.className = "hk-ln" + (cls ? " " + cls : ""); d.innerHTML = text; body.insertBefore(d, cur);
    if (++lines > CFG.maxLines) { const f = body.firstChild; if (f && f !== cur) { f.remove(); lines--; } }
    return d;
  }
  function newCur() { curLine = pick(GEN)(); curPos = 0; }
  function renderCur() { cur.innerHTML = '<i class="hk-pr">' + esc(CFG.prompt) + "</i>" + hl(curLine.slice(0, curPos)) + '<b class="hk-cr"></b>'; body.scrollTop = body.scrollHeight; }
  function updStats() { if (!panel) return; kEl.textContent = String(keys).padStart(4, "0"); pctEl.textContent = Math.floor(pct) + "%"; bar.style.width = Math.min(100, pct) + "%"; }
  function advance(n) {
    if (!active || !panel) return;
    keys++; SND.key(); boost = Math.min(2.5, boost + 0.5);
    n = n || ri(CFG.cps[0], CFG.cps[1]);
    curPos += n;
    if (curPos >= curLine.length) {
      addLine('<i class="hk-pr">' + esc(CFG.prompt) + "</i>" + hl(curLine)); SND.line();
      if (Math.random() < 0.22) addLine('<i class="hk-p">[' + pick(["+", "*", "!"]) + "]</i> " + pick(["handshake ok", "token diterima", "tunnel terbuka", "paket dikirim " + ri(1, 512) + " KB", "sesi di-hijack (bohongan)", "enkripsi AES-256 dilewati"]), "hk-dim");
      newCur();
    }
    pct += rand(0.5, 1.5) + (n > 4 ? 0.3 : 0);
    if (pct >= 100) { pct = 0; rootN++; grant(); }
    renderCur(); updStats();
  }
  function grant() {
    SND.root(); boost = 4;
    addLine("============================", "hk-gr"); addLine("  ROOT ACCESS GRANTED  #" + rootN, "hk-gr"); addLine("============================", "hk-gr");
    panel.classList.add("flash"); setTimeout(() => panel && panel.classList.remove("flash"), 700);
    banner.textContent = "ROOT ACCESS GRANTED"; banner.classList.remove("go"); void banner.offsetWidth; banner.classList.add("go");
  }
  function onKey(e) {
    if (!active) return;
    if (e.target === inp) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (gameOpen()) return;
    if (e.key === "Enter") { e.preventDefault(); const k = ri(8, 16); for (let i = 0; i < k; i++) advance(ri(4, 9)); return; }
    if (e.key.length === 1 || e.key === "Backspace") advance();
  }
  function startRain() {
    if (reduce || !CFG.rain) return;
    rainCv = document.createElement("canvas"); rainCv.className = "hk-ui hk-rain"; document.body.appendChild(rainCv);
    const g = rainCv.getContext("2d"); let W = 0, H = 0, fs = 15, cols = [], tick = 0;
    const size = () => { W = rainCv.width = innerWidth; H = rainCv.height = innerHeight; cols = []; for (let i = 0; i < Math.ceil(W / fs); i++) cols.push(rand(-40, 0)); };
    size(); rainCv._size = size; addEventListener("resize", size);
    (function loop() {
      rainRaf = requestAnimationFrame(loop); if ((tick++ % 2) || !rainCv) return;
      g.globalCompositeOperation = "destination-out"; g.fillStyle = "rgba(0,0,0,.16)"; g.fillRect(0, 0, W, H); g.globalCompositeOperation = "source-over";
      g.font = "700 " + fs + "px ui-monospace, monospace"; g.textBaseline = "top";
      for (let i = 0; i < cols.length; i++) { const y = cols[i] * fs; g.fillStyle = "rgba(190,255,220,.9)"; g.fillText(String.fromCharCode(0x30A1 + ri(0, 85)), i * fs, y); g.fillStyle = "rgba(0,255,140,.55)"; g.fillText(String.fromCharCode(48 + ri(0, 9)), i * fs, y - fs); cols[i] += 0.55 + (i % 5) * 0.08; if (y > H && Math.random() > 0.975) cols[i] = rand(-30, 0); }
    })();
  }
  /* kode mengalir di latar belakang: kolom log bergulir + baris kode melintas kiri/kanan, makin kencang saat mengetik */
  function startFlow() {
    flowCv = document.createElement("canvas"); flowCv.className = "hk-ui hk-flow"; document.body.appendChild(flowCv);
    const g = flowCv.getContext("2d"); let W = 0, H = 0, streams = [], drift = [], dpr = Math.min(devicePixelRatio || 1, 1.5), prev = 0;
    const mkStream = (x, w) => { const lh = ri(14, 17); return { x, w, lh, fs: lh - 4, sp: rand(22, 70), a: rand(0.22, 0.5), ln: [], y0: 0 }; };
    const fill = st => { while (st.ln.length * st.lh < H + st.lh * 3) st.ln.push(pick(GEN)()); };
    const size = () => {
      W = innerWidth; H = innerHeight; flowCv.width = Math.floor(W * dpr); flowCv.height = Math.floor(H * dpr); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(2, Math.min(8, Math.floor(W / 230))), cw = W / n;
      streams = []; for (let i = 0; i < n; i++) { const st = mkStream(i * cw + 6, cw - 12); fill(st); st.y0 = -rand(0, 200); streams.push(st); }
      drift = []; for (let i = 0; i < (W < 560 ? 5 : 9); i++) drift.push({ y: rand(0.05, 0.95) * H, x: rand(-W, W), v: (Math.random() < 0.5 ? -1 : 1) * rand(70, 190), t: pick(GEN)(), a: rand(0.25, 0.5) });
    };
    size(); flowCv._size = size; addEventListener("resize", size);
    (function loop(now) {
      flowRaf = requestAnimationFrame(loop); if (!flowCv) return;
      const dt = Math.min(0.05, (now - (prev || now)) / 1000); prev = now; boost *= 0.94;
      const k = 1 + boost * 3.2;
      g.clearRect(0, 0, W, H); g.textBaseline = "top";
      for (const st of streams) {
        st.y0 -= st.sp * k * dt;
        while (st.y0 < -st.lh) { st.y0 += st.lh; st.ln.shift(); st.ln.push(pick(GEN)()); }
        g.font = "600 " + st.fs + "px ui-monospace, Menlo, Consolas, monospace";
        for (let i = 0; i < st.ln.length; i++) {
          const y = st.y0 + i * st.lh; if (y > H) break;
          const edge = Math.min(1, y / 90, (H - y) / 90), a = st.a * Math.max(0, edge);
          g.fillStyle = "rgba(0,255,150," + a.toFixed(3) + ")"; g.fillText(st.ln[i].slice(0, Math.floor(st.w / (st.fs * 0.6))), st.x, y);
        }
      }
      g.font = "700 13px ui-monospace, Menlo, Consolas, monospace";
      for (const d of drift) {
        d.x += d.v * k * dt; const tw = d.t.length * 8;
        if (d.v > 0 && d.x > W + 20) { d.x = -tw - 20; d.t = pick(GEN)(); d.y = rand(0.05, 0.95) * H; }
        if (d.v < 0 && d.x < -tw - 20) { d.x = W + 20; d.t = pick(GEN)(); d.y = rand(0.05, 0.95) * H; }
        g.fillStyle = "rgba(190,255,225," + d.a + ")"; g.fillText(d.t, d.x, d.y);
        g.fillStyle = "rgba(0,255,150,.12)"; g.fillRect(d.x, d.y + 16, tw, 1);
      }
    })(performance.now());
  }
  function buildUI() {
    crt = document.createElement("div"); crt.className = "hk-ui hk-crt"; document.body.appendChild(crt);
    banner = document.createElement("div"); banner.className = "hk-ui hk-banner"; document.body.appendChild(banner);
    panel = document.createElement("section"); panel.className = "hk-ui hk-panel"; panel.setAttribute("aria-label", "Terminal mode hacker (hiasan)");
    panel.innerHTML = '<header class="hk-hd"><span class="hk-dot"></span><span class="hk-tt">root@parewusi:~</span><button type="button" class="hk-b hk-min" aria-label="Kecilkan">–</button><button type="button" class="hk-b hk-x" aria-label="Keluar mode hacker">✕</button></header>' +
      '<div class="hk-stat"><span>KEYS <b class="hk-k2">0000</b></span><span>FIREWALL BYPASS <b class="hk-p2">0%</b></span></div><div class="hk-bar"><i></i></div>' +
      '<div class="hk-body" tabindex="-1"></div><textarea class="hk-in" aria-label="Ketik apa saja" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea><div class="hk-ft">ketik apa saja · Enter = ledakan kode · ketuk panel di HP</div>';
    document.body.appendChild(panel);
    body = panel.querySelector(".hk-body"); inp = panel.querySelector(".hk-in"); bar = panel.querySelector(".hk-bar i"); pctEl = panel.querySelector(".hk-p2"); kEl = panel.querySelector(".hk-k2");
    cur = document.createElement("div"); cur.className = "hk-ln hk-cur"; body.appendChild(cur);
    panel.querySelector(".hk-x").addEventListener("click", e => { e.stopPropagation(); off(); });
    panel.querySelector(".hk-min").addEventListener("click", e => { e.stopPropagation(); panel.classList.toggle("min"); });
    panel.addEventListener("pointerdown", e => { e.stopPropagation(); });
    panel.addEventListener("click", e => { e.stopPropagation(); if (!e.target.closest(".hk-b")) { try { inp.focus({ preventScroll: true }); } catch (_) { /* fokus gagal */ } } });
    inp.addEventListener("input", () => { const n = Math.max(1, inp.value.length); inp.value = ""; advance(Math.min(8, 2 + n)); });
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); for (let i = 0; i < ri(8, 16); i++) advance(ri(4, 9)); } e.stopPropagation(); });
  }
  const BOOT = ["# ./init_hacker_mode.sh", "[+] mengambil alih tampilan ........ OK", "[+] memasang filter hijau ......... OK", "[*] semua ini hanya hiasan, aman 😎", "[*] ketik apa saja untuk mulai ..."];
  function on() {
    if (active) return false;
    active = true; keys = 0; pct = 0; rootN = 0; lines = 0;
    buildUI();
    root.classList.add("hk-glitch"); root.setAttribute("data-hacker", "on");
    setTimeout(() => root.classList.remove("hk-glitch"), 1100);
    SND.on();
    requestAnimationFrame(() => panel && panel.classList.add("on"));
    BOOT.forEach((l, i) => setTimeout(() => { if (active && panel) { addLine(hl(l), i === 0 ? "" : "hk-dim"); SND.line(); if (i === BOOT.length - 1) { newCur(); renderCur(); } } }, 500 + i * 320));
    startFlow(); startRain();
    return true;
  }
  function off() {
    if (!active) return false;
    active = false; SND.off();
    root.classList.add("hk-glitch"); root.removeAttribute("data-hacker");
    setTimeout(() => root.classList.remove("hk-glitch"), 900);
    cancelAnimationFrame(rainRaf); cancelAnimationFrame(flowRaf);
    for (const n of [panel, crt, banner, rainCv, flowCv]) if (n) { n.classList.remove("on"); setTimeout(() => n.remove(), 650); }
    panel = crt = banner = rainCv = flowCv = null;
    return true;
  }
  addEventListener("keydown", onKey, true);
  window.hackerMode = { on, off, toggle: () => (active ? off() : on()), get active() { return active; }, CFG };
})();


/* =========================================================
   PEMBARUAN 66: SUKUNA PENUH  (modul sukunaTheme)
   Ryomen Sukuna sekarang punya tema sendiri dengan 3 mode, diganti lewat tombol tema (3 segmen: Biasa | Heian | Domain):
   - BIASA  : "Raja Kutukan"  - hitam-merah darah, kabut kutukan, abu & bara naik, tebasan Dismantle melintas acak (kadang dekat kursor),
              aksara 両面宿儺 samar. Klik = Dismantle (tebasan silang) | tiap klik ke-3 = Cleave (tebasan sepanjang layar + gelombang kejut).
   - HEIAN  : "Wujud era Heian" - 4 mata merah raksasa (berkedip, menatap kursor), tanda wajah, dinding api di dasar layar, bara jingga.
              Klik = FŪGA 開: panah api melesat dari tepi layar, menancap, meledak.
   - DOMAIN : "Malevolent Shrine 伏魔御廚子" - langit merah, lautan darah, kuil bertengkorak & tulang rusuk menjulang dengan pantulan,
              tengkorak mengambang, badai tebasan TANPA HENTI (sure-hit). Klik = badai Dismantle + riak air (tiap ke-4 = tebasan penuh layar).
   Dipicu dari menu tombol JJK (pilih Ryomen Sukuna). Gambar semua dibuat kanvas (tanpa file gambar). Bunyi: Web Audio (ikut mati kalau tapSound.on = false).
   Tidak disimpan: muat ulang = kembali seperti semula. Hormati "kurangi gerakan".
   Console: sukunaTheme.enter() | .heian() | .domain() | .biasa() | .off() | .mode | .CFG
   CFG: sound, volume, embers (kepadatan bara, 1 = normal), slashes (kerapatan tebasan latar, 1 = normal, 0 = mati)
========================================================= */
(function sukunaTheme() {
  "use strict";
  const root = document.documentElement;
  const CFG = { sound: true, volume: 1, embers: 1, slashes: 1 };
  const reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const K = reduce ? 0.3 : 1;                         // pengali durasi adegan (kurangi gerakan = jauh lebih singkat)
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, u) => a + (b - a) * u;
  const eo = u => 1 - Math.pow(1 - clamp(u, 0, 1), 3);
  const eio = u => { u = clamp(u, 0, 1); return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
  const tri = v => Math.abs((((v % 2) + 2) % 2) - 1);
  const isOn = () => root.dataset.jjk === "sukuna" && !root.dataset.bleach;
  const modeName = () => root.dataset.sukuna === "heian" ? "heian" : root.dataset.sukuna === "domain" ? "domain" : "biasa";
  const MODES = ["biasa", "heian", "domain"];
  const SKIP = "a,button,input,textarea,select,label,iframe,[role=button],.jjk-secret,.bleach-secret,.music-player,.game-launcher,.game-hub,.theme-toggle,.idcard,.sk-scene,.gj-scene,.gs-menu,.gs-void";
  let busy = false, forcedDark = false, clicks = 0;
  const ptr = { x: -999, y: -999, on: false };
  const lsGet = k => { try { return localStorage.getItem(k); } catch (_) { return null; } };

  /* ---------- bunyi ---------- */
  let ac = null, master = null, nbuf = null;
  const sndOK = () => CFG.sound && !(window.tapSound && window.tapSound.on === false);
  function audio() {
    if (!sndOK()) return null;
    if (ac) { if (ac.state === "suspended") ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    ac = new AC();
    const comp = ac.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    master = ac.createGain(); master.gain.value = 0.55 * CFG.volume; master.connect(comp); comp.connect(ac.destination);
    nbuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    const d = nbuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ac;
  }
  const bus = () => { const g = ac.createGain(); g.connect(master); return g; };
  function stopBus(b) { if (!b || !ac) return; const t = ac.currentTime; b.gain.cancelScheduledValues(t); b.gain.setValueAtTime(b.gain.value, t); b.gain.linearRampToValueAtTime(0, t + 0.25); }
  function tone(d, type, f0, f1, t, dur, vol, att) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || 0.02)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(d); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(d, ft, f0, f1, t, dur, vol, q, att) {
    const s = ac.createBufferSource(); s.buffer = nbuf; s.loop = true;
    const f = ac.createBiquadFilter(); f.type = ft; f.Q.value = q || 1; f.frequency.setValueAtTime(f0, t);
    if (f1) f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + (att || Math.min(0.03, dur / 3))); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(d); s.start(t, Math.random()); s.stop(t + dur + 0.05);
  }
  const swish = (d, t, vol) => { noise(d, "highpass", rnd(3200, 5600), 1800, t, 0.2, vol || 0.2, 1); tone(d, "triangle", rnd(1500, 2000), 300, t, 0.16, (vol || 0.2) * 0.3); };
  function sfxEnter() {
    if (!audio()) return null; const d = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    tone(d, "sawtooth", 48, 42, s(0), 4.8 * K, 0.08, 0.5); noise(d, "lowpass", 500, 120, s(0), 1.4 * K, 0.16, 1, 0.3);
    [0.5, 0.8, 1.1, 1.35, 1.55, 1.75].forEach((x, i) => { noise(d, "highpass", 3500 + i * 400, 1800, s(x), 0.22, 0.24, 1); tone(d, "triangle", 1900 - i * 130, 300, s(x), 0.18, 0.07); });
    tone(d, "sine", 100, 36, s(2.0), 1.3, 0.6); tone(d, "sine", 784, 0, s(2.0), 2.4, 0.04); tone(d, "square", 392, 0, s(2.0), 1.4, 0.025);
    tone(d, "sine", 66, 30, s(4.2), 1.2, 0.5); noise(d, "highpass", 3000, 800, s(4.2), 0.9, 0.2, 1);
    return d;
  }
  function sfxHeian() {
    if (!audio()) return null; const d = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise(d, "bandpass", 260, 900, s(1.4), 4.4 * K, 0.12, 0.8, 1.2);                                   // gemuruh api naik
    [0.5, 1.0].forEach((x, i) => { tone(d, "sine", 72, 38, s(x), 0.7, 0.4 - i * 0.05); tone(d, "sine", 1480, 0, s(x), 1.4, 0.03); });   // mata membuka
    tone(d, "sawtooth", 170, 520, s(3.0), 0.72, 0.035, 0.6); noise(d, "bandpass", 1300, 2200, s(3.0), 0.7, 0.03, 2, 0.5);                  // busur ditarik
    tone(d, "triangle", 540, 110, s(3.7), 0.5, 0.18); tone(d, "sine", 880, 0, s(3.7), 0.9, 0.05);                                         // petikan
    noise(d, "bandpass", 700, 5000, s(3.72), 0.22, 0.32, 1); noise(d, "highpass", 5000, 2500, s(3.78), 0.3, 0.1, 1);                      // panah melesat
    tone(d, "sine", 92, 30, s(3.92), 1.4, 0.75); noise(d, "lowpass", 3200, 200, s(3.92), 1.5, 0.42, 1); noise(d, "highpass", 4500, 1500, s(3.92), 0.35, 0.25, 1);   // ledakan
    tone(d, "sine", 66, 32, s(6.0), 1.1, 0.5); noise(d, "highpass", 3500, 900, s(6.0), 0.8, 0.2, 1);
    return d;
  }
  function sfxDomain() {
    if (!audio()) return null; const d = bus(), t0 = ac.currentTime + 0.05, s = x => t0 + x * K;
    noise(d, "highpass", 4500, 2500, s(0.5), 0.22, 0.32, 1); tone(d, "sine", 140, 50, s(0.5), 0.5, 0.5);                                   // tepukan tangan
    tone(d, "sawtooth", 38, 56, s(0.6), 7 * K, 0.085, 1.2);                                                                              // dengung berat
    noise(d, "lowpass", 400, 1500, s(0.9), 1.5 * K, 0.1, 1, 0.8);                                                                       // darah menyebar
    tone(d, "sine", 40, 78, s(1.5), 1.5 * K, 0.34, 0.9); noise(d, "lowpass", 260, 100, s(1.5), 1.6 * K, 0.2, 1, 0.8);                    // kuil naik
    tone(d, "sine", 90, 34, s(3.1), 1.5, 0.75); noise(d, "lowpass", 1400, 100, s(3.1), 1.4, 0.35, 1); noise(d, "highpass", 4000, 1200, s(3.1), 0.4, 0.28, 1);   // kuil mendarat
    for (let i = 0; i < 16; i++) swish(d, s(3.2 + i * 0.2 + rnd(0, 0.1)), 0.15);                                                         // badai tebasan
    [392, 588, 784, 1175].forEach((f, i) => tone(d, "sine", f, 0, s(3.6 + i * 0.1), 2.4, 0.035));                                         // lonceng
    tone(d, "sine", 70, 32, s(7.0), 1.3, 0.6); noise(d, "highpass", 3000, 800, s(7.0), 0.9, 0.22, 1);
    return d;
  }
  function sfxBack() {
    if (!audio()) return null; const d = bus(), t = ac.currentTime + 0.02;
    swish(d, t + 0.05, 0.28); swish(d, t + 0.14, 0.26); tone(d, "sine", 120, 45, t + 0.08, 0.5, 0.4);
    return d;
  }
  function sfxClick(kind) {
    if (!audio()) return; const t = ac.currentTime, d = master;
    if (kind === "cut") { noise(d, "highpass", 4500, 2000, t, 0.16, 0.2, 1); tone(d, "triangle", 1600, 400, t, 0.14, 0.05); noise(d, "highpass", 5200, 2400, t + 0.07, 0.12, 0.14, 1); }
    else if (kind === "cleave") { noise(d, "highpass", 3200, 1100, t, 0.36, 0.3, 1); tone(d, "sine", 96, 38, t, 0.45, 0.38); tone(d, "triangle", 2000, 260, t, 0.3, 0.07); }
    else if (kind === "fuga") {
      tone(d, "triangle", 620, 120, t, 0.3, 0.14); noise(d, "bandpass", 800, 4200, t + 0.02, 0.22, 0.26, 1);
      tone(d, "sine", 110, 34, t + 0.22, 0.9, 0.5); noise(d, "lowpass", 2600, 200, t + 0.22, 0.7, 0.3, 1); noise(d, "highpass", 4800, 1800, t + 0.22, 0.2, 0.18, 1);
    } else { for (let i = 0; i < 4; i++) swish(d, t + i * 0.05, 0.16); tone(d, "sine", 80, 34, t, 0.5, 0.35); if (kind === "storm2") { noise(d, "lowpass", 2400, 200, t, 0.9, 0.3, 1); tone(d, "sine", 60, 28, t, 1, 0.5); } }
  }

  /* ---------- tebasan (Dismantle / Cleave): bentuk lensa tipis, inti putih + cahaya ---------- */
  function lens(c, x0, y0, x1, y1, w) {
    const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, N = 16;
    c.beginPath();
    for (let i = 0; i <= N; i++) { const p = i / N, hw = w * Math.pow(Math.sin(Math.PI * p), 0.8); const x = x0 + dx * p + nx * hw, y = y0 + dy * p + ny * hw; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
    for (let i = N; i >= 0; i--) { const p = i / N, hw = w * Math.pow(Math.sin(Math.PI * p), 0.8); c.lineTo(x0 + dx * p - nx * hw, y0 + dy * p - ny * hw); }
    c.closePath();
  }
  function drawSlash(c, s) {
    const u = s.t / s.d; if (u < 0 || u >= 1) return;
    const gr = 0.13, head = eo(u / gr), fade = u < gr ? 1 : Math.pow(1 - (u - gr) / (1 - gr), 1.7);
    const ca = Math.cos(s.a), sa = Math.sin(s.a), h = s.len / 2;
    const x0 = s.x - ca * h, y0 = s.y - sa * h, x1 = x0 + ca * s.len * head, y1 = y0 + sa * s.len * head;
    const w = s.w * (0.7 + 0.5 * Math.min(1, u * 4));
    c.save(); c.globalCompositeOperation = "lighter";
    c.fillStyle = "rgba(" + s.rgb + "," + (0.2 * fade).toFixed(3) + ")"; lens(c, x0, y0, x1, y1, w * 5); c.fill();
    c.fillStyle = "rgba(" + s.rgb + "," + (0.6 * fade).toFixed(3) + ")"; lens(c, x0, y0, x1, y1, w * 2); c.fill();
    c.fillStyle = "rgba(" + (s.core || "255,255,255") + "," + (0.95 * fade).toFixed(3) + ")"; lens(c, x0, y0, x1, y1, w * 0.75); c.fill();
    c.restore();
  }
  const COL = { biasa: ["255,48,48", "255,236,236"], heian: ["255,140,50", "255,240,200"], domain: ["255,58,58", "255,238,238"] };
  const mkSlash = (m, x, y, a, len, w, d, t) => ({ x, y, a, len, w, d, t: t || 0, rgb: COL[m][0], core: COL[m][1] });

  /* ---------- 4 mata Sukuna (Heian) ---------- */
  function almond(c, w, h, lift) {
    c.beginPath(); c.moveTo(-w, 0); c.bezierCurveTo(-w * 0.45, -h * 1.35, w * 0.45, -h * 1.35, w, 0);
    c.bezierCurveTo(w * 0.45, h * lift, -w * 0.45, h * lift, -w, 0); c.closePath();
  }
  /* cx,cy = pusat wajah, S = lebar wajah, o1 = bukaan mata atas, o2 = bukaan mata bawah, look = arah tatapan (-1..1), al = kekuatan cahaya */
  function drawEyes(c, cx, cy, S, o1, o2, T, lx, ly, al) {
    const A0 = c.globalAlpha; al = al == null ? 1 : al; if (al <= 0.003 || (o1 <= 0.003 && o2 <= 0.003)) return;
    const pairs = [{ x: 0.3, y: 0, w: 0.16, h: 0.058, o: o1, rot: 0.16 }, { x: 0.27, y: 0.15, w: 0.092, h: 0.034, o: o2, rot: 0.1 }];
    c.save();
    for (const p of pairs) for (let sg = -1; sg <= 1; sg += 2) {
      const open = p.o; if (open <= 0.003) continue;
      c.save(); c.translate(cx + sg * S * p.x, cy + S * p.y); c.rotate(sg * p.rot);
      const ew = S * p.w, eh = S * p.h * Math.max(0.05, open);
      c.globalCompositeOperation = "lighter";
      let g = c.createRadialGradient(0, 0, eh * 0.3, 0, 0, ew * 2.1);
      g.addColorStop(0, "rgba(255,50,30," + (0.5 * al * open).toFixed(3) + ")"); g.addColorStop(0.5, "rgba(200,10,20," + (0.16 * al * open).toFixed(3) + ")"); g.addColorStop(1, "rgba(120,0,10,0)");
      c.fillStyle = g; c.fillRect(-ew * 2.2, -ew * 2.2, ew * 4.4, ew * 4.4);
      c.globalCompositeOperation = "source-over";
      almond(c, ew, eh, 1.0); c.fillStyle = "#0b0204"; c.fill();
      c.save(); almond(c, ew, eh, 1.0); c.clip();
      const ix = clamp(lx, -1, 1) * ew * 0.28, iy = clamp(ly, -1, 1) * eh * 0.25, R = Math.max(eh * 1.25, ew * 0.2);
      g = c.createRadialGradient(ix, iy, R * 0.1, ix, iy, R);
      g.addColorStop(0, "#ffd0a0"); g.addColorStop(0.25, "#ff6a3a"); g.addColorStop(0.65, "#d3101c"); g.addColorStop(1, "#4a0007");
      c.globalAlpha = A0 * al; c.fillStyle = g; c.beginPath(); c.arc(ix, iy, R, 0, TAU); c.fill();
      c.fillStyle = "#050001"; c.beginPath(); c.ellipse(ix, iy, Math.max(1, R * 0.17), eh * 1.1, 0, 0, TAU); c.fill();     // pupil celah
      c.globalAlpha = A0; c.restore();
      c.globalCompositeOperation = "lighter"; almond(c, ew, eh, 1.0);
      c.strokeStyle = "rgba(255,90,70," + (0.85 * al).toFixed(3) + ")"; c.lineWidth = Math.max(1.4, S * 0.006); c.stroke();
      c.restore();
    }
    /* tanda wajah: batang di pangkal hidung + garis pipi di bawah mata bawah */
    const mk = Math.min(o1, o2); if (mk > 0.05) {
      c.globalCompositeOperation = "lighter"; c.lineCap = "round"; c.strokeStyle = "rgba(255,70,55," + (0.3 * mk * al).toFixed(3) + ")"; c.lineWidth = Math.max(1.5, S * 0.011);
      c.beginPath(); c.moveTo(cx - S * 0.16, cy + S * 0.062); c.quadraticCurveTo(cx, cy + S * 0.02, cx + S * 0.16, cy + S * 0.062); c.stroke();
      for (let sg = -1; sg <= 1; sg += 2) {
        c.beginPath(); c.moveTo(cx + sg * S * 0.18, cy + S * 0.215); c.quadraticCurveTo(cx + sg * S * 0.34, cy + S * 0.25, cx + sg * S * 0.47, cy + S * 0.3); c.stroke();
        c.beginPath(); c.moveTo(cx + sg * S * 0.4, cy + S * 0.06); c.quadraticCurveTo(cx + sg * S * 0.5, cy + S * 0.1, cx + sg * S * 0.53, cy + S * 0.16); c.stroke();
      }
    }
    c.restore();
  }

  /* ---------- dinding api (Heian) ---------- */
  function drawFlames(c, W, H, T, u, boost) {
    if (u <= 0.01) return;
    c.save(); c.globalCompositeOperation = "lighter";
    for (let L = 0; L < 3; L++) {
      const amp = H * (0.12 + 0.06 * L) * u * (boost || 1), st = 9;
      const g = c.createLinearGradient(0, H - amp * 1.4, 0, H);
      g.addColorStop(0, "rgba(255,180,70,0)"); g.addColorStop(0.5, "rgba(255," + (120 - L * 25) + ",25,0.17)"); g.addColorStop(1, "rgba(255,55,12,0.42)");
      c.fillStyle = g; c.beginPath(); c.moveTo(0, H + 2);
      for (let x = 0; x <= W + st; x += st) {
        const p1 = tri(x * 0.016 + T * (1.5 + L * 0.5) + L * 3.1), p2 = tri(x * 0.039 - T * (2.3 + L * 0.7) + L * 1.7), p3 = 0.5 + 0.5 * Math.sin(x * 0.005 + T * 0.6 + L * 2);
        c.lineTo(x, H - amp * (0.12 + 0.62 * p1 * (0.4 + 0.6 * p2) + 0.3 * p3 * p1));
      }
      c.lineTo(W + st, H + 2); c.closePath(); c.fill();
    }
    c.restore();
  }

  /* ---------- sprite kuil Malevolent Shrine & tengkorak (digambar sekali, lalu dipakai ulang) ---------- */
  function buildShrineOld(sw) {
    const sh = Math.round(sw * 0.96), cv = document.createElement("canvas"); cv.width = sw; cv.height = sh;
    const x = cv.getContext("2d"), s = sw / 600; x.scale(s, s);
    const roof = (cx, y, w, hgt) => {            // atap melengkung dengan ujung terangkat (gaya karahafu)
      x.beginPath(); x.moveTo(cx - w, y - hgt * 0.5);
      x.bezierCurveTo(cx - w * 0.82, y + hgt * 0.5, cx - w * 0.5, y + hgt * 0.18, cx - w * 0.34, y); x.lineTo(cx + w * 0.34, y);
      x.bezierCurveTo(cx + w * 0.5, y + hgt * 0.18, cx + w * 0.82, y + hgt * 0.5, cx + w, y - hgt * 0.5);
      x.bezierCurveTo(cx + w * 0.9, y + hgt * 1.05, cx + w * 0.4, y + hgt * 1.25, cx, y + hgt * 1.25);
      x.bezierCurveTo(cx - w * 0.4, y + hgt * 1.25, cx - w * 0.9, y + hgt * 1.05, cx - w, y - hgt * 0.5); x.closePath();
    };
    x.lineCap = "round"; x.lineJoin = "round";
    /* tulang rusuk melengkung di kiri-kanan (di belakang bangunan) */
    for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 6; i++) {
      const bx = 300 + side * (150 + i * 24), tx = 300 + side * (70 + i * 14), top = 250 - i * 6 + (i % 2) * 14;
      x.beginPath(); x.moveTo(bx, 540); x.bezierCurveTo(bx + side * 54, 480 - i * 8, bx + side * 22, top + 90, tx, top);
      x.lineWidth = 15 - i * 1.2; x.strokeStyle = "#0b0306"; x.stroke();
      x.lineWidth = 2; x.strokeStyle = "rgba(255,110,90,.38)"; x.stroke();
    }
    /* tangga / alas */
    [[56, 548, 488], [78, 528, 444], [100, 510, 400]].forEach(([iy, w, ww], i) => { x.fillStyle = "#0b0306"; x.fillRect(300 - ww / 2, 540 - i * 0 - (i + 1) * 16 + 16, ww, 17); });
    x.fillStyle = "#0b0306"; x.fillRect(86, 508, 428, 20); x.fillRect(60, 526, 480, 20); x.fillRect(34, 544, 532, 20);
    /* badan bangunan + tiang tulang + pintu menyala */
    x.fillStyle = "#0a0205"; x.fillRect(138, 330, 324, 180);
    for (const px of [150, 214, 376, 440]) { x.fillStyle = "#12080b"; x.fillRect(px - 8, 322, 16, 190); x.fillStyle = "rgba(255,120,100,.4)"; x.fillRect(px - 8, 322, 2, 190); }
    let g = x.createLinearGradient(0, 340, 0, 510); g.addColorStop(0, "rgba(255,60,40,.75)"); g.addColorStop(1, "rgba(255,20,10,.05)");
    x.fillStyle = g; x.fillRect(262, 350, 76, 160);
    x.strokeStyle = "rgba(255,110,90,.5)"; x.lineWidth = 2; x.strokeRect(262, 350, 76, 160);
    /* atap bawah & atas */
    roof(300, 318, 290, 56); x.fillStyle = "#0b0306"; x.fill(); x.strokeStyle = "rgba(255,110,90,.55)"; x.lineWidth = 2.2; x.stroke();
    roof(300, 250, 190, 46); x.fillStyle = "#0b0306"; x.fill(); x.stroke();
    x.fillStyle = "#0a0205"; x.fillRect(214, 252, 172, 24);
    roof(300, 196, 100, 34); x.fillStyle = "#0b0306"; x.fill(); x.stroke();
    /* tengkorak lembu bertanduk di puncak */
    for (let sg = -1; sg <= 1; sg += 2) {
      x.beginPath(); x.moveTo(300 + sg * 22, 150); x.bezierCurveTo(300 + sg * 70, 156, 300 + sg * 112, 130, 300 + sg * 126, 70);
      x.bezierCurveTo(300 + sg * 100, 112, 300 + sg * 62, 128, 300 + sg * 26, 128); x.closePath();
      x.fillStyle = "#0b0306"; x.fill(); x.strokeStyle = "rgba(255,120,100,.6)"; x.lineWidth = 2; x.stroke();
    }
    x.beginPath(); x.ellipse(300, 148, 36, 42, 0, 0, TAU); x.fillStyle = "#0b0306"; x.fill(); x.stroke();
    x.beginPath(); x.moveTo(280, 182); x.lineTo(284, 206); x.lineTo(316, 206); x.lineTo(320, 182); x.closePath(); x.fill(); x.stroke();
    x.fillStyle = "#ff2a1e"; for (const sg of [-1, 1]) { x.beginPath(); x.ellipse(300 + sg * 15, 146, 8, 11, sg * 0.3, 0, TAU); x.fill(); }
    x.fillStyle = "#000"; x.beginPath(); x.ellipse(300, 170, 3, 6, 0, 0, TAU); x.fill();
    /* cahaya merah dari dasar */
    x.globalCompositeOperation = "source-atop";
    g = x.createLinearGradient(0, sh / s, 0, 0); g.addColorStop(0, "rgba(220,20,24,.55)"); g.addColorStop(0.5, "rgba(120,4,10,.16)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g; x.fillRect(0, 0, 600, 580);
    return cv;
  }
  function buildShrine(sw) {   // PEMBARUAN 69: kuil bertanduk, atap hijau menyala, gundukan tengkorak & tulang rusuk
    const sh = Math.round(sw * 0.96), cv = document.createElement("canvas"); cv.width = sw; cv.height = sh;
    const x = cv.getContext("2d"), s = sw / 600; x.scale(s, s);
    let sd = 11; const rr = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
    x.lineCap = "round"; x.lineJoin = "round";
    const roof = (cx, y, w, hgt) => {
      x.beginPath(); x.moveTo(cx - w, y - hgt * 0.5);
      x.bezierCurveTo(cx - w * 0.82, y + hgt * 0.5, cx - w * 0.5, y + hgt * 0.18, cx - w * 0.34, y); x.lineTo(cx + w * 0.34, y);
      x.bezierCurveTo(cx + w * 0.5, y + hgt * 0.18, cx + w * 0.82, y + hgt * 0.5, cx + w, y - hgt * 0.5);
      x.bezierCurveTo(cx + w * 0.9, y + hgt * 1.05, cx + w * 0.4, y + hgt * 1.25, cx, y + hgt * 1.25);
      x.bezierCurveTo(cx - w * 0.4, y + hgt * 1.25, cx - w * 0.9, y + hgt * 1.05, cx - w, y - hgt * 0.5); x.closePath();
    };
    let g;
    for (let sg = -1; sg <= 1; sg += 2) for (let i = 0; i < 4; i++) {   // lengkung tulang raksasa di belakang pintu
      x.beginPath(); x.moveTo(300 + sg * (110 + i * 22), 520); x.bezierCurveTo(300 + sg * (150 + i * 30), 440 - i * 8, 300 + sg * (120 + i * 18), 360 - i * 14, 300 + sg * (66 + i * 10), 330 - i * 8);
      x.lineWidth = 18 - i * 2.5; x.strokeStyle = "#0a0305"; x.stroke(); x.lineWidth = 2; x.strokeStyle = "rgba(190,90,80,.45)"; x.stroke();
    }
    x.fillStyle = "#050102"; x.fillRect(246, 372, 108, 150);
    for (const px of [236, 352]) { g = x.createLinearGradient(px, 0, px + 18, 0); g.addColorStop(0, "#8a2222"); g.addColorStop(0.5, "#5a1212"); g.addColorStop(1, "#2a0507"); x.fillStyle = g; x.fillRect(px, 352, 18, 176); x.fillStyle = "rgba(255,150,130,.35)"; x.fillRect(px, 352, 2, 176); }
    g = x.createRadialGradient(300, 450, 4, 300, 450, 70); g.addColorStop(0, "rgba(255,90,70,.45)"); g.addColorStop(1, "rgba(255,40,30,0)"); x.fillStyle = g; x.fillRect(230, 380, 140, 140);
    x.fillStyle = "#f2eee8"; x.beginPath(); x.moveTo(286, 420); x.lineTo(314, 420); x.lineTo(330, 520); x.lineTo(270, 520); x.closePath(); x.fill();   // Sukuna berjubah putih
    x.beginPath(); x.moveTo(286, 424); x.lineTo(252, 470); x.lineTo(280, 470); x.closePath(); x.fill(); x.beginPath(); x.moveTo(314, 424); x.lineTo(348, 470); x.lineTo(320, 470); x.closePath(); x.fill();
    x.fillStyle = "#e9b9a8"; x.beginPath(); x.arc(300, 408, 9, 0, TAU); x.fill();
    x.fillStyle = "#ee9a9a"; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(300 + i * 3 - 3, 402); x.lineTo(300 + i * 4, 392 - (3 - Math.abs(i)) * 1.2); x.lineTo(300 + i * 3 + 3, 402); x.fill(); }
    x.fillStyle = "#e9b9a8"; x.beginPath(); x.moveTo(300, 428); x.lineTo(295, 440); x.lineTo(305, 440); x.closePath(); x.fill();
    roof(300, 350, 240, 44); g = x.createLinearGradient(0, 330, 0, 392); g.addColorStop(0, "#2a0d0c"); g.addColorStop(1, "#0e0405"); x.fillStyle = g; x.fill(); x.strokeStyle = "rgba(255,130,100,.5)"; x.lineWidth = 2.2; x.stroke();
    g = x.createLinearGradient(0, 352, 0, 376); g.addColorStop(0, "#d6a58c"); g.addColorStop(1, "#6b3a34"); x.fillStyle = g; x.fillRect(176, 352, 248, 22);
    for (let i = 0; i < 14; i++) { x.fillStyle = "#b01c22"; x.beginPath(); x.arc(186 + i * 18.5, 363, 3.6, 0, TAU); x.fill(); }
    roof(300, 300, 150, 34); g = x.createLinearGradient(0, 270, 0, 330); g.addColorStop(0, "#2a0d06"); g.addColorStop(1, "#0c0302"); x.fillStyle = g; x.fill(); x.strokeStyle = "rgba(255,190,110,.6)"; x.lineWidth = 2; x.stroke();
    x.beginPath(); x.moveTo(250, 300); x.lineTo(284, 262); x.lineTo(316, 262); x.lineTo(350, 300); x.closePath();
    g = x.createLinearGradient(0, 262, 0, 300); g.addColorStop(0, "#ffd36a"); g.addColorStop(1, "#a3200c"); x.fillStyle = g; x.fill(); x.strokeStyle = "#fff0b8"; x.lineWidth = 2.2; x.stroke();
    x.beginPath(); x.arc(300, 286, 11, Math.PI, 0); x.lineTo(311, 296); x.lineTo(289, 296); x.closePath(); x.strokeStyle = "#ffffff"; x.lineWidth = 3.4; x.stroke();
    for (let sg = -1; sg <= 1; sg += 2) {   // tanduk sabit di atap
      x.beginPath(); x.moveTo(300 + sg * 70, 292); x.bezierCurveTo(300 + sg * 104, 270, 300 + sg * 104, 222, 300 + sg * 64, 196); x.bezierCurveTo(300 + sg * 86, 226, 300 + sg * 80, 262, 300 + sg * 56, 284); x.closePath();
      x.fillStyle = "#070203"; x.fill(); x.strokeStyle = "rgba(255,170,110,.6)"; x.lineWidth = 1.6; x.stroke();
      x.beginPath(); x.moveTo(300 + sg * 112, 316); x.bezierCurveTo(300 + sg * 150, 300, 300 + sg * 152, 270, 300 + sg * 128, 246); x.bezierCurveTo(300 + sg * 132, 272, 300 + sg * 124, 290, 300 + sg * 100, 306); x.closePath(); x.fill(); x.stroke();
    }
    x.beginPath(); x.moveTo(0, 576); x.bezierCurveTo(50, 530, 130, 486, 230, 482); x.lineTo(370, 482); x.bezierCurveTo(470, 486, 550, 530, 600, 576); x.closePath();   // gundukan
    g = x.createLinearGradient(0, 480, 0, 576); g.addColorStop(0, "#1b090c"); g.addColorStop(1, "#050102"); x.fillStyle = g; x.fill();
    const rib = (cx, cy, z, rot) => { x.save(); x.translate(cx, cy); x.rotate(rot); for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(0, i * 7 * z, 22 * z, Math.PI * 1.05, Math.PI * 1.95); x.lineWidth = 3.2 * z; x.strokeStyle = "#3a2428"; x.stroke(); x.lineWidth = 1; x.strokeStyle = "rgba(220,170,160,.5)"; x.stroke(); } x.restore(); };
    for (let i = 0; i < 16; i++) rib(30 + rr() * 540, 508 + rr() * 56, 0.8 + rr() * 0.9, rr() * 1.2 - 0.6);
    for (let i = 0; i < 70; i++) { const px = 40 + rr() * 520, py = 496 + rr() * 72; if (py < 482 + Math.abs(px - 300) * 0.18) continue; const r = 5 + rr() * 9, gg = x.createRadialGradient(px - r * 0.3, py - r * 0.3, 1, px, py, r); gg.addColorStop(0, "#e0584a"); gg.addColorStop(1, "#5a0b10"); x.fillStyle = gg; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); }
    x.lineWidth = 2.2; x.strokeStyle = "#d8cdbc"; for (let i = 0; i < 40; i++) { const px = 40 + rr() * 520, py = 500 + rr() * 66, an = rr() * 6.28, L = 5 + rr() * 9; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(an) * L, py + Math.sin(an) * L); x.stroke(); }
    for (const sg of [-1, 1]) {   // dua tengkorak bermata merah muda
      const kx = 300 + sg * 172, ky = 452;
      x.fillStyle = "#2a2220"; x.beginPath(); x.ellipse(kx, ky, 34, 26, 0, 0, TAU); x.fill(); x.fillRect(kx - 16, ky + 10, 32, 20);
      x.strokeStyle = "#6a5a52"; x.lineWidth = 2; x.beginPath(); x.ellipse(kx, ky, 34, 26, 0, 0, TAU); x.stroke();
      for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(kx + sg * (16 + i * 8), ky - 18 + i * 2); x.quadraticCurveTo(kx + sg * (30 + i * 12), ky - 50 - i * 8, kx + sg * (22 + i * 14), ky - 78 - i * 6); x.lineWidth = 6 - i; x.strokeStyle = "#1a1012"; x.stroke(); }
      x.fillStyle = "#ff5cd0"; x.beginPath(); x.arc(kx, ky - 2, 8, 0, TAU); x.fill(); x.fillStyle = "#fff"; x.beginPath(); x.arc(kx, ky - 2, 3.5, 0, TAU); x.fill();
    }
    x.globalCompositeOperation = "source-atop"; g = x.createLinearGradient(0, sh / s, 0, 0); g.addColorStop(0, "rgba(180,16,20,.35)"); g.addColorStop(0.6, "rgba(90,4,8,.08)"); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, 600, 580);
    return cv;
  }
  function buildSkull() {
    const cv = document.createElement("canvas"); cv.width = 64; cv.height = 72; const x = cv.getContext("2d");
    x.translate(32, 34);
    x.fillStyle = "#d9cdbd"; x.beginPath(); x.ellipse(0, -2, 22, 24, 0, 0, TAU); x.fill(); x.fillRect(-13, 10, 26, 18);
    x.fillStyle = "#1a0709"; for (const sg of [-1, 1]) { x.beginPath(); x.ellipse(sg * 9, -2, 6, 7.5, 0, 0, TAU); x.fill(); }
    x.beginPath(); x.moveTo(0, 6); x.lineTo(-3.5, 14); x.lineTo(3.5, 14); x.closePath(); x.fill();
    x.strokeStyle = "#1a0709"; x.lineWidth = 1.6; for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 5, 19); x.lineTo(i * 5, 28); x.stroke(); }
    x.beginPath(); x.moveTo(-13, 19); x.lineTo(13, 19); x.stroke();
    const g = x.createLinearGradient(0, -30, 0, 38); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(120,10,16,.65)");
    x.globalCompositeOperation = "source-atop"; x.fillStyle = g; x.fillRect(-40, -40, 80, 90);
    return cv;
  }

  /* ===== PEMBARUAN 69: SUKUNA 1000x (acuan: seni merah bintang hitam, garis emas, Malevolent Shrine) ===== */
  const frac = v => v - Math.floor(v);
  function star4(c, x, y, r, rot, rgb, a) {   // bintang 4 sudut runcing
    c.save(); c.translate(x, y); c.rotate(rot); c.globalAlpha *= a; c.fillStyle = rgb; c.beginPath();
    for (let i = 0; i < 4; i++) { const an = i * Math.PI / 2, bn = an + Math.PI / 4; c.lineTo(Math.cos(an) * r, Math.sin(an) * r); c.lineTo(Math.cos(bn) * r * 0.1, Math.sin(bn) * r * 0.1); }
    c.closePath(); c.fill(); c.restore();
  }
  function shardStars(c, W, H, T, a) {   // BIASA: halo matahari merah + bintang hitam berputar
    c.save();
    let g = c.createRadialGradient(W * 0.72, H * 0.38, 0, W * 0.72, H * 0.38, Math.max(W, H) * 0.6); g.addColorStop(0, "rgba(225,24,28," + (0.4 * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(120,0,10,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const n = W < 760 ? 9 : 16;
    for (let i = 0; i < n; i++) {
      const x = frac(i * 0.618 + 0.13) * W, y = frac(i * 0.382 + 0.27) * H, r = (26 + frac(i * 0.7071) * 90) * (W < 760 ? 0.7 : 1) * (0.85 + 0.15 * Math.sin(T * 1.3 + i * 2));
      c.shadowColor = "rgba(255,40,40,.6)"; c.shadowBlur = 10;
      star4(c, x, y, r, T * 0.05 * (i % 2 ? 1 : -1) + i, "rgba(5,1,2,.7)", a);
    }
    c.restore();
  }
  function goldLines(c, W, H, T, a) {   // HEIAN: garis energi emas bergelombang
    c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round";
    for (let i = 0; i < 6; i++) {
      const y0 = H * (0.2 + 0.11 * i), amp = H * 0.05, ph = T * (0.4 + 0.08 * i) + i * 1.9;
      c.beginPath();
      for (let x = -20; x <= W + 20; x += 24) { const y = y0 + Math.sin(x * 0.006 + ph) * amp + Math.sin(x * 0.017 - ph * 1.6) * amp * 0.35; if (x < 0) c.moveTo(x, y); else c.lineTo(x, y); }
      c.strokeStyle = "rgba(255,170,30," + (0.1 * a).toFixed(3) + ")"; c.lineWidth = 9; c.stroke();
      c.strokeStyle = "rgba(255,226,110," + (0.38 * a).toFixed(3) + ")"; c.lineWidth = 2.4; c.stroke();
    }
    c.restore();
  }
  function skyClouds(c, W, hz, T, a, sx) {   // DOMAIN: awan badai merah menyala di cakrawala
    c.save();
    let g = c.createRadialGradient(sx, hz, 0, sx, hz, W * 0.6); g.addColorStop(0, "rgba(255,92,24," + (0.5 * a).toFixed(3) + ")"); g.addColorStop(0.45, "rgba(190,24,10," + (0.22 * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(120,0,0,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, hz + 1);
    for (let i = 0; i < 22; i++) {
      const lit = i % 3 === 0, x = frac(i * 0.6180339 + T * 0.004) * W * 1.3 - W * 0.15, y = hz * (0.12 + 0.78 * frac(i * 0.4142 + 0.2)), r = W * (0.1 + 0.1 * frac(i * 0.7321));
      const near = 1 - Math.min(1, Math.abs(x - sx) / (W * 0.45)), k = lit ? 0.22 * near * (0.4 + y / hz) : 0.34 * (1 - 0.5 * y / hz), col = lit ? "255,70,20" : "14,0,3";
      g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, "rgba(" + col + "," + (k * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + col + ",0)");
      c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
    }
    c.restore();
  }
  function waterGlints(c, W, hz, H, T, a) {   // kilau putih-cyan di laut gelap
    c.save(); c.globalCompositeOperation = "lighter";
    const n = W < 760 ? 60 : 120;
    for (let i = 0; i < n; i++) {
      const p = Math.pow(frac(i * 0.382 + 0.11), 1.5), x = frac(i * 0.6180339 + Math.sin(T * 0.3 + i) * 0.004) * W, y = hz + 6 + (H - hz - 8) * p;
      const tw = Math.max(0, Math.sin(T * (1.2 + (i % 5) * 0.4) + i * 2.3)); if (tw < 0.25) continue;
      c.fillStyle = (i % 3 ? "rgba(255,238,220," : "rgba(255,176,80,") + (0.55 * tw * a * (0.3 + p)).toFixed(3) + ")";
      c.beginPath(); c.ellipse(x, y, 2 + p * 16 * (0.5 + frac(i * 0.17)), 0.6 + p * 2.4, 0, 0, TAU); c.fill();
    }
    c.restore();
  }
  function eyeGlow(c, G, shrine, y0, T, gl, a) {   // mata merah muda tengkorak + lambang hijau atap, berdenyut
    const ss = shrine.width / 600, k = (0.6 + 0.4 * Math.sin(T * 2.4)) * gl, ox = G.sx - shrine.width / 2;
    [[128, 450, "255,60,200", 40], [472, 450, "255,60,200", 40], [300, 282, "255,190,70", 46]].forEach(e => {
      const x = ox + e[0] * ss, y = y0 + e[1] * ss, r = e[3] * ss * 2, g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255," + (0.8 * k * a).toFixed(3) + ")"); g.addColorStop(0.25, "rgba(" + e[2] + "," + (0.7 * k * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + e[2] + ",0)");
      c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2);
    });
    return 0;
  }
  function drawCross(c, o, al) {   // kilau salib putih (seperti acuan Sukuna)
    const u = o.t / o.d, L = o.r1 * eo(u * 3), w = 4 * al + 1;
    c.save(); c.globalCompositeOperation = "lighter";
    const g = c.createRadialGradient(o.x, o.y, 0, o.x, o.y, L * 0.5); g.addColorStop(0, "rgba(255,255,255," + (0.9 * al).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,80,80,0)");
    c.fillStyle = g; c.beginPath(); c.arc(o.x, o.y, L * 0.5, 0, TAU); c.fill();
    c.fillStyle = "rgba(255,255,255," + al.toFixed(3) + ")"; lens(c, o.x - L, o.y, o.x + L, o.y, w); c.fill(); lens(c, o.x, o.y - L, o.x, o.y + L, w); c.fill();
    for (let i = 0; i < 6; i++) star4(c, o.x + Math.cos(i * 1.7 + 1) * L * 0.55, o.y + Math.sin(i * 2.3) * L * 0.4, 10 + i * 2, i, "rgba(255,230,230,1)", al);
    c.restore();
  }

  /* ===== PEMBARUAN 70: Domain lebih dahsyat (gerhana + spire tulang), Heian tanpa mata (mandala api), semua biru dibuang ===== */
  function eclipse(c, W, hz, T, a, sx, sw) {
    const r = Math.min(W, hz) * 0.2, cx = sx, cy = hz - sw * 0.62;
    c.save(); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 28; i++) {
      const an = i / 28 * TAU + T * 0.04, L = r * (2.2 + 1.6 * frac(i * 0.37) + 0.3 * Math.sin(T * 1.5 + i)), ex = cx + Math.cos(an) * L, ey = cy + Math.sin(an) * L;
      const g = c.createLinearGradient(cx, cy, ex, ey); g.addColorStop(0, "rgba(255,70,40," + (0.28 * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,40,20,0)");
      c.strokeStyle = g; c.lineWidth = 3 + 6 * frac(i * 0.71); c.beginPath(); c.moveTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r); c.lineTo(ex, ey); c.stroke();
    }
    const g2 = c.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 2); g2.addColorStop(0, "rgba(255,110,50," + (0.55 * a).toFixed(3) + ")"); g2.addColorStop(1, "rgba(255,40,20,0)");
    c.fillStyle = g2; c.beginPath(); c.arc(cx, cy, r * 2, 0, TAU); c.fill();
    c.globalCompositeOperation = "source-over"; c.fillStyle = "rgba(3,0,1," + (0.97 * a).toFixed(3) + ")"; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.fill();
    c.strokeStyle = "rgba(255,200,150," + (0.8 * a).toFixed(3) + ")"; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke();
    for (let i = 0; i < 10; i++) {   // spire tulang menjulang di cakrawala
      const sg = i % 2 ? 1 : -1, d = 0.18 + 0.3 * frac(i * 0.618), x = sx + sg * W * d, h = hz * (0.14 + 0.2 * frac(i * 0.37 + 0.1)), w = 6 + 8 * frac(i * 0.53);
      c.fillStyle = "rgba(6,1,3," + (0.92 * a).toFixed(3) + ")"; c.beginPath(); c.moveTo(x - w, hz); c.quadraticCurveTo(x - w * 0.3 + sg * 10, hz - h * 0.6, x + sg * w * 2.4, hz - h); c.quadraticCurveTo(x + w * 0.4, hz - h * 0.5, x + w, hz); c.closePath(); c.fill();
    }
    c.restore();
  }
  function fireMandala(c, cx, cy, R, T, k) {   // HEIAN: pengganti mata = mandala api raksasa berputar
    if (k <= 0.01) return;
    c.save(); c.translate(cx, cy); c.globalCompositeOperation = "lighter";
    let g = c.createRadialGradient(0, 0, R * 0.2, 0, 0, R * 2.2); g.addColorStop(0, "rgba(255,120,30," + (0.5 * k).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,50,10,0)"); c.fillStyle = g; c.beginPath(); c.arc(0, 0, R * 2.2, 0, TAU); c.fill();
    for (let ring = 0; ring < 3; ring++) { c.strokeStyle = "rgba(255," + (150 - ring * 30) + ",50," + (0.6 * k).toFixed(3) + ")"; c.lineWidth = 2.6 - ring * 0.5; c.setLineDash([R * 0.08, R * 0.05 + ring * 4]); c.lineDashOffset = -T * 40 * (ring % 2 ? -1 : 1); c.beginPath(); c.arc(0, 0, R * (0.7 + ring * 0.28), 0, TAU); c.stroke(); }
    c.setLineDash([]);
    for (let i = 0; i < 12; i++) {
      const fl = 0.8 + 0.2 * Math.sin(T * 6 + i * 2); c.save(); c.rotate(i / 12 * TAU + T * 0.35); c.fillStyle = "rgba(255," + (110 + 60 * (i % 2)) + ",40," + (0.55 * k).toFixed(3) + ")";
      c.beginPath(); c.moveTo(R * 0.95, 0); c.quadraticCurveTo(R * 1.25, -R * 0.12, R * 1.55 * fl, 0); c.quadraticCurveTo(R * 1.25, R * 0.12, R * 0.95, 0); c.fill(); c.restore();
    }
    c.globalCompositeOperation = "source-over"; c.fillStyle = "rgba(4,0,1," + (0.95 * k).toFixed(3) + ")"; c.beginPath(); c.arc(0, 0, R * 0.62, 0, TAU); c.fill();
    c.strokeStyle = "rgba(255,190,110," + (0.9 * k).toFixed(3) + ")"; c.lineWidth = 2.5; c.stroke(); c.globalCompositeOperation = "lighter";
    for (let i = -1; i <= 2; i++) { const x = (i - 0.5) * R * 0.2; c.strokeStyle = "rgba(255,60,30," + (0.9 * k).toFixed(3) + ")"; c.lineWidth = R * 0.045; c.beginPath(); c.moveTo(x, -R * 0.5); c.lineTo(x + R * 0.05, R * 0.5); c.stroke(); c.strokeStyle = "rgba(255,235,200," + (0.9 * k).toFixed(3) + ")"; c.lineWidth = R * 0.012; c.stroke(); }
    c.restore();
  }

  /* ===== PEMBARUAN 71: ROMBAK TOTAL SUKUNA. Konsep: "Raja Kutukan" = hitam, merah darah, putih tulang, emas. Tanpa biru, tanpa mata ===== */
  function sunDisc(c, cx, cy, R, T, k) {   // HEIAN: matahari merah dibelah 4 tebasan Dismantle
    if (k <= 0.01) return;
    c.save(); c.translate(cx, cy); c.globalAlpha *= Math.min(1, k); c.globalCompositeOperation = "lighter";
    for (let i = 0; i < 36; i++) { const an = i / 36 * TAU + T * 0.06, L = R * (1.5 + 0.9 * frac(i * 0.37) + 0.2 * Math.sin(T * 2 + i)); c.strokeStyle = "rgba(255," + (120 + (i % 3) * 40) + ",40,0.22)"; c.lineWidth = 3 + 5 * frac(i * 0.71); c.beginPath(); c.moveTo(Math.cos(an) * R, Math.sin(an) * R); c.lineTo(Math.cos(an) * L, Math.sin(an) * L); c.stroke(); }
    let g = c.createRadialGradient(0, 0, R * 0.8, 0, 0, R * 2.2); g.addColorStop(0, "rgba(255,120,30,.5)"); g.addColorStop(1, "rgba(255,50,10,0)"); c.fillStyle = g; c.beginPath(); c.arc(0, 0, R * 2.2, 0, TAU); c.fill();
    c.globalCompositeOperation = "source-over"; g = c.createRadialGradient(-R * 0.2, -R * 0.2, R * 0.1, 0, 0, R); g.addColorStop(0, "#fff2b8"); g.addColorStop(0.5, "#ff8a1e"); g.addColorStop(1, "#b81408"); c.fillStyle = g; c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fill();
    c.save(); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.clip(); c.fillStyle = "rgba(5,0,1,.92)";
    for (let i = 0; i < 4; i++) { const o = (i - 1.5) * R * 0.42; lens(c, -R * 1.1 + o, R * 1.1, R * 0.9 + o, -R * 1.3, R * 0.07); c.fill(); }
    c.restore(); c.restore();
  }
  function pagoda(c, x, y, w, n, col, T, i) {   // siluet pagoda Heian terbakar
    const h = w * 0.55; c.fillStyle = col; c.fillRect(x - w * 0.18, y - h * n, w * 0.36, h * n);
    for (let t = 0; t < n; t++) {
      const ry = y - h * (t + 0.55), rw = w * (1 - t * 0.17);
      c.beginPath(); c.moveTo(x - rw, ry - w * 0.1); c.quadraticCurveTo(x - rw * 0.5, ry + w * 0.06, x, ry + w * 0.06); c.quadraticCurveTo(x + rw * 0.5, ry + w * 0.06, x + rw, ry - w * 0.1); c.lineTo(x + rw * 0.8, ry - w * 0.02); c.lineTo(x - rw * 0.8, ry - w * 0.02); c.closePath(); c.fill();
      if (Math.sin(T * 3 + i * 2 + t) > -0.3) { c.fillStyle = "rgba(255,150,40,.9)"; c.fillRect(x - 3, ry - h * 0.45, 6, 9); c.fillStyle = col; }
    }
    c.fillRect(x - 1.5, y - h * n - w * 0.4, 3, w * 0.4);
  }
  function ribFrame(c, W, H, T, k) {   // DOMAIN: kamu berdiri DI DALAM tulang rusuk raksasa
    if (k <= 0.01) return;
    c.save(); c.lineCap = "round"; const n = W < 760 ? 4 : 6, br = 1 + 0.012 * Math.sin(T * 0.9);
    for (let sd = -1; sd <= 1; sd += 2) for (let i = 0; i < n; i++) {
      const x0 = sd < 0 ? -W * 0.03 : W * 1.03, y0 = H * (1.0 - i * 0.16), x1 = W * (0.5 + sd * (0.5 - (0.22 + i * 0.02))), y1 = y0 - H * 0.38 * br, px = W * (0.5 + sd * (0.5 - 0.2)), py = y0 - H * 0.26;
      const P = []; for (let j = 0; j <= 14; j++) { const t = j / 14, m = 1 - t; P.push([m * m * x0 + 2 * m * t * px + t * t * x1, m * m * y0 + 2 * m * t * py + t * t * y1, W * 0.035 * (1 - t * 0.86) * k]); }
      for (const pass of [0, 1]) for (let j = 0; j < 14; j++) { c.strokeStyle = pass ? "rgba(255,170,140,.28)" : "rgba(6,1,3,.95)"; c.lineWidth = pass ? 1.6 : P[j][2]; c.beginPath(); c.moveTo(P[j][0], P[j][1]); c.lineTo(P[j + 1][0], P[j + 1][1]); c.stroke(); }
    }
    c.restore();
  }
  function bloodRain(c, W, H, T, k) {
    c.save(); c.strokeStyle = "rgba(255,50,50," + (0.35 * k).toFixed(3) + ")"; c.lineWidth = 1.3; c.beginPath();
    const n = W < 760 ? 40 : 80;
    for (let i = 0; i < n; i++) { const x = frac(i * 0.618 + 0.3) * W, y = (frac(i * 0.382) * H + T * (260 + (i % 7) * 40)) % (H * 1.1) - H * 0.05, L = 14 + (i % 5) * 7; c.moveTo(x, y); c.lineTo(x - 3, y + L); }
    c.stroke(); c.restore();
  }

  /* ---------- penggambar utama (dipakai latar DAN adegan, jadi hasilnya persis sama) ---------- */
  function makeRenderer(cv) {
    const c = cv.getContext("2d");
    let W = 0, H = 0, D = 1, T = 0, shrine = null, shrineW = 0, lastM = "";
    const em = [], sl = []; let nextSl = 1, blinkIn = rnd(3, 6), blink = 0, flash = 0, skulls = null;
    const skullSpr = buildSkull();
    function resize(d) { D = d || 1; W = innerWidth; H = innerHeight; cv.width = Math.round(W * D); cv.height = Math.round(H * D); c.setTransform(D, 0, 0, D, 0, 0); shrine = null; em.length = 0; }
    function geo() {
      const mob = W < 760, hz = H * (mob ? 0.6 : 0.62), sw = Math.min(W * (mob ? 0.92 : 0.5), H * 0.66, 760);
      return { W, H, mob, hz, sw, sx: mob ? W * 0.5 : W * 0.7, ex: mob ? W * 0.5 : W * 0.76, ey: mob ? H * 0.2 : H * 0.34, es: mob ? Math.min(W * 0.78, 340) : Math.min(W * 0.4, H * 0.7, 560) };
    }
    const EMP = { biasa: { n: 55, col: "255,60,50", vy: [16, 46], s: [1, 2.6] }, heian: { n: 140, col: "255,150,55", vy: [40, 120], s: [1, 3.2] }, domain: { n: 80, col: "255,55,45", vy: [18, 70], s: [1, 2.6] } };
    function spawnEm(m, init, G) {
      const P = EMP[m], y0 = m === "domain" ? G.hz : 0;
      em.push({ x: rnd(0, W), y: init ? rnd(y0, H) : H + rnd(2, 30), vy: rnd(P.vy[0], P.vy[1]), s: rnd(P.s[0], P.s[1]), ph: rnd(0, TAU), fq: rnd(0.6, 2), life: rnd(0.4, 1) });
    }
    function drawEmbers(dt, m, G, a) {
      const P = EMP[m], want = Math.round(P.n * CFG.embers * (W < 760 ? 0.6 : 1));
      while (em.length < want) spawnEm(m, true, G);
      while (em.length > want) em.pop();
      c.save(); c.globalCompositeOperation = "lighter";
      for (let i = 0; i < em.length; i++) {
        const e = em[i]; e.y -= e.vy * dt; e.x += Math.sin(T * e.fq + e.ph) * 14 * dt; e.life -= dt * 0.02;
        if (e.y < -10 || (m === "domain" && e.y < G.hz - H * 0.25) || e.life <= 0) { em.splice(i, 1); i--; continue; }
        const fl = 0.55 + 0.45 * Math.sin(T * 7 + e.ph * 3);
        c.fillStyle = "rgba(" + P.col + "," + (0.55 * fl * a * clamp(e.y / (H * 0.4), 0.15, 1)).toFixed(3) + ")";
        c.beginPath(); c.arc(e.x, e.y, e.s, 0, TAU); c.fill();
        c.fillStyle = "rgba(" + P.col + "," + (0.1 * fl * a).toFixed(3) + ")"; c.beginPath(); c.arc(e.x, e.y, e.s * 3.4, 0, TAU); c.fill();
      }
      c.restore();
    }
    function spawnSlash(m, big) {
      let x = rnd(-0.05 * W, 1.05 * W), y = rnd(0, H);
      if (ptr.on && Math.random() < 0.3) { x = ptr.x + rnd(-130, 130); y = ptr.y + rnd(-130, 130); }
      const len = big ? Math.hypot(W, H) * 1.15 : rnd(0.22, 0.65) * Math.max(W, H);
      sl.push(mkSlash(m, x, y, rnd(0, Math.PI), len, big ? 5.5 : rnd(1.3, 3.1), big ? 0.95 : rnd(0.45, 0.85)));
      if (big && m === "domain") flash = 1;
    }
    function drawAmbient(dt, m, a, rate) {
      if (CFG.slashes > 0) {
        nextSl -= dt * (rate == null ? 1 : rate);
        if (nextSl <= 0) {
          nextSl = (m === "domain" ? rnd(0.28, 0.85) : m === "heian" ? rnd(0.9, 2.2) : rnd(1.0, 2.6)) / CFG.slashes;
          const n = m === "domain" && Math.random() < 0.35 ? 3 : 1;
          for (let i = 0; i < n; i++) spawnSlash(m, m === "domain" && Math.random() < 0.1);
        }
      }
      c.save(); c.globalAlpha *= a;
      for (let i = 0; i < sl.length; i++) { sl[i].t += dt; if (sl[i].t >= sl[i].d) { sl.splice(i, 1); i--; continue; } drawSlash(c, sl[i]); }
      c.restore();
    }
    function vignette(k) {
      const g = c.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.hypot(W, H) * 0.62);
      g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0," + k + ")"); c.fillStyle = g; c.fillRect(0, 0, W, H);
    }
    function fog(a, t, col, k) {
      for (let i = 0; i < 3; i++) {
        const fx = W * (0.25 + 0.5 * i / 2 + 0.12 * Math.sin(T * 0.07 + i * 2.1)), fy = H * (0.35 + 0.25 * Math.sin(T * 0.05 + i * 1.3)), r = Math.max(W, H) * (0.5 + 0.1 * i);
        const g = c.createRadialGradient(fx, fy, 0, fx, fy, r); g.addColorStop(0, "rgba(" + col + "," + (k * t * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + col + ",0)");
        c.fillStyle = g; c.fillRect(0, 0, W, H);
      }
    }
    function ribbons(a, k) {                 // pita asap kutukan yang mengalir pelan
      c.save(); c.globalCompositeOperation = "lighter"; c.lineCap = "round"; c.lineJoin = "round";
      for (let i = 0; i < 4; i++) {
        const y0 = H * (0.16 + 0.22 * i), amp = H * (0.06 + 0.02 * i), sp = 0.14 + 0.05 * i, lw = H * (0.07 + 0.025 * i);
        const g = c.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "rgba(160,10,26,0)"); g.addColorStop(0.5, "rgba(210,24,40," + (0.05 * a * k).toFixed(3) + ")"); g.addColorStop(1, "rgba(160,10,26,0)");
        c.strokeStyle = g;
        for (let pass = 0; pass < 5; pass++) {
          c.lineWidth = lw * (1 - pass * 0.2); c.beginPath();
          for (let x = -30; x <= W + 30; x += 30) { const y = y0 + Math.sin(x * 0.0042 + T * sp + i * 1.7) * amp + Math.sin(x * 0.011 - T * sp * 1.7 + i) * amp * 0.4; if (x < 0) c.moveTo(x, y); else c.lineTo(x, y); }
          c.stroke();
        }
      }
      c.restore();
    }
    function frame(dt, m, a, o) {
      o = o || {}; a = a == null ? 1 : a; T += dt; const G = geo();
      if (m !== lastM) { lastM = m; em.length = 0; sl.length = 0; }
      c.clearRect(0, 0, W, H); c.save(); c.globalAlpha = 1;
      if (m === "biasa") frameBiasa(dt, a, o, G); else if (m === "heian") frameHeian(dt, a, o, G); else frameDomain(dt, a, o, G);
      if (flash > 0.01) { c.fillStyle = "rgba(255,235,235," + (flash * 0.2 * a).toFixed(3) + ")"; c.fillRect(0, 0, W, H); flash *= Math.exp(-dt * 7); }
      c.restore();
    }
    function frameBiasa(dt, a, o, G) {   // PEMBARUAN 71: layar manga merah: screentone, luka sayatan, tato U, aksara 斬
      const fg = o.fog == null ? 1 : o.fog, mn = Math.min(W, H);
      c.globalAlpha = a;
      let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#060103"); g.addColorStop(0.6, "#2a0409"); g.addColorStop(1, "#5a0810"); c.fillStyle = g; c.fillRect(0, 0, W, H);
      g = c.createRadialGradient(W * 0.74, H * 0.34, 0, W * 0.74, H * 0.34, mn * 0.75); g.addColorStop(0, "rgba(235,30,34," + (0.5 * fg).toFixed(3) + ")"); g.addColorStop(1, "rgba(120,0,10,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.fillStyle = "rgba(255,70,70,.16)"; c.beginPath(); const st = 20, mx = Math.hypot(W, H) * 0.7;
      for (let gy = 0; gy < H; gy += st) for (let gx = 0; gx < W; gx += st) { const d = Math.hypot(gx, H - gy) / mx; if (d > 1) continue; const r = (1 - d) * st * 0.42; if (r < 0.8) continue; const x = gx + ((gy / st) % 2) * st / 2; c.moveTo(x + r, gy); c.arc(x, gy, r, 0, TAU); }
      c.fill();
      c.save(); c.globalAlpha = a * 0.08 * fg; c.fillStyle = "#ff3040"; c.textAlign = "center"; c.textBaseline = "middle"; c.font = "900 " + mn * 0.9 + "px 'Noto Serif JP','Yu Mincho',serif"; c.fillText("斬", W * 0.22, H * 0.52); c.restore();
      const U = (x, y, s, rot) => { c.save(); c.translate(x, y); c.rotate(rot); c.lineCap = "round"; c.beginPath(); c.moveTo(-s, -s * 0.7); c.lineTo(-s, 0); c.arc(0, 0, s, Math.PI, 0, true); c.lineTo(s, -s * 0.7); c.strokeStyle = "rgba(0,0,0,.75)"; c.lineWidth = s * 0.36; c.stroke(); c.strokeStyle = "rgba(255,70,60,.35)"; c.lineWidth = 2; c.stroke(); c.restore(); };
      U(W * 0.8, H * 0.74, mn * 0.07, 0.1); U(W * 0.93, H * 0.66, mn * 0.056, -0.15); U(W * 0.07, H * 0.2, mn * 0.063, 0.2);
      const pts = [], n = 22; for (let i = 0; i <= n; i++) { const k = i / n; pts.push([W * (-0.05 + 1.1 * k) + (i % 2 ? 1 : -1) * mn * 0.025 * frac(i * 0.77), H * (0.8 - 0.62 * k) + (i % 3 - 1) * mn * 0.03 * frac(i * 0.43 + 0.2)]); }
      c.save(); c.globalCompositeOperation = "lighter"; c.lineJoin = "round"; const pl = 0.75 + 0.25 * Math.sin(T * 2.2) * fg;
      [[26, "rgba(255,40,40," + (0.16 * pl) + ")"], [9, "rgba(255,120,60," + (0.5 * pl) + ")"], [2.4, "rgba(255,245,230," + (0.95 * pl) + ")"]].forEach(l => { c.lineWidth = l[0]; c.strokeStyle = l[1]; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); });
      [3, 7, 11, 15, 19].forEach((i, j) => { const p = pts[i], sg = j % 2 ? 1 : -1; c.lineWidth = 1.6; c.strokeStyle = "rgba(255,200,170," + (0.7 * pl) + ")"; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(p[0] + sg * mn * 0.07, p[1] + mn * 0.1); c.lineTo(p[0] + sg * mn * 0.12, p[1] + mn * 0.13); c.stroke(); });
      c.restore();
      shardStars(c, W, H, T, 1);
      drawEmbers(dt, "biasa", G, a); drawAmbient(dt, "biasa", a, 1);
      c.globalAlpha = a; vignette(0.6);
    }
    function frameBiasaOld(dt, a, o, G) {
      const fg = o.fog == null ? 1 : o.fog;
      let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#14020a"); g.addColorStop(0.5, "#4a050c"); g.addColorStop(1, "#26030a");
      c.globalAlpha = a; c.fillStyle = g; c.fillRect(0, 0, W, H);
      fog(a, fg, "170,12,28", 0.2); ribbons(a, fg);
      /* aksara 両面宿儺 samar di kanan */
      c.save(); c.globalAlpha = a * (0.07 + 0.03 * Math.sin(T * 0.6)) * fg; c.fillStyle = "#ff3a3a"; c.textAlign = "center"; c.textBaseline = "middle";
      const fs = Math.min(H * 0.2, W * (G.mob ? 0.3 : 0.12)); c.font = "900 " + fs + "px 'Noto Serif JP','Yu Mincho',serif";
      "両面宿儺".split("").forEach((ch, i) => c.fillText(ch, W - fs * 0.85, H * 0.5 + (i - 1.5) * fs * 1.05)); c.restore();
      c.globalAlpha = a; shardStars(c, W, H, T, a); drawEmbers(dt, "biasa", G, a); drawAmbient(dt, "biasa", a, 1);
      c.globalAlpha = a; vignette(0.6);
    }
    function frameHeian(dt, a, o, G) {   // PEMBARUAN 71: tanpa mata. Kota Heian terbakar, matahari dibelah 4 tebasan, panah Fuga
      c.globalAlpha = a; const mn = Math.min(W, H), gy = H * 0.8;
      let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#050102"); g.addColorStop(0.5, "#3a0806"); g.addColorStop(0.85, "#b8320a"); g.addColorStop(1, "#ff8a1e"); c.fillStyle = g; c.fillRect(0, 0, W, H);
      sunDisc(c, G.mob ? W * 0.5 : W * 0.7, H * 0.36, mn * (G.mob ? 0.26 : 0.22), T, 1);
      goldLines(c, W, H, T, 0.7);
      [["rgba(34,6,6,.95)", 0.8, 5], ["rgba(10,2,3,1)", 1.15, 4]].forEach((L, li) => {
        c.fillStyle = L[0]; const base = gy + li * H * 0.04;
        for (let i = 0; i < L[2] * (W < 760 ? 1 : 2); i++) pagoda(c, frac(i * 0.618 + li * 0.37 + 0.05) * W, base, mn * 0.09 * L[1] * (0.7 + frac(i * 0.53)), 3 + (i + li) % 3, L[0], T, i);
        c.fillRect(0, base, W, H - base);
      });
      c.globalAlpha = a; drawFlames(c, W, H, T, o.flame == null ? 1 : o.flame, o.boost);
      const pa = 0.6 + 0.4 * Math.sin(T * 2);
      c.save(); c.globalCompositeOperation = "lighter"; c.fillStyle = "rgba(255,110,30," + (0.22 * pa).toFixed(3) + ")"; lens(c, W * 0.06, H * 0.7, W * 0.92, H * 0.3, 20); c.fill(); c.fillStyle = "rgba(255,230,170," + (0.7 * pa).toFixed(3) + ")"; lens(c, W * 0.06, H * 0.7, W * 0.92, H * 0.3, 3); c.fill(); c.restore();
      drawEmbers(dt, "heian", G, a); drawAmbient(dt, "heian", a, 1);
      c.globalAlpha = a; vignette(0.55);
    }
    function frameHeianOld(dt, a, o, G) {
      let g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#070103"); g.addColorStop(0.55, "#1a0509"); g.addColorStop(1, "#401006");
      c.globalAlpha = a; c.fillStyle = g; c.fillRect(0, 0, W, H);
      g = c.createRadialGradient(W / 2, H * 1.05, 0, W / 2, H * 1.05, H * 0.95); g.addColorStop(0, "rgba(255,110,25,.38)"); g.addColorStop(1, "rgba(255,60,10,0)"); c.fillStyle = g; c.fillRect(0, 0, W, H);
      fog(a, 0.7, "190,40,14", 0.16);
      /* 4 mata + kedipan */
      blinkIn -= dt; if (blinkIn <= 0) { blink = 0.001; blinkIn = rnd(5, 9); }
      let bl = 1; if (blink > 0) { blink += dt; const u = blink / 0.26; bl = u < 0.45 ? 1 - u / 0.45 : u < 1 ? (u - 0.45) / 0.55 : 1; if (u >= 1) blink = 0; }
      const e = o.eyes || [1, 1], lx = clamp((ptr.x - G.ex) / (W * 0.5), -1, 1), ly = clamp((ptr.y - G.ey) / (H * 0.5), -1, 1);
      const pulse = 0.85 + 0.15 * Math.sin(T * 1.4);
      c.globalAlpha = a * (G.mob ? 0.8 : 0.92); fireMandala(c, G.ex, G.ey, G.es * 0.4, T, (e[0] + e[1]) / 2 * pulse);
      c.globalAlpha = a; goldLines(c, W, H, T, a * 0.9); drawFlames(c, W, H, T, o.flame == null ? 1 : o.flame, o.boost);
      drawEmbers(dt, "heian", G, a); drawAmbient(dt, "heian", a, 1);
      c.globalAlpha = a; vignette(0.55);
    }
    function frameDomain(dt, a, o, G) {   // PEMBARUAN 71: domain lama + tulang rusuk raksasa membingkai + hujan darah
      frameDomainOld(dt, a, o, G);
      c.save(); c.globalAlpha = a; const rise = o.rise == null ? 1 : o.rise; ribFrame(c, W, H, T, rise); bloodRain(c, W, H, T, rise); c.restore();
    }
    function frameDomainOld(dt, a, o, G) {
      const fl = o.floor == null ? 1 : o.floor, rise = o.rise == null ? 1 : o.rise, gl = o.glow == null ? 1 : o.glow, hz = G.hz;
      c.globalAlpha = a;
      let g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, "#040001"); g.addColorStop(0.55, "#2a0306"); g.addColorStop(1, "#8a1208");
      c.fillStyle = g; c.fillRect(0, 0, W, hz + 1);
      /* matahari merah raksasa di belakang kuil */
      const mr = Math.min(W, H) * (G.mob ? 0.3 : 0.24), mx = G.sx, my = hz - G.sw * 0.5;
      g = c.createRadialGradient(mx, my, mr * 0.2, mx, my, mr * 2.4); g.addColorStop(0, "rgba(255,70,50," + (0.42 * rise) + ")"); g.addColorStop(0.35, "rgba(200,20,25," + (0.2 * rise) + ")"); g.addColorStop(1, "rgba(120,0,10,0)");
      c.fillStyle = g; c.fillRect(0, 0, W, hz + 1);
      c.fillStyle = "rgba(255,95,70," + (0.12 * rise) + ")"; c.beginPath(); c.arc(mx, my, mr, 0, TAU); c.fill();
      eclipse(c, W, hz, T, a * rise, G.sx, G.sw); skyClouds(c, W, hz, T, a, G.sx); fog(a, 0.6, "150,10,22", 0.14);
      /* lautan darah */
      if (fl > 0.01) {
        c.save(); const half = W * fl / 2; c.beginPath(); c.rect(W / 2 - half, hz, half * 2, H - hz); c.clip();
        g = c.createLinearGradient(0, hz, 0, H); g.addColorStop(0, "#6a0c10"); g.addColorStop(0.35, "#2a0608"); g.addColorStop(1, "#060102"); c.fillStyle = g; c.fillRect(0, hz, W, H - hz);
        /* pantulan kuil */
        if (!shrine || shrineW !== Math.round(G.sw)) { shrineW = Math.round(G.sw); shrine = buildShrine(shrineW); }
        const sh = shrine.height, rb = (1 - rise) * sh * 1.1;
        c.save(); c.globalAlpha = a * 0.26 * rise; c.translate(0, hz); c.scale(1, -0.62); c.translate(0, -hz);
        c.drawImage(shrine, G.sx - shrine.width / 2, hz - sh * 0.985 + rb); c.restore();
        /* riak */
        c.globalCompositeOperation = "lighter";
        for (let i = 0; i < 16; i++) {
          const p = Math.pow(i / 15, 1.7), y = hz + 3 + (H - hz) * p, amp = 1.2 + p * 5, ph = T * (0.7 + p * 1.2) + i * 1.9;
          c.strokeStyle = "rgba(255,70,55," + (0.05 + 0.1 * (1 - p)).toFixed(3) + ")"; c.lineWidth = 0.8 + p * 1.6; c.beginPath();
          for (let x = 0; x <= W; x += 24) { const yy = y + Math.sin(x * 0.012 + ph) * amp; if (x) c.lineTo(x, yy); else c.moveTo(x, yy); } c.stroke();
        }
        c.globalCompositeOperation = "source-over";
        waterGlints(c, W, hz, H, T, a); /* tengkorak mengambang */
        if (!skulls) skulls = Array.from({ length: 18 }, (_, i) => ({ fx: ((i * 0.6180339) % 1), fy: 0.12 + 0.85 * (((i * 0.4142) + 0.3) % 1), r: rnd(-0.5, 0.5), ph: rnd(0, TAU) }));
        for (const k of skulls) {
          const p = k.fy, y = hz + (H - hz) * p + Math.sin(T * 0.8 + k.ph) * 2 * p, sz = (16 + p * 52) * (G.mob ? 0.7 : 1);
          c.save(); c.globalAlpha = a * (0.28 + 0.4 * p) * fl; c.translate(k.fx * W, y); c.rotate(k.r + Math.sin(T * 0.4 + k.ph) * 0.08); c.drawImage(skullSpr, -sz / 2, -sz * 0.55, sz, sz * 1.1); c.restore();
        }
        c.restore();
      }
      /* kuil */
      if (rise > 0.01) {
        if (!shrine || shrineW !== Math.round(G.sw)) { shrineW = Math.round(G.sw); shrine = buildShrine(shrineW); }
        const sh = shrine.height, rb = (1 - eo(rise)) * sh * 1.1;
        c.save(); c.beginPath(); c.rect(0, 0, W, hz + sh * 0.035); c.clip();
        c.globalAlpha = a; c.drawImage(shrine, G.sx - shrine.width / 2, hz - sh * 0.985 + rb + sh * 0.02);
        c.globalCompositeOperation = "lighter";                                                      // mata tengkorak berdenyut
        const pk = (0.55 + 0.45 * Math.sin(T * 2.2)) * gl, ex = G.sx, ey = hz - sh * 0.985 + rb + sh * 0.02 + sh * (190 / 576), ss = sw2(shrine.width), _pz = eyeGlow(c, G, shrine, hz - sh * 0.985 + rb + sh * 0.02, T, gl, a);
        g = c.createRadialGradient(ex, ey, 0, ex, ey, ss * 70); g.addColorStop(0, "rgba(255,50,35," + (0.7 * pk * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,30,20,0)"); c.fillStyle = g; c.fillRect(ex - ss * 80, ey - ss * 80, ss * 160, ss * 160);
        c.restore();
        c.save(); c.globalCompositeOperation = "lighter";
        g = c.createRadialGradient(G.sx, hz, 0, G.sx, hz, shrine.width * 0.7); g.addColorStop(0, "rgba(255,40,30," + (0.28 * rise * a).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,40,30,0)"); c.fillStyle = g; c.fillRect(0, hz - shrine.width, W, shrine.width * 1.6);
        c.restore();
      }
      c.globalAlpha = a; drawEmbers(dt, "domain", G, a); drawAmbient(dt, "domain", a, o.slashRate == null ? 1 : o.slashRate);
      c.globalAlpha = a; vignette(0.62);
    }
    const sw2 = w => w / 600;
    return { c, cv, resize, geo, frame, get W() { return W; }, get H() { return H; }, slash(s) { sl.push(s); }, flashNow(v) { flash = Math.max(flash, v == null ? 1 : v); }, eyes: drawEyes, flames: drawFlames };
  }

  /* ---------- latar halaman (di balik konten) ---------- */
  let bgCv = null, bg = null, raf = 0, last = 0;
  const dprBg = () => Math.min(window.devicePixelRatio || 1, 1.5);
  function ensureBg() {
    if (bgCv) return;
    const host = document.querySelector(".background-pattern"); if (!host) return;
    bgCv = document.createElement("canvas"); bgCv.id = "sukunaCanvas"; bgCv.setAttribute("aria-hidden", "true");
    host.appendChild(bgCv); bg = makeRenderer(bgCv); bg.resize(dprBg());
  }
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
    if (!busy) bg.frame(dt, modeName(), 1);
  }
  function start() {
    if (raf || document.hidden || !isOn()) return;
    ensureBg(); if (!bg) return;
    if (reduce) { bg.frame(0.016, modeName(), 1); return; }
    last = performance.now(); raf = requestAnimationFrame(loop);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  /* ---------- efek klik (di atas konten) ---------- */
  let fxCv = null, fxc = null, fxRaf = 0, fxLast = 0, fxs = [], fxW = 0, fxH = 0;
  function ensureFx() {
    if (fxCv) return;
    fxCv = document.createElement("canvas"); fxCv.setAttribute("aria-hidden", "true");
    fxCv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:61";
    document.body.appendChild(fxCv); fxc = fxCv.getContext("2d"); sizeFx();
  }
  function sizeFx() { if (!fxCv) return; const d = Math.min(window.devicePixelRatio || 1, 2); fxW = innerWidth; fxH = innerHeight; fxCv.width = fxW * d; fxCv.height = fxH * d; fxc.setTransform(d, 0, 0, d, 0, 0); }
  function addFx(o) { o.t = o.t || 0; fxs.push(o); if (!fxRaf) { fxLast = performance.now(); fxRaf = requestAnimationFrame(fxLoop); } }
  function fxLoop(ts) {
    const dt = Math.min(0.05, (ts - fxLast) / 1000 || 0.016); fxLast = ts;
    fxc.clearRect(0, 0, fxW, fxH); fxs = fxs.filter(o => (o.t += dt) < o.d);
    for (const o of fxs) {
      if (o.t < 0) continue;
      const u = o.t / o.d, al = 1 - u;
      if (o.k === "slash") { drawSlash(fxc, o); continue; }
      if (o.k === "cross") { drawCross(fxc, o, al); continue; }
      fxc.save(); fxc.globalCompositeOperation = "lighter";
      if (o.k === "ring") {
        const r = o.r1 * eo(u);
        fxc.strokeStyle = "rgba(" + o.col + "," + (al * 0.9).toFixed(3) + ")"; fxc.lineWidth = o.w * al + 0.8; fxc.beginPath();
        if (o.sq) fxc.ellipse(o.x, o.y, Math.max(1, r), Math.max(1, r * o.sq), 0, 0, TAU); else fxc.arc(o.x, o.y, Math.max(1, r), 0, TAU);
        fxc.stroke();
      } else if (o.k === "spark") {
        o.x += o.vx * dt; o.y += o.vy * dt; o.vx *= 0.96; o.vy = o.vy * 0.96 + (o.g || 0) * dt;
        fxc.fillStyle = "rgba(" + o.col + "," + al.toFixed(3) + ")"; fxc.beginPath(); fxc.arc(o.x, o.y, o.s * al + 0.4, 0, TAU); fxc.fill();
      } else if (o.k === "orb") {
        const rr = o.r * (0.6 + u), g = fxc.createRadialGradient(o.x, o.y, 0, o.x, o.y, rr);
        g.addColorStop(0, "rgba(255,255,255," + al.toFixed(3) + ")"); g.addColorStop(0.3, "rgba(" + o.col + "," + (al * 0.8).toFixed(3) + ")"); g.addColorStop(1, "rgba(" + o.col + ",0)");
        fxc.fillStyle = g; fxc.beginPath(); fxc.arc(o.x, o.y, rr, 0, TAU); fxc.fill();
      } else if (o.k === "flash") {
        fxc.fillStyle = "rgba(" + o.col + "," + (al * o.a).toFixed(3) + ")"; fxc.fillRect(0, 0, fxW, fxH);
      } else if (o.k === "arrow") {                                  // FŪGA: panah api melesat dari tepi layar
        const p = eo(Math.min(1, u * 1.15)), hx = lerp(o.x0, o.x1, p), hy = lerp(o.y0, o.y1, p), L = Math.hypot(o.x1 - o.x0, o.y1 - o.y0) * 0.55 * Math.min(1, p * 2.4), a = Math.atan2(o.y1 - o.y0, o.x1 - o.x0);
        const tx = hx - Math.cos(a) * L, ty = hy - Math.sin(a) * L;
        fxc.fillStyle = "rgba(255,90,20," + (0.35 * al + 0.1).toFixed(3) + ")"; lens(fxc, tx, ty, hx, hy, 15); fxc.fill();
        fxc.fillStyle = "rgba(255,170,60,0.7)"; lens(fxc, tx + (hx - tx) * 0.3, ty + (hy - ty) * 0.3, hx, hy, 7); fxc.fill();
        fxc.fillStyle = "rgba(255,250,225,0.95)"; lens(fxc, tx + (hx - tx) * 0.55, ty + (hy - ty) * 0.55, hx, hy, 2.6); fxc.fill();
        const g = fxc.createRadialGradient(hx, hy, 0, hx, hy, 34); g.addColorStop(0, "rgba(255,255,235,1)"); g.addColorStop(0.35, "rgba(255,160,50,.8)"); g.addColorStop(1, "rgba(255,70,10,0)");
        fxc.fillStyle = g; fxc.beginPath(); fxc.arc(hx, hy, 34, 0, TAU); fxc.fill();
      }
      fxc.restore();
    }
    fxRaf = fxs.length ? requestAnimationFrame(fxLoop) : 0;
    if (!fxs.length) fxc.clearRect(0, 0, fxW, fxH);
  }
  const sparks = (x, y, n, v, col, delay, g) => { for (let i = 0; i < n; i++) { const a = rnd(0, TAU), s = rnd(v * 0.3, v); addFx({ k: "spark", x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, d: rnd(0.5, 1.1), s: rnd(1.6, 4), col, t: -(delay || 0), g: g || 0 }); } };
  function clickFx(e) {
    if (!isOn() || busy || e.button > 0) return;
    if (e.target && e.target.closest && e.target.closest(SKIP)) return;
    ensureFx(); const x = e.clientX, y = e.clientY, m = modeName(); clicks++;
    if (m === "heian") {                                      // FŪGA 開
      sfxClick("fuga");
      const fromLeft = x > innerWidth * 0.5 ? Math.random() < 0.7 : Math.random() < 0.3, x0 = fromLeft ? -60 : innerWidth + 60, y0 = clamp(y + rnd(60, 280), 0, innerHeight + 40);
      addFx({ k: "arrow", x0, y0, x1: x, y1: y, d: 0.24 });
      const T0 = -0.24;
      addFx({ k: "flash", col: "255,200,120", a: 0.18, d: 0.35, t: T0 });
      addFx({ k: "orb", x, y, r: 150, d: 0.75, col: "255,120,30", t: T0 }); addFx({ k: "orb", x, y, r: 70, d: 0.4, col: "255,230,170", t: T0 });
      addFx({ k: "ring", x, y, r1: 190, d: 0.8, col: "255,140,50", w: 7, t: T0 }); addFx({ k: "ring", x, y, r1: 300, d: 1.1, col: "255,90,30", w: 3, t: T0 - 0.08 });
      for (let i = 0; i < 4; i++) addFx(mkSlashFx("heian", x, y, rnd(0, Math.PI), rnd(140, 260), rnd(2, 3.4), 0.5, T0));
      sparks(x, y, 30, 380, "255,170,70", -T0, 140);
    } else if (m === "domain") {
      const big = clicks % 4 === 0; sfxClick(big ? "storm2" : "storm");
      for (let i = 0; i < (big ? 3 : 5); i++) addFx(mkSlashFx("domain", x + rnd(-90, 90), y + rnd(-90, 90), rnd(0, Math.PI), big ? rnd(500, 900) : rnd(140, 330), big ? rnd(3.6, 5.4) : rnd(1.8, 3.2), big ? 0.8 : 0.55, -i * 0.04));
      addFx({ k: "ring", x, y, r1: 220, d: 0.9, col: "255,70,60", w: 5, sq: 0.3 }); addFx({ k: "ring", x, y, r1: 360, d: 1.2, col: "255,50,45", w: 2.5, sq: 0.3, t: -0.1 });
      addFx({ k: "orb", x, y, r: 80, d: 0.5, col: "255,50,40" }); sparks(x, y, 18, 300, "255,110,100", 0, 120);
      if (big) { addFx({ k: "cross", x, y, r1: 420, d: 0.9 }); addFx({ k: "flash", col: "255,230,230", a: 0.3, d: 0.5 }); addFx(mkSlashFx("domain", x, y, rnd(-0.5, 0.5), Math.hypot(innerWidth, innerHeight) * 1.2, 6, 1.0)); }
    } else {                                                  // BIASA: Dismantle (tiap ke-3: Cleave)
      if (clicks % 3 === 0) {
        sfxClick("cleave");
        addFx(mkSlashFx("biasa", x, y, rnd(-0.9, 0.9) + (Math.random() < 0.5 ? 0 : Math.PI / 2), Math.hypot(innerWidth, innerHeight) * 1.1, 5.2, 0.9));
        addFx({ k: "ring", x, y, r1: 240, d: 0.9, col: "255,50,50", w: 6 }); addFx({ k: "orb", x, y, r: 110, d: 0.6, col: "255,40,40" });
        addFx({ k: "flash", col: "255,200,200", a: 0.16, d: 0.4 }); sparks(x, y, 22, 360, "255,110,110", 0, 60); addFx({ k: "cross", x, y, r1: 300, d: 0.75 });
      } else {
        sfxClick("cut");
        const b = rnd(0, Math.PI);
        for (let i = 0; i < 3; i++) addFx(mkSlashFx("biasa", x + rnd(-14, 14), y + rnd(-14, 14), b + (i - 1) * rnd(0.5, 1.0), rnd(110, 210), rnd(1.8, 3), 0.5, -i * 0.05));
        addFx({ k: "ring", x, y, r1: 90, d: 0.5, col: "255,60,60", w: 3 }); sparks(x, y, 10, 240, "255,120,120");
      }
    }
  }
  const mkSlashFx = (m, x, y, a, len, w, d, t) => Object.assign(mkSlash(m, x, y, a, len, w, d, t), { k: "slash" });

  /* ---------- tombol tema -> Biasa | Heian | Domain (3 segmen) ---------- */
  function syncLabels() {
    const b = document.querySelectorAll("#themeToggle .tt-bleach b"), t = document.getElementById("themeToggle");
    if (!t || b.length < 3 || !isOn()) return;
    b[0].textContent = "Biasa"; b[1].textContent = "Heian"; b[2].textContent = "Domain";
    const m = modeName();
    t.setAttribute("aria-checked", String(m !== "biasa"));
    t.setAttribute("aria-label", "Mode Sukuna: " + ({ biasa: "Biasa", heian: "Heian", domain: "Domain Expansion: Malevolent Shrine" })[m] + " (klik segmen untuk ganti mode)");
  }
  document.addEventListener("click", e => {
    if (!isOn() || !e.target.closest) return;
    const t = e.target.closest("#themeToggle"); if (!t) return;
    e.stopImmediatePropagation(); e.preventDefault();
    if (busy) return;
    const r = t.getBoundingClientRect(); let i;
    if (e.detail === 0 || !(e.clientX > 0)) i = (MODES.indexOf(modeName()) + 1) % 3;          // keyboard: ganti ke mode berikutnya
    else i = clamp(Math.floor((e.clientX - r.left) / r.width * 3), 0, 2);
    go(MODES[i]);
  }, true);

  /* ---------- adegan sinematik ---------- */
  function sceneHTML(kind) {
    const close = '<div class="sk-hint">ketuk untuk lanjut</div></div><div class="sk-flash"></div>';
    if (kind === "enter") return '<div class="sk-in"><canvas class="sk-cv"></canvas><div class="sk-ent"><div class="sk-k">両面宿儺</div><div class="sk-ttl">RYOMEN SUKUNA<b>呪いの王 · King of Curses</b></div></div>' + close;
    if (kind === "heian") return '<div class="sk-in"><canvas class="sk-cv"></canvas><div class="sk-txt"><div class="sk-k1">開</div><div class="sk-k">平安</div></div><div class="sk-ttl">HEIAN ERA<b>Fūga · The King Awakens</b></div>' + close;
    if (kind === "domain") return '<div class="sk-in"><canvas class="sk-cv"></canvas><div class="sk-txt"><div class="sk-k1">領域展開</div><div class="sk-k">伏魔御廚子</div></div><div class="sk-ttl">DOMAIN EXPANSION<b>Malevolent Shrine</b></div>' + close;
    return '<div class="sk-in"><canvas class="sk-cv"></canvas></div><div class="sk-flash"></div>';
  }
  const SCENE_LEN = { enter: 5.0, heian: 6.7, domain: 8.0, back: 1.1 };
  function runScene(kind, apply) {
    busy = true; if (window.jjk && window.jjk.sync) window.jjk.sync();
    const sc = document.createElement("div"); sc.className = "sk-scene sk-" + kind; sc.setAttribute("role", "dialog");
    sc.setAttribute("aria-label", kind === "domain" ? "Domain Expansion: Malevolent Shrine" : kind === "heian" ? "Sukuna era Heian" : "Ryomen Sukuna");
    sc.innerHTML = sceneHTML(kind); document.body.appendChild(sc);
    const cv = sc.querySelector(".sk-cv"), inner = sc.querySelector(".sk-in"), fl = sc.querySelector(".sk-flash");
    const r = makeRenderer(cv); r.resize(Math.min(window.devicePixelRatio || 1, 2));
    const c = r.c, W = innerWidth, H = innerHeight, G = r.geo();
    requestAnimationFrame(() => sc.classList.add("is-in"));
    let t = 0, last = performance.now(), raf0 = 0, done = false, canClose = false, applied = false, bus0 = null, fv = 0, shake = 0, boost = 0;
    const fired = {}, cuts = [], rings = [], once = (k, cond, fn) => { if (cond && !fired[k]) { fired[k] = 1; fn(); } };
    const cls = n => sc.classList.add(n), pop = v => { fv = Math.max(fv, v); }, END = SCENE_LEN[kind];
    const doApply = () => { if (applied) return; applied = true; try { apply(); } catch (_) { /* abaikan */ } };
    const cut = (x, y, a, len, w, d) => cuts.push(mkSlash(kind === "heian" ? "heian" : kind === "domain" ? "domain" : "biasa", x, y, a, len, w, d));
    const ring = (x, y, r1, d, col, w, sq) => rings.push({ x, y, r1, d, t: 0, col, w, sq });
    const drawExtras = dt => {
      for (let i = 0; i < cuts.length; i++) { cuts[i].t += dt; if (cuts[i].t >= cuts[i].d) { cuts.splice(i, 1); i--; continue; } drawSlash(c, cuts[i]); }
      c.save(); c.globalCompositeOperation = "lighter";
      for (let i = 0; i < rings.length; i++) {
        const q = rings[i]; q.t += dt; if (q.t >= q.d) { rings.splice(i, 1); i--; continue; }
        const u = q.t / q.d, rr = Math.max(1, q.r1 * eo(u)); c.strokeStyle = "rgba(" + q.col + "," + ((1 - u) * 0.85).toFixed(3) + ")"; c.lineWidth = q.w * (1 - u) + 0.8; c.beginPath();
        if (q.sq) c.ellipse(q.x, q.y, rr, rr * q.sq, 0, 0, TAU); else c.arc(q.x, q.y, rr, 0, TAU); c.stroke();
      }
      c.restore();
    };
    function finish() {
      if (done) return; done = true; cancelAnimationFrame(raf0); doApply(); stopBus(bus0);
      sc.classList.add("is-out"); setTimeout(() => { sc.remove(); }, 650); busy = false;
      if (window.jjk && window.jjk.sync) window.jjk.sync(); sync();
    }
    function tick(ts) {
      if (done) return;
      const dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts; t += dt; const u = t / K;
      c.clearRect(0, 0, W, H);
      if (kind === "enter") {
        const a = eo((u - 1.7) / 1.3);
        r.frame(dt, "biasa", a, { fog: eo(u / 2.4) }); drawExtras(dt);
        [[0.5, 0.5, 0.42, -0.5], [0.8, 0.5, 0.5, 0.55], [1.1, 0.5, 0.56, -0.15], [1.35, 0.5, 0.44, 0.9], [1.55, 0.5, 0.5, 0.2], [1.75, 0.5, 0.5, -0.85]].forEach(([tt, px, py, an], i) => {
          once("c" + i, u >= tt, () => { cut(W * (px + rnd(-0.12, 0.12)), H * (py + rnd(-0.1, 0.1)), an, Math.hypot(W, H) * 1.05, 3.4 + i * 0.3, 1.5); pop(0.22); shake = 0.7; });
        });
        once("boom", u >= 2.0, () => { pop(1); shake = 1.2; ring(W / 2, H / 2, Math.max(W, H) * 0.7, 1.0, "255,60,60", 8); });
        once("k", u >= 2.3, () => cls("is-k")); once("ttl", u >= 2.9, () => cls("is-ttl")); once("hint", u >= 3.3, () => cls("is-hint"));
        once("fin", u >= 4.2, () => { pop(1); doApply(); });
      } else if (kind === "heian") {
        const cx = W / 2, cy = H * 0.46, S0 = Math.min(W * 0.9, H * 1.25), mv = eio((u - 2.5) / 1.0);
        const x = lerp(cx, G.ex, mv), y = lerp(cy, G.ey, mv), S = lerp(S0, G.es, mv), flame = eo((u - 1.7) / 1.0);
        boost = Math.max(0, boost - dt * 1.4);
        r.frame(dt, "heian", eo((u - 1.7) / 1.1), { eyes: [0, 0], flame: 0, boost: 1 });
        drawFlames(c, W, H, t, flame, 1 + boost * 0.9);
        const o1 = eo((u - 0.5) / 0.5), o2 = eo((u - 1.0) / 0.5), lk = Math.sin(u * 0.9) * 0.5;
        c.save(); c.globalAlpha = 1; sunDisc(c, x, y, S * 0.3, t, Math.min(o1, o2)); c.restore();
        /* busur api: panah terbentuk, ditarik, dilepas */
        const ay = H * 0.62, ax0 = W * 0.16, ax1 = W * 0.86, ay1 = H * 0.5;
        if (u > 2.9 && u < 3.7) {
          const k = (u - 2.9) / 0.8, len = W * 0.2 * eo(k);
          c.save(); c.globalCompositeOperation = "lighter";
          let g = c.createRadialGradient(ax0 + len, ay, 0, ax0 + len, ay, 60 + 40 * k); g.addColorStop(0, "rgba(255,230,170," + (0.9 * k).toFixed(3) + ")"); g.addColorStop(0.4, "rgba(255,110,30," + (0.6 * k).toFixed(3) + ")"); g.addColorStop(1, "rgba(255,60,10,0)");
          c.fillStyle = g; c.beginPath(); c.arc(ax0 + len, ay, 100, 0, TAU); c.fill();
          c.fillStyle = "rgba(255,150,50," + (0.7 * k).toFixed(3) + ")"; lens(c, ax0, ay, ax0 + len, ay, 6 + 4 * k); c.fill();
          c.fillStyle = "rgba(255,245,215," + (0.95 * k).toFixed(3) + ")"; lens(c, ax0, ay, ax0 + len, ay, 2); c.fill();
          c.restore(); shake = Math.max(shake, 0.12 + k * 0.4);
        }
        if (u >= 3.7 && u < 3.94) {
          const k = eo((u - 3.7) / 0.22), hx = lerp(ax0 + W * 0.2, ax1, k), hy = lerp(ay, ay1, k), tx = lerp(ax0, hx - W * 0.35, Math.min(1, k * 1.3)), ty = lerp(ay, hy, Math.min(1, k * 1.3));
          c.save(); c.globalCompositeOperation = "lighter";
          c.fillStyle = "rgba(255,90,20,.5)"; lens(c, tx, ty, hx, hy, 22); c.fill(); c.fillStyle = "rgba(255,170,60,.8)"; lens(c, tx, ty, hx, hy, 9); c.fill(); c.fillStyle = "rgba(255,250,230,1)"; lens(c, tx, ty, hx, hy, 3.4); c.fill();
          const g = c.createRadialGradient(hx, hy, 0, hx, hy, 56); g.addColorStop(0, "rgba(255,255,240,1)"); g.addColorStop(0.35, "rgba(255,160,50,.85)"); g.addColorStop(1, "rgba(255,70,10,0)"); c.fillStyle = g; c.beginPath(); c.arc(hx, hy, 56, 0, TAU); c.fill();
          c.restore();
        }
        once("hit", u >= 3.94, () => {
          pop(1); shake = 1.6; boost = 1; ring(ax1, ay1, Math.max(W, H) * 0.55, 1.0, "255,150,60", 9); ring(ax1, ay1, Math.max(W, H) * 0.9, 1.4, "255,90,30", 4);
          for (let i = 0; i < 5; i++) cut(ax1 + rnd(-40, 40), ay1 + rnd(-40, 40), rnd(0, Math.PI), rnd(260, 700), rnd(2.4, 4.2), 0.8);
        });
        once("k", u >= 4.2, () => cls("is-k")); once("k1", u >= 4.5, () => cls("is-k1")); once("ttl", u >= 4.9, () => cls("is-ttl")); once("hint", u >= 5.3, () => cls("is-hint"));
        once("fin", u >= 6.0, () => { pop(1); doApply(); });
        drawExtras(dt);
      } else if (kind === "domain") {
        const rate = u > 3.1 && u < 5.6 ? 4 : 1;
        r.frame(dt, "domain", eo((u - 0.7) / 0.8), { floor: eo((u - 0.9) / 1.3), rise: eio((u - 1.5) / 1.5), glow: u > 3.1 ? 1.5 : 0.3, slashRate: u > 3.1 ? rate : 0 });
        once("clap", u >= 0.5, () => { pop(0.55); shake = 0.9; ring(W / 2, H * 0.55, Math.max(W, H) * 0.5, 0.9, "255,230,230", 4); });
        once("k1", u >= 0.9, () => cls("is-k1"));
        if (u > 1.5 && u < 3.0) shake = Math.max(shake, 0.18);
        once("hit", u >= 3.1, () => {
          pop(1); shake = 1.5; ring(G.sx, G.hz, Math.max(W, H) * 0.8, 1.2, "255,70,60", 7, 0.3);
          for (let i = 0; i < 6; i++) cut(rnd(0.1, 0.9) * W, rnd(0.1, 0.8) * H, rnd(0, Math.PI), Math.hypot(W, H) * rnd(0.6, 1.1), rnd(2.6, 5), 0.9);
        });
        once("k", u >= 3.6, () => cls("is-k")); once("ttl", u >= 4.4, () => cls("is-ttl")); once("hint", u >= 5.0, () => cls("is-hint"));
        once("fin", u >= 7.0, () => { pop(1); doApply(); });
        drawExtras(dt);
      } else {                                   // back: sekali tebas lalu ganti
        r.frame(dt, "biasa", 0, {});
        once("a", u >= 0.02, () => { cut(W / 2, H / 2, 0.55, Math.hypot(W, H) * 1.2, 5, 0.6); pop(0.5); shake = 0.8; });
        once("b", u >= 0.12, () => { cut(W / 2, H / 2, -0.55, Math.hypot(W, H) * 1.2, 5, 0.6); pop(0.7); });
        once("fin", u >= 0.34, () => { pop(1); doApply(); });
        drawExtras(dt);
      }
      /* getar layar & kilat */
      if (shake > 0.01) { inner.style.transform = "translate(" + (rnd(-1, 1) * shake * 9).toFixed(1) + "px," + (rnd(-1, 1) * shake * 9).toFixed(1) + "px)"; shake *= Math.exp(-dt * 4.5); } else if (inner.style.transform) inner.style.transform = "";
      fl.style.opacity = fv.toFixed(3); fv = Math.max(0, fv - dt * 2.2);
      if (u >= 1.2 && kind !== "back") canClose = true;
      if (u >= END) { finish(); return; }
      raf0 = requestAnimationFrame(tick);
    }
    bus0 = kind === "domain" ? sfxDomain() : kind === "heian" ? sfxHeian() : kind === "back" ? sfxBack() : sfxEnter();
    sc.addEventListener("pointerup", () => { if (canClose) finish(); });
    const esc = e => { if (done) { document.removeEventListener("keydown", esc); return; } if (e.key === "Escape" && canClose) { finish(); document.removeEventListener("keydown", esc); } };
    document.addEventListener("keydown", esc);
    raf0 = requestAnimationFrame(tick);
  }

  /* ---------- aksi publik ---------- */
  function ensureDark() { if (root.dataset.theme !== "dark") { root.dataset.theme = "dark"; } forcedDark = true; }
  function enter() {
    if (busy || isOn() || root.dataset.bleach) return;
    runScene("enter", () => { delete root.dataset.sukuna; ensureDark(); root.dataset.jjk = "sukuna"; sync(); });
  }
  function heian() { if (busy || !isOn() || modeName() === "heian") return; runScene("heian", () => { root.dataset.sukuna = "heian"; sync(); }); }
  function domain() { if (busy || !isOn() || modeName() === "domain") return; runScene("domain", () => { root.dataset.sukuna = "domain"; sync(); }); }
  function biasa() { if (busy || !isOn() || modeName() === "biasa") return; runScene("back", () => { delete root.dataset.sukuna; sync(); }); }
  function go(m) { if (m === "heian") heian(); else if (m === "domain") domain(); else biasa(); }
  function off() { delete root.dataset.sukuna; delete root.dataset.jjk; if (window.jjk && window.jjk.sync) window.jjk.sync(); sync(); }

  function sync() {
    if (isOn()) { ensureDark(); ensureBg(); ensureFx(); syncLabels(); stop(); start(); if (reduce && bg) bg.frame(0.016, modeName(), 1); }
    else {
      stop();
      if (root.dataset.jjk !== "sukuna") delete root.dataset.sukuna;
      if (forcedDark) { forcedDark = false; if (!root.dataset.bleach && !root.dataset.jjk) { root.dataset.theme = lsGet("theme") === "light" ? "light" : "dark"; } }
    }
  }
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-jjk", "data-bleach", "data-sukuna"] });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
  let rz = 0;
  addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (bg) { bg.resize(dprBg()); if (reduce && isOn()) bg.frame(0.016, modeName(), 1); } sizeFx(); }, 160); });
  addEventListener("pointermove", e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; }, { passive: true });
  addEventListener("pointerdown", e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; }, { passive: true });
  addEventListener("pointerup", e => { if (e.pointerType === "touch") ptr.on = false; }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { ptr.on = false; });
  document.addEventListener("pointerdown", clickFx, true);

  window.sukunaTheme = { CFG, enter, heian, domain, biasa, off, go, _render: makeRenderer, get mode() { return !isOn() ? "off" : modeName(); } };
})();
