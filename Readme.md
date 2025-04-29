# Profile Crafter

<img src="https://github.com/dangtranhuu/images/blob/main/frog/gif/zQRCHEK.gif?raw=true" width="80px" alt="icon" />

**Website Demo:** [https://theanishtar.github.io/count-viewer/](https://theanishtar.github.io/count-viewer/)

---

## ✨ Giới thiệu

`Profile Crafter` là một API server mạnh mẽ, giúp bạn:

- **Tạo GitHub profile banners** đẹp mắt và động với SVG API.
- **Đếm số lượt xem** bài viết, hồ sơ cá nhân, sản phẩm.
- **Quản lý blog** và **thông tin kỹ thuật**.
- **Xác thực người dùng**, quản lý profile cá nhân.
- **Scrape metadata** từ các URL bên ngoài.
- **Tùy chỉnh nền background** với hiệu ứng động.

Một giải pháp tất cả trong một cho personal portfolio và GitHub profile enhancement! 🚀

---

## 🧩 Các module chính

| Module | Mô tả |
|:--|:--|
| `countview.controller.js` | API đếm lượt xem cho trang/blog/post |
| `github.controller.js` | Tạo GitHub profile banner SVG tùy chỉnh |
| `blog.controller.js` | CRUD blog posts API |
| `user.controller.js` | Quản lý user profile |
| `auth.controller.js` | Đăng nhập, đăng ký người dùng |
| `scrape.js` | Lấy preview nội dung từ URL |
| `background.controller.js` | Quản lý hiệu ứng nền particles |
| `technical.controller.js` | Lưu trữ thông tin kỹ thuật |
| `action.controller.js` | Log các hành động người dùng |

---

## 🛠 Các API nổi bật

### 🔥 Tạo GitHub Profile Banner

```html
<img src="https://count-viewer.vercel.app/api/github/banner?background=itachi1&tech=java&streaks=fire&view=sharingan&skills=angular,vuejs,reactjs,nodejs" alt="Dynamic GitHub Banner" />
```

See: [https://theanishtar.github.io/count-viewer/](https://theanishtar.github.io/count-viewer/)

<a hrref=""><img src="https://komarev.com/ghpvc/?username=theanishtar&label=Profile%20views&color=0e75b6&style=flat" alt="theanishtar" /></a> <!--![](https://count-viewer.vercel.app/api/github/streak?user=theanishtar)-->
<a href="https://count-viewer.vercel.app/api/auth/profile"><img src="https://count-viewer.vercel.app/api/github/streak?user=theanishtar" alt="current streak number"></a>
<a href="https://count-viewer.vercel.app/api/auth/profile" target="_blank"><img src="https://count-viewer.vercel.app/api/github/range?user=theanishtar" alt="current streak range"></a>


<img align="center" alt="Profile Details" src="https://count-viewer.vercel.app/api/github/banner?background=thean&tech=python&streaks=auto&view=auto&skills=github,vsc,vuejs,reactjs,nodejs,gopher" />
<img align="center" alt="Profile Details" src="https://count-viewer.vercel.app/api/github/banner?background=thean&tech=java&streaks=fire&view=sharingan&skills=js,angular,vuejs,reactjs,nodejs" />





