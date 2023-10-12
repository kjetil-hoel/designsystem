<script>
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';

  export let legend = '';
  export let description = '';
  export let readOnly = false;
  export let disabled = false;
  export let error;
  export let value;
  export let defaultValue;
  export let required = false;
  export let inline = false;
  export let size = 'medium';
  export let hideLegend = false;

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
