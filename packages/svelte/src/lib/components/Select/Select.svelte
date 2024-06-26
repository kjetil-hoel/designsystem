<script>
  // @ts-nocheck
  import { onMount, setContext } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import SelectControl from './SelectControl.svelte';
  import SelectDropdown from './SelectDropdown.svelte';
  import { writable } from 'svelte/store';

  /**
   * @typedef {Object} SelectOption
   * @property {string} label - Display label of the option.
   * @property {string} [description] - Description of the option.
   * @property {string} value - Unique value of the option.
   */

  /**
   * List of options for the select.
   * @type {SelectOption[]}
   */
  export let options = [];

  /**
   * Currently selected option(s).
   * @type {SelectOption |  SelectOption[] | null}
   */
  export let selected = null;

  /**
   * If true, allows multiple options to be selected.
   * @type {boolean}
   */
  export let multiple = false;

  /**
   * If true, disables any interaction with the select.
   * @type {boolean}
   */
  export let disabled = false;

  /**
   * Placeholder text for the select input.
   * @type {string}
   */
  export let placeholder = 'Select an option...';

  /**
   * Description text for the select.
   * @type {string}
   */
  export let description = '';

  /**
   * Size of the select.
   * @type {'small' | 'medium' | 'large'}
   */
  export let size = 'medium';

  /**
   * ARIA label for accessibility.
   * @type {string}
   */
  export let ariaLabel = 'Select';

  let inputId = `select-${uuidv4()}`;

  /**
   * Label for the select.
   * @type {string}
   */
  export let label;

  /**
   * ARIA label for the search input inside the select.
   * @type {string}
   */
  export let searchLabel = 'Search';

  /**
   * If true, hides selected options from the dropdown list.
   * @type {boolean}
   */
  export let hideSelected = true; //multiple ? true : false;

  /**
   * If true, enables the search/filter input inside the dropdown.
   * @type {boolean}
   */
  export let hasFilter = false;

  /**
   * If true, closes the dropdown menu when an option is selected. Default true if single, default false if multiple.
   * @type {boolean}
   */
  export let closeMenuOnSelect = multiple ? false : true;

  /**
   * @type {string}
   */
  export let error = '';

  /**
   * @type {boolean}
   */
  export let readOnly = false;

  /**
   * If true, allows options to be cleared. Only applies to single select.
   * @type {boolean}
   */
  export let clearable = false;

  /**
   * onChange handler for when a value has been choosen.
   * @type {Function}
   */
  export let onChange = () => {};

  $: isDropdownVisible = false;
  let selectClasses = 'select';
  let inputClasses = 'textInput';
  let node;

  let selectedStore = writable(normalizeSelected(selected));

  // Add other values here if necessary for reactivity
  const selectContext = writable({
    selected: $selectedStore,
    error,
    multiple,
  });

  setContext('selectContext-' + inputId, selectContext);
  $: {
    let newSelected = $selectedStore;
    if (!Array.isArray(selected)) {
      newSelected = normalizeSelected(selected);
    }
    selectContext.set({ selected: newSelected, error, multiple });
  }

  function closeDropdown() {
    isDropdownVisible = false;
  }

  function normalizeSelected(selectedOptions) {
    if (!selectedOptions) return [];
    return Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions];
  }

  function selectOption(option) {
    selectedStore.update((currentSelected) => {
      if (multiple) {
        // If multiple selections are allowed
        if (Array.isArray(currentSelected)) {
          if (
            !currentSelected.some(
              (selectedOption) => selectedOption.value === option.value,
            )
          ) {
            // Add the option if it's not already selected
            return [...currentSelected, option];
          } else {
            // Remove the option if it's already selected
            return currentSelected.filter(
              (selectedOption) => selectedOption.value !== option.value,
            );
          }
        } else {
          // If currently selected is not an array, start a new array with the option
          return [option];
        }
      } else {
        if (hasFilter) {
          // Clear options filter on single selection
          handleFilterChange('');
        }
        // If only single selection is allowed
        // selected = option;
        return [option];
      }
    });
    if (multiple) {
      selected = $selectedStore;
    } else {
      selected = $selectedStore[0];
    }

    if (closeMenuOnSelect) {
      isDropdownVisible = false;
    }
    onChange();
  }

  function removeOption(optionToRemove) {
    selectedStore.update((currentSelected) => {
      if (multiple) {
        return currentSelected.filter(
          (option) => option.value !== optionToRemove.value,
        );
      } else {
        return [];
      }
    });
    selected = $selectedStore;
  }

  function clearAll() {
    if ((multiple || clearable) && !readOnly) {
      selectedStore.set([]);
      selectContext.update((ctx) => ({ ...ctx, selected: [] }));
      selected = !multiple ? null : $selectedStore;
    }
  }

  function openDropdown() {
    if (!disabled && !readOnly) {
      isDropdownVisible = true;
    }
  }

  function handleOutsideClick(event) {
    if (isDropdownVisible && !event.composedPath().includes(node)) {
      closeDropdown();
    }
  }

  function handleSelectControlClick() {
    if (isDropdownVisible) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  $: if (disabled) {
    selectClasses = 'select disabled';
    inputClasses += ' disabled';
  } else if (readOnly) {
    selectClasses = 'select readOnly';
    inputClasses += ' readOnly';
  } else if (error) {
    selectClasses = 'select error';
    inputClasses += ' error';
  } else {
    selectClasses = 'select';
  }

  let searchTerm = '';
  $: filteredOptions = options;

  function handleFilterChange(newFilter) {
    searchTerm = newFilter;
    filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  let fontSizeClass;

  switch (size) {
    case 'xsmall':
    case 'small':
    case 'medium':
    case 'large':
      fontSizeClass = `font-${size}`;
      break;
    default:
      fontSizeClass = 'font-medium';
      break;
  }
</script>

<div
  bind:this={node}
  class="select-container"
  aria-label={ariaLabel}
  {...$$restProps}
>
  {#if label}
    <div>
      {#if readOnly}
        <span
          aria-hidden
          class="padlock-icon"
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25Zm3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25h6.5ZM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13Z"
              fill="currentColor"
            />
          </svg>
        </span>
      {/if}
      <label
        class={`select-label ${fontSizeClass}`}
        for={inputId}>{label}</label
      >
    </div>
  {/if}

  {#if description}
    <p class="select-description">{description}</p>
  {/if}

  <SelectControl
    {inputId}
    {placeholder}
    {hasFilter}
    {readOnly}
    {removeOption}
    {multiple}
    {handleSelectControlClick}
    {handleFilterChange}
    {searchLabel}
    {disabled}
    {error}
    {clearAll}
    {clearable}
    {size}
  />

  <SelectDropdown
    {isDropdownVisible}
    options={filteredOptions}
    {selectOption}
    {hideSelected}
    {multiple}
    {inputId}
    {size}
  />
  {#if error}
    <div class="error-message">{error}</div>
  {/if}
</div>

<style lang="scss">
  .select-container {
    display: flex;
    flex-direction: column;
    gap: var(--fds-spacing-2);
  }
  .error-message {
    color: var(--fds-semantic-border-danger-default);
  }

  .select-label {
    color: var(--fds-semantic-text-neutral-default, #1e2b3c);
    font-weight: 600;
    line-height: 130%; /* 20.15px */
  }
  .select-description {
    margin: 0;
  }
  .font-small {
    font-size: 0.9375rem;
  }
  .font-medium {
    font-size: 1.125rem;
  }
  .font-large {
    font-size: 1.25rem;
  }
  .padlock-icon {
    grid-area: label;
    position: relative;
    top: 2px;
  }
</style>
