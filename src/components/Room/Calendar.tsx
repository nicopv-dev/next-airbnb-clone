import ReactCalendar from 'react-calendar';

interface ISelectedDate {
  date: Date;
  isSelected: boolean;
}

interface ICalendarProps {
  onChange: (date: Date) => void;
  selectedDate: ISelectedDate;
}

export default function Calendar({ onChange, selectedDate }: ICalendarProps) {
  return (
    <div>
      <ReactCalendar
        value={selectedDate.date}
        onChange={onChange}
        className="shadow-xl"
        minDate={new Date()}
      />
    </div>
  );
}
