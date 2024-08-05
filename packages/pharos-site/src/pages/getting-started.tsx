import { PharosHeading, PharosLink, PharosButton } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';
import CodeBlock from '../components/CodeBlock';

const GettingStartedPage: FC = () => {
  const installInstructions = `
   # yarn
   yarn add @ithaka/pharos
   \n
   # npm
   npm install @ithaka/pharos
  `;
  const directoryLayout = `
      @ithaka/pharos/lib
      ├── assets/
      │   ├── icons            // Pharos icons (used with the icon component)
      ├── components/          // Folder containing web components
      ├── react-components/    // Folder containing React components
      ├── styles/
      │   ├── _variables.css   // Commonly used tokens for styling
      │   ├── fonts.css        // CSS to have fonts available to use
      │   ├── typography.scss  // CSS styles to apply fonts and styles to root elements
      └── ...`;

  return (
    <>
      <PharosHeading level={1} preset="7--bold">
        Getting Started
      </PharosHeading>
      <br />
      <PharosHeading level={2} preset="6">
        Installation
      </PharosHeading>
      <p>Install the Pharos design system using one of the following commands:</p>
      <CodeBlock code={installInstructions} />
      <br />
      <p>
        Once installed, the <code>node_modules/</code> directory should contain directories similar
        to following structure:
      </p>
      <CodeBlock code={directoryLayout} />
      <br />
      <br />
      <PharosHeading level={2} preset="6">
        Using Pharos components
      </PharosHeading>
      <p>
        Pharos uses{' '}
        <PharosLink href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">
          Web Components
        </PharosLink>{' '}
        to remain compatible with modern JavaScript frameworks, such as Vue or React. To accomodate
        patterns of each framework, the implementations vary slightly.
      </p>
      <p>
        You will first need to provide the scoped custom element registry to your application. This
        is generally achieved by including this script tag in the head of your application.
      </p>
      <CodeBlock
        code={`<script src="https://cdn.jsdelivr.net/npm/@webcomponents/scoped-custom-element-registry@0.0.3/scoped-custom-element-registry.min.js"></script>`}
      />
      <p>
        You then need to register components on the [custom element
        registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) for them
        to be usable in your code. To register components, you can use the `registerComponents`
        utility to define all the Pharos components your application uses, with a consistent scoping
        prefix:
      </p>
      <CodeBlock
        code={`
        import {PharosAlert, PharosButton, PharosIcon} from '@ithaka/pharos';
        import registerComponents from '@ithaka/pharos/lib/utils/registerComponents';

        registerComponents('homepage', [PharosAlert, PharosButton, PharosIcon]);
      `}
      />
      <p>
        To manually register a component, import the classes you wish to use in your application's
        entrypoint and define the custom element with a tag name in the form of{' '}
        <code>{`{app / bundle}-pharos-{component}`}</code> and a trivial subclass that extends the
        Pharos class wrapped in the <code>PharosComponentMixin</code>:
      </p>
      <CodeBlock
        code={`
        import {PharosAlert} from '@ithaka/pharos';
        import PharosComponentMixin from '@ithaka/pharos/lib/utils/mixins/pharos-component';

        customElements.define('homepage-pharos-alert', class extends PharosComponentMixin(PharosAlert) { });
      `}
      />
      <p>
        To demonstrate the usage in both Vue and React, you'll next see how to use the Button
        component.
      </p>
      <br />
      <PharosHeading level={3} preset="4">
        Pharos + React
      </PharosHeading>
      <p>
        The following code shows how to use Pharos's button component with <strong>React</strong> to
        produce a basic button, as seen below the code
      </p>
      <CodeBlock
        code={`   
        import {PharosButton} from '@ithaka/pharos/lib/react-components';
          ...

        <PharosButton>
          React button
        </PharosButton>
      `}
      />
      <br />
      <br />
      <br />
      <PharosHeading level={3} preset="4">
        Pharos + Vue
      </PharosHeading>
      <p>
        Similarly, the following code shows how to use Pharos's button component with{' '}
        <strong>Vue</strong> to produce a basic button, as seen below the code
      </p>
      <CodeBlock
        code={`
        <template>
          ...
          <pharos-button>
            Vue button
          </pharos-button>
        </template>
      `}
      />
      {/* <pharos-button>Vue Button</pharos-button> */}
      <br />
      <br />
      <PharosHeading level={3} preset="4">
        Props + Storybook
      </PharosHeading>
      <p>
        The props for each component control various parts of the component, from style to function.
        Learning which props are available for each component, along with how they interact with the
        component, is crucial in using the Pharos design system. Pharos components are fully
        documented to allow IDEs to take advantage of intellisense features, which in turn allows
        you to browse through props.
      </p>
      <p>
        For a more interactive approach to understand props, Pharos provides a{' '}
        <PharosLink href="https://storybook.js.org/">Storybook</PharosLink>. Our Storybook stories
        demonstrates the usage of props for each component, while providing the code used in the
        demonstration. Many components' stories allow you adjust the values of different props to
        preview and understand the impact of those props.
      </p>
      <PharosLink href="https://pharos.jstor.org/storybooks/wc/">
        Visit the Web Component Pharos Storybook
      </PharosLink>
      <br />
      <PharosLink href="https://pharos.jstor.org/storybooks/react/">
        Visit the React Pharos Storybook
      </PharosLink>
      <br />
      <br />
      <br />
      <br />
      <PharosHeading level={2} preset="6">
        Style with Pharos
      </PharosHeading>
      <PharosHeading level={3} preset="4">
        Using the Recommended Fonts
      </PharosHeading>
      <p>
        As part of the package, Pharos includes a few curated fonts that are integrated into
        components. To allow consistency between components and other elements, you should use these
        fonts for other parts of the site. If you want to read more about Pharos' typography,
        including guidelines for font usage scenarios, head over to the{' '}
        <PharosLink href="http://localhost:8000/brand-expressions/typography">
          typography
        </PharosLink>{' '}
        page.
      </p>
      <p>
        To use the correct fonts, start by importing them by importing{' '}
        <code>@ithaka/pharos/lib/styles/fonts.css</code> at the top level of your web app. Once
        imported, set the root body font and styles by importing{' '}
        <code>@ithaka/pharos/lib/styles/typography.scss</code>. If there are places where the body
        font is being overwritten, apply the font wherever the style is being overwritten by setting
        the <code>font-family</code> property to include either <code>GT America Standard</code>{' '}
        (generally for body) or <code>Ivar Headline</code> (generally for headers).
      </p>
      <p>
        The following examples use inline styling, but the same principles remain for other methods
        of styling.
      </p>
      <PharosHeading level={4} preset="2">
        Pharos fonts with Vue
      </PharosHeading>
      <CodeBlock
        code={`
        <script>
          ...
          import "@ithaka/pharos/lib/styles/fonts.css";
          import "@ithaka/pharos/lib/styles/typography.scss";
          ...
        </script>

        <template>
          ...
          <div class="text">
            This is an example of text with Pharos fonts.
          </div>
          ...
        </template>

        <style lang="scss">
          ...
          .text {
            font-family: GT America Standard;
          }
          ...
        </style>
      `}
      />
      <br />
      <PharosHeading level={4} preset="2">
        Pharos fonts with React
      </PharosHeading>
      <CodeBlock
        code={`
        import "@ithaka/pharos/lib/styles/fonts.css";
        import "@ithaka/pharos/lib/styles/typography.scss";

        const styleObject = {
          fontFamily: "GT America Standard"
        }

        ...  //in render method
        <div style={styleObject}>
          This is an example of text with Pharos fonts.
        </div>
        ...
      `}
      />
      <br />
      <br />
      <PharosHeading level={3} preset="4">
        Pharos Design Tokens
      </PharosHeading>
      <p>
        Pharos components use design tokens to keep values consistent for all facets of design,
        including spacing, size, and colors. These design tokens are also provided to developers
        using Pharos in order to provide assistance in creating a consistent look and feel in pages
        where both Pharos components and other elements exist.
      </p>
      <p>
        To start using the design tokens, import the{' '}
        <code>@ithaka/pharos/lib/styles/_variables.scss</code> file and use the desired token in the
        styles for your web app. You can inspect the imported file to see all the tokens and their
        corresponding values.
      </p>
      <br />
      <br />
      <PharosHeading level={2} preset="6">
        Get to know Pharos
      </PharosHeading>
      <p>
        To use Pharos efficiently, you should understand the principles and structure surrounding
        the design system. Start by getting familiarized with{' '}
        <PharosLink href="https://github.com/ithaka/pharos/blob/main/docs/development/code-structure.md">
          Code structure
        </PharosLink>{' '}
        and{' '}
        <PharosLink href="https://github.com/ithaka/pharos/blob/main/docs/development/conventions/README.md">
          Conventions
        </PharosLink>
        .{' '}
        <PharosLink href="https://github.com/ithaka/pharos/blob/main/docs/development/anatomy-of-a-component.md">
          The anatomy of components
        </PharosLink>{' '}
        covers the general structures and how-tos of components, stories and styles.
      </p>
      <p>
        Going through the{' '}
        <PharosLink href="https://github.com/ithaka/pharos/blob/main/CHANGELOG.md">
          change log
        </PharosLink>{' '}
        will help you stay up-to-date on important changes.
      </p>
      <PharosHeading level={3} preset="4">
        Brand guidelines
      </PharosHeading>
      <p>
        Learn more about JSTOR's visual language and brand expressions that create consistency and
        clarity across our experiences.
      </p>
      <PharosLink href="/brand-expressions/logos">View our brand guidelines</PharosLink>
      <br />
      <br />
      <PharosHeading level={3} preset="4">
        Contribute
      </PharosHeading>
      <p>
        Interested in contributing to the design system? Pharos is the result of collective
        contributions of code, design, and guidance—we'd love to hear your input and ideas!
      </p>{' '}
      <PharosLink href="https://github.com/ithaka/pharos">Help build Pharos</PharosLink>
      <br />
      <PharosLink href="https://github.com/ithaka/pharos/blob/main/docs/README.md">
        See the contribution guidelines
      </PharosLink>
    </>
  );
};
export default GettingStartedPage;
