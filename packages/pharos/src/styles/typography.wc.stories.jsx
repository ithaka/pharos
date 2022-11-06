import { html } from 'lit';

export default {
  title: 'Styles/Typography',
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

const theirNames = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const list = html`
  ${theirNames.map((name) => {
    return html` <li>${name}</li> `;
  })}
`;

export const PlainText = {
  render: (args) => html` <span>${args.text}</span> `,
  args: { text: 'I am plain text' },
};

export const BringAttention = {
  name: 'Bring to Attention Text',
  render: (args) =>
    html` <span> This is an example of how to bring attention to <b>${args.text}</b>. </span>`,
  args: { text: 'specific text' },
};

export const StrongText = {
  render: (args) => html` <span> This is an example of <strong>${args.text}</strong>. </span>`,
  args: { text: 'strong text' },
};

export const SmallText = {
  render: (args) => html`<span>This is an example of <small>${args.text}</small></span>`,
  args: { text: 'small text' },
};

export const IdiomaticText = {
  render: (args) =>
    html`<span
      ><i>${args.text}</i> is a beacon leading ships safely toward our collective knowledge.</span
    >`,
  args: { text: 'Pharos' },
};

export const StressEmphasisText = {
  render: (args) => html`<span>This is an example of <em>${args.text}</em>.</span>`,
  args: { text: 'emphasized text' },
};

export const Tables = {
  render: (args) => html`
    <table class="typography-table-example" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>${args.header}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="typography-table-example">Item 1</td>
        </tr>
        <tr>
          <td class="typography-table-example">Item 2</td>
        </tr>
        <tr>
          <td class="typography-table-example">Item 3</td>
        </tr>
      </tbody>
    </table>
  `,
  args: { header: 'Header' },
};

export const OrderedList = {
  render: () => html` <ol>
    ${list}
  </ol>`,
};

export const UnorderedList = {
  render: () => html` <ul>
    ${list}
  </ul>`,
};

export const ListWithoutBullets = {
  name: 'List without Bullets',
  render: () => html` <ul class="list-example__no-bullets">
    ${list}
  </ul>`,
};

export const NestedLists = {
  render: () => html`
    <ul class="list-example__nested">
      <li>
        Item 1
        <ul>
          <li>Item 1.1</li>
        </ul>
      </li>
      <li>
        Item 2
        <ul>
          <li>Item 2.1</li>
        </ul>
      </li>
    </ul>
  `,
};

export const InlineList = {
  render: () => html` <ul class="list-example__inline">
    ${list}
  </ul>`,
};
