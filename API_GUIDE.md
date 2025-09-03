# Hướng dẫn sử dụng API - Nhà Chung Backend

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình MongoDB:
- Tạo file `.env` từ `config.env`
- Cập nhật `MONGO_URI` trong file `.env`

3. Chạy ứng dụng:
```bash
npm run start:dev
```

Server sẽ chạy tại: `http://localhost:3000/api`

## API Endpoints

### Users API

#### GET /api/users
Lấy danh sách tất cả users
```bash
curl -X GET http://localhost:3000/api/users
```

#### POST /api/users
Tạo user mới
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "password": "password123",
    "phone": "0123456789",
    "role": "user"
  }'
```

#### POST /api/users/login
Đăng nhập
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nguyenvana@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": 1,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": null,
    "phone": "0123456789"
  }
}
```

#### GET /api/users/:id
Lấy thông tin user theo ID
```bash
curl -X GET http://localhost:3000/api/users/1
```

#### PUT /api/users/:id
Cập nhật thông tin user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A Updated",
    "phone": "0987654321"
  }'
```

#### DELETE /api/users/:id
Xóa user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Rent Posts API

#### GET /api/rent-posts
Lấy danh sách tất cả bài đăng thuê phòng
```bash
curl -X GET http://localhost:3000/api/rent-posts
```

#### GET /api/rent-posts?userId=1
Lấy danh sách bài đăng thuê phòng của user cụ thể
```bash
curl -X GET http://localhost:3000/api/rent-posts?userId=1
```

#### POST /api/rent-posts
Tạo bài đăng thuê phòng mới
```bash
curl -X POST http://localhost:3000/api/rent-posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "Phòng trọ đẹp Quận 1",
    "description": "Phòng sạch sẽ, thoáng mát, gần trung tâm",
    "images": ["https://example.com/image1.jpg"],
    "address": {
      "street": "123 Nguyễn Huệ",
      "ward": "Bến Nghé",
      "district": "Quận 1",
      "city": "TP.HCM"
    },
    "price": 3000000,
    "area": 25,
    "category": "phòng trọ",
    "furniture": ["giường", "tủ lạnh"],
    "utilities": ["điện", "nước", "internet"]
  }'
```

#### GET /api/rent-posts/:id
Lấy thông tin bài đăng thuê phòng theo ID
```bash
curl -X GET http://localhost:3000/api/rent-posts/1
```

### Roommate Posts API

#### GET /api/roommate-posts
Lấy danh sách tất cả bài đăng tìm bạn ở ghép
```bash
curl -X GET http://localhost:3000/api/roommate-posts
```

#### GET /api/roommate-posts?userId=1
Lấy danh sách bài đăng tìm bạn ở ghép của user cụ thể
```bash
curl -X GET http://localhost:3000/api/roommate-posts?userId=1
```

#### POST /api/roommate-posts
Tạo bài đăng tìm bạn ở ghép mới
```bash
curl -X POST http://localhost:3000/api/roommate-posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "title": "Tìm bạn ở ghép Quận 7",
    "description": "Cần tìm bạn ở ghép hoà đồng, gọn gàng",
    "images": ["https://example.com/roommate1.jpg"],
    "currentRoom": {
      "address": "456 Lê Văn Việt, Quận 7, TP.HCM",
      "price": 4000000,
      "area": 30,
      "description": "Có ban công, nội thất đầy đủ"
    },
    "personalInfo": {
      "age": 25,
      "gender": "male",
      "occupation": "Developer",
      "hobbies": ["đọc sách", "chơi game"],
      "habits": ["ngủ sớm", "dậy sớm"]
    },
    "requirements": {
      "ageRange": [20, 30],
      "gender": "any",
      "traits": ["gọn gàng", "hoà đồng"],
      "maxPrice": 2000000
    }
  }'
```

### Favourites API

#### GET /api/favourites
Lấy danh sách tất cả yêu thích
```bash
curl -X GET http://localhost:3000/api/favourites
```

#### GET /api/favourites?userId=1
Lấy danh sách yêu thích của user cụ thể
```bash
curl -X GET http://localhost:3000/api/favourites?userId=1
```

#### POST /api/favourites
Thêm vào danh sách yêu thích
```bash
curl -X POST http://localhost:3000/api/favourites \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "postType": "rent",
    "postId": 1
  }'
```

#### DELETE /api/favourites/user/:userId/post/:postType/:postId
Xóa khỏi danh sách yêu thích
```bash
curl -X DELETE http://localhost:3000/api/favourites/user/1/post/rent/1
```

## Validation Rules

### User
- `name`: Bắt buộc, phải là chuỗi
- `email`: Bắt buộc, phải là email hợp lệ
- `password`: Bắt buộc, phải là chuỗi
- `phone`: Tùy chọn, phải là chuỗi
- `role`: Tùy chọn, phải là "user" hoặc "landlord"

### Rent Post
- `userId`: Bắt buộc, phải là số
- `title`: Bắt buộc, phải là chuỗi
- `description`: Bắt buộc, phải là chuỗi
- `address`: Bắt buộc, object với các trường street, ward, district, city
- `price`: Bắt buộc, phải là số
- `area`: Bắt buộc, phải là số
- `category`: Bắt buộc, phải là "nhà nguyên căn", "phòng trọ", hoặc "chung cư"

### Roommate Post
- `userId`: Bắt buộc, phải là số
- `title`: Bắt buộc, phải là chuỗi
- `description`: Bắt buộc, phải là chuỗi
- `currentRoom`: Bắt buộc, object với address, price, area, description
- `personalInfo`: Bắt buộc, object với age (18-100), gender, occupation
- `requirements`: Bắt buộc, object với ageRange, gender, maxPrice

### Favourite
- `userId`: Bắt buộc, phải là số
- `postType`: Bắt buộc, phải là "rent" hoặc "roommate"
- `postId`: Bắt buộc, phải là số

## Lưu ý

1. Tất cả password sẽ được hash bằng bcrypt trước khi lưu vào database
2. API sử dụng prefix `/api` cho tất cả endpoints
3. ValidationPipe được áp dụng toàn cục với whitelist và transform
4. CORS được enable để hỗ trợ frontend
5. Timestamps được tự động thêm vào các document
