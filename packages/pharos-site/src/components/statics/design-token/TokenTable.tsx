import { tokenTable } from './TokenTable.module.css';
import { PharosHeading } from '@ithaka/pharos/lib/react-components/heading/pharos-heading';

export const TokenTable = (
  title: string,
  content: JSX.Element,
  subtitle?: JSX.Element
): JSX.Element => {
  return (
    <div>
      <PharosHeading level={1} preset={'6'}>
        {title}
      </PharosHeading>
      {subtitle ? <div>{subtitle}</div> : null}
      <table className={tokenTable}>{content}</table>
      <br />
      <br />
    </div>
  );
};
