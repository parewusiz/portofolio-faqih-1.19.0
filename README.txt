=== PEMBARUAN 72: ID CARD COCOK DI SEMUA TEMA ===

File yang berubah: script.js (idCard > lanyardColors, themeCard, inkFor), style.css (blok PEMBARUAN 72 di paling bawah). index.html, games.js TIDAK berubah.

- WARNA TEMA BARU untuk holder + tali: Kenpachi (merah-hitam, aksen oranye), Gojo (biru malam, aksen cyan), Sukuna (hitam-merah darah), Senja (jingga). Dulu keempatnya jatuh ke warna biru bawaan.
- KONTRAS OTOMATIS: script menghitung terang/gelap warna tema (inkFor), lalu tulisan di holder, lubang kait, kartu cadangan, dan nama di tali otomatis putih atau gelap.
  Efek: tetap terbaca di tema terang (White Ichigo kuning, Shinji Sekai pink, Uryu Letzt biru muda, Senja). Ambang: luminans 0.22 (ubah di inkFor kalau mau).
- BAYANGAN: garis tepi holder dua lapis (putih + gelap tipis) supaya terlihat di latar terang maupun gelap; tema Terang memakai bayangan biru yang lebih lembut.
- Hacker & Mono tidak perlu warna sendiri: keduanya filter layar penuh, holder ikut berubah.
- Tema baru nanti: tambahkan satu cabang di lanyardColors ([warna kain, warna aksen]); holder, mika, dan kontras tulisan ikut otomatis.

=== PEMBARUAN 71: ROMBAK TOTAL MODE SUKUNA ===

Konsep: Raja Kutukan = hitam, merah darah, putih tulang, emas. Tanpa mata, tanpa biru.
- BIASA: layar manga merah: screentone titik, luka sayatan putih-panas membelah layar, tato U Sukuna, aksara 斬 raksasa, bintang hitam.
- HEIAN: kota Heian terbakar (siluet pagoda berjendela api), matahari merah dibelah 4 tebasan Dismantle, garis emas, panah Fuga menyala.
- DOMAIN: domain lama + kamu berdiri DI DALAM tulang rusuk raksasa (rusuk melengkung membingkai layar, bernapas) + hujan darah.
- Fungsi lama disimpan (frameBiasaOld / frameHeianOld / frameDomainOld), tidak dipakai.

=== PEMBARUAN 70: SUKUNA LEBIH DAHSYAT ===

- HEIAN: 4 mata dihapus, diganti MANDALA API raksasa berputar (cincin putus-putus, 12 lidah api, cakram hitam dengan 4 garis tebasan).
- DOMAIN: gerhana hitam bermahkota sinar merah di belakang kuil + spire tulang di cakrawala.
- SEMUA BIRU / HIJAU-BIRU DIBUANG: laut jadi merah-hitam darah, kilau air emas-putih, atap kuil emas membara (dulu hijau), lambang & tanduk berbingkai api.

=== PEMBARUAN 69: MODE SUKUNA 1000x (script.js > sukunaTheme) ===

- BIASA: latar merah darah + halo matahari merah + bintang hitam runcing 4 sudut berputar (acuan gambar 1). Klik Cleave & badai Domain: kilau salib putih (acuan gambar 2).
- HEIAN: garis energi emas bergelombang di belakang 4 mata (acuan gambar 2).
- DOMAIN: kuil baru bertanduk dengan atap hijau menyala, Sukuna berjubah putih di pintu, gundukan tengkorak, tulang rusuk, daging merah, 2 tengkorak bermata merah muda berdenyut; langit awan badai merah menyala; laut biru-merah gelap dengan kilau putih/cyan (acuan gambar 3).
- Hanya script.js yang berubah. buildShrineOld (versi lama) disimpan, tidak dipakai.

=== PEMBARUAN 68: ID CARD DI DALAM HOLDER + MIKA BERKILAU + LANYARD KAIN (REVISI: BELAKANG POLOS, TALI SATU) ===

REVISI 2: desain depan & belakang baru dari kamu dipakai langsung: images/idcard-id.png (depan, diganti) dan images/idcard-id-back.png (belakang, BARU); keduanya PNG transparan bersudut bulat. Belakang tidak lagi polos; kalau file belakang tidak ada, otomatis kembali ke kartu polos bertema.
REVISI 1 (lama): sisi belakang holder sekarang polos satu warna tema (tanpa tulisan/hiasan, mika tetap berkilau) dan lanyard hanya satu tali lurus (tanpa V); nama di tali, gesper, label DKV, kait tetap.

File yang berubah: script.js (modul idCard: tali digambar ulang jadi lanyard kain; modul BARU idHolder), style.css (blok PEMBARUAN 68 di paling bawah).
index.html, games.js TIDAK berubah (holder dibuat lewat script.js di dalam kartu yang sudah ada). Tanpa file suara baru.
FILE BARU: images/idcard-id.png (foto ID card SMKN 1 Wajo / DKV, PNG transparan, sudut sudah dibulatkan; rasio 2:3).

- HOLDER: kartu foto masuk ke saku holder. Ada lubang kait di bibir atas, bayangan bibir holder jatuh ke kartu, dan saat halaman selesai dimuat
  kartu meluncur turun masuk ke saku. BINGKAI + SISI BELAKANG holder berwarna sesuai tema (Gelap, Terang, Bleach, White Ichigo, dll.) dan ikut berganti
  otomatis. Belakang = kartu gelap bertema berisi SMKN 1 WAJO, DESAIN KOMUNIKASI VISUAL, nama, PAREWUSI, tulisan DKV besar di latar.
- MIKA: lapisan plastik bening di depan kartu (depan & belakang). Kursor / jari digeser di atas kartu = bintik cahaya + pita kilau (sedikit semburat
  biru-pink) mengikuti gerakan. Didiamkan = kilau menyapu pelan sendiri tiap beberapa detik. Mati otomatis kalau perangkat memakai "kurangi gerakan".
- LANYARD: tali kain gepeng bentuk V (lengan kiri gelap bertuliskan nama, lengan kanan terang bertuliskan jurusan), jahitan silang di titik temu,
  gesper pengaman hitam, label berlian "DKV", lalu kait logam (lobster clasp) ke lubang holder. Tetap berfisika (bisa diseret, dilepas, memantul).
  Warna kain & teks ikut tema (memakai warna tali yang dulu).
- UKURAN: kartu jadi 224 x 350 px (HP: 196 px lebar). Tinggi area kartu di layar lebar ditambah (maks. 720px), di tablet / HP area & jarak atas
  ditambah supaya tali tetap cukup panjang.
- GAMBAR LAMA: images/idcard-front*.png / idcard-back*.png dan desain bawaan (huruf, QR) sekarang disembunyikan (tidak dihapus); foto di dalam holder
  diambil dari images/idcard-id.png. Foto dalam bingkai bulat (Pembaruan 67, idCardPhoto) tidak tampil lagi karena desain bawaan disembunyikan.
- UBAH ISI: script.js > idHolder > CFG { photo, alt, name, school, major, from, lipFront, lipBack }  dan  idCard > LAN { name, major, tag, width }.
  File foto tidak ditemukan = kartu bertema dengan tulisan DKV + nama sebagai cadangan.

=== PEMBARUAN 67: FOTO BERJEJER DI ANTARA "KENANGAN" DAN "SOMETHING AMAZING" ===

File yang berubah: script.js (bagian foto bertebaran: daftar galleryPhotos + blok FOTO BERJEJER + timing updateScatter), style.css (blok PEMBARUAN 67 di paling bawah).
index.html, games.js TIDAK berubah (galeri dibuat lewat script.js). Tanpa file suara baru.
Baru: foto-fotomu di images/galeri-01.jpg ... galeri-10.jpg (nama & jumlahnya bebas, atur di galleryPhotos).

- URUTAN SEKARANG (satu section, digulir terus): foto kenangan bertebaran lalu memudar -> FOTO BERJEJER muncul -> tulisan "Something Amazing".
- FOTO BERJEJER: 2 baris foto sejajar, miring 3D, ujung kiri-kanan memudar. Baris atas bergeser ke kiri, baris bawah ke kanan mengikuti scroll.
  Foto yang lewat di tengah layar paling besar & terang, yang di pinggir mengecil & redup; foto sedikit bergoyang naik-turun dan miring bergantian.
  Border / bayangan / warna foto ikut tema (Terang, Gelap, Bleach, JJK, dll) karena memakai kelas .scatter-photo.
- FOTO KURANG / BELUM ADA: file yang tidak ditemukan tetap tampil sebagai bingkai kosong (sama seperti kenangan). Kurang dari 5 foto per baris = urutan diulang supaya baris tetap panjang.
  Kosongkan galleryPhotos ([]) = pakai foto kenangan lagi (urutan dibalik).
- BARIS TANPA UJUNG: tiap baris berisi urutan foto yang diulang 4x dan bergeser dengan jarak tetap (0,9 putaran), jadi kiri-kanan layar SELALU penuh foto, tidak ada ruang kosong / ujung baris yang tidak sejajar. Pinggir kiri-kanan memudar lewat mask.
- POSISI GALERI: dipaku tepat di tengah layar (tinggi penuh, rata tengah) lalu dinaikkan sedikit (translateY -3vh); kemiringan diperkecil (rotateX 6deg, rotateZ -4deg) supaya tidak menjorok ke bawah.
- KONTAK (daftar Find Me, array socials di script.js): TikTok 1 @mtropro909, TikTok 2 @parewusiz_67, Instagram @mtrofaqih. GitHub & LinkedIn disimpan sebagai baris // (komentar) di array yang sama, tinggal dibuka kalau sudah siap.

- FOTO DI ID CARD: images/idcard-photo.png (dipotong persegi dari p.png, latar transparan) mengisi bingkai bulat di DEPAN kartu (.idc-photo), ikut warna tema.
  Kalau file tidak ada, inisial bawaan tetap tampil. Ganti nama file / bagian foto yang dipusatkan: CFG di modul idCardPhoto (script.js). Ukuran bingkai: .idc-photo di blok PEMBARUAN 67 (style.css).
  CATATAN: kalau kamu punya gambar kartu sendiri (images/idcard-front.png), gambar itu MENUTUPI desain bawaan (termasuk foto ini). Hapus/ganti nama file itu kalau mau memakai desain bawaan + foto.

- PERBAIKAN BUG FOTO PROFIL DI TEMA BLEACH: tiap tema Bleach memberi kotak latar gradasi + bayangan kotak pada .profile-placeholder, jadi foto PNG transparan tampak ngotak.
  Sekarang di semua tema Bleach (Shinji, Sekai, Aizen, Kyoka, Zaraki, Ichigo x3, Uryu, Ichibe) latar kotak dibuang dan diganti cahaya yang mengikuti siluet foto (drop-shadow warna tema).
  Blok perbaikan ada di paling bawah style.css. Kalau foto varian tema (p-shinji.png dst) bukan PNG transparan (mis. JPG), latar fotonya sendiri tetap kotak: simpan sebagai PNG transparan.

- TIMING: section dipanjangkan 320vh -> 520vh (HP 260vh -> 440vh) di style.css. Kenangan memudar di 0-40% scroll (dulu 0-100%),
  galeri tampil 30%-82% (konstanta G0 / G1 di script.js), tulisan Something Amazing muncul mulai 80%. Mau galeri lebih lama? naikkan tinggi .scatter-section dan geser G1.
- UKURAN FOTO: semua foto berTINGGI sama (--sgh di .sg-stage, clamp(140px, 24vh, 270px)), lebar mengikuti rasio foto asli sehingga tidak ada yang terpotong. Foto belum ada = bingkai kosong 4:5 (.is-empty) | jarak: gap di .sg-row / .sg-stage | kemiringan: rotateX / rotateZ di paintGallery() (script.js).
- "Kurangi gerakan" dihormati: tanpa kemiringan 3D & goyangan (tetap bergeser mengikuti scroll).

