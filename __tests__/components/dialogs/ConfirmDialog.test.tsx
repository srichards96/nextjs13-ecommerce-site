import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

test("Contents of `triggerContent` prop is rendered as is", () => {
  render(
    <ConfirmDialog
      triggerContent={<button>open dialog</button>}
      onConfirm={() => {}}
    />
  );

  expect(screen.getByText("open dialog")).toBeDefined();
});

test("Initially, the dialog should not be open", () => {
  render(
    <ConfirmDialog
      triggerContent={<button>open dialog</button>}
      onConfirm={() => {}}
    />
  );

  expect(screen.queryByText("Cancel")).toBeNull();
});

test("Clicking the `triggerContent` should open the dialog", () => {
  render(
    <ConfirmDialog
      triggerContent={<button>open dialog</button>}
      onConfirm={() => {}}
    />
  );

  fireEvent.click(screen.getByText("open dialog"));

  expect(screen.queryByText("Cancel")).toBeDefined();
});

test("Clicking the `Confirm` button calls the `onConfirm` prop and closes the dialog", () => {
  const onConfirm = jest.fn();
  render(
    <ConfirmDialog
      triggerContent={<button>open dialog</button>}
      onConfirm={onConfirm}
    />
  );

  fireEvent.click(screen.getByText("open dialog"));
  fireEvent.click(screen.getByText("Confirm"));

  expect(onConfirm).toHaveBeenCalled();
  expect(screen.queryByText("Confirm")).toBeNull();
});

test("Clicking the `Cancel` button calls the `onCancel` prop and close the dialog", async () => {
  const onCancel = jest.fn();
  render(
    <ConfirmDialog
      triggerContent={<button>open dialog</button>}
      onConfirm={() => {}}
      onCancel={onCancel}
    />
  );

  fireEvent.click(screen.getByText("open dialog"));
  fireEvent.click(screen.getByText("Cancel"));

  expect(onCancel).toHaveBeenCalled();
  expect(screen.queryByText("Confirm")).toBeNull();
});
