import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-breadcrumb';
import './pharos-breadcrumb-item';
import type { PharosBreadcrumb } from './pharos-breadcrumb';

describe('pharos-breadcrumb', () => {
  let component: PharosBreadcrumb;

  beforeEach(async () => {
    component = await fixture(html`
      <pharos-breadcrumb>
        <pharos-breadcrumb-item href="#first">
          The First Link That is Too Long of Text to Fit inside any reasonable amount of space
        </pharos-breadcrumb-item>
        <pharos-breadcrumb-item href="#second"> A link that's better </pharos-breadcrumb-item>
        <pharos-breadcrumb-item href="#third">
          The Second Link That is Too Long of Text to Fit inside any reasonable amount of space
        </pharos-breadcrumb-item>
        <pharos-breadcrumb-item>
          Where we are right now is a long way from where we used to be
        </pharos-breadcrumb-item>
      </pharos-breadcrumb>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