=== PEMBARUAN 66: SUKUNA PENUH - 3 MODE (BIASA · HEIAN · DOMAIN) ===

File yang berubah: script.js (modul baru sukunaTheme di paling bawah + 5 patch kecil di modul jjkEgg & panduanRahasia), style.css (blok PEMBARUAN 66 di paling bawah).
index.html, games.js TIDAK berubah. Tanpa file gambar/suara baru (semua digambar kanvas, bunyi Web Audio).

- AKTIF: tombol JJK > Ryomen Sukuna -> adegan masuk -> mode BIASA. Pindah mode lewat tombol tema (3 segmen: Biasa | Heian | Domain). Klik segmennya langsung;
  dengan keyboard (Enter / Spasi di tombol tema) = ganti ke mode berikutnya. Tekan Sukuna di menu JJK sekali lagi = nonaktif.
- BIASA (Raja Kutukan): hitam-merah darah, kabut + pita asap kutukan mengalir, bara naik, aksara 両面宿儺 samar, tebasan Dismantle melintas acak (30% muncul dekat kursor).
  Klik = Dismantle (3 tebasan silang) | tiap klik ke-3 = CLEAVE (tebasan sepanjang layar + gelombang kejut + kilat tipis).
  Adegan masuk (~5 dtk): 6 tebasan membelah layar -> DUAR -> 両面宿儺 + RYOMEN SUKUNA.
- HEIAN (wujud era Heian): 4 MATA merah raksasa (pasangan atas besar, pasangan bawah kecil) yang berkedip & menatap kursor, tanda wajah (batang hidung + garis pipi),
  dinding api bergoyang di dasar layar, bara jingga, warna emas-jingga-merah muda. Klik = FŪGA 開: panah api melesat dari tepi layar ke titik klik, menancap, meledak (cincin + bara + tebasan).
  Adegan (~6,7 dtk): mata membuka dalam gelap -> api naik -> mata bergeser ke posisi akhir -> busur api ditarik -> dilepas -> ledakan -> 平安 / 開.
- DOMAIN (Malevolent Shrine 伏魔御廚子): langit merah + matahari darah, lautan darah beriak, KUIL bertengkorak lembu bertanduk + tulang rusuk menjulang (dengan pantulan di air),
  mata tengkorak berdenyut, tengkorak mengambang, badai tebasan TANPA HENTI (sure-hit; kadang 3 sekaligus, kadang tebasan penuh layar + kilat).
  Klik = badai Dismantle + riak air elips | tiap klik ke-4 = tebasan penuh layar + kilat.
  Adegan (~8 dtk): tepuk tangan -> darah menyebar dari tengah -> kuil naik dari air -> DUAR + badai tebasan -> 領域展開 / 伏魔御廚子.
  Keluar dari Domain / Heian (pilih segmen Biasa): satu tebasan silang menutup mode (adegan singkat ~1 dtk).
- TEMA HALAMAN: tiap mode punya warna sendiri (navbar, judul, tombol, menu musik, panel game, scrollbar, kursor, aura tepi layar). Tema otomatis gelap; keluar mode = kembali ke tema semula.
  Warna lewat variabel --sk-* di tiga blok "tema halaman" (Biasa / Heian / Domain) di style.css, blok PEMBARUAN 66.
- ATUR: sukunaTheme.CFG = { sound, volume, embers (kepadatan bara, 1 = normal), slashes (kerapatan tebasan latar, 1 = normal, 0 = mati) }.
  Bentuk kuil: fungsi buildShrine() | 4 mata: drawEyes() | api: drawFlames() | waktu adegan: SCENE_LEN + angka u >= ... di runScene() (script.js, modul sukunaTheme).
- PERFORMA: kuil & tengkorak digambar SEKALI ke kanvas kecil lalu dipakai ulang; latar berhenti saat tab tersembunyi / adegan sedang jalan. HP: bara & tengkorak dikurangi otomatis.
  Kalau lemot: sukunaTheme.CFG.embers = 0.4; sukunaTheme.CFG.slashes = 0.5.
- Hormati "kurangi gerakan" (adegan jauh lebih singkat, latar statis). Bunyi ikut mati kalau tapSound.on = false. Tidak disimpan: muat ulang halaman = normal lagi.
- Arsip Rahasia (Ctrl + Alt + H) diperbarui: kartu Sukuna jadi 3 kartu (Biasa, Heian, Domain) dengan tombol "Coba".
- Tidak bentrok dengan mode Gojo: pindah Gojo <-> Sukuna lewat menu JJK tetap jalan (tema gelap dipertahankan).
- CONSOLE: sukunaTheme.enter() | .heian() | .domain() | .biasa() | .off() | .mode ("off" / "biasa" / "heian" / "domain") | jjk.scene("sukuna")

=== PEMBARUAN 65: CARA AKSES MODE HACKER DIUBAH + SCROLLBAR & KURSOR HACKER ===

File yang berubah: script.js (modul konamiEgg + sedikit modul siteCursor), style.css (blok PEMBARUAN 65 di paling bawah). index.html, games.js TIDAK berubah.

- AKSES BARU: tekan berurutan  ↑ ↑ ↓ ↓ ← → ← → ENTER  (jeda antar tombol maks 4 detik; di luar kolom isian; game alien tertutup).
  HP: gesek atas, atas, bawah, bawah, kiri, kanan, kiri, kanan, lalu ketuk 1x. Kode B A dan kata "hacker" TIDAK dipakai lagi. Ulangi urutan saat mode aktif = keluar.
- SCROLLBAR HACKER (Chrome/Edge/Safari): trek hitam bergaris, gagang hijau bersegmen dengan cahaya, tanpa sudut membulat. Hover = lebih terang. Firefox memakai warna hijau tipis.
- KURSOR HACKER (mouse asli): bidikan kotak bersudut + blok kedip di tengah, cincin putus-putus hijau kotak, jejak berupa angka 0 dan 1 yang berjatuhan, klik = ledakan 0/1.
- ATUR: warna lewat --sc-c / --sc-c2 dan --sb-* di blok PEMBARUAN 65. Bentuk kursor: ikon .s-hack di ICONS (siteCursor). Urutan kode: konstanta SEQ di konamiEgg.

=== PEMBARUAN 64: PERBAIKAN AKSES KEYBOARD MODE HACKER ===

File yang berubah: script.js SAJA (modul konamiEgg). style.css, index.html, games.js TIDAK berubah.

- Tombol pengubah (Shift, Ctrl, Alt, CapsLock, Tab) tidak lagi mereset urutan kode.
- Tombol dibaca lewat e.code (ArrowUp/KeyB/KeyA), jadi jalan di layout keyboard / IME apa pun. Pendengar dipasang di window DAN document supaya tidak tertelan modul lain.
- JALUR BARU: ketik kata  hacker  (atau  heker)  di luar kolom isian = langsung adegan "KODE DITERIMA" -> Mode Hacker. Ulangi kode atau kata itu saat mode aktif = keluar.
- Arsip Rahasia (kartu Kode Arcade, tabel pintasan) ikut diperbarui.
- TIDAK jalan kalau: kursor sedang di kolom isian (komentar dll), game alien terbuka, atau halaman belum diklik (klik bagian kosong halaman dulu supaya keyboard terfokus ke halaman).

=== PEMBARUAN 63: GAME TEMBAK DIHAPUS DARI KODE ARCADE + ALIRAN KODE DI LATAR MODE HACKER ===

File yang berubah: script.js (modul konamiEgg ditulis ulang tanpa game; modul hackerMode ditambah aliran kode), style.css (blok kecil PEMBARUAN 63 di paling bawah). index.html, games.js TIDAK berubah.

- KODE ARCADE: sekarang tanpa pesawat/invader. Layar CRT -> hujan kode + terminal mengetik sendiri -> "KODE DITERIMA" -> (±4,6 dtk) Mode Hacker menyala. Esc = langsung lompat ke Mode Hacker. Lama adegan: konamiEgg.CFG.length.
- ALIRAN KODE DI LATAR: kolom log bergulir naik (parallax, 2-8 kolom sesuai lebar layar) + baris kode melintas kiri/kanan di seluruh layar, di atas halaman tapi tidak bisa diklik.
  Makin banyak mengetik, aliran makin kencang (boost), ledakan saat ROOT ACCESS GRANTED. Kerapatan/keterbacaan: opacity .hk-flow di style.css (default .55). Isi kode: array GEN di hackerMode.
- Hujan huruf Matrix dibuat lebih samar (opacity .2). Mode "kurangi gerakan": hujan Matrix dimatikan.

=== PEMBARUAN 62: MODE HACKER (AKHIR ADEGAN KODE ARCADE) + TERMINAL KODE PALSU ===

File yang berubah: script.js (modul baru hackerMode di paling bawah + patch kecil di modul konamiEgg + teks kartu Arsip Rahasia), style.css (blok PEMBARUAN 62 di paling bawah). index.html, games.js TIDAK berubah.

- ALUR: kode atas-atas-bawah-bawah-kiri-kanan-kiri-kanan-B-A -> adegan invader -> STAGE CLEAR -> "KODE DITERIMA" -> web berubah jadi MODE HACKER.
- TAMPILAN: seluruh situs jadi hijau-hitam (filter di <html>, tema terang otomatis dibalik jadi gelap), font monospace, scanline CRT, hujan kode tipis, glitch saat masuk/keluar.
- TERMINAL SAMPING (kanan): ketik APA SAJA di keyboard -> muncul kode ala hacker (nmap, exploit, decrypt, SQL, ssh, dll, warna sintaks). Enter = ledakan kode.
  Bar FIREWALL BYPASS naik tiap ketikan; 100% = "ROOT ACCESS GRANTED" + kilat. Tombol – = kecilkan, tombol x = keluar. HP: ketuk panel lalu ketik (atau ketuk panel untuk membuka keyboard).
  Semua kode HANYA hiasan teks acak, tidak menjalankan apa pun. Tidak aktif mengetik saat game alien terbuka / di kolom isian.
- KELUAR: tombol x di panel, ulangi kode Arcade (langsung keluar tanpa adegan), atau hackerMode.off(). Tidak disimpan: muat ulang = normal.
- ATUR: hackerMode.CFG (sound, volume, rain, cps = huruf per ketikan [2,6], maxLines, prompt). Warna: filter di baris pertama blok CSS (hue-rotate 58deg = hijau). Daftar kode: array GEN di modul.
- CONSOLE: hackerMode.on() | .off() | .toggle() | .active

=== PEMBARUAN 61: DUA EASTER EGG BARU (RAHASIA, CARA MENEMUKANNYA ADA DI ARSIP RAHASIA) ===

File yang berubah: script.js (dua modul baru di paling bawah: konamiEgg & hanabiEgg, + 2 kartu baru dan 2 baris di modul panduanRahasia), style.css (blok PEMBARUAN 61 di paling bawah).
index.html, games.js TIDAK berubah. Tanpa file gambar/suara baru (semua digambar kanvas, bunyi Web Audio).

- Sengaja tidak dijelaskan di sini supaya tetap jadi kejutan. Detail ada di Arsip Rahasia (Ctrl + Alt + H): kartu "Kode Arcade..." (golongan Kode & Pintasan) dan kartu "Malam Kembang Api..." (golongan Langit & Cuaca), plus tabel pintasan.
- Keduanya tidak aktif saat game alien terbuka, tidak bentrok dengan easter egg lain, hormati "kurangi gerakan", dan ikut mati kalau tapSound.on = false.
- CONSOLE: konamiEgg.play() / close() / CFG  |  hanabiEgg.play() / shoot(x,y) / close() / CFG

