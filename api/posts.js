// Lấy bài viết từ Substack cho trang web.
//   GET /api/posts             -> danh sách bài (không kèm nội dung)
//   GET /api/posts?slug=<slug> -> một bài, kèm nội dung HTML
//
// Chủ đề lấy theo tag của bài trên Substack:
//   tag "Marketing" -> Marketing, tag "Product" -> Product, còn lại -> Self-development.
// Muốn đổi chủ đề của một bài: sửa tag của bài đó trên Substack.

const SUBSTACK = 'https://vanhda0.substack.com';
const TAG_TO_CATEGORY = {
  marketing: 'marketing',
  product: 'product',
};
const DEFAULT_CATEGORY = 'self-development';

function categoryOf(post) {
  for (const tag of post.postTags || []) {
    const category = TAG_TO_CATEGORY[tag.slug];
    if (category) return category;
  }
  return DEFAULT_CATEGORY;
}

function summary(post) {
  return {
    slug: post.slug,
    url: `/bai-viet/${post.slug}`,
    substackUrl: post.canonical_url,
    title: (post.title || '').trim(),
    excerpt: post.description || post.subtitle || post.truncated_body_text || '',
    date: post.post_date,
    image: post.cover_image || '',
    category: categoryOf(post),
    score: (post.reaction_count || 0) + (post.comment_count || 0),
  };
}

async function getJson(path) {
  const res = await fetch(SUBSTACK + path, { headers: { accept: 'application/json' } });
  if (!res.ok) {
    const err = new Error(`Substack trả về ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function listPosts() {
  const posts = [];
  for (let offset = 0; offset < 500; offset += 50) {
    const page = await getJson(`/api/v1/posts?limit=50&offset=${offset}`);
    posts.push(...page);
    if (page.length < 50) break;
  }
  return posts.filter((p) => p.is_published !== false && p.type === 'newsletter').map(summary);
}

module.exports = async (req, res) => {
  const slug = req.query.slug;
  try {
    let body;
    if (slug) {
      if (!/^[a-z0-9-]+$/.test(slug)) throw Object.assign(new Error('Slug không hợp lệ'), { status: 404 });
      const post = await getJson(`/api/v1/posts/${slug}`);
      body = { ...summary(post), html: post.body_html || '' };
    } else {
      body = await listPosts();
    }
    // Vercel giữ bản lưu 15 phút, quá hạn vẫn trả bản cũ trong lúc lấy bản mới
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=86400');
    res.status(200).json(body);
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(err.status === 404 ? 404 : 502).json({ error: err.message });
  }
};
