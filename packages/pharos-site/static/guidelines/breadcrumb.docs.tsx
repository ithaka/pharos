import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import {
  PharosBreadcrumb,
  PharosBreadcrumbItem,
  PharosLink,
} from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const BreadcrumbPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Breadcrumb"
        description="The breadcrumb component is a secondary navigational pattern that allows users to move between
      and obtain context of various levels of hierarchy."
      >
        <>
          <PharosBreadcrumb>
            <PharosBreadcrumbItem href="#">
              Mouse Over or Focus to See the Full Text of Long Content Which Are Truncated
            </PharosBreadcrumbItem>
            <PharosBreadcrumbItem href="#">Short Texts Will Not</PharosBreadcrumbItem>
            <PharosBreadcrumbItem>The Current Place</PharosBreadcrumbItem>
          </PharosBreadcrumb>
        </>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="Breadcrumbs are effective when content is organized in a hierarchy of more than two levels,
      providing context for the user's location."
      ></PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use relevant portions of page titles as their link text.</li>
              <li>
                Use clear, concise and consistent organization of pages for pathing or showing the
                location of the content being shown in the breadcrumb.
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use breadcrumbs as the primary form of navigation.</li>
              <li>Don't use breadcrumb-items outside of the breadcrumb component.</li>
            </ul>
          }
        />
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection title="What's built in" subSectionLevel={1}>
          <ul>
            <li>
              Ensures component uses the correct semantic <code>nav</code> element with an{' '}
              <code>aria-label="breadcrumb"</code>.
            </li>
            <li>
              Utilized <code>ol</code> to programmatically group each breadcrumb item in the list.
            </li>
            <li>
              Each listitem has <code>role="listitem"</code> to ensure that the list association is
              properly conveyed.
            </li>
            <li>
              Provides built-in focus styles that meet WCAG contrast and visibility requirements.
            </li>
            <li>Truncated text can be exposed via hover or keyboard focus.</li>
          </ul>
        </PageSection>
        <PageSection title="Considerations" subSectionLevel={1}>
          <PageSection title="Design" subSectionLevel={2}>
            <ul>
              <li>
                Breadcrumb placement is consistent across the site and is placed above the main
                content area.
              </li>
              <li>Ensure the breadcrumb is not used as a primary navigation element.</li>
            </ul>
          </PageSection>
          <PageSection title="Development" subSectionLevel={2}>
            <ul>
              <li>
                Verify the <code>pharos-breadcrumb-item</code> has a valid <code>href</code>{' '}
                attribute.
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Importance"
          description="Helps users understand where in the site they currently are visiting"
        />
        <PageSection
          subSectionLevel={1}
          title="Visual expectations"
          description="A trail of links pertaining to parental content separated by forward slashes"
        />
        <PageSection title="Expected actions" subSectionLevel={1}>
          <PageSection
            title="Screen reader"
            subSectionLevel={2}
            description="Reads links in breadcrumb in order"
          />
          <PageSection title="Keyboard" subSectionLevel={2}>
            <ul>
              <li>Links in breadcrumb are focused in order with tab</li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Relevant best practices and WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/">
                Breadcrumb pattern from WAI-ARIA Authoring Practices
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html">
                4.1.2: Name, Role, Value (Level A)
              </PharosLink>
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default BreadcrumbPage;
