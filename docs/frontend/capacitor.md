# Mobile Development with Capacitor

## Overview

This document outlines the mobile development approach using Capacitor to convert our Next.js application into a hybrid mobile app.

## Setup & Configuration

### 1. Installation

```bash
# Install Capacitor
npm install @capacitor/core
npm install @capacitor/cli --save-dev

# Install essential plugins
npm install @capacitor/ios @capacitor/android
npm install @capacitor/camera @capacitor/storage @capacitor/geolocation
```

### 2. Project Configuration

```json
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carrental.app',
  appName: 'Car Rental',
  webDir: 'out',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    Camera: {
      permissionType: "prompt"
    },
    Geolocation: {
      permissionType: "prompt"
    }
  }
};

export default config;
```

## Platform-Specific Features

### 1. Native Camera Integration

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

async function takePicture() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    return image.base64String;
  } catch (error) {
    console.error('Error taking photo:', error);
  }
}
```

### 2. Geolocation Services

```typescript
import { Geolocation } from '@capacitor/geolocation';

async function getCurrentLocation() {
  try {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  } catch (error) {
    console.error('Error getting location:', error);
  }
}
```

### 3. Local Storage

```typescript
import { Storage } from '@capacitor/storage';

// Store data
async function setData(key: string, value: any) {
  await Storage.set({
    key,
    value: JSON.stringify(value)
  });
}

// Retrieve data
async function getData(key: string) {
  const { value } = await Storage.get({ key });
  return value ? JSON.parse(value) : null;
}
```

## Build Process

### 1. Build Web App
```bash
# Build Next.js app
npm run build

# Copy web assets
npx cap copy
```

### 2. Platform-specific Builds

#### iOS
```bash
# Add iOS platform
npx cap add ios

# Open Xcode project
npx cap open ios
```

#### Android
```bash
# Add Android platform
npx cap add android

# Open Android Studio project
npx cap open android
```

## Native Features Integration

### 1. Push Notifications

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

export async function initializePushNotifications() {
  try {
    // Request permission
    const permissionStatus = await PushNotifications.requestPermissions();
    
    if (permissionStatus.receive === 'granted') {
      // Register for push notifications
      await PushNotifications.register();
      
      // Handle push notification received
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received:', notification);
      });
      
      // Handle push notification action
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action:', notification);
      });
    }
  } catch (error) {
    console.error('Error setting up push notifications:', error);
  }
}
```

### 2. Deep Linking

```typescript
import { App } from '@capacitor/app';

export function setupDeepLinks() {
  App.addListener('appUrlOpen', (data: { url: string }) => {
    // Example: carrental://booking/123
    const slug = data.url.split('carrental://').pop();
    
    if (slug) {
      // Handle deep link navigation
      handleDeepLink(slug);
    }
  });
}
```

### 3. File System Access

```typescript
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export async function saveFile(fileName: string, data: string) {
  try {
    await Filesystem.writeFile({
      path: fileName,
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
  } catch (error) {
    console.error('Error saving file:', error);
  }
}
```

## Platform Optimizations

### 1. Performance

```typescript
// Lazy load heavy components on mobile
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <MobileSkeletonLoader />
});
```

### 2. Touch Interactions

```typescript
// Add touch-specific handlers
function TouchableComponent({ onPress }: { onPress: () => void }) {
  return (
    <div 
      role="button"
      onClick={onPress}
      style={{ touchAction: 'manipulation' }}
    >
      Content
    </div>
  );
}
```

### 3. Responsive Design

```scss
// Mobile-specific styles
.container {
  @media (max-width: 640px) {
    padding: env(safe-area-inset-top) env(safe-area-inset-right) 
             env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
}
```

## Testing

### 1. Device Testing

```typescript
import { Device } from '@capacitor/device';

async function logDeviceInfo() {
  const info = await Device.getInfo();
  console.log('Running on:', info.platform);
  console.log('Device model:', info.model);
  console.log('OS version:', info.osVersion);
}
```

### 2. Platform-specific Test Cases

```typescript
describe('Camera functionality', () => {
  it('should handle camera permissions on iOS', async () => {
    // iOS specific test
  });

  it('should handle camera permissions on Android', async () => {
    // Android specific test
  });
});
```

## Deployment

### 1. iOS App Store

1. Configure `Info.plist`
2. Create App Store Connect listing
3. Build and archive in Xcode
4. Submit for review

### 2. Google Play Store

1. Configure `AndroidManifest.xml`
2. Create Play Console listing
3. Generate signed APK/Bundle
4. Submit for review

## Maintenance

### 1. Version Updates

```bash
# Update Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest

# Update native platforms
npx cap update ios
npx cap update android
```

### 2. Plugin Updates

```bash
# Update all Capacitor plugins
npm install @capacitor/camera@latest @capacitor/storage@latest @capacitor/geolocation@latest
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Clean and rebuild project
   - Update Capacitor
   - Check platform-specific settings

2. **Plugin Issues**
   - Check permissions in native configurations
   - Verify plugin installation
   - Review platform-specific requirements

3. **Performance Issues**
   - Implement lazy loading
   - Optimize images and assets
   - Use platform-specific optimizations
