import { PrismaClient } from '@prisma/client';
import type { GetStaticProps } from 'next';
import { useState } from 'react';
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

  // change category active
  const onChangeCategoryActive = (categoryId: number): void => {
    setCategoryActive(categoryId);
  };

  return (
    <MainLayout title="Alquiler de alojamiento - Airbnb">
      {error ? (
        <div className="text-center text-2xl text-red-500"></div>
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
          <Rooms rooms={rooms} />
        </div>
      )}
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();

  const rooms = await prisma.room.findMany({
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
