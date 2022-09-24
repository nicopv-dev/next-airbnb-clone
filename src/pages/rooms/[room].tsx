import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import Error from '../../components/Error';
import Room from '../../interfaces/Room';
import MainLayout from '../../layouts/MainLayout';
import Feature from '../../components/Member/Feature';
import Book from '../../components/Room/Book';
import Services from '../../components/Room/Services';
import Gallery from '../../components/Room/Gallery';
import HomeHeader from '../../components/Home/HomeHeader';
import Guests from '../../components/Room/Guests';
import Host from '../../components/Room/Host';
import Map from '../../components/Room/Map';
import Rules from '../../components/Room/Rules';
import RoomReviews from '../../components/Room/RoomReviews';

interface IRoomProps {
  room?: Room;
  error?: boolean;
}

const Room: NextPage = ({ error, room }: IRoomProps) => {
  return (
    <MainLayout
      title={`${
        error ? 'Error' : `${room?.title} en alquiler en ${room?.address}`
      } - Airbnb`}
    >
      {error ? (
        <Error title="Room no encontrada" />
      ) : (
        <div className="min-h-screen py-14 sm:py-20 px-4 sm:px-10 md:px-20 lg:px-24">
          {/* header */}
          <HomeHeader room={room} />

          {/* gallery */}
          <Gallery images={room?.images} />

          {/* info */}
          <div className="my-8 divide-y">
            {/* main info */}
            <div className="block lg:flex gap-10">
              {/* left */}
              <div className="flex-1 lg:flex-[0.6_1_0%] xl:flex-[0.7_1_0%] mr-0 md:mr-10 space-y-10 divide-y">
                {/* user description */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-medium text-2xl">
                      Anfitrion: {room?.author?.name}
                    </h1>
                    <p>
                      <span>{room?.guests} huespedes, </span>
                      <span>1 habitación, 1 cama, 1 baño</span>
                    </p>
                  </div>
                  {/* user image */}
                  <div>
                    <Image
                      alt="user image"
                      src="https://a0.muscache.com/im/pictures/user/22630b23-75df-4bf5-ac66-0a9f335c3fa7.jpg"
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* devolution */}
                <div className="pt-8">
                  <p>
                    Todas las reservaciones incluyen protección gratuita en caso
                    de que el anfitrión cancele, de que haya imprecisiones en el
                    anuncio o de que surjan otros inconvenientes, como problemas
                    al momento de hacer el check-in.
                  </p>
                </div>

                {/* description */}
                <div className="pt-8">
                  <p>{room?.description}</p>
                </div>

                {/* host */}
                <div className="space-y-6 pt-8">
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                </div>

                <Services />
              </div>

              {/* right */}
              <div className="flex-1 lg:flex-[0.4_1_0%] xl:flex-[0.3_1_0%] flex justify-center md:block">
                <Book
                  price={room?.price || 0}
                  maxGuests={room?.guests ? room.guests : 0}
                  schedules={room?.schedules}
                />
              </div>
            </div>

            <Guests />

            <Map
              latitude={parseFloat(room?.lat || '5.565220523826226')}
              longitude={parseFloat(room?.long || '-77.5063874607533')}
            />

            {room && room?.reviews.length > 0 && (
              <RoomReviews reviews={room?.reviews} />
            )}

            <Host host={room?.author} />

            <Rules />
          </div>
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
      author: true,
      pais: true,
      schedules: true,
      reviews: {
        select: {
          id: true,
          description: true,
          createdAt: true,
          user: true,
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
