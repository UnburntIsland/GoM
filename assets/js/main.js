
const SITE_PAGES = [
  { href: 'index.html', key: 'home', label: '首頁' },
  { href: 'about.html', key: 'about', label: '計畫理念' },
  { href: 'gameplay.html', key: 'gameplay', label: '玩法與科普' },
  { href: 'progress.html', key: 'progress', label: '執行規劃' },
  { href: 'team.html', key: 'team', label: '團隊架構' },
  { href: 'contact.html', key: 'contact', label: '合作聯絡' }
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
          <a href="index.html" class="brand" aria-label="森循島首頁">
            <div class="brand-mark">森</div>
            <div class="brand-text">
              <strong>暫名《森循島》</strong>
              <span>永續 × 科普 × 養成經營教育遊戲</span>
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
              <div class="brand-mark">永</div>
              <div class="brand-text">
                <strong>暫名《森循島》</strong>
                <span>讓玩家在遊戲裡學會與自然共生</span>
              </div>
            </div>
            <p>本網站依據永續行動方案方向重新整理，主軸聚焦在永續教育、科普知識與可公開分享的行動成果。正式計畫名稱、團隊成員與合作窗口可於報名前再統一替換。</p>
          </div>
          <div>
            <div class="footer-links">
              ${SITE_PAGES.map(page => `<a href="${page.href}">${page.label}</a>`).join('')}
            </div>
            <p style="margin-top: 14px;">建議下一步可補上：實際試玩影片、工作坊照片、前後測成果、正式團隊資訊與報名表連結。</p>
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

document.addEventListener('DOMContentLoaded', () => {
  renderSiteChrome();
  setupMenu();
  setupHeaderScroll();
  setupReveal();
});
