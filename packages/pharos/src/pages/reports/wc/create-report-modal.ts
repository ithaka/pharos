import { html } from 'lit';
import type { TemplateResult } from 'lit';

export const CreateReportModal = (): TemplateResult => html`
  <storybook-pharos-modal id="create-report-modal" header="Create Report" size="large">
    <form class="reports-page__form--create-modal">
      <storybook-pharos-select name="report" required>
        <span slot="label">Select Report</span>
        <option value="">Select a Report</option>
        <optgroup label="Master Reports">
          <option value="DR">DR - Database Master Report</option>
        </optgroup>
        <optgroup label="Standard Reports">
          <option value="ALL" selected>ALL - All Standard Reports</option>
        </optgroup>
      </storybook-pharos-select>
      <fieldset class="reports-page__fieldset--type">
        <legend class="reports-page__legend">
          <span>Report Type</span>
        </legend>
        <storybook-pharos-button name="is-scheduled" value="yes" disabled
          >Scheduled</storybook-pharos-button
        >
        <storybook-pharos-button name="is-scheduled" value="no">One-time</storybook-pharos-button>
      </fieldset>
      <fieldset class="reports-page__fieldset--date">
        <legend class="reports-page__legend">
          <span>Report Date Range</span>
        </legend>
        <div class="reports-page__grid--date-group">
          <storybook-pharos-input-group name="start-date">
            <span slot="label">Start Date</span>
            <storybook-pharos-button
              name="start-button"
              icon="calendar"
              variant="subtle"
              label="calendar"
            ></storybook-pharos-button>
          </storybook-pharos-input-group>
          <storybook-pharos-input-group name="end-date">
            <span slot="label">End Date</span>
            <storybook-pharos-button
              name="end-button"
              icon="calendar"
              variant="subtle"
              label="calendar"
            ></storybook-pharos-button>
          </storybook-pharos-input-group>
        </div>
      </fieldset>
      <storybook-pharos-radio-group name="format">
        <span slot="legend">Report Format</span>
        <storybook-pharos-radio-button value="xlsx" checked
          ><span slot="label">XLSX</span></storybook-pharos-radio-button
        >
        <storybook-pharos-radio-button value="tsv"
          ><span slot="label">TSV</span></storybook-pharos-radio-button
        >
        <storybook-pharos-radio-button value="json"
          ><span slot="label">JSON</span></storybook-pharos-radio-button
        >
      </storybook-pharos-radio-group>
      <storybook-pharos-text-input name="name" required>
        <span slot="label">Report Name</span>
      </storybook-pharos-text-input>
      <storybook-pharos-text-input name="email" value="human@ithaka.org" type="email" required>
        <span slot="label">Email Report To</span>
      </storybook-pharos-text-input>
    </form>
    <storybook-pharos-button slot="footer" type="button" variant="secondary" data-modal-close>
      Cancel
    </storybook-pharos-button>
    <storybook-pharos-button slot="footer" type="button"> Continue </storybook-pharos-button>
  </storybook-pharos-modal>
`;
