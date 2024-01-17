<script>
  /**
   * The placement of the dropdown.
   * @type {'top' | 'right' | 'bottom' | 'left' | 'top-start' | 'top-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end'}
   */
  export let placement = 'bottom-end';
  /**
   * The size of the dropdown.
   * @type {'small' | 'medium' | 'large'}
   */
  export let size = 'medium';
  /**
   * Whether the dropdown is open or not
   * @type {boolean}
   */
  export let open = false;
  /**
   * Element the popover anchors to.
   * @type {Element | null}
   */
  export let anchorEl;
  /**
   * Callback function when dropdown closes.
   * @type {() => void}
   */
  export let onClose;
  /**
   * Portals the floating element outside of the app root and into the body.
   * @type {boolean}
   */
  export let portal;
</script>

<style>
</style>
