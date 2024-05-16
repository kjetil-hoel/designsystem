import { act, render as renderRtl, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { ModalDialogProps } from './';
import { Modal } from './';

const HEADER_TITLE = 'Modal header title';
const OPEN_MODAL = 'Open Modal';

const Comp = (args: Partial<ModalDialogProps>) => {
  return (
    <>
      <Modal.Root>
        <Modal.Trigger>{OPEN_MODAL}</Modal.Trigger>
        <Modal.Dialog {...args} />
      </Modal.Root>
    </>
  );
};

const render = async (props: Partial<ModalDialogProps> = {}) => {
  /* Flush microtasks */
  await act(async () => {});
  const user = userEvent.setup();

  return {
    user,
    ...renderRtl(<Comp {...props} />),
  };
};

describe('Modal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should open the modal', async () => {
    await render({
      children: (
        <>
          <Modal.Header>{HEADER_TITLE}</Modal.Header>
        </>
      ),
    });
    const spy = vi.spyOn(HTMLDialogElement.prototype, 'showModal');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: OPEN_MODAL });
    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('should open and close the modal', async () => {
    await render({
      children: (
        <>
          <Modal.Header>{HEADER_TITLE}</Modal.Header>
        </>
      ),
    });
    const showSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal');
    const closeSpy = vi.spyOn(HTMLDialogElement.prototype, 'close');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: OPEN_MODAL });
    await userEvent.click(button);

    expect(showSpy).toHaveBeenCalledTimes(1);

    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render the modal', async () => {
    await render({ open: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should render the close button', async () => {
    await render({
      children: (
        <>
          <Modal.Header>{HEADER_TITLE}</Modal.Header>
        </>
      ),
      open: true,
    });
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should not render the close button when closeButton is false', async () => {
    await render({
      open: true,
      children: (
        <>
          <Modal.Header closeButton={false}>{HEADER_TITLE}</Modal.Header>
        </>
      ),
    });
    expect(
      screen.queryByRole('button', { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it('should render the header title', async () => {
    await render({
      open: true,
      children: (
        <>
          <Modal.Header>{HEADER_TITLE}</Modal.Header>
        </>
      ),
    });
    expect(screen.getByText(HEADER_TITLE)).toBeInTheDocument();
  });

  it('should render the header subtitle', async () => {
    const headerSubtitle = 'Modal header subtitle';
    await render({
      open: true,
      children: (
        <>
          <Modal.Header subtitle={headerSubtitle}>{HEADER_TITLE}</Modal.Header>
        </>
      ),
    });
    expect(screen.getByText(headerSubtitle)).toBeInTheDocument();
  });

  it('should render the children', async () => {
    const children = 'Modal children';
    await render({ children, open: true });
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
