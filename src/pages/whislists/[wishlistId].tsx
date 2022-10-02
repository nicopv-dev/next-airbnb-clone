import prisma from '../../lib/prisma';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Wishlist from '../../interfaces/Wishlist';
import WishlistRoomItem from '../../components/Wishlists/WishlistRoomItem';
import WishlistButtons from '../../components/Wishlists/WishlistButtons';
import Error from '../../components/Error';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

interface IWishlistProps {
  wishlist: Wishlist;
  error: boolean;
}

const Wishlist = ({ error, wishlist }: IWishlistProps) => {
  const router = useRouter();
  return (
    <MainLayout title={`${wishlist.title} - Airbnb`}>
      {error ? (
        <Error title="Error al buscar lista" />
      ) : (
        <div className="flex gap-4">
          {/* list */}
          <div className="flex-1 xl:flex-[0.55_1_0%] py-20 px-4 sm:px-10 md:px-20 lg:px-24 2xl:px-32 ">
            {/* header */}
            <div className="space-y-2">
              {/* icons */}
              <WishlistButtons
                title={wishlist.title}
                link={
                  router.query?.wishlistId
                    ? (router.query?.wishlistId as string)
                    : ''
                }
              />

              {/* title */}
              <div>
                <h3 className="text-4xl font-bold">{wishlist.title}</h3>
              </div>

              {/* categories */}
              <div>categories</div>
            </div>

            {/* items */}
            <div className="flex flex-col divide-y">
              {wishlist.rooms.map((room) => (
                <WishlistRoomItem key={room.id} room={room} />
              ))}
            </div>
          </div>

          {/* map */}
          <div className="hidden xl:block flex-[0.45_1_0%] pt-20">map</div>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const { wishlistId } = ctx.query;
  const id: string = wishlistId ? (wishlistId as string) : '';

  const whislist = await prisma.wishlist.findUnique({
    where: {
      id,
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

  if (!whislist) {
    return {
      props: {
        error: true,
      },
    };
  }

  const result = {
    ...whislist,
    rooms: whislist?.roomOnWishlist.map((room) => room.room),
  };

  return {
    props: {
      error: false,
      wishlist: JSON.parse(JSON.stringify(result)),
    },
  };
};

export default Wishlist;
