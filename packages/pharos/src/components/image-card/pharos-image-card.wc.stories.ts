import { html } from 'lit';
import { viewports } from '../../pages/shared/viewports';

import { items, collections } from '../../pages/item-detail/mocks';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';

import collection5 from '../../utils/_storybook/assets/images/item-detail/collection_5.png';
import collection1 from '../../utils/_storybook/assets/images/item-detail/open_collection_1.png';
import collection2 from '../../utils/_storybook/assets/images/item-detail/open_collection_2.png';
import collection3 from '../../utils/_storybook/assets/images/item-detail/open_collection_3.png';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Image Card',
  component: 'pharos-image-card',
  parameters: {
    docs: { page: configureDocsPage('image-card') },
    viewport: viewports,
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const Template: Story = {
  render: (args) =>
    html`<storybook-pharos-layout style="margin: 1rem 0"
      ><storybook-pharos-image-card
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        .error=${args.error}
        .subtle=${args.subtle}
        .indicate-link-visited=${args.indicateLinkVisited}
        style="grid-column: span 2"
      >
        <img id="image" src="${collection5}" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
        <div id="item-date" slot="metadata">1889-1892 (creation)</div>
        <div id="collection" slot="metadata">
          Part of
          <storybook-pharos-link
            href="https://www.jstor.org/site/pratt/buildings-image"
            .is-on-background=${args.subtle}
            >Pratt Institute Buildings Image Collection</storybook-pharos-link
          >
        </div>
      </storybook-pharos-image-card></storybook-pharos-layout
    >`,
  args: defaultArgs,
};

export const Base: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      ${items.map((item, index) => {
        return html` <li style="grid-column: span 2">
          <storybook-pharos-image-card id="card-${index}" title="Card Title" link="#">
            <img id="image-${index}" src="${item.image}" alt="Card Title ${index}" slot="image" />
            <div id="creator-${index}" slot="metadata">Creator of the item</div>
            <div id="item-date-${index}" slot="metadata">1990-2000</div>
            <div id="collection-${index}" slot="metadata">
              Part of
              <storybook-pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
                >An Example Collection
              </storybook-pharos-link>
            </div>
          </storybook-pharos-image-card>
        </li>`;
      })}
    </storybook-pharos-layout>`,
};

export const WithSourceTypes: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      ${items.map((item, index) => {
        return html` <li style="grid-column: span 2">
          <storybook-pharos-image-card
            id="card-${index}"
            title="Card Title"
            link="#"
            source-type="Image"
          >
            <img id="image-${index}" src="${item.image}" alt="Card Title ${index}" slot="image" />
            <div id="creator-${index}" slot="metadata">Creator of the item</div>
            <div id="item-date-${index}" slot="metadata">1990-2000</div>
            <div id="collection-${index}" slot="metadata">
              Part of
              <storybook-pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
                >An Example Collection
              </storybook-pharos-link>
            </div>
          </storybook-pharos-image-card>
        </li>`;
      })}
    </storybook-pharos-layout>`,
};

export const Collection: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      ${collections.map((collection, index) => {
        return html` <li class="image-card-example__card--collection">
          <storybook-pharos-image-card
            id="card-${index}"
            title="${collection.title}"
            link="#"
            variant="collection"
          >
            <img
              id="image-${index}"
              src="${collection.image}"
              alt="${collection.title}"
              slot="image"
            />
            <strong id="items-${index}" slot="metadata">${collection.items} items</strong>
            <div id="description-${index}" slot="metadata">
              Selections from the global permanent collection.
            </div>
          </storybook-pharos-image-card>
        </li>`;
      })}
      <li class="image-card-example__card--collection">
        <storybook-pharos-image-card id="card-1" link="#" variant="collection">
          <img
            id="image-1"
            src="${collections[0].image}"
            alt="${collections[0].title}"
            slot="image"
          />
          <div slot="title">
            <storybook-pharos-link href="#"
              >${collections[0].title} metadata link</storybook-pharos-link
            >
          </div>
          <strong id="items-1" slot="metadata">${collections[0].items} items</strong>
          <div id="description-1" slot="metadata">
            Selections from the global permanent collection.
          </div>
        </storybook-pharos-image-card>
      </li>
    </storybook-pharos-layout>`,
};

export const ErrorStateCollection: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      ${collections.map((collection, index) => {
        return html` <li class="image-card-example__card--collection">
          <storybook-pharos-image-card
            id="card-${index}"
            title="${collection.title}"
            link="#"
            variant="collection"
            .error=${index === 2}
          >
            <img
              id="image-${index}"
              src="${collection.image}"
              alt="${collection.title}"
              slot="image"
            />
            <strong id="items-${index}" slot="metadata">${collection.items} items</strong>
            <div id="description-${index}" slot="metadata">
              Selections from the global permanent collection.
            </div>
          </storybook-pharos-image-card>
        </li>`;
      })}
    </storybook-pharos-layout>`,
};

export const Promotional: Story = {
  render: () =>
    html` <storybook-pharos-layout style="margin: 1rem 0">
      <div class="image-card-example__card--promotional">
        <storybook-pharos-image-card
          title="Bring your work to life with images"
          link="#"
          variant="promotional"
        >
          <img src="${collection3}" alt="" slot="image" />
          <p slot="metadata">
            Harness the power of visual materials—explore more than 3 million images now on JSTOR.
          </p>
        </storybook-pharos-image-card>
        <storybook-pharos-button variant="secondary">Search for images</storybook-pharos-button>
      </div>
    </storybook-pharos-layout>`,
};

