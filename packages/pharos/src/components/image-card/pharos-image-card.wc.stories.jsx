import { html } from 'lit';
import { viewports } from '../../pages/shared/viewports';

import { items, collections } from '../../pages/item-detail/mocks';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Image Card',
  component: 'pharos-image-card',
  parameters: {
    docs: { page: configureDocsPage('image-card') },
    viewport: viewports,
  },
};

const Template = {
  render: (args) =>
    html`<pharos-layout style="margin: 1rem 0"
      ><pharos-image-card
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        ?error=${args.error}
        ?subtle=${args.subtle}
        style="grid-column: span 2"
      >
        <img id="image" src="./images/item-detail/collection_5.png" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
        <div id="item-date" slot="metadata">1889-1892 (creation)</div>
        <div id="collection" slot="metadata">
          Part of
          <pharos-link
            href="https://www.jstor.org/site/pratt/buildings-image"
            ?on-background=${args.subtle}
            >Pratt Institute Buildings Image Collection</pharos-link
          >
        </div>
      </pharos-image-card></pharos-layout
    >`,
  args: defaultArgs,
};

export const Base = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      ${items.map((item, index) => {
        return html` <li style="grid-column: span 2">
          <pharos-image-card id="card-${index}" title="Card Title" link="#">
            <img
              id="image-${index}"
              src="./images/item-detail/${item.image}"
              alt="Card Title ${index}"
              slot="image"
            />
            <div id="creator-${index}" slot="metadata">Creator of the item</div>
            <div id="item-date-${index}" slot="metadata">1990-2000</div>
            <div id="collection-${index}" slot="metadata">
              Part of
              <pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
                >An Example Collection
              </pharos-link>
            </div>
          </pharos-image-card>
        </li>`;
      })}
    </pharos-layout>`,
};

export const WithSourceTypes = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      ${items.map((item, index) => {
        return html` <li style="grid-column: span 2">
          <pharos-image-card id="card-${index}" title="Card Title" link="#" source-type="Image">
            <img
              id="image-${index}"
              src="./images/item-detail/${item.image}"
              alt="Card Title ${index}"
              slot="image"
            />
            <div id="creator-${index}" slot="metadata">Creator of the item</div>
            <div id="item-date-${index}" slot="metadata">1990-2000</div>
            <div id="collection-${index}" slot="metadata">
              Part of
              <pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
                >An Example Collection
              </pharos-link>
            </div>
          </pharos-image-card>
        </li>`;
      })}
    </pharos-layout>`,
};

export const Collection = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      ${collections.map((collection, index) => {
        return html` <li class="image-card-example__card--collection">
          <pharos-image-card
            id="card-${index}"
            title="${collection.title}"
            link="#"
            variant="collection"
          >
            <img
              id="image-${index}"
              src="./images/item-detail/${collection.image}"
              alt="${collection.title}"
              slot="image"
            />
            <strong id="items-${index}" slot="metadata">${collection.items} items</strong>
            <div id="description-${index}" slot="metadata">
              Selections from the global permanent collection.
            </div>
          </pharos-image-card>
        </li>`;
      })}
    </pharos-layout>`,
};

export const Promotional = {
  render: () =>
    html` <pharos-layout style="margin: 1rem 0">
      <div class="image-card-example__card--promotional">
        <pharos-image-card
          title="Bring your work to life with images"
          link="#"
          variant="promotional"
        >
          <img src="./images/item-detail/open_collection_3.png" alt="" slot="image" />
          <p slot="metadata">
            Harness the power of visual materials—explore more than 3 million images now on JSTOR.
          </p>
        </pharos-image-card>
        <pharos-button variant="secondary">Search for images</pharos-button>
      </div>
    </pharos-layout>`,
};

export const Selectable = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <pharos-image-card title="Selectable" link="#" source-type="Image" variant="selectable">
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
    </pharos-layout>`,
};

