import { html } from 'lit';
import type { TemplateResult } from 'lit';

import logo from '../../../utils/_storybook/assets/images/jstor-logo-inverse.svg';

export const Sidenav = (open: boolean, showCloseButton: boolean): TemplateResult => html`
  <storybook-pharos-sidenav
    class="reports-page__sidenav"
    id="report-sidenav"
    main-content-id="main-content"
    .open="${open}"
    .has-close-button="${showCloseButton}"
  >
    <storybook-pharos-link slot="top" href="/" id="jstor-logo">
      <img src="${logo}" alt="Pharos Home" width="72" height="100" />
    </storybook-pharos-link>
    <storybook-pharos-sidenav-section>
      <storybook-pharos-sidenav-link href="#">Home</storybook-pharos-sidenav-link>
      <storybook-pharos-sidenav-menu label="Reports" expanded>
        <storybook-pharos-sidenav-link href="#" is-active>COUNTER 5</storybook-pharos-sidenav-link>
        <storybook-pharos-sidenav-link href="#">Books at JSTOR</storybook-pharos-sidenav-link>
        <storybook-pharos-sidenav-link href="#">COUNTER 4</storybook-pharos-sidenav-link>
      </storybook-pharos-sidenav-menu>
      <storybook-pharos-sidenav-link href="#">Holdings</storybook-pharos-sidenav-link>
      <storybook-pharos-sidenav-link href="#">Access Methods</storybook-pharos-sidenav-link>
      <storybook-pharos-sidenav-link href="#">Account</storybook-pharos-sidenav-link>
      <storybook-pharos-sidenav-link href="#" target="_blank" external
        >Support</storybook-pharos-sidenav-link
      >
      <storybook-pharos-sidenav-link href="#" target="_blank" external
        >For Librarians</storybook-pharos-sidenav-link
      >
    </storybook-pharos-sidenav-section>
  </storybook-pharos-sidenav>
`;
