import Image from 'next/image';
import { useRouter } from 'next/router';
import Room from '../../interfaces/Room';
import { FiHeart } from 'react-icons/fi';
import { formatNumber } from '../../utils/methods';

interface IRoomItemProps {
  room: Room;
}

export default function RoomItem({ room }: IRoomItemProps) {
  const router = useRouter();

  const goTo = (): void => {
    router.push(`/rooms/${room.id}`);
  };

  return (
    <div onClick={goTo} className="hover:cursor-pointer">
      {/* image */}
      <div className="relative overflow-hidden rounded-2xl w-full">
        <Image
          alt={room.title}
          src={room.images[0].image.path}
          width={400}
          height={380}
          objectFit="cover"
          layout="responsive"
          className="rounded-2xl transition-all duration-300 ease-out scale-100 hover:scale-105"
          quality={100}
        />
        <button className="absolute top-4 right-4">
          <FiHeart className="text-white h-5 w-5" />
        </button>
      </div>
      {/* info */}
      <div className="mt-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-semibold text-base line-clamp-1">
            {room.address}
          </h1>
          <span>4.99</span>
        </div>
        <p className="font-light text-gray-500">110 kilometros</p>
        <p className="text-base font-light text-gray-500">1 - 7 oct</p>
        <p className="font-semibold">
          ${formatNumber(room?.price)} CLP{' '}
          <span className="font-normal text-gray-500">/ noche</span>
        </p>
      </div>
    </div>
  );
}
