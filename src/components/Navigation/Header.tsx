import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 bg-white w-full h-20 flex items-center justify-between px-4 sm:px-10 md:px-20 border-b border-b-slate-200">
      {/* left */}
      <div className="w-full">
        <div className="w-24">
          <img
            src={'/images/logo.png'}
            alt="Airbnb logo"
            className="w-full object-cover"
          />
        </div>
      </div>
      {/* center */}
      <div className="w-full hidden md:flex justify-center">
        <SearchBar />
      </div>
      {/* right */}
      <div className="w-full flex justify-end">right</div>
    </header>
  );
}
