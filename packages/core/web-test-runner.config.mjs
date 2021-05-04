import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['src/**/*.test.ts'],
  nodeResolve: true,
  concurrentBrowsers: 3,
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 98,
      branches: 95,
      functions: 98,
      lines: 98,
    },
  },
  testRunnerHtml: (testRunnerImport) => `
      <html>
          <body>
              <script type="module">
                  import '${testRunnerImport}';
                  window.process = window.process || {};
                  window.process.env = window.process.env || {};
                  window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';
              </script>
          </body>
      </html>
  `,
  browsers: [
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        args: ['--no-sandbox'],
      },
    }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  plugins: [esbuildPlugin({ ts: true })],
  testFramework: {
    config: {
      timeout: '8000',
    },
  },
};
