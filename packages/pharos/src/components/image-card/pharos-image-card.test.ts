import { fixture, expect, aTimeout, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { sendKeys } from '@web/test-runner-commands';

import type { PharosImageCard } from './pharos-image-card';
import type { PharosButton } from '../button/pharos-button';
import type { PharosLink } from '../link/pharos-link';

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
    await expect(component).to.be.accessible();
  });

  it('is accessible in the error state', async () => {
    component.error = true;
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('is accessible in the subtle state', async () => {
    component.subtle = true;
    await component.updateComplete;
    await expect(component).to.be.accessible();
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
    await expect(component).to.be.accessible();
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
    await expect(component).to.be.accessible();
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
    await expect(component).to.be.accessible();
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
    await expect(component).to.be.accessible();
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
    await expect(component).to.be.accessible();
  });

  it('throws an error for an invalid variant value', async () => {
    component = await fixture(html`
      <test-pharos-image-card title="Card Title" link="#" variant="fake"></test-pharos-image-card>
    `).catch((e) => e);
    expect('fake is not a valid variant. Valid variants are: base, collection').to.be.thrown;
  });

  it('throws an error when using subtle-select with non-selectable variants', async () => {
    component = await fixture(html`
      <test-pharos-image-card
        title="Card Title"
        link="#"
        subtle-select="true"
        variant="collection"
      ></test-pharos-image-card>
    `).catch((e) => e);
    expect(
      'collection is not a valid variant to use with subtle-select. Only the selectable variants can be used with subtle-select.'
    ).to.be.thrown;
  });

  it('throws an error when using the selected prop is used with a non-selectable variant', async () => {
    component = await fixture(html`
      <test-pharos-image-card
        title="Card Title"
        link="#"
        selected="true"
        variant="collection"
      ></test-pharos-image-card>
    `).catch((e) => e);
    expect(
      'Image card with variant type collection cannot be selected. Only the selectable variants can be selected.'
    ).to.be.thrown;
  });

  it('opens the provided dropdown menu when the action button is clicked', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const menu = document.createElement('test-pharos-dropdown-menu');
    menu.id = 'menu-id';
    const item = document.createElement('test-pharos-dropdown-menu-item');
    item.textContent = 'Menu Item';
    menu.appendChild(item);
    document.body.appendChild(menu);

    const button: PharosButton | null = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    button?.click();
    await aTimeout(100);
    await elementUpdated(menu);

    expect(menu.open).to.be.true;
  });

  it('uses a default heading level when not supplied', async () => {
    const heading = component.renderRoot.querySelector('[data-pharos-component="PharosHeading"]');
    expect(heading?.getAttribute('level')).to.equal('3');
  });

  it('uses the supplied heading level', async () => {
    component.headingLevel = 2;
    await component.updateComplete;
    const heading = component.renderRoot.querySelector('[data-pharos-component="PharosHeading"]');
    expect(heading?.getAttribute('level')).to.equal('2');
  });

  it('uses the supplied indicate link visited', async () => {
    component.indicateLinkVisited = true;
    await component.updateComplete;
    const link = component.renderRoot.querySelector(
      '[data-pharos-component="PharosLink"].card__link--title'
    );
    expect(link?.hasAttribute('indicate-visited')).to.be.true;
  });

  it('sets title link hover state when the card image link is hovered', async () => {
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new Event('mouseenter'));

    await component.updateComplete;
    expect(component['_title']['_hover']).to.be.true;
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
    expect(component['_title']['_hover']).to.be.false;
  });

  it('renders an action button when an action menu id is provided', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const button = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    expect(button).not.to.be.null;
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
    expect(actionMenuSlot).not.to.be.null;
  });

  it('does not render an action button when an action menu id is not provided', async () => {
    const button = component.renderRoot.querySelector(
      '[data-pharos-component="PharosButton"][icon="ellipses-vertical"]'
    );
    expect(button).to.be.null;
  });

  it('renders a heading with preset "1--bold" for the base variant', async () => {
    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).to.equal('1--bold');
  });

  it('renders a heading with preset "2" for the collection variant', async () => {
    component.variant = 'collection';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).to.equal('2');
  });

  it('renders a heading with preset "4" for the promotional variant', async () => {
    component.variant = 'promotional';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector(
      '[data-pharos-component="PharosHeading"].card__heading'
    );
    expect(heading?.getAttribute('preset')).to.equal('4');
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
    expect(titleSlot).not.to.be.null;
  });

  it('renders an exclamation icon in the error state', async () => {
    component.error = true;
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"][name="exclamation-inverse"]'
    );
    expect(icon).not.to.be.null;
  });

  it('renders a container for the metadata', async () => {
    const metadata = component.renderRoot.querySelector('.card__metadata');
    expect(metadata).not.to.be.null;
  });

  it('renders a hoverable version of the metadata in the subtle state', async () => {
    component.subtle = true;
    await component.updateComplete;

    const metadataHover = component.renderRoot.querySelector('.card__metadata--hover');
    expect(metadataHover).not.to.be.null;
  });

  it('renders a hoverable version of the metadata in the error and subtle state', async () => {
    component.subtle = true;
    component.error = true;
    await component.updateComplete;

    const metadataHover = component.renderRoot.querySelector('.card__metadata--hover');
    expect(metadataHover).not.to.be.null;
  });

  it('renders the source type when provided', async () => {
    component.sourceType = 'image';
    await component.updateComplete;
    const sourceType = component.renderRoot.querySelector('.card__source-type');
    expect(sourceType).not.to.be.null;
  });

  it('renders an exclamation icon in the error state for collection variant', async () => {
    component.variant = 'collection';
    component.error = true;
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"][name="exclamation-inverse"]'
    );
    expect(icon).not.to.be.null;
  });

  it('renders a checkbox for the selectable variant', async () => {
    component.variant = 'selectable';
    component.title = 'pick me';
    await component.updateComplete;

    const checkbox = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"].card__checkbox'
    );
    expect(checkbox?.getAttribute('name')).to.equal('Select pick me');
  });

  it('renders a checkbox for the selectable-collection variant', async () => {
    component.variant = 'selectable-collection';
    component.title = 'pick me';
    await component.updateComplete;
    const checkbox = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"].card__checkbox'
    );

    expect(checkbox?.getAttribute('name')).to.equal('Select pick me');
  });

  it('dispatches the mouseenter event on pharos link mouseenter', async () => {
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

    let hovered = false;
    const onMouseEnter = (): void => {
      hovered = true;
    };
    component.addEventListener('pharos-image-card-image-mouseenter', onMouseEnter);

    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    expect(hovered).to.be.true;
  });

  it('will show not show a checkbox when subtle-select is true', async () => {
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
    expect(checkboxElement).to.be.null;
  });

  it('will show a checkbox when hovered and subtle-select is true', async () => {
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
    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new MouseEvent('mouseenter'));

    await aTimeout(100);
    await elementUpdated(component);

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.to.be.null;
  });

  it('will show a checkbox when hovered while subtle and subtle-select are true', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle-select="true" subtle="true" link="#">
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

    await aTimeout(100);
    await elementUpdated(component);

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.to.be.null;
  });

  it('will show a checkbox when hovered while subtle is true', async () => {
    component = await fixture(
      html`<test-pharos-image-card variant="selectable" subtle="true" link="#">
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

    await aTimeout(100);
    await elementUpdated(component);

    checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.to.be.null;
  });

  it('dispatches the mouseleave event on pharos link mouseleave', async () => {
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

    let hovered = true;
    const onMouseLeave = (): void => {
      hovered = false;
    };
    component.addEventListener('pharos-image-card-image-mouseleave', onMouseLeave);

    const imageLink = component.renderRoot.querySelector('.card__image');
    imageLink?.parentElement?.dispatchEvent(new Event('mouseleave'));

    expect(hovered).to.be.false;
  });

  it('dispatches pharos-image-card-selected when the title of the select variant is clicked', async () => {
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

    const title: PharosLink | null = component.renderRoot.querySelector(
      '[data-pharos-component="PharosLink"].card__link--title'
    );

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.true;
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

    console.log(title);

    let selected = false;
    const onSelectCard = (): void => {
      selected = true;
    };
    component.addEventListener('pharos-image-card-selected', onSelectCard);
    title?.click();
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.true;
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
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.true;
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
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.false;
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
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.false;
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
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.false;
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
    await aTimeout(100);
    await elementUpdated(component);
    expect(selected).to.be.false;
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

    expect(component.innerHTML).contains('Card overlay');
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
    await sendKeys({ down: 'Tab' });
    const checkboxElement = component.renderRoot.querySelector(
      '[data-pharos-component="PharosCheckbox"]'
    );
    expect(checkboxElement).not.to.be.null;
  });

  it('renders the image preview not available in error state ', async () => {
    component.error = true;
    await component.updateComplete;
    expect(component.renderRoot.textContent).to.contain('Image preview not available');
  });
});
