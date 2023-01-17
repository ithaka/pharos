import { Fragment } from 'react';
import { viewports } from '../../pages/shared/viewports';

import {
  PharosButton,
  PharosImageCard,
  PharosLayout,
  PharosLink,
  PharosDropdownMenu,
  PharosDropdownMenuItem,
} from '../../react-components';

import { items, collections } from '../../pages/item-detail/mocks';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs } from './storyArgs';

export default {
  title: 'Components/Image Card',
  component: PharosImageCard,
  parameters: {
    docs: { page: configureDocsPage('image-card') },
    viewport: viewports,
  },
};

const Template = {
  render: (args) => (
    <PharosLayout style={{ margin: '1rem 0' }}>
      <PharosImageCard
        title="South Hall"
        link="https://www.jstor.org/stable/10.2307/community.26220188"
        error={args.error}
        subtle={args.subtle}
        style={{ gridColumn: 'span 2' }}
      >
        <img id="image" src="./images/item-detail/collection_5.png" alt="south hall" slot="image" />
        <div id="creator" slot="metadata">
          Tubby, William Bunker (American architect,...
        </div>
        <div id="item-date" slot="metadata">
          1889-1892 (creation)
        </div>
        <div id="collection" slot="metadata">
          Part of
          <PharosLink
            href="https://www.jstor.org/site/pratt/buildings-image"
            onBackground={args.subtle}
          >
            Pratt Institute Buildings Image Collection
          </PharosLink>
        </div>
      </PharosImageCard>
    </PharosLayout>
  ),
  args: defaultArgs,
};

export const Base = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      {items.map((item, index) => {
        return (
          <li style={{ gridColumn: 'span 2' }} key={index}>
            <PharosImageCard id={`card-${index}`} title="Card Title" link="#">
              <img
                id={`image-${index}`}
                src={`./images/item-detail/${item.image}`}
                alt={`Card Title ${index}`}
                slot="image"
              />
              <div id={`creator-${index}`} slot="metadata">
                Creator of the item
              </div>
              <div id={`item-date-${index}`} slot="metadata">
                1990-2000
              </div>
              <div id={`collection-${index}`} slot="metadata">
                Part of{' '}
                <PharosLink href="https://www.jstor.org/site/pratt/buildings-image">
                  An Example Collection
                </PharosLink>
              </div>
            </PharosImageCard>
          </li>
        );
      })}
    </PharosLayout>
  ),
};

export const WithSourceTypes = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      {items.map((item, index) => {
        return (
          <li style={{ gridColumn: 'span 2' }} key={index}>
            <PharosImageCard id={`card-${index}`} title="Card Title" link="#" source-type="Image">
              <img
                id={`image-${index}`}
                src={`./images/item-detail/${item.image}`}
                alt={`Card Title ${index}`}
                slot="image"
              />
              <div id={`creator-${index}`} slot="metadata">
                Creator of the item
              </div>
              <div id={`item-date-${index}`} slot="metadata">
                1990-2000
              </div>
              <div id={`collection-${index}`} slot="metadata">
                Part of{' '}
                <PharosLink href="https://www.jstor.org/site/pratt/buildings-image">
                  An Example Collection
                </PharosLink>
              </div>
            </PharosImageCard>
          </li>
        );
      })}
    </PharosLayout>
  ),
};

export const Collection = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      {collections.map((collection, index) => {
        return (
          <li className="image-card-example__card--collection" key={index}>
            <PharosImageCard
              id={`card-${index}`}
              title={collection.title}
              link="#"
              variant="collection"
            >
              <img
                id={`image-${index}`}
                src={`./images/item-detail/${collection.image}`}
                alt={collection.title}
                slot="image"
              />
              <strong id={`items-${index}`} slot="metadata">
                {collection.items} items
              </strong>
              <div id={`description-${index}`} slot="metadata">
                Selections from the global permanent collection.
              </div>
            </PharosImageCard>
          </li>
        );
      })}
    </PharosLayout>
  ),
};

export const Promotional = {
  render: () => (
    <PharosLayout style={{ margin: '1rem 0' }}>
      <div className="image-card-example__card--promotional">
        <PharosImageCard title="Bring your work to life with images" link="#" variant="promotional">
          <img src="./images/item-detail/open_collection_3.png" alt="" slot="image" />
          <p slot="metadata">
            Harness the power of visual materials—explore more than 3 million images now on JSTOR.
          </p>
        </PharosImageCard>
        <PharosButton variant="secondary">Search for images</PharosButton>
      </div>
    </PharosLayout>
  ),
};

export const Selectable = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard title="Selectable" link="#" source-type="Image" variant="selectable">
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          error="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
    </PharosLayout>
  ),
};

