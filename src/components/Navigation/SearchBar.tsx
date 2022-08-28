import { IoSearch } from 'react-icons/io5';

export default function SearchBar() {
  return (
    <form className="py-2 px-4 w-full flex items-center border border-slate-200 rounded-full transition-all duration-200 ease-out shadow-sm hover:shadow-md">
      <input
        type="text"
        placeholder="Buscar alojamiento"
        className="focus:outline-none grow px-2"
      />
      <button type="button" className="bg-emerald-400 p-2 rounded-full">
        <IoSearch className="text-white" />
      </button>
    </form>
  );
}
