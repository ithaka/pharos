import { PharosLink } from '@ithaka/pharos/lib/react-components';
import PageSection from '../../src/components/statics/PageSection.tsx';
import { FC } from 'react';

const FaqPage: FC = () => {
  return (
    <>
      <PageSection isHeader title="Pharos FAQ" />

      <PageSection title="How can Pharos help my development?" subSectionLevel={2}>
        <p>
          Pharos contains visual and behavioral components that are consistent with our design
          decisions out of the box.
        </p>
      </PageSection>

      <PageSection title="What do I do if I still run into issues?" subSectionLevel={2}>
        <p>
          Give us the gift of feedback! When you run into issues it's important that you be vocal
          about it and not let that inhibit or discourage you from adopting Pharos. We need your
          help to identify the gaps and sincerely welcome feedback no matter how tough it is.
        </p>
        <p>
          You can start providing feed back via{' '}
          <PharosLink href="https://github.com/ithaka/pharos/issues">GitHub issues</PharosLink>. For
          more on dealing with issues, check out the{' '}
          <PharosLink href="https://pharos.jstor.org/contributing/development">
            contribution guide
          </PharosLink>
          .
        </p>
      </PageSection>

      <PageSection
        title="What are the risks of adopting components late or infrequently? How will we manage this?"
        subSectionLevel={2}
      >
        <p>
          Design systems help bring consistency to platforms, so falling behind may result in
          duplication of effort in replicating styles and behaviors. It may also result in more
          catch up. Finally, if you're on an unsupported version of Pharos you may not benefit from
          the latest bug and security fixes.
        </p>
        <p>
          We'll be managing this by developing a support policy, using semantic versioning, and
          communicating changes through change logs and discussions.
        </p>
      </PageSection>

      <PageSection
        title="I expected Pharos components to make my page more performant, but they made my bundle bigger. Why is that happening?"
        subSectionLevel={2}
      >
        <p>
          The Pharos core package delivers components that are{' '}
          <PharosLink href="https://webpack.js.org/guides/tree-shaking/">tree shakable</PharosLink>,
          so that you can be sure you only end up with the code you need. To benefit from tree
          shaking, though, you may need to update your build process to match it.
        </p>
      </PageSection>

      <PageSection
        title="I don't know enough about components before trying to use them. How can I find out more?"
        subSectionLevel={2}
      >
        <p>
          We're continuously working on the documentation—for both{' '}
          <PharosLink href="https://pharos.jstor.org/storybook/?path=/story/pharos-10-1-0-intro--page">
            development
          </PharosLink>{' '}
          and <PharosLink href="https://pharos.jstor.org">design</PharosLink>—to make sure it's
          accurate and thorough. If you find that a component isn't documented properly or
          thoroughly, please communicate how it can be improved.
        </p>
      </PageSection>
    </>
  );
};
export default FaqPage;
