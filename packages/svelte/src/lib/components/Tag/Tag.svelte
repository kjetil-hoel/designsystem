<script>
  import Paragraph from '../Typography/Paragraph/Paragraph.svelte';

  /**
   * `Tag` component for labeling or categorizing.
   * @prop {string} [color='neutral'] - Color of the tag. Options are 'primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger', 'info'.
   * @prop {string} [size='medium'] - Size of the tag. Options are 'xsmall', 'small', 'medium'.
   * @prop {string} [variant='filled'] - Variant of the tag. Options are 'filled', 'outlined'.
   * @prop {string} [class=''] - Additional classes to add to the component.
   */
  export let color = 'neutral';
  export let size = 'medium';
  export let variant = 'filled';

  // Compute the dynamic class string for the tag based on the props.
  $: computedClass = `tag ${color} ${size} ${variant} ${$$props.class}`;
</script>

<Paragraph
  as="span"
  {size}
  class={computedClass}
>
  <slot />
</Paragraph>

<style>
  .tag {
    --fdsc-tag-border: var(--fds-semantic-border-neutral-default);
    --fdsc-tag-background: var(--fds-semantic-surface-neutral-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
    --fdsc-tag-padding: var(--fds-spacing-2);
    --fdsc-tag-min-height: var(--fds-sizing-7);
    --fdsc-tag-border-radius: var(--fds-border_radius-small);

    color: var(--fdsc-tag-text);
    padding: 0 var(--fdsc-tag-padding);
    border: var(--fds-border_width-default) solid var(--fdsc-tag-border);
    background-color: var(--fdsc-tag-background);
    min-height: var(--fdsc-tag-min-height);
    border-radius: var(--fdsc-tag-border-radius);
    display: flex;
    align-items: center;
    box-sizing: border-box;
    word-break: break-word;
    width: max-content;
  }

  .xsmall {
    --fdsc-tag-padding: var(--fds-spacing-1);
    --fdsc-tag-min-height: var(--fds-sizing-5);
  }

  .small {
    --fdsc-tag-padding: var(--fds-spacing-1);
    --fdsc-tag-min-height: var(--fds-sizing-6);
  }

  .medium {
    --fdsc-tag-padding: var(--fds-spacing-2);
    --fdsc-tag-min-height: var(--fds-sizing-7);
  }

  .outlined.neutral {
    --fdsc-tag-border: var(--fds-semantic-border-neutral-default);
    --fdsc-tag-background: var(--fds-semantic-surface-neutral-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .outlined.info {
    --fdsc-tag-border: var(--fds-semantic-border-info-default);
    --fdsc-tag-background: var(--fds-semantic-surface-info-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .outlined.success {
    --fdsc-tag-border: var(--fds-semantic-border-success-default);
    --fdsc-tag-background: var(--fds-semantic-surface-success-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-success-on_success_subtle);
  }

  .outlined.warning {
    --fdsc-tag-border: var(--fds-semantic-border-warning-default);
    --fdsc-tag-background: var(--fds-semantic-surface-warning-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .outlined.danger {
    --fdsc-tag-border: var(--fds-semantic-border-danger-default);
    --fdsc-tag-background: var(--fds-semantic-surface-danger-subtle);
    --fdsc-tag-text: var(--fds-semantic-text-danger-on_danger_subtle);
  }

  .outlined.primary {
    --fdsc-tag-border: var(--fds-semantic-surface-primary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-primary-light);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .outlined.secondary {
    --fdsc-tag-border: var(--fds-semantic-surface-secondary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-secondary-light);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .outlined.tertiary {
    --fdsc-tag-border: var(--fds-semantic-surface-tertiary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-tertiary-light);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .filled.neutral {
    --fdsc-tag-border: var(--fds-semantic-surface-neutral-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-neutral-dark);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-on_inverted);
  }

  .filled.info {
    --fdsc-tag-border: var(--fds-semantic-surface-info-subtle-hover);
    --fdsc-tag-background: var(--fds-semantic-surface-info-subtle-hover);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .filled.success {
    --fdsc-tag-border: var(--fds-semantic-surface-success-default);
    --fdsc-tag-background: var(--fds-semantic-surface-success-default);
    --fdsc-tag-text: var(--fds-semantic-text-success-on_success);
  }

  .filled.warning {
    --fdsc-tag-border: var(--fds-semantic-surface-warning-default);
    --fdsc-tag-background: var(--fds-semantic-surface-warning-default);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-default);
  }

  .filled.danger {
    --fdsc-tag-border: var(--fds-semantic-surface-danger-default);
    --fdsc-tag-background: var(--fds-semantic-surface-danger-default);
    --fdsc-tag-text: var(--fds-semantic-text-danger-on_danger);
  }

  .filled.primary {
    --fdsc-tag-border: var(--fds-semantic-surface-primary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-primary-dark);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-on_inverted);
  }

  .filled.secondary {
    --fdsc-tag-border: var(--fds-semantic-surface-secondary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-secondary-dark);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-on_inverted);
  }

  .filled.tertiary {
    --fdsc-tag-border: var(--fds-semantic-surface-tertiary-dark);
    --fdsc-tag-background: var(--fds-semantic-surface-tertiary-dark);
    --fdsc-tag-text: var(--fds-semantic-text-neutral-on_inverted);
  }
</style>