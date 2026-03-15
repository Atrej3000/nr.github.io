/* ═══════════════════════════════════════════════════════════════
 *  БО «Наші Рідненькі» — Application Logic
 *  Dependencies: Alpine.js 3.x (loaded via CDN in index.html)
 * ═══════════════════════════════════════════════════════════════ */

/* ── SVG Icon Registry ──
 *  Centralised icon definitions. Referenced by key in data objects.
 *  Keeps HTML markup DRY and makes icon swaps trivial.
 */
const ICONS = {

  /* Activity card icons (primary colour) */
  heart:     '<svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  people:    '<svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  home:      '<svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
  shield:    '<svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',

  /* Counter icons (accent colour) */
  heartA:    '<svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
  peopleA:   '<svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  clockA:    '<svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  coinA:     '<svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',

  /* Help tab icons */
  wallet:    '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/></svg>',
  handshake: '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
  box:       '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  building:  '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>',

  /* Needs icons (small, accent colour) */
  shirt:     '<svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>',
  apple:     '<svg class="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M17.28 6.2c-.14-2.1-1.74-3.64-3.56-3.64-.82 0-1.41.3-1.87.55-.37.2-.64.35-.99.35s-.57-.14-.91-.32c-.44-.23-1-.53-1.81-.53C6.06 2.61 4 4.83 4 7.85c0 3.87 3.08 8.55 5.54 8.55.61 0 1-.22 1.46-.47.37-.2.8-.43 1.5-.43.64 0 1.04.22 1.38.41.43.23.79.43 1.44.43 2.19 0 4.68-3.68 5.18-6.96-1.48-.4-2.22-1.56-2.22-3.18z"/></svg>',
  droplet:   '<svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3.5S6 10 6 14a6 6 0 1012 0c0-4-6-10.5-6-10.5z"/></svg>',
  book:      '<svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>',

  /* Contact icons */
  pin:       '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  phone:     '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
  mail:      '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
  clock:     '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',

  /* Social icons */
  facebook:  '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
};


/* ════════════════════════════════════════════════════════════════
 *  Scroll Reveal
 * ════════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function observeReveals() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    revealObserver.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', observeReveals);
document.addEventListener('alpine:initialized', () => setTimeout(observeReveals, 100));


/* ════════════════════════════════════════════════════════════════
 *  Smooth Scroll — delegated, single listener
 * ════════════════════════════════════════════════════════════════ */
document.addEventListener('click', (event) => {
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor) return;

  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});


/* ════════════════════════════════════════════════════════════════
 *  Animated Counter Component  (Alpine x-data)
 * ════════════════════════════════════════════════════════════════ */
