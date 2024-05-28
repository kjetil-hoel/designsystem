import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx';
import { Slot } from '@radix-ui/react-slot';

import { getSize } from '../../../utilities/getSize';

type OldErrorMessageSizes = 'xsmall' | 'small' | 'medium' | 'large';

export type ErrorMessageProps = {
  /**
   * Changes text sizing
   * @default md
   * @note `xsmall`, `small`, `medium`, `large` is deprecated
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | OldErrorMessageSizes;
  /** Adds margin-bottom */
  spacing?: boolean;
  /** Toggle error color */
  error?: boolean;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

/** Use `ErrorMessage` to display text as error message. */
export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, spacing, asChild, error = true, ...rest }, ref) => {
    const Component = asChild ? Slot : 'div';
    const size = getSize(rest.size || 'md');

    return (
      <Component
        ref={ref}
        className={cl(
          'fds-error-message',
          `fds-error-message--${size}`,
          spacing && 'fds-error-message--spacing',
          error && 'fds-error-message--error',
          className,
        )}
        {...rest}
      />
    );
  },
);

ErrorMessage.displayName = 'ErrorMessage';
