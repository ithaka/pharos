import { fixture, expect, nextFrame } from '@open-wc/testing';
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
        <pharos-sidenav>
          <pharos-link slot="top" href="/" id="jstor-logo">JSTOR</pharos-link>
          <pharos-input-group
            slot="top"
            name="my-input-group"
            placeholder="Search"
            hide-label
            on-background
          >
            <span slot="label">Search</span>
            <pharos-button
              name="search-button"
              icon="search"
              variant="subtle"
              label="search"
              on-background
            ></pharos-button>
          </pharos-input-group>
          <pharos-sidenav-section show-divider>
            <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
            <pharos-sidenav-link href="#" target="_blank" external
              >External link</pharos-sidenav-link
            >
            <pharos-sidenav-link href="#" target="_blank" external
              >External link</pharos-sidenav-link
            >
          </pharos-sidenav-section>
          <pharos-sidenav-section label="Section Heading" show-divider>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
            </pharos-sidenav-menu>
          </pharos-sidenav-section>
          <pharos-sidenav-section label="Section Heading">
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 4</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-menu label="Menu item w/accordion">
              <pharos-sidenav-link href="#">Menu item 1</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 2</pharos-sidenav-link>
              <pharos-sidenav-link href="#">Menu item 3</pharos-sidenav-link>
            </pharos-sidenav-menu>
            <pharos-sidenav-link href="#">Menu item</pharos-sidenav-link>
          </pharos-sidenav-section>
        </pharos-sidenav>
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

  it('fires a custom event close after closing', async () => {
    let eventTriggered = false;
    const handleClose = (): void => {
      eventTriggered = true;
    };
    component.addEventListener('close', handleClose);

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;
    expect(eventTriggered).to.be.true;
  });

  it('delegates focus to the sidenav button after the close button is clicked', async () => {
    const sidenavButton = document.createElement('pharos-sidenav-button');
    document.body.appendChild(sidenavButton);
    await setViewport({ width: 1055, height: 768 });
    component.slide = true;
    await component.updateComplete;

    const button = component.renderRoot.querySelector('.side-element__button') as PharosButton;
    button?.click();
    await component.updateComplete;

    const renderedButton = document.body.querySelector('pharos-sidenav-button');
    expect(document.activeElement === renderedButton).to.be.true;
  });

  it('resets its slide status when going back to a viewport above 1055px', async () => {
    await setViewport({ width: 1055, height: 768 });
    component.slide = true;
    await component.updateComplete;

    await setViewport({ width: 1056, height: 768 });
    await component.updateComplete;
    await nextFrame();
    expect(component.slide).to.be.false;
  });

  it('renders a skip link when attribute main-content-id is passed', async () => {
    component.mainContentId = 'test';
    await component.updateComplete;
    const link = component.renderRoot.querySelector('#sidenav-skip-link');
    expect(link).not.to.be.null;
  });
});
