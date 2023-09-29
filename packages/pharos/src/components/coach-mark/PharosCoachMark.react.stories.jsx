import { PharosCoachMark } from '../../react-components/coach-mark/pharos-coach-mark';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
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
};

export const Base = {
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
