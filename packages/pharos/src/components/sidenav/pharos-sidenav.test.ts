import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { setViewport } from '@web/test-runner-commands';

import type { PharosSidenav } from './pharos-sidenav';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-sidenav', () => {
  let component: PharosSidenav;

  const getSimpleSidenav = () => {
    return html`
      <test-pharos-sidenav has-close-button open>
        <test-pharos-link slot="top" href="/" id="jstor-logo">JSTOR</test-pharos-link>
        <test-pharos-input-group
          slot="top"
          name="my-input-group"
          placeholder="Search"
          hide-label
          is-on-background
        >
          <span slot="label">Search</span>
          <test-pharos-button
            name="search-button"
            icon="search"
            variant="subtle"
            a11y-label="search"
            is-on-background
          ></test-pharos-button>
        </test-pharos-input-group>
        <test-pharos-sidenav-section show-divider>
          <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
          <test-pharos-sidenav-menu label="Menu item w/accordion">
            <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
          </test-pharos-sidenav-menu>
          <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
          <test-pharos-sidenav-link href="#" target="_blank" external
            >External link</test-pharos-sidenav-link
          >
          <test-pharos-sidenav-link href="#" target="_blank" external
            >External link</test-pharos-sidenav-link
          >
        </test-pharos-sidenav-section>
        <test-pharos-sidenav-section label="Section Heading" show-divider>
          <test-pharos-sidenav-menu label="Menu item w/accordion">
            <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
          </test-pharos-sidenav-menu>
          <test-pharos-sidenav-menu label="Menu item w/accordion">
            <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
          </test-pharos-sidenav-menu>
        </test-pharos-sidenav-section>
        <test-pharos-sidenav-section label="Section Heading">
          <test-pharos-sidenav-menu label="Menu item w/accordion">
            <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#">Menu item 4</test-pharos-sidenav-link>
          </test-pharos-sidenav-menu>
          <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
        </test-pharos-sidenav-section>
      </test-pharos-sidenav>
    `;
  };

  beforeEach(async () => {
    await setViewport({ width: 1440, height: 900 });
    component = await fixture(
      html`
        <test-pharos-sidenav has-close-button open>
          <test-pharos-link slot="top" href="/" id="jstor-logo">JSTOR</test-pharos-link>
          <test-pharos-input-group
            slot="top"
            name="my-input-group"
            placeholder="Search"
            hide-label
            is-on-background
          >
            <span slot="label">Search</span>
            <test-pharos-button
              name="search-button"
              icon="search"
              variant="subtle"
              a11y-label="search"
              is-on-background
            ></test-pharos-button>
          </test-pharos-input-group>
          <test-pharos-sidenav-section show-divider>
            <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
            <test-pharos-sidenav-link href="#" target="_blank" external
              >External link</test-pharos-sidenav-link
            >
            <test-pharos-sidenav-link href="#" target="_blank" external
              >External link</test-pharos-sidenav-link
            >
          </test-pharos-sidenav-section>
          <test-pharos-sidenav-section label="Section Heading" show-divider>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
          </test-pharos-sidenav-section>
          <test-pharos-sidenav-section label="Section Heading">
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 4</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-menu label="Menu item w/accordion">
              <test-pharos-sidenav-link href="#">Menu item 1</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 2</test-pharos-sidenav-link>
              <test-pharos-sidenav-link href="#">Menu item 3</test-pharos-sidenav-link>
            </test-pharos-sidenav-menu>
            <test-pharos-sidenav-link href="#">Menu item</test-pharos-sidenav-link>
          </test-pharos-sidenav-section>
        </test-pharos-sidenav>
      `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('has an attribute to open the modal', async () => {
    component.open = true;
    await component.updateComplete;
    await expect(component.open).to.be.true;
  });

  it('has an attribute to close the modal', async () => {
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    await expect(component.open).to.be.false;
  });

  it('does not render a close button when attribute hasCloseButton is false', async () => {
    component.hasCloseButton = false;
    component.open = true;
    await component.updateComplete;

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    expect(button).to.be.null;
  });

  it('closes when the close button is clicked', async () => {
    component.hasCloseButton = true;
    component.open = true;
    await component.updateComplete;

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('fires a custom event pharos-sidenav-close after closing', async () => {
    let eventTriggered = false;
    let detail = null;
    const handleClose = (e: Event): void => {
      eventTriggered = true;
      detail = (e as CustomEvent)?.detail;
    };
    component.addEventListener('pharos-sidenav-close', handleClose);

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;

    expect(eventTriggered && detail === component).to.be.true;
  });

  it('renders a skip link when attribute main-content-id is passed', async () => {
    component.mainContentId = 'test';
    await component.updateComplete;
    const link = component.renderRoot.querySelector('#sidenav-skip-link');
    expect(link).not.to.be.null;
  });

  it('opens when the element with matching attribute data-sidenav-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-sidenav-id', 'my-sidenav');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleSidenav());

    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('delegates focus back to the element that opened it', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    const handleClick = (): void => {
      const sidenav = document.querySelector('test-pharos-sidenav') as PharosSidenav;
      sidenav.open = true;
    };
    trigger.setAttribute('id', 'trigger');
    trigger.addEventListener('click', handleClick);
    document.body.appendChild(trigger);

    const button = document.querySelector('#trigger') as HTMLButtonElement;
    button.click();
    button.focus();
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;

    expect(activeElement === button).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });
});
