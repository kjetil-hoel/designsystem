<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable, get } from 'svelte/store';

	export let open = false;
	export let className = '';

	const transitionDurationInMilliseconds = 250;
	const openOrClosed = open ? 'open' : 'closed';
	const state = writable(openOrClosed);
	const height = writable(0);

	let shouldAnimate = true;

	let node;
	let prevOpen = open;
	let resizeObserver;

	const { subscribe: subscribeMediaQuery, destroy: destroyMediaQuery } = useMediaQuery('(prefers-reduced-motion)');

	const mediaQuerySubscription = subscribeMediaQuery((matches) => {
		shouldAnimate = !matches; // (prefers-reduced-motion) implies no animations
	});

	function useMediaQuery(query) {
		const store = writable(false);
		const subscribe = store.subscribe;

		const updateMediaQuery = () => {
			store.set(window.matchMedia(query).matches);
		};

		if (typeof window !== 'undefined') {
			updateMediaQuery();
			const mediaQueryList = window.matchMedia(query);
			// Add an event listener
			mediaQueryList.addEventListener('change', updateMediaQuery);

			return {
				subscribe,
				destroy() {
					// Clean up the event listener on destroy
					mediaQueryList.removeEventListener('change', updateMediaQuery);
				}
			};
		}

		return { subscribe, destroy: () => {} };
	}

	const setContentRef = () => {
		if (node) {
			resizeObserver = new ResizeObserver(() => {
				if (open) {
					height.set(node.getBoundingClientRect().height);
				} else {
					height.set(0);
				}
			});
			resizeObserver.observe(node);
		}
		if (prevOpen !== open) {
			state.set(shouldAnimate ? 'openingOrClosing' : openOrClosed);
			setTimeout(() => {
				state.set(openOrClosed);
			}, transitionDurationInMilliseconds);
		}
		prevOpen = open;
	};

	onMount(() => {
		setContentRef();
	});

	onDestroy(() => {
		// Clean up the media query subscription
		mediaQuerySubscription();
		// Clean up the media query listener
		destroyMediaQuery();
	});

	$: transition =
		get(state) === 'openingOrClosing'
			? `height ${transitionDurationInMilliseconds}ms ease-in-out`
			: undefined;
</script>

<div class={className}>
	<div bind:this={node} class={className}>
		<slot />
	</div>
</div>