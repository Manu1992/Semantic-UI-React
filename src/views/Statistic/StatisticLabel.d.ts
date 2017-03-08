import * as React from 'react';

interface StatisticLabelProps {
  [key: string]: any;

  /** An element type to render as (string or function). */
  as?: any;

  /** Primary content. */
  children?: React.ReactNode;

  /** Additional classes. */
  className?: string;

  /** Shorthand for primary content. */
  label?: React.ReactNode;
}

declare const StatisticLabel: React.StatelessComponent<StatisticLabelProps>;

export default StatisticLabel;
