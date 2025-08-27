🚀 Campus Bridge Backend

Campus Bridge is a backend REST API designed to streamline university life. It supports user authentication, events, announcements, and resource sharing — all in one system.

Built with Node.js, Express, and MongoDB Atlas, it uses JWT authentication and role-based access control for security.

✨ Features

🔐 Authentication

Register & login with JWT

Role-based access (student, lecturer, admin)

📢 Announcements

Lecturers can create, update, and delete announcements

Students can view announcements

🎉 Events

Full CRUD support for campus events

Public event listing

📂 Resources

Upload and share study materials

File handling with Multer

👥 User Roles

Students → view only

Lecturers → can post resources & announcements

Admin → full control

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB Atlas (Mongoose ODM)

Authentication: JSON Web Tokens (JWT)

File Uploads: Multer

Deployment: Render / Railway / Heroku

📂 Project Structure
campus-bridge-backend/
│── models/            # Database models (User, Event, Resource, Announcement)
│── controllers/       # Request handlers (business logic)
│── routes/            # API endpoints
│── middleware/        # Auth & role-based access
│── uploads/           # File storage (ignored in git)
│── server.js          # Entry point
│── .env               # Env variables (ignored in git)
│── package.json

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/campus-bridge-backend.git
cd campus-bridge-backend

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/campusbridge
JWT_SECRET=yourSuperSecret

4. Start the server
npm start


Server will run on:
👉 http://localhost:5000

📡 API Endpoints
🔐 Auth

POST /api/auth/register → Register new user

POST /api/auth/login → Login & get token

📢 Announcements

POST /api/announcements → Create announcement (lecturer only)

GET /api/announcements → List announcements

GET /api/announcements/:id → Get single announcement

PUT /api/announcements/:id → Update announcement (owner only)

DELETE /api/announcements/:id → Delete announcement (owner only)

🎉 Events

POST /api/events → Create event

GET /api/events → List all events

GET /api/events/:id → Get single event

PUT /api/events/:id → Update event

DELETE /api/events/:id → Delete event

📂 Resources

POST /api/resources → Upload resource (with file)

GET /api/resources → List resources

GET /api/resources/:id → Get resource by ID

PUT /api/resources/:id → Update resource (owner only)

DELETE /api/resources/:id → Delete resource (owner only)

🔒 Security

Passwords hashed with bcrypt

JWT authentication for protected routes

Role-based authorization (students, lecturers, admins)

☁️ Deployment

Runs on Render / Railway / Heroku

MongoDB hosted on MongoDB Atlas

Env vars configured in platform settings

📖 Future Enhancements

Real-time notifications with Socket.IO

Cloud storage (AWS S3 / Cloudinary) for files

Admin analytics dashboard

👨‍💻 Author

Your Name
Backend Developer | Node.js | MongoDB | REST APIs

📫 Contact: [your-dicksonngari71@gmail.com
]