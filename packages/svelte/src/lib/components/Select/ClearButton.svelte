<script>
  import Cross from './Cross.svelte';

  export let handleClick;
  export let deleteButtonLabel = 'Delete';
  export let disabled;
  export let readOnly;
  //svelte-ignore unused-export-let
  export let size = 'medium';
</script>

<button
  on:click={disabled ? null : (e) => handleClick(e)}
  aria-label={deleteButtonLabel}
  class={`delete-button clear-all ${disabled ? 'disabled' : ''} ${
    readOnly ? 'read-only' : ''
  }`}
  {disabled}><Cross /></button
>

<style>
  .delete-button {
    --delete-cross-box-color-hover: var(--colors-red-500);
    --delete-cross-box-size: 25px;
    --delete-cross-size: 12px;

    --delete-cross-color: var(--colors-blue-900);
    --delete-cross-color-active: var(--colors-blue-700);
    --delete-cross-color-disabled: #022f5180;
    --delete-cross-color-hover: white;
    color: #fff;
    background: none;
    border: none;
    cursor: var(--interactive-element-cursor);
    height: var(--delete-cross-box-size);
    padding: calc(
      (var(--delete-cross-box-size) - var(--delete-cross-size)) / 2
    );
    width: var(--delete-cross-box-size);

    color: inherit;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    margin-left: auto;
    background-color: transparent;

    & > svg {
      margin-top: -0.8px;
      margin-left: -1.2px;
    }
    &:hover {
      background-color: var(--colors-red-500);
      color: white;
    }

    &:disabled {
      color: lightgrey;
      cursor: not-allowed;
      background-color: transparent;
      &:disabled {
        color: lightgrey;
      }
    }

    &.read-only {
      &:hover {
        cursor: not-allowed;
        background-color: transparent;
        color: inherit;
      }
    }
  }
</style>
