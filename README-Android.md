# Building the Android App

This project uses Capacitor to package the React web app into a native Android app.

## Prerequisites
- Node.js
- Android Studio installed

## Build Instructions
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Build the web assets and sync to the Android project:
   ```bash
   npm run build:android
   ```
3. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```
4. From Android Studio, you can build the APK (Build > Build Bundle(s) / APK(s) > Build APK(s)) or run it directly on a connected device/emulator.

**Note:** The native app uses the `VITE_API_URL` environment variable from `.env.production` to connect to the backend. Ensure this points to the live backend URL, not `localhost`.
