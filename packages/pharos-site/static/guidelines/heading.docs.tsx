import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';

<>
  <PageSection
    isHeader
    title="Heading"
    description="Headings are used as the titles or labels of each major section of a page that make up the UI."
    storyBookType="components"
  ></PageSection>
  <PharosHeading level={2}>Examples</PharosHeading>
  ```jsx live
  <PharosHeading level={'1'} preset={'7'}>
    I am a heading
  </PharosHeading>
  ```{' '}
  <PageSection topMargin title="Usage">
    <p>
      Headings allow users to easily distinguish content sections on the page. The Heading component
      allows you to easily select and implement the appropriate heading style for the layout and
      structure of your page.
    </p>
    <p>
      Pharos Headings are not used for style alone. We've created a component that separates the
      semantic structure needs, "levels", from the styling needs, "presets."
    </p>
    <p>
      The "level" prop designates the heading level (h1, h2, h3, etc.) needed to create a logical
      information hierarchy. When using assistive technology, users often utilize headings to
      navigate the page's content quickly. Headings must be semantically tagged so that a screen
      reader can both identify headings when reading a page, or pull up a list of all the page's
      headings.
    </p>
    <p>
      The "preset" prop provides specific styles of the heading text to create visual hierarchy that
      allow users to easily scan pages and content. This includes line-height, font-family,
      font-sizes, letter-spacing and font weight.
    </p>
    <PharosHeading level={'2'} preset={'1--bold'}>
      Related
    </PharosHeading>
    JSTOR uses design tokens to set the typography styling in JSTOR's products. To learn more about
    other typography styles for the product, see our{' '}
    <PharosLink href="/brand-expressions/typography">typography brand expression page.</PharosLink>
  </PageSection>{' '}
  <PageSection topMargin title="Typeface">
    <p>
      JSTOR's brand utilizes two typefaces: GT America and Ivar Headline. We use a mix of both to
      express our heading styles.
    </p>
  </PageSection>{' '}
  <div style={{ marginBottom: 'var(--pharos-spacing-5-x)' }}>
    <PharosHeading level={'2'} preset={'3'}>
      Ivar Headline
    </PharosHeading>
    <PharosHeading level={'2'} preset={'3--bold'}>
      Ivar Headline Medium
    </PharosHeading>
    <PharosHeading level={'2'} preset={'4'}>
      GT America
    </PharosHeading>
    <PharosHeading level={'2'} preset={'4--bold'}>
      GT America Medium
    </PharosHeading>
  </div>{' '}
  <PharosHeading
    level={'2'}
    preset={'6'}
    style={{ marginBottom: 'var(--pharos-spacing-1-x)', color: 'var(--pharos-color-text-base)' }}
  >
    Presets
  </PharosHeading>
  | | | |
  ------------------------------------------------------------------------------------------------ |
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  | |{' '}
  <PharosHeading level={'1'} preset={'2'}>
    JSTOR is for the intellectually curious
  </PharosHeading>{' '}
  | <strong>Preset="2"</strong> | | |{' '}
  <ul>
    <li>typeface: GT America Standard</li>
    <li>font-size: 20px</li>
    <li>font-weight: Regular (400)</li>
    <li>letter-spacing: -2%</li>
  </ul>{' '}
  | |{' '}
  <PharosHeading level={'1'} preset={'3'}>
    JSTOR is for the intellectually curious
  </PharosHeading>{' '}
  | <strong>Preset="3"</strong> | | |{' '}
  <ul>
    <li>Typeface: GT America Standard</li> <li>Font-size: 24px</li> <li>Line-height: 28px</li>{' '}
    <li>font-weight: Regular (400)</li> <li>letter-spacing: -2%</li>
  </ul>{' '}
  | |{' '}
  <PharosHeading level={'1'} preset={'4'}>
    JSTOR is for the intellectually curious
  </PharosHeading>{' '}
  | <strong>Preset="4"</strong> | | |{' '}
  <ul>
    <li>Typeface: Ivar Headline</li> <li>font-size: 24px</li> <li>Line-height: 28px</li>{' '}
    <li>font-weight: Regular (400)</li> <li>letter-spacing: -1%</li>
  </ul>{' '}
  | |{' '}
  <PharosHeading level={'1'} preset={'5'}>
    JSTOR is for the intellectually curious{' '}
  </PharosHeading>{' '}
  | <strong>Preset="5"</strong> | | |{' '}
  <ul>
    <li>Typeface: GT America Standard</li> <li>Font-size: 32px</li> <li>Line-height: 36px</li>{' '}
    <li>font-weight: Regular (400)</li> <li>letter-spacing: -2%</li>
  </ul>{' '}
  | |{' '}
  <PharosHeading level={'1'} preset={'6'}>
    JSTOR is for the intellectually curious
  </PharosHeading>{' '}
  | <strong>Preset="6"</strong> | | |{' '}
  <ul>
    <li>Typeface: Ivar Headline</li> <li>Font-size: 32px</li> <li>Line-height: 36px</li>{' '}
    <li>font-weight: Regular (400)</li> <li>letter-spacing: -2%</li>
  </ul>{' '}
  | |{' '}
  <PharosHeading level={'1'} preset={'7'}>
    JSTOR is for the intellectually curious
  </PharosHeading>{' '}
  | <strong>Preset="7"</strong>
  <ul>
    <li>Typeface: Ivar Headline</li> <li>font-size: 54px</li> <li>line-height: 1</li>{' '}
    <li>font-weight: Regular (400)</li> <li>letter-spacing: -2%</li>
  </ul>{' '}
  |{' '}
  <div style={{ marginBottom: 'var(--pharos-spacing-5-x)' }}>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading
        level={'3'}
        preset={'legend'}
        style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
      >
        Regular weight presets
      </PharosHeading>
      <PharosHeading level={'4'} preset={'7'}>
        Heading Preset 7
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'6'}
        style={{ marginBottom: 'var(--pharos-spacing-one-half-x)' }}
      >
        Heading Preset 6
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'5'}
        style={{ marginBottom: 'var(--pharos-spacing-one-quarter-x)' }}
      >
        Heading Preset 5
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'4'}
        style={{ marginBottom: 'var(--pharos-spacing-one-half-x)' }}
      >
        Heading Preset 4
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'3'}
        style={{ marginBottom: 'var(--pharos-spacing-one-half-x)' }}
      >
        Heading Preset 3
      </PharosHeading>
      <PharosHeading level={'4'} preset={'2'}>
        Heading Preset 2
      </PharosHeading>
    </div>
    <div>
      <PharosHeading
        level={'3'}
        preset={'legend'}
        style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
      >
        Bold weight presets
      </PharosHeading>
      <PharosHeading level={'4'} preset={'7--bold'}>
        Heading Preset 7--bold
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'5--bold'}
        style={{ marginBottom: 'var(--pharos-spacing-one-half-x)' }}
      >
        Heading Preset 5--bold
      </PharosHeading>
      <PharosHeading
        level={'4'}
        preset={'1--bold'}
        style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
      >
        Heading Preset 1--bold
      </PharosHeading>
      <PharosHeading level={'4'} preset={'legend'}>
        Heading Preset Legend
      </PharosHeading>
    </div>
  </div>{' '}
  <div style={{ marginBottom: 'var(--pharos-spacing-5-x)' }}>
    <PharosHeading level={'2'} preset={'6'} style={{ color: 'var(--pharos-color-text-base)' }}>
      Styling
    </PharosHeading>
    <PharosHeading level={'3'} preset={'2'} style={{ color: 'var(--pharos-color-text-base)' }}>
      Selecting the right presets
    </PharosHeading>
    <p>
      For headings and titles, always try our serif heading presets (Ivar) first because elevates
      the content, beautifies the page, and helps with scannability when paired with our sans-serif
      typeface.
    </p>
    <ul style={{ color: 'black' }}>
      <li>
        When the heading size needs to be larger than 24px in size (preset 3, 4), use our serif
        presets (5, 7) to style the headings.
      </li>
      <li>
        When pairing presets, do not use the same size presets together to create a better visual
        hierarchy.
      </li>
      <li>
        Do not use the --bold and non-bold versions of the same preset to create hierarchy, use
        different presets to do this.
      </li>
      <li>
        We use the --bold prop sparingly to better establish visual hierarchy with page headers,
        heroes and marketing headings (when applicable). Only use with presets 1, 5, and 7.
      </li>
      <li>
        When using Heading preset 1, use the --bold tag to help differentiate it from body copy.
      </li>
    </ul>
  </div>{' '}
  <PageSection title="Best Practices">
    <BestPractices
      Do={
        <ul>
          <li>
            Include a level number (between 1 and 6) to create semantic hierarchy, all headings need
            to semantically tagged so that a screen reader can identify them when reading a page, or
            be able pull up a list of all the page headings
          </li>
          <li>Include only one level="1" (h1) per page</li>
          <li>Place headings at the top of their related section</li>
          <li>Clearly describe the content they refer to</li>
          <li>Support the hierarchy and structure of the page</li>
        </ul>
      }
      Dont={
        <ul>
          <li>
            Don't use heading tags to resize normal text, use our type-scale and font-family design
            tokens instead
          </li>
          <li>Don't skip heading levels, begin with level="1" (h1), level="2" (h2), and so on</li>
        </ul>
      }
    />
  </PageSection>{' '}
  <div style={{ marginBottom: 'var(--pharos-spacing-5-x)' }}>
    <PharosHeading level={'2'} preset={'6'} style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
      Content guidelines
    </PharosHeading>
    <p>
      Headings and subheadings help organize the content. They identify sections and groupings of
      content to make it easy for readers to scan. Headings are also important for accessibility, as
      they are used to navigate the page.
    </p>
    <p>
      The heading and subheadings should provide a glimpse of what is the most important aspect of
      the information that follows. Organize them by level (e.g., level="1" &gt; level="2" &gt;
      level="3") corresponding to the content they're covering (main topic &gt; aspect of that topic
      &gt; finer points).
    </p>
    <p>
      When writing content for headings, avoid repeating words at the beginning of each heading.
      This increases the difficulty of scanning because the user first has to read the repeated
      word(s) before getting to new information. Also, Whenever possible, write headlines in
      sentence case.
    </p>
  </div>
  <div style={{ marginBottom: 'var(--pharos-spacing-5-x)' }}>
    <PharosHeading level={'2'} preset={'6'} style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
      Accessibility
    </PharosHeading>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={'3'} preset={'2'}>
        Relevant WCAG Guidelines
      </PharosHeading>
      <ul style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
        <li>
          <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
            1.3.1 Info and Relationships A
          </PharosLink>
        </li>
        <li>
          <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks">
            2.4.1 Bypass Blocks A
          </PharosLink>
        </li>
        <li>
          <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels">
            2.4.6 Headings and Labels AA
          </PharosLink>
        </li>
      </ul>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={'3'} preset={'2'}>
        Importance
      </PharosHeading>
      For screen reader users, headings describe relationships between sections and subsections.
      They provide both an outline and a means of navigation. Without headings, users have to step
      through every single element in turn, to get from one place to another.
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={'3'} preset={'2'}>
        Visual expectations
      </PharosHeading>
      Color contrast of text to background should use WCAG 2.1 AA standards is 4.5:1, except, large
      text only needs 3:1.
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
      <PharosHeading level={'3'} preset={'2'}>
        Code expectations
      </PharosHeading>
      <p>Each page starts with a level="1" (h1), and Heading levels should go in a logical order</p>
      <p> For example:</p>
      <ul>
        <li>
          level="1" <strong>Foods</strong>
        </li>
        <ul>
          <li>
            level="2" <strong>Fruit</strong>
          </li>
          <ul>
            <li>
              level="3" <strong>Apples</strong>
            </li>
            <ul>
              <li>
                level="4" <strong>Honeycrisp</strong>
              </li>
            </ul>
          </ul>
        </ul>
      </ul>
    </div>
    <div>
      <PharosHeading level={'3'} preset={'2'}>
        Expected actions
      </PharosHeading>
      <PharosHeading level={'4'} preset={'1--bold'}>
        For screen reader users, headings...
      </PharosHeading>
      <ul>
        <li>describe relationships between sections and subsections.</li>
        <li>
          must be semantically "tagged" so that a screen reader can both identify headings when
          reading a page and pull up a list of all the page headings.
        </li>
        <li>
          allow users to quickly scan a page. According to a WebAIM survey, two-thirds of
          screen-reader users scan headings as the first step of trying to find information on a
          long web page.
        </li>
      </ul>
    </div>
  </div>
</>;
