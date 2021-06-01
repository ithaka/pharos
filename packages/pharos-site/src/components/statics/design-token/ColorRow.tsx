import { toTokenFormat } from './toTokenFormat';

export const ColorRow = (color) => {
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
    <tr>
      <td style={{ width: '50%' }}>{toTokenFormat(color.name)}</td>
      <td style={{ width: '25%' }}>
        {OGColorHtml}
        <div>{color.value}</div>
      </td>
      <td style={{ width: '25%' }}>
        <div className="color-example" style={{ backgroundColor: color.value }}></div>
      </td>
    </tr>
  );
};
