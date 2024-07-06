import DosAndDonts from '../../components/statics/DosAndDonts';
import FontDisplay from '../../components/statics/typography/FontDisplay';
import xHeight from '../../../static/images/brand-expressions/typography/x-height.svg';
import openApertures from '../../../static/images/brand-expressions/typography/open_apertures_image.svg';
import clearTerminals from '../../../static/images/brand-expressions/typography/clear_terminal.svg';
import evenSpacing from '../../../static/images/brand-expressions/typography/even_spacing.svg';
import humanistTerminals from '../../../static/images/brand-expressions/typography/humanist_terminals.svg';
import sansSerif from '../../../static/images/brand-expressions/typography/sans-serif.svg';
import socialGraphic from '../../../static/images/brand-expressions/typography/type-in-action_social-graphic.jpg';
import presentation from '../../../static/images/brand-expressions/typography/type-in-action_presentation.jpg';

import PageSection from '../../components/statics/PageSection';
import Grid from '../../components/Grid';
import { PharosHeading } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';

const TypographyPage: FC = () => {
  return (
    <>
      <PageSection
        title="Typography"
        description={`We selected two typefaces that represent our brand qualities—Ivar, a serif to be used primarily for headlines, and GT America, a sans serif to be used for body copy.`}
        isHeader
      >
        <div
          style={{
            display: 'grid',
            justifyItems: 'center',
          }}
        >
          <div>
            <FontDisplay font="Ivar Headline" title="Ivar" large />
            <FontDisplay font="GT America Standard" title="GT America" large />
          </div>
        </div>
      </PageSection>

      <PageSection title="Headline Typefaces">
        <div
          style={{
            width: '75%',
            marginBottom: '3rem',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          <strong>Ivar</strong> is influenced by the grace and sturdy construction of Times. The
          typeface stands on the shoulders of giants: the design refers to the dependable text faces
          from the mid-1900s, which in turn were rooted in classic designs from the 16th and 17th
          century.
        </div>
        <PharosHeading level={3} preset="4">
          Product headline font
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          This is to be used on JSTOR.org and related websites.
        </p>
        <Grid columns={2} bottom={2}>
          <div>
            <FontDisplay font="Ivar Headline" title="Ivar headline regular" dark />
          </div>
          <div>
            <FontDisplay font="Ivar Headline" title="Ivar headline medium" dark bold />
          </div>
        </Grid>
        <PharosHeading level={3} preset="4">
          Marketing headline font
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          This is to be used in off platform materials
        </p>
        <Grid columns={2}>
          <FontDisplay font="IvarDisplay-Regular" title="Ivar display regular" dark />
          <FontDisplay font="IvarDisplay-Medium" title="Ivar display medium" dark />
        </Grid>
      </PageSection>

      <PageSection title="Bodycopy">
        <div
          style={{
            width: '66%',
            marginBottom: '3rem',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          <strong>GT America</strong> is a grotesque sans serif with more of a human touch than
          usual in the genre, leading to a much better performance in legibility and readability,
          especially on screens.
        </div>
        <PharosHeading level={3} preset="4">
          Product bodycopy font
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          This is to be used on JSTOR.org and related websites.
        </p>
        <Grid columns={2} bottom={2}>
          <FontDisplay font="GT America Standard" title="GT America regular" dark />
          <FontDisplay font="GT America Standard" title="GT America medium" dark bold />
        </Grid>
        <PharosHeading level={3} preset="4">
          Marketing bodycopy font
        </PharosHeading>
        <p style={{ color: 'var(--pharos-color-text-20)' }}>
          This is to be used on off platform materials
        </p>
        <Grid columns={2} bottom={2}>
          <FontDisplay font="GT America Standard" title="GT America regular" dark />
          <FontDisplay font="GT America Standard" title="GT America medium" dark bold />
        </Grid>
      </PageSection>

      <PageSection title="Principles">
        <PharosHeading level={3} preset="4">
          Legibility
        </PharosHeading>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-2-x)',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          We focused on setting typefaces where it is easy to distinguish one letter from another.
        </div>
        <Grid columns={2}>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Generous x-height
            </PharosHeading>
          </div>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Open apertures
            </PharosHeading>
          </div>
          <img src={xHeight} alt="x-height" />
          <img src={openApertures} alt="open apertures" />
          <div>
            X-height is the vertical measure of a lowercase x. The shorter the x-height, the smaller
            the letter will appear, which can cause the type to become illegible.
          </div>
          <div>
            Apertures distinguish letters from similar letters and minimize bleed into surrounding
            letters.
          </div>
        </Grid>
        <Grid columns={2}>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Clear terminals
            </PharosHeading>
          </div>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Even spacing
            </PharosHeading>
          </div>
          <div style={{ width: '100%' }}>
            <img src={clearTerminals} alt="Clear Terminals" />
          </div>
          <div style={{ width: '100%' }}>
            <img src={evenSpacing} alt="Even Spacing" />
          </div>
          <div>
            Terminals are the ends of the letter form. Clear terminals are easier to spot and signal
            what the letterform is without a lot of decoding.
          </div>
          <div>
            Well-designed typefaces for the web should have even letter-spacing to establish a
            steady rhythm for reading. The space around the letters are as important as the space
            within them.
          </div>
        </Grid>
        <PharosHeading level={3} preset="4">
          Represents our brand
        </PharosHeading>
        <div
          style={{
            marginBottom: 'var(--pharos-spacing-2-x)',
            color: 'var(--pharos-color-text-20)',
          }}
        >
          Using our brand framework our typefaces look uncomplicated, composed and modern
        </div>
        <Grid columns={2}>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Humanist
            </PharosHeading>
          </div>
          <div>
            <PharosHeading level={4} preset="1--bold">
              Serif and sans-serif pairing
            </PharosHeading>
          </div>
          <img src={humanistTerminals} alt="Humanist Terminals" />
          <img src={sansSerif} alt="Serif and sans-serif pairing" />
          <div>
            Humanist fonts have a natural stroke, looking more like they're written by the human
            hand.
          </div>
          <div>
            A serif heading typeface and a sans-serif body copy typeface maximize legibility and
            divide page content visibly.
          </div>
        </Grid>
      </PageSection>

      <PageSection title="Best Practices">
        <DosAndDonts>
          <div className="best-practice" style={{ marginBottom: '4rem' }}>
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Headings that use Ivar need to be 24 pts or larger in the product
            </PharosHeading>
            <div
              className="sample"
              style={{
                fontSize: 'var(--pharos-type-scale-6)',
                fontFamily: 'Ivar Headline',
                marginBottom: '4rem)',
              }}
            >
              JSTOR is for the intellectually curious
            </div>
          </div>
          <div className="best-practice">
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Use a combination of Ivar as headline and GT America as bodycopy
            </PharosHeading>
            <div
              className="sample"
              style={{
                fontSize: '2.25rem',
                marginBottom: 'var(--pharos-spacing-1-x)',
                fontFamily: 'IvarDisplay-Regular',
              }}
            >
              JSTOR is for the intellectually curious
            </div>
            <div
              style={{
                fontSize: 'var(--pharos-font-size-large)',
                marginBottom: 'var(--pharos-spacing-1-x)',
                lineHeight: 'var(--pharos-line-height-medium)',
              }}
            >
              Both lifelong learners and those searching for answers to specific questions. We
              support them because the humanities, social sciences, and the arts help us contend
              with complex moral issues and show us how to lead a more meaningful life.
            </div>
          </div>
        </DosAndDonts>
        <DosAndDonts Dont>
          <div className="best-practice">
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Don't use Ivar in sizes smaller than 24 pts when using for a headline in the product
            </PharosHeading>
            <div
              className="sample"
              style={{
                fontFamily: 'var(--pharos-font-family-serif)',
                marginBottom: '4rem',
              }}
            >
              JSTOR is for the intellectually curious
            </div>
          </div>
          <div className="best-practice">
            <PharosHeading
              level={3}
              preset="2--bold"
              style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}
            >
              Don't use all caps for headings and bodycopy
            </PharosHeading>
            <div
              className="sample"
              style={{
                fontFamily: 'var(--pharos-font-family-sans-serif)',
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
            >
              JSTOR IS FOR THE INTELLECTUALLY CURIOUS
            </div>
            <div
              className="sample"
              style={{
                fontFamily: 'Ivar-Headline',
                fontSize: '1.5rem',
                lineHeight: '2rem',
                marginBottom: '4rem',
              }}
            >
              JSTOR IS FOR THE INTELLECTUALLY CURIOUS
            </div>
          </div>
          <div className="best-practice">
            <PharosHeading level={3} preset="2--bold">
              Don't use the bold weights
            </PharosHeading>
            <p
              style={{
                marginBottom: 'var(--pharos-spacing-2-x)',
                color: 'var(--pharos-color-text-40)',
              }}
            >
              To emphasize text, use the medium weight of the typefaces.
            </p>
            <div
              className="sample"
              style={{
                fontFamily: 'IvarDisplay-Bold',
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
            >
              JSTOR is for the intellectually curious
            </div>
            <div
              className="sample"
              style={{
                fontFamily: 'GT-America-Standard-Bold',
                fontSize: '1.5rem',
                lineHeight: '2rem',
              }}
            >
              JSTOR is for the intellectually curious
            </div>
          </div>
        </DosAndDonts>
      </PageSection>

      <PageSection
        title="System typefaces"
        description="When it is not possible to use our brand typefaces, use the following system typefaces when appropriate for things like presentations, documents, etc."
      >
        <PharosHeading level={3} preset="4" style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
          Headline
        </PharosHeading>
        <Grid columns={2}>
          <FontDisplay font="Times" title="Times" dark />
        </Grid>
        <PharosHeading level={3} preset="4" style={{ marginBottom: 'var(--pharos-spacing-1-x)' }}>
          Bodycopy
        </PharosHeading>
        <Grid columns={2}>
          <FontDisplay font="Roboto" title="Roboto" dark />
          <FontDisplay font="Arial" title="Arial" dark />
        </Grid>
      </PageSection>

      <PageSection title="Typography in action" moreTitleSpace>
        <Grid columns={2}>
          <div>Presentation</div>
          <div>Social graphic</div>
          <div style={{ maxWidth: '100%' }}>
            <img src={presentation} alt="x-height" style={{ maxWidth: '100%' }} />
          </div>
          <div style={{ maxWidth: '100%' }}>
            <img src={socialGraphic} alt="x-height" style={{ maxWidth: '100%' }} />
          </div>
        </Grid>
      </PageSection>
    </>
  );
};
export default TypographyPage;