=== PEMBARUAN 60: ICHIBĒ HYŌSUBE DI GAME ALIEN (SKILL LEMPAR TINTA -> MUSUH JADI SEMUT HITAM) + UPDATE ARSIP RAHASIA ===

File yang berubah: games.js (modul baru "ICHIBĒ HYŌSUBE" sebelum modeKind + patch kecil di suara, panel, state, input, gambar pemain, alien & bos), style.css (blok PEMBARUAN 60 di paling bawah), script.js (modul panduanRahasia: Arsip Rahasia diperbarui, lihat bawah).
index.html TIDAK berubah. Tanpa file gambar/suara baru (semua digambar kanvas, bunyi Web Audio, ucapan suara Jepang browser).

- AKTIF: masuk mode Bleach > Ichibē Hyōsube di website -> buka game alien -> panel "ICHIBĒ MODE" muncul di kanan. Tekan 5 = ganti wujud: Shikai -> Bankai -> nonaktif.
  Tombol wujud di panel (Shikai / Bankai) juga bisa langsung dipilih.
- SERANG DASAR: klik / J / F = tembakan tinta kuas ke arah mouse (Shikai 1 tembakan, Bankai 3 sebar menembus).
- 3 LEMPAR TINTA (墨, cd 7 dtk): kantong tinta terbang ke titik bidik lalu pecah. Alien biasa yang tersiram BERUBAH HITAM JADI SEMUT: jatuh ke tanah, TIDAK BISA MENYERANG
  (tidak menembak, tidak menabrak, kebal damage lain), mati saat mendarat dan tetap dihitung kill. Peluru musuh di area ikut tertelan.
  BOS tidak jadi semut: terbungkus tinta 6 dtk (Bankai 9 dtk) -> gerak melambat, tidak bisa menembak, tidak melukai pemain.
- 4 TEBAS KUAS (筆, cd 5 dtk): satu sabetan kuas panjang menembus semua di garis bidik (alien 7 damage, bos 6; Bankai 10 / 9).
- 6 HUJAN TINTA (雨, cd 24 dtk): tetes tinta jatuh di seluruh layar 3 dtk (Bankai 4 dtk, lebih rapat); 60% tetes diarahkan ke atas alien. Alien yang kena jadi semut, bos terbungkus tinta 4 dtk.
- BANKAI (tinta emas): lebih cepat & lompat lebih tinggi, menerima 70% damage (Shikai 90%), area tinta lebih luas, semua cooldown 40% lebih singkat.
- Atur angka di games.js blok "ICHIBĒ HYŌSUBE": IBCD (cooldown skill), ibMul() (pengali cooldown Bankai), R di ibInk() (radius tinta 160 / 235), lama bos terbungkus di ibSplat() & ibInkBoss(),
  gravitasi semut di ibAntStep() (760), damage di ibBrush() & ibShoot().
- Warna panel mengikuti wujud (merah / emas) lewat atribut data-form di style.css.
- Berhenti otomatis kalau pindah dari mode Ichibē di website (semua efek direset). Semut tidak dihitung sebagai ancaman, jadi ronde tetap bisa lanjut begitu semut mendarat.
- ARSIP RAHASIA (script.js, modul panduanRahasia): kartu "Mini game alien" diperbarui (karakter Bleach / JJK jadi pemain, tombol 5 / 3 / 4 / 6).
  Kartu baru di golongan "Quincy & Tinta": "Ichibē di game alien: semut tinta" (cara akses + catatan). Tabel pintasan ditambah baris game alien.
  Semua bisa dicari di kolom cari panduan (kata kunci: semut, tinta, Ichibē).

=== PEMBARUAN 59: EASTER EGG SOFI BISA DIBUKA DARI HURUF "S" DI TULISAN "PAREWUSI" (MENU HOME) ===

File yang berubah: script.js SAJA (modul sofiLetter ditambah di paling bawah). style.css, games.js, index.html tidak berubah.

- CARA: ketuk / klik huruf S pada tulisan Parewusi di menu Home -> adegan Sofi (layar penuh bunga + foto + pesan) langsung terbuka, di tema apa pun (sama seperti pintasan Ctrl+S O P I).
  Alternatif: arahkan kursor ke tulisan Parewusi lalu tekan tombol S di keyboard. Atau Tab ke huruf S lalu Enter / Spasi.
- Tampilan tulisan TIDAK berubah (huruf S hanya dibungkus <span class="sfl-s">, kursor jadi tangan). Kalau adegan sedang terbuka, ketukan berikutnya diabaikan.
- Tulisan dicari otomatis (tidak perlu ubah index.html): dicari di area Home (.home-section / .home-content / .home-orbit); kalau di sana tidak ada, dipakai kemunculan pertama di halaman.
  Mendukung tulisan utuh dan tulisan yang dipecah per huruf. Kalau dirender ulang (animasi ketik, ganti tema), otomatis dibungkus lagi.
- ATUR: sofiLetter.CFG.word (kata yang dicari) / .index (urutan huruf S, mulai dari 0) / .scope (area pencarian). Console: sofiLetter.rescan()

=== PEMBARUAN 58: GOJO DI GAME ALIEN (BIASA + PENUTUP MATA · SIX EYES · DOMAIN EXPANSION) ===

File yang berubah: games.js (modul baru "SATORU GOJO" sebelum modeKind + patch kecil di suara, panel, state, input, gambar pemain), style.css (blok PEMBARUAN 58 dari file pembaruan-58.css, tempel di paling bawah).
index.html, script.js TIDAK berubah. Tanpa file gambar/suara baru (semua digambar kanvas, bunyi Web Audio, ucapan suara Jepang browser).

- AKTIF: masuk mode JJK > Satoru Gojo di website (bukan karakter Bleach) -> buka game alien -> panel "GOJO MODE" muncul di kanan. Tekan 5 = ganti wujud: Biasa -> Six Eyes -> Domain -> nonaktif.
  Tombol wujud di panel (Biasa / Six Eyes / Domain) juga bisa langsung dipilih.
- SERANG DASAR: klik / J / F = bola energi kutukan biru & merah ke arah mouse (Biasa 1 bola, Six Eyes 2 bola, Domain 3 bola menembus).
- BIASA (penutup mata terpasang): 3 Ao (bola biru menyedot & menggiling musuh, cd 6 dtk) · 4 Aka (ledakan tolak, cd 8 dtk) · 6 Hollow Purple (isi 1,4 dtk lalu sinar ungu menembus semua, bos 18 damage, cd 22 dtk).
- SIX EYES (penutup mata dibuka, terbang lepas): lebih cepat & lompat lebih tinggi, menerima 75% damage, INFINITY = peluru musuh dalam radius ~76 px ditangkis + 30% serangan meleset.
  Skill jadi versi Maksimum (area lebih besar, Murasaki bos 26 damage) dan semua cooldown 40% lebih singkat.
- DOMAIN (Unlimited Void 無量空処, 12 dtk): kilat + tulisan 領域展開, latar semesta ungu penuh aliran data, SEMUA alien & peluru membeku (hanya 4% kecepatan), Gojo kebal total,
  cooldown skill tinggal 15%. Di akhir: semua musuh dihantam banjir informasi (alien biasa mati, bos 20 damage), kembali ke Six Eyes, Domain isi ulang 40 dtk.
- Atur angka di games.js blok "SATORU GOJO": GCD (cooldown skill), G_DOM_DUR (durasi Domain), G_DOM_CD (cooldown Domain), gMul() (pengali cooldown wujud), damage di gRedBlast / gMurBlast / gEndDomain.
- Warna panel mengikuti wujud (biru / biru muda / ungu) lewat atribut data-form di style.css.

=== PEMBARUAN 57: EASTER EGG "SOFI" (PENGGANTI "FAQIHHHH") - LAYAR PENUH BUNGA SAAT MENGINTIP ===

File yang berubah: script.js (modul faqihEgg diganti sofiEgg, di paling bawah), style.css (blok PEMBARUAN 56 diganti blok PEMBARUAN 57, di paling bawah).
File baru: images/sofi.png (foto Sofi, transparan). TARUH SUARANYA di  music/sofi.mp3  (kalau tidak ada, dicoba music/faqih.mp3, lalu fanfare buatan kode).
index.html, games.js TIDAK berubah. images/faqih.png sudah tidak dipakai (boleh dihapus).

- NAMA: sekarang "Easter Egg Sofi". Kelas CSS fqe-* jadi sfe-*, atribut data-fqe jadi data-sfe. Nama Console lama faqihEgg tetap jalan (alias ke sofiEgg).
- PEMICU: tetap sama dengan Elang Raja (mode Terang, bukan karakter Bleach). Pertama muncul 90-150 dtk setelah mode Terang aktif, lalu tiap 4-8 menit.
  Tidak muncul bersamaan dengan Elang Raja / Banjir / Petir / Puting Beliung. Mengintip 14 dtk (CFG.stay).
- SAAT SOFI MENGINTIP (belum diketuk): LAYAR PENUH BUNGA.
    * taman bunga bertangkai tumbuh dari dasar layar dan bergoyang
    * begitu dia naik, bunga menyembur dari kepalanya (+ kerlip suara)
    * bunga mekar acak di seluruh layar, bunga & kelopak berjatuhan sambil meliuk
    * Sofi muncul dengan aura merah muda dan balon ucapan "Faqihhh~ ketuk aku"
    Semua bunga digambar kode di kanvas (tanpa file gambar), halaman di bawahnya tetap bisa diklik.
- HANYA KALAU DIKETUK baru easter egg keluar: kilat kamera + "cekrek" -> jendela bidik kamera (sudut + info 1/125 F1.8 ISO 100)
  -> foto meledak ke tengah, kotak fokus mengunci di wajah (bip) -> "Faqihhhhhh!" huruf demi huruf + suara -> hujan bunga & hati
  (di belakang foto, wajah tidak pernah tertutup) + karangan bunga berputar -> pesan:
  "Ini Easter Egg Sofiaa" / "Orang yang selalu menyemangatiku dengan memanggil Faqihhhhhhhh!" / "Terima kasih, ya."
  Ketuk layar / tombol X / Esc untuk menutup.
- PINTASAN KEYBOARD: tahan Ctrl, lalu tekan S, O, P, I berurutan (jeda maks 2,5 dtk per huruf) -> adegan Sofi langsung terbuka di tema apa pun.
  Pintasan yang sama saat adegan terbuka = menutupnya. Pola sama dengan Ctrl + B L E A C H. Tidak aktif saat mengetik di kolom isian.
  Catatan: Ctrl+S biasa (simpan halaman) di situs ini ikut tertahan sebagai awal pintasan.
- SUARA: ikut mati kalau tapSound.on = false. Lagu latar mengecil selama suaranya diputar (CFG.duck).
- Hormati prefers-reduced-motion (bunga jauh lebih sedikit, tanpa putaran). Bisa ditekan lewat keyboard (Tab ke Sofi, lalu Enter / Spasi).
- Tidak dimasukkan ke panduan Arsip Rahasia supaya tetap jadi kejutan.
- CONSOLE: sofiEgg.peek() mengintip + bunga | sofiEgg.show() langsung meledak | sofiEgg.close() | sofiEgg.flowers(true/false)
  CFG: photo, sound (array), volume, shout, kicker, bubble, message (array baris), first, every, stay, duck, flowers (kepadatan bunga, 1 = normal).
  Uji cepat: sofiEgg.CFG.first = [3,3] lalu ganti tema ke Terang, atau langsung sofiEgg.peek().

=== PEMBARUAN 56: EASTER EGG "FAQIHHHH" (MODE TERANG, MENGINTIP SEPERTI ELANG RAJA) ===

