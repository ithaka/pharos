import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosImageCard } from './pharos-image-card';
import type { PharosButton } from '../button/pharos-button';
import type { PharosLink } from '../link/pharos-link';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';

describe('pharos-image-card', () => {
  let component: PharosImageCard;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-image-card
        title="Card Title"
        link="#"
        image-link-label="Label for card image link"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="metadata">Creator of the item</div>
        <div slot="metadata">1990-2000</div>
        <div slot="metadata">
          Part of <test-pharos-link href="#">An Example Collection</test-pharos-link>
        </div>
      </test-pharos-image-card>`
    );
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('defaults link to null when not supplied', async () => {
    component = await fixture<PharosImageCard>(
      html`<test-pharos-image-card title="Card Title" image-link-label="Label for card image link">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
      </test-pharos-image-card>`
    );

    expect(component.link).toBeNull();
  });

  it('is accessible in the error state', async () => {
    component.error = true;
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('is accessible in the subtle state', async () => {
    component.subtle = true;
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('is accessible as the collection variant', async () => {
    component = await fixture(
      html`<test-pharos-image-card title="Card Title" link="#" variant="collection">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible as the promotional variant', async () => {
    component = await fixture(
      html`<test-pharos-image-card title="Card Title" link="#" variant="promotional">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible as the selectable variant', async () => {
    component = await fixture(
      html`<test-pharos-image-card title="Card Title" link="#" variant="selectable">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible as the selectable-collection variant', async () => {
    component = await fixture(
      html`<test-pharos-image-card title="Card Title" link="#" variant="selectable-collection">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible as the selectable subtle-select variant', async () => {
    component = await fixture(
      html`<test-pharos-image-card
        title="Card Title"
        link="#"
        variant="selectable"
        subtle-select="true"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );
    await expect(component).toBeAccessible();
  });

  it('throws an error for an invalid variant value', async () => {
    const error = await errorFixture(html`
      <test-pharos-image-card title="Card Title" link="#" variant="fake"></test-pharos-image-card>
    `);
    expect(error.message).toContain(
      'fake is not a valid variant. Valid variants are: base, collection'
    );
  });

  it('throws an error when using subtle-select with non-selectable variants', async () => {
    const error = await errorFixture(html`
      <test-pharos-image-card
        title="Card Title"
        link="#"
        subtle-select="true"
        variant="collection"
      ></test-pharos-image-card>
    `);
    expect(error.message).toContain(
      'collection is not a valid variant to use with subtle-select. Only the selectable variants can be used with subtle-select.'
    );
  });

  // This test was discovered to be silently failing as part of https://github.com/ithaka/pharos/issues/1009
  // Bug filed here https://github.com/ithaka/pharos/issues/1331
  // We can un-skip this once that is resolved
  it.skip('throws an error when using the selected prop is used with a non-selectable variant', async () => {
    const error = await errorFixture(html`
      <test-pharos-image-card
        title="Card Title"
        link="#"
        selected="true"
        variant="collection"
      ></test-pharos-image-card>
    `);
    expect(error.message).toContain(
      'Image card with variant type collection cannot be selected. Only the selectable variants can be selected.'
    );
  });

  it('opens the provided dropdown menu when the action button is clicked', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const menu = document.createElement(
      'test-pharos-dropdown-menu'
    ) as unknown as PharosDropdownMenu;
    menu.id = 'menu-id';
    const item = document.createElement('test-pharos-dropdown-menu-item');
    item.textContent = 'Menu Item';
    menu.appendChild(item);
    document.body.appendChild(menu);

    const button: PharosButton | null = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    button?.click();

    await vi.waitFor(() => expect(menu.open).toBe(true));
  });

  it('uses a default heading level when not supplied', async () => {
    const heading = component.renderRoot.querySelector('[data-pharos-component="PharosHeading"]');
    expect(heading?.getAttribute('level')).toBe('3');
  });

  it('uses the supplied heading level', async () => {
    component.headingLevel = 2;
    await component.updateComplete;
    const heading = component.renderRoot.querySelector('[data-pharos-component="PharosHeading"]');
    expect(heading?.getAttribute('level')).toBe('2');
  });

  it('uses the supplied indicate link visited', async () => {
    component.indicateLinkVisited = true;
    await component.updateComplete;
    const link = component.renderRoot.querySelector(
      '[data-pharos-component="PharosLink"].card__link--title'
    );
    expect(link?.hasAttribute('indicate-visited')).toBe(true);
  });

  it('sets title link hover state when the card image link is hovered', async () => {
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new Event('mouseenter'));

    await component.updateComplete;
    expect(component['_title']?.['_hover']).toBe(true);
  });

  it('does not set the title link hover state when the card is disabled and the link title is hovered', async () => {
    component = await fixture(
      html`<test-pharos-image-card disabled="true" link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <span slot="title">Card Title</span>
        <div slot="metadata">Creator of the item</div>
        <div slot="metadata">1990-2000</div>
        <div slot="metadata">
          Part of <test-pharos-link href="#">An Example Collection</test-pharos-link>
        </div>
      </test-pharos-image-card>`
    );
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new Event('mouseenter'));

    await component.updateComplete;
    expect(component['_title']?.['_hover']).toBe(false);
  });

  it('renders an action button when an action menu id is provided', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const button = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    expect(button).not.toBeNull();
  });

  it('renders the action-button via a slot when the action menu id property is not provided', async () => {
    component = await fixture(
      html`<test-pharos-image-card link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <span slot="title">Card Title</span>
        <div slot="metadata">Creator of the item</div>
        <div slot="metadata">1990-2000</div>
        <div slot="metadata">
          Part of <test-pharos-link href="#">An Example Collection</test-pharos-link>
        </div>
        <div slot="action-button">ActionButtonComponent</div>
      </test-pharos-image-card>`
    );

    const actionMenuSlot = component.renderRoot.querySelector('slot[name="action-button"]');
    expect(actionMenuSlot).not.toBeNull();
  });

  it('does not render an action button when an action menu id is not provided', async () => {
    const button = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    expect(button).toBeNull();
  });

  it('renders a heading with preset "1--bold" for the base variant', async () => {
    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).toBe('1--bold');
  });

  it('renders a heading with preset "2" for the collection variant', async () => {
    component.variant = 'collection';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).toBe('2');
  });

  it('renders a heading with preset "4" for the promotional variant', async () => {
    component.variant = 'promotional';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).toBe('4');
  });

  it('renders the title via a slot when the title property is not set', async () => {
    component = await fixture(
      html`<test-pharos-image-card link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <span slot="title">Card Title</span>
        <div slot="metadata">Creator of the item</div>
        <div slot="metadata">1990-2000</div>
        <div slot="metadata">
          Part of <test-pharos-link href="#">An Example Collection</test-pharos-link>
        </div>
      </test-pharos-image-card>`
    );

    const titleSlot = component.renderRoot.querySelector('slot[name="title"]');
    expect(titleSlot).not.toBeNull();
  });

  it('renders an SVG in the error state', async () => {
    component.error = true;
    await component.updateComplete;

    const svg = component.renderRoot.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders a container for the metadata', async () => {
    const metadata = component.renderRoot.querySelector('.card__metadata');
    expect(metadata).not.toBeNull();
  });

  it('renders a hoverable version of the metadata in the subtle state', async () => {
    component.subtle = true;
    await component.updateComplete;

    const metadataHover = component.renderRoot.querySelector('.card__metadata--hover');
    expect(metadataHover).not.toBeNull();
  });

  it('renders a hoverable version of the metadata in the error and subtle state', async () => {
    component.subtle = true;
    component.error = true;
    await component.updateComplete;

    const metadataHover = component.renderRoot.querySelector('.card__metadata--hover');
    expect(metadataHover).not.toBeNull();
  });

  it('renders the source type when provided', async () => {
    component.sourceType = 'image';
    await component.updateComplete;
    const sourceType = component.renderRoot.querySelector('.card__source-type');
    expect(sourceType).not.toBeNull();
  });

  it('renders an svg in the error state for collection variant', async () => {
    component.variant = 'collection';
    component.error = true;
    await component.updateComplete;

    const svg = component.renderRoot.querySelector('svg');
    expect(svg).not.toBeNull();
  });

  it('renders a checkbox for the selectable variant', async () => {
    component.variant = 'selectable';
    component.title = 'pick me';
    await component.updateComplete;

    const checkbox = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"].card__checkbox'
    );
    expect(checkbox?.getAttribute('name')).toBe('Select pick me');
  });

  it('renders a checkbox for the selectable-collection variant', async () => {
    component.variant = 'selectable-collection';
    component.title = 'pick me';
    await component.updateComplete;
    const checkbox = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"].card__checkbox'
    );

    expect(checkbox?.getAttribute('name')).toBe('Select pick me');
  });

  it('dispatches the mouseenter event on pharos link mouseenter', async () => {
    component = await fixture(
      html`<test-pharos-image-card link="#" title="Card Title">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let hovered = false;
    const onMouseEnter = (): void => {
      hovered = true;
    };
    component.addEventListener('pharos-image-card-image-mouseenter', onMouseEnter);

    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    expect(hovered).toBe(true);
  });

  it('will de-select checkbox when clicking on the image card and subtle-select is true', async () => {
    component = await fixture(
      html`<test-pharos-image-card
        variant="selectable"
        subtle-select="true"
        link="#"
        title="Card Title"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const imageCard = component.renderRoot.querySelector('.card__image');

    await component.updateComplete;

    let checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"].card__checkbox'
    );
    expect(checkboxElement).not.toBeNull();
    (checkboxElement as HTMLElement)?.click();

    await component.updateComplete;

    expect((checkboxElement as HTMLElement & { checked: boolean }).checked).toBe(true);

    (imageCard as HTMLElement)?.click();
    await component.updateComplete;

    expect((checkboxElement as HTMLElement & { checked: boolean }).checked).toBe(false);
  });

  it('will visually not show a checkbox when subtle-select is true', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle-select="true" link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let checkboxElement = null;
    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.toBeNull();
    if (checkboxElement !== null) {
      let checkboxElementStyle = window.getComputedStyle(checkboxElement);

      expect(checkboxElementStyle.opacity).toBe('0');
    }
  });

  it('will show a checkbox when hovered and subtle-select is true', async () => {
    component = await fixture(
      html`<test-pharos-image-card
        variant="selectable"
        subtle-select="true"
        link="#"
        title="Card Title"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let checkboxElement = null;
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    await component.updateComplete;

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.toBeNull();
  });

  it('will show a checkbox when hovered while subtle and subtle-select are true', async () => {
    component = await fixture(
      html`<test-pharos-image-card
        variant="selectable"
        subtle-select="true"
        subtle="true"
        link="#"
        title="Card Title"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let checkboxElement = null;
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    await component.updateComplete;

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.toBeNull();
  });

  it('will show a checkbox when hovered while subtle is true', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle="true" link="#" title="Card Title">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let checkboxElement = null;
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    await component.updateComplete;

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.toBeNull();
  });

  it('dispatches the mouseleave event on pharos link mouseleave', async () => {
    component = await fixture(
      html`<test-pharos-image-card link="#" title="Card Title">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    let hovered = true;
    const onMouseLeave = (): void => {
      hovered = false;
    };
    component.addEventListener('pharos-image-card-image-mouseleave', onMouseLeave);

    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new Event('mouseleave'));

    expect(hovered).toBe(false);
  });

  it('dispatches pharos-image-card-selected when the title of the select variant is clicked', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" link="#" title="Card Title">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector(
      '[data-pharos-component="PharosLink"].card__link--title'
    );

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(true);
  });

  it('dispatches pharos-image-card-selected when the thumbnail of the select variant is clicked', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(true);
  });

  it('dispatches pharos-image-card-selected when the thumbnail of the thumbnail of a select variant card is clicked', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(true);
  });

  it('does not dispatch pharos-image-card-selected when the disabled thumbnail of the select variant is clicked', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" disabled="true" link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(false);
  });

  it('does not dispatch pharos-image-card-selected when the disabled thumbnail of subtle-select is clicked', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle-select="true" link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(false);
  });

  it('does not dispatch pharos-image-card-selected when the title of the select variant is clicked in subtle-select mode', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle-select link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(false);
  });

  it('does not dispatch pharos-image-card-selected when the title of the select variant is clicked in subtle/subtle-select mode', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle-select subtle link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    const title: PharosLink | null = component.renderRoot.querySelector('.card__image');

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await component.updateComplete;
    expect(selected).toBe(false);
  });

  it('renders the overlay slot content', async () => {
    component = await fixture(
      html`<test-pharos-image-card link="#">
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <div slot="overlay">Card overlay</div>
      </test-pharos-image-card>`
    );

    expect(component.innerHTML).toContain('Card overlay');
  });

  it('can be navigated with a keyboard when subtle and selectable', async () => {
    component = await fixture(
      html`<test-pharos-image-card
        title="Card Title"
        link="#"
        variant="selectable"
        subtle-select="true"
      >
        <img
          slot="image"
          alt="Card Title"
          src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
        />
        <strong slot="metadata">100 items</strong>
        <div slot="metadata">Description of collection.</div>
      </test-pharos-image-card>`
    );

    component.focus();
    const checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );

    expect(document.activeElement?.shadowRoot?.activeElement).toBe(checkboxElement);
  });

  it('renders the image preview not available in error state ', async () => {
    component.error = true;
    await component.updateComplete;
    expect(component.renderRoot.textContent).toContain('Image preview not available');
  });
});
