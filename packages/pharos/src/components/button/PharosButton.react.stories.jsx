import {
  PharosButton,
  PharosCheckbox,
  PharosCheckboxGroup,
  PharosCombobox,
  PharosRadioButton,
  PharosRadioGroup,
  PharosSelect,
  PharosTextInput,
  PharosTextarea,
} from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { action } from '@storybook/addon-actions';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Button',
  component: PharosButton,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('button'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => (
    <PharosButton
      disabled={args.disabled}
      download={args.download}
      icon={args.icon}
      iconCondensed={args.iconCondensed}
      iconLeft={args.iconLeft}
      iconRight={args.iconRight}
      fullWidth={args.fullWidth}
      href={args.href}
      hreflang={args.hreflang}
      a11yLabel={args.a11yLabel}
      large={args.large}
      isOnBackground={args.isOnBackground}
      ping={args.ping}
      pressed={args.pressed}
      target={args.target}
      type={args.type}
      variant={args.variant}
      onClick={(e) => action('Click')(e.target)}
    >
      {args.text}
    </PharosButton>
  ),
  args: defaultArgs,
};

export const Variants = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: 'repeat(3, 200px)',
      }}
    >
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="primary">Primary</PharosButton>
        <PharosButton name="secondary" variant="secondary">
          Secondary
        </PharosButton>
        <PharosButton name="subtle" variant="subtle">
          Subtle
        </PharosButton>
        <PharosButton name="overlay" variant="overlay">
          Overlay
        </PharosButton>
      </div>
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="primary-disabled" disabled>
          Primary
        </PharosButton>
        <PharosButton name="secondary-disabled" variant="secondary" disabled>
          Secondary
        </PharosButton>
        <PharosButton name="subtle-disabled" variant="subtle" disabled>
          Subtle
        </PharosButton>
        <PharosButton name="overlay-disabled" variant="overlay" disabled>
          Overlay
        </PharosButton>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          display: 'grid',
          gridGap: '1.5rem',
        }}
      >
        <PharosButton name="primary-is-on-background" isOnBackground>
          Primary
        </PharosButton>
        <PharosButton name="secondary-is-on-background" variant="secondary" isOnBackground>
          Secondary
        </PharosButton>
        <PharosButton name="subtle-is-on-background" variant="subtle" isOnBackground>
          Subtle
        </PharosButton>
        <PharosButton name="overlay-is-on-background" variant="overlay" isOnBackground>
          Overlay
        </PharosButton>
      </div>
    </div>
  ),
};

export const Large = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: 'repeat(3, 200px)',
      }}
    >
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="large-primary" large>
          Primary
        </PharosButton>
        <PharosButton name="large-secondary" variant="secondary" large>
          Secondary
        </PharosButton>
        <PharosButton name="large-subtle" variant="subtle" large>
          Subtle
        </PharosButton>
        <PharosButton name="large-overlay" variant="overlay" large>
          Overlay
        </PharosButton>
      </div>
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="large-primary-disabled" large disabled>
          Primary
        </PharosButton>
        <PharosButton name="large-secondary-disabled" variant="secondary" large disabled>
          Secondary
        </PharosButton>
        <PharosButton name="large-subtle-disabled" variant="subtle" large disabled>
          Subtle
        </PharosButton>
        <PharosButton name="large-overlay-disabled" variant="overlay" large disabled>
          Overlay
        </PharosButton>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          display: 'grid',
          gridGap: '1.5rem',
        }}
      >
        <PharosButton name="large-primary-is-on-background" large isOnBackground>
          Primary
        </PharosButton>
        <PharosButton
          name="large-secondary-is-on-background"
          variant="secondary"
          large
          isOnBackground
        >
          Secondary
        </PharosButton>
        <PharosButton name="large-subtle-is-on-background" variant="subtle" large isOnBackground>
          Subtle
        </PharosButton>
        <PharosButton name="large-overlay-is-on-background" variant="overlay" large isOnBackground>
          Overlay
        </PharosButton>
      </div>
    </div>
  ),
};

