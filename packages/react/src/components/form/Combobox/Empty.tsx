import { forwardRef, useContext } from 'react';
import type * as React from 'react';
import cl from 'clsx/lite';

import { ComboboxContext } from './ComboboxContext';

type ComboboxEmptyProps = React.HTMLAttributes<HTMLDivElement>;

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  ({ children, className, ...rest }, ref) => {
    const context = useContext(ComboboxContext);
    if (!context) {
      throw new Error('ComboboxEmpty must be used within a Combobox');
    }

    const { filteredOptions } = context;

    return (
      filteredOptions.length === 0 && (
        <div
          ref={ref}
          className={cl('fds-combobox__empty', className)}
          {...rest}
        >
          {children}
        </div>
      )
    );
  },
);

ComboboxEmpty.displayName = 'ComboboxEmpty';

export default ComboboxEmpty;
