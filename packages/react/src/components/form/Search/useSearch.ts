import type { InputHTMLAttributes } from 'react';
import { useContext } from 'react';

import type { FormField } from '../useFormField';
import { useFormField } from '../useFormField';
import { FieldsetContext } from '../Fieldset/FieldsetContext';
import { getSize } from '../../../utilities/getSize';

import type { SearchProps } from './Search';

type UseSearch = (props: SearchProps) => Omit<FormField, 'inputProps'> & {
  inputProps: Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'readOnly' | 'name' | 'required' | 'onClick' | 'onChange'
  > &
    FormField['inputProps'];
};

/** Handles props for `Search` in context with `Fieldset` */
export const useSearch: UseSearch = (props) => {
  const fieldset = useContext(FieldsetContext);
  const { inputProps, readOnly, ...rest } = useFormField(props, 'search');

  const size =
    fieldset?.size ?? (getSize(props.size || 'md') as FormField['size']);

  return {
    ...rest,
    readOnly,
    size,
    inputProps: {
      ...inputProps,
      type: 'search',
      name: props.name ?? 'q',
      readOnly,
      onClick: (e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        props?.onClick?.(e);
      },
      onChange: (e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        props?.onChange?.(e);
      },
    },
  };
};
