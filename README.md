# Federated Learning with Health IoT - Gantt Chart Dashboard

A dynamic, secure Gantt chart application for managing your SDL (Software Development Life Cycle) project timeline. Built with vanilla JavaScript, Frappe Gantt, and Express.js for deployment on Render.

## 🚀 Features

- **Secure Authentication**: Login with credentials (Username: `SDLProject`, Password: `scrum`)
- **Dynamic Gantt Chart**: Interactive timeline with drag-and-drop functionality
- **Progress Tracking**: Visual progress bars with editable completion percentages
- **Task Management**: Add, edit, delete, and organize tasks by categories
- **Multiple View Modes**: Switch between Day, Week, and Month views
- **Data Persistence**: Automatic saving to localStorage with export functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern, professional interface with smooth animations

## 📋 Project Overview

**Title**: Federated Learning with Health IoT  
**Setting**: Vertical FL and Cross-Silo Environment  
**Duration**: 11 Weeks (September - November 2025)  
**Extensible**: Can add more weeks if project extends

### Task Breakdown:
- **September**: Requirement Analysis, Feasibility Report, SRS Completion, Initial Architecture Design
- **October**: Mid Semester Presentation, Prototype Development, Testing, Client Integration
- **November**: Security Module Integration, MVP & System Testing, Performance Evaluation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Frappe Gantt (Open Source)
- **Backend**: Node.js with Express.js
- **Security**: Helmet, Rate Limiting, Input Validation
- **Deployment**: Render (Cloud Platform)

## 📦 Deployment Instructions for Render

### Prerequisites
- GitHub account
- Render account (free tier available)
- Basic knowledge of Git

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository** or use an existing one
2. **Upload all project files** to your repository:
   ```
   federated-learning-gantt/
   ├── public/
   │   ├── index.html
   │   └── app.js
   ├── server.js
   ├── package.json
   └── README.md
   ```

3. **Ensure your file structure** matches the above layout

### Step 2: Create Render Web Service

1. **Login to Render**: Go to [https://render.com](https://render.com) and sign in
2. **Create New Web Service**: Click "New" → "Web Service"
3. **Connect Repository**: Choose "Build and deploy from a Git repository"
4. **Select Your Repo**: Connect your GitHub repository

### Step 3: Configure Deployment Settings

Fill in the following settings in Render:

| Setting | Value |
|---------|-------|
| **Name** | `federated-learning-gantt` (or your preferred name) |
| **Region** | Choose closest to your location |
| **Branch** | `main` (or your default branch) |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` (or upgrade for production) |

### Step 4: Environment Variables (Optional)

No environment variables are required for basic functionality, but you can add:

| Key | Value | Description |
|-----|--------|-------------|
| `NODE_ENV` | `production` | Sets production mode |
| `PORT` | `10000` | Port number (auto-set by Render) |

### Step 5: Deploy

1. **Click "Create Web Service"**
2. **Monitor the build logs** - deployment typically takes 2-5 minutes
3. **Access your application** at the provided `.onrender.com` URL

## 🔧 Local Development

To run the application locally:

```bash
# Clone the repository
git clone <your-repo-url>
cd federated-learning-gantt

# Install dependencies
npm install

# Start the development server
npm run dev
# or for production mode
npm start
```

The application will be available at `http://localhost:10000`

## 🔐 Security Features

- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Sets security headers
- **Input Validation**: Sanitizes all user inputs
- **Session Management**: Secure session handling
- **HTTPS Ready**: Works with Render's automatic SSL

## 📱 Usage Instructions

### Login
- Username: `SDLProject`
- Password: `scrum`

### Navigation
1. **Dashboard**: Main project overview with Gantt chart
2. **Sidebar**: Project information and quick controls
3. **View Modes**: Switch between Day, Week, Month views
4. **Task Management**: Click tasks to edit, drag to reschedule

### Task Operations
- **Edit Task**: Click on any task bar to open edit modal
- **Add Task**: Use "Add Task" button in sidebar
- **Delete Task**: Use delete button in task edit modal
- **Save Progress**: Manual save with "Save Progress" button
- **Export Data**: Download project data as JSON

## 🚨 Troubleshooting

### Build Fails
- Ensure `package.json` is in root directory
- Check that all dependencies are listed correctly
- Verify Node.js version compatibility (>=18.0.0)

### Application Won't Load
- Check browser console for JavaScript errors
- Ensure Frappe Gantt CDN is accessible
- Verify all file paths are correct

### Authentication Issues
- Ensure credentials match exactly: `SDLProject` / `scrum`
- Clear browser cache and localStorage
- Check for JavaScript errors in console

### Chart Not Displaying
- Verify Frappe Gantt library loads correctly
- Check that SVG element exists in DOM
- Ensure task data format is valid

## 📊 Data Structure

Tasks are stored with the following structure:
```json
{
  "id": "task1",
  "name": "Requirement Analysis",
  "start": "2025-09-01",
  "end": "2025-09-07",
  "progress": 0,
  "category": "Analysis",
  "month": "September",
  "week": 1
}
```

## 🎨 Customization

### Colors
Edit the `categoryColors` object in `app.js` to change task colors:
```javascript
this.categoryColors = {
    "Analysis": "#3498db",
    "Documentation": "#e74c3c",
    // ... more categories
};
```

### Credentials
Update login credentials in the `projectData` object:
```javascript
credentials: {
    username: "YourUsername",
    password: "YourPassword"
}
```

## 📈 Performance

- **Lightweight**: Minimal dependencies for fast loading
- **Responsive**: Optimized for all screen sizes
- **Efficient**: Local storage for data persistence
- **Scalable**: Can handle extended project timelines

## 🔄 Updates and Maintenance

To update the application:
1. Make changes to your code
2. Commit and push to GitHub
3. Render will automatically redeploy

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Ensure all files are properly structured
4. Verify Render deployment settings

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Project Management! 🎯**

Built with ❤️ for SDL Project - Federated Learning with Health IoT
