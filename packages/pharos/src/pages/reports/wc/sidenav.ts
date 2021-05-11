import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../../../components/sidenav/pharos-sidenav';
import '../../../components/sidenav/pharos-sidenav-section';
import '../../../components/sidenav/pharos-sidenav-link';
import '../../../components/sidenav/pharos-sidenav-menu';
import '../../../components/link/pharos-link';

export const Sidenav = (): TemplateResult => html`
  <pharos-sidenav class="reports-page__sidenav">
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
