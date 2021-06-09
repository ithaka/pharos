# Testing

<!-- toc -->

- [Unit testing](#unit-testing)
  * [Coverage](#coverage)
- [Visual diff testing](#visual-diff-testing)
- [Accessibility](#accessibility)
- [Cross-browser testing](#cross-browser-testing)
- [Verifying changes in context](#verifying-changes-in-context)
- [Integration testing](#integration-testing)
  * [Watir](#watir)

<!-- tocstop -->

Getting a component to work isn't the final step in calling it "built." Tests are an important way to prove components work as expected and ensure they don't break when making changes in the future.

## Unit testing

Pharos components use [an opinionated package](https://github.com/open-wc/open-wc/tree/main/packages/testing) that provides a blend of the [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/) frameworks for unit testing. These provide a `describe`/`it` syntax for structuring tests and an `expect`-based syntax for making assertions.

The tests run in Chromium, Firefox and WebKit using [Web Test Runner](https://github.com/modernweb-dev/web/tree/main/packages/test-runner) with [Playwright](https://playwright.dev/), which downloads its own browser instances. Follow the [quick start guide](./quick-start.md) to run the tests.

### Coverage

The unit tests have thresholds defined to encourage thorough coverage of possible execution paths. You can view the coverage after running unit tests by opening the `packages/pharos/coverage/lcov-report/index.html` file in your browser and exploring the results.

If you notice your component's coverage is low, think about what ways a user might interact with the component and determine whether you've represented each interaction as a test. This is a great way to test the behaviors real users will encounter.

## Visual diff testing

Because most Pharos components provide a visual aspect, it's important to test regressions to the visual appearance in addition to the interactive behavior.

[Chromatic](https://www.chromatic.com/) runs against pull requests that include changes to the `core` package, the project's dependencies, or Storybook configuration. This will build an emphemeral Storybook instance, screenshot each story, and determine if any stories are different from the baseline.

Chromatic generates reports the team can review to determine if they expect any changes identified.

Importantly, this means the visual diffing is only as robust as the stories you think up. Similar to unit test coverage, make sure the stories thoroughly represent the variety of ways the component may appear in the wild.

## Accessibility

The JSTOR platform consumes Pharos components. Because the JSTOR product teams dedicate themselves to providing accessible experiences, accessibility is an important facet of testing.

Storybook provides an accessibility addon, [addon-a11y](https://github.com/storybookjs/storybook/tree/main/addons/a11y), that uses the [axe-core](https://www.npmjs.com/package/axe-core) testing engine to check accessibility of components in stories. Look for the accessibility tab in the panel next to knobs and actions.

The unit testing framework used in Pharos also uses axe-core to provide accessibility checks. Try the following when testing your components:

```typescript
await expect(component).to.be.accessible();
```

## Cross-browser testing

Because Pharos needs to support Chrome, Firefox, Safari, and Edge, testing across these browsers is a must. In particular, keyboard navigation, focus states, and rendering can vary widely across these browsers. The Pharos Storybooks are compatible with all supported browsers, so Storybook is a good way to try things out.

## Verifying changes in context

Although testing in Storybook is beneficial while developing a component, the isolated view it provides can only tell you so much about how a component will look and behave on a real page.

To simulate publishing your local working copy of Pharos and install it in a project, you can use the [yalc](https://www.npmjs.com/package/yalc) tool. yalc behaves similarly to `npm link` but has been significantly easier to work with.

Start by publishing the package with yalc, which will package the code and place it in yalc's publishing cache in a directory on your computer:

```shell
$ cd packages/pharos
$ yalc publish
```

Then, install the package in your project:

```shell
$ cd /path/to/project
$ yalc add @ithaka/pharos
```

This will allow you to use new or changed components in your project to see how well they work. When you need to make updates, you can push those changes to any project using the yalc-linked package:

```shell
$ cd packages/pharos
$ yalc push
```

If you only want to update one project with the changes, you can re-publish and update that project:

```shell
$ cd packages/pharos
$ yalc publish
$ cd /path/to/project
$ yalc update @ithaka/pharos
```

## Integration testing

Because they use the shadow DOM, Pharos components aren't always a one-to-one mapping with typical HTML interaction. Some frameworks may not provide a built-in way to interact with web components in whole or in part.

### Watir

Interacting with Pharos form controls in Watir currently requires a shim and some extra code to reach into the shadow DOM. Speak with one of the frontend teams' QA engineer to learn more about this.