export const WithIcons = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: 'repeat(3, 200px)',
      }}
    >
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="primary-icon-left" iconLeft="download">
          Icon left
        </PharosButton>
        <PharosButton name="primary-icon-right" iconRight="chevron-down">
          Icon right
        </PharosButton>
        <PharosButton name="primary-icon-both" iconRight="chevron-down" iconLeft="view-gallery">
          Icon both
        </PharosButton>
      </div>
      <div style={{ padding: '1rem', display: 'grid', gridGap: '1.5rem' }}>
        <PharosButton name="primary-icon-left-disabled" iconLeft="download" disabled>
          Icon left
        </PharosButton>
        <PharosButton name="primary-icon-right-disabled" iconRight="chevron-down" disabled>
          Icon right
        </PharosButton>
        <PharosButton
          name="primary-icon-both-disabled"
          iconRight="chevron-down"
          iconLeft="view-gallery"
          disabled
        >
          Icon both
        </PharosButton>
      </div>
      <div
        style={{
          backgroundColor: '#000000',
          padding: '1rem',
          display: 'grid',
          gridGap: '1.5rem',
        }}
      >
        <PharosButton name="primary-icon-left-is-on-background" iconLeft="download" isOnBackground>
          Icon left
        </PharosButton>
        <PharosButton
          name="primary-icon-right-is-on-background"
          iconRight="chevron-down"
          isOnBackground
        >
          Icon right
        </PharosButton>
        <PharosButton
          name="primary-icon-both-is-on-background"
          iconRight="chevron-down"
          iconLeft="view-gallery"
          isOnBackground
        >
          Icon both
        </PharosButton>
      </div>
    </div>
  ),
};

export const IconOnly = {
  ...Base,
  name: 'Icon only',
  args: {
    ...Base.args,
    text: undefined,
    icon: 'download',
    label: 'download',
  },
};

export const IconOnlyCondensed = {
  ...IconOnly,
  name: 'Icon only (condensed)',
  args: {
    ...IconOnly.args,
    iconCondensed: true,
  },
};

export const Link = {
  ...Base,
  args: {
    ...Base.args,
    href: 'https://google.com',
    target: '_blank',
  },
};

export const Forms = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: '300px',
      }}
    >
      <form name="my-form" action="https://httpbin.org/post" method="POST">
        <PharosTextInput name="my-text-input" required>
          <span slot="label">Name</span>
        </PharosTextInput>
        <PharosSelect name="my-select" required style={{ marginTop: '1.5rem' }}>
          <span slot="label">Role</span>
          <option value="1">Student</option>
          <option value="2">Teacher</option>
          <option value="3" selected>
            Librarian
          </option>
        </PharosSelect>
        <PharosCombobox name="my-combobox" value="2" required style={{ marginTop: '1.5rem' }}>
          <span slot="label">State</span>
          <option value="1">New York</option>
          <option value="2">Michigan</option>
          <option value="3">New Jersey</option>
        </PharosCombobox>
        <PharosRadioGroup name="my-radio-group" style={{ marginTop: '1.5rem' }}>
          <span slot="legend">Degree</span>
          <PharosRadioButton value="1">
            <span slot="label">Undergraduate</span>
          </PharosRadioButton>
          <PharosRadioButton value="2">
            <span slot="label">Graduate</span>
          </PharosRadioButton>
        </PharosRadioGroup>
        <PharosCheckboxGroup name="my-checkbox-group" style={{ marginTop: '1.5rem' }}>
          <span slot="legend">Preferences</span>
          <PharosCheckbox value="1">
            <span slot="label">Send me promotions and discounts</span>
          </PharosCheckbox>
          <PharosCheckbox value="2" checked>
            <span slot="label">Send me weekly updates</span>
          </PharosCheckbox>
        </PharosCheckboxGroup>
        <PharosTextarea name="comments" style={{ marginTop: '1.5rem' }}>
          <span slot="label">Comments</span>
        </PharosTextarea>
        <PharosButton type="reset" variant="secondary" style={{ marginTop: '1.5rem' }}>
          Reset
        </PharosButton>

        <PharosButton type="submit" style={{ marginTop: '1.5rem' }}>
          Submit
        </PharosButton>
      </form>
    </div>
  ),
};
