import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import {
  container,
  container__isSubsection,
  container__isSubsubsection,
  title__isHeader,
  title__moreSpace,
  title__base,
  description__isHeader,
  description__base,
  container__lessMargin,
} from './PageSection.module.css';

interface PageSectionProps {
  title: string;
  description?: string | JSX.Element;
  isHeader?: boolean;
  isSubsection?: boolean;
  isSubsubsection?: boolean;
  moreTitleSpace?: boolean;
  lessMargin?: boolean;
}

const PageSection: FC<PageSectionProps> = ({
  title,
  description,
  isHeader,
  isSubsection,
  isSubsubsection,
  children,
  moreTitleSpace,
  lessMargin,
}) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  if (Number(isHeader) + Number(isSubsection) + Number(isSubsubsection) > 1) {
    console.error(
      'Only 1 of isHeader, isSubsection and/or isSubsubsection props should be used at a time.'
    );
  }

  useEffect(() => {
    const { PharosHeading } = Pharos;

    const headerTitle = (
      <div className={title__isHeader}>
        <PharosHeading level="1" preset="7--bold">
          {title}
        </PharosHeading>
      </div>
    );

    const baseTitle = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level="2" preset="6">
          {title}
        </PharosHeading>
      </div>
    );

    const subsectionTitle = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level="2" preset="4">
          {title}
        </PharosHeading>
      </div>
    );

    const subsubsectionTitle = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level={'4'} preset={'1--bold'}>
          {title}
        </PharosHeading>
      </div>
    );

    const displayedTitle = () => {
      if (isHeader) {
        return headerTitle;
      } else if (isSubsection) {
        return subsectionTitle;
      } else if (isSubsubsection) {
        return subsubsectionTitle;
      } else {
        return baseTitle;
      }
    };

    const content = (
      <div
        className={
          lessMargin
            ? container__lessMargin
            : isSubsection
            ? container__isSubsection
            : isSubsubsection
            ? container__isSubsubsection
            : container
        }
      >
        {displayedTitle()}
        {description ? (
          <div className={isHeader ? description__isHeader : description__base}>{description}</div>
        ) : null}
        {children}
      </div>
    );
    setDisplay(content);
  }, [
    Pharos,
    children,
    description,
    isHeader,
    moreTitleSpace,
    title,
    isSubsection,
    isSubsubsection,
    lessMargin,
  ]);

  return Display;
};

export default PageSection;
