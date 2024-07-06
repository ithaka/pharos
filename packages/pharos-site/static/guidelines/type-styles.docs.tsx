import PageSection from '@components/statics/PageSection.tsx';
import { PharosHeading, PharosLink } from '@ithaka/pharos/lib/react-components';
import { FC } from 'react';
import Canvas from '../../src/components/Canvas';

const TypeStylesPage: FC = () => {
  return (
    <>
      <PageSection
        isHeader
        title="Type styles"
        description="Pharos type styles and mixins allow us to express our brand consistently and efficiently in our products."
      >
        <PharosLink
          href="https://pharos.jstor.org/storybooks/wc/?path=/story/styles-typography--plain-text"
          target="_blank"
        >
          See in Storybook
        </PharosLink>
      </PageSection>{' '}
      <PageSection title="Font Stack">
        <PageSection title="Branded" subSectionLevel={1} lessMargin>
          <p
            style={{
              fontFamily: 'var(--pharos-font-family-sans-serif)',
              fontSize: 'var(--pharos-font-size-large)',
            }}
          >
            GT America
          </p>
          <p
            style={{
              fontFamily: 'var(--pharos-font-family-serif)',
              fontSize: 'var(--pharos-font-size-large)',
            }}
          >
            Ivar Headline
          </p>
        </PageSection>
        <PageSection title="Fallback" subSectionLevel={1} lessMargin>
          <p style={{ fontFamily: 'Helvetica Neue', fontSize: 'var(--pharos-font-size-large)' }}>
            Helvetica Neue, Arial
          </p>
          <p style={{ fontFamily: 'Times', fontSize: 'var(--pharos-font-size-large)' }}>Times</p>
        </PageSection>
      </PageSection>
      <PageSection title="Usage">
        <PageSection title="Design Tokens" subSectionLevel={1}>
          <p>
            Please refer to our type tokens to see font-sizes, line-heights, letter-spacing,
            font-families, font-weights, and type-scale.
          </p>
        </PageSection>
        <PageSection title="Formatting Styles" subSectionLevel={1}>
          <Canvas>
            <table className="typography-table-example" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className="typography-table-example">Style</th>
                  <th className="typography-table-example">Directions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="typography-table-example">
                    <span>Plain text</span>
                  </td>
                  <td className="typography-table-example">
                    Use <code>&lt;span&gt;</code> to display plain text when needed.
                  </td>
                </tr>
                <tr>
                  <td className="typography-table-example">
                    <b>Bold</b>
                  </td>
                  <td className="typography-table-example">
                    Use <code>&lt;strong&gt;</code> to indicate importance and display text in bold
                    type.
                  </td>
                </tr>
                <tr>
                  <td className="typography-table-example">
                    <i>Italic</i>
                  </td>
                  <td className="typography-table-example">
                    Use <code>&lt;em&gt;</code> to stress emphasis and italicize text.
                  </td>
                </tr>
                <tr>
                  <td className="typography-table-example">
                    <small>Small</small>
                  </td>
                  <td className="typography-table-example">
                    Use <code>&lt;small&gt;</code> to decrease the font size for secondary
                    supporting text. It should be used sparingly as the design token
                    "pharos-font-size-small" will suffice.
                  </td>
                </tr>
              </tbody>
            </table>
          </Canvas>
        </PageSection>
        <PageSection title="Other Styles" subSectionLevel={1}>
          <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
            <PharosHeading level={4} preset="2">
              Tables
            </PharosHeading>
            <p>
              Tables consist of rows and columns that are used to display and organize information
              efficiently.
            </p>
            <Canvas>
              <table className="typography-table-example" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Influential Women</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="typography-table-example">Claudette Colvin</td>
                  </tr>
                  <tr>
                    <td className="typography-table-example">Maude Ballou</td>
                  </tr>
                  <tr>
                    <td className="typography-table-example">Diane Nash</td>
                  </tr>
                </tbody>
              </table>
            </Canvas>
          </div>
          <div>
            <PharosHeading level={4} preset="2">
              Lists
            </PharosHeading>
            <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
              <PharosHeading level={5} preset="1--bold">
                Ordered Lists
              </PharosHeading>
              <p>
                Use ordered or numbered lists to convey a priority, hierarchy, or sequence between
                list items.
              </p>
              <Canvas>
                <ol>
                  <li>Claudette Colvin</li>
                  <li>Maude Ballou</li>
                  <li>Diane Nash</li>
                  <li>Rev. Dr. Pauli Murray</li>
                  <li>Mamie Till Mobley</li>
                </ol>
              </Canvas>
            </div>
            <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
              <PharosHeading level={5} preset="1--bold">
                Unordered Lists
              </PharosHeading>
              <p>
                Use bulleted lists when you don't need to convey a specific order for list items.
              </p>
              <Canvas>
                <ul>
                  <li>Claudette Colvin</li>
                  <li>Maude Ballou</li>
                  <li>Diane Nash</li>
                  <li>Rev. Dr. Pauli Murray</li>
                  <li>Mamie Till Mobley</li>
                </ul>
              </Canvas>
            </div>
            <div style={{ marginBottom: 'var(--pharos-spacing-2-x)' }}>
              <PharosHeading level={5} preset="1--bold">
                Nested Lists
              </PharosHeading>
              <p>Nested lists help to arrange information into related, hierarchical structures.</p>
              <Canvas>
                <ul className="list-example__nested">
                  <li>
                    Claudette Colvin
                    <ul>
                      <li>
                        As a teenager, Colvin refused to give up her bus seat nine months before
                        Rosa Parks.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Maude Ballou
                    <ul>
                      <li>
                        Maude served as MLK's personal secretary, his right-hand woman from 1955
                        until 1960. In 1957, she was listed as number 21 on the Montgomery
                        Improvement Associations list of "persons and churches most vulnerable to
                        violent attacks."
                      </li>
                    </ul>
                  </li>
                </ul>
              </Canvas>
            </div>
            <div>
              <PharosHeading level={5} preset="1--bold">
                List without Bullets
              </PharosHeading>
              <p>Use lists without bullets when you don't need to display a list indicator.</p>
              <Canvas>
                <ul className="list-example__no-bullets">
                  <li>Claudette Colvin</li>
                  <li>Maude Ballou</li>
                  <li>Diane Nash</li>
                  <li>Rev. Dr. Pauli Murray</li>
                  <li>Mamie Till Mobley</li>
                </ul>
              </Canvas>
            </div>
          </div>
        </PageSection>
      </PageSection>
    </>
  );
};
export default TypeStylesPage;
