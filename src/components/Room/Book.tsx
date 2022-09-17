import { useState } from 'react';
import { formatNumber } from '../../utils/methods';
import { formatDate } from '../../utils/moment';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SelectGuests from './SelectGuests';

interface IBookProps {
  price?: number;
  initialDate: Date;
  endDate: Date;
  maxGuests: number;
}

export default function Book({
  price,
  initialDate,
  endDate,
  maxGuests,
}: IBookProps) {
  const [isGuestDropdownActive, setIsGuestDropdownActive] =
    useState<boolean>(false);
  const [guests, setGuests] = useState<number>(1);

  const onChangeGuestDropdown = (active: boolean): void => {
    setIsGuestDropdownActive(active);
  };
  const onChangeGuests = (quantity: number): void => {
    setGuests(quantity);
  };

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

      <div className="flex flex-col border border-slate-200 rounded-lg divide-y relative">
        <div className="p-4">
          <span className="text-xs">Fecha Solicitada</span>
          <p className="font-light text-black opacity-80">
            {formatDate(initialDate)} - {formatDate(endDate)}
          </p>
        </div>
        <div
          className="p-4 flex items-center justify-between hover:cursor-pointer"
          onClick={() => onChangeGuestDropdown(!isGuestDropdownActive)}
        >
          <div>
            <span className="text-xs font-medium">Huespedes</span>
            <p className="font-light text-black opacity-80">
              {guests} {`${guests > 1 ? 'Huespedes' : 'Huesped'}`}
            </p>
          </div>
          <div>
            {!isGuestDropdownActive ? (
              <FiChevronDown className="text-black opacity-50" />
            ) : (
              <FiChevronUp className="text-black opacity-50" />
            )}
          </div>
        </div>
        <GuestDropdown
          isGuestDropdownActive={isGuestDropdownActive}
          guests={guests}
          onChangeGuests={onChangeGuests}
          maxGuests={maxGuests}
        />
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

interface IGuestDropdownProps {
  isGuestDropdownActive: boolean;
  guests: number;
  onChangeGuests: (quantity: number) => void;
  maxGuests: number;
}

function GuestDropdown({
  isGuestDropdownActive,
  guests,
  onChangeGuests,
  maxGuests,
}: IGuestDropdownProps) {
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      y: 0,
      display: 'block',
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <motion.div
      className="absolute top-36 right-0 w-full mt-2 bg-white rounded-md shadow-lg z-20 pt-4"
      initial="exit"
      animate={isGuestDropdownActive ? 'enter' : 'exit'}
      variants={subMenuAnimate}
    >
      <SelectGuests
        guests={guests}
        onChangeGuests={onChangeGuests}
        maxGuests={maxGuests}
      />
    </motion.div>
  );
}
