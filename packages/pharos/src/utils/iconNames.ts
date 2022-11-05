import tokens from '../styles/tokens';
import type { IconName } from '../components/icon/pharos-icon';

export const iconNames = Object.keys(tokens.asset.icon).sort() as IconName[];
