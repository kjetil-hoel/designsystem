<script>
  import MultiSelectOption from './MultiSelectOption.svelte';
  import SingleSelectOption from './SingleSelectOption.svelte';
  import Chevron from './Chevron.svelte';
  import ClearButton from './ClearButton.svelte';

  export let multiple = false;
  export let inputId;
  export let placeholder;
  export let ariaLabel;
  export let hasFilter;
  export let options;
  export let searchTerm;
  export let searchLabel;
  export let selected;
  export let readOnly = false;
  export let removeOption;
  export let handleSelectControlClick;
  export let clearAll;
  export let onFilterChange;

  //let filteredOptions = options;

  /*   $: if (hasFilter) {
    let filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    filteredOptions = options;
  }
 */
  let inputValue = '';

  // Update inputValue based on user input
  function updateInputValue(event) {
    inputValue = event.target.value;
    // implement filter logic here or in a reactive statement?
    onFilterChange(inputValue); // Notify parent component of the filter change
  }

  // Existing logic to update inputValue based on selected option
  $: if (!multiple && selected) {
    inputValue = selected.label;
  } else if (!hasFilter) {
    inputValue = '';
  }
</script>

<div
  class="field {multiple ? 'multiple' : 'single'}"
  on:click={handleSelectControlClick}
>
  <div class="inputContainer">
    {#if multiple}
      <div class="selectedOptions">
        {#each selected as selectedOption (selectedOption.value)}
          <MultiSelectOption
            option={selectedOption}
            {removeOption}
            {readOnly}
          />
        {/each}
      </div>
    {/if}
    <input
      bind:value={inputValue}
      on:input={updateInputValue}
      class="textInput {hasFilter ? '' : 'no-filter'}"
      id={inputId}
      placeholder={multiple && !hasFilter && selected && selected.length > 0
        ? ''
        : placeholder}
      aria-label={ariaLabel}
      readonly={readOnly || (!multiple && !hasFilter)}
    />
  </div>
  {#if multiple && selected.length > 0}
    <ClearButton
      handleClick={clearAll}
      isClearAll
    />
  {/if}
  <div class="controlIcons">
    <Chevron />
  </div>
</div>

<style lang="scss">
  .inputContainer {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .textInput {
    background: transparent;
    border: 0;
    box-sizing: border-box;
    font-family: inherit;
    font-size: var(--font_size);
    line-height: var(--line-height);
    min-height: var(--field-height-inside);
    max-width: 100%;
    outline: none;
    &.no-filter {
      cursor: pointer;
    }
  }

  .controlIcons {
    height: 100%;
    display: flex;
    align-items: center;
    gap: var(--fds-spacing-2);
    margin-right: var(--fds-spacing-1);
  }

  .selectedOptions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--fds-spacing-2);
  }

  .clearAll {
    background: #f0f0f0;
    border: none;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    margin-left: auto;
  }

  .field {
    display: flex;
    border: 1px solid var(--interface-common-info-900, #022f51);
    border-radius: 3px;
    background: fff;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-family: inherit;
    font-size: var(--font_size);
    min-height: 1.75rem;
    width: 100%;
    padding: 0.25rem;
    &:hover {
      cursor: pointer;
    }
  }
</style>
