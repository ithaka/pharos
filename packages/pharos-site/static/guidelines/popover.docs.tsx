import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC, ReactElement, useEffect, useState } from 'react';

const PopoverPage: FC = () => {
  const Pharos =
    typeof document !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const [PageContent, setPageContent] = useState<ReactElement | null>(null);
  useEffect(() => {
    const { PharosButton, PharosHeading, PharosLink, PharosPopover } = Pharos;

    setPageContent(
      <>
        <PageSection
          title="Popover"
          isHeader
          storyBookType="components"
          description="Popovers are lightweight overlays that display supplemental content or actions anchored to a
          triggering element, without interrupting the user's overall workflow."
        >
          <>
            <PharosButton data-popover-id="docs-popover" iconRight="chevron-down">
              Open popover
            </PharosButton>
            <PharosPopover id="docs-popover" a11yLabel="Pharos popover">
              <div style={{ padding: 'var(--pharos-spacing-1-x)' }}>
                <p>This is the popover content.</p>
              </div>
            </PharosPopover>
            {/* Since the popover is positioned with `position: fixed`, it doesn't affect
            document flow. This spacer reserves enough room below the trigger so the open
            popover doesn't visually overlap the "See live code examples" link that follows. */}
            <div aria-hidden="true" style={{ height: 'var(--pharos-spacing-5-x)' }} />
          </>
        </PageSection>
        <PageSection topMargin title="Usage">
          <PageSection title="Overview" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <p>
                Popovers anchor supplemental content or actions to a triggering element, such as a
                button or icon. They can be opened by a click or, optionally, by hovering the
                trigger. Popovers automatically reposition themselves to remain visible within the
                viewport.
              </p>
            </div>
          </PageSection>
          <PageSection title="When to Use" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <ul>
                <li>
                  To display a small amount of supplemental content tied to a specific trigger
                </li>
                <li>To present a short list of contextual actions, such as a menu</li>
                <li>
                  When information doesn't warrant a full modal or sheet, but still needs to be
                  called out from the rest of the page
                </li>
              </ul>
            </div>
          </PageSection>
        </PageSection>
        <PageSection title="Best practices">
          <BestPractices
            Do={
              <ul>
                <li>Use for small amounts of contextual content or a short list of actions</li>
                <li>Anchor the popover to the element that triggered it</li>
                <li>
                  Allow the popover to be dismissed by clicking outside of it or pressing Escape
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>Don't use for large amounts of content—use a modal or sheet instead</li>
                <li>Don't nest popovers inside other popovers</li>
                <li>
                  Don't use a popover for content that's critical to completing a primary task
                </li>
              </ul>
            }
          />
        </PageSection>
        <PageSection title="Content guidelines">
          <PageSection title="Popover content" subSectionLevel={1} lessMargin>
            Keep popover content short and focused. It can include text, links, or a small set of
            actions relevant to the trigger that opened it.
          </PageSection>
        </PageSection>
        <PageSection title="Variants">
          <PageSection title="Dark background" subSectionLevel={1} lessMargin>
            Use the <code>is-on-background</code> attribute when the popover's trigger sits on a
            dark background, so the popover's styling remains legible in context.
          </PageSection>
        </PageSection>
        <PageSection title="Accessibility">
          <PageSection title="Relevant WCAG guidelines" subSectionLevel={1} lessMargin>
            <ul>
              <li>
                <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html">
                  2.1.1 Keyboard A
                </PharosLink>
              </li>
              <li>
                <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html">
                  1.4.13 Content on Hover or Focus AA
                </PharosLink>
              </li>
            </ul>
          </PageSection>
          <PageSection title="Importance" subSectionLevel={1} lessMargin>
            Popovers should not open automatically. Users should always initiate opening a popover
            via an explicit action, and focus should move into the popover contents when opened so
            keyboard and screen reader users can interact with it.
          </PageSection>
          <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
            <ul>
              <li>
                The trigger element has <code>aria-haspopup="true"</code> and{' '}
                <code>aria-controls</code> pointing to the popover's id
              </li>
              <li>
                The popover uses <code>a11y-label</code> or <code>labelled-by</code> to provide an
                accessible name
              </li>
              <li>
                Focus is trapped within the popover while it is open; no elements behind it should
                be reachable via keyboard
              </li>
              <li>When the popover closes, focus is returned to the element that triggered it</li>
            </ul>
          </PageSection>
          <PageSection title="Expected actions" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
              <PharosHeading level={4} preset={'1--bold'}>
                Screen reader
              </PharosHeading>
              <ul>
                <li>Announces the focused element within the popover contents when it opens</li>
              </ul>
            </div>
            <PharosHeading level={4} preset={'1--bold'}>
              Keyboard
            </PharosHeading>
            <ul>
              <li>
                <kbd>Enter</kbd> / <kbd>Space</kbd>: opens the popover when the trigger has focus
              </li>
              <li>
                <kbd>Tab</kbd>: moves focus forward within the popover
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: moves focus to the previous element in the tab
                order
              </li>
              <li>
                <kbd>Esc</kbd>: closes the popover
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </>
    );
  }, [Pharos]);

  return PageContent;
};
export default PopoverPage;
