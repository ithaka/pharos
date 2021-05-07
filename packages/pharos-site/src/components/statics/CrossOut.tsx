import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { cross_line } from './CrossOut.module.css';

const CrossOut: FC = ({ children }) => {
  const [childDiv, setChildDiv] = useState<HTMLDivElement | null>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    if (childDiv) {
      setBoxWidth(childDiv.clientWidth);
      let lineWidthValue =
        Math.round(
          Math.sqrt(Math.pow(childDiv.clientWidth, 2) + Math.pow(childDiv.clientHeight, 2))
        ) * 1.1;
      if (lineWidthValue > childDiv.clientHeight * 2) {
        lineWidthValue = childDiv.clientHeight * 2;
      }

      setLeft((childDiv.clientWidth / 4) * -1);
      setTop(childDiv.clientHeight / 2);
      setLineWidth(lineWidthValue);
    }
  }, [childDiv]);

  return (
    <div style={{ width: boxWidth }}>
      <hr className={cross_line} style={{ top, left, width: lineWidth }} />
      <div style={{ width: 'min-content', margin: 0 }} ref={(elem) => setChildDiv(elem)}>
        {children}
      </div>
    </div>
  );
};

export default CrossOut;
