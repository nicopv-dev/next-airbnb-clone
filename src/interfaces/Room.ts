import Country from './Country';
import ImageOnRoom from './ImageOnRoom';
import Review from './Review';
import Schedule from './Schedule';
import User from './User';

export default interface Room {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  createdAt: string;
  published: boolean;
  pais: Country;
  images: ImageOnRoom[];
  author: User;
  guests: number;
  schedules: Schedule[];
  reviews: Review[];
}
