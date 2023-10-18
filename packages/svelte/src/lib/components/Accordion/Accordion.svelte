<script>
	export let border = false;
	export let color = 'neutral';
	export let className = '';

	$: classes = `accordion ${color} ${border ? 'border' : ''} ${className}`;
</script>

<div class={classes}>
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
	.accordion.neutral > .item > .header > button {
		background: var(--fdsc-accordion-header-bg-neutral);
	}

	.accordion.subtle,
	.accordion.subtle > .item > .header > button {
		background: var(--fdsc-accordion-header-bg-subtle);
	}

	.accordion.first,
	.accordion.first > .item > .header > button {
		background: var(--fdsc-accordion-header-bg-primary);
	}

	.accordion.second,
	.accordion.second > .item > .header > button {
		background: var(--fdsc-accordion-header-bg-secondary);
	}

	.accordion.third,
	.accordion.third > .item > .header > button {
		background: var(--fdsc-accordion-header-bg-tertiary);
	}

	.accordion.border > .item:first-child > .header > button {
		border-top: 0;
	}

	.accordion.first > .item:not(:first-child) > .header > button,
	.accordion.second > .item:not(:first-child) > .header > button,
	.accordion.third > .item:not(:first-child) > .header > button {
		border-top: 1px solid var(--fdsc-accordion-header-border-inverted);
	}

	@media (hover: hover) and (pointer: fine) {
		.accordion.subtle > .item > .header > button:hover {
			background: var(--fdsc-accordion-header-bg-subtle-hover);
		}

		.accordion.first > .item > .header > button:hover {
			background: var(--fdsc-accordion-header-bg-primary-hover);
		}

		.accordion.second > .item > .header > button:hover {
			background: var(--fdsc-accordion-header-bg-secondary-hover);
		}

		.accordion.third > .item > .header > button:hover {
			background: var(--fdsc-accordion-header-bg-tertiary-hover);
		}
	}

	.accordion.neutral > .item.open > .header > button,
	.accordion.subtle > .item.open > .header > button {
		background-color: var(--fdsc-accordion-header-bg-neutral-active);
	}

	.accordion.first > .item.open > .header > button,
	.accordion.second > .item.open > .header > button,
	.accordion.third > .item.open > .header > button {
		background-color: rgba(0 0 0 / 0.03);
	}
</style>
