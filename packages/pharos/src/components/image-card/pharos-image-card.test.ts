import { fixture, expect, aTimeout, elementUpdated } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-image-card';
import '../dropdown-menu/pharos-dropdown-menu';
import '../dropdown-menu/pharos-dropdown-menu-item';
import type { PharosImageCard } from './pharos-image-card';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-image-card', () => {
  let component: PharosImageCard;

  beforeEach(async () => {
    component = await fixture(html`<pharos-image-card
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
      <div slot="metadata">Part of <pharos-link href="#">An Example Collection</pharos-link></div>
    </pharos-image-card>`);
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
    component = await fixture(html`<pharos-image-card
      title="Card Title"
      link="#"
      variant="collection"
    >
      <img
        slot="image"
        alt="Card Title"
        src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
      />
      <strong slot="metadata">100 items</strong>
      <div slot="metadata">Description of collection.</div>
    </pharos-image-card>`);
    await expect(component).to.be.accessible();
  });

  it('is accessible as the promotional variant', async () => {
    component = await fixture(html`<pharos-image-card
      title="Card Title"
      link="#"
      variant="promotional"
    >
      <img
        slot="image"
        alt="Card Title"
        src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
      />
      <strong slot="metadata">100 items</strong>
      <div slot="metadata">Description of collection.</div>
    </pharos-image-card>`);
    await expect(component).to.be.accessible();
  });

  it('throws an error for an invalid variant value', async () => {
    component = await fixture(html`
      <pharos-image-card title="Card Title" link="#" variant="fake"></pharos-image-card>
    `).catch((e) => e);
    expect('fake is not a valid variant. Valid variants are: base, collection').to.be.thrown;
  });

  it('opens the provided dropdown menu when the action button is clicked', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const menu = document.createElement('pharos-dropdown-menu');
    menu.id = 'menu-id';
    const item = document.createElement('pharos-dropdown-menu-item');
    item.textContent = 'Menu Item';
    menu.appendChild(item);
    document.body.appendChild(menu);

    const button: PharosButton | null = component.renderRoot.querySelector(
      'pharos-button[icon="ellipses-vertical"]'
    );
    button?.click();
    await aTimeout(100);
    await elementUpdated(menu);

    expect(menu.open).to.be.true;
  });

  it('uses a default heading level when not supplied', async () => {
    const heading = component.renderRoot.querySelector('pharos-heading');
    expect(heading?.getAttribute('level')).to.equal('3');
  });

  it('uses the supplied heading level', async () => {
    component.headingLevel = 2;
    await component.updateComplete;
    const heading = component.renderRoot.querySelector('pharos-heading');
    expect(heading?.getAttribute('level')).to.equal('2');
  });

  it('sets title link hover state when the card image link is hovered', async () => {
    const imageLink = component.renderRoot.querySelector('.card__link--image');
    imageLink?.dispatchEvent(new Event('mouseenter'));
    await component.updateComplete;

    expect(component['_title']['_hover']).to.be.true;
  });

  it('renders an action button when an action menu id is provided', async () => {
    component.actionMenu = 'menu-id';
    await component.updateComplete;

    const button = component.renderRoot.querySelector('pharos-button[icon="ellipses-vertical"]');
    expect(button).not.to.be.null;
  });

  it('renders the action-button via a slot when the action menu id property is not provided', async () => {
    component = await fixture(html`<pharos-image-card link="#">
      <img
        slot="image"
        alt="Card Title"
        src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
      />
      <span slot="title">Card Title</span>
      <div slot="metadata">Creator of the item</div>
      <div slot="metadata">1990-2000</div>
      <div slot="metadata">Part of <pharos-link href="#">An Example Collection</pharos-link></div>
      <div slot="action-button">ActionButtonComponent</div>
    </pharos-image-card>`);

    const actionMenuSlot = component.renderRoot.querySelector('slot[name="action-button"]');
    expect(actionMenuSlot).not.to.be.null;
  });

  it('does not render an action button when an action menu id is not provided', async () => {
    const button = component.renderRoot.querySelector('pharos-button[icon="ellipses-vertical"]');
    expect(button).to.be.null;
  });

  it('renders a heading with preset "1--bold" for the base variant', async () => {
    const heading = component.renderRoot.querySelector('pharos-heading.card__heading');
    expect(heading?.getAttribute('preset')).to.equal('1--bold');
  });

  it('renders a heading with preset "2" for the collection variant', async () => {
    component.variant = 'collection';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector('pharos-heading.card__heading');
    expect(heading?.getAttribute('preset')).to.equal('2');
  });

  it('renders a heading with preset "4" for the promotional variant', async () => {
    component.variant = 'promotional';
    await component.updateComplete;

    const heading = component.renderRoot.querySelector('pharos-heading.card__heading');
    expect(heading?.getAttribute('preset')).to.equal('4');
  });

  it('renders the title via a slot when the title property is not set', async () => {
    component = await fixture(html`<pharos-image-card link="#">
      <img
        slot="image"
        alt="Card Title"
        src="data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E"
      />
      <span slot="title">Card Title</span>
      <div slot="metadata">Creator of the item</div>
      <div slot="metadata">1990-2000</div>
      <div slot="metadata">Part of <pharos-link href="#">An Example Collection</pharos-link></div>
    </pharos-image-card>`);

    const titleSlot = component.renderRoot.querySelector('slot[name="title"]');
    expect(titleSlot).not.to.be.null;
  });

  it('renders an exclamation icon in the error state', async () => {
    component.error = true;
    await component.updateComplete;

    const icon = component.renderRoot.querySelector('pharos-icon[name="exclamation-inverse"]');
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

  it('renders a link around the image for the base variant', async () => {
    const link = component.renderRoot.querySelector('pharos-link.card__link--image');
    expect(link).not.to.be.null;
  });

  it('renders the source type when provided', async () => {
    component.sourceType = 'image';
    await component.updateComplete;
    const sourceType = component.renderRoot.querySelector('.card__source-type');
    expect(sourceType).not.to.be.null;
  });

  it('renders a link around the container for the error state', async () => {
    component.error = true;
    await component.updateComplete;

    const link = component.renderRoot.querySelector('pharos-link.card__link--image');
    expect(link).not.to.be.null;
  });

  it('renders a link around the image for the collection variant', async () => {
    component.variant = 'collection';
    await component.updateComplete;

    const link = component.renderRoot.querySelector('pharos-link.card__link--collection');
    expect(link).not.to.be.null;
  });

  it('renders a label for the link around the image for the base variant', async () => {
    await component.updateComplete;

    const link = component.renderRoot.querySelector('pharos-link.card__link--image');
    expect(link?.getAttribute('label')).to.equal('Label for card image link');
  });

  it('renders a label for the link around the image for the collection variant', async () => {
    component.variant = 'collection';
    await component.updateComplete;

    const link = component.renderRoot.querySelector('pharos-link.card__link--collection');
    expect(link?.getAttribute('label')).to.equal('Label for card image link');
  });
});
