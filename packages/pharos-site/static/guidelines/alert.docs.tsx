import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { PharosAlert, PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const AlertPage: FC = () => {
  return (
    <>
      <PageSection
        title="Alert"
        isHeader
        storyBookType="components"
        description="Alerts inform users about important information, which can be displayed as persistent site
    messaging or appear based on a task that a user is trying to complete."
      >
        <PharosAlert status="info">Alert message</PharosAlert>
      </PageSection>
      <PageSection
        topMargin
        title="Usage"
        description="Use alerts if you need to communicate to users in a prominent way to take action or be made aware of important information that does not interrupt their experience."
      >
        <PageSection subSectionLevel={1} title="Appropriate placement">
          <ul>
            <li>
              Alerts relevant to an entire page should be placed at the top of that page, below the
              page header.
            </li>
            <li>
              Alerts related to a section of a page, like a modal, should be placed inside that
              section, below any section heading.
            </li>
            <li>
              Alerts related to an element more specific than a section should be placed immediately
              above or below that element.
            </li>
          </ul>
          <PageSection
            subSectionLevel={2}
            title="Transition"
            description="When displaying an alert, push the content below it down (could be the page content below or the section content)."
          ></PageSection>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Do use alerts thoughtfully and sparingly for only the most important information.
              </li>
              <li>Do keep the messaging concise, scannable, and actionable (if needed).</li>
              <li>
                Do focus messaging on a single topic or required action to avoid overwhelming the
                user.
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use alerts for marketing information.</li>
              <li>
                Don't use redundant terms. As an example, saying "successfully" in alerts that
                confirm a successful action is redundant.
              </li>
              <li>
                Don't include more than one or two links per alert. The primary action should be
                listed first.
              </li>
              <li>Don't use ephemeral messaging to convey important context like form errors.</li>
              <li>Don't display more than one alert at a time.</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <em>Good alert messaging should:</em>
        <ul>
          <li>Be scannable, brief, and to the point.</li>
          <li>Be written in a human-readable language.</li>
          <li>
            Be as specific as possible. A generic statement like, "Something went wrong" doesn't
            provide enough context to help ground the user.
          </li>
          <li>Include constructive advice on how to fix a problem.</li>
          <li>Be no more than one or two sentences.</li>
          <li>
            Be written in <u>Sentence case</u>. Capitalize the first word in the heading and proper
            nouns only.
          </li>
          <li>Use appropriate punctuation. Each message should end in a period.</li>
        </ul>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection title="Success" subSectionLevel={1}>
          Use a success alert when notifying the user that a task has been completed. They can
          include follow up actions if necessary related to the task.
          <Canvas>
            <PharosAlert status="success">
              <p className="alert-example__content">
                Your username and a link to reset your password have been sent to your email
                address.
              </p>
              <p className="alert-example__content">
                If this email does not arrive within a few minutes,{' '}
                <PharosLink href="#">try entering your password again</PharosLink> or contact{' '}
                <PharosLink href="#">support@jstor.org</PharosLink>
              </p>
            </PharosAlert>
          </Canvas>
          <PageSection title="Messaging" subSectionLevel={2}>
            Inform the user of the completion of their task in past tense and what they can expect
            next.
          </PageSection>
        </PageSection>
        <PageSection title="Informational" subSectionLevel={1}>
          Use an info alert when notifying the user of neutral information. They can include links
          for users to take action.
          <Canvas>
            <PharosAlert status="info">
              This is a temporary workspace and will expire in 2 days. To save and keep your
              workspace forever, <PharosLink href="#">log in</PharosLink> or{' '}
              <PharosLink href="#">register</PharosLink>
            </PharosAlert>
          </Canvas>
        </PageSection>
        <PageSection title="Warning" subSectionLevel={1}>
          Use a warning alert to inform users of an instance that will directly impact the ability
          for them to complete their task. It should provide a reason for the warning, a recommended
          next step, and a way to contact us. Warnings are meant to be less alarming than error
          alerts.
          <Canvas>
            <PharosAlert status="warning">
              The information provided does not match our records. Please check your username or
              password and try again. If the issue persists, please contact{' '}
              <PharosLink href="#">support@jstor.org</PharosLink>.
            </PharosAlert>
          </Canvas>
          <Canvas>
            <PharosAlert status="warning">
              This email address is connected to JSTOR with a Google account. Please try{' '}
              <PharosLink href="#">logging in with Google</PharosLink> to access your account. If
              this doesn't seem right, contact <PharosLink href="#">support@jstor.org</PharosLink>.
            </PharosAlert>
          </Canvas>
          <Canvas>
            <PharosAlert status="warning">
              Your session expired. To continue, please <PharosLink href="#">log in</PharosLink>
            </PharosAlert>
          </Canvas>
        </PageSection>
        <PageSection title="Error" subSectionLevel={1}>
          Use an error alert when the user has submitted something the system can't accept,
          preventing them from continuing or when there is a system error that needs immediate
          attention.
          <Canvas>
            <PharosAlert status="error">
              We're sorry, we experienced an issue submitting your report. Please try again. If the
              issue persists, contact <PharosLink href="#">support@jstor.org</PharosLink>
            </PharosAlert>
          </Canvas>
          To provide extra clarity, doubling on the use of Alerts and inline validation helps people
          quickly notice, find, and remedy errors.
          <PageSection title="Messaging" subSectionLevel={2}>
            <em>If the user made an error</em> the messaging should provide a reason for the alert,
            a recommended next step, and a way to contact us. If there are multiple errors,
            summarize them in a logical order (e.g. for forms that are missing several required
            fields from the user).
            <Canvas>
              <PharosAlert status="error">
                <p className="alert-example__content">
                  Please correct the following highlighted fields before continuing.
                </p>
                <ul className="alert-example__content">
                  <li>Username</li>
                  <li>Password</li>
                  <li>Accept JSTOR's Terms and Conditions</li>
                </ul>
              </PharosAlert>
            </Canvas>
            <em>If there is a system error</em> or something went wrong on our end, be apologetic,
            take the blame, provide a reason for the alert, and a way to contact us.
            <Canvas>
              <PharosAlert status="error">
                We're sorry, we experienced an issue submitting your report. Please try again. If
                the issue persists, contact <PharosLink href="#">support@jstor.org</PharosLink>
              </PharosAlert>
            </Canvas>
          </PageSection>
          <PageSection title="Closable Alert" subSectionLevel={1}>
            To allow for alerts to be closed, alerts have a button rendered when the attribute{' '}
            <code>closable</code> is enabled.
            <Canvas>
              <PharosAlert status="warning" closable>
                The information provided does not match our records. Please check your username or
                password and try again. If the issue persists, please contact{' '}
                <PharosLink href="#">support@jstor.org</PharosLink>.
              </PharosAlert>
            </Canvas>
          </PageSection>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/error-identification">
                3.3.1 Error Identification A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion">
                3.3.3 Error Suggestion AA
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html">
                4.1.3 Status Messages
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html">
                1.4.13 Content on Hover or Focus AA
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <ul>
            <li>
              Alerts notify assistive technologies of a message that will be audibly read to the
              users if
              <code>role=alert</code> is put onto an element
              <ul>
                <li>
                  Examples (via MDN): invalid form entry, expiring session or loss of connection
                  resulting in unsaved changes
                </li>
              </ul>
            </li>
            <li>
              Different ways to use aria-live:
              <ul>
                <li>
                  <code>aria-live="assertive"</code>
                  <ul>
                    <li>Immediately interrupts the user to read the message</li>
                    <li>A use case would be informing the user of an error message</li>
                  </ul>
                </li>
                <li>
                  <code>aria-live="polite" </code>
                  <ul>
                    <li>Waits until the user is idle to deliver the message</li>
                    <li>
                      A use case would be informing the user of information that is immediately
                      important so it can wait until they are at a standstill, such as a loading
                      spinner
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              Putting <code>role="alert"</code> can notify users of a error in a form
              <ul>
                <li>
                  This technique is the same as adding <code>aria-live="assertive"</code>
                </li>
              </ul>
            </li>
            <li>
              This element does not need to be able to receive focus as it is read as an audible
              message, unless the alert contains links or any interactable elements
            </li>
            <li>
              If an alert is displayed statically on a page, it does NOT need an "alert" role or
              live region
              <ul>
                <li>
                  If the alert opens on a new page, the user needs to be notified of this change
                  audibly as well.
                </li>
              </ul>
            </li>
            <li>
              If an alert appears after a user has taken an action, it should be wrapped in
              aria-live-region and have <code>role="alert"</code> and{' '}
              <code>aria-live="assertive"</code>. In cases where a user has taken action (like
              filling out and submitting a form), the user's attention is required to remedy the
              error.
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>If the aria-live is "assertive" the alert is read immediately </li>
              <li>If the aria-live is "polite" the alert is read when the user is idle</li>
              <li>Error messages should inform the user on how to fix them</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>Alerts should be visible when they are announced to a user.</li>
              <li>
                They should perform the same for users that are keyboard-only and users that are
                utilizing a mouse.
                <ul>
                  <li>
                    Example: an alert that notifies a user that the form they filled out is
                    incomplete would be visible regardless of whether the "submit" action was done
                    via mouse or navigated to using the keyboard
                  </li>
                </ul>
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default AlertPage;
