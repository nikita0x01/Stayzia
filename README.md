##  Stayzia - Your Next Stay Awaits

**Live Demo:** [https://stayzia.onrender.com/listings](https://stayzia.onrender.com/listings)

**Docker Image:** [https://hub.docker.com/r/nikita102005/stayzia](https://hub.docker.com/r/nikita102005/stayzia) 

Stayzia is a full-stack web application where users can browse, create, edit, and review accommodation listings.
Built with Node.js, Express, MongoDB, and EJS. The project is fully containerized using Docker.

---

##  Features

- Listings management: create, view, edit, and delete listings
- User authentication using Passport.js
- Reviews and rating system
- Image uploads using Multer and Cloudinary
- Server-side rendering with EJS templates
- MongoDB Atlas cloud database
- Dockerized for easy deployment and portability
- Hosted on Render.

---

##  Tech Stack

###  Frontend
- **EJS (Embedded JavaScript Templates)** – Server-side rendering with dynamic data injection using `<%= %>` syntax.
- **CSS3 / Bootstrap / Tailwind (if used)** – For responsive and elegant UI styling.
- **JavaScript (Client-side)** – Adds interactivity and form validation.

###  Backend
- **Node.js** – JavaScript runtime environment for executing server-side logic.
- **Express.js** – Lightweight web framework handling routing, requests, and middleware.
  - Routes include `/listings`, `/users`, `/reviews`
  - Handles CRUD operations, authentication, and RESTful API endpoints.

###  Database
- **MongoDB (MongoDB Atlas)** – NoSQL database storing flexible JSON-like documents.
  - **Listings**: title, price, location, image, owner, description
  - **Reviews**: references to users and listings
  - **Users**: authentication and profile details

###  Authentication & Security
- **Passport.js** – Local strategy for login/signup authentication.
- **Express-Session** – For maintaining user sessions.
- **Connect-Flash** – Displays success/error messages (e.g., “Login successful”, “Error deleting listing”).

###  Cloud & File Management
- **Cloudinary** – Stores and optimizes listing images.
- **Multer** – Middleware to handle multipart/form-data for image uploads before sending to Cloudinary.

###  Utilities
- **dotenv** – Loads environment variables from `.env` file (DB_URL, API keys, etc.).
- **method-override** – Enables PUT & DELETE requests from forms.
- **connect-flash** – For flash messages after performing actions (login/logout/success).

---

## Project Structure 
```
MAJORPROJECT
├── controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── init
│   ├── data.js
│   └── index.js
│
├── models
│   ├── Listing.js
│   ├── Review.js
│   └── User.js
│
├── public
│   ├── css
│   ├── default_1.png
│   ├── default_2.png
│   ├── default_3.png
│   ├── default_4.jpg
│   └── default.png
│
├── routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── uploads
│
├── utils
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views
│   ├── includes
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layouts
│   │   └── boilerplate.ejs
│   │
│   ├── listings
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── reserve.ejs
│   │   └── show.ejs
│   │
│   ├── users
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   └── error.ejs
├── Dockerfile
├── .env
├── .gitignore
├── package.json
└── app.js
```

---

##  Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikita0x01/Stayzia.git
   cd Stayzia
npm install

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
ATLAS_DB_URL=your_mongodb_atlas_url
SESSION_SECRET=your_secret

node app.js
# or
nodemon app.js

---

## Docker Support (Dockerized Project)
Build the image locally
```
docker build -t stayzia .
docker run -p 8080:8080 stayzia
docker pull nikita102005/stayzia
docker run -p 8080:8080 nikita102005/stayzia

```
## Deployment

The project is deployed on Render. Make sure to add all environment variables in the Render dashboard.




