import type { Meta, StoryFn } from '@storybook/react';

import { Heading, Paragraph, Link } from '../';

import { Alert } from '.';

type Story = StoryFn<typeof Alert>;

const meta: Meta = {
  title: 'Komponenter/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Preview: Story = (args) => <Alert {...args}></Alert>;

Preview.args = {
  severity: 'info',
  elevated: false,
  size: 'md',
  children: 'En beskjed det er viktig at brukeren ser',
};

export const VariantInfo: Story = (args) => (
  <Alert
    {...args}
    severity='info'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Har du husket å bestille passtime?
    </Heading>
    <Paragraph>
      Det er lange køer for å bestille pass om dagen, det kan være lurt å
      bestille i god tid før du skal reise.
    </Paragraph>
  </Alert>
);

export const VariantSuccess: Story = (args) => (
  <Alert
    {...args}
    severity='success'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Gratulerer! Du kan nå starte selskapet ditt
    </Heading>
    <Paragraph>
      Det ser ut til at regnestykket går i pluss og at du har det som skal til
      for å starte selskapet ditt.
    </Paragraph>
  </Alert>
);

export const VariantWarning: Story = (args) => (
  <Alert
    {...args}
    severity='warning'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Vi har tekniske problemer
    </Heading>
    <Paragraph>
      Det gjør at du kan bli avbrutt mens du fyller ut skjemaet. Vi jobber med å
      rette problemene.
    </Paragraph>
  </Alert>
);

export const VariantDanger: Story = (args) => (
  <Alert
    {...args}
    severity='danger'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Det har skjedd en feil
    </Heading>
    <Paragraph>
      Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv igjen
      litt senere. Hvis vi fortsatt ikke klarer å vise informasjonen du trenger,
      tar du kontakt med kundeservice på telefon 85 44 32 66.
    </Paragraph>
  </Alert>
);

export const MedHeading: Story = (args) => (
  <Alert {...args}>
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Har du husket å bestille passtime?
    </Heading>
    <Paragraph>
      Det er lange køer for å bestille pass om dagen, det kan være lurt å
      bestille i god tid om du trenger pass til sommeren.
    </Paragraph>
  </Alert>
);

export const MedKunHeading: Story = (args) => (
  <Alert
    {...args}
    severity='warning'
  >
    <Paragraph> Du har 7 dager igjen på å fullføre søknaden.</Paragraph>
  </Alert>
);

export const MedLenke: Story = (args) => (
  <Alert
    {...args}
    severity='warning'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Søknadsfristen går ut om 3 dager
    </Heading>
    <Paragraph>
      Fristen for å søke opptak til utdanning er 15. april.{' '}
      <Link href='https://designsystemet.no/'>Søk nå</Link>
    </Paragraph>
  </Alert>
);

export const MedShadow: Story = (args) => (
  <Alert
    {...args}
    elevated
    severity='success'
  >
    <Paragraph>Skjemaet er lagret automatisk.</Paragraph>
  </Alert>
);

export const UtenAria: Story = (args) => (
  <Alert
    {...args}
    severity='warning'
  >
    <Heading
      level={2}
      size='xs'
      spacing
    >
      Nedetid
    </Heading>
    <Paragraph>
      I natt klokken 00:00 til 02:00 vil nettsiden være nede på grunn av
      vedlikehold.
    </Paragraph>
  </Alert>
);

export const MedAria: Story = (args) => (
  <Alert
    {...args}
    severity='danger'
  >
    <Heading
      level={2}
      size='xs'
      spacing
      role='alert'
    >
      Vi klarer ikke lagre skjemaet
    </Heading>
    <Paragraph>
      Vi har mistet forbindelsen med serveren og får ikke lagret skjemaet. Vent
      litt og prøv en gang til.
    </Paragraph>
  </Alert>
);
