import PageSection from '../PageSection';
import { tokenTable } from './TokenTable.module.css';

export const TokenTable = (
  title: string,
  content: JSX.Element,
  subtitle?: JSX.Element
): JSX.Element => {
  return (
    <div>
      <PageSection title={title} description={subtitle} isHeader>
        <table className={tokenTable}>{content}</table>
      </PageSection>
    </div>
  );
};
