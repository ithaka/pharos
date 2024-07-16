import PageSection from '@components/statics/PageSection.tsx';
import BestPractices from '@components/statics/BestPractices.tsx';
import baseImageExample from '@images/components/image-card/collection_5.png';
import { PharosHeading, PharosImageCard, PharosLink } from '@ithaka/pharos/lib/react-components';
import Canvas from '../../src/components/Canvas';
import { FC } from 'react';

const ImageCardPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Image Card"
        description="Image cards group related visual and textual context."
        storyBookType="components"
      >
        <PharosImageCard title="Card title" link="#">
          <img
            id="image"
            src="../images/components/image-card/collection_5.png"
            alt="south hall"
            slot="image"
          />
          <div id="creator" slot="metadata">
            Tubby, William Bunker (American architect,...
          </div>
          <div id="item-date" slot="metadata">
            1889-1892 (creation)
          </div>
          <div id="collection" slot="metadata">
            From the <PharosLink href="#">Collection title</PharosLink>
          </div>
        </PharosImageCard>
      </PageSection>
      <PageSection topMargin title="Usage">
        <PageSection subSectionLevel={1} title="When to use">
          <p>
            Image cards are styled containers that group related content and actions. Image cards
            should be used to provide a preview of an item. Use the base card component to display
            an individual item, while the collection card should be used to provide a preview of a
            single collection.
          </p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Structure">
          <p>
            A card is made up of an image and corresponding information. For individual items, this
            could be the item's title, author, date and which collection it's from. For collections,
            it could be the title of the collection, the number of items it has, and a description.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Best practices">
        <BestPractices
          Do={
            <ul>
              <li>Use image cards with the layout component to present rows of cards</li>
              <li>
                Use the same heading level for titles of items or collections when applied to a
                large group of cards
              </li>
            </ul>
          }
          Dont={
            <ul>
              <li>Use overly small or large images for the cards</li>
              <li>Provide more than three sections of metadata</li>
            </ul>
          }
        />
      </PageSection>{' '}
      <PageSection title="Content guidelines">
        <PageSection subSectionLevel={1} title="Image">
          <p>The image provided should have sufficient resolution, it should not be blurry.</p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Title">
          <p>The title should indicate what the image being displayed is or represents.</p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Metadata">
          <p>
            The information should pertain to the item being presented. Truncation should be applied
            for a section if it exceeds two lines.
          </p>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="Variants">
        <PageSection subSectionLevel={1} title="Base card">
          <p>
            The base variant is used to present individual items that have an associated image
            alongside corresponding information or metadata.
          </p>
          <Canvas>
            <PharosImageCard title="Card title" link="#" style={{ width: '150px' }}>
              <img id="image" src={baseImageExample} alt="south hall" slot="image" />
              <div id="creator" slot="metadata">
                Tubby, William Bunker (American architect,...
              </div>
              <div id="item-date" slot="metadata">
                1889-1892 (creation)
              </div>
              <div id="collection" slot="metadata">
                From the <PharosLink href="#">Collection title</PharosLink>
              </div>
            </PharosImageCard>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Collection card">
          <p>
            The collection variant is used to portray a single collection. A larger image is shown
            in 4:3 aspect ratio format with corresponding information or metadata.
          </p>
          <Canvas>
            <PharosImageCard
              title="Pratt Institute Buildings"
              link="#"
              variant="collection"
              style={{ width: '250px' }}
            >
              <img id="image" src={baseImageExample} alt="Collection image example" slot="image" />
              <strong id="item-number" slot="metadata">
                452 items
              </strong>
              <div id="description" slot="metadata">
                Collection description goes here.
              </div>
            </PharosImageCard>
          </Canvas>
        </PageSection>
      </PageSection>{' '}
      <PageSection title="States">
        <PageSection subSectionLevel={1} title="Subtle">
          <p>
            Use a subtle card state to indicate to the user that the image must be hovered for
            additional information about the item to be shown with an overlay.
          </p>
          <Canvas>
            <PharosImageCard
              title="Card title"
              link="#"
              subtle
              variant="base"
              style={{ width: '150px' }}
            >
              <img id="image" src={baseImageExample} alt="south hall" slot="image" />
              <div id="creator" slot="metadata">
                Tubby, William Bunker (American architect,...
              </div>
              <div id="item-date" slot="metadata">
                1889-1892 (creation)
              </div>
              <div id="collection" slot="metadata">
                From the{' '}
                <PharosLink href="#" isOnBackground>
                  Collection title
                </PharosLink>
              </div>
            </PharosImageCard>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="Error">
          <p>
            Display an error card state to indicate to the user that the image is not available due
            to a server or access issue.
          </p>
          <Canvas>
            <PharosImageCard
              title="Card title"
              link="#"
              error
              variant="base"
              style={{ width: '150px' }}
            >
              <img id="image" src={baseImageExample} alt="south hall" slot="image" />
              <div id="creator" slot="metadata">
                Tubby, William Bunker (American architect,...
              </div>
              <div id="item-date" slot="metadata">
                1889-1892 (creation)
              </div>
              <div id="collection" slot="metadata">
                From the <PharosLink href="#">Collection title</PharosLink>
              </div>
            </PharosImageCard>
          </Canvas>
        </PageSection>
        <PageSection subSectionLevel={1} title="With action menu">
          <p>
            An image card that has an action menu indicates to the user that additional actions can
            be taken on the item by rendering an action button that triggers a dropdown menu.
          </p>
          <Canvas>
            <PharosImageCard
              title="Card title"
              link="#"
              action-menu="my-dropdown-menu"
              variant="base"
              style={{ width: '150px' }}
            >
              <img id="image" src={baseImageExample} alt="south hall" slot="image" />
              <div id="creator" slot="metadata">
                Tubby, William Bunker (American architect,...
              </div>
              <div id="item-date" slot="metadata">
                1889-1892 (creation)
              </div>
              <div id="collection" slot="metadata">
                From the <PharosLink href="#">Collection title</PharosLink>
              </div>
            </PharosImageCard>
          </Canvas>
        </PageSection>
      </PageSection>
      <PageSection title="Accessibility">
        <PageSection subSectionLevel={1} title="Relevant WCAG guidelines">
          <ul>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html">
                1.3.1 Info and Relationships A
              </PharosLink>
            </li>
            <li>
              <PharosLink href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html">
                1.1.1 Non-text Content
              </PharosLink>
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Importance">
          <p>
            An image card visually and textually portrays an item or collection to help a user gain
            greater understanding of its context
          </p>
        </PageSection>
        <PageSection subSectionLevel={1} title="Code expectations">
          <ul>
            <li>
              Each card needs to have a heading of the same level because they belong to a flat list
              hierarchy.
            </li>
            <li>
              All image cards should be put into a list (<code>&lt;li&gt;</code>) element so users
              can understand their relationship to each other
            </li>
            <li>
              Every image needs to have an alternative text tag
              <ul>
                <li>
                  <code> alt="any relevant visual information"</code>
                </li>
              </ul>
            </li>
            <li>
              Links should use the <code>&lt;a&gt;</code> element
            </li>
          </ul>
        </PageSection>
        <PageSection subSectionLevel={1} title="Expected actions">
          <PageSection subSectionLevel={2} title="Screen reader">
            <ul>
              <li>When the image has focus, reads "alt" text</li>
              <li>When focus is on a link it reads: "Link text, link"</li>
            </ul>
          </PageSection>
          <PageSection subSectionLevel={2} title="Keyboard">
            <ul>
              <li>
                <kbd>Tab</kbd>: goes to next element
              </li>
              <li>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>: goes to previous element
              </li>
              <li>
                <kbd>Enter</kbd>: goes to link destination
              </li>
            </ul>
          </PageSection>
        </PageSection>
      </PageSection>
    </>
  );
};
export default ImageCardPage;
