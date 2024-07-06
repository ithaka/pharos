import IconsDisplay from '../../components/statics/iconography/IconsDisplay';
import strokeWidth from '../../../static/images/brand-expressions/iconography/icons-2px-stroke.png';
import centerWeight from '../../../static/images/brand-expressions/iconography/icons-center-stroke.png';
import squareCap from '../../../static/images/brand-expressions/iconography/icons-square-caps.png';
import alignOptically from '../../../static/images/brand-expressions/iconography/icons-align-optically.png';
import squareJoins from '../../../static/images/brand-expressions/iconography/icons-square-joins.png';
import logoInspired from '../../../static/images/brand-expressions/iconography/icons-logo-inspired.png';

import heroImage from '../../../static/images/brand-expressions/iconography/icon_overview_hero.svg';
import simpleDo from '../../../static/images/brand-expressions/iconography/iconography_simple-detailed_do.svg';
import simpleDont from '../../../static/images/brand-expressions/iconography/iconography_simple-detailed_dont.svg';
import clearDo from '../../../static/images/brand-expressions/iconography/iconography_clear-conceptual_do.svg';
import clearDont from '../../../static/images/brand-expressions/iconography/iconography_clear-conceptual_dont.svg';
import familyDo from '../../../static/images/brand-expressions/iconography/iconography_family-friends_do.svg';
import familyDont from '../../../static/images/brand-expressions/iconography/iconography_family-friends_dont.svg';
import labelsDo from '../../../static/images/brand-expressions/iconography/iconography_labels_do.svg';
import labelsDont from '../../../static/images/brand-expressions/iconography/iconography_labels_dont.svg';

