import Room from '../../interfaces/Room';
import Image from 'next/image';

interface IUserInfoProps {
  room?: Room;
}

export default function UserInfo({ room }: IUserInfoProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-medium text-2xl">
          Anfitrion: {room?.author?.name}
        </h1>
        <p>
          <span>{room?.guests} huespedes, </span>
          <span>1 habitación, 1 cama, 1 baño</span>
        </p>
      </div>
      {/* user image */}
      <div>
        <Image
          alt="user image"
          src="https://a0.muscache.com/im/pictures/user/22630b23-75df-4bf5-ac66-0a9f335c3fa7.jpg"
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
}
