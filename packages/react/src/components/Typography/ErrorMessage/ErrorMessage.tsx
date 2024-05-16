import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx';
import { Slot } from '@radix-ui/react-slot';

export type ErrorMessageProps = {
  /** Changes text sizing */
  size?: 'xsmall' | 'small' | 'medium' | 'large';
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
  (
    { className, size = 'medium', spacing, asChild, error = true, ...rest },
    ref,
  ) => {
    const Component = asChild ? Slot : 'div';

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
