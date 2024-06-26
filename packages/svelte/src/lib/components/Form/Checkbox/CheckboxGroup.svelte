<script>
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { v4 as uuidv4 } from 'uuid';

  /**
   * CheckboxGroup
   *
   * @prop {string} [legend=''] - The legend of the fieldset.
   * @prop {string} [description=''] - A description of the fieldset. This will appear below the legend.
   * @prop {boolean} [readOnly=false] - Toggle readOnly on fieldset context.
   * @prop {boolean} [disabled=false] - Toggle disabled all input fields within the fieldset.
   * @prop {string} [error=''] - If set, this will diplay an error message at the bottom of the fieldset.
   * @prop {string} [value] - Controlled state for Checkbox.
   * @prop {string} [defaultValue=[]] - Default checked Checkbox
   * @prop {boolean} [required=false] - Toggle if collection of Checkbox are required. Note: Not fully implemented for Svelte.
   * @prop {string} [size='medium'] - Changes field size and paddings.
   * @prop {boolean} [hideLegend=false] - Visually hide legend and description (still available for screen readers).
   */

  export let legend = '';
  export let description = '';
  export let readOnly = false;
  export let disabled = false;
  export let error = '';
  export let value = [];
  export let defaultValue = [];
  export let required = false;
  export let size = 'medium';
  export let hideLegend = false;

  let initialized = false;
  let fontSizeClass;

  const uniqueId = uuidv4();
  const checkboxGroup = writable({
    readOnly,
    disabled,
    size,
    value,
    error,
    uniqueId,
    required,
  });

  switch (size) {
    case 'xsmall':
      fontSizeClass = 'font-xsmall';
      break;
    case 'small':
      fontSizeClass = 'font-small';
      break;
    case 'medium':
      fontSizeClass = 'font-medium';
      break;
    case 'large':
      fontSizeClass = 'font-large';
      break;
    default:
      fontSizeClass = 'font-medium';
      break;
  }

  onMount(() => {
    if (!initialized && value.length === 0) {
      value = [...defaultValue];
      initialized = true;
    }
  });

  function handleCheckboxChange(change) {
    if (
      change.target instanceof HTMLInputElement &&
      change.target.type === 'checkbox'
    ) {
      if (change.target.checked) {
        value = [...value, change.target.value];
      } else {
        value = value.filter((v) => v !== change.target.value);
      }
    }
  }

  $: checkboxGroupClasses = `checkbox-group ${
    readOnly ? 'readonly' : ''
  } ${size}`;
  $: legendWrapperClasses = `legend-wrapper ${
    hideLegend ? 'visually-hidden' : ''
  }`;
  $: legendClasses = `legend ${fontSizeClass}`;
  $: descriptionClasses = `description ${fontSizeClass}  ${
    hideLegend ? 'visually-hidden' : ''
  }`;
  $: errorClasses = `error ${fontSizeClass}`;

  $: setContext('checkboxGroup', checkboxGroup);

  $: {
    checkboxGroup.update((storeValue) => ({
      ...storeValue,
      readOnly: readOnly,
      disabled: disabled,
      size: size,
      error: error,
      value: value,
      required: required,
    }));
  }
</script>

<fieldset
  class={checkboxGroupClasses}
  id={`group-${uniqueId}`}
  aria-labelledby={`label-${uniqueId}`}
  on:change={handleCheckboxChange}
>
  {#if legend || description}
    <div class="legend-description">
      {#if legend}
        <div class={`${legendWrapperClasses}`}>
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
          <legend
            class={legendClasses}
            id={`label-${uniqueId}`}
          >
            {legend}
          </legend>
        </div>
      {/if}
      {#if description}
        <p class={descriptionClasses}>
          {description}
        </p>
      {/if}
    </div>
  {/if}
  <div class="checkboxes">
    <slot />
  </div>
  {#if error}
    <p class={errorClasses}>{error}</p>
  {/if}
</fieldset>

<style>
  .font-xsmall {
    font-size: 0.8125rem;
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

  .error {
    color: var(--fds-semantic-border-danger-default, #e02e49);
  }

  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 0.0625rem;
    margin: -0.0625rem;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 0.0625rem;
  }

  .legend-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: block;
  }

  legend {
    font-weight: 500;
    padding: 0;
    margin: 0;
    display: table;
    max-width: 100%;
    white-space: normal;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    align-self: flex-start;
  }
  p {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-weight: 400;
    color: var(--fds-semantic-text-neutral-default, #1b1b1b);
  }

  .legend-description {
    margin-top: 0;
    margin-bottom: var(--spacing-3, 0.84375rem);
  }
  .padlock-icon {
    grid-area: label;
    position: relative;
    top: 1px;
    scale: 1.4;
  }
</style>
