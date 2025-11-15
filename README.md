#  Stayzia — Your Next Stay Awaits

**Live Demo:** [https://stayzia.onrender.com/listings](https://stayzia.onrender.com/listings)

Stayzia is a full-stack web application where users can browse, add, edit, and review accommodation listings.  
Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, Stayzia provides a seamless platform similar to Airbnb — with secure authentication, image uploads, and responsive design.

---

##  Features

-  **Listings Management** – Create, view, edit, and delete property listings.
-  **Reviews** – Users can leave reviews and ratings on listings.
-  **Authentication** – Secure user login and signup using Passport.js.
-  **Image Uploads** – Handled via Multer and stored on Cloudinary.
-  **Responsive UI** – Styled using CSS3, Bootstrap, and optionally Tailwind CSS.
-  **Cloud Database** – MongoDB Atlas for online database hosting.
-  **Session & Flash Messages** – User-friendly notifications and persistent login sessions.
-  **Deployment** – Hosted on Render.

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

<img width="460" height="673" alt="image" src="https://github.com/user-attachments/assets/ff14f70c-c6f9-4744-a36e-4b996cb64125" />


