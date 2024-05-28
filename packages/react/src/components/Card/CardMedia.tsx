import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';

export type CardMediaProps = {
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ asChild, className, ...rest }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        className={cl(`fds-card__media`, className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

CardMedia.displayName = 'CardMedia';
