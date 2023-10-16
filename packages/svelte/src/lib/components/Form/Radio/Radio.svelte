<script>
  import { getContext } from 'svelte';

  /**
   * Radio
   *
   * @prop {string} [description] - Description for field.
   * @prop {boolean} [disabled=false] - Disables element.
   * @prop {boolean} [readOnly=false] - Toggle readOnly.
   * @prop {string} [value] - Value of the input element.
   * @prop {string} [size='medium'] - Changes field size and paddings. Options are 'xsmall', 'small', 'medium'.
   * @prop {boolean} [checked] - Determines if the radio button is checked or not.
   * @prop {boolean} [hideLabel] - Hides label and description.
   */

  export let description = '';
  export let disabled = false;
  export let readOnly = false;
  export let value;
  export let size = 'medium';
  export let checked = false;
  export let hideLabel = false;

  const radioGroup = getContext('radioGroup');

  if (radioGroup && radioGroup.selectedValue) {
    radioGroup.selectedValue.subscribe((selected) => {
      checked = selected === value;
    });
  }

  if (radioGroup && radioGroup.size) {
    size = radioGroup.size;
  }

  if (radioGroup && radioGroup.disabled) {
    disabled = radioGroup.disabled;
  }

  if (radioGroup && radioGroup.readOnly) {
    readOnly = radioGroup.readOnly;
  }

  function toggle() {
    if (!disabled && !readOnly && !checked) {
      if (radioGroup && radioGroup.setCheckedValue) {
        radioGroup.setCheckedValue(value);
      }
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }

  let iconSizeClass;
  let fontSizeClass;
  switch (size) {
    case 'xsmall':
      iconSizeClass = 'icon-xsmall';
      fontSizeClass = 'font-xsmall';
      break;
    case 'small':
      iconSizeClass = 'icon-small';
      fontSizeClass = 'font-small';
      break;
    case 'medium':
      iconSizeClass = 'icon-medium';
      fontSizeClass = 'font-medium';
      break;
    default:
      iconSizeClass = 'icon-medium';
      fontSizeClass = 'font-medium';
      break;
  }
  let containerClasses = `container spacing ${disabled ? 'disabled' : ''} ${
    radioGroup.error ? 'error' : ''
  } ${readOnly ? 'readonly' : ''}`;
  let labelClasses = `label ${hideLabel ? 'visually-hidden' : ''} 
                            ${readOnly ? 'readonly' : ''} 
                            ${disabled ? 'disabled' : ''}`;
  let descriptionClasses = `description ${
    hideLabel ? 'visually-hidden' : ''
  } ${fontSizeClass}`;
</script>

<div
  class={`${containerClasses} ${fontSizeClass}`}
  on:click={toggle}
  on:keydown={handleKeydown}
  tabindex="-1"
  role="radio"
  aria-checked={checked}
  aria-label="Select an option"
  aria-labelledby={description}
>
  <span class={`control radio`}>
    <input
      class="input"
      type="radio"
    />
    <svg
      class="icon {iconSizeClass}"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        class="box"
        name="circle"
        cx="11"
        cy="11"
        r="10"
        fill="white"
        stroke="#00315D"
        stroke-width="2"
      />
      {#if checked}
        <circle
          class="checked"
          name="checked"
          cx="11"
          cy="11"
          r="4.88889"
          fill="#0062BA"
        />
      {/if}
    </svg>
  </span>
  <label
    for="label"
    class={labelClasses}
  >
    <span class={fontSizeClass}>
      <slot />
    </span>
  </label>
  {#if description}
    <p
      id="description"
      class={descriptionClasses}
    >
      {description}
    </p>
  {/if}
</div>

<style lang="scss">
  .container {
    position: relative;
    min-width: 44px;
    min-height: 44px;
  }

  .spacing {
    padding-left: calc(var(--fds-spacing-6) + 17px);
  }

  .icon {
    grid-area: input;
    pointer-events: none;
    height: 1.75em;
    width: 1.75em;
    margin: auto;
    overflow: visible;
  }

  .label {
    padding-left: 3px;
    min-height: 44px;
    min-width: min-content;
    display: inline-flex;
    flex-direction: row;
    gap: var(--fds-spacing-1);
    align-items: center;
    cursor: pointer;
  }

  .description {
    padding-left: 3px;
    margin-top: calc(var(--fds-spacing-2) * -1);
    margin-bottom: 0.25rem;
    color: var(--fds-semantic-text-neutral-subtle);
  }

  .control {
    --fds-inner-focus-border-color: var(--fds-semantic-border-focus-boxshadow);
    --fds-outer-focus-border-color: var(--fds-semantic-border-focus-outline);
    --fds-focus-border-width: 3px;

    position: absolute;
    left: 0;
    top: 0;
    min-width: 44px;
    min-height: 44px;
    display: inline-grid;
    grid: [input] 1fr / [input] 1fr;
    gap: var(--fds-spacing-2);
    grid-auto-flow: column;
  }

  .radio,
  .radio .icon {
    border-radius: var(--fds-border_radius-full);
  }

  .input {
    height: 100%;
    width: 100%;
    opacity: 0;
    margin: 0;
    grid-area: input;
    cursor: pointer;
  }

  .readonly > .control > .input,
  .readonly > .label {
    cursor: default;
  }

  .disabled > .control .input,
  .disabled > .label {
    cursor: not-allowed;
    color: var(--fds-semantic-border-neutral-subtle);
  }

  .disabled > .description {
    color: var(--fds-semantic-border-neutral-subtle);
  }

  .input:not(:checked) ~ .icon .checked {
    display: none;
  }

  .input:checked ~ .icon .checked {
    display: inline;
    fill: var(--fds-semantic-border-input-hover);
  }

  .input:not(:checked) ~ .icon .box {
    stroke: var(--fds-semantic-border-input-default);
  }

  .input:checked ~ .icon .box {
    stroke: var(--fds-semantic-border-input-hover);
  }

  .input:disabled ~ .icon .box {
    stroke: var(--fds-semantic-border-neutral-subtle);
  }

  .input:focus-visible ~ .icon {
    outline: var(--fds-focus-border-width) solid
      var(--fds-outer-focus-border-color);
    outline-offset: 0;
  }

  .input:focus-visible ~ .icon .box {
    stroke: var(--fds-semantic-border-focus-boxshadow);
    stroke-width: var(--fds-focus-border-width);
  }

  .input:disabled ~ .icon .checked {
    fill: var(--fds-semantic-border-neutral-subtle);
  }

  .error .input:not(:disabled, :focus-visible) ~ .icon .box {
    stroke: var(--fds-semantic-border-danger-default);
  }

  .error .input:not(:disabled, :focus-visible) ~ .icon .checked {
    fill: var(--fds-semantic-border-danger-default);
  }

  .readonly .input:read-only:not(:focus-visible) ~ .icon .box {
    stroke: var(--fds-semantic-border-neutral-subtle);
    fill: var(--fds-semantic-background-subtle);
  }

  .readonly .input:read-only:not(:focus-visible):is(:checked) ~ .icon .checked {
    fill: var(--fds-semantic-border-neutral-default);
  }

  /* Only use hover for non-touch devices to prevent sticky-hovering */
  @media (hover: hover) and (pointer: fine) {
    .container:not(.disabled, .readonly) > .control:hover,
    .container:not(.disabled, .readonly):has(.label:hover) > .control {
      background: var(--fds-semantic-surface-info-subtle-hover);
    }

    .container:not(.disabled, .readonly) > .label:hover,
    .container:not(.disabled, .readonly) > .control:hover ~ .label {
      color: var(--fds-semantic-border-input-hover);
    }

    .container:not(.disabled, .readonly) > .control:hover > .icon > .box,
    .container:not(.disabled, .readonly):has(.label:hover)
      > .control
      > .icon
      > .box {
      stroke: var(--fds-semantic-border-input-hover);
    }

    .icon-xsmall {
      height: 1.375rem;
      width: 1.375em;
    }
    .icon-small {
      height: 1.6875rem;
      width: 1.6875rem;
    }
    .icon-medium {
      height: 2rem;
      width: 2rem;
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
  }
</style>
