import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import Error from '../components/Error';
import Categories from '../components/Home/Categories';
import Filter from '../components/Home/Filter';
import Rooms from '../components/Home/Rooms';
import Category from '../interfaces/Category';
import Room from '../interfaces/Room';

import MainLayout from '../layouts/MainLayout';

interface IHomeProps {
  error: boolean;
  categories?: Category[];
  rooms?: Room[];
}

const Home = ({ error, categories, rooms }: IHomeProps) => {
  const [categoryActive, setCategoryActive] = useState<number>(1);
  const [roomsFiltered, setRoomsFiltered] = useState<Room[]>(
    rooms?.filter((room) => room?.category?.id === 1) || []
  );

  // change category active
  const onChangeCategoryActive = (categoryId: number): void => {
    setCategoryActive(categoryId);
    const roomsFilteredByCategory = rooms?.filter(
      (room) => room?.category?.id === categoryId
    );
    setRoomsFiltered(roomsFilteredByCategory || []);
  };

  return (
    <MainLayout title="Alquiler de alojamiento - Airbnb">
      {error ? (
        <Error title="Error en el servidor" />
      ) : (
        <div className="px-4 sm:px-10 md:px-12 lg:px-20 py-8 mt-14">
          <div className="relative flex items-center justify-between gap-4 h-24">
            <Categories
              categories={categories}
              categoryActive={categoryActive}
              onChangeCategoryActive={onChangeCategoryActive}
            />
            <Filter />
          </div>
          <Rooms rooms={roomsFiltered} />
        </div>
      )}
    </MainLayout>
  );
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const rooms = await prisma.room.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      images: {
        select: {
          image: true,
        },
      },
      pais: true,
      category: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (!rooms || !categories) {
    return {
      error: true,
    };
  }

  return {
    props: {
      error: false,
      categories: JSON.parse(JSON.stringify(categories)),
      rooms: JSON.parse(JSON.stringify(rooms)),
    },
  };
};

export default Home;
