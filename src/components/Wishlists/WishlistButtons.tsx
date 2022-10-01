import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiMoreHorizontal, FiShare } from 'react-icons/fi';
import Modal from '../Modal';

export default function WishlistButtons() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const goTo = (link: string): void => {
    router.push(link);
  };

  const onChangeShowModal = (value: boolean): void => {
    setShowModal(value);
  };

  const onCancel = (): void => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div>
        <button
          type="button"
          className="p-2"
          onClick={() => goTo('/wishlists')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="space-x-2">
        <button type="button" className="p-2">
          <FiShare className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 bg-white transition-all duration-300 ease-out hover:bg-slate-100 rounded-full"
          onClick={() => onChangeShowModal(true)}
        >
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onChangeShowModal={onChangeShowModal}
        title="Configuracion"
      >
        <form>
          <div className="p-4">input</div>
          <div className="border-t border-t-gray-200 py-4 px-6 flex items-center justify-between">
            <button type="button" className="underline" onClick={onCancel}>
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black rounded-lg text-white py-3 px-6"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
