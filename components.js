// Các thành phần giao diện dùng chung cho mọi trang.
// Sửa menu, mạng xã hội, form đăng ký, footer, thẻ bài viết... ở đây thì cả web đổi theo.
//
// Dùng trong trang (file này nạp trong <head>, trước nội dung):
//   <site-header></site-header>        menu trên cùng
//   <site-subscribe></site-subscribe>  khối "Để không bỏ lỡ thông tin mới nhất từ mình!"
//   <site-footer></site-footer>        footer
//   <social-links></social-links>      các nút Facebook / YouTube / TikTok
//   <share-buttons></share-buttons>    khối "Chia sẻ bài viết"
// và các hàm tạo HTML cho thẻ bài viết: postItemHtml, gridCardHtml, thumbHtml.

const SITE = {
  name: 'Van Anh Dao',
  substack: 'https://vanhda0.substack.com',
  nav: [
    { href: '/mini-course', label: 'Mini-course' },
    { href: '/hoc-cung-minh', label: 'Học cùng mình' },
    { href: '/minh-lam', label: 'Mình làm' },
    { href: '/minh-choi', label: 'Mình chơi' },
    { href: '/gioi-thieu', label: 'Mình là ai?' },
  ],
  socials: [
    { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/va.storii/' },
    { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@vanh.da0' },
    { label: 'TikTok', icon: 'tiktok', href: 'https://www.tiktok.com/@vanh.da0' },
  ],
};

// Thư mục gốc của web, để ảnh hiện đúng ở cả trang con (/bai-viet/..., /mini-course/...)
// lẫn khi mở file .html trực tiếp trên máy
const ROOT = new URL('.', document.currentScript.src).href;

const ICONS = {
  facebook: '<path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z"/>',
  youtube: '<path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"/>',
  tiktok: '<path fill="currentColor" d="M16.6 3h-3.3v12.2a2.8 2.8 0 1 1-2-2.7V9.1a6.2 6.2 0 1 0 5.3 6.1V9a7.8 7.8 0 0 0 4.4 1.4V7.1A4.4 4.4 0 0 1 16.6 3z"/>',
  x: '<path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5z"/>',
  linkedin: '<path fill="currentColor" d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.3 9h3.4v11H3.3V9zm5.6 0h3.3v1.5c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.3 4.2 5.4V20h-3.4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20H8.9V9z"/>',
  menu: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>',
  search: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.5-4.5"/></g>',
};

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
}

function logoHtml() {
  return `<a class="logo" href="/"><img src="${ROOT}images/logo.jpg" alt="" width="44" height="44">${SITE.name}</a>`;
}

function socialLinksHtml() {
  return `<div class="socials">${SITE.socials.map((s) =>
    `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon, 22)}</a>`).join('')}</div>`;
}

// ---------- Thành phần trang ----------

customElements.define('site-header', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <div class="container wide">
          ${logoHtml()}
          <button class="icon-btn menu-btn" aria-label="Mở menu" aria-expanded="false" aria-controls="nav">${icon('menu', 26)}</button>
          <nav class="nav" id="nav">
            ${SITE.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
            <button class="icon-btn" aria-label="Tìm kiếm">${icon('search', 24)}</button>
          </nav>
        </div>
      </header>`;
    // Menu trên điện thoại
    const btn = this.querySelector('.menu-btn');
    const nav = this.querySelector('.nav');
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    };
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }
});

customElements.define('social-links', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = socialLinksHtml();
  }
});

customElements.define('site-subscribe', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="subscribe">
        <div class="container wide">
          <div>
            <h2>Để không bỏ lỡ thông tin mới nhất từ mình!</h2>
            <p>Khi nào có bài viết hoặc video mới (siêu hay), mình sẽ gửi đến bạn trước tiên</p>
          </div>
          <form>
            <input type="text" name="name" placeholder="Tên của bạn" aria-label="Tên của bạn" required>
            <input type="email" name="email" placeholder="Email" aria-label="Email" required>
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </section>`;
    // Đăng ký nhận tin qua Substack: mở trang đăng ký đã điền sẵn email
    const form = this.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      window.open(`${SITE.substack}/subscribe?email=${encodeURIComponent(email)}`, '_blank', 'noopener');
    });
  }
});

