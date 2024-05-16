import { useContext, useId } from 'react';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import cl from 'clsx';

import { FieldsetContext } from './Fieldset/FieldsetContext';

export type FormFieldProps = {
  /** Error message for form field */
  error?: ReactNode;
  /** Override generated errorId */
  errorId?: string;
  /** Disables element
   * @note Avoid using if possible for accessibility purposes
   */
  disabled?: boolean;
  /** Description for field */
  description?: ReactNode;
  /** Override internal id */
  id?: string;
  /** Toggle `readOnly` */
  readOnly?: boolean;
  /** Changes field size and paddings */
  size?: 'small' | 'medium' | 'large';
} & Pick<HTMLAttributes<HTMLElement>, 'aria-describedby'>;

export type FormField = {
  hasError: boolean;
  errorId: string;
  descriptionId: string;
  inputProps: {
    id: string;
  } & Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'aria-invalid' | 'aria-describedby'
  >;
} & Pick<FormFieldProps, 'size' | 'readOnly'>;

/**
 * Handles props and their state for various form-fields in context with Fieldset
 */
export const useFormField = (
  props: FormFieldProps,
  prefix: string,
): FormField => {
  const fieldset = useContext(FieldsetContext);

  const randomId = useId();

  const id = props.id ?? `${prefix}-${randomId}`;
  const errorId = props.errorId ?? `${prefix}-error-${randomId}`;
  const descriptionId = `${prefix}-description-${randomId}`;

  const disabled = fieldset?.disabled || props?.disabled;
  const readOnly =
    ((fieldset?.readOnly || props?.readOnly) && !disabled) || undefined;

  const hasError = !disabled && !readOnly && !!(props.error || fieldset?.error);

  return {
    readOnly,
    hasError,
    errorId,
    descriptionId,
    size: props?.size ?? fieldset?.size ?? 'medium',
    inputProps: {
      id,
      disabled,
      'aria-invalid': hasError ? true : undefined,
      'aria-describedby':
        cl(props['aria-describedby'], {
          [descriptionId]:
            !!props?.description && typeof props?.description === 'string',
          [errorId]: hasError && !fieldset?.error,
          [fieldset?.errorId ?? '']: hasError && !!fieldset?.error,
        }) || undefined,
    },
  };
};