export const SubtleSelectable = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selectable"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Subtle select"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selectable Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          error="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Subtle Select Error State"
          link="#"
          source-type="Image"
          variant="selectable"
          subtle="true"
          error="true"
          subtle-select="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
    </PharosLayout>
  ),
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
    indicateLinkVisited: true,
  },
};

export const WithActionMenu = {
  render: () => (
    <Fragment>
      <PharosLayout style={{ margin: '1rem 0' }}>
        <PharosImageCard
          title="South Hall"
          link="https://www.jstor.org/stable/10.2307/community.26220188"
          actionMenu="my-dropdown-menu"
          style={{ gridColumn: 'span 2' }}
        >
          <img
            id="image"
            src="./images/item-detail/collection_5.png"
            alt="south hall"
            slot="image"
          />
          <div id="creator" slot="metadata">
            Tubby, William Bunker (American architect,...
          </div>
          <div id="item-date" slot="metadata">
            1889-1892 (creation)
          </div>
          <div id="collection" slot="metadata">
            Part of
            <PharosLink href="https://www.jstor.org/site/pratt/buildings-image">
              Pratt Institute Buildings Image Collection
            </PharosLink>
          </div>
        </PharosImageCard>
      </PharosLayout>
      <PharosDropdownMenu id="my-dropdown-menu">
        <PharosDropdownMenuItem>Item 1</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 2</PharosDropdownMenuItem>
        <PharosDropdownMenuItem>Item 3</PharosDropdownMenuItem>
      </PharosDropdownMenu>
    </Fragment>
  ),
};

export const WithActionButtonSlot = {
  render: () => (
    <Fragment>
      <PharosLayout style={{ margin: '1rem 0' }}>
        <PharosImageCard
          title="South Hall"
          link="https://www.jstor.org/stable/10.2307/community.26220188"
          style={{ gridColumn: 'span 2' }}
        >
          <img
            id="image"
            src="./images/item-detail/collection_5.png"
            alt="south hall"
            slot="image"
          />
          <div id="creator" slot="metadata">
            Tubby, William Bunker (American architect,...
          </div>
          <div id="item-date" slot="metadata">
            1889-1892 (creation)
          </div>
          <div id="collection" slot="metadata">
            Part of
            <PharosLink href="https://www.jstor.org/site/pratt/buildings-image">
              Pratt Institute Buildings Image Collection
            </PharosLink>
          </div>
          <PharosButton
            slot="action-button"
            data-dropdown-menu-id="dropdownId"
            icon="ellipses-vertical"
            iconCondensed
            variant="subtle"
          ></PharosButton>
        </PharosImageCard>
        <PharosDropdownMenu id="dropdownId">
          <PharosDropdownMenuItem>Item 1</PharosDropdownMenuItem>
          <PharosDropdownMenuItem>Item 2</PharosDropdownMenuItem>
          <PharosDropdownMenuItem>Item 3</PharosDropdownMenuItem>
        </PharosDropdownMenu>
      </PharosLayout>
    </Fragment>
  ),
};

export const SelectableCollection = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      <li className="image-card-example__card--collection">
        <PharosImageCard title="Selectable" link="#" variant="selectable-collection">
          <img src="./images/item-detail/open_collection_1.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </PharosImageCard>
      </li>
      <li className="image-card-example__card--collection">
        <PharosImageCard
          title="Subtle Select"
          link="#"
          variant="selectable-collection"
          subtle-select="true"
        >
          <img src="./images/item-detail/open_collection_2.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </PharosImageCard>
      </li>
      <li className="image-card-example__card--collection">
        <PharosImageCard
          title="Selected Disabled"
          link="#"
          variant="selectable-collection"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/open_collection_3.png" slot="image" />
          <strong slot="metadata">50 items</strong>
          <div slot="metadata">Selections from the global permanent collection.</div>
        </PharosImageCard>
      </li>
    </PharosLayout>
  ),
};

export const Disabled = {
  render: () => (
    <PharosLayout tag="ol" style={{ margin: '1rem 0' }}>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard title="Disabled" link="#" source-type="Image" disabled="true">
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selectable Disabled"
          link="#"
          source-type="Image"
          disabled="true"
          variant="selectable"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
      <li style={{ gridColumn: 'span 3' }}>
        <PharosImageCard
          title="Selected Disabled"
          link="#"
          source-type="Image"
          variant="selectable"
          disabled="true"
          selected="true"
        >
          <img src="./images/item-detail/collection_5.png" alt="Card Title" slot="image" />
        </PharosImageCard>
      </li>
    </PharosLayout>
  ),
};
