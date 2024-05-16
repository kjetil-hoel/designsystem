import { forwardRef, useContext } from 'react';

import type { ButtonProps } from '../Button';
import { Button } from '../Button';

import { DropdownMenuContext } from './DropdownMenu';

export type DropdownMenuItemProps = Omit<
  ButtonProps,
  'variant' | 'size' | 'color' | 'fullWidth'
>;

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ children, className, style, ...rest }, ref) => {
  const menu = useContext(DropdownMenuContext);

  return (
    <li
      className={className}
      style={style}
    >
      <Button
        ref={ref}
        variant='tertiary'
        size={menu.size}
        fullWidth
        className='fds-dropdownmenu__item'
        role='menuitem'
        {...rest}
      >
        {children}
      </Button>
    </li>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';
