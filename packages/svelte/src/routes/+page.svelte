<script>
  // @ts-nocheck
  import Alert from '$lib/components/Alert/Alert.svelte';
  import Button from '$lib/components/Button/Button.svelte';
  import Switch from '$lib/components/Form/Switch/Switch.svelte';
  import Radio from '$lib/components/Form/Radio/Radio.svelte';
  import RadioGroup from '$lib/components/Form/Radio/RadioGroup.svelte';
  import Textfield from '$lib/components/Form/Textfield/Textfield.svelte';
  import Checkbox from '$lib/components/Form/Checkbox/Checkbox.svelte';
  import Link from '$lib/components/Link/Link.svelte';
  import List from '$lib/components/List/List.svelte';
  import ListItem from '$lib/components/List/ListItem.svelte';
  import Tag from '$lib/components/Tag/Tag.svelte';
  import Paragraph from '$lib/components/Typography/Paragraph/Paragraph.svelte';
  import Modal from '$lib/components/Modal/Modal.svelte';
  import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    Select,
    Tooltip,
    Tabs,
    TabList,
    TabItem,
    TabContent,
    Files,
  } from '$lib';
  import InformationSquareFillIcon from '@navikt/aksel-icons/svg/InformationSquareFill.svg?raw';
  import CheckmarkCircleFillIcon from '@navikt/aksel-icons/svg/CheckmarkCircleFill.svg?raw';
  import XMarkOctagonFillIcon from '@navikt/aksel-icons/svg/XMarkOctagonFill.svg?raw';
  import Spinner from '$lib/components/Spinner/Spinner.svelte';
  import CheckboxGroup from '$lib/components/Form/Checkbox/CheckboxGroup.svelte';
  import Textarea from '$lib/components/Form/Textarea/Textarea.svelte';
  import Search from '$lib/components/Form/Search/Search.svelte';
  import DropdownMenu from '$lib/components/Dropdown/DropdownMenu.svelte';

  function handleTabChange(value) {
    // console.log('Tab changed:', value);
  }

  let isModalOpen = false;
  let isModal2Open = false;
  let showTextfieldError = false;
  let showSearchError = false;

  function openModal(event) {
    event.stopPropagation();
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  let textfieldValue = '';
  let searchValue = '';
  let isSwitchChecked = false;

  let textareaValue = '';

  function handleSwitchClickEvent(event) {
    console.log('switch clicked', event);
  }

  function handleSwitchChangeEvent(event) {
    console.log('switch change', event.detail);
  }

  let selectedValue;
  let selectedValues;
  let selectedCheckValue = false;

  let showError = false;
  function toggleShowError() {
    showError = !showError;
  }

  let isInline = false;
  function toggleInline() {
    isInline = !isInline;
  }

  let isHideLegend = false;
  function toggleIsHideLegend() {
    isHideLegend = !isHideLegend;
  }

  let isDisabled = false;
  function toggleIsDisabled() {
    isDisabled = !isDisabled;
  }

  let isReadOnly = false;
  function toggleIsReadOnly() {
    isReadOnly = !isReadOnly;
  }

  // SELECT

  let singleSelectValue = '';
  let multiSelectValues = [];

  $: options = [
    { label: 'Norge', value: '1' },
    { label: 'Sverige', value: '2' },
    { label: 'Outer Planets Alliance', value: '3' },
    { label: 'Outer Planets Alliance', value: '4' },
    { label: 'Outer Planets Alliance', value: '5' },
    { label: 'Outer Planets Alliance', value: '6' },
    { label: 'Outer Planets Alliance', value: '7' },
    { label: 'Outer Planets Alliance', value: '8' },
    { label: 'Outer Planets Alliance', value: '9' },
    { label: 'Outer Planets Alliance', value: '10' },
    { label: 'Outer Planets Alliance', value: '11' },
    { label: 'Outer Planets Alliance', value: '12' },
    { label: 'Outer Planets Alliance', value: '13' },
    { label: 'Outer Planets Alliance', value: '14' },
  ];

  $: optionsWithDescriptions = [
    {
      label: 'Norge',
      value: '1',
      description: 'Dårlige i fotball, gode i olje',
    },
    {
      label: 'Sverige',
      value: '2',
      description: 'Bedre i fotball, snakker litt rart',
    },
    {
      label: 'Outer Planets Alliance',
      value: '3',
      description:
        'Undertrykkede masser som må finne seg i det meste, inntil videre',
    },
  ];

  $: unSelected = null;

  let singlePreSelected = { label: 'Sverige', value: '2' };

  $: multiUnselected = [];

  let multiPreselected = [
    { label: 'Norge', value: '1' },
    { label: 'Outer Planets Alliance', value: '3' },
  ];

  function changeSelected() {
    unSelected = { label: 'Sverige', value: '2' };
  }

  $: if (unSelected) console.debug('here', unSelected);

  //dropdown:
  $: dropdownPlacements = [
    { label: 'left', value: 'left' },
    { label: 'right', value: 'right' },
    { label: 'bottom-start', value: 'bottom-start' },
    { label: 'bottom-end', value: 'bottom-end' },
    { label: 'bottom', value: 'bottom' },
    { label: 'top', value: 'top' },
    { label: 'top-start', value: 'top-start' },
    { label: 'top-end', value: 'top-end' },
    { label: 'right-start', value: 'right-start' },
    { label: 'right-end', value: 'right-end' },
    { label: 'left-start', value: 'left-start' },
    { label: 'left-end', value: 'left-end' },
  ];

  let currentDropdownPlacement = {
    label: 'bottom-start',
    value: 'bottom-start',
  };
  let menuVisible = false;
  let dropdownButtons = [];

  function handleDropdownClosing(value) {
    console.log('DropdownClosing', value);
  }
</script>

<h1>Test components here!</h1>

<h1 class="componentHeader">SWITCH</h1>
<br />
<Switch
  on:click={handleSwitchClickEvent}
  on:change={handleSwitchChangeEvent}
  bind:checked={isSwitchChecked}>Switch</Switch
>

<Switch
  checked={isSwitchChecked}
  disabled>Disabled Switch</Switch
>
<Switch
  checked={isSwitchChecked}
  readOnly>Readonly Switch</Switch
>
<Switch
  checked={isSwitchChecked}
  position="right">Switch Label right</Switch
>

<Switch
  checked={isSwitchChecked}
  description="Ipsum lorem dorem durem">Switch with Description</Switch
>

<br />
<h1 class="componentHeader">BUTTON</h1>
<br />

<Button>First</Button>
<Button color="second">Secondary</Button>
<Button
  disabled={true}
  color="success">Success</Button
>
<Button variant="quiet">First (Quiet)</Button>
<Button variant="outline">First (Outline)</Button>
<Button iconPlacement="right">
  <svg
    slot="icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm5.047 5.671 1.399 1.43-8.728 8.398L6 14.02l1.395-1.434 2.319 2.118 7.333-7.032Z"
      fill="currentColor"
    />
  </svg>
  First Icon
</Button>

<br />
<h1 class="componentHeader">TEXTFIELD</h1>
<br />
<Switch bind:checked={showTextfieldError}>Show Error</Switch>
<Textfield
  bind:value={textfieldValue}
  error={showTextfieldError ? 'Lorem ipsum error' : ''}
  size="medium"
  characterLimit={10}
  style="width: 50%"
  characterLimitLabel={(count) =>
    count > -1
      ? `Du har ${count} tegn igjen.`
      : `Du har ${Math.abs(count)} tegn for mye.`}
/>
<br />
<Textfield
  bind:value={textfieldValue}
  error={showTextfieldError ? 'Lorem ipsum error' : ''}
  size="large"
  label="Textfield Overskrift"
  description="Beskrivelse"
/>

<br />
<h1 class="componentHeader">TEXTAREA</h1>
<br />

<Textarea
  bind:value={textareaValue}
  label="Overskrift"
  size="small"
  description="Beskrivelse"
  error="Lorem ipsum error"
  style="width: 50%"
  hideLabel={false}
  characterLimit={10}
  characterLimitLabel={(count) =>
    count > -1
      ? `Du har ${count} tegn igjen.`
      : `Du har ${Math.abs(count)} tegn for mye.`}
/>

<br />
<h1 class="componentHeader">SEARCH</h1>
<br />
<Switch bind:checked={showSearchError}>Show Error</Switch>
<Search
  bind:value={searchValue}
  error={showSearchError ? 'Lorem ipsum error' : ''}
  size="medium"
  characterLimit={10}
  characterLimitLabel={(count) =>
    count > -1
      ? `Du har ${count} tegn igjen.`
      : `Du har ${Math.abs(count)} tegn for mye.`}
/>

<br />
<h1 class="componentHeader">LINK</h1>
<br />

<Link href="/route">Link</Link>

<h1 class="componentHeader">PARAGRAPH</h1>
<br />
<Paragraph
  spacing
  short>Lorem ipsum dorem</Paragraph
>

<br />
<h1 class="componentHeader">LIST OF ALERTS</h1>
<br />
<List>
  <ListItem><Alert severity="success">Alert (success)</Alert></ListItem>
  <ListItem><Alert severity="danger">Alert (danger)</Alert></ListItem>
</List>
<h2 class="componentHeader">Unstyled list:</h2>
<List as="none">
  <ListItem className="no-padding"
    ><Alert severity="info">Alert (info, default)</Alert></ListItem
  >
  <ListItem className="no-padding"
    ><Alert severity="danger">Alert (danger)</Alert></ListItem
  >
</List>

<br />
<h1 class="componentHeader">TAG</h1>
<br />

<Tag color="first">Tag Primary</Tag>
<Tag color="second">Tag Secondary</Tag>
<Tag color="third">Tag tertiary</Tag>
<Tag color="neutral">Tag neutral</Tag>
<Tag color="success">Tag success</Tag>
<Tag
  color="warning"
  variant="outlined">Tag warning outlined</Tag
>
<Tag color="danger">Tag danger</Tag>
<Tag color="info">Tag info</Tag>

<Tag
  color="first"
  variant="outlined">Tag Outlined</Tag
>

<Tag size="xsmall">Tag XS</Tag>
<Tag size="small">Tag small</Tag>
<Tag size="medium">Tag medium</Tag>

<br />
<br />
<h1 class="componentHeader">ACCORDION</h1>
<br />
<Accordion
  border={true}
  color="second"
>
  <AccordionItem>
    <AccordionHeader level={1}>
      <span slot="header">
        Hvem kan registrere seg i Frivillighetsregisteret?
      </span>
    </AccordionHeader>
    <AccordionContent>
      <span slot="content">
        For å kunne bli registrert i Frivillighetsregisteret, må organisasjonen
        drive frivillig virksomhet. Det er bare foreninger, stiftelser og
        aksjeselskap som kan registreres. Virksomheten kan ikke dele ut midler
        til fysiske personer. Virksomheten må ha et styre.
      </span>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem>
    <AccordionHeader level={4}>
      <svelte:fragment slot="header">
        <span>Hvordan går jeg fram for å</span>
        <span>registrere i Frivillighetsregisteret?</span>
      </svelte:fragment>
    </AccordionHeader>
    <AccordionContent>
      <svelte:fragment slot="content">
        <span
          >Virksomheten må være registrert i Enhetsregisteret før den kan bli</span
        >
        <span
          >registrert i Frivillighetsregisteret. Du kan registrere i begge</span
        >
        <span>registrene samtidig i Samordnet registermelding.</span>
      </svelte:fragment>
    </AccordionContent>
  </AccordionItem>
</Accordion>

<br />
<br />
<h1 class="componentHeader">MODAL</h1>
<br />

<Button on:click={openModal}>Open Modal</Button>

{#if isModalOpen}
  <Modal
    onClose={closeModal}
    modalVariant="alert"
  >
    <p style="font-size: 300%">
      Lorem Ipsum er rett og slett dummytekst fra og for trykkeindustrien. Lorem
      Ipsum har vært bransjens standard for dummytekst helt siden 1500-tallet,
      da en ukjent boktrykker stokket en mengde bokstaver for å lage et
      prøveeksemplar av en bok. Lorem Ipsum har tålt tidens tann usedvanlig
      godt, og har i tillegg til å bestå gjennom fem århundrer også tålt
      spranget over til elektronisk typografi uten vesentlige endringer. Lorem
      Ipsum ble gjort allment kjent i 1960-årene ved lanseringen av Letraset-ark
      med avsnitt fra Lorem Ipsum, og senere med sideombrekkingsprogrammet Aldus
      PageMaker som tok i bruk nettopp Lorem Ipsum for dummytekst. Hvorfor
      bruker vi det? Det er et velkjent faktum at lesere distraheres av lesbart
      innhold på en side når man ser på dens layout. Poenget med å bruke Lorem
      Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i
      ord, i motsetning til 'Innhold her, innhold her', og gir inntrykk av å
      være lesbar tekst. Mange webside- og sideombrekkingsprogrammer bruker nå
      Lorem Ipsum som sin standard for provisorisk tekst, og et søk etter 'Lorem
      Ipsum' vil avdekke mang en uferdig webside. Ulike versjoner har sprunget
      frem i senere år, noen ved rene uhell og andre mer planlagte (med humor
      o.l.).
    </p>
    <Button on:click={() => (isModal2Open = true)}>Open Modal 2</Button>
    {#if isModal2Open}
      <Modal onClose={() => (isModal2Open = false)}><p>More Text</p></Modal>
    {/if}
  </Modal>
{/if}

<br />
<br />
<h1 class="componentHeader">RADIO</h1>
<RadioGroup
  bind:value={selectedValue}
  inline={isInline}
  legend="RadioGroup legend"
  description="RadioGroup description"
  size="medium"
  defaultValue={true ? 'option1' : 'option2'}
  readOnly={isReadOnly}
  disabled={isDisabled}
  error={showError ? 'Lorem ipsum error.' : ''}
  hideLegend={isHideLegend}
>
  <Radio
    value="option1"
    label="Lorem ipsum label."
  />
  <Radio
    value="option1"
    label="Lorem ipsum dolor sit label."
    description="Lorem ipsum dolor sit description."
  />
  <Radio
    readOnly={true}
    value="option1"
    label="Lorem ipsum dolor sit amet readonly label."
    description="Lorem ipsum dolor sit amet readonly description."
  />
  <Radio
    disabled={true}
    value="option1"
    label="Lorem ipsum dolor sit amet disabled label."
    description="Lorem ipsum dolor sit amet disabled description."
  />
</RadioGroup>
<p>Selected RadioGroup value: {selectedValue}</p>
<Button on:click={toggleIsHideLegend}
  >{isHideLegend ? 'Show legend' : 'Hide legend'}</Button
>
<Button on:click={toggleInline}>{isInline ? 'Vertical' : 'Inline'}</Button>
<Button on:click={toggleShowError}
  >{showError ? 'Hide error' : 'Show error'}</Button
>
<Button on:click={toggleIsDisabled}>{isDisabled ? 'Enable' : 'Disable'}</Button>
<Button on:click={toggleIsReadOnly}
  >{isReadOnly ? 'Selectable' : 'ReadOnly'}</Button
>
<br />
<h1 class="componentHeader">CHECKBOX</h1>
<div class="selectForm">
  <h3>Standalone Checkbox</h3>
  <Checkbox
    value="standalone"
    bind:checked={selectedCheckValue}
    label="Lorem ipsum standalone label"
    description="Lorem ipsum standalone description"
  />
  <p>Checked value: {selectedCheckValue}</p>
  <h3>Checkbox Group</h3>
  <CheckboxGroup
    bind:value={selectedValues}
    legend="CheckboxGroup legend"
    description="CheckboxGroup description"
    size="medium"
    defaultValue={['option2']}
    readOnly={isReadOnly}
    disabled={isDisabled}
    error={showError ? 'Lorem ipsum error.' : ''}
    hideLegend={isHideLegend}
  >
    <Checkbox
      value="option1"
      label="Lorem ipsum label"
    />
    <Checkbox
      value="option2"
      label="Lorem ipsum pre-selected label"
      description="Lorem ipsum description"
    />
    <Checkbox
      value="option3"
      label="Lorem ipsum readonly label"
      description="Lorem ipsum readonly description"
      readOnly
    />
    <Checkbox
      value="option4"
      label="Lorem ipsum disabled label"
      description="Lorem ipsum disabled description"
      disabled
    />
  </CheckboxGroup>
  <p>Selected values: {selectedValues}</p>
</div>
<br />

<Button on:click={changeSelected}>Change selected</Button>

<h1 class="componentHeader">SELECT</h1>

<button on:click={() => console.log('unSelected', unSelected)}>LogValue</button>
<div class="selectForm">
  <Select
    {options}
    bind:selected={unSelected}
    label="Single, unselected"
    hideSelected
    clearable
    size="large"
  />
  <Select
    {options}
    bind:selected={singlePreSelected}
    label="Single, preselected"
  />

  <Select
    {options}
    bind:selected={unSelected}
    label="Single, has filter"
    hasFilter
  />

  <Select
    {options}
    bind:selected={unSelected}
    placeholder="Placeholder text"
    label="Single w/ placeholder & description"
    description="Dette er en beskrivelse"
  />

  <Select
    {options}
    bind:selected={unSelected}
    error="Error message"
    label="Single, unselected, w/ error"
  />

  <Select
    options={optionsWithDescriptions}
    bind:selected={unSelected}
    label="Single, unselected, w/ option descriptions"
  />

  <Select
    {options}
    bind:selected={singlePreSelected}
    label="Single, preselected, readonly"
    readOnly
    size="large"
  />
</div>
<br />
<h1 class="componentHeader">MULTI SELECT</h1>
<br />
<div class="selectForm">
  <Select
    {options}
    bind:selected={multiUnselected}
    multiple
    label="Multi, unselected"
  />

  <Select
    {options}
    bind:selected={multiUnselected}
    multiple
    hasFilter
    label="Multi, has filter"
  />

  <Select
    {options}
    bind:selected={multiPreselected}
    multiple
    label="Multi, preselected"
  />

  <Select
    {options}
    bind:selected={multiPreselected}
    disabled
    multiple
    label="Multi, preselected, disabled"
  />

  <Select
    {options}
    bind:selected={multiPreselected}
    readOnly
    multiple
    label="Multi, preselected, readonly"
  />

  <Select
    options={optionsWithDescriptions}
    bind:selected={multiUnselected}
    multiple
    label="Multi, unselected, w/ option descriptions"
  />
</div>
<br />

<h1 class="componentHeader">Tabs</h1>
<div class="tabs">
  <Tabs
    onChange={handleTabChange}
    size="large"
  >
    <TabList>
      <TabItem
        value="1"
        icon={InformationSquareFillIcon}>Tab 1</TabItem
      >
      <TabItem
        value="2"
        icon={CheckmarkCircleFillIcon}>Tab 2</TabItem
      >
      <TabItem
        value="3"
        icon={XMarkOctagonFillIcon}>Tab 3</TabItem
      >
    </TabList>
    <TabContent value="1"><button>Content 1</button></TabContent>
    <TabContent value="2">Content 2</TabContent>
    <TabContent value="3">Content 3</TabContent>
  </Tabs>

  <div class="tabs">
    <Tabs
      onChange={handleTabChange}
      size="small"
      defaultValue="3"
    >
      <TabList>
        <TabItem
          value="1"
          icon={InformationSquareFillIcon}>Tab 1</TabItem
        >
        <TabItem
          value="2"
          icon={CheckmarkCircleFillIcon}>Tab 2</TabItem
        >
        <TabItem
          value="3"
          icon={XMarkOctagonFillIcon}>Tab 3</TabItem
        >
      </TabList>
      <TabContent value="1"><button>Content 1</button></TabContent>
      <TabContent value="2">Content 2</TabContent>
      <TabContent value="3">Content 3</TabContent>
    </Tabs>
  </div>
</div>

<h1 class="componentHeader">Dropdown</h1>
<div style="display: flex; align-items: center;gap: 5rem;">
  <Select
    options={dropdownPlacements}
    bind:selected={currentDropdownPlacement}
    label="Placement"
  />

  {#each [0, 1, 2] as i (i)}
    <div class="dropdown">
      <div
        bind:this={dropdownButtons[i]}
        style="display: inline-block; box-sizing: border-box;"
      >
        <Button
          aria-haspopup="menu"
          aria-expanded={menuVisible}
          on:click={() => {
            menuVisible = true;
          }}
        >
          Click me
        </Button>
      </div>
      {#if menuVisible}
        <DropdownMenu
          let:C
          placement={currentDropdownPlacement.value}
          size={i == 0 ? 'small' : i == 1 ? 'medium' : 'large'}
          anchorEl={dropdownButtons[i]}
          onClose={() => handleDropdownClosing(i)}
        >
          <C.MenuGroup label={'Links'}>
            <C.MenuItem
              on:Click={(e) => {
                console.log('clicked');
              }}
            >
              Test onClick event {i}
            </C.MenuItem>
            <C.MenuItem
              href="https://designsystemet.no"
              target="_blank"
            >
              Designsystemet.no
            </C.MenuItem>
          </C.MenuGroup>
          <C.Divider />
          <C.MenuGroup>
            <C.MenuItem IconComponent={Files}>Element link {i}</C.MenuItem>
            <C.MenuItem
              IconComponent={Files}
              on:Click={() => {
                isModalOpen = true;
              }}>Element link {i + 1}</C.MenuItem
            >
          </C.MenuGroup>
        </DropdownMenu>
      {/if}
    </div>
  {/each}
</div>
<h1 class="componentHeader">Tooltip</h1>
<Tooltip
  content="Tooltip text"
  placement="top-start"
  showArrow={true}
>
  <Button slot="anchor">Click me to display a Tooltip</Button>
  <span slot="content">Tooltip text</span>
</Tooltip>
<Tooltip
  content="Tooltip text"
  placement="top"
  showArrow={true}
>
  <Button slot="anchor">Click me to display a Tooltip</Button>
  <ul
    style="margin: 0"
    slot="content"
  >
    <li>First</li>
    <li>Second</li>
  </ul>
</Tooltip>

<p>
  Tooltips kan også legges <nobr
    ><Tooltip
      open={true}
      placement="bottom"
    >
      <abbr
        slot="anchor"
        style="font-weight: bold; text-decoration: underline dotted;"
        >til i en tekst</abbr
      >
      <span slot="content">Ganske kult?</span>
    </Tooltip>
  </nobr> for å gi mer informasjon!
</p>

<h1 class="componentHeader">Spinner</h1>
<div class="spinner">
  <Spinner
    size="xLarge"
    title="xLarge"
    variant="interaction"
  />
  <Spinner
    size="large"
    title="large"
    variant="interaction"
  />
  <Spinner
    size="medium"
    title="medium"
    variant="interaction"
  />
  <Spinner
    size="small"
    title="small"
    variant="interaction"
  />
  <Spinner
    size="xSmall"
    title="xSmall"
    variant="interaction"
  />
</div>
<div class="spinner">
  <Spinner
    size="xLarge"
    title="xLarge default"
  />
  <Spinner
    size="xLarge"
    title="xLarge interaction"
    variant="interaction"
  />
  <Spinner
    size="xLarge"
    title="xLarge inverted"
    variant="inverted"
  />
</div>
<br />
<br />

<style>
  .componentHeader {
    width: 100%;
    background-color: pink;
  }

  .selectForm {
    display: flex;
    flex-direction: column;
    width: 40%;
    gap: var(--fds-spacing-2);
  }
  .dropdown {
    position: relative;
  }
</style>
