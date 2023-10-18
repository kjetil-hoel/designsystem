<script>
  import { writable } from 'svelte/store';
  import Alert from '$lib/components/Alert/Alert.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Textfield from '$lib/components/Form/Textfield/Textfield.svelte';
  import Link from '$lib/components/Link/Link.svelte';
  import List from '$lib/components/List/List.svelte';
  import Tag from '$lib/components/Tag/Tag.svelte';
  import Paragraph from '$lib/components/Typography/Paragraph/Paragraph.svelte';
  import Modal from '$lib/components/Modal/Modal.svelte';
	import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from '$lib';
  
  let showModal = false;

  function openModal(event) {
    event.stopPropagation();
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

	let textfieldValue = '';
</script>

<h1>Test components here!</h1>

<Button>First</Button>
<Button color="second">Secondary</Button>
<Button color="success">Success</Button>
<Button variant="quiet">First (Quiet)</Button>
<Button variant="outline">First (Outline)</Button>
<Button iconPlacement="right"
	><svelte:fragment slot="icon"
		><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm5.047 5.671 1.399 1.43-8.728 8.398L6 14.02l1.395-1.434 2.319 2.118 7.333-7.032Z"
				fill="currentColor"
			/>
		</svg></svelte:fragment
	>First Icon</Button
>

<Textfield bind:value={textfieldValue} />

<Link href="/route">Link</Link>
<Paragraph spacing short>Lorem ipsum dorem</Paragraph>
<List>
	<li><Alert severity="info">Alert (info, default)</Alert></li>
	<li><Alert severity="warning">Alert (warning)</Alert></li>
	<li><Alert severity="success">Alert (success)</Alert></li>
	<li><Alert severity="danger">Alert (danger)</Alert></li>
</List>

<Tag color="first">Tag Primary</Tag>
<Tag color="second">Tag Secondary</Tag>
<Tag color="third">Tag tertiary</Tag>
<Tag color="neutral">Tag neutral</Tag>
<Tag color="success">Tag success</Tag>
<Tag color="warning">Tag warning</Tag>
<Tag color="danger">Tag danger</Tag>
<Tag color="info">Tag info</Tag>

<Tag color="first" variant="outlined">Tag Outlined</Tag>

<Tag size="xsmall">Tag XS</Tag>
<Tag size="small">Tag small</Tag>
<Tag size="medium">Tag medium</Tag>

<Accordion border={true} color="second">
	<AccordionItem open={writable(true)}>
		<AccordionHeader level={1}>
			<svelte:fragment slot="header">
				Hvem kan registrere seg i Frivillighetsregisteret?
			</svelte:fragment>
		</AccordionHeader>
		<AccordionContent>
			<svelte:fragment slot="content">
				For å kunne bli registrert i Frivillighetsregisteret, må organisasjonen drive frivillig
				virksomhet. Det er bare foreninger, stiftelser og aksjeselskap som kan registreres.
				Virksomheten kan ikke dele ut midler til fysiske personer. Virksomheten må ha et styre.
			</svelte:fragment>
		</AccordionContent>
	</AccordionItem>
	<AccordionItem open={writable(false)}>
		<AccordionHeader level={4}>
			<svelte:fragment slot="header">
				Hvordan går jeg fram for å registrere i Frivillighetsregisteret?
			</svelte:fragment>
		</AccordionHeader>
		<AccordionContent>
			<svelte:fragment slot="content">
				Virksomheten må være registrert i Enhetsregisteret før den kan bli registrert i
				Frivillighetsregisteret. Du kan registrere i begge registrene samtidig i Samordnet
				registermelding.
			</svelte:fragment>
		</AccordionContent>
	</AccordionItem>
</Accordion>

<Button on:click={openModal}>Open Modal</Button>
<Modal
  show={showModal}
  onClose={closeModal}
/>

