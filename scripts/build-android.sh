#!/bin/bash

# Build script for Android app

echo "🚀 Starting Android build process..."

# 1. Build Next.js app
echo "📦 Building Next.js app..."
npm run build

# 2. Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync android

# 3. Clean Android build
echo "🧹 Cleaning Android build..."
cd android || exit 1
./gradlew clean

# 4. Build Android app
echo "🛠 Building Android app..."
./gradlew assembleDebug

echo "✅ Build complete! Check android/app/build/outputs/apk/debug for the APK"