function counters() {
  const DURATION = 2000;

  return {
    started: false,

    items: [
      { target: 500,     suffix: '+', display: '0', label: 'дітей отримали допомогу', icon: ICONS.heartA },
      { target: 120,     suffix: '+', display: '0', label: 'сімей під патронатом',    icon: ICONS.peopleA },
      { target: 6,       suffix: '',  display: '0', label: 'років допомагаємо',       icon: ICONS.clockA },
      { target: 1200000, suffix: '',  display: '0', label: 'грн зібрано',             icon: ICONS.coinA },
    ],

    init() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.animate();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(this.$el);
    },

    animate() {
      this.items.forEach((counter) => {
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const value = Math.floor(eased * counter.target);

          if (counter.target >= 1e6) {
            counter.display = (value / 1e6).toFixed(1).replace('.', ',') + '\u041C' + counter.suffix;
          } else if (counter.target >= 1e3) {
            counter.display = value.toLocaleString('uk-UA') + counter.suffix;
          } else {
            counter.display = value + counter.suffix;
          }

          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    },
  };
}


/* ════════════════════════════════════════════════════════════════
 *  Main Application Data  (Alpine x-data on <body>)
 * ════════════════════════════════════════════════════════════════ */
function app() {
  return {
    /* ── UI state ── */
    mobileMenu: false,
    activeTab: 'money',
    lightbox: { open: false, index: 0 },

    /* ── Navigation ── */
    nav: [
      { href: '#about',      label: 'Про нас' },
      { href: '#activities',  label: 'Діяльність' },
      { href: '#gallery',     label: 'Галерея' },
      { href: '#help',        label: 'Допомогти' },
      { href: '#contacts',    label: 'Контакти' },
    ],

    /* ── Social links ── */
    socials: [
      { href: 'https://www.facebook.com/profile.php?id=100069595750931', label: 'Facebook', icon: ICONS.facebook },
      { href: 'https://www.instagram.com/nashiridnenki',                 label: 'Instagram', icon: ICONS.instagram },
    ],

    /* ── Activities ── */
    activities: [
      {
        icon: ICONS.heart,
        title: 'Турбота про дітей-сиріт',
        desc: 'Забезпечуємо малечу всім необхідним і допомагаємо їм зростати у турботі та любові.',
        items: [
          'Забезпечення одягом, іграшками та навчальними матеріалами',
          'Організація освітніх та розвиваючих заходів',
          'Допомога з соціалізацією та адаптацією',
        ],
      },
      {
        icon: ICONS.people,
        title: 'Підтримка людей з інвалідністю',
        desc: 'Сприяємо створенню рівних можливостей та гідних умов для людей з особливими потребами.',
        items: [
          'Забезпечення медикаментами та засобами реабілітації',
          'Організація консультацій та терапевтичних програм',
          'Подолання соціальної ізоляції та стигматизації',
        ],
      },
      {
        icon: ICONS.home,
        title: 'Допомога бездомним',
        desc: 'Надаємо базові потреби тим, хто втратив дах над головою, і допомагаємо повернутися до суспільства.',
        items: [
          'Організація гарячого харчування та збір одягу',
          'Допомога з відновленням документів',
          'Сприяння працевлаштуванню та соціальній адаптації',
        ],
      },
      {
        icon: ICONS.shield,
        title: 'Соціальний патронат',
        desc: 'Адресна гуманітарна допомога сім\'ям, що опинилися у складних життєвих обставинах.',
        items: [
          'Індивідуальна оцінка потреб кожної родини',
          'Продуктові набори та предмети першої необхідності',
          'Юридична консультація та психологічна підтримка',
        ],
      },
    ],

    /* ── Gallery ── */
    gallery: [
      { src: 'images/88.jpg', alt: 'Візит до дітей',      caption: 'Візит до вихованців',              tall: true },
      { src: 'images/2.jpg',  alt: 'Гаряче харчування',   caption: 'Гаряче харчування для нужденних',  tall: false },
      { src: 'images/4.jpg',  alt: 'Волонтери',           caption: 'Волонтери допомагають на вулиці',   tall: false },
      { src: 'images/25.jpg', alt: 'Ми поруч',            caption: 'Ми поруч у найважчі хвилини',       tall: false },
      { src: 'images/47.jpg', alt: 'Подарунки дітям',     caption: 'Подарунки для найменших',           tall: true },
      { src: 'images/77.jpg', alt: 'Благодійна палатка',  caption: 'Наша палатка допомоги',             tall: false },
      { src: 'images/33.jpg', alt: 'Естафета добра',      caption: 'Естафета добра продовжується',      tall: false },
    ],

    /* ── Help tabs ── */
    helpTabs: [
      { id: 'money',     label: 'Фінансова',    icon: ICONS.wallet },
      { id: 'volunteer', label: 'Волонтерство',  icon: ICONS.handshake },
      { id: 'things',    label: 'Речова',        icon: ICONS.box },
      { id: 'partner',   label: 'Партнерство',   icon: ICONS.building },
    ],

    /* ── Material needs ── */
    needs: [
      { icon: ICONS.shirt,   title: 'Одяг',           desc: 'Чистий, у доброму стані' },
      { icon: ICONS.apple,   title: 'Продукти',       desc: 'Крупи, консерви, олія, цукор' },
      { icon: ICONS.droplet, title: 'Засоби гігієни', desc: 'Мило, шампунь, підгузки' },
      { icon: ICONS.book,    title: 'Канцтовари',     desc: 'Зошити, ручки, фарби' },
    ],

    /* ── Documents ── */
    docs: [
      { title: 'Статут організації',  sub: 'PDF \u00B7 Завантажити',  href: 'docs/statut.pdf' },
      { title: 'Фінансова звітність', sub: 'Скоро буде доступна',     href: null },
      { title: 'Публічна оферта',     sub: 'Скоро буде доступна',     href: null },
    ],

    /* ── Contact info ── */
    contacts: [
      { icon: ICONS.pin,   label: 'Адреса',   value: 'м. Київ, проспект Соборності, 17, оф. 2-1106', href: null },
      { icon: ICONS.phone, label: 'Телефон',   value: '+38 (063) 803-80-53',                          href: 'tel:+380638038053' },
      { icon: ICONS.mail,  label: 'Пошта',     value: 'Andrey4114@ukr.net',                           href: 'mailto:Andrey4114@ukr.net' },
      { icon: ICONS.clock, label: 'Графік',    value: 'Пн \u2014 Пт: 9:00 \u2014 18:00',             href: null },
    ],

    /* ── Lightbox methods ── */
    openLightbox(i) {
      this.lightbox = { open: true, index: i };
    },
    nextPhoto() {
      this.lightbox.index = (this.lightbox.index + 1) % this.gallery.length;
    },
    prevPhoto() {
      this.lightbox.index = (this.lightbox.index - 1 + this.gallery.length) % this.gallery.length;
    },
  };
}
