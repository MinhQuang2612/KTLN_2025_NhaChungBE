# 📚 API Documentation - Nhà Chung Backend

> **Base URL**: `http://localhost:3001/api`  
> **Content-Type**: `application/json`  
> **Authentication**: Bearer Token (JWT)

## 🚀 Quick Start

### 1. Cài đặt và chạy Backend
```bash
# Clone repository
git clone <repository-url>
cd nha_chung_be

# Cài đặt dependencies
npm install

# Chạy server
npm run start:dev
```

### 2. Test API
```bash
# Test server
curl http://localhost:3001/api

# Test users endpoint
curl http://localhost:3001/api/users
```

---

## 🔐 Authentication

### Login Flow
```javascript
// 1. Đăng nhập
const loginResponse = await fetch('http://localhost:3001/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: '123456'
  })
});

const { access_token, user } = await loginResponse.json();

// 2. Lưu token
localStorage.setItem('token', access_token);

// 3. Sử dụng token cho các request tiếp theo
const headers = {
  'Authorization': `Bearer ${access_token}`,
  'Content-Type': 'application/json'
};
```

### Token Usage
```javascript
// Axios interceptor example
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 👥 Users API

### 📋 Get All Users
```http
GET /api/users
```

**Response:**
```json
[
  {
    "userId": 1,
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "phone": "0123456789",
    "role": "user",
    "avatar": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### ➕ Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "password": "password123",
  "phone": "0123456789",
  "role": "user"
}
```

**Response:**
```json
{
  "userId": 1,
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0123456789",
  "role": "user",
  "avatar": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 🔑 Login
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
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

### 👤 Get User by ID
```http
GET /api/users/:id
```

**Response:**
```json
{
  "userId": 1,
  "name": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0123456789",
  "role": "user",
  "avatar": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### ✏️ Update User
```http
PUT /api/users/:id
```

**Request Body:**
```json
{
  "name": "Nguyễn Văn A Updated",
  "phone": "0987654321"
}
```

### 🗑️ Delete User
```http
DELETE /api/users/:id
```

---

## 🏠 Rent Posts API

### 📋 Get All Rent Posts
```http
GET /api/rent-posts
```

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Example:**
```http
GET /api/rent-posts?userId=1&page=1&limit=10
```

**Response:**
```json
[
  {
    "postId": 1,
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
    "utilities": ["điện", "nước", "internet"],
    "status": "available",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### ➕ Create Rent Post
```http
POST /api/rent-posts
```

**Request Body:**
```json
{
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
}
```

**Validation Rules:**
- `userId`: Required, number
- `title`: Required, string, max 200 chars
- `description`: Required, string, max 1000 chars
- `price`: Required, number, min 0
- `area`: Required, number, min 0
- `category`: Required, enum: ["nhà nguyên căn", "phòng trọ", "chung cư"]
- `address`: Required object with street, ward, district, city

### 👁️ Get Rent Post by ID
```http
GET /api/rent-posts/:id
```

### ✏️ Update Rent Post
```http
PUT /api/rent-posts/:id
```

### 🗑️ Delete Rent Post
```http
DELETE /api/rent-posts/:id
```

---

## 🤝 Roommate Posts API

### 📋 Get All Roommate Posts
```http
GET /api/roommate-posts
```

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
[
  {
    "postId": 1,
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
    },
    "status": "searching",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### ➕ Create Roommate Post
```http
POST /api/roommate-posts
```

**Request Body:**
```json
{
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
}
```

**Validation Rules:**
- `userId`: Required, number
- `title`: Required, string, max 200 chars
- `description`: Required, string, max 1000 chars
- `personalInfo.age`: Required, number, min 18, max 100
- `personalInfo.gender`: Required, enum: ["male", "female", "other"]
- `requirements.ageRange`: Required, array of 2 numbers
- `requirements.gender`: Required, enum: ["male", "female", "any"]

---

## ❤️ Favourites API

### 📋 Get All Favourites
```http
GET /api/favourites
```

**Query Parameters:**
- `userId` (optional): Filter by user ID

**Response:**
```json
[
  {
    "favouriteId": 1,
    "userId": 1,
    "postType": "rent",
    "postId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### ➕ Add to Favourites
```http
POST /api/favourites
```

**Request Body:**
```json
{
  "userId": 1,
  "postType": "rent",
  "postId": 1
}
```

**Validation:**
- `postType`: Required, enum: ["rent", "roommate"]

### 🗑️ Remove from Favourites
```http
DELETE /api/favourites/user/:userId/post/:postType/:postId
```

**Example:**
```http
DELETE /api/favourites/user/1/post/rent/1
```

---

## 🛠️ Frontend Integration Examples

### React/Next.js Example
```javascript
// API service
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.token = localStorage.getItem('token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Users
  async login(email, password) {
    const result = await this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.token = result.access_token;
    localStorage.setItem('token', this.token);
    return result;
  }

  async getUsers() {
    return this.request('/users');
  }

  // Rent Posts
  async getRentPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/rent-posts${queryString ? `?${queryString}` : ''}`);
  }

  async createRentPost(data) {
    return this.request('/rent-posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Favourites
  async getFavourites(userId) {
    return this.request(`/favourites?userId=${userId}`);
  }

  async addFavourite(userId, postType, postId) {
    return this.request('/favourites', {
      method: 'POST',
      body: JSON.stringify({ userId, postType, postId }),
    });
  }
}

// Usage
const api = new ApiService();

// Login
const { user } = await api.login('user@example.com', 'password123');

// Get rent posts
const rentPosts = await api.getRentPosts({ page: 1, limit: 10 });

// Add to favourites
await api.addFavourite(1, 'rent', 1);
```

### Vue.js Example
```javascript
// composables/useApi.js
import { ref } from 'vue';

export function useApi() {
  const baseURL = 'http://localhost:3001/api';
  const token = ref(localStorage.getItem('token'));

  const request = async (endpoint, options = {}) => {
    const url = `${baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token.value && { Authorization: `Bearer ${token.value}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    return response.json();
  };

  const login = async (email, password) => {
    const result = await request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    token.value = result.access_token;
    localStorage.setItem('token', token.value);
    return result;
  };

  return {
    request,
    login,
    // ... other methods
  };
}
```

---

## 📝 Error Handling

### Common Error Responses
```json
// Validation Error (400)
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "email must be an email"
  ],
  "error": "Bad Request"
}

// Unauthorized (401)
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}

// Not Found (404)
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}

// Internal Server Error (500)
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

### Frontend Error Handling
```javascript
try {
  const data = await api.getUsers();
  // Handle success
} catch (error) {
  if (error.status === 401) {
    // Redirect to login
    router.push('/login');
  } else if (error.status === 400) {
    // Show validation errors
    setErrors(error.message);
  } else {
    // Show generic error
    showNotification('Có lỗi xảy ra, vui lòng thử lại');
  }
}
```

---

## 🔧 Development Tips

### 1. Environment Variables
```javascript
// .env.local (Frontend)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Nhà Chung
```

### 2. TypeScript Types
```typescript
// types/api.ts
export interface User {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'landlord';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentPost {
  postId: number;
  userId: number;
  title: string;
  description: string;
  images: string[];
  address: {
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  price: number;
  area: number;
  category: 'nhà nguyên căn' | 'phòng trọ' | 'chung cư';
  furniture: string[];
  utilities: string[];
  status: 'available' | 'rented' | 'unavailable';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
```

### 3. Pagination
```javascript
// Backend pagination
const getRentPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return api.request(`/rent-posts?page=${page}&limit=${limit}`);
};

// Frontend pagination state
const [posts, setPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const loadPosts = async (page) => {
  const data = await getRentPosts(page, 10);
  setPosts(data);
  setCurrentPage(page);
  setTotalPages(Math.ceil(data.total / 10));
};
```

---

## 🚀 Production Deployment

### Environment Variables
```bash
# Production .env
MONGO_URI=mongodb://your-production-db
PORT=3001
JWT_SECRET=your-super-secure-secret
NODE_ENV=production
```

### CORS Configuration
```javascript
// For production, update CORS in main.ts
app.enableCors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
});
```

---

## 📞 Support

- **Backend Issues**: Check server logs and database connection
- **API Questions**: Refer to this documentation
- **Frontend Integration**: Use the provided examples as starting points

**Happy Coding! 🎉**