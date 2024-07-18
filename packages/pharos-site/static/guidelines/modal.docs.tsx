import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC, ReactElement, useEffect, useState } from 'react';

import type { PharosModal as PharosModalType } from '@ithaka/pharos/';

const ModalPage: FC = () => {
  const Pharos =
    typeof document !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const [PageContent, setPageContent] = useState<ReactElement | null>(null);
  // An internal dependency of Pharos references document, so we need to set the page content in a useEffect to build it with SSR
  useEffect(() => {
    const { PharosHeading, PharosButton, PharosModal, PharosLink } = Pharos;

    setPageContent(
      <>
        <PageSection
          title="Modal"
          isHeader
          storyBookType="components"
          description="Modals are overlays that present a user with focused information and actions that sit on top of
        a page's content. They are used for getting a user's attention and for taking action without
        changing page context."
        >
          <>
            <PharosButton
              onClick={(e) => {
                const modal = document.querySelector(
                  '[data-pharos-component="PharosModal"]'
                ) as PharosModalType;
                modal.open = true;
              }}
            >
              Open modal
            </PharosButton>
            <PharosModal header="Pharos modal" footer-divider>
              <p>I am a modal</p>
              <PharosButton slot="footer" type="button" variant="secondary" data-modal-close>
                Cancel
              </PharosButton>
              <PharosButton
                slot="footer"
                type="button"
                onClick={(e) => {
                  const modal = document.querySelector(
                    '[data-pharos-component="PharosModal"]'
                  ) as PharosModalType;
                  modal.open = false;
                }}
              >
                Ok
              </PharosButton>
            </PharosModal>
          </>
        </PageSection>
        <PageSection topMargin title="Usage">
          <PageSection title="Overview" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <p>
                Modals are used to present critical information or request user input needed to
                complete a task. Modals are meant to purposely interrupt a user's workflow and
                should be used sparingly to limit disruption to the user experience.
              </p>
              <p>
                Modals are used for quick tasks that put a user into a specific "mode," like
                editing, deleting, and citing, or displaying specific, focused information like a
                data table.
              </p>
            </div>
          </PageSection>
          <PageSection title="When to Use" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-3-x)' }}>
              <ul>
                <li>When a user needs to do a focused task (e.g., enter specific information)</li>
                <li>
                  When a user needs to go through a workflow with multiple steps (e.g., "Create a
                  report")
                </li>
                <li>To confirm a user wants to take an action (e.g., deleting information)</li>
                <li>To display pertinent, quick information</li>
                <li>To display promotional or product marketing (e.g., "Welcome to workspace")</li>
              </ul>
            </div>
          </PageSection>
        </PageSection>{' '}
        <PageSection title="Best practices">
          <BestPractices
            Do={
              <ul>
                <li>Allow users to take an action to complete a task in their workflow</li>
                <li>Display critical information to give users more context</li>
                <li>
                  When using form elements in a modal, it's recommended to validate the user's data
                  before submission (inline validation)
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>Don't use for long forms, instead, incorporate into the page's content</li>
              </ul>
            }
          />
        </PageSection>{' '}
        <PageSection title="Content guidelines">
          <PageSection title="Modal heading" subSectionLevel={1} lessMargin>
            A modal's heading should be concise, describing the information or action being
            presented. They should be written in sentence case and describe the action a user will
            take (e.g., "Delete folder," "Create report," or "Cite") or relevant information to the
            copy being displayed. Punctuation is generally not needed or encouraged in modal
            headings.
          </PageSection>
          <PageSection title="Modal content" subSectionLevel={1} lessMargin>
            There are no specific requirements for the content of a modal; it can be composed as the
            information calls for. The content could include supporting body copy or form elements.
          </PageSection>
          <PageSection title="Modal footer" subSectionLevel={1} lessMargin>
            The footer content contains all possible actions for the user to take, but can also
            include further pertinent/relevant information. For buttons, use descriptive words such
            as "Add," and Save.
          </PageSection>
        </PageSection>{' '}
        <PageSection title="States">
          <PageSection title="No footer" subSectionLevel={1} lessMargin>
            Use for information-only based content that does not require the user to take an action.
          </PageSection>
          <PageSection title="Mobile" subSectionLevel={1} lessMargin>
            For screen sizes smaller than our Tablet (768px) down to our Mobile size (320px), the
            modal will act as a "sheet" and take over the entire width and height of the screen.
          </PageSection>
        </PageSection>{' '}
        <PageSection title="Variants">
          <PageSection title="Small" subSectionLevel={1} lessMargin>
            Use for quick, short information. The small modal size should also be used to confirm
            delete actions.
          </PageSection>
          <PageSection title="Medium (Default)" subSectionLevel={1} lessMargin>
            Medium is our default modal size. It can be used in most instances.
          </PageSection>
          <PageSection title="Large" subSectionLevel={1} lessMargin>
            For displaying more complex information, such as data tables, use the large modal for
            maximum screen real-estate.
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
            </ul>
          </PageSection>
          <PageSection title="Importance" subSectionLevel={1} lessMargin>
            Modals should not open automatically as this can interrupt a users workflow. By giving
            the user control when they would like to view this modal, this gives them the freedom to
            decide when they would like to be given the additional information in the overlay.
          </PageSection>
          <PageSection title="Code expectations" subSectionLevel={1} lessMargin>
            Via
            <PharosLink href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html">
              w3
            </PharosLink>
            :
            <ul>
              <li>
                When the modal is open, only interactable elements and content should be able to be
                accessed. No element behind the modal overlay should be in the tab index or
                accessible to screen readers for as long as the modal is visible. We can achieve
                this by using a focus trap.
              </li>
              <li>Div has a role of "dialog"</li>
              <li>
                Div also has aria-labelledby="id" to give an accessible name. It will point to the
                element that provides the dialog title.
              </li>
              <ul>
                <li>
                  The title or purpose of the element should contain the "id" that is being
                  referenced by the aria-labelledby
                </li>
              </ul>
              <li>Div has aria-modal="true"</li>
              <li>An aria-label should be placed on the "X" that contains "close modal"</li>
            </ul>
          </PageSection>
          <PageSection title="Expected actions" subSectionLevel={1} lessMargin>
            <div style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
              <PharosHeading level={4} preset={'1--bold'}>
                Screen reader
              </PharosHeading>
              <ul>
                <li>Reads: "first element in focus, dialog"</li>
                <ul>
                  <li>
                    The most important thing is that the screen reader says that it is a "dialog"
                  </li>
                </ul>
                <li>
                  *Note: there should also be an aria-label on the "X" that reads "close modal,
                  button"
                </li>
              </ul>
            </div>
            <PharosHeading level={4} preset={'1--bold'}>
              Keyboard
            </PharosHeading>
            <ul>
              <li>
                <kbd>Tab</kbd>: moves focus within the modal
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: moves focus to the previous element in the tab
                order
              </li>
              <li>
                <kbd>Esc</kbd>: closes the modal
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </>
    );
  }, [Pharos]);

  return PageContent;
};
export default ModalPage;
