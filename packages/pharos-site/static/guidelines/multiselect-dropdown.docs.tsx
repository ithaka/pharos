import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import { FC } from 'react';
import Canvas from '../../src/components/Canvas';
import { PharosMultiselectDropdown } from '@ithaka/pharos/lib/react-components';

const MultiselectDropdownPage: FC = () => {
  return (
    <>
      <PageSection
        title="Multiselect Dropdown"
        description="A multiselect dropdown gives users a way to choose a specific set of options they want to modify or view."
        isHeader
        storyBookType="forms"
      >
        <PharosMultiselectDropdown>
          <span slot="label">Cities in Michigan</span>
          <option value="1">Ann Arbor</option>
          <option value="2">Battle Creek</option>
          <option value="3">Benton Harbor</option>
          <option value="4">Big Rapids</option>
          <option value="5">Cadillac</option>
          <option value="6">Charlevoix</option>
          <option value="7">Coldwater</option>
          <option value="8">Dearborn</option>
          <option value="9">Detroit</option>
          <option value="10">Dowagiac</option>
          <option value="11">Empire</option>
          <option value="12">Escanaba</option>
          <option value="13">Flint</option>
          <option value="14">Grand Rapids</option>
          <option value="15">Holland</option>
          <option value="16">Houghton</option>
          <option value="17">Kalamazoo</option>
          <option value="18">Lansing</option>
          <option value="19">Marquette</option>
          <option value="20">Mount Pleasant</option>
          <option value="21">Muskegon</option>
          <option value="22">Port Huron</option>
          <option value="23">Rochester Hills</option>
          <option value="24">Saginaw</option>
          <option value="25">Sault Ste. Marie</option>
          <option value="26">St Joseph</option>
          <option value="27">Tawas City</option>
          <option value="28">Traverse City</option>
          <option value="29">Wyoming</option>
          <option value="30">Ypsilanti</option>
        </PharosMultiselectDropdown>
      </PageSection>
      <PageSection topMargin title="Usage">
        <p>
          Multiselect dropdowns make it easier for users to interact with a busy interface. By
          narrowing their options, they can pull out specific data points they want to interact with
          instead of seeing an extensive list.
        </p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>
                Use a multiselect dropdown when users need to select more than one item in a long
                list
              </li>
              <li>Provide a concise and descriptive label</li>
              <li>Use sentence case for the options in the dropdown</li>
            </ul>
          }
          Dont={
            <ul>
              <li>Don't use a multiselect dropdown to implement search functionality</li>
              <li>
                Don't use a multiselect dropdown when selecting only one option, use a combobox
                instead
              </li>
              <li>Don't use wordy labels for the options, aim for 1-3 words</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Labels">
          <ul>
            <li>
              The label needs to be helpful in telling the user what is expected of them, but they
              do not need to be instructive
            </li>
            <li>Labels are to be written in sentence case and should only be 1-3 words long</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Options">
          <ul>
            <li>Options should be clear and concise</li>
            <li>List options alphabetically or in a logical order (like frequency of use)</li>
            <li>Write in sentence case</li>
            <li>Avoid punctuation and articles ("the," "a," "an")</li>
          </ul>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="hideSelectAll">
          <p>
            In cases where the options to select or deselect all options are not desired, use the{' '}
            <code>hideSelectAll</code> variant to hide the select all checkbox.
          </p>
          <Canvas>
            <PharosMultiselectDropdown hideSelectAll>
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosMultiselectDropdown>
          </Canvas>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="States">
        <PageSection
          subSectionLevel={1}
          title="Default"
          description="The default state - when no other state attribute is assigned to the multiselect dropdown."
        >
          <Canvas>
            <PharosMultiselectDropdown>
              <span slot="label">Combobox label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosMultiselectDropdown>
          </Canvas>
        </PageSection>
        <PageSection
          subSectionLevel={1}
          title="Disabled"
          description="Display this state when the multiselect dropdown is non-interactive."
        >
          <Canvas>
            <PharosMultiselectDropdown disabled>
              <span slot="label">Multiselect dropdown label</span>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </PharosMultiselectDropdown>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="What’s built in">
          <ul>
            <li>
              ARIA roles and attributes are applied appropriately:
              <ul>
                <li>
                  A trigger button includes <code>aria-expanded</code> and{' '}
                  <code>aria-haspopup="true"</code> to indicate that it controls an expandable list
                  of options
                </li>
                <li>
                  The input element is given the <code>role="combobox"</code>, signaling a widget
                  that allows user input and displays a list of choices
                </li>
                <li>
                  The dropdown menu uses <code>role="listbox"</code> to identify the list of options
                  and includes <code>aria-multiselectable="true"</code> to convey that multiple
                  selections are allowed
                </li>
                <li>
                  Each option is assigned <code>role="option"</code> and utilizes the{' '}
                  <code>aria-selected</code> attribute to convey when something is selected or not
                </li>
              </ul>
            </li>
            <li>
              When users begin typing in the combobox to filter items, an <code>aria-live</code>{' '}
              region is populated giving feedback about how many items have been returned
            </li>
            <li>
              Keyboard navigation supports opening the dropdown, navigating between options,
              selecting multiple items, and closing the list using standard keys (e.g., Tab, Enter,
              Space, Arrow keys, Escape)
            </li>
            <li>
              Focus is managed to ensure that screen readers receive appropriate context and users
              don’t lose their place when interacting with the component
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Considerations">
          <PageSection subSectionLevel={2} title="Design">
            <ul>
              <li>
                Include a persistent, visible label that clearly communicates the purpose of the
                component. Avoid using placeholder text as a substitute for a label
              </li>
              <li>
                Provide clear instructions if the user needs to perform a specific action, such as
                typing to filter options or selecting multiple items
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Development">
            <ul>
              <li>
                Ensure it works as expected within your layout, especially in responsive or dynamic
                views
              </li>
              <li>
                Make sure selected values are handled appropriately in your application logic (e.g.,
                saving, submitting, or displaying elsewhere)
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>
                When users navigate to the trigger button, a screen reader should announce:
                <ul>
                  <li>The currently selected values (if any)</li>
                  <li>
                    That it is a button associated with expandable content (via{' '}
                    <code>aria-haspopup</code> and <code>aria-expanded</code>)
                  </li>
                </ul>
              </li>
              <li>
                When the button is activated:
                <ul>
                  <li>Focus moves to the combobox input</li>
                  <li>The input is announced with its appropriate role and label</li>
                </ul>
              </li>
              <li>
                As users begin typing in the input:
                <ul>
                  <li>An aria-live region announces the number of matching results</li>
                </ul>
              </li>
              <li>Users can navigate through the filtered list using the Arrow Up/Down keys</li>
              <li>Pressing Enter selects the currently focused option</li>
              <li>
                Pressing Tab moves focus to the Cancel and Apply buttons, where users can confirm or
                discard their selections
              </li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>Tab to the trigger button to open the multi-select dropdown</li>
              <li>Press Enter or Space to activate the dropdown</li>
              <li>
                Focus moves to the input field where users can:
                <ul>
                  <li>Begin typing to filter the list of options</li>
                  <li>Use Arrow Down/Up to navigate through the filtered list</li>
                  <li>Press Enter or Space to select or deselect an option</li>
                  <li>Press Tab to move past the list to the Cancel and Apply buttons</li>
                  <li>Use Enter to activate either button and confirm or discard selections</li>
                  <li>Press Escape at any time to close the dropdown without applying changes</li>
                </ul>
              </li>
            </ul>
          </PageSection>
        </PageSection>
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
                target="_blank"
                rel="noopener noreferrer"
              >
                1.3.1 Info and Relationships (A)
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                2.1.1 Keyboard (A)
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
                target="_blank"
                rel="noopener noreferrer"
              >
                4.1.2 Name, Role, Value (A)
              </a>
            </li>
          </ul>
        </PageSection>
      </PageSection>
    </>
  );
};
export default MultiselectDropdownPage;
