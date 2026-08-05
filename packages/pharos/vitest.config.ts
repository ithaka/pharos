import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

const silencedLogs = ['Lit is in dev mode.', 'Multiple versions of Lit loaded.'];

export default defineConfig({
  server: {
    // Icons load via dynamic import, by pre-transforming them, they are available immediately and don't cause random test timeouts.
    warmup: {
      clientFiles: ['./src/styles/icons/*.ts'],
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    onConsoleLog(log) {
      if (silencedLogs.some((l) => log.includes(l))) return false;
    },
    coverage: {
      // istanbul is the only provider that supports coverage while running against multiple browsers.
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/test/**',
        'src/**/*.stories.*',
        'src/**/storyArgs.ts',
        'src/styles/**',
        'src/react-components/**',
        'src/pages/**',
        '**/*.css.ts',
        '**/*.tsx',
        'src/utils/_storybook/**',
      ],
      thresholds: {
        statements: 94,
        branches: 85,
        functions: 96,
        lines: 94,
      },
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      screenshotFailures: false,
      viewport: { width: 1280, height: 720 },
      instances: [
        {
          browser: 'chromium',
          provider: playwright({
            launchOptions: {
              args: [
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
              ],
            },
          }),
        },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ],
    },
  },
});
