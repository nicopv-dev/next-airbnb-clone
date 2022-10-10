import { Slider } from '@mui/material';
import { formatNumber } from '../../../utils/methods';

interface IPriceFilterProps {
  onChangePriceRange: (event: Event, newValue: number | number[]) => void;
  priceRange: number[];
}

export default function PriceFilter({
  onChangePriceRange,
  priceRange,
}: IPriceFilterProps) {
  return (
    <div className="py-8 px-4 space-y-2">
      <div>
        <h2 className="text-lg">Rango de Precios</h2>
        <p className="opacity-70">
          El precio promedio por noche es de $142,342 CLP
        </p>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={priceRange}
          onChange={onChangePriceRange}
          valueLabelDisplay="auto"
          getAriaValueText={(value: number) => `${value * 1000}°C`}
          valueLabelFormat={(targetValue) =>
            `$${formatNumber(targetValue * 100000)}`
          }
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative z-0 my-4 w-full group">
          <input
            type="text"
            className="block py-2.5 w-full text-sm bg-transparent border-2 border-gray-300 appearance-none text-black outline-none peer px-4 rounded-lg"
            value={priceRange[0] * 100000}
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0]">
            Precio Minimo
          </label>
        </div>
        <div className="relative z-0 my-4 w-full group">
          <input
            type="text"
            className="block py-2.5 w-full text-sm bg-transparent border-2 border-gray-300 appearance-none text-black outline-none peer px-4 rounded-lg"
            value={priceRange[1] * 100000}
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0]">
            Precio Maximo
          </label>
        </div>
      </div>
    </div>
  );
}
