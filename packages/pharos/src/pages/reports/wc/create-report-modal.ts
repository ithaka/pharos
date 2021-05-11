import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../../../components/modal/pharos-modal';
import '../../../components/button/pharos-button';
import '../../../components/select/pharos-select';
import '../../../components/text-input/pharos-text-input';
import '../../../components/radio-group/pharos-radio-group';
import '../../../components/radio-button/pharos-radio-button';
import '../../../components/input-group/pharos-input-group';

export const CreateReportModal = (): TemplateResult => html`
  <pharos-modal id="create-report-modal" header="Create Report" size="large">
    <form class="reports-page__form--create-modal">
      <pharos-select name="report" required>
        <span slot="label">Select Report</span>
        <option value="">Select a Report</option>
        <optgroup label="Master Reports">
          <option value="DR">DR - Database Master Report</option>
        </optgroup>
        <optgroup label="Standard Reports">
          <option value="ALL" selected>ALL - All Standard Reports</option>
        </optgroup>
      </pharos-select>
      <fieldset class="reports-page__fieldset--type">
        <legend class="reports-page__legend">
          <span>Report Type</span>
        </legend>
        <pharos-button name="is-scheduled" value="yes" disabled>Scheduled</pharos-button>
        <pharos-button name="is-scheduled" value="no">One-time</pharos-button>
      </fieldset>
      <fieldset class="reports-page__fieldset--date">
        <legend class="reports-page__legend">
          <span>Report Date Range</span>
        </legend>
        <div class="reports-page__grid--date-group">
          <pharos-input-group name="start-date">
            <span slot="label">Start Date</span>
            <pharos-button
              name="start-button"
              icon="calendar"
              variant="subtle"
              label="calendar"
            ></pharos-button>
          </pharos-input-group>
          <pharos-input-group name="end-date">
            <span slot="label">End Date</span>
            <pharos-button
              name="end-button"
              icon="calendar"
              variant="subtle"
              label="calendar"
            ></pharos-button>
          </pharos-input-group>
        </div>
      </fieldset>
      <pharos-radio-group name="format">
        <span slot="legend">Report Format</span>
        <pharos-radio-button value="xlsx" checked
          ><span slot="label">XLSX</span></pharos-radio-button
        >
        <pharos-radio-button value="tsv"><span slot="label">TSV</span></pharos-radio-button>
        <pharos-radio-button value="json"><span slot="label">JSON</span></pharos-radio-button>
      </pharos-radio-group>
      <pharos-text-input name="name" required>
        <span slot="label">Report Name</span>
      </pharos-text-input>
      <pharos-text-input name="email" value="human@ithaka.org" type="email" required>
        <span slot="label">Email Report To</span>
      </pharos-text-input>
    </form>
    <pharos-button slot="footer" type="button" variant="secondary" data-modal-close>
      Cancel
    </pharos-button>
    <pharos-button slot="footer" type="button"> Continue </pharos-button>
  </pharos-modal>
`;
