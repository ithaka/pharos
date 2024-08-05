import Grid from '../../components/Grid';
import DosAndDonts from '../../components/statics/DosAndDonts';
import heroLogo from '../../../static/images/brand-expressions/logos/logo_hero.svg';
import veritalLogo from '../../../static/images/brand-expressions/logos/logo_jstor-vertical.svg';
import horizontalLogo from '../../../static/images/brand-expressions/logos/logo_jstor-horizontal.svg';
import knockoutLogo from '../../../static/images/brand-expressions/logos/logo_knockout.svg';
import bestPracticesDoOne from '../../../static/images/brand-expressions/logos/logo_best-practices_dos_1.svg';
import bestPracticesDoTwo from '../../../static/images/brand-expressions/logos/logo_best-practices_dos_2.svg';
import bestPracticesDoThree from '../../../static/images/brand-expressions/logos/logo_best-practices_dos_3.svg';
import bestPracticesDoFour from '../../../static/images/brand-expressions/logos/logo_best-practices_dos_4.svg';
import bestPracticesDontOne from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_1.svg';
import bestPracticesDontTwo from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_2.svg';
import bestPracticesDontThree from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_3.svg';
import bestPracticesDontFour from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_4.svg';
import bestPracticesDontFive from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_5.svg';
import bestPracticesDontSix from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_6.svg';
import bestPracticesDontSeven from '../../../static/images/brand-expressions/logos/logo_best-practices_donts_7.svg';

import PageSection from '../../components/statics/PageSection';
import { PharosHeading } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const LogosPage: FC = () => {
  return (
    <>
      <PageSection
        title="Logos"
        description={`Our logo is based on turn of the century ornate bookplates. The filigree pattern is inspired by acanthus leaves; these are the same leaves that appear at the top of the Corinthian column. "JSTOR" is set in a modified Orpheus typeface.`}
        isHeader
      >
        <img src={heroLogo} alt="Hero logo" style={{ width: '100%' }} />
      </PageSection>

      <PageSection title="Logo types" moreTitleSpace>
        <Grid columns={2}>
          <div>
            <PharosHeading level={3} preset="4">
              Primary Logo
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              The vertical logo orientation should be the primary logo treatment used.
            </p>
          </div>
          <img src={veritalLogo} alt="Vertical logo" />
        </Grid>
        <Grid columns={2}>
          <div>
            <PharosHeading level={3} preset="4">
              Secondary Logo
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              The horizontal logo orientation should be used when the logo needs to scale small or
              the placement area is horizontal in width.
            </p>
          </div>
          <img src={horizontalLogo} alt="Horizontal logo" height="70" />
        </Grid>
        <Grid columns={2}>
          <div>
            <PharosHeading level={3} preset="4">
              Knocked out
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              On dark backgrounds the logo should be white.
            </p>
          </div>
          <img src={knockoutLogo} alt="Knocked out logo" />
        </Grid>
      </PageSection>

      <PageSection title="Principles" moreTitleSpace>
        <Grid columns={2}>
          <div>
            <PharosHeading level={3} preset="4">
              Heritage
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              Our logo is the first and primary expression.
            </p>
          </div>
          <div>
            <PharosHeading level={3} preset="4">
              Consistent
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              The logo should be used according to the standards outlined in this guide.
            </p>
          </div>
        </Grid>
      </PageSection>

      <PageSection title="Best Practices">
        <DosAndDonts>
          <Grid columns={3}>
            <div>
              <img
                src={bestPracticesDoOne}
                alt="Logos best practice 1"
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <p>Use the primary logo whenever possible</p>
            </div>
            <div>
              <img
                src={bestPracticesDoTwo}
                alt="Logos best practice 2"
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <p>Use the logo in red or white, no other colors</p>
            </div>
            <div>
              <img
                src={bestPracticesDoThree}
                alt="Logos best practice 3"
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <p>
                The filigree and J are transparent and the "surface" they're put on can be seen
                through{' '}
              </p>
            </div>
            <div>
              <img
                src={bestPracticesDoFour}
                alt="Logos best practice 3"
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <p>On gradient backgrounds the logo should be white</p>
            </div>
          </Grid>
        </DosAndDonts>
        <DosAndDonts Dont>
          <Grid columns={3}>
            <div>
              <img src={bestPracticesDontOne} alt="Logos don'ts 1" />
              <p>Use just the square mark</p>
            </div>
            <div>
              <img src={bestPracticesDontTwo} alt="Logos don'ts 2" />
              <p>Stretch or distort the logo</p>
            </div>
            <div>
              <img src={bestPracticesDontThree} alt="Logos don'ts 3" />
              <p>Delete the red box around the filigree</p>
            </div>
            <div>
              <img src={bestPracticesDontFour} alt="Logos don'ts 4" />
              <p>Use the original logo design</p>
            </div>
            <div>
              <img src={bestPracticesDontFive} alt="Logos don'ts 5" />
              <p>Change the color of the logo, use it in JSTOR red or knocked out white only</p>
            </div>
            <div>
              <img src={bestPracticesDontSix} alt="Logos don'ts 6" />
              <p>Use just the JSTOR words </p>
            </div>
            <div>
              <img src={bestPracticesDontSeven} alt="Logos don'ts 7" />
              <p>Put the logo on a black background</p>
            </div>
          </Grid>
        </DosAndDonts>
      </PageSection>
    </>
  );
};
export default LogosPage;
