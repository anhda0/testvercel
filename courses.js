// Danh sách khóa học. Bài học lấy từ Substack theo một trong hai cách:
//   series:  bài nào có tiêu đề bắt đầu bằng "[<series> #<số>]" là bài học số đó của khóa
//   lessons: liệt kê slug các bài theo thứ tự (slug là phần cuối link bài trên Substack,
//            ví dụ vanhda0.substack.com/p/cach-tu-on-mos-mien-phi-bao-o-v)
// Thêm khóa mới: thêm một mục vào mảng này.
window.COURSES = [
  {
    slug: "copywriting-101",
    title: "Copywriting 101",
    series: "Copywriting 101",
    description: "Khóa học nhỏ về những nền tảng của copywriting: hiểu công việc của một copywriter, tâm lý khách hàng, cách kích hoạt ngũ quan, xử lý sự từ chối và kết cấu của một bài viết.",
  },
  {
    slug: "mos",
    title: "Tự ôn MOS",
    lessons: ["cach-tu-on-mos-mien-phi-bao-o-v"],
    description: "Tự ôn và thi đỗ MOS Word, PowerPoint, Excel mà không cần đóng tiền học: MOS là gì, cách đăng ký thi và kinh nghiệm ôn trong vài ngày.",
  },
];
