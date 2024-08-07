import DosAndDonts from '../../components/statics/DosAndDonts';
import elevationStackGuide from '../../../static/images/brand-expressions/elevation/elevation_stack_guide.jpg';
import effectStacking from '../../../static/images/brand-expressions/elevation/effect_stacking.jpg';
import topDropShadow from '../../../static/images/brand-expressions/elevation/top_drop_shadow.jpg';
import dosContentBehind from '../../../static/images/brand-expressions/elevation/dos_content_behind.png';
import upAndDown from '../../../static/images/brand-expressions/elevation/up_and_down.jpg';
import dontVisuallyPlease from '../../../static/images/brand-expressions/elevation/dont_visually_please.jpg';
import withIconography from '../../../static/images/brand-expressions/elevation/with_iconography.jpg';
import dontChangeSource from '../../../static/images/brand-expressions/elevation/dont_change_source.jpg';
import PageSection from '../../components/statics/PageSection';
import Grid from '../../components/Grid';
import { PharosHeading } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const ElevationPage: FC = () => {
  return (
    <>
      <PageSection
        title="Elevation"
        description="Elevation is used to provide visual cues about a components' depth from a website's surface and its distance in relation to other components. It signals users that a component is being prioritized, emphasized, or requires their focus. This can come from the visual cue of dynamic elevation or static elevation."
        isHeader
      ></PageSection>

      <PageSection title="Elevation system">
        <div
          style={{
            width: '75%',
            marginBottom: '3rem',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          JSTOR uses an elevation system to assign consistent elevation levels to certain
          components. By following the guide, usage will remain uniform across all JSTOR platforms.
        </div>
        <PharosHeading level={3} preset="4">
          Elevation guide
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          <strong> View CSS Codes under Design Tokens. </strong>
        </p>
        <img
          src={elevationStackGuide}
          alt="Elevation stack guide"
          width="800px"
          style={{ marginBottom: '70px' }}
        />
        <PharosHeading level={3} preset="4">
          Shadow definitions
        </PharosHeading>
        <ul style={{ marginBottom: '50px' }}>
          <li>Blur - How diffused a shadow will be.</li>
          <li>Spread - How large a shadow will be.</li>
          <li>Z-index - How elevated a shadow will be.</li>
          <li>
            X - Our light source. This will not be altered because our light source is consistently
            set at 12 o'clock.
          </li>
        </ul>
        <PharosHeading level={3} preset="4">
          Shadow stacking
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          To avoid the harsh outline of a stroke, and also so that the stroke won't be
          misrepresented as a container, the outline of a component using elevation will be achieved
          by stacking shadows.
        </p>
        <img
          src={effectStacking}
          alt="Two different shadow effects"
          width="220px"
          style={{ marginBottom: '24px' }}
        />
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          The top shadow gives the illusion of a stroke, while the bottom shadow tackles the actual
          shadow. If you only have the top shadow, the component will blend into the background. If
          you only have the bottom shadow, the component will be undefined.
        </p>
        <Grid columns={4}>
          <strong>Border only</strong>
          <strong>Top shadow only</strong>
          <strong>Bottom shadow only</strong>
          <strong>Both shadows</strong>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              border: '1px solid var(--pharos-color-marble-gray-80)',
            }}
          ></div>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: '0px 1px 2px 0px rgba(18, 18, 18, 0.30)',
            }}
          ></div>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: '0px 4px 8px 3px rgba(18, 18, 18, 0.15)',
            }}
          ></div>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: 'var(--pharos-elevation-level-3)',
            }}
          ></div>
        </Grid>
      </PageSection>

      <PageSection title="Elevation calculations">
        <PharosHeading level={3} preset="4">
          Elevation values
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          JSTOR uses a consistent equation to calculate elevation levels as they rise. To maintain
          elevation levels, follow this important two-step system calculation:
        </p>
        <ol style={{ color: 'var(--pharos-color-text-20)' }}>
          <li>
            The top shadow should consistently stay at these values no matter the elevation level:
            <ul>
              <li>X = 0</li>
              <li>Blur = 2</li>
              <li>Y = 1</li>
              <li>Spread = 0</li>
            </ul>
            <img
              src={topDropShadow}
              alt="Top drop shadow"
              width="220px"
              style={{ marginBottom: '40px' }}
            />
          </li>
          <li style={{ color: 'var(--pharos-color-text-20)' }}>
            Calculations are used beginning at Level 2. The bottom shadow should comply with the
            following system as each level rises:
            <ul>
              <li>X = 0</li>
              <li>Blur + 2</li>
              <li>Y + 2</li>
              <li>Spread + 1</li>
            </ul>
          </li>
        </ol>
        <Grid columns={3}>
          <strong>Level 2</strong>
          <strong>Level 3</strong>
          <strong>Level 4</strong>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: 'var(--pharos-elevation-level-2)',
            }}
          ></div>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: 'var(--pharos-elevation-level-3)',
            }}
          ></div>
          <div
            style={{
              width: '201px',
              height: '142px',
              borderRadius: 'var(--pharos-radius-base-standard)',
              boxShadow: 'var(--pharos-elevation-level-4)',
            }}
          ></div>
        </Grid>
      </PageSection>

      <PageSection title="Principles">
        <PharosHeading level={3} preset="4">
          Consistent
        </PharosHeading>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-2-x)',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          All elevation is used at the appropriate level assigned to that component. Always follow
          the recommended shadow pairings.
        </div>
        <PharosHeading level={3} preset="4">
          Suitable
        </PharosHeading>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-2-x)',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          Dynamic elevation should only change values when it is suitable for a component's
          behavior.
        </div>
        <PharosHeading level={3} preset="4">
          Practical
        </PharosHeading>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-2-x)',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          Elevation is not solely used for visually enjoyment. It should communicate to users that
          there is an emphasis or prioritization when it comes to a given component.
        </div>
      </PageSection>

      <PageSection title="Best Practices">
        <DosAndDonts>
          <div className="best-practice" style={{ marginBottom: '4rem' }}>
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Use when there is content behind a component.
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              Use elevation when a component can be interacted with, as well.
            </p>
            <img
              src={dosContentBehind}
              alt="For example a sticky header"
              width="220px"
              style={{ marginBottom: '60px' }}
            />
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Alter the Y-axis for directional movement.
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              For example, changing Y = 2 to Y = -2.
            </p>
            <img
              src={upAndDown}
              alt="Y eequals positive 2 when a drawer slides up, Y equals negative 2 when a drawer slides down"
              width="450px"
            />
          </div>
        </DosAndDonts>
        <DosAndDonts Dont>
          <div className="best-practice">
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Apply elevation to make components visually pleasing.
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              The reason these components require elevation is because the reason can be
              articulated. If there is no plausible reason for elevation to be used, do not use it.
            </p>
            <img
              src={dontVisuallyPlease}
              alt="don't add elevation to components for fun"
              width="450px"
              style={{ marginBottom: '60px' }}
            />
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Add elevation when content already includes icons to communicate user cues.
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              The ability to move content is already visually communicated through the reorder icon.
              Hover elevation is not needed for any purpose other than to provide visual enjoyment.
            </p>
            <img
              src={withIconography}
              alt="don't add to components that communicate user interactivity"
              width="190px"
              style={{ marginBottom: '60px' }}
            />
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Change the light source.
            </PharosHeading>
            <p style={{ color: 'var(--pharos-color-text-20)' }}>
              Don't change the positioning of the shadow. By not following the elevation system
              guidelines, inconsistencies will start to pop up across ITHAKA platforms.
            </p>
            <img src={dontChangeSource} alt="X value has been altered" width="195px" />
          </div>
        </DosAndDonts>
      </PageSection>
    </>
  );
};
export default ElevationPage;
