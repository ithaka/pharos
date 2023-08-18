import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosPopover } from './pharos-popover';

describe('pharos-popover', () => {
  let component: PharosPopover, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html` <pharos-popover> Shell Popover </pharos-popover> `);
  });

  before(() => {
    logSpy = sinon.spy(console, 'error');
  });

  after(() => {
    logSpy.restore();
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
