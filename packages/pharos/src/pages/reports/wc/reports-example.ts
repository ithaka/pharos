import { LitElement, html } from 'lit';
import { ReportsTable } from './reports-table';
import { historyTable, scheduledTable } from '../mocks';
import { CreateReportModal } from './create-report-modal';
import { Sidenav } from './sidenav';
import logo from '../../../utils/_storybook/assets/images/reports/jstor-horizontal.svg';
export class ReportsExample extends LitElement {
  override createRenderRoot() {
    // Keep example element in the light DOM to allow sharing styles with React story
    return this;
  }
  readonly #mobileBreakpoint = 1055;
  resizeObserver: ResizeObserver;
  isMobile: boolean;
  isSidenavDisplayed: boolean;

  static override get properties() {
    return {
      isMobile: { type: Boolean },
      isSidenavDisplayed: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isMobile = window.innerWidth < this.#mobileBreakpoint;
    this.isSidenavDisplayed = window.innerWidth >= this.#mobileBreakpoint;
    this.resizeObserver = new ResizeObserver(() => {
      const windowWidth = window.innerWidth;
      this.isSidenavDisplayed = windowWidth >= this.#mobileBreakpoint;
      this.isMobile = windowWidth < this.#mobileBreakpoint;
    });
  }

  override firstUpdated() {
    super.connectedCallback();
    const container = this.renderRoot.querySelector('.reports-page__container');
    if (container) {
      this.resizeObserver.observe(container);
    }
  }

  override disconnectedCallback() {
    this.resizeObserver.disconnect();
    super.disconnectedCallback();
  }

  resizeHandler() {
    const windowWidth = window.innerWidth;
    this.isSidenavDisplayed = windowWidth >= this.#mobileBreakpoint;
    this.isMobile = windowWidth < this.#mobileBreakpoint;
  }

  override render() {
    return html`<div class="reports-page__container">
        ${Sidenav(this.isSidenavDisplayed, this.isMobile)}
        <main id="main-content">
          <storybook-pharos-layout
            preset="1-col--sidenav"
            class="reports-page__container--main-content"
          >
            <div class="reports-page__container--top" slot="top">
              <div class="reports-page__container--nav-header">
                <storybook-pharos-button
                  data-sidenav-id="report-sidenav"
                  variant="subtle"
                  a11yLabel="Open side navigation"
                  icon="menu"
                ></storybook-pharos-button>
                <img src="${logo}" alt="logo" width="96" height="24" />
                <span class="reports-page__separator">/</span>
                <storybook-pharos-heading level="1" preset="4" no-margin
                  >Admin</storybook-pharos-heading
                >
              </div>
              <storybook-pharos-button
                variant="subtle"
                icon-right="chevron-down"
                class="reports-page__button--user"
                >Gerry Larry Burla
              </storybook-pharos-button>
            </div>
            <div class="reports-page__container--disclaimer">
              <storybook-pharos-heading level="2" preset="5--bold"
                >COUNTER 5 Usage Reports</storybook-pharos-heading
              >
              <p>
                Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR
                offers COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4
                reports are still available for usage from January 2017 - April 2019 from the
                <storybook-pharos-link href="#">COUNTER 4 reporting service</storybook-pharos-link>.
                Please visit our COUNTER 5
                <storybook-pharos-link href="#">support page</storybook-pharos-link>
                for more information on JSTOR usage reports.
              </p>
            </div>
            <div class="reports-page__container--table">
              <storybook-pharos-button
                class="reports-page__button--create"
                data-modal-id="create-report-modal"
                >Create Report
              </storybook-pharos-button>
              <storybook-pharos-tabs>
                <storybook-pharos-tab id="tab-1" data-panel-id="panel-1"
                  >Report History</storybook-pharos-tab
                >
                <storybook-pharos-tab id="tab-2" data-panel-id="panel-2"
                  >Scheduled Reports</storybook-pharos-tab
                >
                <storybook-pharos-tab-panel id="panel-1" slot="panel" style="overflow: visible">
                  ${ReportsTable(historyTable)}
                </storybook-pharos-tab-panel>
                <storybook-pharos-tab-panel id="panel-2" slot="panel">
                  ${ReportsTable(scheduledTable)}
                </storybook-pharos-tab-panel>
              </storybook-pharos-tabs>
            </div>
          </storybook-pharos-layout>
        </main>
      </div>
      <storybook-pharos-toaster></storybook-pharos-toaster>
      ${CreateReportModal()}`;
  }
}
