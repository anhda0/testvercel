// Dữ liệu và hiệu ứng dùng chung (phần giao diện nằm ở components.js)

// Hiện dần khi cuộn tới: khi mép trên của khối vào tới 90% chiều cao màn hình.
// Không dùng tỉ lệ diện tích, vì khối dài (như nội dung bài viết) sẽ không bao giờ đủ tỉ lệ trên điện thoại.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
function observeReveal(root = document) {
  root.querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
}
observeReveal();

// ---------- Bài viết ----------
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
// Bài học của một khóa: theo danh sách slug `lessons`, hoặc các bài có tiêu đề
// "[<series> #<số>] - <tên bài>", xếp theo số
function courseLessons(course, posts) {
  if (course.lessons) {
    return course.lessons
      .map((slug) => posts.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((p, i) => ({ ...p, number: i + 1, lessonTitle: p.title }));
  }
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

// Bài thuộc một dự án ở trang "Mình làm" (tiêu đề chứa từ khóa trong projects.js)
function isProjectPost(post) {
  const title = post.title.toLowerCase();
  return (window.PROJECTS || []).some((project) => title.includes(project.keyword.toLowerCase()));
}
