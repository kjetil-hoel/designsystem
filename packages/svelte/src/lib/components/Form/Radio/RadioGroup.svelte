<script>
  import { writable } from 'svelte/store';
  import { setContext, createEventDispatcher } from 'svelte';

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

  setContext('radioGroup', {
    readOnly,
    disabled,
    size,
    selectedValue,
    setCheckedValue: (newValue) => {
      selectedValue.set(newValue);
      dispatch('change', newValue);
    },
  });
  
  const dispatch = createEventDispatcher();
</script>

<div class="radio-group">
  {#if legend}
    <label for="legend">
      {legend}
    </label>
  {/if}
  {#if description}
    <p
      id="description"
    >
      {description}
    </p>
  {/if}
  <div class={inline ? 'radio-group-inline' : ''}>
    <slot />
  </div>
</div>

<style>
  .radio-group{
    margin-top: 1rem;
  }
  .radio-group-inline {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
  }

  label {
    font-size: 18px;
    font-weight: bold;
    color: #1E2B3C;
  }

  p {
    font-size: 18px;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
    color: #4B5563;
  }
</style>