export const Selectable: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selectable"
          link="#"
          source-type="Image"
          variant="selectable"
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle-select
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          selected
          disabled
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error
          subtle-select
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
    </storybook-pharos-layout>`,
};

export const SubtleSelectable: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selectable"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle
          subtle-select
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
          <storybook-pharos-button
            slot="overlay"
            variant="overlay"
            icon="save"
            a11y-label="Save"
            style="position: absolute; bottom: 20px; right: 20px;"
          ></storybook-pharos-button>
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle
          disabled
          selected
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle
          error
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle
          error
          subtle-select
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
    </storybook-pharos-layout>`,
};

export const ErrorState: Story = {
  ...Template,
  args: {
    ...Template.args,
    error: true,
  },
};

export const SubtleState: Story = {
  ...Template,
  args: {
    ...Template.args,
    subtle: true,
  },
};

export const VisitedTitleLink: Story = {
  ...Template,
  args: {
    ...Template.args,
    indicateLinkVisited: true,
  },
};

export const WithActionMenu: Story = {
  render: () => html`
    <storybook-pharos-layout style="margin: 1rem 0">
      <storybook-pharos-image-card
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        action-menu="my-dropdown-menu"
        style="grid-column: span 2"
      >
        <img id="image" src="${collection5}" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
        <div id="item-date" slot="metadata">1889-1892 (creation)</div>
        <div id="collection" slot="metadata">
          Part of
          <storybook-pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
            >Pratt Institute Buildings Image Collection</storybook-pharos-link
          >
        </div>
      </storybook-pharos-image-card>
    </storybook-pharos-layout>
    <storybook-pharos-dropdown-menu id="my-dropdown-menu">
      <storybook-pharos-dropdown-menu-item>Item 1</storybook-pharos-dropdown-menu-item>
      <storybook-pharos-dropdown-menu-item>Item 2</storybook-pharos-dropdown-menu-item>
      <storybook-pharos-dropdown-menu-item>Item 3</storybook-pharos-dropdown-menu-item>
    </storybook-pharos-dropdown-menu>
  `,
};

export const WithActionButtonSlot: Story = {
  render: () => html`
    <storybook-pharos-layout style="margin: 1rem 0">
      <storybook-pharos-image-card
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        style="grid-column: span 2"
      >
        <img id="image" src="${collection5}" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
        <div id="item-date" slot="metadata">1889-1892 (creation)</div>
        <div id="collection" slot="metadata">
          Part of
          <storybook-pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
            >Pratt Institute Buildings Image Collection</storybook-pharos-link
          >
        </div>
        <storybook-pharos-button
          slot="action-button"
          data-dropdown-menu-id="dropdownId"
          icon="ellipses-vertical"
          a11y-label="More options"
          icon-condensed
          variant="subtle"
        ></storybook-pharos-button>
      </storybook-pharos-image-card>
      <storybook-pharos-dropdown-menu id="dropdownId">
        <storybook-pharos-dropdown-menu-item>Item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </storybook-pharos-layout>
  `,
};

export const WithOverlayButtonSlot: Story = {
  render: () => html`
    <storybook-pharos-layout style="margin: 1rem 0">
      <storybook-pharos-image-card
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        style="grid-column: span 3"
        variant="selectable"
      >
        <img id="image" src="${collection5}" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
        <div id="item-date" slot="metadata">1889-1892 (creation)</div>
        <div id="collection" slot="metadata">
          Part of
          <storybook-pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
            >Pratt Institute Buildings Image Collection</storybook-pharos-link
          >
        </div>
        <storybook-pharos-button
          slot="overlay"
          data-dropdown-menu-id="saveDropdownId"
          icon="save"
          icon-condensed
          a11y-label="Save"
          variant="overlay"
          style="position: absolute; bottom: 5px; right: 5px;"
        ></storybook-pharos-button>
        <storybook-pharos-button
          slot="action-button"
          data-dropdown-menu-id="dropdownId"
          icon="ellipses-vertical"
          icon-condensed
          a11y-label="More options"
          variant="subtle"
        ></storybook-pharos-button>
      </storybook-pharos-image-card>
      <storybook-pharos-dropdown-menu id="saveDropdownId">
        <storybook-pharos-dropdown-menu-item>Save</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
      <storybook-pharos-dropdown-menu id="dropdownId">
        <storybook-pharos-dropdown-menu-item>Item 1</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 2</storybook-pharos-dropdown-menu-item>
        <storybook-pharos-dropdown-menu-item>Item 3</storybook-pharos-dropdown-menu-item>
      </storybook-pharos-dropdown-menu>
    </storybook-pharos-layout>
  `,
};

export const SelectableCollection: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      <li class="image-card-example__card--collection">
        <storybook-pharos-image-card title="Selectable" link="#" variant="selectable-collection">
          <img src="${collection1}" alt="south hall" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </storybook-pharos-image-card>
      </li>
      <li class="image-card-example__card--collection">
        <storybook-pharos-image-card
          title="Subtle Select"
          link="#"
          variant="selectable-collection"
          subtle-select
        >
          <img src="${collection2}" alt="south hall" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </storybook-pharos-image-card>
      </li>
      <li class="image-card-example__card--collection">
        <storybook-pharos-image-card
          title="Selected Disabled"
          link="#"
          variant="selectable-collection"
          disabled
          selected
        >
          <img src="${collection3}" alt="south hall" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </storybook-pharos-image-card>
      </li>
    </storybook-pharos-layout>`,
};

export const Disabled: Story = {
  render: () =>
    html` <storybook-pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <storybook-pharos-image-card title="Disabled" link="#" source-type="Image" disabled>
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selectable Disabled"
          link="#"
          source-type="Image"
          disabled
          variant="selectable"
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <storybook-pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          disabled
          selected
        >
          <img src="${collection5}" alt="Card Title" slot="image" />
        </storybook-pharos-image-card>
      </li>
    </storybook-pharos-layout>`,
};
