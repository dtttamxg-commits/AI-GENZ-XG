# Bản sửa web học tập Toán 10 — Vercel + Supabase

Ngày chuẩn bị: 09/10/2026. Giữ React/Vite và 114 học liệu của bản nguồn được cung cấp.

## Cô cần biết trước khi bắt đầu

- Học sinh ghi danh bằng **Họ tên + Số điện thoại + Lớp + Trường**. Không yêu cầu tài khoản Google, mật khẩu hay OTP.
- Ghi danh là thông tin tự khai, không chứng minh danh tính. Ai nhập cùng số điện thoại vẫn có thể dùng/cập nhật cùng hồ sơ; điểm tự báo từ trò chơi không phù hợp làm điểm kiểm tra chính thức.
- Giáo viên dùng đăng nhập quản trị riêng. Không còn mật khẩu mặc định dự phòng.
- Mã nguồn đã sửa nhưng chưa được triển khai trên Vercel/Supabase của cô. Chỉ tải ZIP lên GitHub mà chưa làm bước Supabase sẽ chưa ghi danh được.
- Bản nguồn có 1 hồ sơ ghi danh. Bản mới không đưa dữ liệu cá nhân này vào mã triển khai công khai. Nếu cần giữ hồ sơ cũ, xem phần nhập dữ liệu cuối hướng dẫn. Bản ZIP ban đầu cô tải về vẫn là bản sao lưu.

## Bước 1 — Tạo dự án Supabase

1. Vào https://supabase.com/dashboard và đăng nhập bằng tài khoản của cô.
2. Tạo một dự án mới dành riêng cho web Toán 10. Ghi nhớ mật khẩu cơ sở dữ liệu do cô đặt; không gửi mật khẩu vào cuộc trò chuyện.
3. Chờ dự án sẵn sàng. Mở **SQL Editor**.
4. Mở tệp `supabase/01_setup.sql` trong bộ mã này bằng Notepad/VS Code.
5. Sao chép toàn bộ nội dung, dán vào SQL Editor và chạy **Run**.
6. Lệnh tạo bảng `toan10_state`, hàm lưu có kiểm tra phiên bản và bucket `toan10-media`. Chạy lại lệnh không xóa dữ liệu đang có.

Không tạo policy cho phép khách tự đọc/ghi bảng `toan10_state`. Bảng chỉ được truy cập qua backend đã kiểm tra quyền. Bucket `toan10-media` công khai chỉ dùng chứa học liệu; không dùng để chứa danh sách học sinh, mật khẩu hoặc bản sao lưu.

## Bước 2 — Lấy thông số kết nối

- Lấy **Project URL** qua hộp **Connect** của dự án. Dạng `https://xxxxx.supabase.co`.
- Vào **Settings → API Keys** để lấy **Secret key** dùng cho máy chủ, dạng `sb_secret_...`.
- Không lấy publishable key cho bản backend này. Secret key phải giữ kín.
- Mã có hỗ trợ khóa `service_role` cũ qua biến `SUPABASE_SERVICE_ROLE_KEY`, nhưng nên dùng `SUPABASE_SECRET_KEY` mới.

Không dán các giá trị thật vào mã nguồn, không thêm tiền tố `VITE_` cho khóa bí mật, không tải `.env` lên GitHub.

## Bước 3 — Cập nhật kho GitHub đang kết nối Vercel

1. Giải nén ZIP bản sửa.
2. Mở thư mục chứa `package.json`, `server.ts`, `vercel.json`, `api`, `backend`, `src` và `public`.
3. Cập nhật các tệp/thư mục này vào **thư mục gốc** của kho GitHub đang kết nối Vercel. Không tải nguyên ZIP làm một tệp trong kho; Vercel không tự giải nén mã nguồn ZIP.
4. Không tạo thêm một lớp thư mục khiến `package.json` nằm sâu hơn thư mục gốc đang cấu hình.
5. Không tải `node_modules`, `dist`, `.env` hoặc dữ liệu học sinh lên GitHub.
6. Bản sửa bỏ phụ thuộc vào `server_data/store.json`. Nếu tệp này đang nằm trong kho công khai, bỏ khỏi bản triển khai; nếu có dữ liệu thật, việc xóa tệp hiện tại không xóa các phiên bản đã nằm trong lịch sử Git.
7. Lưu thay đổi bằng commit. Vercel có thể tự chạy một bản triển khai ngay; cần nhập đủ biến ở bước 4 rồi triển khai lại.

