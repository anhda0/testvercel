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

// Đăng ký nhận tin qua Substack: mở trang đăng ký đã điền sẵn email
const SUBSTACK = 'https://vanhda0.substack.com';
document.querySelectorAll('.subscribe form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    window.open(`${SUBSTACK}/subscribe?email=${encodeURIComponent(email)}`, '_blank', 'noopener');
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
  const date = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso);
  const days = Math.floor((Date.now() - date) / 86400000);
  if (days < 1) return 'Hôm nay';
  if (days < 30) return `${days} ngày trước`;
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Ảnh từ Substack: lấy bản thu nhỏ qua CDN của Substack cho nhẹ
function imageUrl(src, width) {
  if (!src.startsWith('https://substack-post-media.s3.amazonaws.com/')) return src;
  return `https://substackcdn.com/image/fetch/w_${width},c_limit,f_auto,q_auto:good/${encodeURIComponent(src)}`;
}

function thumbHtml(post, className, width = 600) {
  const img = post.image ? `<img src="${escapeHtml(imageUrl(post.image, width))}" alt="" loading="lazy">` : '';
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

// Bài mới nhất từ Substack qua /api/posts; không gọi được thì dùng bản sao trong posts.js
async function loadPosts() {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch {
    return window.POSTS || [];
  }
}

function latestPosts(posts) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

// ---------- Khóa học ----------
// Bài học của một khóa: các bài có tiêu đề "[<series> #<số>] - <tên bài>", xếp theo số
function courseLessons(course, posts) {
  const prefix = `[${course.series} #`;
  return posts
    .filter((p) => p.title.startsWith(prefix))
    .map((p) => {
      const m = p.title.slice(prefix.length).match(/^(\d+)\]\s*-?\s*(.*)$/);
      return m ? { ...p, number: +m[1], lessonTitle: m[2] || p.title } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);
}
