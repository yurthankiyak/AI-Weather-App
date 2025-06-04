# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).


# AI Weather Forecast App

This project uses OpenWeather and OpenAI APIs. To run the app, you need to add your own API keys.


## API Keys Setup

This app currently requires you to add your API keys **directly inside the source code** at:

AI-Weather-App-main\app(tabs)\index.tsx

csharp
Kopyala
Düzenle

Open the file and replace the placeholder API keys with your own:

```ts
const OPENWEATHER_API_KEY = 'your_openweather_api_key_here';
const OPENAI_API_KEY = 'your_openai_api_key_here';
⚠️ Note: This method is not secure for production apps.
For better security, consider using environment variables (.env) in future versions.





## Setup

1. Create a `.env` file in the root directory of the project.
2. Add your API keys in the `.env` file like this:

3. Make sure `.env` is added to `.gitignore` so your keys won’t be committed.
4. Run the app normally (e.g., `npm start` or `expo start`).

---

If you don't have API keys, register at:  
- [OpenWeather](https://openweathermap.org/api)  
- [OpenAI](https://platform.openai.com/account/api-keys)

---


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
