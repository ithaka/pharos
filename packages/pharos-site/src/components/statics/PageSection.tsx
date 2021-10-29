import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import {
  container,
  container__subsectionLevelOne,
  container__subsectionLevelTwo,
  container__subsectionLevelThree,
  title__isHeader,
  title__moreSpace,
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
  storyBookType?: string;
}

const PageSection: FC<PageSectionProps> = ({
  title,
  description,
  isHeader,
  subSectionLevel,
  children,
  moreTitleSpace,
  lessMargin,
  storyBookType,
}) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);

  if (isHeader && subSectionLevel > 1) {
    console.error("isHeader can't be used with SubSectionLevel.");
  }

  useEffect(() => {
    (async () => {
      const { PharosLink } = await import('@ithaka/pharos/lib/react-components/link/pharos-link');
      const { PharosHeading } = await import(
        '@ithaka/pharos/lib/react-components/heading/pharos-heading'
      );
      const url =
        'https://pharos.jstor.org/storybook/?path=/story/webcomponents_' +
        storyBookType +
        '-' +
        title.replace(/ /g, '-').toLowerCase() +
        '--base';

      const headerTitle = (
        <div className={title__isHeader}>
          <PharosHeading level={1} preset="7--bold">
            {title}
          </PharosHeading>
        </div>
      );

      const baseTitle = (
        <div className={moreTitleSpace ? title__moreSpace : ''}>
          <PharosHeading level={2} preset="6">
            {title}
          </PharosHeading>
        </div>
      );

      const subsection1Title = (
        <div className={moreTitleSpace ? title__moreSpace : ''}>
          <PharosHeading level={2} preset="4">
            {title}
          </PharosHeading>
        </div>
      );

      const subsection2Title = (
        <div className={moreTitleSpace ? title__moreSpace : ''}>
          <PharosHeading level={4} preset={'1--bold'}>
            {title}
          </PharosHeading>
        </div>
      );

      const subsection3Title = (
        <div className={moreTitleSpace ? title__moreSpace : ''}>
          <PharosHeading level={5} preset={'1--bold'}>
            {title}
          </PharosHeading>
        </div>
      );

      const storyBookLink = (
        <div>
          <PharosLink href={url} target="_blank">
            See in Storybook
          </PharosLink>
        </div>
      );

      const displayedTitle = () => {
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
            <div className={isHeader ? description__isHeader : description__base}>
              {description}
            </div>
          ) : null}
          {storyBookType ? storyBookLink : null}
          {children}
        </div>
      );
      setDisplay(content);
    })();
  }, [
    children,
    description,
    isHeader,
    moreTitleSpace,
    title,
    lessMargin,
    subSectionLevel,
    storyBookType,
  ]);

  return Display;
};

export default PageSection;
