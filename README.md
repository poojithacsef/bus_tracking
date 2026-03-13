# College Bus Tracking System

A simple, real-time bus tracking system for college students and drivers using vanilla web technologies.

## Tech Stack

-   **Frontend:** HTML, CSS (Bootstrap), Vanilla JavaScript
-   **Backend:** Firebase Realtime Database
-   **Maps:** Leaflet.js

## Project Structure

```
/
├── student.html       # Student view to track a selected bus on a map.
├── driver.html        # Driver view to share their location.
├── map.js             # Core Leaflet.js and Firebase logic.
├── firebase-config.js # Firebase connection keys.
└── style.css          # Minimal custom styling.
```

## Setup

### 1. Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project.
3.  In the project dashboard, go to **Build > Realtime Database**.
4.  Click **Create Database** and start in **Test Mode** (this allows read/write access for development).
5.  Go to **Project Settings** (gear icon) > **General**.
6.  Scroll down to "Your apps" and click the web icon (`</>`).
7.  Register your app and copy the `firebaseConfig` object.

### 2. Configure the Project

1.  Open `firebase-config.js`.
2.  Paste your `firebaseConfig` object into the file, replacing the placeholders.

## How to Run Locally

Because this project uses ES6 Modules (`import`/`export`), you must run it on a local server.

1.  **Install VS Code:** If you don't have it, download from code.visualstudio.com.
2.  **Install Live Server Extension:** In VS Code, go to the Extensions view (`Ctrl+Shift+X`) and search for and install "Live Server" by Ritwick Dey.
3.  **Run the App:**
    *   Right-click on `driver.html` and select "Open with Live Server".
    *   Right-click on `student.html` and select "Open with Live Server".

## How to Deploy

You can deploy this project for free using Firebase Hosting.

1.  **Install Node.js:** Download and install the LTS version from nodejs.org.
2.  **Install Firebase Tools:** Open a terminal or command prompt and run:
    ```bash
    npm install -g firebase-tools
    ```
3.  **Login, Initialize, and Deploy:** Follow the prompts after running these commands in your project folder:
    ```bash
    firebase login
    firebase init hosting
    firebase deploy
    ```