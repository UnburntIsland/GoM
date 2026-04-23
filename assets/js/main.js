
const SITE_PAGES = [
  { href: 'index.html', key: 'home', label: '首頁' },
  { href: 'about.html', key: 'about', label: '品牌理念' },
  { href: 'gameplay.html', key: 'gameplay', label: '玩法設計' },
  { href: 'progress.html', key: 'progress', label: '開發進度' },
  { href: 'team.html', key: 'team', label: '團隊介紹' },
  { href: 'contact.html', key: 'contact', label: '聯絡合作' }
];

function renderSiteChrome() {
  const headerRoot = document.getElementById('site-header');
  const footerRoot = document.getElementById('site-footer');
  const current = document.body.dataset.page;

  if (headerRoot) {
    const navHtml = SITE_PAGES.map(page => `
      <a href="${page.href}" class="${page.key === current ? 'is-active' : ''}">${page.label}</a>
    `).join('');

    headerRoot.innerHTML = `
      <a href="#main" class="skip-link">跳到主要內容</a>
      <header class="site-header" id="header">
        <div class="container header-inner">
          <a href="index.html" class="brand" aria-label="未燼島嶼首頁">
            <div class="brand-mark">山</div>
            <div class="brand-text">
              <strong>未燼島嶼 Unburnt Island</strong>
              <span>《負重榮耀：山田小米》官方網站</span>
            </div>
          </a>
          <div class="nav-wrap">
            <nav class="site-nav" aria-label="主選單">${navHtml}</nav>
            <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileNav" aria-label="開啟選單">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div class="mobile-nav" id="mobileNav">
        <nav aria-label="行動版主選單">${navHtml}</nav>
      </div>
    `;
  }

  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="brand" style="margin-bottom: 12px;">
              <div class="brand-mark">島</div>
              <div class="brand-text">
                <strong>未燼島嶼 Unburnt Island</strong>
                <span>把文化制度轉化成可被遊玩的遊戲引擎</span>
              </div>
            </div>
            <p>本網站版本採多頁式架構，適合後續擴充新聞、媒體素材、募資頁、Steam 導流頁與團隊履歷頁。</p>
          </div>
          <div>
            <div class="footer-links">
              ${SITE_PAGES.map(page => `<a href="${page.href}">${page.label}</a>`).join('')}
            </div>
            <p style="margin-top: 14px;">建議下一步補上遊戲截圖、Steam 連結、Discord、募資按鈕與實際聯絡信箱。</p>
          </div>
        </div>
      </footer>
    `;
  }
}

function setupMenu() {
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealEls.forEach(el => observer.observe(el));
}

function setupCurrentYear() {
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderSiteChrome();
  setupMenu();
  setupHeaderScroll();
  setupReveal();
  setupCurrentYear();
});
