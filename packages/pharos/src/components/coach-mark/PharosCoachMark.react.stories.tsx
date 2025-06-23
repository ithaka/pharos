import { PharosCoachMark } from '../../react-components/coach-mark/pharos-coach-mark';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Coach Mark',
  component: PharosCoachMark,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('coach-mark'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <>
      <div
        style={{
          border: '1px solid #eae8e1',
          padding: '20px',
          margin: '200px auto',
          width: 'fit-content',
        }}
        data-coach-mark="example-coachmark"
      >
        Lorem Ipsum
      </div>
      <PharosCoachMark
        id="example-coachmark"
        hide={args.hide}
        side={args.side}
        alignment={args.alignment}
        header={args.header}
        delay={args.delay}
        variant={args.variant}
        width={args.width}
      >
        This is an example Coach Mark
      </PharosCoachMark>
    </>
  ),
  args: {
    hide: false,
    side: 'bottom',
    alignment: 'start',
    header: 'Coach Mark',
    delay: 'short',
    variant: 'dark',
    width: '30ch',
  },
};
