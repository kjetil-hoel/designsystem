import * as React from 'react';
import cl from 'clsx/lite';

import { Paragraph } from '../Typography';

export type TableProps = {
  /**
   * The size of the table
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If true, the table will have zebra striping
   * @default false
   */
  zebra?: boolean;
  /**
   * If true, the table will have a sticky header
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * If true, the table will have a rounded border
   * @default false
   */
  border?: boolean;
} & Omit<React.TableHTMLAttributes<HTMLTableElement>, 'border'>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      zebra = false,
      size = 'medium',
      stickyHeader = false,
      border = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <Paragraph
        asChild
        size={size}
      >
        <table
          ref={ref}
          className={cl(
            'fds-table',
            `fds-table--${size}`,
            zebra && 'fds-table--zebra',
            stickyHeader && 'fds-table--sticky-header',
            border && 'fds-table--border',
            className,
          )}
          {...rest}
        >
          {children}
        </table>
      </Paragraph>
    );
  },
);

Table.displayName = 'Table';
