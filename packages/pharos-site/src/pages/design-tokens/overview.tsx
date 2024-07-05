import { PharosHeading } from '@ithaka/pharos/lib/react-components';
import { Link } from 'gatsby';

<>
  <PharosHeading level={1} preset="1">
    Design tokens
  </PharosHeading>

  <p>
    We capture visual design decisions in named entities called _design tokens_.Tokens help us avoid
    using and repeating hard-coded values throughout the code base, which in turn helps carry new
    decisions forward everywhere tokens are used.
  </p>

  <p>
    Tokens provide a bridge between design and development teams to ensure everyone is using the
    same values, whether they're designing pages or implementing those designs.
  </p>

  <p>
    Although tokens capture high - level brand decisions like core{' '}
    <Link to="/brand-expressions/color"> color</Link> and{' '}
    <Link to="/brand-expressions/typography"> typography</Link> choices, they're also useful for
    capturing more granular decisions like border radii or padding for specific components.
  </p>

  <PharosHeading level={2} preset="2">
    Token naming structure
  </PharosHeading>

  <p>
    Because of the broad range of information they capture, design tokens benefit from a well -
    defined naming structure.Tokens in Pharos are named using the following structure:
  </p>

  <p>
    <code>
      <span>pharos</span>
      [-
      <span style={{ color: 'var(--pharos-color-jstor-red' }}></span>&lt;component&gt; ] -
      <span style={{ color: 'var(--pharos-color-night-blue' }}>&lt;category&gt;</span> -
      <span style={{ color: 'var(--pharos-color-glacier-blue' }}>&lt;property/context&gt;</span>
      [-
      <span style={{ color: 'var(--pharos-color-living-coral' }}>&lt;state/variant/name&gt;</span>]
    </code>
  </p>

  <dl>
    <div>
      <dt style={{ color: 'var(--pharos-color-jstor-red' }}>Component</dt>
      <dd>Describes the specific component for which the token is relevant, if any.</dd>
    </div>
    <div>
      <dt style={{ color: 'var(--pharos-color-night-blue' }}>Category</dt>
      <dd>
        Describes the broad type for the token. Categories are things like color, type, spacing,
        size, and so on.
      </dd>
    </div>
    <div>
      <dt style={{ color: 'var(--pharos-color-glacier-blue' }}>Property/context</dt>
      <dd>
        Describes the attribute the token affects, or adds context about where the token should be
        used.
      </dd>
    </div>
    <div>
      <dt style={{ color: 'var(--pharos-color-living-coral' }}>State/variant/name</dt>
      <dd>
        Defines the name that differentiates the token from others, or the state for which the token
        is used. Whereas preceding segments of a token name help navigate available tokens, this
        segment helps choose a specific token to use.
      </dd>
    </div>
  </dl>

  <PharosHeading level={3} preset="3">
    Examples
  </PharosHeading>

  <ul>
    <li>
      <code>
        <span>pharos</span>-<span style={{ color: 'var(--pharos-color-night-blue' }}>color</span>-
        <span style={{ color: 'var(--pharos-color-glacier-blue' }}>brand</span>-
        <span style={{ color: 'var(--pharos-color-living-coral' }}>jstor-red</span>
      </code>
    </li>
    <li>
      <code>
        <span>pharos</span>-<span style={{ color: 'var(--pharos-color-jstor-red' }}>alert</span>-
        <span style={{ color: 'var(--pharos-color-night-blue' }}>color</span>-
        <span style={{ color: 'var(--pharos-color-glacier-blue' }}>icon</span>-
        <span style={{ color: 'var(--pharos-color-living-coral' }}>warning</span>
      </code>
    </li>
    <li>
      <code>
        <span>pharos</span>-
        <span style={{ color: 'var(--pharos-color-night-blue' }}>transition</span>-
        <span style={{ color: 'var(--pharos-color-glacier-blue' }}>duration</span>-
        <span style={{ color: 'var(--pharos-color-living-coral' }}>longer</span>
      </code>
    </li>
    <li>
      <code>
        <span>pharos</span>-<span style={{ color: 'var(--pharos-color-night-blue' }}>type</span>-
        <span style={{ color: 'var(--pharos-color-glacier-blue' }}>scale</span>-
        <span style={{ color: 'var(--pharos-color-living-coral' }}>5</span>
      </code>
    </li>
    <li>
      <code>
        <span>pharos</span>-<span style={{ color: 'var(--pharos-color-night-blue' }}>spacing</span>-
        <span style={{ color: 'var(--pharos-color-glacier-blue' }}>brand</span>-
        <span style={{ color: 'var(--pharos-color-living-coral' }}>one-and-a-half-x</span>
      </code>
    </li>
  </ul>

  <PharosHeading level={2} preset="2">
    Token architecture
  </PharosHeading>

  <p>
    Read more about how tokens are created and stored in [the development
    documentation](https://github.com/ithaka/pharos/blob/develop/docs/development/design-tokens.md#token-architecture).
  </p>
</>;