File yang berubah: script.js (modul baru faqihEgg di paling bawah), style.css (blok PEMBARUAN 56 di paling bawah).
File baru: images/faqih.png (foto transparan). TARUH SUARAMU di  music/faqih.mp3  (CFG.sound). index.html, games.js TIDAK berubah.

- PEMICU: sama dengan Elang Raja (mode Terang, bukan karakter Bleach). Pertama muncul ~90-150 dtk setelah mode Terang aktif, lalu tiap ~4-8 menit.
  Tidak muncul saat Elang Raja sedang terbang. Berhenti / sembunyi kalau pindah dari mode Terang.
- ADEGAN: foto mengintip dari bawah layar (kiri/kanan acak, gelembung "psst!", sembunyi lagi setelah 10 dtk). Diketuk -> kilat kamera + bunyi "cekrek",
  foto meledak ke tengah dengan sinar emas, tulisan "Faqihhhhhh!" muncul huruf demi huruf + suaramu, hujan hati/bintang, lalu pesan haru. Ketuk layar / X / Esc untuk menutup.
- SUARA: music/faqih.mp3. Kalau file belum ada, diganti fanfare pendek buatan kode. Lagu latar mengecil selama suaranya diputar (CFG.duck).
- Tidak dimasukkan ke panduan Arsip Rahasia supaya tetap jadi kejutan. Mau dimasukkan: tambah satu objek di ITEMS modul panduanRahasia.
- CONSOLE: faqihEgg.peek() mengintip | faqihEgg.show() langsung meledak | faqihEgg.close()
  CFG: photo, sound, volume, shout, message (array baris), first, every, stay, duck.
  Uji cepat: faqihEgg.CFG.first = [3,3] lalu ganti tema ke Terang, atau langsung faqihEgg.peek().

=== PEMBARUAN 55: TOMBOL "ARSIP RAHASIA" - PANDUAN SEMUA FITUR & EASTER EGG ===

File yang berubah: script.js (modul baru panduanRahasia di paling bawah), style.css (blok PEMBARUAN 55 di paling bawah).
index.html, games.js TIDAK berubah (tombol dibuat lewat script.js). Tanpa file gambar/suara baru.

- TOMBOL: bulat kecil 44px dengan ikon buku + bintang berkedip, cincin putus-putus berputar, denyut cahaya. Desktop: kanan atas, tepat di bawah tombol tema. HP: tab di tepi kanan layar.
  Warna ikut tema (biru, Senja jingga, Monokrom abu, karakter Bleach, JJK).
- PANEL: 39 kartu dalam 6 golongan (Fitur Dasar, Langit & Cuaca, Bleach, Quincy & Tinta, Jujutsu Kaisen, Kode & Pintasan), kolom cari, tab golongan.
  Cara akses DIKABURKAN (spoiler) sampai kartunya diketuk. Tiap kartu: deskripsi, langkah cara akses, catatan, perintah Console, dan tombol "Coba" untuk adegan yang bisa diuji langsung.
- PINTASAN: Ctrl + Alt + H buka/tutup. Esc tutup. Klik di dalam panel tidak memicu efek klik situs (kursor, bunyi ketuk, menu jurus Gojo).
- ISI PANDUAN: konstanta ITEMS di modul (script.js). Easter egg baru = tambahkan satu objek { g, ic, t, tag, d, how:[...], note, con, demo }.
- ATUR: panduan.CFG = { show (sembunyikan tombol), hotkey, demo (tombol Coba), spoiler (kabut), sound }.
  Mau panduan benar-benar rahasia: panduan.CFG.show = false di kode -> tombol hilang, panel hanya bisa dibuka lewat Ctrl+Alt+H atau panduan.open().
- CONSOLE: panduan.open() | .close() | .toggle() | .show() | .hide() | .CFG

=== PEMBARUAN 54: JURUS GOJO - KLIK 2x = MENU BIRU / MERAH / HOLLOW PURPLE (+ VERSI MAKSIMUM DI DOMAIN) ===

File yang berubah: script.js (modul baru gojoSkills di paling bawah + 1 perubahan kecil di daftar SKIP modul gojoTheme), style.css (blok PEMBARUAN 54 di paling bawah).
index.html, games.js TIDAK berubah. Tidak ada file gambar / suara tambahan (bunyi dibuat Web Audio, gambar digambar kanvas).
CATATAN: blok CSS PEMBARUAN 53 (Puting Beliung) tidak ikut di style.css ini; kalau style.css-mu sudah punya blok 53, tempel saja blok 54 dari paling bawah file ini ke style.css-mu.

- PETUNJUK: setiap masuk mode Gojo muncul kartu kecil di bawah layar: "Klik 2x (di HP: ketuk 2x) di bagian kosong layar untuk membuka menu jurus". Masuk Domain muncul petunjuk kedua
  (jurus jadi versi Maksimum). Petunjuk menunggu adegan sinematik selesai dulu, hilang sendiri setelah 9 detik. Matikan: gojoSkills.CFG.hint = false.
- CARA PAKAI: mode GOJO (tombol JJK > Satoru Gojo). KLIK KIRI 2x (jeda maks 0,42 detik, posisi berdekatan) atau KETUK 2x di bagian kosong layar -> menu "JURUS" muncul di kursor.
  Klik 1x biasa TIDAK membuka menu: efek klik lama tetap jalan (Ao/Aka/Murasaki di Biasa, heksagon di Six Eyes, tinta di Domain).
  Klik di luar menu / Esc = tutup. Pintasan: 1 / B = Biru, 2 / R = Merah, 3 / P = Hollow Purple. Tombol, tautan, kolom isian, ID card, dan tombol tetap tidak memunculkan menu.
- BIRU (Ao)    : bola biru + spiral + partikel terhisap. Elemen di sekitar titik klik berputar masuk ke bola lalu terpental kembali.
- MERAH (Aka)  : ledakan merah + cincin kejut + retakan; SEMUA elemen terlempar, pecah jadi kepingan, lalu menyatu lagi.
- HOLLOW PURPLE: bola biru & merah mengorbit, menyatu, DUAR, layar ditelan ungu lalu seluruh web jadi VOID hitam. Ketuk / Esc (setelah 1 detik) untuk kembali.
- MODE DOMAIN = JURUS MAKSIMUM (menu berubah jadi "DOMAIN 領域展開", tangan Gojo ikut berdenyut saat jurus dilepas):
    Biru Maksimum : jari-jari hisap = seluruh layar, layar menggelap, 6 lengan spiral, partikel 2x lebih banyak, CAKRAM AKRESI pelangi mengelilingi bola, hampir semua elemen tersedot
                    (putaran lebih ganas), bertahan 3,4 detik, dilepas dengan kilat + 4 cincin kejut.
    Merah Maksimum: kilat putih + BLACK FLASH (9 petir merah-hitam menyambar), 3 cincin kejut lebih cepat, retakan 2x lebih banyak, kepingan 2,5x lebih banyak (maks 1800), elemen terlempar 1,7x lebih jauh.
    Hollow Purple Maksimum: pengisian lebih lama (3,4 dtk) dengan orbit lebih lebar, petir ungu antar bola, energi tersedot dari seluruh layar, SINAR UNGU melintang layar + aksara 茈 raksasa saat meledak,
                    5 cincin kejut, lalu void hitam; di dalam void ada aksara 無量空処 sangat samar yang muncul perlahan.
- Tidak ada yang dihapus dari halaman: elemen hanya digeser lewat animasi (translate / rotate / scale / opacity) lalu dikembalikan. Keluar dari mode Gojo di tengah jurus / di void = langsung normal.
- Tidak berjalan saat adegan Puting Beliung (PEMBARUAN 53) sedang tampil.
- Atur di gojoSkills.CFG: blueRadius, blueHold / blueHoldDom, redHold / redHoldDom, maxTargets, dblMs (jeda klik 2x), hint, hintDelay.
  Elemen yang ikut terpengaruh: konstanta TARGET / TEXTISH / IGN. Waktu Hollow Purple: PT_N (biasa) dan PT_D (Domain) = { CH: menyatu, BOOM: ledakan, BLK0/BLK1: hitam melebar }.
- CSS: .gs-menu (+ .is-domain), .gs-toast, .gs-void (+ .is-domain), warna jurus .gs-ao / .gs-aka / .gs-mur lewat --c dan --c2.
- CONSOLE: gojoSkills.menu() | .blue(x,y) | .red(x,y) | .purple(x,y) | .exit() | .off() / .on() | .CFG  (harus sedang di mode Gojo; di Domain otomatis versi Maksimum)
- Mode "kurangi gerakan" dihormati. Bunyi ikut mati kalau tapSound.on = false.

=== PEMBARUAN 53: EASTER EGG ANGIN PUTING BELIUNG (DI MODE ANGIN KENCANG, SETELAH 2 MENIT) ===

File yang berubah: script.js (modul baru putingBeliung di paling bawah), style.css (blok PEMBARUAN 53 di paling bawah).
index.html, games.js TIDAK berubah. Modul cuaca TIDAK diubah: easter egg hanya membaca html[data-weather] == "wind". Tanpa file gambar/suara baru.

- PEMICU: mode cuaca ANGIN KENCANG menyala TERUS selama 2 menit (120 detik). Ganti ke cuaca lain = hitungan kembali ke 0. Tab yang tidak terlihat tidak dihitung.
  BERULANG: setelah adegan selesai, hitungan 2 menit mulai lagi dari 0: 2 menit angin kencang -> puting beliung -> 2 menit angin kencang -> puting beliung, dst.
  (puting.CFG.repeat = false kalau mau cuma sekali per muat halaman.) Tidak muncul kalau ada adegan / kartu lain (Petir, Hiu, dll.) yang sedang terbuka.
- ALUR (sekitar 17 detik):
    0-4 dtk    langit menggelap, awan hitam muncul, gemuruh makin keras, kilat di dalam awan, CORONG TURUN dari awan ke tanah
    4 dtk      menyentuh tanah (dentum), debu & serpihan daun/ranting ikut berputar, layar mulai bergetar
    4-12 dtk   SEMUA yang ada di layar (teks, kartu, gambar, tombol, navigasi, tombol melayang) tersedot satu per satu, yang dekat duluan,
               berputar naik di dalam corong sambil mengecil dan berputar badan
    12,4 dtk   DUAR: kilat putih + dentum, semuanya DIHEMPASKAN ke segala arah sampai keluar layar
    13-15 dtk  corong terangkat, langit cerah lagi (layar kosong sebentar)
    14,6 dtk   semuanya JATUH KEMBALI ke tempat asal (dari atas ke bawah, memantul kecil, bunyi gedebuk)
    ~17 dtk    kartu "Selamat! Kamu terseret Angin Puting Beliung" (ketuk / Esc / otomatis 9 dtk)
- Selama adegan layar tidak bisa diklik dan tidak bisa digulir. Esc = hentikan adegan, semuanya langsung dikembalikan (tanpa kartu).
- CARA KERJA: elemen yang terlihat di layar dikumpulkan otomatis (teks, gambar, tombol, dan kartu/kotak yang punya latar/bingkai/bayangan; latar layar penuh dan kanvas cuaca dibiarkan).
  Elemen digeser lewat properti CSS translate / rotate / scale (tidak menimpa transform bawaanmu), lalu semua dikembalikan persis seperti semula di akhir.
  Selama adegan pembungkus elemen diberi atribut data-tw-ov (overflow dilepas supaya elemen tidak terpotong), elemen diberi data-tw-it; semua atribut dihapus lagi di akhir.
