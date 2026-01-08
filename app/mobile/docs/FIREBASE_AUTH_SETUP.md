# Firebase Authentication Setup Guide

This guide explains how to configure Firebase Authentication with Google Sign-In and Email/Password for your Expo app.

## 1. Enable Authentication Methods in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (scrllz)
3. Navigate to **Authentication** > **Sign-in method**
4. Enable the following providers:
   - **Email/Password**: Toggle to enable
   - **Google**: Toggle to enable and configure

## 2. Configure Google Sign-In

### Step 1: Get OAuth Client IDs

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Navigate to **APIs & Services** > **Credentials**
4. You'll need to create OAuth 2.0 Client IDs for each platform:

#### Web Client ID (Required for all platforms)
- Click **Create Credentials** > **OAuth client ID**
- Application type: **Web application**
- Add authorized redirect URIs:
  - `https://auth.expo.io/@your-expo-username/mobile`
- Copy the **Client ID**

#### iOS Client ID
- Click **Create Credentials** > **OAuth client ID**
- Application type: **iOS**
- Bundle ID: `com.saitadikonda99.mobile`
- Copy the **Client ID**

#### Android Client ID
- Click **Create Credentials** > **OAuth client ID**
- Application type: **Android**
- Package name: `com.saitadikonda99.mobile`
- SHA-1 certificate fingerprint (get using):
  ```bash
  cd android && ./gradlew signingReport
  ```
  Or for development:
  ```bash
  keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
  ```
- Copy the **Client ID**

### Step 2: Update Your Code

Open `app/auth/login.tsx` and replace the placeholder client IDs:

```tsx
const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
})
```

### Step 3: Configure app.json for Google Sign-In (Optional for EAS Build)

Add the Google Sign-In scheme to your `app.json`:

```json
{
  "expo": {
    "scheme": "com.saitadikonda99.mobile",
    "ios": {
      "bundleIdentifier": "com.saitadikonda99.mobile"
    },
    "android": {
      "package": "com.saitadikonda99.mobile"
    }
  }
}
```

## 3. Testing

### Email/Password Login
- Works out of the box in Expo Go and development builds
- Users can sign up and sign in with email/password

### Google Sign-In
- **Expo Go**: Works with web client ID only
- **Development Build**: Full native Google Sign-In support
- **Production Build**: Full native Google Sign-In support

### Create a Development Build

For the best Google Sign-In experience, create a development build:

```bash
npx eas-cli@latest build --profile development --platform ios
npx eas-cli@latest build --profile development --platform android
```

## 4. File Structure

```
app/
├── config/
│   └── firebase.ts          # Firebase configuration with Auth
├── auth/
│   ├── login.tsx            # Main login screen with Google & Email buttons
│   └── email-login.tsx      # Email/Password sign-in form
context/
└── auth-context.tsx         # Auth context provider
```

## 5. Usage in Components

```tsx
import { useAuth } from '@/context/auth-context';

function MyComponent() {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!user) {
    return <Text>Please sign in</Text>;
  }

  return (
    <View>
      <Text>Welcome, {user.email}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
```

## Troubleshooting

### "redirect_uri_mismatch" Error
- Ensure the redirect URI in Google Cloud Console matches exactly
- For Expo Go: `https://auth.expo.io/@your-username/your-app-slug`

### Google Sign-In Not Working in Expo Go
- Google Sign-In has limited support in Expo Go
- Create a development build for full functionality

### "auth/invalid-credential" Error
- Check that your Firebase project has Google Sign-In enabled
- Verify your client IDs are correct
