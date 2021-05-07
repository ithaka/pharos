import { navigate } from 'gatsby';

const handleLinkClick = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  navigate((e.target as HTMLElement).getAttribute('href') || '/');
};

export default handleLinkClick;
