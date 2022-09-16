import { formatNumber } from '../../utils/methods';
import { formatDate } from '../../utils/moment';

interface IBookProps {
  price?: number;
  initialDate: Date;
  endDate: Date;
}

export default function Book({ price, initialDate, endDate }: IBookProps) {
  return (
    <div className="relative my-4 xl:my-0 xl:sticky xl:top-28 xl:right-0 max-w-sm w-full shadow-lg rounded-lg flex flex-col gap-4 p-6 border border-slate-200">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          ${formatNumber(price)}{' '}
          <span className="font-light text-black opacity-30">/ noche</span>
        </h1>
        <p className="text-black opacity-50 font-semibold text-sm underline">
          44 reseñas
        </p>
      </div>

      <div className="flex flex-col border border-slate-200 rounded-lg divide-y">
        <div className="p-4">
          <span className="text-xs">Fecha Solicitada</span>
          <p className="font-light text-black opacity-80">
            {formatDate(initialDate)} - {formatDate(endDate)}
          </p>
        </div>
        <div className="p-4">
          <span className="text-xs font-medium">Huespedes</span>
          <p className="font-light text-black opacity-80">1 Huesped</p>
        </div>
      </div>

      <button
        type="button"
        className="bg-primary_dark py-2 text-white rounded-lg"
      >
        SOLICITAR
      </button>
      <p className="text-xs font-light text-center">
        No se hará ningún cargo por el momento
      </p>
    </div>
  );
}
