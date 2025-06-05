import { Fragment } from 'react';
import { action } from 'storybook/actions';

import { PharosRadioButton, PharosLink } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Forms/Radio Button',
  component: PharosRadioButton,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('radio-button') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) => (
    <PharosRadioButton
      checked={args.checked}
      disabled={args.disabled}
      hideLabel={args.hideLabel}
      invalidated={args.invalidated}
      required={args.required}
      message={args.message}
    >
      <span slot="label">{args.label}</span>
    </PharosRadioButton>
  ),
  args: defaultArgs,
};

export const States = {
  render: () => (
    <Fragment>
      <div>
        <div>
          <PharosRadioButton name="base">
            <span slot="label">Normal Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="disabled" disabled>
            <span slot="label">Disabled Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="checked" checked>
            <span slot="label">Checked Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="checked-disabled" checked disabled>
            <span slot="label">Disabled & Checked Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="multi" checked>
            <div slot="label">
              <div>Checked button</div>
              <div>Multiple lines</div>
            </div>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="invalidated" invalidated>
            <span slot="label">Error Button</span>
          </PharosRadioButton>
        </div>
        <div>
          <PharosRadioButton name="with-link">
            <span slot="label">
              Label with a <PharosLink href="#">link</PharosLink>
            </span>
          </PharosRadioButton>
        </div>
      </div>
    </Fragment>
  ),
};

export const Events = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 250px)',
      }}
    >
      <PharosRadioButton
        value="My value"
        onChange={(e) => action('Change')(e.target.checked)}
        onInput={(e) => action('Input')(e.target.value)}
        onClick={(e) => action('Click')(e.target.checked)}
      >
        <span slot="label">I fire events</span>
      </PharosRadioButton>
    </div>
  ),
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Validity = {
  ...Base,
  args: {
    ...Base.args,
    invalidated: true,
    required: true,
    message: 'This field is required, please make a selection',
  },
};
