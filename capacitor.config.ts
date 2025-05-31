
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ddcaa69748554601997d8c8ff93a940e',
  appName: 'auto-split-pal',
  webDir: 'dist',
  server: {
    url: 'https://ddcaa697-4855-4601-997d-8c8ff93a940e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
