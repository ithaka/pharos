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
        description="TODO: Description for multiselect dropdown"
        isHeader
        istoryBookType="forms"
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
        <p>TODO</p>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>TODO</li>
            </ul>
          }
          Dont={
            <ul>
              <li>TODO</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="TODO">
          <ul>
            <li>TODO</li>
          </ul>
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
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>TODO</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <ul>
            <li>TODO</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>TODO</li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Accessibility best practices for labels:">
            <ul>
              <li>TODO</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>TODO</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>TODO</li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default MultiselectDropdownPage;
