# Blog Van Anh Dao

Trang web cá nhân của Vân Anh: https://vananh2002.vercel.app. Bài viết lấy tự động từ Substack (https://vanhda0.substack.com).

## Muốn sửa gì thì mở file nào

| Muốn sửa | File |
|---|---|
| Menu, link mạng xã hội, form đăng ký, footer, khối chia sẻ, thẻ bài viết | `components.js` (mục `SITE` ở đầu file) |
| Màu sắc, cỡ chữ, khoảng cách dùng chung | `styles.css` |
| Khóa học ở Mini-course | `courses.js` |
| Dự án ở Mình làm | `projects.js` |
| Cách lấy bài từ Substack, chủ đề theo tag | `api/posts.js` |
| Đường dẫn `/bai-viet/...`, `/mini-course/...`, chuyển hướng link cũ | `vercel.json` |

## Thành phần dùng chung (`components.js`)

Đặt thẻ vào trang là có ngay, không cần chép HTML:

- `<site-header></site-header>`: menu trên cùng
- `<site-subscribe></site-subscribe>`: khối đăng ký nhận tin
- `<site-footer></site-footer>`: footer
- `<social-links></social-links>`: các nút mạng xã hội
- `<share-buttons></share-buttons>`: khối "Chia sẻ bài viết"

Và các hàm tạo thẻ bài viết: `postItemHtml` (thẻ ngang), `gridCardHtml` (thẻ trong lưới 3 cột), `thumbHtml` (ảnh bìa).

## Tạo trang mới

Copy `minh-choi.html` (trang trống có sẵn menu và footer), đổi tiêu đề, mô tả, đường dẫn trong `<head>`, rồi viết nội dung vào `<main>`. Thêm trang vào menu ở mục `SITE.nav` trong `components.js`.

## Các file khác

- `site.js`: tải bài viết, hiệu ứng hiện dần khi cuộn, tìm bài học của khóa và bài thuộc dự án
- `posts.js`: bản sao danh sách bài, chỉ dùng khi mở file `.html` trực tiếp trên máy
- `bai-viet.html`, `khoa-hoc.html`: khung chung cho mọi bài viết và mọi trang khóa học
