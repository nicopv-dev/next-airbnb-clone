interface INumGuests {
  title: string;
  value: number;
}

interface IGuestItemProps {
  numGuests: INumGuests;
}

const NUM_GUESTS: INumGuests[] = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '+8', value: 8 },
];

export default function GuestsFilter() {
  return (
    <div className="py-8 space-y-2">
      <h2>Numero de Huespedes</h2>
      <div className="flex flex-row gap-2">
        <GuestItem numGuests={{ title: 'Cualquiera', value: 0 }} />
        {NUM_GUESTS.map((numGuests, index) => (
          <GuestItem key={index} numGuests={numGuests} />
        ))}
      </div>
    </div>
  );
}

function GuestItem({ numGuests }: IGuestItemProps) {
  return (
    <button
      type="button"
      className="py-2 px-6 border border-slate-200 rounded-3xl"
    >
      {numGuests.title}
    </button>
  );
}
