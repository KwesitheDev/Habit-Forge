# HabitForge 🔥

**A modern, mobile-first habit tracker built with React Native, Expo, Firebase, and TensorFlow.js.**

Live Demo: https://expo.dev/accounts/kwesithedev/projects/Habit-Forge/updates/65870c08-f0ea-4257-ac8d-a6a30df35234

![Mobile Preview QR](./assets/HabitForge-previewQR.svg)

GitHub: https://github.com/KwesiTheDev/HabitForge

## Overview

HabitForge is a full-featured habit tracking app designed to help users build lasting routines through real-time tracking, personalized reminders, AI-driven motivation, and deep analytics.

## Key Features

- **Full CRUD** for habits (create, read, update via edit not yet implemented, delete)
- **Real-time sync** with Firebase Firestore
- **Daily push notifications** via Expo Notifications
- **Per-habit & overall streak tracking**
- **AI motivational insights** (TensorFlow.js rule-based stub analyzing streak data)
- **Advanced analytics dashboard**:
  - 5-week activity heatmap with completion intensity
  - Weekly trend line chart
  - Monthly bar chart
  - Habit performance ranking
- **Secure authentication** (Email/Password + Google Sign-In + Forgot Password)
- **Profile page** with logout and settings stubs

## Tech Stack

- React Native + Expo
- Firebase (Auth, Firestore)
- Expo Notifications
- TensorFlow.js (@tensorflow/tfjs-react-native)
- react-native-chart-kit
- React Navigation
- Context API for state

## Project Structure

HabitForge/
├── App.js
├── app.json
├── assets
│ ├── adaptive-icon.png
│ ├── favicon.png
│ ├── icon.png
│ ├── mindfulnes.jpeg
│ └── splash-icon.png
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── src
├── components
├── config
│ └── firebase.js
├── context
│ ├── AuthContext.js
│ └── HabitsContext.js
├── screens
│ ├── AnalyticsScreen.js
│ ├── CreateHabitScreen.js
│ ├── DashboardScreen.js
│ ├── HomeScreen.js
│ ├── LoginScreen.js
│ ├── ProfileScreen.js
│ └── RegisterScreen.js
├── services
│ └── firestore.js
├── styles
│ ├── analyticsStyles.js
│ ├── CreateHabitScreenStyles.js
│ ├── DashboardStyles.js
│ ├── LoginScreenStyles.js
│ ├── ProfileScreenStyle.js
│ └── RegisterScreenStyles.js
└── utils
├── insights.js
├── notifications.js
├── streak.js
└── tfSetup.js

## Setup & Run Locally

**Clone the repository:**

- git clone https://github.com/KwesiTheDev/HabitForge.git
- cd HabitForge

**Install dependencies:**

- npm install

**Start the development server:**

- npx expo start

- Scan the QR code with Expo Go.

## Firebase Configuration

- Create a project at [Firebase Console](https://console.firebase.google.com)

- Enable Authentication (Email/Password + Google)

- Enable Firestore Database

- Replace the config in `src/config/firebase.js` with your credentials

## Deployment

Build preview versions via Expo EAS: eas build --profile preview --platform all

## Future Enhancements

- **Planned post-MVP features (prioritized for scalability and differentiation):**
  - Habit editing functionality
  - Dark mode toggle
  - Full TensorFlow.js ML model for success probability prediction
  - Data export (CSV/PDF)
  - Social features (friend streaks, challenges)
  - Web version (React Native Web)
  - B2B integration (wellness program dashboards)

## License

MIT © 2025

---

Built with discipline. Shipping daily.
