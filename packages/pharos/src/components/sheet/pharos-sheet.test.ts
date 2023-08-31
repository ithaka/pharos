import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosSheet } from './pharos-sheet';

describe('pharos-sheet', () => {
  let component: PharosSheet, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html` <pharos-sheet> Shell Sheet </pharos-sheet> `);
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
