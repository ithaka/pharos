import { html } from 'lit';
import type { TemplateResult } from 'lit';

import { MultiSelectFacet } from './multi-select-facet';
import { SingleSelectFacet } from './single-select-facet';
import { DateRangeFacet } from './date-range-facet';
import '../../../../components/heading/pharos-heading';

const academicContentItems = [
  { label: 'Journals', value: 'journals' },
  { label: 'Books', value: 'books' },
  { label: 'Research Reports', value: 'reports' },
];

const primarySourceContentItems = [
  { label: 'Serials', value: 'serials' },
  { label: 'Images', value: 'images' },
  { label: 'Documents', value: 'documents' },
  { label: 'Books', value: 'books' },
];

const subjectsItems = [
  { label: 'African American Studies', value: 'african-american' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'American Studies', value: 'american' },
  { label: 'Anthropology', value: 'anthropology' },
  { label: 'Aquatic Studies', value: 'aquatic' },
  { label: 'Archaeology', value: 'archaeology' },
  { label: 'Architecture & Architectural History', value: 'architecture' },
  { label: 'Art & Art History', value: 'art' },
  { label: 'Asian Studies', value: 'asian' },
  { label: 'Astronomy', value: 'astronomy' },
  { label: 'Botany & Plant Sciences', value: 'botany' },
  { label: 'British Studies', value: 'british' },
];

const accessTypeItems = [
  { label: 'All content', value: 'all' },
  { label: 'Content I can access', value: 'access' },
];

export const FacetFilters = (): TemplateResult => html`
  <aside>
    <div class="search-page__grid--facets">
      <pharos-heading level="2" preset="1--bold">Filters</pharos-heading>
      <form class="search-page__form">
        <div class="search-page__facet">
          ${MultiSelectFacet('academic-content', 'academic content', academicContentItems)}
        </div>
        <div class="search-page__facet">
          ${MultiSelectFacet(
            'primary-source-content',
            'primary source content',
            primarySourceContentItems
          )}
        </div>
        <div class="search-page__facet">${DateRangeFacet()}</div>
        <div class="search-page__facet">
          ${MultiSelectFacet('subjects', 'subjects', subjectsItems)}
        </div>
        <div class="search-page__facet">
          ${SingleSelectFacet('access-type', 'access type', accessTypeItems)}
        </div>
      </form>
    </div>
  </aside>
`;
