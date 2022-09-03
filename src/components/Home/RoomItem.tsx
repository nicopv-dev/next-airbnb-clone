import Image from 'next/image';
import { useRouter } from 'next/router';
import Room from '../../interfaces/Room';
import { FiHeart } from 'react-icons/fi';
import NumberFormat from 'react-number-format';

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
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <Image
            alt={room.title}
            src={room.image}
            width={380}
            height={380}
            objectFit="cover"
            className="rounded-2xl transition-all duration-300 ease-out scale-100 hover:scale-105"
            quality={100}
          />
        </div>
        <button className="absolute top-4 right-4">
          <FiHeart className="text-white h-5 w-5" />
        </button>
      </div>
      <div className="mt-1">
        <div className="flex items-center justify-between">
          <h1 className="font-extrabold text-base">{room.title}, Chile</h1>
          <span>4.99</span>
        </div>
        <p className="font-light text-gray-500">110 kilometros</p>
        <p className="text-base font-light text-gray-500">1 - 7 oct</p>
        <NumberFormat
          value={room.price}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
          className="font-bold mt-1"
          renderText={(value, props) => (
            <p {...props}>
              {value} CLP{' '}
              <span className="font-normal text-gray-500">/ noche</span>
            </p>
          )}
        />
      </div>
    </div>
  );
}
