const template = ({ titleCaseName, componentName }) => `
import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { Pharos${titleCaseName} } from './pharos-${componentName}';

describe('pharos-${componentName}', () => {
  let component: Pharos${titleCaseName}, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html\`
      <pharos-${componentName}>
        Shell ${titleCaseName}
      </pharos-${componentName}>
    \`);
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
`;

module.exports = template;
