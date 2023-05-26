import { aTimeout, fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import { setViewport } from '@web/test-runner-commands';

import type { PharosSidenav } from './pharos-sidenav';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-sidenav', () => {
  let component: PharosSidenav;

  beforeEach(async () => {
    await setViewport({ width: 1440, height: 900 });
    component = await fixture(
      html`
        <test-pharos-sidenav>
          <test-pharos-link slot="top" href="/" id="jstor-logo">JSTOR</test-pharos-link>
          <test-pharos-input-group
            slot="top"
            name="my-input-group"
            placeholder="Search"
            hide-label
            on-background
          >
            <span slot="label">Search</span>
            <test-pharos-button
              name="search-button"
              icon="search"
              variant="subtle"
              label="search"
              on-background
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

  it('slides out when the close button is clicked', async () => {
    await setViewport({ width: 1055, height: 768 });
    component.slide = true;
    await component.updateComplete;

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;
    expect(component.slide).to.be.false;
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

  it('delegates focus to the sidenav button after the close button is clicked', async () => {
    const sidenavButton = document.createElement('test-pharos-sidenav-button');
    document.body.appendChild(sidenavButton);
    await setViewport({ width: 1055, height: 768 });
    component.slide = true;
    await component.updateComplete;

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;

    const renderedButton = document.body.querySelector('test-pharos-sidenav-button');
    expect(document.activeElement === renderedButton).to.be.true;
  });

  it('resets its slide status when going back to a viewport above 1055px', async () => {
    await setViewport({ width: 1055, height: 768 });
    component.slide = true;
    await component.updateComplete;

    await setViewport({ width: 1056, height: 768 });
    await component.updateComplete;
    await aTimeout(1);
    expect(component.slide).to.be.false;
  });

  it('renders a skip link when attribute main-content-id is passed', async () => {
    component.mainContentId = 'test';
    await component.updateComplete;
    const link = component.renderRoot.querySelector('#sidenav-skip-link');
    expect(link).not.to.be.null;
  });
});
