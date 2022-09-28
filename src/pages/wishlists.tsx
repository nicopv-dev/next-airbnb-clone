import { PrismaClient } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Error from '../components/Error';
import MyWishlists from '../components/Wishlists/MyWishlists';
import NoWishlist from '../components/Wishlists/NoWishlist';
import Whislist from '../interfaces/Wishlist';
import MainLayout from '../layouts/MainLayout';

interface IWhislistsProps {
  wishlists: Whislist[];
  error: boolean;
}

function Wishlists({ wishlists, error }: IWhislistsProps) {
  return (
    <MainLayout title="Mis Favoritos - Airbnb">
      <div className="py-20 px-4 sm:px-10 md:px-20 lg:px-24">
        {error ? (
          <Error title="Error al cargar la lista" />
        ) : (
          <div className="mt-10 space-y-10">
            {/* title */}
            <div>
              <h1 className="text-3xl font-bold">Favoritos</h1>
            </div>
            {/* list */}
            {wishlists.length > 0 ? (
              <MyWishlists wishlists={wishlists} />
            ) : (
              <NoWishlist />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const prisma = new PrismaClient();
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  const wishlists = await prisma.wishlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      roomOnWishlist: {
        select: {
          room: {
            include: {
              images: {
                select: {
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const results = wishlists.map((whishlist) => {
    const rooms = whishlist.roomOnWishlist.map((item) => item.room);
    delete whishlist.roomOnWishlist;
    // rooms = rooms?.map((room) => {
    //   const images = room.images.map((img) => img.image);
    //   return {
    //     ...room,
    //     images,
    //   };
    // });
    return { ...whishlist, rooms };
  });

  return {
    props: {
      error: false,
      wishlists: JSON.parse(JSON.stringify(results)),
    },
  };
};

export default Wishlists;
