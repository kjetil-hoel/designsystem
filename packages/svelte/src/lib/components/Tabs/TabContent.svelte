<!-- TabContent.svelte -->
<script>
  import { getContext } from 'svelte';

  /**
   * Value of the tab content.
   */
  export let value;

  const { selectedTab, tabSize } = getContext('tabsStore');
  let tabContentSize = $tabSize;
</script>

{#if $selectedTab === value}
  <div
    class={`tab-content ${tabContentSize}`}
    {...$$restProps}
  >
    <slot />
  </div>
{/if}

<style lang="scss">
  .tab-content {
    color: var(--semantic-text-neutral-default, #1e2b3c);
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 1.40625rem */
    margin-left: -0.125rem;
    &.small {
      padding: var(--fds-spacing-4, 1.125rem);
      font-size: 0.9375rem;
    }
    &.medium {
      padding: var(--fds-spacing-5, 1.40625rem);
      font-size: 1.125rem;
    }
    &.large {
      padding: var(--fds-spacing-6, 1.6875rem);
      font-size: 1.3125rem;
    }
  }
</style>
