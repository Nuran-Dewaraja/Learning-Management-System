# National Apprentice and Industrial Training Authority (NAITA) LMS

This is a **Learning Management System (LMS)** designed for the National Apprentice and Industrial Training Authority (NAITA). The system streamlines course management for various disciplines such as **Automobile Engineering**, **Hotel Sector**, **Electrical Technician**, **Information Communication Technology**, and **Software Engineering**.

The system offers distinct functionalities for **Admins**, **Lecturers**, and **Students**. It automates user management, provides secure access to course materials, and ensures seamless communication via email notifications.

---

## Features 🚀

### Admin Features
- **User Management**:
  - Add Students and Lecturers based on their courses.
  - Edit and Delete user profiles.
  - Send automated email notifications containing login credentials.
- **Course-Based User Assignment**:
  - Students and Lecturers are categorized by their respective disciplines.

### Lecturer Features
- **Material Management**:
  - Add lecture materials.
  - Update existing materials.
  - Delete outdated materials.

### Student Features
- **Material Access**:
  - Download course materials assigned to their specific discipline.

### Authentication
- Users (Admin, Lecturers, and Students) can log in using their email and password.
- Login routing directs users to their respective course dashboards:
  - **ICT**: ICT students and lecturers.
  - **Automobile Engineering**: Automobile students and lecturers.
  - **Hotel Sector**: Hotel sector students and lecturers.
  - Similar routing for other courses.

### Automated Email Notifications
- When an admin adds a new user, the system automatically sends an email with their credentials.

---

## Technologies Used 🛠️

### Frontend
- **React.js**: For building an interactive and responsive UI.
- **Bootstrap**: For a modern and responsive design.

### Backend
- **Spring Boot**: For handling the business logic and APIs.

### Database
- **Firestore**: A cloud-based NoSQL database for real-time data synchronization.

---

## Project Structure 📂

- **Frontend**: `react-app/`
- **Backend**: `springboot-app/`
- **Database**: Firestore configurations and rules.

---

## Setup Instructions 📝

### Prerequisites
1. **Node.js** and **npm** for frontend.
2. **Java** (JDK 11 or later) for backend.
3. Firebase account to configure Firestore.

---

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/Chithraka-Wickramaratne/LMS-for-National-Apprentice-and-Industrial-Training-Authority-of-Sri-Lanka-NAITA.git
cd naita-lms
```

#### 2. Setup Backend
1. Navigate to the Spring Boot directory:
   ```bash
   cd student-lms
   ```
2. Configure Firestore credentials in the `application.properties` file.
3. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

#### 3. Setup Frontend
1. Navigate to the React app directory:
   ```bash
   cd lms_fend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Usage Instructions 📘

### Admin Panel
1. Log in as an admin using admin credentials.
2. Add users to their respective courses.
3. Edit or delete user profiles as needed.
4. Email credentials are sent automatically to added users.

### Lecturer Dashboard
1. Log in as a lecturer using email and password.
2. Manage course materials (add, update, delete).
3. Ensure materials are uploaded to the appropriate course.

### Student Dashboard
1. Log in as a student using email and password.
2. View and download available lecture materials for your course.

---

## Challenges Faced & Solutions 💡

- **Real-Time Data Management**:
  - Used Firestore for fast and reliable data synchronization.
- **Email Automation**:
  - Integrated an email service to send login credentials automatically.
- **Role-Based Access**:
  - Implemented robust routing logic to handle course-specific user redirection.

---
## License 📜
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact 📧
For any queries or suggestions, feel free to contact:
- **Email**: `wickramaratnechithraka@gmail.com`
