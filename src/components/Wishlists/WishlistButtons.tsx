import { useRouter } from 'next/router';
import { FiArrowLeft, FiMoreHorizontal, FiShare } from 'react-icons/fi';
export default function WishlistButtons() {
  const router = useRouter();

  const goTo = (link: string): void => {
    router.push(link);
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
        <button type="button" className="p-2">
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
