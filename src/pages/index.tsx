import { useState } from 'react';
import prisma from '../lib/prisma';
import { GetServerSidePropsContext } from 'next';
import Error from '../components/Error';
import Categories from '../components/Home/Categories';
import Filter from '../components/Home/Filter';
import Rooms from '../components/Home/Rooms';
import Modal from '../components/Modal';
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
  const [showModal, setShowModal] = useState<boolean>(false);

  // change category active
  const onChangeCategoryActive = (categoryId: number): void => {
    setCategoryActive(categoryId);
  };

  const onChangeShowModal = (isOpen: boolean): void => {
    setShowModal(isOpen);
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
            <Filter onChangeShowModal={onChangeShowModal} />
          </div>
          <Rooms rooms={rooms} />
          <Modal
            isOpen={showModal}
            onChangeShowModal={onChangeShowModal}
            title="Filtros"
          >
            <h1>filtros</h1>
          </Modal>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const categoryId: string = query?.category
    ? (query?.category as string)
    : '1';

  const rooms = await prisma.room.findMany({
    where: {
      published: true,
      categoryId: Number(categoryId),
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