- Mode "kurangi gerakan": versi singkat ~2 detik (layar gelap sebentar, elemen menghilang lalu muncul lagi, lalu kartu), tanpa corong & getaran.
- Suara (Web Audio, ikut mati kalau tapSound.on = false): gemuruh + siulan angin yang makin keras, dentum menyentuh tanah, DUAR hempasan, gedebuk jatuh, dentang kartu.
- CONSOLE: puting.start() uji langsung | puting.reset() hentikan | puting.CFG: after (120 detik), repeat (false), maxItems (160), sound, volume, congrats.
  Uji cepat tanpa menunggu: puting.CFG.after = 5; lalu nyalakan Angin Kencang (atau langsung puting.start()).
- ATUR: garis waktu = konstanta TL di awal modul | ukuran & bentuk corong = fungsi geometry() dan drawFunnel() | kecepatan putaran = it.sp (rad/dtk) di start() | kekuatan hempasan = R(1100, 2600) di frame() | warna kartu = .tw-cg di style.css.

=== PEMBARUAN 52: TOMBOL BLEACH & JJK LEBIH KEREN + PENUTUP MATA BARU ===

File yang berubah: script.js (modul baru btnFx di paling bawah + fungsi bfGate di modul gojoTheme), style.css (blok PEMBARUAN 52 di paling bawah).
index.html TIDAK berubah. Fungsi tombol (buka menu, ganti karakter) sama persis; hanya tampilannya.

- TOMBOL BLEACH & JJK (kanan bawah):
    bentuk jajar genjang searah goresan miring + bingkai bercahaya yang berdenyut; latar bergaris tipis + kilau yang menyapu tiap ~5 detik
    goresan miring: Bleach berkelip seperti api, JJK sesekali menyambar merah-putih ("Black Flash")
    bola karakter punya lingkaran energi berputar di tepinya
    percikan roh (Bleach) / energi kutukan (JJK) naik dari tombol, lebih rapat saat kursor di atasnya
    kursor di atas tombol = tombol membesar, miring 3D mengikuti kursor, ada sorotan cahaya mengikuti kursor
    diketuk = ledakan percikan | menu terbuka = cahaya lebih terang
    warna otomatis ikut tema: Bleach mengikuti --bl, JJK mengikuti --jj (merah saat Sukuna)
    ukuran sekarang 104 x 40 (dulu 88 x 34). Jarak tumpukan tombol (bottom 90 / 140) tidak diubah.
- PENUTUP MATA DI DASAR KONTAK digambar ulang (fungsi bfGate): pita kain melengkung dengan jahitan putus-putus, lipatan, simpul, dan dua ekor yang berkibar pelan;
  kilau biru sesekali; saat kursor di atasnya naik sedikit + bersinar. Perilaku (Buka / Pasang penutup mata) tidak berubah.
- Mode "kurangi gerakan" dihormati: tanpa kilau, percikan, putaran, dan ekor berkibar.

=== PEMBARUAN 51: PINTASAN KEYBOARD MODE JJK (WIN + SHIFT + -) ===

File yang berubah: script.js (modul jjkEgg: satu pendengar keydown baru). style.css, index.html TIDAK berubah.

- Win + Shift + -  (di Mac: Cmd + Shift + -)  = membuka kunci mode JJK, sama seperti ketuk ID card 15x: tombol 呪 muncul di kanan bawah + ucapan selamat.
- Sesudah terbuka, kombinasi yang sama = buka / tutup menu Gojo & Sukuna.
- CADANGAN: Ctrl + Alt + J (dipakai kalau Windows atau browser menelan kombinasi Win + Shift + -).
- Tanda "-" boleh yang di baris angka maupun yang di numpad. Kombinasi tanpa tombol Win (Shift + - saja) tidak melakukan apa-apa.
- Kalau mau ganti kombinasi: cari "PEMBARUAN 51: pintasan keyboard" di script.js (modul jjkEgg), ubah syarat "combo".
- Sama seperti ketuk 15x: tidak disimpan, muat ulang halaman = terkunci lagi.

=== PEMBARUAN 50: SIX EYES - PENUTUP MATA GOJO (EASTER EGG DI MODE GOJO BIASA) ===

File yang berubah: script.js (modul gojoTheme: blok "PEMBARUAN 50"), style.css (blok PEMBARUAN 50 di paling bawah).
index.html, games.js TIDAK berubah. Tidak ada file gambar: mata di adegan digambar sendiri lewat kode (kanvas), TANPA foto.

- CARA MENEMUKAN: aktifkan mode Gojo (BIASA). Di paling bawah bagian KONTAK ada penutup mata hitam kecil yang sesekali berkilau biru. Tekan.
- ADEGAN (sekitar 6 detik, ketuk untuk lanjut setelah 1,2 dtk):
    1) penutup mata hitam melintang di layar gelap, lalu ditarik naik (seperti Gojo menariknya)
    2) garis cahaya tipis muncul, energi biru-ungu terhisap ke tengah, kelopak membuka: mata putih-kebiruan dengan bulu mata putih dan iris biru bercahaya
    3) DUAR: sinar putih memancar, gelombang kejut + heksagon, layar bergetar, kilat
    4) cincin analisis Six Eyes (cincin bertitik, tanda ukur, busur ungu) mengembang dari iris, muncul 六眼 -> SIX EYES
    5) kamera MASUK ke dalam iris -> kilat putih-biru -> tema berubah
- TEMA SIX EYES: latar biru langit terang -> biru tua dengan cahaya putih dan sedikit ungu; IRIS RAKSASA di kanan dengan HUD analisis,
  iris berkedip tiap 6-11 detik, garis aliran energi tipis, partikel putih/biru/ungu melayang naik, retikel heksagon mengikuti kursor.
  Setiap klik = analisis heksagon (dua heksagon + cincin + percikan + bunyi "ting"). Bagian halaman yang terang memakai putih kebiruan (--white-bg).
- KELUAR DARI SIX EYES: tekan penutup mata lagi (tulisannya jadi "Pasang penutup mata") -> adegan singkat: penutup mata jatuh menutup mata -> kembali ke Gojo Biasa.
  Atau tombol tema > Domain (Six Eyes diganti Domain; keluar dari Domain kembali ke Biasa).
- Atur tampilan mata di adegan: konstanta EX / EY / EW / EH di runScene (modul gojoTheme). Waktu: pull 0,6 | garis cahaya 0,95 | buka 1,4-2,2 | DUAR 2,2 | zoom 4,4-5,3 | selesai 5,9 detik.
- Console: gojoTheme.six() | gojoTheme.unsix() | gojoTheme.mode ("biasa" / "six" / "domain").
- Mode "kurangi gerakan" dihormati. Di HP, iris tema dipindah ke atas tengah.

=== PEMBARUAN 49: EASTER EGG PETIR (TERSAMBAR PETIR SAAT HUJAN PETIR) ===

File yang berubah: script.js (modul baru petirEgg di paling bawah), style.css (blok PEMBARUAN 49 di paling bawah). index.html, games.js TIDAK berubah.
Modul cuaca tidak diubah: petir hanya membaca html[data-weather] == "storm".

- PEMICU: selama mode HUJAN PETIR menyala (setelah 5 detik pertama) ada KESEMPATAN acak tiap detik (default 2,5%, rata-rata ~40 detik) layar tersambar petir langsung.
  Ganti ke cuaca lain = hitungan mulai dari 0. Setelah tersambar ada jeda 60 detik sebelum bisa terjadi lagi.
- ALUR: langit berkedip + dengung statis (1 detik) -> PETIR bercabang menyambar dari atas ke titik acak di layar (layar bergetar, bunyi DUAR) -> layar PUTIH PENUH ~1,4 detik
  (telinga berdenging) -> memudar dengan kedip -> bekas gosong samar di titik sambaran -> kartu "Selamat! Kamu terkena Petir" (ikon petir + percikan). Ketuk / Esc / otomatis 9 detik.
- Saat layar putih, layar tidak bisa diklik. Hormati prefers-reduced-motion (tanpa kedip & getar, putih singkat). Suara Web Audio ikut mati kalau tapSound.on = false.
- CONSOLE: petir.strike() uji langsung | petir.reset() | petir.CFG: chance (peluang per detik), minStorm (5), cooldown (60), whiteHold (1.4 detik putih), sound, volume, congrats.
  Uji cepat: petir.CFG.chance = 2; lalu nyalakan Hujan Petir.
- Warna: .pt-bolt (petir) dan .pt-cg (kartu) di style.css; bentuk petir: fungsi boltPaths() di script.js.

=== PEMBARUAN 48: HIU DI EASTER EGG BANJIR (BERENANG DI ABOUT - KONTAK, DIKETUK = MENERKAM LAYAR) ===

File yang berubah: script.js (modul banjirEgg: bagian baru "HIU" + suara hiu di SND + patch kecil di CFG / frame / reset / API), style.css (blok PEMBARUAN 48 di paling bawah).
index.html, games.js TIDAK berubah. Tanpa file gambar/suara baru (hiu digambar SVG buatan kode, suara Web Audio).
Perbaikan kecil: requestAnimationFrame di showCongrats() diberi pengaman null (error di Console saat banjir.flood() dipanggil, tidak ada efek ke pengunjung).

- MUNCUL: hanya saat banjir sudah naik penuh (state "flooded"), ~6 detik setelah air naik. Hiu berenang bolak-balik DI BAWAH permukaan air,
  di antara awal bagian ABOUT sampai dasar bagian KONTAK (jadi harus digulir ke bawah untuk menemukannya). Tiap lewat ~10 detik, jeda 5-11 detik lalu muncul lagi
  (70% lewat di layar yang sedang dilihat). Saat hiu pertama masuk layar terdengar dua denyut rendah "dun... dun" sebagai isyarat.
- KETUK HIU (adegan terkaman ~3,7 detik): hiu BELOK tajam (memutar ke arah kita) -> MELESAT (garis kecepatan, layar menggelap) -> MULUT TERBUKA lebar sampai memenuhi layar + geraman
  -> RAHANG MENUTUP (dentum, kilat, layar bergetar) -> layar RETAK + bekas gigi + tetesan air, hiu mundur ke kedalaman, retakan memudar ~5 detik kemudian.
  Selama adegan layar tidak bisa diklik; setelah itu hiu muncul lagi setelah jeda 14-26 detik.
- LEBIH SERU (lanjutan): mata hiu menyala merah saat rahang terbuka, ledakan gelembung dari mulut, gelombang kejut air + denyut merah di tepi layar + hentakan saat gigitan.
- SETELAH DIGIGIT: kartu "Selamat! Kamu menemukan easter egg Hiu" (gambar hiu berenang + gelembung) muncul di atas retakan. Ketuk / Esc / otomatis 9 detik untuk lanjut.
  Muncul tiap kali digigit. Matikan lewat banjir.CFG.sharkCongrats = false.
- Surut / ganti cuaca ke Cerah atau Angin: hiu hilang bersama air. Hormati prefers-reduced-motion (hiu pelan tanpa goyangan, adegan singkat ~2 detik tanpa getar & tanpa 3D).
- Suara (ikut mati kalau tapSound.on = false): isyarat dun-dun, desir belok, desir + dentum melesat, geraman, dentum gigitan + kretek retakan.
- CONSOLE: banjir.shark() hiu muncul sekarang (perlu banjir.flood() dulu) | banjir.bite() uji adegan terkaman kapan saja (tanpa menunggu banjir)
  banjir.CFG: shark (false = matikan hiu), sharkSpeed (105 px/dtk), sharkFirst (6 dtk), sharkCool ([14, 26] jeda setelah menerkam).
