# Paper & Pixel Bookstore

A modern React Native bookstore application with dual buyer/seller functionality, featuring image upload capabilities and a complete e-commerce workflow. It includes real-time inventory management, and an intuitive interface for seamless browsing, selling, and purchasing of books.

## Demo Video
https://drive.google.com/file/d/1I_gZhLDJbmqL5VEz5WExkFNrwEAQ8hrM/view

## Features

### For Buyers
- Browse available books with detailed information
- View book details with seller information
- Add books to cart with quantity management
- Complete checkout process
- Responsive product cards with book covers

### For Sellers
- Add new books with image upload via camera or gallery
- Edit existing book information
- Delete books from inventory
- View and manage customer orders
- Update order status (pending → shipped)

### Technical Features
- Image upload to Cloudinary with camera/gallery picker
- SQLite database with relational structure
- RESTful API with Express.js backend
- Animated UI components with smooth transitions
- Pull-to-refresh functionality
- Role switching between buyer and seller modes

## Tech Stack

### Frontend (React Native)
- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Expo ImagePicker** - Camera and gallery access
- **React Native Animated** - Smooth animations

### Backend (Node.js)
- **Express.js** - Web framework
- **SQLite3** - Local database
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

### Cloud Services
- **Cloudinary** - Image storage and optimization

## Project Structure

```
bookstore/
├── components/           # React Native components
│   ├── Header.tsx       # App header with role switcher
│   ├── Navigation.tsx   # Bottom navigation
│   ├── StoreFront.tsx   # Book browsing for buyers
│   ├── ProductCard.tsx  # Individual book cards
│   ├── ProductDetails.tsx # Detailed book view
│   ├── Cart.tsx         # Shopping cart
│   ├── SellerProducts.tsx # Seller's book management
│   ├── SellerOrders.tsx # Order management
│   └── AddEditModal.tsx # Book creation/editing modal
├── styles/              # Styling
│   └── styles.js        # Centralized styles
├── utils/               # Utilities
│   └── api.js          # API communication functions
├── server/              # Backend files
│   ├── server.js        # Main server file
│   ├── db.js           # Database setup and initialization
│   └── routes/         # API routes
│       ├── product.js   # Book CRUD operations
│       ├── cart.js     # Cart management
│       ├── orders.js   # Order processing
│       └── users.js    # User management
└── index.tsx           # Main app component
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### 1. Clone and Install
```bash
git clone https://github.com/Mohd-Fazal-khan/book.git
```

### 2. Backend Setup
```bash
cd server
npm install
```
### 3. Frontend Setup
```bash
cd mobile
npm install
```
### 4. Database Initialization
The database will be automatically created and populated with sample data when you first run the server.

### 5. Cloudinary Setup
1. Create a free account at [Cloudinary.com](https://cloudinary.com/)
2. Get your Cloud Name from the dashboard
3. Create an unsigned upload preset:
   - Go to Settings → Upload
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Note the preset name
4. Update `AddEditModal.tsx` with your credentials:
```javascript
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
```


### 6. Update API Configuration
Update the API base URL in `utils/api.js` to match your server:
```javascript
const API_BASE_URL = "http://YOUR_LOCAL_IP:3000/api";
```

## Running the Application

### Start the Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:3000`

### Start the React Native App
```bash
cd mobile
npx expo start
```

### Available API Endpoints
- `GET /api/health` - Health check
- `GET /api/products` - Get all products
- `GET /api/products/seller/:id` - Get seller's products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/cart/buyer/:id` - Get buyer's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `POST /api/orders/checkout` - Process checkout
- `GET /api/orders/seller/:id` - Get seller's orders
- `PUT /api/orders/:id/status` - Update order status

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User name
- `role` - 'buyer' or 'seller'

### Books Table
- `id` - Primary key
- `seller_id` - Foreign key to users
- `title` - Book title
- `description` - Book description
- `price` - Price (decimal)
- `stock` - Available quantity
- `image_url` - Cloudinary image URL

### Cart Table
- `id` - Primary key
- `buyer_id` - Foreign key to users
- `book_id` - Foreign key to books
- `quantity` - Item quantity

### Orders Table
- `id` - Primary key
- `buyer_id` - Foreign key to users
- `seller_id` - Foreign key to users
- `book_id` - Foreign key to books
- `quantity` - Ordered quantity
- `status` - 'pending' or 'shipped'
- `created_at` - Order timestamp

## Key Features Implementation

### Image Upload Flow
1. User taps "Select Image" in add/edit modal
2. System prompts for camera or gallery
3. Image picker launches with cropping enabled
4. Selected image uploads to Cloudinary
5. Cloudinary URL is stored in form state
6. Image displays in preview with remove option

### Role Switching
- Animated button in header toggles between buyer/seller modes
- Different navigation options and views for each role
- State management preserves data during role switches

### Cart Management
- Add items with automatic quantity handling
- Update quantities with +/- buttons
- Remove items individually
- Real-time total calculation
- Checkout process with order confirmation

### Order Processing
- Checkout converts cart items to orders
- Orders are created for each seller separately
- Sellers can view and update order status
- Real-time order count updates

## License

This project is licensed under the MIT License.

## Made by
Mohd Fazal Khan
