import { useState } from 'react';
import { formatNumber } from '../../utils/methods';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SelectGuests from './SelectGuests';
import { DatePicker } from 'antd';
import Schedule from '../../interfaces/Schedule';
const { RangePicker } = DatePicker;
import type { RangePickerProps } from 'antd/es/date-picker';

import Moment from 'moment';
import useWidth from '../../hooks/useWidth';

interface ISelectedDate {
  initialDate: Date;
  endDate: Date;
  isSelected: boolean;
}

interface IBookProps {
  price: number;
  maxGuests: number;
  schedules?: Schedule[];
}

export default function Book({ price, maxGuests, schedules }: IBookProps) {
  const [isGuestDropdownActive, setIsGuestDropdownActive] =
    useState<boolean>(false);
  const [guests, setGuests] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    initialDate: new Date(),
    endDate: new Date(),
    isSelected: false,
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const width = useWidth();

  const onChangeGuestDropdown = (active: boolean): void => {
    setIsGuestDropdownActive(active);
  };
  const onChangeGuests = (quantity: number): void => {
    setGuests(quantity);
  };

  // disabled dates
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    const isToday = current < Moment().endOf('day');
    // Can not select days between schedules range dates from room
    if (schedules) {
      const isBetween = schedules?.some((item: Schedule) =>
        current.isBetween(
          Moment(item.initialDate, 'YYYY-MM-DD'),
          Moment(item.endDate, 'YYYY-MM-DD').add(1, 'd')
        )
      );
      return isToday || isBetween;
    }

    return isToday;
  };

  // set selected date from datepicker
  const onChangeRangePicker: RangePickerProps['onChange'] = (
    value: RangePickerProps['value']
  ) => {
    const initialDate = value?.[0]?.toDate() || new Date();
    const endDate = value?.[1]?.toDate() || new Date();
    setSelectedDate({ initialDate, endDate, isSelected: true });

    const days = value?.[1]?.diff(value?.[0], 'days') || 1;

    setTotalPrice(days * price);
  };

  const solicitar = () => {
    console.log(selectedDate);
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
        {/* datepicker */}
        <div className="px-4 py-2">
          <span className="text-xs">Fecha Solicitada</span>
          <RangePicker
            disabledDate={disabledDate}
            onChange={onChangeRangePicker}
            placeholder={['Fecha de inicio', 'Fecha de termino']}
            className="border border-primary hover:border-primary"
            placement={`${width > 500 ? 'bottomRight' : 'topLeft'}`}
          />
        </div>

        {/* guests */}
        <div
          className="px-4 py-2 flex items-center justify-between hover:cursor-pointer"
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

      {/* send form */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="bg-primary_dark py-2 text-white rounded-lg"
          onClick={solicitar}
        >
          SOLICITAR
        </button>
        <p className="text-xs font-light text-center">
          No se hará ningún cargo por el momento
        </p>
      </div>

      {/* total */}
      {selectedDate.isSelected && (
        <div className="flex items-center justify-between">
          <h2 className="text-base underline text-gray-600">
            $
            {`${formatNumber(price)} x ${Moment(selectedDate.endDate).diff(
              Moment(selectedDate.initialDate),
              'days'
            )} noches`}
          </h2>
          <p className="text-base text-gray-600">
            ${formatNumber(totalPrice)} CLP
          </p>
        </div>
      )}
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
      className="absolute top-[122px] right-0 w-full mt-2 bg-white rounded-md shadow-lg z-20 pt-4"
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
