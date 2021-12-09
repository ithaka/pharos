import { createContext } from 'react';

interface PharosContextInterface {
  prefix: string;
}

export const PharosContext = createContext<PharosContextInterface | null>(null);
