<script>
	export let border = false;
	export let color = 'neutral';
</script>

<div class={`accordion ${color} ${border ? 'border' : ''}`}>
	<slot />
</div>

<style>
	.accordion {
		--fdsc-accordion-border: var(--fds-semantic-border-neutral-subtle);
		--fdsc-accordion-border-radius: 3px;
		--fdsc-accordion-header-padding-top: var(--fds-spacing-4);
		--fdsc-accordion-header-padding-right: var(--fds-spacing-5);
		--fdsc-accordion-header-padding-bottom: var(--fds-spacing-4);
		--fdsc-accordion-header-padding-left: var(--fds-spacing-5);
		--fdsc-accordion-header-bg-neutral: var(--fds-semantic-surface-neutral-default);
		--fdsc-accordion-header-bg-neutral-active: var(
			--fds-semantic-surface-action-first-no_fill-hover
		);
		--fdsc-accordion-header-bg-subtle: var(--fds-semantic-surface-neutral-subtle);
		--fdsc-accordion-header-bg-subtle-hover: var(--fds-semantic-surface-neutral-subtle-hover);
		--fdsc-accordion-header-bg-primary: var(--fds-semantic-surface-first-light);
		--fdsc-accordion-header-bg-primary-hover: var(--fds-semantic-surface-first-light-hover);
		--fdsc-accordion-header-bg-secondary: var(--fds-semantic-surface-second-light);
		--fdsc-accordion-header-bg-secondary-hover: var(--fds-semantic-surface-second-light-hover);
		--fdsc-accordion-header-bg-tertiary: var(--fds-semantic-surface-third-light);
		--fdsc-accordion-header-bg-tertiary-hover: var(--fds-semantic-surface-third-light-hover);
		--fdsc-accordion-header-border: var(--fds-semantic-border-neutral-subtle);
		--fdsc-accordion-header-border-inverted: var(--fds-semantic-border-on_inverted-default);
		--fdsc-accordion-header-shadow-focus: 2px 2px 3px var(--fds-semantic-border-neutral-subtle);
		--fdsc-accordion-header-color-hover: var(--fds-semantic-text-action-first-default);
		--fdsc-accordion-content-border: var(--fds-semantic-border-neutral-subtle);
		--fdsc-accordion-content-border-open: var(--fds-semantic-border-neutral-strong);

		border-bottom: 1px solid var(--fdsc-accordion-content-border);
	}

	.border {
		border: 1px solid var(--fdsc-accordion-border);
		border-radius: var(--fdsc-accordion-border-radius);
	}

	.accordion.neutral,
	:global(.accordion.neutral > .item > .header > button) {
		background: var(--fdsc-accordion-header-bg-neutral);
	}

	.accordion.subtle,
	:global(.accordion.subtle > .item > .header > button) {
		background: var(--fdsc-accordion-header-bg-subtle);
	}

	.accordion.first,
	:global(.accordion.first > .item > .header > button) {
		background: var(--fdsc-accordion-header-bg-primary);
	}

	.accordion.second,
	:global(.accordion.second > .item > .header > button) {
		background: var(--fdsc-accordion-header-bg-secondary);
	}

	.accordion.third,
	:global(.accordion.third > .item > .header > button) {
		background: var(--fdsc-accordion-header-bg-tertiary);
	}

	:global(.accordion.border > .item:first-child > .header > button) {
		border-top: 0;
	}

	:global(.accordion.first > .item:not(:first-child) > .header > button),
	:global(.accordion.second > .item:not(:first-child) > .header > button),
	:global(.accordion.third > .item:not(:first-child) > .header > button) {
		border-top: 1px solid var(--fdsc-accordion-header-border-inverted);
	}

	@media (hover: hover) and (pointer: fine) {
		:global(.accordion.subtle > .item > .header > button:hover) {
			background: var(--fdsc-accordion-header-bg-subtle-hover);
		}

		:global(.accordion.first > .item > .header > button:hover) {
			background: var(--fdsc-accordion-header-bg-primary-hover);
		}

		:global(.accordion.second > .item > .header > button:hover) {
			background: var(--fdsc-accordion-header-bg-secondary-hover);
		}

		:global(.accordion.third > .item > .header > button:hover) {
			background: var(--fdsc-accordion-header-bg-tertiary-hover);
		}
	}

	:global(.accordion.neutral > .item.open > .header > button),
	:global(.accordion.subtle > .item.open > .header > button) {
		background-color: var(--fdsc-accordion-header-bg-neutral-active);
	}

	:global(.accordion.first > .item.open > .header > button),
	:global(.accordion.second > .item.open > .header > button),
	:global(.accordion.third > .item.open > .header > button) {
		background-color: rgba(0 0 0 / 0.03);
	}
</style>
