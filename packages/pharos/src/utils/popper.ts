import { popperGenerator, defaultModifiers } from '@popperjs/core/lib/popper-lite.js';
import type { Instance, Options, PositioningStrategy } from '@popperjs/core/lib/types';
import type { Placement } from '@popperjs/core/lib/enums';
import { placements } from '@popperjs/core/lib/enums.js';

import flip from '@popperjs/core/lib/modifiers/flip.js';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import arrow from '@popperjs/core/lib/modifiers/arrow.js';
import offset from '@popperjs/core/lib/modifiers/offset.js';

export const createPopper = popperGenerator({
  defaultModifiers: [...defaultModifiers, flip, preventOverflow, arrow, offset],
});

export { placements };
export type { Instance, Options, PositioningStrategy, Placement };
