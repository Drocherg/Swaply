import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Swaply',
  webDir: 'dist'  // <-- Usa "dist" en lugar de "public"
};

export default config;
