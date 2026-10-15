// Phần dùng chung cho các trang theo thiết kế mới

// Menu trên điện thoại
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// Chưa nối với dịch vụ gửi mail nên chưa lưu thông tin đăng ký
document.querySelectorAll('.subscribe form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.querySelector('button').textContent = 'Sắp ra mắt!';
  });
});

// Hiện dần khi cuộn tới
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
function observeReveal(root = document) {
  root.querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
}
observeReveal();

// ---------- Bài viết ----------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// "2 ngày trước" nếu trong vòng 30 ngày, còn lại hiện ngày dd/mm/yyyy
function timeAgo(iso) {
  const date = new Date(iso + 'T00:00:00');
  const days = Math.floor((Date.now() - date) / 86400000);
  if (days < 1) return 'Hôm nay';
  if (days < 30) return `${days} ngày trước`;
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function thumbHtml(post, className) {
  const img = post.image ? `<img src="${escapeHtml(post.image)}" alt="" loading="lazy">` : '';
  return `<div class="${className} ph">${img}</div>`;
}

function postItemHtml(post) {
  return `
    <a class="post reveal" href="${escapeHtml(post.url)}">
      ${thumbHtml(post, 'thumb')}
      <div>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <time datetime="${post.date}">${timeAgo(post.date)}</time>
      </div>
    </a>`;
}

function latestPosts() {
  return [...window.POSTS].sort((a, b) => b.date.localeCompare(a.date));
}
