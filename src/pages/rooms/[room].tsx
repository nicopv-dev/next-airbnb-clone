import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Room from '../../interfaces/Room';
import MainLayout from '../../layouts/MainLayout';

interface IRoomProps {
  room?: Room;
  error?: boolean;
}

const Room: NextPage = ({ room, error }: IRoomProps) => {
  return (
    <MainLayout title="Room - Airbnb">
      <div>
        {error ? (
          <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-black font-semibold text-3xl">
              Room no encontrada
            </h1>
            <p>Lo Sentimos!!</p>
          </div>
        ) : (
          <div>
            {/* title */}
            <div>{room?.title}</div>
            {/* gallery */}
            <div>{room?.id}</div>
            {/* info */}
            <div>{room?.price}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx): GetServerSideProps {
  const { room: id } = ctx.query;
  const prisma = new PrismaClient();

  const result = await prisma.room.findUnique({
    where: {
      id: Number(id),
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
      room: 'hola',
      error: false,
    },
  };
}

export default Room;
