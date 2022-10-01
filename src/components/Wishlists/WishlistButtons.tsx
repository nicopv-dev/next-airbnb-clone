import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiMoreHorizontal, FiShare } from 'react-icons/fi';
import Modal from '../Modal';

interface IWishlistButtonsProps {
  title: string;
  link: string;
}

export default function WishlistButtons({
  title,
  link,
}: IWishlistButtonsProps) {
  const [wishlistTitle, setWishlistTitle] = useState<string>(title);
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

  const onChangeWishlistTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWishlistTitle(e.target.value);
  };

  const onSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/wishlists/${router.query.wishlistId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: wishlistTitle,
          }),
        }
      );

      if (response.status === 200) {
        setShowModal(false);
        router.push(link);
      }
    } catch (err) {
      console.log(err);
    }
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
        <form onSubmit={onSubmit}>
          <div className="px-4 py-1">
            <input
              type="text"
              placeholder="Ingresa titulo de la lista"
              value={wishlistTitle}
              onChange={onChangeWishlistTitle}
              className="py-3 px-4 focus:outline-none"
            />
          </div>
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
