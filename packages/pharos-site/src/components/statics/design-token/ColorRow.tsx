import { toTokenFormat } from './toTokenFormat';
import { colorExample } from './ColorRow.module.css';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const ColorRow = (color: any): JSX.Element => {
  let OGColorHtml;
  if (color.original.value.startsWith('{color.')) {
    const OGColorToken =
      '$pharos-' +
      color.original.value
        .substring(1)
        .split('.')
        .slice(0, -1)
        .join('-')
        .replace(' ', '-')
        .toLowerCase();
    OGColorHtml = <div>{OGColorToken}</div>;
  }
  return (
    <tr key={color.name + color.value}>
      <td>{toTokenFormat(color.name)}</td>
      <td>
        {OGColorHtml}
        <div>{color.value}</div>
      </td>
      <td>
        <div className={colorExample} style={{ backgroundColor: color.value }}></div>
      </td>
    </tr>
  );
};
