(() => {
  let language = 'en';
  const langButton = document.querySelector('#language');
  function applyLanguage(lang) {
    language = lang === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[language]; });
    langButton.innerHTML = language === 'en' ? '<span class="lang-active">EN</span><span class="lang-divider">/</span><span>中</span>' : '<span>EN</span><span class="lang-divider">/</span><span class="lang-active">中</span>';
    langButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : 'Switch to English');
    document.querySelector('#copy-status').textContent = '';
    try { localStorage.setItem('cy-language', language); } catch (_) {}
  }
  let stored; try { stored = localStorage.getItem('cy-language'); } catch (_) {}
  applyLanguage(stored === 'zh' ? 'zh' : 'en');
  langButton.addEventListener('click', () => applyLanguage(language === 'en' ? 'zh' : 'en'));
  const menu = document.querySelector('#menu-toggle');
  const nav = document.querySelector('#nav');
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', language === 'en' ? 'Open navigation' : '打开导航'); };
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? (language === 'en' ? 'Close navigation' : '关闭导航') : (language === 'en' ? 'Open navigation' : '打开导航')); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(el => { const selected = button === el; el.classList.toggle('active', selected); el.setAttribute('aria-pressed', String(selected)); });
    document.querySelectorAll('.project').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; });
  }));
  const dialog = document.querySelector('#preview-dialog');
  document.querySelector('#open-preview').addEventListener('click', () => dialog.showModal());
  document.querySelector('#close-preview').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });
  document.querySelector('#copy-email').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try { await navigator.clipboard.writeText('yiyang_cao@126.com'); status.textContent = language === 'en' ? 'Copied!' : '已复制！'; }
    catch (_) { status.textContent = language === 'en' ? 'Please select and copy the address above.' : '请选中上方邮箱地址复制。'; }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (!entry.isIntersecting) return; nav.querySelectorAll('a').forEach(a => { if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }); }, {rootMargin: '-15% 0px -65% 0px'});
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
  }
})();
