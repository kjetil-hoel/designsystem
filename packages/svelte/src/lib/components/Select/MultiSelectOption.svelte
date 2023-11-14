<script>
  import Cross from './Cross.svelte';
  import ClearButton from './ClearButton.svelte';

  /**
   * Represents an option in a multi-select dropdown.
   * @property {string} label - Display label of the option.
   * @property {string} value - Unique value of the option.
   */
  export let option;

  /**
   * Function to remove the selected option.
   * @type {Function}
   */
  export let removeOption;

  /**
   * If true, disables the removal of the option.
   * @type {boolean}
   */
  export let readOnly = false;

  /**
   * ARIA label for the delete button.
   * @type {string}
   */
  export let deleteButtonLabel = 'Slett';
</script>

<span class="multiSelectedOption">
  <span class="optionLabel">{option.label}</span>
  {#if !readOnly}
    <ClearButton
      deleteButtonLabel={`${deleteButtonLabel} ${option.label}`}
      handleClick={() => removeOption(option)}
    />
  {/if}
</span>

<style lang="scss">
  .multiSelectedOption {
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: var(--border-radius-full, 9999px);
    background: var(--semantic-surface-action-primary-active, #00315d);
    padding: var(--fds-spacing-1) var(--fds-spacing-2);
    gap: var(--fds-spacing-2);

    --interactive-element-cursor: pointer;
  }

  .optionLabel {
  }
</style>
