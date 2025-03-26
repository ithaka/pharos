import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import ellipsesExample from '@images/components/button/buttons_ellipses-example.png';
import {
  PharosButton,
  PharosHeading,
  PharosIcon,
  PharosLink,
  PharosTooltip,
} from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const ButtonPage: FC = () => {
  return (
    <>
      <PageSection
        title="Button"
        description="Buttons communicate actions that users can take."
        isHeader
        storyBookType="components"
      >
        <PharosButton name="primary">Primary button</PharosButton>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="Buttons communicate actions that users can take."
      >
        <PageSection title="When to use buttons" subSectionLevel={1}>
          <ul>
            <li>Submit a form</li>
            <li>Take an action (e.g., download, save, cite, share, publish, upload, etc.)</li>
            <li>Progress through a series of steps</li>
            <li>Interact with content (e.g., zooming and paging through items on the viewer)</li>
          </ul>
        </PageSection>
        <PageSection
          title="Determining button priority and hierarchy"
          subSectionLevel={1}
          description='Button priorities are determined by the business and user goals of the area or page where they are placed, but also what users want or need to do in a "priority" order.'
        >
          <PageSection
            title="Primary buttons"
            subSectionLevel={2}
            description="Use primary buttons for highest-priority actions that are required to complete the user's task."
          />
          <PageSection
            title="Secondary buttons"
            subSectionLevel={2}
            description="Use secondary buttons for quieter, but still important actions. They can live on their own, be
          paired with primary buttons, and also paired with other secondary buttons. Secondary buttons
          provide less visual noise, and support the visual hierarchy of the primary button."
          />
          <PageSection
            title="Multiple buttons"
            subSectionLevel={2}
            description="When you need to display multiple actions together in an array, use all secondary buttons
          (examples, item detail, workspace) OR one primary and the rest secondary buttons. Secondary
          buttons leave a minimal footprint and aren't as heavy of a distraction within the UI, and
          primary buttons are reserved for the most important action."
          />
          <PageSection title="Grouping multiple actions" subSectionLevel={2}>
            <img
              src={ellipsesExample}
              alt="When grouping actions, you can utilize an ellipses icon button paired with a dropdown menu to display a list of actions"
              className="pharos-storybook__image"
              width="400"
            />
            <p>
              If it makes sense to group multiple actions together, you can utilize an ellipses
              button paired with a dropdown menu. Use this pattern when there are 3 or more actions.
              Use this pattern sparingly as it does hide actions and adds an extra click for users.
            </p>
          </PageSection>
          <PageSection
            title="Buttons versus links"
            subSectionLevel={2}
            description="Links navigate users to a new page or location. Buttons specifically allow users to perform an
          action that stays within the context of the page or experience (e.g., the citation button
          opens a modal or the download button directly downloads an item). There are times where
          buttons need to act like links and look like buttons to create consistency with the
          experience. Please read about this variant below and use sparingly in your UI."
          />
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Buttons should be easy to find among other elements, including other buttons</li>
              <li>
                The button's content should be clear and accurately labeled, encouraging a user to
                take action with an action-oriented verb
              </li>
              <li>
                Prioritize actions within the page and experience based on business and user needs.
                For most use cases, only one primary button should be used on a page so users are
                clear about what the most important action is.
              </li>
              <li>Use the best variant for your UI needs to communicate meaning and hierarchy.</li>
            </ul>
          }
          Dont={
            <ul>
              <li>
                Utilize multiple primary buttons in an array, this causes an imbalance of hierarchy
                and confusion about what actions should be taken. Reserve primary buttons for the
                most important action when displaying a series of buttons.
              </li>
              <li>
                Don't use dropdown menus in cases when data is commonly known and easier to type
              </li>
              <li>Don't use a button variant for an action it's not intended for.</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection title="Action-oriented" subSectionLevel={1}>
          <p>
            Buttons should lead with a strong verb that encourages action. To provide enough
            context, pair the verb with a noun when applicable.
          </p>
          <ul className="list-example__no-bullets">
            <li style={{ display: 'flex', color: 'var(--pharos-color-green-base)' }}>
              <PharosIcon
                name={'checkmark'}
                className="checkmark"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x)',
                  fill: 'var(--pharos-color-green-base)',
                }}
                a11yTitle="good example"
              ></PharosIcon>
              Save
            </li>
            <li style={{ display: 'flex', color: 'var(--pharos-color-living-coral-53)' }}>
              <PharosIcon
                name={'close'}
                className="close"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x',
                  fill: 'var(--pharos-color-living-coral-53)',
                }}
                a11yTitle="bad example"
              ></PharosIcon>
              Workspace
            </li>
          </ul>
          <ul className="list-example__no-bullets">
            <li style={{ display: 'flex', color: 'var(--pharos-color-green-base)' }}>
              <PharosIcon
                name={'checkmark'}
                className="checkmark"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x)',
                  fill: 'var(--pharos-color-green-base)',
                }}
                a11yTitle="good example"
              ></PharosIcon>
              Find my institution
            </li>
            <li style={{ display: 'flex', color: 'var(--pharos-color-living-coral-53)' }}>
              <PharosIcon
                name={'close'}
                className="close"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x',
                  fill: 'var(--pharos-color-living-coral-53)',
                }}
                a11yTitle="bad example"
              ></PharosIcon>
              Institution finder
            </li>
          </ul>
        </PageSection>
        <PageSection title="Concise" subSectionLevel={1}>
          <p>
            Button text should suggest its action in an expected way and in the fewest words
            possible. Buttons should be clear, concise and written in sentence case. Avoid
            unnecessary words and articles such as the, an, or a.
          </p>
          <ul className="list-example__no-bullets">
            <li style={{ display: 'flex', color: 'var(--pharos-color-green-base)' }}>
              <PharosIcon
                name={'checkmark'}
                className="checkmark"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x)',
                  fill: 'var(--pharos-color-green-base)',
                }}
                a11yTitle="good example"
              ></PharosIcon>
              Cite
            </li>
            <li style={{ display: 'flex', color: 'var(--pharos-color-living-coral-53)' }}>
              <PharosIcon
                name={'close'}
                className="close"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x',
                  fill: 'var(--pharos-color-living-coral-53)',
                }}
                a11yTitle="bad example"
              ></PharosIcon>
              Click here to copy the citation
            </li>
          </ul>
          <ul className="list-example__no-bullets">
            <li style={{ display: 'flex', color: 'var(--pharos-color-green-base)' }}>
              <PharosIcon
                name={'checkmark'}
                className="checkmark"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x)',
                  fill: 'var(--pharos-color-green-base)',
                }}
                a11yTitle="good example"
              ></PharosIcon>
              Download
            </li>
            <li style={{ display: 'flex', color: 'var(--pharos-color-living-coral-53)' }}>
              <PharosIcon
                name={'close'}
                className="close"
                style={{
                  marginRight: 'var(--pharos-spacing-one-half-x',
                  fill: 'var(--pharos-color-living-coral-53)',
                }}
                a11yTitle="bad example"
              ></PharosIcon>
              Download the PDF
            </li>
          </ul>
        </PageSection>
        <PageSection title="Consistent" subSectionLevel={1}>
          <p>
            Make interactive elements consistent in identification and functionality. Don't label a
            search button "submit" on one page and "enter" on another.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="Primary button" subSectionLevel={1}>
          <p>Use for primary actions in the page or experience.</p>
          <PharosButton name="primary">Primary button</PharosButton>
        </PageSection>
        <PageSection title="Secondary button" subSectionLevel={1}>
          <p>
            Use for secondary actions in the page or experience. They can also be used for quieter,
            but still important actions.
          </p>
          <PharosButton name="secondary" variant="secondary">
            Secondary button
          </PharosButton>
        </PageSection>
        <PageSection title="Subtle button" subSectionLevel={1}>
          <p>
            Use subtle buttons when other types may be too distracting or visually verbose for the
            area in which it's placed.
          </p>
          <PharosButton name="subtle" variant="subtle">
            Subtle button
          </PharosButton>
        </PageSection>
        <PageSection title="Overlay button" subSectionLevel={1}>
          <p>Use overlay buttons when the button can appear on top of other content like images</p>
          <PharosButton name="overlay" variant="overlay">
            Overlay button
          </PharosButton>
        </PageSection>
        <PageSection title="With icons" subSectionLevel={1}>
          <p>
            Pair text with an icon to better clarify the meaning of the button. Use no more than one
            icon before text and one icon after text (see{' '}
            <PharosLink href="/brand-expressions/iconography">Pharos icons</PharosLink>
            ). When deciding to use an icon in a button, it allows for a subtle, but personable,
            expression of our brand. The icon can also help reinforce the intention of the action.
            Be consistent with using icons in buttons when placed near other buttons.
          </p>
          <PharosButton name="secondary-icon" variant="secondary" iconLeft="cite">
            With icon button
          </PharosButton>{' '}
          <PharosButton name="primary-icon" iconLeft="download">
            With icon button
          </PharosButton>
        </PageSection>
        <PageSection title="Icon-only" subSectionLevel={1}>
          <p>
            Use icon-only buttons sparingly and include a label, in most cases that would mean using
            a tooltip to help visually provide meaning to the action. They should be used only in
            compact UI situations. Use an icon that conveys a single action.
          </p>
          <PharosButton
            name="icon-only"
            a11y-label="Back"
            icon="chevron-left-large"
            variant="subtle"
            data-tooltip-id="back-tooltip"
          ></PharosButton>
          <PharosTooltip placement="top" id="back-tooltip">
            Back
          </PharosTooltip>
          <PharosButton
            name="icon-only"
            a11y-label="Forward"
            icon="chevron-right-large"
            variant="subtle"
            data-tooltip-id="forward-tooltip"
          ></PharosButton>
          <PharosTooltip placement="top" id="forward-tooltip">
            Forward
          </PharosTooltip>
        </PageSection>
        <PageSection title="Large button" subSectionLevel={1}>
          <p>
            Only to be used when implementing input groups that use a button so that it matches the
            height of the input field.
          </p>
          <PharosButton name="large-secondary" variant="secondary" large>
            Large secondary button
          </PharosButton>{' '}
          <PharosButton name="large-primary" large>
            Large primary button
          </PharosButton>
        </PageSection>
        <PageSection title="Link button" subSectionLevel={1}>
          <p>
            Use these under careful consideration. Dictation software users may not be able to
            properly identify these actions, as they can say "show buttons" and these won't
            highlight since they are semantically links, even though they may look like buttons.
            These should be used sparingly.
          </p>
          <PharosButton name="primary-link" href="#">
            Link button
          </PharosButton>
        </PageSection>
        <PageSection title="Disabled button" subSectionLevel={1}>
          <p>
            Use the disabled state of a button when a user can't perform an action at the time of
            their experience. They should be used sparingly and only for actions that they are
            unable to take. The user shouldn't have to guess why a button is disabled. It should be
            immediately obvious as to why the button might be disabled (e.g., an item can't be
            downloaded due to access). Otherwise, show the button in its default state, then provide
            helpful error text after it's been clicked.
          </p>
          <PharosButton name="primary-secondary-disabled" variant="primary" disabled>
            Disabled button
          </PharosButton>
        </PageSection>
        <PageSection title="Buttons on dark background" subSectionLevel={1}>
          <p>
            When a button is used on a darker background (e.g., black or marble-gray-20), use the
            is-on-background attribute. The four variants described above can all be used on dark
            backgrounds and follow the same guidelines.
          </p>
          <div
            style={{
              background: 'var(--pharos-color-marble-gray-10)',
              padding: 'var(--pharos-spacing-1-x)',
              width: '45%',
            }}
          >
            <PharosButton name="primary-on-background" isOnBackground>
              Primary button
            </PharosButton>
            <PharosButton name="secondary-on-background" variant="secondary" isOnBackground>
              Secondary button
            </PharosButton>
          </div>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection title="What's built in" subSectionLevel={1}>
          <ul>
            <li>
              Ensures component uses the correct semantic <code>button</code> element.
            </li>
            <li>
              Provides built-in focus styles that meet WCAG contrast and visibility requirements.
            </li>
            <li>Supports keyboard interactions (e.g., Enter/Space to activate).</li>
            <li>
              Includes ability to add ARIA attributes when necessary (e.g., <code>aria-label</code>{' '}
              for icon-only buttons).
            </li>
            <li>Variants use predefined color schemes that meet contrast requirements.</li>
          </ul>
        </PageSection>
        <PageSection title="Considerations" subSectionLevel={1}>
          <PageSection title="Design" subSectionLevel={2}>
            <ul>
              <li>
                Ensure button labels are clear and descriptive (e.g., avoid vague labels like "Click
                here").
              </li>
              <li>
                Use the disabled state sparingly, as there are known accessibility and usability
                issues (it removes buttons from the focus order and can add to a users cognitive
                load). Consider alternative approaches, such as keeping buttons enabled but
                providing inline messaging about availability.
              </li>
              <li>Ensure annotations are used to convey the button's label if using icon-only.</li>
            </ul>
          </PageSection>
          <PageSection title="Development" subSectionLevel={2}>
            <ul>
              <li>Avoid nesting interactive elements (e.g., placing a button inside a link).</li>
              <li>
                Use the following attributes as needed:
                <ul>
                  <li>
                    <code>a11y-label</code>: Gives explicit an accessible name with an aria-label
                    attribute
                  </li>
                  <li>
                    <code>a11y-expanded</code>: Conveys associated content’s state with
                    aria-expanded
                  </li>
                  <li>
                    <code>a11y-pressed</code>: Conveys the current pressed state with aria-pressed
                  </li>
                  <li>
                    <code>a11y-haspopup</code>: Indicate an association with another widget via
                    aria-haspopup
                  </li>
                  <li>
                    <code>a11y-disabled</code>: Conveys the disabled state via aria-disabled while
                    keeping it in the focus order
                  </li>
                </ul>
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection title="Expected actions" subSectionLevel={1}>
          <PageSection title="Screen reader" subSectionLevel={2}>
            <PharosHeading level={4} preset={'1--bold'}>
              What is read
            </PharosHeading>
            <p>VoiceOver reads as: "visual label (or aria-label), button"</p>
          </PageSection>
        </PageSection>
        <PageSection title="Relevant WCAG guidelines" subSectionLevel={1}>
          <ul style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/label-in-name">
                2.5.3 Label in Name AA
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value">
                4.1.2 Name, Role, Value A
              </PharosLink>
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default ButtonPage;