Những tệp mới quan trọng: `api/index.ts`, `vercel.json`, `backend/*`, `dev-server.ts`, `src/services/request.ts`, `supabase/01_setup.sql`, `package-lock.json`. Cần đưa cả các tệp `src` đã sửa lên; không chỉ đưa riêng server.ts.

## Bước 4 — Cấu hình Vercel

Mở đúng dự án Vercel → **Settings → Environment Variables**. Tạo:

| Tên biến | Giá trị cô nhập |
|---|---|
| `SUPABASE_URL` | Project URL của Supabase |
| `SUPABASE_SECRET_KEY` | Secret key phía máy chủ của Supabase |
| `SUPABASE_STORAGE_BUCKET` | `toan10-media` |
| `ADMIN_USERNAME` | Tên quản trị cô chọn, ví dụ `TeamAIgenz` |
| `ADMIN_INITIAL_PASSWORD` | Mật khẩu riêng dài ít nhất 12 ký tự, tối đa 256 ký tự |

Chọn **Production** cho website chính. Chỉ chọn Preview cùng cơ sở dữ liệu nếu chấp nhận việc thử nghiệm có thể thay đổi dữ liệu thật; tốt hơn dùng dự án Supabase riêng cho Preview.

Kiểm tra phần build của Vercel:

| Mục | Giá trị |
|---|---|
| Framework Preset | Vite |
| Root Directory | Thư mục chứa package.json và vercel.json |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | 22.x trở lên, tương thích yêu cầu trong package.json |

Tệp `vercel.json` cung cấp cấu hình API. Không đổi dự án sang chỉ phục vụ tĩnh và không thêm rewrite `/api/*` về `index.html`.

Sau khi lưu biến, mở **Deployments** và triển khai lại (**Redeploy**) bản mã mới nhất. Không chỉ làm mới trang trình duyệt: biến môi trường mới cần một bản triển khai mới.

`ADMIN_INITIAL_PASSWORD` và `ADMIN_USERNAME` chỉ dùng lúc cơ sở dữ liệu chưa có bản ghi đầu tiên. Thay biến này sau khi đã khởi tạo không tự đổi mật khẩu/tên quản trị đã lưu. Dùng chức năng đổi mật khẩu của app; app yêu cầu đăng nhập lại sau khi đổi.

## Bước 5 — Kiểm tra theo thứ tự

Thay `TEN-WEB` bằng tên miền thật của cô:

1. Mở `https://TEN-WEB.vercel.app/api/health`.
   - Phải trả JSON có `ok: true`, `service: "toan10-api"`.
   - Nếu 404: kiểm tra bản commit, Root Directory, `api/index.ts` và `vercel.json` có thực sự lên GitHub/bản triển khai hay chưa.
2. Mở `https://TEN-WEB.vercel.app/api/readiness`.
   - Phải trả JSON có `ok: true`, `database: "connected"`.
   - Lần đầu tạo dữ liệu, 114 học liệu và mật khẩu quản trị mới.
   - Nếu 503: kiểm tra SQL đã chạy, URL/key đúng và biến đã áp dụng cho bản triển khai; kiểm tra mật khẩu khởi tạo dài ít nhất 12 ký tự.
3. Mở trang chủ, chọn **Ghi danh học tập**, nhập đủ bốn trường bằng thông tin thử.
4. Đăng nhập quản trị bằng tên/mật khẩu cô đã cấu hình. Kiểm tra danh sách ghi danh.
5. Tải lên một ảnh nhỏ, kiểm tra ảnh vẫn xem được sau khi tải lại trang.
6. Triển khai lại một lần, kiểm tra hồ sơ, học liệu và ảnh vẫn còn. Đây là bước xác minh lưu dữ liệu trên dịch vụ thật.
7. Nhờ hai học sinh ghi danh đồng thời bằng hai số khác nhau; kiểm tra cả hai hồ sơ.
8. Kiểm tra đổi mật khẩu, đăng nhập lại bằng mật khẩu mới, mật khẩu cũ bị từ chối.

