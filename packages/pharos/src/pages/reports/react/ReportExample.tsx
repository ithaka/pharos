import { useEffect, type FC, useState } from 'react';
import { Sidenav } from './Sidenav';
import { CreateReportModal } from './CreateReportModal';
import { ReportsTable } from './ReportsTable';
import { historyTable, scheduledTable } from '../mocks';
import logo from '@config/assets/images/reports/jstor-horizontal.svg';

import {
  PharosHeading,
  PharosLink,
  PharosButton,
  PharosTabs,
  PharosTab,
  PharosTabPanel,
  PharosToaster,
  PharosLayout,
} from '../../../react-components';

export const ReportExample: FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);
  const [isSidenavDisplayed, setIsSidenavDisplayed] = useState<boolean>(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsSidenavDisplayed(windowWidth >= 1000);
      setIsMobile(windowWidth < 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="reports-page__container">
        <Sidenav open={isSidenavDisplayed} showCloseButton={isMobile} />
        <main id="main-content">
          <PharosLayout preset="1-col--sidenav" className="reports-page__container--main-content">
            <div className="reports-page__container--top" slot="top">
              <div className="reports-page__container--nav-header">
                <PharosButton
                  variant="subtle"
                  icon="menu"
                  data-sidenav-id="report-sidenav"
                  a11yLabel="Open side navigation"
                />
                <img src={logo} alt="logo" width="96" height="24" />
                <span className="reports-page__separator">/</span>
                <PharosHeading level={1} preset="4" noMargin>
                  Admin
                </PharosHeading>
              </div>
              <PharosButton
                variant="subtle"
                iconRight="chevron-down"
                className="reports-page__button--user"
              >
                Gerry Larry Burla
              </PharosButton>
            </div>
            <div className="reports-page__container--disclaimer">
              <PharosHeading level={2} preset="5--bold">
                COUNTER 5 Usage Reports
              </PharosHeading>
              <p>
                Welcome to the COUNTER 5 reporting service for participating institutions. JSTOR
                offers COUNTER 5 compliant reports for usage beginning January 2019. COUNTER 4
                reports are still available for usage from January 2017 - April 2019 from the{' '}
                <PharosLink href="#">COUNTER 4 reporting service</PharosLink>. Please visit our
                COUNTER 5 <PharosLink href="#">support page</PharosLink> for more information on
                JSTOR usage reports.
              </p>
            </div>
            <div className="reports-page__container--table">
              <PharosButton
                className="reports-page__button--create"
                data-modal-id="create-report-modal"
              >
                Create Report
              </PharosButton>
              <PharosTabs>
                <PharosTab id="tab-1" data-panel-id="panel-1">
                  Report History
                </PharosTab>
                <PharosTab id="tab-2" data-panel-id="panel-2">
                  Scheduled Reports
                </PharosTab>
                <PharosTabPanel id="panel-1" slot="panel" style={{ overflow: 'visible' }}>
                  {ReportsTable(historyTable)}
                </PharosTabPanel>
                <PharosTabPanel id="panel-2" slot="panel">
                  {ReportsTable(scheduledTable)}
                </PharosTabPanel>
              </PharosTabs>
            </div>
          </PharosLayout>
        </main>
      </div>
      <PharosToaster></PharosToaster>
      <CreateReportModal />
    </>
  );
};
