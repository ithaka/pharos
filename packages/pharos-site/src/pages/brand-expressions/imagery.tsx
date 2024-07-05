import handleLinkClick from '../../utils/handleLinkClick';
import BestPractices from '../../components/statics/BestPractices.tsx';
import imageHero from '../../../static/images/brand-expressions/imagery/imagery_hero_cover.png';
import imageArtstor1 from '../../../static/images/brand-expressions/imagery/imagery_artstor_1.png';
import imageArtstor2 from '../../../static/images/brand-expressions/imagery/imagery_artstor_2.png';
import imageArtstor3 from '../../../static/images/brand-expressions/imagery/imagery_artstor_3.png';
import imageArtstor4 from '../../../static/images/brand-expressions/imagery/imagery_artstor_4.png';
import imageArtstor5 from '../../../static/images/brand-expressions/imagery/imagery_artstor_5.png';
import imageCommunity1 from '../../../static/images/brand-expressions/imagery/imagery_community_1.png';
import imageCommunity2 from '../../../static/images/brand-expressions/imagery/imagery_community_2.png';
import imageCommunity3 from '../../../static/images/brand-expressions/imagery/imagery_community_3.png';
import imageCommunity4 from '../../../static/images/brand-expressions/imagery/imagery_community_4.png';
import imageCommunity5 from '../../../static/images/brand-expressions/imagery/imagery_community_5.png';
import imageBrand1 from '../../../static/images/brand-expressions/imagery/imagery_brand_1.png';
import imageBrand2 from '../../../static/images/brand-expressions/imagery/imagery_brand_2.png';
import imageBrand3 from '../../../static/images/brand-expressions/imagery/imagery_brand_3.png';
import imageBrand4 from '../../../static/images/brand-expressions/imagery/imagery_brand_4.png';
import imageBrand5 from '../../../static/images/brand-expressions/imagery/imagery_brand_5.png';

import PageSection from '../../components/statics/PageSection';
import Grid from '../../components/Grid';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
<>
  <PageSection
    title="Imagery"
    description="We have a great opportunity to use imagery for expression. Our imagery style falls into two categories: Archival and Brand images."
    isHeader
  >
    <Grid columns={1} justifyContent="center" minContent align="end">
      <img src={imageHero} alt="Archive images - Hero" width="552" height="443" />
    </Grid>
  </PageSection>

  <PageSection
    title="Image types"
    description="The two main categories of images are Archival and Brand. Archival includes content from Artstor, Community Collections, Primary Source, Journal and Book covers. Brand images are images portray users, research, and the places JSTOR is used."
  >
    <PharosHeading level={3} preset="4">
      Artstor
    </PharosHeading>
    <Grid columns={5} hSpace={0.5} bottom={5} minContent align="end">
      <div>
        <img src={imageArtstor1} alt="Archival - Artstor 1" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageArtstor2} alt="Archival - Artstor 2" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageArtstor3} alt="Archival - Artstor 3" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageArtstor4} alt="Archival - Artstor 4" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageArtstor5} alt="Archival - Artstor 5" style={{ maxWidth: 124 }} />
      </div>
    </Grid>
    <PharosHeading level={3} preset="4">
      Community Collections
    </PharosHeading>
    <Grid columns={5} hSpace={0.5} bottom={5} minContent align="end">
      <div>
        <img
          src={imageCommunity1}
          alt="Archive - Community Collections 1"
          style={{ maxWidth: 124 }}
        />
      </div>
      <div>
        <img
          src={imageCommunity2}
          alt="Archive - Community Collections 2"
          style={{ maxWidth: 124 }}
        />
      </div>
      <div>
        <img
          src={imageCommunity3}
          alt="Archive - Community Collections 3"
          style={{ maxWidth: 124 }}
        />
      </div>
      <div>
        <img
          src={imageCommunity4}
          alt="Archive - Community Collections 4"
          style={{ maxWidth: 124 }}
        />
      </div>
      <div>
        <img
          src={imageCommunity5}
          alt="Archive - Community Collections 5"
          style={{ maxWidth: 124 }}
        />
      </div>
    </Grid>
    <PharosHeading level={3} preset="4">
      Brand
    </PharosHeading>
    <Grid columns={5} hSpace={0.5} bottom={5} minContent align="end">
      <div>
        <img src={imageBrand1} alt="Archival - Brand 1" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageBrand2} alt="Archival - Brand 2" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageBrand3} alt="Archival - Brand 3" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageBrand4} alt="Archival - Brand 4" style={{ maxWidth: 124 }} />
      </div>
      <div>
        <img src={imageBrand5} alt="Archival - Brand 5" style={{ maxWidth: 124 }} />
      </div>
    </Grid>
  </PageSection>

  <PageSection
    title="Principles"
    description="Visuals are the most immediate aspect of our brand, and we must be mindful of how we select them. Here are some basic guidelines to consider as you pick images for promoting services and products."
  >
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={3} preset="4">
        Diverse
      </PharosHeading>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        Archive images pull from collections on JSTOR (Artstor, Open Community Collections, Primary
        Sources) as well as the diverse content types in them (art, objects, historical
        documentation, science). When choosing non-western items, take care to look at their
        intended purpose and not just how they look.
      </p>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        Images of art or artifacts should represent different cultures and time periods, including
        diversity in the creators (e.g., race, gender, location, etc.). Similarly, images of people
        should be diverse (e.g., representing different demographics and abilities).
      </p>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        For global or international campaigns, make sure the people pictured adhere to dress codes
        of most countries (e.g. non-revealing outfits).
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={3} preset="4">
        Genuine
      </PharosHeading>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        Images should have an authentic feel to them, avoid staged or obvious stock photography.
      </p>
    </div>
    <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
      <PharosHeading level={3} preset="4">
        Representative
      </PharosHeading>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        Carefully select images that best represent the content of the message or associated
        content. For example, if we're highlighting eBooks, don't display images of posters; if
        we're contacting secondary schools, don't show images of a large research library.
      </p>
    </div>
    <div>
      <PharosHeading level={3} preset="4">
        Excellence
      </PharosHeading>
      <p style={{ color: 'var(--pharos-color-text-20)' }}>
        The images should be aesthetically pleasing and reflect our brand framework:
      </p>
      <div style={{ color: 'var(--pharos-color-text-20)' }}>
        <strong>It feels</strong> - Dependable, Intriguing, Focused
      </div>
      <div style={{ color: 'var(--pharos-color-text-20)' }}>
        <strong>It looks</strong> - Uncomplicated, Composed, Modern
      </div>
      <p
        style={{
          color: 'var(--pharos-color-text-20)',
          marginTop: 'var(--pharos-spacing-one-and-a-half-x)',
        }}
      >
        Also, consider the {/* <!--- pretiier-ignore-start --> */}
        <PharosLink href="/brand-expressions/color" onClick={handleLinkClick}>
          brand color palette
        </PharosLink>{' '}
        {/* <!--- pretiier-ignore-stop --> */}
        when making selections.
      </p>
    </div>
  </PageSection>

  <PageSection title="Best Practices">
    <BestPractices
      Do={
        <ul>
          <li>Choose bright, light, and colorful images</li>
          <li>
            Select images that fit the space, e.g., a landscape orientation for a landing page
            banner
          </li>
          <li>For Archival images, include credit information</li>
          <li>Review the Imagery Principles when selecting images</li>
        </ul>
      }
      Dont={
        <ul>
          <li>
            Manipulate the image such as changing the color, adding or removing elements, or
            combining two different images
          </li>
          <li>Overlap imagery</li>
        </ul>
      }
    />
  </PageSection>
</>;
