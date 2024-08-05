import tooltipViewer from '@images/components/tooltip/tooltip_viewer-1.png';
import tooltipViewerTwo from '@images/components/tooltip/tooltip_viewer-2.png';
import tooltipOverflow from '@images/components/tooltip/tooltip_overflow.gif';

import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import Canvas from '../../src/components/Canvas';
import {
  PharosButton,
  PharosIcon,
  PharosLink,
  PharosTooltip,
} from '@ithaka/pharos/lib/react-components';

const TooltipPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        storyBookType="components"
        title="Tooltip"
        description="Tooltips provide concise additional information upon hover or focus. The content should be
    contextual, helpful, and non-critical."
      >
        <>
          <PharosButton data-tooltip-id="tooltip-example">Hover here</PharosButton>
          <PharosTooltip id="tooltip-example" placement={'bottom'}>
            Hello there!
          </PharosTooltip>
        </>
      </PageSection>
      <PageSection topMargin title="Usage">
        <PageSection subSectionLevel={1} title="Placement">
          <p>
            There are 12 placement options available. Tooltips can be placed top, bottom, left or
            right of the target (e.g. button, icon, link, etc.) and the caret (triangle) can be
            placed at the start, center or end of the tooltip.
          </p>
          <Canvas>
            <div className="tooltip-example__container">
              <button data-tooltip-id="my-top-start-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see top-start tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-top-start-tooltip" open placement="top-start">
                top-start
              </PharosTooltip>
              <button data-tooltip-id="my-top-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see top tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-top-tooltip" open placement="top">
                top
              </PharosTooltip>
              <button data-tooltip-id="my-top-end-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see top-end tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-top-end-tooltip" open placement="top-end">
                top-end
              </PharosTooltip>
              <button data-tooltip-id="my-left-start-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see left-start tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-left-start-tooltip" open placement="left-start">
                left-start
              </PharosTooltip>
              <button data-tooltip-id="my-left-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see left tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-left-tooltip" open placement="left">
                left
              </PharosTooltip>
              <button data-tooltip-id="my-left-end-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see left-end tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-left-end-tooltip" open placement="left-end">
                left-end
              </PharosTooltip>
              <button data-tooltip-id="my-right-start-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see right-start tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-right-start-tooltip" open placement="right-start">
                right-start
              </PharosTooltip>
              <button data-tooltip-id="my-right-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see right tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-right-tooltip" open placement="right">
                right
              </PharosTooltip>
              <button data-tooltip-id="my-right-end-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see right-end tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-right-end-tooltip" open placement="right-end">
                right-end
              </PharosTooltip>
              <button data-tooltip-id="my-bottom-start-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see bottom-start tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-bottom-start-tooltip" open placement="bottom-start">
                bottom-start
              </PharosTooltip>
              <button data-tooltip-id="my-bottom-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see bottom tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-bottom-tooltip" open placement="bottom">
                bottom
              </PharosTooltip>
              <button data-tooltip-id="my-bottom-end-tooltip" className="tooltip-example__target">
                <PharosIcon
                  name="info-inverse"
                  a11yTitle="Hover over to see bottom-end tooltip example"
                ></PharosIcon>
              </button>
              <PharosTooltip id="my-bottom-end-tooltip" open placement="bottom-end">
                bottom-end
              </PharosTooltip>
            </div>
          </Canvas>
          <PageSection subSectionLevel={2} title="Where should I place the tooltip?">
            <p>All tooltips, by default, are positioned top-center.</p>
            <p>
              You can also decide to position the tooltip in a more appropriate place depending on
              the use case.
            </p>
            <PageSection subSectionLevel={3} title="Navigational">
              <p>
                For navigational items, the tooltip should be placed to the left of the associated
                icon button.
              </p>
            </PageSection>
            <PageSection subSectionLevel={3} title="Icon toolbar">
              <p>
                For content viewing experiences, the tooltip should sit below the viewer control
                icon buttons.
              </p>
              <img
                src={tooltipViewer}
                alt="Tooltip placement for viewer full screen"
                className="pharos-storybook__image"
                width="700"
              />
            </PageSection>
            <PageSection subSectionLevel={3} title="Icon buttons">
              <p>
                For tooltips that are near other objects or items, display the tooltip to have more
                contrast, prominence and readability. In the example below, the tooltip has a top
                placement.
              </p>
            </PageSection>
            <PageSection subSectionLevel={3} title="Longer titles">
              <p>
                For titles that need a tooltip to display the full title, it should sit above the
                content, so the link text is still visible to the user.
              </p>
            </PageSection>
            <PageSection subSectionLevel={3} title="Caret placement">
              <p>
                We use <PharosLink href="https://floating-ui.com/">Floating UI</PharosLink> to
                position our tooltips. By default, tooltips are placed in the center of the trigger,
                but the caret/arrow will move and remain "attached" with Floating UI's flip and
                shift functionality.
              </p>
              <img
                src={tooltipOverflow}
                alt="Tooltip overflow example"
                className="pharos-storybook__image"
                width="300"
              />
              <img
                src={tooltipViewerTwo}
                alt="Example tooltip caret placement in viewer"
                className="pharos-storybook__image"
                width="700"
              />
            </PageSection>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Longer content">
          <p>
            Larger tooltips can be used to display further additional information. It is highly
            recommended that you consider if you need a tooltip or not for the design. "Throw it in
            a tooltip" is not the answer.
          </p>
          <Canvas>
            <div className="tooltip-example__container">
              <button data-tooltip-id="my-large-tooltip" className="tooltip-example__target">
                <PharosIcon name="info-inverse" a11yTitle="Info"></PharosIcon>
              </button>
              <PharosTooltip id="my-large-tooltip" open>
                Large tooltip for more text goes here and here and here
              </PharosTooltip>
            </div>
          </Canvas>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use tooltips to clarify expected behavior when interacting with icon buttons,
                buttons, or links with an associated keyboard shortcut.
              </li>
              <li>
                Use tooltips sparingly. If you're building something that requires a lot of
                tooltips, work on clarifying the design and the language in the experience. Do you
                NEED a tooltip?
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't include interactive content such as buttons or links.</li>
              <li>Don't include imagery, concise text will do.</li>
              <li>Don't use tooltips to restate visible text in the UI.</li>
              <li>
                Don't use tooltips to communicate critical information, like errors or other
                interaction feedback.
              </li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <em>Tooltips should:</em>
        <ul>
          <li>Be concise and scannable</li>
          <li>Be written in sentence case</li>
          <li>Not be used to communicate error messages or critical info</li>
        </ul>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html">
                1.4.13 Content on Hover or Focus AA
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          Tooltips give additional information to the user by providing information that isn't
          presented visually. Tooltips can take multiple forms, such as a label for an icon (similar
          to our metadata icon on the item page) or providing additional information or
          clarification about an element (usually in the form of a "i" or a "?" icon). Tooltips do
          not need to receive focus, but rather just live on the button, link or form field that it
          relates to. There may be additional Aria tags that need to be added to make the tooltip
          available to assistive technologies, such as aria-describedby.
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              For labels (similar to the metadata and thumbnail hover on
              <PharosLink href="https://www.jstor.org/stable/24562158?seq=1#metadata_info_tab_contents">
                item page
              </PharosLink>
              ){' '}
              <ul>
                <li> Use aria-labelledby and have the id share the same label</li>
                <li>
                  {' '}
                  Make it the &lt;button&gt; attribute with a &lt;class&gt; attribute as well
                </li>
                <li>
                  Within the &lt;div&gt; add "role=tooltip" and the id attribute that corresponds to
                  the aria-labelledby. Also add whatever you want the tooltip to give the user
                  <ul>
                    <li>
                      <PharosLink href="https://inclusive-components.design/tooltips-toggletips/">
                        Example
                      </PharosLink>
                      (via Inclusive Components by Heydon Pickering)
                    </li>
                    <li>
                      The role of "tooltip" assures that the aria-labelledby will work correctly
                    </li>
                    <li>The button role will also ensure that this works correctly </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              For tooltips that provide additional or clarifying information (similar to the ? next
              to "Stable URL" on the
              <PharosLink href="https://www.jstor.org/stable/24562158?seq=1#metadata_info_tab_contents">
                item page
              </PharosLink>
              )
              <ul>
                <li>
                  Similar to the structure of the example above
                  <ul>
                    <li>
                      However, we need to add the label aspect with something other than the
                      aria-labelledby because we need to use this for the new information
                    </li>
                    <li>
                      We can put the title into a hidden class to make this work effectively
                      <ul>
                        <li>
                          <PharosLink href="https://inclusive-components.design/tooltips-toggletips/">
                            Example
                          </PharosLink>
                          (via Inclusive Components by Heydon Pickering)
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li> Reads similarly to a text label</li>
              <li> Announces the tooltip on hover/focus </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                Pressing <kbd>Escape</kbd> dismisses the tooltip.
              </li>
              <li> Should be included in tab order logically</li>
              <li> Tooltip should open when focus is given to the element</li>
              <li> Tooltip should not automatically disappear </li>
              <li> After tooltip is closed, focus should remain on the trigger</li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TooltipPage;
