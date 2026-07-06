import { expect } from 'vitest';
import axe from 'axe-core';
import { getDiffableHTML, type DiffOptions } from '@open-wc/semantic-dom-diff/get-diffable-html.js';

interface AccessibleOptions {
  ignoredRules?: string[];
}

const formatViolations = (violations: axe.Result[]): string => {
  const lines: string[] = ['Accessibility Violations', '---'];
  violations.forEach((violation) => {
    lines.push(`Rule: ${violation.id}`);
    lines.push(`Impact: ${violation.impact}`);
    lines.push(`${violation.help} (${violation.helpUrl})`);
    violation.nodes.forEach((node) => {
      lines.push('');
      if (node.target) {
        lines.push(`Issue target: ${node.target}`);
      }
      lines.push(`Context: ${node.html}`);
      if (node.failureSummary) {
        lines.push(node.failureSummary);
      }
    });
    lines.push('---');
  });
  return lines.join('\n');
};

expect.extend({
  // check for accessibility violations using axe-core.
  async toBeAccessible(received: Element, options: AccessibleOptions = {}) {
    const runOptions: axe.RunOptions = { resultTypes: ['violations'] };
    if (options.ignoredRules?.length) {
      runOptions.rules = Object.fromEntries(
        options.ignoredRules.map((rule) => [rule, { enabled: false }])
      );
    }
    const { violations } = await axe.run(received, runOptions);
    const pass = violations.length === 0;
    return {
      pass,
      message: () =>
        pass
          ? 'expected element to have accessibility violations, but none were found'
          : formatViolations(violations),
    };
  },

  // check that the element's light DOM matches the expected HTML.
  toEqualDom(received: Element, expected: string, options?: DiffOptions) {
    const actual = getDiffableHTML(received.outerHTML, options);
    const expectedHTML = getDiffableHTML(expected, options);
    return {
      pass: actual === expectedHTML,
      message: () => 'expected DOM to equal the given HTML',
      actual,
      expected: expectedHTML,
    };
  },
  // check that the element's shadow DOM matches the expected HTML.
  toEqualShadowDom(received: Element, expected: string, options?: DiffOptions) {
    const shadowRoot = received.shadowRoot;
    if (!shadowRoot) {
      return {
        pass: false,
        message: () => 'expected element to have a shadow root, but it did not',
      };
    }
    const actual = getDiffableHTML(shadowRoot.innerHTML, options);
    const expectedHTML = getDiffableHTML(expected, options);
    return {
      pass: actual === expectedHTML,
      message: () => 'expected shadow DOM to equal the given HTML',
      actual,
      expected: expectedHTML,
    };
  },
});

interface PharosMatchers<R = unknown> {
  /**
   * Asserts the element has no axe-core accessibility violations.
   *
   * @param options.ignoredRules - axe rule IDs to disable for this run
   *
   * @example
   * await expect(component).toBeAccessible();
   * await expect(component).toBeAccessible({ ignoredRules: ['region'] });
   */
  toBeAccessible(options?: AccessibleOptions): Promise<R>;
  /**
   * Asserts the element's light DOM matches the expected HTML, ignoring
   * whitespace and Lit's marker comments.
   *
   * @param expected - the expected HTML string.
   * @param options - `getDiffableHTML` options, e.g. `{ ignoreAttributes: [...] }`.
   *
   * @example
   * expect(component).toEqualDom('<div class="x">text</div>');
   */
  toEqualDom(expected: string, options?: DiffOptions): R;
  /**
   * Asserts the element's shadow DOM matches the expected HTML, ignoring
   * whitespace and Lit's marker comments.
   *
   * @param expected - the expected shadow DOM HTML string.
   * @param options - `getDiffableHTML` options, e.g. `{ ignoreAttributes: [...] }`.
   *
   * @example
   * expect(component).toEqualShadowDom(`
   *   <div class="alert alert--info" role="alert">...</div>
   * `);
   */
  toEqualShadowDom(expected: string, options?: DiffOptions): R;
}

declare module 'vitest' {
  interface Matchers<T> extends PharosMatchers<T> {}
  interface Assertion<T> extends PharosMatchers<T> {}
  interface AsymmetricMatchersContaining extends PharosMatchers {}
}
