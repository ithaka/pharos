import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: ['lib/**/*.test.js'],
  nodeResolve: true,
  concurrentBrowsers: 3,
  coverage: true,
  testsStartTimeout: 30000,
  coverageConfig: {
    threshold: {
      statements: 98,
      branches: 93,
      functions: 97,
      lines: 97,
    },
  },
  testRunnerHtml: (testRunnerImport) => `
      <html>
          <body>
              <script type="module">
                  import '@webcomponents/scoped-custom-element-registry';
                  import '${testRunnerImport}';
                  import './lib/test/initComponents.js';
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
  testFramework: {
    config: {
      timeout: '8000',
    },
  },
};
