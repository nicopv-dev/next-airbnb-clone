import { FiSliders } from 'react-icons/fi';

export default function Filter() {
  return (
    <button className="text-sm font-medium flex items-center gap-2 border border-slate-300 py-3 px-6 rounded-lg shadow">
      <FiSliders />
      Filtros
    </button>
  );
}
