import { Fragment, useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import * as styles from './StatusIcon.module.css';
import legend from '../../../pages/components/component-status/legend.json';
import alpha from '../../../../static/icons/component-status/alpha.svg';
import deprecated from '../../../../static/icons/component-status/deprecated.svg';
import inProgress from '../../../../static/icons/component-status/in-progress.svg';
import legacy from '../../../../static/icons/component-status/legacy.svg';
import notApplicable from '../../../../static/icons/component-status/not-applicable.svg';
import planned from '../../../../static/icons/component-status/planned.svg';
import released from '../../../../static/icons/component-status/released.svg';

const icons = {
  alpha,
  deprecated,
  'in-progress': inProgress,
  legacy,
  'not-applicable': notApplicable,
  planned,
  released,
};

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

interface StatusIconProps {
  status: string;
  index?: string;
}

const StatusIcon: FC<StatusIconProps> = ({ status, index }) => {
  const [StateIcon, setStateIcon] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@pharos/core/lib/react-components') : null;

  useEffect(() => {
    const { PharosTooltip } = Pharos;

    const statusName = status.charAt(0).toUpperCase() + status.slice(1);
    const iconClass = `icon${toCamelCase(statusName)}`;
    const description = legend[status as keyof typeof legend].name;

    const icon = (
      <Fragment>
        <div
          role="button"
          tabIndex={0}
          style={{ display: 'table-cell' }}
          data-tooltip-id={'status-tooltip' + index}
        >
          <img
            src={icons[legend[status as keyof typeof legend].icon as keyof typeof icons]}
            alt={description}
            className={styles[iconClass]}
            style={{
              display: 'table-cell',
            }}
          />
        </div>
        {index ? (
          <PharosTooltip id={'status-tooltip' + index} placement={'bottom'}>
            {description}
          </PharosTooltip>
        ) : null}
      </Fragment>
    );

    setStateIcon(icon);
  }, [Pharos, status, index]);

  return StateIcon;
};

export default StatusIcon;
