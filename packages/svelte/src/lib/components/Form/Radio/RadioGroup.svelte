<script>
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let value;
  export let inline = false;

  const selectedValue = writable(value);

  setContext('radioGroup', {
    selectedValue,
    setCheckedValue: (newValue) => {
      selectedValue.set(newValue);
      dispatch('change', newValue);
    },
  });

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class={inline ? 'radio-group-inline' : ''}>
  <slot />
</div>

<style>
  .radio-group-inline {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
</style>
