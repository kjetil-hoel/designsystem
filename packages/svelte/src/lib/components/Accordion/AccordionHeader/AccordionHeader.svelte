<script>
  import { getContext } from 'svelte';

  export let level = 1;

  let accordionContext = null;
  let accordionItemContext = null;
  let open = null;

  $: {
    try {
      accordionContext = getContext('accordion');
      accordionItemContext = getContext('accordionItem');
      open = accordionItemContext.open;
    } catch {
      console.error(
        '<Accordion.Header> has to be used within an <Accordion.Item>',
      );
    }
  }
  const handleClick = () => {
    if (accordionItemContext) {
      accordionItemContext.toggleOpen();
    }
  };
</script>

<svelte:element
  this={`h${level}`}
  class="header heading xsmall"
>
  <button
    type="button"
    class={`button focusable ${accordionContext.color}`}
    class:open={$open}
    class:border={accordionContext.border}
    on:click={handleClick}
    aria-expanded={$open}
    aria-controls={accordionItemContext.contentId}
  >
    <div
      aria-hidden
      class="expandIcon"
    >
      {#if !$open}
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          role="img"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06Z"
            fill="currentColor"
          />
        </svg>
      {:else}
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          role="img"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.47 7.97a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 1 1-1.06 1.06L12 9.56l-4.97 4.97a.75.75 0 0 1-1.06-1.06l5.5-5.5Z"
            fill="currentColor"
          />
        </svg>
      {/if}
    </div>
    {#if $$slots.header}
      <span class="paragraph small">
        <slot name="header" />
      </span>
    {/if}
  </button>
</svelte:element>

<style>
  .border {
    border: 1px solid var(--fdsc-accordion-border);
    border-radius: var(--fdsc-accordion-border-radius);
  }

  .header {
    margin: 0;
    border-top: 1px solid var(--fdsc-accordion-header-border);
  }

  .heading.xsmall {
    --fdsc-bottom-spacing: var(--fds-spacing-2);

    font: var(--fds-typography-heading-xsmall);
    font-family: var(--fdsc-typography-font-family);
  }

  .header > button {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: var(--fds-sizing-4);
    gap: var(--fds-spacing-4);
    margin: 0;
    text-align: left;
    cursor: pointer;
    border: none;
    padding-top: var(--fdsc-accordion-header-padding-top);
    padding-right: var(--fdsc-accordion-header-padding-right);
    padding-bottom: var(--fdsc-accordion-header-padding-bottom);
    padding-left: var(--fdsc-accordion-header-padding-left);
  }

  .button {
    font-family: inherit;
  }

  @media (hover: hover) and (pointer: fine) {
    .header > button:hover {
      color: var(--fdsc-accordion-header-color-hover);
    }
  }

  .button.neutral {
    background: var(--fdsc-accordion-header-bg-neutral);
  }
  .button.subtle {
    background: var(--fdsc-accordion-header-bg-subtle);
  }

  .button.first {
    background: var(--fdsc-accordion-header-bg-primary);
  }

  .button.second {
    background: var(--fdsc-accordion-header-bg-secondary);
  }

  .button.third {
    background: var(--fdsc-accordion-header-bg-tertiary);
  }

  .button.border {
    border-top: 0;
  }
  @media (hover: hover) and (pointer: fine) {
    .button.subtle:hover {
      background: var(--fdsc-accordion-header-bg-subtle-hover);
    }

    .button.first:hover {
      background: var(--fdsc-accordion-header-bg-primary-hover);
    }

    .button.second:hover {
      background: var(--fdsc-accordion-header-bg-secondary-hover);
    }

    .button.third:hover {
      background: var(--fdsc-accordion-header-bg-tertiary-hover);
    }
  }

  .button.neutral.open,
  .button.subtle.open {
    background-color: var(--fdsc-accordion-header-bg-neutral-active);
  }

  .button.first.open,
  .button.second.open,
  .button.third.open {
    background-color: rgba(0 0 0 / 0.03);
  }

  .expandIcon {
    font-size: 1.5rem;
    height: 1.75rem;
    flex-shrink: 0;
  }

  .button.open:hover + * .content {
    border-color: var(--fdsc-accordion-content-border-open);
  }

  /**
   * Apply a focus outline on an element when it is focused with keyboard
   */
  .focusable:focus-visible {
    --fds-inner-focus-border-color: #1e2b3c;
    --fds-outer-focus-border-color: #fadf4b;
    --fds-focus-border-width: 3px;

    outline: var(--fds-focus-border-width) solid
      var(--fds-outer-focus-border-color);
    outline-offset: var(--fds-focus-border-width);
    box-shadow: 0 0 0 var(--fds-focus-border-width)
      var(--fds-inner-focus-border-color);
  }

  .paragraph {
    --fdsc-typography-font-family: inherit;
    --fdsc-bottom-spacing: var(--fds-spacing-5);

    color: var(--fds-semantic-text-neutral-default);
    margin: 0;
  }

  .paragraph.small {
    --fdsc-bottom-spacing: var(--fds-spacing-4);

    font: var(--fds-typography-paragraph-small);
    font-family: var(--fdsc-typography-font-family);
  }
</style>
