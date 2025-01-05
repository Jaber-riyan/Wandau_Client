# Wandau 🏺

**Live Site URL**: [Wandau Live Site](https://wandau.netlify.app/)

Wandau is a responsive and user-friendly web application designed to manage and explore details about remarkable historical artifacts like the Rosetta Stone and Antikythera Mechanism. Users can browse detailed information, add new artifacts, and interact through likes. The platform offers private routes for managing personal entries and favorite artifacts, ensuring a rich and personalized user experience.

---

## Features 🚀

1. **Artifact Management**

   - Browse all historical artifacts with detailed information.
   - Add new artifacts with comprehensive data, including discovery details and current location.
   - Update and delete artifacts added by logged-in users.

2. **Secure User Authentication**

   - Firebase email/password-based login and Google OAuth.
   - JWT authentication for securing private routes.
   - Password validation with uppercase, lowercase, and minimum length requirements.

3. **Interactive Liking System**

   - Display and sort artifacts by highest like count.

4. **Advanced Features**

   - Dynamic Search: Search artifacts by name on the "All Artifacts" page.
   - Dynamic Titles: Change website titles based on current routes.
   - Loading Spinners: Custom spinner for data-fetching operations.
   - Responsive Design: Seamless experience across mobile, tablet, and desktop.

5. **Extra Sections**

   - Featured Artifacts: Highlights popular artifacts with most likes.
   - Additional informative sections to enhance user engagement.
---

## Tech Stack 💻

- **Frontend**:
  - React
  - Tailwind CSS
  - DaisyUI
  - React Icons
  - React Router
  - Animate.css
  - React Toastify
  - SweetAlert2
  - React Loading
  - React Helmet
  - Match Sorter
  - Sort-By
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication, JWT
- **Storage**: LocalForage
- **Hosting**: Netlify (client) & Vercel (server)

---

## Setup Instructions 🛠️

### Prerequisites:

- Node.js installed on your machine.
- MongoDB database set up.
- Firebase project configured.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jaber-riyan/Wandau_Client.git
   cd Wandau_Client
   ```
