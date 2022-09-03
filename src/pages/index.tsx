import { PrismaClient } from '@prisma/client';
import type { GetStaticProps } from 'next';
import Categories from '../components/Home/Categories';
import Filter from '../components/Home/Filter';
import Rooms from '../components/Home/Rooms';
import Category from '../interfaces/Category';
import Room from '../interfaces/Room';

import MainLayout from '../layouts/MainLayout';

const INITIAL_DATA: Room[] = [
  {
    id: 1,
    title: 'Alianz Loft',
    price: 250000,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
  {
    id: 2,
    title: 'Alianz Loft',
    price: 200,
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-49574754/original/510496dd-768a-42bb-a97a-d6448e29555f.jpeg',
  },
  {
    id: 3,
    title: 'Room 3',
    price: 300,
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-54096750/original/75a1290a-0d87-459e-8960-53fe12577cc6.jpeg',
  },
  {
    id: 4,
    title: 'Room 4',
    price: 400,
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-49574754/original/510496dd-768a-42bb-a97a-d6448e29555f.jpeg',
  },
  {
    id: 5,
    title: 'Room 5',
    price: 500,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
  {
    id: 6,
    title: 'Room 6',
    price: 600,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
  {
    id: 7,
    title: 'Room 7',
    price: 700,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
  {
    id: 8,
    title: 'Room 8',
    price: 800,
    image:
      'https://a0.muscache.com/im/pictures/miso/Hosting-49574754/original/510496dd-768a-42bb-a97a-d6448e29555f.jpeg',
  },
  {
    id: 9,
    title: 'Alianz Loft',
    price: 900,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
  {
    id: 10,
    title: 'Room 10',
    price: 1000,
    image:
      'https://a0.muscache.com/im/pictures/2d8fd134-8d7c-4b69-a37e-17558908c426.jpg',
  },
];

interface IHomeProps {
  categories: Category[];
}

const Home = ({ categories }: IHomeProps) => {
  return (
    <MainLayout title="Alquiler de alojamiento - Airbnb">
      <div className="px-4 sm:px-10 md:px-20 py-8 mt-14">
        <div className="relative flex items-center justify-between gap-4 h-24">
          <Categories categories={categories} />
          <Filter />
        </div>
        <Rooms rooms={INITIAL_DATA} />
      </div>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    props: { categories: JSON.parse(JSON.stringify(categories)) },
  };
};

export default Home;
