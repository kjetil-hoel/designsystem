<script>
  import { writable } from 'svelte/store';
  import { setContext, createEventDispatcher } from 'svelte';
  import Paragraph from '$lib/components/Typography/Paragraph/Paragraph.svelte';

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

{#if legend}
  <h2>{legend}</h2>
{/if}
{#if description}
  <Paragraph size={size}>
    {description}
  </Paragraph>
{/if}
<div class={inline ? 'radio-group-inline' : ''}>
  <slot />
</div>

<style>
  .radio-group-inline {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
  }
  h2 {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
</style>
