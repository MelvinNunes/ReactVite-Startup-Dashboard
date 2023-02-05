import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function DataModal({
  modalContent,
  openerComponent,
  actionOnClickYes,
  isConditional,
}) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        style={{ zIndex: 4000 }}
        size="auto"
        title=""
        className="my-10 md:my-1">
        {modalContent}
        {isConditional && (
          <div className="flex justify-center gap-2 px-10 my-2">
            <button
              onClick={actionOnClickYes}
              className="flex-shrink-0 px-4 py-2 w-28 text-base font-semibold bg-emosered hover:bg-emoseredhard transition-all text-white rounded-lg">
              Sim
            </button>
            <button
              onClick={close}
              className="flex-shrink-0 px-4 py-2 w-28 text-base font-semibold bg-gray-200 hover:bg-gray-300 transition-all rounded-lg text-gray-900">
              Cancelar
            </button>
          </div>
        )}
      </Modal>
      <div onClick={open}>{openerComponent}</div>
    </div>
  );
}
