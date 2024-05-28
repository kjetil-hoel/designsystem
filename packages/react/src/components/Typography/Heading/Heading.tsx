import type { ElementType, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import cl from 'clsx/lite';
import { Slot } from '@radix-ui/react-slot';

import { getSize } from '../../../utilities/getSize';

type OldHeadingSizes =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | '2xlarge'
  | '3xlarge';

export type HeadingProps = {
  /** Heading level. This will translate into any h1-6 level unless `as` is defined */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Changes text sizing
   * @default 'xl'
   *
   * @note `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `2xlarge`, `3xlarge` is deprecated
   */
  size?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | OldHeadingSizes;
  /** Adds margin-bottom */
  spacing?: boolean;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   * @default false
   */
  asChild?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

/** Use `Heading` to render h1-6 elements with heading text styles.  */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, spacing = false, className, asChild, ...rest }, ref) => {
    const Component = asChild ? Slot : (`h${level ?? 1}` as ElementType);
    const size = getSize(rest.size || 'xl');

    return (
      <Component
        ref={ref}
        className={cl(
          'fds-heading',
          `fds-heading--${size}`,
          spacing && 'fds-heading--spacing',
          className,
        )}
        {...rest}
      />
    );
  },
);

Heading.displayName = 'Heading';
