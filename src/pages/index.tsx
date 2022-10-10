import { useState } from 'react';
import prisma from '../lib/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Error from '../components/Error';
import Categories from '../components/Home/Categories';
import Filter from '../components/Home/Filter';
import Rooms from '../components/Home/Rooms';
import Modal from '../components/Modal';
import Category from '../interfaces/Category';
import Room from '../interfaces/Room';
import MainLayout from '../layouts/MainLayout';
import RoomsFilterForm from '../components/Home/RoomsFilterForm';

interface IHomeProps {
  error: boolean;
  categories?: Category[];
  rooms?: Room[];
}

const Home = ({ error, categories, rooms }: IHomeProps) => {
  const [categoryActive, setCategoryActive] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const onChangePriceRange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // change category active
  const onChangeCategoryActive = (categoryId: number): void => {
    setCategoryActive(categoryId);
  };

  // close or open modal
  const onChangeShowModal = (isOpen: boolean): void => {
    setShowModal(isOpen);
  };

  return (
    <MainLayout title="Alquiler de alojamiento - Airbnb">
      {error ? (
        <Error title="Error en el servidor" />
      ) : (
        <div className="px-4 sm:px-10 md:px-12 lg:px-24 py-8 mt-14">
          {/* categories / filter */}
          <div className="relative flex items-center justify-between gap-4 h-24">
            <Categories
              categories={categories}
              categoryActive={categoryActive}
              onChangeCategoryActive={onChangeCategoryActive}
            />
            <Filter onChangeShowModal={onChangeShowModal} />
          </div>

          {/* rooms */}
          <Rooms rooms={rooms} />
          <Modal
            isOpen={showModal}
            onChangeShowModal={onChangeShowModal}
            title="Filtros"
            size="max-w-4xl"
          >
            <RoomsFilterForm
              onChangeShowModal={onChangeShowModal}
              priceRange={priceRange}
              onChangePriceRange={onChangePriceRange}
              categoryActive={categoryActive}
            />
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
  const minPrice: string = query?.min ? (query?.min as string) : '0';
  const maxPrice: string = query?.max ? (query?.max as string) : '10000000';

  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  const rooms = await prisma.room.findMany({
    where: {
      published: true,
      categoryId: Number(categoryId),
      price: {
        gte: parseInt(minPrice),
        lte: parseInt(maxPrice),
      },
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

  const likes = await prisma.like.findMany({
    where: {
      userId: user ? (user?.id as number) : 0,
    },
    include: {
      user: true,
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

  const roomsWithLikes = rooms.map((room) => {
    const isLikeRoom = likes.some((like) => like.roomId === room.id);
    return {
      ...room,
      isLike: isLikeRoom,
    };
  });

  return {
    props: {
      error: false,
      categories: JSON.parse(JSON.stringify(categories)),
      rooms: JSON.parse(JSON.stringify(roomsWithLikes)),
    },
  };
};

export default Home;
