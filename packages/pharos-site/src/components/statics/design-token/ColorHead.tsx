import { firstColumn, secondColumn, thirdColumn } from './ColorHead.module.css';

export const ColorHead = (): JSX.Element => {
  return (
    <thead>
      <tr>
        <th className={firstColumn}>Token</th>
        <th className={secondColumn}>Value</th>
        <th className={thirdColumn}>Example</th>
      </tr>
    </thead>
  );
};
