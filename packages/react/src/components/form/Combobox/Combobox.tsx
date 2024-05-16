import { useState, useRef, useEffect, useId, forwardRef } from 'react';
import type * as React from 'react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cl from 'clsx/lite';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Box } from '../../Box';
import type { FormFieldProps } from '../useFormField';
import { useFormField } from '../useFormField';
import type { PortalProps } from '../../../types/Portal';
import useDebounce from '../../../utilities/useDebounce';
import { omit } from '../../../utilities';
import { Spinner } from '../../Spinner';

import type { Option } from './useCombobox';
import useCombobox from './useCombobox';
import ComboboxInput from './internal/ComboboxInput';
import ComboboxLabel from './internal/ComboboxLabel';
import ComboboxError from './internal/ComboboxError';
import ComboboxNative from './internal/ComboboxNative';
import ComboboxCustom from './Custom';
import { useFloatingCombobox } from './useFloatingCombobox';
import { useComboboxKeyboard } from './useComboboxKeyboard';
import { ComboboxIdProvider } from './ComboboxIdContext';
import { ComboboxContext } from './ComboboxContext';

export type ComboboxProps = {
  /**
   * Label for the combobox
   */
  label?: string;
  /**
   * Visually hides `label` and `description` (still available for screen readers)
   * @default false
   */
  hideLabel?: boolean;
  /**
   * String array of selected options. Contains only one option during single selection mode.
   */
  value?: string[];
  /**
   * String array of initial selected options. Contains only one option during single selection mode.
   */
  initialValue?: string[];
  /**
   * Callback function that is called when the value changes
   */
  onValueChange?: (value: string[]) => void;
  /**
   * Multiple options can be selected
   * @default false
   */
  multiple?: boolean;
  /**
   * Name of the value when used in a form
   */
  name?: string;
  /**
   * Exposes the HTML `size` attribute.
   * @default 0
   */
  htmlSize?: number;
  /**
   * Hides chips when multiple options are selected
   * @default false
   */
  hideChips?: boolean;
  /**
   * Hides the clear button
   * @default false
   */
  hideClearButton?: boolean;
  /**
   * Label for the clear button
   * @default 'Fjern alt'
   */
  clearButtonLabel?: string;
  /**
   * Enables virtualizing of options list.
   * @see https://tanstack.com/virtual
   * @default false
   */
  virtual?: boolean;
  /**
   * Value of the input field
   */
  inputValue?: string;
  /**
   * Adds `aria-busy` and displays loading state for the Combobox
   * All options will be hidden and replaced with a loading message.
   * @default false
   */
  loading?: boolean;
  /**
   * Text to display when the combobox is loading
   * @default 'Laster...'
   */
  loadingLabel?: string;
  /**
   * Filter function for filtering the list of options. Return `true` to show option, `false` to hide option.
   * @param inputValue
   * @param option
   * @returns boolean
   *
   * @default (inputValue, option) => option.value.toLowerCase().startsWith(inputValue.toLowerCase())
   */
  filter?: (inputValue: string, option: Option) => boolean;
  /**
   * Add a screen reader label to the chips
   * @param option
   * @returns string
   *
   * @default (option) => 'Slett ' + option.label,
   */
  chipSrLabel?: (option: Option) => string;
} & PortalProps &
  FormFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export const ComboboxComponent = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      value,
      initialValue = [],
      onValueChange,
      label,
      hideLabel = false,
      description,
      multiple = false,
      size = 'medium',
      disabled = false,
      readOnly = false,
      hideChips = false,
      clearButtonLabel = 'Fjern alt',
      hideClearButton = false,
      error,
      errorId,
      id,
      name,
      portal = true,
      htmlSize = 0,
      virtual = false,
      children,
      style,
      loading,
      loadingLabel = 'Laster...',
      filter,
      chipSrLabel = (option) => 'Slett ' + option.label,
      className,
      ...rest
    },
    forwareddRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);

    const listId = useId();

    const [inputValue, setInputValue] = useState<string>(rest.inputValue || '');

    const {
      selectedOptions,
      options,
      restChildren,
      interactiveChildren,
      customIds,
      filteredOptionsChildren,
      filteredOptions,
      setSelectedOptions,
    } = useCombobox({
      children,
      inputValue,
      filter,
      multiple,
      initialValue,
    });

    const {
      open,
      setOpen,
      refs,
      floatingStyles,
      context,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    } = useFloatingCombobox({
      listRef,
    });

    const formFieldProps = useFormField(
      {
        disabled,
        readOnly,
        error,
        errorId,
        size,
        description,
        id,
      },
      'combobox',
    );

    // if value is set, set input value to the label of the value
    useEffect(() => {
      if (value && value.length > 0 && !multiple) {
        const option = options[value[0]];
        setInputValue(option?.label || '');
      }
    }, [multiple, value, options]);

    useEffect(() => {
      if (value && Object.keys(options).length >= 0) {
        const updatedSelectedOptions = value.map((option) => {
          const value = options[option];
          return value;
        });

        setSelectedOptions(
          updatedSelectedOptions.reduce<{
            [key: string]: Option;
          }>((acc, value) => {
            acc[value.value] = value;
            return acc;
          }, {}),
        );
      }
    }, [multiple, value, options, setSelectedOptions]);

    // handle click on option, either select or deselect - Handles single or multiple
    const handleSelectOption = (args: {
      option: Option | null;
      remove?: boolean;
      clear?: boolean;
    }) => {
      const { option, clear, remove } = args;
      if (clear) {
        setSelectedOptions({});
        setInputValue('');
        onValueChange?.([]);
        return;
      }

      if (!option) return;

      if (remove) {
        const newSelectedOptions = { ...selectedOptions };
        delete newSelectedOptions[option.value];
        setSelectedOptions(newSelectedOptions);
        onValueChange?.(Object.keys(newSelectedOptions));
        return;
      }

      const newSelectedOptions = { ...selectedOptions };

      if (multiple) {
        if (newSelectedOptions[option.value]) {
          delete newSelectedOptions[option.value];
        } else {
          newSelectedOptions[option.value] = option;
        }
        setInputValue('');
        inputRef.current?.focus();
      } else {
        /* clear newSelectedOptions */
        Object.keys(newSelectedOptions).forEach((key) => {
          delete newSelectedOptions[key];
        });
        newSelectedOptions[option.value] = option;
        setInputValue(option?.label || '');
        // move cursor to the end of the input
        setTimeout(() => {
          inputRef.current?.setSelectionRange(
            option?.label?.length || 0,
            option?.label?.length || 0,
          );
        }, 0);
      }

      setSelectedOptions(newSelectedOptions);
      onValueChange?.(Object.keys(newSelectedOptions));

      !multiple && setOpen(false);
      refs.domReference.current?.focus();
    };

    const debouncedHandleSelectOption = useDebounce(handleSelectOption, 50);

    const handleKeyDown = useComboboxKeyboard({
      filteredOptions,
      selectedOptions,
      readOnly: formFieldProps.readOnly || false,
      disabled: disabled,
      multiple,
      inputValue,
      options,
      open,
      interactiveChildren,
      setOpen,
      setInputValue,
      handleSelectOption: debouncedHandleSelectOption,
    });

    const rowVirtualizer = useVirtualizer({
      count: Object.keys(filteredOptionsChildren).length,
      getScrollElement: () => (virtual ? refs.floating.current : null),
      estimateSize: () => 70,
      measureElement: (elem) => {
        return elem.getBoundingClientRect().height;
      },
      overscan: 1,
    });

    return (
      <ComboboxContext.Provider
        value={{
          size,
          options,
          selectedOptions,
          multiple,
          disabled,
          readOnly,
          open,
          inputRef,
          refs,
          inputValue,
          formFieldProps,
          htmlSize,
          clearButtonLabel,
          customIds,
          filteredOptions,
          setInputValue,
          setOpen,
          getReferenceProps,
          getItemProps,
          /* Recieves the value of the option, and searches for it in our values lookup */
          onOptionClick: (value: string) => {
            if (readOnly) return;
            if (disabled) return;
            const option = options[value];
            debouncedHandleSelectOption({ option: option });
          },
          handleSelectOption: debouncedHandleSelectOption,
          chipSrLabel,
          listRef,
          forwareddRef,
        }}
      >
        <Box
          className={cl(
            'fds-combobox',
            `fds-combobox--${size}`,
            disabled && 'fds-combobox__disabled',
            className,
          )}
          style={style}
          ref={portalRef}
        >
          {/* This is only for the Combobox to work in forms */}
          {name && (
            <ComboboxNative
              name={name}
              selectedOptions={selectedOptions}
              multiple={multiple}
            />
          )}

          <ComboboxLabel
            label={label}
            description={description}
            size={size}
            readOnly={readOnly}
            hideLabel={hideLabel}
            formFieldProps={formFieldProps}
          />
          <ComboboxInput
            {...omit(['inputValue'], rest)}
            hideClearButton={hideClearButton}
            listId={listId}
            error={error}
            hideChips={hideChips}
            handleKeyDown={handleKeyDown}
            aria-busy={loading}
          />
          <ComboboxError
            size={size}
            error={error}
            formFieldProps={formFieldProps}
          />
        </Box>

        {/* This is the floating list with options */}
        {open && (
          <FloatingPortal root={portal ? null : portalRef}>
            <FloatingFocusManager
              context={context}
              initialFocus={-1}
              visuallyHiddenDismiss
            >
              <Box
                id={listId}
                shadow='medium'
                borderRadius='medium'
                borderColor='default'
                aria-labelledby={formFieldProps.inputProps.id}
                aria-autocomplete='list'
                tabIndex={-1}
                {...getFloatingProps({
                  ref: refs.setFloating,
                  style: {
                    ...floatingStyles,
                  },
                })}
                className={cl(
                  'fds-combobox__options-wrapper',
                  `fds-combobox--${size}`,
                )}
              >
                {virtual && (
                  <div
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      width: '100%',
                      position: 'relative',
                    }}
                  >
                    {/* Render the virtualized rows */}
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                      <div
                        key={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        data-index={virtualRow.index}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >
                        {filteredOptionsChildren[virtualRow.index]}
                      </div>
                    ))}
                  </div>
                )}

                {loading ? (
                  <ComboboxCustom className={'fds-combobox__loading'}>
                    <Spinner
                      title='Laster'
                      size='sm'
                    />
                    {loadingLabel}
                  </ComboboxCustom>
                ) : (
                  <>
                    {/* Add the rest of the children */}
                    {restChildren}
                    {!virtual && filteredOptionsChildren}
                  </>
                )}
              </Box>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </ComboboxContext.Provider>
    );
  },
);

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => (
    <ComboboxIdProvider>
      <ComboboxComponent
        {...props}
        ref={ref}
      />
    </ComboboxIdProvider>
  ),
);

Combobox.displayName = 'Combobox';
