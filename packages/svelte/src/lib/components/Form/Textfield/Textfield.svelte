<script>
  /**
   * Text input field
   *
   * @prop {string} [label] - Label for the textfield.
   * @prop {string} [description] - Description for the textfield.
   * @prop {string} [size='medium'] - Changes field size and paddings. Options are 'xsmall', 'small', 'medium', 'large'.
   * @prop {string} [type='text'] - Supported `input` types.
   * @prop {boolean} [hideLabel=false] - Visually hides `label` and `description` (still available for screen readers).
   * @prop {boolean} [readOnly=false] - Makes the field read-only.
   * @prop {boolean} [disabled=false] - Disables the field.
   * @prop {string} [value] - Value of the input field.
   * @prop {string} [error] - Error message to display.
   * @prop {string} [prefix] - Prefix for field.
   * @prop {string} [suffix] - Suffix for field.
   */
  export let label = '';
  export let description = '';
  export let size = 'medium';
  export let type = 'text';
  export let hideLabel = false;
  export let readOnly = false;
  export let disabled = false;
  export let value;
  export let error = false;
  export let prefix = '';
  export let suffix = '';

  // Computed class names for the component elements
  let formFieldClasses = `form-field ${size} ${disabled ? 'disabled' : ''} ${
    readOnly ? 'readonly' : ''
  } ${$$props.class || ''}`;
  let labelClasses = `label ${hideLabel ? 'visually-hidden' : ''}`;
  let descriptionClasses = `description ${hideLabel ? 'visually-hidden' : ''}`;
  let fieldClasses = `field ${error ? 'error' : ''}`;
  let inputClasses = `input ${size} ${prefix ? 'input-prefix' : ''} ${
    suffix ? 'input-suffix' : ''
  }`;
  let errorMessageClasses = 'error-message';
</script>

<div class={formFieldClasses}>
  {#if label}
    <label
      for="input-field"
      class={labelClasses}
    >
      {#if readOnly}
        <!-- Replace the following span with padlock icon component -->
        <span
          aria-hidden
          class="padlock-icon">🔒</span
        >
      {/if}
      <span>{label}</span>
    </label>
  {/if}
  {#if description}
    <p
      id="description"
      class={descriptionClasses}
    >
      {description}
    </p>
  {/if}
  <div class={fieldClasses}>
    {#if prefix}
      <div
        class="adornment prefix"
        aria-hidden="true"
      >
        {prefix}
      </div>
    {/if}
    <input
      bind:value
      class={inputClasses}
      id="input-field"
      type="text"
      aria-describedby="description"
      readonly={readOnly}
      {disabled}
    />
    {#if suffix}
      <div
        class="adornment suffix"
        aria-hidden="true"
      >
        {suffix}
      </div>
    {/if}
  </div>
  {#if error}
    <div
      class={errorMessageClasses}
      aria-live="polite"
    >
      {error}
    </div>
  {/if}
</div>

<style>
  .formField {
    display: grid;
    gap: var(--fds-spacing-2);
  }

  .adornment {
    color: var(--fds-semantic-border-neutral-default);
    background: var(--fds-semantic-surface-neutral-subtle);
    padding: var(--fds-spacing-3);
    border-radius: var(--fds-border_radius-medium);
    border: solid 1px var(--fds-semantic-border-neutral-default);
    box-sizing: border-box;
    display: inline-block;
  }

  .label {
    min-width: min-content;
    display: inline-flex;
    flex-direction: row;
    gap: var(--fds-spacing-1);
    align-items: center;
  }

  .description {
    color: var(--fds-semantic-text-neutral-subtle);
    margin-top: calc(var(--fds-spacing-2) * -1);
  }

  .input {
    font: inherit;
    position: relative;
    box-sizing: border-box;
    flex: 0 1 auto;
    min-height: 2.5em;
    width: 100%;
    appearance: none;
    padding: 0 var(--fds-spacing-3);
    border: solid 1px var(--fds-semantic-border-action-dark);
    border-radius: var(--fds-border_radius-medium);
  }

  .input.xsmall,
  .input.small {
    padding: 0 var(--fds-spacing-2);
  }

  .input.medium {
    padding: 0 var(--fds-spacing-3);
  }

  .input.large {
    padding: 0 var(--fds-spacing-4);
  }

  .disabled {
    opacity: 0.3;
  }

  .disabled .input {
    cursor: not-allowed;
  }

  .readonly .input {
    background: var(--fds-semantic-surface-neutral-subtle);
    border-color: var(--fds-semantic-border-neutral-default);
  }

  .error > .input:not(:focus-visible) {
    border-color: var(--fds-semantic-border-danger-default);
    box-shadow: inset 0 0 0 1px var(--fds-semantic-border-danger-default);
  }

  @media (hover: hover) and (pointer: fine) {
    .input:not(:focus-visible, :disabled):hover {
      border-color: var(--fds-semantic-border-action-hover);
      box-shadow: inset 0 0 0 1px var(--fds-semantic-border-action-hover);
    }
  }

  .inputPrefix {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .inputSuffix {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .prefix {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .suffix {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .field {
    display: flex;
    align-items: stretch;
    border-radius: var(--fds-border_radius-medium);
  }

  .field > *:first-child {
    border-top-left-radius: var(--fds-border_radius-medium);
    border-bottom-left-radius: var(--fds-border_radius-medium);
  }

  .field > *:last-child {
    border-top-right-radius: var(--fds-border_radius-medium);
    border-bottom-right-radius: var(--fds-border_radius-medium);
  }

  .padlock {
    height: 1.2rem;
    width: 1.2rem;
  }

  .errorMessage:empty {
    display: none;
  }
</style>