Nếu còn lỗi, chụp thông báo Console và lỗi trong nhật ký Function Vercel, che khóa bí mật. Không cần chụp giá trị các biến môi trường.

## Lưu ý sử dụng

- Mỗi tệp tải qua app tối đa **2,5 MB**. Chọn nhiều ảnh sẽ tải lần lượt. Giới hạn này để chừa chỗ cho mã hóa base64 và JSON dưới giới hạn yêu cầu Vercel.
- Tệp ảnh/HTML tải mới được ghi vào Supabase Storage, không ghi vào ổ đĩa của Vercel. Các tệp học liệu đóng gói sẵn trong `public` vẫn được giữ.
- Trang vẫn có dữ liệu học liệu dự phòng để xem khi mất kết nối. Luôn dùng `/api/readiness` và thử ghi danh để xác nhận máy chủ thật sự hoạt động.
- Lỗi lưu không được báo thành công. Khi hai người cập nhật cùng lúc, máy chủ kiểm tra phiên bản; trình duyệt thử lại có giới hạn. Nếu quá đông yêu cầu, có thể cần bấm thử lại, không âm thầm ghi đè dữ liệu.
- Phiên quản trị lưu trong cơ sở dữ liệu, hạn 24 giờ; đăng xuất/đổi mật khẩu thu hồi phiên tương ứng.
- Thống kê mới bắt đầu từ 0. Số liệu mẫu của mã cũ không được dùng làm lượt truy cập thật.
- HTML trò chơi/học liệu phải do giáo viên tin cậy cung cấp. Đây không phải môi trường thực thi an toàn cho mã HTML từ người lạ.

## Nhập hồ sơ ghi danh cũ — tùy chọn

Chỉ cần nếu cô muốn giữ 1 hồ sơ trong bản ZIP gốc. Không đưa store.json gốc vào GitHub mới.

Trên máy tính có Node.js tương thích:

1. Cài thư viện: `npm ci`.
2. Sao chép `.env.example` thành `.env`, nhập đúng thông số riêng của cô.
3. Mở `/api/readiness` trên website để khởi tạo cơ sở dữ liệu trước.
4. Chạy:

```bash
node --env-file=.env scripts/import-users.mjs "DUONG_DAN_DEN_STORE_JSON_GOC"
```

Lệnh chỉ thêm hồ sơ chưa có theo số điện thoại, không ghi đè hồ sơ đang có, không nhập mật khẩu quản trị cũ hoặc số liệu truy cập mẫu. Nếu gặp thông báo có cập nhật đồng thời, chạy lại sau. Bản gốc vẫn nguyên vẹn.

## Dành cho người hỗ trợ kỹ thuật

- `npm ci`, `npm run lint`, `npm test`, `npm run build`.
- `npm run dev` chạy Express + Vite tại máy; vẫn cần Supabase qua `.env`.
- PostgreSQL dùng một bản ghi JSONB có phiên bản để giữ tương thích cấu trúc app cũ. RPC update có điều kiện version ngăn lost update; phản hồi chỉ kết thúc sau commit. Đây là bước chuyển tiếp cho quy mô nhỏ, không phải thiết kế tối ưu cho hàng nghìn người đồng thời. Khi lượng dữ liệu lớn, nên tách users/scores/items/visits thành bảng riêng và chuyển HTML dài sang Storage.
- Ảnh tải lên có đường dẫn bất biến. Nếu commit dữ liệu sau upload thất bại, có thể còn đối tượng chưa được tham chiếu trong Storage; có thể dọn sau khi đối chiếu dữ liệu. Không xóa bucket tùy tiện.
- Không tự khôi phục/reset dữ liệu khi kết nối lỗi. `backend/seed.json` chỉ chứa học liệu và cấu hình hiển thị, không chứa hồ sơ học sinh hoặc mật khẩu quản trị.
- Kiểm tra API cục bộ dùng một máy chủ mô phỏng Supabase REST/Storage, không khẳng định đã kiểm tra SQL, quyền tài khoản, mạng hoặc triển khai Vercel thật.

## Nguồn chính thức đã đối chiếu ngày 09/10/2026

- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/functions/limitations
- https://vercel.com/docs/environment-variables/managing-environment-variables
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/storage
