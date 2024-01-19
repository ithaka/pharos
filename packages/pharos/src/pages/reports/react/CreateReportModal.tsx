import type { FC } from 'react';

import { PharosModal } from '../../../react-components/modal/pharos-modal';
import { PharosButton } from '../../../react-components/button/pharos-button';
import { PharosSelect } from '../../../react-components/select/pharos-select';
import { PharosTextInput } from '../../../react-components/text-input/pharos-text-input';
import { PharosInputGroup } from '../../../react-components/input-group/pharos-input-group';
import { PharosRadioButton } from '../../../react-components/radio-button/pharos-radio-button';
import { PharosRadioGroup } from '../../../react-components/radio-group/pharos-radio-group';

export const CreateReportModal: FC = () => (
  <PharosModal id="create-report-modal" header="Create Report" size="large">
    <form className="reports-page__form--create-modal">
      <PharosSelect name="report" required>
        <span slot="label">Select Report</span>
        <option value="">Select a Report</option>
        <optgroup label="Master Reports">
          <option value="DR">DR - Database Master Report</option>
        </optgroup>
        <optgroup label="Standard Reports">
          <option value="ALL" selected>
            ALL - All Standard Reports
          </option>
        </optgroup>
      </PharosSelect>
      <fieldset className="reports-page__fieldset--type">
        <legend className="reports-page__legend">
          <span>Report Type</span>
        </legend>
        <PharosButton name="is-scheduled" value="yes" disabled>
          Scheduled
        </PharosButton>
        <PharosButton name="is-scheduled" value="no">
          One-time
        </PharosButton>
      </fieldset>
      <fieldset className="reports-page__fieldset--date">
        <legend className="reports-page__legend">
          <span>Report Date Range</span>
        </legend>
        <div className="reports-page__grid--date-group">
          <PharosInputGroup name="start-date">
            <span slot="label">Start Date</span>
            <PharosButton
              name="start-button"
              icon="calendar"
              variant="subtle"
              a11yLabel="calendar"
            ></PharosButton>
          </PharosInputGroup>
          <PharosInputGroup name="end-date">
            <span slot="label">End Date</span>
            <PharosButton
              name="end-button"
              icon="calendar"
              variant="subtle"
              a11yLabel="calendar"
            ></PharosButton>
          </PharosInputGroup>
        </div>
      </fieldset>
      <PharosRadioGroup name="format">
        <span slot="legend">Report Format</span>
        <PharosRadioButton value="xlsx" checked>
          <span slot="label">XLSX</span>
        </PharosRadioButton>
        <PharosRadioButton value="tsv">
          <span slot="label">TSV</span>
        </PharosRadioButton>
        <PharosRadioButton value="json">
          <span slot="label">JSON</span>
        </PharosRadioButton>
      </PharosRadioGroup>
      <PharosTextInput name="name" required>
        <span slot="label">Report Name</span>
      </PharosTextInput>
      <PharosTextInput name="email" value="human@ithaka.org" type="email" required>
        <span slot="label">Email Report To</span>
      </PharosTextInput>
    </form>
    <PharosButton slot="footer" type="button" variant="secondary" data-modal-close>
      Cancel
    </PharosButton>
    <PharosButton slot="footer" type="button">
      Continue
    </PharosButton>
  </PharosModal>
);
