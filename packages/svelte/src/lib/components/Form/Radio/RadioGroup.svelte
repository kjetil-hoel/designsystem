<script>
  import { writable } from 'svelte/store';
  import { setContext, createEventDispatcher, onMount } from 'svelte';

  /**
   * RadioGroup
   *
   * @prop {string} [legend] - The legend of the fieldset.
   * @prop {string} [description] - A description of the fieldset. This will appear below the legend.
   * @prop {boolean} [readOnly=false] - Toggle readOnly on fieldset context.
   * @prop {boolean} [disabled=false] - Toggle disabled all input fields within the fieldset.
   * @prop {string} [error] - If set, this will diplay an error message at the bottom of the fieldset.
   * @prop {string} [value] - Controlled state for Radio.
   * @prop {string} [defaultValue] - Default checked Radio
   * @prop {boolean} [required=false] - Toggle if collection of Radio are required. Note: Not fully implemented for Svelte.
   * @prop {boolean} [inline=false] - Orientation of Radio components.
   * @prop {string} [size='medium'] - Changes field size and paddings.
   * @prop {boolean} [hideLegend=false] - Visually hide legend and description (still available for screen readers).
   */

  export let legend = '';
  export let description = '';
  export let readOnly = false;
  export let disabled = false;
  export let error = '';
  export let value;
  export let defaultValue = '';
  export let required = false;
  export let inline = false;
  export let size = 'medium';
  export let hideLegend = false;

  const selectedValue = writable(value);

  onMount(() => {
    selectedValue.set(defaultValue);
  });

  let fontSizeClass;
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
    default:
      fontSizeClass = 'font-medium';
      break;
  }

  let radioGroupClasses = `radio-group`;
  let legendClasses = `legend ${fontSizeClass} ${
    hideLegend ? 'visually-hidden' : ''
  }`;
  let descriptionClasses = `description ${fontSizeClass}  ${
    hideLegend ? 'visually-hidden' : ''
  }`;
  let errorClasses = `error ${fontSizeClass}`;

  setContext('radioGroup', {
    readOnly,
    disabled,
    size,
    error,
    selectedValue,
    required,
    setCheckedValue: (changedValue) => {
      selectedValue.set(changedValue);
      dispatch('change', changedValue);
    },
  });

  const dispatch = createEventDispatcher();
</script>

<div class={radioGroupClasses}>
  {#if legend}
    {#if readOnly}
      <span
        aria-hidden
        class="padlock-icon">🔒</span
      >
    {/if}
    <label
      for="legend"
      class={legendClasses}
    >
      {legend}
    </label>
  {/if}
  {#if description}
    <p class={descriptionClasses}>
      {description}
    </p>
  {/if}

  <div class={inline ? 'radio-group-inline' : ''}>
    <slot />
  </div>
  {#if error}
    <p class={errorClasses}>{error}</p>
  {/if}
</div>

<style>
  .radio-group-inline {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .font-xsmall {
    font-size: 0.8125rem;
  }
  .font-small {
    font-size: 0.9375rem;
  }
  .font-medium {
    font-size: 1.125rem;
  }

  .error {
    color: var(--fds-semantic-border-danger-default);
  }

  label {
    font-weight: 500;
  }
  p {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-weight: 400;
    color: var(--fds-semantic-text-neutral-subtle);
  }

  .visually-hidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>
