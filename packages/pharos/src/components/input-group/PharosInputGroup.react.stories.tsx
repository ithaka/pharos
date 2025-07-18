import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  PharosInputGroup,
  PharosInputGroupSelect,
  PharosButton,
  PharosIcon,
} from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Forms/Input Group',
  component: PharosInputGroup,
  subcomponents: { PharosInputGroupSelect },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('input-group') },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 524px)',
      }}
    >
      <PharosInputGroup name="my-input-group">
        <span slot="label">Search</span>
        <PharosButton
          name="search-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
    </div>
  ),
};

export const Prominent: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 524px)',
      }}
    >
      <PharosInputGroup name="my-input-group" variant="prominent">
        <span slot="label">Search</span>
        <PharosButton
          name="search-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
    </div>
  ),
};

export const Validity: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 524px)',
      }}
    >
      <PharosInputGroup invalidated value="not an email" name="my-input-group">
        <span slot="label">Search</span>
        <PharosButton
          name="search-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
      <PharosInputGroup validated value="here@there.com" name="my-input-group">
        <span slot="label">Search</span>
        <PharosButton
          name="search-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
    </div>
  ),
};

export const Composition: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(1, 524px)',
      }}
    >
      <PharosInputGroup name="my-input-group-icon">
        <span slot="label">With icons</span>
        <PharosIcon id="calendar" name="calendar" a11yHidden="true"></PharosIcon>
      </PharosInputGroup>
      <PharosInputGroup name="my-input-group-buttons">
        <span slot="label">Multiple buttons</span>
        <PharosButton
          name="close-button"
          icon="close"
          variant="subtle"
          a11yLabel="close"
        ></PharosButton>
        <PharosButton
          name="search-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
      <PharosInputGroup name="my-input-group-select">
        <span slot="label">With select</span>
        <PharosInputGroupSelect name="my-group-select" hideLabel>
          <span slot="label">Search</span>
          <option value="">Search all content</option>
          <option value="book">Search within this book</option>
        </PharosInputGroupSelect>
        <PharosButton
          name="search-with-select-button"
          icon="search"
          variant="subtle"
          a11yLabel="search"
        ></PharosButton>
      </PharosInputGroup>
      <PharosInputGroup name="my-input-group-prepend">
        <PharosButton
          name="book-button"
          slot="prepend"
          icon="book"
          variant="subtle"
          a11yLabel="book"
        ></PharosButton>
        <span slot="label">Prepend</span>
      </PharosInputGroup>
    </div>
  ),
};
