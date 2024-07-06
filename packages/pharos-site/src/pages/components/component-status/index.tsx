import { FC } from 'react';
import PageSection from '../../../components/statics/PageSection';
import StatusLegend from '../../../components/statics/component-status/StatusLegend';
import StatusTable from '../../../components/statics/component-status/StatusTable';
import { PharosLink } from '@ithaka/pharos/lib/react-components';

const ComponentStatusPage: FC = () => {
  return (
    <PageSection
      title="Component Status"
      description={
        <>
          A detailed breakdown of our components and status of their implementation. For
          contributing new component ideas, see the{' '}
          <PharosLink href="https://github.com/ithaka/pharos/blob/develop/docs/README.md">
            contribution guidelines.
          </PharosLink>
        </>
      }
      isHeader
    >
      <StatusLegend />
      <StatusTable />
    </PageSection>
  );
};
export default ComponentStatusPage;
