<script lang="ts">
  /**
   * Switch component for toggling between two states.
   * @prop {string} [value=''] - Value of the `input` element.
   * @prop {string} [position='left'] - Position of switch around the label. Options are 'left', 'right'.
   * @prop {string} [size='medium'] - Size of the switch. Options are 'medium'.
   * @prop {boolean} [disabled=false] - Whether the switch is disabled.
   * @prop {boolean} [readOnly=false] - Whether the switch is read-only.
   * @prop {string} [description=''] - Description for the switch.
   */
  export let checked = false; // Renamed from `value` and changed to boolean
  export let position = 'left';
  export let size = 'medium';
  export let disabled = false;
  export let readOnly = false;
  export let description = '';

  // This function omits certain properties from an object, similar to the omit utility from lodash
  const omit = (obj, keysToOmit) => {
    const result = {};
    Object.keys(obj).forEach((key) => {
      if (!keysToOmit.includes(key)) {
        result[key] = obj[key];
      }
    });
    return result;
  };

  // We omit certain properties that we don't want to add to the input element
  const inputProps = $$props.class ? omit($$props, ['class']) : $$props;

  // Computed class logic
  let computedClass = `switch ${disabled ? 'disabled' : ''} ${
    readOnly ? 'readonly' : ''
  } ${position === 'right' ? 'right' : ''} ${$$props.class || ''}`;
</script>

<label class={computedClass}>
  <input
    type="checkbox"
    bind:checked
    {...inputProps}
    disabled={disabled || readOnly}
  />
  <span class="slider" />
  {#if $$slots.default}
    <span>
      <slot />
    </span>
  {/if}
  {#if description}
    <div class="description">{description}</div>
  {/if}
</label>

<style>
  .switch {
    --fds-inner-focus-border-color: var(--fds-semantic-border-focus-boxshadow);
    --fds-outer-focus-border-color: var(--fds-semantic-border-focus-outline);
    --fds-focus-border-width: 3px;
    --fds-transition: 200ms;

    min-width: 44px;
    min-height: 44px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'input label'
      '. description';
    gap: 0 var(--fds-spacing-2);
    grid-auto-flow: column;
  }

  @media (prefers-reduced-motion) {
    .container {
      --fds-transition: 0;
    }
  }

  .right {
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      'label input'
      'description .';
  }

  .icon {
    grid-area: input;
    pointer-events: none;
    height: 1.75em;
    width: auto;
    margin: auto;
    overflow: visible;
    border-radius: 16px;
  }

  .label {
    grid-area: label;
    min-height: 44px;
    min-width: min-content;
    display: inline-flex;
    flex-direction: row;
    gap: var(--fds-spacing-1);
    align-items: center;
    cursor: pointer;
  }

  .description {
    grid-area: description;
    padding-left: 3px;
    margin-top: calc(var(--fds-spacing-2) * -1);
    color: var(--fds-semantic-text-neutral-subtle);
  }

  .input {
    min-width: 44px;
    width: 100%;
    min-height: 44px;
    opacity: 0;
    margin: 0;
    grid-area: input;
    cursor: pointer;
  }

  .readonly > .input,
  .readonly > .label {
    cursor: default;
  }

  .disabled > .input,
  .disabled > .label,
  .disabled > .description {
    color: var(--fds-semantic-border-neutral-subtle);
  }

  .disabled > .input,
  .disabled > .label {
    cursor: not-allowed;
  }

  .icon > .track {
    transition: color var(--fds-transition) ease;
    color: var(--fds-semantic-surface-neutral-dark);
  }

  .icon > .thumb {
    transition: transform var(--fds-transition) ease;
    color: var(--fds-semantic-background-default);
  }

  .icon > .thumb > .checkmark {
    opacity: 0;
    transition: opacity var(--fds-transition) ease-in-out;
    transform: translate(6px, 6px);
  }

  .input:disabled ~ .icon > .track {
    color: var(--fds-semantic-border-neutral-subtle);
  }

  .input:not([readonly], :disabled):checked ~ .icon > .track,
  .input:not([readonly], :disabled):checked ~ .icon > .thumb > .checkmark {
    opacity: 1;
    color: var(--fds-semantic-surface-success-default);
  }

  .input:checked ~ .icon > .thumb {
    transform: translateX(22px);
  }

  @media (hover: hover) and (pointer: fine) {
    .input:not([readonly], :disabled):hover ~ .icon > .thumb {
      transform: translateX(4px);
    }

    .input:not([readonly], :disabled):hover ~ .label {
      color: var(--fds-semantic-border-input-hover);
    }

    .input:not(:disabled, [readonly]):checked:hover ~ .icon > .thumb {
      transform: translateX(17px);
    }

    .input:not(:checked, :disabled, [readonly]):hover ~ .icon > .track {
      color: var(--fds-semantic-surface-neutral-dark-hover);
    }

    .input:not(:disabled, [readonly]):checked:hover ~ .icon > .track,
    .input:not(:disabled, [readonly]):checked:hover
      ~ .icon
      > .thumb
      > .checkmark {
      color: var(--fds-semantic-surface-success-hover);
    }
  }

  .readonly .input[readonly] ~ .icon > .track {
    stroke: var(--fds-semantic-border-neutral-subtle);
    color: var(--fds-semantic-background-subtle);
  }

  .readonly .input[readonly]:checked ~ .icon .thumb > .checkmark {
    opacity: 1;
    color: var(--fds-semantic-background-subtle);
  }

  .readonly .input[readonly] ~ .icon .thumb {
    color: var(--fds-semantic-border-neutral-default);
  }

  .input:focus-visible:not(:disabled) ~ .icon {
    outline: var(--fds-focus-border-width) solid
      var(--fds-outer-focus-border-color);
    outline-offset: 0;
  }

  .input:focus-visible:not(:disabled) ~ .icon .track {
    stroke: var(--fds-inner-focus-border-color);
    stroke-width: var(--fds-focus-border-width);
  }

  .padlock {
    grid-area: label;
    height: 1.2rem;
    width: 1.2rem;
  }
</style>
