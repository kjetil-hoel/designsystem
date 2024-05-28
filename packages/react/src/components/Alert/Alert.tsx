import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {
  InformationSquareFillIcon,
  CheckmarkCircleFillIcon,
  XMarkOctagonFillIcon,
  ExclamationmarkTriangleFillIcon,
} from '@navikt/aksel-icons';
import cl from 'clsx/lite';

import { Paragraph } from '..';
import { getSize } from '../../utilities/getSize';

const icons: Record<
  Severity,
  { Icon: typeof InformationSquareFillIcon; title: string }
> = {
  info: {
    Icon: InformationSquareFillIcon,
    title: 'Informasjon',
  },
  warning: { Icon: ExclamationmarkTriangleFillIcon, title: 'Advarsel' },
  success: { Icon: CheckmarkCircleFillIcon, title: 'Suksess' },
  danger: {
    Icon: XMarkOctagonFillIcon,
    title: 'Feil',
  },
};

type Severity = 'info' | 'warning' | 'success' | 'danger';

type OldAlertSizes = 'small' | 'medium' | 'large';

export type AlertProps = {
  /** Sets color & icon according to severity */
  severity?: Severity;
  /** Adds a shadow to elevate the component */
  elevated?: boolean;
  /** Sets `title` on the icon.
   *
   * Use this to inform screenreaders of severity.
   *  Defaults to Norwegian. */
  iconTitle?: string;
  /**
   * Sets the size of the alert.
   * Does not affect font size.
   *
   * @default md
   *
   * @note `small`, `medium`, `large` is deprecated
   */
  size?: 'sm' | 'md' | 'lg' | OldAlertSizes;
} & HTMLAttributes<HTMLDivElement>;
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    { severity = 'info', elevated, iconTitle, children, className, ...rest },
    ref,
  ) => {
    const size = getSize(rest.size || 'md') as AlertProps['size'];
    const { Icon, title } = icons[severity];

    return (
      <div
        ref={ref}
        className={cl(
          'fds-alert',
          `fds-alert--${size}`,
          `fds-alert--${severity}`,
          elevated && `fds-alert--elevated`,
          className,
        )}
        {...rest}
      >
        <>
          <Icon
            title={iconTitle || title}
            className='fds-alert__icon'
          />
          <Paragraph
            asChild
            size={size}
            className='fds-alert__content'
          >
            <span>{children}</span>
          </Paragraph>
        </>
      </div>
    );
  },
);

Alert.displayName = 'Alert';
