import Image from 'next/image';
import React from 'react';
import Room from '../../interfaces/Room';
import { formatNumber } from '../../utils/methods';
import Like from '../Like';

interface IWishlistRoomItemProps {
  room: Room;
}

export default function WishlistRoomItem({ room }: IWishlistRoomItemProps) {
  const goTo = (): void => {
    if (room) {
      window.open(`/rooms/${room.id}`, '_blank');
    }
  };

  return (
    <div className="py-6 flex gap-6 hover:cursor-pointer" onClick={goTo}>
      {/* image */}
      <div>
        <Image
          alt={room.title}
          src={room.images[0].image.path}
          width={280}
          height={200}
          objectFit="cover"
          layout="fixed"
          className="object-cover rounded-xl"
        />
      </div>
      {/* title */}
      <div className="relative flex-grow flex flex-col justify-between">
        <section>
          <div className="flex justify-between items-center">
            <h3 className="text-black text-xs opacity-75">{room.title}</h3>
            <Like isLiked={true} />
          </div>
          <h2 className="text-lg font-semibold">{room.address}</h2>
          <p className="text-black text-sm opacity-75 mt-2">
            {room.guests} huespedes
          </p>
        </section>
        <section className="flex items-center justify-between">
          <p>4.99</p>
          <p className="font-semibold">
            ${formatNumber(room?.price)}{' '}
            <span className="font-normal text-gray-500">/ noche</span>
          </p>
        </section>
      </div>
    </div>
  );
}
