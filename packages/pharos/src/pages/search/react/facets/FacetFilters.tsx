import type { FC } from 'react';

import { MultiSelectFacet } from './MultiSelectFacet';
import { SingleSelectFacet } from './SingleSelectFacet';
import { DateRangeFacet } from './DateRangeFacet';
import { PharosHeading } from '../../../../react-components/heading/pharos-heading';

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

export const FacetFilters: FC = () => (
  <aside>
    <div className="search-page__grid--facets">
      <PharosHeading level={2} preset="1--bold">
        Filters
      </PharosHeading>
      <form className="search-page__form">
        <div className="search-page__facet">
          {MultiSelectFacet({
            name: 'academic-content',
            legend: 'academic content',
            items: academicContentItems,
          })}
        </div>
        <div className="search-page__facet">
          {MultiSelectFacet({
            name: 'primary-source-content',
            legend: 'primary source content',
            items: primarySourceContentItems,
          })}
        </div>
        <div className="search-page__facet">
          <DateRangeFacet />
        </div>
        <div className="search-page__facet">
          {MultiSelectFacet({
            name: 'subjects',
            legend: 'subjects',
            items: subjectsItems,
          })}
        </div>
        <div className="search-page__facet">
          {SingleSelectFacet({
            name: 'access-type',
            legend: 'access type',
            items: accessTypeItems,
          })}
        </div>
      </form>
    </div>
  </aside>
);
