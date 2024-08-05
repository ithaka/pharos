import PageSection from '../../../components/statics/PageSection.tsx';
import pdf from '../../../../static/files/documentations/documentation-template.pdf';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const DocumentationPage: FC = () => {
  return (
    <>
      <PageSection
        title="Contributing documentation"
        description="For all Pharos components and elements, contributors create useful, thorough documentation to provide an understanding of its proper usage and context."
        isHeader
      ></PageSection>

      <PageSection
        title="Importance"
        description="Documentation is essential to upholding quality and cohesion.
    Articulate and thorough documentation allows for users and contributors to acquire knowledge more efficiently, motivating further contribution and information sharing.
    Referring to documentation helps to reduce redundancy in components and features while ensuring all implemented features are being used appropriately and to their
    fullest potential."
      ></PageSection>

      <PageSection
        title="When documentation is needed"
        description="When a new component or feature is added, supporting documentation should be written to communicate and provide guidelines for its proper usage.
    Additionally, if changes are made to existing components that affect their usage or functionality, the documentation should reflect these changes."
      ></PageSection>

      <PageSection title="Writing documentation">
        <PageSection title="Getting started" subSectionLevel={1}>
          <p>
            To get started, use the <PharosLink href={pdf}>documentation template</PharosLink> to
            ensure all needed sections are included and consistent.
          </p>
        </PageSection>
        <PageSection title="Writing guidelines" subSectionLevel={1}>
          <p>
            Please refer to the{' '}
            <PharosLink href="/content-style-guide/voice-and-tone">
              JSTOR content style guide
            </PharosLink>{' '}
            to gain a better understanding of our collective writing style and structure. We apply
            our writing principles when creating documentation.
          </p>
          <PharosHeading level={4} preset={'2'}>
            Concise
          </PharosHeading>
          <p>
            The way we write is simple and direct, and for all reading levels. It should be
            understandable by anyone regardless of their culture, language, or ability. We aim to
            provide the right amount of context so our users know how to use Pharos components or
            elements successfully.
          </p>
          <PharosHeading level={4} preset={'2'}>
            Consistent
          </PharosHeading>
          <p>
            We use the same template for each of the components to create predictability in
            understanding their purpose, standards, and variations. We also aim to use consistent
            language in all documentation so users experience a seamless transition as they make
            their way through the site.
          </p>
          <PharosHeading level={'4'} preset={'2'}>
            Style
          </PharosHeading>
          <p>
            Wherever possible, write headings and titles in sentence case — studies indicate that
            sentence case is easier to read, plus title case can come across as heavy and overly
            serious.
          </p>
        </PageSection>
        <PageSection title="Documentation categories" subSectionLevel={1}>
          <PharosHeading level={4} preset={'2'}>
            Title
          </PharosHeading>
          <p>Title of the Component (singular)</p>
          <PharosHeading level={4} preset={'2'}>
            Deck
          </PharosHeading>
          <p>Tweet-length description of the component and its purpose.</p>
          <PharosHeading level={4} preset={'2'}>
            Usage
          </PharosHeading>
          <p>
            Explain the implementation of the element (e.g. orientation, placement, use cases).
            Indicate any behavior that a user would need to know that should happen when using this
            component in their UI.
          </p>
          <PharosHeading level={4} preset={'2'}>
            Best practices
          </PharosHeading>
          <PharosHeading level={4} preset={'1--bold'}>
            Do's
          </PharosHeading>
          <p>
            Explain appropriate use cases for the component, general guidelines to follow when
            using, and other considerations that should be made in the component's usage.
          </p>
          <PharosHeading level={4} preset={'1--bold'}>
            Don'ts
          </PharosHeading>
          <p>
            Include common misuse cases for the component, common errors made in its usage, and
            other actions to avoid.
          </p>
          <PharosHeading level={4} preset={'2'}>
            Content guidelines (If applicable)
          </PharosHeading>
          <p>
            If a component has content, please include guidelines for how the content should be
            written for the needs of the component (e.g., how labels should be written).
          </p>
          <PharosHeading level={4} preset={'2'}>
            Variants (If applicable)
          </PharosHeading>
          <p>
            If a component has variants, display an example of the Pharos variant along with their
            title, purposes, and use cases (e.g. Error, Warning, Info, and Success Alerts).
          </p>
          <PharosHeading level={4} preset={'2'}>
            States (If applicable)
          </PharosHeading>
          <p>
            If a component has multiple states (e.g. disabled, enabled, error, required), please
            include them. Include an example of the component in each state.
          </p>
          <PharosHeading level={4} preset={'2'}>
            Accessibility
          </PharosHeading>
          <PharosHeading level={4} preset={'1--bold'}>
            Relevant guidelines
          </PharosHeading>
          <p>Include any WCAG guidelines that are applicable to the component for reference.</p>
          <PharosHeading level={4} preset={'1--bold'}>
            Visual expectations
          </PharosHeading>
          <p>
            If a component has any design elements that are specifically for accessibility reasons
            add that here. This section will not always appear as previous sections in the
            documentation may cover this content.
          </p>
          <PharosHeading level={4} preset={'1--bold'}>
            Code expectations
          </PharosHeading>
          <p>
            Outlines any code needed to successfully implement the component. Semantic elements
            should be indicated with <code>&lt;code&gt;</code> tags for clarity. In addition,
            include any important points pertaining to implementation.
          </p>
          <PharosHeading level={4} preset={'1--bold'}>
            Expected actions
          </PharosHeading>
          <p>
            Include any relevant keyboard commands and their behavior. There also needs to be a
            screen reader section, which should list what to expect audibly when interacting with a
            component.
          </p>
        </PageSection>
      </PageSection>
    </>
  );
};
export default DocumentationPage;
