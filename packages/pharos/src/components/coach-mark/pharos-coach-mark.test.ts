import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosCoachMark } from './pharos-coach-mark';

describe('pharos-coach-mark', () => {
  let component: PharosCoachMark, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html` <pharos-coach-mark> Shell CoachMark </pharos-coach-mark> `);
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
