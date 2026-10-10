# Thay đổi và phạm vi kiểm tra

- Thêm Vercel Function và routing cho API, sandbox, ảnh.
- Tách tiến trình phát triển khỏi module Express để import không tự mở cổng.
- Thay ghi tệp JSON bằng Supabase REST + PostgreSQL JSONB, kiểm tra version để tránh ghi đè.
- Đợi commit thành công trước phản hồi thành công; lỗi trả 503 hoặc 409.
- Đưa ảnh mới lên Supabase Storage, bảo vệ các API upload bằng quyền admin.
- Thay băm mật khẩu SHA-256 đơn bằng scrypt có salt; bỏ toàn bộ mật khẩu mặc định dự phòng.
- Lưu hash token phiên ở cơ sở dữ liệu; thu hồi khi đăng xuất/đổi mật khẩu.
- Giữ 114 học liệu từ nguồn gốc; giữ luồng ghi danh không mật khẩu, yêu cầu đủ họ tên/số điện thoại/lớp/trường.
- Tách hồ sơ cá nhân cũ khỏi gói triển khai công khai; có script nhập chọn lọc.
- Không tạo lượt truy cập mẫu khi khởi tạo/reset thống kê.
- Tải nhiều ảnh thành từng yêu cầu; giới hạn mỗi tệp 2,5 MB.
- Sửa kiểu dữ liệu xuất CSV trong server để kiểm tra TypeScript chạy được.

## Đã kiểm tra trong môi trường chuẩn bị

- TypeScript: npm run lint.
- Giao diện production: npm run build.
- API Express chạy thật với dịch vụ Supabase giả lập: npm test.
- Các ca: khởi tạo; bốn trường bắt buộc; hai phiên bản app ghi đồng thời; commit thất bại; mật khẩu mặc định bị từ chối; phiên admin dùng giữa hai app; upload đòi admin; API lạ trả JSON 404; thu hồi phiên; đổi mật khẩu.

## Chưa được xác minh trực tiếp

- SQL chạy trên dự án Supabase thật của cô và quyền Storage của dự án đó.
- Routing/build Function trên bản triển khai Vercel thật.
- Tài khoản, ảnh tồn tại sau redeploy thực tế.
- Tải cao, hạn mức hoặc chi phí gói dịch vụ cô đang dùng.

Không cần cấp mật khẩu cho người hỗ trợ. Cô tự nhập các biến vào Vercel theo HUONG_DAN_TRIEN_KHAI.md.