- Atur: warna & bentuk hiu = fungsi sideSVG() (tampak samping) dan frontSVG() (tampak depan) di script.js; lebar bukaan mulut = konstanta OPEN; lama tiap tahap adegan = garis waktu di sharkAttack()
  (belok 0-0,8 dtk, melesat 0,75-1,5, mulut terbuka 1,25-2,15, gigit 2,15-2,38, mundur 2,95-3,65). Retakan/tetesan: .fl-sk-glass di style.css. Jalur renang: fungsi sharkLane().

=== PEMBARUAN 47: ICHIBE DIGAMBAR ULANG (LEBIH MIRIP ASLI) + MODE LUKIS / CORET-CORET ===

File yang berubah: script.js (modul ichibeInk ditulis ulang di tempatnya, sebelum blok Jujutsu Kaisen), style.css (palet Ichibe lama diganti + blok PEMBARUAN 47 tepat setelah blok Ichibe; warna tombol cuaca Ichibe ikut diganti).
Digabung dengan Pembaruan 41/42 dan blok lain di file terbaru: bagian itu tidak diubah.
Nomor 47 dipilih supaya tidak bentrok dengan 40-46 yang sudah dipakai.
Baru: images/ichibe.png (foto Shikai) dan images/ichibe-bankai.png (foto Bankai) = gambar yang kamu kirim. index.html, games.js TIDAK berubah.

- PALET BARU (sebelumnya jingga/emas + sisa warna biru dari tema Uryu):
  SHIKAI = hitam + abu tinta (wash) + garis merah tipis yang sedikit bergeser, seperti ilustrasi tinta aslinya.
  BANKAI = washi krem bergaris hitam tebal + bayangan merah muda, latar gradasi merah muda berbintik memudar ke hitam (seperti halaman berwarna Ichimonji).
- MODE LUKIS: tombol kuas bulat di kiri bawah (di atas tombol cuaca). Tekan = mode coret-coret menyala, 5 tombol muncul:
  alat (kuas besar / pena coret tipis), ukuran (kecil-sedang-besar), urungkan, hapus semua, simpan PNG.
  Kuas: tebal-tipis ikut kecepatan tangan (cepat = tipis & kering berbulu, pelan = tebal), pangkal & ujung meruncing, berhenti pelan = tinta menetes,
  ketuk sekali = gumpalan tinta. Mendukung mouse, jari, dan pen (tekanan). Ada desir kuas yang mengikuti kecepatan (ikut mati kalau tapSound.on = false).
  Ganti Shikai <-> Bankai: lukisanmu IKUT berganti gaya (karena disimpan sebagai titik, bukan gambar mati).
  Pintasan: Esc keluar | Ctrl+Z urungkan | [ ] atau roda mouse = ukuran. Lukisan menempel di layar (tidak ikut scroll); hilang kalau halaman dimuat ulang (simpan PNG dulu).
- LATAR (di belakang konten): sapuan kuas kering, lingkaran enso (dengan tetesan di pangkal), cipratan bergaris, serpihan tajam, awan tinta, segel hanko.
- ADEGAN (tanpa teks): kuas melukis sapuan besar + enso + goresan "ichi" (satu garis), di puncak serpihan meledak, cipratan, cincin merah, dan hanko dicap + dentum taiko (Bankai ditambah denting).
- KLIK LAYAR (di luar mode lukis): cipratan tinta + sapuan. Hormati prefers-reduced-motion (latar tidak bergerak, adegan langsung selesai).
- Atur: gaya warna kuas di fungsi STY (script.js, ichibeInk). Warna tombol: variabel --ibk-* di blok PEMBARUAN 40 (style.css). Posisi foto: .bs-art object-position.
- Console: ichibeInk.draw(true/false) | undo() | clear() | save() | splash() | enso() | off() | on()

=== PEMBARUAN 44: EASTER EGG BANJIR (HUJAN / HUJAN PETIR 2 MENIT) ===

File yang berubah: script.js (modul baru banjirEgg di paling bawah), style.css (blok PEMBARUAN 41 di paling bawah). index.html, games.js TIDAK berubah.
Modul cuaca (weatherMode) tidak diubah: banjir hanya membaca html[data-weather] ("rain" / "storm").

- PEMICU: mode cuaca Hujan atau Hujan Petir menyala terus 2 menit (pindah Hujan <-> Hujan Petir tetap dihitung; pindah ke Cerah / Angin = hitungan menyusut).
  Petunjuk halus: sejak ~1,5 menit ada genangan tipis yang naik di dasar layar + tetes air, dan gemuruh jauh di ~1 menit 45 detik.
- ALUR: kilat + guntur -> kartu ucapan selamat (air naik di dalam kartu, huruf bergelombang, gelembung, denting tetes air) -> ketuk / Esc / otomatis 8 detik
  -> layar menggulir ke ID card -> air naik 6,5 detik sampai TENGAH ID CARD.
- TINGGI AIR TETAP DI HALAMAN: permukaan air ada di tengah ID card; gulir ke bawah = semuanya tenggelam (makin dalam makin gelap/biru, hujan layar diredam,
  berkas cahaya, kaustik, gelembung, ikan, kadang paus raksasa lewat). Gulir kembali ke atas = permukaan air ada di tengah ID card lagi.
- KARTU: skill, timeline, folder portofolio, foto scatter, kontak, GitHub, wibu. Yang di bawah air TENGGELAM (merosot + miring + bergoyang) atau MENGAPUNG (terangkat + berayun,
  tiap kartu ketiga + yang dekat permukaan); ID card mengapung dengan riak melingkar di garis air. Kartu baru (ganti tab portofolio) ikut tenggelam otomatis.
- KLIK di bawah air = gelembung + "blup".
- SUARA (Web Audio, tanpa file; ikut mati kalau tapSound.on = false): guntur, denting tetes air, air naik (desir + gemuruh + gelembung + cipratan), dengung bawah air yang makin
  teredam saat makin tenggelam, plop kartu tenggelam / mengapung, nyanyian paus, air surut (gluk-gluk + plop). Ketuk layar sekali dulu supaya browser mengizinkan suara.
- SURUT: ganti cuaca ke Cerah atau Angin -> air surut pelan, kartu kembali ke tempat. Hujan 2 menit lagi = banjir lagi.
- PERFORMA: air digambar di 1 kanvas + 1 lapisan blur ringan. Kalau HP/PC lemot: banjir.CFG.blur = false.
- Hormati prefers-reduced-motion (tanpa goyangan kartu, ikan, paus; air naik tetap jalan).
- CONSOLE: banjir.fire() tampilkan ucapan | banjir.flood() langsung naik | banjir.drain() surutkan | banjir.reset() | banjir.state()
  banjir.CFG: seconds (120), seepFrom (90), rise (6.5), autoClose (8), sound, volume, blur, scroll (false = tidak menggulir ke ID card).
  Uji cepat: banjir.CFG.seconds = 5; banjir.CFG.seepFrom = 2; lalu nyalakan Hujan.
- NOMOR: sebelumnya bernomor 41 di percakapan lain; diberi nomor 44 supaya tidak bentrok dengan Pembaruan 41 (Jujutsu Kaisen) & 43 (tangan Gojo).
- Warna air: rgba di fungsi draw() (script.js, modul banjirEgg); warna kartu ucapan di blok PEMBARUAN 41 (style.css).

=== PEMBARUAN 43: TANGAN GOJO - POSE DOMAIN EXPANSION (ADEGAN + LATAR MODE DOMAIN) ===

File yang berubah: script.js (modul gojoTheme: blok baru "PEMBARUAN 43" + gambar tangan di paling bawah modul), style.css (blok PEMBARUAN 43 di paling bawah).
index.html, games.js TIDAK berubah. Tidak perlu file gambar baru: gambar tangan (dari gambar yang kamu kirim) sudah tertanam di script.js.

- ADEGAN DOMAIN (tombol tema > Domain), urutan baru:
    1) layar hitam, tangan Gojo naik dari bawah, berpendar biru + garis energi naik di belakangnya, denyut jantung
    2) JARI MENYILANG: kilat putih, gelombang kejut dari ujung jari, cincin pelangi mekar, glitch merah-cyan sesaat, bintang silang di ujung jari, layar bergetar + bunyi "ting" kristal
    3) tangan meluncur ke depan lubang hitam yang sedang membuka (ujung jari tepat di pusat lubang) -> 領域展開 -> 無量空処 -> DOMAIN EXPANSION -> kilat akhir
  Saat adegan selesai, tangan di adegan dan tangan di latar posisinya sama persis, jadi tidak ada lompatan.
  Keluar dari Domain (tombol tema > Biasa): tangan turun dan memudar bersama lubang hitam yang menutup.
- DI MODE DOMAIN: tangan tetap ada di latar (di belakang konten, di depan lubang hitam):
    mengambang pelan, miring/bergeser halus mengikuti kursor, bintang Six Eyes berkedip di ujung jari,
    tiap 8-14 detik DENYUT: cincin kejut dari ujung jari + tangan menyala sesaat.
    Tiap klik layar ikut membuat tangan berkedip; tiap klik ke-5 = denyut besar + bunyi (ting kristal + dentum).
- HP: tangan lebih kecil, dipasang di bawah lubang hitam dengan transparansi 50% supaya teks tetap terbaca.
- Hormati "kurangi gerakan" (prefers-reduced-motion): tanpa mengambang, tanpa garis energi, transisi singkat.
- GANTI GAMBAR TANGAN: gojoTheme.CFG.handSrc = "images/gojo-hand.png" (PNG transparan, rasio lebar:tinggi sekitar 0.4, ujung jari di sekitar 53% dari kiri & 3% dari atas;
  kalau rasio/posisi ujung jari beda, ubah HAND_AR / HAND_TX / HAND_TY di script.js).
- Warna & animasi: blok PEMBARUAN 43 di style.css (.gj-hand-img = cahaya tepi, .gj-hand-halo = cincin pelangi, .gj-hand-flare = bintang silang, @keyframes gj-snap / gj-hit / gj-float).
- Console: gojoTheme.pulse() = denyut tangan manual | gojoTheme.domain() / .collapse() = adegan masuk / keluar Domain.

=== PEMBARUAN 42: TOMBOL BERMASKOT CHIBI ===

- Tombol Bleach sekarang bermaskot Ichigo (chibi + topeng Hollow), tombol JJK bermaskot Gojo (chibi ikat mata). Gambar dipotong dari gambar kiriman (latar dibuang) lalu ditanam sebagai data-URI di style.css (blok PEMBARUAN 42) -> tidak butuh berkas gambar tambahan.
- Karakter berdiri di ujung kiri pil, menonjol ke atas, melayang pelan, melompat saat disorot, dan bergeser ke kanan (menghadap balik) saat menu dibuka. Pil jadi 104px.
- Slot (desktop): Bleach bottom 90px, JJK bottom 170px. Kalau JJK terbuka lebih dulu: JJK bottom 90px, Bleach 152px. (HP: 116 / 196 dan 116 / 178). Menu keduanya naik sedikit agar tidak menutupi kepala karakter.
- Ganti gambar: ubah --bl-img (Bleach) / --jj-img (JJK) di blok PEMBARUAN 42. Ukuran maskot: width/height pada .bleach-toggle::before dan .jjk-toggle::before.

=== PEMBARUAN 41: EASTER EGG JUJUTSU KAISEN (GOJO & SUKUNA) ===

File yang berubah: script.js (modul baru jjkEgg di paling bawah), style.css (blok PEMBARUAN 41 di paling bawah). index.html, games.js TIDAK berubah (tombol & menu dibuat lewat script.js).

- CARA MEMICU: putar lagu ke-3 ("Merry Christmas, I miss you") lalu ketuk ID card 15x berturut-turut (jeda antar ketukan maks. 3 detik; hanya dihitung saat lagu ke-3 sedang diputar,
  ganti/matikan lagu = hitungan ulang dari 0; mulai ketukan ke-6 terdengar "tek" kecil yang makin tinggi).
