import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const Sidenav = (): TemplateResult => html`
  <pharos-sidenav class="reports-page__sidenav" main-content-id="main-content">
    <pharos-link slot="top" href="/" id="jstor-logo">
      <img src="./images/jstor-logo-inverse.svg" alt="Pharos Home" width="72" height="100" />
    </pharos-link>
    <pharos-sidenav-section>
      <pharos-sidenav-link href="#">Home</pharos-sidenav-link>
      <pharos-sidenav-menu label="Reports" expanded>
        <pharos-sidenav-link href="#" is-active>COUNTER 5</pharos-sidenav-link>
        <pharos-sidenav-link href="#">Books at JSTOR</pharos-sidenav-link>
        <pharos-sidenav-link href="#">COUNTER 4</pharos-sidenav-link>
      </pharos-sidenav-menu>
      <pharos-sidenav-link href="#">Holdings</pharos-sidenav-link>
      <pharos-sidenav-link href="#">Access Methods</pharos-sidenav-link>
      <pharos-sidenav-link href="#">Account</pharos-sidenav-link>
      <pharos-sidenav-link href="#" target="_blank" external>Support</pharos-sidenav-link>
      <pharos-sidenav-link href="#" target="_blank" external>For Librarians</pharos-sidenav-link>
    </pharos-sidenav-section>
  </pharos-sidenav>
`;
