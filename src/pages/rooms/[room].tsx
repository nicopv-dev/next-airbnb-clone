import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Room from '../../interfaces/Room';
import MainLayout from '../../layouts/MainLayout';

interface IRoomProps {
  room?: Room;
  error?: boolean;
}

const Room: NextPage = ({ error, room }: IRoomProps) => {
  console.log(room);
  return (
    <MainLayout title="Room - Airbnb">
      {error ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-black font-semibold text-3xl">
            Room no encontrada
          </h1>
          <p>Lo Sentimos!!</p>
        </div>
      ) : (
        <div className="min-h-screen pt-20 px-20">
          {/* header */}
          <div className="py-4">
            <h1 className="text-2xl font-bold">{room?.title}</h1>
          </div>
          {/* gallery */}
          <div className="grid sm:grid-rows-3 sm:grid-cols-2 md:grid-rows-2 md:grid-cols-4 gap-2 rounded-md">
            {room?.images.map((item, index) => (
              <div
                key={item.image.id}
                className={`${
                  index === 0 ? 'col-span-2 row-span-2' : 'row-span-auto'
                }`}
              >
                <img
                  alt={room?.title}
                  src={item.image.path}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          {/* info */}
          <div>{room?.price}</div>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { room: id } = ctx.query;
  const prisma = new PrismaClient();

  const result = await prisma.room.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      images: {
        select: {
          image: true,
        },
      },
      services: {
        select: {
          service: true,
        },
      },
    },
  });

  if (!result) {
    ctx.res.statusCode = 404;
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      room: JSON.parse(JSON.stringify(result)),
      error: false,
    },
  };
};

export default Room;