- KELUAR: setelah ketukan ke-15, muncul toast "Selamat! Kamu menemukan easter egg Jujutsu Kaisen" dan tombol JJK muncul (+ bergetar) di kanan bawah, bentuknya sama seperti tombol Bleach (pil gelap + garis miring + bola, tulisan JJK; bola bergeser saat menu dibuka). Bola tombol = wajah Gojo (rambut putih, ikat mata terangkat, mata Six Eyes biru); saat mode Sukuna aktif jadi wajah Sukuna. Posisi: JJK tepat di atas tombol Bleach; kalau JJK terbuka lebih dulu, JJK menempati slot Bleach (bottom 90px) dan Bleach pindah ke atasnya. Diatur lewat html[data-jjkfirst] di style.css; kalau Bleach dikunci lagi, urutannya ikut menyesuaikan.
- MENU: tekan tombol itu -> pilih Satoru Gojo atau Ryomen Sukuna. Tekan karakter yang sama lagi = mode dimatikan.
- GOJO (Unlimited Void, biru-ungu): tepukan tangan, cincin kejut, jagat penuh aliran data/bintang, Six Eyes terbuka, tulisan 無量空処 + DOMAIN EXPANSION, kilat putih.
  Mode aktif: pinggiran layar bercahaya biru, klik layar = bola Ao (biru) / Aka (merah) bergantian.
- SUKUNA (Malevolent Shrine, merah-hitam): kuil muncul dari bawah, belasan tebasan Dismantle/Cleave, tulisan 伏魔御廚子 + DOMAIN EXPANSION, kilat merah.
  Mode aktif: pinggiran layar bercahaya merah, klik layar = tebasan silang.
- Adegan: ketuk layar / Esc untuk lanjut (setelah ~7 detik), atau otomatis menutup ~12 detik. Bunyi dibuat Web Audio (ikut mati kalau tapSound.on = false). Hormati prefers-reduced-motion.
- TIDAK disimpan: muat ulang halaman = terkunci lagi, harus ketuk ID card 15x dari awal.
- Atur di script.js (jjkEgg > CFG): songIndex (2 = lagu ke-3), taps (15), gap, tickFrom, sound, volume, congrats. Warna: blok PEMBARUAN 41 di style.css (--jj / --jj2).
- CONSOLE: jjk.unlock() | jjk.scene("gojo") | jjk.scene("sukuna") | jjk.off() | jjk.reset()

=== PEMBARUAN 40: URYU DI GAME ALIEN (QUINCY PEMANAH, SERANGAN JARAK JAUH) ===

File yang berubah: games.js (blok baru "URYU ISHIDA" sebelum modeKind + patch kecil di suara, panel, state, input, gambar pemain), style.css (blok PEMBARUAN 39 di paling bawah).
index.html TIDAK berubah. script.js: hanya 1 baris kecil (kursor ikut berganti warna saat Ichibe Shikai <-> Bankai).

- AKTIF: pilih Uryu di menu Bleach website -> buka game alien -> panel "URYU MODE" muncul di kanan (seperti Ichigo). Tekan 5 = ganti wujud: Quincy -> Letzt Stil -> nonaktif.
- BEDA DARI KARAKTER LAIN: Uryu tidak menebas. Klik / J / F = tembak panah reishi ke arah mouse. Damage naik sampai +90% makin JAUH sasaran dari tempat panah dilepas
  (maksimal di jarak ~900 px), jadi cocok bertahan di sisi layar & menembak dari jauh. Fisiknya rapuh: Quincy menerima 95% damage, Letzt Stil 80%.
- QUINCY (Heilig Bogen): tembak 1 panah (damage 3, menembus 1 musuh).
    3 Heilig Pfeil   - bidik 0,45 dtk lalu panah cahaya menembus SEMUA musuh di garis bidik (boss 12-19 damage), cd 5 dtk
    4 Hirenkyaku     - dash reishi 340 px (arah jalan, atau mundur dari arah bidik), kebal 0,7 dtk + tembak 2x lebih cepat 3 dtk, cd 7 dtk
    6 Ginrei Kojaku  - 16 panah pemburu mengejar musuh terdekat, cd 14 dtk
- LETZT STIL: sayap kristal + salib Quincy; tembak 3 panah sekaligus (tiap panah menembus 2 musuh), lebih kebal, lebih cepat & lompat lebih tinggi.
    3 Sprenger       - panah menancap di titik mouse, 0,9 dtk kemudian meledak (radius 190 px, boss 16 damage), cd 9 dtk
    4 Licht Regen    - hujan 30 panah cahaya selama 2,2 dtk di sekitar titik mouse, cd 15 dtk
    6 Letzt Pfeil    - bidik 1,1 dtk lalu tombak cahaya raksasa menembus segalanya (boss 26-41 damage), cd 22 dtk
- Atur angka (damage, cd, radius, jumlah panah) di blok "URYU ISHIDA" di games.js: UCD (cooldown), useXxx() (skill), uShoot() (serangan dasar), uDistBonus (bonus jarak).
- Suara: semua Web Audio buatan kode (petikan busur, desir panah, ledakan, lonceng kristal), suara Jepang browser untuk nama skill.
- CATATAN GABUNGAN: tombol cuaca di tema Ichibe diperbaiki (sebelumnya gradasi biru-merah sisa salinan Uryu; sekarang vermilion / emas). Aturan .al-uryu-tools yang tersalin ke blok Ichibe
  (berwarna merah) ditimpa kembali oleh blok Pembaruan 40 supaya panel Uryu di game tetap biru/putih. Dua judul blok "PEMBARUAN 38" yang salah label di tengah/akhir blok Ichibe
  diganti jadi "PEMBARUAN 39 (lanjutan)" (hanya komentar, isi tidak berubah). Ichibe belum punya karakter di game alien.

=== PEMBARUAN 39: ICHIBE HYOSUBE (ZERO DIVISION) - SHIKAI & BANKAI, TANPA TULISAN, TEMA "LUKISAN" ===

File yang berubah: script.js (patch kecil di modul bleachSecret + modul baru ichibeInk di paling bawah), style.css (blok PEMBARUAN 39 di paling bawah). index.html, games.js TIDAK berubah.
Opsional: images/ichibe.png, images/ichibe-bankai.png (foto adegan), music/ichibe-shikai.mp3, music/ichibe-bankai.mp3. Kalau tidak ada: foto diganti segel hanko, suara hanya bunyi kuas + taiko buatan kode.

- MENU: Ichibe muncul di tab SHINIGAMI (karakter ke-5). Tombol tema kiri bawah menggeser pil Shikai <-> Bankai.
- SHIKAI: tinta sumi hitam + merah vermilion + putih washi. Latar kanvas: sapuan kuas menggambar diri, cipratan tinta, lingkaran enso, segel hanko dicap.
- BANKAI: lakuer hitam-indigo + emas. Latar sama + hujan aksara emas bercahaya jatuh pelan.
- ADEGAN (tanpa teks): lingkaran enso & sapuan kuas digambar, di puncak segel hanko dicap + dentum taiko (Bankai ditambah denting emas), cipratan tinta di layar.
- KLIK LAYAR: cipratan tinta + sapuan kuas + desir kuas. Bunyi ikut mati kalau tapSound.on = false. Hormati prefers-reduced-motion.
- Warna: blok PEMBARUAN 39 di style.css (Shikai = salinan dasar, Bankai = salinan berawalan [data-ibankai="on"]). Bentuk lukisan: fungsi stroke/enso/splash/hanko di ichibeInk (script.js).
- Console: ichibeInk.splash() | ichibeInk.enso() | ichibeInk.off() | ichibeInk.on()

=== PEMBARUAN 38: URYU - PANAH MELINTAS DI WEB, TOMBOL MODE BERGERAK, RUNE & GERHANA, FOTO ===

File yang berubah: script.js (patch kecil di quincyStageFx + modul baru uryuProjectiles di paling bawah), style.css (blok PEMBARUAN 38 di paling bawah).
Baru: images/uryu.png (mode Biasa, rune reishi) dan images/uryu-letzt.png (Letzt Stil, sayap kristal + gerhana). index.html, games.js TIDAK berubah.

- TOMBOL MODE: di mode Uryu, tombol tema kiri bawah sekarang menggeser pil Biasa <-> Letzt Stil (sebelumnya tidak bergerak karena aturan geser untuk Uryu belum ada)
  dan pilnya berubah jadi putih-cyan di Letzt Stil.
- PANAH MELINTAS: di mode Uryu (Biasa & Letzt Stil) panah reishi (Heilig Pfeil) melesat melewati layar DI ATAS konten (tidak bisa diklik, tidak menghalangi),
  lengkap dengan ekor bercahaya, sirip reishi dan percikan bintang. Biasa: tiap 2-4 detik, kadang 2-4 panah sekaligus. Letzt Stil: lebih sering, lebih besar, rentetan 3-6 panah.
  Ganti mode = rentetan panah. Pengaturan: uryuArrows.CFG (gapBiasa, gapLetzt, volleyChance, speed, runes). Console: uryuArrows.fire() | volley(5) | off() | on().
  Panah latar lama (di belakang konten) tetap ada, jadi ada efek kedalaman.
- LATAR: aksara Quincy bercahaya (gaya rune di gambar kedua) melayang pelan di belakang konten. Letzt Stil: GERHANA (matahari hitam + korona) di tengah salib Quincy + serpihan kristal sayap melayang naik.
- ADEGAN (saat memilih Uryu / Letzt Stil): rune melayang di panggung; Letzt Stil menambah gerhana di atas foto.
- FOTO: gambar yang kamu kirim dipasang sebagai foto adegan (rasio 9:16 dipotong otomatis; atur di style.css: .bs-art object-position).
  Kalau mau diganti: timpa images/uryu.png / images/uryu-letzt.png (atau .gif/.webp/.jpg).
- Hormati "kurangi gerakan" (prefers-reduced-motion): panah, rune & gerhana tidak dijalankan.

=== PEMBARUAN 37: KURSOR CUSTOM, TOMBOL CUACA MUNGIL BERTEMA, SCROLLBAR SENJA ===

File yang berubah: script.js (modul baru siteCursor di paling bawah), style.css (blok PEMBARUAN 37 di paling bawah). index.html, games.js TIDAK berubah.

- KURSOR: hanya untuk mouse asli (HP/tablet tetap normal). Kepala kursor + cincin yang mengekor + jejak percikan. Klik = ledakan percikan + cincin.
  Bentuk & warna ikut tema: biasa/Shinji = kilau bintang, Aizen = kupu-kupu (sayap mengepak), Zaraki = tebasan silang, Ichigo = bulan sabit (warna ikut Biasa/Bankai/Hollow/Chain/White),
  Uryu = salib Quincy (biru / putih saat Letzt Stil). Warna: biru (gelap/terang), jingga (Senja), abu-abu (Monokrom).
  Di atas tombol/tautan kursor membesar & berputar, di atas kolom ketik kembali jadi kursor teks bawaan, di atas game (kanvas) jadi bidikan.
  Warna: variabel --sc-c / --sc-c2 di blok PEMBARUAN 37 (style.css). Bentuk: objek SHAPES di script.js (siteCursor).
  Console: siteCursor.off() matikan | siteCursor.on() nyalakan | siteCursor.CFG (trail, trailGap, ringLag, maxParticles).
  Hormati "kurangi gerakan" (prefers-reduced-motion): tanpa jejak & tanpa ekor.
