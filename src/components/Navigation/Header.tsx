import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';

export default function Header() {
  const router = useRouter();

  const goTo = (path: string): void => {
    router.push(path);
  };

  return (
    <header className="fixed top-0 left-0 z-20 bg-white w-full h-20 flex items-center justify-between px-4 sm:px-10 md:px-20 border-b border-b-slate-200">
      {/* left */}
      <div className="w-full">
        <div className="w-24 hover:cursor-pointer" onClick={() => goTo('/')}>
          <Image
            src={'/images/logo.png'}
            alt="Airbnb logo"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full object-cover"
          />
        </div>
      </div>
      {/* center */}
      <div className="w-full hidden md:flex justify-center">
        <SearchBar />
      </div>
      {/* right */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="font-medium py-2 px-4 rounded-lg transition-all duration-200 ease-out bg-white hover:bg-gray-100"
          onClick={() => goTo('/member')}
        >
          Hazte anfitrion
        </button>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}
