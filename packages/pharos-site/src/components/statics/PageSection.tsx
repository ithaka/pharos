import { useState, useEffect } from 'react';
import type { FC, ReactElement, ReactNode } from 'react';
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
  container__topMargin,
} from './PageSection.module.css';

interface PageSectionProps {
  children?: ReactNode;
  title: string;
  description?: string | JSX.Element;
  isHeader?: boolean;
  subSectionLevel?: 1 | 2 | 3;
  moreTitleSpace?: boolean;
  lessMargin?: boolean;
  storyBookType?: string;
  topMargin?: boolean;
}

const PageSection: FC<PageSectionProps> = ({
  children,
  title,
  description,
  isHeader,
  subSectionLevel = 1,
  moreTitleSpace,
  lessMargin,
  topMargin,
  storyBookType,
}) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  if (isHeader && subSectionLevel > 1) {
    console.error("isHeader can't be used with SubSectionLevel.");
  }

  useEffect(() => {
    const { PharosHeading } = Pharos;
    const { PharosLink } = Pharos;
    const url =
      'https://pharos.jstor.org/storybook/?path=/story/web-components_' +
      storyBookType +
      '-' +
      title.replace(/ /g, '-').toLowerCase() +
      '--base';

    const headerTitle = (
      <div className={title__isHeader}>
        <PharosHeading level="1" preset="7--bold">
          {title}
        </PharosHeading>
      </div>
    );

    const baseTitle = (
      <div className={moreTitleSpace ? title__moreSpace : ''}>
        <PharosHeading level="2" preset="6">
          {title}
        </PharosHeading>
      </div>
    );

    const subsection1Title = (
      <div className={moreTitleSpace ? title__moreSpace : ''}>
        <PharosHeading level="2" preset="4">
          {title}
        </PharosHeading>
      </div>
    );

    const subsection2Title = (
      <div className={moreTitleSpace ? title__moreSpace : ''}>
        <PharosHeading level={'4'} preset={'1--bold'}>
          {title}
        </PharosHeading>
      </div>
    );

    const subsection3Title = (
      <div className={moreTitleSpace ? title__moreSpace : ''}>
        <PharosHeading level={'5'} preset={'1--bold'}>
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
          topMargin
            ? container__topMargin
            : lessMargin
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
          <div className={isHeader ? description__isHeader : description__base}> {description}</div>
        ) : null}
        {children}
        <br />
        {storyBookType ? storyBookLink : null}
      </div>
    );
    setDisplay(content);
  }, [
    topMargin,
    Pharos,
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
