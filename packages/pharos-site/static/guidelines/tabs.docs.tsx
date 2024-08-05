import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import {
  PharosHeading,
  PharosLink,
  PharosTab,
  PharosTabPanel,
  PharosTabs,
} from '@ithaka/pharos/lib/react-components';

const TabsPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Tabs"
        description="Tabs are used to quickly navigate between views within the same context or page. Each tab's content is independently categorized and mutually exclusive of the content of other tabs."
      >
        <PharosTabs>
          <PharosTab id="tab-1" data-panel-id="letters-panel">
            Letters
          </PharosTab>
          <PharosTab id="tab-2" data-panel-id="numbers-panel">
            Numbers
          </PharosTab>
          <PharosTab id="tab-3" data-panel-id="punctuation-panel">
            Punctuations
          </PharosTab>
          <PharosTabPanel id="letters-panel" slot="panel">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </PharosTabPanel>
          <PharosTabPanel id="numbers-panel" slot="panel">
            1234567890
          </PharosTabPanel>
          <PharosTabPanel id="punctuation-panel" slot="panel">
            !@#$%^&*()
          </PharosTabPanel>
        </PharosTabs>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Use tabs to provide a way to switch between various related content that are grouped by
          logical connection in a single space. Tabs on narrow screens become a
          horizontally-scrollable area.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use tabs for sets of information that are related</li>
              <li>Use short and concise text to label a tab</li>
              <li>Use the Tab and Tab Panel component inside the Pharos Tabs component</li>
              <li>Set the slot attribute on Tab Panel components to "panel"</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Don't use tabs for sets of information that need to be accessed simultaneously
              </li>
              <li>Don't have only a single tab</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection title="Panel" subSectionLevel={1}>
          <ul>
            <li>The content shown in the panels should have a logical connection to each other.</li>
          </ul>
        </PageSection>
        <PageSection title="Tab" subSectionLevel={1}>
          <ul>
            <li>
              The text used for a tab should aim to be a single categorical word that explains the
              section of the overall content being viewed when selected.
            </li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="States">
        <PageSection title="Tab" subSectionLevel={1}>
          <PharosHeading level={'4'} preset={'1--bold'}>
            Selected
          </PharosHeading>
          <ul>
            <li>The content shown in the panels should have a logical connection to each other.</li>
          </ul>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection title="Relevant WCAG guidelines" subSectionLevel={1} lessMargin>
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html">
                2.1.1 Keyboard
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection title="Importance" subSectionLevel={1} lessMargin>
          Tabs allow users to navigate through multiple sections of content easily
        </PageSection>
        <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
          Via <PharosLink href="https://www.w3.org/TR/wai-aria-practices/#tabpanel">W3</PharosLink>:
          <ul>
            <li>
              Element that is the container for the tab set has <code>role="tablist"</code>
              <ul>
                <li>
                  The container element should also have an aria-label that describes the title or
                  purpose of the grouping
                </li>
              </ul>
            </li>
            <li>
              Each individual element has <code>role="tab"</code>
              <ul>
                <li>Should be located within the container</li>
              </ul>
            </li>
            <li>
              The content section that populates when the tab is selected has{' '}
              <code>role="tabpanel"</code>
            </li>
            <li>
              Each element with <code>role="tabpanel"</code> has the property{' '}
              <code>aria-labelledby</code> referring to its associated tab element
            </li>
            <li>
              If tab list has visible label
              <ul>
                <li>
                  The element with <code>role="tablist"</code> has <code>aria-labelledby</code> be
                  the same as the value that refers to the labelling element
                </li>
              </ul>
            </li>
            <li>
              If tab list has no visible label
              <ul>
                <li>Tablist element has label provided by an aria-label</li>
              </ul>
            </li>
            <li>
              Each element with <code>role="tab"</code> has the property <code>aria-controls</code>
              referring to its associated "tabpanel" element
            </li>
            <li>
              The tab in focus has <code>aria-selected="true"</code> and the others are labeled
              "false"
            </li>
          </ul>
        </PageSection>
        <PageSection title="Expected actions" subSectionLevel={1} lessMargin>
          <div style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
            <PharosHeading level={4} preset={'1--bold'}>
              Screen reader
            </PharosHeading>
            <ul>
              <li>
                On first element it will read: "Name of tab, selected, tab, 1 of &lt;total tabs&gt;,
                &lt;Title of grouping&gt;, tab group" where the title of the grouping is provided by
                the
                <code>aria-label</code> attribute on the tab container element
              </li>
              <li>
                On second element (and any tabs after) it will read: "Name of tab, selected, 2 of
                &lt;total tabs&gt;"
              </li>
            </ul>
          </div>
          <PharosHeading level={4} preset={'1--bold'}>
            Keyboard
          </PharosHeading>
          <ul>
            <li>
              <kbd>Tab</kbd>: Moves from tab to correlating panel
            </li>
            <li>
              <kbd>Shift</kbd>+<kbd>Tab</kbd>: Moves from panel to correlating tab
            </li>
            <li>
              <kbd>→</kbd>
              <kbd>↓</kbd>: Cycles forwards through tabs horizontally and vertically, respectively.
            </li>
            <li>
              <kbd>←</kbd>
              <kbd>↑</kbd>: Cycles backwards through tabs horizontally and vertically, respectively.
            </li>
            <li>
              <kbd>Space</kbd>
              <kbd>Enter</kbd>: activates the tab (if not automatically activated)
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TabsPage;