import PageSection from '../../components/statics/PageSection';
import Grid from '../../components/Grid';
import BestPractices from '../../components/statics/BestPractices';
import { PharosButton, PharosHeading } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const IconographyPage: FC = () => {
  return (
    <>
      <PageSection
        title="Iconography"
        description="JSTOR icons seek to provide clarity and convey brand personality through color and style, but must first communicate meaning in the content."
        isHeader
      >
        <PharosButton
          iconRight="link-external"
          href="/storybook/?path=/story/webcomponents_components-icon--names"
          target="_blank"
        >
          View icons in Storybook
        </PharosButton>
        <div
          style={{
            marginTop: 'var(--pharos-spacing-5-x)',
            marginBottom: 'var(--pharos-spacing-7-x)',
          }}
        >
          <Grid columns={1} justifyContent="center" minContent align="end">
            <img src={heroImage} alt="Iconography" />
          </Grid>
        </div>
      </PageSection>

      <PageSection title="Icons">
        <IconsDisplay
          title="System"
          rows={6}
          iconsToShow={[
            'arrow-up',
            'arrow-down',
            'arrow-left',
            'arrow-right',
            'attachment',
            'calendar',
            'chevron-down',
            'chevron-up',
            'chevron-left',
            'chevron-right',
            'chevron-left-large',
            'chevron-right-large',
            'close',
            'close-inverse',
            'copy',
            'ellipses-horizontal',
            'ellipses-vertical',
            'link-external',
            'menu',
            'view-gallery',
            'view-grid',
            'view-list',
          ]}
        />
        <IconsDisplay
          title="Workspace"
          rows={4}
          iconsToShow={[
            'academic-content',
            'add',
            'delete',
            'folder',
            'folder-new',
            'folder-selected',
            'image',
            'link',
            'link-add',
            'move',
            'workspace',
            'workspace-selected',
            'primary-source',
            'video',
          ]}
        />
        <IconsDisplay
          title="Alerts, feedback"
          rows={2}
          iconsToShow={[
            'checkmark',
            'checkmark-small',
            'exclamation',
            'dash-small',
            'checkmark-inverse',
            'exclamation-inverse',
            'info-inverse',
            'question-inverse',
          ]}
        />
        <IconsDisplay
          title="Item actions"
          rows={3}
          iconsToShow={[
            'cite',
            'download',
            'collapse',
            'expand',
            'fit-to-view',
            'fit-to-width',
            'fullscreen',
            'fullscreen-minimize',
            'save',
            'search',
            'share',
            'zoom-in',
            'zoom-out',
          ]}
        />
        <IconsDisplay
          title="Social"
          rows={2}
          iconsToShow={[
            'email',
            'facebook',
            'google-color',
            'instagram',
            'linkedin',
            'twitter',
            'tumblr',
            'youtube',
          ]}
        />
      </PageSection>

      <PageSection title="Principles">
        <div style={{ marginBottom: '4rem' }}>
          <PharosHeading level={3} preset="4" style={{ marginBottom: '1rem' }}>
            Simple over detailed
          </PharosHeading>
          <Grid columns={2} justify="center" bottom={1}>
            <img src={simpleDo} alt="Simple over detailed do" />
            <img src={simpleDont} alt="Simple over detailed dont" />
          </Grid>
          <BestPractices
            Do={
              <ul>
                <li>Icons should have simple lines and shapes</li>
                <li>
                  Limit the creation of icon variations. No need for different icons to represent
                  the same concept (e.g. "admin settings" vs. "user settings")
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>
                  Icons should not be too heavy in details, this increases cognitive load on the
                  user
                </li>
              </ul>
            }
          />
        </div>
        <div style={{ marginBottom: '4rem' }}>
          <PharosHeading level={3} preset="4" style={{ marginBottom: '1rem' }}>
            Clear over conceptual
          </PharosHeading>
          <Grid columns={2} justify="center" bottom={1}>
            <img src={clearDo} alt="Clear over conceptual do" />
            <img src={clearDont} alt="Clear over conceptual dont" />
          </Grid>
          <BestPractices
            Do={
              <ul>
                <li>
                  Users should be able to understand what the icon represents. Interpreting abstract
                  (symbolic) icons can take more time and effort.
                </li>
                <li>Needs to be quickly recognizable on smaller screens.</li>
                <li>Use well-known icons.</li>
              </ul>
            }
            Dont={
              <ul>
                <li>
                  Don't reinvent an icon that's already been accepted as a convention. (e.g. a
                  "gear" icon for "settings").
                </li>
              </ul>
            }
          />
        </div>
        <div style={{ marginBottom: '4rem' }}>
          <PharosHeading level={3} preset="4" style={{ marginBottom: '.5rem' }}>
            Family over friends
          </PharosHeading>
          <Grid columns={2} justify="center" bottom={1}>
            <img src={familyDo} alt="Family over friends do" />
            <img src={familyDont} alt="Family over friends dont" />
          </Grid>
          <BestPractices
            Do={
              <ul>
                <li>The icon set needs to look and feel related.</li>
              </ul>
            }
            Dont={
              <ul>
                <li>
                  Icons that aren't related may look out of place, cheapening the design or leading
                  a user to mistrust your design.
                </li>
              </ul>
            }
          />
        </div>
        <div>
          <PharosHeading level={3} preset="4" style={{ marginBottom: '1rem' }}>
            Labels over no labels
          </PharosHeading>
          <Grid columns={2} justify="center" bottom={1}>
            <img src={labelsDo} alt="Labels over no labels do" />
            <img src={labelsDont} alt="Labels over no labels dont" />
          </Grid>
          <BestPractices
            Do={
              <ul>
                <li>
                  Whenever possible, pair an icon with text, it's more quickly recognizable and
                  understood.
                </li>
                <li>
                  If an icon cannot have text pair next to it, the use of a tooltip will suffice
                  (e.g. zoom in/zoom out on the viewer).
                </li>
              </ul>
            }
            Dont={
              <ul>
                <li>Avoid using icons alone. Icons with labels are more effective.</li>
              </ul>
            }
          />
        </div>
      </PageSection>

      <PageSection title="Design and production guidelines">
        <img src={strokeWidth} alt="All icons have a 2px stroke width" width="220" />
        <img src={centerWeight} alt="Center the weight of icons" width="220" />
        <img src={alignOptically} alt="Center the icons optically" width="220" />
        <img src={squareJoins} alt="Make sure the icons have 90 degree angles" width="220" />
        <img src={squareCap} alt="Icons have square caps" width="220" />
        <img
          src={logoInspired}
          alt="Icons are inspired by the square shape of the logo"
          width="220"
        />
        <div style={{ marginTop: '4rem', marginBottom: '5rem', width: '66%' }}>
          <PharosHeading level={3} preset="4">
            Steps
          </PharosHeading>
          <ol>
            <li>
              Please review our current icons to see if one can work for your need. All icons should
              be unique and not redundant.
            </li>
            <li>
              Create a 24x24px rectangle or artboard with a 1px grid. All lines and shapes of the
              icon are to snap to a pixel on the grid, so there shouldn't be any decimal sizes of
              the lines or shapes you create.
            </li>
            <li>
              Then, you'll need to use our grid template. Most product-based icons should be 16px,
              with a max size of 20px. The grid's internal boxes decrease from 24px at 2px
              increments down to 12px. These will serve as guidelines to snap your lines to.
            </li>
            <li>All icons have a 2px stroke width.</li>
            <li>
              When designing icons that include closed shapes, the weight needs to be "centered" as
              opposed to "inside or "outside" the shape. This provides enough thickness and crisp
              silhouettes.
            </li>
            <li>All existing corners need to be square angles, or 90 degrees</li>
            <li>The caps/ends of the lines need to be square</li>
            <li>Align elements optically (e.g., a play button)</li>
          </ol>
          <div
            style={{
              marginTop: 'var(--pharos-spacing-2-x)',
              marginBottom: 'var(--pharos-spacing-2-x)',
            }}
          >
            <PharosHeading level={4} preset="1--bold">
              Implementation details when creating icons
            </PharosHeading>
            <ul>
              <li>
                It's important that the icons sit on the pixel so they always appeared crisp and
                sharp
              </li>
              <li>Please do not use the "line" tool, this can place vectors on half pixels</li>
              <li>
                Be aware of automatic alignments which can place vectors on uneven or half pixels
              </li>
            </ul>
          </div>
        </div>
        <PharosHeading level={3} preset="4">
          Exporting for the product
        </PharosHeading>
        <ul>
          <li>
            Icons should be at whole pixels. No decimals are allowed in x and y coordinates or width
            and height fields.
          </li>
          <li>Each artboard and the artwork within it must be aligned to the pixel grid.</li>
          <li>All strokes must be expanded and at whole pixel values.</li>
          <li>
            Convert your strokes to outlines, all shapes and paths should be combined and converted
            into a single path.
          </li>
        </ul>
      </PageSection>
    </>
  );
};
export default IconographyPage;
