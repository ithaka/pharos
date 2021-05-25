import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import {
  container,
  container__subsectionLevelOne,
  container__subsectionLevelTwo,
  container__subsectionLevelThree,
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
  subSectionLevel: 1 | 2 | 3;
  moreTitleSpace?: boolean;
  lessMargin?: boolean;
}

const PageSection: FC<PageSectionProps> = ({
  title,
  description,
  isHeader,
  subSectionLevel,
  children,
  moreTitleSpace,
  lessMargin,
}) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  if (isHeader && subSectionLevel > 1) {
    console.error("isHeader can't be used with SubSectionLevel.");
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

    const subsection1Title = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level="2" preset="4">
          {title}
        </PharosHeading>
      </div>
    );

    const subsection2Title = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level={'4'} preset={'1--bold'}>
          {title}
        </PharosHeading>
      </div>
    );

    const subsection3Title = (
      <div className={moreTitleSpace ? title__moreSpace : title__base}>
        <PharosHeading level={'5'} preset={'1--bold'}>
          {title}
        </PharosHeading>
      </div>
    );

    const displayedTitle = () => {
      console.log(subSectionLevel);
      if (isHeader) {
        return headerTitle;
      } else if (subSectionLevel === 1) {
        return subsection1Title;
      } else if (subSectionLevel === 2) {
        return subsection2Title;
      } else if (subSectionLevel === 3) {
        return subsection3Title;
      } else {
        return baseTitle;
      }
    };

    const content = (
      <div
        className={
          lessMargin
            ? container__lessMargin
            : subSectionLevel === 1
            ? container__subsectionLevelOne
            : subSectionLevel === 2
            ? container__subsectionLevelTwo
            : subSectionLevel === 3
            ? container__subsectionLevelThree
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
  }, [Pharos, children, description, isHeader, moreTitleSpace, title, lessMargin, subSectionLevel]);

  return Display;
};

export default PageSection;
