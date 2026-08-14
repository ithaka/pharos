import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC, ReactElement, useEffect, useState } from 'react';
import type { PharosSheet as PharosSheetType } from '@ithaka/pharos/';

const SheetPage: FC = () => {
  const Pharos =
    typeof document !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const [PageContent, setPageContent] = useState<ReactElement | null>(null);
  // An internal dependency of Pharos references document, so we need to set the page content in a useEffect to build it with SSR
  useEffect(() => {
    const { PharosHeading, PharosButton, PharosSheet, PharosLink } = Pharos;

    setPageContent(
      <>
        <PageSection
          title="Sheet"
          isHeader
          storyBookType="components"
          description="Sheets are mobile-focused overlay panels that slide up from the bottom of the screen.
          They are used to present supplemental content or actions without fully navigating away from the
          current context."
        >
          <>
            <PharosButton
              onClick={() => {
                const sheet = document.querySelector(
                  '[data-pharos-component="PharosSheet"]'
                ) as PharosSheetType;
                sheet.open = true;
              }}
              iconRight="chevron-down"
            >
              Open sheet
            </PharosButton>
            <PharosSheet hasClose header="Example sheet">
              <p>This is the sheet body content.</p>
            </PharosSheet>
          </>
        </PageSection>
        <PageSection topMargin title="Usage">
          <PageSection title="Overview" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <p>
                Sheets are overlay panels that emerge from the bottom of the viewport. They are
                primarily designed for mobile and touch-based interactions, allowing users to view
                supplemental content or take contextual actions without losing their place in the
                page.
              </p>
              <p>
                Sheets support drag-to-expand behavior, allowing users to reveal more content by
                dragging the handle upward. They can also be configured to dock in place rather than
                fully close.
              </p>
            </div>
          </PageSection>
          <PageSection title="When to Use" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <ul>
                <li>
                  To present supplemental content or options related to the current page without
                  navigating away
                </li>
                <li>
                  When a lightweight overlay is needed on mobile that does not obscure the full
                  screen
                </li>
                <li>For filter panels, quick-actions menus, or contextual details</li>
                <li>When a docked persistent panel is needed at the bottom of the viewport</li>
              </ul>
            </div>
          </PageSection>
        </PageSection>
        <PageSection title="Best practices">
          <BestPractices
            Do={
              <ul>
                <li>
                  Use for supplemental, contextual content that does not require a full page
                  transition
                </li>
                <li>
                  Provide a clear way to dismiss the sheet (drag handle, close button, or overlay
                  tap)
                </li>
                <li>
                  Keep sheet content focused and avoid overwhelming the user with too much
                  information
                </li>
                <li>
                  Use the docked variant when the sheet should remain visible as a persistent bottom
                  panel
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>
                  Don't use sheets for primary navigation or content that requires its own page
                </li>
                <li>Don't nest sheets inside other overlay components such as modals or dialogs</li>
                <li>
                  Don't place critical, irreversible actions inside a sheet without confirmation
                </li>
              </ul>
            }
          />
        </PageSection>
        <PageSection title="Content guidelines">
          <PageSection title="Sheet header" subSectionLevel={1} lessMargin>
            The sheet header should briefly describe the content or purpose of the sheet. It should
            be written in sentence case and be concise. Punctuation is generally not needed in
            headers.
          </PageSection>
          <PageSection title="Sheet body" subSectionLevel={1} lessMargin>
            The body can contain any content, including text, form elements, lists, or interactive
            components. Keep the content relevant to the context that triggered the sheet.
          </PageSection>
        </PageSection>
        <PageSection title="Variants">
          <PageSection title="Base" subSectionLevel={1} lessMargin>
            The default sheet slides up from the bottom. It can be dismissed by tapping the overlay,
            dragging it down, or pressing Escape. The handle at the top allows the user to drag and
            expand the sheet.
          </PageSection>
          <PageSection title="With close button" subSectionLevel={1} lessMargin>
            Use the <code>has-close</code> attribute to render an explicit close button in the sheet
            header. Useful when it is important to give users a clear, visible affordance for
            dismissal.
          </PageSection>
          <PageSection title="Expanded" subSectionLevel={1} lessMargin>
            The sheet opens in its fully expanded state when the <code>expanded</code> attribute is
            set. Use this when the content requires more vertical space by default.
          </PageSection>
          <PageSection title="Docked" subSectionLevel={1} lessMargin>
            A docked sheet persists at the bottom of the screen rather than closing when the overlay
            is tapped. Tapping the trigger again expands the sheet to its full height. Use the{' '}
            <code>docked</code> attribute to enable this behavior.
          </PageSection>
          <PageSection title="Omit overlay" subSectionLevel={1} lessMargin>
            Use <code>omit-overlay</code> to render the sheet without a background overlay. This is
            useful when the sheet should sit alongside page content without obscuring it.
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
                  2.1.1 Keyboard A
                </PharosLink>
              </li>
              <li>
                <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html">
                  2.4.3 Focus Order A
                </PharosLink>
              </li>
            </ul>
          </PageSection>
          <PageSection title="Importance" subSectionLevel={1} lessMargin>
            Sheets should not open automatically, as this can disrupt a user's workflow. Users
            should always initiate opening a sheet via an explicit action. When a sheet opens, focus
            should be moved into the sheet and trapped there until it is dismissed.
          </PageSection>
          <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
            <ul>
              <li>
                The sheet container uses <code>role="dialog"</code> and{' '}
                <code>aria-modal="true"</code>
              </li>
              <li>
                The sheet uses <code>aria-label</code> sourced from the <code>header</code>{' '}
                attribute to provide an accessible name
              </li>
              <li>
                Focus is trapped within the sheet while it is open; no elements behind the overlay
                should be reachable via keyboard
              </li>
              <li>When the sheet closes, focus is returned to the element that triggered it</li>
              <li>
                The close button (when present) has an <code>aria-label</code> of "Close sheet"
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
                  Announces the focused element within the sheet and reads "dialog" to indicate the
                  overlay context
                </li>
                <li>The close button reads as "Close sheet, button" when focused</li>
              </ul>
            </div>
            <PharosHeading level={4} preset={'1--bold'}>
              Keyboard
            </PharosHeading>
            <ul>
              <li>
                <kbd>Tab</kbd>: moves focus forward within the sheet
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: moves focus to the previous element in the tab
                order
              </li>
              <li>
                <kbd>Esc</kbd>: closes the sheet
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </>
    );
  }, [Pharos]);

  return PageContent;
};
export default SheetPage;
