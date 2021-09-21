# Anatomy of a component

<!-- toc -->

- [High-level structure](#high-level-structure)
- [Styles](#styles)
  * [Design tokens](#design-tokens)
  * [Selector naming and structure](#selector-naming-and-structure)
  * [The `:host` selector](#the-host-selector)
  * [CSS Containment](#css-containment)
- [The component file](#the-component-file)
  * [Lit](#lit)
- [Storybook stories](#storybook-stories)
- [The SparklyText component](#the-sparklytext-component)
  * [The SparklyText SCSS styles](#the-sparklytext-scss-styles)
  * [The SparklyText component file](#the-sparklytext-component-file)
  * [The SparklyText story](#the-sparklytext-story)
- [Special cases](#special-cases)
  * [Styling nested slot content](#styling-nested-slot-content)
  * [Rendering children in the shadow DOM](#rendering-children-in-the-shadow-dom)

<!-- tocstop -->

Most Pharos components consist of the same set of supporting files. The [@ithaka/pharos-cli](../../packages/pharos-cli) package can create skeletons of these files for you automatically, and the following sections will help you understand which files make up a component and how they work together.

## High-level structure

Each Pharos component has its own directory located at `packages/pharos/src/components/<component-name>/`. Files that define how the component looks and acts live in that component's directory.

Imagine a SparklyText component which adds sparkles around the content it wraps. At a minimum, the SparklyText component's directory will contain the following content:

```
packages/pharos/src/components/sparkly-text
├── PharosSparklyText.react.stories.mdx
├── pharos-sparkly-text.scss
├── pharos-sparkly-text.test.ts
├── pharos-sparkly-text.ts
└── pharos-sparkly-text.wc.stories.mdx
```

You can read about each of these files in more detail in the following sections.

## Styles

Pharos components use SCSS for its reduced code duplication and helpful utilities. You would find the SparklyText component's SCSS styles in the `pharos-sparkly-text.scss` file in its directory.

### Design tokens

The Pharos build process transforms the brand and component [design tokens](./design-tokens.md) into CSS variables that can be used in either a component's SCSS or TypeScript.

You can import the variables in TypeScript from `packages/pharos/src/styles/variables.css.js`. You don't need to import them in your SCSS explicitly, because the component file will combine them in the appropriate order for the variables to be available.

### Selector naming and structure

Pharos components follow the [Block Element Modifier (BEM)](http://getbem.com) CSS convention. BEM encourages thinking about the DOM in terms of a component's constituent parts while avoiding the implementation details around the specific HTML elements it uses. BEM also helps alleviate specificity conflicts, using only single class selectors wherever possible. BEM classes help make the structure of a component clear in the CSS:

```css
.card {
  border-radius: 2px;
  border: 1px solid #cccccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.card--expanded {
  width: 100%;
}

.card__image {
  width: 100%;
  height: auto;
}

.card__heading {
  font-family: serif;
  font-size: 2rem;
}

.card__body {
  font-family: sans-serif;
  font-size: 1.5rem;
}
```

Although the shadow DOM largely isolates web component styles, BEM's naming structure and class selector convention still help with maintainability and comprehension.

### The `:host` selector

A selector you may not have seen before is `:host`. This pseudo-class selects the web component itself—that is, the `<pharos-sparkly-text>...</pharos-sparkly-text>` used in the DOM. You can leverage the `:host` selector to style web components themselves in addition to styling their content.

Web components are `display: inline` by default. This means setting their width or height will have no effect, which may cause issues related to laying out the page. Unless an `inline` display is desired, you should always set a default display value on `:host`.

### CSS Containment

All moderns browsers (except Safari) support [CSS Containment](https://developers.google.com/web/updates/2016/06/css-containment) which allow us to limit the scope of the browser's styles, layout and paint work. Applying these allows for better performance from our components (especially since many are indeed self-contained).

In most cases, these guidelines should be followed:

- Apply `contain: content` and `contain: strict` on `:host` where possible for self-contained components
- Apply `contain: layout` on `:host` for components whose styles/children go outside its boundary
- Ensure each component's `:host` is styled correctly to best support `contain`

## The component file

The `pharos-sparkly-text.ts` TypeScript file is the one you might call "the SparklyText component." It contains the behavior and rendering entry point for SparklyText, and pulls global and component-specific visual styles.

### Lit

Pharos components use [Lit](https://lit.dev/) to aid in authoring web components. These packages provide conveniences on top of authoring web components completely from scratch, such as decorators that automate portions of the process and a JSX-like syntax for writing DOM structure.

## Storybook stories

You can find stories for exploration in Storybook in `pharos-sparkly-text.wc.stories.mdx` for the core web component and `PharosSparklyText.react.stories.mdx` for the corresponding generated React component. These stories can act as a test-driven development tool, helping you stress test the behavior and design of components as you build them.

## The SparklyText component

Now that you're familiar with the purpose of each file needed for SparklyText, read on to see what the implementation would look like in practice.

### The SparklyText SCSS styles

Start by creating the styles for SparklyText in `pharos-sparkly-text.scss`:

```scss
.sparkly__content::before,
.sparkly__content::after {
  content: '✨';
}
```

The build system reads this SCSS file and generates a `.css.js` file you can import in your TypeScript file.

### The SparklyText component file

Now create the `pharos-sparkly-text.ts` TypeScript file and import the following items:

```typescript
import { LitElement, html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
```

- `LitElement` is the base class all web components written using LitElement must use.
- `html` is the lit-html rendering helper you'll use when writing the component's HTML structure.
- `TemplateResult` is the type `html` returns, and ultimately the type you'll return when you render SparklyText.
- `CSSResultArray` is the type of SparklyText's calculated CSS styles.
- `customElement` is a decorator that simplifies registering a component as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

Next, you'll import the design tokens, transformed into CSS variables by the build, along with SparklyText's generated CSS:

```typescript
import { sparklyTextStyles } from './pharos-sparkly-text.css';
```

Now you've got all the ingredients needed to write the component definition. Add the following to `pharos-sparkly-text.ts`:

```typescript
('pharos-sparkly-text');
export class PharosSparklyText extends LitElement {
  public static override get styles(): CSSResultArray {
    return [sparklyTextStyles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sparkly__content">
        <slot name="content"></slot>
      </div>
    `;
  }
}
```

The `PharosSparklyText` class extends `LitElement`, indicating that it will be a web component. It's also decorated with `customElement`, which registers the component as `<pharos-sparkly-text>`.

The component has two methods:

1. `styles()` returns the styles needed for the component, which are the design token CSS variables along with the built styles that come from `pharos-sparkly-text.scss`.
1. `render()` defines a `div` with class `.sparkly__content`, which you selected in the SCSS. Within the `div`, the `content` slot allows you to pass content to the component.

There it is—SparklyText in the flesh. It's ready for use, and you can test it out by writing a story for it.

### The SparklyText story

Create `pharos-sparkly-text.wc.stories.mdx` now, and add the following:

```jsx
import { Story, Canvas, Meta } from '@storybook/addon-docs';
import { html } from 'lit';

<Meta
  title="SparklyText"
  parameters={{
    component: 'pharos-sparkly-text',
  }}
/>

<Canvas withToolbar>
  <Story name="Base">
    {html`
      <pharos-sparkly-text>
        <span slot="content">Hello!</span>
      </pharos-sparkly-text>
    `}
  </Story>
</Canvas>
```

This code:

1. Imports some components from Storybook for building stories.
1. Imports `html` to wrap the usage of the component in the Story—this is a necessary quirk.
1. Imports the packaged SparklyText web component.
1. Registers the set of stories so that they'll show up in Storybook.
1. Creates a small story that passes `Hello!` as the sparkly text

You should now be able to run Storybook and see the SparklyText component in all its glory:

```shell
$ yarn storybook:wc:dev
```

You can also create `PharosSparklyText.react.stories.mdx` to write stories that test the generated React version of SparklyText. Before you're truly ready for production, you'll also need to [test your component](./testing.md).

## Special cases

Rare deviations from the usual patterns described above do exist. They're enumerated in the following sections for your convenience.

### Styling nested slot content

If you're used to Vue slots, you might also have used the `::v-deep` selector to style deeply-nested child elements. In web components, the split between the light DOM and the shadow DOM means there isn't currently a comparable approach. You can select elements that are the immediate child of a slot using `:slotted(<some child selector>)`, but the effect won't pierce further into _that_ element's descendents.

When you need to style nested slot content, the solution for now is to create a CSS file that can be imported in the light DOM. You can create a `pharos-some-component.styles.scss`—note the `.styles.` in the name—that will be built as an additional CSS file in the built package.

### Rendering children in the shadow DOM

For some components, such as `pharos-select`, we need to render children directly in the shadow DOM without a slot to ensure proper rendering. With this approach we lose the reactivity that comes with using a slot in terms of re-rendering on changes to children. To establish reactivity, you can use the `ObserveChildrenMixin` utility mixin in your component. Do note that this approach does not copy over event listeners from the children, so first make sure this drawback does not impact usage for consumers.
