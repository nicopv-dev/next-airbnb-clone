import Room from '../../interfaces/Room';
import RoomItem from '../Home/RoomItem';
import SearchFilter from './SearchFilter';

interface IResultsProps {
  results?: Room[];
}

export default function Results({ results }: IResultsProps) {
  return (
    <div className="py-8 flex-[0.5_1_0%] space-y-6">
      <SearchFilter resultsCount={results?.length || 0} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {results?.map((room) => (
          <RoomItem key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
