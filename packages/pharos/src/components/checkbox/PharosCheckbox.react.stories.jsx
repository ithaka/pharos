import { action } from '@storybook/addon-actions';

import { PharosCheckbox, PharosLink } from '../../react-components';
import { defaultArgs } from './storyArgs';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Forms/Checkbox',
  component: PharosCheckbox,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('checkbox') },
    options: {
      selectedPanel: 'addon-controls',
    },
  },
};

export const Base = {
  render: (args) => (
    <PharosCheckbox
      checked={args.checked}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      required={args.required}
      indeterminate={args.indeterminate}
      invalidated={args.invalidated}
      message={args.message}
    >
      <span slot="label">{args.label}</span>
    </PharosCheckbox>
  ),
  args: defaultArgs,
};

export const States = {
  render: () => (
    <div>
      <div>
        <PharosCheckbox name="one">
          <span slot="label">Normal checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="two" disabled>
          <span slot="label">Disabled checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="three" checked>
          <span slot="label">Checked checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="four" checked disabled>
          <span slot="label">Disabled & Checked checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="five" checked>
          <div slot="label">
            <div>Checked checkbox</div>
            <div>Multiple lines</div>
          </div>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="six" invalidated>
          <span slot="label">Error checkbox</span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="seven">
          <span slot="label">
            Label with a <PharosLink href="#">link</PharosLink>
          </span>
        </PharosCheckbox>
      </div>
      <div>
        <PharosCheckbox name="eight" indeterminate>
          <span slot="label">Indeterminate checkbox</span>
        </PharosCheckbox>
      </div>
    </div>
  ),
};

export const Events = {
  render: () => (
    <PharosCheckbox
      value="My value"
      onChange={(e) => action('Change')(e.target.checked)}
      onInput={(e) => action('Input')(e.target.value)}
      onClick={(e) => action('Click')(e.target.checked)}
    >
      <span slot="label">I fire events</span>
    </PharosCheckbox>
  ),
  parameters: {
    options: { selectedPanel: 'addon-actions' },
  },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    required: true,
    invalidated: true,
    message: 'This field is required, please make a selection',
  },
};

export const IsOnBackground = {
  name: 'On background',
  render: () => (
    <div>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="is-on-background" isOnBackground>
          <span slot="label">Unchecked</span>
        </PharosCheckbox>
      </div>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="is-on-background" isOnBackground checked>
          <span slot="label">Checked</span>
        </PharosCheckbox>
      </div>
      <div className="checkbox-example__container--is-on-background">
        <PharosCheckbox name="indeterminate" isOnBackground indeterminate>
          <span slot="label">Indeterminate</span>
        </PharosCheckbox>
      </div>
    </div>
  ),
};
