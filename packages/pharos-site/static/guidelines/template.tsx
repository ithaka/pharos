// <!--
//   This is a template to create a page for components.
//   It should not be linked to on the site in any way or form.
// -->

import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const TemplatePage: FC = () => {
  return (
    <>
      <PageSection isHeader title="" description="" storyBookType=""></PageSection>

      <PageSection title="Usage"></PageSection>

      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li></li>
            </ul>
          }
          Dont={
            <ul>
              <li></li>
            </ul>
          }
        />
      </PageSection>

      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title=""></PageSection>
      </PageSection>

      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="">
          <p></p>
        </PageSection>
      </PageSection>

      <PageSection title="State">
        <PageSection subSectionLevel={1} title="">
          <p></p>
          <Canvas>
            <PharosLink href="#">I am a link</PharosLink>
          </Canvas>
        </PageSection>
      </PageSection>

      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li></li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <p></p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Visual expectations">
          <p></p>
          <ul>
            <li></li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li></li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <p></p>
            <ul>
              <li></li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <kbd>Enter</kbd>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TemplatePage;