customElements.define('site-footer', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        ${logoHtml()}
        ${socialLinksHtml()}
        <small>Copyright © 2025 ${SITE.name}</small>
      </footer>`;
  }
});

// Link chia sẻ trỏ tới trang đang xem; data-title="..." là nội dung kèm theo khi chia sẻ lên X
customElements.define('share-buttons', class extends HTMLElement {
  connectedCallback() {
    this.render(this.dataset.title || document.title);
  }

  render(title) {
    const url = encodeURIComponent(location.origin + location.pathname);
    const text = encodeURIComponent(title);
    const links = [
      ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${url}`],
      ['x', 'X', `https://twitter.com/intent/tweet?url=${url}&text=${text}`],
      ['linkedin', 'LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
    ];
    this.innerHTML = `
      <aside class="share reveal">
        <h2>Chia sẻ bài viết</h2>
        <div class="socials">${links.map(([name, label, href]) =>
          `<a href="${href}" target="_blank" rel="noopener" aria-label="Chia sẻ lên ${label}">${icon(name, 20)}</a>`).join('')}</div>
      </aside>`;
  }
});

// ---------- Thẻ bài viết ----------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// "2 ngày trước" nếu trong vòng 30 ngày, còn lại hiện ngày dd/mm/yyyy
function timeAgo(iso) {
  const date = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso);
  const days = Math.floor((Date.now() - date) / 86400000);
  if (days < 1) return 'Hôm nay';
  if (days < 30) return `${days} ngày trước`;
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function timeHtml(iso) {
  return iso ? `<time datetime="${iso}">${timeAgo(iso)}</time>` : '';
}

// Ảnh từ Substack: lấy bản thu nhỏ qua CDN của Substack cho nhẹ
function imageUrl(src, width) {
  if (!src.startsWith('https://substack-post-media.s3.amazonaws.com/')) return src;
  return `https://substackcdn.com/image/fetch/w_${width},c_limit,f_auto,q_auto:good/${encodeURIComponent(src)}`;
}

// Khung ảnh bìa; bài chưa có ảnh thì hiện nền xám
function thumbHtml(post, className, width = 600) {
  const img = post.image ? `<img src="${escapeHtml(imageUrl(post.image, width))}" alt="" loading="lazy">` : '';
  return `<div class="${className} ph">${img}</div>`;
}

// Thẻ ngang: ảnh bên trái, tiêu đề + mô tả + ngày bên phải (trang chủ, Học cùng mình, bài học trong khóa).
// label: dòng nhỏ phía trên tiêu đề, ví dụ "Bài 1"
function postItemHtml(post, { label, title = post.title, showDate = true } = {}) {
  return `
    <a class="post reveal" href="${escapeHtml(post.url)}">
      ${thumbHtml(post, 'thumb')}
      <div>
        ${label ? `<span class="post-label">${escapeHtml(label)}</span>` : ''}
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        ${showDate ? timeHtml(post.date) : ''}
      </div>
    </a>`;
}

// Thẻ dọc trong lưới 3 cột: ảnh trên, tiêu đề + mô tả bên dưới (Mình làm, Mini-course).
// meta: dòng nhỏ màu xanh cuối thẻ, ví dụ "5 bài học"
function gridCardHtml({ url, image, title, excerpt, date, meta }) {
  return `
    <a class="grid-card reveal" href="${escapeHtml(url)}">
      ${thumbHtml({ image }, 'thumb')}
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(excerpt)}</p>
      ${meta ? `<span class="meta">${escapeHtml(meta)}</span>` : timeHtml(date)}
    </a>`;
}
