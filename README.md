# 🏨 Booking API


A robust and scalable **RESTful API** designed to handle hotel reservations, user management, and room bookings. This backend service serves as the core logic for booking applications, providing secure authentication, role-based access control, and efficient data retrieval.

---

## 🚀 Key Features

*   **🔐 Authentication & Authorization**: Secure user registration and login using **JWT (JSON Web Tokens)** and cookie-based sessions.
*   **🏨 Hotel Management**: CRUD operations for creating, updating, and deleting hotel listings.
*   **🛏️ Room Availability**: Real-time checking of room numbers and availability dates.
*   **👥 User Roles**: Distinct permissions for **Users** (browsing/booking) and **Admins** (management).
*   **🔍 Advanced Search**: Filter hotels by city, price range, and feature sets.
*   **🛡️ Error Handling**: Centralized error handling middleware for consistent API responses.

---

## 🛠️ Tech Stack

This project is built using the **MERN** ecosystem backend technologies:

*   **Runtime Environment**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (NoSQL)
*   **ORM**: [Mongoose](https://mongoosejs.com/)
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
*   **Configuration**: dotenv

---

## ⚙️ Installation

Follow these steps to set up the project locally.

### Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/en/download/) (v14 or higher)
*   [npm](https://www.npmjs.com/) (Node Package Manager)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas URL)

### 1. Clone the Repository
```bash
git clone https://github.com/AnikShahrier/Booking-api.git
cd Booking-api
```

### 2. Install Dependencies
Install the required system packages using npm:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure your environment variables:

```env
PORT=8800
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### 4. Start the Server
Run the application in development mode (with hot-reloading if `nodemon` is installed):
```bash
npm run dev
```
*Or for production:*
```bash
npm start
```

---

## 🔌 API Usage & Endpoints

The API is structured around REST principles. Below are the primary resource endpoints.

### **Auth**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### **Users**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users/:id` | Get specific user details |
| `GET` | `/api/users` | Get all users (Admin only) |
| `PUT` | `/api/users/:id` | Update user profile |
| `DELETE` | `/api/users/:id` | Delete a user |

### **Hotels**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/hotels` | Get all hotels (supports query filters) |
| `GET` | `/api/hotels/:id` | Get single hotel details |
| `POST` | `/api/hotels` | Create a new hotel (Admin only) |
| `GET` | `/api/hotels/countByCity` | Get count of properties by city |

### **Rooms**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/rooms/:hotelid` | Create a room for a specific hotel |
| `PUT` | `/api/rooms/availability/:id` | Update room availability dates |

---

## 🧪 Testing

You can test the API endpoints using **Postman** or **Insomnia**.

1.  **Import Collection**: Create a new collection.
2.  **Set Environment**: Set `{{url}}` to `http://localhost:8800/api`.
3.  **Auth Header**: For protected routes, ensure you add the `Authorization` header or ensure cookies are being sent if using cookie-parser.

---

## 🤝 Contribution Guidelines

Contributions are welcome! Please follow these steps to contribute:

1.  **Fork** the repository.
2.  Create a new **Branch** (`git checkout -b feature/YourFeature`).
3.  **Commit** your changes (`git commit -m 'Add some feature'`).
4.  **Push** to the branch (`git push origin feature/YourFeature`).
5.  Open a **Pull Request**.

Please ensure your code follows standard JavaScript/Node.js style guides.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/AnikShahrier">Anik Shahrier</a>
</p>
  Made with ❤️ by <a href="https://github.com/AnikShahrier">Anik Shahrier</a>
</p>
