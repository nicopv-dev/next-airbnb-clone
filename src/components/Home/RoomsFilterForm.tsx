import { useRouter } from 'next/router';
import GuestsFilter from './Filters/GuestsFilter';
import PriceFilter from './Filters/PriceFilter';
import ServicesFilter from './Filters/ServicesFilter';
import TypePropertyFilter from './Filters/TypePropertyFilter';

interface IRoomsFilterFormProps {
  onChangeShowModal: (value: boolean) => void;
  priceRange: number[];
  onChangePriceRange: (event: Event, newValue: number | number[]) => void;
  categoryActive: number;
}

export default function RoomsFilterForm({
  onChangeShowModal,
  priceRange,
  onChangePriceRange,
  categoryActive,
}: IRoomsFilterFormProps) {
  const router = useRouter();

  const applyFilter = () => {
    router.push({
      pathname: '/',
      query: {
        category: categoryActive,
        min: priceRange[0] * 100000,
        max: priceRange[1] * 100000,
      },
    });
    onChangeShowModal(false);
  };

  return (
    <div className="py-4 px-8 divide-y">
      <PriceFilter
        priceRange={priceRange}
        onChangePriceRange={onChangePriceRange}
      />

      <GuestsFilter />

      <TypePropertyFilter />

      <ServicesFilter />

      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          className="bg-wite text-black font-medium py-2 px-8 rounded-lg border border-slate-200"
          onClick={() => onChangeShowModal(false)}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-black text-white font-medium py-2 px-8 rounded-lg"
          onClick={applyFilter}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