- TOMBOL CUACA: sekarang bulat kecil 40px (ikon saja). Teks status ("Cerah", "Hujan", ...) muncul sebagai balon saat disorot, titik kecil di pojok menandai cuaca aktif.
  Warna tombol & panel menu mengikuti tema (variabel --wt-* di style.css): biru gelap/terang, jingga Senja, abu Monokrom,
  dan semua karakter Bleach lewat variabel --ic-* (Uryu dan White Ichigo punya warna sendiri). script.js (modul weatherMode) TIDAK diubah.
- SCROLLBAR SENJA: gradasi matahari terbenam jingga > merah muda > ungu dengan jalur peach (variabel --sb-* untuk html[data-variant="dusk"] di akhir style.css).

=== PEMBARUAN 36: GOLONGAN QUINCY - URYU ISHIDA (MODE BIASA + LETZT STIL) ===

File yang berubah: script.js (modul bleachSecret + modul baru quincyBackdrop & quincyClicks di bawah), style.css (blok PEMBARUAN 36 di paling bawah).
index.html, games.js TIDAK berubah (menu golongan dibuat lewat script.js, jadi tidak perlu mengedit index.html).

- MENU BLEACH: sekarang ada 2 tab golongan di atas daftar karakter: SHINIGAMI (Shinji, Aizen, Zaraki, Ichigo - seperti sebelumnya) dan QUINCY (Uryu Ishida).
  Saat sebuah karakter aktif, menu otomatis membuka tab golongannya.
- URYU - MODE BIASA: tema biru malam + putih. Adegan: salib Quincy berputar, hujan panah reishi (Heilig Bogen), titik cahaya naik, reiatsu biru, ledakan cahaya.
  Latar: salib Quincy besar berputar pelan, reishi naik, panah cahaya melintas. Klik layar = panah + percikan reishi + cincin.
- URYU - LETZT STIL (tombol tema di kiri bawah: Biasa / Letzt Stil): tema putih-biru bercahaya. Adegan: sama + SAYAP reishi terbuka (bulu satu per satu) saat puncak.
  Latar: berkas cahaya turun, bulu sayap berjatuhan, salib ganda. Klik layar = salib Quincy + bulu cahaya + 3 panah.
- BUNYI: semua dibuat Web Audio (ikut mati kalau tapSound.on = false): petikan tali busur + desir panah, dengung naik, dentum + kilau; Letzt Stil memakai paduan nada lembut seperti paduan suara.
  Ketuk layar di mode Uryu juga punya bunyi sendiri (petik busur / denting kristal).
- FOTO & SUARA (opsional): images/uryu.png (atau .gif/.webp/.jpg, rasio 3:4) dan images/uryu-letzt.png; music/uryu-quincy.mp3 dan music/uryu-letzt.mp3.
  Kalau file tidak ada: foto diganti tulisan kanji 石田 雨竜, suara dibacakan suara Jepang bawaan browser. ID card juga bisa pakai gambar sendiri:
  images/idcard-front-uryu.png, idcard-front-uryu-letzt.png (dan idcard-back-...).
- CATATAN TAMPILAN: tema dasar Uryu diturunkan dari struktur tema Zaraki lalu diwarnai ulang (biru/putih), jadi semua bagian situs ikut bertema. Warna bisa diubah di blok PEMBARUAN 36 (style.css).
- Keluar dari mode: pilih ulang Uryu di menu, atau pilih karakter Shinigami lain. resetBleach() di Console juga mereset Uryu.

=== PEMBARUAN 35: SUARA LOADING SCREEN ===

File yang berubah: script.js (modul loadingScreen), style.css (blok PEMBARUAN 35 di paling bawah). index.html, games.js TIDAK berubah.

- BUNYI (semua Web Audio, tanpa file mp3): desir tinta saat monogram digambar -> dengung pad hangat yang naik nadanya & makin terang mengikuti persen
  -> "ting" kristal tiap 10% (nada naik tangga B-mayor) -> akhir: arpeggio lonceng + dentum + desir tirai terbelah + kilau.
- AUTOPLAY: browser memblokir suara sebelum ada interaksi. Suara dicoba nyala OTOMATIS (tanpa petunjuk ketuk). Kalau browser memblokir,
  suara baru mulai saat pengunjung pertama kali mengetuk/menekan tombol.
- Ikut mati kalau tapSound.on = false. Pengaturan: konstanta ROOT0/ROOT1 (nada dengung), STEPS (nada ting) dan angka volume di dalam SND (script.js, loadingScreen).

=== PEMBARUAN 34: EASTER EGG PRAMUKA - MODE SENJA + ID CARD 15x, LAGU BARU, TUNAS KELAPA, SALAM PRAMUKA ===

File yang berubah: script.js (pemutar musik + modul baru pramukaEgg di paling bawah), style.css (blok PEMBARUAN 34 di paling bawah). index.html, games.js TIDAK berubah.

- ALUR: (1) masuk mode SENJA (tahan tombol terang/gelap > Senja) -> (2) ketuk ID card 15x berturut-turut (jeda antar ketukan maks. 3 detik;
  mulai ketukan ke-6 terdengar "tek" kecil yang makin tinggi) -> (3) muncul ucapan selamat + lagu baru "Hymne Pramuka" di daftar musik (tahan tombol musik)
  -> (4) tekan lagu itu -> TUNAS KELAPA muncul di paling bawah bagian Kontak -> (5) ketuk tunas kelapa -> adegan SALAM PRAMUKA.
- ADEGAN: gulungan drum, rumbai bendera merah-putih, lambang tunas kelapa tumbuh, terompet + dentum + konfeti daun, tulisan SALAM PRAMUKA!, tangan tiga jari
  terangkat + peluit + sorakan "whooow". Ketuk layar / Esc untuk lanjut,
  atau otomatis menutup sekitar 12 detik. Semua bunyi dibuat Web Audio (ikut mati kalau tapSound.on = false).
- ADEGAN BERGANTIAN: tunas kelapa ditekan ke-1 = SALAM PRAMUKA, ke-2 = PERSIAPAN DUDUK, ke-3 = SALAM PRAMUKA lagi, dst (urutan kembali ke awal kalau halaman dimuat ulang).
- PERSIAPAN DUDUK: malam di perkemahan (bulan, bintang berkedip, tenda menyala, api unggun menyala + percikan). 15 pramuka berbaris masuk -> "PERSIAPAN DUDUK" + peluit
  -> "HUUUU..." (huruf U bergelombang, lutut semua pramuka menekuk pelan, paduan suara "huuu" naik) -> "DUDUK!" (bruk, semua duduk bersila + debu)
  -> "HAAA!" (kilat, tangan terangkat, konfeti, sorakan). Ketuk layar / Esc untuk lanjut; otomatis menutup sekitar 13 detik.
- MP3 ADEGAN 2: music/persiapan-duduk.mp3 (CFG.sfx2Src, sfx2Delay). Kalau tidak ada, pakai bunyi buatan kode (langkah, peluit, paduan suara "huuu" dan "haaa").
- CONSOLE: pramuka.scene() adegan berikutnya | pramuka.scene(1) Salam Pramuka | pramuka.scene(2) Persiapan Duduk.
- SUARA MP3 SAAT TUNAS DITEKAN: taruh file di  music/salam-pramuka.mp3  (atau ubah pramuka.CFG.sfxSrc). Diputar saat adegan mulai, lagu latar mengecil sementara,
  dan mp3 dipotong halus kalau adegan ditutup / lewat ~12 detik. Kalau file tidak ada, otomatis pakai bunyi buatan kode (drum + terompet + peluit).
  CFG: sfxVolume (0-1), sfxDelay (detik, tunda supaya pas dengan dentum di detik ke-3), sfxReplace (true = mp3 menggantikan bunyi buatan, false = bareng).
- LAGU: taruh file di  music/lagu-11.mp3  (atau ubah pramuka.CFG.songSrc / songTitle di script.js). Kalau file tidak ada, lagu tampil redup di daftar seperti lagu lain.
- TIDAK disimpan: muat ulang halaman = lagu hilang lagi dan harus ketuk ID card 15x dari awal. Tunas muncul begitu lagunya ditekan (walau file mp3 belum ada) dan tetap sampai halaman dimuat ulang.
- KELUAR DARI SENJA (pindah ke Terang/Gelap/Monokrom atau masuk mode Bleach): lagu "Hymne Pramuka" hilang dari daftar (kalau sedang diputar langsung berhenti), tunas kelapa hilang,
  hitungan ketukan direset; harus masuk Senja dan ketuk ID card 15x lagi. Dibuka lewat Console (pramuka.unlock()) tidak ikut dikunci sampai pramuka.reset().
- SCROLLBAR: abu-abu/hitam-putih saat mode Monokrom aktif (variabel --sb-* di akhir style.css).
- script.js: siteMusic punya fungsi baru addSong({title, src}) untuk menambah lagu ke daftar saat halaman berjalan.
- CONSOLE: pramuka.unlock() buka lagu langsung | pramuka.force(true) paksa tunas kelapa muncul | force(false) sembunyikan | force(null) otomatis
  | pramuka.scene() putar adegan | pramuka.reset() kunci lagi (muat ulang halaman supaya lagunya hilang dari daftar).
  CFG: taps (15), gap (3000), tickFrom (6), needDusk (true), songTitle, songSrc, hint, sound, volume.

=== PEMBARUAN 33: WHITE ICHIGO - SOUND EFEK, UCAPAN SELAMAT, FOTO DI ANIMASI, TALI ID CARD KUNING ===

File yang berubah: script.js, style.css (blok PEMBARUAN 32 di paling bawah).
- SOUND: saat topeng dipencet langsung terdengar klik + desing pedang; di akhir adegan ditambah fanfare arpeggio emas + dentum + kilau
  (semua Web Audio, ikut mati kalau tapSound.on = false).
- UCAPAN: setelah kilat putih, layar kuning-putih menampilkan FOTO + "Selamat! Kamu menemukan easter egg White Ichigo". Ketuk layar / Esc untuk lanjut,
  atau otomatis menutup sekitar 7 detik. Teks: shiroIchigo.CFG.congrats.
- FOTO: taruh file di  images/white-ichigo.jpg  (rasio 3:4 paling pas) atau ubah CFG.photo di script.js. Kalau file tidak ada, tampil kanji 白.
- TALI ID CARD: kuning (emas) selama tema White Ichigo aktif.

=== PEMBARUAN 32: WHITE ICHIGO - PEMICU BARU (HOLLOW + LAGU KE-10), TEMA KUNING-PUTIH, TOPENG DIGAMBAR ULANG ===

File yang berubah: script.js (modul shiroIchigo), style.css (blok PEMBARUAN 31). index.html, games.js TIDAK berubah.

- PEMICU: gerbang topeng kini muncul saat mode Ichigo > HOLLOW aktif DAN lagu ke-10 "Your New Home" (index 9) sedang diputar.
  Dicek tiap 0,5 dtk lewat siteMusic.isSong(9). Ganti lagu / keluar Hollow = gerbang hilang lagi (kecuali White sedang menyala).
  Hitungan "main game 10x" dan localStorage shiroPlays/shiroUnlocked dihapus. Bisikan "Ada yang bergerak di dasar Kontak..." muncul
  sekali saat gerbang baru terbuka.
- TEMA: merah -> kuning emas (#e6a800 / #ffd23a) + putih tulang; tinta hitam tetap untuk teks. Tebasan & percikan latar jadi emas.
- TOPENG: digambar ulang (wajah oval meruncing, dua tanduk melengkung, garis tengah kuning, garis pipi, mata miring dengan iris emas,
  hidung, mulut bergigi, retakan). Kelas baru .m-stripe di CSS.
- CONSOLE: shiroIchigo.force(true) paksa gerbang muncul | force(false) sembunyikan | force(null) kembali otomatis | reset()
  enter() / leave() tetap. CFG: songIndex (default 9), poll, hint, sound, volume.

