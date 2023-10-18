<script>
	import { getContext } from 'svelte';
	import ChevronUpIcon from '@navikt/aksel-icons/svg/ChevronUp.svg?raw';
	import ChevronDownIcon from '@navikt/aksel-icons/svg/ChevronDown.svg?raw';
	import Heading from '$lib/components/Typography/Heading/Heading.svelte';
	import Paragraph from '$lib/components/Typography/Paragraph/Paragraph.svelte';

	export let level = 1;
	export let className = '';

	let context = null;
	let open = null;

	$: {
		try {
			context = getContext('accordionItem');
			open = context.open;
		} catch {
			console.error('<Accordion.Header> has to be used within an <Accordion.Item>');
		}
	}

	$: classes = `header ${className}`;
	$: buttonClasses = `focusable button ${classes}`;
	const handleClick = () => {
		if (context) {
			context.toggleOpen();
		}
	};
</script>

<Heading size="xsmall" {level} className={classes}>
	<button
		type="button"
		class={buttonClasses}
		on:click={handleClick}
		aria-expanded={$open}
		aria-controls={context.contentId}
	>
		<div aria-hidden class="expandIcon">
			{#if !$open}
				{@html ChevronDownIcon}
			{:else}
				{@html ChevronUpIcon}
			{/if}
		</div>
		<Paragraph as="span" size="small">
			{#if $$slots.header}
				<slot name="header" />
			{/if}
		</Paragraph>
	</button>
</Heading>

<style>
	.button {
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
		border-top: 1px solid var(--fdsc-accordion-header-border);
		padding-top: var(--fdsc-accordion-header-padding-top);
		padding-right: var(--fdsc-accordion-header-padding-right);
		padding-bottom: var(--fdsc-accordion-header-padding-bottom);
		padding-left: var(--fdsc-accordion-header-padding-left);
	}

	@media (hover: hover) and (pointer: fine) {
		.button:hover {
			color: var(--fdsc-accordion-header-color-hover);
		}
	}

	.expandIcon {
		font-size: 1.5rem;
		height: 1.75rem;
		flex-shrink: 0;
	}
	/**
   * Apply a focus outline on an element when it is focused with keyboard
   */
	.focusable:focus-visible {
		--fds-inner-focus-border-color: #1e2b3c;
		--fds-outer-focus-border-color: #fadf4b;
		--fds-focus-border-width: 3px;

		outline: var(--fds-focus-border-width) solid var(--fds-outer-focus-border-color);
		outline-offset: var(--fds-focus-border-width);
		box-shadow: 0 0 0 var(--fds-focus-border-width) var(--fds-inner-focus-border-color);
	}
</style>
