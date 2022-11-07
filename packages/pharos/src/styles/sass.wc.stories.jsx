import { html } from 'lit';

import sassDoc from '../../sass.json';

export default {
  title: 'Styles/Sass',
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

const tableTitle = (title) => {
  return title
    .split('-')
    .map((str) => str[0].toUpperCase() + str.slice(1))
    .join(' ');
};

const MixinTable = (title) => {
  const mixins = sassDoc.filter((value) => value.context.type === 'mixin');
  return html`
    <div class="token-table-container" style="width: 100%">
      <h2>${tableTitle(title)}</h2>
      <table class="token-table" style="table-layout: fixed">
        <thead>
          <tr>
            <th style="width:20%">Name</th>
            <th style="width:20%">Description</th>
            <th style="width:60%">Code</th>
          </tr>
        </thead>
        <tbody>
          ${mixins.map((mixin) => {
            if (mixin.group.includes(title)) {
              return html`
                <tr>
                  <td>
                    <code style="font-size: var(--pharos-font-size-small)"
                      >${mixin.context.name}</code
                    >
                  </td>
                  <td>${mixin.description}</td>
                  <td>
                    <div
                      style="background-color:var(--pharos-color-marble-gray-97); border-style: solid; border-color: var(--pharos-color-marble-gray-80); padding-bottom:var(--pharos-spacing-one-eighth-x); border-width: 1px"
                    >
                      <code
                        style="background-color:var(--pharos-color-marble-gray-97); font-size:var(--pharos-font-size-micro); white-space: pre;"
                      >
                        ${mixin.context.code}</code
                      >
                    </div>
                  </td>
                </tr>
              `;
            }
          })}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  `;
};

export const Mixins = {
  render: (_) => html`
    ${MixinTable('buttons')} ${MixinTable('form-elements')} ${MixinTable('interaction')}
    ${MixinTable('layout')} ${MixinTable('links')} ${MixinTable('typography')}
  `,
};