export const SubtleSelectable = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selectable"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          error="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          error="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
    </pharos-layout>`,
};

export const ErrorState = {
  ...Template,
  args: {
    ...Template.args,
    error: true,
  },
};

export const SubtleState = {
  ...Template,
  args: {
    ...Template.args,
    subtle: true,
  },
};

export const VisitedTitleLink = {
  ...Template,
  args: {
    ...Template.args,
    indicatedLinkVisited: true,
  },
};

export const WithActionMenu = {
  render: () =>
    html`
      <pharos-layout style="margin: 1rem 0">
        <pharos-image-card
          title="South Hall"
          link="https://www.jstor.org/stable/10.2307/community.26220188"
          action-menu="my-dropdown-menu"
          style="grid-column: span 2"
        >
          <img
            id="image"
            src="./images/item-detail/collection_5.png"
            alt="south hall"
            slot="image"
          />
          <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
          <div id="item-date" slot="metadata">1889-1892 (creation)</div>
          <div id="collection" slot="metadata">
            Part of
            <pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
              >Pratt Institute Buildings Image Collection</pharos-link
            >
          </div>
        </pharos-image-card>
      </pharos-layout>
      <pharos-dropdown-menu id="my-dropdown-menu">
        <pharos-dropdown-menu-item>Item 1</pharos-dropdown-menu-item>
        <pharos-dropdown-menu-item>Item 2</pharos-dropdown-menu-item>
        <pharos-dropdown-menu-item>Item 3</pharos-dropdown-menu-item>
      </pharos-dropdown-menu>
    `,
};

export const WithActionButtonSlot = {
  render: () =>
    html`
      <pharos-layout style="margin: 1rem 0">
        <pharos-image-card
          title="South Hall"
          link="https://www.jstor.org/stable/10.2307/community.26220188"
          style="grid-column: span 2"
        >
          <img
            id="image"
            src="./images/item-detail/collection_5.png"
            alt="south hall"
            slot="image"
          />
          <div id="creator" slot="metadata">Tubby, William Bunker (American architect,...</div>
          <div id="item-date" slot="metadata">1889-1892 (creation)</div>
          <div id="collection" slot="metadata">
            Part of
            <pharos-link href="https://www.jstor.org/site/pratt/buildings-image"
              >Pratt Institute Buildings Image Collection</pharos-link
            >
          </div>
          <pharos-button
            slot="action-button"
            data-dropdown-menu-id="dropdownId"
            icon="ellipses-vertical"
            icon-condensed
            variant="subtle"
          ></pharos-button>
        </pharos-image-card>
        <pharos-dropdown-menu id="dropdownId">
          <pharos-dropdown-menu-item>Item 1</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 2</pharos-dropdown-menu-item>
          <pharos-dropdown-menu-item>Item 3</pharos-dropdown-menu-item>
        </pharos-dropdown-menu>
      </pharos-layout>
    `,
};

export const SelectableCollection = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      <li class="image-card-example__card--collection">
        <pharos-image-card title="Selectable" link="#" variant="selectable-collection">
          <img src="./images/item-detail/open_collection_1.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </pharos-image-card>
      </li>
      <li class="image-card-example__card--collection">
        <pharos-image-card
          title="Subtle Select"
          link="#"
          variant="selectable-collection"
          subtle-select="true"
        >
          <img src="./images/item-detail/open_collection_2.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </pharos-image-card>
      </li>
      <li class="image-card-example__card--collection">
        <pharos-image-card
          title="Selected Disabled"
          link="#"
          variant="selectable-collection"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/open_collection_3.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </pharos-image-card>
      </li>
    </pharos-layout>`,
};

export const Disabled = {
  render: () =>
    html` <pharos-layout tag="ol" style="margin: 1rem 0">
      <li style="grid-column: span 3">
        <pharos-image-card title="Disabled" link="#" source-type="Image" disabled="true">
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selectable Disabled"
          link="#"
          source-type="Image"
          disabled="true"
          variant="selectable"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
      <li style="grid-column: span 3">
        <pharos-image-card
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </pharos-image-card>
      </li>
    </pharos-layout>`,
};
