import { FiHeart, FiShare } from 'react-icons/fi';
import { IoStar } from 'react-icons/io5';
import Room from '../../interfaces/Room';

interface IHomeHeaderProps {
  room?: Room;
}

export default function HomeHeader({ room }: IHomeHeaderProps) {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold">{room?.title}</h1>
      <div className="flex justify-between flex-col items-start md:flex-row md:items-center space-y-2 md:space-y-0">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <IoStar />
            <p className="text-sm">4.87</p>
          </div>
          <span className="text-sm">389 reseñas</span>
          <p className="text-sm underline">{room?.address}</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm">
            <FiShare className="h-4 w-4" />
            Compartir
          </button>
          <button className="flex items-center gap-1 text-sm">
            <FiHeart className="h-4 w-4" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
