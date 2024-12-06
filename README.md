# Assignment Submission Portal

## Introduction
The **Assignment Submission Portal** is a web application designed to enable students to submit assignments and allow admins to review, grade, and manage submissions. The portal provides a secure authentication system using **JWT tokens** and includes role-based access for **students** and **admins**. Students can submit their assignments, while admins can view and grade them.

## Tech Stack
- **Backend**: Node.js with Express and TypeScript
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure user login and session management
- **Password Hashing**: bcrypt for secure password storage
- **File Uploads**: Used for storing submitted assignments

## Installation Instructions

### Prerequisites
Before you begin, ensure that you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)
- **npm** for managing dependencies

### Steps to Set Up Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/karankr2003/Assignment-submission-portal

2. Navigate to the project directory:
   ```bash
   cd Assignment-submission-portal

3. Install dependencies:
   ```bash
   npm install
   npm install mongodb
   npm install mongoose
   npm install jsonwebtoken
   npm install bcryptjs
   npm install dotenv

4. Development Dependencies:
   ```bash
   npm install typescript --save-dev
   npm install @types/node --save-dev
   npm install @types/express --save-dev
   npm install ts-node --save-dev
   npm install nodemon --save-dev

5. Set up environment variables: Create a .env file in the root directory and include the following:
   ```bash
   JWT_SECRET=your_secret_key

6. Start the application:
   ```bash
   npm start

The application should now be running locally on http://localhost:5000
### Usage

**User Registration:** A user can register by providing a username, password, and role (either student or admin).
**User Login:** Users can log in by providing their credentials, and upon successful login, they will receive a JWT token for authenticated access.
**Assignment Submission:** Students can submit their assignments via a form. The assignments are saved and can be reviewed by admins.
**Admin Dashboard:** Admins can view the submitted assignments and handle them.

### API Endpoints
**POST /register** :Register a new user (student/admin).
**POST /login**: Login to the portal and get a JWT token.
**POST /submit-assignment**: Submit an assignment (for students).
**GET /assignment**s: View submitted assignments (for admins).
**POST /accept/reject assignment**: Handle an assignment (for admins).


### Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new pull request.

